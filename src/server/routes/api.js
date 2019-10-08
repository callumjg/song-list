const { Router } = require("express");
const router = new Router();
const songsRouter = require("./songs");
const servicesRouter = require("./services");

router.use("/songs", songsRouter);
router.use("/services", servicesRouter);

module.exports = router;
