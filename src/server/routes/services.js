const router = require('express').Router();
const Service = require('../models/Service');
const Song = require('../models/Song');
const whiteListBody = require('../middleware/whitelistBody');

const allowedUpdates = ['songs', 'tags', 'date'];

// create service
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).send(service);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//Get Service
router.get('/:_id', async (req, res) => {
  try {
    const service = await Service.findById(req.params._id).populate('songs');
    if (!service) return res.status(404).send();
    res.send(service);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//Get Services
router.get('/', async (req, res) => {
  try {
    // destructure query params
    const { limit, skip, sort, fromDate, toDate } = req.query;

    // filter used to return results based on specific params
    const filter = {};

    // return specific fields
    const select = ''; //select specific fields to return

    // options object
    const options = { sort: { date: -1 } };

    // set limit and skip for pagination
    if (limit) options.limit = parseInt(limit);
    if (skip) options.skip = parseInt(skip);

    // set sort options
    if (sort) {
      let parts = sort.split('_');
      options.sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    // handle date filters
    if (fromDate || toDate) filter.date = {};
    if (fromDate) filter.date.$gte = new Date(parseInt(fromDate));
    if (toDate) filter.date.$lte = new Date(parseInt(toDate));

    // Count total available resources
    const count = await Service.countDocuments({ ...filter, limit: null });

    // retrieve and send resource
    const services = await Service.find(filter, select, options).populate({
      path: 'songs',
      select: '_id title',
    });
    res.send({ services, count });
  } catch (e) {
    let status = e.status || 400;
    console.log(e);
    res.status(status).send({ message: e.message });
  }
});

// update service
router.patch('/:_id', whiteListBody(allowedUpdates), async (req, res) => {
  try {
    const { _id } = req.params;
    const service = await Service.findById(_id);
    Object.keys(req.body).forEach((u) => (service[u] = req.body[u]));
    await service.save();
    res.send({ service });
  } catch (e) {
    let status = e.status || 400;
    console.log('Error: ' + e.message);
    res.status(status).send({ message: e.message });
  }
});

// delete service
router.delete('/:_id', async (req, res) => {
  try {
    const service = await Service.findById(req.params._id);
    if (!service) return res.status(404).send();
    await service.remove();
    res.send(service);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

module.exports = router;
