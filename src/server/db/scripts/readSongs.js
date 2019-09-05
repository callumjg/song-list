const fs = require("fs");
const path = require("path");
const Song = require("../../models/Song");

const readSongs = dir => {
	const data = fs.readFileSync(dir);
	const rawSongsArray = data
		.toString()
		.split(`\r\n`)
		.map(l => l.split(","));
	const keys = rawSongsArray[0];
	let songsArray = [];

	// convert raw data to key value pairs
	for (let i = 1; i < rawSongsArray.length; i++) {
		let song = {};
		for (let j = 0; j < keys.length; j++) {
			song[keys[j]] = rawSongsArray[i][j];
		}
		songsArray.push(song);
	}

	// parse values
	songsArray.forEach(song => {
		for (let val in song) {
			while (song[val].includes("$$$")) {
				song[val] = song[val].replace("$$$", ",");
			}

			if (val === "title")
				song[val] = song[val]
					.split(" ")
					.map(word => word[0].toUpperCase() + word.substring(1))
					.join(" ");
			if (song[val] === "") song[val] = null;
			if ((val === "tags" || val === "notes") && song[val])
				song[val] = song[val].split("&&&");
			if ((val === "tags" || val === "notes") && !song[val]) song[val] = [];
		}
	});
	console.log(songsArray);
	return songsArray;
};

const readAndWriteSongsToJSON = (readDir, writeDir) => {
	const songs = readSongs(readDir);
	fs.writeFileSync(writeDir, JSON.stringify(songs));
};

const readAndWriteSongsToDB = async () => {
	console.log(process.env.DB_URL);
	await require("../mongoose");
	const songs = JSON.parse(
		fs.readFileSync(path.join(__dirname, "/songs.json"))
	);
	songs.forEach(s => {
		const song = new Song(s);
		song.save();
	});
};

// readAndWriteSongsToJSON(
// 	path.join(__dirname, "/data.csv"),
// 	path.join(__dirname, "/songs.json")
// );

readAndWriteSongsToDB();

module.exports = { readSongs, readAndWriteSongsToJSON };
// console.log(songsArray);
