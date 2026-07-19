import { useState, useMemo } from 'react';
import { knownRecipes, ingredients, ingredientCategories } from '../data/recipes';
import { Pencil, Trash2, Plus, X, Check, Book, Skull, Beaker, Search, ChevronDown, ChevronRight, Brain } from 'lucide-react';

const getIngName = (id) => ingredients.find(i => i.id === id)?.name || id;
const getIngEmoji = (id) => ingredients.find(i => i.id === id)?.emoji || '';

// 配方分类标签
const recipeFilters = [
  { key: 'all', label: '全部' },
  { key: 'discovered', label: '已解锁' },
  { key: 'custom', label: '自创' },
  { key: 'tea', label: '含茶' },
  { key: 'dairy', label: '含奶' },
  { key: 'juice', label: '含果汁' },
  { key: 'fruit', label: '含水果' },
  { key: 'other', label: '含其他' },
];

export default function RecipeBook({ game, onNavigate }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formSelected, setFormSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showLocked, setShowLocked] = useState(false);

  const allRecipes = [...knownRecipes, ...game.customRecipes];

  // 过滤 + 搜索
  const filteredRecipes = useMemo(() => {
    let list = allRecipes;

    // 搜索
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(r => {
        if (r.name.toLowerCase().includes(q)) return true;
        if (r.desc && r.desc.toLowerCase().includes(q)) return true;
        if (r.ingredients.some(id => getIngName(id).toLowerCase().includes(q))) return true;
        return false;
      });
    }

    // 分类过滤
    switch (activeFilter) {
      case 'discovered':
        list = list.filter(r => r.isCustom || game.discoveredRecipes.includes(r.id));
        break;
      case 'custom':
        list = list.filter(r => r.isCustom);
        break;
      case 'tea':
        list = list.filter(r => r.ingredients.some(id => ingredients.find(i => i.id === id)?.category === 'tea'));
        break;
      case 'dairy':
        list = list.filter(r => r.ingredients.some(id => ingredients.find(i => i.id === id)?.category === 'dairy'));
        break;
      case 'juice':
        list = list.filter(r => r.ingredients.some(id => ingredients.find(i => i.id === id)?.category === 'juice'));
        break;
      case 'fruit':
        list = list.filter(r => r.ingredients.some(id => ingredients.find(i => i.id === id)?.category === 'fruit'));
        break;
      case 'other':
        list = list.filter(r => r.ingredients.some(id => ingredients.find(i => i.id === id)?.category === 'other'));
        break;
    }

    return list;
  }, [allRecipes, search, activeFilter, game.discoveredRecipes]);

  // 分离已解锁和未解锁
  const discoveredList = filteredRecipes.filter(r => r.isCustom || game.discoveredRecipes.includes(r.id));
  const lockedList = filteredRecipes.filter(r => !r.isCustom && !game.discoveredRecipes.includes(r.id));

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormName('');
    setFormDesc('');
    setFormSelected([]);
  };

  const startAdd = () => { resetForm(); setShowForm(true); };
  const startEdit = (recipe) => {
    setEditingId(recipe.id);
    setFormName(recipe.name);
    setFormDesc(recipe.desc || '');
    setFormSelected([...recipe.ingredients]);
    setShowForm(true);
  };
  const saveForm = () => {
    if (!formName.trim() || formSelected.length < 2) return;
    if (editingId) {
      game.updateCustomRecipe(editingId, { name: formName.trim(), desc: formDesc.trim(), ingredients: formSelected });
    } else {
      game.addCustomRecipe({ name: formName.trim(), desc: formDesc.trim(), ingredients: formSelected });
    }
    resetForm();
  };
  const deleteRecipe = (recipe) => {
    if (window.confirm(`确定删除「${recipe.name}」吗？`)) game.deleteCustomRecipe(recipe.id);
  };
  const toggleFormIng = (id) => {
    setFormSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const RecipeCard = ({ recipe }) => {
    const discovered = recipe.isCustom || game.discoveredRecipes.includes(recipe.id);
    const isCustom = recipe.isCustom;
    const coreIngredients = recipe.ingredients.filter(id => id !== 'ice');
    const hasIce = recipe.ingredients.includes('ice');

    return (
      <div className={`ds-card p-2.5 ${discovered ? '' : 'opacity-35'}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className={`font-bold text-sm truncate ${discovered ? 'text-[#f4e4c1]' : 'text-[#5c4a3a]'}`}>
                {discovered ? recipe.name : '???'}
              </h3>
              {isCustom && <span className="text-[#c9a84c] text-[10px] shrink-0 bg-[#2a1a10] px-1 rounded">自创</span>}
            </div>
            <p className="text-[10px] text-[#8b7355] mt-0.5">{discovered ? recipe.desc : '尚未发现'}</p>
          </div>
          {isCustom && (
            <div className="flex gap-0.5 shrink-0 ml-1">
              <button onClick={() => startEdit(recipe)} className="text-[#8b7355] hover:text-[#c9a84c] p-1"><Pencil size={13} /></button>
              <button onClick={() => deleteRecipe(recipe)} className="text-[#8b7355] hover:text-[#8b2500] p-1"><Trash2 size={13} /></button>
            </div>
          )}
          {discovered && !isCustom && (
            <button
              onClick={() => game.forgetRecipe(recipe.id)}
              className="text-[#5c4a3a] hover:text-[#8b2500] p-1 shrink-0 ml-1"
              title="遗忘此配方"
            >
              <Brain size={13} />
            </button>
          )}
        </div>
        <div className="flex gap-1 mt-1.5 flex-wrap">
          {recipe.ingredients.map(id => (
            <span key={id} className="text-[10px] bg-[#2a1a10] px-1.5 py-0.5 border border-[#3d2b1f] text-[#c4b494]">{getIngEmoji(id)} {getIngName(id)}</span>
          ))}
        </div>
        {discovered && !hasIce && coreIngredients.length >= 2 && (
          <div className="mt-1 text-[10px] italic">
            💡 <span className="text-[#8b7355]">+🧊 →</span> <span className="text-[#c9a84c]">冰{recipe.name}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-4 max-w-lg mx-auto">
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold text-[#c9a84c] hud-text tracking-wider">📜 配方书</h1>
          <p className="text-[#8b7355] text-xs mt-0.5 italic">
            {filteredRecipes.length} 个配方 · 已解锁 {game.discoveredRecipes.length}
          </p>
        </div>
        <button onClick={startAdd} className="ds-btn-gold text-sm px-3 py-1.5 flex items-center gap-1">
          <Plus size={14} /> 新增
        </button>
      </div>

      {/* 搜索框 */}
      <div className="relative mb-2">
        <Search size={14} className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[#5c4a3a] pointer-events-none" />
        <input
          className="ds-input !pl-8 py-1.5 text-sm"
          placeholder="搜索配方名或原料..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5c4a3a]"><X size={14} /></button>
        )}
      </div>

      {/* 分类筛选 */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-none">
        {recipeFilters.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`shrink-0 text-xs px-2.5 py-1 border transition-colors ${activeFilter === f.key ? 'border-[#c9a84c] text-[#c9a84c] bg-[#2a1a10]' : 'border-[#3d2b1f] text-[#8b7355]'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 新增/编辑表单 */}
      {showForm && (
        <div className="mb-3 ds-card p-3 ds-border-gold">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#c9a84c] font-bold text-sm">{editingId ? '✏️ 编辑配方' : '✨ 新增配方'}</h3>
            <button onClick={resetForm} className="text-[#8b7355]"><X size={16} /></button>
          </div>
          <input className="ds-input mb-1.5 text-sm" placeholder="饮料名称" value={formName} onChange={e => setFormName(e.target.value)} />
          <input className="ds-input mb-2 text-sm" placeholder="口感描述" value={formDesc} onChange={e => setFormDesc(e.target.value)} />
          <div className="text-[10px] text-[#8b7355] mb-1">原料 ({formSelected.length}/5)</div>
          <div className="grid grid-cols-4 gap-1 mb-2">
            {ingredients.map(ing => {
              const sel = formSelected.includes(ing.id);
              const maxed = formSelected.length >= 5 && !sel;
              return (
                <button key={ing.id} onClick={() => toggleFormIng(ing.id)} disabled={maxed}
                  className={`p-1 text-center bg-[#1a120b] border border-[#3d2b1f] text-[10px] ${sel ? 'border-[#c9a84c]' : ''} ${maxed ? 'opacity-30' : ''}`}>
                  <div className="text-base">{ing.emoji}</div><div className="text-[#c4b494] truncate">{ing.name}</div>
                  {sel && <div className="text-[#c9a84c]">✓</div>}
                </button>
              );
            })}
          </div>
          <button onClick={saveForm} disabled={!formName.trim() || formSelected.length < 2}
            className={`w-full py-2 text-sm ${formName.trim() && formSelected.length >= 2 ? 'ds-btn-gold' : 'ds-btn opacity-50'}`}>
            <Check size={14} className="inline mr-1" />{editingId ? '保存修改' : '记录配方'}
          </button>
        </div>
      )}

      {/* 已解锁配方 */}
      <div className="space-y-1.5">
        {discoveredList.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </div>

      {/* 未解锁配方 - 可折叠 */}
      {lockedList.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowLocked(!showLocked)}
            className="flex items-center gap-1 text-xs text-[#5c4a3a] hover:text-[#8b7355] w-full py-1"
          >
            {showLocked ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            未解锁配方 ({lockedList.length})
          </button>
          {showLocked && (
            <div className="space-y-1.5 mt-1">
              {lockedList.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
            </div>
          )}
        </div>
      )}

      {/* 空状态 */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-10 text-[#5c4a3a] italic">没有匹配的配方</div>
      )}

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a120b] border-t-2 border-[#3d2b1f] px-4 py-2 flex justify-around z-10">
        <button onClick={() => onNavigate('brew')} className="flex flex-col items-center gap-1 text-[#8b7355]">
          <Beaker size={22} /><span className="text-xs">炼金</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#c9a84c]">
          <Book size={22} /><span className="text-xs">配方书</span>
        </button>
        <button onClick={() => onNavigate('dark')} className="flex flex-col items-center gap-1 text-[#8b7355]">
          <Skull size={22} /><span className="text-xs">黑暗料理</span>
        </button>
      </div>
    </div>
  );
}
