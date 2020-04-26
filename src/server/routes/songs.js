const router = require('express').Router();
const moment = require('moment');
const Song = require('../models/Song');
const Service = require('../models/Service');
const whiteListBody = require('../middleware/whitelistBody');
const { escapeSpecialChar, commaSplit } = require('../../utils');

const allowedUpdates = [
  'tags',
  'notes',
  'title',
  'url',
  'author',
  'key',
  'tempo',
  'songSelectID',
  'tagsAdd',
  'tagsRemove',
];

// Create song
router.post('/', async (req, res) => {
  try {
    const song = await new Song(req.body).save();
    res.send({ song });
  } catch (e) {
    let status = e.status || 400;
    res.status(status).send({ message: e.message });
  }
});

// get services within range
//

// Get song metrics
router.get('/metrics', async (req, res) => {
  try {
    // destructure query params
    let { range } = req.query;
    if (range)
      range = moment().subtract(parseInt(range), 'months').toISOString();

    // get song _id and title
    const songFilter = { tags: { $not: /archived|deleted/i } };
    const songs = await Song.find(songFilter, '_id title tags');
    const songsObj = songs
      .map((song) => ({ ...song.toObject(), services: [] }))
      .reduce((acc, song) => {
        acc[song._id] = { ...song, totalIndices: 0 };
        return acc;
      }, {});

    // get services
    const services = await Service.find(
      range ? { date: { $gte: range } } : {},
      'songs date'
    );

    // Add services array to each song
    services.forEach((service) =>
      service.songs.forEach((_id, i) => {
        if (!songsObj[_id]) return;
        songsObj[_id].services.push(moment(service.date).valueOf());
        songsObj[_id].totalIndices += i + 1;
      })
    );
    res.send({ songs: Object.values(songsObj) });
  } catch (e) {
    let status = e.status || 400;
    res.status(status).send({ message: e.message });
  }
});

// Get song
router.get('/:_id', async (req, res) => {
  try {
    const song = await Song.findById(req.params._id);
    if (!song) {
      let e = new Error('Unable to find song');
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
router.get('/', async (req, res) => {
  try {
    // filter used to return results based on specific params
    const filter = {};

    // const filter = { tags: [] };
    const select = ''; //select specific fields to return

    // options object
    const options = { sort: { title: 1 } };

    // set limit and skip for pagination
    if (req.query.limit) options.limit = parseInt(req.query.limit);
    if (req.query.skip) options.skip = parseInt(req.query.skip);

    // set sort options
    if (req.query.sort) {
      let parts = req.query.sort.split('_');
      options.sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    // set search filter for author or title
    if (req.query.search) {
      const regex = new RegExp(req.query.search, 'i');
      filter.$or = filter.$or
        ? [...filter.$or, { title: regex }, { author: regex }]
        : [{ title: regex }, { author: regex }];
    }

    // find by tags
    if (req.query.tags) {
      let $all = commaSplit(req.query.tags).map(
        (t) => new RegExp(escapeSpecialChar(t), 'i')
      );
      filter.tags = {
        ...filter.tags,
        $all,
      };
    }

    //filter by tags
    if (req.query.exclude) {
      let $not = new RegExp(
        commaSplit(req.query.exclude)
          .map((t) => escapeSpecialChar(t))
          .join('|'),
        'i'
      );

      filter.tags = {
        ...filter.tags,
        $not,
      };
    }
    // Count total available resources
    const count = await Song.countDocuments({ ...filter, limit: null });

    // retrieve and send resource
    const songs = await Song.find(filter, select, options);
    res.send({ songs, count });
  } catch (e) {
    let status = e.status || 400;
    console.log(e);
    res.status(status).send({ message: e.message });
  }
});

// Update song
router.patch('/:_id', whiteListBody(allowedUpdates), async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const { body, params } = req;
    const { tagsAdd, tagsRemove } = body;

    if (updates.length === 0) throw new Error('No valid updates provided');

    // Retrieve song and check resource exists
    const song = await Song.findById(params._id);
    if (!song) {
      let e = new Error('Unable to find song');
      e.status = 404;
      throw e;
    }

    // handle new tags
    if (tagsAdd) {
      tagsAdd.forEach((t) => {
        let regex = new RegExp(`^${t}$`, 'i');
        if (!song.tags.includes(regex)) song.tags.push(t);
      });
      delete req.body.tagsAdd;
    }

    if (tagsRemove) {
      tagsRemove.forEach((t) => {
        let regex = new RegExp(`^${t}$`, 'i');
        song.tags = song.tags.filter((st) => !st.match(regex));
      });
      delete req.body.tagsRemove;
    }
    updates.forEach((u) => (song[u] = req.body[u]));
    await song.save();
    res.send(song);
  } catch (e) {
    let status = e.status || 400;
    res.status(status).send({ message: e.message });
  }
});

// Delete song
router.delete('/:_id', async (req, res) => {
  try {
    const song = await Song.findById(req.params._id);
    if (!song) {
      let e = new Error('Unable to find song');
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
