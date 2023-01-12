'use strict';

const fs = require('fs');

const list = [
  ['2023-02-04', 'SVTigers', 'CalBlue'],
  ['2023-02-05'],

  ['2023-02-11'],
  ['2023-02-12'],
  
  ['2023-02-18'],
  ['2023-02-19'],

  ['2023-02-25'],
  ['2023-02-26'],

  ['2023-03-04'],
  ['2023-03-05'],

  ['2023-03-11'],
  ['2023-03-12'],
  
  ['2023-03-18'],
  ['2023-03-19'],

  ['2023-03-25'],
  ['2023-03-26'],

  ['2023-04-01'],
  ['2023-04-02'],
  
  ['2023-04-08'],
  ['2023-04-09'],

];

// for(let i = 0; i < list.length; i++) {
for(let i = 10; i < list.length; i++) {
  for (let j = 1; j <= 4; j++) {
    const date = list[i][0];
    // const home = list[i][1];
    // const away = list[i][2];

    const round = Math.floor(i / 2 + 0.1) + 1;
    // const t = j <= 2 ? '14:00' : '16:00';
    const content = `{
  "date": "${date}",
  "type": "#${round}",
  "schedule": true,
  "home": {
      "key": "",
      "score": 0
  },
  "away": {
      "key": "",
      "score": 0
  }
}
`;

    const filename = `${list[i]}-${j}.json`;
    fs.writeFileSync("_data/seasons/23q1/games/" + filename, content);
    // fs.writeFileSync("_data/seasons/23q222/games/" + filename, content);
    // console.log(filename);
  }
}
