import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { GlobalHeader } from '../components/GlobalHeader';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { Language } from '../types';

const characterRoutes = [
  { id: 'jixiujie', romanIndex: 'I', key: '1',
    name: { zh: '修 杰', en: 'JI XIUJIE', ja: '修 杰' },
    epithet: { zh: '札', en: 'SCROLL', ja: '札' },
    colorLabel: { zh: '青白', en: 'QINGBAI', ja: '青白' },
    locked: false, unlockChapter: 0,
    dataKey: 'jixiujie' },
  { id: 'sunruoyu', romanIndex: 'II', key: '2',
    name: { zh: '若 雨', en: 'SUN RUOYU', ja: '若 雨' },
    epithet: { zh: '筮', en: 'ORACLE', ja: '筮' },
    colorLabel: { zh: '朱砂', en: 'ZHUSHA', ja: '朱砂' },
    locked: false, unlockChapter: 0,
    dataKey: 'sunruoyu' },
  { id: 'jiyunling', romanIndex: 'III', key: '3',
    name: { zh: '云 灵', en: 'JI YUNLING', ja: '云 灵' },
    epithet: { zh: '笺', en: 'QUILL', ja: '笺' },
    colorLabel: { zh: '胭脂', en: 'YANZHI', ja: '胭脂' },
    locked: true, unlockChapter: 3,
    dataKey: 'jiyunling' },
  { id: 'elder', romanIndex: 'IV', key: '4',
    name: { zh: '长 者', en: 'THE ELDER', ja: '长 者' },
    epithet: { zh: '藏', en: 'ARCHIVE', ja: '藏' },
    colorLabel: { zh: '黄铜', en: 'HUANGTONG', ja: '黄铜' },
    locked: true, unlockChapter: 8,
    dataKey: 'elder' },
];

const letterData: Record<string, any> = {
  jixiujie: {
    quote: {
      zh: '「青石狮子咧开嘴，我听见名字被念出。」',
      en: '"The stone lion parted its jaws; I heard my name spoken."',
      ja: '「石の獅子が口を開き、吾の名が呼ばれるを聞けり。」' },
    excerpt: {
      zh: ['祖宅的夜，安静得像一口古井。',
           '我背着包从车站走回来，脚下的石板上还留着白日的余温。',
           '门推开时，铜环轻响——爷爷不在。',
           '只有那只我从小记忆里的青石狮子，盘踞在门旁。'],
      en: ['The night of the ancestral house was quiet as an old well.',
           'I walked back from the station with my pack, the stone slabs still warm from the day.',
           'The door opened with a bronze ring — Grandfather was not there.',
           'Only the stone lion I had known since childhood crouched by the gate.'],
      ja: ['祖宅の夜は、古井の如く静けし。',
           '駅より背に荷を負いて帰る、石板になお日中の温もり残る。',
           '扉を開くと銅環軽く鸣る——祖父はおらず。',
           '幼き頃より记忆にある青石の獅子のみ、門傍に蹲る。'] },
    storyRoute: '/read/jixiujie',
  },
  sunruoyu: {
    quote: {
      zh: '「灯火深处，那姑娘笑得无端熟悉。」',
      en: '"Deep in the lantern light, her smile — unbearably familiar."',
      ja: '「灯火の奥、あの娘の笑みは故あらず馴染み深し。」' },
    excerpt: {
      zh: ['商业街的灯火把人影切碎。',
           '她站在人潮里，笑得像见过很多次。',
           '我认识她吗？',
           '还是她认识我？'],
      en: ['The commercial street\'s lanterns shattered every silhouette.',
           'She stood in the crowd, smiling as though we had met many times.',
           'Did I know her?',
           'Or did she know me?'],
      ja: ['商店街の灯火、人影を断ち切る。',
           '人波の中に立ちて、幾度も会いしが如く笑う。',
           '吾はあれを識るや。',
           'はた、あれ吾を识るや。'] },
    storyRoute: '/read/sunruoyu',
  },
  jiyunling: {
    quote: {
      zh: '「他说——你来早了。」',
      en: '"\\"You came too early,\\" he said."',
      ja: '「彼は言う——早く来過ぎたり、と。」' },
    excerpt: {
      zh: ['咖啡馆的光线是暗的。',
           '他坐在最里面那张桌子，像早就在等。',
           '我还没开口，他就说了那句话。'],
      en: ['The café light was dim.',
           'He sat at the innermost table, as if he had been waiting.',
           'Before I spoke, he said those words.'],
      ja: ['珈琲店の光は暗し。',
           '彼、奥座に坐す、すでに待ちいるが如し。',
           '吾未だ語らざるに、彼かの言を発す。'] },
    storyRoute: '/read/jiyunling',
  },
  elder: {
    quote: {
      zh: '「封 · 缄」',
      en: '"SEALED · BOUND"',
      ja: '「封 · 缄」' },
    excerpt: {
      zh: ['此卷未启。'],
      en: ['This volume remains sealed.'],
      ja: ['この巻、未だ開かれず。'] },
    storyRoute: '/read/elder',
  },
};

const placeholderText = {
  zh: '（独白正文待作者填入）',
  en: '(Monologue text pending)',
  ja: '（独白本文は著者記入待ち）',
};

const backText = {
  zh: '合上手稿',
  en: 'CLOSE MANUSCRIPT',
  ja: '手稿を閉じる',
};

const ctaText = {
  zh: '进入此人的故事线',
  en: 'ENTER THIS STORYLINE',
  ja: 'この物語线へ',
};

export const WorldsChumoLetter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useTheme();
  const { progress } = useReadingProgress();

  const character = characterRoutes.find(c => c.key === id);
  
  useEffect(() => {
    if (!character || (character.locked && progress < character.unlockChapter)) {
      navigate('/worlds/chumo', { replace: true });
    }
  }, [id, character, progress, navigate]);

  if (!character) return null;

  const data = letterData[character.dataKey];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] relative">
      <GlobalHeader />
      
      <button 
        className="fixed top-20 md:top-24 left-6 md:left-10 z-20 flex items-center gap-2 font-display text-[12px] tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity cursor-pointer uppercase"
        onClick={() => navigate('/worlds/chumo')}
      >
        ← {backText[lang]}
      </button>

      <div className="max-w-[680px] mx-auto pt-32 md:pt-48 pb-32 px-6 md:px-10">
        <div className="flex flex-col items-center">
          <div className="font-display text-[120px] md:text-[180px] opacity-[0.08] text-center leading-none select-none">
            {character.romanIndex}
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl tracking-[0.3em] text-center -mt-10 md:-mt-16 mb-4">
            {character.name[lang]}
          </h1>
          
          <div className="font-display text-sm md:text-base tracking-[0.3em] text-[var(--brass)] uppercase text-center mb-10">
            {character.epithet[lang]} · {character.colorLabel[lang]}
          </div>
          
          <div className="text-center font-display text-[var(--brass)] opacity-30 mb-10 text-2xl">
            ──
          </div>
          
          <blockquote className="font-body text-xl md:text-2xl italic text-center max-w-[500px] mx-auto mb-16 px-4">
            {data.quote[lang]}
          </blockquote>
          
          <div className="w-full space-y-6 md:space-y-8 text-lg leading-relaxed">
            {data.excerpt[lang].map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
            <p className="opacity-40 italic mt-8">{placeholderText[lang]}</p>
          </div>
          
          <button 
            className="mt-16 md:mt-24 px-10 py-4 border border-[var(--brass)] bg-transparent text-[var(--ink)] font-display text-sm tracking-[0.2em] uppercase cursor-pointer transition-all duration-300 hover:bg-[var(--brass)] hover:text-[var(--bg)]"
            onClick={() => navigate(data.storyRoute)}
          >
            {ctaText[lang]} →
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .letter-page { padding: 120px 40px; }
        @media (max-width: 768px) {
          .letter-page { padding: 80px 24px; }
          .font-display.text-[120px] { font-size: 80px; }
        }
      `}} />
    </div>
  );
};

export default WorldsChumoLetter;
