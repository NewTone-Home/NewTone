import { NovelWorld } from './types';

export const INITIAL_WORLDS: NovelWorld[] = [
  {
    id: 'w-1',
    name: { zh: '初墨卷', en: 'First Ink Scroll', ja: '初墨巻' },
    genre: { zh: '东方玄幻', en: 'Eastern Fantasy', ja: '東洋ファンタジー' },
    shortDescription: { 
      zh: '一剑破星辰，万界尊剑道。', 
      en: 'One sword shatters the stars, all worlds honor the way of the sword.', 
      ja: '一剣で星を砕き、万界は剣道を尊ぶ。' 
    },
    imageUrl: 'https://picsum.photos/seed/xianxia/1920/1080?blur=2',
    chapters: [
      {
        id: 'c-1-1',
        title: { zh: '序章：天外飞仙', en: 'Prologue: Flying Immortal', ja: '序章：天外飛仙' },
        wordCount: 1205,
        content: {
          zh: `太古时期，混沌未分。\n\n一道璀璨的剑光自宇宙深处横空出世，劈开了无尽的黑暗。那不是流星，而是一柄通体晶莹、散发着无尽威压的神剑。\n\n神剑坠落于荒芜的星体之上，剑气激荡，化作了山川河流，日月星辰。这便是“苍穹剑界”的由来。\n\n数万年后，青云宗杂役弟子林动，正提着一桶灵泉水，艰难地走在陡峭的山道上。他天生绝脉，无法凝聚剑气，在这个以剑为尊的世界里，注定只能做一个凡人。\n\n“哟，这不是我们的‘绝脉天才’林动吗？怎么，还在做着成为剑仙的白日梦？”几名身穿外门弟子服饰的少年拦住了他的去路，脸上满是讥讽。\n\n林动没有说话，只是默默地握紧了拳头。他的目光越过这些嘲笑他的人，看向了青云宗最高处的“洗剑池”。那里，插着一把传说中从天外坠落的断剑。\n\n就在这时，天空突然暗了下来。\n\n一股令人窒息的恐怖剑意，从洗剑池的方向冲天而起，直插云霄！整个青云宗的佩剑，在这一刻，竟然不受控制地剧烈颤抖起来，仿佛在向那股剑意服。`,
          en: `In ancient times, chaos was undivided.\n\nA brilliant sword light emerged from the depths of the universe, splitting the endless darkness. It was not a meteor, but a divine sword, translucent and emitting infinite pressure.\n\nThe divine sword fell upon a barren celestial body, its sword qi surging, transforming into mountains, rivers, sun, moon, and stars. This is the origin of the "Sky Sword Realm."\n\nTens of thousands of years later, Lin Dong, a chore disciple of the Qingyun Sect, was carrying a bucket of spiritual spring water, struggling along a steep mountain path. Born with severed meridians, he could not condense sword qi. In this world where the sword is supreme, he was destined to be a mortal.\n\n"Yo, isn't this our 'severed meridian genius' Lin Dong? What, still daydreaming about becoming a sword immortal?" Several teenagers in outer disciple robes blocked his path, their faces full of sarcasm.\n\nLin Dong didn't speak, just silently clenched his fists. His gaze passed over these mockers, looking towards the "Sword Washing Pool" at the highest point of the Qingyun Sect. There, a legendary broken sword that fell from the heavens was embedded.\n\nJust then, the sky suddenly darkened.\n\nA suffocatingly terrifying sword intent rose from the direction of the Sword Washing Pool, piercing straight into the clouds! At this moment, all the swords in the Qingyun Sect began to tremble violently uncontrollably, as if bowing to that sword intent.`,
          ja: `太古の昔、混沌はまだ分かれていなかった。\n\n宇宙の深淵から一条の輝かしい剣光が突如として現れ、果てしない暗闇を切り裂いた。それは流星ではなく、全身が透き通り、無限の威圧感を放つ神剣だった。\n\n神剣は荒涼とした天体に墜落し、剣気が激しく揺れ動き、山川、河川、日月、星辰へと姿を変えた。これが「蒼穹剣界」の由来である。\n\n数万年後、青雲宗の雑役弟子である林動は、一桶の霊泉水を提げ、険しい山道を苦労して歩いていた。彼は生まれつき経脈が絶たれており、剣気を凝縮することができなかった。剣が尊ばれるこの世界で、彼は凡人として生きる運命だった。\n\n「おや、これは我らが『絶脈の天才』林動じゃないか？まだ剣仙になるなんて白昼夢を見ているのか？」外門弟子の服を着た数人の少年が彼の行く手を阻み、顔には嘲笑を浮かべていた。\n\n林動は何も言わず、ただ黙って拳を握りしめた。彼の視線は嘲笑う人々を通り越し、青雲宗の最高峰にある「洗剣池」へと向けられた。そこには、天外から墜落したという伝説の断剣が突き刺さっていた。\n\nその時、空が突然暗くなった。\n\n洗剣池の方向から、息が詰まるような恐怖の剣意が天に向かって立ち昇り、雲を突き抜けた！この瞬間、青雲宗にあるすべての剣が、制御不能なほど激しく震え始め、まるでその剣意にひれ伏しているかのようだった。`
        }
      },
      {
        id: 'c-1-2',
        title: { zh: '第一章：断剑重铸', en: 'Chapter 1: Recasting the Broken Sword', ja: '第一章：断剣重鋳' },
        wordCount: 2150,
        content: {
          zh: `洗剑池畔，狂风大作。\n\n青云宗的长老们纷纷御剑赶来，面色凝重地看着池中心那把剧烈震颤的断剑。这把剑自青云宗开宗立派以来便存在于此，历代宗主都无法将其拔出，更别提让它产生如此异象。\n\n“难道是神剑有灵，即将择主？”大长老抚须沉吟，眼中闪过一丝贪婪。\n\n而在人群的外围，林动不知何时已经来到了这里。他双眼通红，仿佛失去了理智一般，一步步向洗剑池走去。\n\n“站住！杂役弟子不得靠近洗剑池！”一名执事大声喝道，伸手便要抓向林动。\n\n然而，就在他的手即将触碰到林动的一瞬间，一道凌厉的剑气从林动体内爆发而出，直接将那名执事震飞了出去！\n\n全场震惊。一个天生绝脉的废物，体内怎么会有如此恐怖的剑气？\n\n林动没有理会众人的惊骇，他径直走入洗剑池，池水瞬间沸腾。他伸出手，握住了那把断剑的剑柄。\n\n轰！\n\n一道耀眼的光芒冲天而起，将整个青云宗照耀得如同白昼。在光芒中，林动看到了一片浩瀚的星空，以及一位白衣胜雪的剑仙，正微笑着看着他。\n\n“吾乃太古剑尊，今传你《混沌剑诀》，望你重铸神剑，斩破这虚伪的苍穹！”\n\n古老的声音在林动脑海中回荡。当光芒散去，林动依旧站在原地，但他手中的断剑，却已经焕然一新，散发着令人心悸的寒芒。而他原本堵塞的经脉，也已经被霸道的混沌剑气彻底贯通！`,
          en: `By the Sword Washing Pool, a fierce wind roared.\n\nThe elders of the Qingyun Sect arrived one after another on their swords, looking solemnly at the violently trembling broken sword in the center of the pool. This sword had existed here since the founding of the Qingyun Sect. Past sect masters had been unable to pull it out, let alone cause such an anomaly.\n\n"Could it be that the divine sword has a spirit and is about to choose a master?" The Great Elder stroked his beard and pondered, a hint of greed flashing in his eyes.\n\nOn the periphery of the crowd, Lin Dong had arrived at some point. His eyes were bloodshot, as if he had lost his reason, walking step by step towards the Sword Washing Pool.\n\n"Stop! Chore disciples are not allowed to approach the Sword Washing Pool!" A deacon shouted loudly, reaching out to grab Lin Dong.\n\nHowever, the moment his hand was about to touch Lin Dong, a sharp sword qi erupted from Lin Dong's body, directly blasting the deacon away!\n\nThe whole scene was shocked. How could a waste born with severed meridians have such terrifying sword qi in his body?\n\nLin Dong ignored the shock of the crowd. He walked straight into the Sword Washing Pool, the water boiling instantly. He reached out and grasped the hilt of the broken sword.\n\nBoom!\n\nA dazzling light soared into the sky, illuminating the entire Qingyun Sect like daylight. In the light, Lin Dong saw a vast starry sky and a sword immortal in snow-white clothes, smiling at him.\n\n"I am the Ancient Sword Sovereign. Today I pass to you the 'Chaos Sword Manual'. I hope you recast the divine sword and slash through this hypocritical sky!"\n\nThe ancient voice echoed in Lin Dong's mind. When the light dissipated, Lin Dong still stood in place, but the broken sword in his hand was brand new, emitting a heart-palpitating cold light. And his originally blocked meridians had been completely cleared by the domineering Chaos Sword Qi!`,
          ja: `洗剣池のほとりで、強風が吹き荒れていた。\n\n青雲宗の長老たちが次々と剣に乗って駆けつけ、池の中央で激しく震える断剣を厳粛な面持ちで見つめていた。この剣は青雲宗の開山以来ここに存在しており、歴代の宗主もこれを引き抜くことはおろか、このような異象を起こさせることさえできなかった。\n\n「まさか神剣に霊が宿り、主を選ぼうとしているのか？」大長老は髭を撫でながら沈思黙考し、その目には強欲な光がよぎった。\n\n群衆の外側では、林動がいつの間にかそこに来ていた。彼の目は血走り、まるで理性を失ったかのように、一歩一歩洗剣池へと歩み寄っていった。\n\n「止まれ！雑役弟子は洗剣池に近づくことは許されん！」一人の執事が大声で怒鳴り、林動を捕まえようと手を伸ばした。\n\nしかし、その手が林動に触れようとした瞬間、林動の体内から鋭い剣気が爆発し、その執事を直接吹き飛ばした！\n\n全場が震撼した。生まれつき経脈が絶たれた廃棄物が、なぜ体内にこれほど恐怖の剣気を持っているのか？\n\n林動は人々の驚愕を気に留めず、そのまま洗剣池へと足を踏み入れた。池の水は瞬時に沸騰した。彼は手を伸ばし、断剣の柄を握った。\n\nドーン！\n\nまばゆい光が天に向かって立ち昇り、青雲宗全体を白昼のように照らし出した。光の中で、林動は広大な星空と、雪のように白い服を着た剣仙が自分に微笑みかけているのを見た。\n\n「我は太古の剣尊なり。今日、汝に『混沌剣訣』を授ける。神剣を再鋳し、この偽りの蒼穹を斬り裂くことを願う！」\n\n古の声が林動の脳裏に響き渡った。光が消え去った時、林動は依然としてその場に立っていたが、彼の手にある断剣は一新され、人を震え上がらせるような冷たい光を放っていた。そして、もともと詰まっていた彼の経脈も、覇道な混沌の剣気によって完全に貫通されていた！`
        }
      }
    ]
  },
  {
    id: 'w-2',
    name: { zh: '待启之卷 · 二', en: 'Unopened Scroll · II', ja: '未開封の巻 · 二' },
    genre: { zh: '赛博朋克', en: 'Cyberpunk', ja: 'サイバーパンク' },
    shortDescription: { 
      zh: '在永不停止降雨的超级都市中，寻找真实的自我。', 
      en: 'Find your true self in a megacity where the rain never stops.', 
      ja: '雨が止むことのない超巨大都市で、真実の自分を探す。' 
    },
    imageUrl: 'https://picsum.photos/seed/cyberpunk/1920/1080?blur=2',
    chapters: [
      {
        id: 'c-2-1',
        title: { zh: '任务 01：雨夜的包裹', en: 'Mission 01: Package in the Rainy Night', ja: 'ミッション 01：雨夜の小包' },
        wordCount: 1580,
        content: {
          zh: `新伊甸城的雨，似乎永远也不会停。\n\n酸雨打在K的黑色风衣上，发出细微的嘶嘶声。他站在一条阴暗的小巷里，头顶是巨大的全息广告牌，一个虚拟偶像正用甜美的声音推销着最新款的神经义体。\n\nK深吸了一口合成烟草，吐出一个蓝色的烟圈。他的左眼闪烁着微弱的红光——那是军用级义眼正在扫描周围的环境。\n\n“目标已确认，K。包裹在三号储物柜，密码是你第一次死掉的日期。”通讯器里传来搭档“幽灵”那经过变声器处理的电子音。\n\nK掐灭了烟头，走向巷子深处的一排破旧储物柜。他熟练地输入了一串数字：20990401。\n\n咔哒一声，柜门弹开了。里面放着一个银色的手提箱。\n\n就在K的手指触碰到手提箱的瞬间，他的神经接口突然传来一阵剧烈的刺痛。警告视窗在他的视网膜上疯狂闪烁：\n\n【警告：检测到未授权的神经入侵！】\n【警告：防火墙已被突破！】\n\n“幽灵！有埋伏！”K大吼一声，猛地拔出腰间的电磁手枪。\n\n巷子两端，几个身穿黑色战术服、面戴防毒面具的人影悄然出现。他们的机械义肢在霓虹灯下闪烁着冰冷的金属光泽。\n\n“交出包裹，K。创世纪财阀向你问好。”领头的人冷冷地说道。`,
          en: `The rain in New Eden City seems like it will never stop.\n\nAcid rain hit K's black trench coat, making a slight hissing sound. He stood in a dark alley, above him a giant holographic billboard where a virtual idol was promoting the latest neural prosthetic in a sweet voice.\n\nK took a deep breath of synthetic tobacco and blew out a blue smoke ring. His left eye flickered with a faint red light—it was a military-grade artificial eye scanning the surroundings.\n\n"Target confirmed, K. The package is in locker number three, the password is the date you first died." The electronic voice of his partner "Ghost," processed through a voice changer, came through the communicator.\n\nK stubbed out his cigarette and walked towards a row of dilapidated lockers deep in the alley. He skillfully entered a string of numbers: 20990401.\n\nWith a click, the locker door popped open. Inside was a silver briefcase.\n\nThe moment K's fingers touched the briefcase, a sharp pain suddenly shot through his neural interface. Warning windows flashed frantically on his retina:\n\n[WARNING: Unauthorized neural intrusion detected!]\n[WARNING: Firewall breached!]\n\n"Ghost! It's an ambush!" K roared, suddenly drawing the electromagnetic pistol from his waist.\n\nAt both ends of the alley, several figures in black tactical suits and gas masks appeared quietly. Their mechanical limbs glinted with cold metallic luster under the neon lights.\n\n"Hand over the package, K. Genesis Corp sends its regards," the leader said coldly.`,
          ja: `ニューエデン市の雨は、永遠に止むことがないかのようだ。\n\n酸性雨がKの黒いトレンチコートに当たり、かすかなシューという音を立てている。彼は暗い路地に立っており、頭上には巨大なホログラム広告板があり、バーチャルアイドルが甘い声で最新の神経義体を宣伝していた。\n\nKは合成タバコを深く吸い込み、青い煙の輪を吐き出した。彼の左目はかすかな赤い光を放っていた。それは軍用グレードの義眼が周囲をスキャンしている合図だった。\n\n「ターゲット確認、K。小包は3番のロッカーにある。パスワードは君が初めて死んだ日だ」通信機から、ボイスチェンジャーで加工された相棒「ゴースト」の電子音が聞こえてきた。\n\nKはタバコの火を消し、路地の奥にある古びたロッカーへと向かった。彼は手慣れた様子で数字を入力した：20990401。\n\nカチリと音がして、ロッカーの扉が開いた。中には銀色のアタッシュケースが入っていた。\n\nKの指がアタッシュケースに触れた瞬間、彼の神経インターフェースに突然激しい痛みが走った。警告ウィンドウが彼の網膜上で狂ったように点滅した：\n\n【警告：未承認の神経侵入を検知！】\n【警告：ファイアウォールが突破されました！】\n\n「ゴースト！伏兵だ！」Kは大声で叫び、腰の電磁ピストルを素早く引き抜いた。\n\n路地の両端に、黒いタクティカルスーツを着てガスマスクを被った数人の人影が静かに現れた。彼らの機械の義肢が、ネオンの下で冷たい金属の光沢を放っていた。\n\n「小包を渡せ、K。ジェネシス財閥がよろしくと言っているぞ」リーダーの男が冷ややかに言った。`
        }
      }
    ]
  },
  {
    id: 'w-3',
    name: { zh: '待启之卷 · 三', en: 'Unopened Scroll · III', ja: '未開封の巻 · 三' },
    genre: { zh: '末世废土', en: 'Post-Apocalyptic', ja: 'ポスト・アポカリプス' },
    shortDescription: { 
      zh: '文明毁灭后的荒原，唯有意志永存。', 
      en: 'In the wasteland after civilization\'s destruction, only will endures.', 
      ja: '文明崩壊後の荒野で、意志だけが永遠に残る。' 
    },
    imageUrl: 'https://picsum.photos/seed/wasteland/1920/1080?blur=2',
    chapters: [
      {
        id: 'c-3-1',
        title: { zh: '第一章：风沙中的旅人', en: 'Chapter 1: Traveler in the Sandstorm', ja: '第一章：風砂の中の旅人' },
        wordCount: 1420,
        content: {
          zh: `漫天的黄沙遮蔽了太阳，整个世界都笼罩在一片昏黄之中。\n\n老陈紧了紧脸上的防毒面具，费力地在没过脚踝的沙地中行走。他的身后拖着一个沉重的金属雪橇，上面堆满了从废墟中搜刮来的零件。\n\n在这个被称为“大寂灭”后的时代，金属比黄金更珍贵，而干净的水则是生命的唯一货币。\n\n“咳咳……”老陈剧烈地咳嗽起来，面具的滤芯已经快到极限了。他必须在天黑前赶到最近的避难所，否则那些在夜晚出没的变异生物会把他撕成碎片。\n\n突然，他在沙丘的背风处发现了一个奇怪的物体。那是一个半埋在沙子里的金属舱，舱门上印着一个已经模糊不清的标志：一个齿轮环绕着一颗心脏。\n\n“先民的遗迹？”老陈浑浊的眼中闪过一丝精光。他知道，这可能意味着一笔巨大的财富，也可能意味着死亡。`,
          en: `Yellow sand filled the sky, obscuring the sun, and the entire world was shrouded in a dim yellow haze.\n\nOld Chen tightened the gas mask on his face, struggling to walk through the ankle-deep sand. Behind him, he dragged a heavy metal sled piled high with parts scavenged from the ruins.\n\nIn this era after what was called the "Great Silence," metal was more precious than gold, and clean water was the only currency of life.\n\n"Cough, cough..." Old Chen coughed violently; the mask's filter was reaching its limit. He had to reach the nearest shelter before dark, or the mutated creatures that came out at night would tear him to pieces.\n\nSuddenly, he found a strange object on the leeward side of a sand dune. It was a metal capsule half-buried in the sand, with a faded logo on the door: a gear surrounding a heart.\n\n"Relic of the Ancients?" A glint flashed in Old Chen's cloudy eyes. He knew this could mean a vast fortune, or it could mean death.`,
          ja: `空一面の黄砂が太陽を遮り、世界全体が薄暗い黄色に包まれていた。\n\n老陳は顔のガスマスクを締め直し、足首まで埋まる砂地を苦労して歩いていた。彼の背後には、廃墟からかき集めた部品が山積みになった重い金属製のソリが引かれていた。\n\n「大寂滅」と呼ばれる時代の後、金属は金よりも貴重になり、きれいな水が生命の唯一の通貨となった。\n\n「ゴホゴホ……」老陳は激しく咳き込んだ。マスクのフィルターはすでに限界に近づいていた。暗くなる前に最寄りの避難所にたどり着かなければ、夜に出没する変異生物たちにバラバラにされてしまうだろう。\n\n突然、彼は砂丘の風下側に奇妙な物体を見つけた。それは砂に半分埋まった金属製のカプセルで、ハッチにはすでにぼやけてしまったロゴが印されていた：心臓を囲む歯車だ。\n\n「先民の遺跡か？」老陳の濁った目に鋭い光が宿った。彼は、これが莫大な富を意味するかもしれないし、死を意味するかもしれないことを知っていた。`
        }
      }
    ]
  },
  {
    id: 'w-4',
    name: { zh: '待启之卷 · 四', en: 'Unopened Scroll · IV', ja: '未開封の巻 · 四' },
    genre: { zh: '奇幻魔法', en: 'Fantasy Magic', ja: 'ファンタジー魔法' },
    shortDescription: { 
      zh: '在真理的尽头，魔法与神迹并存。', 
      en: 'At the end of truth, magic and miracles coexist.', 
      ja: '真理の果てに、魔法と奇跡が共存する。' 
    },
    imageUrl: 'https://picsum.photos/seed/magic/1920/1080?blur=2',
    chapters: [
      {
        id: 'c-4-1',
        title: { zh: '第一章：禁忌的符文', en: 'Chapter 1: Forbidden Runes', ja: '第一章：禁忌のルーン' },
        wordCount: 1890,
        content: {
          zh: `圣玛丽亚魔法学院的图书馆，是整个大陆知识最密集的地方。\n\n年轻的学徒艾伦正躲在最偏僻的角落里，翻阅着一本封面破旧、散发着霉味的古籍。他的手指轻轻划过那些扭曲的符文，心中充满了莫名的悸动。\n\n“艾伦！你又在偷看这些被禁止的研究了！”一个严厉的声音在身后响起。\n\n艾伦吓了一跳，连忙合上书本。转过头，只见导师梅林正一脸严肃地看着他。\n\n“老师，我只是好奇……这些符文代表了什么？”艾伦小声辩解道。\n\n梅林叹了口气，走到他身边，目光复杂地看着那本书。“那是失落的奥术语言，艾伦。它们拥有改变现实的力量，但也足以毁灭施法者的灵魂。在没有掌握基础的元素魔法之前，绝对不能触碰它们。”\n\n“可是老师，我感觉到它们在对我说话。”艾伦抬起头，双眼清澈而坚定。\n\n梅林愣住了。他想起了那个古老的预言：当真理之门再次开启，唯有能听见符文低语的人，才能指引众生。`,
          en: `The library of St. Maria Academy of Magic is the most knowledge-dense place on the entire continent.\n\nYoung apprentice Alan was hiding in the most remote corner, flipping through an ancient book with a worn cover that smelled of mold. His fingers lightly brushed over those twisted runes, and his heart was filled with an inexplicable throb.\n\n"Alan! You're peeking at those forbidden studies again!" A stern voice sounded behind him.\n\nAlan was startled and quickly closed the book. Turning around, he saw Master Merlin looking at him with a serious face.\n\n"Teacher, I'm just curious... what do these runes represent?" Alan defended in a small voice.\n\nMerlin sighed, walked to his side, and looked at the book with a complex gaze. "That is the lost arcane language, Alan. They possess the power to change reality, but they are also enough to destroy the caster's soul. Before mastering basic elemental magic, you must never touch them."\n\n"But teacher, I feel them talking to me." Alan looked up, his eyes clear and firm.\n\nMerlin was stunned. He remembered that ancient prophecy: When the gate of truth opens again, only those who can hear the whisper of the runes can guide all living beings.`,
          ja: `サンタマリア魔法学院の図書館は、大陸全土で最も知識が密集している場所だ。\n\n若き見習いのエレンは、最も人目に付かない隅に隠れ、表紙が古びてカビ臭い古書をめくっていた。彼の指がそれらの歪んだルーン文字を軽く撫でると、心の中に言いようのない鼓動が満ち溢れた。\n\n「エレン！またそんな禁じられた研究を盗み見ているのか！」背後で厳しい声が響いた。\n\nエレンは飛び上がり、慌てて本を閉じた。振り返ると、師であるマーリンが険しい表情で彼を見ていた。\n\n「先生、僕はただ好奇心で……これらのルーンは何を意味しているんですか？」エレンは小さな声で弁解した。\n\nマーリンはため息をつき、彼のそばに歩み寄って、複雑な眼差しでその本を見つめた。「それは失われた秘術の言語だ、エレン。それらは現実を変える力を持っているが、術者の魂を滅ぼすのにも十分だ。基礎的な元素魔法を習得する前に、決して触れてはならない」\n\n「でも先生、彼らが僕に話しかけているのを感じるんです」エレンは顔を上げ、その瞳は澄んでいて揺るぎなかった。\n\nマーリンは呆然とした。彼はあの古い予言を思い出した：真理の門が再び開かれる時、ルーンの囁きを聞くことができる者だけが、衆生を導くことができる。`
        }
      }
    ]
  }
];
