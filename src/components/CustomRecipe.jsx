import { useState } from 'react';
import { ingredients, ingredientCategories } from '../data/recipes';

export default function CustomRecipe({ game, onNavigate }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [selected, setSelected] = useState([]);
  const [saved, setSaved] = useState(false);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const save = () => {
    if (!name.trim() || selected.length < 2) return;
    game.addCustomRecipe({
      name: name.trim(),
      desc: desc.trim() || '自定义饮料',
      ingredients: selected,
      color: '#c9a84c',
    });
    setSaved(true);
    setName('');
    setDesc('');
    setSelected([]);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-4 max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#c9a84c] hud-text tracking-wider">✨ 新配方发现</h1>
        <p className="text-[#8b7355] text-sm mt-1 italic">记录你的独家秘方</p>
      </div>

      {saved && (
        <div className="mb-4 p-3 ds-border-gold text-center text-[#c9a84c] font-bold">
          🎉 新配方已记录！
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="text-[#c9a84c] text-sm font-bold block mb-1">饮料名称</label>
          <input
            className="ds-input"
            placeholder="给你的饮料起个名字..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[#c9a84c] text-sm font-bold block mb-1">口感描述</label>
          <input
            className="ds-input"
            placeholder="喝起来是什么感觉..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[#c9a84c] text-sm font-bold block mb-2">
            选择原料 ({selected.length}/5)
          </label>
          <div className="ds-card p-3 space-y-3">
            {ingredientCategories.map(cat => {
              const catIngs = ingredients.filter(i => i.category === cat.key);
              if (catIngs.length === 0) return null;
              return (
                <div key={cat.key}>
                  <div className="text-[10px] text-[#8b7355] mb-1.5 font-bold border-b border-[#2a1a10] pb-1">{cat.label}</div>
                  <div className="grid grid-cols-4 gap-1">
                    {catIngs.map(ing => {
                      const isSel = selected.includes(ing.id);
                      const maxed = selected.length >= 5 && !isSel;
                      return (
                        <button
                          key={ing.id}
                          onClick={() => toggle(ing.id)}
                          disabled={maxed}
                          className={`p-1.5 text-center bg-[#2a1a10] border border-[#3d2b1f] ${isSel ? 'ds-card-selected' : ''} ${maxed ? 'opacity-30' : ''}`}
                        >
                          <div className="text-lg">{ing.emoji}</div>
                          <div className="text-[10px] text-[#c4b494] truncate">{ing.name}</div>
                          {isSel && <div className="text-[#c9a84c] text-[10px]">✓</div>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={save}
          disabled={!name.trim() || selected.length < 2}
          className={`w-full ${name.trim() && selected.length >= 2 ? 'ds-btn-gold' : 'ds-btn opacity-50'}`}
        >
          记录新配方 ✨
        </button>
      </div>

      {/* 已记录的自创配方 */}
      {game.customRecipes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-[#c9a84c] font-bold mb-3">📝 已记录的自创配方</h3>
          <div className="space-y-2">
            {game.customRecipes.map(r => (
              <div key={r.id} className="ds-card p-3">
                <div className="flex justify-between">
                  <span className="text-[#f4e4c1] font-bold">{r.name}</span>
                  <span className="text-[#c9a84c] text-xs">自创</span>
                </div>
                <p className="text-xs text-[#8b7355]">{r.desc}</p>
                <div className="flex gap-1 mt-1">
                  {r.ingredients.map(id => (
                    <span key={id} className="text-[10px] bg-[#2a1a10] px-1.5 py-0.5 border border-[#3d2b1f] text-[#c4b494]">
                      {ingredients.find(i => i.id === id)?.name || id}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a120b] border-t-2 border-[#3d2b1f] px-4 py-2 flex justify-around z-10">
        <button onClick={() => onNavigate('brew')} className="flex flex-col items-center gap-1 text-[#8b7355]">
          <span className="text-lg">🧪</span><span className="text-xs">炼金</span>
        </button>
        <button onClick={() => onNavigate('recipes')} className="flex flex-col items-center gap-1 text-[#8b7355]">
          <span className="text-lg">📖</span><span className="text-xs">配方书</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#c9a84c]">
          <span className="text-lg">✨</span><span className="text-xs">新发现</span>
        </button>
        <button onClick={() => onNavigate('dark')} className="flex flex-col items-center gap-1 text-[#8b7355]">
          <span className="text-lg">💀</span><span className="text-xs">黑暗料理</span>
        </button>
      </div>
    </div>
  );
}
