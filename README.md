# GSF球队内部网站更新指南

By shrekshao狄学长

更多细节功能请参考[这篇文档](https://github.com/super-unprofessional-league/super-unprofessional-league-website/blob/master/README.md)（欢迎贡献）


[![Netlify Status](https://api.netlify.com/api/v1/badges/ece017b0-680e-49d1-b5b2-7b5e322d64c1/deploy-status)](https://app.netlify.com/sites/gsffc/deploys)

目前网站部署在netlify上。会自动拾取`main` branch 进行build。

primary custom domain为 https://www.gsffc.org

现在 https://gsffc.github.io 也会redirect到新的域名。所以`gh-pages` branch现在不用了。

## 如果在本地预览

* 安装 [Jekyll](https://jekyllrb.com/docs/) (参考Jekyll官方文档)
* `bundle install`
* `bundle exec jekyll serve`
* 浏览器打开`localhost:4000`
* 确保build没有问题，各方面满意后git add/commit/..., 可以直接push到main上。不需要review。

## 如果老子不想配环境的话

* 建议通过fork repo后提交pull request的方式进行改动（以防止build失败）。

## 添加战报

* `_posts/` 目录下复制粘贴一个以前的post进行修改最方便
* 文件名称格式 `2022-07-30-title-blablabla.md`
* 如果是针对一场比赛的战报，`season_key`和`game_key`填入对应比赛数值即可生成一个formatted比赛链接。否则可以删掉这两个field
* 图片放置在`assets/img/news`目录下，欢迎新建subfolder
* `![](/assets/img/news/first-champion/r3-squad.png){:.centered}`以插入图片（`{.centered}`是ref一个css class用来居中）
* 带描述文字的图片也可以这样添加`{% include imgdesc.html url="assets/img/news/bio/ningguanghan-1.gif" description="Dribbling / solo goals" %}`
* 样例
```
---
layout: game_post
season_key: "22q3-1"
game_key: "2022-07-23-1"

title:  "克星神威再现造三球！榜首大战GSF 3:2 逆转绝杀SBK"
categories: news
tags: 战报 9人制 22校联杯
author: 狄克
---

*文 某位球星*

2022校联杯第三比赛日，一日双赛，第三轮GSF迎来榜首大战，对阵两场同积6分的SouthBay Knight。
GSF最终3:2逆转绝杀SBK。玄宗助攻Kevin 李峰两度扳平比分，并在90分钟杀入禁区完成绝杀，再现曾经对SBK帽子戏法的克星本色！

![](/assets/img/news/first-champion/r3-squad.png){:.centered}

此战由洪泽指导指挥。。。

{% include imgdesc.html url="assets/img/news/bio/ningguanghan-1.gif" description="Dribbling / solo goals" %}

```

## 添加比赛

* 路径和文件名`_data/seasons/22q4/games/2022-08-06-1234.json`（复制一个修改即可）
* 如有youtube上的视频，只需要复制`https://www.youtube.com/watch?v=SUJhUunlCU8`的v=后面部分替换就行。
* 队伍Key对应的`_data/seasons/22q4/teams/`下的json文件名（将`22q4`更换为需要的赛季）。
* 球员名称对应相应队伍json文件中的name。如果是其他队不认识的人进球之类，可以用`"??"`，这样插件不会去寻找这个球员。
* 若为小组赛比赛`type`要包含`group`字样（`groupo-r2`翻译为小组赛第二轮）。联赛比赛无所谓，可以写个轮数`#2`（会翻译为"第2轮"，目前使用的多语言插件似乎没有escape或高级的format的功能）。
* 支持的比赛事件列在下面的样例里了。复制粘贴依样画葫芦就行。
* 比分要手填并非自动计算（照顾其他队不知道进球事件只知道比分的情况）
* 样例
```
{
    "date": "2022-07-16 04:00PM",
    "type": "group-r1",
    "videos": [
        "<iframe src=\"https://www.youtube.com/embed/wDIlQnrIDl0\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
    ],
    "home": {
        "key": "GSF",
        "score": 2,
        "events": [
            {"type": "goal", "time": 17, "player": "狄克", "assist": "杨帆"}
            ,{"type": "penalty", "time": 49, "player": "狄克"}
            ,{"type": "off", "time": 50, "player": "狄克", "sub": "王金鹏"}
            ,{"type": "yellow", "time": 51, "player": "狄克"}
            ,{"type": "red", "time": 52, "player": "狄克"}
        ],
        "squad": [
            {"name": "锡麟", "locator": "GK"}
            ,{"name": "Colin", "locator": "LCB"}
            ,{"name": "张自然", "locator": "RCB"}
            ,{"name": "王政", "locator": "LM"}
            ,{"name": "张一宁", "locator": "CDM"}
            ,{"name": "狄克", "locator": "RM"}
            ,{"name": "Kevin", "locator": "CAM"}
        ]
        ,"bench": [
            {"name": "Ted"}
            ,{"name": "庭朝"}
            ,{"name": "杨帆"}
            ,{"name": "Xuan"}
            ,{"name": "杜若衡"}
            ,{"name": "文韬"}
            ,{"name": "刘喆"}
            ,{"name": "Max"}
            ,{"name": "李峰"}
        ]
    },
    "away": {
        "key": "CMU",
        "score": 2,
        "events": [
            {"type": "owngoal", "time": 18, "player": "狄克"}
            ,{"type": "goal", "time": 90, "player": "??"}
        ],
        "squad": []
    }
}
```

## 添加赛季(TODO)