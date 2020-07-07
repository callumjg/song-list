const fs = require('fs');

const songs = {};

// Manual :
// at the name of jesus
// God has spoken by his prophets + update url
// I heard the voice of jesus say + update url
// Remove repeated line in may the mind of christ my ...
// Change 'My Hope Is Built' title to 'The Solid Rock'
// Verse 3 of O Great God add line after 'evals that i face...'

const files = fs.readdirSync(__dirname + '/pages').forEach((file, i) => {
  if (!file.match(/^.*\.html$/)) return;
  const title = file.replace(/Lyrics for (.*) \| Chords.*/g, '$1');
  songs[title] = fs
    .readFileSync(__dirname + '/pages/' + file, 'utf8')
    .replace(
      /^(.|\n)*<h2 class="song-viewer-title">.*<\/h2>((.|\n)*)<div class="copyright-info">(.|\n)*$/gi,
      '$2'
    )
    .split('\n')
    .filter((v) => v)
    .map((l, i) => {
      return i % 2 === 0
        ? l.replace(/^.*<h3 class="song-viewer-part">(.*)<\/h3>/g, '$1')
        : l
            .replace(/^.*<p>(.*)<\/p>/g, '$1')
            .split('<br>')
            .join('\n');
    })
    .reduce((map, item, i) => {
      const newI = Math.floor(i / 2);
      Array.isArray(map[newI]) ? (map[newI][1] = item) : (map[newI] = [item]);
      return map;
    }, [])
    .reduce((map, item) => {
      map[item[0]] = item[1];
      return map;
    }, {});
});
// .filter((v) => v);

// console.log(songs);

fs.writeFileSync('hymns.json', JSON.stringify(songs));
