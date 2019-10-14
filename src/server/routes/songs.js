const router = require("express").Router();
const {
	subMonths,
	isAfter,
	compareAsc,
	differenceInCalendarMonths
} = require("date-fns");
const Song = require("../models/Song");
const Service = require("../models/Service");
const whiteListBody = require("../middleware/whitelistBody");
const { escapeSpecialChar, commaSplit } = require("../utils");

const allowedUpdates = [
	"tags",
	"notes",
	"title",
	"url",
	"author",
	"key",
	"tempo",
	"songSelectID",
	"tagsAdd",
	"tagsRemove"
];

// Create song
router.post("/", async (req, res) => {
	try {
		const song = await new Song(req.body).save();
		res.send({ song });
	} catch (e) {
		let status = e.status || 400;
		res.status(status).send({ message: e.message });
	}
});

// Get song metrics
router.get("/metrics", async (req, res) => {
	try {
		const filter = { tags: { $not: /archived|deleted/i } };
		const count = await Song.countDocuments(filter);
		const songs = (await Song.find(filter).populate("services", "date")).map(
			song => Object.assign({ metrics: {} }, song.toObject())
		);
		const services = await Service.find({}, "date");
		const firstService = services.sort((a, b) => compareAsc(a.date, b.date))[0]
			.date;
		const now = new Date();

		const range = {
			"2 years": { months: 24, date: subMonths(now, 24) },
			"1 year": { months: 12, date: subMonths(now, 12) },
			"6 months": { months: 6, date: subMonths(now, 6) },
			"3 months": { months: 3, date: subMonths(now, 3) },
			"1 month": { months: 1, date: subMonths(now, 1) }
		};

		for (r in range) {
			range[r].services = services.filter(({ date }) =>
				isAfter(date, range[r].date)
			).length;
		}

		const servicesCount =
			// get plays
			songs.forEach(song => {
				let total = song.services.length;

				// set total
				song.metrics.plays = { total: total };

				// iterate through range
				for (r in range) {
					let count = song.services.filter(({ date }) =>
						isAfter(date, range[r].date)
					).length;
					song.metrics.plays[r] = count;
				}
			});

		//get plays per service
		songs.forEach(song => {
			let { metrics } = song;
			let { plays } = metrics;

			song.metrics.playsPerService = {
				total: plays.total / services.length
			};

			for (r in range) {
				song.metrics.playsPerService[r] = plays[r] / range[r].services;
			}
		});

		//get plays per month
		songs.forEach(song => {
			let { metrics } = song;
			let { plays } = metrics;
			song.metrics.playsPerMonth = {
				total: plays.total / differenceInCalendarMonths(now, firstService)
			};
			for (r in range) {
				song.metrics.playsPerMonth[r] =
					plays[r] === 0 ? 0 : range[r].months / plays[r];
			}
		});
		res.send({ songs, count, range });
	} catch (e) {
		let status = e.status || 400;
		res.status(status).send({ message: e.message });
	}
});

// Get song
router.get("/:_id", async (req, res) => {
	try {
		const song = await Song.findById(req.params._id);
		if (!song) {
			let e = new Error("Unable to find song");
			e.status = 404;
			throw e;
		}
		res.send(song);
	} catch (e) {
		let status = e.status || 400;
		res.status(status).send({ message: e.message });
	}
});

// Get songs
router.get("/", async (req, res) => {
	try {
		// filter used to return results based on specific params
		const filter = {};

		// const filter = { tags: [] };
		const select = ""; //select specific fields to return

		// options object
		const options = { sort: { title: 1 } };

		// set limit and skip for pagination
		if (req.query.limit) options.limit = parseInt(req.query.limit);
		if (req.query.skip) options.skip = parseInt(req.query.skip);

		// set sort options
		if (req.query.sort) {
			let parts = req.query.sort.split("_");
			options.sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
		}

		// set search filter for author or title
		if (req.query.search) {
			const regex = new RegExp(req.query.search, "i");
			filter.$or = filter.$or
				? [...filter.$or, { title: regex }, { author: regex }]
				: [{ title: regex }, { author: regex }];
		}

		// find by tags
		if (req.query.tags) {
			let $all = commaSplit(req.query.tags).map(
				t => new RegExp(escapeSpecialChar(t), "i")
			);
			filter.tags = {
				...filter.tags,
				$all
			};
		}

		//filter by tags
		if (req.query.exclude) {
			let $not = new RegExp(
				commaSplit(req.query.exclude)
					.map(t => escapeSpecialChar(t))
					.join("|"),
				"i"
			);

			filter.tags = {
				...filter.tags,
				$not
			};
		}
		// Count total available resources
		const count = await Song.countDocuments({ ...filter, limit: null });

		// retrieve and send resource
		const songs = await Song.find(filter, select, options).populate({
			path: "services",
			select: "date"
		});
		res.send({ songs, count });
	} catch (e) {
		let status = e.status || 400;
		console.log(e);
		res.status(status).send({ message: e.message });
	}
});

// Update song
router.patch("/:_id", whiteListBody(allowedUpdates), async (req, res) => {
	try {
		const updates = Object.keys(req.body);
		const { body, params } = req;
		const { tagsAdd, tagsRemove } = body;

		if (updates.length === 0) throw new Error("No valid updates provided");

		// Retrieve song and check resource exists
		const song = await Song.findById(params._id);
		if (!song) {
			let e = new Error("Unable to find song");
			e.status = 404;
			throw e;
		}

		// handle new tags
		if (tagsAdd) {
			tagsAdd.forEach(t => {
				let regex = new RegExp(`^${t}$`, "i");
				if (!song.tags.includes(regex)) song.tags.push(t);
			});
			delete req.body.tagsAdd;
		}

		if (tagsRemove) {
			tagsRemove.forEach(t => {
				let regex = new RegExp(`^${t}$`, "i");
				song.tags = song.tags.filter(st => !st.match(regex));
			});
			delete req.body.tagsRemove;
		}
		updates.forEach(u => (song[u] = req.body[u]));
		await song.save();
		res.send(song);
	} catch (e) {
		let status = e.status || 400;
		res.status(status).send({ message: e.message });
	}
});

// Delete song
router.delete("/:_id", async (req, res) => {
	try {
		const song = await Song.findById(req.params._id);
		if (!song) {
			let e = new Error("Unable to find song");
			e.status = 404;
			throw e;
		}
		await song.remove();
		res.send();
	} catch (e) {
		let status = e.status || 400;
		res.status(status).send({ message: e.message });
	}
});

module.exports = router;
