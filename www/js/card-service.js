/**
 * Created by Charles on 5/17/16.
 */
'use strict';

var ydCardService = angular.module('ydCardService', []);

ydCardService.service('ydCardService', ['$q',
  function ($q) {
    // Preloaded cards directory.
    var preloaded_cards = {
      "path": "../card-assets",
      "children": [{
        "path": "../card-assets/01-我需要帮助",
        "children": ["../card-assets/01-我需要帮助/01-帮我擦脸.xydcard", "../card-assets/01-我需要帮助/02-帮我擦手.xydcard", "../card-assets/01-我需要帮助/03-帮我擦眼镜.xydcard", "../card-assets/01-我需要帮助/04-帮我冲马桶.xydcard", "../card-assets/01-我需要帮助/05-帮我打开.xydcard", "../card-assets/01-我需要帮助/06-帮我关上.xydcard", "../card-assets/01-我需要帮助/07-帮我给妈妈打电话.xydcard", "../card-assets/01-我需要帮助/08-帮我拿过来.xydcard", "../card-assets/01-我需要帮助/09-帮我梳头.xydcard", "../card-assets/01-我需要帮助/10-帮我修理好.xydcard", "../card-assets/01-我需要帮助/11-带我回家.xydcard", "../card-assets/01-我需要帮助/12-帮我剪指甲.xydcard"]
      }, {
        "path": "../card-assets/02-自理",
        "children": ["../card-assets/02-自理/01-我想上厕所.xydcard", "../card-assets/02-自理/02-我想大便.xydcard", "../card-assets/02-自理/03-我想尿尿.xydcard", "../card-assets/02-自理/04-我想穿衣服.xydcard", "../card-assets/02-自理/05-我想脱衣服.xydcard", "../card-assets/02-自理/06-我想剪指甲.xydcard", "../card-assets/02-自理/07-我想梳头.xydcard", "../card-assets/02-自理/08-我想洗脸.xydcard", "../card-assets/02-自理/09-我想洗手.xydcard", "../card-assets/02-自理/10-我想刷牙.xydcard", "../card-assets/02-自理/11-我想洗澡.xydcard", "../card-assets/02-自理/12-我需要纸.xydcard", "../card-assets/02-自理/13-我想戴眼镜.xydcard"]
      }, {
        "path": "../card-assets/03-我走丢了",
        "children": ["../card-assets/03-我走丢了/01-我走丢了.xydcard", "../card-assets/03-我走丢了/02-请给我妈妈打电话.xydcard", "../card-assets/03-我走丢了/03-请送我回家.xydcard"]
      }, {
        "path": "../card-assets/04-我想玩",
        "children": ["../card-assets/04-我想玩/01-我想玩电脑.xydcard", "../card-assets/04-我想玩/02-我想听音乐.xydcard", "../card-assets/04-我想玩/03-我想玩滑梯.xydcard", "../card-assets/04-我想玩/04-我想去游泳.xydcard", "../card-assets/04-我想玩/05-我想吹泡泡.xydcard", "../card-assets/04-我想玩/06-我想去散步.xydcard", "../card-assets/04-我想玩/07-我想玩车.xydcard", "../card-assets/04-我想玩/08-我想玩机器人.xydcard", "../card-assets/04-我想玩/09-我想玩积木.xydcard", "../card-assets/04-我想玩/10-我想玩拼图.xydcard", "../card-assets/04-我想玩/11-我想玩跷跷板.xydcard", "../card-assets/04-我想玩/12-我想玩球.xydcard", "../card-assets/04-我想玩/13-我想玩沙子.xydcard", "../card-assets/04-我想玩/14-我想玩捉迷藏.xydcard", "../card-assets/04-我想玩/15-我想玩ipad.xydcard", "../card-assets/04-我想玩/16-我要玩布娃娃.xydcard"]
      }, {
        "path": "../card-assets/05-感情表达",
        "children": ["../card-assets/05-感情表达/01-我不喜欢.xydcard", "../card-assets/05-感情表达/02-我喜欢你.xydcard", "../card-assets/05-感情表达/03-我想你.xydcard", "../card-assets/05-感情表达/04-别碰我.xydcard", "../card-assets/05-感情表达/05-别碰我东西.xydcard", "../card-assets/05-感情表达/06-停.xydcard", "../card-assets/05-感情表达/07-你小声点.xydcard", "../card-assets/05-感情表达/08-你大声点.xydcard", "../card-assets/05-感情表达/09-好吃.xydcard", "../card-assets/05-感情表达/10-它是我的.xydcard", "../card-assets/05-感情表达/11-你别走.xydcard", "../card-assets/05-感情表达/12-再多陪我一会.xydcard", "../card-assets/05-感情表达/13-抱抱我.xydcard", "../card-assets/05-感情表达/14-好玩儿.xydcard", "../card-assets/05-感情表达/15-你陪我玩.xydcard"]
      }, {
        "path": "../card-assets/06-回答",
        "children": ["../card-assets/06-回答/01-不.xydcard", "../card-assets/06-回答/02-对.xydcard", "../card-assets/06-回答/03-是.xydcard", "../card-assets/06-回答/04-行.xydcard", "../card-assets/06-回答/05-要.xydcard", "../card-assets/06-回答/06-不对.xydcard", "../card-assets/06-回答/07-不行.xydcard", "../card-assets/06-回答/08-不要.xydcard", "../card-assets/06-回答/09-不是.xydcard", "../card-assets/06-回答/10-不想.xydcard", "../card-assets/06-回答/11-我不知道.xydcard", "../card-assets/06-回答/12-我忘了.xydcard", "../card-assets/06-回答/13-我不想说.xydcard", "../card-assets/06-回答/14-我不想做.xydcard", "../card-assets/06-回答/15-哎我在这儿.xydcard", "../card-assets/06-回答/16-我不想去.xydcard", "../card-assets/06-回答/17-您叫我什么事.xydcard", "../card-assets/06-回答/18-我听见了等一下.xydcard"]
      }, {
        "path": "../card-assets/07-感觉不舒服",
        "children": ["../card-assets/07-感觉不舒服/01-太吵了.xydcard", "../card-assets/07-感觉不舒服/02-太饿了.xydcard", "../card-assets/07-感觉不舒服/03-太渴了.xydcard", "../card-assets/07-感觉不舒服/04-太困了.xydcard", "../card-assets/07-感觉不舒服/05-太累了.xydcard", "../card-assets/07-感觉不舒服/06-我听不清楚.xydcard", "../card-assets/07-感觉不舒服/07-我看不清楚.xydcard", "../card-assets/07-感觉不舒服/08-太冷了.xydcard", "../card-assets/07-感觉不舒服/09-太热了.xydcard", "../card-assets/07-感觉不舒服/10-太晒了.xydcard", "../card-assets/07-感觉不舒服/11-太黑了.xydcard", "../card-assets/07-感觉不舒服/12-太亮了.xydcard", "../card-assets/07-感觉不舒服/13-太湿了.xydcard", "../card-assets/07-感觉不舒服/14-全身不舒服.xydcard"]
      }, {
        "path": "../card-assets/08-心情",
        "children": ["../card-assets/08-心情/01-我很高兴.xydcard", "../card-assets/08-心情/02-我很伤心.xydcard", "../card-assets/08-心情/03-我很生气.xydcard", "../card-assets/08-心情/04-我很兴奋.xydcard", "../card-assets/08-心情/05-我很害怕.xydcard", "../card-assets/08-心情/06-我很自豪.xydcard", "../card-assets/08-心情/07-笑了.xydcard", "../card-assets/08-心情/08-哭了.xydcard", "../card-assets/08-心情/09-我想一个人呆会.xydcard", "../card-assets/08-心情/10-我要找妈妈.xydcard", "../card-assets/08-心情/11-我想回家.xydcard"]
      }, {
        "path": "../card-assets/09-衣服不舒服",
        "children": ["../card-assets/09-衣服不舒服/01-太紧了.xydcard", "../card-assets/09-衣服不舒服/02-太松了.xydcard", "../card-assets/09-衣服不舒服/03-我不喜欢这个颜色.xydcard", "../card-assets/09-衣服不舒服/04-太长了.xydcard", "../card-assets/09-衣服不舒服/05-太短了.xydcard", "../card-assets/09-衣服不舒服/06-有东西扎我.xydcard"]
      }, {
        "path": "../card-assets/10-有人欺负我",
        "children": ["../card-assets/10-有人欺负我/01-他太凶了.xydcard", "../card-assets/10-有人欺负我/02-他打我.xydcard", "../card-assets/10-有人欺负我/03-他骂我.xydcard", "../card-assets/10-有人欺负我/04-他抢我东西.xydcard", "../card-assets/10-有人欺负我/05-他推我.xydcard", "../card-assets/10-有人欺负我/06-他骗我.xydcard", "../card-assets/10-有人欺负我/07-他笑话我.xydcard", "../card-assets/10-有人欺负我/08-他咬我.xydcard"]
      }, {
        "path": "../card-assets/11-我不想做",
        "children": ["../card-assets/11-我不想做/01-不是时候.xydcard", "../card-assets/11-我不想做/02-太难了.xydcard", "../card-assets/11-我不想做/03-太容易了.xydcard", "../card-assets/11-我不想做/04-太无聊了.xydcard", "../card-assets/11-我不想做/05-我还没准备好.xydcard", "../card-assets/11-我不想做/06-以前做过了.xydcard"]
      }, {
        "path": "../card-assets/12-疼痛",
        "children": ["../card-assets/12-疼痛/01-你把我弄疼了.xydcard", "../card-assets/12-疼痛/02-我牙疼.xydcard", "../card-assets/12-疼痛/03-我摔跤了.xydcard", "../card-assets/12-疼痛/04-我被狗咬了.xydcard", "../card-assets/12-疼痛/05-我头疼.xydcard", "../card-assets/12-疼痛/06-我肚子疼.xydcard", "../card-assets/12-疼痛/07-我屁股疼.xydcard", "../card-assets/12-疼痛/08-我腿疼.xydcard", "../card-assets/12-疼痛/09-我手疼.xydcard", "../card-assets/12-疼痛/10-我胳膊疼.xydcard", "../card-assets/12-疼痛/11-我耳朵疼.xydcard", "../card-assets/12-疼痛/12-我眼睛疼.xydcard"]
      }, {
        "path": "../card-assets/13-痒痒",
        "children": ["../card-assets/13-痒痒/01-我身上痒.xydcard", "../card-assets/13-痒痒/02-我被蚊子咬了.xydcard", "../card-assets/13-痒痒/03-我头痒.xydcard", "../card-assets/13-痒痒/04-我眼睛痒.xydcard", "../card-assets/13-痒痒/05-我脚痒.xydcard", "../card-assets/13-痒痒/06-我耳朵痒.xydcard"]
      }, {
        "path": "../card-assets/14-提问",
        "children": ["../card-assets/14-提问/01-你叫什么名字.xydcard", "../card-assets/14-提问/02-你几岁.xydcard", "../card-assets/14-提问/03-我妈妈在哪儿.xydcard", "../card-assets/14-提问/04-你要带我去哪儿.xydcard", "../card-assets/14-提问/05-你怎么了.xydcard", "../card-assets/14-提问/06-你不舒服吗.xydcard", "../card-assets/14-提问/07-这是什么.xydcard", "../card-assets/14-提问/08-为什么呢.xydcard", "../card-assets/14-提问/09-你去哪儿.xydcard", "../card-assets/14-提问/10-你生气了吗.xydcard", "../card-assets/14-提问/11-你要吗.xydcard", "../card-assets/14-提问/12-你吃吗.xydcard", "../card-assets/14-提问/13-你喝吗.xydcard"]
      }, {
        "path": "../card-assets/15-礼貌用语",
        "children": ["../card-assets/15-礼貌用语/01-谢谢.xydcard", "../card-assets/15-礼貌用语/02-您好.xydcard", "../card-assets/15-礼貌用语/03-再见.xydcard", "../card-assets/15-礼貌用语/04-对不起.xydcard", "../card-assets/15-礼貌用语/05-没关系.xydcard", "../card-assets/15-礼貌用语/06-我错了.xydcard", "../card-assets/15-礼貌用语/07-我不是故意的.xydcard", "../card-assets/15-礼貌用语/08-我不知道.xydcard", "../card-assets/15-礼貌用语/09-请坐.xydcard"]
      }, {
        "path": "../card-assets/16-交流",
        "children": ["../card-assets/16-交流/01-我找我妈妈.xydcard", "../card-assets/16-交流/02-你看.xydcard", "../card-assets/16-交流/03-你听.xydcard", "../card-assets/16-交流/04-请再说一遍.xydcard", "../card-assets/16-交流/05-我不会说话.xydcard", "../card-assets/16-交流/06-给你.xydcard", "../card-assets/16-交流/07-你吃.xydcard", "../card-assets/16-交流/08-你喝.xydcard", "../card-assets/16-交流/09-你做.xydcard", "../card-assets/16-交流/10-请你起床.xydcard"]
      }, {
        "path": "../card-assets/17-吃喝",
        "children": ["../card-assets/17-吃喝/01-我想吃饭.xydcard", "../card-assets/17-吃喝/02-我想喝水.xydcard", "../card-assets/17-吃喝/03-我吃饱了.xydcard", "../card-assets/17-吃喝/04-我不吃了.xydcard", "../card-assets/17-吃喝/05-我不喝了.xydcard", "../card-assets/17-吃喝/06-我想吃面.xydcard", "../card-assets/17-吃喝/07-我想吃水果.xydcard", "../card-assets/17-吃喝/08-我想吃糖.xydcard", "../card-assets/17-吃喝/09-我想吃饼干.xydcard", "../card-assets/17-吃喝/10-我想喝果汁.xydcard", "../card-assets/17-吃喝/11-我想喝牛奶.xydcard", "../card-assets/17-吃喝/12-我想要吸管.xydcard", "../card-assets/17-吃喝/13-我想要筷子.xydcard", "../card-assets/17-吃喝/14-我想要勺子.xydcard", "../card-assets/17-吃喝/15-我想要碗.xydcard"]
      }, {
        "path": "../card-assets/18-穿着",
        "children": ["../card-assets/18-穿着/01-衬衣.xydcard", "../card-assets/18-穿着/02-短裤.xydcard", "../card-assets/18-穿着/03-T恤.xydcard", "../card-assets/18-穿着/04-袜子.xydcard", "../card-assets/18-穿着/05-内裤.xydcard", "../card-assets/18-穿着/06-鞋.xydcard", "../card-assets/18-穿着/07-凉鞋.xydcard", "../card-assets/18-穿着/08-球鞋.xydcard", "../card-assets/18-穿着/09-外套.xydcard", "../card-assets/18-穿着/10-秋衣.xydcard", "../card-assets/18-穿着/11-长裤.xydcard", "../card-assets/18-穿着/12-裙子.xydcard", "../card-assets/18-穿着/13-手套.xydcard", "../card-assets/18-穿着/14-帽子.xydcard", "../card-assets/18-穿着/15-围巾.xydcard"]
      }, {
        "path": "../card-assets/19-我想看电视",
        "children": ["../card-assets/19-我想看电视/01-我想看动画片.xydcard", "../card-assets/19-我想看电视/02-我想看喜羊羊.xydcard", "../card-assets/19-我想看电视/03-我想看熊出没.xydcard", "../card-assets/19-我想看电视/04-我想看机器人.xydcard", "../card-assets/19-我想看电视/05-我想看新闻.xydcard", "../card-assets/19-我想看电视/06-我想看广告.xydcard"]
      }, {
        "path": "../card-assets/20-学习",
        "children": ["../card-assets/20-学习/01-我想认字.xydcard", "../card-assets/20-学习/02-我要写字.xydcard", "../card-assets/20-学习/03-我要画画.xydcard", "../card-assets/20-学习/04-我想认卡片.xydcard", "../card-assets/20-学习/05-我想讲故事.xydcard"]
      }, {
        "path": "../card-assets/21-我想去",
        "children": ["../card-assets/21-我想去/01-我想去幼儿园.xydcard", "../card-assets/21-我想去/02-我想去游乐场.xydcard", "../card-assets/21-我想去/03-我想去动物园.xydcard", "../card-assets/21-我想去/04-我想去餐馆.xydcard", "../card-assets/21-我想去/05-我想去超市.xydcard", "../card-assets/21-我想去/06-我想去学校.xydcard", "../card-assets/21-我想去/07-我想去奶奶家.xydcard", "../card-assets/21-我想去/08-我想去外公家.xydcard", "../card-assets/21-我想去/09-我想去公园.xydcard", "../card-assets/21-我想去/10-我想去电影院.xydcard", "../card-assets/21-我想去/11-我想去海滩.xydcard"]
      }, {
        "path": "../card-assets/22-乘坐交通工具",
        "children": ["../card-assets/22-乘坐交通工具/01-我想坐公交车.xydcard", "../card-assets/22-乘坐交通工具/02-我想坐地铁.xydcard", "../card-assets/22-乘坐交通工具/03-我想坐飞机.xydcard", "../card-assets/22-乘坐交通工具/04-我想坐火车.xydcard", "../card-assets/22-乘坐交通工具/05-我想坐船.xydcard"]
      }, {
        "path": "../card-assets/23-味觉",
        "children": ["../card-assets/23-味觉/01-这是酸的.xydcard", "../card-assets/23-味觉/02-这是甜的.xydcard", "../card-assets/23-味觉/03-这是苦的.xydcard", "../card-assets/23-味觉/04-这是辣的.xydcard", "../card-assets/23-味觉/05-这是咸的.xydcard"]
      }, {
        "path": "../card-assets/24-东西丢了",
        "children": ["../card-assets/24-东西丢了/01-我的玩具丢了.xydcard", "../card-assets/24-东西丢了/02-我的书丢了.xydcard", "../card-assets/24-东西丢了/03-我的车丢了.xydcard", "../card-assets/24-东西丢了/04-我的衣服丢了.xydcard"]
      }, {
        "path": "../card-assets/25-亲人",
        "children": ["../card-assets/25-亲人/01-爸爸.xydcard", "../card-assets/25-亲人/02-妈妈.xydcard", "../card-assets/25-亲人/03-哥哥.xydcard", "../card-assets/25-亲人/04-弟弟.xydcard", "../card-assets/25-亲人/05-姐姐.xydcard", "../card-assets/25-亲人/06-妹妹.xydcard", "../card-assets/25-亲人/07-爷爷.xydcard", "../card-assets/25-亲人/08-奶奶.xydcard", "../card-assets/25-亲人/09-姥爷.xydcard", "../card-assets/25-亲人/10-姥姥.xydcard"]
      }, {
        "path": "../card-assets/26-汉语拼音",
        "children": ["../card-assets/26-汉语拼音/01-a.xydcard", "../card-assets/26-汉语拼音/02-o.xydcard", "../card-assets/26-汉语拼音/03-e.xydcard", "../card-assets/26-汉语拼音/04-i.xydcard", "../card-assets/26-汉语拼音/05-u.xydcard", "../card-assets/26-汉语拼音/06-v.xydcard", "../card-assets/26-汉语拼音/07-ai.xydcard", "../card-assets/26-汉语拼音/08-ei.xydcard", "../card-assets/26-汉语拼音/09-ui.xydcard", "../card-assets/26-汉语拼音/10-ao.xydcard", "../card-assets/26-汉语拼音/11-ou.xydcard", "../card-assets/26-汉语拼音/12-iu.xydcard", "../card-assets/26-汉语拼音/13-ie.xydcard", "../card-assets/26-汉语拼音/14-ve.xydcard", "../card-assets/26-汉语拼音/15-er.xydcard", "../card-assets/26-汉语拼音/16-an.xydcard", "../card-assets/26-汉语拼音/17-en.xydcard", "../card-assets/26-汉语拼音/18-in.xydcard", "../card-assets/26-汉语拼音/19-un.xydcard", "../card-assets/26-汉语拼音/20-ang.xydcard", "../card-assets/26-汉语拼音/21-eng.xydcard", "../card-assets/26-汉语拼音/22-ing.xydcard", "../card-assets/26-汉语拼音/23-ong.xydcard", "../card-assets/26-汉语拼音/24-b.xydcard", "../card-assets/26-汉语拼音/25-p.xydcard", "../card-assets/26-汉语拼音/26-m.xydcard", "../card-assets/26-汉语拼音/27-f.xydcard", "../card-assets/26-汉语拼音/28-d.xydcard", "../card-assets/26-汉语拼音/29-t.xydcard", "../card-assets/26-汉语拼音/30-n.xydcard", "../card-assets/26-汉语拼音/31-l.xydcard", "../card-assets/26-汉语拼音/32-g.xydcard", "../card-assets/26-汉语拼音/33-k.xydcard", "../card-assets/26-汉语拼音/34-h.xydcard", "../card-assets/26-汉语拼音/35-j.xydcard", "../card-assets/26-汉语拼音/36-q.xydcard", "../card-assets/26-汉语拼音/37-x.xydcard", "../card-assets/26-汉语拼音/38-zh.xydcard", "../card-assets/26-汉语拼音/39-ch.xydcard", "../card-assets/26-汉语拼音/40-sh.xydcard", "../card-assets/26-汉语拼音/41-r.xydcard", "../card-assets/26-汉语拼音/42-z.xydcard", "../card-assets/26-汉语拼音/43-c.xydcard", "../card-assets/26-汉语拼音/44-s.xydcard", "../card-assets/26-汉语拼音/45-y.xydcard", "../card-assets/26-汉语拼音/46-w.xydcard", "../card-assets/26-汉语拼音/47-zhi.xydcard", "../card-assets/26-汉语拼音/48-chi.xydcard", "../card-assets/26-汉语拼音/49-shi.xydcard", "../card-assets/26-汉语拼音/50-ri.xydcard", "../card-assets/26-汉语拼音/51-zi.xydcard", "../card-assets/26-汉语拼音/52-ci.xydcard", "../card-assets/26-汉语拼音/53-si.xydcard", "../card-assets/26-汉语拼音/54-yi.xydcard", "../card-assets/26-汉语拼音/55-wu.xydcard", "../card-assets/26-汉语拼音/56-yu.xydcard", "../card-assets/26-汉语拼音/57-ye.xydcard", "../card-assets/26-汉语拼音/58-yue.xydcard", "../card-assets/26-汉语拼音/59-yuan.xydcard", "../card-assets/26-汉语拼音/60-yin.xydcard", "../card-assets/26-汉语拼音/61-yun.xydcard", "../card-assets/26-汉语拼音/62-ying.xydcard"]
      }, {
        "path": "../card-assets/27-水果",
        "children": ["../card-assets/27-水果/01-草莓.xydcard", "../card-assets/27-水果/02-橙子.xydcard", "../card-assets/27-水果/03-梨.xydcard", "../card-assets/27-水果/04-芒果.xydcard", "../card-assets/27-水果/05-苹果.xydcard", "../card-assets/27-水果/06-葡萄.xydcard", "../card-assets/27-水果/07-石榴.xydcard", "../card-assets/27-水果/08-桃子.xydcard", "../card-assets/27-水果/09-西瓜.xydcard", "../card-assets/27-水果/10-香蕉.xydcard"]
      }, {
        "path": "../card-assets/28-动物",
        "children": ["../card-assets/28-动物/01-大象.xydcard", "../card-assets/28-动物/02-鳄鱼.xydcard", "../card-assets/28-动物/03-狗.xydcard", "../card-assets/28-动物/04-海豹.xydcard", "../card-assets/28-动物/05-海龟.xydcard", "../card-assets/28-动物/06-海星.xydcard", "../card-assets/28-动物/07-猴子.xydcard", "../card-assets/28-动物/08-老虎.xydcard", "../card-assets/28-动物/09-猫.xydcard", "../card-assets/28-动物/10-螃蟹.xydcard", "../card-assets/28-动物/11-鲨鱼.xydcard", "../card-assets/28-动物/12-蛇.xydcard", "../card-assets/28-动物/13-狮子.xydcard", "../card-assets/28-动物/14-鱼.xydcard", "../card-assets/28-动物/15-长颈鹿.xydcard"]
      }, {
        "path": "../card-assets/29-交通工具",
        "children": ["../card-assets/29-交通工具/01-飞机.xydcard", "../card-assets/29-交通工具/02-公共汽车.xydcard", "../card-assets/29-交通工具/03-火车.xydcard", "../card-assets/29-交通工具/04-吉普车.xydcard", "../card-assets/29-交通工具/05-警车.xydcard", "../card-assets/29-交通工具/06-救护车.xydcard", "../card-assets/29-交通工具/07-轮船.xydcard", "../card-assets/29-交通工具/08-摩托车.xydcard", "../card-assets/29-交通工具/09-消防车.xydcard", "../card-assets/29-交通工具/10-小汽车.xydcard", "../card-assets/29-交通工具/11-自行车.xydcard"]
      }, {
        "path": "../card-assets/30-数字",
        "children": ["../card-assets/30-数字/01-0.xydcard", "../card-assets/30-数字/02-1.xydcard", "../card-assets/30-数字/03-2.xydcard", "../card-assets/30-数字/04-3.xydcard", "../card-assets/30-数字/05-4.xydcard", "../card-assets/30-数字/06-5.xydcard", "../card-assets/30-数字/07-6.xydcard", "../card-assets/30-数字/08-7.xydcard", "../card-assets/30-数字/09-8.xydcard", "../card-assets/30-数字/10-9.xydcard", "../card-assets/30-数字/11-10.xydcard"]
      }, {
        "path": "../card-assets/31-Numbers",
        "children": ["../card-assets/31-Numbers/01-0.xydcard", "../card-assets/31-Numbers/02-1.xydcard", "../card-assets/31-Numbers/03-2.xydcard", "../card-assets/31-Numbers/04-3.xydcard", "../card-assets/31-Numbers/05-4.xydcard", "../card-assets/31-Numbers/06-5.xydcard", "../card-assets/31-Numbers/07-6.xydcard", "../card-assets/31-Numbers/08-7.xydcard", "../card-assets/31-Numbers/09-8.xydcard", "../card-assets/31-Numbers/10-9.xydcard", "../card-assets/31-Numbers/11-10.xydcard", "../card-assets/31-Numbers/12-11.xydcard", "../card-assets/31-Numbers/13-12.xydcard", "../card-assets/31-Numbers/14-13.xydcard", "../card-assets/31-Numbers/15-14.xydcard", "../card-assets/31-Numbers/16-15.xydcard", "../card-assets/31-Numbers/17-16.xydcard", "../card-assets/31-Numbers/18-17.xydcard", "../card-assets/31-Numbers/19-18.xydcard", "../card-assets/31-Numbers/20-19.xydcard", "../card-assets/31-Numbers/21-20.xydcard", "../card-assets/31-Numbers/22-100.xydcard", "../card-assets/31-Numbers/23-200.xydcard", "../card-assets/31-Numbers/24-1000.xydcard", "../card-assets/31-Numbers/25-2000.xydcard", "../card-assets/31-Numbers/26-10000.xydcard", "../card-assets/31-Numbers/27-20000.xydcard", "../card-assets/31-Numbers/28-1000000.xydcard", "../card-assets/31-Numbers/29-2000000.xydcard"]
      }, {
        "path": "../card-assets/32-字母",
        "children": ["../card-assets/32-字母/01-A.xydcard", "../card-assets/32-字母/02-B.xydcard", "../card-assets/32-字母/03-C.xydcard", "../card-assets/32-字母/04-D.xydcard", "../card-assets/32-字母/05-E.xydcard", "../card-assets/32-字母/06-F.xydcard", "../card-assets/32-字母/07-G.xydcard", "../card-assets/32-字母/08-H.xydcard", "../card-assets/32-字母/09-I.xydcard", "../card-assets/32-字母/10-J.xydcard", "../card-assets/32-字母/11-K.xydcard", "../card-assets/32-字母/12-L.xydcard", "../card-assets/32-字母/13-M.xydcard", "../card-assets/32-字母/14-N.xydcard", "../card-assets/32-字母/15-O.xydcard", "../card-assets/32-字母/16-P.xydcard", "../card-assets/32-字母/17-Q.xydcard", "../card-assets/32-字母/18-R.xydcard", "../card-assets/32-字母/19-S.xydcard", "../card-assets/32-字母/20-T.xydcard", "../card-assets/32-字母/21-U.xydcard", "../card-assets/32-字母/22-V.xydcard", "../card-assets/32-字母/23-W.xydcard", "../card-assets/32-字母/24-X.xydcard", "../card-assets/32-字母/25-Y.xydcard", "../card-assets/32-字母/26-Z.xydcard"]
      }, {
        "path": "../card-assets/33-颜色",
        "children": ["../card-assets/33-颜色/01-白色.xydcard", "../card-assets/33-颜色/02-橙色.xydcard", "../card-assets/33-颜色/03-粉色.xydcard", "../card-assets/33-颜色/04-黑色.xydcard", "../card-assets/33-颜色/05-红色.xydcard", "../card-assets/33-颜色/06-黄色.xydcard", "../card-assets/33-颜色/07-灰色.xydcard", "../card-assets/33-颜色/08-蓝色.xydcard", "../card-assets/33-颜色/09-绿色.xydcard", "../card-assets/33-颜色/10-紫色.xydcard", "../card-assets/33-颜色/11-棕色.xydcard"]
      }, {
        "path": "../card-assets/34-Colors",
        "children": ["../card-assets/34-Colors/01-black.xydcard", "../card-assets/34-Colors/02-blue.xydcard", "../card-assets/34-Colors/03-brown.xydcard", "../card-assets/34-Colors/04-green.xydcard", "../card-assets/34-Colors/05-grey.xydcard", "../card-assets/34-Colors/06-orange.xydcard", "../card-assets/34-Colors/07-pink.xydcard", "../card-assets/34-Colors/08-purple.xydcard", "../card-assets/34-Colors/09-red.xydcard", "../card-assets/34-Colors/10-white.xydcard", "../card-assets/34-Colors/11-yellow.xydcard"]
      }, {
        "path": "../card-assets/35-形状",
        "children": ["../card-assets/35-形状/01-半圆形.xydcard", "../card-assets/35-形状/02-菱形.xydcard", "../card-assets/35-形状/03-三角形.xydcard", "../card-assets/35-形状/04-扇形.xydcard", "../card-assets/35-形状/05-梯形.xydcard", "../card-assets/35-形状/06-椭圆形.xydcard", "../card-assets/35-形状/07-五边形.xydcard", "../card-assets/35-形状/08-五角星.xydcard", "../card-assets/35-形状/09-圆.xydcard", "../card-assets/35-形状/10-月牙.xydcard", "../card-assets/35-形状/11-长方形.xydcard", "../card-assets/35-形状/12-正方形.xydcard"]
      }, {
        "path": "../card-assets/36-Shapes",
        "children": ["../card-assets/36-Shapes/01-Circle.xydcard", "../card-assets/36-Shapes/02-Triangle.xydcard", "../card-assets/36-Shapes/03-Square.xydcard", "../card-assets/36-Shapes/04-Rectangle.xydcard", "../card-assets/36-Shapes/05-Oval.xydcard", "../card-assets/36-Shapes/06-Diamond.xydcard", "../card-assets/36-Shapes/07-Star.xydcard", "../card-assets/36-Shapes/08-SemiCircle.xydcard", "../card-assets/36-Shapes/09-Crescent.xydcard", "../card-assets/36-Shapes/10-Pentagon.xydcard", "../card-assets/36-Shapes/11-Trapezoid.xydcard"]
      }, {
        "path": "../card-assets/37-DayOfWeek",
        "children": ["../card-assets/37-DayOfWeek/01-Monday.xydcard", "../card-assets/37-DayOfWeek/02-Tuesday.xydcard", "../card-assets/37-DayOfWeek/03-Wednesday.xydcard", "../card-assets/37-DayOfWeek/04-Thursday.xydcard", "../card-assets/37-DayOfWeek/05-Friday.xydcard", "../card-assets/37-DayOfWeek/06-Saturday.xydcard", "../card-assets/37-DayOfWeek/07-Sunday.xydcard"]
      }, {
        "path": "../card-assets/38-MonthOfAYear",
        "children": ["../card-assets/38-MonthOfAYear/01-January.xydcard", "../card-assets/38-MonthOfAYear/02-February.xydcard", "../card-assets/38-MonthOfAYear/03-March.xydcard", "../card-assets/38-MonthOfAYear/04-April.xydcard", "../card-assets/38-MonthOfAYear/05-May.xydcard", "../card-assets/38-MonthOfAYear/06-June.xydcard", "../card-assets/38-MonthOfAYear/07-July.xydcard", "../card-assets/38-MonthOfAYear/08-August.xydcard", "../card-assets/38-MonthOfAYear/09-September.xydcard", "../card-assets/38-MonthOfAYear/10-October.xydcard", "../card-assets/38-MonthOfAYear/11-November.xydcard", "../card-assets/38-MonthOfAYear/12-December.xydcard"]
      }, {
        "path": "../card-assets/39-社交故事",
        "children": ["../card-assets/39-社交故事/01-上课保持安静.xydcard", "../card-assets/39-社交故事/02-乘坐公共汽车.xydcard", "../card-assets/39-社交故事/03-穿衣服.xydcard", "../card-assets/39-社交故事/04-打招呼.xydcard", "../card-assets/39-社交故事/05-理发.xydcard", "../card-assets/39-社交故事/06-生病.xydcard", "../card-assets/39-社交故事/07-说谢谢.xydcard", "../card-assets/39-社交故事/08-洗手.xydcard", "../card-assets/39-社交故事/09-寻求帮助.xydcard", "../card-assets/39-社交故事/10-在家里吃饭.xydcard", "../card-assets/39-社交故事/11-怎样拥抱别人.xydcard"]
      }]
    };

    String.prototype.endsWith = function (suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };


    var getCardListFromPath = function (path) {
      var children;
      var findChildrenOfPath = function (cards) {
        if (path.endsWith('/')) {
          path = path.substring(0, path.length - 1);
        }

        if (cards.path === path) {
          children = cards.children;
          return;
        } else if (typeof cards.children === 'object' && !cards.path.endsWith('.xydcard')) {
          for (var i = 0; i < cards.children.length; i++) {
            if (children) {
              break;
            }
            if (cards.children[i].path) {
              findChildrenOfPath(cards.children[i]);
            }
          }
        }
      };

      findChildrenOfPath(preloaded_cards);

      return $q.when(children);
    };

    var loadAndParseCardFromPath = function (cardPath) {
      return getCardListFromPath(cardPath).then(function (data) {
        return parseList(data);
      });
    };

    var parseList = function (list) {
      var cards = [];
      for (var i = 0; i < list.length; i++) {
        if (typeof list[i] === 'object') {
          var current = list[i].path;
        } else {
          var current = list[i];
        }
        var temp = current.split('/');
        var parent = temp.slice(0, temp.length - 1).join('/');
        var fileName = temp[temp.length - 1];
        if (fileName === "cover.jpg") {// maybe also png?
          console.log("cover found");
        } else if (true/* is folder */) {
          var card = {
            parent: parent,
            name: fileName
          };
          cards.push(card);
        } else {
          console.log('illegal content');
        }
      }
      return cards;
    };

    var parseCard = function (parent, card) {
      // Dummy Card
      var parsedCard = {
        title: card,
        isStack: false,
        images: ['../img/dummy_content.jpg'],
        audios: ['../card-assets/dummy_audio.mp3'],
        seq: -1
      };
      if (card.indexOf('.xydcard', card.length - '.xydcard'.length) !== -1) { // is card
        var seq = +card.split('-')[0];
        var title = card.split('-')[1].split('.xydcard')[0];
        var imagesPath = parent + '/' + card + '/images/';
        var audiosPath = parent + '/' + card + '/audios/';
        parsedCard = {
          title: title || 'dummy card',
          stack: false,
          images: [imagesPath + '1.jpg', imagesPath + '2.jpg', imagesPath + '3.jpg'],
          audios: [audiosPath + '1.mp3'],
          seq: seq || -1
        };
      }
      return $q.when(parsedCard);
    };

    var parseStack = function (stackpath) {
      // var seq = +category.split('-')[0];
      // var catName = category.split('-')[1];
      // var stack = {
      //   title: catName || 'dummy category',
      //   isStack: true,
      //   cover: parent + '/' + category + '/cover.jpg',
      //   path: parent + '/' + category,
      //   seq: seq || -1
      // };
      var stack = {};
      var temp = stackpath.split('/');
      var dirname = temp[temp.length - 1];
      temp = dirname.split('-');
      var stackname = temp[1];
      var seq = +temp[0];

      stack.title = stackname;
      stack.isStack = true;
      stack.cover = stackpath + '/' + 'cover.jpg';
      stack.path = stackpath;
      stack.seq = seq || -1;

      return $q.when(stack);
    };

    /*
     * Generate dummy cards for test.
     */
    var generateCards = function (count) {
      var cards = [];
      for (var i = 0; i < count; i++) {
        var card = {
          title: "Card " + (i + 1),
          stack: false,
          images: ["../img/dummy_content.jpg"],
          audios: []
        };
        cards.push(card);
      }
      return cards;
    };

    // Exports:
    this.loadAndParseCardFromPath = loadAndParseCardFromPath;
    this.parseCard = parseCard;
    this.parseStack = parseStack;
  }]);
