/*
Usage: 
1. Uncomment function call. USE WITH CAUTION
2. Run "npx env-cmd node src/server/db/scripts/rmSFS.js"
*/

const connect = require("../mongoose");
const Song = require("../../models/Song");
const rmSFS = async () => {
  await connect();
  const songs = await Song.find({});
  let total = songs.length;
  let count = 1;
  songs.forEach(async song => {
    try {
      song.services = undefined;
      await song.save();
      console.log(`${count++}/${total}`, song.title, song.services);
    } catch (e) {
      console.log(e);
    }
  });
};

// rmSFS();
