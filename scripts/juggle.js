'use strict';

const fs = require('fs');

const kPlayerFileName = '_data/seasons/22q4-juggle/players.json';
const kAutogenConfigFileName = '_data/seasons/22q4-juggle/config.json';

const kRules = `
大会赛制：
* 分为小组赛和淘汰赛两个阶段
* 全部报名队员随机分入8个小组，每个小组人数为3-5（预计报名人数为24-40人）
* 小组内使用单循环Round Robin赛制。每场比赛胜者得3分，败者得0分，打平则双方各得1分。小组内全部比赛结束后积分排名前两位的球员，共16人，按照对应小组的分区进入单回合淘汰赛。
* 小组赛的比赛可由同小组内的队员在任意训练或友谊赛时间线下自行监督完成，将结果更新到doc里。淘汰赛将专门组织时间进行并由全队围观，见证颠球冠军的诞生
  - 这样可以促进同组内不熟悉的队友主动线下交流
  - 不需要一次训练要求全部报名球员出席，方便球员的时间安排使大家都能放心报名参赛
  - 节约大家纯观看时间，提升参与体验
* 报名截止日期：2022年10月8日。淘汰赛日期初定为2022年11月4日（周五）
奖品：
* 冠军：顶级比赛档足球
* 4强：比赛首发卡（可获得首发上场45分钟的机会）
* 8强：迟到免责券（可抵消一次迟到罚款）
* GSF记录奖，正式比赛最高颠球数：待定
单场比赛的规则：
* 两位球员猜拳决定颠球的先后顺序，输者为先手。
* 每人只有两次颠球机会，成绩取最高一次。第二次颠球先后手交替（ABBA顺序）。
* 用手持球抛落为开始，球落地为结束。除手外不限颠球部位。每次颠球限时2分钟。
* 计算双方各自的颠球数，数量多者为胜者。若两方数量相同则视为打平。若必须要分出胜负的比赛中双方打平，则进行加赛。
`;

// const kRules = `
// 大会赛制：
// * 分为小组赛和淘汰赛两个阶段
// * 全部报名队员随机分入6个小组，每个小组人数为4-5
// * 小组内使用单循环Round Robin赛制。每场比赛胜者得3分，败者得0分，打平则双方各得1分。
// * 小组内全部比赛结束后积分排名前两位的球员，共12人，和成绩最好的小组第三4人，进入淘汰赛。
// * 小组赛的比赛可由同小组内的队员在任意训练或友谊赛时间线下自行监督完成，将结果更新到doc里。淘汰赛将专门组织时间进行并由全队围观，见证颠球冠军的诞生
//   - 这样可以促进同组内不熟悉的队友主动线下交流
//   - 不需要一次训练要求全部报名球员出席，方便球员的时间安排使大家都能放心报名参赛
//   - 节约大家纯观看时间，提升参与体验
// * 报名截止日期：2022年10月8日。淘汰赛日期初定为2022年11月4日（周五）
// 奖品：
// * 冠军：顶级比赛档足球
// * 4强：比赛首发卡（可获得首发上场45分钟的机会）
// * 8强：迟到免责券（可抵消一次迟到罚款）
// * GSF记录奖，正式比赛最高颠球数：待定
// 单场比赛的规则：
// * 两位球员猜拳决定颠球的先后顺序，输者为先手。
// * 每人只有两次颠球机会，成绩取最高一次。第二次颠球先后手交替（ABBA顺序）。
// * 用手持球抛落为开始，球落地为结束。除手外不限颠球部位。每次颠球限时2分钟。
// * 计算双方各自的颠球数，数量多者为胜者。若两方数量相同则视为打平。若必须要分出胜负的比赛中双方打平，则进行加赛。
// `;

// const kRules = `
// 大会赛制：
// * 分为小组赛和淘汰赛两个阶段
// * 全部报名队员共25人，随机分入5个小组，每个小组人数为5
// * 小组内使用单循环Round Robin赛制。每场比赛胜者得3分，败者得0分，打平则双方各得1分。
// * 小组内全部比赛结束后积分排名前3位的球员，共15人，和成绩最好的小组第四1人，总计16人，进入淘汰赛。
// * 小组赛的比赛可由同小组内的队员在任意训练或友谊赛时间线下自行监督完成，将结果更新到doc里。淘汰赛将专门组织时间进行并由全队围观，见证颠球冠军的诞生
//   - 这样可以促进同组内不熟悉的队友主动线下交流
//   - 不需要一次训练要求全部报名球员出席，方便球员的时间安排使大家都能放心报名参赛
//   - 节约大家纯观看时间，提升参与体验
// * 报名截止日期：2022年10月8日。淘汰赛日期初定为2022年11月4日（周五）
// 奖品：
// * 冠军：顶级比赛档足球
// * 4强：比赛首发卡（可获得首发上场45分钟的机会）
// * 8强：迟到免责券（可抵消一次迟到罚款）
// * GSF记录奖，正式比赛最高颠球数：待定
// 单场比赛的规则：
// * 两位球员猜拳决定颠球的先后顺序，输者为先手。
// * 每人只有两次颠球机会，成绩取最高一次。第二次颠球先后手交替（ABBA顺序）。
// * 用手持球抛落为开始，球落地为结束。除手外不限颠球部位。每次颠球限时2分钟。
// * 计算双方各自的颠球数，数量多者为胜者。若两方数量相同则视为打平。若必须要分出胜负的比赛中双方打平，则进行加赛。
// `;

const outputJson = {
  "display_name": "GSF首届颠球大会",
  "description": "喜迎世界杯，球队大联欢，详细赛制和规则见页面底部。",
  "type": "player contest",
  "team_info": "GSF",
  "rules": kRules,
  "games": {
  },

  // 8小组
  "group_stage": {
    "A": [],
    "B": [],
    "C": [],
    "D": [],
    "E": [],
    "F": [],
    "G": [],
    "H": [],
  },
  "knockout_stage": [
    [
      "K-8-A1-B2",
      "K-8-C1-D2",
      "K-8-E1-F2",
      "K-8-G1-H2",
      "K-8-B1-A2",
      "K-8-D1-C2",
      "K-8-F1-E2",
      "K-8-H1-G2",
    ],
    [
      null,
      null,
      null,
      null
    ],
    [
      null,
      null
    ],
    [
      null
    ]
  ],

  // // 6小组
  // "group_stage": {
  //   "A": [],
  //   "B": [],
  //   "C": [],
  //   "D": [],
  //   "E": [],
  //   "F": [],
  // },
  // "knockout_stage": [
  //   [
  //     "K-8-B1-A3/D3/E3/F3",
  //     "K-8-A1-C2",
  //     "K-8-F1-A3/B3/C3",
  //     "K-8-D2-E2",
  //     "K-8-E1-A3/B3/C3/D3",
  //     "K-8-D1-F2",
  //     "K-8-C1-D3/E3/F3",
  //     "K-8-A2-B2",
  //   ],
  //   [
  //     null,
  //     null,
  //     null,
  //     null
  //   ],
  //   [
  //     null,
  //     null
  //   ],
  //   [
  //     null
  //   ]
  // ],

  // // 5小组
  // "group_stage": {
  //   "A": [],
  //   "B": [],
  //   "C": [],
  //   "D": [],
  //   "E": [],
  // },
  // "knockout_stage": [
  //   [
  //     "K-8-A1-B3",
  //     "K-8-C1-D3",
  //     "K-8-E1-A3/A4/B4/C4",
  //     "K-8-B2-C2",

  //     "K-8-B1-A3/D4/E4",
  //     "K-8-D1-E3",
  //     "K-8-A2-D2",
  //     "K-8-E2-C3",
  //   ],
  //   [
  //     null,
  //     null,
  //     null,
  //     null
  //   ],
  //   [
  //     null,
  //     null
  //   ],
  //   [
  //     null
  //   ]
  // ],
};

const numGroups = Object.keys(outputJson.group_stage).length;
// const qualifyPerGroup = 2;
// const numQualifyForKnockout = numGroups * qualifyPerGroup;


if (process.argv.length === 3) {
  if (process.argv[2] === 'clear') {
    console.log('Clear config file.');
    outputJson['knockout_stage'] = null;
    fs.writeFileSync(kAutogenConfigFileName, JSON.stringify(outputJson, null, 2));
    return;
  }
}

const rawdata = fs.readFileSync(kPlayerFileName);
const players = JSON.parse(rawdata).players;

// Shuffle
function shuffle(p) {
  return p.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const shuffled = shuffle(players);

// Divide into groups

const numPlayers = players.length;
const groupSizeBase = Math.floor(numPlayers / numGroups);

let numGroupsWithOneMorePlayer = numPlayers - groupSizeBase * numGroups;

console.log(`
球星人数：${numPlayers}，分成${numGroups}组：
${numGroupsWithOneMorePlayer}组${groupSizeBase + 1}人
${numGroups - numGroupsWithOneMorePlayer}组${groupSizeBase}人
`);

let offset = 0;

const games = outputJson.games;

for (const g in outputJson.group_stage) {
  const a = outputJson.group_stage[g];
  for (let i = 0; i < groupSizeBase; i++) {
    a.push(shuffled[i + offset]);
  }
  offset += groupSizeBase;

  if (numGroupsWithOneMorePlayer > 0) {
    a.push(shuffled[offset]);
    offset++;
    numGroupsWithOneMorePlayer--;
  }

  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      games[`G-${g}-${a[i]}-${a[j]}`] = [];
    }
  }
}

// fs.writeFileSync(kAutogenConfigFileName, JSON.stringify(outputJson));
fs.writeFileSync(kAutogenConfigFileName, JSON.stringify(outputJson, null, 2));
