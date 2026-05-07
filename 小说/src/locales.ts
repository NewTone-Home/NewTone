import { Language } from './types';

export const ROUTE_FALLBACK: Record<string, string> = {
  jixiu: '修杰 · 札',
  ruoyu: '若雨 · 筮',
  yunling: '云灵 · 溯',
  chengyuan: '姬承渊 · 藏',
};

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  zh: {
    'app.title': '星际书库',
    'app.subtitle': '跨越维度的文学探索',
    'nav.starMap': '大图书馆',
    'nav.manuscript': '手稿模式',
    'nav.language': '语言',
    'world.genre': '流派',
    'world.wordCount': '字数',
    'world.chapters': '章节',
    'world.enter': '翻阅此书',
    'world.back': '返回书架',
    'world.status.active': '正在阅读',
    'world.status.manuscript': '当前手稿',
    'world.disconnect': '合上书本 / 返回书柜',
    'world.close': '合上书卷 / 返回手稿',
    'transition.entering': '借阅档案',
    'transition.reading': '翻阅卷宗',
    'transition.exiting': '归还至书架',
    'transition.sync': '正在检索馆藏目录...',
    'transition.ink': '追踪命运的墨迹...',
    'transition.terminate': '书籍已归还...',
    'transition.dry': '墨迹已干，故事暂告一段落...',
    'sidebar.timeline': '主线时间轴',
    'sidebar.chapters': '章节列表',
    'reader.loading': '加载中...',
    'reader.end': '本章结束',
    'filter.all': '全部',
    'filter.search': '检索藏书...',
    'settings.viewMode': '视图模式',
    'settings.language': '语言设置',
    'transition.3d': '漫游书海',
    'transition.2d': '纸式手稿',
    'transition.reconfiguring': '整理书架中',
    'transition.rendering': '陈列手稿',
    'world.initiateSync': '借阅此书',
    'world.openPage': '翻开此页',
    'world.hologramInit': '整理借阅档案中...',
    'world.reviewingManuscripts': '审阅手稿中...',
    'app.protocol': '借阅准入登记号',
    'app.manuscript': '手稿 v1.0.0',
    'app.terraIncognita': '未知之地',
    'app.hmsDiscovery': '发现号',
    'app.leviathan': '利维坦',
    'app.mareIgnotum': '无名之海',
    'world.dataLink': '书卷状态::已寻获',
    'world.manuscriptIdentified': '手稿已识别',
    'world.dataStream': '藏书号',
    'world.syncComplete': '借阅准许',
    'world.location': '所在书架',
    'reader.back3D': '归还藏书',
    'reader.back2D': '合上手稿',
    'reader.activeSector': '当前阅读',
    'reader.currentManuscript': '当前手稿',
    'reader.unit': '页册',
    'reader.encrypted': '典藏',
    'reader.words': '字',
    'reader.protocolActive': '准许翻阅',
    'reader.reviewProgress': '阅读进度',
    'app.title3D': '大图书馆',
    'app.title2D': '珍本文库',
    'app.status3D': '阳光明媚，适合阅读',
    'app.status2D': '手稿审阅中',
    'app.sync': '借阅',
    'app.stable': '许可',
    'detail.synopsis3D': '卷宗简介',
    'detail.synopsis2D': '手稿摘要',
    'detail.classification': '世界类别',
    'detail.narrativeUnits': '时光断章',
    'detail.chapters': '卷',
    'detail.progress': '目前记录',
    'transition.descending': '正在降临',
    'transition.syncing': '同步中',
    'transition.tracing': '正在追踪',
    'transition.inking': '正在着墨',
    'transition.disconnecting': '正在断开: ',
    'transition.terminating': '正在终止',
    'transition.closing': '正在合上: ',
    'transition.inkDries': '墨迹已干',
    'reader.syncStable': '同步稳定',
    'reader.inkFlowing': '墨迹流动中',
    'reader.payload': '有效载荷',
    'reader.sync3D': '同步中',
    'reader.sync2D': '渲染中',
    'reader.awaiting': '等待新章节...',
    'lang.zh': '中文',
    'lang.en': '英文',
    'lang.ja': '日文',
    'route.jixiu.label': '姬 修 杰 · 札',
    'route.ruoyu.label': '孙 若 雨 · 筮',
    'route.yunling.label': '姬 云 灵 · 笺',
    'route.chengyuan.label': '姬 承 渊 · 藏',
    'read.back': '返回选角',
    'common.loading': '资源加载中...',
    'read.fontSize': '字号',
    'read.close': '← 合卷',
    'meta.wordCount': '字',
    'meta.appears': '见',
    'settings.fontSize': '字',
    'tool.font': '字',
    'tool.theme': '主题',
    'tool.lang': '语言',
    'fontSize.small': '小',
    'fontSize.medium': '中',
    'fontSize.large': '大',
    'theme.day': '日',
    'theme.night': '夜',
    'sidebar.progress': '进度',
    'sidebar.chaptersUnit': '章',
    'sidebar.chapterPrefix': '第',
    'sidebar.chapterSuffix': '章',
    'sidebar.locked': '未解锁',
    'sidebar.toggle': '收起/展开',
    'sidebar.nextLocked': '未解锁章节',
    'sidebar.readToUnlock': '读完本章解锁',
    'reader.prev': '上一章',
    'reader.next': '下一章 →',
    'reader.placeholder': '📝 本章节内容待补充',
    'jixiu.ch1.subtitle': '表世界四月，上午十点',
    'jixiu.ch2.subtitle': '表世界，深夜',
    'jixiu.ch3.subtitle': '里世界，无名街道',
    'jixiu.cta': '启封 →',
    'jixiu.back': '← 合卷',
    'jixiu.ch1.content': `表世界的四月，上午十点。

姬修杰站在姬家的院子里，阳光穿过老槐树洒下一地碎影。风很轻，带着春天该有的花草味道，一切正常得无可挑剔。

手机屏幕上是三天前老周发来的加密消息，只有一句话：

"陈副部长失踪了。"

陈副部长——里世界知情高层中级别最高的几位之一，在位二十三年，从未失联。老周说失踪没有任何预兆，办公室原封未动，最后被人看到是在一次例行会议上，散会之后人就没了，像人间蒸发了一样。

里世界那边没有通知姬家。

姬修杰也没打算告诉爷爷。

如果让爷爷知道，姬家的机器就会转起来——现场会被清理，知情者会被控制，线索会按照姬家的逻辑筛选一遍，留下他们想让你看到的，过滤掉他们不想让你碰的。

他不要那种真相。

他要自己看到的。

收起手机，穿过院子，走进正厅。光线一暗，供桌上三炷香早已经熄灭，只剩下三个根部伫立在香炉里。供桌后面挂着姬家老祖宗的画像，画像背后是一扇暗门——通往里世界的通道入口。

姬修杰拿掉了旧的三炷香，点了三炷新香插进炉子，双手合了一下。

据说这样能保姬家人在里世界平安。他不信这个，但每次都做。习惯也好，仪式感也好，通道那头的世界总让人觉得需要一点什么东西压一压。

推开暗门，走进通道。

---

通道不长，十几步的距离，但每一步都能感觉到空气在变。

气压低了，温度低了，鼻腔里弥漫起一股淡淡的矿物的味道，表世界里根本没有这种味道，像空气本身被什么浸透了一般。即使来过很多次，这股寒意还是会让他打个寒颤。

通道尽头是一扇旧木门。

门推开，白光扑面。

里世界。晴天第六天。

阳光比表世界亮，亮得不太对——不是暖的那种亮，而是白，过分的白，像被什么东西漂洗过。照在建筑上，照在行人脸上，所有东西都蒙着一层说不出的苍白。

街道和表世界几乎一模一样——同样的布局，同样的路口弧度，连两侧建筑的高度都对得上。但店铺的名字不同，路上的人不同，空气里的味道不同。表世界的四月有花香和草坪的气息，里世界只有那股洗不掉的金属味，淡淡的，无处不在，渗进每一口呼吸里。

明天是晴天最后一天，后天转雨，连下七天。街上的人比平时多不少，趁着最后的好天气出来采购、散步、消磨时间。里世界的人对这个节奏习以为常——七天晴，七天雨，从记事起就是如此，没人觉得奇怪。

姬修杰掏出手机叫了辆车，目的地设在咖啡馆附近。

---

商业街到了。他下车，顺着人流往拐角走。

这条街他在表世界也常来，同样的位置也开着一家咖啡馆，他很喜欢。里世界这边装潢几乎一样，但咖啡的味道不对——带着一股矿物质的底味，像豆子还没烘焙就已经被这片土壤浸透了，别有一种风味。

今天是周六，街上挤得很。

姬修杰低着头快步走，脑子里过着老周那条消息。陈副部长的失踪太干净了——没有预兆，没有挣扎，没有痕迹。会议结束，人就没了。这不像是一个人自己能做到的事情。

姬修杰胸口突然一热。

白色信物在衣服下面微微发光——极淡的，隔着衣服几乎看不出来，但他感觉到了。五年来第一次。

两个信物靠得足够近时才会有这个反应——也就是说，她就在附近。

姬修杰猛地停下脚步，抬头扫视四周。

十点钟方向，大约二十米开外——人流里闪过一个白色的身影。长发，白裙，在人群中一晃而过。他看不清脸，但那个轮廓他不会认错。

五年了。

她失踪的时候十七岁，他十九岁。他翻遍了所有能翻的地方，动用姬家的情报网、里世界的线人，甚至试探过老爷子的私人渠道。所有回答都一样：不知道。

五年来他无数次进入里世界，从来没有遇到过信物发光。一次都没有。

而现在，就在二十米外。

他压住心跳，开始加速穿行。

人太多了。周六的商业街到处是人，每一步都要侧身让位，每一步都有人挡在面前。那个白色的背影在人流中忽隐忽现，越来越远。

他开始跑。挤开身前的路人，绕过一群站在路中间拍照的年轻人，差点撞上一个推婴儿车的女人——

等他冲到她刚才的位置，什么都没有了。

街道还是那条街道，人群还在流动，阳光还是那种过分的白。

她消失得干干净净，像从来没有出现过。

姬修杰站在原地，胸口的信物还残留着一丝温热，正在快速冷却。

他环顾四周。每张脸都是陌生人的脸。

她确实在这里。信物不会骗人。

他很想继续找，但人山人海，无异于大海捞针。

老周还在咖啡馆等他。陈副部长的事还没有着落。

他深吸一口气，转身朝咖啡馆走去。

走了几步，还是忍不住回头看了一眼。

什么都没有。`,
    'jixiu.ch2.content': `咖啡馆在商业街拐角，不大，落地玻璃窗正对着人工湖。姬修杰推门进去，暖气扑面而来，和外面的白光世界像是两个温度。

老周已经到了，坐在最里面靠墙的位置，看着窗外出神.

五十多岁，瘦，花白头发，穿一件洗旧了的深色夹克。中枢院档案管理室的老人，干了二十多年，不起眼，不惹事. 走在街上没人会多看他一眼——正因为如此，很多高层不会亲手碰的东西，反而会经过他的手。

老周面前已经摆了一杯喝了大半的咖啡。他一向掐着午休时间出来——一个钟头，喝杯咖啡聊半段话，回去不会有人追问。姬修杰在柜台给自己点了一杯，端过去坐下。

老周没有寒暄，又喝了口咖啡："消息确认了。陈副部长最后一次露面是上周二的例行会议，散会之后就没人再见过他。办公室没动过，私人物品都在，车停在单位车库。"

"报警了吗？"

"没有。上面压着，不让声张。对外说是出差考察。"

"审批记录呢？"

"没有。系统里查不到任何出差记录。"

姬修杰喝了一口咖啡——还是那个味道，苦味正常，收尾带着一股金属感，像是水源本身就含着矿物成分.

"上面压得这么死？连你也什么都查不出来？"

老周沉默了两秒："也不是没有，但是我也还不能确定。"

"什么意思？"

"失踪之前，陈副部长疑似去过矿区外围。"

姬修杰的眼睛眯了起来。

矿区——里世界最敏感的区域. 晶石开采的核心地带，中枢院直接管辖的共管区，外围是普通矿工作业，核心区则是军事封锁，外人靠不近。而陈副部长管的是成员国之间的联络协调，跟矿区的日常管理没有交集.

"去矿区做什么？"

"不清楚。"老周说，"我是偶然听到的。矿区外围前些年丢过一批晶石转运记录，上面下令在周边加装了一批监控摄像头，后来事情过了也没拆. 我有个老关系在那边管设备维护，前阵子闲聊提了一句，说摄像头拍到过一个像是当官的，在外围老街上出现过。"

"哪条街？"

"矿区外围有条老街，上面有个小馆子，叫永和小馆. 开了很多年了，卖快餐的，附近都是矿工和居民。"老周顿了一下，"那种地方，不是一个副部长该去的。"

姬修杰没说话，指尖在杯壁上轻轻敲了两下。

一个管成员国联络协调的副部长，失踪前出现在矿区共管区外围一个卖快餐的小馆子里。

"去了几次？"

"具体还没查清楚。我那个老关系只是随口提了一嘴，说不止一次。详细的监控记录不归档案室管，归矿区安保管，我得绕一圈才能拿到。"

"尽快。拿到之后第一时间给我。"

老周点了下头。

姬修杰把剩下的咖啡喝完，放下杯子。

"永和小馆，现在还开着吗？"

"应该还在。那条街变化不大。"

姬修杰站起来。

"这件事先压着，不要跟任何人提。"

"知道。"

推开玻璃门，里世界的白光再次涌过来.`,
    'jixiu.ch3.content': `姬修杰没有直接去永和小馆。

他走到湖边，在岸边站了一会儿。风不大，湖面几乎没什么波纹，只是安安静静地反着光——那种过分的白，晃得人眼睛发酸。周围有人在散步，有人坐在长椅上看手机，没人注意到他. 他伸手摸了一下胸口——信物是凉的，和体温一样，像什么都没发生过。

小时候这块信物就没有任何反应。他和妹妹拿着玩过，互相交换过，什么感觉都没有。今天是它第一次有反应。

他掏出手机，翻到老周的对话框。打了几个字，又删掉了。再打，又删. 最后锁屏，揣回口袋。

不是现在。

陈副部长的失踪是眼下最紧的事；妹妹的出现更像是夜空里一闪即逝的东西。两者会不会有什么联系，他说不准，也不敢妄断. 信息不够，他只能先沿着那条更清晰的方向往前走。

他叫了辆网约车. 等了两分钟，一辆灰色的车停在路边，他拉开后门坐进去，报了个地址.

车往西开，窗外的景色在退. 先是咖啡馆和服装店的落地玻璃，然后是围挡和施工路障，最后连行道树都没了，只剩灰扑扑的水泥墙和架在空中的旧管道. 姬修杰在手机上翻出老周发来的定位——矿区外围老街，永和小馆. 街景图里是一排低矮的门面，模糊得看不清招牌. 他把地图放大，记住了周边几条巷子的走向，然后锁屏.

车停在路口，再往里路就窄了，不好开. 姬修杰下车，往老街里走.

脚下从柏油路变成碎水泥地，两边的建筑矮了下去，管道从墙面钻出来架在半空，锈迹顺着接口往下淌. 空气变了——矿物味盖过了一切，混着汗味和廉价烟草的味道. 矿工们三三两两从巷子里走出来，工装上的灰洗不掉，脸色也是灰的. 老街两百米出头，五五、杂货、快餐、烟酒挤在两侧. 他边走边数门面，走到最深处才看到永和小馆——褪色招牌，卷帘门，门口两张折叠桌，几个工人埋头吃面.

姬修杰推门进去.

里面比外面暗不少，头顶日光灯管嗡嗡响着，发出浑浊的黄光. 墙上贴着手写菜单，字写得歪歪扭扭的——炒饭炒面、各种汤面，再配几样小菜，价钱倒是实在. 柜台和灶台连在一起，中间没有隔断，老板在里面颠勺炒菜，外面坐着的人看得一清二楚. 油烟顺着排风扇往外排，排不干净，整个屋子弥漫着一股陈旧的油烟味. 柜台左边挂着一块布帘，脏得看不出原来是什么颜色，帘子后面隐约有一扇门. 他记住了这个位置，要了一碗馄饨，好不容易找到个空位，和几个穿工装的矿工拼桌.

老板四十多岁，围裙上全是油渍，手脚麻利——从锅里捞馄饨、加汤、撒葱花、端过来，前后不到五分钟，全程没抬头看他一眼. 店里人多，她忙不过来，挤出个笑就转身回灶台了.

姬修杰舀了一口汤尝了一下，味道还不错，怪不得中午这么多人 — — 虽然也就是八块钱的馄饨. 他边吃边看：老板在灶台和柜台之间来回走，每次路过布帘都很自然地绕开，手肘收得很紧，像是习惯了那块区域不能碰. 也许只是空间太窄. 也许不是.

老周说陈副部长疑似不止一次出现在这条街上. 一个日理万机的副部长，会为了一碗说不上特别惊艳的八块钱馄饨跑到共管区外围来？

他来这里做什么？

吃完馄饨，姬修杰走到柜台结账. 老板头也没抬头报了个数，他把钱放在柜台上. 老板转身要找零，姬修杰摆了下手："不用找了。"老板道了声谢，手里的活儿没停，转头又忙下一单去了.

"厕所在哪？"

"出后门左拐。"

姬修杰掀开布帘. 灶台背面，火还开着，锅里的水咕嘟咕嘟冒泡，案板旁边堆着一摞塑料筐，装满了还没洗的碗. 正对面一扇木门，漆面脱了大半.

推开门.

后面是一条窄巷，采光很差，左边通往外面，右边又一扇门，门上挂着个牌子：厕所在外面.

他没急着走. 门框靠地面的位置有一圈新鲜木屑，颜色比旧木头浅两个色号，不像是正常开合磨出来的 — — 位置太低，在门框和地面的接缝处，像是有人最近把这扇门拆下来过又装了回去. 巷子地面碎石和积水混在一起，但门前半米左右明显比两边干净，有拖拽过重物的痕迹.

空气里的矿物味浓了不少.

姬修杰没有继续逗留，顺着窄巷走了出去. 外面的白光重新涌过来，刺得他眯了一下眼. 他抬手捏了一下后颈，站在巷口没有动.

也许就是个仓库.

他松开手，往路口走. 这个地方，回头还得再来一趟.

走到路口时，他掏出手机，发了一条消息.`,
    'reader.noTranslation.en': '(This chapter is not yet translated — showing original Chinese)',
    'reader.noTranslation.ja': '(この章はまだ翻訳されていません — 中国語原文を表示)',
    'library.title.en': 'N E X U S · A R C H I V E',
    'library.title.cn': '万界枢纽 · 初墨已落',
    'library.unchartedTitle': '未知之地',
    'library.unchartedNote': '此处尚无记载',
    'library.originPoint': '起笔之处',
    'library.sealed': '',
    'library.notYetInscribed': '待启 · 尚未着墨',
    'library.enterVolume': '入卷 {{n}}',
    'library.volume.label.1': '卷一 · 初墨',
    'library.volume.label.2': '',
    'library.volume.label.3': '',
    'library.volume.label.4': '',
    'library.status.indexing': '正在检索档案 ...',
    'library.status.volumeIActive': '卷一 :: 已启',
    'library.status.trace': '印迹 :: 0x4F-INK',
    'library.status.sealedRange': '卷二 至 卷四 :: SEALED',
    'library.status.lastWrite': '末次落笔 :: 2024.12.15 / 03:42 UTC',
  },
  en: {
    'app.title': 'Interstellar Library',
    'app.subtitle': 'Literary Exploration Across Dimensions',
    'nav.starMap': 'Grand Library',
    'nav.manuscript': 'Manuscript Mode',
    'nav.language': 'Language',
    'world.genre': 'Genre',
    'world.wordCount': 'Words',
    'world.chapters': 'Chapters',
    'world.enter': 'Read Book',
    'world.back': 'Back to Shelves',
    'world.status.active': 'Currently Reading',
    'world.status.manuscript': 'Current Manuscript',
    'world.disconnect': 'Close Book / Return to Shelf',
    'world.close': 'Close Book / Return to Manuscript',
    'transition.entering': 'Checking Out',
    'transition.reading': 'Reading Dossier',
    'transition.exiting': 'Returning to Shelf',
    'transition.sync': 'Searching Library Catalog...',
    'transition.ink': 'Tracing the Ink of Destiny...',
    'transition.terminate': 'Book Returned...',
    'transition.dry': 'The Ink Dries, The Story Pauses...',
    'sidebar.timeline': 'Main Storyline Timeline',
    'sidebar.chapters': 'Chapter List',
    'reader.loading': 'Loading...',
    'reader.end': 'End of Chapter',
    'filter.all': 'All',
    'filter.search': 'Search Collection...',
    'settings.viewMode': 'View Mode',
    'settings.language': 'Language Settings',
    'transition.3d': 'Roaming the Library',
    'transition.2d': 'Paper Manuscript',
    'transition.reconfiguring': 'Organizing Bookshelves',
    'transition.rendering': 'Rendering Manuscript',
    'world.initiateSync': 'CHECK OUT BOOK',
    'world.openPage': 'OPEN PAGE',
    'world.hologramInit': 'Preparing Reading Room...',
    'world.reviewingManuscripts': 'Reviewing Manuscripts...',
    'app.protocol': 'Library ID v4.0.2',
    'app.manuscript': 'Manuscript v1.0.0',
    'app.terraIncognita': 'Terra Incognita',
    'app.hmsDiscovery': 'HMS Discovery',
    'app.leviathan': 'Leviathan',
    'app.mareIgnotum': 'Mare Ignotum',
    'world.dataLink': 'BOOK STATUS::FOUND',
    'world.manuscriptIdentified': 'Manuscript Identified',
    'world.dataStream': 'CALL NUMBER',
    'world.syncComplete': 'BORROW ACCESS',
    'world.location': 'SHELF AREA',
    'reader.back3D': 'RETURN BOOK',
    'reader.back2D': 'CLOSE MANUSCRIPT',
    'reader.activeSector': 'ACTIVE READING',
    'reader.currentManuscript': 'CURRENT MANUSCRIPT',
    'reader.unit': 'PAGES',
    'reader.encrypted': 'ARCHIVED',
    'reader.words': 'WORDS',
    'reader.protocolActive': 'ACCESS GRANTED',
    'reader.reviewProgress': 'READING PROGRESS',
    'app.title3D': 'THE GRAND LIBRARY',
    'app.title2D': 'RARE BOOKS ARCHIVE',
    'app.status3D': 'Sunny Day, Perfect for Reading',
    'app.status2D': 'MANUSCRIPT REVIEW IN PROGRESS',
    'app.sync': 'BORROW',
    'app.stable': 'ALLOWED',
    'detail.synopsis3D': 'BOOK SYNOPSIS',
    'detail.synopsis2D': 'MANUSCRIPT SYNOPSIS',
    'detail.classification': 'WORLD CLASS',
    'detail.narrativeUnits': 'TEMPORAL FRAGMENTS',
    'detail.chapters': 'VOLS',
    'detail.progress': 'CURRENT RECORD',
    'transition.descending': 'DESCENDING INTO',
    'transition.syncing': 'SYNCING',
    'transition.tracing': 'TRACING',
    'transition.inking': 'INKING',
    'transition.disconnecting': 'DISCONNECTING FROM: ',
    'transition.terminating': 'TERMINATING',
    'transition.closing': 'CLOSING: ',
    'transition.inkDries': 'INK DRIES',
    'reader.syncStable': 'SYNC STABLE',
    'reader.inkFlowing': 'INK FLOWING',
    'reader.payload': 'PAYLOAD',
    'reader.sync3D': 'SYNCING',
    'reader.sync2D': 'RENDERING',
    'reader.awaiting': 'AWAITING NEW CHAPTERS...',
    'lang.zh': 'Chinese',
    'lang.en': 'English',
    'lang.ja': 'Japanese',
    'route.jixiu.label': 'JI XIUJIE · ZHA',
    'route.ruoyu.label': 'SUN RUOYU · DIVINATION',
    'route.yunling.label': 'JI YUNLING · NOTE',
    'route.chengyuan.label': 'JI CHENGYUAN · HIDDEN',
    'read.back': 'Back to Selection',
    'common.loading': 'Loading resource...',
    'read.fontSize': 'Font Size',
    'read.close': '← BACK',
    'meta.wordCount': 'Words',
    'meta.appears': 'Found',
    'settings.fontSize': 'Size',
    'tool.font': 'Type',
    'tool.theme': 'Tone',
    'tool.lang': 'Tongue',
    'fontSize.small': 'S',
    'fontSize.medium': 'M',
    'fontSize.large': 'L',
    'theme.day': 'Day',
    'theme.night': 'Night',
    'sidebar.progress': 'Progress',
    'sidebar.chaptersUnit': 'chapters',
    'sidebar.chapterPrefix': 'Ch. ',
    'sidebar.chapterSuffix': '',
    'sidebar.locked': 'Locked',
    'sidebar.toggle': 'Toggle',
    'sidebar.nextLocked': 'Next Chapter Locked',
    'sidebar.readToUnlock': 'Finish current to unlock',
    'reader.prev': 'Previous',
    'reader.next': 'Next →',
    'reader.placeholder': 'Chapter content coming soon',
    'jixiu.ch1.subtitle': 'Surface World — April, 10 a.m.',
    'jixiu.ch2.subtitle': 'Surface World, Late Night',
    'jixiu.ch3.subtitle': 'Inner World, Unnamed Street',
    'jixiu.cta': 'Unseal →',
    'jixiu.back': '← Back',
    'jixiu.ch1.content': `Surface World – April, 10 a.m.

Ji Xiujie stood in the courtyard of the Ji clan, sunlight scattering through the old scholar tree. The breeze was light, carrying the scent of flowers and grass as spring should, everything perfectly normal beyond reproach.

On his phone screen was an encrypted message sent by Old Zhou three days ago, containing only one sentence:

"Vice-Director Chen has disappeared."

Vice-Director Chen – one of the highest-ranking insiders of the Inner World, having served for twenty-three years without ever losing contact. Old Zhou said the disappearance happened without any warning, his office was left untouched, and he was last seen at a routine meeting; once it adjourned, he was gone, as if vanished into thin air.

The Inner World did not notify the Ji clan.

Ji Xiujie didn't plan on telling his grandfather either.

If grandfather found out, the Ji clan machinery would begin to turn—the scene would be cleaned, witnesses controlled, and clues filtered according to the clan's logic, leaving only what they wanted you to see and filtering out what they didn't want you to touch.

He didn't want that kind of truth.

He wanted the truth he saw for himself.

Putting away his phone, he crossed the courtyard and entered the main hall. The light dimmed as he saw three sticks of incense on the altar had long since gone out, leaving only three stubs standing in the burner. Behind the altar hung a portrait of the Ji clan's ancestor; behind that portrait was a secret door—the entrance to the passage leading to the Inner World.

Ji Xiujie removed the three old incense stubs, lit three new ones, placed them in the burner, and joined his hands together.

It was said that this would keep the Ji family safe in the Inner World. He didn't believe in it, but he did it every time. Whether it was habit or a sense of ritual, the world at the other end of the passage always felt like it needed something to keep it in check.

He pushed open the secret door and stepped into the passage.

---

The passage wasn't long, only a dozen steps, but with every step he could feel the air changing.

The pressure dropped, the temperature fell, and a faint mineral scent filled his nostrils—a smell that did not exist in the Surface World, as if the air itself was saturated with something. Even after many visits, this chill still made him shiver.

At the end of the passage was an old wooden door.

As he pushed it open, white light rushed toward him.

The Inner World. The sixth day of clear skies.

The sunlight was brighter than in the Surface World, but bright in a wrong way—not a warm brightness, but a white one, excessively white, as if bleached by something. Shining on the buildings and the faces of pedestrians, everything was covered in an indescribable pallor.

The streets were almost identical to the Surface World—the same layout, the same curvature of the intersections, even the heights of the buildings on both sides matched. But the shop names were different, the people were different, and the scent in the air was different. April in the Surface World had the aroma of flowers and lawns; the Inner World had only that unerasable metallic tang, faint and omnipresent, seeping into every breath.

Tomorrow would be the last day of clear skies; the day after, it would turn to rain for seven straight days. There were significantly more people on the street than usual, taking advantage of the last bit of fair weather to shop, stroll, and pass the time. People in the Inner World were accustomed to this rhythm—seven days of sun, seven days of rain, it had been so for as long as anyone could remember, and no one found it strange.

Ji Xiujie took out his phone and hailed a car, setting the destination near the café.

---

The commercial district had arrived. He got out and followed the flow of people toward the corner.

He often visited this street in the Surface World too; there was a café in the same location that he liked very much. The decor here in the Inner World was almost identical, but the taste of the coffee was off—it had an underlying mineral flavor, as if the beans had already been saturated by this soil before they were even roasted, giving them a distinct character.

Today was Saturday, and the streets were crowded.

Ji Xiujie walked quickly with his head down, the message from Old Zhou running through his mind. Vice-Director Chen's disappearance was too clean—no warning, no struggle, no traces. The meeting ended, and he was gone. This didn't seem like something one person could achieve alone.

Suddenly, Ji Xiujie's chest grew warm.

The white token beneath his clothes began to glow faintly—so dim it was almost invisible through the fabric, but he felt it. For the first time in five years.

This reaction only happened when two tokens were close enough—which meant she was nearby.

Ji Xiujie stopped abruptly and looked around.

At the ten o'clock position, about twenty meters away—a white figure flashed through the crowd. Long hair, white dress, passing by in an instant. He couldn't see her face clearly, but he would not mistake that silhouette.

Five years.

She was seventeen when she disappeared; he was nineteen. He had searched everywhere he could, using the Ji clan's intelligence network, Inner World informants, and even testing his grandfather's private channels. Every answer was the same: "I don't know."

He had entered the Inner World countless times over the past five years, and the token had never once glowed. Not even once.

And now, just twenty meters away.

He suppressed his heartbeat and began to weave through the crowd faster.

There were too many people. The commercial district on a Saturday was packed; every step required turning sideways to make room, every step had someone blocking the way. That white back flickered in the crowd, growing farther and farther away.

He began to run. Pushing past pedestrians, bypassing a group of young people taking photos in the middle of the road, nearly colliding with a woman pushing a stroller—

By the time he reached the spot where she had been, there was nothing.

The street was still the same street, the crowd was still moving, the sunlight was still that excessive white.

She had vanished completely, as if she had never appeared.

Ji Xiujie stood in place, the token on his chest still retaining a trace of warmth that was rapidly cooling.

He looked around. Every face was that of a stranger.

She was indeed here. The token wouldn't lie.

He desperately wanted to keep searching, but in this sea of people, it was like looking for a needle in a haystack.

Old Zhou was still waiting for him at the café. The matter of Vice-Director Chen was still unresolved.

He took a deep breath and turned toward the café.

After walking a few steps, he couldn't help but look back once more.

There was nothing.`,
    'jixiu.ch2.content': `The café was on the corner of the commercial district, small, with floor-to-ceiling glass windows facing the artificial lake. Ji Xiujie pushed the door open, the warmth of the heater rushing toward him, feeling like a different temperature altogether from the white-lit world outside.

Old Zhou had already arrived, sitting at the innermost corner against the wall, staring out the window lost in thought.

In his fifties, thin, with graying hair and a worn, dark jacket. He was a veteran of the Central Council’s Archive Management Room, having worked there for over twenty years—unassuming, never causing trouble. He was the kind of person no one would give a second look on the street, and precisely because of that, many things high-level officials wouldn't touch with their own hands would instead pass through his.

There was already a cup of café in front of Old Zhou, more than half finished. He always slipped out during the lunch break—one hour to drink coffee and get half a conversation in, returning without anyone asking questions. Ji Xiujie ordered a cup for himself at the counter and carried it over to sit down.

Old Zhou didn't bother with pleasantries, taking another sip of coffee: "The news is confirmed. Vice-Director Chen's last public appearance was at last Tuesday's routine meeting; no one has seen him since it adjourned. His office was untouched, his personal belongings are all there, and his car is still in the unit’s garage."

"Did they report it to the police?"

"No. The higher-ups are suppressing it, not allowing it to be publicized. Officially, they’re saying he’s away on a field inspection."

"What about the approval records?"

"None. I can't find any record of a field trip in the system."

Ji Xiujie took a sip of his coffee—it was that same taste, a normal bitterness with a metallic finish, as if the water source itself contained mineral components.

"The suppression is that tight? Even you can't find anything?"

Old Zhou remained silent for two seconds: "It's not that I found nothing, but I can't be sure yet."

"Meaning?"

"Before he disappeared, Vice-Director Chen was suspected of having visited the outskirts of the mining area."

Ji Xiujie's eyes narrowed.

The mining area—the most sensitive zone in the Inner World. The core area for crystal extraction, a joint management zone directly under the Central Council. The outskirts were where ordinary miners worked, while the core was under military lockdown, inaccessible to outsiders. And Vice-Director Chen was in charge of communication and coordination between member nations, which had no overlap with the day-to-day management of the mining area.

"What was he doing at the mining area?"

"Unclear," Old Zhou said. "I heard of it by chance. A few years ago, a batch of crystal transport records was lost from the outskirts of the mining area. The higher-ups ordered a batch of surveillance cameras to be installed in the vicinity, and they weren't removed even after the matter passed. I have an old connection there who handles equipment maintenance; he mentioned in passing the other day that a camera captured someone who looked like an official appearing on an old street in the outskirts."

"Which street?"

"There’s an old street on the outskirts of the mining area, and on it is a small place called Yonghe Diner. It's been open for many years, selling fast food; the neighborhood is mostly miners and residents." Old Zhou paused for a moment. "That kind of place isn't somewhere a Vice-Director should be going."

Ji Xiujie didn't speak, his fingertips tapping lightly on the side of his cup.

A Vice-Director in charge of international coordination, appearing in a small fast-food diner on the outskirts of the mining area joint management zone before his disappearance.

"How many times did he go?"

"I haven't been able to check specifically yet. My old connection only mentioned it in passing, saying it was more than once. The detailed surveillance records aren't managed by the Archives, but by the Mining Area Security; I'll have to go around in circles to get them."

"Quickly. Give them to me the moment you get them."

Old Zhou nodded.

Ji Xiujie finished the rest of his coffee and set the cup down.

"Is the Yonghe Diner still open?"

"It should be. That street hasn't changed much."

Ji Xiujie stood up.

"Keep a lid on this for now, don't mention it to anyone."

"Understood."

He pushed open the glass door, and the white light of the Inner World surged toward him once more.`,
    'jixiu.ch3.content': `Ji Xiujie didn't go directly to the Yonghe Diner.

He walked to the lakeside and stood by the shore for a while. The wind wasn't strong, and the surface of the lake had almost no ripples, just quietly reflecting the light—that excessive white that made one’s eyes ache. There were people strolling nearby, some sitting on benches looking at their phones; no one noticed him. He reached out and touched his chest—the token was cold, matching his body temperature, as if nothing had happened.

When he was child, this token never had any reaction. He and his sister had played with it, exchanged them, and felt nothing. Today was the first time it had ever reacted.

He took out his phone and scrolled to his chat with Old Zhou. He typed a few words, then deleted them. Typed again, and deleted again. Finally, he locked the screen and shoved it back into his pocket.

Not now.

Vice-Director Chen's disappearance was the most urgent matter at hand; his sister's appearance felt more like something that had flashed by in the night sky. Whether there was any connection between the two, he couldn't say, nor did he dare to jump to conclusions. With insufficient information, he could only move forward along the clearer path.

He hailed a ride. After two minutes, a gray car pulled up at the curb. He pulled open the rear door, sat inside, and gave an address.

The car drove west, the scenery outside retreating. First, the floor-to-ceiling glass of cafés and clothing stores, then barriers and construction roadblocks, and finally, even the roadside trees were gone, leaving only dull gray concrete walls and old pipes suspended in the air. Ji Xiujie pulled up the location Old Zhou had sent him on his phone—Yonghe Diner, on an old street on the outskirts of the mining area. In the street view map was a row of low-slung storefronts, so blurry the signs were illegible. He zoomed in on the map, memorizing the layout of several nearby alleys, then locked the screen.

The car stopped at an intersection; further in, the road narrowed and became difficult to drive. Ji Xiujie got out and walked into the old street.

Beneath his feet, the asphalt turned into crushed concrete. The buildings on either side sank lower, pipes emerging from the walls to hang in mid-air, with rust dripping down from the joints. The air changed—the mineral scent overwhelmed everything, mixed with the smell of sweat and cheap tobacco. Miners walked out of the alleys in groups of two or three; the gray on their work clothes wouldn't wash out, and their faces were also gray. The old street was just over two hundred meters long, packed with general stores, sundries, fast food, and tobacco shops on both sides. He counted the storefronts as he walked, only seeing the Yonghe Diner when he reached the deepest part—a faded sign, a rolling shutter door, two folding tables at the entrance, and several workers hunched over eating noodles.

Ji Xiujie pushed the door open.

It was much darker inside than out, the overhead fluorescent tubes buzzing and emitting a murky yellow light. Handwritten menus were posted on the wall, the characters crooked—fried rice, fried noodles, various soup noodles, along with a few side dishes; the prices were honest. The counter and the stove were connected with no partition in between; the owner was tossing ingredients in a wok inside, clearly visible to those sitting outside. The oil smoke was being vented out by an exhaust fan, but not very effectively; the entire room was permeated with a stale smell of grease and smoke. To the left of the counter hung a cloth curtain, so dirty its original color was unrecognizable; behind the curtain, a door was faintly visible. He memorized this location, ordered a bowl of wontons, and managed to find an empty seat to share a table with a few miners in work clothes.

The owner was in her forties, her apron covered in grease stains, her movements agile—scooping wontons from the pot, adding broth, sprinkling green onions, and bringing them over, taking less than five minutes from start to finish, never looking up at him once. The shop was crowded and she was busy, so she offered a quick smile and turned back to the stove.

Ji Xiujie scooped a spoonful of broth and tasted it; the flavor was quite good, no wonder there were so many people at noon—even if it was just an eight-yuan bowl of wontons. He watched as he ate: the owner moved back and forth between the stove and the counter, naturally avoiding the cloth curtain every time she passed it, her elbows held tight as if she were accustomed to that area being off-limits. Perhaps the space was just too narrow. Perhaps it wasn't.

Old Zhou said Vice-Director Chen was suspected of appearing on this street more than once. Would a Vice-Director occupied with myriad affairs come to the outskirts of the joint management zone for an unremarkable eight-yuan bowl of wontons?

What was he doing here?

After finishing the wontons, Ji Xiujie walked to the counter to settle the bill. The owner called out a price without looking up, and he placed the money on the counter. The owner turned to find change, but Ji Xiujie waved his hand: "Keep the change." The owner thanked him, her work never pausing, as she turned to handle the next order.

"Where’s the restroom?"

"Go out the back door and turn left."

Ji Xiujie lifted the cloth curtain. Behind the stove, the fire was still on, the water in the pot bubbling; a stack of plastic baskets was piled next to the chopping board, filled with unwashed bowls. Directly ahead was a wooden door, most of its paint having peeled off.

He pushed the door open.

Behind it was a narrow alley with poor lighting, leading outside to the left, and with another door to the right, which had a sign hanging on it: "Restroom outside."

He didn't rush to leave. There was a ring of fresh wood shavings at the base of the door frame, two shades lighter than the old wood, which didn't look like normal wear and tear from opening and closing—the position was too low, at the junction of the door frame and the ground, as if someone had recently taken this door off and put it back on. The ground of the alley was a mixture of gravel and puddles, but the area about half a meter in front of the door was significantly cleaner than the sides, with traces of a heavy object having been dragged.

The mineral scent in the air grew much stronger.

Ji Xiujie didn't linger any longer and walked out along the narrow alley. The white light outside flooded back, making he squint. He raised his hand and rubbed the back of his neck, standing at the alley entrance without moving.

Maybe it was just a warehouse.

He let go and walked toward the intersection. This place, he would have to come back to.

As he reached the intersection, he took out his phone and sent a message.`,
    'reader.noTranslation.en': '(This chapter is not yet translated — showing original Chinese)',
    'reader.noTranslation.ja': '(この章はまだ翻訳されていません — 中国語原文を表示)',
    'library.title.en': 'N E X U S · A R C H I V E',
    'library.title.cn': 'Nexus · Archive',
    'library.unchartedTitle': 'UNCHARTED',
    'library.unchartedNote': 'no record',
    'library.originPoint': 'ORIGIN POINT',
    'library.sealed': '',
    'library.notYetInscribed': 'NOT YET INSCRIBED',
    'library.enterVolume': 'ENTER VOLUME {{n}}',
    'library.volume.label.1': 'VOLUME I — INK NASCENT',
    'library.volume.label.2': '',
    'library.volume.label.3': '',
    'library.volume.label.4': '',
    'library.status.indexing': 'INDEXING ARCHIVE ...',
    'library.status.volumeIActive': 'VOLUME I :: ACTIVE',
    'library.status.trace': 'TRACE :: 0x4F-INK',
    'library.status.sealedRange': 'VOLUMES II–IV :: SEALED',
    'library.status.lastWrite': 'LAST WRITE :: 2024.12.15 / 03:42 UTC',
  },
  ja: {
    'app.title': '星間書庫',
    'app.subtitle': '次元を超えた文学の探索',
    'nav.starMap': '星図モード',
    'nav.manuscript': '原稿モード',
    'nav.language': '言語',
    'world.genre': 'ジャンル',
    'world.wordCount': '文字数',
    'world.chapters': '章',
    'world.enter': '世界に入る',
    'world.back': '星図に戻る',
    'world.status.active': 'アクティブセクター',
    'world.status.manuscript': '現在の原稿',
    'world.disconnect': '切断 / 星図に戻る',
    'world.close': '書を閉じる / 原稿に戻る',
    'transition.entering': '降臨中',
    'transition.reading': '巻物を閲覧中',
    'transition.exiting': '切断中',
    'transition.sync': 'マルチバース座標を同期中...',
    'transition.ink': '運命の墨跡を辿る...',
    'transition.terminate': 'ニューラルリンクを終了中...',
    'transition.dry': '墨が乾き、物語は一時停止する...',
    'sidebar.timeline': 'メインストーリータイムライン',
    'sidebar.chapters': '章リスト',
    'reader.loading': '読み込み中...',
    'reader.end': 'この章の終わり',
    'filter.all': 'すべて',
    'filter.search': '世界を検索...',
    'settings.viewMode': '表示モード',
    'settings.language': '言語設定',
    'transition.3d': '3D投影',
    'transition.2d': '2D手稿',
    'transition.reconfiguring': 'マトリックスを再構成中',
    'transition.rendering': '原稿をレンダリング中',
    'world.initiateSync': '同期を開始',
    'world.openPage': 'ページを開く',
    'world.hologramInit': 'ホログラムを初期化中...',
    'world.reviewingManuscripts': '原稿をレビュー中...',
    'app.protocol': 'プロトコル v4.0.2-ホログラム',
    'app.manuscript': '原稿 v1.0.0',
    'app.terraIncognita': '未知の土地',
    'app.hmsDiscovery': 'ディスカバリー号',
    'app.leviathan': 'リヴァイアサン',
    'app.mareIgnotum': '未知の海',
    'world.dataLink': 'データリンク::確立',
    'world.manuscriptIdentified': '原稿を特定',
    'world.dataStream': 'データストリーム',
    'world.syncComplete': '同期完了',
    'world.location': '座標',
    'reader.back3D': '接続解除',
    'reader.back2D': '原稿を閉じる',
    'reader.activeSector': 'アクティブセクター',
    'reader.currentManuscript': '現在の原稿',
    'reader.unit': 'ユニット',
    'reader.encrypted': '暗号化済み',
    'reader.words': '文字',
    'reader.protocolActive': 'プロトコル有効',
    'reader.reviewProgress': 'レビューの進捗',
    'app.title3D': '星間書庫',
    'app.title2D': '星間手稿',
    'app.status3D': 'ホログラムシステム準備完了',
    'app.status2D': '原稿レビュー中',
    'app.sync': '同期',
    'app.stable': '安定',
    'detail.synopsis3D': 'データ概要',
    'detail.synopsis2D': '原稿概要',
    'detail.classification': '世界分類',
    'detail.narrativeUnits': '時空の断片',
    'detail.chapters': '巻',
    'detail.progress': '現在の記録',
    'transition.descending': '降臨中',
    'transition.syncing': '同期中',
    'transition.tracing': '追跡中',
    'transition.inking': '着墨中',
    'transition.disconnecting': '切断中: ',
    'transition.terminating': '終了中',
    'transition.closing': '閉鎖中: ',
    'transition.inkDries': '墨が乾く',
    'reader.syncStable': '同期安定',
    'reader.inkFlowing': '墨が流れています',
    'reader.payload': 'ペイロード',
    'reader.sync3D': '同期中',
    'reader.sync2D': 'レンダリング中',
    'reader.awaiting': '新しい章を待っています...',
    'lang.zh': '中国語',
    'lang.en': '英語',
    'lang.ja': '日本語',
    'route.jixiu.label': '姫 修 傑 · 札',
    'route.ruoyu.label': '孫 若 雨 · 筮',
    'route.yunling.label': '姫 雲 霊 · 笺',
    'route.chengyuan.label': '姫 承 淵 · 蔵',
    'read.back': '選角に戻る',
    'common.loading': '読み込み中...',
    'read.fontSize': '文字サイズ',
    'read.close': '← 合巻',
    'meta.wordCount': '字',
    'meta.appears': '第',
    'settings.fontSize': '字',
    'tool.font': '字',
    'tool.theme': '表示',
    'tool.lang': '言語',
    'fontSize.small': '小',
    'fontSize.medium': '中',
    'fontSize.large': '大',
    'theme.day': '昼',
    'theme.night': '夜',
    'sidebar.progress': '進捗',
    'sidebar.chaptersUnit': '章',
    'sidebar.chapterPrefix': '第',
    'sidebar.chapterSuffix': '章',
    'sidebar.locked': '未解放',
    'sidebar.toggle': '开闭',
    'sidebar.nextLocked': '未解放の章',
    'sidebar.readToUnlock': '本章を読了して解放',
    'reader.prev': '前章',
    'reader.next': '次の章 →',
    'reader.placeholder': '本章の内容は準備中です',
    'jixiu.ch1.subtitle': '表世界・四月、午前十時',
    'jixiu.ch2.subtitle': '表世界、深夜',
    'jixiu.ch3.subtitle': '裏世界、名もなき街',
    'jixiu.cta': '開封 →',
    'jixiu.back': '← 巻を閉じる',
    'jixiu.ch1.content': `表世界・四月、午前十時。

姫修傑は姫家の庭に立ち、古い槐の木の間から差し込む日差しが、地面に影の断片を落としていた。風は穏やかで、春らしい花草の香りを運んでおり、すべてが申し分のないほど正常だった。

携帯電話の画面には、三日前に老周から届いた暗号化されたメッセージが表示されていた。そこにはたった一行、こう記されていた：

「陳副部長が失踪した。」

陳副部長——裏世界の事情を知る高層の中でも最高位の一人であり、二十三年間在位し、一度も連絡が途絶えたことはなかった。老周によれば、失踪に予兆はなく、オフィスはそのままで、私物も残されていた。最後に目撃されたのは定例会議で、散会後に姿を消した。まるで煙のように消えてしまったのだという。

裏世界側から姫家への連絡はなかった。

姫修傑も祖父に伝えるつもりはなかった。

もし祖父が知れば、姫家の機構が動き出すだろう——現場は清掃され、関係者は拘束され、手がかりは姫家の理屈に従って選別される。彼らが見せたいものだけが残り、触れさせたくないものは排除されるのだ。

彼は、そのような真実を求めてはいなかった。

彼は自分の目で見たものを求めていた。

携帯をしまい、庭を横切って正殿に入った。光が遮られ、供物台の上の三本の線香は疾くに燃え尽き、残骸だけが香炉に立っていた。供物台の背後には姫家の先祖の肖像画が掛かっており、その裏側には隠し扉があった——裏世界へと続く通路の入り口だ。

姫修傑は古い線香の残りを取り除き、新しい三本の線香に火を灯して香炉に挿し、両手を合わせた。

こうすることで、裏世界での姫家の者の平安が保たれると言われている。彼はそんなことは信じていなかったが、毎回欠かさず行っていた。習慣か、あるいは儀式的なものか、通路の向こう側の世界は、常に何かで抑えておく必要があると感じさせるのだ。

隠し扉を押し開け、通路へと足を踏み入れた。

---

通路は長くはなく、十数歩ほどの距離だったが、一歩ごとに空気が変わるのが感じられた。

気圧が下がり、温度が下がり、鼻腔に微かな鉱物の匂いが漂ってきた。表世界には決して存在しない匂いであり、空気そのものが何かに浸りきっているかのようだった。何度も訪れたことがあっても、この寒気には思わず身震いしてしまう。

通路の突き当たりには古い木製の扉があった。

扉を開けると、白い光が目に飛び込んできた。

裏世界。晴天六日目。

陽光は表世界よりも明るいが、その明るさはどこか歪んでいた——温かみのある明るさではなく、白く、あまりにも白く、まるで何かで漂白されたかのようだった。建物や行き交う人々の顔を照らし出し、あらゆるものが言いようのない蒼白さに覆われていた。

街並みは表世界とほとんど同じだった——同じ配置、同じ交差点の曲線、両側の建物の高さまで一致していた。しかし、店名は異なり、行き交う人々も異なり、空気の匂いも異なっていた。四月の表世界には花や芝生の香りが漂うが、裏世界には決して洗い流せないあの金属質の匂いが、微かに、かつ至る所に存在し、呼吸のたびに染み込んでくる。

明日は晴天の最後の一日だ。明後日からは雨に変わり、七日間降り続く。最後の上天気を惜しんで、買い出しや散歩、時間を潰しに街へ繰り出す人々で賑わっていた。裏世界の人々はこのリズムに慣れきっている——七日間の晴れ、七日間の雨。物心ついた時からそうであり、誰も不思議には思わない。

姫修傑は携帯を取り出し、車を呼んだ。目的地はカフェの近くに設定した。

---

商業街に到着した。車を降り、人の流れに沿って角へと向かう。

表世界でもよく訪れる街だった。同じ場所には彼のお気に入りのカフェがあった。裏世界の店内装飾もほぼ同じだったが、コーヒーの味は違っていた——地層に染み込んだ鉱物の後味が残り、豆が焙煎される前からその土地の性質を吸い込んでいるかのようだった。それがまた、独特の風味となっていた。

今日は土曜日で、街は混み合っていた。

姫修傑は俯き加減に足早に歩きながら、頭の中で老周のメッセージを反芻していた。陳副部長の失踪はあまりにも鮮やかすぎた——予兆もなく、争った形跡もなく、痕跡すらない。会議が終わると、その人は消えていた。一人の人間が独力で成し遂げられることではない。

突如、姫修傑の胸元が熱くなった。

服の下にある白い信物が微かに光を放っていた——極めて淡く、服越しではほとんど見えないほどだったが、彼はそれを感じ取った。五年間で初めてのことだ。

二つの信物が十分に近づいた時だけ、この反応が起こる——つまり、彼女がすぐ近くにいる。

姫修傑は激しく足を止め、周囲を見渡した。

十時の方向、約二十メートル先——人混みの中に白い影が閃いた。長い髪、白いワンピース、雑踏の中を一瞬で通り過ぎていく。顔ははっきり見えなかったが、そのシルエットを見間違えるはずはなかった。

五年が経っていた。

彼女が失踪した時、彼女は十七歳、彼は十九歳だった。彼はあらゆる場所を探し回り、姫家の情報網、裏世界の協力者、果ては祖父の個人的なルートまで探らせた。しかし、返ってくる答えはどれも同じだった。「分からない」。

この五年間、彼は幾度となく裏世界に足を踏み入れましたが、信物が光ることは一度もありませんでした。ただの一度も。

それが今、わずか二十メートル先にいる。

鼓動を抑え、人混みを縫うように速度を上げた。

人が多すぎる。土曜日の商業街は至る所に人が溢れ、一歩ごとに体をかわし、誰かに道を塞がれる。あの白い後ろ姿は人並みに紛れて見え隠れし、遠ざかっていく。

彼は走り出した。目の前の通行人を押し分け、路上で写真を撮っている若者のグループを避け、ベビーカーを押す女性にぶつかりそうになりながら——

彼女がいた場所に辿り着いた時、そこには何もなかった。

通りは相変わらずそこにある通りで、人々は流れ、陽光はあの異常なまでの白さを湛えていた。

彼女は跡形もなく消え失せていた。まるで最初から存在しなかったかのように。

姫修傑はその場に立ち尽くした。胸の信物にはまだ微かな熱が残っていましたが、それも急速に冷えていきました。

周囲を見渡した。どの顔も、見知らぬ他人の横顔だった。

彼女は確かにここにいた。信物は嘘をつかない。

追い続けたい衝動に駆られましたが、この人混みの中では大海に針を探すようなものです。

老周がカフェで待っている。陳副部長の件もまだ片付いていない。

彼は深く息を吸い、カフェの方へと歩き出した。

数歩歩いて、やはりこらえきれずに後ろを振り返った。

そこには、何もなかった。`,
    'jixiu.ch2.content': `裏世界、商業街・カフェ

カフェは商業街の角にあり、それほど大きくはなかった。床から天井までの大きなガラス窓が、人工湖に面している。姫修傑が扉を押し開けると、暖房の熱気が一気に押し寄せ、外の白い光の世界とは全く別の温度の中にいるようだった。

老周はすでに到着しており、壁際の最も奥の席に座り、物思いに耽った様子で窓の外を眺めていた。

五十代後半、痩せ型で、胡麻塩頭。着古した色の濃いジャンパーを羽織っている。中枢院のアーカイブ管理室で二十年以上のキャリアを持つベテランだが、目立たず、騒ぎも起こさない。街を歩いていても誰も振り返ることのないような男だ。それゆえに、高層が自ら手を下したくないような事案が、彼の元へと流れてくることが多々あった。

老周の前には、すでに半分以上飲み干されたコーヒーが置かれていた。彼はいつも昼休みの時間を見計らって出てくる——一時間でコーヒーを飲み、半分の会話を済ませ、誰からも追求されることなく職場へ戻るのだ。姫修傑はカウンターで自分の分を注文し、それを持って彼の向かいに座った。

老周は挨拶も抜きに、また一口コーヒーを啜った。「ニュースは確認できた。陳副部長が最後に姿を見せたのは先週火曜日の定例会議だ。散会後、彼の姿を見た者はいない。オフィスは手付かずで、私物もすべて残されている。車も職場のガレージに停まったままだ。」

「警察には？」

「通報はしていない。上が押さえ込んでいて、騒ぎにするなと命じている。表向きは出張調査ということになっているらしい。」

「承認記録は？」

「ない。システム上、どこにも出張の記録は見当たらない。」

姫修傑はコーヒーを一口飲んだ——やはりあの味だ。普通の苦味の奥に、金属のような後味が残る。水源そのものに鉱物成分が含まれているかのようだ。

「上がそれほど厳しく封じ込めているのか？ お前ですら何も掴めないほどに？」

老周は二秒ほど沈黙した。「全く掴めなかったわけではない。だが、まだ確証が持てないんだ。」

「どういう意味だ？」

「失踪する直前、陳副部長は鉱区の外縁部を訪れていた疑いがある。」

姫修傑の目が細くなった。

鉱区——裏世界において最も敏感な区域。晶石採掘の核心地帯であり、中枢院が直轄する共同管理区だ。外縁部は一般の鉱夫たちが作業する場所だが、核心部は軍事封鎖され、部外者は近づくことすらできない。陳副部長の担当は加盟国間の連絡調整であり、鉱区の日常管理とは何の接点もないはずだった。

「鉱区で何をしていたんだ？」

「分からない」と老周は言った。「偶然耳にしたんだ。数年前、鉱区の外縁部で晶石の輸送記録が紛失する事件があった。上が周辺に監視カメラを増設させたんだが、事件が解決した後も撤去されずに残っていた。そこに機材メンテナンスをしている古い知り合いがいてね。先日、雑談の中で『役人風の男が外縁部の古い通りに現れたのがカメラに映っていた』と漏らしたんだ。」

「どの通りだ？」

「鉱区の外縁に古い街並みがあって、そこに『永和小館』という小さな店がある。昔からある定食屋で、近所の鉱夫や住民が利用するような場所だ。」老周は一呼吸置いた。「副部長ともあろう者が、行くような場所じゃない。」

姫修傑は答えず、指先でカップの縁を軽く叩いた。

国際調整を担う副部長が、失踪直前に鉱区共同管理区の外縁にある小さな定食屋に現れた。

「何度行ったんだ？」

「詳しいことはまだ調べている最中だ。知人はつい口を滑らせただけで、一度きりではないと言っていた。詳細な監視記録はアーカイブ室の管轄ではなく、鉱区の警備課が握っている。何重か手を回さないと手に入らない。」

「急げ。手に入り次第、すぐに俺に回してくれ。」

老周は頷いた。

姫修傑は残りのコーヒーを飲み干し、カップを置いた。

「永和小館は、今も営業しているのか？」

「まだ開いているはずだ。あの通りはあまり変化がないからな。」

姫修傑は立ち上がった。

「この件は当面伏せておけ。誰にも言うな。」

「分かっている。」

ガラスの扉を押し開けると、裏世界の白い光が再び押し寄せてきた。`,
    'jixiu.ch3.content': `裏世界、永和小館

姫修傑は直接「永和小館」へは向かわなかった。

彼は湖畔まで歩き、しばらく岸辺に佇んでいた。風は弱く、湖面にはほとんど波もなく、ただ静かに光を反射していた——あの過剰なまでの白さが、目に刺さるように痛い。周囲には散歩をする人々や、ベンチに座って携帯を眺める人々がいたが、誰も彼に注意を払う者はいなかった。彼は胸元に手をやった——信物は冷たく、体温と同じ温度であり、まるで何も起こらなかったかのようだった。

子供の頃、この信物は何の反応も見せなかった。妹と一緒に遊び道具にしたり、交換してみたりもしたが、何も感じなかった。今日、それが初めて反応したのだ。

彼は携帯を取り出し、老周とのトーク画面を開いた。いくつかの文字を打ち、そして消した。また打ち、また消した。最後には画面をロックし、ポケットに押し込んだ。

今ではない。

陳副部長の失踪が今、最も差し迫った問題だ。妹の出現は、夜空を一瞬で駆け抜けた流れ星のようなものだ。両者に何らかの繋がりがあるのかどうか、彼には分からなかったし、軽率な判断も下せなかった。情報足りない。今はより明白な手がかりに従って進むしかない。

彼は配車サービスを利用した。二分後、グレーの車が路肩に止まった。彼は後部座席のドアを開けて乗り込み、住所を告げた。

車は西へと走り、窓の外の景色が後方へと流れ去っていく。最初はカフェや衣料品店の大きなガラス窓が続き、やがて仮囲いや工事用のバリケードが現れ、最後には街路樹すら姿を消した。残ったのは、くすんだグレーのコンクリート壁と、宙に渡された古い配管だけだった。姫修傑は携帯で老周から送られてきた位置情報を確認した——鉱区外縁の古い通りにある「永和小館」。ストリートビューの地図には低い軒を連ねた店が並んでいたが、看板すら読み取れないほどぼやけていた。彼は地図を拡大し、近辺の路地の入り組み方を記憶に刻み、画面を閉じた。

車は交差点で止まった。その先は道が狭くなり、車での進入は困難だった。姫修傑は車を降り、古い通りの中へと歩みを進めた。

足元のアスファルトは砕けたコンクリートへと変わり、両側の建物は低く沈み込んでいった。壁から突き出した配管が宙を渡り、継ぎ目からは錆が滴り落ちていた。空気が変わった——鉱物の匂いがあらゆるものを覆い尽くし、それに汗の臭いと安物の煙草の匂いが混じり合っていた。鉱夫たちが二人、三人と路地から現れた。作業着の汚れは洗っても落ちず、彼らの顔もまた、くすんだ灰色をしていた。古い通りは二百メートルを少し超える程度の長さで、雑貨屋、日用品店、飲食店、酒や煙草を扱う店がひしめき合っていた。彼は店を数えながら歩き、最も奥まった場所でようやく「永和小館」を見つけた——色褪せた看板、シャッター、店先に出された二つの折り畳みテーブル、そして黙々と麺を啜る数人の労働者たち。

姫修傑は扉を押し開けた。

店内は外よりも随分と暗かった。頭上の蛍光灯がジージーと音を立て、濁った黄色い光を放っている。壁には手書きのメニューが貼られていたが、その文字は歪んでいた——炒飯、炒麺、各種スープ麺に、いくつかの一品料理。値段は至って良心的だった。カウンターとコンロは仕切りのない地続きになっており、店主が中で中華鍋を振るう様子が、外の客からもはっきりと見えた。換気扇からは油煙が排出されていたが、十分ではないようで、部屋全体に古い油と煙の匂いが充満していた。カウンターの左側には布のカーテンが掛かっていましたが、汚れすぎて元の色が判別できないほどでした。カーテンの奥には、うっすらと扉が見えた。彼はその位置を記憶し、ワンタンを一杯注文した。そして、作業着姿の鉱夫たちが相席している空席をようやく見つけて腰を下ろした。

店主は四十代の女性で、エプロンは油汚れにまみれていましたが、手つきは鮮やかでした。鍋からワンタンを掬い上げ、スープを加え、ネギを散らして運んでくるまで、五分とかかりませんでした。その間、彼女は一度もこちらと目を合わせることはありませんでした。店は混み合い、彼女は忙しそうに、短い会釈だけを残してすぐにコンロの前へと戻っていきました。

姫修傑はスープを一口掬って味わってみた。味は悪くない。昼時にこれほど人が多いのも頷ける——たとえそれが、たった八元のワンタンであっても。彼は食べながら観察した。店主はコンロとカウンターの間を往復し、布カーテンの傍を通るたびに自然とそこを避けていた。肘を固く閉じ、まるでその区域には触れてはならないという習慣が身についているようだった。単にスペースが狭いだけかもしれない。あるいは、そうではないのかもしれない。

老周の話では、陳副部長はこの通りに一度ならず現れた疑いがあるという。多忙を極める副部長が、お世辞にも絶品とは言えない、八元のワンタン一杯を求めて、わざわざ共同管理区の外縁まで足を運ぶだろうか？

彼はここで何をしていたのか？

ワンタンを食べ終えると、姫修傑は会計のためにカウンターへ向かった。店主は顔も上げずに金額を告げ、彼はその額をカウンターに置いた。店主がお釣りを探そうとすると、姫修傑は手を振って制した。「お釣りはいりません。」店主は礼を言ったが、手元の作業は止めることなく、すぐに次の注文へと取り掛かった。

「トイレはどこですか？」

「裏の扉を出て左だよ。」

姫修傑は布カーテンを捲り上げた。コンロの裏側では火が点いたままで、鍋のお湯がグラグラと煮立っていた。まな板の横には、まだ洗われていない食器が山積みになったプラスチックの籠が置かれていた。真正面には木製の扉があり、塗装の大部分が剥げ落ちていた。

彼はその扉を押し開けた。

裏手は採光の悪い狭い路地になっていた。左は表へと続き、右にはもう一つの扉があり、そこには「トイレは外」という札が掛かってた。

彼はすぐには立ち去りませんでした。扉の枠の地面に近い部分に、新しい木片が散らばっていました。古い木材よりも二段階ほど色が明るく、通常の開閉で生じた摩耗のようには見えませんでした——位置があまりにも低く、扉の枠と地面の境界付近に集中していました。あたかも、最近この扉が一度取り外され、再び取り付けられたかのようでした。路地の地面は砂利と水溜まりが混じり合っていましたが、扉の前の五十センチほどの範囲だけは、周囲よりも明らかに清潔で、重い物を引きずったような跡が残っていました。

空気の中の鉱物臭が、一段と濃くなった。

姫修傑はそれ以上留まることなく、狭い路地を伝って外へと出た。再び外の白い光が押し寄せ、彼は目を細めた。彼は手の甲でうなじを一撫でし、路地裏の入り口で動かずに立っていた。

おそらくは、ただの倉庫なのだろう。

彼は手を離すと、交差点の方へと歩き出した。この場所には、改めてもう一度来る必要がある。

交差点に辿り着いた時、彼は携帯を取り出し、一通のメッセージを送信した。`,
    'reader.noTranslation.en': '(This chapter is not yet translated — showing original Chinese)',
    'reader.noTranslation.ja': '(この章はまだ翻訳されていません — 中国語原文を表示)',
    'library.title.en': 'N E X U S · A R C H I V E',
    'library.title.cn': '万 界 · 枢 軸',
    'library.unchartedTitle': '未知の領域',
    'library.unchartedNote': '記録なし',
    'library.originPoint': '原点',
    'library.sealed': '',
    'library.notYetInscribed': '未着筆',
    'library.enterVolume': '第{{n}}巻へ',
    'library.volume.label.1': '第I巻 — 初墨',
    'library.volume.label.2': '',
    'library.volume.label.3': '',
    'library.volume.label.4': '',
    'library.status.indexing': 'アーカイブを索引中...',
    'library.status.volumeIActive': '第I巻 :: 有効',
    'library.status.trace': '痕跡 :: 0x4F-INK',
    'library.status.sealedRange': '第II〜IV巻 :: SEALED',
    'library.status.lastWrite': '最終更新 :: 2024.12.15 / 03:42 UTC',
  },
};
