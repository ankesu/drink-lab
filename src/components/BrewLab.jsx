import { useState, useRef, useCallback } from 'react';
import { ingredients, findRecipe, mixColors, ingredientCategories } from '../data/recipes';
import { Sparkles, Skull, Book, Beaker, Droplets } from 'lucide-react';

export default function BrewLab({ game, onNavigate }) {
  const [selected, setSelected] = useState([]);
  const [brewing, setBrewing] = useState(false);
  const [result, setResult] = useState(null);
  const [bubbles, setBubbles] = useState([]);
  const [particles, setParticles] = useState([]);
  const [smokes, setSmokes] = useState([]);
  const [showDark, setShowDark] = useState(false);

  // 用 ref 保存 selected 避免 setTimeout 闭包问题
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  const toggleIngredient = useCallback((id) => {
    if (brewing) return;
    setResult(null);
    setShowDark(false);
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, [brewing]);

  const clearSelection = useCallback(() => {
    if (brewing) return;
    setSelected([]);
    setResult(null);
    setShowDark(false);
    setBubbles([]);
    setParticles([]);
    setSmokes([]);
  }, [brewing]);

  const brew = useCallback(() => {
    const currentSelected = selectedRef.current;
    if (currentSelected.length < 2 || brewing) return;

    setBrewing(true);
    setResult(null);
    setShowDark(false);
    setSmokes([]);
    setParticles([]);

    try {
      game.incrementBrew();
    } catch (e) {
      console.warn('incrementBrew failed:', e);
    }

    // 生成气泡动画
    const newBubbles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 80 + 10,
      delay: Math.random() * 0.5,
      size: Math.random() * 8 + 4,
    }));
    setBubbles(newBubbles);

    // 1.5 秒后出结果
    setTimeout(() => {
      const recipe = findRecipe(currentSelected);

      setBrewing(false);
      setBubbles([]);

      if (recipe) {
        try {
          game.discoverRecipe(recipe.id);
        } catch (e) {
          console.warn('discoverRecipe failed:', e);
        }
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
          id: i,
          color: ['#c9a84c', '#f4e4c1', '#ffd700', '#fff'][i % 4],
          dx: (Math.random() - 0.5) * 120,
          dy: (Math.random() - 0.5) * 120 - 40,
          delay: Math.random() * 0.3,
        }));
        setParticles(newParticles);
        setResult(recipe);
        setShowDark(false);
      } else {
        const newSmokes = Array.from({ length: 8 }, (_, i) => ({
          id: i,
          left: Math.random() * 60 + 20,
          delay: Math.random() * 0.8,
        }));
        setSmokes(newSmokes);
        setResult(null);
        setShowDark(true);
      }
    }, 1500);
  }, [brewing, game]);

  const recordDark = useCallback(() => {
    const currentSelected = selectedRef.current;
    const ingNames = currentSelected.map(id => ingredients.find(i => i.id === id)?.name).join(' + ');
    const mixedColor = mixColors(currentSelected);
    try {
      game.addDarkRecipe({ ingredients: currentSelected, ingredientNames: ingNames, color: mixedColor });
    } catch (e) {
      console.warn('addDarkRecipe failed:', e);
    }
    setSmokes([]);
    setShowDark(false);
    setSelected([]);
  }, [game]);

  const dismissDark = useCallback(() => {
    setSmokes([]);
    setShowDark(false);
    setSelected([]);
  }, []);

  const mixedColor = selected.length >= 2 ? mixColors(selected) : '#3d2b1f';

  return (
    <div className="min-h-screen pb-24 px-4 pt-4 max-w-lg mx-auto">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#c9a84c] hud-text tracking-wider">
          饮料炼金台
        </h1>
        <p className="text-[#8b7355] text-sm mt-1 italic">~ Drink Alchemy Station ~</p>
      </div>

      {/* 混合杯 */}
      <div className="relative flex flex-col items-center mb-6">
        <div
          className={`
            relative w-48 h-56 flex items-center justify-center
            ${brewing ? 'shake-anim' : ''}
            ${result ? 'float-anim' : ''}
          `}
        >
          {/* 杯子 SVG */}
          <svg viewBox="0 0 160 200" className="w-full h-full">
            <defs>
              {/* 杯身裁剪路径 - 液体只在杯内显示 */}
              <clipPath id="cup-clip">
                <path d="M36 55 L36 148 Q36 164 80 164 Q124 164 124 148 L124 55 Z" />
              </clipPath>
            </defs>

            {/* 杯身主体 - 圆底玻璃杯 */}
            <path
              d="M35 45 L35 150 Q35 165 80 165 Q125 165 125 150 L125 45 Z"
              fill="rgba(42,26,16,0.35)"
              stroke="#6b5a4a"
              strokeWidth="2"
            />

            {/* 液体填充效果 - 从下往上堆叠，受杯身裁剪 */}
            {selected.length >= 1 && (
              <g clipPath="url(#cup-clip)">
                {selected.map((id, i) => {
                  const ing = ingredients.find(x => x.id === id);
                  const count = selected.length;
                  // 每个原料占杯身总高度的比例
                  const cupH = 110; // 从 y=55 到 y=165
                  const layerH = count === 1 ? cupH : cupH / count;
                  // 从下往上堆叠
                  const yBottom = 164 - (i * layerH);
                  const yTop = yBottom - layerH;
                  return (
                    <rect
                      key={id}
                      x="37" y={yTop} width="86" height={Math.max(layerH, 2)}
                      fill={ing?.color || '#888'} opacity="0.8"
                    />
                  );
                })}
              </g>
            )}

            {/* 杯底圆弧线 */}
            <path
              d="M35 150 Q35 166 80 166 Q125 166 125 150"
              fill="none"
              stroke="#6b5a4a"
              strokeWidth="2.5"
            />

            {/* 杯口内壁 */}
            <ellipse
              cx="80" cy="45" rx="46" ry="10"
              fill="rgba(0,0,0,0.2)"
              stroke="#6b5a4a"
              strokeWidth="2"
            />

            {/* 杯口边缘高光 */}
            <ellipse
              cx="80" cy="44" rx="44" ry="8"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
            />

            {/* 左侧杯身高光 */}
            <path
              d="M42 55 L42 140"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M52 55 L52 148"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* 右侧杯身高光 */}
            <path
              d="M118 55 L118 140"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* 把手 - 弧线 */}
            <path
              d="M125 65 C142 65, 142 125, 125 135"
              fill="none"
              stroke="#6b5a4a"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M125 72 C136 72, 136 118, 125 122"
              fill="none"
              stroke="#1a120b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* 气泡 */}
          {bubbles.map(b => (
            <div key={b.id} className="bubble" style={{
              left: `${b.left}%`, bottom: '30%',
              width: `${b.size}px`, height: `${b.size}px`,
              animationDelay: `${b.delay}s`,
            }} />
          ))}

          {/* 黑暗料理烟雾 */}
          {smokes.map(s => (
            <div key={s.id} className="smoke" style={{
              left: `${s.left}%`, top: '10%',
              animationDelay: `${s.delay}s`,
            }} />
          ))}

          {/* 成功粒子 */}
          {particles.map(p => (
            <div key={p.id} className="particle" style={{
              backgroundColor: p.color, top: '50%', left: '50%',
              '--dx': `${p.dx}px`, '--dy': `${p.dy}px`,
              animationDelay: `${p.delay}s`,
            }} />
          ))}

          {/* 空杯提示 */}
          {selected.length === 0 && !brewing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ paddingLeft: '12px' }}>
              <span className="text-[#5c4a3a] text-sm italic">选择原料...</span>
            </div>
          )}
        </div>

        {/* 酿造按钮 */}
        <button
          onClick={brew}
          disabled={selected.length < 2 || brewing}
          className={`
            mt-4 px-10 py-3 text-lg
            ${selected.length >= 2 && !brewing
              ? 'ds-btn-gold'
              : 'ds-btn opacity-50 cursor-not-allowed'}
          `}
        >
          {brewing ? (
            <span className="flex items-center gap-2">
              <span className="swirl-anim inline-block">🌀</span> 摇匀中...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles size={18} /> 开始炼金
            </span>
          )}
        </button>
      </div>

      {/* 成功结果展示 */}
      {result && !brewing && (
        <div className="mb-6 p-4 ds-border text-center">
          <div className="float-anim">
            <div className="text-3xl mb-2">✨</div>
            <h2 className="text-xl font-bold text-[#c9a84c] hud-text">{result.name}</h2>
            <p className="text-[#a89070] text-sm mt-1">{result.desc}</p>
            <div className="flex gap-2 justify-center mt-3">
              <button onClick={clearSelection} className="ds-btn text-sm px-4 py-2">
                再来一杯
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 黑暗料理结果 */}
      {showDark && !brewing && (
        <div className="mb-6 p-4 ds-border-red text-center dark-cook-anim">
          <div className="text-3xl mb-2">💀</div>
          <h2 className="text-xl font-bold text-[#8b2500] hud-text">黑暗料理！</h2>
          <p className="text-[#a89070] text-sm mt-1">这玩意儿...能喝吗？</p>
          <div className="flex gap-2 justify-center mt-3">
            <button onClick={recordDark} className="ds-btn-danger text-sm px-4 py-2 flex items-center gap-1">
              <Skull size={14} /> 记录黑暗料理
            </button>
            <button onClick={dismissDark} className="ds-btn text-sm px-4 py-2">
              算了再来
            </button>
          </div>
        </div>
      )}

      {/* 原料选择区 - 一个大柜子，内部分类 */}
      <div className="mb-4">
        <div className="flex items-center justify-between px-1 mb-2">
          <h3 className="text-[#c9a84c] font-bold text-sm flex items-center gap-1">
            <Droplets size={16} /> 原料 ({selected.length}/5)
          </h3>
          {selected.length > 0 && (
            <button onClick={clearSelection} className="text-[#8b7355] text-xs hover:text-[#f4e4c1]">
              清空
            </button>
          )}
        </div>

        <div className="ds-card p-3 space-y-3">
          {ingredientCategories.map((cat, idx) => {
            const catIngredients = ingredients.filter(i => i.category === cat.key);
            if (catIngredients.length === 0) return null;

            return (
              <div key={cat.key}>
                {/* 分类标题 */}
                <div className="text-[10px] text-[#8b7355] mb-1.5 font-bold tracking-wider border-b border-[#2a1a10] pb-1">
                  {cat.label}
                </div>
                {/* 原料网格 */}
                <div className="grid grid-cols-4 gap-1">
                  {catIngredients.map(ing => {
                    const isSelected = selected.includes(ing.id);
                    const isMaxed = selected.length >= 5 && !isSelected;
                    return (
                      <button
                        key={ing.id}
                        onClick={() => toggleIngredient(ing.id)}
                        disabled={isMaxed}
                        className={`
                          p-1.5 text-center transition-all bg-[#2a1a10] border border-[#3d2b1f]
                          ${isSelected ? 'ds-card-selected' : ''}
                          ${isMaxed ? 'opacity-30 cursor-not-allowed' : ''}
                        `}
                      >
                        <div className="text-lg">{ing.emoji}</div>
                        <div className="text-[10px] text-[#c4b494] mt-0.5 truncate leading-tight">{ing.name}</div>
                        {isSelected && <div className="text-[#c9a84c] text-[10px]">✓</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a120b] border-t-2 border-[#3d2b1f] px-4 py-2 flex justify-around z-10">
        <button className="flex flex-col items-center gap-1 text-[#c9a84c]">
          <Beaker size={22} /><span className="text-xs">炼金</span>
        </button>
        <button onClick={() => onNavigate('recipes')} className="flex flex-col items-center gap-1 text-[#8b7355]">
          <Book size={22} /><span className="text-xs">配方书</span>
        </button>
        <button onClick={() => onNavigate('dark')} className="flex flex-col items-center gap-1 text-[#8b7355]">
          <Skull size={22} /><span className="text-xs">黑暗料理</span>
        </button>
      </div>
    </div>
  );
}
