'use strict';

const fs = require('fs');

const teamKeyMap = {
  'THU West': 'THU',
  'Eastbay Wolverine': 'Wolf',
  'JTU': 'JTU',
  'GSF-Locomotive': 'GSF-L',
  'Wash.Utd': 'WU',
  'EBU Rangers': 'EBU',
  'ICP': 'ICP',
  'SV Tigers': 'SVTigers',
  'Deep Soccer': 'DeepSoccer',
  'OX9 F.C.': 'OX9',
  'SB Knights': 'SouthBayKnight',
  'OverPower': 'OverPower',
  'Shoreline': 'Shoreline',
  'HeHeFC': 'HeHe',
  'CalBlue': 'CalBlue',
  'GSF United': 'GSF-U',
  'Hunters': 'Hunters',
};


// text format
// Sun#D2-1	THU West (紫色)	Eastbay Wolverine (Black)	09-17 18:00	Newark LeftSide	2:0

let idx = 0;

function writeGameJson(
  date,   // '2023-09-17'
  dateStr,  // '2023-09-17 18:00'
  round,  // '1'
  team0,
  team1,
  score0,
  score1
) {
  const tk0 = teamKeyMap[team0];
  const tk1 = teamKeyMap[team1];
  if (tk0 === undefined) {
    console.warn(team0);
  }
  if (tk1 === undefined) {
    console.warn(team1);
  }
  const filename = `${date}-${tk0}-${tk1}.json`;
  const content = `{
  "date": "${dateStr}",
  "type": "#${round}",
  "home": {
    "key": "${tk0}",
    "score": ${score0}
  },
  "away": {
    "key": "${tk1}",
    "score": ${score1}
  }
}
`;

  fs.writeFileSync("_data/seasons/23q4/games/" + filename, content);
  // console.log(content);

  idx++;
}

const allFileContents = fs.readFileSync('scripts/games.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
  // console.log(line);

  const fields = line.split(/\t/);
  // console.log(fields);
  const round = fields[0].substring(fields[0].indexOf('-') + 1);

  const d = fields[3].split(' ');

  const date = `2024-${d[0]}`;
  const dateStr = `${date} ${d[1]}`;
  const i0 = fields[1].indexOf('(');
  const i1 = fields[2].indexOf('(');
  const team0 = fields[1].substring(0, i0 === -1 ? undefined: i0 - 1);
  const team1 = fields[2].substring(0, i1 === -1 ? undefined: i1 - 1);

  const score = fields[5].split(':');

  writeGameJson(
    date,
    dateStr,
    round,
    team0,
    team1,
    score[0],
    score[1]
  );
});
