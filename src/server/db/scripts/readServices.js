const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const Song = require("../../models/Song");
const Service = require("../../models/Service");
const data = fs.readFileSync(path.join(__dirname, "Services.csv")).toString();
const servicesRaw = data.split(/(\d{4}-\d{2}-\d{2})+/);
const songIndex = JSON.parse(
	fs.readFileSync(path.join(__dirname, "songindex.json")).toString()
);

const writeServicesToJSON = () => {
	const services = [];

	servicesRaw.forEach((v, i) => {
		if (i === 0) return;
		if (i % 2 === 1) return services.push({ date: v });
		let songs = [];
		let tags = [];
		let si = (i - 2) / 2;
		v.split(/\r\n/)
			.map(l => l.split(","))
			.map(l =>
				l.map(ll => {
					while (ll.includes("$$$")) {
						ll = ll.replace("$$$", ",");
					}
					return ll;
				})
			)
			.forEach(pv => {
				songs.push(pv[0]);
				if (pv[1]) tags.push(pv[1]);
			});
		songs = songs
			.filter(s => s)
			.map(s =>
				s
					.split(" ")
					.map(word =>
						word ? word[0].toUpperCase() + word.substring(1) : word
					)
					.join(" ")
			)
			.map(s =>
				songIndex[s] ? songIndex[s] : console.log(services[si].date + " " + s)
			);
		services[si].songs = songs;
		services[si].tags = tags.filter(t => t);
	});

	fs.writeFileSync(
		path.join(__dirname, "services.json"),
		JSON.stringify(services)
	);
};
// writeServicesToJSON()

async function getSongTable() {
	try {
		await mongoose.connect("DB_URL=mongodb://127.0.0.1:27017/song-list", {
			useNewUrlParser: true
		});
		console.log("Connected to database");
	} catch (e) {
		console.log(chalk.red("Error, unable to connect to database"));
		console.log(e);
	}

	const allSongs = await Song.find({});
	const songs = {};
	// allSongs.forEach(s => (songs[s._id.toString()] = s.title));
	allSongs.forEach(s => (songs[s.title] = s._id.toString()));
	console.log(songs);
	fs.writeFileSync(
		path.join(__dirname, "songindex.json"),
		JSON.stringify(songs)
	);
}

// getSongTable();

async function commitServicesToDB() {
	try {
		await mongoose.connect("DB_URL=mongodb://127.0.0.1:27017/song-list", {
			useNewUrlParser: true
		});
		console.log("Connected to database");
	} catch (e) {
		console.log(chalk.red("Error, unable to connect to database"));
		console.log(e);
	}

	const services = JSON.parse(
		fs.readFileSync(path.join(__dirname, "services.json"))
	);

	services.forEach(async s => {
		const service = new Service(s);
		await service.save();
	});
	// console.log(services);
	console.log("done");
}

commitServicesToDB();
