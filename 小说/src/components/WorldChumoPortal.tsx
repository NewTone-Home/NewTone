import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Compass, UserCircle, ScrollText } from 'lucide-react';
import { progressService } from '../services/progressService';
import { useTheme } from '../contexts/ThemeContext';

interface WorldChumoPortalProps {
  language?: string;
  showToast?: (msg: string) => void;
  topRightControls?: React.ReactNode;
}

// Minimal placeholder SVGs to be drawn via CSS masks or raw shapes
// Night theme uses middle gray (#5A5A5A), Day theme uses solid black.
const ProtagonistSVG = ({ id, active, themeColor }: { id: string, active: boolean, themeColor: string }) => {
  const { theme } = useTheme();
  const fillColor = active ? `var(${themeColor})` : (theme === 'night' ? '#5A5A5A' : '#000000');
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bottom-0 pointer-events-none transition-colors duration-500">
      {id === 'jixiujie' && (
        <svg viewBox="0 0 200 600" className="w-[80%] h-[90%] max-w-[400px] mt-auto origin-bottom transition-all duration-500">
          <path d="M70,150 C70,120 130,120 130,150 C120,180 80,180 70,150 Z" fill={fillColor} />
          <path d="M50,180 Q100,160 150,180 L160,350 L130,350 L110,600 L90,600 L70,350 L40,350 Z" fill={fillColor} />
          <path d="M30,200 Q20,250 40,300 C45,300 50,250 50,200 Z" fill={fillColor} />
          <path d="M170,200 Q180,250 160,300 C155,300 150,250 150,200 Z" fill={fillColor} />
        </svg>
      )}
      {id === 'sunruoyu' && (
        <svg viewBox="0 0 200 600" className="w-[80%] h-[90%] max-w-[400px] mt-auto origin-bottom transition-all duration-500">
          <circle cx="100" cy="140" r="25" fill={fillColor} />
          <path d="M60,180 Q100,160 140,180 L145,280 Q100,290 55,280 Z" fill={fillColor} />
          <path d="M80,280 L120,280 L130,580 L100,580 L100,350 L80,350 L80,580 L70,580 Z" fill={fillColor} />
          <circle cx="150" cy="220" r="15" fill={fillColor} />
        </svg>
      )}
      {id === 'jiyunling' && (
        <svg viewBox="0 0 200 600" className="w-[80%] h-[90%] max-w-[400px] mt-auto origin-bottom transition-all duration-500">
          <ellipse cx="100" cy="130" rx="20" ry="25" fill={fillColor} />
          <path d="M70,170 Q100,150 130,170 L135,280 Q100,290 65,280 Z" fill={fillColor} />
          <path d="M80,280 L120,280 L120,400 Q100,420 80,400 Z" fill={fillColor} />
          <path d="M85,400 L115,400 L110,600 L100,600 L100,450 L90,450 L90,600 L85,600 Z" fill={fillColor} />
          <path d="M40,250 L160,150 L162,152 L42,252 Z" fill={fillColor} /> 
        </svg>
      )}
      {id === 'grandpa' && (
        <svg viewBox="0 0 200 600" className="w-[80%] h-[90%] max-w-[400px] mt-auto origin-bottom transition-all duration-500">
          <ellipse cx="100" cy="170" rx="22" ry="24" fill={fillColor} />
          <path d="M75,210 Q100,195 125,210 C140,300 130,350 120,400 L80,400 C70,350 60,300 75,210 Z" fill={fillColor} />
          <path d="M80,400 L120,400 L120,600 L80,600 Z" fill={fillColor} />
          <path d="M60,250 Q60,300 65,600 L55,600 Q50,300 50,250 Q60,240 60,250 Z" fill={fillColor} /> 
        </svg>
      )}
    </div>
  );
};

const protagonists = [
  {
    id: 'jixiujie',
    pinyin: 'JI XIUJIE',
    name: '姬修杰',
    num: 'I',
    tags: ['姬家继承人', '寻妹者', '表里行者'],
    quote: '五年了，她终于回来了。',
    desc: '姬家年轻一代中最清醒的那个。\n五年前妹妹失踪，他停下了所有事情。\n表面上，他只是个回到老城区开馆的普通人。\n但他身上的晶石信物，在过去三个月开始发热——\n这意味着有人正在另一侧操作。',
    unlocked: progressService.getProtagonistProgress('jixiujie'),
    unlockVersion: '',
    colorVar: '--ch-jixiujie',
    meta: '约 3 章 · 约 2.5 万字 · 已完成 0%'
  },
  {
    id: 'sunruoyu',
    pinyin: 'SUN RUOYU',
    name: '孙若雨',
    num: 'II',
    tags: ['神机百炼', '天才游侠', '巧夺天工'],
    quote: '机巧并非玩物，而是解析世界的锁钥。',
    desc: '出身神机城的天才少女，却在成年礼前夜带走禁忌图纸。\n对于她来说，世界只是一个由齿轮和灵力构成的庞大机械。\n她的目标是找到传说中“最初的发条”...\n为此，她不惜与所有势力为敌。',
    unlocked: progressService.getProtagonistProgress('sunruoyu'),
    unlockVersion: 'v2.0',
    colorVar: '--ch-ruoyu',
    meta: '约 5 章 · 约 4.2 万字 · 已完成 0%'
  },
  {
    id: 'jiyunling',
    pinyin: 'JI YUNLING',
    name: '姬云灵',
    num: 'III',
    tags: ['剑道天才', '被抹杀的过往', '冷若冰霜'],
    quote: '这一剑，只为斩断过去。',
    desc: '曾经被寄予厚望的剑道天才，却在一场意外后失去了所有记忆。\n她的剑法凌厉而无情，仿佛只为了斩杀而存在。\n现在的她，只是一个在表里世界之间游荡的幽灵，寻找着那个能让她想起过去的契机。',
    unlocked: progressService.getProtagonistProgress('jiyunling'),
    unlockVersion: 'v3.0',
    colorVar: '--ch-yunling',
    meta: '约 4 章 · 约 3.8 万字 · 已完成 0%'
  },
  {
    id: 'grandpa',
    pinyin: 'MYSTERY ELDER',
    name: '神秘老者',
    num: 'IV',
    tags: ['青云宗扫地僧', '隐世高人', '守护秘密'],
    quote: '年轻人的世界，就交给年轻人吧。',
    desc: '默默无闻地在老城区开了几十年茶馆的老人。\n没人知道他的真名，也没人知道他的过去。\n他总是在恰当的时候出现，给出一些莫名其妙的建议。\n他的眼神深邃，仿佛能看穿一切表象，直达里世界的深渊。',
    unlocked: progressService.getProtagonistProgress('grandpa'),
    unlockVersion: 'v4.0',
    colorVar: '--ch-grandpa',
    meta: '约 2 章 · 约 1.5 万字 · 已完成 0%'
  }
];

export const WorldChumoPortal: React.FC<WorldChumoPortalProps> = ({ 
  showToast,
  topRightControls
}) => {
  const navigate = useNavigate();
  const [selectedProId, setSelectedProId] = useState<string | null>(null);
  const [hoveredProId, setHoveredProId] = useState<string | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const selectedPro = protagonists.find(p => p.id === selectedProId);

  const handleEnterStory = () => {
    if (selectedPro) {
      setIsFadingOut(true);
      setTimeout(() => {
        navigate(`/worlds/chumo/${selectedPro.id}`);
      }, 600);
    }
  };

  const handleCardClick = (id: string, isUnlocked: boolean) => {
    if (!isUnlocked) return;
    setSelectedProId(id);
  };

  const handleBackToGrid = () => {
    setSelectedProId(null);
  };

  return (
    <div className={`h-screen w-screen bg-[var(--bg-primary)] text-[var(--ink-primary)] overflow-hidden font-sans relative transition-colors duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* ⬅️ Top Left Back Button (Only visible when Details shows) */}
      <AnimatePresence>
        {selectedProId && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={handleBackToGrid}
            className="absolute top-8 left-8 z-[100] flex items-center gap-2 group hover:text-[var(--accent-brass)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-sans font-bold tracking-widest text-sm">返回选择</span>
          </motion.button>
        )}
      </AnimatePresence>

      {topRightControls && (
        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-[100] pointer-events-auto">
          {topRightControls}
        </div>
      )}

      {/* TOP 75% Grid Area */}
      <div className="absolute top-0 left-0 w-full h-[75%] flex z-10">
        <AnimatePresence initial={false}>
          {protagonists.map((pro) => {
            const isHovered = hoveredProId === pro.id;
            const isSelected = selectedProId === pro.id;
            const isOtherSelected = selectedProId !== null && !isSelected;
            const isLocked = !pro.unlocked;
            
            // Calculate width and position
            let width = "25%";
            let opacity = 1;
            if (isOtherSelected) {
              width = "0%";
              opacity = 0;
            } else if (isSelected) {
              width = "40%";
            }

            return (
              <motion.div
                key={pro.id}
                layout
                initial={false}
                animate={{ width, opacity }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                onMouseEnter={() => setHoveredProId(pro.id)}
                onMouseLeave={() => setHoveredProId(null)}
                onClick={() => handleCardClick(pro.id, pro.unlocked)}
                className={`relative h-full overflow-hidden border-r border-[var(--border-subtle)] ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'} ${opacity === 0 ? 'pointer-events-none' : ''}`}
                style={{ 
                  backgroundColor: ((isHovered && !isLocked && !selectedProId) || isSelected)
                      ? `color-mix(in srgb, var(${pro.colorVar}) 12%, transparent)` 
                      : 'transparent'
                }}
              >
                {/* Content Container (Needs to fade if width shrinks) */}
                <motion.div className="w-[300px] absolute h-full left-1/2 -translate-x-1/2 flex items-end justify-center pb-[10%] pointer-events-none">
                  {/* Miniature Roman Numeral */}
                  <span className="absolute top-12 left-1/2 -translate-x-1/2 font-serif text-sm tracking-widest text-[var(--ink-secondary)]">
                    {pro.num}
                  </span>

                  {/* Character Silhouette SVG */}
                  <motion.div 
                    animate={{ scale: ((isHovered && !isLocked) || isSelected) ? 1.08 : 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="w-full h-full relative flex items-end justify-center"
                  >
                     <ProtagonistSVG id={pro.id} active={(isHovered && !isLocked) || isSelected} themeColor={pro.colorVar} />
                  </motion.div>

                  {/* Character Info Overlay */}
                  <div className="absolute top-[20%] w-full flex flex-col items-center">
                    <h3 className={`font-sans tracking-[0.2em] transition-colors duration-300 font-bold ${(isHovered && !isLocked) || isSelected ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-secondary)]'}`}
                        style={{ color: ((isHovered && !isLocked) || isSelected) ? `var(${pro.colorVar})` : '' }}>
                      {isLocked ? '封印中' : pro.name}
                    </h3>
                    <p className={`font-sans text-xs tracking-widest mt-1 opacity-60 ${(isHovered && !isLocked) || isSelected ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-secondary)]'}`}>
                      {isLocked ? `将于 ${pro.unlockVersion} 启封` : pro.pinyin}
                    </p>
                    {isLocked && <Lock className="w-4 h-4 mt-2 text-[var(--accent-seal)]" />}
                  </div>

                  {/* Tooltip for hover locked */}
                  {isLocked && isHovered && (
                     <div className="absolute top-1/2 bg-[var(--bg-secondary)] border border-[var(--accent-seal)]/30 text-[var(--ink-primary)] px-4 py-2 text-xs font-sans tracking-widest z-20 shadow-xl">
                       封印中 · 将于后续版本解禁
                     </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Selected Details Panel (Right 60%) */}
        <AnimatePresence>
          {selectedProId && selectedPro && (
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute right-0 top-0 w-[60%] h-full flex flex-col items-start justify-center pr-[10%] pl-[5%] z-20"
            >
              <div className="flex flex-col items-start text-left max-w-2xl w-full">
                {/* Meta Head */}
                <h4 className="text-xs font-serif tracking-widest uppercase text-[var(--accent-brass)] mb-4">
                  PROTAGONIST {selectedPro.num} · 初墨卷
                </h4>

                {/* Names */}
                <h1 className="text-6xl font-display font-medium tracking-[0.1em] text-[var(--ink-primary)] drop-shadow-md mb-2">
                  {selectedPro.pinyin}
                </h1>
                <h2 className="text-2xl font-sans tracking-widest font-normal text-[var(--ink-primary)] mb-6 opacity-80" 
                    style={{ color: `var(${selectedPro.colorVar})` }}>
                  {selectedPro.name}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {selectedPro.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs font-sans tracking-widest border border-[var(--border-subtle)] text-[var(--ink-secondary)] bg-[var(--bg-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg font-serif italic text-[var(--ink-primary)] border-l-2 border-[var(--accent-brass)] pl-4 py-1 mb-8 tracking-wider">
                  "{selectedPro.quote}"
                </p>

                {/* Description */}
                <div className="text-sm font-sans text-[var(--ink-secondary)] tracking-widest leading-relaxed mb-12 whitespace-pre-line max-w-lg">
                  {selectedPro.desc}
                </div>

                {/* CTA */}
                <motion.button 
                  onClick={handleEnterStory}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 bg-[var(--bg-secondary)] border border-[var(--accent-brass)] font-sans text-sm tracking-widest font-bold uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:bg-[var(--accent-brass)] text-[var(--ink-primary)] hover:text-white flex items-center gap-3 relative overflow-hidden group"
                >
                  <span className="relative z-10 transition-colors">进入 {selectedPro.name} 的记忆 →</span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-[150%] animate-[scanline-fast_3s_ease-in-out_infinite]" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM 25% Mode Switch Area */}
      <div className="absolute bottom-[24px] left-0 w-full h-[calc(25%-24px)] border-t border-[var(--border-subtle)] flex z-10 bg-[var(--bg-primary)]">
        {/* Left Toggle (Active on this page) */}
        <div className="flex-1 border-r border-[var(--border-subtle)] relative flex flex-col items-center justify-center cursor-pointer group"
             style={{ backgroundColor: 'color-mix(in srgb, var(--accent-brass) 5%, transparent)' }}>
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent-brass)]" />
          <UserCircle className="w-8 h-8 text-[var(--ink-primary)] mb-4" />
          <h2 className="text-2xl font-serif tracking-[0.2em] font-bold text-[var(--ink-primary)] mb-2">选择同行者</h2>
          <p className="text-xs font-sans uppercase tracking-[0.3em] font-bold text-[var(--ink-secondary)] mb-1">Character-Led</p>
          <p className="text-[10px] font-sans tracking-widest text-[var(--ink-secondary)] opacity-60">跟随一位同行者的视角，看 TA 眼中的故事</p>
        </div>

        {/* Right Toggle */}
        <div className="flex-1 relative flex flex-col items-center justify-center cursor-pointer group hover:bg-[var(--border-subtle)]/10 transition-colors"
             onClick={() => navigate('/read/sequential')}>
          <ScrollText className="w-8 h-8 text-[var(--ink-secondary)] mb-4 group-hover:text-[var(--ink-primary)] transition-colors" />
          <h2 className="text-2xl font-serif tracking-[0.2em] font-bold text-[var(--ink-secondary)] group-hover:text-[var(--ink-primary)] transition-colors mb-2">只看故事线</h2>
          <p className="text-xs font-sans uppercase tracking-[0.3em] font-bold text-[var(--ink-secondary)] mb-1">Story-Led</p>
          <p className="text-[10px] font-sans tracking-widest text-[var(--ink-secondary)] opacity-60">跳过选择，按章节发布顺序读下去</p>
        </div>
      </div>

      {/* FOOTER 极小栏 - 24px */}
      <div className="absolute bottom-0 w-full h-[24px] bg-[var(--bg-secondary)] flex items-center justify-between px-8 z-30 font-display text-[10px] tracking-widest text-[var(--ink-secondary)] uppercase">
        <div className="flex items-center gap-2">
          <Compass className="w-3 h-3" />
          <span>25°13'N · 121°42'E</span>
        </div>
        <div className="text-center font-bold tracking-[0.3em]">
          CARTOGRAPHER'S ARCHIVE · VOLUME I · 初墨卷
        </div>
        <button onClick={() => navigate('/')} className="hover:text-[var(--accent-brass)] transition-colors inline-block cursor-pointer flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> RETURN TO ATLAS
        </button>
      </div>

    </div>
  );
};
