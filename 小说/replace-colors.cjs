const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replacements
const replacements = [
  { p: /bg-\[#f5efe6\]/g, r: 'bg-[var(--bg-primary)]' },
  { p: /bg-\[#f4ece1\]/g, r: 'bg-[var(--bg-primary)]' },
  { p: /bg-\[#E8DBB9\]/g, r: 'bg-[var(--bg-secondary)]' },
  { p: /text-black\/80/g, r: 'text-[var(--ink-primary)]\/80' },
  { p: /text-black\/60/g, r: 'text-[var(--ink-primary)]\/60' },
  { p: /text-black\/40/g, r: 'text-[var(--ink-secondary)]\/60' },
  { p: /text-black\/20/g, r: 'text-[var(--ink-secondary)]\/30' },
  { p: /text-black/g, r: 'text-[var(--ink-primary)]' },
  { p: /bg-black\/10/g, r: 'bg-[var(--ink-primary)]\/10' },
  { p: /bg-black\/5/g, r: 'bg-[var(--ink-primary)]\/5' },
  { p: /bg-black\/20/g, r: 'bg-[var(--ink-primary)]\/20' },
  { p: /bg-black\/40/g, r: 'bg-[var(--ink-primary)]\/40' },
  { p: /bg-black\/80/g, r: 'bg-[var(--ink-primary)]\/80' },
  { p: /bg-black\/60/g, r: 'bg-[var(--ink-primary)]\/60' },
  { p: /bg-black(?![\/w])/g, r: 'bg-[var(--ink-primary)]' },
  { p: /border-black\/20/g, r: 'border-[var(--ink-primary)]\/20' },
  { p: /border-black\/10/g, r: 'border-[var(--ink-primary)]\/10' },
  { p: /border-black\/5/g, r: 'border-[var(--ink-primary)]\/5' },
  { p: /border-black\/40/g, r: 'border-[var(--ink-primary)]\/40' },
  { p: /border-black(?![\/w])/g, r: 'border-[var(--ink-primary)]' },
  // 3D mode colors to use brass
  { p: /text-\[#8b5a2b\]/g, r: 'text-[var(--accent-brass)]' },
  { p: /bg-\[#cbb387\]/g, r: 'bg-[var(--accent-brass)]' },
  { p: /text-\[#a39481\]/g, r: 'text-[var(--accent-brass)]\/80' },
  { p: /text-\[#4a3b2c\]/g, r: 'text-[var(--ink-primary)]' },
  { p: /text-\[#3d2314\]/g, r: 'text-[var(--accent-brass)]' },
  { p: /bg-\[#fcf8f2\]/g, r: 'bg-[var(--bg-secondary)]' },
  // And standard replacements in selection
  { p: /selection:bg-\[#8b5a2b\]/g, r: 'selection:bg-[var(--accent-brass)]' },
  { p: /selection:text-white/g, r: 'selection:text-[var(--bg-primary)]' },
  { p: /text-white/g, r: 'text-[var(--bg-primary)]' }
];

replacements.forEach(({p, r}) => {
  code = code.replace(p, r);
});

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('App.tsx updated');
