import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. imports
content = content.replace(/import \{ Canvas.*?from '@react-three\/fiber';\n/s, '');
content = content.replace(/import \{.*?\} from '@react-three\/drei';\n/s, '');
content = content.replace(/import \* as THREE from 'three';\n/s, '');

// 2. 3D Components
const startComponents = content.indexOf('const BookPages =');
const endComponents = content.indexOf('// --- Sketch Map Components ---');
if (startComponents !== -1 && endComponents !== -1) {
  content = content.substring(0, startComponents) + content.substring(endComponents);
} else {
  console.log("Failed to find BookPages or Sketch Map Components");
}

// 3. ViewTransition
const startVT = content.indexOf('const ViewTransition =');
const endVT = content.indexOf('// --- Main App Component ---');
if (startVT !== -1 && endVT !== -1) {
  content = content.substring(0, startVT) + content.substring(endVT);
} else {
  console.log("Failed to find ViewTransition or Main App Component");
}

// 4. States
const stateTarget = `  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');
  const [isTransitioningView, setIsTransitioningView] = useState(false);
  const [pendingViewMode, setPendingViewMode] = useState<'3D' | '2D' | null>(null);
  
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggleViewMode = () => {
    if (isTransitioningView) return;
    
    const nextMode = viewMode === '3D' ? '2D' : '3D';
    setPendingViewMode(nextMode);
    setIsTransitioningView(true);
    
    // Switch the view mode in the middle of the transition
    setTimeout(() => {
      setViewMode(nextMode);
    }, 800);

    // End the transition
    setTimeout(() => {
      setIsTransitioningView(false);
      setPendingViewMode(null);
    }, 1600);
  };`;
content = content.replace(stateTarget, `  const viewMode = '2D';\n  const contentRef = useRef<HTMLDivElement>(null);`);

// 5. Overlay usage
const overlayUsage = `      {/* View Mode Transition Overlay */}
      <ViewTransition isTransitioning={isTransitioningView} targetMode={pendingViewMode} language={language} />`;
content = content.replace(overlayUsage, '');

// 6. Button
const buttonUsage = `                  <motion.button 
                    onClick={handleToggleViewMode}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto group relative"
                  >
                    {/* Dynamic Hover Border */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={\`absolute inset-[-12px] border transition-all duration-700 \${(viewMode as string) === '3D' ? 'border-[#cbb387]' : 'border-black/20'}\`} 
                    />

                    <div className={\`p-4 backdrop-blur-md border transition-all duration-700 relative overflow-hidden \${(viewMode as string) === '3D' ? 'bg-[#fcf8f2]/90 border-[#d3cbbd] text-[#4a3b2c] shadow-[0_4px_15px_rgba(139,90,43,0.15)]' : 'bg-black/5 border-black/20 text-black'}\`}>
                      {(viewMode as string) === '3D' ? <PenTool className="w-6 h-6" /> : <Library className="w-6 h-6" />}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap z-50 pointer-events-none">
                       <div className={\`px-3 py-1.5 rounded-sm shadow-xl flex items-center gap-3 \${(viewMode as string) === '3D' ? 'bg-[#4a3b2c] text-[#fcf8f2]' : 'bg-black text-white'}\`}>
                         <div className={\`w-1.5 h-1.5 rounded-full animate-pulse \${(viewMode as string) === '3D' ? 'bg-[#d4b886]' : 'bg-[#fff]'}\`} />
                         <span className="text-[10px] font-serif tracking-[0.2em] uppercase font-bold">
                           {(viewMode as string) === '3D' ? t('nav.manuscript') : t('nav.starMap')}
                         </span>
                       </div>
                       {/* Tooltip Arrow */}
                       <div className={\`w-2 h-2 rotate-45 mx-auto -mt-1 \${(viewMode as string) === '3D' ? 'bg-[#4a3b2c]' : 'bg-black'}\`} />
                    </div>
                  </motion.button>`;
content = content.replace(buttonUsage, '');

// 7. LibraryEnvironment
const envUsage = `            {viewMode === '3D' ? (
              <LibraryEnvironment 
                worlds={worlds} 
                focusedWorld={focusedWorld} 
                setFocusedWorld={setFocusedWorld} 
                language={language}
                onEnterWorld={handleEnterWorld}
              />
            ) : (
              <SketchBackground language={language} />
            )}`;
content = content.replace(envUsage, `            <SketchBackground language={language} />`);

fs.writeFileSync('src/App.tsx', content);

console.log("Cleanup script executed successfully!");
