// 原料分类定义
export const ingredientCategories = [
  { key: 'tea', label: '🍵 茶', color: '#c3a662' },
  { key: 'dairy', label: '🥛 奶', color: '#faf0e6' },
  { key: 'juice', label: '🧃 果汁', color: '#ffa500' },
  { key: 'fruit', label: '🍈 水果', color: '#88cc44' },
  { key: 'other', label: '🧪 其他', color: '#8b7355' },
  { key: 'enhancer', label: '✨ 增强', color: '#c8e8ff' },
];

// 原料列表
export const ingredients = [
  // === 茶 ===
  { id: 'jasmine', name: '茉莉花茶', emoji: '🍵', color: '#c3a662', category: 'tea' },
  { id: 'oolong', name: '乌龙茶', emoji: '🍂', color: '#8b5e3c', category: 'tea' },
  { id: 'greentea', name: '绿茶', emoji: '🍃', color: '#7ab648', category: 'tea' },
  { id: 'iceTea', name: '冰红茶', emoji: '🫖', color: '#c4722a', category: 'tea' },

  // === 奶 ===
  { id: 'milk', name: '纯牛奶', emoji: '🥛', color: '#faf0e6', category: 'dairy' },
  { id: 'wangzai', name: '旺仔', emoji: '🧃', color: '#e8332c', category: 'dairy' },
  { id: 'adcal', name: 'AD钙奶', emoji: '🍼', color: '#d4e8d0', category: 'dairy' },
  { id: 'probiotic', name: '益生菌', emoji: '🦠', color: '#e0d8c8', category: 'dairy' },

  // === 果汁 ===
  { id: 'orange', name: '橙汁', emoji: '🍊', color: '#ffa500', category: 'juice' },
  { id: 'grape', name: '葡萄汁', emoji: '🍇', color: '#6b2d5b', category: 'juice' },
  { id: 'peach', name: '桃汁', emoji: '🍑', color: '#ffb6c1', category: 'juice' },
  { id: 'mango', name: '芒果汁', emoji: '🥭', color: '#ffcc00', category: 'juice' },
  { id: 'lemon', name: '小青柠', emoji: '🍋', color: '#c8e600', category: 'juice' },
  { id: 'coconut', name: '椰子水', emoji: '🥥', color: '#f5f5dc', category: 'juice' },
  { id: 'waterC', name: '水溶C', emoji: '🍋', color: '#fff44f', category: 'juice' },
  { id: 'waterGrapefruit', name: '水溶西柚', emoji: '🍊', color: '#e8887a', category: 'juice' },

  // === 水果 ===
  { id: 'lime', name: '青柠', emoji: '🟢', color: '#88cc44', category: 'fruit' },
  { id: 'avocado', name: '牛油果', emoji: '🥑', color: '#5a7a2a', category: 'fruit' },
  { id: 'watermelon', name: '西瓜', emoji: '🍉', color: '#e84444', category: 'fruit' },
  { id: 'kiwi', name: '猕猴桃', emoji: '🥝', color: '#7ab648', category: 'fruit' },

  // === 其他（咖啡、汽水、酒等） ===
  { id: 'coffee', name: '黑咖啡', emoji: '☕', color: '#3c1a00', category: 'other' },
  { id: 'sprite', name: '雪碧', emoji: '🫧', color: '#c8e8c8', category: 'other' },
  { id: 'bluefanta', name: '蓝芬达', emoji: '🔵', color: '#4169e1', category: 'other' },
  { id: 'fenjiu', name: '汾酒', emoji: '🍶', color: '#f0e6d0', category: 'other' },

  // === 增强 ===
  { id: 'ice', name: '冰块', emoji: '🧊', color: '#c8e8ff', category: 'enhancer' },
  { id: 'water', name: '纯净水', emoji: '💧', color: '#d4eaff', category: 'enhancer' },
  { id: 'sugar', name: '白糖', emoji: '🍬', color: '#ffffff', category: 'enhancer' },
  { id: 'salt', name: '氯化钠', emoji: '🧂', color: '#f5f5f5', category: 'enhancer' },
];

// 已知配方
export const knownRecipes = [
  { id: 1, name: '茉莉奶绿', ingredients: ['jasmine', 'milk'], desc: '经典茶奶交融，清新回甘' },
  { id: 2, name: '橙香茉莉', ingredients: ['jasmine', 'orange'], desc: '花香果香交织，夏日必备' },
  { id: 3, name: '伯牙绝弦', ingredients: ['jasmine', 'milk', 'wangzai'], desc: '三料合璧，琴韵悠长' },
  { id: 4, name: '柚C冰茶', ingredients: ['jasmine', 'waterC'], desc: '酸甜茶韵，冰爽一夏' },
  { id: 5, name: '茉莉花香拿铁', ingredients: ['jasmine', 'milk', 'coffee'], desc: '茶咖奶三重奏' },
  { id: 6, name: '茉香椰椰', ingredients: ['coconut', 'jasmine'], desc: '椰香茉莉，热带风情' },
  { id: 7, name: '乌龙椰椰', ingredients: ['coconut', 'oolong'], desc: '乌龙椰香，醇厚回甘' },
  { id: 8, name: '西柚冰乌龙', ingredients: ['oolong', 'waterGrapefruit'], desc: '西柚撞乌龙，冰爽解暑' },
  { id: 9, name: '橙香椰椰', ingredients: ['coconut', 'orange'], desc: '椰橙派对，热带阳光' },
  { id: 10, name: '橙C乌龙', ingredients: ['oolong', 'orange'], desc: '橙香乌龙，活力满满' },
  { id: 11, name: '气泡乌龙', ingredients: ['oolong', 'sprite'], desc: '气泡乌龙，会上头' },
  { id: 12, name: '椰青冰美式', ingredients: ['coconut', 'coffee'], desc: '椰青美式，清醒一夏' },
  { id: 13, name: '冰摇葡萄乌龙', ingredients: ['oolong', 'grape'], desc: '葡萄乌龙，摇出风味' },
  { id: 14, name: '气泡西柚水', ingredients: ['sprite', 'waterGrapefruit'], desc: '西柚气泡，简单快乐' },
  { id: 15, name: '夏日续命水', ingredients: ['sprite', 'lemon'], desc: '青柠雪碧，续命神水' },
  { id: 16, name: '夏日续命水PRO', ingredients: ['sprite', 'lime', 'ice'], desc: '加冰升级版，终极续命' },
  { id: 17, name: '气泡柠檬茶', ingredients: ['sprite', 'iceTea'], desc: '气泡红茶，快乐加倍' },
  { id: 18, name: '忘川河', ingredients: ['sprite', 'bluefanta', 'adcal'], desc: '三色分层，来自忘川' },
  { id: 19, name: '葡萄冰萃', ingredients: ['sprite', 'grape', 'coffee'], desc: '葡萄咖啡气泡，暗黑美学' },
  { id: 20, name: '日照金山', ingredients: ['fenjiu', 'waterC', 'oolong'], desc: '烈酒果茶，金山日出' },
  { id: 21, name: '天空之镜', ingredients: ['fenjiu', 'waterC', 'bluefanta'], desc: '蓝白渐变，天空之境' },
];

// 自动从 ingredients 中提取 enhancer 分类的原料
export const enhancerIngredients = ingredients.filter(i => i.category === 'enhancer').map(i => i.id);

// 增强效果映射
export const enhancerEffects = {
  ice: { prefix: '冰', suffix: '', desc: '冰爽加倍！' },
  water: { prefix: '', suffix: '', desc: '口感更柔和' },
  sugar: { prefix: '', suffix: '', desc: '甜度UP！' },
  salt: { prefix: '咸', suffix: '', desc: '...认真的？' },
};

// 根据原料组合查找配方（支持增强材料）
export function findRecipe(ingredientIds) {
  // 1. 精确匹配
  const sorted = [...ingredientIds].sort().join(',');
  const exact = knownRecipes.find(r => [...r.ingredients].sort().join(',') === sorted);
  if (exact) return { ...exact, isExact: true };

  // 2. 分离核心原料和增强材料
  const enhancers = ingredientIds.filter(id => enhancerIngredients.includes(id));
  const core = ingredientIds.filter(id => !enhancerIngredients.includes(id));

  if (core.length < 2) return null;

  // 3. 用核心原料匹配配方
  const coreSorted = [...core].sort().join(',');
  const baseRecipe = knownRecipes.find(r => [...r.ingredients].sort().join(',') === coreSorted);

  if (!baseRecipe) return null;

  // 4. 有增强材料，生成增强版名称
  if (enhancers.length > 0) {
    const effects = enhancers.map(id => enhancerEffects[id]).filter(Boolean);
    const prefix = effects.map(e => e.prefix).join('');
    const extraDesc = effects.map(e => e.desc).join(' ');
    return {
      ...baseRecipe,
      name: `${prefix}${baseRecipe.name}`,
      desc: `${baseRecipe.desc}，${extraDesc}`,
      enhancers,
      isEnhanced: true,
    };
  }

  return { ...baseRecipe, isExact: true };
}

// 获取原料信息
export function getIngredient(id) {
  return ingredients.find(i => i.id === id) || null;
}

// 混合颜色（简单混合）
export function mixColors(ingredientIds) {
  const colors = ingredientIds.map(id => getIngredient(id)?.color || '#888');
  const hex2rgb = (hex) => ({
    r: parseInt(hex.slice(1,3), 16),
    g: parseInt(hex.slice(3,5), 16),
    b: parseInt(hex.slice(5,7), 16)
  });
  const rgbs = colors.map(hex2rgb);
  const avg = {
    r: Math.round(rgbs.reduce((s, c) => s + c.r, 0) / rgbs.length),
    g: Math.round(rgbs.reduce((s, c) => s + c.g, 0) / rgbs.length),
    b: Math.round(rgbs.reduce((s, c) => s + c.b, 0) / rgbs.length)
  };
  return `rgb(${avg.r},${avg.g},${avg.b})`;
}
