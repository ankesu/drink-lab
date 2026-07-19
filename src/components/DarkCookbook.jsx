import { ingredients } from '../data/recipes';
import { Skull, Trash2, Beaker, Book } from 'lucide-react';

export default function DarkCookbook({ game, onNavigate }) {
  return (
    <div className="min-h-screen pb-24 px-4 pt-4 max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#8b2500] hud-text tracking-wider">
          💀 黑暗料理档案
        </h1>
        <p className="text-[#8b7355] text-sm mt-1 italic">那些不该存在的饮料...</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="ds-card p-3 text-center ds-border-red">
          <div className="text-2xl font-bold text-[#8b2500]">{game.darkRecipes.length}</div>
          <div className="text-xs text-[#8b7355]">黑暗料理记录</div>
        </div>
        <div className="ds-card p-3 text-center">
          <div className="text-2xl font-bold text-[#c9a84c]">{game.brewCount}</div>
          <div className="text-xs text-[#8b7355]">总酿造次数</div>
        </div>
      </div>

      {game.darkRecipes.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-5xl mb-4">🧟</div>
          <p className="text-[#5c4a3a] italic">还没有黑暗料理记录...<br />去炼金台试试奇怪的组合吧！</p>
        </div>
      ) : (
        <div className="space-y-2">
          {[...game.darkRecipes].reverse().map(dark => (
            <div key={dark.id} className="ds-card p-3 ds-border-red">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Skull size={16} className="text-[#8b2500]" />
                  <span className="text-[#8b2500] font-bold text-sm">#{dark.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#5c4a3a]">
                    {new Date(dark.date).toLocaleDateString('zh-CN')}
                  </span>
                  <button
                    onClick={() => game.deleteDarkRecipe(dark.id)}
                    className="text-[#5c4a3a] hover:text-[#8b2500] p-0.5"
                    title="删除记录"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="flex gap-1 mt-2 flex-wrap">
                {dark.ingredients?.map(id => {
                  const ing = ingredients.find(i => i.id === id);
                  return (
                    <span key={id} className="text-xs bg-[#2a0000] px-2 py-0.5 border border-[#5c1515] text-[#c4b494]">
                      {ing?.emoji} {ing?.name || id}
                    </span>
                  );
                })}
              </div>
              {dark.note && <p className="text-xs text-[#8b7355] mt-2 italic">「{dark.note}」</p>}
            </div>
          ))}
        </div>
      )}

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a120b] border-t-2 border-[#3d2b1f] px-4 py-2 flex justify-around z-10">
        <button onClick={() => onNavigate('brew')} className="flex flex-col items-center gap-1 text-[#8b7355]">
          <Beaker size={22} /><span className="text-xs">炼金</span>
        </button>
        <button onClick={() => onNavigate('recipes')} className="flex flex-col items-center gap-1 text-[#8b7355]">
          <Book size={22} /><span className="text-xs">配方书</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#8b2500]">
          <Skull size={22} /><span className="text-xs">黑暗料理</span>
        </button>
      </div>
    </div>
  );
}
