// --- DATA SECTION ---

// ===== INGREDIENT PRICES (SAR) & NUTRITION DATA =====
const ingredientData = {
    // Proteins
    'دجاج': { price: 15, cal: 165, protein: 31, unit: 'كيلو', per: 100 },
    'صدر دجاج': { price: 18, cal: 165, protein: 31, unit: 'كيلو', per: 100 },
    'صدور دجاج': { price: 18, cal: 165, protein: 31, unit: 'كيلو', per: 100 },
    'دجاج كامل': { price: 20, cal: 215, protein: 27, unit: 'دجاجة', per: 100 },
    'دجاجة': { price: 20, cal: 215, protein: 27, unit: 'دجاجة', per: 100 },
    'لحم': { price: 45, cal: 250, protein: 26, unit: 'كيلو', per: 100 },
    'لحم مفروم': { price: 40, cal: 250, protein: 26, unit: 'كيلو', per: 100 },
    'لحم ستيك': { price: 80, cal: 271, protein: 25, unit: 'كيلو', per: 100 },
    'سمك': { price: 30, cal: 206, protein: 22, unit: 'كيلو', per: 100 },
    'سمك كنعد': { price: 40, cal: 206, protein: 22, unit: 'كيلو', per: 100 },
    'سمك هامور': { price: 60, cal: 206, protein: 22, unit: 'كيلو', per: 100 },
    'بيض': { price: 0.8, cal: 72, protein: 6, unit: 'بيضة', per: 1 },
    'جمبري': { price: 50, cal: 99, protein: 24, unit: 'كيلو', per: 100 },
    
    // Vegetables
    'طماطم': { price: 4, cal: 18, protein: 1, unit: 'كيلو', per: 100 },
    'بصل': { price: 3, cal: 40, protein: 1, unit: 'كيلو', per: 100 },
    'ثوم': { price: 10, cal: 149, protein: 6, unit: 'كيلو', per: 100 },
    'بطاطس': { price: 4, cal: 77, protein: 2, unit: 'كيلو', per: 100 },
    'جزر': { price: 5, cal: 41, protein: 1, unit: 'كيلو', per: 100 },
    'خيار': { price: 5, cal: 15, protein: 1, unit: 'كيلو', per: 100 },
    'فلفل رومي': { price: 8, cal: 31, protein: 1, unit: 'كيلو', per: 100 },
    'فلفل': { price: 8, cal: 31, protein: 1, unit: 'كيلو', per: 100 },
    'باذنجان': { price: 5, cal: 25, protein: 1, unit: 'كيلو', per: 100 },
    'كوسة': { price: 6, cal: 17, protein: 1, unit: 'كيلو', per: 100 },
    'ملوخية': { price: 10, cal: 32, protein: 5, unit: 'كيلو', per: 100 },
    'بقدونس': { price: 3, cal: 36, protein: 3, unit: 'ربطة', per: 20 },
    'كزبرة': { price: 3, cal: 23, protein: 2, unit: 'ربطة', per: 20 },
    'خس': { price: 5, cal: 15, protein: 1, unit: 'كيلو', per: 100 },
    'سبانخ': { price: 6, cal: 23, protein: 3, unit: 'كيلو', per: 100 },
    'فطر': { price: 15, cal: 22, protein: 3, unit: 'كيلو', per: 100 },
    'فطر مشروم': { price: 15, cal: 22, protein: 3, unit: 'كيلو', per: 100 },
    'زنجبيل': { price: 15, cal: 80, protein: 2, unit: 'كيلو', per: 100 },
    'ليمون': { price: 6, cal: 29, protein: 1, unit: 'كيلو', per: 100 },
    
    // Dairy
    'حليب': { price: 6, cal: 42, protein: 3, unit: 'لتر', per: 100 },
    'حليب سائل': { price: 6, cal: 42, protein: 3, unit: 'لتر', per: 100 },
    'حليب مكثف': { price: 10, cal: 321, protein: 8, unit: 'علبة', per: 100 },
    'قشطة': { price: 10, cal: 195, protein: 2, unit: 'علبة', per: 100 },
    'جبن': { price: 25, cal: 402, protein: 25, unit: 'كيلو', per: 100 },
    'جبن موزاريلا': { price: 30, cal: 280, protein: 22, unit: 'كيلو', per: 100 },
    'زبادي': { price: 8, cal: 59, protein: 10, unit: 'كيلو', per: 100 },
    'لبن': { price: 8, cal: 59, protein: 10, unit: 'كيلو', per: 100 },
    'زبدة': { price: 15, cal: 717, protein: 1, unit: 'كيلو', per: 100 },
    'كريمة طبخ': { price: 12, cal: 195, protein: 2, unit: 'علبة', per: 100 },
    'كريمة حامضة': { price: 10, cal: 193, protein: 2, unit: 'علبة', per: 100 },
    
    // Carbs & Grains
    'أرز': { price: 15, cal: 130, protein: 3, unit: 'كيلو', per: 100 },
    'أرز بسمتي': { price: 20, cal: 130, protein: 3, unit: 'كيلو', per: 100 },
    'رز بسمتي': { price: 20, cal: 130, protein: 3, unit: 'كيلو', per: 100 },
    'دقيق': { price: 5, cal: 364, protein: 10, unit: 'كيلو', per: 100 },
    'دقيق بر': { price: 8, cal: 340, protein: 13, unit: 'كيلو', per: 100 },
    'مكرونة': { price: 6, cal: 371, protein: 13, unit: 'كيلو', per: 100 },
    'نشا': { price: 8, cal: 381, protein: 0, unit: 'كيلو', per: 100 },
    'عدس': { price: 10, cal: 116, protein: 9, unit: 'كيلو', per: 100 },
    'جريش': { price: 10, cal: 340, protein: 13, unit: 'كيلو', per: 100 },
    'خبز': { price: 2, cal: 265, protein: 9, unit: 'رغيف', per: 100 },
    'خبز تورتيلا': { price: 10, cal: 310, protein: 8, unit: 'باكيت', per: 100 },
    'خبز عربي': { price: 2, cal: 275, protein: 9, unit: 'رغيف', per: 100 },
    'بقسماط': { price: 8, cal: 395, protein: 13, unit: 'كيلو', per: 100 },
    
    // Dessert ingredients
    'عجينة باف باستري': { price: 15, cal: 558, protein: 7, unit: 'باكيت', per: 100 },
    'بسكويت': { price: 8, cal: 480, protein: 6, unit: 'باكيت', per: 100 },
    'بسكويت شاي': { price: 8, cal: 480, protein: 6, unit: 'باكيت', per: 100 },
    'شوكولاتة': { price: 15, cal: 546, protein: 5, unit: 'لوح', per: 100 },
    'قهوة': { price: 25, cal: 2, protein: 0, unit: 'علبة', per: 100 },
    'مكسرات': { price: 35, cal: 607, protein: 20, unit: 'كيلو', per: 100 },
    'زبيب': { price: 20, cal: 299, protein: 3, unit: 'كيلو', per: 100 },
    'فستق': { price: 60, cal: 562, protein: 20, unit: 'كيلو', per: 100 },
    'كاكاو': { price: 15, cal: 228, protein: 20, unit: 'علبة', per: 100 },
    'سكر': { price: 6, cal: 387, protein: 0, unit: 'كيلو', per: 100 },
    'فانيليا': { price: 5, cal: 288, protein: 0, unit: 'علبة', per: 1 },
    
    // Fruits
    'تفاح': { price: 8, cal: 52, protein: 0, unit: 'كيلو', per: 100 },
    'موز': { price: 6, cal: 89, protein: 1, unit: 'كيلو', per: 100 },
    'برتقال': { price: 6, cal: 47, protein: 1, unit: 'كيلو', per: 100 },
    'عنب': { price: 15, cal: 69, protein: 1, unit: 'كيلو', per: 100 },
    'فراولة': { price: 20, cal: 32, protein: 1, unit: 'كيلو', per: 100 },
    
    // Oils and spices
    'زيت': { price: 15, cal: 884, protein: 0, unit: 'لتر', per: 100 },
    'زيت زيتون': { price: 35, cal: 884, protein: 0, unit: 'لتر', per: 100 },
    'زيت نباتي': { price: 15, cal: 884, protein: 0, unit: 'لتر', per: 100 },
    'ملح': { price: 2, cal: 0, protein: 0, unit: 'علبة', per: 100 },
    'فلفل أسود': { price: 15, cal: 251, protein: 10, unit: 'علبة', per: 100 },
    'بهارات': { price: 10, cal: 0, protein: 0, unit: 'علبة', per: 100 },
    'كمون': { price: 10, cal: 375, protein: 18, unit: 'علبة', per: 100 },
    'كاري': { price: 12, cal: 325, protein: 14, unit: 'علبة', per: 100 },
    'بابريكا': { price: 10, cal: 282, protein: 14, unit: 'علبة', per: 100 },
    'قرفة': { price: 10, cal: 247, protein: 4, unit: 'علبة', per: 100 },
    'هيل': { price: 30, cal: 311, protein: 11, unit: 'علبة', per: 100 },
    'زعفران': { price: 100, cal: 310, protein: 11, unit: 'علبة', per: 1 },
    'إكليل الجبل': { price: 10, cal: 131, protein: 3, unit: 'ربطة', per: 100 },
    'أوريغانو': { price: 10, cal: 265, protein: 9, unit: 'علبة', per: 100 },
    'معجون طماطم': { price: 5, cal: 82, protein: 4, unit: 'علبة', per: 100 },
    'صلصة طماطم': { price: 5, cal: 24, protein: 1, unit: 'علبة', per: 100 },
    'مرقة': { price: 2, cal: 9, protein: 1, unit: 'مكعب', per: 100 },
    'بيكنج بودر': { price: 5, cal: 53, protein: 0, unit: 'علبة', per: 5 },
    'سمن': { price: 20, cal: 876, protein: 0, unit: 'كيلو', per: 100 },
    
    // Defaults
    'default': { price: 5, cal: 50, protein: 2, unit: 'وحدة', per: 100 }
};

// Function to get ingredient price
function getIngredientPrice(ingredientName) {
    const name = ingredientName.trim();
    if (ingredientData[name]) return ingredientData[name].price;
    // Partial match
    for (const [key, data] of Object.entries(ingredientData)) {
        if (key !== 'default' && (name.includes(key) || key.includes(name))) {
            return data.price;
        }
    }
    return ingredientData.default.price;
}

// Function to calculate recipe total cost
function calculateRecipeCost(recipe) {
    if (!recipe.ingredients) return 0;
    let total = 0;
    recipe.ingredients.forEach(ing => {
        total += getIngredientPrice(ing);
    });
    return total;
}

// Function to get ingredient nutrition
function getIngredientNutrition(ingredientName) {
    const name = ingredientName.trim();
    if (ingredientData[name]) return ingredientData[name];
    for (const [key, data] of Object.entries(ingredientData)) {
        if (key !== 'default' && (name.includes(key) || key.includes(name))) {
            return data;
        }
    }
    return ingredientData.default;
}


// ===== STEP QUANTITY INJECTOR =====
// Injects exact quantities into step text based on recipe quantities
function injectQuantitiesIntoSteps(recipe, servingsMultiplier) {
    if (!recipe.steps || !recipe.quantities) return recipe.steps;
    
    // Build ingredient → quantity lookup
    const qtyLookup = {};
    const ings = recipe.ingredients || [];
    const qtys = recipe.quantities || [];
    
    for (let i = 0; i < qtys.length; i++) {
        const ing = i < ings.length ? ings[i] : '';
        if (ing) {
            let qtyText = qtys[i];
            // Apply serving multiplier to numbers in quantity
            if (servingsMultiplier > 1) {
                qtyText = qtyText.replace(/(\d+(\.\d+)?)/g, (match) => {
                    const val = parseFloat(match);
                    const newVal = val * servingsMultiplier;
                    return Number.isInteger(newVal) ? newVal.toString() : newVal.toFixed(1);
                });
            }
            qtyLookup[ing] = qtyText;
        }
    }
    
    // Common vague words to replace with exact quantities
    const vagueTerms = {
        'وملح': (lookup) => {
            const salt = lookup['ملح'] || '½ ملعقة صغيرة ملح (2.5 مل)';
            return `و${salt}`;
        },
        'ملح وفلفل': (lookup) => {
            const salt = lookup['ملح'] || '½ ملعقة صغيرة ملح (2.5 مل)';
            const pepper = lookup['فلفل أسود'] || '¼ ملعقة صغيرة فلفل أسود (1.25 مل)';
            return `${salt} + ${pepper}`;
        },
        'والبهارات': (lookup) => {
            const spice = lookup['بهارات'] || '½ ملعقة صغيرة بهارات (2.5 مل)';
            return `و${spice}`;
        },
        'البهارات': (lookup) => {
            return lookup['بهارات'] || '½ ملعقة صغيرة بهارات مشكلة (2.5 مل)';
        },
        'بالملح والفلفل': (lookup) => {
            const salt = lookup['ملح'] || '½ ملعقة صغيرة ملح';
            const pepper = lookup['فلفل أسود'] || '¼ ملعقة صغيرة فلفل أسود';
            return `بـ${salt} + ${pepper}`;
        },
        'رشة ملح': () => '¼ ملعقة صغيرة ملح (1.25 مل)',
        'رشة كركم': () => '¼ ملعقة صغيرة كركم (1.25 مل)',
    };
    
    return recipe.steps.map(step => {
        let enhanced = step;
        
        // Replace vague terms with exact quantities
        for (const [vague, replacer] of Object.entries(vagueTerms)) {
            if (enhanced.includes(vague)) {
                enhanced = enhanced.replace(vague, replacer(qtyLookup));
            }
        }
        
        // For steps mentioning specific ingredients, add quantity if not present
        for (const [ing, qty] of Object.entries(qtyLookup)) {
            // Only if step mentions ingredient by name but doesn't have a number near it
            if (enhanced.includes(ing) && ing.length > 2) {
                // Check if ingredient mention already has a number before/after it (within 15 chars)
                const idx = enhanced.indexOf(ing);
                const nearbyText = enhanced.substring(Math.max(0, idx - 15), Math.min(enhanced.length, idx + ing.length + 15));
                const hasNumber = /\d/.test(nearbyText);
                
                if (!hasNumber && !enhanced.includes(qty)) {
                    // Don't inject for very common words that appear naturally in cooking instructions
                    const skipWords = ['ماء', 'نار', 'فرن', 'قدر', 'وعاء', 'صينية', 'مقلاة'];
                    if (!skipWords.includes(ing)) {
                        // Inject quantity in parentheses after the ingredient name
                        // But only if it makes sense (ingredient is a key component)
                        const keyIngredients = ['دجاج', 'لحم', 'أرز', 'رز', 'دقيق', 'سكر', 'زبدة', 'حليب', 'مكرونة', 'عدس', 'بطاطس', 'باذنجان', 'ملوخية'];
                        if (keyIngredients.some(k => ing.includes(k) || k.includes(ing))) {
                            enhanced = enhanced.replace(ing, `${ing} (${qty})`);
                        }
                    }
                }
            }
        }
        
        return enhanced;
    });
}

// ===== RECIPE DESCRIPTION GENERATOR =====
function generateRecipeDescription(recipe) {
    if (recipe.description) return recipe.description;
    
    const typeDescriptions = {
        'main': 'وجبة رئيسية شهية',
        'dessert': 'حلى لذيذ',
        'drink': 'مشروب منعش',
        'drink_hot': 'مشروب ساخن',
        'drink_cold': 'مشروب بارد',
        'pastry': 'معجنات طازجة',
        'salad': 'سلطة صحية',
        'sauce': 'صوص مميز',
        'fast': 'وجبة سريعة'
    };
    
    const baseDesc = typeDescriptions[recipe.type] || 'وصفة شهية';
    const mainIngredients = (recipe.ingredients || []).slice(0, 3).join('، ');
    const cals = recipe.calories ? ` • ${recipe.calories} سعرة` : '';
    const prot = recipe.protein ? ` • ${recipe.protein} بروتين` : '';
    
    return `${baseDesc} بـ${mainIngredients}${cals}${prot}`;
}

// ===== ENHANCED RECIPE DETAILS GENERATOR =====
// Generates detailed cooking tips for steps that don't have them
function enhanceRecipeSteps(recipe) {
    if (!recipe.steps || !recipe.steps.length) return [];
    
    return recipe.steps.map((step, idx) => {
        // If step is already detailed (>80 chars) just return it
        if (step.length > 80) return step;
        
        // Enhance shorter steps with contextual tips
        let enhanced = step;
        const stepLower = step.toLowerCase();
        
        // Add temperature guidance for frying/cooking
        if ((stepLower.includes('اقل') || stepLower.includes('قلي') || stepLower.includes('تقلي')) && !stepLower.includes('درجة')) {
            enhanced += ' (نار متوسطة عالية، درجة حرارة 170-180°م للحصول على قرمشة مثالية)';
        }
        // Oven instructions
        if ((stepLower.includes('فرن') || stepLower.includes('اشوي')) && !stepLower.includes('درجة')) {
            enhanced += ' (فرن مسخن مسبقاً على 180°م)';
        }
        // Boiling instructions
        if (stepLower.includes('يغلي') && !stepLower.includes('نار')) {
            enhanced += ' (على نار متوسطة)';
        }
        // Mixing instructions
        if (stepLower.includes('اخلط') && !stepLower.includes('جيدا')) {
            enhanced += ' حتى تتجانس المكونات تماماً';
        }
        // Seasoning guidance
        if (stepLower.includes('تبل') && !stepLower.includes('جيدا')) {
            enhanced += ' بشكل متساوٍ من جميع الجهات';
        }
        
        return enhanced;
    });
}

// ===== INGREDIENT DETAIL GENERATOR =====
// Adds detailed hints for quantities (salt, pepper, spices, sugar, flour amounts)
function enhanceIngredientDetail(quantity) {
    if (!quantity) return quantity;
    
    let enhanced = quantity;
    const lower = quantity.toLowerCase();
    
    // Add gram equivalents for common measurements if missing
    if (lower.includes('رشة ملح') && !lower.includes('مل') && !lower.includes('جرام')) {
        enhanced += ' (حوالي ¼ ملعقة صغيرة)';
    }
    if (lower.includes('رشة سكر') && !lower.includes('جرام')) {
        enhanced += ' (حوالي ¼ ملعقة صغيرة)';
    }
    if ((lower.includes('حبة طماطم') || lower.includes('طماطم متوسطة')) && !lower.includes('جرام')) {
        enhanced += lower.includes('كبيرة') ? ' (~150 جرام)' : ' (~100 جرام)';
    }
    if (lower.includes('بصلة') && !lower.includes('جرام')) {
        enhanced += lower.includes('كبيرة') ? ' (~180 جرام)' : lower.includes('صغيرة') ? ' (~60 جرام)' : ' (~120 جرام)';
    }
    if (lower.includes('حبة بطاطس') && !lower.includes('جرام')) {
        enhanced += ' (~170 جرام)';
    }
    if (lower.includes('فص ثوم') && !lower.includes('جرام')) {
        const match = quantity.match(/(\d+)/);
        const count = match ? parseInt(match[1]) : 1;
        enhanced += ` (~${count * 3} جرام)`;
    }
    
    return enhanced;
}






// Recipe categories for display
const recipeCategories = {
    'popular': { name: 'أكل شعبي 🏠', color: '#d97706' },
    'quick': { name: 'وجبات سريعة ⚡', color: '#10b981' },
    'main': { name: 'أطباق رئيسية 🍽️', color: '#3b82f6' },
    'healthy': { name: 'صحي ولايت 🥗', color: '#22c55e' },
    'international': { name: 'عالمي 🌍', color: '#8b5cf6' },
    'pastry': { name: 'معجنات 🥐', color: '#f59e0b' },
    'sauce': { name: 'صوصات 🥣', color: '#ef4444' },
    'salad': { name: 'سلطات 🥗', color: '#84cc16' },
    'dessert': { name: 'حلى 🍰', color: '#ec4899' },
    'drink': { name: 'مشروبات 🥤', color: '#06b6d4' }
};

const recipes = [
    // --- MAIN DISHES (طبخ) & OTHERS ---

    {
        id: 1,
        name: "شكشوكة",
        type: "main",
        category: "popular",
        calories: 184.0,
        protein: "7g",
        video: "https://www.youtube.com/embed/Pj1eR_sylvU",
        ingredients: ["بيض", "طماطم", "بصل", "زيت", "ملح", "فلفل أسود"],
        quantities: [
            "2 بيضة",
            "1 حبة طماطم (مفرومة)",
            "1/2 بصلة صغيرة (مفرومة)",
            "1 ملعقة زيت",
            "¼ ملعقة صغيرة ملح (1.25 مل)",
            "¼ ملعقة صغيرة فلفل أسود (1.25 مل)"
        ],
        steps: [
            "حمر البصل في الزيت حتى يذبل.",
            "أضف الطماطم واتركها تتسبك قليلاً.",
            "أضف البيض وحركه (أو اتركه عيون).",
            "تبل بـ½ ملعقة صغيرة ملح + ¼ ملعقة صغيرة فلفل أسود وقدمها مع الخبز."
        ]
    },
    {
        id: 2,
        name: "كبسة دجاج",
        type: "main",
        category: "popular",
        calories: 774,
        protein: "55g",
        video: "https://www.youtube.com/embed/x1w6O_e_u-w",
        ingredients: ["دجاج", "أرز", "بصل", "طماطم", "بهارات", "زيت", "ملح"],
        quantities: [
            "1/2 دجاجة (أو صدر دجاج)",
            "1 كوب أرز (180 جرام) بسمتي",
            "1 بصلة صغيرة",
            "1 حبة طماطم",
            "1 ملعقة معجون طماطم",
            "2 ملعقة صغيرة بهارات كبسة (10 مل / 6 جرام) - لومي + قرفة + هيل + كمون",
            "2 ملعقة صغيرة ملح (10 مل / 12 جرام)",
            "2 ملعقة كبيرة زيت (30 مل)"
        ],
        steps: [
            "حمر البصل، ثم أضف الدجاج و½ ملعقة صغيرة بهارات مشكلة (2.5 مل).",
            "أضف الطماطم والماء المغلي واترك الدجاج ينضج.",
            "أضف الأرز المغسول (الماء يغطيه بـ 1 سم).",
            "غط القدر واتركه على نار هادئة 20 دقيقة."
        ]
    },
    {
        id: 3,
        name: "صينية دجاج بالخضار",
        type: "main",
        category: "main",
        calories: 223,
        protein: "20g",
        video: "https://www.youtube.com/embed/qgqP_9YgLXM",
        ingredients: ["دجاج", "بطاطس", "جزر", "بصل", "طماطم", "زيت", "ملح", "بهارات"],
        quantities: [
            "2 قطعة دجاج",
            "1 حبة بطاطس (حلقات)",
            "1 حبة جزر (حلقات)",
            "1 بصلة (شرائح)",
            "1 كوب (240 مل) عصير طماطم",
            "2 ملعقة زيت",
            "1/2 ملعقة صغيرة (2.5 مل) ملح",
            "1/4 ملعقة صغيرة (1.25 مل) فلفل أسود",
            "1/2 ملعقة صغيرة (2.5 مل) 1 ملعقة صغيرة بهارات مشكلة (5 مل / 3 جرام)"
        ],
        steps: [
            "رص الدجاج والخضار في صينية.",
            "صب عصير الطماطم والزيت و1 ملعقة صغيرة بهارات (5 مل).",
            "غطيها بقصدير وادخلها الفرن 45 دقيقة."
        ]
    },
    {
        id: 4,
        name: "مسقعة",
        type: "main",
        category: "popular",
        calories: 273,
        protein: "15g",
        video: "https://www.youtube.com/embed/stt_Q_N_qOc",
        ingredients: ["باذنجان", "لحم مفروم", "طماطم", "بصل", "زيت", "ثوم", "ملح"],
        quantities: [
            "1 حبة باذنجان كبيرة",
            "200 جرام لحم مفروم",
            "1 كوب (240 مل) صلصة طماطم",
            "2 فص ثوم",
            "1 كوب زيت نباتي للقلي (240 مل / 220 جرام)",
            "1/2 ملعقة صغيرة (2.5 مل) ملح",
            "1/4 ملعقة صغيرة (1.25 مل) فلفل أسود"
        ],
        steps: [
            "اقل الباذنجان.",
            "عصج اللحم المفروم مع البصل.",
            "رص طبقات باذنجان ولحم وصوص طماطم.",
            "بالفرن 15 دقيقة."
        ]
    },
    {
        id: 8,
        name: "ملوخية",
        type: "main",
        category: "popular",
        calories: 260,
        protein: "42g",
        video: "https://www.youtube.com/embed/eHjLqOQjE0g",
        ingredients: ["ملوخية", "ثوم", "كزبرة", "دجاج", "مرقة", "ملح"],
        quantities: [
            "200 جرام ملوخية",
            "1 صدر دجاج مسلوق",
            "2 كوب (480 مل) مرقة",
            "3 فصوص ثوم",
            "1 ملعقة كزبرة ناشفة",
            "1/2 ملعقة صغيرة (2.5 مل) ملح"
        ],
        steps: [
            "في قدر، اغلي 2 كوب مرقة دجاج على نار متوسطة.",
            "أضف 200 جرام ملوخية مفرومة واتركها تغلي 5-7 دقائق مع التحريك.",
            "في مقلاة صغيرة، حمر 3 فصوص ثوم مهروس مع 1 ملعقة كزبرة ناشفة في ملعقة زيت حتى يذهب لونها (30 ثانية).",
            "صب الطشة (الثوم والكزبرة) فوق الملوخية واتركها تغلي دقيقة.",
            "قدمها مع صدر الدجاج المسلوق والأرز الأبيض وعصير ليمون."
        ]
    },
    {
        id: 9,
        name: "مكرونة بالباشميل",
        type: "main",
        category: "main",
        calories: 453,
        protein: "27g",
        video: "https://www.youtube.com/embed/1Z1Z1Z1Z1Z1",
        ingredients: ["مكرونة", "لحم مفروم", "حليب", "دقيق", "زبدة", "بصل", "جبن"],
        quantities: [
            "200 جرام مكرونة قلم",
            "150 جرام لحم مفروم",
            "2 كوب (480 مل) حليب للباشميل",
            "2 ملعقة دقيق",
            "2 ملعقة زبدة",
            "1 كوب جبن موزاريلا مبشور (115 جرام) للوجه"
        ],
        steps: [
            "اسلق المكرونة.",
            "عصج اللحم مع البصل.",
            "حمر الدقيق في الزبدة وأضف الحليب لعمل الباشميل.",
            "اخلط المكرونة بجزء من الباشميل، وضع طبقات: مكرونة، لحم، مكرونة، باشميل.",
            "بالفرن حتى تحمر."
        ]
    }, // <-- Ensure comma separating objects

    {
        id: 10,
        name: "ستيك لحم مثالي",
        type: "main",
        category: "international",
        calories: 297,
        protein: "20g",
        video: "https://www.youtube.com/embed/nSW0q3LHIeg",
        ingredients: ["لحم ستيك", "زبدة", "ثوم", "إكليل الجبل", "ملح", "فلفل أسود", "زيت"],
        quantities: [
            "1 قطعة ستيك (250-300 جرام) - ريب آي أو سيرلوين",
            "2 ملعقة كبيرة (30 مل) زبدة",
            "3 فصوص ثوم كاملة (بقشرها مضغوطة)",
            "2 عرق إكليل جبل (روزماري) طازج",
            "1 ملعقة صغيرة ملح خشن (5 مل / 6 جرام)",
            "½ ملعقة صغيرة فلفل أسود مجروش (2.5 مل / 1.5 جرام)",
            "1 ملعقة زيت نباتي (للقلي)"
        ],
        steps: [
            "🥩 التحضير: أخرج الستيك من الثلاجة قبل 30 دقيقة ليصل لحرارة الغرفة. جففه تماماً بورق المطبخ (رطوبة = عدو التحمير!)",
            "🧂 التتبيل: تبّل الستيك بسخاء من الجانبين بـ¾ ملعقة صغيرة ملح خشن (4 مل) الخشن والفلفل الأسود المجروش. اضغط البهارات على اللحم",
            "🔥 تسخين المقلاة: سخّن مقلاة ثقيلة (حديد أو ستانلس) على أعلى نار 5 دقائق حتى تصبح ساخنة جداً وتبدأ بالتدخين قليلاً",
            "🛢️ الزيت: أضف 1 ملعقة زيت نباتي (تحمل حرارة عالية) وحركها لتغطي القاع",
            "⏱️ الشوي الأول: ضع الستيك برفق (سيصدر صوت قوي) ولا تحركه أبداً لمدة 3-4 دقائق. ستتشكل قشرة بنية ذهبية محمرة",
            "🔄 القلب: اقلب الستيك مرة واحدة فقط باستخدام ملقط (ليس شوكة!). اشوِ الجانب الآخر 3-4 دقائق للحم متوسط النضج (medium)",
            "🧈 التنكيه: في آخر دقيقة، أضف 2 ملعقة زبدة + 3 فصوص ثوم مضغوطة + 2 عرق روزماري. أمِل المقلاة واسقِ الستيك بالزبدة المذابة بالملعقة 4-5 مرات",
            "🌡️ درجات النضج: استخدم ترمومتر لحم - نيء (50-52°C) | متوسط نيء (54-57°C) | متوسط (60-63°C) | متوسط مستوي (65-68°C) | مستوي (71°C+)",
            "😴 الراحة: ارفع الستيك وضعه على لوح تقطيع. اتركه يرتاح 5-7 دقائق مغطى بورق ألمنيوم بشكل خفيف (العصارة ستتوزع داخل اللحم)",
            "🔪 التقديم: قطّعه ضد اتجاه الألياف (يصبح أطرى). قدّمه مع بطاطس مهروسة أو سلطة وصب عليه عصارة اللحم المتجمعة"
        ]
    },
    {
        id: 11,
        name: "فاهيتا دجاج مكسيكية",
        type: "fast", // Classified as Fast Food / Quick Meal
        category: "international",
        calories: 640,
        protein: "49g",
        video: "https://www.youtube.com/embed/X1X1X1X1X",
        ingredients: ["صدور دجاج", "فلفل رومي", "بصل", "خبز تورتيلا", "ليمون", "بهارات", "كزبرة", "كريمة حامضة"],
        quantities: [
            "500 جرام صدور دجاج (شرائح رفيعة)",
            "1 فلفل رومي أحمر شرائح",
            "1 فلفل رومي أخضر شرائح",
            "1 بصلة كبيرة شرائح",
            "2 ملعقة كبيرة عصير ليمون (30 مل)",
            "2 ملعقة بهارات فاهيتا (بابريكا، كمون، ثوم بودرة، فلفل حار)",
            "6 خبز تورتيلا",
            "2 ملعقة كبيرة كزبرة طازجة مفرومة (8 جرام)",
            "3 ملعقة كبيرة غواكامولي (45 مل) + 2 ملعقة كبيرة كريمة حامضة (30 مل)",
            "2 ملعقة زيت نباتي"
        ],
        steps: [
            "🍗 التتبيل: ضع شرائح الدجاج في وعاء مع 1 ملعقة بهارات فاهيتا + عصير نصف ليمونة + 1 ملعقة زيت. قلّب واتركه 15 دقيقة",
            "🔥 الدجاج: سخّن مقلاة واسعة على نار عالية جداً. أضف الدجاج المتبل (بدون سائل) واشوِه 3-4 دقائق مع التقليب حتى ينضج ويتحمر. ارفعه جانباً",
            "🌶️ الخضار: في نفس المقلاة، أضف 1 ملعقة زيت. أضف البصل والفلفل الرومي + 1 ملعقة بهارات فاهيتا. شوّح على نار عالية 4-5 دقائق مع التحريك المستمر حتى يلين ويتفحم قليلاً على الأطراف",
            "🔄 المزج: أرجع الدجاج للمقلاة مع الخضار. قلّب دقيقة واحدة حتى يسخن كل شيء. اعصر باقي الليمون فوقه",
            "🌮 تسخين التورتيلا: سخّن خبز التورتيلا على مقلاة جافة 20 ثانية لكل جانب أو لفّه بورق ألمنيوم وضعه في الفرن 5 دقائق على 150°",
            "🌿 التقديم: ضع خليط الدجاج والخضار في التورتيلا. أضف غواكامولي، كريمة حامضة، كزبرة طازجة. لفّه وقدمه فوراً"
        ]
    },
    {
        id: 12,
        name: "شوربة عدس",
        type: "main", // Main Dish / Soup
        category: "healthy",
        calories: 304,
        protein: "35g",
        video: "https://www.youtube.com/embed/X2X2X2X2X2",
        ingredients: ["عدس", "جزر", "بصل", "طماطم", "بطاطس", "كمون", "ثوم", "زيت"],
        quantities: [
            "1.5 كوب (360 مل) عدس أصفر (مغسول)",
            "1 جزرة كبيرة مقطعة",
            "1 بصلة متوسطة مفرومة",
            "1 حبة طماطم مقطعة",
            "1 بطاطس صغيرة مقطعة",
            "5 أكواب ماء أو مرقة",
            "1 ملعقة كبيرة كمون",
            "3 فصوص ثوم",
            "2 ملعقة زيت زيتون",
            "2 ملعقة صغيرة ملح (10 مل / 12 جرام) + ½ ملعقة صغيرة فلفل أسود (2.5 مل)",
            "½ ليمونة مقطعة شرائح + 2 شريحة خبز محمص"
        ],
        steps: [
            "🧅 التحمير: سخّن 2 ملعقة زيت في قدر كبير. أضف البصل وشوّحه 3-4 دقائق حتى يذبل ويصفر",
            "🧄 الثوم: أضف 3 فصوص ثوم مفروم وقلّب 30 ثانية حتى تفوح الرائحة",
            "🥕 الخضار: أضف الجزر + البطاطس + الطماطم. قلّب 2-3 دقائق",
            "🫘 العدس: أضف 1.5 كوب عدس مغسول + 5 أكواب ماء ساخن + 2 ملعقة صغيرة ملح (10 مل) + ½ ملعقة صغيرة فلفل أسود. اتركه يغلي ثم خفّف النار",
            "⏱️ الطبخ: غطِّ القدر واطبخ 25-30 دقيقة على نار هادئة حتى ينضج العدس والخضار تماماً (يتفتت العدس بسهولة)",
            "🪄 الخلط: اطحن الشوربة بالخلاط اليدوي أو الكهربائي حتى تصبح ناعمة. أضف ماء إضافي للقوام المطلوب",
            "🧂 التتبيل: أضف 1 ملعقة كمون كبيرة + نصف ملعقة فلفل أسود. قلّب وذوّق الملح",
            "🍜 التقديم: اسكبها ساخنة. زيّنها برشة كمون + زيت زيتون + قطع خبز محمص. قدّمها مع شرائح ليمون"
        ]
    },
    {
        id: 13,
        name: "مندي دجاج",
        type: "main",
        calories: 673,
        protein: "55g",
        video: "https://www.youtube.com/embed/X3X3X3X3",
        ingredients: ["دجاج", "دجاج كامل", "أرز", "زعفران", "فحم", "زيت", "بهارات"],
        quantities: [
            "1 دجاجة كاملة (1000 جرام) مقطعة أنصاف",
            "2 كوب (480 مل) رز بسمتي",
            "1/2 ملعقة زعفران منقوع في 2 ملعقة كبيرة ماء دافئ",
            "5 حبات هيل + 1 عود قرفة (5 سم) + 3 حبات قرنفل",
            "1 ملعقة كبيرة ملح (15 مل / 18 جرام)",
            "½ ملعقة صغيرة كركم (2.5 مل)",
            "2 ملعقة كبيرة زيت (30 مل)",
            "1 فحمة صغيرة للتدخين + 1 ملعقة صغيرة زيت (5 مل)"
        ],
        steps: [
            "في قدر كبير، اسلق نصف دجاجة في 6 أكواب ماء مع 1 بصلة كاملة، 5 حبات هيل، عود قرفة، 3 قرنفل، و1 ملعقة كبيرة ملح (15 مل / 18 جرام) لمدة 45 دقيقة حتى ينضج.",
            "ارفع الدجاج واحتفظ بالمرقة. ادهن الدجاج بمزيج من نصف ملعقة زعفران منقوع في ماء، 2 ملعقة زيت، و¼ ملعقة صغيرة كركم (1.25 مل).",
            "ضع الدجاج في صينية واشويه في فرن على 200 درجة لمدة 15-20 دقيقة حتى يحمر.",
            "اغسل 2 كوب أرز بسمتي واتركه منقوع 15 دقيقة. اطبخه في 3 أكواب من مرقة الدجاج على نار هادئة 20 دقيقة.",
            "رتب الدجاج فوق الأرز. ضع فحمة مشتعلة في ورق ألمنيوم وصب عليها ملعقة زيت، كتم القدر فوراً واترك الدخان يتسرب 5 دقائق.",
            "قدمه مع سلطة خضراء ودقوس (صلصة حارة)."
        ]
    },
    {
        id: 14,
        name: "بروستد دجاج مقرمش",
        type: "fast", // Fast Food
        category: "quick",
        calories: 1099,
        protein: "55g",
        video: "https://www.youtube.com/embed/X7X7X7X7",
        ingredients: ["دجاج", "دقيق", "نشا", "بقسماط", "بيض", "حليب", "زيت", "بهارات"],
        quantities: [
            "1 كيلو دجاج (مقطع 8-10 قطع)",
            "1.5 كوب دقيق (180 جرام)",
            "½ كوب نشا ذرة (120 مل)",
            "1 كوب بقسماط (110 جرام) ناعم",
            "2 بيضة مخفوقة",
            "½ كوب حليب (120 مل)",
            "1 ملعقة صغيرة (5 مل) بودرة ثوم",
            "1 ملعقة صغيرة (5 مل) بابريكا",
            "¼ ملعقة صغيرة نصف ملعقة فلفل أسود (1.25 مل)",
            "1 ملعقة صغيرة (5 مل) ملح",
            "1.5 كوب زيت نباتي للقلي العميق (360 مل / 330 جرام)"
        ],
        steps: [
            "🍗 التحضير: اغسل الدجاج جيداً. اعمل شقوق عميقة في القطع الكبيرة لتتشرب النكهة",
            "🥛 التتبيلة الرطبة: اخلط 2 بيضة + نصف كوب حليب + 1 ملعقة صغيرة ملح + ¼ ملعقة صغيرة فلفل أسود. انقع الدجاج فيها 30 دقيقة في الثلاجة",
            "🌾 الخلطة الجافة: اخلط 1.5 كوب دقيق + نصف كوب نشا + 1 كوب بقسماط + بودرة ثوم + بابريكا + فلفل + 1 ملعقة صغيرة ملح (5 مل)",
            "👐 التغليف: أخرج الدجاج من التتبيلة وغلّفه بالخلطة الجافة. للقرمشة المضاعفة: غمّسه بالتتبيلة مرة ثانية ثم الخلطة الجافة",
            "🔥 تسخين الزيت: سخّن زيت غزير (يغطي الدجاج) على 180°C. اختبر بقطعة خبز صغيرة - يجب أن تفور فوراً",
            "⏱️ القلي: اقلِ الدجاج على دفعات (لا تزحم القدر). القطع الصغيرة (أجنحة): 8-10 دقائق. القطع الكبيرة (فخذ): 12-15 دقيقة",
            "✅ علامات النضج: لون ذهبي غامق + لا يوجد دم عند الوخز + درجة حرارة داخلية 75°C",
            "📰 التصفية: ارفع الدجاج على شبكة لتصفية الزيت 3-5 دقائق. قدّمه ساخناً مع بطاطس مقلية وثومية"
        ]
    },
    {
        id: 15,
        name: "شيش طاووق مشوي",
        type: "main",
        calories: 234,
        protein: "40g",
        video: "https://www.youtube.com/embed/X8X8X8X8",
        ingredients: ["صدور دجاج", "زبادي", "ثوم", "ليمون", "زيت زيتون", "بهارات", "فلفل رومي", "بصل"],
        quantities: [
            "500 جرام صدور دجاج (مكعبات 3 سم)",
            "3 ملاعق كبيرة (45 مل) زبادي",
            "4 فصوص ثوم مهروس",
            "3 ملعقة كبيرة عصير ليمون (45 مل)",
            "3 ملاعق زيت زيتون",
            "1 ملعقة صغيرة (5 مل) بابريكا",
            "1 ملعقة صغيرة (5 مل) أوريغانو",
            "½ ملعقة صغيرة نصف ملعقة صغيرة كمون (2.5 مل)",
            "1/2 ملعقة صغيرة (2.5 مل) ملح",
            "1/4 ملعقة صغيرة (1.25 مل) فلفل أسود",
            "¼ ملعقة صغيرة فلفل رومي وبصل (للأسياخ) (1.25 مل)"
        ],
        steps: [
            "🥣 التتبيلة: اخلط 3 ملاعق زبادي + 4 فصوص ثوم + عصير ليمونة + 3 ملاعق زيت زيتون + بابريكا + أوريغانو + كمون + 1 ملعقة صغيرة ملح + ¼ ملعقة صغيرة فلفل أسود",
            "🍗 النقع: قطّع الدجاج مكعبات 3 سم وانقعها في التتبيلة ساعتين على الأقل (أو ليلة كاملة لطعم أفضل)",
            "🍾 الأسياخ: شك الدجاج في أسياخ مع قطع فلفل رومي وبصل بالتناوب. باعد قليلاً بين القطع",
            "🔥 الشوي على الشواية: سخّن الشواية على نار متوسطة-عالية. اشوِ 3-4 دقائق لكل جانب مع التقليب حتى يتحمر",
            "🌡️ الشوي بالفرن: سخّن الفرن على 220°C. ضع الأسياخ على شبكة واشوِ 15-18 دقيقة مع التقليب في المنتصف",
            "✅ علامات النضج: لون ذهبي مع علامات شوي + الدجاج ليس وردياً من الداخل + العصارة شفافة",
            "🍽️ التقديم: قدّمه ساخناً مع خبز عربي + ثومية + مخلل + سلطة خضراء"
        ]
    },
    {
        id: 16,
        name: "إيدام دجاج بالكاري",
        type: "main",
        calories: 354,
        protein: "41g",
        video: "https://www.youtube.com/embed/X9X9X9X9",
        ingredients: ["صدور دجاج", "بصل", "طماطم", "كاري", "كريمة طبخ", "ثوم", "زنجبيل", "كزبرة"],
        quantities: [
            "500 جرام صدور دجاج (مكعبات)",
            "1 بصلة كبيرة مفرومة ناعم",
            "2 طماطم مبشورة",
            "2 ملعقة كبيرة كاري بودرة",
            "2 ملعقة كبيرة نصف كوب كريمة طبخ (أو حليب جوز هند) (30 مل)",
            "3 فصوص ثوم مهروس",
            "1 ملعقة زنجبيل مبشور",
            "2 ملعقة كبيرة كزبرة طازجة مفرومة (8 جرام)",
            "2 ملعقة زيت",
            "1/2 ملعقة صغيرة (2.5 مل) ملح"
        ],
        steps: [
            "🍗 الدجاج: سخّن 2 ملعقة زيت في قدر على نار عالية. أضف مكعبات الدجاج وحمّرها من كل جانب 3-4 دقائق. ارفعها جانباً",
            "🧅 البصل: في نفس القدر، أضف البصل وشوّحه 5-7 دقائق حتى يذبل ويصفر",
            "🧄 التوابل: أضف الثوم + الزنجبيل وقلّب دقيقة. أضف 2 ملعقة كاري وقلّب 30 ثانية حتى تفوح رائحة الكاري",
            "🍅 الطماطم: أضف الطماطم المبشورة + 1 ملعقة صغيرة ملح (5 مل). اطبخ 5-7 دقائق حتى يتسبّك الخليط ويفرز الزيت",
            "🍗 الطبخ: أرجع الدجاج + نصف كوب ماء. غطِّ واطبخ 15 دقيقة على نار هادئة حتى ينضج الدجاج",
            "🧄 الكريمة: أضف نصف كوب كريمة طبخ. قلّب واتركه يغلي 3-5 دقائق حتى يكثف الصوص",
            "🍽️ التقديم: زيّنه بكزبرة طازجة مفرومة. قدّمه ساخناً مع أرز أبيض باسمتي"
        ]
    },
    {
        id: 17,
        name: "ستروغونوف دجاج كريمي",
        type: "main",
        calories: 403,
        protein: "43g",
        video: "https://www.youtube.com/embed/Y1Y1Y1Y1",
        ingredients: ["صدور دجاج", "فطر", "كريمة طبخ", "بصل", "زبدة", "مرقة", "ثوم", "بقدونس"],
        quantities: [
            "500 جرام صدور دجاج (شرائح رفيعة)",
            "200 جرام فطر مشروم شرائح",
            "1 بصلة متوسطة شرائح",
            "3 فصوص ثوم مفروم",
            "1 كوب (240 مل) كريمة طبخ",
            "1 مكعب مرقة دجاج",
            "2 ملعقة زبدة",
            "1 ملعقة زيت",
            "2 ملعقة كبيرة بقدونس طازج مفروم (8 جرام)",
            "1/2 ملعقة صغيرة (2.5 مل) ملح",
            "1/4 ملعقة صغيرة (1.25 مل) فلفل أسود"
        ],
        steps: [
            "🍗 الدجاج: تبّل شرائح الدجاج ب½ ملعقة صغيرة ملح (2.5 مل) + ¼ ملعقة صغيرة فلفل أسود (1.25 مل). سخّن 1 ملعقة زبدة + 1 ملعقة زيت على نار عالية. حمّر الدجاج 2-3 دقائق لكل جانب. ارفعه جانباً",
            "🍄 الفطر: في نفس المقلاة، أضف 1 ملعقة زبدة. شوّح الفطر على نار عالية 4-5 دقائق حتى يذهب لونه ويطلع مائه",
            "🧅 البصل: أضف البصل وشوّح 3-4 دقائق حتى يذبل. أضف الثوم وقلّب 30 ثانية",
            "🥛 الصوص: أضف 1 كوب كريمة + مكعب مرقة مذوّب في ربع كوب ماء ساخن. قلّب واتركه يغلي على نار متوسطة 3-4 دقائق",
            "🔄 المزج: أرجع الدجاج للصوص. قلّب برفق واتركه 3-5 دقائق حتى يكثف الصوص ويتشرب الدجاج النكهة",
            "🍽️ التقديم: زيّنه ببقدونس طازج مفروم. قدّمه فوراً مع أرز أبيض أو مكرونة فيتوتشيني"
        ]
    },
    {
        id: 18,
        name: "جريش",
        type: "main",
        calories: 813,
        protein: "55g",
        video: "https://www.youtube.com/embed/Y2Y2Y2Y2",
        ingredients: ["دجاج", "أرز", "زبادي", "لبن", "بصل", "سمن"],
        quantities: [
            "1 كوب (240 مل) جريش (حب قمح مجروش)",
            "1/4 كوب (60 مل) أرز مصري",
            "2 صدر دجاج",
            "2 كوب (480 مل) لبن",
            "1 بصلة",
            "2 ملعقة كبيرة سمن (30 مل / 28 جرام) + ½ ملعقة صغيرة بهارات مشكلة"
        ],
        steps: [
            "اسلق الجريش والأرز والدجاج مع الماء والبصل حتى ينهري تماماً.",
            "أخرج الدجاج وفتته ثم أعده.",
            "أضف اللبن وححركه جيداً بمضرب الجريش.",
            "قدمه وعليه كشنة البصل والسمن والمسمنة."
        ]
    },
    {
        id: 19,
        name: "مرقوق",
        type: "main",
        category: "popular",
        calories: 204,
        protein: "16g",
        video: "https://www.youtube.com/embed/Y3Y3Y3Y3",
        ingredients: ["لحم", "دقيق بر", "خضار مشكل", "بصل", "طماطم", "بهارات"],
        quantities: [
            "500 جرام لحم مقطع مكعبات",
            "2 كوب دقيق بر (240 جرام) + ¾ كوب ماء دافئ (180 مل) + رشة ملح",
            "1 حبة قرع صغيرة (200 جرام) + 1 كوسة (150 جرام) + 1 جزرة (60 جرام)",
            "1 بصلة متوسطة (120 جرام) + 2 حبة طماطم (200 جرام)",
            "2 حبة ليمون أسود + 1 ملعقة صغيرة بهارات مشكلة (5 مل)"
        ],
        steps: [
            "اطبخ اللحم مع البصل والطماطم و½ ملعقة صغيرة بهارات مشكلة (2.5 مل).",
            "أضف الخضار والماء.",
            "افرد العجينة لدوائر رقيقة جداً وأضفها واحدة تلو الأخرى للمرق يغلي.",
            "اتركها تنضج على نار هادئة."
        ]
    },
    {
        id: 20,
        name: "صيادية سمك",
        type: "main",
        category: "popular",
        calories: 528,
        protein: "14g",
        video: "https://www.youtube.com/embed/H0H0H0H0",
        ingredients: ["سمك", "أرز", "بصل", "بهارات", "زيت"],
        quantities: [
            "500 جرام سمك كنعد أو هامور مقطع شرائح",
            "2 كوب أرز (360 جرام)",
            "3 بصلات كبيرة (لتحمير الصيادية)",
            "½ ملعقة صغيرة بهارات سمك وكمون (2.5 مل)"
        ],
        steps: [
            "حمر البصل حتى يصبح بني غامق جداً (بس ما ينحرق).",
            "أضف الماء و½ ملعقة صغيرة بهارات مشكلة (2.5 مل) والسمك ينسلق.",
            "ارفع السمك وحمره بالفرن.",
            "كب الرز على ماء البصل البني واطبخه."
        ]
    },
    {
        id: 21,
        name: "سمك مقلي",
        type: "main",
        category: "popular",
        calories: 78,
        protein: "4g",
        video: "https://www.youtube.com/embed/H1H1H1H1",
        ingredients: ["سمك", "ثوم", "ليمون", "دقيق", "زيت", "بهارات"],
        quantities: [
            "500 جرام سمك (شعور أو هامور) منظّف",
            "3 فصوص ثوم مهروس + 2 ملعقة كبيرة عصير ليمون (30 مل) + 1 ملعقة صغيرة كمون (5 مل) + ½ ملعقة صغيرة كزبرة ناشفة",
            "½ كوب دقيق للتغطية (60 جرام)",
            "1 كوب زيت نباتي للقلي (240 مل / 220 جرام)"
        ],
        steps: [
            "تبل السمك جيداً من الداخل والخارج.",
            "غلفه بالدقيق.",
            "اقله في زيت غزير حتى يتقرمش.",
            "قدمه مع رز أبيض وطحينة."
        ]
    },
    {
        id: 22,
        name: "سلطة خضراء",
        type: "salad", // Salad
        category: "healthy",
        calories: 85,
        protein: "1g",
        video: "https://www.youtube.com/embed/X9X9X9X9",
        ingredients: ["خيار", "طماطم", "خس", "بصل", "ليمون", "زيت"],
        quantities: [
            "2 خيارة مقطعة",
            "2 طماطم مقطعة",
            "4 أوراق خس كبيرة (80 جرام)",
            "1/2 بصلة",
            "3 ملعقة كبيرة عصير ليمون (45 مل)",
            "2 ملعقة كبيرة (30 مل) زيت زيتون",
            "1/4 ملعقة صغيرة (1.25 مل) ملح"
        ],
        steps: [
            "قطع جميع الخضروات.",
            "اخلطها في وعاء كبير.",
            "أضف الليمون والزيت و½ ملعقة صغيرة ملح (2.5 مل) وقدمها."
        ]
    },
    {
        id: 23,
        name: "بطاطس مقلية مقرمشة",
        type: "fast", // Fast Food
        category: "quick",
        calories: 683,
        protein: "3g",
        video: "https://www.youtube.com/embed/X8X8X8X8",
        ingredients: ["بطاطس", "زيت", "ملح", "كتشب"],
        quantities: [
            "4 حبات بطاطس كبيرة",
            "زيت غزير للقلي (5 سم عمق)",
            "1/2 ملعقة صغيرة (2.5 مل) ملح ناعم",
            "كتشب وثومية للتقديم"
        ],
        steps: [
            "🥔 التقطيع: قشّر البطاطس وقطّعها أصابع متساوية (سمك 1 سم). التساوي مهم للنضج المتساوي",
            "💧 النقع: انقعها في ماء بارد 30 دقيقة لإزالة النشا. هذا سر القرمشة!",
            "🧭 التجفيف: صفِّ الماء وجفّفها جيداً بمنشفة مطبخ. الماء = رشاش زيت خطير!",
            "🔥 القلي الأول (الطبخ): سخّن الزيت على 160°C. اقلِ البطاطس 5-7 دقائق حتى تنضج بدون لون. ارفعها واتركها تبرد 10 دقائق",
            "🔥 القلي الثاني (القرمشة): ارفع حرارة الزيت إلى 190°C. اقلِ مرة ثانية 3-4 دقائق حتى تصبح ذهبية مقرمشة",
            "✨ التتبيل: ارفعها على مناديل ورقية. رش الملح فوراً وهي ساخنة ليلتصق",
            "🍽️ التقديم: قدّمها فوراً مع كتشب وثومية. الصبر 30 ثانية إضافية يفقدها القرمشة!"
        ]
    },
    {
        id: 24,
        name: "كبسة لحم سعودية",
        type: "main",
        calories: 1200,
        protein: "55g",
        video: "https://www.youtube.com/embed/X0X0X0X0",
        ingredients: ["لحم غنم", "أرز", "بصل", "طماطم", "بهارات", "لوز", "زبيب"],
        quantities: [
            "1 كيلو لحم غنم (قطع كبيرة)",
            "3 كوب (720 مل) رز بسمتي (منقوع 30 دقيقة)",
            "1 بصلة كبيرة مفرومة",
            "2 طماطم مبشورة + 1 ملعقة صلصة",
            "2 ملعقة بهارات كبسة",
            "3 ليمون أسود + 5 حب هيل + عود قرفة",
            "2 ملعقة كبيرة لوز محمص (15 جرام) + 1 ملعقة كبيرة زبيب (10 جرام)",
            "3 ملاعق سمن",
            "1 ملعقة صغيرة (5 مل) ملح"
        ],
        steps: [
            "🥩 التحمير: سخّن 3 ملاعق سمن في قدر كبير. حمّر قطع اللحم من كل الجهات 5-7 دقائق حتى يذهب لونها. ارفعها",
            "🧅 البصل: في نفس القدر، شوّح البصل 5 دقائق حتى يذبل. أضف بهارات الكبسة + الهيل + القرفة + الليمون الأسود. قلّب دقيقة",
            "🍅 الطماطم: أضف الطماطم المبشورة + ملعقة صلصة + ملح. قلّب 3-4 دقائق حتى تتسبّك",
            "🍖 السلق: أرجع اللحم + 6 أكواب ماء مغلي. غطِّ واطبخ على نار هادئة حتى ينضج اللحم (ساعة - ساعة ونصف)",
            "🍚 الأرز: ارفع اللحم واحتفظ به. صفِّ الأرز وأضفه للمرقة (4 أكواب مرقة لكل 3 أرز). اتركه يغلي ثم خفّف النار",
            "⏱️ الطبخ: غطِّ القدر بإحكام. اطبخ 25-30 دقيقة على أخفض نار حتى ينضج الأرز ويجف الماء",
            "🍽️ التقديم: اكب الأرز في طبق كبير. رتّب اللحم فوقه. زيّنه بلوز وزبيب محمص. قدّمه مع سلطة خضراء ودقوس"
        ]
    },
    {
        id: 25,
        name: "إيدام لحم بالبطاطس",
        type: "main",
        calories: 168,
        protein: "15g",
        video: "https://www.youtube.com/embed/X-X-X-X",
        ingredients: ["لحم", "بطاطس", "بصل", "طماطم", "بهارات", "مرقة"],
        quantities: [
            "500 جرام لحم مقطع مكعبات",
            "1 حبة بطاطس مقطعة مكعبات (170 جرام)",
            "1 بصلة متوسطة (120 جرام) + 2 حبة طماطم (200 جرام)",
            "½ ملعقة صغيرة بهارات ومرقة (2.5 مل)"
        ],
        steps: [
            "سلق اللحم نصف استواء.",
            "أضف البطاطس والطماطم و½ ملعقة صغيرة بهارات مشكلة (2.5 مل).",
            "اتركها تتسبك حتى النضج."
        ]
    },
    {
        id: 30,
        name: "محشي كوسة",
        type: "main",
        calories: 726,
        protein: "41g",
        video: "https://www.youtube.com/embed/X11",
        ingredients: ["كوسة", "أرز", "لحم مفروم", "بصل", "طماطم", "بهارات"],
        quantities: [
            "1 كيلو كوسة محفورة",
            "1 كوب أرز (180 جرام) مصري",
            "200 جرام لحم مفروم",
            "1 بصلة متوسطة (120 جرام) + 2 حبة طماطم (200 جرام)",
            "1 ملعقة كبيرة نعناع ناشف وبهارات (4 جرام)"
        ],
        steps: [
            "اخلط الأرز واللحم والخضار (الحشوة).",
            "احش الكوسة (اترك فراغ بسيط).",
            "رصها في قدر وصب عليها صلصة طماطم ومرقة.",
            "اطبخها ساعة إلا ربع."
        ]
    },
    {
        id: 31,
        name: "فول مدمس",
        type: "main",
        calories: 143,
        protein: "6g",
        video: "https://www.youtube.com/embed/X12",
        ingredients: ["فول", "طماطم", "بصل", "ثوم", "زيت", "طحينة", "ليمون"],
        quantities: [
            "1 علبة فول (أو فول مسلوق)",
            "1 طماطم مقطعة",
            "2 فص فص ثوم (6 جرام)",
            "½ ملعقة صغيرة زيت زيتون وكمون (2.5 مل)",
            "2 ملعقة كبيرة طحينة وليمون (30 جرام)"
        ],
        steps: [
            "سخن الفول واهرسه قليلاً.",
            "أضف الطماطم والثوم والكمون.",
            "قدمه مع الزيت والطحينة والخبز."
        ]
    },
    {
        id: 32,
        name: "ساندويش تونة",
        type: "fast", // Fast Food
        category: "quick",
        calories: 61,
        protein: "5g",
        video: "https://www.youtube.com/embed/X13",
        ingredients: ["تونة", "مايونيز", "خس", "طماطم", "توست", "ذرة"],
        quantities: [
            "1 علبة تونة مصفاة",
            "2 ملعقة مايونيز",
            "2 شريحة خبز توست",
            "3 أوراق خس + 1 حبة طماطم + 3 ملعقة كبيرة ذرة (45 جرام)"
        ],
        steps: [
            "اخلط التونة مع المايونيز والذرة.",
            "احش التوست وأضف الخس والطماطم."
        ]
    },
    {
        id: 33,
        name: "بيض مقلي (عيون)",
        type: "main", // Breakfast / Main
        category: "quick",
        calories: 152.0,
        protein: "6g",
        video: "https://www.youtube.com/embed/X14",
        ingredients: ["بيض", "زبدة", "ملح", "فلفل"],
        quantities: [
            "2 بيضة",
            "1 ملعقة زبدة",
            "رشة ملح (1/8 ملعقة صغيرة (40 مل))",
            "¼ ملعقة صغيرة فلفل أسود (1.25 مل)"
        ],
        steps: [
            "ذوب الزبدة في مقلاة.",
            "اكسر البيض بهدوء.",
            "رشة ½ ملعقة صغيرة ملح (2.5 مل) + ¼ ملعقة صغيرة فلفل أسود (1.25 مل)، غطها لو تحب الصفار مستوي."
        ]
    },
    {
        id: 34,
        name: "فلافل مقرمشة",
        type: "fast", // Fast Food
        category: "popular",
        calories: 685,
        protein: "24g",
        video: "https://www.youtube.com/embed/X15",
        ingredients: ["حمص", "بصل", "ثوم", "كزبرة", "بقدونس", "كمون", "بابريكا", "زيت"],
        quantities: [
            "2 كوب (480 مل) حمص منقوع 12 ساعة (منفوخ)",
            "1 بصلة متوسطة",
            "4 فصوص ثوم",
            "حزمة 2 ملعقة كبيرة بقدونس طازج مفروم (8 جرام)",
            "حزمة 2 ملعقة كبيرة كزبرة طازجة مفرومة (8 جرام)",
            "1 ملعقة كمون",
            "1 ملعقة بابريكا",
            "½ ملعقة كربونات",
            "1.5 كوب زيت نباتي للقلي العميق (360 مل / 330 جرام)",
            "1/2 ملعقة صغيرة (2.5 مل) ملح",
            "1/4 ملعقة صغيرة (1.25 مل) فلفل أسود"
        ],
        steps: [
            "🫘 الحمص: انقع الحمص 12 ساعة في ماء بارد (لا تسلقه!). هذا سر القرمشة",
            "🪄 الطحن: صفِّ الحمص جيداً. اطحنه مع البصل + الثوم + البقدونس + الكزبرة في محضرة الطعام حتى يصبح ناعماً خشناً",
            "🧂 التتبيل: أضف الكمون + البابريكا + الملح + الفلفل + نصف ملعقة كربونات. اخلطها جيداً",
            "❄️ التبريد: غطِّ الخليط واتركه في الثلاجة 30 دقيقة ليتماسك",
            "👐 التشكيل: شكّل الخليط أقراص (قطر 5 سم، سمك 1.5 سم). استخدم قالب فلافل إن وجد",
            "🔥 القلي: سخّن زيت غزير على 180°C. اقلِ الفلافل 4-5 دقائق مع التقليب حتى تصبح ذهبية غامقة",
            "✅ علامات النضج: لون بني ذهبي + مقرمشة من الخارج + خضراء رطبة من الداخل",
            "🍽️ التقديم: قدّمها ساخنة مع خبز عربي + طحينة + مخلل + سلطة"
        ]
    },
    {
        id: 38,
        name: "حمص بالطحينة",
        type: "main",
        calories: 425,
        protein: "21g",
        video: "https://www.youtube.com/embed/X90",
        ingredients: ["حمص", "طحينة", "ليمون", "ثوم", "زيت زيتون", "كمون", "بابريكا"],
        quantities: [
            "1.5 كوب (360 مل) حمص مسلوق (أو علبة مصفاة)",
            "3 ملاعق طحينة سائلة",
            "3 ملعقة كبيرة عصير ليمون (45 مل)",
            "2 فص ثوم مهروس",
            "3 ملاعق زيت زيتون",
            "½ ملعقة صغيرة نصف ملعقة كمون (2.5 مل)",
            "¼ ملعقة صغيرة بابريكا للتزيين (1.25 مل)",
            "2-4 ملاعق ماء بارد",
            "1/2 ملعقة صغيرة (2.5 مل) ملح"
        ],
        steps: [
            "🫘 الحمص: اسلق الحمص 45-60 دقيقة حتى ينضج تماماً (ينهرس بسهولة). احتفظ ببعض الحبات للتزيين",
            "🪄 الطحن الأول: ضع الحمص الساخن في محضرة الطعام. اطحنه 2-3 دقائق حتى يصبح ناعماً",
            "🍋 الطحينة: أضف 3 ملاعق طحينة + عصير ليمونة + 2 فص ثوم + نصف ملعقة كمون + ملح. اطحن دقيقة",
            "💧 القوام: أضف 2-4 ملاعق ماء بارد (أو مكعب ثلج) تدريجياً مع الخلط. القوام المثالي: خفيف وكريمي",
            "✅ التذوق: ذوّق واضبط الملح والليمون والطحينة حسب ذوقك",
            "🍽️ التقديم: اسكبه في طبق واعمل حفرة بالملعقة. زيّنه بزيت زيتون + بابريكا + حبات حمص. قدّمه مع خبز عربي"
        ]
    },
    {
        id: 39,
        name: "مكرونة بالبشاميل",
        type: "main",
        category: "main",
        calories: 1200,
        protein: "55g",
        video: "https://www.youtube.com/embed/X91",
        ingredients: ["مكرونة", "لحم مفروم", "بصل", "طماطم", "حليب", "دقيق", "زبدة", "جبن"],
        quantities: [
            "500 جرام مكرونة أقلام",
            "400 جرام لحم مفروم",
            "1 بصلة كبيرة مفرومة",
            "2 طماطم مبشورة",
            "1 لتر حليب كامل الدسم",
            "4 ملاعق دقيق",
            "4 ملاعق زبدة",
            "1 كوب (240 مل) جبن موزاريلا مبشور",
            "½ ملعقة جوزة الطيب",
            "1/2 ملعقة صغيرة (2.5 مل) ملح",
            "1/4 ملعقة صغيرة (1.25 مل) فلفل أسود"
        ],
        steps: [
            "🍝 المكرونة: اسلق المكرونة في ماء مملح 8-10 دقائق (al dente - ناضجة لكن متماسكة). صفِّها واحتفظ بها",
            "🥩 اللحم: سخّن ملعقة زيت. شوّح البصل 3-4 دقائق. أضف اللحم المفروم وقلّب حتى يتفتت ويحمر (5-7 دقائق). أضف الطماطم + 1 ملعقة صغيرة ملح (5 مل) + فلفل. اطبخ 10 دقائق",
            "🥛 البشاميل: ذوّب 4 ملاعق زبدة على نار متوسطة. أضف 4 ملاعق دقيق وقلّب 2 دقيقة (لا تحمره!). أضف الحليب تدريجياً مع التقليب المستمر",
            "⏱️ طبخ البشاميل: استمر في التقليب 8-10 دقائق حتى يكثف الصوص ويغطي ظهر الملعقة. أضف نصف ملعقة جوزة الطيب + ملح + فلفل",
            "📦 الترتيب: ادهن صينية فرن بالزبدة. رص نصف المكرونة → كل اللحم → باقي المكرونة",
            "🧀 التغطية: صب كل البشاميل فوق المكرونة وبسّطه. انثر كوب جبن موزاريلا على الوجه",
            "🌡️ الخبز: سخّن الفرن على 200°C. اخبز 25-30 دقيقة حتى يتحمر الوجه ويصبح ذهبياً",
            "⏳ الراحة: اتركها ترتاح 5-10 دقائق قبل التقطيع لتتماسك. قدّمها ساخنة"
        ]
    },
    {
        id: 44,
        name: "سلطة تونة",
        type: "salad", // Salad
        category: "healthy",
        calories: 239,
        protein: "4g",
        video: "https://www.youtube.com/embed/X92",
        ingredients: ["تونة", "خس", "ذرة", "زيتون", "ليمون", "زيت"],
        quantities: [
            "1 علبة تونة مصفاة (185 جرام)",
            "3 أوراق خس مقطعة (60 جرام)",
            "2 ملعقة كبيرة ذرة وزيتون شرائح (30 مل)",
            "2 ملعقة كبيرة صوص (ليمون وشوي زيت زيتون) (30 مل)"
        ],
        steps: [
            "اخلط جميع المكونات في وعاء.",
            "تبلها بـ1 ملعقة صغيرة ملح (5 مل) + ½ ملعقة صغيرة فلفل أسود والليمون."
        ]
    },
    {
        id: 45,
        name: "بطاطس مقلية (فرن)",
        type: "fast", // Fast Food / Side
        category: "healthy",
        calories: 169,
        protein: "3g",
        video: "https://www.youtube.com/embed/X93",
        ingredients: ["بطاطس", "زيت", "بهارات", "بابريكا"],
        quantities: [
            "3 حبات بطاطس أصابع",
            "2 ملعقة كبيرة (30 مل) زيت زيتون",
            "1/2 ملعقة صغيرة (2.5 مل) ملح",
            "1/4 ملعقة صغيرة (1.25 مل) بابريكا",
            "½ ملعقة صغيرة أعشاب مجففة (2.5 مل)"
        ],
        steps: [
            "تبل أصابع البطاطس بالزيت و½ ملعقة صغيرة بهارات مشكلة (2.5 مل).",
            "رصها في صينية فرن.",
            "اشوِها حتى تقرمش (صحية أكثر)."
        ]
    },
    {
        id: 40,
        name: "بيتزا",
        type: "main",
        calories: 84,
        protein: "10g",
        video: "https://www.youtube.com/embed/X40",
        ingredients: ["دقيق", "خميرة", "ماء", "طماطم", "جبن", "زيتون", "فلفل رومي"],
        quantities: [
            "2 ملعقة كبيرة عجينة (دقيق، خميرة، ماء، زيت) (30 مل)",
            "2 فص صلصة بيتزا (طماطم، زعتر، ثوم) (6 جرام)",
            "1 كوب جبن موزاريلا مبشور (115 جرام)",
            "¼ ملعقة صغيرة شرائح زيتون وفلفل (1.25 مل)"
        ],
        steps: [
            "افرد العجينة في الصينية.",
            "وزع الصلصة ثم الجبن والخضار.",
            "اخبزها في فرن عالي الحرارة حتى يذوب الجبن."
        ]
    },
    {
        id: 41,
        name: "برجر لحم",
        type: "main",
        calories: 202,
        protein: "8g",
        video: "https://www.youtube.com/embed/X41",
        ingredients: ["لحم مفروم", "خبز برجر", "جبن", "خس", "طماطم", "بصل", "مايونيز", "كتشب"],
        quantities: [
            "لحم مفروم (مشكل أقراص)",
            "2 شريحة خبز برجر",
            "شريحة جبن",
            "خس وطماطم وبصل",
            "2 ملعقة كبيرة صوص (مايونيز وكتشب) (30 جرام)"
        ],
        steps: [
            "اشوِ اللحم على الصاج.",
            "حمر الخبز قليلاً.",
            "ابنِ البرجر: خبز، صوص، خس، لحم، جبن، طماطم."
        ]
    },
    {
        id: 42,
        name: "مقلوبة",
        type: "main",
        calories: 476,
        protein: "14g",
        video: "https://www.youtube.com/embed/X42",
        ingredients: ["دجاج", "أرز", "باذنجان", "بطاطس", "زهرة/قرنبيط", "بصل"],
        quantities: [
            "دجاج مقطع ومسلوق",
            "2 كوب أرز (360 جرام)",
            "خضار مقلية (باذنجان، بطاطس، زهرة)",
            "مرقة دجاج"
        ],
        steps: [
            "رص الدجاج والخضار المقلية في قاع القدر.",
            "أضف الأرز فوقهم.",
            "صب المرقة ببطء.",
            "اطبخها 30 دقيقة ثم اقلب القدر في صحن كبير."
        ]
    },
    {
        id: 43,
        name: "تبولة",
        type: "main",
        calories: 50,
        protein: "1g",
        video: "https://www.youtube.com/embed/X43",
        ingredients: ["بقدونس/كزبرة", "طماطم", "بصل", "برغل", "ليمون", "زيت"],
        quantities: [
            "3 حزم بقدونس مفروم ناعم جداً",
            "1/4 كوب (60 مل) برغل ناعم منقوع",
            "طماطم مفرومة وبصل مفروم",
            "2 ملعقة كبيرة عصير ليمون وزيت زيتون (30 مل)"
        ],
        steps: [
            "اخلط جميع المكونات قبل التقديم مباشرة.",
            "قدمها مع الخس."
        ]
    },
    {
        id: 35,
        name: "سليق",
        type: "main",
        calories: 800,
        protein: "55g",
        video: "https://www.youtube.com/embed/X16",
        ingredients: ["دجاج", "أرز", "حليب", "مستكة", "زبدة", "هيل"],
        quantities: [
            "دجاجة مسلوقة",
            "2 كوب أرز (360 جرام) مصري",
            "1.5 لتر مرقة دجاج",
            "2 كوب (480 مل) حليب",
            "3 حبات مستكة وهيل",
            "1 ملعقة كبيرة زبدة (15 جرام)"
        ],
        steps: [
            "اسلق الأرز في المرقة حتى يذوب.",
            "أضف الحليب وحركه باستمرار.",
            "حمر الدجاج بالفرن.",
            "قدم السليق وفوقه الدجاج والزبدة."
        ]
    },
    {
        id: 36,
        name: "برياني دجاج",
        type: "main",
        calories: 175,
        protein: "19g",
        video: "https://www.youtube.com/embed/X17",
        ingredients: ["دجاج", "أرز", "زبادي", "نعناع", "بصل", "زعفران", "بهارات"],
        quantities: [
            "قطع دجاج",
            "أرز بسمتي مسلوق نصف سلقة",
            "2 ملعقة كبيرة مفرومة زبادي ونعناع وكزبرة (8 جرام)",
            "بصل مقلي",
            "½ ملعقة صغيرة بهارات البرياني (2.5 مل)"
        ],
        steps: [
            "تبل الدجاج واطبخه مع الزبادي و½ ملعقة صغيرة بهارات مشكلة (2.5 مل).",
            "ضع طبقات: دجاج، أرز، بصل، نعناع، زعفران.",
            "كتم القدر 20 دقيقة."
        ]
    },
    {
        id: 37,
        name: "روبيان مشوي",
        type: "main",
        calories: 590,
        protein: "55g",
        video: "https://www.youtube.com/embed/X18",
        ingredients: ["روبيان", "ثوم", "ليمون", "زبدة", "كزبرة", "بقدونس/كزبرة"],
        quantities: [
            "1/2 كيلو روبيان منظف",
            "2 فص زبدة وثوم مهروس (6 جرام)",
            "عصير ليمون",
            "2 ملعقة كبيرة مفرومة كزبرة ناشفة وخضراء (8 جرام)"
        ],
        steps: [
            "شوح الثوم في الزبدة.",
            "أضف الروبيان وقلبه 5 دقائق فقط.",
            "أضف الليمون والكزبرة وقدمه فوراً."
        ]
    },


    // --- DESSERTS (حلى) ---
    {
        id: 101,
        name: "أم علي",
        type: "dessert",
        calories: 532,
        protein: "14g",
        video: "https://www.youtube.com/embed/tM0sNgs2wEw",
        ingredients: ["عجينة باف باستري", "حليب", "قشطة", "سكر", "مكسرات", "زبيب", "جوز هند"],
        quantities: [
            "2 شريحة بف باستري",
            "2 كوب (480 مل) حليب كامل الدسم",
            "2 ملعقة كبيرة نصف كوب سكر (25 جرام)",
            "1 علبة قشطة صغيرة",
            "¼ كوب نصف كوب مكسرات مشكلة (35 جرام)",
            "2 ملعقة جوز هند",
            "2 ملعقة زبيب"
        ],
        steps: [
            "🥐 البف باستري: سخّن الفرن على 200°C. اخبز البف باستري 15-18 دقيقة حتى يصبح ذهبياً ومقرمشاً",
            "🍪 التفتيت: اتركه يبرد قليلاً ثم فتّته قطع صغيرة في طاجن فرن",
            "🥜 الحشو: وزّع المكسرات + الزبيب + جوز الهند على البف باستري",
            "🥛 الحليب: سخّن 2 كوب حليب + نصف كوب سكر حتى يذوب السكر. صبّه على الخليط",
            "🧀 القشطة: وزّع القشطة على الوجه. انثر مكسرات إضافية",
            "🌡️ الخبز: أدخلها الفرن على 180°C لمدة 15-20 دقيقة حتى يتحمر الوجه",
            "🍽️ التقديم: قدّمها ساخنة فوراً. ممكن زيادة رشة قرفة على الوجه"
        ]
    },
    {
        id: 102,
        name: "حلى لاتيه",
        type: "dessert",
        calories: 800,
        protein: "18g",
        video: "https://www.youtube.com/embed/K9q_W-_Mh-0",
        ingredients: ["بسكويت", "قشطة", "حليب مكثف", "قهوة", "كاكاو"],
        quantities: [
            "10 حبات بسكويت",
            "1 علبة قشطة صغيرة",
            "2 ملعقة حليب مكثف",
            "1/2 كوب (120 مل) قهوة مذابة",
            "1 ملعقة كبيرة كاكاو بودرة (7 جرام)"
        ],
        steps: [
            "غمس البسكويت في القهوة ورصه.",
            "اخلط القشطة والحليب المكثف وصبه فوقه.",
            "رشة كاكاو وتبريد."
        ]
    },
    {
        id: 103,
        name: "بان كيك فلفي",
        type: "dessert",
        calories: 147,
        protein: "5g",
        video: "https://www.youtube.com/embed/FLd00Bx4tOk",
        ingredients: ["دقيق", "بيض", "حليب", "سكر", "زبدة", "بيكنج بودر", "فانيليا"],
        quantities: [
            "1 كوب دقيق (120 جرام)",
            "1 كوب (240 مل) حليب",
            "1 بيضة كبيرة",
            "2 ملعقة سكر",
            "2 ملعقة زبدة ذائبة",
            "1 ملعقة صغيرة (5 مل) بيكنج بودر",
            "1 ملعقة فانيليا",
            "¼ ملعقة صغيرة ملح (1.25 مل)",
            "عسل وفواكه للتقديم"
        ],
        steps: [
            "🥛 السوائل: اخلط 1 كوب حليب + 1 بيضة + 2 ملعقة زبدة ذائبة + فانيليا في وعاء",
            "🌾 الجافة: في وعاء آخر، اخلط 1 كوب دقيق + 2 ملعقة سكر + بيكنج بودر + ¼ ملعقة صغيرة ملح (1.25 مل)",
            "🔄 المزج: صب السوائل على الجافة وقلّب برفق حتى تختفي الكتل (لا تفرط في الخلط!)",
            "🍳 المقلاة: سخّن مقلاة على نار متوسطة-هادئة. ادهنها بقليل من الزبدة",
            "🥞 الصب: اسكب ربع كوب من الخليط في المقلاة. انتظر حتى تظهر فقاعات على السطح (2-3 دقائق)",
            "🔄 القلب: اقلبها برفق واطبخ 1-2 دقيقة إضافية حتى تتحمر الجهة الثانية",
            "🍽️ التقديم: رص البان كيك فوق بعض. زيّنها بالعسل + الزبدة + الفواكه الطازجة"
        ]
    },
    {
        id: 105,
        name: "مهلبية",
        type: "dessert",
        calories: 131,
        protein: "7g",
        video: "https://www.youtube.com/embed/yQ0wXkQ_G1c",
        ingredients: ["حليب", "نشا", "سكر", "ماء ورد", "مكسرات"],
        quantities: [
            "2 كوب (480 مل) حليب",
            "2 ملعقة نشا",
            "3 ملعقة سكر",
            "1 كوب قطرة ماء ورد (240 مل)",
            "2 ملعقة كبيرة فستق (15 جرام)"
        ],
        steps: [
            "ذوب النشا في الحليب البارد.",
            "سخنه مع التحريك حتى يثقل.",
            "صب في كاسات وبردها."
        ]
    },
    {
        id: 106,
        name: "كوكيز شوكولاتة",
        type: "dessert",
        calories: 651,
        protein: "10g",
        video: "https://www.youtube.com/embed/X3X3X3X3X3",
        ingredients: ["دقيق", "زبدة", "سكر بني", "بيض", "شوكولاتة", "فانيليا", "بيكنج صودا"],
        quantities: [
            "1.5 كوب دقيق (180 جرام)",
            "115 جرام زبدة (بحرارة الغرفة)",
            "2 ملعقة كبيرة نصف كوب سكر بني (25 جرام)",
            "2 ملعقة كبيرة ربع كوب سكر أبيض (25 جرام)",
            "1 بيضة",
            "1 كوب (240 مل) حبيبات شوكولاتة",
            "1 ملعقة فانيليا",
            "1 ملعقة صغيرة نصف ملعقة بيكنج صودا (5 جرام)",
            "¼ ملعقة صغيرة ملح (1.25 مل)"
        ],
        steps: [
            "🧈 الزبدة: اخفق الزبدة + السكر البني + السكر الأبيض بالخلاط 2-3 دقائق حتى تصبح فاتحة ورقيقة",
            "🥚 البيض: أضف 1 بيضة + فانيليا واخفق حتى تمتزج",
            "🌾 الدقيق: في وعاء آخر اخلط الدقيق + بيكنج صودا + ½ ملعقة صغيرة ملح (2.5 مل). أضفها لخليط الزبدة وقلّب برفق",
            "🍫 الشوكولاتة: أضف 1 كوب حبيبات شوكولاتة واخلطها بالملعقة",
            "❄️ التبريد: غطِّ العجين وبرّده 30 دقيقة في الثلاجة (سر الكوكيز السميك)",
            "🍪 التشكيل: كوّر العجين كرات بحجم الجوز. رصّها على صينية مبطنة بورق زبدة (باعد 5 سم بينها)",
            "🌡️ الخبز: سخّن الفرن على 180°C. اخبز 10-12 دقيقة حتى تتحمر الأطراف (الوسط يبقى طرياً)",
            "⏳ الراحة: اتركها 5 دقائق على الصينية لتتماسك قبل النقل. ستكون مقرمشة من الخارج وطرية من الداخل"
        ]
    },
    {
        id: 114,
        name: "كيكة البرتقال الهشة",
        type: "dessert",
        calories: 419,
        protein: "8g",
        video: "https://www.youtube.com/embed/O1O1O1O1",
        ingredients: ["برتقال", "دقيق", "سكر", "بيض", "زيت", "بيكنج بودر", "فانيليا"],
        quantities: [
            "1 كوب (240 مل) عصير برتقال طازج",
            "2 ملعقة بشر برتقال",
            "2 كوب دقيق (240 جرام)",
            "1 كوب سكر (200 جرام)",
            "3 بيضات كبيرة",
            "2 ملعقة كبيرة نصف كوب زيت (30 مل)",
            "1 ملعقة بيكنج بودر",
            "1 ملعقة فانيليا"
        ],
        steps: [
            "🥚 البيض: اخفق 3 بيضات + 1 كوب سكر + فانيليا بالخلاط الكهربائي 3-4 دقائق حتى يصبح الخليط فاتح ورقيق",
            "🍊 البرتقال: أضف نصف كوب زيت + 1 كوب عصير برتقال + بشر البرتقال. اخلط جيداً",
            "🌾 الدقيق: أضف 2 كوب دقيق منخول مع بيكنج بودر تدريجياً. قلّب برفق حتى يمتزج",
            "🍽️ الصينية: ادهن صينية فرن بالزيت ورشة دقيق. صب الخليط",
            "🌡️ الخبز: سخّن الفرن على 180°C. اخبز 35-40 دقيقة حتى يتحمر الوجه وتخرج عود الأسنان نظيفة",
            "✨ الصوص (اختياري): اخلط ربع كوب عصير برتقال + 2 ملعقة سكر بودرة. صبّه على الكيك وهو ساخن"
        ]
    },
    {
        id: 116,
        name: "فطيرة التفاح (أبل باي)",
        type: "dessert",
        calories: 647,
        protein: "3g",
        video: "https://www.youtube.com/embed/A1A1A1A1",
        ingredients: ["تفاح", "دقيق", "زبدة", "سكر", "قرفة", "عجينة باف باستري", "ليمون", "نشا"],
        quantities: [
            "4 تفاحات (مقشر ومقطع مكعبات)",
            "2 شريحة عجينة باف باستري (أو تارت)",
            "2 ملعقة كبيرة نصف كوب سكر بني (25 جرام)",
            "1 ملعقة قرفة مطحونة",
            "2 ملعقة زبدة",
            "1 ملعقة عصير ليمون",
            "1 ملعقة نشا (اختياري)",
            "بيضة للوجه"
        ],
        steps: [
            "🍎 الحشوة: في قدر على نار متوسطة، ذوّب الزبدة. أضف التفاح + السكر + القرفة + عصير الليمون",
            "🔥 الطبخ: قلّب لمدة 8-10 دقائق حتى يلين التفاح ويخرج صوص كراميل سميك. أضف النشا وقلّب دقيقة. اتركه يبرد تماماً",
            "🥟 العجينة: افرد طبقة من العجينة في صينية تارت. اصنع ثقوباً بالشوكة في القاع",
            "🥄 الحشو: صب خليط التفاح البارد فوق العجينة ووزّعه بالتساوي",
            "🎨 التغطية: غطِّ بطبقة عجينة أخرى. اصنع شقوقاً في الوجه لخروج البخار. ادهن الوجه ببيضة مخفوقة",
            "🌡️ الخبز: سخّن الفرن على 200°C. اخبز 20-25 دقيقة حتى يصبح الوجه ذهبياً ومقرمشاً",
            "🍽️ التقديم: قدّمها دافئة مع كرة آيس كريم فانيليا ورشة قرفة"
        ]
    },
    {
        id: 120,
        name: "بسبوسة بالقشطة",
        type: "dessert",
        calories: 1200,
        protein: "25g",
        video: "https://www.youtube.com/embed/X20",
        ingredients: ["سميد", "زبادي", "سمن", "سكر", "جوز هند", "قشطة", "بيكنج بودر", "لوز"],
        quantities: [
            "2 كوب (480 مل) سميد ناعم",
            "1 كوب (240 مل) زبادي",
            "1 ملعقة كبيرة نصف كوب سمن مذاب (15 جرام)",
            "2 ملعقة كبيرة نصف كوب سكر (25 جرام)",
            "3 ملعقة كبيرة نصف كوب جوز هند (20 جرام)",
            "1 علبة قشطة (170 جرام)",
            "1 ملعقة بيكنج بودر",
            "لوز للتزيين",
            "شيرة باردة للتشريب"
        ],
        steps: [
            "🥣 الخليط الجاف: اخلط 2 كوب سميد + نصف كوب سكر + جوز هند + بيكنج بودر في وعاء كبير",
            "🧈 السوائل: أضف 1 كوب زبادي + نصف كوب سمن مذاب + القشطة. اخلط جيداً حتى يتجانس",
            "⏳ الراحة: غطِّ الخليط واتركه 30 دقيقة ليتشرب السميد السوائل",
            "🍽️ الصينية: ادهن صينية فرن بالسمن. افرد الخليط وسوِّ السطح",
            "🌰 التزيين: قطّعها معينات أو مربعات. ضع حبة لوز في منتصف كل قطعة",
            "🌡️ الخبز: سخّن الفرن على 180°C. اخبز 30-35 دقيقة حتى يتحمر الوجه ويصبح ذهبياً",
            "🍯 الشيرة: أخرجها وصب الشيرة الباردة فوراً وهي ساخنة (هذا السر!)",
            "🍽️ التقديم: اتركها تتشرب الشيرة 15 دقيقة قبل التقديم. ممكن تقديمها باردة أو دافئة"
        ]
    },
    {
        id: 121,
        name: "كنافة نابلسية بالقشطة",
        type: "dessert",
        calories: 734,
        protein: "11g",
        video: "https://www.youtube.com/embed/X21",
        ingredients: ["كنافة", "قشطة", "سمن", "سكر", "فستق", "ماء ورد", "حليب", "نشا"],
        quantities: [
            "500 جرام عجينة كنافة طازجة",
            "1 كوب (240 مل) سمن حيواني مذاب",
            "شيرة (قطر) باردة",
            "2 ملعقة كبيرة فستق حلبي مطحون (15 جرام)",
            "للقشطة المنزلية: 2 كوب (480 مل) حليب + 3 ملاعق نشا + 1 علبة قشطة + 1 ملعقة ماء ورد"
        ],
        steps: [
            "🥛 القشطة: اخلط الحليب والنشا على البارد. سخّنهم مع التحريك حتى يثقل. أطفئ النار وأضف القشطة وماء الورد. اتركها تبرد قليلاً",
            "🧶 الكنافة: قطّع الكنافة وخفف تشابكها. صب السمن المذاب وافركها جيداً بيدك حتى تتشرب كل شعرة",
            "📦 الطبقة الأولى: ادهن صينية بسمن غزير (للون البرتقالي استخدم صبغة كنافة). رص ثلثي الكنافة واكبسها بقوة بقاع الصينية",
            "🥣 الحشو: صب القشطة الدافئة في الوسط (اترك مسافة 1 سم من الأطراف لكي لا تحترق)",
            "📦 الطبقة الثانية: وزّع باقي الكنافة برفق فوق القشطة. ربت عليها بخفة لتساوي السطح",
            "🌡️ الخبز: سخّن الفرن على 200°C. اخبز 20-30 دقيقة حتى تتحمر الأطراف وتفصل عن الصينية",
            "✨ القلب: اقلب الكنافة فوراً في صحن التقديم. صب الشيرة الباردة فوراً وهي ساخنة",
            "🍽️ التقديم: زيّنها بالفستق الحلبي. قدّمها ساخنة وتمتع بالقرمشة والقشطة الذائبة"
        ]
    },
    {
        id: 122,
        name: "كيكة شوكولاتة غنية",
        type: "dessert",
        calories: 737,
        protein: "23g",
        video: "https://www.youtube.com/embed/X22",
        ingredients: ["دقيق", "كاكاو", "سكر", "بيض", "زيت", "حليب", "فانيليا", "بيكنج بودر", "قهوة"],
        quantities: [
            "1.5 كوب دقيق (180 جرام)",
            "1 ملعقة كبيرة نصف كوب كاكاو بودرة خام (7 جرام)",
            "1 كوب سكر (200 جرام)",
            "3 بيضات",
            "2 ملعقة كبيرة نصف كوب زيت (30 مل)",
            "1 كوب (240 مل) حليب",
            "1 ملعقة نسكافيه (تعزز طعم الشوكولاتة)",
            "1 ملعقة بيكنج بودر",
            "فانيليا و¼ ملعقة صغيرة ملح (1.25 مل)"
        ],
        steps: [
            "🥚 البيض: اخفق البيض + السكر + الفانيليا 5 دقائق حتى يتضاعف الحجم ويصبح فاتحاً",
            "🥛 السوائل: أضف الزيت + الحليب + النسكافيه. اخفق دقيقة واحدة",
            "🍫 الجافة: انخل الدقيق + الكاكاو + البيكنج بودر + الملح. أضفهم للخليط وقلّب بملعقة خشبية ببطء",
            "🌡️ الخبز: صبّ الخليط في قالب مدهون. اخبز في فرن محمى 180°C لمدة 35-40 دقيقة (اختبر بعود خشب)",
            "🍫 الصوص (اختياري): ذوب نصف كوب شوكولاتة مع ربع كوب قشطة. صبّه على الكيك بعد أن يبرد تماماً",
            "🍽️ التقديم: قدّمها مع فواكه حمراء (فراولة/توت) لكسر حلاوة الشوكولاتة"
        ]
    },
    {
        id: 123,
        name: "سينابون (رولز القرفة)",
        type: "dessert",
        calories: 612,
        protein: "55g",
        video: "https://www.youtube.com/embed/X23",
        ingredients: ["دقيق", "حليب", "خميرة", "قرفة", "سكر بني", "زبدة", "جبن كريمي", "حليب مكثف", "بيكان"],
        quantities: [
            "العجينة: 4 كوب دقيق (480 جرام) + 1 كوب (240 مل) حليب دافئ + ملعقة خميرة + ربع كوب سكر + بيضتين + نصف كوب زبدة",
            "الحشوة: نصف كوب زبدة لينة + 1 كوب سكر (200 جرام) بني + 3 ملاعق قرفة",
            "الصوص الأبيض: 200 جرام جبن كريمي + نصف علبة حليب مكثف + فانيليا",
            "للتزيين: بيكان (جوز أمريكي) وصلصة كراميل"
        ],
        steps: [
            "🍞 العجينة: اخلط الحليب الدافئ + الخميرة + السكر واتركها تفور 5 دقائق. أضف البيض والزبدة والدقيق واعجن 10 دقائق حتى تصبح ناعمة. خمّرها ساعة",
            "🧈 الفرد: افرد العجينة لمستطيل كبير. ادهنه بالزبدة اللينة ورش خليط السكر والقرفة سخياً",
            "🌀 اللف: لف العجينة رول بضغط خفيف. قطّعها بالخيط (وليس السكين) لقطع متساوية للحفاظ على الشكل",
            "⏳ التخمير الثاني: رص الرولات في صينية مدهونة (اترك مسافات). غطّها واتركها تتخمر 30 دقيقة حتى تتلاصق",
            "🌡️ الخبز: اخبز في فرن 180°C لمدة 20-25 دقيقة حتى تصبح ذهبية. لا تفرط في الخبز لتبقى طرية",
            "🥛 الصوص: اخلط الجبن والحليب المكثف. صب نصفه على السينابون وهو ساخن ليتشربه. والباقي عند التقديم",
            "🍽️ التقديم: زيّنه بالبيكان والكرامل. قدّمه دافئاً"
        ]
    },
    {
        id: 124,
        name: "كريب فرنسي",
        type: "dessert",
        calories: 205,
        protein: "9g",
        video: "https://www.youtube.com/embed/X24",
        ingredients: ["دقيق", "حليب", "بيض", "زبدة", "سكر", "فانيليا", "نوتيلا", "فراولة", "موز"],
        quantities: [
            "1 كوب دقيق (120 جرام) منخول",
            "1.5 كوب (360 مل) حليب سائل",
            "2 بيضة كبيرة",
            "2 ملعقة زبدة ذائبة",
            "1 ملعقة كبيرة (15 مل) سكر",
            "1 ملعقة صغيرة (5 مل) فانيليا",
            "نوتيلا وفواكه للحشو"
        ],
        steps: [
            "🥣 الخليط: اخفق البيض + السكر + الفانيليا. أضف الحليب والزبدة. أضف الدقيق تدريجياً واخفق حتى يصبح ناعماً جداً وبدون كتل",
            "⏳ الراحة: صفِّ الخليط بمصفاة (مهم جداً). اتركه يرتاح 15 دقيقة في الثلاجة",
            "🍳 الطبخ: سخّن مقلاة غير لاصقة وامسحها بنقطة زيت. صبّ مقدار مغرفة وحرّك المقلاة دائرياً لتغطية القاع بطبقة رقيقة جداً",
            "🔥 القلب: اطبخ دقيقة حتى تجف الحواف وتتحمر من الأسفل. اقلبها واطبخ 30 ثانية أخرى",
            "🍫 الحشو: ادهن نصف الكريب بالنوتيلا. أضف قطع الفراولة والموز. اطوها مثلث أو رول",
            "🍽️ التقديم: زيّنها بخطوط شوكولاتة ورشة سكر بودرة"
        ]
    },
    {
        id: 125,
        name: "لقيمات مقرمشة",
        type: "dessert",
        calories: 323,
        protein: "11g",
        video: "https://www.youtube.com/embed/X25",
        ingredients: ["دقيق", "نشا", "خميرة", "زبادي", "زيت", "حليب بودرة", "هيل", "زعفران", "دبس"],
        quantities: [
            "2 كوب دقيق (240 جرام)",
            "2 ملعقة كبيرة (30 مل) نشا (سر القرمشة)",
            "1 ملعقة صغيرة (5 مل) خميرة فورية",
            "2 ملعقة حليب بودرة",
            "1 علبة زبادي (بحرارة الغرفة)",
            "1 كوب (240 مل) ماء دافئ (حسب الحاجة)",
            "¼ ملعقة صغيرة ملح (1.25 مل)",
            "دبس تمر أو عسل للتقديم"
        ],
        steps: [
            "🥣 العجن: اخلط جميع المكونات الجافة. أضف الزبادي والماء تدريجياً واعجن باليد (الضرب) حتى تتكون عجينة مطاطية لزجة (أثقل من الكيك قليلاً)",
            "⏳ التخمير: غطّها واتركها في مكان دافئ ساعة كاملة حتى يتضاعف حجمها وتظهر فقاعات",
            "🔥 الزيت: سخّن زيت غزير على حرارة متوسطة (ليس حاراً جداً حتى لا تتحمر بسرعة وتبقى عجينة من الداخل)",
            "🥄 التلقيم: بلل يدك أو الملعقة بالزيت. خذ قطعة عجين واضغطها لتخرج كرة صغيرة، اسقطها في الزيت",
            "🔄 التقليب: استمر في تقليب اللقيمات بالزيت بدون توقف (مهم جداً) لتأخذ لوناً موحداً من كل الجهات وتصبح كروية",
            "✅ القرمشة: ارفعها عندما يصبح لونها بني ذهبي غامق. ضعها في مصفاة",
            "🍯 التقديم: صب عليها دبس التمر أو الشيرة وهي ساخنة. رش عليها سمسم أو فستق"
        ]
    },
    {
        id: 130,
        name: "وافل بلجيكي",
        type: "dessert",
        calories: 729,
        protein: "13g",
        video: "https://www.youtube.com/embed/X50",
        ingredients: ["دقيق", "بيض", "حليب", "زبدة", "سكر", "بيكنج بودر", "فانيليا", "نشا"],
        quantities: [
            "2 كوب دقيق (240 جرام)",
            "2 بيضة (افصل الصفار عن البياض)",
            "1.5 كوب (360 مل) حليب دافئ",
            "1 ملعقة كبيرة نصف كوب زبدة ذائبة (15 جرام)",
            "4 ملاعق سكر",
            "2 ملعقة صغيرة (10 مل) بيكنج بودر",
            "1 ملعقة نشا (للقرمشة)",
            "فانيليا و¼ ملعقة صغيرة ملح (1.25 مل)"
        ],
        steps: [
            "🥣 الجافة: اخلط الدقيق + النشا + البيكنج بودر + الملح في وعاء كبير",
            "🍳 الصفار: اخلط صفار البيض + الحليب + الزبدة + الفانيليا. أضفهم للمكونات الجافة واخلط جيداً",
            "☁️ البياض (السر): اخفق بياض البيض مع السكر حتى يصبح مارينج (رغوة بيضاء كثيفة ومتماسكة)",
            "🔄 الدمج: أضف البياض للخليط تدريجياً وقلّب بملعقة من تحت لفوق (لا تكسر الهواء!) ليبقى الوافل هشاً",
            "🌡️ الخبز: سخّن جهاز الوافل وادهنه بالزيت. صب الخليط واخبز 4-6 دقائق حتى يصبح ذهبياً ومقرمشاً",
            "🍽️ التقديم: قدّمه مع شراب القيقب (Maple Syrup) أو النوتيلا والفواكه"
        ]
    },
    {
        id: 131,
        name: "دونات هشة",
        type: "dessert",
        calories: 443,
        protein: "11g",
        video: "https://www.youtube.com/embed/X51",
        ingredients: ["دقيق", "خميرة", "حليب", "سكر", "زبدة", "بيض", "زيت", "فانيليا"],
        quantities: [
            "2.5 كوب دقيق (300 جرام) مخبوزات",
            "1 ملعقة كبيرة (15 مل) خميرة فورية",
            "½ كوب حليب دافئ (120 مل)",
            "3 ملاعق سكر",
            "1 بيضة",
            "2 ملاعق زبدة لينة",
            "فانيليا و¼ ملعقة صغيرة ملح (1.25 مل)",
            "2 ملعقة كبيرة زيت نباتي للقلي (30 مل)"
        ],
        steps: [
            "🍞 العجن: اخلط الحليب + الخميرة + السكر واتركها 5 دقائق. أضف البيضة والزبدة والدقيق. اعجن 10 دقائق حتى تصبح ناعمة ولينة",
            "⏳ التخمير الأول: ادهن وعاء بالزيت. ضع العجينة وغطها ساعة في مكان دافئ حتى يتضاعف حجمها",
            "🥯 التشكيل: افرد العجينة بسمك 1 سم. قطّعها بقطاعة الدونات. رصها في صينية على ورق زبدة (مهم جداً للنقل)",
            "⏳ التخمير الثاني: غطها واتركها ترتاح 30 دقيقة (سر الخط الأبيض في المنتصف)",
            "🔥 القلي: سخّن زيت غزير على 170°C (حرارة متوسطة). اقلها دقيقة لكل جانب حتى تصبح ذهبية. لا تزدحم المقلاة",
            "🍩 التزيين: اغمسه في سكر وقرفة وهو ساخن، أو شوكولاتة ذائبة بعد أن يبرد"
        ]
    },
    {
        id: 132,
        name: "أصابع البقلاوة",
        type: "dessert",
        calories: 1081,
        protein: "37g",
        video: "https://www.youtube.com/embed/X52",
        ingredients: ["عجينة جلاش", "فستق", "سمن", "شيرة", "ماء ورد"],
        quantities: [
            "1 باكيت عجينة جلاش (فيلو)",
            "1 كوب (240 مل) سمن حيواني مذاب",
            "2 كوب (480 مل) فستق حلبي مطحون",
            "شيرة (قطر) باردة وثقيلة (2 كوب سكر (400 جرام) : 1 كوب (240 مل) ماء)",
            "عود خشب رفيع لللف"
        ],
        steps: [
            "🧈 التجهيز: افرد ورقة جلاش وادهنها بالسمن. ضع ورقة أخرى فوقها وادهنها",
            "🥜 الحشو: رش الفستق على الوجه. ضع العود الخشبي على الطرف ولف العجينة حوله رول",
            "🤏 الكشكشة: اضغط طرفي الرول للداخل ليتكشكش. اسحبه من العود برفق وضعه في صينية مدهونة",
            "✂️ التقطيع: كرر العملية حتى تمتلئ الصينية. قطّع الأصابع للحجم المرغوب. صب باقي السمن فوقها",
            "🌡️ الخبز: سخّن الفرن على 180°C. اخبز 20-25 دقيقة حتى تصبح ذهبية ومقرمشة",
            "🍯 الشيرة: صب الشيرة الباردة فور خروجها من الفرن. (صوت التشطشطة دليل النجاح!). زيّنها بالفستق"
        ]
    },

    // --- DRINKS (مشروبات) ---
    {
        id: 201,
        name: "عصير برتقال طازج",
        type: "drink",
        calories: 88,
        protein: "2g",
        video: "https://www.youtube.com/embed/O2O2O2O2",
        ingredients: ["برتقال", "سكر", "ماء", "ثلج", "ليمون"],
        quantities: [
            "4 حبات برتقال عصير (كبيرة)",
            "1 ملعقة عصير ليمون (لحفظ اللون)",
            "2 ملعقة كبيرة سكر أو عسل حسب الرغبة (25 جرام)",
            "مكعبات ثلج",
            "1 كوب ربع كوب ماء بارد (اختياري) (240 مل)"
        ],
        steps: [
            "🍊 التجهيز: اغسل البرتقال جيداً وقطعه أنصاف. (للحصول على كمية عصير أكبر، دحرج البرتقالة بيدك على الطاولة قبل القطع)",
            "🥣 العصر: اعصر البرتقال باستخدام عصارة يدوية أو كهربائية. لا تفرط في العصر حتى لا تنزل القشرة البيضاء المرة",
            "❄️ التبريد: صفِّ العصير إذا كنت لا تفضل الحبيبات (اللب). أضف السكر وعصير الليمون وقلّب جيداً حتى يذوب",
            "🧊 التقديم: ضع مكعبات الثلج في الكاسات. صب العصير وقدمه بارداً فوراً للحفاظ على فيتامين C"
        ]
    },
    {
        id: 202,
        name: "سموثي فراولة كريمي",
        type: "drink",
        calories: 137,
        protein: "9g",
        video: "https://www.youtube.com/embed/S1S1S1S1",
        ingredients: ["فراولة", "حليب", "زبادي", "عسل", "ثلج", "موز"],
        quantities: [
            "2 كوب (480 مل) فراولة مجمدة (أفضل للقوام)",
            "1 كوب (240 مل) حليب بارد",
            "½ كوب زبادي يوناني أو عادي (120 مل)",
            "1 موزة ناضجة (اختياري للحلاوة والقوام)",
            "2 ملعقة عسل للتحلية"
        ],
        steps: [
            "🍓 التجهيز: اغسل الفراولة وجمّدها قبل الاستخدام للحصول على قوام سميك مثل الآيس كريم",
            "🥣 الخلط: ضع السوائل أولاً (الحليب والزبادي) في الخلاط لحماية الشفرات. أضف الفراولة المجمدة والموز والعسل",
            "🔄 المزج: اخلط على سرعة منخفضة ثم زد السرعة تدريجياً. استمر دقيقة كاملة حتى يختفي أي كتل ثلجية ويصبح الخليط ناعماً وكريمياً",
            "🍹 التقديم: صبه في أكواب طويلة. زيّنه بقطعة فراولة طازجة وقدمه فوراً"
        ]
    },
    {
        id: 203,
        name: "ليمون نعناع منعش",
        type: "drink",
        calories: 960,
        protein: "2g",
        video: "https://www.youtube.com/embed/L1L1L1L1",
        ingredients: ["ليمون", "نعناع", "سكر", "ماء", "ثلج", "حليب"],
        quantities: [
            "4 حبات ليمون (مقشر ومزال البذور)",
            "1 ملعقة كبيرة حزمة نعناع طازج (أوراق فقط) (4 جرام)",
            "4 كوب (960 مل) ماء بارد جداً",
            "2 ملعقة كبيرة نصف كوب سكر (عدّل حسب ذوقك) (25 جرام)",
            "2 ملعقة حليب سائل (السر لعدم المرارة ولون أبيض)",
            "مكعبات ثلج"
        ],
        steps: [
            "🍋 التحضير: قشّر الليمون وتأكد من إزالة الطبقة البيضاء والبذور تماماً لأنها سبب المرارة",
            "🌪️ الخلط 1: ضع الليمون + الماء + السكر + الحليب في الخلاط. اخلط بقوة لمدة دقيقة حتى يصبح رغوي وأبيض",
            "🍃 الخلط 2: أضف أوراق النعناع الآن. اخلط لمدة 5 ثوانٍ فقط (نبضات) ليبقى النعناع قطع صغيرة ولا يسود العصير",
            "🧊 التصفية: صفِّ العصير بمصفاة ناعمة في إبريق به ثلج كثير",
            "🍹 التقديم: زيّنه بشريحة ليمون وورقة نعناع. يُشرب فوراً خلال 15 دقيقة قبل أن يتغير طعمه"
        ]
    },
    {
        id: 204,
        name: "ميلك شيك موز بالكراميل",
        type: "drink",
        calories: 407,
        protein: "7g",
        video: "https://www.youtube.com/embed/B2B2B2B2",
        ingredients: ["موز", "حليب", "آيس كريم", "كراميل", "بسكويت", "ثلج"],
        quantities: [
            "2 موزة ناضجة (يفضل مجمدة)",
            "1 كوب (240 مل) حليب بارد كامل الدسم",
            "2 كرة آيس كريم فانيليا",
            "2 ملعقة صوص كراميل",
            "3 حبات بسكويت (اختياري للقرمشة)",
            "مكعبات ثلج"
        ],
        steps: [
            "🍌 التجميد: قطّع الموز وجمّده لمدة ساعتين على الأقل (هذا يعطي قوام كثيف بدون ثلج كثير)",
            "🥣 الخلط: ضع الموز المجمد + الحليب + الآيس كريم + البسكويت في الخلاط. اخلط حتى يصبح ناعماً",
            "🍯 الكراميل: زيّن جدران الكوب بصوص الكراميل من الداخل",
            "🥛 التقديم: صب الميلك شيك في الكوب. زيّنه بالكريمة المخفوقة وفتات البسكويت وخطوط كراميل إضافية"
        ]
    },
    {
        id: 205,
        name: "عصير مانجو ملكي",
        type: "drink",
        calories: 50,
        protein: "1g",
        video: "https://www.youtube.com/embed/M1M1M1M1",
        ingredients: ["مانجو", "ماء", "سكر", "ثلج", "ماء ورد"],
        quantities: [
            "2 حبة مانجو كبيرة (ناضجة وحلوة)",
            "1 كوب (240 مل) ماء بارد (أو حليب لجعله عوار قلب)",
            "2 ملعقة سكر (حسب حلاوة المانجو)",
            "1 كوب (240 مل) مكعبات ثلج",
            "1 كوب نقطة ماء ورد (سر النكهة) (240 مل)"
        ],
        steps: [
            "🥭 التقشير: قشّر المانجو وقطّع اللب مكعبات. (نصيحة: المانجو المصري أو الهندي هو الأفضل للعصير)",
            "🥣 الخلط: ضع المانجو + الماء + السكر + الثلج في الخلاط. ابدأ بسرعة بطيئة ثم زد السرعة",
            "🥤 القوام: استمر في الخلط حتى يختفي الثلج تماماً ويصبح القوام ثقيلاً ولامعاً. (أضف المزيد من الماء إذا كان ثقيلاً جداً)",
            "✅ الإضافة السرية: أضف نقطة ماء ورد في النهاية واخلط ثانية واحدة",
            "🍹 التقديم: صبّه في كاسات وزيّنه بقطع مانجو صغيرة على الوجه"
        ]
    },
    {
        id: 206,
        name: "آيس كوفي (سبانيش لاتيه)",
        type: "drink",
        calories: 50,
        protein: "3g",
        video: "https://www.youtube.com/embed/C1C1C1C1",
        ingredients: ["قهوة", "حليب", "حليب مكثف", "ثلج", "ماء"],
        quantities: [
            "2 شوت اسبريسو (أو 2 ملعقة نسكافيه مذابة في ربع كوب ماء ساخن)",
            "½ كوب حليب بارد (120 مل)",
            "2 ملعقة كبيرة (30 مل) حليب مكثف محلى",
            "كوب كامل مكعبات ثلج"
        ],
        steps: [
            "☕ القهوة: حضّر الاسبريسو أو النسكافيه المركز واتركه يبرد قليلاً",
            "🥛 الحلاوة: في قاع الكوب، ضع الحليب المكثف المحلى",
            "🧊 الأساس: املأ الكوب بالثلج حتى الأعلى",
            "🥛 الحليب: صب الحليب البارد فوق الثلج (اترك مسافة للقهوة)",
            "✨ الطبقات: صب القهوة ببطء شديد فوق مكعبات الثلج (وليس في الحليب مباشرة) لعمل طبقة منفصلة جميلة",
            "✅ التقديم: قدمه مع شفاطة (مصاص). حركه قبل الشرب لتتجانس النكهات"
        ]
    },
    {
        id: 207,
        name: "شاي كرك أصلي",
        type: "drink",
        calories: 466,
        protein: "17g",
        video: "https://www.youtube.com/embed/X30",
        ingredients: ["شاي", "حليب مبخر", "هيل", "زعفران", "سكر", "زنجبيل", "قرفة", "ماء"],
        quantities: [
            "2 ملعقة كبيرة (30 مل) شاي أسود (فرط أو أكياس)",
            "1 علبة حليب مبخر (بوني/لونا) - 170 جم",
            "3 أكواب ماء",
            "4 حبات هيل مفتوحة",
            "قطعة زنجبيل طازج (2 سم)",
            "½ ملعقة صغيرة عود قرفة صغير (2.5 مل)",
            "¼ ملعقة صغيرة رشة زعفران (اختياري للون والنكهة) منقوع في 2 ملعقة كبيرة ماء دافئ",
            "3 ملاعق سكر (عدّل حسب ذوقك)"
        ],
        steps: [
            "🔥 الغليان: ضع الماء + السكر + الهيل + الزنجبيل + القرفة في إبريق. اتركها تغلي 5 دقائق لتخرج نكهة البهارات",
            "🍃 الشاي: أضف الشاي الأسود. اغلِه لمدة 2-3 دقائق حتى يصبح لونه غامقاً",
            "🥛 الحليب: خفف النار. أضف علبة الحليب المبخر كاملة. (سترى اللون يتحول للبني الكراميلي الجميل)",
            "⏳ التسبّيك: اترك الكرك يغلي على نار هادئة جداً لمدة 10-15 دقيقة (هذا سر الطعم الثقيل والمركز)",
            "☕ التقديم: صفِّ الكرك في دلة أو كاسات. استمتع برائحة الهيل والزنجبيل!"
        ]
    },
    {
        id: 208,
        name: "قهوة عربية سعودية",
        type: "drink",
        calories: 1200,
        protein: "55g",
        video: "https://www.youtube.com/embed/X31",
        ingredients: ["قهوة سعودية", "هيل", "زعفران", "قرنفل", "ماء", "مبيض (اختياري)"],
        quantities: [
            "4 ملاعق كبيرة (60 مل) بن سعودي (حمصة شقراء)",
            "1.2 لتر ماء",
            "3 ملاعق كبيرة (45 مل) هيل مطحون خشن (طازج)",
            "¼ ملعقة صغيرة نصف ملعقة صغيرة خيوط زعفران منقوع في 2 ملعقة كبيرة ماء دافئ",
            "3 حبات قرنفل (مسمار)",
            "رشة مستكة (اختياري)"
        ],
        steps: [
            "🔥 الغليان: اغلي الماء في الدلة. أضف البن واتركه يطبخ على نار هادئة لمدة 15-20 دقيقة (مهم لاستخلاص النكهة)",
            "⏳ الركد: أطفئ النار واترك القهوة تركد دقيقة (لينزل البن في القاع)",
            "🍃 البهارات: في دلة التقديم، ضع الهيل والزعفران والقرنفل",
            "☕ الصب: صب القهوة المغلية في دلة التقديم فوق الهيل (لا تغلِ الهيل مع القهوة لكي لا يصبح الطعم مراً)",
            "✅ التقديم: أغلق الدلة واتركها 5 دقائق تتشرب نكهة الهيل. قدمها مع التمر السكري"
        ]
    },
    {
        id: 209,
        name: "سموثي أفوكادو بالعسل",
        type: "drink",
        calories: 188,
        protein: "6g",
        video: "https://www.youtube.com/embed/X32",
        ingredients: ["أفوكادو", "حليب", "عسل", "مكسرات", "ثلج", "آيس كريم"],
        quantities: [
            "1 حبة أفوكادو ناضجة (لينة)",
            "1.5 كوب (360 مل) حليب بارد",
            "3 ملاعق كبيرة (45 مل) عسل",
            "1 كرة آيس كريم فانيليا (اختياري للقوام)",
            "مكسرات (لوز/فستق) للتزيين",
            "مكعبات ثلج"
        ],
        steps: [
            "🥑 التجهيز: قطّع الأفوكادو وأخرج اللب. (تأكد أنها ناضجة لضمان القوام الكريمي وعدم المرارة)",
            "🥣 الخلط: ضع الأفوكادو + الحليب + العسل + الآيس كريم + الثلج في الخلاط",
            "🔄 القوام: اخلط جيداً حتى يصبح ناعماً جداً وكثيفاً. تذوق الحلاوة وأضف عسل عدّل حسب ذوقك",
            "🥜 التقديم: صبّه في كأس وزيّن الوجه بالمكسرات والعسل. مشروب طاقة طبيعي!"
        ]
    },
    {
        id: 210,
        name: "مشروب كركديه بارد",
        type: "drink",
        calories: 968,
        protein: "1g",
        video: "https://www.youtube.com/embed/X33",
        ingredients: ["كركديه", "سكر", "ماء", "ثلج"],
        quantities: [
            "1 كوب (240 مل) أوراق كركديه",
            "1 لتر ماء",
            "2 ملعقة كبيرة سكر حسب الرغبة (25 جرام)",
            "ثلج"
        ],
        steps: [
            "انقع الكركديه في الماء البارد لمدة 4 ساعات (أو اغليه وبرده).",
            "صفّه وحليه بالسكر.",
            "قدمه بارداً جداً."
        ]
    },
    {
        id: 211,
        name: "سعودي شامبين",
        type: "drink",
        calories: 50,
        protein: "1g",
        video: "https://www.youtube.com/embed/X34",
        ingredients: ["تفاح", "برتقال", "نعناع", "مشروب غازي", "توت", "ليمون"],
        quantities: [
            "عصير تفاح (راوخ)",
            "1 كوب مشروب غازي (سفن أب/ماء غازي) (240 مل)",
            "قطع تفاح وبرتقال وليمون",
            "1 ملعقة كبيرة أوراق نعناع (4 جرام)"
        ],
        steps: [
            "اخلط العصير مع السفن أب.",
            "أضف قطع الفواكه والنعناع والثلج.",
            "قدمه فوراً."
        ]
    },
    {
        id: 212,
        name: "هوت شوكليت إيطالي",
        type: "drink",
        calories: 763,
        protein: "11g",
        video: "https://www.youtube.com/embed/X35",
        ingredients: ["حليب", "شوكولاتة داكنة", "كاكاو", "نشا", "كريمة", "مارشميلو"],
        quantities: [
            "2 كوب (480 مل) حليب كامل الدسم",
            "½ كوب قطع شوكولاتة داكنة (60% فما فوق) (120 مل)",
            "1 ملعقة طعام كاكاو بودرة مر",
            "1 ملعقة صغيرة (5 مل) نشا (سر القوام الثقيل)",
            "2 ملعقة كبيرة سكر حسب الرغبة (25 جرام)",
            "كريمة مخفوقة ومارشميلو للتزيين"
        ],
        steps: [
            "🍫 الأساس: في قدر بارد، ذوب النشا والكاكاو في نصف كوب حليب حتى تختفي التكتلات",
            "🔥 التسخين: أضف باقي الحليب والسكر. سخّن على نار متوسطة مع التحريك المستمر",
            "✨ الشوكولاتة: قبل الغليان، خفف النار وأضف قطع الشوكولاتة. حرك ببطء حتى تذوب تماماً ويصبح الخليط ثقيلاً ولامعاً",
            "☕ التقديم: صبّه في أكواب. زيّنه بكومة من الكريمة المخفوقة وقطع المارشميلو ورشة كاكاو"
        ]
    },
    {
        id: 213,
        name: "حليب بالزنجبيل",
        type: "drink",
        calories: 98,
        protein: "4g",
        video: "https://www.youtube.com/embed/X36",
        ingredients: ["حليب", "زنجبيل", "عسل"],
        quantities: [
            "2 كوب (480 مل) حليب",
            "ملعقة زنجبيل مبشور طازج (أو بودرة)",
            "1 ملعقة كبيرة عسل للتحلية (21 جرام)"
        ],
        steps: [
            "اغلي الحليب مع الزنجبيل.",
            "صفّه وحليه بالعسل.",
            "ممتاز للشتاء!"
        ]
    },
    {
        id: 220,
        name: "فيمتو بارد",
        type: "drink",
        calories: 50,
        protein: "1g",
        video: "https://www.youtube.com/embed/X60",
        ingredients: ["فيمتو", "ماء", "سكر", "ثلج"],
        quantities: [
            "1/4 كوب (60 مل) مركز فيمتو",
            "3/4 كوب (960 مل) ماء بارد",
            "2 ملعقة كبيرة سكر حسب الرغبة (25 جرام)",
            "ثلج"
        ],
        steps: [
            "اخلط الفيمتو مع الماء والسكر.",
            "قدمه مع الثلج."
        ]
    },

    {
        id: 221,
        name: "موخيتو كلاسيك (ميكس بيري)",
        type: "drink",
        calories: 50,
        protein: "1g",
        video: "https://www.youtube.com/embed/X61",
        ingredients: ["سفن أب", "ليمون", "نعناع", "توت مشكل", "فراولة", "ثلج مجروش", "سيروب"],
        quantities: [
            "علبة سفن أب (أو مياه غازية)",
            "½ كوب توت مشكل وفراولة (مجمدة أو طازجة) (120 مل)",
            "شرائح ليمون رفيعة",
            "10 أوراق نعناع طازجة",
            "ثلج مجروش (لشكل احترافي)",
            "2 ملعقة سيروب توت (نكهة مركزة)"
        ],
        steps: [
            "🔨 الهرس: في قاع الكوب، ضع النعناع وشريحة ليمون وحبتين توت. اهرسهم برفق بالمدقة (Muddler) لاستخراج النكهة والزيوت العطرية",
            "🧊 الثلج: املأ الكوب بالكامل بالثلج المجروش",
            "🥤 السوائل: أضف سيروب التوت، ثم صب السفن أب ببطء",
            "✨ التزيين: زيّن الوجه بالمزيد من التوت والنعناع وشريحة ليمون. قدمه مع مصاص عريض"
        ]
    },
    {
        id: 222,
        name: "قهوة تركية بالوجه (الوش)",
        type: "drink",
        calories: 50,
        protein: "1g",
        video: "https://www.youtube.com/embed/X62",
        ingredients: ["قهوة تركية", "سكر", "ماء بارد", "هيل"],
        quantities: [
            "2 ملعقة صغيرة (10 مل) مملوءة بن تركي (فاتح أو غامق)",
            "1 فنجان ماء بارد (من الثلاجة - سر الوش)",
            "2 ملعقة كبيرة سكر حسب الرغبة (سادة/وسط/زيادة) (25 جرام)",
            "3 حبات رشة هيل (اختياري)"
        ],
        steps: [
            "🥣 التحريك: ضع الماء البارد + السكر + القهوة في الركوة (الكنكة). حركهم جيداً على البارد حتى تذوب القهوة تماماً",
            "🔥 النار: ضعها على نار هادئة جداً (شمعه). لا تحركها أبداً أثناء التسخين",
            "✨ الوش: راقبها بدقة. عندما تبدأ الرغوة (الوش) بالارتفاع من الجوانب، ارفعها فوراً عن النار",
            "☕ الصب: صب نصف الكمية (الوش) في الفنجان ببطء. أعد القهوة للنار ثواني لتغلي ثم صب الباقي"
        ]
    },
    {
        id: 223,
        name: "عصير ليمون بالنعناع",
        type: "drink",
        calories: 72,
        protein: "1g",
        video: "https://www.youtube.com/embed/X63",
        ingredients: ["ليمون", "نعناع", "ماء", "سكر", "ثلج"],
        quantities: [
            "4 ليمونات مقشرة",
            "1 ملعقة كبيرة أوراق نعناع طازجة (4 جرام)",
            "1 لتر ماء بارد",
            "2 ملعقة كبيرة سكر حسب الرغبة (25 جرام)",
            "مكعبات ثلج"
        ],
        steps: [
            "اخلط جميع المكونات في الخلاط.",
            "صفّه جيداً وقدمه بارداً."
        ]
    },
    // --- BREAKFAST SPECIALS ---
    {
        id: 301,
        name: "شكشوكة عدنية",
        type: "main",
        category: "breakfast",
        calories: 115,
        protein: "7g",
        ingredients: ["بيض", "طماطم", "بصل", "فلفل حار", "زيت", "كمون", "معجون طماطم"],
        quantities: [
            "3 بيضات كبيرة",
            "2 طماطم مفرومة ناعم",
            "1 بصلة صغيرة مفرومة",
            "1 قرن فلفل أخضر حار",
            "1 ملعقة معجون طماطم",
            "2 ملعقة كبيرة مفرومة زيت، ملح، كمون، كزبرة (8 جرام)"
        ],
        steps: [
            "🔥 الحمس: شوّح البصل والفلفل في الزيت حتى يذبل",
            "🍅 التسبّيك: أضف الطماطم + معجون الطماطم + البهارات. غطها واتركها تتسبك 5 دقائق حتى تذبل الطماطم تماماً",
            "🍳 البيض: أضف البيض وقلّب بسرعة حتى يمتزج مع الكشنة وينضج",
            "🍽️ التقديم: قدمها ساخنة مع خبز تميس أو خبز صامولي وجبنة سائلة"
        ]
    },
    {
        id: 302,
        name: "شوفان صحي بالحليب",
        type: "breakfast",
        calories: 117,
        protein: "6g",
        ingredients: ["شوفان", "حليب", "موز", "عسل", "قرفة", "مكسرات", "زبدة فول سوداني"],
        quantities: [
            "½ كوب شوفان (كامل الحبة) (120 مل)",
            "1 كوب (240 مل) حليب (أو حليب نباتي)",
            "1 موزة مقطعة",
            "1 ملعقة عسل",
            "½ ملعقة صغيرة رشة قرفة (2.5 مل)",
            "1 ملعقة زبدة فول سوداني (اختياري)"
        ],
        steps: [
            "🥣 الطبخ: ضع الشوفان والحليب والقرفة في قدر. اطبخ على نار هادئة 5-7 دقائق حتى يثقل القوام",
            "🥣 القوام: أضف المزيد من الحليب إذا كنت تفضله خفيفاً",
            "✨ التجهيز: اسكبه في وعاء. أضف زبدة الفول السوداني وقلبها لتذوب",
            "🍌 التزيين: رص قطع الموز والمكسرات على الوجه. صب العسل وقدمه دافئاً ومشبعاً"
        ]
    },
    {
        id: 303,
        name: "بيض مسلوق (درجات استواء)",
        type: "breakfast",
        calories: 144.0,
        protein: "6g",
        category: "healthy",
        ingredients: ["بيض", "ماء", "ملح", "فلفل", "خل"],
        quantities: [
            "2 بيضة كبيرة (بحرارة الغرفة)",
            "1 كوب ماء مغلي (240 مل)",
            "1 ملعقة كبيرة ملعقة خل (لسهولة التقشير) (15 مل)",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)"
        ],
        steps: [
            "🌡️ الماء: اغلي الماء في قدر. أضف ملعقة خل (يمنع التشقق). خفف النار قليلاً",
            "🥚 السلق: ضع البيض برفق بالملعقة. احسب الوقت بدقة:",
            "⏱️ (6 دقائق) = صفار سائل (Soft)",
            "⏱️ (8 دقائق) = صفار كريمي متماسك (Medium)",
            "⏱️ (10-12 دقيقة) = ناضج تماماً (Hard)",
            "❄️ التبريد: انقل البيض فوراً لماء مثلج 3 دقائق (مهم جداً لسهولة التقشير وعدم تحول الصفار للون الأخضر)",
            "🧂 التقديم: قشر وقدم مع ¼ ملعقة صغيرة ملح (1.25 مل) وكمون وفلفل أسود"
        ]
    },
    {
        id: 304,
        name: "فرنش توست صحي (أسمر)",
        type: "breakfast",
        category: "healthy",
        calories: 550,
        protein: "17g",
        ingredients: ["توست أسمر", "بيض", "حليب", "قرفة", "عسل", "فانيليا"],
        quantities: [
            "2 شريحة توست أسمر كامل الحبة (أو بريوش)",
            "1 بيضة مخفوقة",
            "¼ كوب حليب قليل الدسم (60 مل)",
            "½ ملعقة صغيرة ملعقة صغيرة قرفة (2.5 مل)",
            "1 ملعقة صغيرة نقطة فانيليا (5 مل)",
            "عسل وفواكه للتقديم"
        ],
        steps: [
            "🥣 الخليط: اخفق البيضة + الحليب + القرفة + الفانيليا في وعاء واسع",
            "🍞 التغميس: غمس التوست في الخليط 10 ثوانٍ لكل جهة (لا تتركه يذوب)",
            "🔥 الطبخ: سخّن مقلاة غير لاصقة مع مسحة زبدة (أو رذاذ زيت). اطبخ التوست 2-3 دقائق لكل وجه حتى يتحمر",
            "🍯 التقديم: قطّعه مثلثات. صب العسل وزيّن بالفراولة والتوت للمزيد من الألياف"
        ]
    },
    // --- NEW RECIPES ---
    // Popular / شعبي
    {
        id: 401,
        name: "فول مدمس (خلطة خاصة)",
        type: "main",
        category: "popular",
        calories: 587,
        protein: "4g",
        ingredients: ["فول", "طماطم", "ثوم", "ليمون", "زيت زيتون", "كمون", "طحينة"],
        quantities: [
            "1 علبة فول مدمس (أو مطبوخ منزلياً)",
            "1 طماطم مقطعة مكعبات صغيرة",
            "2 فص ثوم مهروس",
            "3 ملعقة كبيرة عصير ليمون (45 مل)",
            "2 ملعقة كبيرة ربع كوب زيت زيتون أصلي (30 مل)",
            "1 ملعقة صغيرة (5 مل) كمون",
            "2 ملعقة طحينة سائلة (اختياري)"
        ],
        steps: [
            "🔥 التسخين: ضع الفول في قدر صغير مع ملعقة من ماء العلبة. سخنه حتى يغلي",
            "🔨 الهرس: اهرس الفول بالشوكة أو الهراسة (نصف هرسة) للقوام المثالي",
            "🥣 التتبيل: في وعاء خارجي (أو في القدر بعد إطفاء النار)، اخلط الثوم + الليمون + الكمون + الطحينة + نصف كمية الزيت",
            "🥗 الخلط: صب التتبيلة على الفول وقلّب جيداً. تذوق الملح",
            "🍽️ التقديم: ضعه في صحن عميق. زيّن الوجه بالطماطم المقطعة وباقي زيت الزيتون ورشة كمون. قدمه مع الخبز الساخن"
        ]
    },
    {
        id: 402,
        name: "فتة حمص شامية",
        type: "main",
        category: "popular",
        calories: 569,
        protein: "34g",
        ingredients: ["حمص", "خبز", "زبادي", "طحينة", "ثوم", "ليمون", "سمن"],
        quantities: [
            "2 كوب (480 مل) حمص مسلوق (ساخن جداً)",
            "2 رغيف خبز عربي مقطع ومحمص/مقلي",
            "1.5 كوب (360 مل) زبادي (روب)",
            "3 ملاعق طحينة (هردة)",
            "2 فص ثوم مهروس",
            "عصير 1 ليمونة",
            "1 ملعقة سمن حيواني (للطشة)",
            "مكسرات (لوز/صنوبر) للتزيين"
        ],
        steps: [
            "🍞 الخبز: قطّع الخبز مربعات وحمصه في الفرن أو اقليه حتى يصبح ذهبياً ومقرمشاً. ضعه في قاع صحن التقديم",
            "🥣 البدوه (الصوص): اخلط الزبادي + الطحينة + الثوم + الليمون + ¼ ملعقة صغيرة ملح (1.25 مل) في وعاء حتى يصبح القوام كريمي",
            "🔥 الحمص: صب نصف كمية الحمص الساخن مع قليل من ماء السلق فوق الخبز ليطرى قليلاً",
            "🌨️ التغطية: وزّع خليط الزبادي (البدوه) ليغطي الطبق بالكامل. أضف باقي الحمص على الوجه",
            "🍳 الطشة (السر): سخّن السمن في مقلاة صغيرة وقلّب فيه المكسرات حتى تتحمر. صب السمن والمكسرات وهي تغلي فوق الفتة (ستسمع صوت التش!)",
            "🍽️ التقديم: زيّن بالبقدونس والبابريكا. قدّمها فوراً قبل أن يصبح الخبز طرياً جداً"
        ]
    },
    {
        id: 403,
        name: "مندي لحم في القدر",
        type: "main",
        category: "popular",
        calories: 1200,
        protein: "55g",
        ingredients: ["لحم غنم", "أرز بسمتي", "بهارات مندي", "بصل", "فحم", "زبدة"],
        quantities: [
            "1 كيلو لحم غنم (بالعظم والدهن)",
            "2 كوب أرز (360 جرام) بسمتي (مغسول ومنقوع 20 دقيقة)",
            "1 بصلة كبيرة مفرومة",
            "½ ملعقة صغيرة بهارات حب (هيل، قرنفل، قرفة) (2.5 مل)",
            "½ ملعقة صغيرة بهارات ناعمة (كركم، صفار زعفران - لون المندي) (2.5 مل)",
            "2 ملعقة كبيرة جمرة مشتعلة وزيت (للتدخين) (30 مل)"
        ],
        steps: [
            "🥩 اللحم: في قدر ضغط، شوّح البصل مع البهارات الحب. أضف اللحم وقلّب حتى يتغير لونه. اغموه بالماء واضغط القدر 45 دقيقة لينضج",
            "🌾 الأرز: صفِّ اللحم واحتفظ بالمرقة. في قدر آخر، شوّح الأرز بالسمن قليلاً. أضف المرقة الساخنة (لكل كوب أرز 1.5 كوب مرقة)",
            "🔥 الطبخ: اتركه يغلي حتى ينشف الماء قليلاً، ثم هدد النار وغطِّ القدر 15 دقيقة",
            "🎨 التلوين: ادهن اللحم بصفار الزعفران وحمّره في الفرن (شواية فقط) 10 دقائق",
            "🚬 التدخين (سر النكهة): ضع اللحم فوق الأرز. ضع فنجان زيت في الوسط، ارمِ فيه الجمرة المشتعلة واكتم القدر 5 دقائق فوراً",
            "🍽️ التقديم: اسكب الأرز وضع اللحم فوقه. زيّن بالمكسرات والزبيب"
        ]
    },
    // Quick / سريعة
    {
        id: 501,
        name: "ساندويش شاورما دجاج",
        type: "main",
        category: "quick",
        calories: 366,
        protein: "44g",
        video: "https://www.youtube.com/embed/example",
        ingredients: ["دجاج", "زبادي", "خل", "ثوم", "بهارات", "خبز", "طماطم", "خيار", "طحينة"],
        quantities: [
            "500 جرام صدور دجاج (شرائح رفيعة)",
            "3 ملاعق زبادي",
            "1 ملعقة خل أبيض",
            "3 فصوص ثوم مهروس",
            "1 ملعقة كبيرة كمون",
            "1 ملعقة كركم",
            "1 ملعقة بابريكا",
            "1 ملعقة صغيرة ملح (5 مل / 6 جرام) + ¼ ملعقة صغيرة فلفل أسود (1.25 مل)",
            "2 شريحة خبز شاورما أو صاج",
            "طماطم شرائح",
            "1 ملعقة كبيرة مخلل خيار (15 مل)",
            "2 ملعقة كبيرة صوص طحينة (30 جرام)"
        ],
        steps: [
            "🥣 التتبيلة: اخلط في وعاء 3 ملاعق زبادي + 1 ملعقة خل + 3 فصوص ثوم مهروس + ملح + فلفل أسود + كمون + كركم + بابريكا",
            "🍗 التتبيل: ضع 500 جرام دجاج مقطع شرائح رفيعة في التتبيلة وقلّب جيداً. غطّها واتركها في الثلاجة 30 دقيقة (أو ليلة كاملة لطعم أفضل)",
            "🔥 التحضير: سخّن الفرن على 200 درجة مئوية. أو سخّن مقلاة واسعة على نار متوسطة-عالية",
            "⏱️ الطبخ بالفرن: رص الدجاج في صينية مدهونة بقليل من الزيت. اشوِ في الفرن 25-30 دقيقة مع التقليب في منتصف المدة حتى ينضج تماماً ويصبح ذهبي اللون (درجة حرارة داخلية 75 درجة)",
            "🍳 أو على الصاج: اشوِ الدجاج في المقلاة 3-4 دقائق لكل جانب حتى يتحمّر ويستوي تماماً",
            "🔪 التقطيع: قطّع الدجاج المشوي إلى شرائح رفيعة",
            "🥖 التحضير النهائي: سخّن خبز الشاورما على الصاج 20 ثانية لكل جانب حتى يطرى",
            "🌯 التقديم: ضع الدجاج، صوص الطحينة، الطماطم شرائح، المخلل في الخبز. لفّه جيداً وقدمه ساخناً"
        ]
    },
    {
        id: 502,
        name: "برجر لحم منزلي",
        type: "main",
        category: "quick",
        calories: 384,
        protein: "22g",
        video: "https://www.youtube.com/embed/example",
        ingredients: ["لحم مفروم", "بصل", "ثوم", "بقسماط", "خبز برغر", "جبن", "خس", "طماطم", "مخلل", "كاتشب", "مايونيز"],
        quantities: [
            "200 جرام لحم مفروم (بقري 80% لحم)",
            "ربع بصلة صغيرة مفرومة ناعم",
            "2 فص فص ثوم مهروس (6 جرام)",
            "1 ملعقة كبيرة (15 مل) بقسماط",
            "1.5 ملعقة صغيرة ملح (7.5 مل / 9 جرام) + ½ ملعقة صغيرة فلفل أسود (2.5 مل)",
            "2 شريحة خبز برجر طازج",
            "شريحة جبن شيدر",
            "خس طازج",
            "طماطم شرائح",
            "1 ملعقة كبيرة مخلل خيار شرائح (15 مل)",
            "2 ملعقة كبيرة كاتشب ومايونيز (30 جرام)"
        ],
        steps: [
            "🥩 التحضير: اخلط 200 جرام لحم مفروم + ربع بصلة مفرومة + فص ثوم + 1 ملعقة بقسماط + ملح + فلفل أسود في وعاء",
            "👐 التشكيل: شكّل الخليط بيديك على شكل قرص بسمك 1.5 سم تقريباً (لا تضغط كثيراً حتى لا يصبح جافاً)",
            "🔥 التسخين: سخّن مقلاة أو شواية على نار عالية حتى تصبح ساخنة جداً (قطرة ماء تتبخر فوراً)",
            "⏱️ الشوي: ضع قرص اللحم واشوِه 3-4 دقائق للجانب الأول بدون تحريك حتى يتشكل قشرة ذهبية",
            "🔄 القلب: اقلب البرجر مرة واحدة فقط واشوِ 3-4 دقائق للجانب الآخر. في آخر دقيقة ضع شريحة الجبن فوقه ليذوب",
            "🍞 تحميص الخبز: قص خبز البرجر من المنتصف وحمّصه على المقلاة دقيقة واحدة حتى يصبح ذهبي ومقرمش",
            "🏗️ التركيب: على الخبز السفلي: مايونيز + خس + طماطم + برجر اللحم مع الجبن + مخلل + كاتشب + الخبز العلوي",
            "🍔 التقديم: قدمه فوراً وهو ساخن مع بطاطس مقلية أو سلطة"
        ]
    },
    {
        id: 503,
        name: "نودلز آسيوي بالخضار",
        type: "main",
        category: "quick",
        calories: 62,
        protein: "1g",
        video: "https://www.youtube.com/embed/example",
        ingredients: ["نودلز", "فلفل رومي", "جزر", "بصل", "ملفوف", "ثوم", "زنجبيل", "صويا صوص", "زيت سمسم"],
        quantities: [
            "باكيت نودلز (200 جرام)",
            "¼ ملعقة صغيرة نصف فلفل رومي أحمر شرائح (1.25 مل)",
            "1 جزرة متوسطة شرائح رفيعة",
            "ربع بصلة شرائح",
            "كوب ملفوف مقطع شرائح",
            "2 فص ثوم مفروم",
            "½ ملعقة صغيرة زنجبيل مبشور",
            "3 ملاعق كبيرة (45 مل) صوص صويا",
            "1 ملعقة كبيرة (15 مل) زيت سمسم",
            "2 ملعقة زيت نباتي",
            "بصل أخضر للتزيين"
        ],
        steps: [
            "💧 سلق النودلز: اغلِ ماء في قدر كبير. أضف النودلز واسلقه 3-4 دقائق حتى ينضج لكن يبقى متماسكاً (al dente). صفّه واشطفه بماء بارد",
            "🔥 التحضير: سخّن مقلاة واسعة (wok) أو مقلاة عميقة على نار عالية. أضف 2 ملعقة زيت حتى يبدأ بالتصاعد دخان خفيف",
            "🥕 الخضار الصلبة: أضف الجزر والفلفل الرومي أولاً. قلّب بسرعة وباستمرار (stir fry) لمدة 2-3 دقائق حتى يلين قليلاً لكن يبقى مقرمشاً",
            "🧅 باقي الخضار: أضف البصل والملفوف. قلّب دقيقة واحدة",
            "🧄 التوابل: أضف الثوم والزنجبيل المفروم. قلّب 30 ثانية فقط حتى تفوح الرائحة (لا تحرقهم)",
            "🍜 النودلز: أضف النودلز المسلوق + 3 ملاعق صويا صوص + 1 ملعقة زيت سمسم. قلّب جيداً لمدة 2-3 دقائق حتى يتشرب النودلز الصوص ويسخن تماماً",
            "🌿 التقديم: انقله لطبق التقديم. زيّنه ببصل أخضر مقطع وقدمه ساخناً فوراً"
        ]
    },
    // Healthy / صحي
    {
        id: 601,
        name: "سلطة يونانية أصلية",
        type: "main",
        category: "healthy",
        calories: 626,
        protein: "5g",
        ingredients: ["خيار", "طماطم", "بصل أحمر", "جبن فيتا", "زيتون كالاماتا", "زيت زيتون", "أوريجانو"],
        quantities: [
            "3 حبات خيار مقطع قطع كبيرة (Rustic)",
            "3 حبات طماطم حمراء مقطعة",
            "نصف بصلة حمراء (شرائح رفيعة جداً)",
            "مكعب كامل جبن فيتا (يوضع فوق السلطة)",
            "2 ملعقة كبيرة ربع كوب زيتون كالاماتا (يوناني) (30 مل)",
            "4 ملاعق زيت زيتون بكر ممتاز",
            "1 ملعقة أوريجانو بري (زعتر مجفف)"
        ],
        steps: [
            "🥗 الخضار: ضع الخيار والطماطم في وعاء. لا تقطعهم صغيراً جداً، التقطيع الخشن هو سر اليونانية",
            "🧅 البصل: انقع شرائح البصل في ماء بارد وخل لمدة 5 دقائق (ليخف طعمه الحاد)، ثم صفّه وأضفه للسلطة",
            "🥣 التتبيل: صب زيت الزيتون و¼ ملعقة صغيرة ملح (1.25 مل) خفيفة (انتبه فالجبن مالح) ونصف كمية الأوريجانو. قلّب برفق",
            "🧀 التقديم: انقل السلطة لصحن التقديم. ضع قطعة الجبن الفيتا كاملة في المنتصف (وليس مكعبات صغيرة)",
            "🌿 اللمسة الأخيرة: انثر الزيتون ورشة أوريجانو إضافية وزيتاً على الجبن. قدمها مع خبز محمص"
        ]
    },
    {
        id: 602,
        name: "دجاج مشوي إكليل الجبل",
        type: "main",
        category: "healthy",
        calories: 416,
        protein: "55g",
        ingredients: ["صدور دجاج", "ثوم", "ليمون", "زيت زيتون", "روزماري (إكليل الجبل)", "فلفل أسود"],
        quantities: [
            "2 صدر دجاج (مدقوق ليصبح بسمك متساوي)",
            "3 فصوص ثوم مهروس ناعم",
            "عصير ليمونة ونصف",
            "2 ملعقة زيت زيتون",
            "عود روزماري طازج (أو ملعقة مجفف)",
            "ملح و½ ملعقة صغيرة فلفل أسود مجروش (2.5 مل / 1.5 جرام)"
        ],
        steps: [
            "🔨 الدق: ضع الدجاج بين كيسين نايلون ودقّه قليلاً ليصبح بسمك 2 سم (هذا يضمن استواء متساوي وطراوة)",
            "🥣 النقع: اخلط الثوم + الليمون + الزيت + الروزماري + ال1 ملعقة صغيرة ملح + ¼ ملعقة صغيرة فلفل أسود. تبّل الدجاج واتركه 30 دقيقة",
            "🔥 الشوي: سخّن الشواية (Grill) نار متوسطة-عالية. امسحها بالزيت",
            "⏱️ الطبخ: اشوِ الدجاج 5-6 دقائق للوجه الأول (لا تحركه حتى يفك لوحده وتظهر العلامات). اقلبه واشوِ 4-5 دقائق أخرى",
            "⏳ الراحة: ارفع الدجاج وغطّه بقصدير 5 دقائق قبل التقطيع (لتبقى العصارة بالداخل). قدّمه مع خضار سوتيه"
        ]
    },
    // International / عالمي
    {
        id: 701,
        name: "بيتزا مارغريتا نابولي",
        type: "main",
        category: "international",
        calories: 900,
        protein: "51g",
        ingredients: ["دقيق", "خميرة", "طماطم معلبة", "جبن موزاريلا طازج", "ريحان", "زيت زيتون"],
        quantities: [
            "500 جرام دقيق مخبوزات (00)",
            "325 مل ماء دافئ",
            "1 ملعقة صغيرة (5 مل) خميرة فورية",
            "علبة طماطم مقشرة (San Marzano)",
            "1 كوب جبن موزاريلا مبشور (115 جرام)",
            "أوراق ريحان طازجة"
        ],
        steps: [
            "🍞 العجينة: اخلط الدقيق والماء والخميرة و1 ملعقة صغيرة ملح (5 مل). اعجن 10 دقائق. اتركها تتخمر 8 ساعات (تخمير بطيء) لطعم إيطالي أصلي",
            "🍅 الصلصة: اهرس الطماطم المعلبة بيدك مع ¼ ملعقة صغيرة ملح (1.25 مل) وزيت زيتون (لا تطبخها!)",
            "🍕 الفرد: افرد العجينة باليد (وليس النشابة) للحفاظ على الهواء في الأطراف",
            "🧀 الحشو: وزّع الصلصة. ضع قطع الموزاريلا والريحان ورشة زيت زيتون",
            "🌡️ الخبز: سخّن الفرن لأعلى درجة (250°C+). اخبز البيتزا 5-8 دقائق حتى تتحمر الأطراف وتتبقع بالأسود الخفيف",
            "🌿 التقديم: أضف ريحان طازج بعد الخروج وقدمها فوراً"
        ]
    },
    {
        id: 702,
        name: "فيتوتشيني ألفريدو دجاج",
        type: "main",
        category: "international",
        calories: 927,
        protein: "55g",
        ingredients: ["مكرونة فيتوتشيني", "صدور دجاج", "كريمة خفق", "جبن بارميزان", "زبدة", "ثوم", "بقدونس"],
        quantities: [
            "250 جرام مكرونة فيتوتشيني (شرائط عريضة)",
            "2 صدر دجاج مقطع مكعبات",
            "1.5 كوب (360 مل) كريمة خفق (طبخ ثقيلة)",
            "½ كوب جبن بارميزان أصلي مبشور (120 مل)",
            "3 ملاعق زبدة",
            "2 فص ثوم مهروس",
            "2 ملعقة كبيرة مفروم رشة جوزة الطيب وفرم بقدونس (8 جرام)"
        ],
        steps: [
            "🍝 السلق: اسلق المكرونة في ماء مملح 8 دقائق (أقل دقيقتين من المكتوب). صفّها واحتفظ بكوب من ماء السلق",
            "🍗 الدجاج: في مقلاة واسعة، ذوّب ملعقة زبدة وشوّح الدجاج مع ½ ملعقة صغيرة ملح (2.5 مل) + ¼ ملعقة صغيرة فلفل أسود (1.25 مل) حتى يتحمر كلياً. ارفعه جانباً",
            "🥛 الصوص: في نفس المقلاة، أضف باقي الزبدة والثوم. قلّب دقيقة. صب الكريمة واتركها تغلي غلية واحدة",
            "🧀 التثقيل: خفف النار. أضف الجبن البارميزان وجوزة الطيب. قلّب حتى يذوب الجبن ويثقل الصوص قليلاً",
            "🔄 الدمج: أرجع الدجاج، وأضف المكرونة المسلوقة. قلّب لمدة دقيقتين حتى تتشرب الصوص (أضف من ماء السلق لو كان ثقيلاً)",
            "🌿 التقديم: زيّن بالبقدونس ورشة جبن إضافية. قدمها فوراً"
        ]
    },
    // === NEW DRINKS ===
    {
        id: 801,
        name: "سموذي مانجو استوائي",
        type: "drink",
        category: "healthy",
        calories: 249,
        protein: "2g",
        ingredients: ["مانجو", "حليب جوز هند", "أناناس", "عسل", "ثلج"],
        quantities: [
            "1 كوب (240 مل) مانجو مجمدة",
            "½ كوب أناناس (يعطي حموضة لذيذة) (120 مل)",
            "1 كوب (240 مل) حليب جوز الهند (أو حليب عادي)",
            "1 ملعقة عسل",
            "مكعبات ثلج"
        ],
        steps: [
            "🍍 التجهيز: استخدم فواكه مجمدة للحصول على قوام ثقيل بدون إضافة الكثير من الثلج",
            "🥥 الخلط: ضع حليب جوز الهند (للنكهة الاستوائية) + المانجو + الأناناس + العسل في الخلاط",
            "🍹 التقديم: اخلط حتى النعومة. صبّه في كوب وزيّنه بقطعة أناناس صغيرة وشمسية ورقية 🏖️"
        ]
    },
    {
        id: 802,
        name: "عصير برتقال وجزر (مقوي مناعة)",
        type: "drink",
        category: "healthy",
        calories: 50,
        protein: "1g",
        ingredients: ["برتقال", "جزر", "زنجبيل", "كركم", "ثلج"],
        quantities: [
            "3 برتقالات (عصير)",
            "2 جزرة متوسطة مقشرة",
            "قطعة صغيرة زنجبيل طازج",
            "¼ ملعقة صغيرة رشة كركم (اختياري) (1.25 مل)",
            "ثلج للتقديم"
        ],
        steps: [
            "🥕 العصر: اعصر الجزر والزنجبيل في عصارة الجزر (أو اخلطهم في الخلاط مع قليل ماء ثم صفهم)",
            "🍊 المزج: اعصر البرتقال يدوياً. اخلط عصير البرتقال مع عصير الجزر والزنجبيل",
            "🧊 التقديم: صب العصير فوق الثلج. هذا المشروب قنبلة فيتامين C وممتاز للنشاط الصباحي"
        ]
    },
    {
        id: 803,
        name: "سموذي الموز والفراولة (باور)",
        type: "drink",
        category: "healthy",
        calories: 82,
        protein: "3g",
        ingredients: ["موز", "فراولة", "حليب", "عسل", "شوفان"],
        quantities: [
            "1 موزة ناضجة (مجمدة)",
            "1 كوب (240 مل) فراولة طازجة أو مجمدة",
            "1 كوب (240 مل) حليب (أو حليب لوز)",
            "1 ملعقة كبيرة (15 مل) عسل",
            "1 ملعقة كبيرة (15 مل) شوفان (للإشباع والطاقة)"
        ],
        steps: [
            "🍌 التجهيز: تجميد الموز هو السر للحصول على قوام كريمي مثل الآيس كريم بدون إضافة ثلج كثير",
            "🥣 الخلط: ضع كل المكونات في الخلاط. ابدأ بسرعة بطيئة لتكسير الفواكه ثم زد السرعة",
            "🥛 القوام: اخلط لمدة دقيقة كاملة حتى يختفي أثر الشوفان تماماً ويصبح المشروب ناعماً",
            "🍓 التقديم: صبّه في كأس كبير. هذا المشروب مثالي كفطور سريع أو بعد التمرين"
        ]
    },
    {
        id: 804,
        name: "ميلك شيك شوكولاتة دبل",
        type: "drink",
        category: "quick",
        calories: 190,
        protein: "4g",
        ingredients: ["حليب", "شوكولاتة", "آيس كريم شوكولاتة", "كاكاو", "كريمة خفق"],
        quantities: [
            "1 كوب (240 مل) حليب بارد كامل الدسم",
            "2 كرة كبيرة آيس كريم شوكولاتة",
            "1 ملعقة طعام كاكاو بودرة (لتعزيز النكهة)",
            "2 ملعقة صوص شوكولاتة",
            "كريمة مخفوقة للتزيين"
        ],
        steps: [
            "🍫 الكأس: زيّن جدران الكأس بصوص الشوكولاتة من الداخل بشكل خطوط عشوائية",
            "🥣 الخلط: ضع الحليب + الآيس كريم + الكاكاو في الخلاط. اخلط 30 ثانية فقط (لا تبالغ في الخلط حتى لا يصبح خفيفاً جداً)",
            "☁️ التزيين: صب الميلك شيك في الكأس. ضع قمة عالية من الكريمة المخفوقة",
            "✨ اللمسة الأخيرة: رش مبشور الشوكولاتة أو بودرة الكاكاو على الوجه. قدمه مع شاليموه (شفاط)"
        ]
    },
    {
        id: 805,
        name: "موكا ساخنة (كافية ستايل)",
        type: "drink",
        category: "popular",
        calories: 150,
        protein: "3g",
        ingredients: ["قهوة نسكافيه", "كاكاو", "حليب", "سكر", "شوكولاتة"],
        quantities: [
            "1 ملعقة صغيرة (5 مل) نسكافيه (قهوة سريعة التحضير)",
            "1 ملعقة كبيرة (15 مل) كاكاو بودرة محلى",
            "1 كوب (240 مل) حليب ساخن",
            "2 ملعقة كبيرة سكر حسب الرغبة (25 جرام)",
            "50 جرام قطعة شوكولاتة صغيرة (اختياري)"
        ],
        steps: [
            "☕ المزيج الأساسي: في الكوب، اخلط النسكافيه + الكاكاو + السكر مع ملعقتين حليب ساخن. حرك بقوة حتى يصبح معجوناً ناعماً بدون تكتلات",
            "🥛 الحليب: سخّن الحليب (يفضل استخدام مضرب اليد لعمل رغوة خفيفة). صب الحليب الساخن فوق المزيج",
            "🥣 التحريك: حرك جيداً حتى تتجانس المكونات وتذوب الشوكولاتة",
            "✨ التقديم: يمكن رش الوجه بقليل من الكاكاو. استمتع بطعم القهوة مع الشوكولاتة الدافئ"
        ]
    },
    {
        id: 806,
        name: "عصير بطيخ مثلج (Slushy)",
        type: "drink",
        category: "healthy",
        calories: 50,
        protein: "1g",
        ingredients: ["بطيخ", "نعناع", "ليمون", "ثلج"],
        quantities: [
            "3 أكواب مكعبات بطيخ (يفضل مجمدة وتكون حلوة)",
            "أوراق نعناع طازجة (للتزيين)",
            "عصرة نصف ليمونة (تظهر حلاوة البطيخ)",
            "مكعبات ثلج قليلة (إذا لم يكن البطيخ مجمداً)"
        ],
        steps: [
            "🍉 التحضير: قطع البطيخ وتخلص من البذر تماماً. للحصول على أفضل نتيجة، جمد مكعبات البطيخ قبلها بساعتين",
            "🥣 الخلط: ضع البطيخ المجمد + عصرة الليمون في الخلاط. اخلط بنظام النبضات (Pulse) حتى يصبح القوام مثل البرد (Slushy)",
            "🚫 تنبيه: لا تضف الماء نهائياً حتى لا يخرب الطعم",
            "🌿 التقديم: صبه في كاسات باردة. زيّن بورقة نعناع وشريحة بطيخ صغيرة على الحافة"
        ]
    },
    {
        id: 807,
        name: "كافيه لاتيه (بارستا)",
        type: "drink",
        category: "international",
        calories: 50,
        protein: "3g",
        ingredients: ["بن قهوة", "حليب"],
        quantities: [
            "18 جرام بن مطحون (دبل شوت اسبريسو)",
            "300 مل حليب كامل الدسم مبخر",
            "2 ملعقة كبيرة سكر (عدّل حسب ذوقك) (25 جرام)"
        ],
        steps: [
            "☕ الاسبريسو: استخلص دبل شوت اسبريسو (60 مل) في كوب كبير (المعيار: 25-30 ثانية استخلاص)",
            "🥛 التبخير: بخّر الحليب مع إدخال هواء قليل جداً (رغوة مايكرو micro-foam) لتكون ناعمة وليست فقاعات كبيرة. الحرارة المثالية 65°C",
            "🎨 الرسم: صب الحليب المبخر فوق الاسبريسو ببطء من ارتفاع، ثم اقترب بالكوب للرسم (Latte Art) إذا أمكن",
            "✨ التقديم: يجب أن تكون رغوة الحليب بسماكة 1 سم تقريباً. قدمه مع قطعة بسكويت"
        ]
    },
    {
        id: 808,
        name: "عصير تفاح أخضر (ديتوكس)",
        type: "drink",
        category: "healthy",
        calories: 81,
        protein: "1g",
        ingredients: ["تفاح أخضر", "زنجبيل", "ليمون", "نعناع", "ثلج"],
        quantities: [
            "3 حبات تفاح أخضر (حامض)",
            "شريحة زنجبيل طازج",
            "نصف ليمونة مقشرة",
            "1 ملعقة كبيرة أوراق نعناع (4 جرام)",
            "مكعبات ثلج"
        ],
        steps: [
            "🍏 التحضير: اغسل التفاح جيداً وقطعه (لا تقشره فالفوائد في القشرة، لكن أزل البذر)",
            "⚙️ العصر: ضع التفاح + الزنجبيل + الليمون في عصارة الفواكه (Slow Juicer للحصول على أفضل قيمة غذائية)",
            "🧊 التبريد: ضع الثلج والنعناع في الكوب، وصب العصير الطازج فوقه",
            "🌿 الفائدة: هذا العصير ممتاز لتنظيف الكبد وإنعاش الجسم"
        ]
    },
    // === NEW DESSERTS ===
    {
        id: 901,
        name: "سلطة فواكه موسمية (بصوص العسل)",
        type: "dessert",
        category: "healthy",
        calories: 101,
        protein: "1g",
        ingredients: ["تفاح", "موز", "برتقال", "عنب", "كيوي", "عسل", "ليمون", "عصير مانجو"],
        quantities: [
            "1 تفاحة (مكعبات)",
            "1 موزة (دوائر)",
            "1 برتقالة (فصوص بدون قشر)",
            "½ كوب عنب أحمر (120 مل)",
            "1 كيوي مقشر",
            "2 ملعقة عسل",
            "عصرة ليمون (لمنع السواد)",
            "½ كوب عصير مانجو طبيعي (السر) (120 مل)"
        ],
        steps: [
            "🔪 التقطيع: قطع جميع الفواكه بحجم متقارب. اعصر الليمون فوراً على التفاح والموز لمنع تغير اللون",
            "🥭 الصوص: في وعاء صغير، اخلط عصير المانجو مع العسل",
            "🥣 الخلط: صب الصوص فوق الفواكه وقلب برفق حتى لا تتهرس",
            "❄️ التبريد: غطها واتركها في الثلاجة ساعة لتختلط النكهات (تتعتق)",
            "🍧 التقديم: قدمها في كاسات وزينها بالمكسرات أو الكريمة إذا رغبت"
        ]
    },
    {
        id: 902,
        name: "ميني بان كيك (سيريال)",
        type: "dessert",
        category: "quick",
        calories: 195,
        protein: "7g",
        ingredients: ["دقيق", "بيض", "حليب", "سكر", "بيكنج بودر", "فانيليا", "زبدة"],
        quantities: [
            "1 كوب دقيق (120 جرام) منخول",
            "1 بيضة",
            "1 كوب (240 مل) حليب",
            "1 ملعقة سكر",
            "1 ملعقة صغيرة (5 مل) بيكنج بودر",
            "1 ملعقة صغيرة فانيليا (5 مل)",
            "3 ملاعق زبدة ذائبة"
        ],
        steps: [
            "🥣 الخليط: اخلط المكونات الجافة. في وعاء آخر اخلط السوائل (بيض، حليب، زبدة، فانيليا). ادمجهم معاً",
            "🥡 التشكيل: ضع الخليط في علبة صوص (رأس مدبب) لسهولة التشكيل",
            "🔥 الطبخ: سخن مقلاة تيفال. صب دوائر صغيرة جداً (بحجم العملة). اقلبها عندما تظهر فقاعات",
            "🥣 التقديم: ضع كمية كبيرة في وعاء (مثل الكورن فليكس). صب عليها حليب بارد أو عسل وزبدة، وتؤكل بالملعقة"
        ]
    },
    {
        id: 903,
        name: "آيس كريم موز صحي (مكونين فقط)",
        type: "dessert",
        category: "healthy",
        calories: 85,
        protein: "1g",
        ingredients: ["موز", "فانيليا", "كاكاو", "زبدة فول سوداني"],
        quantities: [
            "3 حبات موز ناضجة جداً (بها نقط سوداء)",
            "1 ملعقة صغيرة نصف ملعقة صغيرة فانيليا (5 مل)",
            "1 ملعقة كاكاو أو زبدة فول سوداني (اختياري للنكهة)"
        ],
        steps: [
            "🍌 التجميد: قطع الموز إلى حلقات صغيرة. ضعها في كيس وافردها (لا تكدسها). جمدها لمدة 4 ساعات على الأقل (أو ليلة كاملة)",
            "🥣 الخلط: ضع الموز المجمد في محضرة الطعام (Food Processor) وليس الخلاط العادي. اخلط على نبضات",
            "✨ التحول: في البداية سيصبح مثل البقسماط، استمر في الخلط... فجأة سيتحول لقوام كريمي ناعم جداً (مثل السحر!)",
            "🍦 الإضافات: أضف الفانيليا أو كاكاو الآن واخلط ثانية واحدة. قدمه فوراً (سوفت سيرف) أو جمده ساعة ليتماسك"
        ]
    },
    {
        id: 904,
        name: "كريب نوتيلا (خلطة فرنسية)",
        type: "dessert",
        category: "quick",
        calories: 241,
        protein: "9g",
        ingredients: ["دقيق", "حليب", "بيض", "زبدة", "نوتيلا", "فراولة", "فانيليا"],
        quantities: [
            "1 كوب دقيق (120 جرام) أبيض",
            "1.5 كوب (360 مل) حليب سائل",
            "2 بيضة",
            "2 ملعقة كبيرة (30 مل) زبدة ذائبة",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)",
            "نوتيلا وفراولة للحشو"
        ],
        steps: [
            "🌀 العجينة: اضرب كل المكونات في الخلاط (البيض، الحليب، الزبدة، الدقيق، الملح، السكر) حتى تختفي التكتلات. صفها بمصفاة",
            "⏳ الراحة: اترك العجينة ترتاح 30 دقيقة (السر لتكون طرية ولا تتقطع). قوامها يجب أن يكون خفيفاً مثل الكريمة السائلة",
            "🍳 الخبز: سخن مقلاة غير لاصقة وامسحها بالزبدة. صب مغرفة وحرك المقلاة لتوزيع العجين بسمك رقيق جداً",
            "🔥 الطهي: 45 ثانية لكل وجه حتى يصبح ذهبياً فاتحاً. غطِّ الكريب المخبوز بفوطة ليبقى طرياً",
            "🍫 التقديم: ادهن النصف بالنوتيلا، وزع قطع الفراولة، وطبقه مثلثات. زين بخطوط شوكولاتة وسكر بودرة"
        ]
    },
    {
        id: 905,
        name: "تمر محشي طحينة (سناك فاخر)",
        type: "dessert",
        category: "healthy",
        calories: 972,
        protein: "1g",
        ingredients: ["تمر سكري", "طحينة", "سمسم", "جوز", "فستق"],
        quantities: [
            "10 حبات تمر سكري أو خلاص (كبير)",
            "3 ملاعق طحينة سائلة (سمسم صافي)",
            "¼ كوب مكسرات: جوز بيكان أو لوز (35 جرام)",
            "سمسم محمص للتزيين"
        ],
        steps: [
            "🪄 التجهيز: افتح حبات التمر طولياً بسكين صغير وأزل النواة بحذر للحفاظ على شكل التمرة",
            "🥜 الحشو: ضع حبة جوز بيكان أو لوز داخل كل تمرة",
            "🍯 الصوص: صب ملعقة صغيرة طحينة داخل التمرة وفوق المكسرات",
            "✨ التزيين: رصها في طبق التقديم. رش عليها سمسم محمص وفستق مطحون. تقدم مع القهوة العربية"
        ]
    },
    {
        id: 906,
        name: "شوكو-بنانا (بوبس)",
        type: "dessert",
        category: "quick",
        calories: 247,
        protein: "2g",
        ingredients: ["موز", "شوكولاتة خام", "جوز هند", "فستق"],
        quantities: [
            "2 موزة متماسكة",
            "100 جرام شوكولاتة داكنة مذابة",
            "أعواد آيس كريم خشبية",
            "3 ملعقة كبيرة للتغطية: جوز هند مبشور، فستق، أو سبرنكلز (20 جرام)"
        ],
        steps: [
            "🍌 القص: اقطع كل موزة نصفين بالعرض. اغرز عود الآيس كريم في كل قطعة من جهة القطع",
            "🍫 التغطية: غمس الموز في الشوكولاتة المذابة (في كوب عميق أسهل)",
            "🎨 التزيين: فوراً قبل أن تجف الشوكولاتة، دحرجها في جوز الهند أو الفستق",
            "❄️ التبريد: ضعها على ورق زبدة وادخلها الفريزر 20 دقيقة حتى تتماسك وتقرمش الشوكولاتة"
        ]
    },
    // === MORE MAIN DISHES ===
    {
        id: 1001,
        name: "برياني دجاج حيدر أبادي",
        type: "main",
        category: "international",
        calories: 795,
        protein: "55g",
        ingredients: ["دجاج", "أرز بسمتي", "بصل مقلي", "زبادي", "نعناع", "كزبرة", "جرام ماسالا"],
        quantities: [
            "1 كجم دجاج مقطع",
            "3 أكواب أرز بسمتي هندي (حبة طويلة)",
            "2 كوب (480 مل) زبادي",
            "3 بصلات كبيرة مقلية (جوانح مقرمشة)",
            "2 ملعقة كبيرة مفرومة نصف كوب نعناع طازج وكزبرة (8 جرام)",
            "½ ملعقة صغيرة بهارات حب ومطحونة (جرام ماسالا) (2.5 مل)",
            "¼ ملعقة صغيرة زعفران منقوع في حليب منقوع في 2 ملعقة كبيرة ماء دافئ"
        ],
        steps: [
            "🍗 التتبيل (المرحلة الأهم): اخلط الدجاج مع الزبادي + نصف كمية البصل المقلي + نعناع + كزبرة + ثوم وزنجبيل + البهارات. انقعه ساعتين على الأقل",
            "🌾 الأرز: اسلق الأرز في ماء وفير مع بهارات حب و½ ملعقة صغيرة ملح (2.5 مل) لمدة 5-7 دقائق فقط (نصف استواء - 70%). صفّه",
            "🏗️ التطبيق (Dum): في قدر ثقيل، ضع خلطة الدجاج في القاع (نيئة!). غطها بطبقة الأرز",
            "🎨 اللمسات: رش باقي البصل المقلي، النعناع، منقوع الزعفران، وملعقتين سمن على الوجه",
            "🔥 الطبخ: غط القدر بإحكام (قصدير أو عجين). اطبخ نار عالية 5 دقائق، ثم نار هادئة جداً 35 دقيقة",
            "🍽️ التقديم: اقلب القدر برفق لتظهر طبقات الأرز الملون والدجاج المحمر"
        ]
    },
    {
        id: 1002,
        name: "صاجية لحم (على الطريقة البدوية)",
        type: "main",
        category: "popular",
        calories: 386,
        protein: "35g",
        ingredients: ["لحم غنم", "ليّة (شحم)", "بصل", "طماطم", "فلفل رومي", "فلفل حار", "ثوم"],
        quantities: [
            "500 جرام لحم غنم طازج (مقطع مكعبات صغيرة)",
            "قطع صغيرة من اللية (تعطي النكهة الأصلية)",
            "2 بصلة كبيرة (جوانح)",
            "3 حبات طماطم مقشرة ومقطعة",
            "1 فلفل رومي بارد + 2 فلفل حار (عدّل حسب ذوقك)",
            "5 فصوص ثوم شرائح",
            "1.5 ملعقة صغيرة ملح (7.5 مل / 9 جرام)"
        ],
        steps: [
            "🔥 الصاج: سخن الصاج (أو مقلاة حديد ثقيلة) على نار عالية جداً. ذوّب قطع اللية حتى تخرج دهنها",
            "🥩 اللحم: أنزل اللحم تدريجياً (لكي لا تبرد المقلاة). قلّب بسرعة حتى يتحمر ويأخذ لون الشوي",
            "🧅 الخضار: أضف البصل والثوم والفلفل. قلّب حتى يذبل البصل قليلاً",
            "🍅 التسبّيك: أضف الطماطم و½ ملعقة صغيرة بهارات مشكلة (2.5 مل) والملح. قلّب دقيقتين فقط (الطماطم يجب أن تبقى متماسكة قليلاً)",
            "🍽️ التقديم: قدمها فوراً في الصاج وهو يغلي (أصوات التش!). تؤكل بالخبز البر"
        ]
    },
    {
        id: 1003,
        name: "سمك فيليه مقلي (مقرمش)",
        type: "main",
        category: "main",
        calories: 162,
        protein: "13g",
        ingredients: ["سمك فيليه", "دقيق", "نشا", "بقدونس", "ليمون", "كمون", "ثوم بودرة"],
        quantities: [
            "4 قطع فيليه هامور (أو أي سمك أبيض)",
            "½ كوب دقيق + 2 ملعقة كبيرة (30 مل) نشا (سر القرمشة) (120 مل)",
            "2 فص ملح، كمون، ثوم بودرة، كزبرة ناشفة (6 جرام)",
            "عصير 2 ليمونة للتتبيل",
            "1.5 كوب زيت نباتي للقلي العميق (360 مل / 330 جرام)"
        ],
        steps: [
            "🐟 التتبيل: جفف السمك بمناديل. تبلّه بالليمون والكمون والثوم و1 ملعقة صغيرة ملح (5 مل). اتركه 20 دقيقة",
            "🌾 التغطية: اخلط الدقيق والنشا و½ ملعقة صغيرة بهارات مشكلة (2.5 مل) في كيس. ضع قطع السمك في الكيس ورجه جيداً ليتغلف بالكامل",
            "🔥 القلي: سخن الزيت (اختبره بقطعة عجين). اقلِ السمك 4-5 دقائق حتى يصبح ذهبياً فاتحاً (لا تقلب كثيراً)",
            "❄️ التصفية: ارفعه على شبك (وليس مناديل) ليحافظ على قرمشته",
            "🍋 التقديم: قدمه مع صوص طحينة وليمون وبطاطس مقلية"
        ]
    },
    {
        id: 1004,
        name: "شاورما لحم منزلية",
        type: "main",
        category: "quick",
        calories: 392,
        protein: "35g",
        ingredients: ["لحم عجل", "دهن", "زبادي", "طحينة", "سماق", "بقدونس", "بصل"],
        quantities: [
            "500 جرام لحم عجل (ستيك ريب آي أو فخذ) مقطع شرائح رفيعة جداً",
            "قطعة دهن صغيرة مفرومة",
            "التتبيلة: 2 ملعقة زبادي + 2 ملعقة خل + بهارات شاورما + قرفة",
            "2 ملعقة كبيرة مفروم السلطة: بصل جوانح + سماق + بقدونس (8 جرام)",
            "2 فص الصوص: طحينة + ليمون + ثوم (6 جرام)"
        ],
        steps: [
            "🥩 التتبيل: انقع اللحم في التتبيلة ليلة كاملة (الخل يطري الألياف)",
            "🔥 الشوي: سخن مقلاة واسعة جداً. شوّح الدهن أولاً، ثم نزل اللحم على دفعات (نار عالية) لكي لا يخرج ماؤه. قلّب حتى يتحمر",
            "🥙 التجميع: اخلط البصل مع السماق والبقدونس. جهز صوص الطحينة",
            "🌯 اللف: ادهن خبز الصاج بالطحينة. ضع اللحم، ثم سلطة البصل والسماق، ثم الطماطم. لفّ وسخنه (كبس) على الصاج",
            "🍽️ التقديم: قدمه مع مخلل لفت ودبس رمان"
        ]
    },
    {
        id: 1005,
        name: "سباغيتي بولونيز (الصوص الإيطالي)",
        type: "main",
        category: "international",
        calories: 845,
        protein: "52g",
        ingredients: ["مكرونة سباغيتي", "لحم مفروم", "طماطم معلبة", "بصل", "جزر", "كرفس", "ثوم"],
        quantities: [
            "400 جرام سباغيتي",
            "400 جرام لحم مفروم بقري",
            "1 علبة طماطم كاملة مقشرة (مهروسة)",
            "Sofrito: (1 بصلة، 1 جزرة، 1 عود كرفس) مفرومين ناعم جداً",
            "2 فص ثوم",
            "½ كوب حليب (سر الطراوة) (120 مل)"
        ],
        steps: [
            "🥘 السوفريتو: في قدر، سخن زيت الزيتون. شوّح البصل والجزر والكرفس 10 دقائق حتى تذبل تماماً (أساس النكهة)",
            "🥩 اللحم: أضف اللحم المفروم وارفع النار. قلّب حتى يتحمر ويجف ماؤه",
            "🍅 الصوص: أضف الثوم ومعجون الطماطم وقلب. أضف الطماطم المهروسة و1 ملعقة صغيرة ملح (5 مل) والفلفل والأعشاب. اتركها تتسبك ساعة على نار هادئة",
            "🍝 الباستا: اسلق السباغيتي. قبل التصفية، خذ كوب من ماء السلق وأضفه للصوص ليصبح حريرياً",
            "🍽️ التقديم: اخلط الباستا مع الصوص في القدر (Tossing) لمدة دقيقة. قدمها مع جبن بارميزان طازج"
        ]
    },
    {
        id: 1006,
        name: "كفتة بالفرن (بالصلصة)",
        type: "main",
        category: "main",
        calories: 459,
        protein: "37g",
        ingredients: ["لحم مفروم", "بصل", "بقدونس", "طماطم", "بطاطس", "فلفل رومي"],
        quantities: [
            "500 جرام لحم مفروم (بقري أو غنم)",
            "1 بصلة مبشورة ومعصورة من الماء",
            "2 ملعقة كبيرة مفروم نصف حزمة بقدونس مفروم (8 جرام)",
            "3 حبات بطاطس (حلقات مقلية نصف قلو)",
            "3 حبات طماطم (حلقات)",
            "كوب عصير طماطم مسبك"
        ],
        steps: [
            "🥩 الكفتة: اعجن اللحم مع البصل والبقدونس و½ ملعقة صغيرة ملح (2.5 مل) وفلفل وبهارات لحم جيداً حتى تسمغ (تتماسك الخيوط)",
            "👐 التشكيل: شكلها أصابع أو أقراص. (نصيحة: بلل يدك بماء البصل عند التشكيل لطعم رائع)",
            "🍳 الصدمة: شوّح الكفتة في مقلاة دقيقتين لتتحمر وتتماسك",
            "🥘 الرص: في صينية، رص طبقة بطاطس ثم طماطم ثم الكفتة",
            "🍅 التسقية: صب عصير الطماطم المسبك (مع قليل من ال1.5 ملعقة صغيرة ملح (7.5 مل) + ½ ملعقة صغيرة فلفل أسود) فوق الصينية",
            "🔥 الخبز: غطها بقصدير واخبزها 30 دقيقة، ثم حمر الوجه"
        ]
    },
    {
        id: 1007,
        name: "كبسة دجاج (بقدر واحد)",
        type: "main",
        category: "popular",
        calories: 867,
        protein: "55g",
        ingredients: ["دجاج", "أرز بسمتي", "جزر", "ليمون أسود", "بهارات كبسة"],
        quantities: [
            "1 دجاجة مقطعة أرباع",
            "2.5 كوب أرز (450 جرام) بسمتي (منقوع)",
            "1 بصلة مفرومة + 3 فصوص ثوم",
            "2 حبة ليمون أسود (لومي)",
            "1 جزرة مبشورة (للون والطعم)",
            "½ ملعقة صغيرة ملعقة كبيرة بهارات كبسة (2.5 مل)"
        ],
        steps: [
            "🥘 الكشنة: حمّر البصل حتى يصبح ذهبياً. أضف الثوم و½ ملعقة صغيرة بهارات مشكلة (2.5 مل) واللومي والدجاج. قلّب حتى يتغير لون الدجاج",
            "🍅 التسبّيك: أضف معجون طماطم (اختياري) والجزرة المبشورة والماء المغلي. اترك الدجاج يغلي 20 دقيقة",
            "🌾 الأرز: أضف الأرز المنقوع. يجب أن يغطي الماء الأرز بمقدار 1.5 سم. اضبط الملح",
            "🔥 الطبخ: دعه يغلي على نار عالية حتى تظهر الثقوب في الأرز، ثم خفف النار جداً وغطّه 20 دقيقة",
            "🍽️ التقديم: اقلب القدر في صحن واسع. قدمه مع الدقوس الحار"
        ]
    },
    {
        id: 1008,
        name: "بطاطس محشية (كومبير تركي)",
        type: "main",
        category: "main",
        calories: 277,
        protein: "10g",
        ingredients: ["بطاطس كبيرة", "جبن موزاريلا", "زبدة", "ذرة", "زيتون"],
        quantities: [
            "2 حبة بطاطس كبيرة جداً (لشوي)",
            "2 ملعقة كبيرة (30 مل) زبدة",
            "½ كوب جبن موزاريلا (120 مل)",
            "2 ملعقة كبيرة إضافات: ذرة، زيتون، مخلل، كاتشب، مايونيز (30 مل)"
        ],
        steps: [
            "🔥 الشوي: غسّل البطاطس جيداً. لفها بقصدير واشوها في الفرن (200°C) لمدة ساعة حتى تصبح طرية جداً",
            "🥔 الهرس: قص الوجه طولياً (لا تفصلها). اهرس اللب بالشوكة بحذر داخل القشرة",
            "🧀 الخلط: فوراً وهي ساخنة، أضف الزبدة والجبن واخلط مع اللب حتى يذوب ويمتط",
            "🌽 التقديم: اصنع حفرة، واحشها بالذرة والزيتون والمخلل واي إضافات تفضلها. كل بالملعقة من القشرة"
        ]
    },
    {
        id: 1009,
        name: "ماك آند تشيز (الأصلية)",
        type: "main",
        category: "quick",
        calories: 800,
        protein: "55g",
        ingredients: ["مكرونة كوع", "جبن شيدر أحمر", "حليب", "دقيق", "زبدة"],
        quantities: [
            "300 جرام مكرونة (شكل كوع/هلال)",
            "2 كوب (480 مل) جبن شيدر أحمر مبشور (أصلي)",
            "2 ملعقة دقيق + 2 ملعقة زبدة (للرو)",
            "2 كوب (480 مل) حليب سائل",
            "½ ملعقة صغيرة رشة بابريكا وخردل بودرة (2.5 مل)"
        ],
        steps: [
            "🍝 السلق: اسلق المكرونة 6 دقائق فقط (ستكمل طبخ في الصوص). صفها",
            "🥣 الرو (Roux): في قدر، ذوب الزبدة وأضف الدقيق. قلب دقيقة حتى تظهر رائحة بسكويت خفيفة",
            "🥛 البشاميل: أضف الحليب بالتدريج مع التحريك المستمر حتى يثقل القوام. أضف البهارات",
            "🧀 الصوص: اطفئ النار. أضف الجبن الشيدر وقلب حتى يذوب تماماً ويصبح صوصاً برتقالياً لامعاً",
            "🔄 الدمج: أضف المكرونة للصوص وقلب. (اختياري: رشة بقسماط على الوجه وتحمير في الفرن)"
        ]
    },
    {
        id: 1010,
        name: "شوربة دجاج بالشوفان (صحية)",
        type: "main",
        category: "healthy",
        calories: 316,
        protein: "38g",
        ingredients: ["دجاج", "شوفان", "بصل", "هيون", "طماطم"],
        quantities: [
            "1 صدر دجاج مقطع مكعبات صغيرة",
            "4 ملاعق كبيرة (60 مل) شوفان (كويكر)",
            "1 بصلة صغيرة مفرومة ناعم",
            "2 حبة طماطم معصورة",
            "2 ملعقة صغيرة ملح (10 مل / 12 جرام)"
        ],
        steps: [
            "🥘 الحمس: شوح البصل والدجاج في قليل من الزيت حتى يبيض الدجاج",
            "🍅 المرق: أضف عصير الطماطم وقلب دقيقتين. أضف 4 أكواب ماء مغلي و½ ملعقة صغيرة بهارات مشكلة (2.5 مل) والليمون الأسود",
            "🥣 الشوفان: أضف الشوفان وقلب فوراً حتى لا يتكتل",
            "🔥 الغلي: اتركها تغلي على نار هادئة 15-20 دقيقة حتى يثقل القوام وينضج الدجاج",
            "🍋 التقديم: قدمها ساخنة مع عصرة ليمون. ممتازة في الشتاء"
        ]
    },
    // === MORE DESSERTS ===
    {
        id: 1011,
        name: "مولتن كيك (لافا كيك)",
        type: "dessert",
        category: "international",
        calories: 475,
        protein: "9g",
        ingredients: ["شوكولاتة داكنة", "زبدة", "بيض", "سكر", "دقيق"],
        quantities: [
            "100 جرام شوكولاتة داكنة (نسبة كاكاو عالية)",
            "100 جرام زبدة (أصبع)",
            "2 بيضة + 2 صفار بيض",
            "3 ملاعق سكر",
            "2 ملعقة دقيق (فقط)"
        ],
        steps: [
            "🍫 التذويب: ذوّب الشوكولاتة مع الزبدة في حمام مائي أو الميكروويف. اتركها تبرد قليلاً",
            "🥚 الخفق: اخفق البيض والصفار والسكر والفانيليا جيداً حتى يصبح فاتح اللون",
            "🥣 الدمج: صب خليط الشوكولاتة فوق خليط البيض وقلب. أضف الدقيق وقلب برفق",
            "🧁 الخبز: ادهن قوالب الراميكن (Ramekins) بالزبدة والكاكاو. صب الخليط. اخبز في فرن ساخن (200°C) لمدة 10-12 دقيقة فقط",
            "🌋 التقديم: اقلبها فوراً في صحن التقديم. يجب أن يكون القلب سائلاً (Lava). تقدم مع آيس كريم فانيليا"
        ]
    },
    {
        id: 1012,
        name: "أكواب الكنافة (ميني)",
        type: "dessert",
        category: "popular",
        calories: 1200,
        protein: "12g",
        ingredients: ["عجينة كنافة", "سمن", "قشطة طازجة", "فستق", "شيرة"],
        quantities: [
            "500 جرام عجينة كنافة طازجة",
            "1 كوب (240 مل) سمن مذاب",
            "قشطة طازجة أو جبن كيري للحشو",
            "شيرة (قطر) باردة ثقيلة"
        ],
        steps: [
            "🧶 التجهيز: قصص الكنافة بالمقص لتصبح خيوط قصيرة. افركها جيداً بالسمن حتى تتشرب",
            "🧁 التشكيل: استخدم صينية الكب كيك. ضع طبقة كنافة واضغطها لعمل قاع وحواف (مثل العش)",
            "☁️ الحشو: ضع ملعقة قشطة في الوسط (لا توصلها للأطراف حتى لا تحترق)",
            "🔒 التغطية: غطها بطبقة كنافة أخرى واضغط بخفة",
            "🔥 الخبز: اخبزها على 200°C لمدة 20 دقيقة حتى تتحمر. صب الشيرة الباردة فور خروجها وهي ساخنة"
        ]
    },
    {
        id: 1013,
        name: "بسبوسة الزبادي (الطرية)",
        type: "dessert",
        category: "popular",
        calories: 868,
        protein: "16g",
        ingredients: ["سميد خشن", "زبادي", "سكر", "زيت", "جوز هند", "بيكنج بودر"],
        quantities: [
            "1 كوب (240 مل) سميد خشن",
            "1 كوب (240 مل) جوز هند مبشور",
            "1 كوب سكر (200 جرام)",
            "1 علبة زبادي (170 جرام) (استخدم العلبة للمعيار)",
            "2 ملعقة كبيرة نصف كوب زيت (30 مل)",
            "بيضة واحدة",
            "1 ملعقة صغيرة ملعقة كبيرة بيكنج بودر (5 جرام)"
        ],
        steps: [
            "🥣 الخلط: اخلط كل المكونات السائلة + السكر جيداً. أضف السميد وجوز الهند والبيكنج بودر. قلب حتى تمتزج فقط (لا تعجن كثيراً)",
            "⏲️ الراحة: صب الخليط في صينية مدهونة بطحينة. اتركها ترتاح 15 دقيقة قبل الخبز (سر التشقق والترمل)",
            "🔥 الخبز: اخبز في فرن 180°C لمدة 25-30 دقيقة حتى تتحمر الأطراف",
            "🍯 التشريب: صب الشيرة الحارة فوراً على البسبوسة الساخنة. غطها لتبقى طرية"
        ]
    },
    {
        id: 1014,
        name: "أرز بالحليب (مصري)",
        type: "dessert",
        category: "popular",
        calories: 378,
        protein: "5g",
        ingredients: ["أرز قصير الحبة", "حليب", "سكر", "قشطة", "نشا", "مستكة"],
        quantities: [
            "½ كوب أرز مصري (مغسول) (120 مل)",
            "4 أكواب حليب كامل الدسم",
            "2 ملعقة كبيرة نصف كوب سكر (25 جرام)",
            "2 ملعقة قشطة (اختياري)",
            "1 ملعقة نشا مذابة في ماء بارد",
            "2 ملعقة كبيرة فصين مستكة مطحونة مع سكر (25 جرام)"
        ],
        steps: [
            "🌾 السلق: اسلق الأرز في كوبين ماء حتى يشرب الماء وينضج تماماً (يصبح طرياً جداً)",
            "🥛 الطبخ: أضف الحليب والسكر والمستكة. قلب على نار هادئة، دعه يغلي 10 دقائق",
            "🔒 القوام: أضف النشا المذاب والقشطة. استمر في التقليب حتى يثقل القوام (مثل الكريمة)",
            "❄️ التبريد: صبه في أطباق صغيرة. اتركه يبرد تماماً ليتكون (الوجه المكرمش). زين بالمكسرات"
        ]
    },
    {
        id: 1015,
        name: "تشيز كيك اللوتس (بدون فرن)",
        type: "dessert",
        category: "international",
        calories: 759,
        protein: "28g",
        ingredients: ["بسكويت لوتس", "زبدة", "جبن كريمي", "كريمة خفق", "زبدة لوتس", "سكر بودرة"],
        quantities: [
            "باكيت بسكويت لوتس مطحون (للقاعدة)",
            "70 جرام زبدة ذائبة",
            "400 جرام جبن كريمي (درجة حرارة الغرفة)",
            "1 كوب (240 مل) كريمة خفق (باردة جداً)",
            "½ كوب زبدة لوتس (للحشوة) + للتزيين (120 مل)",
            "3 ملاعق سكر بودرة"
        ],
        steps: [
            "🍪 القاعدة: اخلط البسكويت المطحون مع الزبدة. رصه بقوة في قاع قالب متحرك. ضعه في الفريزر 15 دقيقة",
            "🥣 الكريمة: اخفق الجبن مع زبدة اللوتس والسكر حتى يصبح ناعماً. في وعاء آخر، اخفق الكريمة حتى تتماسك. ادمج الخليطين برفق (Fold)",
            "🍰 التجميع: صب الخليط فوق التاعدة وساوِ السطح. غطها وبردها 6 ساعات على الأقل",
            "🎨 التزيين: ذوب زبدة اللوتس في الميكروويف (30 ثانية). صبها على الوجه. زين بأطراف بسكويت مطحون"
        ]
    },
    {
        id: 1016,
        name: "كوكيز كلاسيك (نيويورك ستايل)",
        type: "dessert",
        category: "quick",
        calories: 800,
        protein: "34g",
        ingredients: ["دقيق", "زبدة باردة", "سكر بني ورطب", "بيض", "شوكولاتة تشيبس", "نشاء"],
        quantities: [
            "2.5 كوب دقيق (300 جرام) + ملعقة صغيرة نشاء (للقوام الطري)",
            "1 كوب زبدة (225 جرام) باردة (مكعبات)",
            "1 كوب سكر (200 جرام) بني رطب (مهم جداً) + نصف كوب سكر أبيض",
            "2 بيضة",
            "2 كوب (480 مل) قطع شوكولاتة (شبه محلاة)"
        ],
        steps: [
            "🥣 العجن: اخفق الزبدة الباردة مع السكر جيداً (لا تبالغ). أضف البيض. أضف المواد الجافة واخلط حتى تختفي فقط",
            "🍫 الدمج: أضف الشوكولاتة وقلب بملعقة. لا تعجن",
            "❄️ التشكيل: شكل كرات كبيرة بشكل عشوائي (لا تضغطها). ضعها في الثلاجة ساعة (سر التماسك وعدم الانفراش)",
            "🔥 الخبز: اخبز في فرن ساخن 200°C لمدة 10-12 دقيقة فقط. ستكون طرية جداً، اتركها تبرد في الصينية لتتماسك"
        ]
    },
    {
        id: 1017,
        name: "مهلبية كريمية (بدون تكتل)",
        type: "dessert",
        category: "popular",
        calories: 215,
        protein: "2g",
        ingredients: ["حليب", "نشا", "سكر", "ماء ورد", "قشطة", "فستق"],
        quantities: [
            "4 أكواب حليب سائل",
            "5 ملاعق نشا (مذابة في نصف كوب حليب بارد)",
            "2 ملعقة كبيرة نصف كوب سكر (أو عدّل حسب ذوقك) (25 جرام)",
            "علبة قشطة (170 جرام) (للقوام الكريمي)",
            "1 ملعقة صغيرة (5 مل) ماء ورد أو فانيليا"
        ],
        steps: [
            "🥛 التسخين: سخن الحليب مع السكر حتى يغلي",
            "🌀 الربط: خفف النار. صب خليط النشا ببطء مع التحريك المستمر والسريع (بالمضرب اليدوي) حتى يثقل القوام ويبدأ بالغليان (فقاعات)",
            "☁️ القوام: أطفئ النار. أضف القشطة وماء الورد وحرك بقوة حتى تتجانس",
            "🥣 التقديم: صبها في كاسات. انتظر 5 دقائق لتبرد قليلاً قبل التزيين بالفستق والورد المحمدي. قدمها باردة"
        ]
    },
    // === MORE DRINKS ===
    {
        id: 1018,
        name: "عصير الجزر والبرتقال (مقوي النظر)",
        type: "drink",
        category: "healthy",
        calories: 87,
        protein: "2g",
        ingredients: ["جزر", "برتقال", "زنجبيل", "كركم", "ثلج"],
        quantities: [
            "4 حبات جزر مقشرة",
            "3 حبات برتقال مقشرة",
            "شريحة زنجبيل صغيرة (للمناعة)",
            "¼ ملعقة صغيرة رشة كركم (اختياري) (1.25 مل)",
            "مكعبات ثلج"
        ],
        steps: [
            "🥕 العصر: يفضل استخدام عصارة الفواكه (Juicer) للجزر والزنجبيل للحصول على عصير صافي",
            "🍊 الخلط: اعصر البرتقال بالعصارة اليدوية. اخلط عصير الجزر مع البرتقال",
            "🧊 التقديم: صب العصير في كأس به ثلج. حركه جيداً وقدمه فوراً للاستفادة من الفيتامينات",
            "🍯 ملاحظة: الجزر حلو طبيعي، لكن يمكن إضافة ملعقة عسل إذا لزم الأمر"
        ]
    },
    {
        id: 1019,
        name: "بلو أوشن موهيتو (Blue Ocean)",
        type: "drink",
        category: "international",
        calories: 98,
        protein: "5g",
        ingredients: ["سفن أب", "سيروب أزرق", "ليمون", "نعناع", "توت أزرق", "ثلج"],
        quantities: [
            "علبة سفن أب أو سبرايت (باردة)",
            "2 ملعقة سيروب توت أزرق (Blue Lagoon)",
            "3 شرائح ليمون + نصف ليمونة مقطعة أرباع",
            "10 أوراق نعناع طازج",
            "كوب ثلج مجروش"
        ],
        steps: [
            "🌿 النقع: في قاع الكوب، ضع أرباع الليمون وأوراق النعناع. اهرسها (Muddle) بخفة لتخرج الزيوت العطرية (لا تمزق الورق)",
            "🎨 اللون: أضف الثلج المجروش حتى يمتلئ الكأس. صب السيروب الأزرق فوق الثلج",
            "💧 الغازات: صب السفن أب ببطء للحفاظ على الغازات",
            "✨ التقديم: زين بشريحة ليمون وورقة نعناع. حرك بمصاصة قبل الشرب واستمتع بالانتعاش"
        ]
    },
    {
        id: 1020,
        name: "سموذي أفوكادو بالعسل (ملكي)",
        type: "drink",
        category: "healthy",
        calories: 101,
        protein: "4g",
        ingredients: ["أفوكادو", "حليب", "عسل", "مكسرات", "آيس كريم"],
        quantities: [
            "1 حبة أفوكادو ناضجة (لينة)",
            "1.5 كوب (360 مل) حليب بارد جداً",
            "2 ملعقة كبيرة (30 مل) عسل طبيعي",
            "1 ملعقة صغيرة كرة آيس كريم فانيليا (اختياري للقوام) (5 مل)",
            "لوز أو كاجو للتزيين"
        ],
        steps: [
            "🥑 التحضير: قشر الأفوكادو وأزل النواة. (تلميح: إذا لم تكن ناضجة، لن يكون الطعم جيداً)",
            "🥣 الخلط: اضرب الأفوكادو مع الحليب والعسل والآيس كريم في الخلاط حتى يصبح ناعماً وكثيفاً",
            "🥛 التعديل: إذا كان ثقيلاً جداً، أضف قليلاً من الحليب",
            "🥜 التقديم: صبه في كأس، رش عليه مكسرات وعسل إضافي. مفيد جداً للطاقة"
        ]
    },
    {
        id: 1021,
        name: "حليب ذهبي (مشروب المناعة)",
        type: "drink",
        category: "healthy",
        calories: 93,
        protein: "4g",
        ingredients: ["حليب", "كركم", "زنجبيل", "فلفل أسود", "قرفة", "عسل"],
        quantities: [
            "2 كوب (480 مل) حليب (أو حليب جوز هند)",
            "1 ملعقة صغيرة (5 مل) كركم (مطحون أو طازج)",
            "½ ملعقة صغيرة زنجبيل مطحون",
            "¼ ملعقة صغيرة رشة فلفل أسود (مهم جداً لامتصاص الكركم) (1.25 مل)",
            "½ ملعقة صغيرة عود قرفة (2.5 مل)",
            "1 ملعقة كبيرة عسل للتحلية (21 جرام)"
        ],
        steps: [
            "🔥 الغلي: ضع الحليب والبهارات (ماعدا العسل) في قدر. سخن حتى يقترب من الغليان",
            "⏳ النقع: خفف النار جداً واتركه دقيقتين لتخرج النكهات والفوائد",
            "🍯 التحلية: أطفئ النار. صفّه في كوب، ثم أضف العسل (لا تغلِ العسل حتى لا يفقد خواصه)",
            "✨ التقديم: يشرب دافئاً قبل النوم للاسترخاء"
        ]
    },
    {
        id: 1022,
        name: "عصير طبقات (كوكتيل أصفهاني)",
        type: "drink",
        category: "healthy",
        calories: 86,
        protein: "3g",
        ingredients: ["مانجو", "فراولة", "موز", "حليب", "عصير برتقال"],
        quantities: [
            "كوب عصير مانجو (ثقيل ومركز)",
            "1 كوب كوب عصير فراولة (مجمدة ومخلوطة بقليل ماء) (240 مل)",
            "2 ملعقة كبيرة كوب عصير موز بالحليب (موز + حليب + سكر) (25 جرام)",
            "قطع فواكه صغيرة"
        ],
        steps: [
            "🎨 الكثافة: السر في الطبقات هو اختلاف الكثافة (السكر يجعل العصير أثقل)",
            "🥭 الطبقة 1: صب عصير المانجو الثقيل أولاً (أكثر سكر)",
            "🍓 الطبقة 2: بملعقة مقلوبة، صب عصير الفراولة ببطء شديد",
            "🍌 الطبقة 3: صب عصير الموز بالحليب في الأعلى",
            "🍍 التزيين: ضع قطع فواكه في سيخ خشبي فوق الكأس"
        ]
    },
    // === RECIPES FOR MISSING INGREDIENTS ===
    {
        id: 1023,
        name: "سلطة تونة بالذرة (مشبعة)",
        type: "main",
        category: "healthy",
        calories: 50,
        protein: "4g",
        ingredients: ["تونة", "ذرة", "فلفل ألوان", "بصل أخضر", "مايونيز لايت", "ليمون"],
        quantities: [
            "1 علبة تونة (مصفاة من الزيت/الماء)",
            "½ كوب ذرة حلوة (120 مل)",
            "¼ ملعقة صغيرة نصف حبة فلفل رومي أحمر (مكعبات) (1.25 مل)",
            "2 عود بصل أخضر (شرائح)",
            "الصوص: 2 ملعقة مايونيز (أو زبادي) + ليمون + فلفل أسود + شبت"
        ],
        steps: [
            "🐟 التجهيز: فتت التونة بالشوكة في وعاء",
            "🥗 الخلط: أضف الذرة والفلفل والبصل الأخضر",
            "🥣 الصوص: اخلط مكونات الصوص وصبها فوق السلطة",
            "🍽️ التقديم: قلب جيداً. قدمها مع شابورة أو داخل ساندويتش أو على وجه ورقة خس (للوكارب)"
        ]
    },
    {
        id: 1024,
        name: "ساندويش تونة (كلوب)",
        type: "main",
        category: "quick",
        calories: 312,
        protein: "18g",
        ingredients: ["تونة", "توست أسمر", "خس", "طماطم", "بيض مسلوق", "مايونيز"],
        quantities: [
            "علبة تونة صغيرة",
            "3 شرائح توست أسمر محمص",
            "1 بيضة مسلوقة (شرائح)",
            "أوراق خس وطماطم",
            "1 ملعقة مايونيز لايت + خردل"
        ],
        steps: [
            "🥪 الحشوة: اخلط التونة مع المايونيز والخردل و½ ملعقة صغيرة فلفل أسود (2.5 مل)",
            "🏗️ الطبقات: ادهن التوست. ضع طبقة خس وطماطم، ثم شريحة توست، ثم خليط التونة والبيض، ثم التوست الأخير",
            "🗡️ التقديم: اقطع الساندويش مثلثات وثبته بأعواد خشبية (Club Sandwich). قدمه مع شيبس"
        ]
    },
    {
        id: 1025,
        name: "مكرونة تونة (حمراء وحارة)",
        type: "main",
        category: "quick",
        calories: 308,
        protein: "15g",
        ingredients: ["مكرونة خواتم", "تونة", "طماطم", "ثوم", "فلفل حار", "زيتون"],
        quantities: [
            "200 جرام مكرونة صغيرة",
            "2 ملعقة كبيرة علبة تونة كبيرة (بالزيت) (30 مل)",
            "2 كوب (480 مل) عصير طماطم",
            "3 فصوص ثوم مهروس + فلفل أحمر مجروش",
            "2 ملعقة كبيرة شرائح زيتون أسود (30 مل)"
        ],
        steps: [
            "🌶️ الصوص: في زيت التونة نفسه، حمر الثوم والفلفل. أضف الطماطم واتركها تتسبك 10 دقائق",
            "🐟 التونة: أضف التونة (قطع كبيرة) والزيتون للصوص وقلب بحذر",
            "🍝 الخلط: اسلق المكرونة وصفيها. أضفها للصوص وقلب دقيقة",
            "🌿 التقديم: قدمها ساخنة مع رشة بقدونس. (أكلة سريعة ومنقذة)"
        ]
    },
    {
        id: 1026,
        name: "باذنجان مقلي (مقرمش)",
        type: "main",
        category: "side",
        calories: 50,
        protein: "1g",
        ingredients: ["باذنجان", "دقيق", "نشا", "ملح", "زيت"],
        quantities: [
            "2 حبة باذنجان رومي (شرائح طولية)",
            "خليط التغطية: كوب دقيق + 2 ملعقة نشا",
            "1 ملعقة صغيرة ملح (5 مل / 6 جرام)",
            "1 كوب زيت نباتي للقلي (240 مل / 220 جرام)"
        ],
        steps: [
            "💧 التعريق: رش شرائح الباذنجان بـ1 ملعقة صغيرة ملح (5 مل) واتركها في مصفاة 30 دقيقة لتنزل الماء المر (يمنع شرب الزيت)",
            "🌾 التغليف: جفف الباذنجان. غمسه في خليط الدقيق والنشا (النشا يعطي قرمشة)",
            "🔥 القلي: سخن الزيت جيداً. اقلِ الشرائح حتى تصبح ذهبية بنية",
            "🍽️ التقديم: قدمه مع صلصة زبادي وثوم (تغميسة)"
        ]
    },
    {
        id: 1027,
        name: "مسقعة باذنجان (بالبشاميل)",
        type: "main",
        category: "popular",
        calories: 362,
        protein: "34g",
        ingredients: ["باذنجان", "لحم مفروم", "بصل", "طماطم", "بشاميل", "جبن"],
        quantities: [
            "3 حبات باذنجان مقلي (حلقات)",
            "500 جرام عصاج لحم (لحم مفروم مطبوخ مع بصل وطماطم)",
            "2 كوب (480 مل) صلصة بشاميل خفيفة",
            "1 كوب جبن موزاريلا مبشور (115 جرام) للوجه"
        ],
        steps: [
            "🏗️ الطبقات: في صينية، رص نصف كمية الباذنجان. ضع طبقة اللحم المفروم. ضع باقي الباذنجان",
            "🥛 التغطية: صب صلصة البشاميل لتغطي الوجه بالكامل. رش الموزاريلا",
            "🔥 الفرن: اخبزها في فرن 200°C لمدة 20 دقيقة حتى يغلي البشاميل ويتحمر الوجه",
            "🍞 التقديم: تؤكل بالخبز وهي ساخنة، أو باردة (تتماسك أكثر)"
        ]
    },
    {
        id: 1028,
        name: "فطر مشوي (بالثوم والأعشاب)",
        type: "main",
        category: "healthy",
        calories: 50,
        protein: "3g",
        ingredients: ["فطر طازج", "ثوم", "زيت زيتون", "بقدونس", "ليمون", "زعتر"],
        quantities: [
            "300 جرام فطر طازج (يفضل بني)",
            "3 فصوص ثوم مهروس",
            "3 ملاعق زيت زيتون",
            "بقدونس طازج للتزيين",
            "عصرة ليمون",
            "رشة زعتر بري (أوريغانو)"
        ],
        steps: [
            "🍄 التنظيف: امسح الفطر بمنديل رطب (لا تغسله بالماء حتى لا يشربه ويصبح مطاطياً)",
            "🥣 التتبيل: اخلط الزيت والثوم والليمون والزعتر. قلب الفطر في التتبيلة 10 دقائق",
            "🔥 الشوي: في مقلاة ساخنة جداً، اشوِ الفطر (بدون تحريك كثير) حتى يتحمر من الجهتين",
            "🌿 التقديم: رشه بالبقدونس وقدمه فوراً كطبق جانبي أو مقبلات"
        ]
    },
    {
        id: 1029,
        name: "ستيك بصوص الفطر (كريمي)",
        type: "main",
        category: "international",
        calories: 252,
        protein: "9g",
        ingredients: ["ستيك لحم", "فطر", "زبدة", "كريمة طبخ", "ثوم", "روزماي"],
        quantities: [
            "2 شريحة ستيك (ريب أي أو سيرلوين) سمك 2 سم",
            "200 جرام فطر شرائح",
            "2 ملعقة كبيرة (30 مل) زبدة",
            "1 كوب (240 مل) كريمة طبخ",
            "2 فص ثوم + عود روزماري"
        ],
        steps: [
            "🥩 الشوي: جفف الستيك وتبله ب½ ملعقة صغيرة ملح (2.5 مل) + ¼ ملعقة صغيرة فلفل أسود (1.25 مل) خشن. اشوه في مقلاة حديد ساخنة جداً مع الزبدة والاعشاب (3 دقائق لكل وجه للميديم)",
            "🛌 الراحة: ارفع الستيك واتركه يرتاح 5 دقائق (مهم جداً للعصارة)",
            "🥣 الصوص: في نفس المقلاة (لا تغسلها)، أضف زبدة وحمر الفطر حتى يصبح ذهبياً. أضف الثوم ثم الكريمة واتركها تغلي حتى تثقل",
            "🍽️ التقديم: صب صوص الفطر الكريمي فوق الستيك وقدمه مع بطاطس مهروسة"
        ]
    },
    {
        id: 1030,
        name: "سلطة خضراء",
        type: "main",
        category: "healthy",
        calories: 122,
        protein: "1g",
        ingredients: ["خس", "خيار", "طماطم", "بصل", "زيت زيتون"],
        quantities: ["خس مفروم", "خيار", "طماطم", "بصل أحمر شرائح", "زيت زيتون"],
        steps: [
            "1 ملعقة كبيرة اخلط جميع الخضار. (15 مل)",
            "تبلها بـ1 ملعقة صغيرة ملح (5 مل) والليمون والزيت."
        ]
    },
    {
        id: 1031,
        name: "سلطة سيزر دجاج (الصوص الأصلي)",
        type: "main",
        category: "international",
        calories: 336,
        protein: "40g",
        ingredients: ["خس روماني", "دجاج مشوي", "جبن بارميزان", "خبز محمص (كروتون)", "بقصم"],
        quantities: [
            "خس روماني مقطع كبير (مقرمش)",
            "صدر دجاج مشوي ومقطع شرائح",
            "جبن بارميزان مبشور طازج",
            "2 شريحة خبز محمص (كروتون) بالثوم",
            "2 فص الصوص: (مايونيز، ثوم، ليمون، خردل ديجون، زيت زيتون، أنشوجة اختياري) (6 جرام)"
        ],
        steps: [
            "🥣 الصوص: اخلط مكونات الصوص جيداً حتى يتكون مستحلب كريمي",
            "🥗 الدمج: في وعاء كبير، قلب الخس مع نصف كمية الصوص والجبن (ليغطي كل ورقة)",
            "🍗 التقديم: ضع الخس في الطبق، رتب الدجاج والخبز المحمص فوقه",
            "🧀 اللمسة الأخيرة: رش باقي الجبن وقليل من الصوص على الوجه"
        ]
    },
    {
        id: 1032,
        name: "عصير عنب",
        type: "drink",
        category: "healthy",
        calories: 131,
        protein: "1g",
        ingredients: ["عنب", "ماء", "سكر"],
        quantities: ["2 كوب (480 مل) عنب", "½ كوب ماء (120 مل)", "سكر حسب الرغبة"],
        steps: ["1 ملعقة كبيرة اخلط العنب في الخلاط. (15 مل)", "صفه وقدمه بارداً."]
    },
    {
        id: 1033,
        name: "2 ملعقة كبيرة كيكة الجزر (مع كريمة الجبن) (30 مل)",
        type: "dessert",
        category: "international",
        calories: 442,
        protein: "14g",
        ingredients: ["جزر", "دقيق", "سكر بني", "بيض", "قرفة", "عين جمل", "زيت"],
        quantities: [
            "2 كوب (480 مل) جزر مبشور ناعم",
            "2 كوب دقيق (240 جرام)",
            "1 كوب سكر (200 جرام) بني + نصف كوب سكر أبيض",
            "3 بيضات",
            "1 كوب (240 مل) زيت نباتي",
            "½ ملعقة صغيرة ملعقة قرفة + جوزة الطيب (2.5 مل)",
            "½ كوب عين جمل مجروش (جوز) (120 مل)"
        ],
        steps: [
            "🥣 السوائل: اخفق البيض والسكر والزيت والفانيليا حتى يتجانش الخليط",
            "🥕 الجزر: أضف الجزر المبشور وعين الجمل وقلب",
            "🌾 الجوافة: انخل الدقيق والقرفة والبيكنج بودر وأضفهم للخليط. قلب ببطء",
            "🔥 الخبز: صب الخليط في قالب. اخبز في فرن 180°C لمدة 45 دقيقة",
            "🧁 التغطية: بعد أن تبرد تماماً، غطها بكريمة الجبن (جبن كريمي + زبدة + سكر بودرة)"
        ]
    },
    {
        id: 1034,
        name: "آيس شيكن نسكافيه (رغوة كثيفة)",
        type: "drink",
        category: "quick",
        calories: 54,
        protein: "2g",
        ingredients: ["نسكافيه", "سكر", "ماء بارد", "حليب", "ثلج"],
        quantities: [
            "2 ملعقة كبيرة (30 مل) نسكافيه (قهوة سريعة التحضير)",
            "2 ملعقة كبيرة (30 مل) سكر (أو عدّل حسب ذوقك)",
            "3 ملاعق كبيرة (45 مل) ماء بارد جداً",
            "كوب حليب بارد",
            "كوب ثلج"
        ],
        steps: [
            "🌪️ الرغوة: في قارورة ماء فارغة (أو شيكر)، ضع النسكافيه والسكر والماء. رجها بقوة لمدة دقيقتين حتى تتكون رغوة كثيفة فاتحة اللون",
            "🥛 التجهيز: املأ الكوب بالثلج. صب الحليب البارد فوق الثلج",
            "☕ التقديم: صب الرغوة الكثيفة فوق الحليب ببطء. ستحصل على طبقات جميلة. حركها واستمتع"
        ]
    },
    {
        id: 1035,
        name: "شوربة الفطر بالكريمة (فندقية)",
        type: "main",
        category: "international",
        calories: 271,
        protein: "18g",
        ingredients: ["فطر طازج", "كريمة طبخ", "بصل", "زبدة", "مرق دجاج", "دقيق", "زعتر"],
        quantities: [
            "500 جرام فطر طازج (بني وأبيض)",
            "1 بصلة مفرومة ناعم + فص ثوم",
            "3 ملاعق زبدة + 2 ملعقة دقيق",
            "3 أكواب مرق دجاج (أو ماء)",
            "1 كوب (240 مل) كريمة طبخ",
            "رشة زعتر بري (Thyme)"
        ],
        steps: [
            "🍄 التحمير: حمر البصل والثوم في الزبدة. أضف الفطر (احتفظ ببعض الشرائح للتزيين) وقلب حتى يذبل",
            "🌾 الربط: أضف الدقيق وقلب دقيقة. أضف المرق بالتدريج مع التحريك",
            "🔥 الغلي: اتركها تغلي 15 دقيقة على نار هادئة",
            "🥣 القوام: اضرب الشوربة بالخلاط اليدوي (Hand Blender) حتى تنعم. أضف الكريمة والزعتر واتركها تغلي دقيقة",
            "🍽️ التقديم: زين بشرائح الفطر المحمرة والبقدونس"
        ]
    },
    {
        id: 1036,
        name: "محشي كوسة (بالنعناع والثوم)",
        type: "main",
        category: "popular",
        calories: 176,
        protein: "16g",
        ingredients: ["كوسة صغيرة", "أرز مصري", "لحم مفروم", "طماطم", "نعناع يابس"],
        quantities: [
            "1 كيلو كوسة صغيرة (محفورة)",
            "الحشو: كوب أرز مصري + 200 جرام لحم مفروم + 1 ملعقة صغيرة بهارات مشكلة (5 مل / 3 جرام)",
            "2 فص المرق: عصير طماطم + ملعقة معجون + ثوم مهروس + نعناع يابس + ليمون (6 جرام)"
        ],
        steps: [
            "🥒 الحشو: اخلط الأرز مع اللحم (نيء) و½ ملعقة صغيرة بهارات مشكلة (2.5 مل). احشِ الكوسة (اترك مسافة 1 سم للأرز ليتمدد)",
            "🥘 الترتيب: رص الكوسة في قدر. ثبتها بطبق ثقيل",
            "🍅 الطبخ: صب المرق (طماطم ومعجون وماء) حتى يغمرها. اطبخها 40 دقيقة",
            "🌿 النكهة: قبل أن ترفعها بدقائق، أضف الثوم المهروس والنعناع اليابس وعصرة ليمون (سر النكهة)",
            "🍽️ التقديم: قدمها ساخنة مع المرق"
        ]
    },
    {
        id: 1037,
        name: "شوربة خضار صحية (بدون زيت)",
        type: "main",
        category: "healthy",
        calories: 50,
        protein: "1g",
        ingredients: ["كوسة", "جزر", "بطاطس", "فاصوليا", "كرفس", "شوفان"],
        quantities: [
            "2 كوب خضار مشكلة (300 جرام)",
            "عود كرفس (للنكهة)",
            "4 أكواب ماء أو مرق خضار",
            "2 ملعقة شوفان (للقوام)",
            "½ ملعقة صغيرة رشة كمون وكركم (2.5 مل)"
        ],
        steps: [
            "🥕 السلق: ضع الماء والخضار في قدر. اتركها تغلي 15 دقيقة",
            "🌾 الإضافة: أضف الشوفان و½ ملعقة صغيرة بهارات مشكلة (2.5 مل). اتركها 5 دقائق أخرى حتى تنضج الخضار وتثقل الشوربة قليلاً",
            "🥣 التقديم: اضرب نصف الكمية بالخلاط وأعدها للقدر (تكنيك المطاعم لقوام كثيف بدون كريمة)",
            "🍋 اللمسة: قدمها مع عصرة ليمون وخبز أسمر"
        ]
    },
    {
        id: 1038,
        name: "فطائر سبانخ (عجينة قطنية)",
        type: "main",
        category: "popular",
        calories: 1200,
        protein: "8g",
        ingredients: ["دقيق", "سبانخ", "بصل", "سماق", "ليمون", "زيت زيتون"],
        quantities: [
            "3 أكواب دقيق (للعجينة)",
            "الحشو: 500 جرام سبانخ مفرومة",
            "بصلة كبيرة مفرومة + 3 ملاعق سماق بلدي",
            "عصير 2 ليمونة + ربع كوب زيت زيتون",
            "¼ كوب مكسرات (صنوبر أو جوز) اختياري (35 جرام)"
        ],
        steps: [
            "🍃 الحشو: افرك السبانخ بـ1 ملعقة صغيرة ملح (5 مل) ثم اعصرها جيداً بيدك للتخلص من الماء. اخلطها مع البصل والسماق والليمون والزيت",
            "🥟 العجينة: افرد العجينة دوائر. ضع ملعقة حشوة في الوسط. أغلقها على شكل مثلث (اضغط الأطراف جيداً)",
            "🔥 الخبز: ادهن الوجه بزيت زيتون. اخبزها في فرن ساخن (220°C) لمدة 12-15 دقيقة حتى تتحمر",
            "🍋 التقديم: تقدم دافئة أو باردة. ممتازة للفطور أو العشاء"
        ]
    },
    {
        id: 1039,
        name: "بطاطس مقلية (ذهبية ومقرمشة)",
        type: "main",
        category: "quick",
        calories: 244,
        protein: "4g",
        ingredients: ["بطاطس", "خل", "زيت", "ملح", "بابريكا"],
        quantities: [
            "3 حبات بطاطس (نوع خاص للقلي)",
            "1 ملعقة كبيرة ملعقة خل أبيض (للقرمشة) (15 مل)",
            "1.5 كوب زيت نباتي للقلي العميق (360 مل / 330 جرام)",
            "2 فص بهارات البطاطس: ملح + بابريكا + ثوم بودرة (6 جرام)"
        ],
        steps: [
            "🍟 التقطيع: قطع البطاطس أصابع متساوية السماكة",
            "❄️ النقع: انقعها في ماء بارد جداً وخل لمدة 30 دقيقة (لسحب النشا)",
            "🔥 القلي الأول: اقلها في زيت متوسط الحرارة حتى تنضج دون أن تتحمر. ارفعها وبردها",
            "🔥 القلي الثاني: اقلها في زيت حامي جداً حتى تصبح ذهبية ومقرمشة",
            "🧂 التقديم: رش البهارات فوراً وهي ساخنة"
        ]
    },
    {
        id: 1040,
        name: "شوربة بطاطس بالجبن (كريمية)",
        type: "main",
        category: "heavy",
        calories: 326,
        protein: "17g",
        ingredients: ["بطاطس", "بصل", "حليب", "زبدة", "جبن شيدر", "بصل أخضر"],
        quantities: [
            "3 حبات بطاطس مكعبات صغيرة",
            "1 بصلة مفرومة",
            "2 كوب (480 مل) مرق دجاج + 1 كوب حليب",
            "½ كوب جبن شيدر مبشور (120 مل)",
            "شرائح لحم مقدد (بيكون) مقرمش للتزيين (اختياري)"
        ],
        steps: [
            "🥔 السلق: قلب البصل في الزبدة. أضف البطاطس والمرق. اتركها تغلي حتى تنضج البطاطس تماماً",
            "🥛 الهرس: اهرس نصف كمية البطاطس داخل القدر (لثقل القوام) واترك الباقي قطع",
            "🧀 الإغناء: أضف الحليب والجبن. قلب حتى يذوب الجبن",
            "🍲 التقديم: زين بالبصل الأخضر والبيكون المقرمش والجبن"
        ]
    },
    {
        id: 1041,
        name: "عصير فراولة طبيعي (منعش)",
        type: "drink",
        category: "healthy",
        calories: 90,
        protein: "1g",
        ingredients: ["فراولة", "ماء بارد", "سكر", "ليمون", "ثلج"],
        quantities: [
            "2 كوب (480 مل) فراولة طازجة (منظفة)",
            "1 كوب (240 مل) ماء بارد (أو حليب عدّل حسب ذوقك)",
            "2 ملعقة كبيرة سكر أو عسل للتحلية (25 جرام)",
            "عصرة نصف ليمونة (للحفاظ على اللون الأحمر)"
        ],
        steps: [
            "🍓 الخلط: في الخلاط، ضع الفراولة والماء والسكر والليمون",
            "🌪️ القوام: اخلط جيداً. (تلميح: أضف بضع ورقات نعناع لانتعاش مضاعف)",
            "🥤 التقديم: قدمه مع مكعبات الثلج. يمكن تزيينه بقطعة فراولة على حافة الكأس"
        ]
    },
    {
        id: 1042,
        name: "شاي أخضر مغربي (أتاي)",
        type: "drink",
        category: "healthy",
        calories: 57,
        protein: "1g",
        ingredients: ["شاي أخضر حبوب", "نعناع طازج", "سكر", "ماء مغلي"],
        quantities: [
            "ملعقة كبيرة شاي أخضر",
            "1 ملعقة كبيرة باقة نعناع طازج وكبيرة (مغسولة) (4 جرام)",
            "2 ملعقة كبيرة سكر حسب الرغبة (الأصل أن يكون حلواً) (25 جرام)",
            "3 أكواب ماء مغلي"
        ],
        steps: [
            "🌿 الغسيل: ضع الشاي في البراد. صب عليه قليل من الماء المغلي وحركه ثم تخلص من الماء (لغسل الشاي وتقليل المرارة)",
            "🔥 الطبخ: أضف الماء المغلي والسكر. ضعه على النار يغلي دقيقة واحدة",
            "🍃 النعناع: أطفئ النار. أكبس النعناع داخل البراد",
            "🍵 التقديم: (التكنيك المغربي) صب كأساً وأعده للبراد مرتين لخلط المكونات. صب الشاي من مسافة عالية لتكوين الرغوة (الكشكوشة)"
        ]
    },
    // === FINAL MISSING INGREDIENTS ===
    {
        id: 1043,
        name: "شوفان بالحليب والموز (فطور الطاقة)",
        type: "main",
        category: "healthy",
        calories: 127,
        protein: "7g",
        ingredients: ["شوفان كامل", "حليب", "موز", "عسل", "قرفة"],
        quantities: [
            "½ كوب شوفان (حبة كاملة) (120 مل)",
            "1.5 كوب (360 مل) حليب (أو حليب لوز)",
            "1 موزة ناضجة ومهروسة",
            "رشة قرفة + مكسرات للتزيين"
        ],
        steps: [
            "🥣 الطبخ: اخلط الشوفان والحليب والقرفة في قدر. اطبخ على نار هادئة 10 دقائق",
            "🍌 القوام: قبل أن تطفئ النار، أضف الموز المهروس وقلب (يعطي قوام كريمي وحلاوة طبيعية)",
            "🍯 التقديم: صبه في طبق. زين بشرائح موز وعسل وجوز ولوز"
        ]
    },
    {
        id: 1044,
        name: "كوكيز الشوفان الصحي (3 مكونات)",
        type: "dessert",
        category: "healthy",
        calories: 487,
        protein: "23g",
        ingredients: ["شوفان", "موز", "زبيب", "قرفة"],
        quantities: [
            "2 كوب (480 مل) شوفان (سريع التحضير)",
            "2 حبة موز كبيرة ناضجة جداً (سوداء القشرة)",
            "2 ملعقة كبيرة نصف كوب زبيب أو حبيبات شوكولاتة داكنة (اختياري) (20 جرام)",
            "½ ملعقة صغيرة ملعقة قرفة (2.5 مل)"
        ],
        steps: [
            "🍌 الهرس: اهرس الموز جيداً بالشوكة حتى يصبح سائلاً",
            "🥣 الخلط: أضف الشوفان والقرفة والزبيب. قلب حتى يتماسك الخليط (إذا كان جافاً انتظر 5 دقائق ليتشرب الشوفان)",
            "🍪 التشكيل: شكل كرات واضغطها في صينية مدهونة",
            "🔥 الخبز: فرن 180°C لمدة 15 دقيقة حتى تتماسك وتتحمر من الأسفل. (سناك صحي ومثالي للأطفال)"
        ]
    },
    {
        id: 1045,
        name: "سموذي بول (Smoothie Bowl)",
        type: "main",
        category: "healthy",
        calories: 62,
        protein: "8g",
        ingredients: ["فراولة مجمدة", "موز مجمد", "زبادي يوناني", "جرانولا", "فواكه"],
        quantities: [
            "1 كوب (240 مل) فراولة وموز (مجمدة مسبقاً)",
            "½ كوب زبادي يوناني (للقوام الثقيل) (120 مل)",
            "1 ملعقة كبيرة ملعقة عسل (21 جرام)",
            "للتزيين: جرانولا، جوز هند، شرائح كيوي"
        ],
        steps: [
            "❄️ الخلط: اضرب الفاكهة المجمدة مع الزبادي في محضرة الطعام (وليس الخلاط العادي) للحصول على قوام مثل الآيس كريم",
            "🥣 التقديم: صب الخليط في زبدية عميقة",
            "🎨 الفن: رتب الجرانولا والفواكه وجوز الهند في خطوط مستقيمة ومنظمة فوق السموذي. صورها قبل الأكل!"
        ]
    },
    {
        id: 1046,
        name: "سلطة زبادي بالخيار (تساسيكي)",
        type: "main",
        category: "healthy",
        calories: 216,
        protein: "14g",
        ingredients: ["زبادي", "خيار", "نعناع مجفف", "ثوم", "زيت زيتون"],
        quantities: [
            "2 كوب (480 مل) زبادي طازج",
            "2 حبة خيار مبشور",
            "1 فص ثوم مهروس ناعم جداً",
            "1 ملعقة كبيرة ملعقة نعناع يابس + ملح (4 جرام)",
            "زيت زيتون للوجه"
        ],
        steps: [
            "🥒 التجهيز: اعصر الخيار المبشور بيدك للتخلص من الماء الزائد (مهم جداً حتى لا يفصل الزبادي)",
            "🥣 الخلط: اخلط الزبادي مع الثوم و1 ملعقة صغيرة ملح (5 مل) والنعناع",
            "❄️ الدمج: أضف الخيار وقلب. برده في الثلاجة ساعة لتتجانس النكهات",
            "🌿 التقديم: قدمه في طبق وزينه بزيت الزيتون ورشة نعناع. مثالي مع البرياني والمشاوي"
        ]
    },
    {
        id: 1047,
        name: "تيراميسو (الطريقة الأصلية)",
        type: "dessert",
        category: "international",
        calories: 1200,
        protein: "55g",
        ingredients: ["بسكويت ليدي فينجر", "جبن ماسكاربوني", "بيض", "سكر", "قهوة اسبريسو", "كاكاو"],
        quantities: [
            "20 قطعة بسكويت ليدي فينجر (أصابع الست)",
            "500 جرام جبن ماسكاربوني (بارد)",
            "3 صفار بيض + نصف كوب سكر",
            "1 كوب (240 مل) قهوة اسبريسو قوية (باردة)",
            "كاكاو بودرة خام للتزيين"
        ],
        steps: [
            "🥚 الكريمة: اخفق صفار البيض مع السكر في حمام مائي حتى يفتح لونه. اتركه يبرد ثم اخلطه مع الماسكاربوني برفق",
            "☕ التغميس: غمس البسكويت بسرعة (ثانية واحدة) في القهوة الباردة (لا تتركه يتشرب كثيراً)",
            "🏗️ الترتيب: في صينية، رص طبقة بسكويت، ثم طبقة كريمة، ثم بسكويت، واختم بالكريمة",
            "❄️ التبريد: غطها وبردها 6 ساعات على الأقل (يفضل ليلة كاملة) لتتماسك النكهات",
            "🍫 التقديم: رش الكاكاو البودرة بغزارة على الوجه قبل التقديم مباشرة"
        ]
    },
    {
        id: 1048,
        name: "دايناميت شرمب (حار ومقرمش)",
        type: "main",
        category: "international",
        calories: 1200,
        protein: "55g",
        ingredients: ["روبيان", "نشا", "بيض", "صوص حار", "مايونيز", "عسل"],
        quantities: [
            "500 جرام روبيان منظف (بدون ذيل)",
            "1 ملعقة كبيرة خليط القلي: بيضة + كوب نشا (للقرمشة) (15 مل)",
            "1 ملعقة كبيرة الصوص: نصف كوب مايونيز + ثلث كوب صوص فرنسي + شطة (سيراتشا) + ملعقة عسل (21 جرام)",
            "بصل أخضر للتزيين"
        ],
        steps: [
            "🍤 القلي: غمس الروبيان في البيض ثم النشا. اقليه في زيت غزير حامي حتى يصبح ذهبياً ومقرمشاً. صفه جيداً",
            "🥣 الصوص: اخلط مقادير الصوص في وعاء كبير",
            "🌪️ التقليب: ضع الروبيان المقلي في وعاء الصوص وقلب بسرعة ليغطيه تماماً",
            "🥗 التقديم: قدمه فوراً في كأس به خس (آيسبرج). زين بالبصل الأخضر والسمسم"
        ]
    },
    {
        id: 1049,
        name: "روبيان بالزبدة والليمون (كيجن)",
        type: "main",
        category: "international",
        calories: 341,
        protein: "32g",
        ingredients: ["روبيان جامبو", "زبدة", "ثوم", "ليمون", "بهارات كيجن", "ذرة"],
        quantities: [
            "500 جرام روبيان جامبو (بقشره أو مقشر)",
            "100 جرام زبدة",
            "5 فصوص ثوم مهروس",
            "2 ملعقة بهارات كيجن (Cajun)",
            "قطع ذرة مسلوقة"
        ],
        steps: [
            "🥘 الصوص: ذوب الزبدة في قدر. أضف الثوم وقلب حتى تظهر رائحته. أضف بهارات الكيجن وعصير الليمون",
            "🍤 الطبخ: أضف الروبيان والذرة للصوص. غط القدر واتركه 10 دقائق على نار متوسطة حتى ينضج الروبيان (يصبح برتقالياً)",
            "🍽️ التقديم: قدمه في الكيس الحراري (ستايل المطاعم) أو في طبق كبير مع أرز أبيض"
        ]
    },
    {
        id: 1050,
        name: "حمص بيروتي (حار)",
        type: "main",
        category: "popular",
        calories: 492,
        protein: "25g",
        ingredients: ["حمص مطحون", "بقدونس", "ثوم", "فلفل حار", "طماطم", "كمون"],
        quantities: [
            "2 كوب (480 مل) حمص بالطحينة (محضر مسبقاً)",
            "2 ملعقة بقدونس مفروم",
            "2 فص ثوم مهروس (إضافي)",
            "1 فلفل أخضر حار مفروم ناعم",
            "طماطم مفرومة ناعم للوجه",
            "½ ملعقة صغيرة زيت زيتون وكمون (2.5 مل)"
        ],
        steps: [
            "🥣 الخلط: في وعاء، اخلط الحمص الجاهز مع الثوم والفلفل الحار ونصف كمية البقدونس",
            "🍋 التتبيل: أضف عصير ليمون وزد الطحينة إذا لزم الأمر ليصبح القوام كريمياً",
            "🍅 التقديم: افرد الحمص في الطبق. زين الوجه بالطماطم والبقدونس والكمون وزيت الزيتون الغزير"
        ]
    },
    {
        id: 1051,
        name: "شوربة الحمص (لبلبي)",
        type: "main",
        category: "healthy",
        calories: 310,
        protein: "25g",
        ingredients: ["حمص حب", "كمون", "ليمون", "شطة", "خبز", "زيت زيتون"],
        quantities: [
            "2 كوب (480 مل) حمص مسلوق (مع مائه)",
            "½ ملعقة صغيرة ملعقة كبيرة كمون (2.5 مل)",
            "عصير ليمون",
            "شطة بودرة (عدّل حسب ذوقك)",
            "2 شريحة قطع خبز محمص (اختياري)",
            "2 ملعقة كبيرة زيت زيتون (30 مل)"
        ],
        steps: [
            "🔥 الغلي: سخن الحمص مع مائه في قدر. أضف الكمون و2 ملعقة صغيرة ملح (10 مل)",
            "🥣 الهرس: في زبدية التقديم، ضع قليلاً من الخبز. صب فوقه الحمص الساخن والماء",
            "🍋 التتبيل: اهرس الحمص قليلاً بالملعقة. أضف الليمون والشطة وزيت الزيتون",
            "🥚 إضافة: يمكن إضافة بيضة مسلوقة (نصف استواء) على الوجه (الطريقة التونسية/العراقية)"
        ]
    },
    {
        id: 1052,
        name: "قهوة لوز حجازية (حلوة)",
        type: "drink",
        category: "popular",
        calories: 253,
        protein: "9g",
        ingredients: ["حليب", "دقيق أرز", "لوز", "هيل", "سكر"],
        quantities: [
            "4 أكواب حليب سائل",
            "3 ملاعق كبيرة (45 مل) دقيق أرز (أو نشا)",
            "½ كوب لوز حجازي (محمص ومجروش) (120 مل)",
            "2 ملعقة كبيرة نصف كوب سكر (25 جرام)",
            "3 حبات ملعقة صغيرة هيل مطحون"
        ],
        steps: [
            "🥛 الطبخ: ذوب دقيق الأرز في الحليب البارد. ضعه على النار مع السكر والهيل",
            "🔥 التحريك: استمر بالتحريك حتى يغلي ويثقل القوام قليلاً (تصبح بيضاء وكثيفة)",
            "🥜 اللوز: أضف اللوز المجروش واتركها تغلي دقيقة",
            "☕ التقديم: صبها في أكواب. تؤكل بالملعقة أو تشرب ساخنة (مشروب شتوي مشهور)"
        ]
    },
    {
        id: 1053,
        name: "آيس كريم عربي (بوظة بالمستكة)",
        type: "dessert",
        category: "popular",
        calories: 292,
        protein: "12g",
        ingredients: ["حليب", "سحلب بودرة", "مستكة", "قشطة", "فستق حلبي"],
        quantities: [
            "1 لتر حليب كامل الدسم",
            "3 ملاعق سحلب صافي (للمط)",
            "2 ملعقة كبيرة فصين مستكة مطحونة مع سكر (25 جرام)",
            "1 كوب (240 مل) قشطة (قيمر)",
            "2 ملعقة كبيرة فستق حلبي مجروش للتغطية (15 جرام)"
        ],
        steps: [
            "🥛 الغلي: اغلِ الحليب مع السكر. أضف السحلب المذاب في قليل من الحليب البارد بالتدريج",
            "🌪️ المط: قلب باستمرار على نار هادئة. ارفع الخليط بالملعقة ونزله (عملية المط) لمدة 10 دقائق",
            "🍂 النكهة: أضف المستكة والقشطة. قلب دقيقتين ثم أطفئ النار. برد الخليط تماماً",
            "❄️ التجميد: ضعه في الفريزر. كل 45 دقيقة أخرجه وحركه بالشوكة (كرر ذلك 4 مرات) لمنع تبلور الثلج وللحصول على القوام المطاطي",
            "🥜 التقديم: قدمه كرات مرشوشة بالفستق الحلبي الغزير"
        ]
    },
    {
        id: 1054,
        name: "سلطة جرجير بالخوخ والرمان",
        type: "main",
        category: "healthy",
        calories: 263,
        protein: "5g",
        ingredients: ["جرجير صغيرة", "خوخ", "رمان", "جوز", "دبس رمان", "جبن فيتا"],
        quantities: [
            "حزمتين جرجير (بيبي روكا)",
            "2 حبة خوخ مشوي (شرائح)",
            "½ كوب حبوب رمان (120 مل)",
            "½ كوب جوز (عين جمل) محمص (120 مل)",
            "مكعبات جبن فيتا",
            "2 ملعقة كبيرة الصوص: زيت زيتون + دبس رمان + ليمون + سماق (30 مل)"
        ],
        steps: [
            "🍑 الشوي: اشو شرائح الخوخ قليلاً في مقلاة (اختياري لتعزيز الطعم)",
            "🥗 الترتيب: افرش الجرجير في الطبق. وزع الخوخ والرمان والجوز والجبن فوقه",
            "🥣 الصوص: اخلط مكونات الصوص. صبه وقت التقديم فقط (حتى لا يذبل الجرجير)",
            "✨ التقديم: سلطة فاخرة تناسب العزائم والمناسبات"
        ]
    },
    {
        id: 1055,
        name: "سعودي شامبانيا (كوكتيل الحفلات)",
        type: "drink",
        category: "popular",
        calories: 275,
        protein: "2g",
        ingredients: ["عصير تفاح", "ماء غازي", "تفاح", "برتقال", "ليمون", "نعناع"],
        quantities: [
            "2 لتر عصير تفاح فوار (غازي) أو عادي",
            "1 لتر ماء غازي (باريخ/بيرييه) سادة",
            "شرائح رقيقة: تفاح أحمر، تفاح أخضر، برتقال، ليمون",
            "1 ملعقة كبيرة أوراق نعناع طازجة كثيرة (4 جرام)",
            "ثلج كثير"
        ],
        steps: [
            "🍎 الكبس: ضع الفواكه والنعناع في جيك زجاجي كبير. اضغط عليها قليلاً لتخرج النكهة",
            "🥂 الخلط: صب عصير التفاح (يجب أن يكون بارداً جداً)",
            "⌚ النقع: اتركه في الثلاجة 15 دقيقة (مهم جداً لامتزاج النكهات)",
            "💧 الغازات: قبل التقديم مباشرة، صب الماء الغازي والثلج",
            "🍹 التقديم: قدمه في كؤوس واحرص على وضع قطعة فاكهة في كل كأس"
        ]
    },
    {
        id: 1056,
        name: "برجر دجاج مقرمش (ستايل مطاعم)",
        type: "main",
        category: "main",
        calories: 264,
        protein: "23g",
        ingredients: ["صدور دجاج", "لبن رائب", "دقيق", "بقسماط بانكو", "خس", "جبن"],
        quantities: [
            "صدور دجاج مدقوقة (سمك موحد)",
            "2 فص نقع الدجاج: كوب لبن رائب + ماء مخلل + بابريكا + ثوم بودرة (ساعتين) (6 جرام)",
            "½ ملعقة صغيرة التغطية: دقيق + نشا + بهارات (2.5 مل)",
            "1 ملعقة كبيرة صوص: مايونيز + سيراتشا + عسل (21 جرام)",
            "2 شريحة خبز بريوش، خس، مخلل، جبن شيدر"
        ],
        steps: [
            "🍗 القلي: اخرج الدجاج من اللبن، ضعه في الدقيق (واضغط بقوة لتكوين حراشف)، ثم اقليه في زيت غزير (170°C) حتى يصبح ذهبياً (6 دقائق)",
            "🧊 التحضير: حمص الخبز بالزبدة. ادهنه بالصوص",
            "🍔 البناء: مخلل، دجاج مقرمش، جبن (يذوب بحرارة الدجاج)، خس",
            "🤤 التقديم: قدمه فوراً مع بطاطس مقلية"
        ]
    },
    {
        id: 1057,
        name: "بيتزا رانش الدجاج (الأمريكية)",
        type: "main",
        category: "international",
        calories: 90,
        protein: "5g",
        ingredients: ["عجينة بيتزا", "صوص رانش", "دجاج مشوي", "بيكون", "طماطم", "هلابينو"],
        quantities: [
            "عجينة بيتزا سميكة الأطراف",
            "½ كوب صوص رانش (بديل لصلصة الطماطم) (120 مل)",
            "2 فص دجاج مشوي مكعبات متبل (بابريكا وثوم) (6 جرام)",
            "1 كوب جبن موزاريلا مبشور (115 جرام)",
            "قطع طماطم صغيرة + هلابينو (اختياري)"
        ],
        steps: [
            "🥄 الأساس: افرد العجينة. ادهنها بصوص الرانش (وليس الطماطم)",
            "🧀 الحشو: وزع الدجاج والموزاريلا والشيدر",
            "🔥 الخبز: اخبزها في فرن ساخن جداً (أعلى حرارة) على الرف السفلي (7-10 دقائق)",
            "🌿 الإنهاء: فور خروجها، رش صوص رانش إضافي وبصل أخضر"
        ]
    },
    // === ABSOLUTELY FINAL RECIPES ===
    {
        id: 1058,
        name: "تميس بُر (صحي)",
        type: "main",
        category: "healthy",
        calories: 664,
        protein: "4g",
        ingredients: ["دقيق بر", "خميرة", "حليب بودرة", "سمن", "سمسم", "حبة سوداء"],
        quantities: [
            "3 أكواب دقيق بر (كامل)",
            "3 ملاعق حليب بودرة (لطراوة العجين)",
            "2 ملعقة كبيرة ملعقة كبيرة خميرة + ملعقة سكر (25 جرام)",
            "2 ملعقة كبيرة ربع كوب سمن أو زيت زيتون (30 مل)",
            "للوجه: سمسم وحبة سوداء"
        ],
        steps: [
            "🥣 العجن: اخلط الدقيق والخميرة والحليب. أضف الماء الدافئ والسمن واعجن 10 دقائق حتى تصبح لينة",
            "🛌 التخمير: غطها واتركها ساعة تتضاعف",
            "🥖 التشكيل: شكلها أقراص كبيرة. احدث ثقوباً بالشوكة أو بأطراف أصابعك (الشكل التقليدي للتميس)",
            "🔥 الخبز: رشها بالماء (بخاخ) ثم السمسم. اخبزها في فرن حامي جداً (250°C) لمدة 8-10 دقائق"
        ]
    },
    {
        id: 1059,
        name: "أصابع الدجاج (تشيكن تندرز)",
        type: "main",
        category: "quick",
        calories: 326,
        protein: "43g",
        ingredients: ["صدور دجاج", "كورن فليكس", "حليب", "دقيق", "خردل"],
        quantities: [
            "500 جرام صدور دجاج مقطعة أصابع طولية",
            "1 كوب (240 مل) كورن فليكس مطحون خشن (أو بقسماط بانكو)",
            "2 بيض مخفوق مع ملعقة خردل (ماسترد) وحليب",
            "2 فص كوب دقيق متبل (بابريكا، ثوم، ملح) (6 جرام)",
            "2 ملعقة كبيرة زيت للقلي أو بخاخ للفرن (30 مل)"
        ],
        steps: [
            "🍗 التغليف: دحرج الدجاج في الدقيق، ثم البيض، ثم الكورن فليكس (اضغط جيداً ليلتصق)",
            "❄️ التبريد: ضعه في الفريزر 15 دقيقة (سر ثبات القشرة)",
            "🔥 الطهي: اقليه في زيت غزير أو ادهنه بالزيت واخبزه في الفرن/القلاية الهوائية (180°C لـ 15 دقيقة)",
            "🍯 التقديم: قدمه مع صوص العسل والخردل (Honey Mustard)"
        ]
    },
    {
        id: 1060,
        name: "سمبوسة لحم (العجينة المنزلية)",
        type: "main",
        category: "popular",
        calories: 383,
        protein: "23g",
        ingredients: ["دقيق", "لحم مفروم", "شبت", "كزبرة", "بصل أخضر", "زيت"],
        quantities: [
            "العجينة: 2 كوب دقيق (240 جرام) + ربع كوب زيت + ماء وملح (تعجن قاسية قليلاً)",
            "الحشو: 250 جرام لحم مفروم مطبوخ (ناشف)",
            "2 ملعقة كبيرة مفرومة خضار الحشو: شبت، كزبرة، بصل أخضر (تضاف بعد أن يبرد اللحم) (8 جرام)",
            "بيض مسلوق مقطع صغير (اختياري - الطريقة الحجازية)"
        ],
        steps: [
            "🥟 العجينة: اعجن المكونات واتركها ترتاح ساعة. افردها رقيقة جداً",
            "🥄 الحشو: ضع ملعقة حشو. أغلقها بقطاعة السمبوسة (نصف دائرة) أو ضفرها باليد",
            "🔥 القلي: اقليها في زيت حامي حتى تنتفخ وتصبح ذهبية (الفقاعات تدل على نجاح العجينة)",
            "🍽️ التقديم: قدمها مع الليمون والشطة"
        ]
    },
    {
        id: 1061,
        name: "مربعات الباف باستري (فطور سريع)",
        type: "dessert",
        category: "quick",
        calories: 136,
        protein: "9g",
        ingredients: ["باف باستري", "جبن كيري", "مربى", "بيض", "سمسم"],
        quantities: [
            "مربعات عجينة الباف باستري الجاهزة",
            "مكعبات جبن كيري (أو كمل)",
            "مربى فراولة أو مشمش (اختياري)",
            "بيضة مخفوقة للدهن"
        ],
        steps: [
            "🧀 الحشو: ضع قطعة جبن في وسط كل مربع. أغلق الأطراف الأربعة للوسط (شكل ظرف) أو مثلث",
            "🎨 اللمعة: ادهن الوجه بالبيض ورش سمسم أو حبة سوداء",
            "🔥 الخبز: اخبزها في فرن 200°C لمدة 20 دقيقة حتى تنتفخ وتتحمر",
            "🍯 التقديم: يمكن دهنها بالعسل فور خروجها (حلو ومالح)"
        ]
    },
    {
        id: 1062,
        name: "جرانولا العسل والمكسرات (مقرمشة)",
        type: "dessert",
        category: "healthy",
        calories: 549,
        protein: "15g",
        ingredients: ["شوفان كامل", "لوز", "بذور قرع", "عسل", "زيت جوز هند", "توت مجفف"],
        quantities: [
            "3 أكواب شوفان (حبة كاملة)",
            "1 كوب (240 مل) مكسرات مشكلة (لوز، بيكان، بذور)",
            "2 ملعقة كبيرة نصف كوب عسل + ربع كوب زيت جوز هند (أو نباتي) (30 مل)",
            "ملعقة قرفة + ¼ ملعقة صغيرة ملح (1.25 مل)",
            "2 شريحة توت مجفف (يضاف بعد الخبز)"
        ],
        steps: [
            "🥣 الخلط: اخلط السوائل (عسل وزيت) مع القرفة. صبها فوق الشوفان والمكسرات وقلب جيداً",
            "🔥 الخبز: افردها في صينية مبطنة بورق زبدة. اخبزها 20 دقيقة (160°C) مع التقليب كل 5 دقائق (مهم جداً حتى لا تحترق)",
            "❄️ التبريد: اخرجها واتركها تبرد تماماً في الصينية (ستصبح مقرمشة بعد أن تبرد). أضف التوت المجفف"
        ]
    },
    {
        id: 1063,
        name: "كرات الطاقة (تمر ومكسرات)",
        type: "dessert",
        category: "healthy",
        calories: 266,
        protein: "4g",
        ingredients: ["تمر منزوع النوى", "لوز", "زبدة فول سوداني", "كاكاو", "جوز هند"],
        quantities: [
            "1 كوب (240 مل) تمر طري (خلاص أو سكري)",
            "½ كوب لوز محمص (120 مل)",
            "1 ملعقة كبيرة ملعقة كبيرة زبدة فول سوداني (للتماسك) (15 جرام)",
            "1 ملعقة كبيرة ملعقة كاكاو بودرة (إختياري) (7 جرام)",
            "3 ملعقة كبيرة جوز هند مبشور للتغطية (20 جرام)"
        ],
        steps: [
            "🌪️ الطحن: في محضرة الطعام، اطحن التمر واللوز وزبدة الفول السوداني حتى تتكون عجينة لاصقة",
            "🍬 التشكيل: خذ كمية صغيرة وشكلها كرة بيدك",
            "🥥 التغطية: دحرج الكرات في جوز الهند أو فستق مطحون أو سمسم",
            "❄️ الحفظ: احفظها في الثلاجة. سناك مثالي مع القهوة"
        ]
    },
    {
        id: 1064,
        name: "كريم كراميل (فرن)",
        type: "dessert",
        category: "international",
        calories: 789,
        protein: "12g",
        ingredients: ["حليب", "بيض", "سكر", "فانيليا", "قشر ليمون"],
        quantities: [
            "2 ملعقة كبيرة الكراميل: نصف كوب سكر (يحرق حتى يصبح ذهبياً) (25 جرام)",
            "خليط الكريم: 2 كوب (480 مل) حليب كامل الدسم",
            "3 بيضات كاملة + 2 صفار بيض (لقوام غني)",
            "2 ملعقة كبيرة نصف كوب سكر (25 جرام)",
            "1 ملعقة صغيرة ملعقة كبيرة فانيليا سائلة + قطعة قشر ليمون (لإزالة زفر البيض) (5 مل)"
        ],
        steps: [
            "🍯 الكراميل: ذوب السكر في مقلاة حتى يصبح كراميل ذهبي. صبه في قاع القوالب فوراً",
            "🥛 الخليط: سخن الحليب (لا تغليه). اخفق البيض والسكر والفانيليا. صب الحليب الساخن ببطء شديد على البيض مع التحريك المستمر (Tempring)",
            "🔥 الخبز: صف الخليط وصبه في القوالب. ضع القوالب في صينية بها ماء مغلي (حمام مائي)",
            "🕒 الفرن: اخبزها عند 160°C لمدة 45-50 دقيقة حتى تتماسك الأطراف ويهتز الوسط قليلاً",
            "❄️ التبريد: بردها في الثلاجة 6 ساعات ثم اقلبها في صحن التقديم"
        ]
    },
    {
        id: 1065,
        name: "عصير كركديه (منقوع بارد)",
        type: "drink",
        category: "healthy",
        calories: 60,
        protein: "0g",
        ingredients: ["أوراق كركديه", "سكر", "ماء بارد", "ماء ورد"],
        quantities: [
            "كوب أوراق كركديه",
            "1 لتر ماء بارد",
            "2 ملعقة كبيرة سكر حسب الرغبة (يذوب في قليل من الماء الساخن) (25 جرام)",
            "1 كوب قطرات من ماء الورد (سر النكهة) (240 مل)"
        ],
        steps: [
            "🕰️ النقع: اغسل أوراق الكركديه سريعاً. انقعها في الماء البارد لمدة 4 ساعات (النقع البارد يمنع المرارة ويعطي طعماً أنقى)",
            "🌪️ التصفية: صف العصير من الأوراق جيداً",
            "🌹 الإضافة: أضف السكر وماء الورد. اخلط جيداً",
            "❄️ التقديم: قدمه بارداً جداً (يمكن تخفيفه بالماء إذا كان مركزاً)"
        ]
    },
    {
        id: 1066,
        name: "بينا كولادا (فيرجن)",
        type: "drink",
        category: "international",
        calories: 425,
        protein: "4g",
        ingredients: ["أناناس", "حليب جوز هند", "كريمة جوز هند", "ثلج"],
        quantities: [
            "2 كوب (480 مل) قطع أناناس (مجمدة)",
            "½ كوب حليب جوز الهند (العلب السائلة) (120 مل)",
            "2 ملعقة كبيرة نصف كوب كريمة جوز الهند (للقوام الكريمي) (30 مل)",
            "مكعبات ثلج",
            "2 ملعقة كبيرة سكر إذا كان الأناناس حامضاً (25 جرام)"
        ],
        steps: [
            "🥥 الخلط: ضع جميع المكونات في الخلاط عالي السرعة",
            "🌪️ القوام: اخلط حتى تحصل على قوام ثلجي ناعم جداً (مثل السلاش)",
            "🍍 التقديم: صبه في كاسات طويلة. زين بشريحة أناناس ومظلة صغيرة لإحساس استوائي"
        ]
    },
    {
        id: 1067,
        name: "شاي زنجبيل وليمون (مقوي المناعة)",
        type: "drink",
        category: "healthy",
        calories: 50,
        protein: "1g",
        ingredients: ["زنجبيل طازج", "عسل", "ليمون", "ماء", "كركم"],
        quantities: [
            "قطعة زنجبيل طازج (بحجم الإبهام) مبشورة",
            "2 ملعقة كبيرة عصير ليمون (30 مل)",
            "1 ملعقة كبيرة ملعقة عسل طبيعي (21 جرام)",
            "¼ ملعقة صغيرة رشة كركم (اختياري لتعزيز الفائدة واللون) (1.25 مل)",
            "2 كوب (480 مل) ماء مغلي"
        ],
        steps: [
            "🔥 الغلي: ضع الزنجبيل (والكركم) في الماء المغلي. غطه واتركه 10 دقائق (لا تغله كثيراً حتى لا يصبح مراً)",
            "🍯 الإضافة: بعد أن يبرد قليلاً (يصبح دافئاً)، أضف العسل والليمون (الحرارة العالية تقتل فوائد العسل وفيتامين C)",
            "🍵 التقديم: صفه وقدمه دافئاً"
        ]
    },
    // === MANGO, CARDAMOM & SPICES ===
    {
        id: 1068,
        name: "ميلك شيك مانجو (كريمي)",
        type: "drink",
        category: "quick",
        calories: 194,
        protein: "3g",
        ingredients: ["مانجو مجمدة", "حليب", "آيس كريم فانيليا", "كريمة خفق"],
        quantities: [
            "2 كوب (480 مل) قطع مانجو (مجمدة)",
            "1 كوب (240 مل) حليب بارد جداً",
            "2 كرة آيس كريم فانيليا",
            "كريمة خفق للتزيين"
        ],
        steps: [
            "🥭 الخلط: اخلط المانجو والحليب في الخلاط حتى تختفي القطع",
            "🍦 السماكة: أضف الآيس كريم واخلط لثوانٍ فقط (للحفاظ على القوام الثقيل)",
            "🧁 التقديم: صبه في كأس، زين بالكريمة المخفوقة وقطع المانجو الصغيرة"
        ]
    },
    {
        id: 1069,
        name: "لاسي مانجو (هندي أصلي)",
        type: "drink",
        category: "international",
        calories: 130,
        protein: "10g",
        ingredients: ["مانجو ناضجة", "زبادي", "حليب", "هيل", "زعفران"],
        quantities: [
            "لب 2 حبة مانجو ناضجة وحلوة (ألفونسو)",
            "1 كوب (240 مل) زبادي ثقيل",
            "½ كوب حليب بارد (120 مل)",
            "3 حبات رشة هيل مطحون + شعرات زعفران",
            "2 ملعقة كبيرة سكر أو عسل حسب حلاوة المانجو (25 جرام)"
        ],
        steps: [
            "🥭 الخلط: اضرب المانجو مع الزبادي والسكر في الخلاط",
            "🥛 القوام: أضف الحليب بالتدريج للوصول للقوام المطلوب (يجب أن يكون ثقيلاً قليلاً)",
            "🍃 النكهة: أضف الهيل والزعفران واخلط خلطة أخيرة",
            "❄️ التقديم: يقدم بارداً جداً كمهضم بعد الأكل الحار"
        ]
    },
    {
        id: 1070,
        name: "تارت مانجو (بدون فرن)",
        type: "dessert",
        category: "international",
        calories: 491,
        protein: "19g",
        ingredients: ["بسكويت دايجستف", "زبدة", "جبن كريمي", "كريمة", "مانجو", "جيلي"],
        quantities: [
            "القاعدة: 200 جرام بسكويت مطحون + 100 جرام زبدة",
            "الكريم: 200 جرام جبن كريمي + كوب كريمة خفق + نصف كوب سكر بودرة",
            "الوجه: شرائح مانجو رقيقة + جيلي مانجو (للتلميع)"
        ],
        steps: [
            "🥧 القاعدة: اخلط البسكويت والزبدة وارصها في قالب تارت. برده 10 دقائق",
            "🥣 الحشو: اخفق الجبن والسكر، ثم أضف الكريمة واخفق حتى تتماسك. وزعها فوق البسكويت",
            "🥭 التزيين: رص شرائح المانجو بشكل وردة. ادهن الوجه بجيلي مذاب لإعطاء لمعة وحفظ الفاكهة",
            "❄️ التبريد: يبرد 4 ساعات قبل التقطيع"
        ]
    },
    {
        id: 1071,
        name: "قهوة فرنسية (بالبندق)",
        type: "drink",
        category: "international",
        calories: 99,
        protein: "4g",
        ingredients: ["قهوة فرنسية مطحونة", "حليب", "سكر", "قرفة"],
        quantities: [
            "3 ملاعق كبيرة (45 مل) قهوة فرنسية بالبندق (جاهزة)",
            "2 كوب (480 مل) حليب سائل",
            "2 ملعقة كبيرة سكر حسب الرغبة (25 جرام)"
        ],
        steps: [
            "🥛 التسخين: سخن الحليب في ركوة (كنكة) حتى يقارب الغليان",
            "☕ التحضير: أضف القهوة والسكر وقلب جيداً",
            "🔥 الغلي: اتركها تفور مرة واحدة فقط (مثل القهوة التركية)",
            "🍫 التقديم: صبها بهدوء لتحتفظ بالوجه (الرغوة الكريمية). قدمها مع قطعة شوكولاتة"
        ]
    },
    {
        id: 1072,
        name: "زرشك بولو (أرز بالزعفران والرمان المجفف)",
        type: "main",
        category: "international",
        calories: 697,
        protein: "14g",
        ingredients: ["أرز بسمتي", "زرشك (رمان مجفف)", "زعفران", "زبدة", "سكر", "فستق"],
        quantities: [
            "2 كوب أرز (360 جرام) بسمتي (مغسول ومنقوع)",
            "½ كوب زرشك (Barberries) (120 مل)",
            "¼ ملعقة صغيرة منقوع زعفران مركز منقوع في 2 ملعقة كبيرة ماء دافئ",
            "1 ملعقة كبيرة زبدة وسكر (لتحمير الزرشك) (15 جرام)",
            "فستق شرائح للتزيين"
        ],
        steps: [
            "🍚 السلق: اسلق الأرز في ماء و½ ملعقة صغيرة ملح (2.5 مل) حتى ينضج (Al Dente). صفه واتركه يتهدر (يتنشف) على نار هادئة",
            "🍒 الزرشك: اغسل الزرشك. حمره في الزبدة مع ملعقة سكر لمدة دقيقة (انتبه لا يحترق)",
            "🎨 الصبغ: خذ كوباً من الأرز المطبوخ واخلطه مع الزعفران والزرشك",
            "🍽️ التقديم: ضع الأرز الأبيض في الصحن، وغطه بخليط الأرز الزعفراني والزرشك والفستق"
        ]
    },
    {
        id: 1073,
        name: "سبانيش لاتيه (بارد)",
        type: "drink",
        category: "popular",
        calories: 457,
        protein: "18g",
        ingredients: ["اسبريسو", "حليب مكثف محلى", "حليب طازج", "ثلج"],
        quantities: [
            "2 شوت اسبريسو (أو نصف كوب قهوة مركزة)",
            "2 ملعقة كبيرة (30 مل) حليب مكثف محلى (نستله)",
            "كوب حليب بارد",
            "كوب ثلج"
        ],
        steps: [
            "🥛 الأساس: صب الحليب المكثف في قاع الكأس",
            "🧊 الطبقات: أضف الثلج، ثم الحليب البارد",
            "☕ القهوة: صب الاسبريسو ببطء فوق الحليب لعمل طبقة داكنة في الأعلى",
            "🥄 التقديم: قدمه مع عود تحريك (يجب تحريكه قبل الشرب)"
        ]
    },
    {
        id: 1074,
        name: "كوكيز القرفة (سنيكر دودل)",
        type: "dessert",
        category: "quick",
        calories: 800,
        protein: "22g",
        ingredients: ["دقيق", "زبدة", "سكر", "بيض", "قرفة", "كريمة تارتار"],
        quantities: [
            "2.5 كوب دقيق (300 جرام)",
            "1 كوب زبدة (225 جرام) لينة",
            "1.5 كوب سكر (300 جرام)",
            "2 بيضة",
            "خليط التغطية: 3 ملاعق سكر + ملعقة قرفة"
        ],
        steps: [
            "🥣 العجينة: اخفق الزبدة والسكر والبيض. أضف الدقيق (وكريمة التارتار ليعطيها قوام ناعم ومضغ)",
            "🔴 التشكيل: شكل العجينة كرات صغيرة",
            "🌪️ الدحرجة: دحرج الكرات في خليط السكر والقرفة لتتغطى تماماً",
            "🔥 الخبز: اخبزها 10-12 دقيقة (190°C). ستتشقق من الوجه وهو الشكل المميز للسنيكر دودل"
        ]
    },
    {
        id: 1075,
        name: "براونيز شوكولاتة (فادجي)",
        type: "dessert",
        category: "international",
        calories: 713,
        protein: "18g",
        ingredients: ["شوكولاتة داكنة", "زبدة", "سكر بني", "بيض", "دقيق", "كاكاو", "نسكافيه"],
        quantities: [
            "200 جرام شوكولاتة تذويب",
            "1 ملعقة كبيرة نصف كوب زبدة مذابة (15 جرام)",
            "1 كوب سكر (200 جرام) بني (للرطوبة)",
            "2 بيضة كبيرة",
            "1 ملعقة كبيرة نصف كوب دقيق + ربع كوب كاكاو بودرة (7 جرام)",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)"
        ],
        steps: [
            "🍫 التذويب: ذوب الزبدة والشوكولاتة في حمام مائي (أو الميكروويف 30 ثانية)",
            "🥣 الخفق: اخفق السكر والبيض جيداً. أضف خليط الشوكولاتة",
            "🌾 الجوافة: أضف الدقيق والكاكاو والنسكافيه (قلب بملعقة خشبية فقط حتى يختفي الدقيق، لا تبالغ)",
            "🔥 الخبز: صبها في صينية مربعة مبطنة. اخبزها 20-25 دقيقة (170°C). السر أن تخرجها وهي طرية من الوسط",
            "🍰 التقطيع: لا تقطعها حتى تبرد تماماً لتتماسك"
        ]
    },
    {
        id: 1076,
        name: "موس الشوكولاتة (فرنسي)",
        type: "dessert",
        category: "international",
        calories: 1200,
        protein: "17g",
        ingredients: ["شوكولاتة جيدة", "كريمة خفق", "بيض", "سكر", "فانيليا"],
        quantities: [
            "200 جرام شوكولاتة داكنة (70%)",
            "1 كوب (240 مل) كريمة خفق باردة",
            "3 بياض بيض (مبستر)",
            "2 ملعقة كبيرة ربع كوب سكر (25 جرام)",
            "1 ملعقة صغيرة فانيليا (5 مل)"
        ],
        steps: [
            "🍫 التذويب: ذوب الشوكولاتة واتركها تبرد قليلاً",
            "🧁 الكريمة: اخفق الكريمة حتى تتماسك (Soft Peaks)",
            "🥚 المارينج: اخفق بياض البيض مع السكر حتى يصبح مارينج لامع وثابت",
            "🔄 التقليب: أضف الشوكولاتة للكريمة وقلب برفق. ثم أضف المارينج على 3 دفعات (قلب من تحت لفوق للحفاظ على الهواء)",
            "❄️ التبريد: صبه في كاسات وبرده 4 ساعات على الأقل"
        ]
    },
    {
        id: 1077,
        name: "هوت شوكلت إيطالي (ثقيل)",
        type: "drink",
        category: "international",
        calories: 142,
        protein: "6g",
        ingredients: ["حليب", "كاكاو داكن", "نشا", "سكر", "شوكولاتة مبشورة"],
        quantities: [
            "2 كوب (480 مل) حليب كامل الدسم",
            "2 ملعقة كبيرة (30 مل) كاكاو بودرة مر",
            "1 ملعقة صغيرة (5 مل) نشا (سر القوام الثقيل)",
            "2 ملعقة سكر",
            "50 جرام شوكولاتة داكنة مبشورة"
        ],
        steps: [
            "🥣 الخلط البارد: ذوب النشا والكاكاو والسكر في الحليب البارد تماماً",
            "🔥 الطبخ: ضعه على نار متوسطة واستمر بالتحريك حتى يغلي ويثقل قوامه (مثل المهلبية الخفيفة جداً)",
            "🍫 التعزيز: أطفئ النار وأضف الشوكولاتة المبشورة وقلب حتى تذوب",
            "☕ التقديم: يقدم في أكواب صغيرة (لأنه دسم وغني) مع كريمة مخفوقة على الوجه"
        ]
    },
    {
        id: 1078,
        name: "وافل اللوتس والكراميل",
        type: "dessert",
        category: "popular",
        calories: 640,
        protein: "18g",
        ingredients: ["دقيق", "بيض", "حليب", "زبدة لوتس", "بسكويت لوتس"],
        quantities: [
            "كوب ونصف دقيق",
            "2 بيضة (افصل البياض للخفة)",
            "1 ملعقة كبيرة كوب حليب + نصف كوب زبدة مذابة (15 جرام)",
            "1 ملعقة صغيرة ملعقة فانيليا + ملعقة بيكنج بودر (5 مل)",
            "زبدة لوتس وبسكويت مطحون للتزيين"
        ],
        steps: [
            "🥚 الخليط: اخلط الصفار والحليب والزبدة. أضف المواد الجافة. اخفق البياض وقلبه مع الخليط برفق",
            "🔥 الخبز: صب الخليط في جهاز الوافل (المدهون) واخبزه حتى يقرمش",
            "🎨 التزيين: ذوب زبدة اللوتس وصبها خطوطاً. رش البسكويت المطحون"
        ]
    },
    {
        id: 1079,
        name: "فطائر التفاح (باف باستري)",
        type: "dessert",
        category: "quick",
        calories: 127,
        protein: "1g",
        ingredients: ["باف باستري", "تفاح", "قرفة", "سكر بني", "زبدة", "بيض"],
        quantities: [
            "مربعات باف باستري",
            "2 تفاحة مقشرة ومقطعة مكعبات صغيرة",
            "ملعقة زبدة + 2 ملعقة سكر بني + قرفة",
            "بيضة للدهن"
        ],
        steps: [
            "🍎 الحشو: قلب التفاح مع الزبدة والسكر والقرفة على النار 5 دقائق حتى يطرى ويخرج صوصه",
            "🥟 التشكيل: ضع الحشو في الباف باستري. أغلقها كمثلث واضغط الأطراف بالشوكة",
            "🔥 الخبز: ادهن بالبيض. اعمل شقوقاً صغيرة بالسكين للتهوية. اخبزها (200°C) لمدة 20 دقيقة",
            "🍦 التقديم: قدمها ساخنة مع آيس كريم فانيليا وصوص كراميل"
        ]
    },
    // === وصفات شعبية سعودية وعربية ===
    {
        id: 1080,
        name: "المنتو الحجازي (على الأصول)",
        type: "main",
        category: "popular",
        calories: 768,
        protein: "46g",
        ingredients: ["دقيق", "لحم مفروم", "بصل", "فلفل أسود", "كمون"],
        quantities: [
            "العجينة: 3 أكواب دقيق + كوب ماء + ملعقة صغيرة ملح (تعجن قاسية)",
            "الحشو: 500 جرام لحم ضأن مفروم (خشن مع دهن)",
            "4 حبات بصل كبيرة مفرومة ناعم جداً",
            "¼ ملعقة صغيرة ملعقة كبيرة فلفل أسود + ملعقة كمون (1.25 مل)",
            "1.5 ملعقة صغيرة ملح (7.5 مل / 9 جرام)"
        ],
        steps: [
            "🥟 العجينة: اعجن الدقيق والماء و1.5 ملعقة صغيرة ملح (7.5 مل) جيداً. (العجينة يجب أن تكون قاسية). غطها واتركها ترتاح ساعة",
            "🥩 الحشو: اخلط اللحم مع البصل (الكثير من البصل سر النكهة) و½ ملعقة صغيرة بهارات مشكلة (2.5 مل). اعجنهم باليد جيداً",
            "🌑 التشكيل: افرد العجينة دوائر رقيقة جداً (يمكن استخدام مكينة الباستا). ضع كرة من الحشو وأغلقها بضفيرة من الأعلى (الشكل التقليدي للمنتو)",
            "♨️ الطهي: ادهن طبقات قدر المنتو (المصفاة) بالزيت والكثير من الزيت. رص حبات المنتو متباعدة. املأ القدر السفلي بالماء والليمون",
            "⏳ البخار: ضعه على نار عالية 45 دقيقة. قدمه مع الشطة والخل والكمون"
        ]
    },
    {
        id: 1081,
        name: "يغمش (فرن)",
        type: "main",
        category: "popular",
        calories: 366,
        protein: "13g",
        ingredients: ["دقيق", "لحم مفروم", "طماطم", "بصل", "سمن"],
        quantities: [
            "العجينة: 3 أكواب دقيق + نص كوب سمن/زيت + ماء + خميرة",
            "الحشو: لحم مفروم + بصل مفروم + طماطم مقطعة صغير",
            "1.5 ملعقة صغيرة ملح (7.5 مل / 9 جرام)",
            "للوجه: بيض وسمسم"
        ],
        steps: [
            "🥣 العجين: اعجن المكونات واتركها تختمر 40 دقيقة",
            "🍅 الحشو: اخلط اللحم النيء مع البصل والطماطم والبهارات (لا يطبخ الحشو مسبقاً)",
            "📦 التشكيل: افرد العجينة، قطعها مستطيلات. ضع الحشو وأغلقها وتأكد من ضغط الأطراف",
            "🔥 الخبز: رصها في صينية مدهونة. ادهن الوجه بالبيض ورش السمسم. اخبزها (200°C) لمدة 25 دقيقة حتى تتحمر من فوق وتحت"
        ]
    },
    {
        id: 1082,
        name: "جريش أحمر (باللحم)",
        type: "main",
        category: "popular",
        calories: 1200,
        protein: "55g",
        ingredients: ["جريش لقيمي", "لحم", "طماطم", "لبن", "بصل", "مسمنة"],
        quantities: [
            "2 كوب (480 مل) جريش (مغسول ومنقوع ساعتين)",
            "1 كيلو لحم غنم بالعظم",
            "3 أكواب عصير طماطم + 2 ملعقة صلصة",
            "2 كوب (480 مل) لبن خاثر",
            "1 ملعقة كبيرة للكشنة (المسمنة): بصل، زبدة، ليمون أسود مطحون، مسمنة (15 جرام)"
        ],
        steps: [
            "🥘 الأساس: احمس البصل واللحم، أضف الطماطم والصلصة والماء المغلي. اترك اللحم يستوي نصف استواء",
            "🌾 الجريش: أضف الجريش المنقوع. اطبخ على نار هادئة جداً (يفضل 3 ساعات) مع التحريك كل فترة. أضف الماء إذا نقص",
            "🥄 الخفق: قبل التقديم بـ 10 دقائق، أضف اللبن. (دق) الجريش بملعقة خشبية كبيرة ليهرس اللحم مع الحب",
            "🧅 الكشنة: احمس بصل مع زبدة ومسمنة وليمون أسود. صبها فوق الجريش عند الغرف"
        ]
    },
    {
        id: 1083,
        name: "قرصان (بالخضار واللحم)",
        type: "main",
        category: "popular",
        calories: 67,
        protein: "4g",
        ingredients: ["خبز قرصان", "لحم", "خضار مشكلة", "صلصة طماطم", "بصل"],
        quantities: [
            "2 شريحة أقراص خبز قرصان يابس (جاهز)",
            "كيلو لحم غنم",
            "خضار: كوسة، قرع، جزر، فاصوليا (مقطعة كبير)",
            "صلصة طماطم + بصل + 2 حبة ليمون أسود مجفف (لومي)"
        ],
        steps: [
            "🍲 المرق: اطبخ اللحم مع البصل والطماطم و½ ملعقة صغيرة بهارات مشكلة (2.5 مل) حتى ينضج. أضف الخضار في آخر 20 دقيقة",
            "🍞 التشريب: في طبق التقديم، ضع طبقة من القرصان المكسر، ثم اسقها بالمرق والخضار، ثم طبقة قرصان، وهكذا",
            "🧅 التكتيم: غط الطبق بالقصدير 10 دقائق ليتشرب الخبز النكهة ويلين",
            "🍛 التقديم: زين الوجه بكشنة البصل والليمون الأسود"
        ]
    },
    {
        id: 1084,
        name: "حنيني (شتوي)",
        type: "dessert",
        category: "popular",
        calories: 1088,
        protein: "7g",
        ingredients: ["تمر", "خبز بر", "زبدة", "ليمون", "فلفل أسود"],
        quantities: [
            "1 كيلو تمر منزوع النوى",
            "2 شريحة أقراص خبز بر (سميكة ومحمصة قليلاً)",
            "200 جرام زبدة",
            "ليمون (عصير)",
            "¼ ملعقة صغيرة رشة فلفل أسود (اختياري ولكنه سر النكهة) (1.25 مل)"
        ],
        steps: [
            "📟 الفرم: افرم التمر مع الخبز في فرامة اللحم (وجه خشن) مرتين ليتجانس",
            "🔥 التسخين: ضع الخليط في قدر على النار. أضف الزبدة المذابة بالتدريج مع التقليب المستمر",
            "🍋 النكهة: أضف عصير الليمون والفلفل الأسود (يكسر حلاوة التمر)",
            "🏔️ التقديم: شكله كقبة (هرم). اعمل حفرة في الوسط وصب فيها سمن أو زبدة إضافية. يؤكل ساخناً"
        ]
    },
    {
        id: 1085,
        name: "سليق طائفي",
        type: "main",
        category: "popular",
        calories: 862,
        protein: "55g",
        ingredients: ["أرز مصري", "دجاج", "حليب", "مستكة", "سمن"],
        quantities: [
            "2 كوب أرز (360 جرام) مصري (أو أمريكي)",
            "دجاج كامل",
            "3 أكواب حليب كامل الدسم",
            "3 حبات مستكة وهيل",
            "1 ملعقة كبيرة سمن بري (15 جرام)"
        ],
        steps: [
            "🐔 السلق: اسلق الدجاج مع الهيل والمستكة و1 ملعقة كبيرة ملح (15 مل) حتى ينهري. ارفع الدجاج وحمره في الفرن",
            "🍚 الأرز: صف المرق. أضف الأرز للمرق واطبخه حتى ينهرس تماماً (زيادة الماء مهمة)",
            "🥛 الحليب: أضف الحليب للأرز وحرك باستمرار على نار هادئة حتى يتجانس ويصبح قوامه كريمي",
            "🧈 القدح: سيح السمن مع فص مستكة وصبه فوق السليق عند الغرف",
            "🌶️ الدقوس: قدمه مع سلطة الدقوس الحارة (طماطم، كزبرة، فلفل حار)"
        ]
    },
    {
        id: 1086,
        name: "كبيبة حائلية",
        type: "main",
        category: "popular",
        calories: 72,
        protein: "2g",
        ingredients: ["ورق عنب", "أرز", "لحم", "ليمون", "فلفل حائلي"],
        quantities: [
            "ورق عنب طازج أو معلب",
            "الحشو: أرز مصري + لحم غنم مفروم + بصل + طماطم",
            "بهارات حائل المشكلة (بزار) + كركم + 2 حبة ليمون أسود مجفف (لومي)",
            "500 جرام لحم مقطع مكعبات"
        ],
        steps: [
            "🥬 اللف: اخلط مكونات الحشو. لف الورق (تتميز الكبيبة بأنها أكبر من ورق العنب العادي ومربعة الشكل أحياناً)",
            "🥩 القدر: رص اللحم بالعظم في القاع، وفوقه العظام، ثم رص الكبيبة",
            "💧 الطبخ: اغمرها بالماء المذاب فيه صلصة وليمون و½ ملعقة صغيرة فلفل أسود (2.5 مل) حار. اطبخها 3 ساعات على نار هادئة جداً",
            "🍽️ التقديم: تقلب في صحن كبير (مثل المقلوبة)"
        ]
    },
    {
        id: 1087,
        name: "مصبيب (مراصيع) بالعسل",
        type: "dessert",
        category: "popular",
        calories: 666,
        protein: "18g",
        ingredients: ["دقيق بر", "حليب بودرة", "بصل", "سكر", "بيض"],
        quantities: [
            "2 كوب دقيق (240 جرام) بر",
            "3 ملاعق حليب بودرة + ملعقة سكر + خميرة",
            "2 كوب (480 مل) ماء دافئ",
            "بيضة (اختياري)",
            "½ ملعقة صغيرة رشة حبة سوداء وقرفة (2.5 مل)"
        ],
        steps: [
            "🥣 العجين: اخلط جميع المكونات في الخلاط (تكون سائلة أثقل من الكريب قليلاً). اتركها تخمر 30 دقيقة",
            "🍳 الصب: سخن صاج ومسحه بالزيت. صب العجينة دوائر صغيرة (أقراص)",
            "🥞 التحمير: اقلبها لتتحمر من الجهتين",
            "🍯 التقديم: رصها في حافظة، صب عليها زبدة وعسل ورشة هيل (للحالي) أو خضار وكشنة (للمالح)"
        ]
    },
    {
        id: 1088,
        name: "مغش جيزاني (لحم بالفرن)",
        type: "main",
        category: "popular",
        calories: 62,
        protein: "4g",
        ingredients: ["لحم", "خضار", "بامية", "طماطم", "بهارات"],
        quantities: [
            "كيلو لحم غنم (قطع صغيرة)",
            "خضار: بامية، باذنجان، كوسة، بطاطس",
            "2 فص طماطم مطحونة + ثوم (6 جرام)",
            "½ ملعقة صغيرة بهارات، حلبة (اختياري)، زيت سمسم (2.5 مل)"
        ],
        steps: [
            "⚱️ الوعاء: يُطبخ في (المغش) وهو وعاء حجري يحتفظ بالحرارة. (يمكن استخدام فخار)",
            "🥦 الترتيب: ضع اللحم، ثم الخضار، ثم الطماطم و½ ملعقة صغيرة بهارات مشكلة (2.5 مل) وقليل من الماء",
            "🔥 الفرن: غطه وضعه في فرن حامي جداً أو (التنور) لمدة ساعتين ونصف",
            "🥖 التقديم: يقدم وهو يغلي مع خبز الخمير والدخن"
        ]
    },
    {
        id: 1089,
        name: "عريكة جنوبية",
        type: "dessert",
        category: "popular",
        calories: 305,
        protein: "4g",
        ingredients: ["دقيق بر", "تمر", "سمن", "عسل", "قشطة"],
        quantities: [
            "3 أكواب دقيق بر + ماء وملح (عجينة لينة)",
            "1 ملعقة كبيرة كيلو تمر خلاص منزوع النوى (15 مل)",
            "1 ملعقة كبيرة سمن بلدي + عسل سدر (15 جرام)",
            "قشطة طازجة وجبن تشيدر (للإضافات الحديثة)"
        ],
        steps: [
            "🥘 الخبزة: ضع العجينة في صينية واخبزها في الفرن حتى تستوي (تكون سميكة)",
            "💪 العرك: وهي ساخنة جداً، ضعها في كيس سميك مع التمر واعركها بقوة حتى تختلط (أو في العجانة)",
            "🏺 التشكيل: ضعها في حافظة، اعمل حفرة، صب السمن والعسل",
            "🧀 التزيين: زين الأطراف بالقشطة والتمر والمكسرات والجبن"
        ]
    },
    {
        id: 1090,
        name: "معصوب ملكي (بالقشطة)",
        type: "dessert",
        category: "popular",
        calories: 269,
        protein: "5g",
        ingredients: ["موز", "خبز بر", "قشطة", "عسل", "جبن"],
        quantities: [
            "4 حبات موز ناضج جداً",
            "3 أقراص خبز بر مفتت (فرم ناعم)",
            "علبة قشطة طازجة",
            "1 ملعقة كبيرة عسل، جبن تشيدر مبشور (21 جرام)"
        ],
        steps: [
            "🍌 الهرس: اهرس الموز جيداً. أضف الخبز المفتت واخلطهم (يمكن إضافة قليل من السمن)",
            "🍲 التقديم: ضع الخليط في صحن. غطه بطبقة كاملة من القشطة",
            "🧀 التزيين: رش الجبن المبشور والعسل والمكسرات. (الملكي يحتوي على الكورن فليكس أحياناً)"
        ]
    },
    // === وصفات عالمية وعصرية (Batch 2) ===
    {
        id: 1091,
        name: "ريزوتو الفطر (إيطالي فاخر)",
        type: "main",
        category: "international",
        calories: 1200,
        protein: "28g",
        ingredients: ["أرز ايطالي", "فطر", "كريمة", "جبن بارميزان", "زبدة"],
        quantities: [
            "1 كوب أرز (180 جرام) ريزوتو (أربوريو)",
            "كوب فطر طازج مقطع شرائح",
            "2 ملعقة كبيرة نصف كوب كريمة طبخ (اختياري) (30 مل)",
            "½ كوب جبن بارميزان مبشور (120 مل)",
            "مرق دجاج ساخن (4-5 أكواب)"
        ],
        steps: [
            "🧅 الأساس: شوح بصل ناعم في زبدة وزيت زيتون. أضف الفطر وقلب حتى يذبل",
            "🍚 التحميص: أضف الأرز وقلب لدقيقتين حتى يتغلف بالزبدة",
            "🥄 السقي: ابدأ بإضافة المرق الساخن (مغرفة واحدة كل مرة) مع التحريك المستمر. لا تضف المغرفة التالية حتى تتشرب الأولى",
            "🧀 التكريم: عندما يستوي الأرز (يكون كريمي ولكن فيه عضة خفيفة)، أطفئ النار. أضف الكريمة والجبن ومكعب زبدة بارد وقلب بقوة (Mantecatura)"
        ]
    },
    {
        id: 1092,
        name: "لازانيا بولونيز (طبقات السعادة)",
        type: "main",
        category: "international",
        calories: 525,
        protein: "49g",
        ingredients: ["مكرونة لازانيا", "لحم مفروم", "بشاميل", "جبن موزاريلا", "طماطم"],
        quantities: [
            "شرائح لازانيا (يفضل التي لا تحتاج سلق)",
            "بولونيز اللحم: 500 جرام لحم + بصل + جزر + كرفس + صلصة طماطم",
            "بشاميل خفيف: 3 أكواب حليب + 3 ملاعق دقيق وزبدة",
            "1 كوب جبن موزاريلا مبشور (115 جرام)"
        ],
        steps: [
            "🥩 الصوص الأحمر: اطبخ اللحم مع الخضار والصلصة لمدة ساعة على نار هادئة ليتسبك",
            "🥛 الصوص الأبيض: حضر بشاميل خفيف القوام وتبله بجوزة الطيب",
            "🏗️ البناء: في صينية، ضع بشاميل، ثم شرائح، ثم لحم، ثم بشاميل، وجبن. كرر 4 طبقات",
            "🔥 الخبز: غطها بقصدير واخبزها 30 دقيقة. اكشف الغطاء وحمر الوجه"
        ]
    },
    {
        id: 1093,
        name: "كانيلوني بالسبانخ والريكوتا",
        type: "main",
        category: "international",
        calories: 776,
        protein: "46g",
        ingredients: ["مكرونة كانيلوني", "سبانخ", "جبن ريكوتا", "صلصة طماطم", "بشاميل"],
        quantities: [
            "أنابيب مكرونة كانيلوني",
            "حشوة: 2 كوب (480 مل) سبانخ مجمدة (معصورة) + كوب جبن ريكوتا (أو قريش)",
            "صلصة طماطم بالريحان (للقاع)",
            "بشاميل للتغطية"
        ],
        steps: [
            "🌿 الحشو: اخلط السبانخ مع الجبن والبيض و1 ملعقة صغيرة ملح (5 مل) والفلفل وجوزة الطيب",
            "🍝 التعبئة: احش أنابيب المكرونة (بدون سلق) بالحشوة باستخدام كيس حلواني",
            "🥘 الترتيب: ضع صلصة الطماطم في قاع الصينية. رص الكانيلوني. غطها بالبشاميل والجبن",
            "⏲️ الطهي: اخبزها 35 دقيقة حتى تطرى المكرونة وتتحمر"
        ]
    },
    {
        id: 1094,
        name: "دجاج بارميزان (إيطالي أمريكي)",
        type: "main",
        category: "international",
        calories: 529,
        protein: "55g",
        ingredients: ["صدور دجاج", "بقسماط", "صلصة طماطم", "جبن موزاريلا", "جبن بارميزان"],
        quantities: [
            "2 صدر دجاج (مفرود)",
            "1 ملعقة كبيرة تغطية: دقيق، بيض، بقسماط مخلوط بجبن بارميزان (15 مل)",
            "كوب صلصة مارينارا (طماطم وأعشاب)",
            "كرة موزاريلا طازجة"
        ],
        steps: [
            "🔨 التجهيز: دق الدجاج قليلاً. غلفه بالدقيق ثم البيض ثم البقسماط",
            "🍳 القلي: اقل الدجاج في زيت وفير حتى يصبح ذهبياً (لا يشترط النضج الكامل)",
            "🍅 التجميع: ضع الدجاج في صينية. ضع ملعقة كبيرة صلصة فوق كل قطعة، ثم شريحة موزاريلا",
            "🔥 الذوبان: أدخله الفرن 10 دقائق حتى تذوب الجبن ويبقبق الصوص. قدمه مع سباغيتي"
        ]
    },
    {
        id: 1095,
        name: "بيف ويلينغتون (نسخة مبسطة)",
        type: "main",
        category: "international",
        calories: 830,
        protein: "16g",
        ingredients: ["فيليه لحم", "عجينة باف باستري", "فطر", "لحم مقدد", "خردل"],
        quantities: [
            "قطعة فيليه عجل (تندرلوين) كاملة أو قطع فردية",
            "500 جرام فطر طازج مطحون ناعم (ديكسيل)",
            "شرائح لحم مقدد (بيكون) أو شرائح ديك رومي",
            "عجينة باف باستري جاهزة",
            "خردل ديجون"
        ],
        steps: [
            "🍄 الديكسيل: اطبخ الفطر المطحون بدون زيت حتى يتبخر ماؤه تماماً (مهم جداً)",
            "🥩 التحمير: تبل اللحم وحمره في مقلاة من كل الجهات بسرعة (تشميع). ادهنه بالخردل وهو ساخن",
            "🌯 اللف: افرد نايلون، رص البيكون، وفوقه الفطر، ثم اللحم. لفها رول واحفظها في الثلاجة 20 دقيقة",
            "🥐 العجين: لف الرول بالعجينة. ادهنه بالبيض واعمل زخارف",
            "⏳ الخبز: اخبزها (200°C) لمدة 25-30 دقيقة (ميديم رير). اتركها ترتاح 15 دقيقة قبل التقطيع"
        ]
    },
    {
        id: 1096,
        name: "تاكو مكسيكي (لحم)",
        type: "main",
        category: "international",
        calories: 273,
        protein: "24g",
        ingredients: ["خبز تاكو", "لحم مفروم", "خس", "جبن تشيدر", "طماطم"],
        quantities: [
            "قوالب تاكو (ذرة مقرمشة) أو تورتيلا صغيرة",
            "300 جرام لحم مفروم",
            "½ ملعقة صغيرة بهارات تاكو (كمون، بابريكا، شطة، أوريغانو) (2.5 مل)",
            "2 ملعقة كبيرة إضافات: خس مقطع، طماطم، جبن مبشور، كريمة حامضة (30 مل)"
        ],
        steps: [
            "🌶️ اللحم: اطبخ اللحم المفروم مع البصل. أضف البهارات وقليل من الماء ليصبح صوص ثقيل",
            "🌮 التجميع: املأ التاكو باللحم. ثم الخس والطماطم والجبن",
            "🍋 اللمسة الأخيرة: قدمه مع شرائح ليمون (لايم) وصلصة جواكامولي"
        ]
    },
    {
        id: 1097,
        name: "كاساديا دجاج (سريعة)",
        type: "main",
        category: "quick",
        calories: 144,
        protein: "11g",
        ingredients: ["خبز تورتيلا", "دجاج", "جبن موزاريلا", "فلفل رومي", "ذرة"],
        quantities: [
            "2 شريحة خبز تورتيلا كبير",
            "بقاي دجاج مشوي أو مسلوق (مفتت)",
            "1 ملعقة كبيرة كوب خليط أجبان (موزاريلا وتشيدر) (15 مل)",
            "¼ ملعقة صغيرة فلفل بارد ألوان + ذرة (1.25 مل)"
        ],
        steps: [
            "🍳 الحشو: اخلط الدجاج مع الخضار وقليل من البهارات",
            "🧀 التجهيز: ضع رغيف تورتيلا في مقلاة. رش الجبن على كامل الرغيف. ضع الحشو على نصف الرغيف",
            "🌙 الطوي: اطو النصف الفارغ على الممتلئ (شكل نصف قمر). اضغط عليه",
            "🔥 التحمير: اقلبه ليتحمر ويذوب الجبن. قطعه مثلثات"
        ]
    },
    {
        id: 1098,
        name: "إنشيلادا دجاج (بالفرن)",
        type: "main",
        category: "international",
        calories: 283,
        protein: "9g",
        ingredients: ["تورتيلا", "دجاج", "صلصة إنشيلادا", "جبن", "فاصوليا سوداء"],
        quantities: [
            "6 أرغفة تورتيلا ذرة (أو دقيق)",
            "حشوة: دجاج مفتت + فاصوليا سوداء + ذرة + جبن كريمي",
            "¼ ملعقة صغيرة صلصة إنشيلادا حمراء (طماطم وفلفل حار) (1.25 مل)",
            "جبن تشيدر"
        ],
        steps: [
            "🌯 اللف: احش التورتيلا بخليط الدجاج ولفها رول",
            "🥘 الترتيب: رص الرولات في صينية بها قليل من الصلصة",
            "🥫 التغطية: صب باقي الصلصة فوق الرولات حتى تتغطى. رش الجبن بوفرة",
            "⏲️ الفرن: اخبزها 20 دقيقة حتى تبقبق الصلصة"
        ]
    },
    {
        id: 1099,
        name: "رامين كوري (نودلز فاخرة)",
        type: "main",
        category: "international",
        calories: 236,
        protein: "19g",
        ingredients: ["نودلز", "بيض", "بصل أخضر", "فطر", "صويا صوص"],
        quantities: [
            "كيس نودلز كوري (سميكة)",
            "بيضة مسلوقة (نصف استواء - 6 دقائق)",
            "فطر شيتاكي أو مشروم عادي",
            "1 ملعقة كبيرة بصل أخضر + سمسم + ورق نوري (طحالب) (10 جرام)",
            "شريحة جبن (اختياري للكثافة)"
        ],
        steps: [
            "🍜 السلق: اغل النودلز في الماء مع البهارات المرفقة (أو مرق دجاج وصويا وثوم)",
            "🍄 الإضافات: في آخر دقيقة، أضف الفطر",
            "🥚 التقديم: صب النودلز والمرق في زبدية عميقة. ضع البيضة (مقطعة نصفين)، البصل الأخضر، والأعشاب",
            "🧀 السر: ضع شريحة الجبن وهي ساخنة لتذوب في المرق وتعطي قواماً غنياً"
        ]
    },
    {
        id: 1100,
        name: "دجاج ترياكي (ياباني)",
        type: "main",
        category: "international",
        calories: 426,
        protein: "55g",
        ingredients: ["صدور دجاج", "صويا صوص", "عسل", "زنجبيل", "سمسم"],
        quantities: [
            "2 صدر دجاج مقطع مكعبات",
            "2 فص صوص ترياكي: نصف كوب صويا + ربع كوب ماء + ملعقتين عسل + زنجبيل وثوم مهروس + ملعقة نشا (6 جرام)",
            "بروكلي وجزر مسلوق",
            "أرز أبيض"
        ],
        steps: [
            "🍗 التحمير: حمر الدجاج في قليل من الزيت حتى ينضج وياخذ لوناً",
            "🥣 الصوص: اخلط مكونات الصوص على البارد، ثم صبه فوق الدجاج",
            "🔥 الكرملة: قلب حتى يثقل الصوص ويغلف قطع الدجاج بلمعة قوية",
            "🍚 التقديم: قدمه في طبق بجانب الأرز والبروكلي. رش السمسم على الوجه"
        ]
    },
    {
        id: 1101,
        name: "دجاج سويت آند ساور (صيني)",
        type: "main",
        category: "international",
        calories: 50,
        protein: "4g",
        ingredients: ["دجاج", "فلفل رومي ملون", "أناناس", "كاتشب", "خل"],
        quantities: [
            "دجاج مقطع ومغلف بالنشا والمقلي",
            "¼ ملعقة صغيرة فلفل ألوان + بصل مقطع مربعات كبيرة (1.25 مل)",
            "قطع أناناس (مع العصير)",
            "2 ملعقة كبيرة الصوص: كاتشب + خل + سكر + صويا + عصير الأناناس (25 جرام)"
        ],
        steps: [
            "🥕 الخضار: قلب البصل والفلفل في المقلاة دقيقتين (يجب أن يبقى مقرمشاً)",
            "🥣 الصوص: صب الصوص واتركه يغلي ويثقل",
            "🍗 الدمج: أضف الدجاج المقلي والأناناس وقلب بسرعة لتتغلف القطع",
            "🥢 التقديم: يقدم فوراً مع أرز أبيض أو نودلز"
        ]
    },
    {
        id: 1102,
        name: "باييلا إسبانية (فواكه بحر)",
        type: "main",
        category: "international",
        calories: 448,
        protein: "12g",
        ingredients: ["أرز ريزوتو أو مصري", "روبيان", "حبار", "بلح البحر", "زعفران", "بازلاء"],
        quantities: [
            "2 كوب أرز (360 جرام) قصير الحبة",
            "تشكيلة بحرية (روبيان، كلماري، محار)",
            "¼ ملعقة صغيرة فلفل أحمر + بازلاء + طماطم (1.25 مل)",
            "¼ ملعقة صغيرة مرق سمك + زعفران (للون الأصفر المميز) منقوع في 2 ملعقة كبيرة ماء دافئ"
        ],
        steps: [
            "🥘 المقلاة: استخدم مقلاة واسعة (باييلا). شوح الخضار ثم البحريات وارفعها",
            "🍚 الأرز: أضف الأرز للمقلاة وقلبه. أضف المرق والزعفران. لا تحرك الأرز بعد هذه المرحلة",
            "🦐 الترتيب: عندما يجف الماء قليلاً، رص البحريات على الوجه بشكل جميل",
            "🔥 الطبقة المحروقة: اتركها على نار هادئة حتى يتكون (سوكارات) وهي الطبقة المقرمشة في القاع"
        ]
    },
    {
        id: 1103,
        name: "جمبري تمبورا (مقرمش)",
        type: "main",
        category: "international",
        calories: 122,
        protein: "6g",
        ingredients: ["روبيان جامبو", "دقيق", "نشا", "ماء غازي", "ثلج"],
        quantities: [
            "روبيان كبير منظف (مع الذيل)",
            "العجينة: كوب دقيق + نصف كوب نشا + بيضة باردة",
            "1 كوب ماء غازي مثلج (سر القرمشة) (240 مل)",
            "1 كوب زيت نباتي للقلي (240 مل / 220 جرام)"
        ],
        steps: [
            "🍤 التجهيز: اعمل شقوقاً في بطن الروبيان وافرده ليصبح مستقيماً",
            "❄️ العجينة: اخلط المكونات بخفة (لا تبالغ في الخلط، التكتلات مقبولة). يجب أن تكون باردة جداً",
            "🔥 القلي: اغمس الروبيان في العجينة ثم فوراً للزيت الحار. رش قليلاً من العجينة بإصبعك على الروبيان وهو يقلى لعمل قشور مقرمشة"
        ]
    },
    {
        id: 1104,
        name: "مسالا دجاج (دجاج بالزبدة)",
        type: "main",
        category: "international",
        calories: 137,
        protein: "4g",
        ingredients: ["دجاج تندوري", "طماطم", "كريمة", "زبدة", "بهارات مسالا"],
        quantities: [
            "½ ملعقة صغيرة دجاج مشوي متبل بالزبادي والبهارات الهندية (2.5 مل)",
            "الصوص: بصل وطماطم وكاجو (مطحونين ناعم بعد الطبخ)",
            "2 ملعقة كبيرة زبدة + كريمة طبخ (30 مل)",
            "½ ملعقة صغيرة بهارات جرام مسالا + حلبة مجففة (2.5 مل)"
        ],
        steps: [
            "🥘 الصوص: اطبخ البصل والطماطم والكاجو و½ ملعقة صغيرة بهارات مشكلة (2.5 مل) ثم اطحنهم وصفهم (للحصول على صوص حريري)",
            "🧈 التسبيد: أعد الصوص للمقلاة مع قطعة زبدة كبيرة",
            "🍗 الدجاج: أضف قطع الدجاج المشوي. اتركه يغلي 5 دقائق",
            "🍃 اللمسة: أطفئ النار وأضف الكريمة ورشة الحلبة المجففة (تعطي الطعم الهندي الأصيل)"
        ]
    },
    {
        id: 1105,
        name: "ستيك تارتار (نيء - فاخر)",
        type: "main",
        category: "international",
        calories: 294,
        protein: "29g",
        ingredients: ["لحم عجل فيليه", "بيض", "كيبر", "بصل", "خردل"],
        quantities: [
            "200 جرام لحم تندرلوين طازج جداً (جودة عالية)",
            "صفار بيضة طازجة",
            "ملعقة صغيرة كيبر (Capers) مفروم + بصل أحمر مفروم",
            "خردل ديجون + ورشستر صوص"
        ],
        steps: [
            "🔪 الفرم: قطع اللحم بالسكين (وليس الفرامة) إلى مكعبات صغيرة جداً جداً",
            "🥣 الخلط: (في وعاء بارد على ثلج) اخلط اللحم مع الإضافات و½ ملعقة صغيرة بهارات مشكلة (2.5 مل)",
            "🎨 التقديم: شكله في قالب دائري. اعمل حفرة، ضع صفار البيضة في الوسط. يقدم مع توست محمص"
        ]
    },
    // === مخبوزات وسندويشات (Batch 3) ===
    {
        id: 1106,
        name: "خبز تورتيلا منزلي",
        type: "main",
        category: "popular",
        calories: 169,
        protein: "4g",
        ingredients: ["دقيق", "زيت", "بيكنج بودر", "ماء ساخن"],
        quantities: [
            "3 أكواب دقيق",
            "½ ملعقة صغيرة بيكنج بودر + 1 ملعقة صغيرة ملح (5 مل / 6 جرام)",
            "2 ملعقة كبيرة ثلث كوب زيت (30 مل)",
            "1 كوب كوب ماء ساخن (للعجن) (240 مل)"
        ],
        steps: [
            "🥣 العجن: اخلط المكونات الجافة. أضف الزيت وافركه، ثم الماء الساخن واعجن حتى تصبح طرية جداً",
            "🕰️ الراحة: قسمها لكرات وغطها لترتاح 20 دقيقة (مهم للفرد)",
            "🌮 الفرد: افردها بسمك رقيق جداً (شفافة تقريباً)",
            "🔥 الخبز: على صاج حار جداً، اخبزها لمدة 30 ثانية لكل وجه (حتى تظهر فقاعات). غطها فوراً بفوطة لتبقى طرية"
        ]
    },
    {
        id: 1107,
        name: "خبز صامولي (زي المخابز)",
        type: "main",
        category: "popular",
        calories: 1055,
        protein: "8g",
        ingredients: ["دقيق", "خميرة", "سكر", "زبدة", "حليب"],
        quantities: [
            "4 أكواب دقيق كويتي",
            "2 ملعقة كبيرة ملعقة كبيرة خميرة + ملعقتين سكر (25 جرام)",
            "1 ملعقة كبيرة ربع كوب زبدة لينة (15 جرام)",
            "1 كوب كوب ونص ماء دافئ (240 مل)"
        ],
        steps: [
            "🍞 العجن: اعجن المكونات لمدة 10 دقائق كاملة (سر الهشاشة). خمرها ساعة",
            "🥖 التشكيل: افرد كرة العجين ثم لفها رول (مثل السجاد) وأغلق الأطراف جيداً",
            "💤 التخمير الثاني: رصها في صينية وغطها ساعة أخرى حتى يتضاعف الحجم",
            "🔥 الخبز: ادهن بحليب. اخبزها في فرن حامي (200°C) لمدة 15 دقيقة"
        ]
    },
    {
        id: 1108,
        name: "مناقيش زعتر (ترويقة)",
        type: "main",
        category: "quick",
        calories: 151,
        protein: "5g",
        ingredients: ["دقيق", "زعتر", "زيت زيتون", "خميرة"],
        quantities: [
            "2 ملعقة كبيرة عجينة فطائر أساسية (دقيق، حليب بودرة، خميرة، زيت، ماء) (30 مل)",
            "2 ملعقة كبيرة خلطة الزعتر: زعتر بلدي + زيت زيتون بكر (تكون سائلة قليلاً) (30 مل)"
        ],
        steps: [
            "🍕 الفرد: افرد العجينة دوائر متوسطة السماكة",
            "🧴 الحشو: ادهن الزعتر والزيت بيدك على العجين",
            "🔥 التنور: اخبزها في فرن حامي (يفضل على حجر البيتزا) حتى تتحمر من الأسفل وتفقّع الأطراف"
        ]
    },
    {
        id: 1109,
        name: "زنجر سوبريم (ساندوتش)",
        type: "main",
        category: "main",
        calories: 401,
        protein: "34g",
        ingredients: ["دجاج", "خبز برجر طويل", "تركي مدخن", "جبن", "مايونيز"],
        quantities: [
            "صدر دجاج مقلي كرسبي (حار)",
            "شرائح ديك رومي مدخن (تركي)",
            "2 شريحة خبز صامولي بالسمسم أو برجر طويل",
            "2 ملعقة كبيرة جبن تشيدر شرائح + خس + مايونيز (30 جرام)"
        ],
        steps: [
            "🥪 التجميع: حمص الخبز بالزبدة. ادهن مايونيز",
            "🍗 الطبقات: ضع الخس، ثم الدجاج الكرسبي، ثم الجبن، ثم الرومي المدخن",
            "♨️ التسخين: يمكن وضعه في التوستر قليلاً ليذوب الجبن"
        ]
    },
    {
        id: 1110,
        name: "عش البلبل (لبنة وعسل)",
        type: "dessert",
        category: "speed",
        calories: 150,
        protein: "4g",
        ingredients: ["عجينة", "لبنة", "جبن موزاريلا", "عسل"],
        quantities: [
            "عجينة فطائر رقيقة",
            "لبنة تركية (جامدة)",
            "1 كوب جبن موزاريلا مبشور (115 جرام)",
            "1 ملعقة كبيرة عسل نحل أصلي (21 جرام)"
        ],
        steps: [
            "🥖 الأساس: افرد العجينة دائرة كبيرة",
            "🧀 الحشو: ادهن اللبنة وافرش الموزاريلا فوقها",
            "🔥 الخبز: اخبزها حتى تذوب الجبنة وتتحمر الأطراف",
            "🍯 السقي: فور خروجها من الفرن، صب العسل عليها بوفرة. (مزيج مالح وحالي رهيب)"
        ]
    },
    {
        id: 1111,
        name: "كرواسون (منزلي مبسط)",
        type: "dessert",
        category: "international",
        calories: 581,
        protein: "10g",
        ingredients: ["دقيق", "زبدة", "خميرة", "حليب", "سكر"],
        quantities: [
            "4 أكواب دقيق",
            "200 جرام زبدة باردة (بلوك للطي)",
            "2 ملعقة كبيرة خميرة + سكر + حليب بارد للعجن (25 جرام)"
        ],
        steps: [
            "📑 الطي: افرد العجينة، ضع الزبدة في الوسط، أغلق عليها. افرد وطبق (مثل الكتاب). كرر 3 مرات (بينهم تبريد)",
            "🥐 التشكيل: افردها مستطيلا كبيرا، قطع مثلثات. لف المثلث من القاعدة للرأس",
            "🌙 التخمير & الطهي: اتركها تخمر لساعتين. ادهن بيض واخبزها (200°C) حتى تصبح ذهبية ومنتفخة"
        ]
    },
    {
        id: 1112,
        name: "بريوش (خبز الزبدة والبيض)",
        type: "main",
        category: "international",
        calories: 1130,
        protein: "55g",
        ingredients: ["دقيق", "بيض", "زبدة", "خميرة", "سكر"],
        quantities: [
            "3 أكواب دقيق قوي",
            "3 بيضات",
            "100 جرام زبدة طرية",
            "2 ملعقة كبيرة ربع كوب سكر (للحلاوة الخفيفة) (25 جرام)"
        ],
        steps: [
            "🧈 العجن: المكونات تعجن طويلاً (15 دقيقة). تضاف الزبدة في النهاية قطعة قطعة",
            "❄️ التبريد: تخمير بطيء في الثلاجة لليلة كاملة (يعطي طعم عميق)",
            "🍞 التشكيل: شكلها كرات في قالب التوست أو ضفيرة. اخبزها حتى يصبح لونها بني غامق لامع"
        ]
    },
    {
        id: 1113,
        name: "ساندوتش فيلي تشيز ستيك",
        type: "main",
        category: "international",
        calories: 150,
        protein: "8g",
        ingredients: ["ستيك", "خبز صامولي", "جبن بروفولون", "بصل", "فلفل"],
        quantities: [
            "شرحات لحم رقيقة جداً (ريب آي)",
            "¼ ملعقة صغيرة بصل وفلفل أخضر مقطع شرائح (1.25 مل)",
            "جبن بروفولون أو جبن سائل (تشيز ويز)",
            "2 شريحة خبز صامولي طري"
        ],
        steps: [
            "🥩 الشوي: شوح اللحم بسرعة على نار عالية (صاج). شوح البصل والفلفل",
            "🧀 الدمج: اخلط اللحم والخضار، ضع شرائح الجبن فوقها لتذوب",
            "🥖 الغرف: افتح الخبز واكبس الخليط داخله. (يفضل أن يكون مليان صوص)"
        ]
    },
    {
        id: 1114,
        name: "ساندوتش كودو (الدجاج الأصلي)",
        type: "main",
        category: "quick",
        calories: 175,
        protein: "16g",
        ingredients: ["دجاج", "صويا صوص", "فلفل رومي", "بصل", "مايونيز"],
        quantities: [
            "صدور دجاج مكعبات صغيرة",
            "¼ ملعقة صغيرة فلفل رومي أخضر + بصل مكعبات (1.25 مل)",
            "2 فص تتبيلة: صويا صوص، ثوم، بهارات دجاج، كاتشب (6 جرام)",
            "2 ملعقة كبيرة خس وطماطم ومايونيز (30 جرام)"
        ],
        steps: [
            "🥘 الصاج: شوح الدجاج حتى ينشف. أضف الخضار والصويا وقلب دقيقتين",
            "🌭 الساندوتش: ادهن الصامولي بالمايونيز. احشه بخلطة الدجاج مع خس وطماطم. (قدمه مع بطاطس)"
        ]
    },
    // === مشروبات وحلويات إضافية (Batch 4) ===
    {
        id: 1115,
        name: "قهوة بيضاء (حجازية)",
        type: "drink",
        category: "popular",
        calories: 87,
        protein: "1g",
        ingredients: ["ماء", "ماء زهر", "هيل", "سكر"],
        quantities: [
            "2 كوب (480 مل) ماء مغلي",
            "1 كوب ملعقة كبيرة ماء زهر (240 مل)",
            "2 ملعقة كبيرة سكر حسب الرغبة (أو بدون) (25 جرام)",
            "3 حبات فص هيل (اختياري)"
        ],
        steps: [
            "💧 الغلي: اغل الماء مع السكر",
            "🌸 الرائحة: أطفئ النار وأضف ماء الزهر فوراً",
            "☕ التقديم: تقدم في فناجين صغيرة (تعتبر مهضمة ومريحة للمعدة)"
        ]
    },
    {
        id: 1116,
        name: "قهوة قشر (جنوبية)",
        type: "drink",
        category: "popular",
        calories: 50,
        protein: "1g",
        ingredients: ["قشر قهوة", "زنجبيل", "قرفة", "سنو"],
        quantities: [
            "فنجان قشر قهوة يمني (محمص)",
            "½ ملعقة صغيرة ملعقة زنجبيل مبشور + عود قرفة (2.5 مل)",
            "سنو (يانسون) أو نانخة"
        ],
        steps: [
            "🏺 الطبخ: اغل قشر القهوة مع الماء و½ ملعقة صغيرة بهارات مشكلة (2.5 مل) لمدة 15 دقيقة حتى يثقل لونه",
            "🌡️ التخمير: اتركها تركد قليلاً، ثم صفها في الدلة",
            "🍪 التقديم: تقدم مع التمر (صحية جداً وتنظف الجسم)"
        ]
    },
    {
        id: 1117,
        name: "سحلب ساخن (شامي)",
        type: "drink",
        category: "quick",
        calories: 134,
        protein: "4g",
        ingredients: ["حليب", "نشا", "مستكة", "فستق", "قرفة"],
        quantities: [
            "3 أكواب حليب",
            "ملعقتين كبار نشا (أو بودرة سحلب جاهزة)",
            "2 ملعقة كبيرة سكر + مستكة مطحونة (25 جرام)",
            "فستق حلبي وجوز هند وقرفة للتزيين"
        ],
        steps: [
            "🔥 التحريك: ذوب النشا في الحليب البارد. ضعه على النار مع التحريك المستمر حتى يثقل (قوام كريمي)",
            "🥣 النكهة: أضف المستكة والسكر وماء الزهر",
            "🍵 الشتاء: صبه في أكواب، ورش القرفة والمكسرات بوفرة"
        ]
    },
    {
        id: 1118,
        name: "سموذي توت مشكل (ملكي)",
        type: "drink",
        category: "healthy",
        calories: 85,
        protein: "6g",
        ingredients: ["توت مشكل", "موز", "زبادي", "عسل"],
        quantities: [
            "كوب توت مجمد (أزرق، أحمر، أسود)",
            "موزة مجمدة",
            "½ كوب زبادي يوناني (120 مل)",
            "1 ملعقة كبيرة عسل وملعقة بذور شيا (21 جرام)"
        ],
        steps: [
            "🌪️ الخلط: اضرب جميع المكونات في الخلاط حتى يصبح ناعماً وثقيلاً",
            "🍧 البول: يمكن تقديمه في زبدية (Smoothie Bowl) وتزيينه بالفواكه والمكسرات"
        ]
    },
    // === HOT DRINKS (مشروبات حارة) ===
    {
        id: 1119,
        name: "قهوة سعودية (شقراء)",
        type: "drink_hot",
        category: "popular",
        calories: 50,
        protein: "1g",
        ingredients: ["بن سعودي", "هيل", "زعفران", "قرنفل", "ماء"],
        quantities: [
            "3 ملاعق كبيرة (45 مل) بن سعودي (محموس أشقر)",
            "1 ملعقة كبيرة (15 مل) هيل مطحون خشن",
            "¼ ملعقة صغيرة رشة زعفران (نقع بماء ورد اختياري) منقوع في 2 ملعقة كبيرة ماء دافئ",
            "3 حبات قرنفل (مسمار)",
            "1 كوب لتر ماء (240 مل)"
        ],
        steps: [
            "🔥 الغلي: اغلِ الماء، أضف البن واتركه يغلي بهدوء 15 دقيقة",
            "🌿 الإضافات: اطفي النار، أضف الهيل والزعفران في الدلة",
            "☕ الزل: صب القهوة في الدلة فوق الهيل (لا تغل الهيل حتى لا يمرر)",
            "🍬 التقديم: قدمها مع التمر السكري أو الخلاص"
        ]
    },
    {
        id: 1120,
        name: "كرك (شاي حليب)",
        type: "drink_hot",
        category: "popular",
        calories: 209,
        protein: "6g",
        ingredients: ["شاي", "حليب مبخر", "هيل", "سكر", "زعفران"],
        quantities: [
            "2 كيس شاي أو ملعقة شاي فرط",
            "علبة حليب مبخر (بوني/لونا)",
            "3 أكواب ماء",
            "2 ملعقة كبيرة سكر حسب الرغبة (25 جرام)",
            "3 حبات هيل وزنجبيل وزعفران"
        ],
        steps: [
            "🔥 الغلي: اغل الماء مع السكر و½ ملعقة صغيرة بهارات مشكلة (2.5 مل) 5 دقائق لاستخلاص النكهة",
            "🍂 الشاي: أضف الشاي واتركه يغلي دقيقتين",
            "🥛 الحليب: أضف الحليب واتركه يقلب مرة واحدة فقط",
            "☕ التقديم: صفه وقدمه ساخناً في الشتاء"
        ]
    },
    {
        id: 1153,
        name: "هوت شوكلت إيطالي (ثقيل)",
        type: "drink_hot",
        category: "international",
        calories: 128,
        protein: "3g",
        ingredients: ["حليب", "كاكاو", "نشا", "شوكولاتة داكنة", "سكر"],
        quantities: [
            "1 كوب (240 مل) حليب كامل الدسم",
            "1 ملعقة كبيرة (15 مل) كاكاو بودرة",
            "1 ملعقة صغيرة (5 مل) نشا (للقوام الثقيل)",
            "30 جرام شوكولاتة داكنة مبشورة",
            "2 ملعقة كبيرة سكر حسب الرغبة (25 جرام)"
        ],
        steps: [
            "🥣 الخلط: اخلط الحليب والكاكاو والنشا والسكر على البارد",
            "🔥 الطبخ: ضعه على النار مع التحريك المستمر",
            "🍫 الشوكولاتة: لما يسخن، أضف الشوكولاتة المبشورة وحرك حتى يثقل القوام",
            "☕ التقديم: قدمه مع كريمة مخفوقة على الوجه"
        ]
    },

    // === COLD DRINKS (مشروبات باردة) ===
    {
        id: 1154,
        name: "موهيتو فراولة",
        type: "drink_cold",
        category: "quick",
        calories: 52,
        protein: "1g",
        ingredients: ["سفن أب", "فراولة", "ليمون", "نعناع", "ثلج"],
        quantities: [
            "1 علبة سفن أب (أو مياه غازية)",
            "5 حبات فراولة طازجة",
            "شريحتين ليمون",
            "1 ملعقة كبيرة أوراق نعناع (4 جرام)",
            "كوب ثلج مجروش"
        ],
        steps: [
            "🔨 الهرس: في الكوب، اهرس الفراولة والنعناع والليمون قليلاً",
            "❄️ الثلج: املأ الكوب بالثلج",
            "🥤 الصب: صب السفن أب واستمتع بالانتعاش"
        ]
    },
    {
        id: 1155,
        name: "آيس سبانيش لاتيه",
        type: "drink_cold",
        category: "popular",
        calories: 50,
        protein: "3g",
        ingredients: ["قهوة", "حليب", "حليب مكثف", "ثلج"],
        quantities: [
            "دبل شوت اسبريسو (أو نصف كوب قهوة مركزة)",
            "كوب حليب بارد",
            "2 ملعقة كبيرة (30 مل) حليب مكثف محلى (نستله)",
            "كوب ثلج"
        ],
        steps: [
            "🥣 الخلط: اخلط الحليب العادي مع الحليب المكثف في الكوب",
            "❄️ الثلج: أضف الثلج",
            "☕ القهوة: صب القهوة ببطء على الثلج لعمل طبقات"
        ]
    },
    {
        id: 1156,
        name: "سموذي المانجو (تروبيكال)",
        type: "drink_cold",
        category: "healthy",
        calories: 148,
        protein: "8g",
        ingredients: ["مانجو", "زبادي", "عسل", "ثلج", "هيل"],
        quantities: [
            "كوب مانجو مجمدة",
            "½ كوب زبادي (120 مل)",
            "1 ملعقة كبيرة ملعقة عسل (21 جرام)",
            "3 حبات رشة هيل (سر المطاعم الهندية)",
            "1 كوب قليل من الماء أو عصير البرتقال (240 مل)"
        ],
        steps: [
            "🌪️ الخلط: اخلط كل المكونات في الخلاط حتى يصبح كريمي وناعم"
        ]
    },

    {
        id: 1121,
        name: "تشيز كيك ياباني (قطني)",
        type: "dessert",
        category: "international",
        calories: 432,
        protein: "35g",
        ingredients: ["جبن كريمي", "بيض", "سكر", "دقيق", "نشا"],
        quantities: [
            "160 جرام جبن كريمي + 20 جرام زبدة",
            "3 بيضات (مفصولة)",
            "50 جرام دقيق + 10 جرام نشا",
            "70 جرام حليب"
        ],
        steps: [
            "🧀 التذويب: ذوب الجبن والزبدة والحليب على حمام مائي. أضف الصفار والنواشف",
            "☁️ المارينج: اخفق البياض مع السكر حتى يصبح مارينج ناعم (Soft Peaks)",
            "🔄 الدمج: قلب المارينج مع خليط الجبن برفق شديد",
            "🛁 الحمام المائي: اخبزه في صينية داخل صينية بها ماء ساخن على (150°C) لمدة 60 دقيقة. (يهتز مثل الجيلي)"
        ]
    },
    {
        id: 1122,
        name: "تارت الفواكه (كاسترد)",
        type: "dessert",
        category: "international",
        calories: 70,
        protein: "1g",
        ingredients: ["عجينة تارت", "كاسترد", "فواكه", "جيلاتين"],
        quantities: [
            "قواعد تارت جاهزة أو مخبوزة",
            "1 ملعقة صغيرة كريم باتسيير (كاسترد ثقيل): صفار بيض، حليب، نشا، فانيليا (5 مل)",
            "فواكه مشكلة (كيوي، فراولة، توت)",
            "جل تلميع (أو مربى مشمش مخفف)"
        ],
        steps: [
            "🧁 الحشو: املأ التارت بالكاسترد البارد",
            "🍓 الرص: رص الفواكه بشكل فني جميل",
            "✨ اللمعة: ادهن الفواكه جل التلميع لتحافظ على شكلها وطراوتها"
        ]
    },
    {
        id: 1123,
        name: "إكلير (فرنسي)",
        type: "dessert",
        category: "international",
        calories: 138,
        protein: "2g",
        ingredients: ["عجينة شو", "كاسترد", "شوكولاتة"],
        quantities: [
            "2 شريحة عجينة الشو (دقيق، ماء، زبدة، بيض) - نفس عجينة بلح الشام ولكن تخبز",
            "2 ملعقة كبيرة حشوة كريمة دبلوماسية (كاسترد + كريمة خفق) (30 مل)",
            "50 جرام جليز شوكولاتة لامع"
        ],
        steps: [
            "🌬️ الخبز: شكل العجينة أصابع طويلة. اخبزها حتى تنتفخ وتجف من الداخل تماماً",
            "💉 الحقن: بخرم صغير من الأسفل، احقن الكريمة حتى تمتلئ",
            "🍫 التغطيس: غطس الوجه في الشوكولاتة المذابة. قدمه بارداً"
        ]
    },
    {
        id: 1124,
        name: "بروفيترول (كرات الشو)",
        type: "dessert",
        category: "international",
        calories: 138,
        protein: "2g",
        ingredients: ["عجينة شو", "آيس كريم", "صوص شوكولاتة"],
        quantities: [
            "كرات عجينة شو مخبوزة ومقرمشة",
            "1 ملعقة صغيرة آيس كريم فانيليا للحشو (5 مل)",
            "50 جرام صوص شوكولاتة ساخن جداً"
        ],
        steps: [
            "🍦 الحشو: اقطع الكرات نصفين واحشها بكرة آيس كريم (أو كريمة)",
            "🌋 الغرق: رص الكرات في طبق فوق بعضها (كالجبل). صب الشوكولاتة الساخنة عليها عند التقديم"
        ]
    },
    {
        id: 1125,
        name: "كيكة الليمون (المسقية)",
        type: "dessert",
        category: "international",
        calories: 50,
        protein: "3g",
        ingredients: ["دقيق", "ليمون", "بيض", "سكر", "زبادي"],
        quantities: [
            "2 ملعقة كبيرة خليط كيك الزبادي (يستخدم الزيت بدلاً من الزبدة للطراوة) (30 مل)",
            "بشر ليمونتين + عصير ليمون",
            "2 ملعقة كبيرة تشريبة: عصير ليمون + سكر بودرة (25 جرام)"
        ],
        steps: [
            "🍋 النكهة: افرك بشر الليمون مع السكر جيداً قبل الخلط (لاستخراج الزيوت العطرية)",
            "🍰 الخبز: اخبز الكيكة في قالب لوقف (Rechteckform)",
            "💧 التشريب: وهي ساخنة، صب عليها التشريبة لتتشرب وتصبح حامضة وحلوة"
        ]
    },
    {
        id: 1126,
        name: "كيكة التمر بصوص الكراميل",
        type: "dessert",
        category: "winter",
        calories: 423,
        protein: "5g",
        ingredients: ["تمر", "دقيق", "بيض", "كراميل", "جوز"],
        quantities: [
            "1 كوب كوب تمر منقوع في كوب ماء مغلي ومهروس (240 مل)",
            "½ ملعقة صغيرة خليط الكيك (دقيق أسمر وأبيض، بيض، زيت، قرفة) (2.5 مل)",
            "2 ملعقة كبيرة صوص توفي (كراميل بالكريمة) (30 مل)",
            "جوز (عين الجمل) مجروش"
        ],
        steps: [
            "🥧 الخلط: اخلط معجون التمر مع خليط الكيك والكربونات (تعطي لون غامق)",
            "🔥 الخبز: اخبزها حتى تنضج (رطبة قليلاً)",
            "🍮 الصوص: صب صوص التوفي الحار على الكيكة وقدمها مع كرة آيس كريم"
        ]
    },
    // === سلطات وشوربات وصوصات (Final Batch) ===
    {
        id: 1127,
        name: "سلطة الكينوا (سوبر فود)",
        type: "main",
        category: "healthy",
        calories: 50,
        protein: "1g",
        ingredients: ["كينوا", "خيار", "طماطم", "بقدونس", "ليمون"],
        quantities: [
            "كوب كينوا مسلوقة (ألوان)",
            "خيار وطماطم كرزية مقطعة",
            "2 ملعقة كبيرة مفروم بقدونس ونعناع مفروم (8 جرام)",
            "2 ملعقة كبيرة صوص: ليمون وزيت زيتون ودبس رمان (30 مل)"
        ],
        steps: [
            "🥗 الخلط: اخلط جميع المكونات وهي باردة",
            "🍋 التتبيل: صب الصوص قبل التقديم مباشرة لتبقى الكينوا مفلفلة"
        ]
    },
    {
        id: 1128,
        name: "سلطة الشمندر والجرجير",
        type: "main",
        category: "healthy",
        calories: 150,
        protein: "3g",
        ingredients: ["شمندر", "جرجير", "جوز", "فيتا", "بلسميك"],
        quantities: [
            "شمندر مسلوق (أو مشوي) مقطع مكعبات",
            "حزمة جرجير طازج",
            "مكعبات جبنة فيتا",
            "عين الجمل (جوز)",
            "1 ملعقة كبيرة صوص: خل بلسميك وعسل (21 جرام)"
        ],
        steps: [
            "🟣 القاعدة: افرد الجرجير في الطبق",
            "🎨 التزيين: وزع الشمندر والجبن والجوز",
            "🍯 الصوص: رش صوص البلسميك والعسل (مزيج الحلاوة والحموضة)"
        ]
    },
    {
        id: 1129,
        name: "فتوش باذنجان (دبس الرمان)",
        type: "main",
        category: "popular",
        calories: 50,
        protein: "1g",
        ingredients: ["باذنجان", "خبز مقلي", "خس", "خيار", "دبس رمان"],
        quantities: [
            "مكعبات باذنجان مقلية",
            "خضار الفتوش التقليدية (خس، فجل، رجلة)",
            "2 رغيف خبز عربي (60 جرام)",
            "1 ملعقة كبيرة صوص: دبس رمان كثيف، سماق، ليمون (20 جرام)"
        ],
        steps: [
            "🍆 القلي: اقل الباذنجان والخبز",
            "🥗 التجميع: اخلط الخضار. ضع الباذنجان والخبز على الوجه (ليحافظوا على القرمشة)",
            "🏺 الغرق: أغرقها بدبس الرمان والسماق"
        ]
    },
    {
        id: 1130,
        name: "تبولة الكينوا (بدون برغل)",
        type: "main",
        category: "healthy",
        calories: 50,
        protein: "2g",
        ingredients: ["بقدونس", "كينوا", "طماطم", "نعناع", "ليمون"],
        quantities: [
            "3 حزم بقدونس مفروم ناعم جداً",
            "½ كوب كينوا مسلوقة (بدل البرغل) (120 مل)",
            "طماطم مفرومة ناعمة + بصل أخضر",
            "2 ملعقة كبيرة ليمون وزيت زيتون (30 مل)"
        ],
        steps: [
            "🔪 الفرم: السر في الفرم الناعم جداً بالسكين (وليس الفرامة)",
            "🥣 الدمج: اخلط المكونات. الكينوا أخف على المعدة من البرغل وتناسب حساسية الجلوتين"
        ]
    },
    {
        id: 1131,
        name: "شوربة بروكلي شيدر (مطاعم)",
        type: "main",
        category: "quick",
        calories: 280,
        protein: "10g",
        ingredients: ["بروكلي", "جبن تشيدر", "جزر", "كريمة", "مرق"],
        quantities: [
            "رأس بروكلي مقطع زهرات صغيرة",
            "كوب جبن تشيدر أحمر مبشور",
            "جزر مبشور (يعطي لون وطعم)",
            "2 ملعقة كبيرة مرق دجاج + نصف كوب كريمة (30 مل)"
        ],
        steps: [
            "🥦 السلق: اسلق البروكلي والجزر في المرق حتى يطرى",
            "🧀 التثقيل: (اختياري) اضرب نصف الكمية بالخلاط وأعدها. أضف الكريمة والجبن وحرك حتى تذوب"
        ]
    },
    {
        id: 1132,
        name: "شوربة الفريك (مصرية)",
        type: "main",
        category: "healthy",
        calories: 115,
        protein: "20g",
        ingredients: ["فريك", "دجاج", "بصل", "هيل", "مستكة"],
        quantities: [
            "كوب فريك (قمح أخضر مشوي) منقوع",
            "قطع دجاج صغيرة أو قوانص",
            "1 ملعقة كبيرة بصلة مبشورة + سمن (15 جرام)",
            "مرق دجاج غني"
        ],
        steps: [
            "🌾 التشويح: شوح البصل والدجاج ثم الفريك في السمن جيداً (يعطي طعم التحميص)",
            "🍲 الغلي: أضف المرق واتركها تغلي حتى تتفتح حبات الفريك وتنضج. قوامها ثقيل ومشبع"
        ]
    },
    {
        id: 1133,
        name: "شوربة توم يام (تايلاندية)",
        type: "main",
        category: "international",
        calories: 62,
        protein: "4g",
        ingredients: ["روبيان", "فطر", "ليمون جراس", "حليب جوز هند", "فلفل"],
        quantities: [
            "روبيان بالقشر (للمرق)",
            "أعشاب توم يام (ليمون جراس، خولنجان، ورق ليمون)",
            "¼ ملعقة صغيرة فطر وعصير ليمون وفلفل حار (1.25 مل)",
            "قليل من حليب جوز الهند (للنوع الكريمي)"
        ],
        steps: [
            "🦐 المرق: اغل قشور الروبيان مع الأعشاب لتستخلص النكهة ثم صفها",
            "🍄 الإضافة: أضف الروبيان المنظف والفطر للمرق الصافي. اطبخ 3 دقائق فقط",
            "🥥 اللمسة: أطفئ النار وأضف عصير الليمون والفلفل وحليب جوز الهند"
        ]
    },
    {
        id: 1134,
        name: "صوص الرانش (منزلي)",
        type: "main",
        category: "quick",
        calories: 431,
        protein: "2g",
        ingredients: ["مايونيز", "زبادي", "شبت", "ثوم بودرة", "بقدونس"],
        quantities: [
            "2 ملعقة كبيرة نصف كوب مايونيز + نصف كوب زبادي (أو لبنة) (30 جرام)",
            "2 فص أعشاب مجففة (شبت، بقدونس، ثوم معمر) (6 جرام)",
            "2 فص نص ملعقة صغيرة بودرة ثوم وبصل (6 جرام)",
            "عصرة ليمون"
        ],
        steps: [
            "🥣 الخلط: اخلط كل المكونات. خففها بالحليب إذا أردته سائلاً",
            "❄️ التبريد: يحفظ في الثلاجة أسبوعاً. طعمه أقوى من الجاهز"
        ]
    },
    {
        id: 1135,
        name: "ثومية المطاعم (بدون بيض)",
        type: "main",
        category: "popular",
        calories: 549,
        protein: "1g",
        ingredients: ["ثوم", "نشا", "زيت", "ليمون", "ماء"],
        quantities: [
            "كوب ماء + 3 ملاعق نشا",
            "5 فصوص ثوم مهروس",
            "2 ملعقة كبيرة ربع كوب زيت نباتي (30 مل)",
            "1 ملعقة كبيرة ملعقة خل + عصرة ليمون (15 مل)"
        ],
        steps: [
            "🔥 المهلبية: اطبخ الماء والنشا حتى يصبح شفافاً وثقيلاً جداً. برده تماماً",
            "🌪️ الضرب: ضعه في الخلاط مع الثوم والليمون. أضف الزيت خيط رفيع (والخلاط يشتغل) حتى يصبح أبيض كريمي ناصع"
        ]
    },
    {
        id: 1136,
        name: "بيستو الريحان (إيطالي)",
        type: "main",
        category: "international",
        calories: 851,
        protein: "15g",
        ingredients: ["ريحان", "صنوبر", "جبن بارميزان", "زيت زيتون", "ثوم"],
        quantities: [
            "كوبين أوراق ريحان طازج",
            "½ كوب صنوبر (أو جوز/لوز) (120 مل)",
            "½ كوب بارميزان (120 مل)",
            "2 ملعقة كبيرة كوب زيت زيتون بكر (30 مل)",
            "2 فص فصين ثوم (6 جرام)"
        ],
        steps: [
            "🍃 الطحن: اضرب الريحان والمكسرات والجبن والثوم (ضربات متقطعة)",
            "🫒 الزيت: أضف الزيت بالتدريج لتحصل على صوص خشن قليلاً ولذيذ"
        ]
    },
    {
        id: 1137,
        name: "صوص باربكيو (مدخن)",
        type: "main",
        category: "quick",
        calories: 182,
        protein: "3g",
        ingredients: ["كاتشب", "خل تفاح", "سكر بني", "بابريكا مدخنة", "عسل"],
        quantities: [
            "2 ملعقة كبيرة كوب كاتشب (30 جرام)",
            "2 ملعقة كبيرة ربع كوب خل تفاح + ملعقتين سكر بني (25 جرام)",
            "1 ملعقة كبيرة ملعقة خردل + ملعقة صويا صوص (15 مل)",
            "½ ملعقة صغيرة بابريكا مدخنة (للنكهة) (2.5 مل)"
        ],
        steps: [
            "🔥 التسبيك: ضع المكونات في قدر صغير على نار هادئة 10 دقائق حتى تتمازج وتثقل",
            "🍗 الاستخدام: يستخدم لدهن المشويات أو التغميس"
        ]
    },
    {
        id: 1138,
        name: "صوص الطحينة (للفلافل)",
        type: "main",
        category: "popular",
        calories: 378,
        protein: "11g",
        ingredients: ["طحينة", "ليمون", "ماء", "ثوم", "كمون"],
        quantities: [
            "2 ملعقة كبيرة نصف كوب طحينة سائلة (30 جرام)",
            "3 ملعقة كبيرة عصير ليمون (45 مل)",
            "2 فص فص ثوم مهروس (6 جرام)",
            "1 كوب ماء بارد للتخفيف (240 مل)",
            "½ ملعقة صغيرة رشة كمون (2.5 مل)"
        ],
        steps: [
            "🥄 التحريك: اخلط الطحينة مع الليمون (ستثقل وتتكتل). أضف الماء بالتدريج مع التحريك حتى تبيض وتصبح ناعمة القوام"
        ]
    },
    {
        id: 1139,
        name: "مخلل خيار (سريع)",
        type: "main",
        category: "popular",
        calories: 50,
        protein: "1g",
        ingredients: ["خيار", "خل", "ماء", "شبت", "ثوم"],
        quantities: [
            "خيار صغير (Pickles)",
            "1 ملعقة صغيرة ملح (5 مل / 6 جرام)",
            "2 فص فصوص ثوم + شبت طازج (6 جرام)"
        ],
        steps: [
            "♨️ المحلول: اغل الماء والخل و1 ملعقة صغيرة ملح (5 مل)",
            "🥒 التخليل: رص الخيار في برطمان مع الثوم. صب المحلول المغلي عليه. أغلقه بإحكام. جاهز للأكل بعد 24 ساعة (أو لما يبرد)"
        ]
    },
    {
        id: 1140,
        name: "مخلل لفت (الوردي)",
        type: "main",
        category: "popular",
        calories: 15,
        protein: "0g",
        ingredients: ["لفت", "شمندر", "ملح", "ماء", "خل"],
        quantities: [
            "كيلو لفت مقطع أصابع",
            "حبة شمندر (للون)",
            "1 ملعقة صغيرة ملح (5 مل / 6 جرام)"
        ],
        steps: [
            "🧂 النقع: رش الملح على اللفت واتركه ساعة ينزل ماؤه (ليقرمش)",
            "💖 اللون: رصه في البرطمان مع قطع الشمندر. صب الماء و1 ملعقة صغيرة ملح (5 مل) وقليل من الخل. جاهز بعد 3-5 أيام"
        ]
    },
    {
        id: 1141,
        name: "زبدة فول سوداني (منزلية)",
        type: "dessert",
        category: "healthy",
        calories: 448,
        protein: "31g",
        ingredients: ["فول سوداني", "عسل", "زيت", "ملح"],
        quantities: [
            "2 كوب (480 مل) فول سوداني محمص (بدون قشر)",
            "1 ملعقة كبيرة ملعقة عسل (اختياري) (21 جرام)",
            "¼ ملعقة صغيرة ملح (1.25 مل)"
        ],
        steps: [
            "🌪️ الطحن المستمر: ضع الفول في المحضرة. اطحن ثم توقف. اطحن ثم توقف. سيتحول من بودرة -> عجين -> زبدة سائلة (اصبر عليها)",
            "🥜 القوام: لا تحتاج زيت إذا كان الفول دافئاً ومحمصاً جيداً"
        ]
    },
    {
        id: 1142,
        name: "نوتيلا صحية (بندق)",
        type: "dessert",
        category: "healthy",
        calories: 308,
        protein: "14g",
        ingredients: ["بندق", "كاكاو", "تمر", "حليب", "فانيليا"],
        quantities: [
            "كوب بندق محمص ومقشر",
            "1 ملعقة كبيرة ربع كوب كاكاو خام (7 جرام)",
            "1 ملعقة كبيرة نصف كوب تمر لين (أو عسل) (21 جرام)",
            "حليب (حسب القوام)"
        ],
        steps: [
            "🌰 زبدة البندق: اطحن البندق حتى يصبح زبدة سائلة (مثل الفول السوداني)",
            "🍫 الشوكولاتة: أضف الكاكاو والتمر (منزوع النوى) واضرب. خفف بالحليب حتى تصل لقوام الدهن"
        ]
    },
    {
        id: 1143,
        name: "كرات البطاطس بالجبن",
        type: "main",
        category: "quick",
        calories: 365,
        protein: "14g",
        ingredients: ["بطاطس", "جبن موزاريلا", "بقسماط", "بيض", "دقيق"],
        quantities: [
            "3 حبات بطاطس مسلوقة ومهروسة",
            "مكعبات جبن موزاريلا",
            "تغطية: دقيق، بيض، بقسماط (بانكو)"
        ],
        steps: [
            "🥔 العجن: تبل البطاطس ب½ ملعقة صغيرة ملح (2.5 مل) + ¼ ملعقة صغيرة فلفل أسود (1.25 مل) ونشا (لتتماسك)",
            "🧀 الحشو: خذ كرة بطاطس، احشها بمكعب جبن، كورها جيداً",
            "🔥 القلي: غمسها في الدقيق-البيض-البقسماط. اقلها في زيت غزير حتى تذوب الجبنة"
        ]
    },
    {
        id: 1144,
        name: "حلقات البصل المقرمشة",
        type: "main",
        category: "quick",
        calories: 127,
        protein: "6g",
        ingredients: ["بصل أبيض", "دقيق", "نشا", "مياه غازية", "بهارات"],
        quantities: [
            "بصل كبير مقطع حلقات عريضة",
            "1 ملعقة كبيرة خليط رطب: دقيق + نشا + بيكنج بودر + مياه غازية باردة (15 مل)",
            "1 ملعقة كبيرة خليط جاف: دقيق وبقسماط (15 مل)"
        ],
        steps: [
            "🧅 التقطيع: افصل حلقات البصل. غبرها بالدقيق",
            "🛁 الغمس: اغمسه في الخليط الرطب ثم الجاف",
            "🔥 القرمشة: اقلها فوراً. المياه الغازية تجعلها هشة جداً مثل المطاعم"
        ]
    },
    {
        id: 1145,
        name: "سبرينج رول خضار (صيني)",
        type: "main",
        category: "quick",
        calories: 50,
        protein: "2g",
        ingredients: ["رقائق سبرينج رول", "كرنب", "جزر", "صلصة صويا", "زنجبيل"],
        quantities: [
            "رقائق جاهزة (مجمدة)",
            "كرنب (ملفوف) وجزر مقطع أعواد رقيقة جداً (جوليان)",
            "2 ملعقة كبيرة صويا صوص وزيت سمسم (30 مل)"
        ],
        steps: [
            "🥕 الحشو: شوح الخضار والزنجبيل دقيقة واحدة فقط (يجب أن تقرمش). تبلها بالصويا",
            "🌯 اللف: ضع الحشو في الطرف، لف، اطو الجوانب، أكمل اللف. الصق الطرف بماء وعجين",
            "🔥 القلي: اقلها حتى تصبح ذهبية"
        ]
    },
    {
        id: 1146,
        name: "سمبوسة جبن سائل (الهبة)",
        type: "main",
        category: "popular",
        calories: 102,
        protein: "6g",
        ingredients: ["رقائق سمبوسة", "جبن سائل", "جبن تشيدر", "بيض"],
        quantities: [
            "رقائق سمبوسة جاهزة",
            "حشوة: كرافت تشيدر (علب زرقاء) مبشور + ملعقة جبن سائل",
            "¼ ملعقة صغيرة رشة فلفل أحمر مجروش (اختياري) (1.25 مل)"
        ],
        steps: [
            "🧀 الخلط: اخلط الأجبان (التشيدر يذوب والسائل يعطي كريمية)",
            "🔺 اللف: لفها مثلثات محكمة الإغلاق (مهم جداً حتى لا يخرج الجبن)",
            "🔥 القلي: القلي سريع جداً لأن الحشوة تذوب بسرعة"
        ]
    },
    {
        id: 1147,
        name: "فول قلابة (يمني)",
        type: "main",
        category: "popular",
        calories: 50,
        protein: "4g",
        ingredients: ["فول", "بصل", "طماطم", "كمون", "كزبرة"],
        quantities: [
            "علبة فول مدمس (أو مطبوخ منزلياً)",
            "2 فص كشكة: بصل، طماطم، صلصة، فلفل أخضر، ثوم (6 جرام)",
            "2 ملعقة كبيرة مفرومة كمون وكزبرة ناشفة (8 جرام)"
        ],
        steps: [
            "🧅 الكشنة: احمس البصل والثوم والفلفل. أضف الطماطم والصلصة حتى تتسبك",
            "🍲 الفول: اغسل الفول من ماء العلبة، اهرسه قليلاً وأضفه للكشنة. أضف قليلاً من الماء",
            "🔥 التبخير: غطه واتركه يتسبك. قدمه مبخراً (بالفحمة) لطعم التدخين"
        ]
    },
    {
        id: 1148,
        name: "كبدة غنم (صاج)",
        type: "main",
        category: "popular",
        calories: 50,
        protein: "1g",
        ingredients: ["كبدة", "بصل", "فلفل رومي", "طماطم", "بهارات"],
        quantities: [
            "كبدة طازجة مقطعة شرائح",
            "¼ ملعقة صغيرة بصل جوانح + فلفل بارد وحار (1.25 مل)",
            "طماطم مقطعة (اختياري)",
            "1 ملعقة صغيرة ملح (5 مل / 6 جرام)"
        ],
        steps: [
            "🔥 الصدمة: مقلاة ساخنة جداً. شوح الكبدة بسرعة (دقائق فقط) لتتغير لونها ولا تقسى",
            "🧅 الخضار: أضف البصل والفلفل وقلب دقيقتين. لا تبالغ في الطبخ",
            "🍋 التقديم: قدمها فوراً مع خبز وليمون"
        ]
    },
    {
        id: 1149,
        name: "بيض تركي (شيلبير)",
        type: "main",
        category: "international",
        calories: 322,
        protein: "18g",
        ingredients: ["بيض", "زبادي", "ثوم", "زبدة", "فلفل"],
        quantities: [
            "2 بيض مسلوق (بوشيه - بدون قشر)",
            "2 فص كوب زبادي يوناني + فص ثوم + شبت (6 جرام)",
            "½ ملعقة صغيرة صوص: زبدة مذابة + بابريكا + شطة (2.5 مل)"
        ],
        steps: [
            "🥣 القاعدة: اخلط الزبادي مع الثوم والأعشاب وافرده في الطبق (بدرجة حرارة الغرفة)",
            "🥚 البيض: اسلق البيض في ماء وخل (ليتماسك) 3 دقائق (الصفار سائل). ضعه فوق الزبادي",
            "🌶️ الصوص: صب الزبدة الحارة والشطة فوق البيض. اغمس بالخبز المقرمش"
        ]
    },
    {
        id: 1150,
        name: "بان كيك ياباني (سوفليه)",
        type: "dessert",
        category: "international",
        calories: 209,
        protein: "8g",
        ingredients: ["بيض", "دقيق", "حليب", "سكر", "فانيليا"],
        quantities: [
            "2 بيض مفصول",
            "30 جرام دقيق + 20 جرام حليب",
            "2 ملعقة كبيرة سكر للمارينج (25 جرام)",
            "1 ملعقة صغيرة فانيليا (5 مل)"
        ],
        steps: [
            "🥚 الصفار: اخلط الصفار والحليب والدقيق",
            "☁️ البياض: اخفق البياض مع السكر حتى يصبح مارينج ثابت وقوي جداً",
            "🥞 الطهي: اخلط برفق. صب 'كومة' عالية في المقلاة. غطها واطبخها على نار هادئة جداً بالبخار (أضف قطرات ماء في المقلاة) لتنتفخ وتهتز"
        ]
    },
    {
        id: 1151,
        name: "فرنش توست رول (محشي)",
        type: "dessert",
        category: "quick",
        calories: 86,
        protein: "3g",
        ingredients: ["توست", "نوتيلا", "فراولة", "بيض", "حليب"],
        quantities: [
            "شرائح توست منزوعة الأطراف",
            "حشوة: نوتيلا أو جبن كريمي وفراولة",
            "½ ملعقة صغيرة خليط تغميس: بيض وحليب وقرفة (2.5 مل)"
        ],
        steps: [
            "🍞 اللف: افرد التوست بالنشابة. احش ولف رول",
            "🍳 التحمير: اغمسه في البيض وحمره في الزبدة",
            "🍬 التغليف: دحرجه في سكر وقرفة وهو ساخن"
        ]
    },
    {
        id: 1152,
        name: "شوفان مخبوز (كيكة الفطور)",
        type: "main",
        category: "healthy",
        calories: 121,
        protein: "6g",
        ingredients: ["شوفان", "موز", "حليب", "كاكاو", "بيكنج بودر"],
        quantities: [
            "½ كوب شوفان مطحون (120 مل)",
            "موزة مهروسة (للتحلية والقوام)",
            "½ كوب حليب (120 مل)",
            "1 ملعقة صغيرة ملعقة كاكاو + بيكنج بودر (5 جرام)"
        ],
        steps: [
            "🥣 الخلط: اخلط المكونات في قالب (رامكين)",
            "🍫 القلب: اغرس قطعة شوكولاتة في الوسط",
            "🔥 الخبز: اخبزها 20 دقيقة. ستتحول لكيكة هشة من الخارج وسائلة من الداخل"
        ]
    },

    // === PASTRIES (معجنات) ===
    {
        id: 2001,
        name: "عجينة العشر دقائق السحرية",
        type: "pastry",
        category: "popular",
        calories: 253,
        protein: "5g",
        ingredients: ["دقيق", "خميرة", "سكر", "ملح", "زيت", "ماء دافئ"],
        quantities: [
            "3 أكواب دقيق أبيض",
            "1 ملعقة كبيرة (15 مل) خميرة فورية",
            "1 ملعقة صغيرة (5 مل) سكر",
            "1 ملعقة صغيرة (5 مل) ملح",
            "3 ملاعق كبيرة (45 مل) زيت نباتي",
            "1.5 كوب (360 مل) ماء دافئ (ليس حاراً)"
        ],
        steps: [
            "🔥 التحضير: سخّن الفرن على 200 درجة من الآن",
            "🥣 الخلط الجاف: اخلط الدقيق + الخميرة + السكر + الملح في وعاء كبير",
            "💧 العجن: أضف الزيت والماء الدافئ تدريجياً. اعجن 5 دقائق حتى تصبح ناعمة ومتماسكة",
            "⏳ الراحة: غطّها 5 دقائق فقط (لن تختمر كثيراً لكنها ستصبح طرية)",
            "✂️ التشكيل: قسّمها عدّل حسب ذوقك (فطائر، بيتزا، معجنات)",
            "✨ السر: هذه العجينة تنفع لكل شيء - فطائر، بيتزا، صامولي، خبز عربي!"
        ]
    },
    {
        id: 2002,
        name: "فطائر الجبنة (سمبوسة الفرن)",
        type: "pastry",
        category: "popular",
        calories: 1149,
        protein: "55g",
        ingredients: ["عجينة", "جبن", "بقدونس", "بيض"],
        quantities: [
            "عجينة العشر دقائق (أو جاهزة)",
            "2 كوب (480 مل) جبن أبيض مبشور (عكاوي أو فيتا)",
            "2 ملعقة كبيرة مفروم نصف حزمة بقدونس مفروم (8 جرام)",
            "1 بيضة للدهن",
            "1 ملعقة كبيرة رشة سمسم (10 جرام)"
        ],
        steps: [
            "🧀 الحشوة: اخلط الجبن مع البقدونس. (إذا كان الجبن مالحاً جداً، انقعه بالماء ساعة)",
            "✂️ التقطيع: افرد العجينة وقطعها دوائر أو مربعات",
            "🥟 الحشو: ضع ملعقة حشوة في كل قطعة واطوِها (مثلثات أو نصف قمر)",
            "🥚 الدهن: ادهنها بالبيض المخفوق ورش السمسم",
            "🔥 الخبز: اخبزها 15-20 دقيقة حتى تتحمر من فوق"
        ]
    },
    {
        id: 2003,
        name: "خلية النحل بالجبن",
        type: "pastry",
        category: "popular",
        calories: 1200,
        protein: "49g",
        ingredients: ["دقيق", "خميرة", "حليب", "زبدة", "جبن كيري", "عسل"],
        quantities: [
            "3 أكواب دقيق",
            "1 ملعقة كبيرة (15 مل) خميرة فورية",
            "1 كوب (240 مل) حليب دافئ",
            "1 ملعقة كبيرة نصف كوب زبدة ذائبة (15 جرام)",
            "1 بيضة",
            "2 ملعقة كبيرة ربع كوب سكر (25 جرام)",
            "12 قطعة جبن كيري (أو جبن قابل للمط)",
            "عسل + سمسم للوجه"
        ],
        steps: [
            "🥣 العجن: اخلط الدقيق + الخميرة + السكر. أضف الحليب والزبدة والبيض. اعجن 10 دقائق",
            "⏳ التخمير: غطّها واتركها ساعة حتى تتضاعف",
            "🧀 التشكيل: قسّم العجينة لـ 12 كرة. ضع قطعة جبن في كل كرة واغلقها",
            "🐝 الترتيب: رص الكرات في صينية دائرية متلاصقة (شكل خلية النحل)",
            "⏳ التخمير الثاني: غطّها 30 دقيقة",
            "🥚 الدهن: ادهنها بالبيض ورش السمسم",
            "🔥 الخبز: اخبزها 25 دقيقة على 180 درجة حتى تتحمر",
            "🍯 التلميع: ادهنها بالعسل وهي ساخنة فوراً"
        ]
    },
    {
        id: 2004,
        name: "فطائر السبانخ (مثلثات)",
        type: "pastry",
        category: "healthy",
        calories: 121,
        protein: "5g",
        ingredients: ["عجينة", "سبانخ", "بصل", "سماق", "ليمون", "زيت زيتون"],
        quantities: [
            "عجينة العشر دقائق",
            "500 جرام سبانخ طازج مفروم (أو مجمد مصفى جيداً)",
            "1 بصلة متوسطة مفرومة ناعم",
            "1 ملعقة كبيرة (15 مل) سماق (السر اللبناني)",
            "عصير 1 ليمونة",
            "3 ملاعق زيت زيتون",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام) + ¼ ملعقة صغيرة فلفل أسود (1.25 مل)"
        ],
        steps: [
            "🥬 التحضير: اعصر السبانخ جيداً جداً من الماء (مهم جداً!)",
            "🧅 الخلط: اخلط السبانخ + البصل + السماق + الليمون + الزيت + الملح",
            "✂️ التشكيل: افرد العجينة وقطعها دوائر (قطر 10 سم)",
            "🔺 اللف: ضع ملعقة حشوة في المنتصف، اطوِها مثلث من 3 جهات واضغط الأطراف",
            "🔥 الخبز: اخبزها 20 دقيقة على 190 درجة أو اقلها في الزيت"
        ]
    },

    // === SAUCES (صوصات) ===
    {
        id: 3001,
        name: "ثومية لبنانية أصلية",
        type: "sauce",
        category: "popular",
        calories: 539,
        protein: "1g",
        ingredients: ["ثوم", "زيت", "ليمون", "ملح"],
        quantities: [
            "1 رأس ثوم كامل (10-12 فص)",
            "1 كوب (240 مل) زيت نباتي (أو زيت زيتون خفيف)",
            "عصير 2 ليمونة",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)",
            "1 كوب ملعقة ماء مثلج (السر) (240 مل)"
        ],
        steps: [
            "🧄 الثوم: ضع الثوم + الملح + ملعقة ليمون في الخلاط (Food Processor أفضل). اخلط حتى يصبح ناعماً جداً",
            "🫗 الزيت: وأنت تخلط على سرعة بطيئة، أضف الزيت قطرة قطرة (ببطء شديد جداً!). هذا سر الاستحلاب",
            "💧 الماء: إذا بدأت تتفكك، أضف ملعقة ماء مثلج وأكمل",
            "🍋 الضبط: أضف باقي الليمون وتذوق الملوحة. يجب أن تصبح بيضاء وثقيلة مثل المايونيز",
            "❄️ الحفظ: تحفظ في الثلاجة أسبوعين"
        ]
    },
    {
        id: 3002,
        name: "صوص طحينة كريمي",
        type: "sauce",
        category: "popular",
        calories: 362,
        protein: "10g",
        ingredients: ["طحينة", "ثوم", "ليمون", "ماء", "كزبرة"],
        quantities: [
            "2 ملعقة كبيرة نصف كوب طحينة سائلة (30 جرام)",
            "1 فص ثوم مهروس",
            "عصير 1 ليمونة كبيرة",
            "1 كوب ربع كوب ماء بارد (للتخفيف) (240 مل)",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)",
            "2 ملعقة كبيرة مفروم بقدونس مفروم (اختياري) (8 جرام)"
        ],
        steps: [
            "🥣 القاعدة: ضع الطحينة في وعاء. أضف الثوم والليمون و½ ملعقة صغيرة ملح (2.5 مل)",
            "💧 التخفيف: أضف الماء ملعقة ملعقة وأنت تخلط. (الطحينة ستتكتل أولاً ثم تصبح كريمية)",
            "✨ القوام: استمر بإضافة الماء حتى تصل للقوام المطلوب (سائل للسلطات، ثقيل للغمس)",
            "🌿 التزيين: زيّنها بالبقدونس وزيت الزيتون والكمون",
            "🍽️ الاستخدام: مع الفلاحل، السمك، الشاورما، والسلطات"
        ]
    },
    {
        id: 3003,
        name: "صوص الجبن الذهبي",
        type: "sauce",
        category: "quick",
        calories: 468,
        protein: "25g",
        ingredients: ["جبن شيدر", "حليب", "زبدة", "دقيق", "ملح"],
        quantities: [
            "1.5 كوب (360 مل) جبن شيدر مبشور",
            "1 كوب (240 مل) حليب",
            "2 ملعقة كبيرة (30 مل) زبدة",
            "2 ملعقة كبيرة (30 مل) دقيق",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)"
        ],
        steps: [
            "🧈 الروكس: ذوّب الزبدة على نار هادئة. أضف الدقيق وحرّك دقيقة (لا تحرقه)",
            "🥛 الحليب: أضف الحليب دفعة واحدة وحرّك بسرعة بالمضرب السلك حتى يثخن (3-4 دقائق)",
            "🧀 الجبن: أطفئ النار تماماً. أضف الجبن وقلّب حتى يذوب من حرارة الخليط فقط",
            "🌶️ التتبيل: أضف ال½ ملعقة صغيرة ملح + ¼ ملعقة صغيرة فلفل أسود والبابريكا",
            "🍟 التقديم: قدّمه فوراً مع الناتشوز أو البطاطس أو البرجر"
        ]
    },
    {
        id: 3004,
        name: "صوص البيتزا المنزلي",
        type: "sauce",
        category: "quick",
        calories: 50,
        protein: "1g",
        ingredients: ["طماطم معلبة", "ثوم", "ريحان", "أوريجانو", "زيت زيتون"],
        quantities: [
            "1 علبة طماطم مهروسة (400 جرام)",
            "3 فصوص ثوم مفروم",
            "1 ملعقة صغيرة (5 مل) أوريجانو مجفف",
            "أوراق ريحان طازج (أو نصف ملعقة مجفف)",
            "2 ملعقة زيت زيتون",
            "2 ملعقة كبيرة نصف ملعقة صغيرة سكر (لموازنة الحموضة) (25 جرام)",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام) + ¼ ملعقة صغيرة فلفل أسود (1.25 مل)"
        ],
        steps: [
            "🔥 التسخين: سخّن الزيت على نار متوسطة. شوّح الثوم 30 ثانية (لا تحرقه)",
            "🍅 الطماطم: أضف الطماطم المهروسة + السكر + ال½ ملعقة صغيرة ملح + ¼ ملعقة صغيرة فلفل أسود + الأوريجانو",
            "⏳ التسبّيك: اتركها تغلي ثم خفّف النار. اطبخها 15-20 دقيقة حتى تتكثف وتتبخر السوائل",
            "🌿 الريحان: أضف الريحان الطازج في آخر دقيقة (إذا مجفف أضفه من البداية)",
            "❄️ الحفظ: يحفظ في الثلاجة أسبوع أو يجمّد شهر"
        ]
    },

    // === MORE PASTRIES ===
    {
        id: 2005,
        name: "بريوش حلو (خبز الحليب)",
        type: "pastry",
        category: "popular",
        calories: 915,
        protein: "12g",
        ingredients: ["دقيق", "حليب", "زبدة", "بيض", "سكر", "خميرة", "فانيليا"],
        quantities: [
            "4 أكواب دقيق",
            "1 كوب (240 مل) حليب دافئ",
            "1 ملعقة كبيرة نصف كوب زبدة ذائبة (15 جرام)",
            "2 بيضة",
            "2 ملعقة كبيرة نصف كوب سكر (25 جرام)",
            "1 ملعقة كبيرة (15 مل) خميرة فورية",
            "1 ملعقة صغيرة ملعقة فانيليا (5 مل)"
        ],
        steps: [
            "🥣 العجن: اخلط الدقيق + السكر + الخميرة + الفانيليا. أضف الحليب والبيض والزبدة تدريجياً",
            "👐 العجينة: اعجن 10 دقائق حتى تصبح ناعمة ولامعة ولا تلتصق",
            "⏳ التخمير: غطّها ساعة ونصف حتى تتضاعف",
            "✂️ التشكيل: قسّمها 12 كرة ورصها في صينية",
            "⏳ التخمير الثاني: غطّها 30 دقيقة",
            "🥚 الدهن: ادهنها بالبيض ورش السكر أو السمسم",
            "🔥 الخبز: اخبزها 20-25 دقيقة على 180 درجة"
        ]
    },
    {
        id: 2006,
        name: "بوريك تركي بالجبن",
        type: "pastry",
        category: "international",
        calories: 874,
        protein: "50g",
        ingredients: ["عجينة يوفكا", "جبن فيتا", "بقدونس", "بيض", "زيت", "حليب"],
        quantities: [
            "رقائق يوفكا (أو فيلو) جاهزة",
            "300 جرام جبن فيتا مفتت",
            "2 ملعقة كبيرة مفروم نصف حزمة بقدونس مفروم (8 جرام)",
            "2 بيضة للحشوة + 1 للدهن",
            "2 ملعقة كبيرة نصف كوب زيت + نصف كوب حليب (للمخلوط) (30 مل)"
        ],
        steps: [
            "🧀 الحشوة: اخلط الجبن + البقدونس + 2 بيضة",
            "🫗 المخلوط: اخلط الزيت والحليب في وعاء",
            "📜 التجهيز: ادهن كل رقيقة بالمخلوط وضع ملعقة حشوة على الطرف ولفّها رول",
            "🌀 الترتيب: لفّها حلزوني (لولبي) في الصينية من الخارج للداخل",
            "🥚 الدهن: ادهن الوجه بالبيض",
            "🔥 الخبز: اخبزها 35-40 دقيقة حتى تتحمر"
        ]
    },
    {
        id: 2007,
        name: "مناقيش زعتر لبنانية",
        type: "pastry",
        category: "popular",
        calories: 600,
        protein: "1g",
        ingredients: ["عجينة", "زعتر", "زيت زيتون", "سمسم"],
        quantities: [
            "عجينة العشر دقائق",
            "1 كوب (240 مل) زعتر ناشف (مخلوط لبناني)",
            "2 ملعقة كبيرة نصف كوب زيت زيتون (بكر ممتاز) (30 مل)",
            "1 ملعقة كبيرة سمسم محمص (10 جرام)"
        ],
        steps: [
            "🥣 الخلطة: اخلط الزعتر + الزيت + السمسم حتى يصبح عجينة طرية",
            "✂️ التقسيم: قسّم العجينة لـ 8 كرات",
            "🟢 الفرد: افرد كل كرة دائرة (سمك 5 مم)",
            "🌿 الدهن: وزّع خلطة الزعتر بسخاء على الوجه",
            "🔥 الخبز: اخبزها 10-12 دقيقة على 220 درجة (نار عالية)",
            "🍽️ التقديم: قدّمها ساخنة مع الشاي أو اللبنة"
        ]
    },
    {
        id: 2008,
        name: "سمبوسة لحم مقرمشة",
        type: "pastry",
        category: "popular",
        calories: 229,
        protein: "21g",
        ingredients: ["رقائق سمبوسة", "لحم مفروم", "بصل", "بهارات", "بقدونس"],
        quantities: [
            "رقائق سمبوسة جاهزة",
            "300 جرام لحم مفروم",
            "1 بصلة صغيرة مفرومة ناعم",
            "1.5 ملعقة صغيرة ملح (7.5 مل / 9 جرام)",
            "2 ملعقة كبيرة مفروم ربع حزمة بقدونس مفروم (8 جرام)",
            "1 كوب زيت نباتي للقلي (240 مل / 220 جرام)"
        ],
        steps: [
            "🥩 الحشوة: شوّح البصل ثم أضف اللحم. قلّب حتى ينضج وينشف الماء. أضف البهارات والبقدونس",
            "❄️ التبريد: اترك الحشوة تبرد تماماً",
            "🔺 اللف: ضع ملعقة في طرف الرقيقة واطوِها مثلث. اغلقها بالماء",
            "🔥 القلي: اقلها في زيت غزير حتى تتحمر من كل الجهات",
            "📝 نصيحة: للفرن ادهنها بالزيت واخبزها 20 دقيقة"
        ]
    },

    // === MORE SAUCES ===
    {
        id: 3005,
        name: "صوص الباربيكيو المدخن",
        type: "sauce",
        category: "international",
        calories: 75,
        protein: "1g",
        ingredients: ["كاتشب", "خل", "سكر بني", "بابريكا مدخنة", "ثوم", "ورشيستر"],
        quantities: [
            "1 كوب (240 مل) كاتشب",
            "1 ملعقة كبيرة ربع كوب خل أبيض (15 مل)",
            "3 ملاعق سكر بني",
            "1 ملعقة صغيرة (5 مل) بابريكا مدخنة (السر!)",
            "1 ملعقة صغيرة (5 مل) ثوم بودرة",
            "1 ملعقة صوص وورشيستر (أو صويا)",
            "¼ ملعقة صغيرة فلفل أسود (1.25 مل)"
        ],
        steps: [
            "🥣 الخلط: ضع جميع المكونات في قدر صغير",
            "🔥 الطبخ: سخّن على نار متوسطة مع التحريك حتى يغلي",
            "⏳ التسبّيك: خفّف النار واتركه 10-15 دقيقة حتى يثخن قليلاً",
            "❄️ التبريد: اتركه يبرد (سيثخن أكثر عند التبريد)",
            "🍖 الاستخدام: مع المشويات، البرجر، الأجنحة، الستيك"
        ]
    },
    {
        id: 3006,
        name: "صوص الرانش الكريمي",
        type: "sauce",
        category: "international",
        calories: 448,
        protein: "7g",
        ingredients: ["مايونيز", "زبادي", "ثوم", "شبت", "بقدونس", "ليمون"],
        quantities: [
            "2 ملعقة كبيرة نصف كوب مايونيز (30 جرام)",
            "½ كوب زبادي (أو قشطة حامضة) (120 مل)",
            "1 فص ثوم مهروس ناعم",
            "1 ملعقة شبت مجفف (أو طازج مفروم)",
            "1 ملعقة بقدونس مفروم",
            "عصرة ليمون",
            "رشة ½ ملعقة صغيرة ملح (2.5 مل / 3 جرام) + ¼ ملعقة صغيرة فلفل أسود (1.25 مل)"
        ],
        steps: [
            "🥣 الخلط: اخلط المايونيز والزبادي حتى يتجانسا",
            "🧄 الإضافات: أضف الثوم والشبت والبقدونس والليمون",
            "🧂 التتبيل: تبّل بـ½ ملعقة صغيرة ملح + ¼ ملعقة صغيرة فلفل أسود حسب الذوق",
            "❄️ الراحة: غطّه وضعه بالثلاجة 30 دقيقة لتتداخل النكهات",
            "🥗 الاستخدام: مع السلطات، الأجنحة، البطاطس، الخضار"
        ]
    },
    {
        id: 3007,
        name: "صوص الفلفل الحار (هوت صوص)",
        type: "sauce",
        category: "quick",
        calories: 102,
        protein: "3g",
        ingredients: ["فلفل حار أحمر", "ثوم", "خل", "ملح", "سكر"],
        quantities: [
            "10 حبات فلفل أحمر حار (أزل البذور لتخفيف الحرارة)",
            "4 فصوص ثوم",
            "1 ملعقة كبيرة نصف كوب خل أبيض (15 مل)",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)",
            "2 ملعقة كبيرة ملعقة صغيرة سكر (25 جرام)"
        ],
        steps: [
            "🌶️ التحضير: أزل سيقان الفلفل (احتفظ بالبذور للحرارة القوية أو أزلها)",
            "🥣 الخلط: ضع الفلفل + الثوم + الخل + الملح + السكر في الخلاط",
            "🔄 الطحن: اخلط حتى يصبح ناعماً تماماً",
            "🔥 الطبخ (اختياري): سخّنه 5 دقائق لتعقيمه ولنكهة أعمق",
            "🫙 الحفظ: صبّه في زجاجة نظيفة. يحفظ شهور في الثلاجة"
        ]
    },
    {
        id: 3008,
        name: "صوص الكراميل المنزلي",
        type: "sauce",
        category: "quick",
        calories: 325,
        protein: "2g",
        ingredients: ["سكر", "زبدة", "كريمة خفق", "فانيليا", "ملح"],
        quantities: [
            "1 كوب سكر (200 جرام) أبيض",
            "6 ملاعق زبدة (غير مملحة)",
            "2 ملعقة كبيرة نصف كوب كريمة خفق (ثقيلة) (30 مل)",
            "1 ملعقة صغيرة ملعقة صغيرة فانيليا (5 مل)",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)"
        ],
        steps: [
            "🔥 التسخين: ضع السكر في قدر ثقيل على نار متوسطة. لا تحركه!",
            "👀 المراقبة: راقبه حتى يبدأ بالذوبان من الأطراف ويتحول لون العسل. حرّكه قليلاً",
            "🧈 الزبدة: عندما يصبح بني ذهبي غامق، أضف الزبدة فوراً. حرّك بسرعة (سيفور كثيراً!)",
            "🥛 الكريمة: ارفعه عن النار. أضف الكريمة ببطء مع التحريك المستمر",
            "✨ اللمسات: أضف الفانيليا و½ ملعقة صغيرة ملح (2.5 مل). اتركه يبرد",
            "🍦 الاستخدام: فوق الآيس كريم، الكيك، البان كيك، أو أي حلى!"
        ]
    },

    // === TRADITIONAL SAUDI DESSERTS & MAIN ===
    {
        id: 4007,
        name: "العصيدة",
        type: "main",
        category: "popular",
        calories: 433,
        protein: "7g",
        ingredients: ["دقيق", "تمر", "سمن", "ملح"],
        quantities: [
            "2 كوب دقيق (240 جرام) (بر أو دبي)",
            "3 أكواب ماء (تقريباً)",
            "1 ملعقة صغيرة ملح (5 مل / 6 جرام)",
            "لسلق التمر: نص كوب تمر منزوع النوى",
            "سمن بلدي وعسل للتقديم"
        ],
        steps: [
            "🥣 التمر: اغلِ التمر مع الماء حتى يذوب تماماً، ثم صفّه (اختياري للون والنكهة)",
            "🔥 الغلي: ضع ماء التمر (أو ماء عادي مملح) في قدر واتركه يغلي",
            "🌾 الدقيق: أضف الدقيق دفعة واحدة مع التحريك القوي والسريع بملعقة خشبية (المصواط)",
            "💪 العجن: استمر بالتحريك والهرس على نار هادئة حتى تختفي الكتل وتستوي العجينة (15-20 دقيقة)",
            "🍯 التقديم: شكّلها في صحن، اعمل حفرة في الوسط، صب فيها السمن والعسل"
        ]
    },
    {
        id: 4008,
        name: "ميقعة التنور (أكلة أهل الأفلاج)",
        type: "main",
        category: "popular",
        calories: 701,
        protein: "5g",
        ingredients: ["دقيق بر", "بصل", "سمن", "فلفل أسود", "كركم"],
        quantities: [
            "3 أكواب دقيق بر (أسمر)",
            "2 بصلة كبيرة مفرومة ناعم جداً",
            "1 ملعقة كبيرة نصف كوب سمن (للعجن والدهن) (15 جرام)",
            "1 ملعقة صغيرة (5 مل) فلفل أسود",
            "1 ملعقة صغيرة (5 مل) كركم (اختياري)",
            "1 كوب ماء دافئ للعجن (240 مل)",
            "1 ملعقة صغيرة ملح (5 مل / 6 جرام)"
        ],
        steps: [
            "🧅 الحشوة: افرم البصل ناعم جداً واخلطه مع الفلفل الأسود والكركم وقليل من السمن",
            "🥣 العجن: اخلط الدقيق مع الماء و1 ملعقة صغيرة ملح (5 مل) وباقي خليط البصل لعمل عجينة متماسكة وقاسية قليلاً",
            "⏳ الراحة: اتركها ترتاح 30 دقيقة",
            "🔥 التنور: سخّن التنور (أو الفرن حار جداً)",
            "📜 الفرد: افرد العجينة لأقراص متوسطة السماكة",
            "✋ الخبز: الصقها في التنور حتى تتحمر وتنضج",
            "✨ التقديم: تدهن فور خروجها بالسمن البري وتقدم ساخنة. (يمكن فتّها بالسمن أيضاً)"
        ]
    },
    {
        id: 4009,
        name: "الحنيني (شتوي)",
        type: "dessert",
        category: "popular",
        calories: 459,
        protein: "4g",
        ingredients: ["خبز بر", "تمر", "زبدة", "ليمون", "هيل"],
        quantities: [
            "2 شريحة أقراص خبز بر (قرصان) سميك",
            "2 كوب (480 مل) تمر خلاص منزوع النوى",
            "نصف اصبع زبدة (50جم)",
            "1 ليمون (عدّل حسب ذوقك)",
            "¼ ملعقة صغيرة رشة هيل وفلفل أسود (1.25 مل)"
        ],
        steps: [
            "🍞 التحضير: قطّع الخبز وهو ساخن قطع صغيرة",
            "🔄 الفرم: في مفرمة اللحم، افرم الخبز مع التمر بالتبادل حتى يمتزجا",
            "🔥 التسخين: ضع الخليط في قدر، أضف الزبدة المذابة والليمون والهيل",
            "🥄 التقليب: قلّبه على نار هادئة جداً حتى يسخن ويتشرب الزبدة",
            "🧀 التقديم: شكّله هرمي أو في حافظة. قدمه ساخناً مع زبدة إضافية على الوجه"
        ]
    },
    {
        id: 4001,
        name: "العريكة الجنوبية",
        type: "dessert",
        category: "popular",
        calories: 1128,
        protein: "8g",
        ingredients: ["دقيق بر", "تمر", "سمن", "عسل", "قشطة", "موز"],
        quantities: [
            "2 كوب دقيق بر (قمح كامل)",
            "1 كوب (240 مل) تمر منزوع النوى",
            "1 ملعقة كبيرة نصف كوب سمن بلدي (أو زبدة) (15 جرام)",
            "1 ملعقة كبيرة ربع كوب عسل (21 جرام)",
            "قشطة طازجة للوجه",
            "1 موزة (اختياري)",
            "1 كوب ماء دافئ للعجن (240 مل)"
        ],
        steps: [
            "🌾 العجن: اعجن الدقيق البر مع ماء دافئ حتى تصبح عجينة متماسكة",
            "🔥 الخبز: افرد العجينة واخبزها على الصاج أو في الفرن حتى تنضج",
            "👐 الهرس: وهي ساخنة، فتتها وأضف السمن الذائب والتمر",
            "🥣 الخلط: اهرس الكل معاً حتى يتجانس (يدوياً أو بالخلاط)",
            "🍯 التقديم: شكّلها في طبق، اسكب العسل والقشطة على الوجه",
            "🍌 الإضافة: أضف شرائح الموز إذا رغبت (ستصبح معصوب!)"
        ]
    },
    {
        id: 4002,
        name: "المعصوب الحجازي",
        type: "dessert",
        category: "popular",
        calories: 948,
        protein: "8g",
        ingredients: ["خبز بر", "موز", "عسل", "سمن", "قشطة", "جبن كريمي"],
        quantities: [
            "4 أرغفة خبز بر (أو خبز تميس)",
            "3 موزات ناضجة",
            "1 ملعقة كبيرة نصف كوب سمن بلدي ذائب (15 جرام)",
            "1 ملعقة كبيرة ربع كوب عسل سدر (21 جرام)",
            "علبة قشطة",
            "جبن كريمي (اختياري)"
        ],
        steps: [
            "🍞 التحضير: فتّت الخبز قطع صغيرة. إذا كان جافاً، رشّه بقليل من الماء",
            "🍌 الموز: قطّع الموز شرائح واهرسه خشن (ليس ناعم جداً)",
            "🔥 التسخين: سخّن السمن في مقلاة. أضف الخبز وقلّب حتى يتشرب السمن",
            "🥣 الخلط: أضف الموز واخلط جيداً حتى يتجانس",
            "🍯 التقديم: ضعه في طبق التقديم. اسكب العسل والقشطة بكمية سخية",
            "✨ الإضافات: زيّنه بالمكسرات أو الجبن الكريمي عدّل حسب ذوقك"
        ]
    },

    // === TRADITIONAL SAUDI MAIN DISHES ===
    {
        id: 4003,
        name: "السليق الحجازي",
        type: "main",
        category: "popular",
        calories: 800,
        protein: "55g",
        ingredients: ["دجاج", "أرز مصري", "حليب", "سمن", "مستكة", "هيل"],
        quantities: [
            "1 دجاجة كاملة (1.5 كيلو)",
            "2 كوب أرز (360 جرام) مصري (حبة قصيرة)",
            "4 أكواب حليب كامل الدسم",
            "3 ملاعق سمن",
            "½ ملعقة صغيرة مستكة مطحونة",
            "5 حبات هيل",
            "1 ملعقة كبيرة ملح (15 مل / 18 جرام)"
        ],
        steps: [
            "🍗 السلق: اسلق الدجاجة مع البهارات الحب (هيل، قرنفل، قرفة) والبصل حتى تنضج تماماً. احتفظ بالمرقة",
            "🍚 الأرز: اغسل الأرز جيداً. في قدر، سخّن السمن وقلّب الأرز دقيقتين",
            "🥛 الطبخ: أضف 2 كوب مرقة + 2 كوب حليب + المستكة + الملح. غطِّ واطبخ على نار هادئة",
            "🔄 الإضافة: عندما ينشف السائل، أضف كوبين حليب آخرين. قلّب برفق",
            "⏳ النضج: استمر بالتقليب على نار هادئة جداً حتى يصبح الأرز كريمياً (مثل الريزوتو)",
            "🍗 الدجاج: حمّر الدجاجة في الفرن أو على الشواية",
            "🍽️ التقديم: ضع الأرز الأبيض الكريمي في طبق والدجاجة المحمرة فوقه"
        ]
    },
    {
        id: 4004,
        name: "المرقوق النجدي",
        type: "main",
        category: "popular",
        calories: 574,
        protein: "40g",
        ingredients: ["لحم", "دقيق بر", "كوسة", "قرع", "جزر", "طماطم", "بصل", "ليمون أسود"],
        quantities: [
            "500 جرام لحم غنم بالعظم",
            "2 كوب دقيق (240 جرام) بر (للرقاق)",
            "2 كوسة مقطعة",
            "قطعة قرع أصفر",
            "2 جزرة",
            "2 طماطم + 2 ملعقة صلصة",
            "1 بصلة كبيرة",
            "3 ليمون أسود + بهارات"
        ],
        steps: [
            "🥩 اللحم: في قدر ضغط، شوّح البصل ثم أضف اللحم و½ ملعقة صغيرة بهارات مشكلة (2.5 مل). أضف الماء واطبخ 30 دقيقة",
            "🥕 الخضار: أضف الخضار المقطعة كبيرة + الليمون الأسود + الطماطم. أكمل الطبخ 10 دقائق",
            "🌾 العجينة: اعجن الدقيق البر مع ماء وقليل ملح. اتركها ترتاح 15 دقيقة",
            "📜 الفرد: قسّم العجينة لكرات صغيرة. افرد كل كرة رقيقة جداً (شفافة تقريباً)",
            "🍲 الإضافة: ضع الرقاق فوق المرق المغلي طبقة طبقة حتى ينضج",
            "🍽️ التقديم: قدّمه ساخناً مع المرق والخضار واللحم"
        ]
    },
    {
        id: 4005,
        name: "المطازيز",
        type: "main",
        category: "popular",
        calories: 574,
        protein: "40g",
        ingredients: ["لحم", "دقيق بر", "كوسة", "قرع", "طماطم", "بصل", "بهارات"],
        quantities: [
            "500 جرام لحم مقطع",
            "2 كوب دقيق (240 جرام) بر",
            "2 كوب خضار مشكلة (300 جرام)",
            "2 طماطم + صلصة",
            "1 بصلة",
            "بهارات و2 حبة ليمون أسود مجفف (لومي)"
        ],
        steps: [
            "🥩 المرق: اطبخ اللحم مع البصل و½ ملعقة صغيرة بهارات مشكلة (2.5 مل) حتى ينضج",
            "🥕 الخضار: أضف الخضار المقطعة واتركها تطبخ",
            "🌾 العجينة: اعجن الدقيق البر مع ماء دافئ وقليل زيت",
            "👐 التشكيل: قسّمها لكرات صغيرة. افردها بأصابعك لأقراص رفيعة (مثل الأذن)",
            "🍲 الطبخ: أنزل المطازيز في المرقة المغلية واحدة واحدة",
            "⏳ النضج: اتركها تطبخ 15-20 دقيقة حتى تنضج العجينة",
            "🍽️ التقديم: قدّمها مع المرق والخضار"
        ]
    },
    {
        id: 4006,
        name: "المراصيع (فطور شعبي)",
        type: "main",
        category: "popular",
        calories: 1200,
        protein: "19g",
        ingredients: ["دقيق", "بيض", "سكر", "خميرة", "سمن", "عسل"],
        quantities: [
            "2 كوب دقيق (240 جرام) أبيض",
            "2 بيضة",
            "2 ملعقة سكر",
            "1 ملعقة صغيرة (5 مل) خميرة فورية",
            "2 كوب (480 مل) ماء دافئ (تقريباً)",
            "سمن وعسل للتقديم"
        ],
        steps: [
            "🥣 الخلط: اخلط الدقيق + الخميرة + السكر. أضف البيض والماء تدريجياً",
            "🔄 العجينة: اخلط جيداً حتى تصبح عجينة سائلة (مثل البان كيك لكن أثقل)",
            "⏳ التخمير: غطّها واتركها 30 دقيقة في مكان دافئ",
            "🔥 الطبخ: سخّن مقلاة غير لاصقة. صب مغرفة وافردها دائرية",
            "👀 العلامة: عندما تظهر فقاعات على السطح وينشف الوجه، اقلبها 10 ثواني فقط",
            "🍯 التقديم: كدّسها فوق بعض. ادهنها بالسمن وصب العسل. تؤكل ساخنة!"
        ]
    },

    // === MORE PASTRIES ===
    {
        id: 2009,
        name: "صفيحة لحم (لحم بعجين)",
        type: "pastry",
        category: "popular",
        calories: 269,
        protein: "21g",
        ingredients: ["عجينة", "لحم مفروم", "طماطم", "بصل", "فلفل رومي", "دبس رمان"],
        quantities: [
            "عجينة العشر دقائق أو عجينة بيتزا",
            "300 جرام لحم مفروم ناعم",
            "1 طماطم مفرومة ناعم",
            "1 بصلة صغيرة مفرومة ناعم",
            "¼ ملعقة صغيرة نصف فلفل رومي مفروم (1.25 مل)",
            "1 ملعقة دبس رمان",
            "1.5 ملعقة صغيرة ملح (7.5 مل / 9 جرام)"
        ],
        steps: [
            "🥩 الحشوة: اخلط اللحم النيء + الطماطم + البصل + الفلفل + دبس الرمان + البهارات",
            "✂️ التقطيع: قسّم العجينة لكرات وافردها دوائر رفيعة",
            "🥄 الفرد: وزّع الحشوة على كل دائرة بطبقة رفيعة (لا تكثر)",
            "🔥 الخبز: اخبزها في فرن حار جداً (230°C) لمدة 8-10 دقائق",
            "🍋 التقديم: قدّمها مع ليمون ونعناع طازج ولبن"
        ]
    },
    {
        id: 2010,
        name: "فطيرة تركية بالجبن والبقدونس",
        type: "pastry",
        category: "international",
        calories: 1003,
        protein: "55g",
        ingredients: ["عجينة", "جبن فيتا", "جبن موزاريلا", "بقدونس", "بيض"],
        quantities: [
            "عجينة رقيقة (يوفكا أو فيلو أو محضرة)",
            "1 كوب (240 مل) جبن فيتا مفتت",
            "1 كوب (240 مل) جبن موزاريلا مبشور",
            "2 ملعقة كبيرة مفروم نصف حزمة بقدونس مفروم (8 جرام)",
            "1 بيضة للحشوة + 1 للدهن"
        ],
        steps: [
            "🧀 الحشوة: اخلط الأجبان + البقدونس + البيضة",
            "📜 التشكيل: ضع الحشوة في منتصف العجينة واطوِها مربع أو مثلث",
            "🥚 الدهن: ادهن الوجه بالبيض",
            "🔥 الخبز: اخبزها 20-25 دقيقة على 180 درجة حتى تتحمر"
        ]
    },

    // === MORE SAUCES ===
    {
        id: 3009,
        name: "صوص الخردل والعسل",
        type: "sauce",
        category: "international",
        calories: 77,
        protein: "1g",
        ingredients: ["خردل", "عسل", "مايونيز", "ليمون"],
        quantities: [
            "2 ملعقة كبيرة (30 مل) خردل ديجون",
            "2 ملعقة كبيرة (30 مل) عسل",
            "2 ملعقة كبيرة (30 مل) مايونيز",
            "عصرة ليمون",
            "¼ ملعقة صغيرة ملح (1.25 مل) + ⅛ ملعقة صغيرة فلفل أسود"
        ],
        steps: [
            "🥣 الخلط: اخلط جميع المكونات في وعاء صغير",
            "🔄 التجانس: حرّك جيداً حتى يتجانس الخليط تماماً",
            "❄️ التبريد: غطّه وضعه بالثلاجة 15 دقيقة",
            "🍗 الاستخدام: مع الدجاج المقلي، السلطات، الناجتس"
        ]
    },
    {
        id: 3010,
        name: "الدقوس السعودي",
        type: "sauce",
        category: "popular",
        calories: 50,
        protein: "1g",
        ingredients: ["طماطم", "فلفل حار", "ثوم", "كزبرة", "ليمون"],
        quantities: [
            "3 طماطم طازجة",
            "2-3 فلفل أخضر حار (عدّل حسب ذوقك)",
            "4 فصوص ثوم",
            "نصف حزمة 2 ملعقة كبيرة كزبرة طازجة مفرومة (8 جرام)",
            "عصير 1 ليمونة",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)"
        ],
        steps: [
            "🥣 الخلط: ضع كل المكونات في الخلاط",
            "🔄 الطحن: اخلط على نبضات حتى يصبح خشناً قليلاً (لا تجعله ناعماً جداً)",
            "🧂 التتبيل: تذوّق وعدّل الملح والليمون",
            "🍽️ التقديم: مع الكبسة، المندي، المظبي، أو أي رز ولحم"
        ]
    },

    // === 15 MORE PASTRIES (to reach 25) ===
    {
        id: 2011,
        name: "المشلتت اليمني",
        type: "pastry",
        category: "popular",
        calories: 1200,
        protein: "11g",
        ingredients: ["دقيق", "سمن", "عسل", "بيض"],
        quantities: [
            "3 أكواب دقيق",
            "1 ملعقة كبيرة نصف كوب سمن ذائب (15 جرام)",
            "1 كوب ماء دافئ للعجن (240 مل)",
            "¼ ملعقة صغيرة ملح (1.25 مل)",
            "عسل وسمن للتقديم"
        ],
        steps: [
            "🥣 العجن: اعجن الدقيق مع الماء و½ ملعقة صغيرة ملح (2.5 مل) حتى يصبح ناعماً",
            "⏳ الراحة: غطّه واتركه يرتاح 30 دقيقة",
            "📜 الفرد: قسّم العجينة لكرات. افرد كل كرة رقيقة جداً",
            "🧈 التطبيق: ادهنها بالسمن واطوِها عدة طيات (مربعات أو مثلثات)",
            "🔥 الطبخ: اشوِها على صاج أو مقلاة حتى تتحمر من الجهتين",
            "🍯 التقديم: قدّمها ساخنة مدهونة بالسمن ومغمورة بالعسل"
        ]
    },
    {
        id: 2012,
        name: "كرواسون بالزبدة",
        type: "pastry",
        category: "international",
        calories: 1200,
        protein: "36g",
        ingredients: ["دقيق", "زبدة", "خميرة", "حليب", "سكر", "بيض"],
        quantities: [
            "500 جرام دقيق",
            "250 جرام زبدة باردة (للتطبيق)",
            "1 ملعقة كبيرة (15 مل) خميرة",
            "1 كوب (240 مل) حليب",
            "3 ملاعق سكر",
            "1 بيضة للدهن"
        ],
        steps: [
            "🥣 العجينة: اعجن الدقيق والحليب والخميرة والسكر. برّدها ساعة",
            "🧈 التطبيق: افرد العجينة، ضع شريحة زبدة في الوسط واطوِها",
            "🔄 الطيات: افرد واطوِ 3 مرات (كل مرة برّدها 30 دقيقة)",
            "✂️ التقطيع: افردها وقطّعها مثلثات ولفّها من القاعدة للرأس",
            "⏳ التخمير: اتركها تختمر ساعة",
            "🔥 الخبز: ادهنها بالبيض واخبزها 18 دقيقة على 200°C"
        ]
    },
    {
        id: 2013,
        name: "باتيه دجاج (فطيرة محشية)",
        type: "pastry",
        category: "quick",
        calories: 568,
        protein: "37g",
        ingredients: ["عجينة باف", "دجاج", "بصل", "كريمة", "فطر"],
        quantities: [
            "عجينة باف باستري جاهزة",
            "صدر دجاج مسلوق ومفتت",
            "بصلة مفرومة",
            "2 ملعقة كبيرة نصف كوب كريمة طبخ (30 مل)",
            "فطر مقطع (اختياري)"
        ],
        steps: [
            "🍗 الحشوة: شوّح البصل، أضف الدجاج والفطر والكريمة و1 ملعقة صغيرة بهارات (5 مل)",
            "✂️ التقطيع: قطّع العجينة دوائر (قطّاعة بسكويت)",
            "🥟 الحشو: ضع ملعقة حشوة واطوِها نصف دائرة. اغلق بالشوكة",
            "🥚 الدهن: ادهنها بالبيض",
            "🔥 الخبز: اخبزها 20 دقيقة على 200°C حتى تنتفخ وتتحمر"
        ]
    },
    {
        id: 2014,
        name: "رول الزعتر والجبن",
        type: "pastry",
        category: "quick",
        calories: 841,
        protein: "16g",
        ingredients: ["عجينة", "زعتر", "جبن", "زيت زيتون"],
        quantities: [
            "عجينة العشر دقائق",
            "1 ملعقة كبيرة نصف كوب خلطة زعتر (15 مل)",
            "1 كوب (240 مل) جبن عكاوي أو موزاريلا مبشور",
            "2 ملعقة كبيرة ربع كوب زيت زيتون (30 مل)"
        ],
        steps: [
            "📜 الفرد: افرد العجينة مستطيل رفيع",
            "🌿 الدهن: ادهنها بالزيت ووزّع الزعتر والجبن",
            "🌀 اللف: لفّها رول محكم",
            "✂️ التقطيع: قطّعها شرائح (2 سم)",
            "🔥 الخبز: رصها في صينية واخبزها 15 دقيقة"
        ]
    },
    {
        id: 2015,
        name: "قطايف بالجبن",
        type: "pastry",
        category: "popular",
        calories: 986,
        protein: "47g",
        ingredients: ["دقيق", "خميرة", "جبن عكاوي", "قطر", "زيت"],
        quantities: [
            "2 كوب دقيق (240 جرام)",
            "1 ملعقة صغيرة (5 مل) خميرة",
            "2.5 كوب (600 مل) ماء دافئ",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)",
            "قطر (شيرة) للتحلية"
        ],
        steps: [
            "🥣 العجينة: اخلط الدقيق والخميرة والماء حتى تصبح سائلة",
            "⏳ الراحة: اتركها 30 دقيقة تختمر",
            "🔥 الصب: صب مغرفة صغيرة على صاج ساخن (وجه واحد فقط)",
            "🧀 الحشو: ضع ملعقة جبن واطوِها نصف دائرة واغلقها",
            "🔥 القلي: اقلها في زيت حتى تتحمر",
            "🍯 التقديم: اغمسها بالقطر وقدّمها"
        ]
    },
    {
        id: 2016,
        name: "لقيمات ذهبية",
        type: "pastry",
        category: "popular",
        calories: 892,
        protein: "48g",
        ingredients: ["دقيق", "خميرة", "نشا", "زعفران", "هيل", "قطر"],
        quantities: [
            "2 كوب دقيق (240 جرام)",
            "¼ كوب نشا (60 مل)",
            "1 ملعقة كبيرة (15 مل) خميرة",
            "3 حبات رشة زعفران وهيل",
            "2.5 كوب (600 مل) ماء دافئ",
            "2 ملعقة كبيرة زيت للقلي وقطر للتحلية (30 مل)"
        ],
        steps: [
            "🥣 الخلط: اخلط كل المكونات الجافة ثم أضف الماء",
            "⏳ التخمير: اتركها ساعة تختمر وتتضاعف",
            "🔥 القلي: سخّن الزيت. اغرف بملعقة مبللة وأنزلها بالزيت",
            "👀 القلب: اقلها حتى تصبح ذهبية من كل الجهات",
            "🍯 التحلية: اغمسها بالقطر الدافئ وقدّمها فوراً"
        ]
    },
    {
        id: 2017,
        name: "معمول بالتمر",
        type: "pastry",
        category: "popular",
        calories: 1200,
        protein: "26g",
        ingredients: ["سميد", "طحين", "سمن", "ماء ورد", "تمر"],
        quantities: [
            "2 كوب (480 مل) سميد ناعم",
            "1 كوب (240 مل) طحين",
            "1 كوب (240 مل) سمن ذائب",
            "1 كوب نصف كوب ماء ورد (240 مل)",
            "عجينة تمر جاهزة"
        ],
        steps: [
            "🥣 العجينة: اخلط السميد والطحين والسمن. اتركها ليلة",
            "💧 الإضافة: أضف ماء الورد واعجن حتى تتماسك",
            "🟤 الحشوة: شكّل التمر كرات صغيرة",
            "👐 التشكيل: خذ قطعة عجينة، ضع الحشوة واغلقها. استخدم القالب",
            "🔥 الخبز: اخبزها 15 دقيقة على 180°C (لا تتحمر كثيراً)",
            "✨ التزيين: رشها بالسكر البودرة بعد التبريد"
        ]
    },
    {
        id: 2018,
        name: "كليجة عراقية",
        type: "pastry",
        category: "popular",
        calories: 890,
        protein: "4g",
        ingredients: ["دقيق", "سمن", "سكر", "حبة سوداء", "تمر أو جوز"],
        quantities: [
            "3 أكواب دقيق",
            "1 كوب (240 مل) سمن",
            "2 ملعقة كبيرة نصف كوب سكر (25 جرام)",
            "حليب دافئ للعجن",
            "حشوة: تمر أو جوز مطحون"
        ],
        steps: [
            "🥣 العجينة: اخلط الدقيق والسمن والسكر. أضف الحليب تدريجياً",
            "⏳ الراحة: اتركها 30 دقيقة",
            "✂️ التقطيع: افردها وقطّعها دوائر",
            "🥟 الحشو: ضع الحشوة واطوِها نصف دائرة",
            "🎨 الزخرفة: اضغط بالشوكة أو القالب الخاص",
            "🔥 الخبز: اخبزها 15-18 دقيقة حتى تتحمر قليلاً"
        ]
    },
    {
        id: 2019,
        name: "بقلاوة بالفستق",
        type: "pastry",
        category: "popular",
        calories: 1200,
        protein: "24g",
        ingredients: ["فيلو", "فستق", "سمن", "قطر", "ماء ورد"],
        quantities: [
            "باكيت عجينة فيلو",
            "2 كوب (480 مل) فستق مطحون خشن",
            "1 كوب (240 مل) سمن ذائب",
            "1 كوب قطر بارد مع ماء ورد (240 مل)"
        ],
        steps: [
            "📜 التحضير: ادهن كل ورقة فيلو بالسمن ورصها (8-10 طبقات)",
            "🥜 الحشو: وزّع الفستق بالتساوي",
            "📜 التغطية: ضع بقية أوراق الفيلو المدهونة",
            "✂️ التقطيع: قطّعها معينات قبل الخبز",
            "🔥 الخبز: اخبزها 35 دقيقة على 180°C",
            "🍯 التحلية: صب القطر البارد فوراً وهي ساخنة"
        ]
    },
    {
        id: 2020,
        name: "فطيرة التفاح",
        type: "pastry",
        category: "international",
        calories: 296,
        protein: "1g",
        ingredients: ["عجينة باف", "تفاح", "سكر بني", "قرفة", "زبدة"],
        quantities: [
            "عجينة باف باستري",
            "4 تفاحات مقشرة ومقطعة شرائح",
            "2 ملعقة كبيرة ربع كوب سكر بني (25 جرام)",
            "½ ملعقة صغيرة ملعقة صغيرة قرفة (2.5 مل)",
            "2 ملعقة زبدة"
        ],
        steps: [
            "🍎 الحشوة: سخّن الزبدة وشوّح التفاح مع السكر والقرفة 5 دقائق",
            "📜 القالب: افرد العجينة وبطّن قالب الفطيرة",
            "🥧 الحشو: صب حشوة التفاح وغطّها بالعجينة",
            "🥚 الدهن: ادهنها بالبيض وزخرفها",
            "🔥 الخبز: اخبزها 30-35 دقيقة على 190°C",
            "✨ التقديم: قدّمها دافئة مع آيس كريم فانيليا"
        ]
    },
    {
        id: 2021,
        name: "سينابون (لفائف القرفة)",
        type: "pastry",
        category: "international",
        calories: 626,
        protein: "9g",
        ingredients: ["دقيق", "خميرة", "حليب", "زبدة", "سكر بني", "قرفة", "كريم تشيز"],
        quantities: [
            "4 أكواب دقيق",
            "1 ملعقة كبيرة (15 مل) خميرة",
            "1 كوب (240 مل) حليب دافئ",
            "الحشوة: نصف كوب زبدة + 1 كوب سكر (200 جرام) بني + 2 ملعقة قرفة",
            "2 ملعقة كبيرة الصوص: جبن كريمي + سكر بودرة (25 جرام)"
        ],
        steps: [
            "🥣 العجن: اعجن الدقيق والحليب والخميرة والبيض والزبدة",
            "⏳ التخمير: اتركها ساعة تتضاعف",
            "📜 الفرد: افردها مستطيل رفيع",
            "🧈 الحشو: ادهنها بالزبدة ورش السكر والقرفة",
            "🌀 اللف: لفّها رول وقطّعها 12 قطعة (2 سم)",
            "🔥 الخبز: رصها في صينية واخبزها 25 دقيقة على 180°C",
            "🧁 الصوص: اخلط الجبن الكريمي والسكر وصبّه فوقها"
        ]
    },
    {
        id: 2022,
        name: "دونات منزلية",
        type: "pastry",
        category: "international",
        calories: 561,
        protein: "11g",
        ingredients: ["دقيق", "خميرة", "حليب", "بيض", "سكر", "زبدة", "شوكولاتة"],
        quantities: [
            "3 أكواب دقيق",
            "1 ملعقة كبيرة (15 مل) خميرة",
            "½ كوب حليب دافئ (120 مل)",
            "2 بيضة",
            "2 ملعقة كبيرة ربع كوب سكر (25 جرام)",
            "1 كوب زيت نباتي للقلي (240 مل / 220 جرام)",
            "2 ملعقة كبيرة شوكولاتة أو سكر للتغطية (25 جرام)"
        ],
        steps: [
            "🥣 العجن: اخلط كل المكونات واعجن 10 دقائق",
            "⏳ التخمير: اتركها ساعة تتضاعف",
            "⭕ التشكيل: افردها وقطّعها دوائر (استخدم كوب + غطاء للحلقة)",
            "⏳ مرة ثانية: اتركها 30 دقيقة تختمر",
            "🔥 القلي: اقلها في زيت متوسط الحرارة حتى تتحمر",
            "🍫 التزيين: اغمسها في الشوكولاتة أو السكر أو الجليز"
        ]
    },
    {
        id: 2023,
        name: "بيتزا محشية الأطراف",
        type: "pastry",
        category: "international",
        calories: 454,
        protein: "29g",
        ingredients: ["عجينة", "صوص طماطم", "جبن موزاريلا", "بيبروني", "فلفل"],
        quantities: [
            "عجينة بيتزا طازجة",
            "صوص البيتزا المنزلي",
            "2 كوب (480 مل) موزاريلا مبشور",
            "بيبروني أو أي حشوة",
            "أعواد جبن للأطراف"
        ],
        steps: [
            "📜 الفرد: افرد العجينة أكبر من الصينية",
            "🧀 الأطراف: ضع أعواد الجبن على الأطراف ولفّها للداخل",
            "🍅 الصوص: وزّع الصوص في المنتصف",
            "🧀 الحشو: وزّع الجبن والبيبروني والخضار",
            "🔥 الخبز: اخبزها 15-20 دقيقة على 220°C"
        ]
    },
    {
        id: 2024,
        name: "بريك تونسي",
        type: "pastry",
        category: "international",
        calories: 182,
        protein: "14g",
        ingredients: ["ورق بريك", "تونة", "بيض", "بقدونس", "بطاطس"],
        quantities: [
            "ورق بريك (أو فيلو)",
            "1 علبة تونة مصفاة (185 جرام)",
            "1 بيضة لكل بريك",
            "2 ملعقة كبيرة مفروم بقدونس مفروم (8 جرام)",
            "بطاطس مسلوقة مهروسة"
        ],
        steps: [
            "🥔 الحشوة: اخلط التونة والبطاطس والبقدونس",
            "📜 التحضير: ضع ملعقة حشوة على الورقة",
            "🥚 البيض: اكسر بيضة فوق الحشوة (نيئة)",
            "🔺 الطي: اطوِها مثلث بسرعة",
            "🔥 القلي: اقلها فوراً 2 دقيقة لكل جهة (الصفار يبقى سائل)",
            "🍽️ التقديم: قدّمها ساخنة جداً مع ليمون"
        ]
    },
    {
        id: 2025,
        name: "كنافة نابلسية",
        type: "pastry",
        category: "popular",
        calories: 1200,
        protein: "41g",
        ingredients: ["كنافة", "جبن نابلسي", "سمن", "قطر", "فستق"],
        quantities: [
            "500 جرام كنافة شعر",
            "500 جرام جبن نابلسي (منقوع ومعصور)",
            "1 كوب (240 مل) سمن ذائب",
            "1 كوب قطر مع ماء ورد (240 مل)",
            "فستق مطحون للتزيين"
        ],
        steps: [
            "🧈 التحضير: افرم الكنافة واخلطها مع السمن جيداً",
            "📜 الترتيب: افرد نصف الكنافة في صينية واضغطها",
            "🧀 الجبن: وزّع الجبن بالتساوي",
            "📜 التغطية: افرد النصف الثاني واضغط",
            "🔥 الطبخ: اشوِها على النار 20 دقيقة ثم اقلبها واشوِ الجهة الثانية",
            "🍯 التحلية: صب القطر وزيّنها بالفستق"
        ]
    },

    // === 15 MORE SAUCES (to reach 25) ===
    {
        id: 3011,
        name: "صوص الفريدو",
        type: "sauce",
        category: "international",
        calories: 126,
        protein: "2g",
        ingredients: ["زبدة", "كريمة", "بارميزان", "ثوم"],
        quantities: [
            "4 ملاعق زبدة",
            "1 كوب (240 مل) كريمة خفق",
            "1 كوب (240 مل) جبن بارميزان مبشور",
            "2 فص ثوم"
        ],
        steps: [
            "🧈 الذوبان: ذوّب الزبدة وشوّح الثوم",
            "🥛 الكريمة: أضف الكريمة واتركها تغلي خفيف",
            "🧀 الجبن: أطفئ النار وأضف البارميزان مع التقليب",
            "🍝 التقديم: قدّمه فوراً مع الباستا"
        ]
    },
    {
        id: 3012,
        name: "صوص البيستو",
        type: "sauce",
        category: "international",
        calories: 737,
        protein: "8g",
        ingredients: ["ريحان", "صنوبر", "بارميزان", "ثوم", "زيت زيتون"],
        quantities: [
            "2 كوب (480 مل) أوراق ريحان طازج",
            "¼ كوب صنوبر محمص (60 مل)",
            "½ كوب بارميزان (120 مل)",
            "2 فص ثوم",
            "2 ملعقة كبيرة نصف كوب زيت زيتون (30 مل)"
        ],
        steps: [
            "🥣 الخلط: ضع الريحان والصنوبر والثوم في الخلاط",
            "🔄 الطحن: اخلط مع إضافة الزيت تدريجياً",
            "🧀 الإضافة: أضف البارميزان و½ ملعقة صغيرة ملح (2.5 مل)",
            "🍝 الاستخدام: مع الباستا أو السلطات أو على الخبز"
        ]
    },
    {
        id: 3013,
        name: "صوص الفول السوداني",
        type: "sauce",
        category: "international",
        calories: 436,
        protein: "1g",
        ingredients: ["زبدة فول سوداني", "صويا", "ليمون", "ثوم", "زنجبيل"],
        quantities: [
            "1 ملعقة كبيرة نصف كوب زبدة فول سوداني (15 جرام)",
            "2 ملعقة صويا صوص",
            "عصير 1 ليمونة",
            "1 فص ثوم",
            "ملعقة صغيرة زنجبيل"
        ],
        steps: [
            "🥣 الخلط: اخلط كل المكونات مع قليل ماء",
            "🔄 القوام: أضف ماء حتى يصبح صوص سائل",
            "🍜 الاستخدام: مع الساتاي، النودلز، السلطات الآسيوية"
        ]
    },
    {
        id: 3014,
        name: "صوص الكاجون الحار",
        type: "sauce",
        category: "international",
        calories: 50,
        protein: "1g",
        ingredients: ["بابريكا", "كايين", "ثوم بودرة", "أوريجانو", "زعتر"],
        quantities: [
            "2 ملعقة بابريكا",
            "1 ملعقة صغيرة (5 مل) كايين",
            "1 ملعقة ثوم بودرة",
            "1 ملعقة أوريجانو وزعتر",
            "2 ملعقة كبيرة زيت أو زبدة ذائبة (30 مل)"
        ],
        steps: [
            "🥣 الخلط: اخلط كل البهارات",
            "🧈 المزج: أضف الزيت لتصبح عجينة",
            "🍗 الاستخدام: لتتبيل الدجاج، الروبيان، السمك"
        ]
    },
    {
        id: 3015,
        name: "صوص الشيميشوري الأرجنتيني",
        type: "sauce",
        category: "international",
        calories: 668,
        protein: "2g",
        ingredients: ["بقدونس", "أوريجانو", "ثوم", "خل", "زيت زيتون", "فلفل أحمر"],
        quantities: [
            "1 كوب (240 مل) بقدونس مفروم ناعم",
            "2 ملعقة كبيرة ربع كوب زيت زيتون (30 مل)",
            "2 ملعقة خل أحمر",
            "4 فصوص ثوم مفروم",
            "ملعقة أوريجانو",
            "¼ ملعقة صغيرة رشة فلفل أحمر مجروش (1.25 مل)"
        ],
        steps: [
            "🌿 الفرم: افرم البقدونس والثوم ناعماً",
            "🥣 الخلط: اخلط كل المكونات",
            "⏳ الراحة: اتركه ساعة لتتداخل النكهات",
            "🥩 التقديم: صوص ستيك أرجنتيني أصلي"
        ]
    },
    {
        id: 3016,
        name: "صوص السريراتشا مايو",
        type: "sauce",
        category: "quick",
        calories: 412,
        protein: "1g",
        ingredients: ["مايونيز", "سريراتشا", "ليمون"],
        quantities: [
            "2 ملعقة كبيرة نصف كوب مايونيز (30 جرام)",
            "2 ملعقة صوص سريراتشا",
            "عصرة ليمون"
        ],
        steps: [
            "🥣 الخلط: اخلط كل المكونات جيداً",
            "🍣 الاستخدام: مع السوشي، البرجر، البطاطس، المقليات"
        ]
    },
    {
        id: 3017,
        name: "صوص الترياكي الياباني",
        type: "sauce",
        category: "international",
        calories: 50,
        protein: "1g",
        ingredients: ["صويا", "ميرين", "سكر", "زنجبيل", "ثوم"],
        quantities: [
            "1 ملعقة كبيرة نصف كوب صويا صوص (15 مل)",
            "2 ملعقة كبيرة ربع كوب ميرين (أو خل أرز + سكر) (25 جرام)",
            "2 ملعقة سكر",
            "ملعقة زنجبيل مبشور",
            "1 فص ثوم"
        ],
        steps: [
            "🔥 الطبخ: اخلط كل المكونات في قدر واغليها",
            "⏳ التسبّيك: خفّف النار واتركها 10 دقائق حتى تثخن",
            "🍗 الاستخدام: تتبيلة ودهان للدجاج والسلمون واللحم"
        ]
    },
    {
        id: 3018,
        name: "صوص الجواكامولي",
        type: "sauce",
        category: "international",
        calories: 105,
        protein: "2g",
        ingredients: ["أفوكادو", "ليمون", "بصل", "طماطم", "كزبرة", "فلفل حار"],
        quantities: [
            "2 حبة أفوكادو ناضجة",
            "عصير 1 ليمونة",
            "ربع بصلة مفرومة ناعم",
            "1 طماطم مفرومة",
            "2 ملعقة كبيرة كزبرة طازجة مفرومة (8 جرام)",
            "¼ ملعقة صغيرة فلفل هالبينو (اختياري) (1.25 مل)"
        ],
        steps: [
            "🥑 الهرس: اهرس الأفوكادو بالشوكة (ليس ناعم جداً)",
            "🥣 الخلط: أضف باقي المكونات وقلّب",
            "🍋 الحفظ: غطّه بغشاء لاصق ملامس للسطح (يمنع السواد)",
            "🌮 الاستخدام: مع الناتشوز، التاكو، البرجر"
        ]
    },
    {
        id: 3019,
        name: "صوص الروز الفرنسي",
        type: "sauce",
        category: "international",
        calories: 127,
        protein: "2g",
        ingredients: ["طماطم", "كريمة", "بصل", "ثوم", "ريحان"],
        quantities: [
            "1 علبة طماطم مهروسة",
            "2 ملعقة كبيرة نصف كوب كريمة طبخ (30 مل)",
            "بصلة صغيرة مفرومة",
            "2 فص ثوم",
            "ريحان طازج"
        ],
        steps: [
            "🧅 التحمير: شوّح البصل والثوم",
            "🍅 الطماطم: أضف الطماطم واطبخها 15 دقيقة",
            "🥛 الكريمة: أضف الكريمة وقلّب",
            "🍝 الاستخدام: صوص باستا كريمي بالطماطم"
        ]
    },
    {
        id: 3020,
        name: "صوص الهولينديز",
        type: "sauce",
        category: "international",
        calories: 969,
        protein: "10g",
        ingredients: ["صفار بيض", "زبدة", "ليمون", "فلفل أبيض"],
        quantities: [
            "3 صفار بيض",
            "1 ملعقة كبيرة نصف كوب زبدة ذائبة ساخنة (15 جرام)",
            "1 ملعقة عصير ليمون",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)"
        ],
        steps: [
            "🥣 الخفق: اخفق الصفار مع الليمون على حمام مائي ساخن",
            "🧈 الزبدة: أضف الزبدة ببطء شديد مع الخفق المستمر",
            "✨ القوام: استمر حتى يثخن ويصبح كريمي",
            "🥚 التقديم: صوص البيض بينديكت الكلاسيكي"
        ]
    },
    {
        id: 3021,
        name: "صوص المانجو الحار",
        type: "sauce",
        category: "international",
        calories: 50,
        protein: "1g",
        ingredients: ["مانجو", "فلفل حار", "ليمون", "كزبرة"],
        quantities: [
            "1 مانجو ناضجة مقطعة",
            "1 فلفل هالبينو",
            "عصير 1 ليمونة",
            "2 ملعقة كبيرة كزبرة طازجة مفرومة (8 جرام)",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)"
        ],
        steps: [
            "🥭 الخلط: اخلط كل المكونات في الخلاط",
            "🔄 القوام: اخلط حتى يصبح ناعماً",
            "🍤 الاستخدام: مع الروبيان المشوي، السمك، التاكو"
        ]
    },
    {
        id: 3022,
        name: "صوص النعناع والزبادي",
        type: "sauce",
        category: "healthy",
        calories: 83,
        protein: "8g",
        ingredients: ["زبادي", "نعناع", "ثوم", "ليمون", "كمون"],
        quantities: [
            "1 كوب (240 مل) زبادي يوناني",
            "1 ملعقة كبيرة ربع كوب نعناع طازج مفروم (4 جرام)",
            "1 فص ثوم مهروس",
            "2 ملعقة كبيرة عصير ليمون (30 مل)",
            "½ ملعقة صغيرة ملح (2.5 مل / 3 جرام)"
        ],
        steps: [
            "🌿 الخلط: اخلط كل المكونات جيداً",
            "❄️ التبريد: برّده 30 دقيقة",
            "🥙 الاستخدام: مع الكباب، الفلافل، الشاورما"
        ]
    },
    {
        id: 3023,
        name: "صوص الغريفي (مرق اللحم)",
        type: "sauce",
        category: "international",
        calories: 50,
        protein: "1g",
        ingredients: ["مرقة لحم", "دقيق", "زبدة", "بصل"],
        quantities: [
            "2 كوب (480 مل) مرقة لحم (أو دجاج)",
            "2 ملعقة زبدة",
            "2 ملعقة دقيق",
            "بصل مفروم (اختياري)"
        ],
        steps: [
            "🧈 الروكس: ذوّب الزبدة وأضف الدقيق. قلّب حتى يتحمر قليلاً",
            "🥣 المرقة: أضف المرقة تدريجياً مع التحريك",
            "⏳ التسبّيك: اتركه يغلي حتى يثخن",
            "🍖 الاستخدام: مع الستيك، البطاطس المهروسة، الديك الرومي"
        ]
    },
    {
        id: 3024,
        name: "صوص السالسا المكسيكية",
        type: "sauce",
        category: "international",
        calories: 50,
        protein: "2g",
        ingredients: ["طماطم", "بصل", "فلفل هالبينو", "كزبرة", "ليمون"],
        quantities: [
            "4 طماطم مفرومة مكعبات",
            "نصف بصلة مفرومة ناعم",
            "1 فلفل هالبينو مفروم",
            "2 ملعقة كبيرة مفرومة ربع كوب كزبرة (8 جرام)",
            "عصير 2 ليمونة"
        ],
        steps: [
            "🔪 التقطيع: قطّع كل الخضار مكعبات صغيرة",
            "🥣 الخلط: اخلطها مع الليمون و½ ملعقة صغيرة ملح (2.5 مل)",
            "⏳ الراحة: اتركها 30 دقيقة لتتداخل النكهات",
            "🌮 الاستخدام: مع الناتشوز، التاكو، البوريتو"
        ]
    },
    {
        id: 3025,
        name: "صوص العسل والصويا (للمشويات)",
        type: "sauce",
        category: "quick",
        calories: 195,
        protein: "1g",
        ingredients: ["عسل", "صويا", "ثوم", "زنجبيل", "سمسم"],
        quantities: [
            "1 ملعقة كبيرة ربع كوب عسل (21 جرام)",
            "1 ملعقة كبيرة ربع كوب صويا صوص (15 مل)",
            "2 فص ثوم مهروس",
            "ملعقة زنجبيل مبشور",
            "2 ملعقة كبيرة ملعقة زيت سمسم (30 مل)"
        ],
        steps: [
            "🥣 الخلط: اخلط كل المكونات",
            "🍗 الاستخدام: تتبيلة ودهان للدجاج واللحم",
            "🔄 ملاحظة: يحترق بسرعة بسبب العسل، استخدمه آخر 5 دقائق من الشوي"
        ]
    }
];

const ingredientsList = [
    // PROTEINS
    { id: "chicken", name: "دجاج", icon: "🍗", usage: ["main"] },
    { id: "whole_chicken", name: "دجاج كامل", icon: "🦃", usage: ["main"] },
    { id: "chicken_breast", name: "صدور دجاج", icon: "🥓", usage: ["main"] },
    { id: "meat", name: "لحم مفروم", icon: "🥩", usage: ["main"] },
    { id: "steak", name: "لحم ستيك", icon: "🥩", usage: ["main"] },
    { id: "meat_chunk", name: "لحم", icon: "🍖", usage: ["main"] },
    { id: "fish", name: "سمك", icon: "🐟", usage: ["main"] },
    { id: "tuna", name: "تونة", icon: "🐟", usage: ["main"] },

    // VEGGIES (Main mostly)
    { id: "tomato", name: "طماطم", icon: "🍅", usage: ["main"] },
    { id: "onion", name: "بصل", icon: "🧅", usage: ["main"] },
    { id: "garlic", name: "ثوم", icon: "🧄", usage: ["main"] },
    { id: "potato", name: "بطاطس", icon: "🥔", usage: ["main"] },
    { id: "carrot", name: "جزر", icon: "🥕", usage: ["main", "dessert"] },
    { id: "cucumber", name: "خيار", icon: "🥒", usage: ["main"] },
    { id: "pepper", name: "فلفل رومي", icon: "🫑", usage: ["main"] },
    { id: "eggplant", name: "باذنجان", icon: "🍆", usage: ["main"] },
    { id: "zucchini", name: "كوسة", icon: "🥒", usage: ["main"] },
    { id: "molokhia", name: "ملوخية", icon: "🌿", usage: ["main"] },
    { id: "parsley", name: "بقدونس/كزبرة", icon: "🌿", usage: ["main"] },
    { id: "lettuce", name: "خس", icon: "🥬", usage: ["main"] },
    { id: "mushroom", name: "فطر", icon: "🍄", usage: ["main"] },
    { id: "mixed_veg", name: "خضار مشكل", icon: "🥦", usage: ["main"] },
    { id: "mint", name: "نعناع", icon: "🌿", usage: ["main", "drink"] }, // NEW

    // FRUITS (Dessert & Drink)
    { id: "apple", name: "تفاح", icon: "🍎", usage: ["dessert", "drink"] },
    { id: "banana", name: "موز", icon: "🍌", usage: ["dessert", "drink"] },
    { id: "orange", name: "برتقال", icon: "🍊", usage: ["dessert", "drink"] },
    { id: "grape", name: "عنب", icon: "🍇", usage: ["dessert", "drink"] },
    { id: "strawberry", name: "فراولة", icon: "🍓", usage: ["dessert", "drink"] },
    { id: "mango", name: "مانجو", icon: "🥭", usage: ["dessert", "drink"] }, // NEW
    { id: "watermelon", name: "بطيخ", icon: "🍉", usage: ["dessert", "drink"] }, // NEW
    { id: "lemon", name: "ليمون", icon: "🍋", usage: ["main", "dessert", "drink"] },
    { id: "date", name: "تمر", icon: "🌴", usage: ["dessert", "drink"] },

    // DRINK BASICS
    { id: "coffee", name: "قهوة", icon: "☕", usage: ["dessert", "drink"] },
    { id: "nescafe", name: "نسكافيه", icon: "☕", usage: ["dessert", "drink"] },
    { id: "tea", name: "شاي", icon: "🍵", usage: ["drink"] },
    { id: "milk", name: "حليب", icon: "🥛", usage: ["main", "dessert", "drink"] },

    // OTHER
    { id: "rice", name: "أرز", icon: "🍚", usage: ["main"] },
    { id: "lentil", name: "عدس", icon: "🍲", usage: ["main"] },
    { id: "flour", name: "دقيق", icon: "🌾", usage: ["main", "dessert"] },
    { id: "whole_flour", name: "دقيق بر", icon: "🌾", usage: ["main", "dessert"] },
    { id: "pasta", name: "مكرونة", icon: "🍝", usage: ["main"] },
    { id: "tortilla", name: "خبز تورتيلا", icon: "🌮", usage: ["main"] },
    { id: "breadcrumbs", name: "بقسماط", icon: "🍞", usage: ["main"] },
    { id: "toast", name: "توست", icon: "🍞", usage: ["main", "dessert"] },
    { id: "semolina", name: "سميد", icon: "🌾", usage: ["dessert"] },
    { id: "kunafa", name: "كنافة", icon: "🌾", usage: ["dessert"] },
    { id: "oats", name: "شوفان", icon: "🥣", usage: ["main", "dessert"] },
    { id: "egg", name: "بيض", icon: "🍳", usage: ["main", "dessert"] },
    { id: "cream", name: "قشطة", icon: "🧁", usage: ["dessert"] },
    { id: "cooking_cream", name: "كريمة طبخ", icon: "🥛", usage: ["main"] },
    { id: "cheese", name: "جبن", icon: "🧀", usage: ["main", "dessert"] },
    { id: "yogurt", name: "زبادي", icon: "🥣", usage: ["main", "dessert", "drink"] },
    { id: "laban", name: "لبن", icon: "🥛", usage: ["main", "drink"] },
    { id: "butter", name: "زبدة", icon: "🧈", usage: ["main", "dessert"] },
    { id: "mayo", name: "مايونيز", icon: "🥣", usage: ["main"] },
    { id: "puff", name: "عجينة باف باستري", icon: "🥐", usage: ["dessert"] },
    { id: "biscuit", name: "بسكويت", icon: "🍪", usage: ["dessert"] },
    { id: "chocolate", name: "شوكولاتة", icon: "🍫", usage: ["dessert", "drink"] },
    { id: "nuts", name: "مكسرات", icon: "🥜", usage: ["dessert", "main"] },
    { id: "coconut", name: "جوز هند", icon: "🥥", usage: ["dessert"] },
    { id: "starch", name: "نشا", icon: "🍚", usage: ["dessert", "main"] },
    { id: "yeast", name: "خميرة", icon: "🍞", usage: ["main", "dessert"] },

    // NEW MEGA PACK INGREDIENTS
    { id: "shrimp", name: "روبيان", icon: "🦐", usage: ["main"] },
    { id: "chickpeas", name: "حمص", icon: "🥘", usage: ["main"] },
    { id: "pepsi", name: "مشروب غازي", icon: "🥤", usage: ["drink"] },

    // OTHERS FOR NEW RECIPES
    { id: "fava", name: "فول", icon: "🍲", usage: ["main"] }, // NEW
    { id: "tahini", name: "طحينة", icon: "🍯", usage: ["main", "dessert"] }, // NEW
    { id: "avocado", name: "أفوكادو", icon: "🥑", usage: ["main", "drink"] }, // NEW
    { id: "hibiscus", name: "كركديه", icon: "🌺", usage: ["drink"] }, // NEW
    { id: "saffron", name: "زعفران", icon: "🌸", usage: ["main", "dessert", "drink"] }, // NEW
    { id: "ginger", name: "زنجبيل", icon: "🫚", usage: ["main", "drink"] }, // NEW
];

// --- LOGIC SECTION ---

// State
let selectedIngredients = new Set();
let currentMealType = 'main';
let currentRecipe = null;
let currentServings = 1;
let currentView = 'home';

// Implicit Basics
const basicIngredients = ['ملح', 'فلفل', 'زيت', 'ماء', 'سكر', 'بهارات', 'بيكنج بودر', 'فانيليا', 'سمن', 'شيرة', 'عصير', 'هيل', 'قرفة', 'بودرة ثوم', 'بابريكا', 'ثلج'];

// DOM Elements
const ingredientsGrid = document.getElementById('ingredientsGrid');
const findBtn = document.getElementById('findBtn');
const resultsSection = document.getElementById('resultsSection');
const resultsContainer = document.getElementById('resultsContainer');
const closeResults = document.getElementById('closeResults');
const typeRadios = document.getElementsByName('mealType');
const searchInput = document.getElementById('ingredientSearch');
const heroSection = document.querySelector('.hero-section');
const typeSelector = document.querySelector('.type-selector');
const ingredientsSection = document.querySelector('.ingredients-section');
const actionArea = document.querySelector('.action-area');

// Navigation Elements
const menuBtn = document.querySelector('.user-menu');
const closeMenuBtn = document.getElementById('closeMenu');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.menu-link');

// Modal Elements
const modal = document.getElementById('recipeModal');
const closeModalBtn = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modalTitle');
const modalType = document.getElementById('modalType');
const modalIngredients = document.getElementById('modalIngredients');
const modalSteps = document.getElementById('modalSteps');
const modalVideo = document.getElementById('modalVideo');
const modalNutrition = document.createElement('div');
modalNutrition.className = 'nutrition-info';

if (modalTitle && modalTitle.parentNode) {
    if (!document.querySelector('.modal-header .nutrition-info')) {
        modalTitle.parentNode.insertBefore(modalNutrition, modalTitle.nextSibling);
    }
}

// Servings Elements
const servingCountSpan = document.getElementById('servingCount');
const btnAllocUp = document.getElementById('allocUp');
const btnAllocDown = document.getElementById('allocDown');

// --- Initialization ---
function init() {
    renderIngredients();
    setupEventListeners();
    setupNavigation();
}

function setupNavigation() {
    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = link.getAttribute('data-view');
            switchView(view);
            closeMenu();
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function openMenu() {
    sideMenu.classList.add('open');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scrolling
}

function switchView(view) {
    currentView = view;

    if (view === 'home') {
        heroSection.classList.remove('hidden');
        typeSelector.classList.remove('hidden');
        ingredientsSection.classList.remove('hidden');
        actionArea.classList.remove('hidden');
        resultsSection.classList.add('hidden');
    } else if (view === 'browse-main') {
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');
        const allMain = recipes.filter(r => r.type === 'main');
        displayBrowseResults(allMain, 'جميع طبخاتنا');

    } else if (view === 'browse-dessert') {
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');
        const allDessert = recipes.filter(r => r.type === 'dessert');
        displayBrowseResults(allDessert, 'جميع وصفات الحلى');

    } else if (view === 'browse-drink') {
        // Hide Home Elements
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');

        // Show Results populated with ALL DRINKS
        const allDrinks = recipes.filter(r => r.type === 'drink' || r.type === 'drink_hot' || r.type === 'drink_cold');
        displayBrowseResults(allDrinks, 'جميع المشروبات');

    } else if (view === 'browse-drink-hot') {
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');
        const hotDrinks = recipes.filter(r => r.type === 'drink_hot');
        displayBrowseResults(hotDrinks, '☕ مشروبات ساخنة');

    } else if (view === 'browse-drink-cold') {
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');
        const coldDrinks = recipes.filter(r => r.type === 'drink_cold');
        displayBrowseResults(coldDrinks, '❄️ مشروبات باردة');

    } else if (view === 'browse-pastry') {
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');
        const allPastry = recipes.filter(r => r.type === 'pastry');
        displayBrowseResults(allPastry, 'جميع المعجنات');

    } else if (view === 'browse-sauce') {
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');
        const allSauces = recipes.filter(r => r.type === 'sauce');
        displayBrowseResults(allSauces, 'جميع الصوصات');

    } else if (view === 'diet-plans') {
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');
        renderDietPlans();
    } else if (view === 'daily-log') {
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');
        renderDailyLog();
    } else if (view === 'daily-prep') {
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');
        renderDailyPrep();
    } else if (view === 'favorites') {
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');
        renderFavoritesPage();
    } else if (view === 'emergency') {
        heroSection.classList.add('hidden');
        typeSelector.classList.add('hidden');
        ingredientsSection.classList.add('hidden');
        actionArea.classList.add('hidden');
        renderEmergencyMode();
    }
}

function renderDietPlans() {
    resultsContainer.innerHTML = '';
    const sectionHeader = resultsSection.querySelector('h3');
    if (sectionHeader) sectionHeader.textContent = 'حاسبة السعرات وخطط التغذية';
    if (closeResults) closeResults.style.display = 'none';

    resultsContainer.innerHTML = `
        <div class="glass-panel" style="width:100%; max-width:600px; margin:0 auto 30px; padding:20px; text-align:center;">
            <h3 style="margin-bottom:15px; color:var(--primary-gold);">مستشارك الذكي 🩺</h3>
            <p style="margin-bottom:20px; color:#64748b; font-size:0.9em;">أدخل بياناتك لنخبرك هل وزنك مثالي أم تحتاج لتنحيف/تضخيم</p>
            
            <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
                <input type="number" id="calc-weight" placeholder="الوزن (kg)" style="padding:12px; border-radius:10px; border:1px solid #ddd; width:100px;">
                <input type="number" id="calc-height" placeholder="الطول (cm)" style="padding:12px; border-radius:10px; border:1px solid #ddd; width:100px;">
                <input type="number" id="calc-age" placeholder="العمر" style="padding:12px; border-radius:10px; border:1px solid #ddd; width:80px;">
            </div>
            <div style="margin:15px 0;">
                <label style="margin-left:15px; font-size:1.1em;"><input type="radio" name="gender" value="male" checked> ذكر</label>
                <label style="font-size:1.1em;"><input type="radio" name="gender" value="female"> أنثى</label>
            </div>
            <div style="margin-bottom:15px;">
                 <label style="cursor:pointer; color:#475569; font-size:0.9em;">
                    <input type="checkbox" id="is-athlete" style="transform:scale(1.2); margin-left:5px;">
                    أنا رياضي / عندي كتلة عضلية 💪
                 </label>
            </div>
            <button onclick="calculateBMIAndPlan()" class="btn-primary" style="width:100%; margin-top:10px;">تحليل وزني</button>
            
            <div id="calc-result" style="margin-top:20px; display:none; animation:fadeIn 0.5s;"></div>
        </div>

        <div class="diet-result-actions" id="diet-actions" style="display:none; width:100%; justify-content:center; gap:20px; flex-wrap:wrap; margin-bottom:30px;">
             <!-- Injected by JS after calc -->
        </div>

        <div id="dietList" class="cards-container"></div>
    `;

    window.calculateBMIAndPlan = function () {
        const w = parseFloat(document.getElementById('calc-weight').value);
        const h = parseFloat(document.getElementById('calc-height').value);
        const a = parseFloat(document.getElementById('calc-age').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const resultDiv = document.getElementById('calc-result');
        const actionsDiv = document.getElementById('diet-actions');

        if (!w || !h || !a) {
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = '<span style="color:red;">الرجاء تعبئة جميع البيانات</span>';
            return;
        }

        // 1. BMI Calculation
        const heightM = h / 100;
        const bmi = (w / (heightM * heightM)).toFixed(1);
        const isAthlete = document.getElementById('is-athlete').checked;

        // Ideal Weight Calculation
        const minIdeal = (18.5 * heightM * heightM).toFixed(1);
        const maxIdeal = (24.9 * heightM * heightM).toFixed(1);

        let status = '';
        let color = '';
        const normalRange = "18.5 - 24.9";

        if (bmi < 18.5) {
            status = 'نحافة (Underweight)';
            color = '#3b82f6';
        } else if (bmi >= 18.5 && bmi < 25) {
            status = 'وزن مثالي (Healthy)';
            color = '#10b981';
        } else if (bmi >= 25 && bmi < 30) {
            if (isAthlete) {
                status = 'بنية عضلية (Muscular)';
                color = '#8b5cf6'; // Purple for muscle
            } else {
                status = 'زيادة وزن (Overweight)';
                color = '#f59e0b';
            }
        } else {
            if (isAthlete && bmi < 35) {
                status = 'ضخامة عضلية (Bulk)';
                color = '#8b5cf6';
            } else {
                status = 'سمنة (Obese)';
                color = '#ef4444';
            }
        }

        // 2. TDEE Calc (Mifflin-St Jeor) - Standard & Accurate
        let bmr = (10 * w) + (6.25 * h) - (5 * a);
        if (gender === 'male') bmr += 5; else bmr -= 161;

        // Athletes burn more, adjust multiplier slightly if checked? 
        // Let's stick to standard Sedentary/Light for base safety, user can add activity.
        // Actually, if athlete, they are likely at least 'Moderately Active' (1.55)
        const activityMultiplier = isAthlete ? 1.55 : 1.375;
        const tdee = Math.round(bmr * activityMultiplier);

        // 3. Render Status
        let idealWeightHTML = '';
        if ((bmi < 18.5 || bmi >= 25) && !isAthlete) {
            idealWeightHTML = `<div style="text-align:center; color:${color}; font-weight:bold; margin:10px 0; background:white; padding:5px; border-radius:10px;">⚖️ وزنك الطبيعي المقترح: ${minIdeal} - ${maxIdeal} كجم</div>`;
        } else if (isAthlete && bmi >= 25) {
            idealWeightHTML = `<div style="text-align:center; color:${color}; font-weight:bold; margin:10px 0; background:white; padding:5px; border-radius:10px;">💪 وزنك زايد عضل! (المؤشر لا يهمك)</div>`;
        }

        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `
            <div style="background:${color}15; border:2px solid ${color}; padding:15px; border-radius:15px; text-align:right;">
                <h2 style="color:${color}; margin:0; text-align:center;">${status}</h2>
                <div style="font-size:0.9rem; color:#64748b; margin:10px 0; text-align:center;">مؤشر كتلتك (BMI): <b>${bmi}</b></div>
                ${idealWeightHTML}
                <hr style="margin:15px 0; opacity:0.2;">
                <div style="display:flex; justify-content:space-around; text-align:center; font-size:0.9em;">
                    <div>سعرات المحافظة<br><b style="font-size:1.2em; color:#334155;">${tdee}</b></div>
                    <div>هدف التنحيف<br><b style="font-size:1.2em; color:#10b981;">${tdee - 500}</b></div>
                    <div>هدف التضخيم<br><b style="font-size:1.2em; color:#ef4444;">${tdee + 500}</b></div>
                </div>
            </div>
            
            <div style="margin-top:20px;">
                <p style="text-align:center; margin-bottom:10px; color:#64748b;">اختر مسارك (كلاهما متاح لك):</p>
                <div style="display:flex; gap:10px;">
                    <button onclick="startMealPlanning(${tdee - 500})" class="btn-primary" style="flex:1; background:#10b981; border:none;">📉 خطة التنشيف</button>
                    <button onclick="startMealPlanning(${tdee + 500})" class="btn-primary" style="flex:1; background:#ef4444; border:none;">💪 خطة التضخيم</button>
                </div>
            </div>
        `;
        actionsDiv.style.display = 'none';

        // Hide list initially until they pick a plan
        const listDiv = document.getElementById('dietList');
        listDiv.innerHTML = '';
    };

    // --- MEAL PLANNER LOGIC ---
    let currentPlan = {
        breakfast: null,
        lunch: null,
        dinner: null,
        snack: null
    };

    // Helper to allow global access to local plan for cooking mode
    window.startMealCooking = function (slot) {
        if (currentPlan && currentPlan[slot]) {
            currentRecipe = currentPlan[slot];
            enterCookingMode();
        } else {
            console.error("No recipe found for slot:", slot);
        }
    };

    window.generateDailyPlan = function () {
        const slots = ['breakfast', 'lunch', 'dinner', 'snack'];

        slots.forEach(slot => {
            let candidates = recipes;

            // Simple logic to pick suitable meals
            if (slot === 'breakfast') {
                candidates = recipes.filter(r => r.category === 'popular' || r.category === 'quick');
            } else if (slot === 'lunch') {
                candidates = recipes.filter(r => r.type === 'main' || r.category === 'popular');
            } else if (slot === 'dinner') {
                candidates = recipes.filter(r => r.category === 'healthy' || r.category === 'salad' || r.category === 'quick');
            } else if (slot === 'snack') {
                candidates = recipes.filter(r => r.type === 'dessert' || r.type === 'drink' || r.type === 'pastry');
            }

            if (candidates.length === 0) candidates = recipes;

            currentPlan[slot] = candidates[Math.floor(Math.random() * candidates.length)];
        });

        // If in prep view, refresh
        if (typeof renderDailyPrep === 'function' && document.getElementById('dietList').innerHTML === '') {
            renderDailyPrep();
        } else {
            // Update slots in diet plan view
            slots.forEach(slot => {
                const input = document.getElementById(`slot-${slot}`);
                if (input && currentPlan[slot]) {
                    // This part assumes we have inputs or display elements. 
                    // Since I don't see the render logic for slots, I'll allow startMealPlanning to handle it if called.
                }
            });
        }
    };
    let currentDietMode = ''; // 'cut' or 'bulk'

    window.startMealPlanning = function (targetCals) {
        // Determine mode based on target vs TDEE
        currentDietMode = targetCals < 2000 ? 'تنشيف 📉' : 'تضخيم 💪';
        const modeColor = targetCals < 2000 ? '#10b981' : '#ef4444';

        const container = document.getElementById('dietList');
        container.innerHTML = `
            <div style="width:100%; padding:10px; background:#f8fafc; border-radius:20px; box-shadow:inset 0 2px 5px rgba(0,0,0,0.05);">
                <div style="text-align:center; padding:10px; margin-bottom:10px; background:${modeColor}20; border-radius:10px; border:2px solid ${modeColor};">
                    <span style="font-size:1.2em; font-weight:bold; color:${modeColor};">نظامك: ${currentDietMode}</span>
                    <span style="display:block; font-size:0.8em; color:#64748b;">الهدف: ${targetCals} سعرة</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 15px; background:white; border-radius:15px; margin-bottom:15px; border:1px solid #e2e8f0;">
                    <div>
                        <span style="display:block; font-size:0.8em; color:#64748b;">إجمالي السعرات</span>
                        <span id="plan-total-cals" style="font-size:1.5em; font-weight:bold; color:#d97706;">0</span>
                    </div>
                     <div>
                        <span style="display:block; font-size:0.8em; color:#64748b;">البروتين</span>
                        <span id="plan-total-prot" style="font-size:1.2em; font-weight:bold; color:#10b981;">0g</span>
                    </div>
                </div>

                ${renderMealSlot('فطور 🍳', 'breakfast')}
                ${renderMealSlot('غداء 🍗', 'lunch')}
                ${renderMealSlot('عشاء 🥗', 'dinner')}
                ${renderMealSlot('سناك 🍎', 'snack')}

                <button onclick="saveDailyPlan()" class="btn-primary" style="width:100%; margin-top:20px; background:#10b981; border:none; padding:15px; font-size:1.2em;">إتمام وحفظ اليوم ✅</button>
            </div>
        `;
        container.scrollIntoView({ behavior: 'smooth' });
    };

    function renderMealSlot(title, type) {
        const current = currentPlan[type];
        if (current) {
            return `
                <div class="meal-slot" style="background:white; padding:15px; border-radius:15px; margin-bottom:10px; border:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <div style="font-weight:bold; color:#334155;">${title}</div>
                        <div style="font-size:0.9em; color:var(--primary-gold);">${current.name}</div>
                        <div style="font-size:0.8em; color:#94a3b8;">${current.calories} cal | ${current.protein}</div>
                    </div>
                    <button onclick="removeMeal('${type}')" style="background:#fee2e2; color:#ef4444; border:none; padding:5px 10px; border-radius:8px; cursor:pointer;">X</button>
                </div>
            `;
        } else {
            return `
                <div class="meal-slot" onclick="openRecipeSelector('${type}')" style="background:white; padding:20px; border-radius:15px; margin-bottom:10px; border:2px dashed #cbd5e1; color:#64748b; text-align:center; cursor:pointer; transition:all 0.2s;">
                    + إضافة ${title}
                </div>
            `;
        }
    }

    // Modal for selecting recipes
    window.openRecipeSelector = function (slotType) {
        const existingSelector = document.getElementById('recipe-selector-modal');
        if (existingSelector) existingSelector.remove();

        // STRICT FILTERING
        let list = [];

        if (slotType === 'breakfast') {
            // Breakfast: Eggs, Foul, Cheese, Bread, Cereal, Pancakes, Tea/Coffee, Pastries
            const strictBfast = ["بيض", "شكشوكة", "فول", "عدس", "شوفان", "بان كيك", "فرنش", "توست", "جبن", "لبنة", "فطور", "حليب"];
            list = recipes.filter(r => {
                // Must match keyword OR be a hot drink (tea/coffee) OR be a pastry
                const matchesKey = strictBfast.some(k => r.name.includes(k));
                const isHotDrink = r.type === 'drink' && (r.name.includes('قهوة') || r.name.includes('شاي') || r.name.includes('حليب'));
                const isPastry = r.type === 'pastry';
                // Exclude heavy lunches even if they have keywords
                return (matchesKey || isHotDrink || isPastry) && !r.name.includes("كبسة");
            });
        } else if (slotType === 'lunch') {
            // Lunch: Rice, Chicken, Meat, Pasta, Stews, Fast Food. No sandwiches/eggs.
            list = recipes.filter(r => {
                const isMain = r.type === 'main' || r.type === 'fast';
                return isMain &&
                    !r.name.includes("بيض") &&
                    !r.name.includes("توست") &&
                    !r.name.includes("ساندويش") &&
                    !r.name.includes("فول") &&
                    !r.name.includes("بان كيك");
            });
        } else if (slotType === 'dinner') {
            // Dinner: Light mains, Salads, Sandwiches, Soups, Pastries
            list = recipes.filter(r => {
                const isLight = r.calories < 600;
                return (r.type === 'main' && isLight) || r.type === 'salad' || r.type === 'pastry' || r.type === 'sauce';
            });
        } else if (slotType === 'snack') {
            // Snacks: Fruit, Salad, Desserts, Cold Drinks, Yogurt, Pastries, Sauces?
            list = recipes.filter(r => {
                const isFruitVeg = r.ingredients.some(i => ["موز", "تفاح", "برتقال", "بطيخ", "مانجو"].includes(i));
                const isLightDessert = r.type === 'dessert';
                const isColdDrink = r.type === 'drink' && !r.name.includes('قهوة') && !r.name.includes('شاي'); // Cold drinks
                const isLightSalty = r.type === 'salad' || r.type === 'pastry';

                return isFruitVeg || isLightDessert || isColdDrink || isLightSalty;
            });
        }

        // Fallback
        if (list.length === 0) list = recipes.filter(r => r.type === 'main' || r.type === 'fast'); // Default show mains

        const modal = document.createElement('div');
        modal.id = 'recipe-selector-modal';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:2000; overflow-y:auto; display:flex; flex-direction:column; align-items:center; padding:20px; animation:fadeIn 0.2s;';

        modal.innerHTML = `
            <div style="background:white; width:100%; max-width:600px; border-radius:20px; padding:20px; margin-top:50px; min-height:80vh;">
                <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
                    <h3>اختر وجبة (${slotType})</h3>
                    <button onclick="document.getElementById('recipe-selector-modal').remove()" style="background:none; border:none; font-size:1.5em; cursor:pointer;">&times;</button>
                </div>
                <div style="display:flex; gap:8px; margin-bottom:15px; flex-wrap:wrap;">
                    <button onclick="sortSelectorList('cal-desc')" class="sort-btn active" style="padding:8px 14px; border-radius:20px; border:1px solid #fbbf24; background:#fbbf24; color:#0f172a; cursor:pointer; font-size:0.85em; font-weight:bold;">🔥 سعرات (الأعلى)</button>
                    <button onclick="sortSelectorList('cal-asc')" class="sort-btn" style="padding:8px 14px; border-radius:20px; border:1px solid #e2e8f0; background:white; color:#334155; cursor:pointer; font-size:0.85em;">🔥 سعرات (الأقل)</button>
                    <button onclick="sortSelectorList('prot-desc')" class="sort-btn" style="padding:8px 14px; border-radius:20px; border:1px solid #e2e8f0; background:white; color:#334155; cursor:pointer; font-size:0.85em;">💪 بروتين (الأعلى)</button>
                    <button onclick="sortSelectorList('prot-asc')" class="sort-btn" style="padding:8px 14px; border-radius:20px; border:1px solid #e2e8f0; background:white; color:#334155; cursor:pointer; font-size:0.85em;">💪 بروتين (الأقل)</button>
                </div>
                <div class="cards-container" id="selector-list"></div>
            </div>
        `;
        
        // Default sort: calories descending
        list.sort((a, b) => (b.calories || 0) - (a.calories || 0));
        
        window.sortSelectorList = function(criteria) {
            // Update button styles
            document.querySelectorAll('.sort-btn').forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = '#334155';
                btn.style.borderColor = '#e2e8f0';
                btn.style.fontWeight = 'normal';
            });
            event.target.style.background = '#fbbf24';
            event.target.style.color = '#0f172a';
            event.target.style.borderColor = '#fbbf24';
            event.target.style.fontWeight = 'bold';
            
            if (criteria === 'cal-desc') list.sort((a, b) => (b.calories || 0) - (a.calories || 0));
            else if (criteria === 'cal-asc') list.sort((a, b) => (a.calories || 0) - (b.calories || 0));
            else if (criteria === 'prot-desc') list.sort((a, b) => (parseInt(b.protein) || 0) - (parseInt(a.protein) || 0));
            else if (criteria === 'prot-asc') list.sort((a, b) => (parseInt(a.protein) || 0) - (parseInt(b.protein) || 0));
            
            renderSelectorList();
        };
        document.body.appendChild(modal);

        const listDiv = modal.querySelector('#selector-list');
        function renderSelectorList() {
            listDiv.innerHTML = '';
            list.forEach(item => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            let icon = '🥘';
            if (item.type === 'dessert') icon = '🍰';
            else if (item.type === 'drink') icon = '🥤';
            else if (item.type === 'pastry') icon = '🥐';
            else if (item.type === 'salad') icon = '🥗';
            else if (item.type === 'sauce') icon = '🥣';
            else if (item.type === 'fast') icon = '⚡';

            card.innerHTML = `
                <div class="recipe-icon">${icon}</div>
                    <div class="recipe-info">
                        <h4>${item.name}</h4>
                        <div class="nutrition-info">
                            <span class="badge-nutrition cal">🔥 ${item.calories}</span>
                            <span class="badge-nutrition prot">💪 ${item.protein}</span>
                        </div>
                    </div>
            `;
            card.style.cursor = 'pointer';
            card.onclick = () => {
                selectMeal(slotType, item);
                modal.remove();
            };
            listDiv.appendChild(card);
            });
        }
        renderSelectorList();
    };

    window.selectMeal = function (slot, recipe) {
        currentPlan[slot] = recipe;
        refreshPlanUI();
    };

    window.removeMeal = function (slot) {
        currentPlan[slot] = null;
        refreshPlanUI();
    };

    window.refreshPlanUI = function () {
        let totalCals = 0;
        let totalProt = 0;
        Object.values(currentPlan).forEach(r => {
            if (r) {
                totalCals += r.calories;
                totalProt += parseInt(r.protein) || 0;
            }
        });

        const container = document.getElementById('dietList');
        if (!container) return;

        container.innerHTML = `
            <div style="width:100%; padding:10px; background:#f8fafc; border-radius:20px; box-shadow:inset 0 2px 5px rgba(0,0,0,0.05);">
                <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 15px; background:white; border-radius:15px; margin-bottom:15px; border:1px solid #e2e8f0;">
                        <div>
                            <span style="display:block; font-size:0.8em; color:#64748b;">إجمالي السعرات</span>
                            <span id="plan-total-cals" style="font-size:1.5em; font-weight:bold; color:var(--primary-gold);">${totalCals}</span>
                        </div>
                        <div>
                            <span style="display:block; font-size:0.8em; color:#64748b;">البروتين</span>
                            <span id="plan-total-prot" style="font-size:1.2em; font-weight:bold; color:#10b981;">${totalProt}g</span>
                        </div>
                    </div>

                ${renderMealSlot('فطور 🍳', 'breakfast')}
                ${renderMealSlot('غداء 🍗', 'lunch')}
                ${renderMealSlot('عشاء 🥗', 'dinner')}
                ${renderMealSlot('سناك 🍎', 'snack')}

            <button onclick="goToPrepMode()" class="btn-primary" style="width:100%; margin-top:20px; background:#10b981; border:none; padding:15px; font-size:1.2em;">اعتماد الجدول وبدء التحضير 👩‍🍳</button>
            </div>
        `;
    };

    window.goToPrepMode = function () {
        const hasMeals = Object.values(currentPlan).some(x => x !== null);
        if (!hasMeals) {
            alert('الرجاء اختيار وجبة واحدة على الأقل');
            return;
        }
        switchView('daily-prep');
    };

    // Global variable to track active tab
    let activePrepTab = 'breakfast';
    document.addEventListener('DOMContentLoaded', () => {
        // Ensure default tab is set
        activePrepTab = 'breakfast';
    });

    window.renderDailyPrep = function () {
        resultsContainer.innerHTML = '';
        const sectionHeader = resultsSection.querySelector('h3');
        if (sectionHeader) sectionHeader.textContent = 'خطة اليوم - وضع التحضير 🔪';
        if (closeResults) closeResults.style.display = 'none';

        // Calculate total calories
        let totalCals = 0;
        const slots = [
            { id: 'breakfast', label: 'الفطور 🍳' },
            { id: 'lunch', label: 'الغداء 🍗' },
            { id: 'dinner', label: 'العشاء 🥗' },
            { id: 'snack', label: 'سناك 🍎' }
        ];

        slots.forEach(slot => {
            if (currentPlan[slot.id]) totalCals += currentPlan[slot.id].calories;
        });

        // 1. Create Tabs HTML
        let tabsHtml = `<div style="display:flex; gap:10px; overflow-x:auto; padding:5px; margin-bottom:20px; justify-content:center;">`;
        slots.forEach(slot => {
            const isActive = slot.id === activePrepTab;
            const bg = isActive ? 'var(--primary-gold)' : 'white';
            const color = isActive ? '#1a1a2e' : '#64748b';
            tabsHtml += `
            <button onclick="switchPrepTab('${slot.id}')" 
                style="padding:10px 20px; border-radius:20px; border:1px solid #ddd; background:${bg}; color:${color}; font-weight:bold; cursor:pointer; flex-shrink:0; transition:all 0.3s;">
                ${slot.label}
            </button>
        `;
        });
        tabsHtml += `</div>`;

        // 2. Create Active Meal Content
        let mealContent = '';
        const currentSlot = slots.find(s => s.id === activePrepTab);
        const recipe = currentPlan[activePrepTab];

        if (recipe) {
            mealContent = `
            <div data-aos="fade-up" style="background:white; border-radius:25px; padding:25px; margin-bottom:100px; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding-bottom:15px; border-bottom:1px solid #f1f5f9;">
                    <div>
                        <span style="font-size:0.9em; color:#94a3b8; display:block; margin-bottom:5px;">${currentSlot.label}</span>
                        <h2 style="margin:0; color:#1e293b; font-size:1.5em;">${recipe.name}</h2>
                    </div>
                    <div style="text-align:center;">
                        <span style="display:block; font-weight:bold; color:#d97706; font-size:1.2em;">${recipe.calories}</span>
                        <span style="font-size:0.8em; color:#94a3b8;">سعرة</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div style="display:flex; gap:10px; margin-bottom:25px;">
                    <button onclick="startMealCooking('${activePrepTab}')" 
                        style="flex:1; padding:15px; border-radius:15px; background:linear-gradient(135deg, #fbbf24, #d97706); border:none; color:white; font-weight:bold; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
                        <span>👨‍🍳</span> ابدأ الطبخ
                    </button>
                    <button onclick="addToShoppingList(currentPlan['${activePrepTab}'].ingredients)" 
                        style="padding:15px; border-radius:15px; border:2px solid #f1f5f9; background:transparent; color:#64748b; font-weight:bold; cursor:pointer;">
                        🛒 المقادير
                    </button>
                </div>
                
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:25px; margin-top:20px;">
                    <!-- Ingredients -->
                    <div style="background:#f8fafc; padding:20px; border-radius:20px;">
                        <h4 style="margin-bottom:15px; color:#334155; display:flex; align-items:center; gap:8px;">
                            🛒 المقادير
                        </h4>
                        <ul style="list-style:none; padding:0; margin:0;">
                            ${recipe.quantities ? recipe.quantities.map(q => `
                                <li style="margin-bottom:10px; color:#475569; display:flex; align-items:center; gap:10px;">
                                    <span style="width:6px; height:6px; background:#cbd5e1; border-radius:50%; display:block;"></span>
                                    ${q}
                                </li>
                            `).join('') : '<li>لا توجد مقادير</li>'}
                        </ul>
                    </div>

                    <!-- Steps Preview -->
                    <div style="background:#f8fafc; padding:20px; border-radius:20px;">
                        <h4 style="margin-bottom:15px; color:#334155; display:flex; align-items:center; gap:8px;">
                            📝 الطريقة (مختصرة)
                        </h4>
                        <ol style="padding-right:20px; margin:0; color:#475569;">
                            ${recipe.steps.slice(0, 3).map(s => `<li style="margin-bottom:8px;">${s}</li>`).join('')}
                            ${recipe.steps.length > 3 ? `<li style="list-style:none; color:#94a3b8; margin-top:5px;">...و ${recipe.steps.length - 3} خطوات إضافية</li>` : ''}
                        </ol>
                    </div>
                </div>
            </div>
        `;
        } else {
            mealContent = `
            <div style="text-align:center; padding:50px; background:white; border-radius:25px; color:#94a3b8;">
                <p>لا توجد وجبة مقترحة لهذا الوقت 🤷‍♂️</p>
                <button onclick="generateDailyPlan()" style="margin-top:10px; color:var(--primary-gold); background:none; border:none; cursor:pointer; text-decoration:underline;">
                    إعادة إنشاء الخطة
                </button>
            </div>
        `;
        }

        let footer = `
        <div style="position:fixed; bottom:20px; left:50%; transform:translateX(-50%); width:90%; max-width:600px; background:white; padding:15px 25px; border-radius:20px; box-shadow:0 10px 40px rgba(0,0,0,0.15); display:flex; justify-content:space-between; align-items:center; z-index:100;">
            <div style="text-align:right;">
                <span style="display:block; font-size:0.8em; color:#94a3b8;">إجمالي اليوم</span>
                <span style="font-weight:bold; color:#1e293b;">${totalCals} <small>سعرة</small></span>
            </div>
            <button onclick="confirmAndLogDay()" style="background:#10b981; color:white; border:none; padding:12px 25px; border-radius:15px; font-weight:bold; cursor:pointer; box-shadow:0 4px 15px rgba(16, 185, 129, 0.3);">
                ✅ تم الأكل!
            </button>
        </div>
    `;

        resultsContainer.innerHTML = `
        <div style="max-width:800px; margin:0 auto; padding-bottom:80px;">
            ${tabsHtml}
            ${mealContent}
        </div>
        ${footer}
    `;

        resultsSection.classList.remove('hidden');

        // Helper function for switching tabs
        window.switchPrepTab = function (tabId) {
            activePrepTab = tabId;
            renderDailyPrep();
        };
    };

    window.confirmAndLogDay = function () {
        let totalCals = 0;
        let totalProt = 0;
        const meals = [];

        Object.values(currentPlan).forEach(r => {
            if (r) {
                totalCals += r.calories;
                totalProt += parseInt(r.protein) || 0;
                meals.push(r.name);
            }
        });

        const logs = JSON.parse(localStorage.getItem('thallaja_logs') || '[]');
        const today = new Date().toISOString().split('T')[0];

        logs.push({
            date: today,
            cals: totalCals,
            prot: totalProt,
            details: meals.join(' + ')
        });
        localStorage.setItem('thallaja_logs', JSON.stringify(logs));

        alert('بالعافية! تم تسجيل يومك بنجاح 💪');
        switchView('daily-log');
    };

    resultsSection.classList.remove('hidden');
}

function renderDailyLog() {
    resultsContainer.innerHTML = '';
    const sectionHeader = resultsSection.querySelector('h3');
    if (sectionHeader) sectionHeader.textContent = 'سجل السعرات اليومي 📅';
    if (closeResults) closeResults.style.display = 'none';

    // Simple storage logic
    const getLogs = () => JSON.parse(localStorage.getItem('thallaja_logs') || '[]');
    const saveLog = (log) => localStorage.setItem('thallaja_logs', JSON.stringify(log));

    resultsContainer.innerHTML = `
            <div class="glass-panel" style="width:100%; max-width:700px; margin:0 auto; padding:20px;">
                <h4 style="margin-bottom:15px; color:#d97706;">📝 تسجيل يدوي للسعرات</h4>
                <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:15px;">
                    <input type="date" id="log-date" style="padding:10px; border-radius:10px; border:1px solid #ddd; flex:1; min-width:120px;">
                    <input type="number" id="log-cals" placeholder="السعرات" style="padding:10px; border-radius:10px; border:1px solid #ddd; width:100px;">
                    <input type="number" id="log-prot" placeholder="البروتين (g)" style="padding:10px; border-radius:10px; border:1px solid #ddd; width:100px;">
                </div>
                <div style="display:flex; gap:10px; margin-bottom:20px;">
                    <input type="text" id="log-details" placeholder="وصف الوجبة (اختياري)" style="padding:10px; border-radius:10px; border:1px solid #ddd; flex:1;">
                    <button onclick="addLog()" class="btn-primary" style="padding:10px 20px;">سجل ➕</button>
                </div>
                
                <h4 style="margin:20px 0 10px; color:#64748b;">📋 سجلك السابق</h4>
                <table style="width:100%; border-collapse:collapse; text-align:right;">
                    <thead>
                        <tr style="border-bottom:2px solid #eee; color:#64748b;">
                            <th style="padding:10px;">التاريخ/الوجبات</th>
                            <th style="padding:10px;">سعرات</th>
                            <th style="padding:10px;">بروتين</th>
                            <th style="padding:10px;">#</th>
                        </tr>
                    </thead>
                    <tbody id="log-table-body">
                    </tbody>
                </table>
            </div>
        `;

    window.renderLogTable = function () {
        const logs = getLogs();
        const tbody = document.getElementById('log-table-body');
        tbody.innerHTML = '';

        logs.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first

        logs.forEach((log, index) => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #f1f5f9';
            // Handle legacy logs that might not have 'details'
            const details = log.details || 'تسجيل يدوي';
            const prot = log.prot ? `${log.prot} g` : '-';

            tr.innerHTML = `
                    <td style="padding:15px 10px;">
                        <div>${log.date}</div>
                        <div style="font-size:0.8em; color:#94a3b8; max-width:150px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${details}</div>
                    </td>
                    <td style="padding:15px 10px; font-weight:bold; color:var(--primary-gold);">${log.cals}</td>
                    <td style="padding:15px 10px; font-size:0.9em; color:#10b981;">${prot}</td>
                    <td style="padding:15px 10px;"><button onclick="deleteLog(${index})" style="color:red; background:none; border:none; cursor:pointer;">&times;</button></td>
                `;
            tbody.appendChild(tr);
        });
    };

    window.addLog = function () {
        const date = document.getElementById('log-date').value;
        const cals = parseInt(document.getElementById('log-cals').value);
        const prot = parseInt(document.getElementById('log-prot').value) || 0;
        const details = document.getElementById('log-details').value.trim() || 'تسجيل يدوي';

        if (!date || !cals) return alert('الرجاء إدخال التاريخ والسعرات');

        const logs = getLogs();
        logs.push({
            date,
            cals,
            prot,
            details
        });
        saveLog(logs);

        // Clear inputs
        document.getElementById('log-cals').value = '';
        document.getElementById('log-prot').value = '';
        document.getElementById('log-details').value = '';

        renderLogTable();
    };

    window.deleteLog = function (index) {
        const logs = getLogs();
        logs.splice(index, 1);
        saveLog(logs);
        renderLogTable(); // Re-sorts and renders
    };

    // Init table
    window.renderLogTable();
    resultsSection.classList.remove('hidden');
}

// Sort State
let currentBrowseList = [];
let currentSort = { criteria: null, order: 'desc' };

window.sortRecipes = function (criteria) {
    if (currentSort.criteria === criteria) {
        currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.criteria = criteria;
        currentSort.order = 'desc'; // Default high to low
    }

    // Sort the global list
    currentBrowseList.sort((a, b) => {
        let valA = parseFloat(a[criteria]) || 0;
        let valB = parseFloat(b[criteria]) || 0;
        return currentSort.order === 'asc' ? valA - valB : valB - valA;
    });

    // Re-render based on current view/category
    const activeTab = document.querySelector('.cat-tab.active');
    const searchTerm = document.getElementById('browse-search')?.value?.toLowerCase() || '';
    const hotGrid = document.getElementById('hot-drinks-grid');
    const coldGrid = document.getElementById('cold-drinks-grid');

    // Check if we're on the drinks page with tabs
    if (hotGrid && coldGrid) {
        // Filter drinks only (keep type = drink/drink_hot/drink_cold)
        const drinksOnly = currentBrowseList.filter(r => 
            r.type === 'drink' || r.type === 'drink_hot' || r.type === 'drink_cold'
        );
        
        // Re-split and re-render drinks
        const warmDrinks = drinksOnly.filter(r => {
            if (r.type === 'drink_cold') return false;
            if (r.type === 'drink_hot') return true;
            const ingredientsStr = r.ingredients.join(' ').toLowerCase();
            if (ingredientsStr.includes('ثلج') || ingredientsStr.includes('بارد') || ingredientsStr.includes('ايس') || ingredientsStr.includes('ice')) return false;
            return true;
        });
        const coldDrinks = drinksOnly.filter(r => !warmDrinks.includes(r));

        // Filter by search term if any
        let filteredWarm = warmDrinks;
        let filteredCold = coldDrinks;
        if (searchTerm) {
            filteredWarm = warmDrinks.filter(r => r.name.toLowerCase().includes(searchTerm));
            filteredCold = coldDrinks.filter(r => r.name.toLowerCase().includes(searchTerm));
        }

        // Re-render both grids
        hotGrid.innerHTML = '';
        coldGrid.innerHTML = '';
        filteredWarm.forEach(item => hotGrid.appendChild(createRecipeCard(item)));
        filteredCold.forEach(item => coldGrid.appendChild(createRecipeCard(item)));
        
        // Maintain which section is currently visible (keep current tab active)
        const hotSection = document.getElementById('section-hot');
        const coldSection = document.getElementById('section-cold');
        if (hotSection && coldSection) {
            // If cold is visible, keep it visible - DON'T switch back to hot
            // (the display state is already correct, just re-populated the grids)
        }
    } else {
        // Filter first if search exists
        let listToRender = currentBrowseList;
        if (searchTerm) {
            listToRender = listToRender.filter(r => r.name.toLowerCase().includes(searchTerm));
        }

        if (activeTab) {
            // Main view with tabs
            const cat = activeTab.dataset.cat;
            renderCategoryCards(listToRender.filter(r => (r.category || 'main') === cat));
        } else {
            // Simple view
            renderSimpleCards(listToRender);
        }
    }

    updateSortButtons();
};

function updateSortButtons() {
    ['calories', 'protein'].forEach(crit => {
        const btn = document.getElementById(`sort-${crit}`);
        if (btn) {
            let icon = '';

            // Defaul styles (Inactive)
            let bg = 'transparent';
            let color = 'white';
            let border = '1px solid rgba(255,255,255,0.2)';
            let transform = 'scale(1)';
            let boxShadow = 'none';

            if (currentSort.criteria === crit) {
                icon = currentSort.order === 'asc' ? ' ⬆️' : ' ⬇️';
                // Active styles
                if (crit === 'calories') {
                    bg = '#d97706'; // Orange
                    border = '1px solid #d97706';
                } else {
                    bg = '#10b981'; // Green
                    border = '1px solid #10b981';
                }
                transform = 'scale(1.05)';
                boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
            }

            btn.style.background = bg;
            btn.style.color = color;
            btn.style.border = border;
            btn.style.transform = transform;
            btn.style.boxShadow = boxShadow;

            btn.innerHTML = (crit === 'calories' ? '🔥 سعرات' : '💪 بروتين') + icon;
        }
    });
}

// Global render functions to be accessible by sort
let renderSimpleCards, renderCategoryCards;

function displayBrowseResults(list, title) {
    currentBrowseList = [...list]; // Store copy
    currentSort = { criteria: null, order: 'desc' }; // Reset sort

    resultsContainer.innerHTML = '';
    const sectionHeader = resultsSection.querySelector('h3');
    if (sectionHeader) sectionHeader.textContent = title;
    if (closeResults) closeResults.style.display = 'none';

    const isDrinkPage = title.includes('مشروبات');
    const isDessertPage = title.includes('حلى');
    const isPastryPage = title.includes('معجنات');
    const isSaucePage = title.includes('صوصات');

    const sortHTML = `
        <div style="display:flex; gap:10px; margin-bottom:15px; overflow-x:auto; padding-bottom:5px;">
            <button id="sort-calories" onclick="sortRecipes('calories')" style="padding:10px 20px; border-radius:25px; border:1px solid rgba(255,255,255,0.2); background:transparent; color:white; cursor:pointer; flex-shrink:0; font-family:inherit; font-size:0.95em; transition:all 0.3s ease;">🔥 سعرات</button>
            <button id="sort-protein" onclick="sortRecipes('protein')" style="padding:10px 20px; border-radius:25px; border:1px solid rgba(255,255,255,0.2); background:transparent; color:white; cursor:pointer; flex-shrink:0; font-family:inherit; font-size:0.95em; transition:all 0.3s ease;">💪 بروتين</button>
        </div>
    `;

    // For specific category pages
    if (isDrinkPage) {
        // Split drinks into Hot and Cold
        // FIX: Broaden logic to catch anything with 'ice' or explicitly cold
        const warmDrinks = currentBrowseList.filter(r => {
            if (r.type === 'drink_cold') return false; // Explicitly cold
            if (r.type === 'drink_hot') return true;   // Explicitly hot

            // Fallback: Check ingredients
            const ingredientsStr = r.ingredients.join(' ').toLowerCase();
            if (ingredientsStr.includes('ثلج') || ingredientsStr.includes('بارد') || ingredientsStr.includes('ايس') || ingredientsStr.includes('ice')) {
                return false; // Found cold keyword
            }
            return true; // Default to hot/warm if not explicitly cold
        });

        const coldDrinks = currentBrowseList.filter(r => !warmDrinks.includes(r));

        let simpleHTML = `
            <div style="width:100%; margin-bottom:20px;">
                <input type="text" id="browse-search" placeholder="🔍 ابحث..." 
                    style="width:100%; padding:12px 15px; border-radius:15px; border:1px solid #e2e8f0; font-size:1em; background:#f8fafc; color:#334155; margin-bottom:10px;">
                ${sortHTML}
            </div>
            
            <!-- Drinks Category Tabs -->
            <div style="display:flex; gap:15px; margin-bottom:25px; flex-wrap:wrap;">
                <button id="tab-hot" onclick="switchDrinkTab('hot')" style="flex:1; min-width:140px; padding:15px 20px; border-radius:15px; border:2px solid #d97706; background:linear-gradient(135deg, #fffbeb, #fef3c7); color:#92400e; font-weight:bold; cursor:pointer; font-size:1em; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.3s;">
                    ☕ مشروبات ساخنة <span style="background:#d97706; color:white; padding:2px 8px; border-radius:10px; font-size:0.85em;">${warmDrinks.length}</span>
                </button>
                <button id="tab-cold" onclick="switchDrinkTab('cold')" style="flex:1; min-width:140px; padding:15px 20px; border-radius:15px; border:2px solid #3b82f6; background:linear-gradient(135deg, #eff6ff, #dbeafe); color:#1e40af; font-weight:bold; cursor:pointer; font-size:1em; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.3s;">
                    ❄️ مشروبات باردة <span style="background:#3b82f6; color:white; padding:2px 8px; border-radius:10px; font-size:0.85em;">${coldDrinks.length}</span>
                </button>
            </div>
            
            <!-- Hot Drinks Section -->
            <div id="section-hot" class="drinks-section">
                <div id="hot-drinks-grid" class="cards-container"></div>
            </div>
            
            <!-- Cold Drinks Section (Hidden by default) -->
            <div id="section-cold" class="drinks-section" style="display:none;">
                <div id="cold-drinks-grid" class="cards-container"></div>
            </div>
            
            <div id="browse-recipes-grid" style="display:none;"></div>
        `;

        resultsContainer.innerHTML = simpleHTML;

        // Custom render function for separate grids
        const renderDrinkCards = (targetGridId, items) => {
            const grid = document.getElementById(targetGridId);
            if (!grid) return;
            grid.innerHTML = '';

            // Re-use standard card rendering logic
            items.forEach(item => grid.appendChild(createRecipeCard(item)));
        };

        renderDrinkCards('hot-drinks-grid', warmDrinks);
        renderDrinkCards('cold-drinks-grid', coldDrinks);

        // Tab switching function
        window.switchDrinkTab = function (tab) {
            const hotSection = document.getElementById('section-hot');
            const coldSection = document.getElementById('section-cold');
            const hotTab = document.getElementById('tab-hot');
            const coldTab = document.getElementById('tab-cold');

            if (tab === 'hot') {
                hotSection.style.display = 'block';
                coldSection.style.display = 'none';
                hotTab.style.background = 'linear-gradient(135deg, #fffbeb, #fef3c7)';
                hotTab.style.transform = 'scale(1.02)';
                coldTab.style.background = 'rgba(59, 130, 246, 0.1)';
                coldTab.style.transform = 'scale(1)';
            } else {
                hotSection.style.display = 'none';
                coldSection.style.display = 'block';
                coldTab.style.background = 'linear-gradient(135deg, #eff6ff, #dbeafe)';
                coldTab.style.transform = 'scale(1.02)';
                hotTab.style.background = 'rgba(217, 119, 6, 0.1)';
                hotTab.style.transform = 'scale(1)';
            }
        };

        // Search listener for drinks
        document.getElementById('browse-search').addEventListener('input', function () {
            const term = this.value.trim().toLowerCase();
            const filteredWarm = warmDrinks.filter(r => r.name.toLowerCase().includes(term));
            const filteredCold = coldDrinks.filter(r => r.name.toLowerCase().includes(term));
            renderDrinkCards('hot-drinks-grid', filteredWarm);
            renderDrinkCards('cold-drinks-grid', filteredCold);
        });

    } else if (isDessertPage || isPastryPage || isSaucePage) {
        // Standard single grid for other pages
        let simpleHTML = `
            <div style="width:100%; margin-bottom:20px;">
                <input type="text" id="browse-search" placeholder="🔍 ابحث..." 
                    style="width:100%; padding:12px 15px; border-radius:15px; border:1px solid #e2e8f0; font-size:1em; background:#f8fafc; color:#334155; margin-bottom:10px;">
                ${sortHTML}
            </div>
            <div id="browse-recipes-grid" class="cards-container"></div>
        `;

        resultsContainer.innerHTML = simpleHTML;

        renderSimpleCards = function (recipes) {
            const grid = document.getElementById('browse-recipes-grid');
            if (!grid) return;
            grid.innerHTML = '';

            if (recipes.length === 0) {
                grid.innerHTML = '<p style="text-align:center; color:#94a3b8; width:100%; padding:30px;">لا توجد نتائج</p>';
                return;
            }
            recipes.forEach(item => grid.appendChild(createRecipeCard(item)));
        };

        renderSimpleCards(list);

        document.getElementById('browse-search').addEventListener('input', function () {
            const term = this.value.trim().toLowerCase();
            const sourceList = currentBrowseList;
            if (term === '') {
                renderSimpleCards(sourceList);
            } else {
                const filtered = sourceList.filter(r => r.name.toLowerCase().includes(term));
                renderSimpleCards(filtered);
            }
        });
    } else {
        // ONLY FOR MAIN - show categories
        const groupedRecipes = {};
        list.forEach(item => {
            const cat = item.category || 'main';
            if (!groupedRecipes[cat]) groupedRecipes[cat] = [];
            groupedRecipes[cat].push(item);
        });

        const catKeys = Object.keys(groupedRecipes);

        let tabsHTML = `
            <div style="width:100%; margin-bottom:20px;">
                <input type="text" id="browse-search" placeholder="🔍 ابحث عن وصفة..." 
                    style="width:100%; padding:12px 15px; border-radius:15px; border:1px solid #e2e8f0; font-size:1em; margin-bottom:15px; background:#f8fafc; color:#334155;">
                
                ${sortHTML}

                <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center;">
        `;

        catKeys.forEach((catKey, index) => {
            const catInfo = recipeCategories[catKey] || { name: 'أخرى', color: '#64748b' };
            const isFirst = index === 0;
            tabsHTML += `
                <button class="cat-tab ${isFirst ? 'active' : ''}" data-cat="${catKey}" 
                    style="padding:10px 20px; border-radius:25px; border:2px solid ${catInfo.color}; 
                    background:${isFirst ? catInfo.color : 'transparent'}; 
                    color:${isFirst ? 'white' : catInfo.color}; 
                    font-weight:bold; cursor:pointer; transition:all 0.2s;">
                    ${catInfo.name} (${groupedRecipes[catKey].length})
                </button>
            `;
        });

        tabsHTML += `
                </div>
            </div>
            <div id="browse-recipes-grid" class="cards-container"></div>
        `;

        resultsContainer.innerHTML = tabsHTML;
        window.currentBrowseCat = catKeys[0];

        renderCategoryCards = function (recipes) {
            const grid = document.getElementById('browse-recipes-grid');
            if (!grid) return;
            grid.innerHTML = '';

            if (recipes.length === 0) {
                grid.innerHTML = '<p style="text-align:center; color:#94a3b8; width:100%; padding:30px;">لا توجد نتائج</p>';
                return;
            }

            recipes.forEach(item => grid.appendChild(createRecipeCard(item)));
        };

        // Render initial
        renderCategoryCards(groupedRecipes[catKeys[0]] || list);

        document.querySelectorAll('.cat-tab').forEach(tab => {
            tab.addEventListener('click', function () {
                document.querySelectorAll('.cat-tab').forEach(t => {
                    const tCat = t.dataset.cat;
                    const tInfo = recipeCategories[tCat] || { color: '#64748b' };
                    t.style.background = 'transparent';
                    t.style.color = tInfo.color;
                    t.classList.remove('active');
                });
                const catInfo = recipeCategories[this.dataset.cat] || { color: '#64748b' };
                this.style.background = catInfo.color;
                this.style.color = 'white';
                this.classList.add('active'); // Add active for sort logic
                window.currentBrowseCat = this.dataset.cat;

                // Use global currentBrowseList to respect sort
                const relevantRecipes = currentBrowseList.filter(r => (r.category || 'main') === this.dataset.cat);
                renderCategoryCards(relevantRecipes);
            });
        });

        document.getElementById('browse-search').addEventListener('input', function () {
            const term = this.value.trim().toLowerCase();
            const source = currentBrowseList.filter(r => (r.category || 'main') === window.currentBrowseCat);

            if (term === '') {
                renderCategoryCards(source);
            } else {
                const filtered = source.filter(r => r.name.toLowerCase().includes(term));
                renderCategoryCards(filtered);
            }
        });
    }

    // Helper to create card with new DESIGN features
    function createRecipeCard(item) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.style.cssText = 'text-align:center; padding:15px; display:flex; flex-direction:column; align-items:center; gap:10px;';

        const ingCount = item.ingredients.length;
        let icon = '🥘';
        if (item.type === 'dessert') icon = '🍰';
        else if (item.type === 'drink_hot') icon = '☕';
        else if (item.type === 'drink_cold') icon = '🥤';
        else if (item.type === 'pastry') icon = '🥐';
        else if (item.type === 'sauce') icon = '🥣';
        else if (item.type === 'fast') icon = '⚡';

        // Highlight logic
        const highlightCal = currentSort.criteria === 'calories' ? 'border:2px solid #d97706; background:#fff7ed; transform:scale(1.05);' : 'opacity:0.75; filter:grayscale(0.3);';
        const highlightProt = currentSort.criteria === 'protein' ? 'border:2px solid #10b981; background:#ecfdf5; transform:scale(1.05);' : 'opacity:0.75; filter:grayscale(0.3);';

        // If NO sort is active, show both clearly
        const defaultStyle = 'opacity:1;';
        const calStyle = currentSort.criteria ? highlightCal : defaultStyle;
        const protStyle = currentSort.criteria ? highlightProt : defaultStyle;

        card.innerHTML = `
            <div class="recipe-icon" style="font-size:2.5em; margin-bottom:5px;">${icon}</div>
            <div class="recipe-info" style="width:100%;">
                <h4 style="margin:0 0 10px 0; font-size:1.1em;">${item.name}</h4>
                
                <div class="nutrition-info" style="display:flex; justify-content:center; gap:8px; margin-bottom:10px; flex-wrap:wrap;">
                    <!-- New Badge Colors: Lighter Backgrounds FORCED -->
                    <span class="badge-nutrition cal" style="padding:4px 10px; border-radius:12px; background:${currentSort.criteria === 'calories' ? '#fff7ed' : '#f8fafc'} !important; color:${currentSort.criteria === 'calories' ? '#c2410c' : '#334155'} !important; border:1px solid ${currentSort.criteria === 'calories' ? '#fb923c' : '#e2e8f0'} !important; font-size:0.85em; transition:all 0.3s; ${currentSort.criteria === 'calories' ? 'transform:scale(1.05); font-weight:bold;' : ''}">
                        🔥 ${item.calories}
                    </span>
                    <span class="badge-nutrition prot" style="padding:4px 10px; border-radius:12px; background:${currentSort.criteria === 'protein' ? '#ecfdf5' : '#f8fafc'} !important; color:${currentSort.criteria === 'protein' ? '#047857' : '#334155'} !important; border:1px solid ${currentSort.criteria === 'protein' ? '#34d399' : '#e2e8f0'} !important; font-size:0.85em; transition:all 0.3s; ${currentSort.criteria === 'protein' ? 'transform:scale(1.05); font-weight:bold;' : ''}">
                        💪 ${item.protein}
                    </span>
                </div>
                
                <div style="font-size:0.78em; color:#94a3b8; margin-bottom:8px; line-height:1.5; padding:0 4px;">
                    ${generateRecipeDescription(item)}
                </div>
                <div class="recipe-status" style="font-size:0.8em; color:#64748b; margin-bottom:10px;">
                    🥘 ${ingCount} مكونات
                </div>
                <button class="view-btn" style="width:100%;">عرض الوصفة</button>
            </div>
        `;
        card.querySelector('.view-btn').addEventListener('click', () => openRecipe(item));
        return card;
    }

    resultsSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderIngredients(filterText = '') {
    if (!ingredientsGrid) return;
    ingredientsGrid.innerHTML = '';

    if (typeof ingredientsList === 'undefined' || !ingredientsList) return;

    const normalizedFilter = filterText.toLowerCase();

    const filteredList = ingredientsList.filter(ing => {
        const matchesSearch = ing.name.startsWith(normalizedFilter);
        const usage = ing.usage || ['main', 'dessert', 'drink'];
        const matchesType = usage.includes(currentMealType);
        return matchesSearch && matchesType;
    });

    if (filteredList.length === 0) {
        ingredientsGrid.innerHTML = '<p style="text-align:center; color:#94a3b8; width:100%; margin-top:20px;">لا توجد مكونات في هذا القسم.</p>';
        return;
    }

    filteredList.forEach(ing => {
        const div = document.createElement('div');
        div.className = 'ingredient-card';
        if (selectedIngredients.has(ing.name)) div.classList.add('selected');

        div.innerHTML = `
                <div class="icon">${ing.icon}</div>
                <span>${ing.name}</span>
            `;
        div.addEventListener('click', () => toggleIngredient(div, ing.name));
        ingredientsGrid.appendChild(div);
    });
}

function toggleIngredient(element, name) {
    if (selectedIngredients.has(name)) {
        selectedIngredients.delete(name);
        element.classList.remove('selected');
    } else {
        selectedIngredients.add(name);
        element.classList.add('selected');
    }
    updateButton();
}


function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', (e) => renderIngredients(e.target.value.trim()));
    }

    typeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const newType = e.target.value;
            if (currentMealType !== newType) {
                currentMealType = newType;
                selectedIngredients.clear();
                updateButton();
                renderIngredients();
                if (currentView === 'home') resetResults();
            }
        });
    });

    if (findBtn) findBtn.addEventListener('click', findRecipes);
    if (closeResults) closeResults.addEventListener('click', resetResults);
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore background scrolling
        }
    });
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore background scrolling
            }
        });
    }
    if (btnAllocUp) btnAllocUp.addEventListener('click', () => changeServings(1));
    if (btnAllocDown) btnAllocDown.addEventListener('click', () => changeServings(-1));
}

function updateButton() {
    if (!findBtn) return;
    const count = selectedIngredients.size;
    const span = findBtn.querySelector('span');
    if (span) span.textContent = count;
    findBtn.disabled = count === 0;
}

function resetResults() {
    if (resultsSection) resultsSection.classList.add('hidden');
    if (resultsContainer) resultsContainer.innerHTML = '';
    const sectionHeader = resultsSection.querySelector('h3');
    if (sectionHeader) sectionHeader.textContent = 'الوصفات المقترحة';
    if (closeResults) closeResults.style.display = 'block';
}

function findRecipes() {
    const typeFiltered = recipes.filter(r => r.type === currentMealType);

    const scoredRecipes = typeFiltered.map(recipe => {
        const required = recipe.ingredients;
        let matchCount = 0;
        let statusList = [];

        required.forEach(req => {
            const isBasic = basicIngredients.some(b => req.includes(b));
            if (!isBasic) {
                if (selectedIngredients.has(req)) {
                    matchCount++;
                    statusList.push({ name: req, status: 'owned' });
                } else {
                    statusList.push({ name: req, status: 'missing' });
                }
            }
        });

        const relevantRequired = required.filter(req => !basicIngredients.some(b => req.includes(b)));
        // Avoid division by zero
        const scoreDivisor = relevantRequired.length || 1;
        const score = matchCount / scoreDivisor;

        return {
            ...recipe,
            matchCount,
            statusList,
            score
        };
    }).filter(r => r.score > 0);

    scoredRecipes.sort((a, b) => b.score - a.score);
    displayResults(scoredRecipes);
}

function displayResults(results) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = '';

    const sectionHeader = resultsSection.querySelector('h3');
    if (sectionHeader) sectionHeader.textContent = 'الوصفات المقترحة';
    if (closeResults) closeResults.style.display = 'block';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align:center; color:var(--text-muted); width:100%;">لا توجد وصفات مطابقة.</p>';
        if (resultsSection) resultsSection.classList.remove('hidden');
        return;
    }

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'recipe-card';

        let icon = '🥘';
        if (item.type === 'dessert') icon = '🍰';
        if (item.type === 'drink') icon = '🥤';

        const statusHTML = item.statusList.map(s => {
            if (s.status === 'owned') {
                return `<span style="color:#4ade80; margin-left:5px;">✔ ${s.name}</span>`;
            } else {
                return `<span style="color:#f87171; margin-left:5px;">○ ${s.name}</span>`;
            }
        }).join(' ');

        card.innerHTML = `
                <div class="recipe-icon">
                    ${icon}
                </div>
                <div class="recipe-info">
                    <h4>${item.name}</h4>
                    <div class="nutrition-info">
                        <span class="badge-nutrition cal">🔥 ${item.calories} سعرة</span>
                        <span class="badge-nutrition prot">💪 ${item.protein}</span>
                    </div>
                    <div class="recipe-status" style="font-size:0.85em; margin-bottom:10px; line-height:1.6; display:flex; flex-wrap:wrap; gap:5px;">
                        ${statusHTML}
                    </div>
                    <button class="view-btn">عرض الوصفة</button>
                </div>
            `;
        card.querySelector('.view-btn').addEventListener('click', () => {
            openRecipe(item);
        });
        resultsContainer.appendChild(card);
    });

    if (resultsSection) {
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== DARK MODE SYSTEM =====
function toggleTheme() {
    // Theme toggle disabled - Dark mode enforced
    console.log('Dark mode enforced: toggleTheme called but ignored.');
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('thallaja_theme');
    const body = document.body;
    const themeBtn = document.getElementById('themeToggle');

    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (themeBtn) themeBtn.textContent = '☀️';
    }
}

// ===== SHARE SYSTEM =====
function shareRecipe() {
    if (!currentRecipe) return;

    const shareText = `${currentRecipe.name}\n\n` +
        `السعرات: ${currentRecipe.calories} سعرة\n` +
        `البروتين: ${currentRecipe.protein}\n\n` +
        `المكونات:\n${currentRecipe.ingredients.join(', ')}\n\n` +
        `من تطبيق ثلاجة 🍽️`;

    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: currentRecipe.name,
            text: shareText,
        }).catch(() => {
            // Fallback: copy to clipboard
            copyRecipeText();
        });
    } else {
        // Fallback for desktop
        copyRecipeText();
    }
}

function copyRecipeText() {
    if (!currentRecipe) return;

    const shareText = `${currentRecipe.name}\n\n` +
        `السعرات: ${currentRecipe.calories} سعرة | البروتين: ${currentRecipe.protein}\n\n` +
        `المكونات:\n${currentRecipe.quantities.map((q, i) => `- ${currentRecipe.ingredients[i]}: ${q}`).join('\n')}\n\n` +
        `الخطوات:\n${currentRecipe.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;

    navigator.clipboard.writeText(shareText).then(() => {
        alert('✅ تم نسخ الوصفة!');
    }).catch(() => {
        alert('❌ فشل النسخ');
    });
}

function shareWhatsApp() {
    if (!currentRecipe) return;
    const text = encodeURIComponent(`${currentRecipe.name} - ${currentRecipe.calories} cal`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

// ===== PRINT PDF SYSTEM =====
function exportRecipeAsImage() {
    if (!currentRecipe) return;

    // Calculate total time
    const totalTime = extractTimeFromSteps(currentRecipe.steps || []);
    let timeText = 'غير محدد';
    if (totalTime > 0) {
        if (totalTime >= 60) {
            const hours = Math.floor(totalTime / 60);
            const mins = totalTime % 60;
            timeText = mins > 0 ? `${hours} ساعة و ${mins} دقيقة` : `${hours} ساعة`;
        } else {
            timeText = `${totalTime} دقيقة`;
        }
    }

    // Create a formatted card
    const exportContainer = document.createElement('div');
    exportContainer.style.cssText = `
        width: 900px;
        background: linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1e293b 100%);
        padding: 40px;
        font-family: 'Almarai', sans-serif;
        direction: rtl;
        position: fixed;
        left: -9999px;
        top: 0;
    `;

    exportContainer.innerHTML = `
        <!-- Main Card with Dark Theme -->
        <div style="background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%); border-radius: 30px; padding: 50px; box-shadow: 0 30px 80px rgba(0,0,0,0.5);">
            
            <!-- Header Logo Bar -->
            <div style="background: linear-gradient(90deg, #1e293b, #334155); padding: 15px 30px; border-radius: 12px; margin-bottom: 40px; display: flex; align-items: center; justify-content: center; gap: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <span style="font-size: 1.8em;">❄️</span>
                <span style="font-size: 1.6em; font-weight: 900; color: #fbbf24;">ثلاجتك</span>
            </div>

            <!-- Recipe Title -->
            <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid rgba(255,255,255,0.1);">
                <h1 style="color: #ffffff; font-size: 2.8em; margin: 0 0 25px 0; font-weight: 900; line-height: 1.3;">${currentRecipe.name}</h1>
                
                <!-- Nutrition Badges -->
                <div style="display: flex; justify-content: center; gap: 15px; margin-top: 25px; flex-wrap: wrap;">
                    <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #1e293b; padding: 12px 25px; border-radius: 25px; font-weight: 800; font-size: 1.1em;">
                        🔥 ${currentRecipe.calories} سعرة
                    </div>
                    <div style="background: linear-gradient(135deg, #34d399, #10b981); color: #1e293b; padding: 12px 25px; border-radius: 25px; font-weight: 800; font-size: 1.1em;">
                        💪 ${currentRecipe.protein}
                    </div>
                    <div style="background: linear-gradient(135deg, #60a5fa, #3b82f6); color: white; padding: 12px 25px; border-radius: 25px; font-weight: 800; font-size: 1.1em;">
                        ⏱️ ${timeText}
                    </div>
                </div>
            </div>

            <!-- Ingredients Section -->
            <div style="margin-bottom: 35px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                    <span style="font-size: 1.5em;">🥘</span>
                    <h2 style="color: #fbbf24; font-size: 1.8em; margin: 0; font-weight: 800;">المكونات والمقادير</h2>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);">
                    ${currentRecipe.quantities.map((q, i) => `
                        <div style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #e2e8f0; font-weight: 600; font-size: 1.05em;">✓ ${currentRecipe.ingredients[i]}</span>
                            <span style="color: #fbbf24; font-size: 1em; font-weight: 600;">${q}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Steps Section -->
            <div style="margin-bottom: 35px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                    <span style="font-size: 1.5em;">📝</span>
                    <h2 style="color: #34d399; font-size: 1.8em; margin: 0; font-weight: 800;">طريقة التحضير</h2>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);">
                    ${currentRecipe.steps.map((step, i) => `
                        <div style="margin-bottom: 18px; display: flex; gap: 18px; align-items: flex-start;">
                            <div style="background: linear-gradient(135deg, #34d399, #10b981); color: #1e293b; min-width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; flex-shrink: 0; font-size: 1.1em;">
                                ${i + 1}
                            </div>
                            <p style="color: #e2e8f0; line-height: 1.9; margin: 0; padding-top: 8px; font-size: 1.05em; font-weight: 500;">${step}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid rgba(255,255,255,0.1);">
                <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <span style="font-size: 1.3em;">❄️</span>
                    <span style="color: #fbbf24; font-size: 1.2em; font-weight: 700;">ثلاجتك</span>
                    <span style="color: #94a3b8; font-size: 1em;">- وصفات لذيذة من مكونات ثلاجتك</span>
                </div>
            </div>
            
        </div>
    `;

    document.body.appendChild(exportContainer);

    html2canvas(exportContainer, {
        scale: 2,
        backgroundColor: null,
        logging: false
    }).then(canvas => {
        // Remove the temporary container
        document.body.removeChild(exportContainer);

        // Create download link
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${currentRecipe.name}.png`;
            link.click();
            URL.revokeObjectURL(url);

            alert('✅ تم تحميل الوصفة كصورة!');
        });
    }).catch(error => {
        document.body.removeChild(exportContainer);
        alert('❌ حدث خطأ في التصدير');
        console.error(error);
    });
}

// Keep old function name for compatibility
function printRecipe() {
    exportRecipeAsImage();
}

// ===== FAVORITES SYSTEM =====
function getFavorites() {
    return JSON.parse(localStorage.getItem('thallaja_favorites') || '[]');
}

function saveFavorites(favorites) {
    localStorage.setItem('thallaja_favorites', JSON.stringify(favorites));
}

function isFavorite(recipeId) {
    const favorites = getFavorites();
    return favorites.includes(recipeId);
}

function toggleFavorite(recipeId) {
    let favorites = getFavorites();
    const index = favorites.indexOf(recipeId);

    if (index > -1) {
        // Remove from favorites
        favorites.splice(index, 1);
    } else {
        // Add to favorites
        favorites.push(recipeId);
    }

    saveFavorites(favorites);
    updateFavoriteButton(recipeId);
    return !(index > -1); // return true if added
}

function updateFavoriteButton(recipeId) {
    const heartBtn = document.getElementById('favoriteBtn');
    if (heartBtn) {
        const isFav = isFavorite(recipeId);
        heartBtn.innerHTML = isFav ? '❤️ مفضل' : '🤍 أضف للمفضلة';
        heartBtn.style.background = isFav ? '#ef4444' : 'transparent';
        heartBtn.style.color = isFav ? 'white' : '#ef4444';
    }
}

// ===== MEASUREMENT CONVERTER SYSTEM =====
const conversionTable = {
    // Volume conversions (to ml)
    'كوب': 240,
    'ملعقة كبيرة': 15,
    'ملعقة صغيرة': 5,
    'لتر': 1000,

    // Weight conversions (common ingredients to grams)
    'كوب دقيق': 120,
    'كوب سكر': 200,
    'كوب سكر بني': 220,
    'كوب أرز': 180,
    'كوب شوفان': 80,
    'كوب زبدة': 225,
    'كوب زيت': 220,
    'كوب حليب': 240,
    'كوب ماء': 240,
    'كوب عسل': 340,
    'ملعقة كبيرة زبدة': 14,
    'ملعقة كبيرة سكر': 12,
    'ملعقة كبيرة دقيق': 8,
    'ملعقة صغيرة ملح': 6,
    'ملعقة صغيرة سكر': 4
};

function convertMeasurement(quantity, from, to) {
    // Simple conversion examples
    const conversions = {
        'كوب->مل': 240,
        'ملعقة كبيرة->مل': 15,
        'ملعقة صغيرة->مل': 5,
        'كوب دقيق->جرام': 120,
        'كوب سكر->جرام': 200,
        'كوب أرز->جرام': 180,
        'كوب زبدة->جرام': 225
    };

    const key = `${from}->${to}`;
    if (conversions[key]) {
        return (quantity * conversions[key]).toFixed(0);
    }
    return null;
}

function showMeasurementConverter() {
    // Create modal for converter
    const converterModal = document.createElement('div');
    converterModal.id = 'converterModal';
    converterModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    converterModal.innerHTML = `
        <div style="background: var(--glass-bg); backdrop-filter: blur(20px); border-radius: 20px; padding: 30px; max-width: 500px; width: 90%; border: 1px solid var(--glass-border);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: var(--primary-gold); margin: 0;">⚖️ محول المقادير</h2>
                <button onclick="closeConverter()" style="background: none; border: none; font-size: 2em; color: var(--text-light); cursor: pointer;">&times;</button>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; color: var(--text-light);">الكمية:</label>
                <input type="number" id="convAmount" placeholder="1" value="1" 
                    style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.1); color: var(--text-light); font-size: 1.1em;">
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; color: var(--text-light);">من:</label>
                <select id="convFrom" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.1); color: var(--text-light); font-size: 1em;">
                    <option value="كوب">كوب</option>
                    <option value="ملعقة كبيرة">ملعقة كبيرة</option>
                    <option value="ملعقة صغيرة">ملعقة صغيرة</option>
                    <option value="كوب دقيق">كوب دقيق</option>
                    <option value="كوب سكر">كوب سكر</option>
                    <option value="كوب أرز">كوب أرز</option>
                    <option value="كوب زبدة">كوب زبدة</option>
                </select>
            </div>
            
 <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; color: var(--text-light);">إلى:</label>
                <select id="convTo" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.1); color: var(--text-light); font-size: 1em;">
                    <option value="مل">مل</option>
                    <option value="جرام">جرام</option>
                </select>
            </div>
            
            <button onclick="performConversion()" 
                style="width: 100%; padding: 15px; border-radius: 15px; border: none; background: linear-gradient(135deg, var(--primary-gold) 0%, var(--primary-orange) 100%); color: white; font-weight: bold; font-size: 1.1em; cursor: pointer; margin-bottom: 15px;">
                تحويل
            </button>
            
            <div id="convResult" style="background: rgba(16, 185, 129, 0.2); border: 2px solid #10b981; border-radius: 15px; padding: 20px; text-align: center; display: none;">
                <p style="color: #10b981; font-size: 1.5em; font-weight: bold; margin: 0;" id="convResultText"></p>
            </div>
        </div>
    `;

    document.body.appendChild(converterModal);
}

window.closeConverter = function () {
    const modal = document.getElementById('converterModal');
    if (modal) modal.remove();
};

window.performConversion = function () {
    const amount = parseFloat(document.getElementById('convAmount').value);
    const from = document.getElementById('convFrom').value;
    const to = document.getElementById('convTo').value;

    const result = convertMeasurement(amount, from, to);
    const resultDiv = document.getElementById('convResult');
    const resultText = document.getElementById('convResultText');

    if (result) {
        resultText.textContent = `${amount} ${from} = ${result} ${to}`;
        resultDiv.style.display = 'block';
    } else {
        resultText.textContent = 'لا يمكن التحويل بين هذه الوحدات';
        resultDiv.style.background = 'rgba(239, 68, 68, 0.2)';
        resultDiv.style.borderColor = '#ef4444';
        resultText.style.color = '#ef4444';
        resultDiv.style.display = 'block';
    }
};

// ===== TIME CALCULATION SYSTEM =====
function extractTimeFromSteps(steps) {
    // Extract ALL time mentions from every step (total recipe time)
    let totalMinutes = 0;
    
    steps.forEach(step => {
        // Handle ranges first (e.g., "5-7 دقائق" -> use average)
        const rangeMatches = step.matchAll(/(\d+)\s*[-–]\s*(\d+)\s*(?:دقيقة|دقائق|دقيقه)/g);
        let rangeConsumed = [];
        for (const match of rangeMatches) {
            const avg = Math.round((parseInt(match[1]) + parseInt(match[2])) / 2);
            totalMinutes += avg;
            rangeConsumed.push(match[0]);
        }
        
        // Remove range matches from step for further parsing
        let cleanedStep = step;
        rangeConsumed.forEach(r => { cleanedStep = cleanedStep.replace(r, ''); });
        
        // Handle standalone minutes
        const minMatches = cleanedStep.matchAll(/(\d+)\s*(?:دقيقة|دقائق|دقيقه)/g);
        for (const match of minMatches) {
            totalMinutes += parseInt(match[1]);
        }
        
        // Handle hours
        const hourMatches = cleanedStep.matchAll(/(\d+)\s*(?:ساعة|ساعات)/g);
        for (const match of hourMatches) {
            totalMinutes += parseInt(match[1]) * 60;
        }
        
        // Handle "ساعة" without number (single hour)
        if (/(?<![\d])ساعة/.test(cleanedStep) && !/(?:نصف|ربع|\d)\s*ساعة/.test(cleanedStep)) {
            totalMinutes += 60;
        }
        
        // Special cases
        if (cleanedStep.includes('نصف ساعة')) totalMinutes += 30;
        if (cleanedStep.includes('ربع ساعة')) totalMinutes += 15;
        if (cleanedStep.includes('ثلث ساعة')) totalMinutes += 20;
    });

    // If no time found in steps, estimate based on step count
    if (totalMinutes === 0) {
        totalMinutes = Math.max(5, steps.length * 2); // 2 minutes per step minimum
    }
    
    // Cap at reasonable time (skip overnight resting that might be mentioned)
    // We want COOKING time only, not total prep time including overnight marinating
    if (totalMinutes > 180) {
        totalMinutes = 180; // Cap at 3 hours max
    }

    return totalMinutes;
}

function categorizeByTime(recipes) {
    return recipes.map(recipe => {
        const time = extractTimeFromSteps(recipe.steps || []);
        return { ...recipe, estimatedTime: time };
    }).sort((a, b) => a.estimatedTime - b.estimatedTime);
}

// ===== EMERGENCY MODE =====
let currentEmergencyFilter = 'all'; // Track current filter

function renderEmergencyMode() {
    resultsContainer.innerHTML = '';
    const sectionHeader = resultsSection.querySelector('h3');
    if (sectionHeader) sectionHeader.textContent = '⚡ وضع الطوارئ - وصفات سريعة';
    if (closeResults) closeResults.style.display = 'none';

    // Get quick recipes and calculate real time
    const quickRecipes = recipes.filter(r => r.category === 'quick' || r.ingredients.length <= 7);
    const recipesWithTime = categorizeByTime(quickRecipes);

    // Categorize by actual time
    const ultraFast = recipesWithTime.filter(r => r.estimatedTime <= 10);
    const fast = recipesWithTime.filter(r => r.estimatedTime > 10 && r.estimatedTime <= 15);
    const moderate = recipesWithTime.filter(r => r.estimatedTime > 15 && r.estimatedTime <= 25);

    // Filter out sauces and separate salads from main
    // Sauces removed from emergency mode completely
    const filteredRecipes = recipesWithTime.filter(r => r.type !== 'sauce');
    
    // Count by type (main excludes salad and sauce now)
    const mainCount = filteredRecipes.filter(r => r.type === 'main' || r.type === 'fast').length;
    const saladCount = filteredRecipes.filter(r => r.type === 'salad').length;
    const dessertCount = filteredRecipes.filter(r => r.type === 'dessert').length;
    const drinkCount = filteredRecipes.filter(r => r.type === 'drink' || r.type === 'drink_hot' || r.type === 'drink_cold').length;

    resultsContainer.innerHTML = `
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; border-radius: 20px; margin-bottom: 30px; text-align: center; color: white; box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);">
            <h2 style="font-size: 2.5em; margin-bottom: 10px;">⚡ وضع الطوارئ</h2>
            <p style="font-size: 1.2em; opacity: 0.95; margin-bottom: 15px;">وصفات سريعة جاهزة في دقائق معدودة!</p>
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px; flex-wrap: wrap;">
                <div style="background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 15px;">
                    <div style="font-size: 2em; margin-bottom: 5px;">⚡⚡⚡</div>
                    <div style="font-size: 0.9em; opacity: 0.9;">${ultraFast.length} وصفة فائقة السرعة</div>
                    <div style="font-size: 0.85em; margin-top: 5px;">أقل من 10 دقائق</div>
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 15px;">
                    <div style="font-size: 2em; margin-bottom: 5px;">⚡⚡</div>
                    <div style="font-size: 0.9em; opacity: 0.9;">${fast.length} وصفة سريعة</div>
                    <div style="font-size: 0.85em; margin-top: 5px;">10-15 دقيقة</div>
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 15px;">
                    <div style="font-size: 2em; margin-bottom: 5px;">⚡</div>
                    <div style="font-size: 0.9em; opacity: 0.9;">${moderate.length} وصفة متوسطة</div>
                    <div style="font-size: 0.85em; margin-top: 5px;">15-25 دقيقة</div>
                </div>
            </div>
        </div>

        <!-- Type Filters -->
        <div style="margin-bottom: 30px; text-align: center;">
            <h4 style="color: var(--text-light); margin-bottom: 15px;">تصفية حسب النوع:</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                <button onclick="filterEmergencyByType('all')" class="emergency-type-filter ${currentEmergencyFilter === 'all' ? 'active' : ''}" data-type="all">
                    الكل (${filteredRecipes.length})
                </button>
                <button onclick="filterEmergencyByType('main')" class="emergency-type-filter ${currentEmergencyFilter === 'main' ? 'active' : ''}" data-type="main">
                    🥘 أطباق رئيسية (${mainCount})
                </button>
                <button onclick="filterEmergencyByType('salad')" class="emergency-type-filter ${currentEmergencyFilter === 'salad' ? 'active' : ''}" data-type="salad">
                    🥗 سلطات (${saladCount})
                </button>
                <button onclick="filterEmergencyByType('dessert')" class="emergency-type-filter ${currentEmergencyFilter === 'dessert' ? 'active' : ''}" data-type="dessert">
                    🍰 حلويات (${dessertCount})
                </button>
                <button onclick="filterEmergencyByType('drink')" class="emergency-type-filter ${currentEmergencyFilter === 'drink' ? 'active' : ''}" data-type="drink">
                    🥤 مشروبات (${drinkCount})
                </button>
            </div>
        </div>

        <!-- Results Container -->
        <div id="emergency-results-container"></div>
    `;

    // Add filter button styles
    if (!document.getElementById('emergency-filter-styles')) {
        const style = document.createElement('style');
        style.id = 'emergency-filter-styles';
        style.textContent = `
            .emergency-type-filter {
                padding: 12px 24px;
                border-radius: 25px;
                border: 2px solid var(--primary-orange);
                background: transparent;
                color: var(--text-light);
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 1em;
            }
            .emergency-type-filter:hover {
                background: var(--primary-orange);
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
            }
            .emergency-type-filter.active {
                background: linear-gradient(135deg, var(--primary-gold), var(--primary-orange));
                color: white;
                border-color: var(--primary-gold);
            }
        `;
        document.head.appendChild(style);
    }

    // Store recipes for filtering
    window.emergencyRecipesData = { ultraFast: ultraFast.filter(r => r.type !== 'sauce'), fast: fast.filter(r => r.type !== 'sauce'), moderate: moderate.filter(r => r.type !== 'sauce'), all: filteredRecipes };

    // Render initial view
    renderEmergencyByType(currentEmergencyFilter);

    resultsSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.filterEmergencyByType = function (type) {
    currentEmergencyFilter = type;

    // Update active button
    document.querySelectorAll('.emergency-type-filter').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-type="${type}"]`).classList.add('active');

    renderEmergencyByType(type);
};

function renderEmergencyByType(type) {
    const container = document.getElementById('emergency-results-container');
    if (!container) return;

    const { ultraFast, fast, moderate } = window.emergencyRecipesData;

    // Filter by type (with smart grouping)
    const filterByType = (recipes) => {
        if (type === 'all') return recipes;
        if (type === 'main') return recipes.filter(r => r.type === 'main' || r.type === 'fast');
        if (type === 'drink') return recipes.filter(r => r.type === 'drink' || r.type === 'drink_hot' || r.type === 'drink_cold');
        if (type === 'salad') return recipes.filter(r => r.type === 'salad');
        if (type === 'dessert') return recipes.filter(r => r.type === 'dessert');
        return recipes.filter(r => r.type === type);
    };

    const filteredUltraFast = filterByType(ultraFast);
    const filteredFast = filterByType(fast);
    const filteredModerate = filterByType(moderate);

    container.innerHTML = `
        <!-- Ultra Fast Section -->
        ${filteredUltraFast.length > 0 ? `
            <div style="margin-bottom: 40px;">
                <h3 style="color: #ef4444; font-size: 1.8em; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                    <span style="background: linear-gradient(135deg, #ef4444, #dc2626); padding: 10px 20px; border-radius: 15px; color: white;">
                        ⚡⚡⚡ فائقة السرعة - أقل من 10 دقائق
                    </span>
                </h3>
                <div class="cards-container" id="ultra-fast-grid"></div>
            </div>
        ` : ''}

        <!-- Fast Section -->
        ${filteredFast.length > 0 ? `
            <div style="margin-bottom: 40px;">
                <h3 style="color: #f59e0b; font-size: 1.8em; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                    <span style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 10px 20px; border-radius: 15px; color: white;">
                        ⚡⚡ سريعة - 10-15 دقيقة
                    </span>
                </h3>
                <div class="cards-container" id="fast-grid"></div>
            </div>
        ` : ''}

        <!-- Moderate Section -->
        ${filteredModerate.length > 0 ? `
            <div style="margin-bottom: 40px;">
                <h3 style="color: #10b981; font-size: 1.8em; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                    <span style="background: linear-gradient(135deg, #10b981, #059669); padding: 10px 20px; border-radius: 15px; color: white;">
                        ⚡ متوسطة - 15-25 دقيقة
                    </span>
                </h3>
                <div class="cards-container" id="moderate-grid"></div>
            </div>
        ` : ''}

        ${filteredUltraFast.length === 0 && filteredFast.length === 0 && filteredModerate.length === 0 ? `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 4em; margin-bottom: 20px;">😔</div>
                <h3 style="color: var(--text-muted);">لا توجد وصفات في هذا التصنيف</h3>
                <p style="color: var(--text-muted); margin-top: 10px;">جرب تصنيف آخر</p>
            </div>
        ` : ''}
    `;

    // Render each category with actual time
    if (filteredUltraFast.length > 0) renderEmergencyCategoryWithTime(filteredUltraFast, 'ultra-fast-grid', '#ef4444');
    if (filteredFast.length > 0) renderEmergencyCategoryWithTime(filteredFast, 'fast-grid', '#f59e0b');
    if (filteredModerate.length > 0) renderEmergencyCategoryWithTime(filteredModerate, 'moderate-grid', '#10b981');
}

function renderEmergencyCategoryWithTime(recipes, gridId, color) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.style.position = 'relative';
        const icon = recipe.type === 'dessert' ? '🍰' : recipe.type === 'drink' ? '🥤' : '🥘';

        // Use calculated time
        const actualTime = recipe.estimatedTime || 10;
        const timeDisplay = actualTime < 60 ? `${actualTime} دقيقة` : `${Math.floor(actualTime / 60)} ساعة ${actualTime % 60} دقيقة`;

        card.innerHTML = `
            <div style="position: absolute; top: 10px; left: 10px; background: ${color}; color: white; padding: 8px 15px; border-radius: 15px; font-size: 0.9em; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                ⏱️ ${timeDisplay}
            </div>
            <div class="recipe-icon">${icon}</div>
            <div class="recipe-info">
                <h4>${recipe.name}</h4>
                <div style="font-size:0.82em; color:#94a3b8; margin:6px 0 8px; line-height:1.5;">
                    ${generateRecipeDescription(recipe)}
                </div>
                <div class="nutrition-info">
                    <span class="badge-nutrition cal">🔥 ${recipe.calories} سعرة</span>
                    <span class="badge-nutrition prot">💪 ${recipe.protein}</span>
                </div>
                <div style="margin: 10px 0; display: flex; gap: 8px; flex-wrap: wrap;">
                    <span style="background: rgba(147, 51, 234, 0.1); color: #9333ea; padding: 4px 10px; border-radius: 10px; font-size: 0.8em;">
                        📦 ${recipe.ingredients.length} مكونات
                    </span>
                    <span style="background: rgba(59, 130, 246, 0.1); color: #3b82f6; padding: 4px 10px; border-radius: 10px; font-size: 0.8em;">
                        ${recipe.steps.length} خطوات
                    </span>
                </div>
                <button class="view-btn">عرض الوصفة ⚡</button>
            </div>
        `;

        card.querySelector('.view-btn').addEventListener('click', () => openRecipe(recipe));
        grid.appendChild(card);
    });
}

// Keep old function for compatibility but not used
function renderEmergencyCategory(recipes, gridId, timeLabel, color) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.style.position = 'relative';
        const icon = recipe.type === 'dessert' ? '🍰' : recipe.type === 'drink' ? '🥤' : '🥘';

        card.innerHTML = `
            <div style="position: absolute; top: 10px; left: 10px; background: ${color}; color: white; padding: 8px 15px; border-radius: 15px; font-size: 0.9em; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                ⏱️ ${timeLabel}
            </div>
            <div class="recipe-icon">${icon}</div>
            <div class="recipe-info">
                <h4>${recipe.name}</h4>
                <div style="font-size:0.82em; color:#94a3b8; margin:6px 0 8px; line-height:1.5;">
                    ${generateRecipeDescription(recipe)}
                </div>
                <div class="nutrition-info">
                    <span class="badge-nutrition cal">🔥 ${recipe.calories} سعرة</span>
                    <span class="badge-nutrition prot">💪 ${recipe.protein}</span>
                </div>
                <div style="margin: 10px 0; display: flex; gap: 8px; flex-wrap: wrap;">
                    <span style="background: rgba(147, 51, 234, 0.1); color: #9333ea; padding: 4px 10px; border-radius: 10px; font-size: 0.8em;">
                        📦 ${recipe.ingredients.length} مكونات
                    </span>
                    <span style="background: rgba(59, 130, 246, 0.1); color: #3b82f6; padding: 4px 10px; border-radius: 10px; font-size: 0.8em;">
                        ${recipe.steps.length} خطوات
                    </span>
                </div>
                <button class="view-btn">عرض الوصفة ⚡</button>
            </div>
        `;

        card.querySelector('.view-btn').addEventListener('click', () => openRecipe(recipe));
        grid.appendChild(card);
    });
}

// Remove old emergency functions
function filterEmergency(type) {
    const quickRecipes = recipes.filter(r => r.category === 'quick' || r.ingredients.length <= 5);
    const filtered = type === 'all' ? quickRecipes : quickRecipes.filter(r => r.type === type);

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${type}"]`).classList.add('active');

    renderEmergencyRecipes(filtered);
}

function renderEmergencyRecipes(recipesToShow) {
    const grid = document.getElementById('emergency-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (recipesToShow.length === 0) {
        grid.innerHTML = `
            <div style="text-align:center; padding:40px;">
                <p style="color: var(--text-muted); font-size: 1.2em;">لا توجد وصفات سريعة في هذا القسم</p>
            </div>
        `;
        return;
    }

    recipesToShow.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        const icon = recipe.type === 'dessert' ? '🍰' : recipe.type === 'drink' ? '🥤' : '🥘';

        // Estimate time based on ingredients count
        const estimatedTime = recipe.ingredients.length <= 3 ? '5-10 دقائق' : '10-15 دقيقة';

        card.innerHTML = `
            <div style="position: absolute; top: 10px; right: 10px; background: #ef4444; color: white; padding: 5px 12px; border-radius: 15px; font-size: 0.85em; font-weight: bold;">
                ⚡ ${estimatedTime}
            </div>
            <div class="recipe-icon">${icon}</div>
            <div class="recipe-info">
                <h4>${recipe.name}</h4>
                <div class="nutrition-info">
                    <span class="badge-nutrition cal">🔥 ${recipe.calories} سعرة</span>
                    <span class="badge-nutrition prot">💪 ${recipe.protein}</span>
                </div>
                <p style="color: var(--text-muted); font-size: 0.85em; margin: 10px 0;">
                    ${recipe.ingredients.length} مكونات فقط
                </p>
                <button class="view-btn">عرض الوصفة</button>
            </div>
        `;

        card.querySelector('.view-btn').addEventListener('click', () => openRecipe(recipe));
        grid.appendChild(card);
    });
}

function renderFavoritesPage() {
    resultsContainer.innerHTML = '';
    const sectionHeader = resultsSection.querySelector('h3');
    if (sectionHeader) sectionHeader.textContent = 'وصفاتي المفضلة ❤️';
    if (closeResults) closeResults.style.display = 'none';

    const favorites = getFavorites();

    if (favorites.length === 0) {
        resultsContainer.innerHTML = `
            <div style="text-align:center; padding:60px 20px;">
                <div style="font-size:4em; margin-bottom:20px;">🤍</div>
                <h3 style="color:#64748b; margin-bottom:10px;">لا توجد وصفات مفضلة بعد</h3>
                <p style="color:#94a3b8;">اضغط على زر القلب في أي وصفة لإضافتها للمفضلة</p>
            </div>
        `;
        resultsSection.classList.remove('hidden');
        return;
    }

    const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

    resultsContainer.innerHTML = `
        <div style="margin-bottom:20px; text-align:center;">
            <p style="color:#64748b;">لديك ${favoriteRecipes.length} وصفة مفضلة</p>
        </div>
        <div class="cards-container" id="favorites-grid"></div>
    `;

    const grid = document.getElementById('favorites-grid');
    favoriteRecipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        let icon = '🥘';
        if (recipe.type === 'dessert') icon = '🍰';
        else if (recipe.type === 'drink') icon = '🥤';
        else if (recipe.type === 'pastry') icon = '🥐';
        else if (recipe.type === 'salad') icon = '🥗';
        else if (recipe.type === 'sauce') icon = '🥣';
        else if (recipe.type === 'fast') icon = '⚡';

        card.innerHTML = `
            <div class="recipe-icon">${icon}</div>
            <div class="recipe-info">
                <h4>${recipe.name}</h4>
                <div class="nutrition-info">
                    <span class="badge-nutrition cal">🔥 ${recipe.calories} سعرة</span>
                    <span class="badge-nutrition prot">💪 ${recipe.protein}</span>
                </div>
                <button class="view-btn">عرض الوصفة</button>
            </div>
        `;

        card.querySelector('.view-btn').addEventListener('click', () => openRecipe(recipe));
        grid.appendChild(card);
    });

    resultsSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openRecipe(recipe) {
    try {
        // CLEANUP: Remove any existing preview overlays or residual elements
        document.querySelectorAll('.preview-overlay').forEach(el => el.remove());
        const exportBtn = document.querySelector('button[onclick*="exportRecipeImage"]');
        if (exportBtn) exportBtn.innerText = '💾 تحميل الوصفة';

        currentRecipe = recipe;
        currentServings = 1;
        updateModalContent();
        updateFavoriteButton(recipe.id); // Update favorite button state
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    } catch (e) {
        console.error(e);
    }
}

function changeServings(delta) {
    const newCount = currentServings + delta;
    if (newCount < 1) return;
    currentServings = newCount;
    updateModalContent();
}

function updateModalContent() {
    if (!currentRecipe) return;

    if (modalTitle) modalTitle.textContent = currentRecipe.name;

    let typeText = 'طبخ';
    if (currentRecipe.type === 'dessert') typeText = 'حلى';
    else if (currentRecipe.type === 'drink') typeText = 'مشروب';
    else if (currentRecipe.type === 'pastry') typeText = 'معجنات';
    else if (currentRecipe.type === 'salad') typeText = 'سلطة';
    else if (currentRecipe.type === 'sauce') typeText = 'صوص';
    else if (currentRecipe.type === 'fast') typeText = 'وجبة سريعة';

    if (modalType) modalType.textContent = typeText;
    
    // Add/Update recipe description in modal
    let descEl = document.getElementById('modalDescription');
    if (!descEl) {
        descEl = document.createElement('div');
        descEl.id = 'modalDescription';
        descEl.style.cssText = 'font-size:0.9em; color:#94a3b8; margin-top:10px; margin-bottom:15px; padding:10px 14px; background:rgba(255,255,255,0.03); border-radius:10px; border-right:3px solid #fbbf24; line-height:1.7; text-align:right;';
        const modalHeader = document.querySelector('.modal-header');
        if (modalHeader && modalHeader.parentNode) {
            modalHeader.parentNode.insertBefore(descEl, modalHeader.nextSibling);
        }
    }
    descEl.textContent = generateRecipeDescription(currentRecipe);
    if (servingCountSpan) servingCountSpan.textContent = currentServings;

    if (modalNutrition) {
        modalNutrition.style.justifyContent = 'center';
        const totalCals = currentRecipe.calories * currentServings;
        modalNutrition.innerHTML = `
                <span class="badge-nutrition cal" style="font-size:1rem; padding:5px 12px;">🔥 ${totalCals} سعرة</span>
                <span class="badge-nutrition prot" style="font-size:1rem; padding:5px 12px;">💪 ${currentRecipe.protein} (للحصة)</span>
            `;
    }

    // Apply ingredient detail enhancement
    let dataset = currentRecipe.quantities || currentRecipe.ingredients;
    if (dataset && Array.isArray(dataset)) {
        dataset = dataset.map(q => enhanceIngredientDetail(q));
    }
    const userIngredientsArray = Array.from(selectedIngredients);

    const safeHTML = dataset.map(line => {
        let displayText = line;
        if (currentServings > 1) {
            displayText = line.replace(/(\d+(\.\d+)?)/, (match) => {
                const val = parseFloat(match);
                const newVal = val * currentServings;
                return Number.isInteger(newVal) ? newVal : newVal.toFixed(1);
            });
        }

        let className = 'missing-in-recipe';
        for (let owned of userIngredientsArray) {
            if (line.includes(owned)) {
                className = 'owned-in-recipe';
                break;
            }
        }

        if (className === 'missing-in-recipe') {
            const isBasic = basicIngredients.some(b => line.includes(b));
            if (isBasic) {
                className = 'basic-in-recipe';
            }
        }

        return `<li class="${className}">${displayText}</li>`;
    }).join('');

    if (modalIngredients) modalIngredients.innerHTML = safeHTML;
    if (modalSteps) {
        // Inject exact quantities into steps and enhance them
        const stepsWithQuantities = injectQuantitiesIntoSteps(currentRecipe, currentServings);
        const enhancedSteps = enhanceRecipeSteps({...currentRecipe, steps: stepsWithQuantities});
        modalSteps.innerHTML = enhancedSteps.map((s, idx) => `<li style="padding:12px 8px; line-height:2.1; border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.95em;"><span style="display:inline-block; background:var(--primary-gold); color:var(--bg-dark); width:24px; height:24px; border-radius:50%; text-align:center; line-height:24px; font-size:0.8em; font-weight:bold; margin-left:8px;">${idx+1}</span> ${s}</li>`).join('');
    }

    if (modalVideo) {
        modalVideo.innerHTML = '';
        if (currentRecipe.video) {
            setTimeout(() => {
                modalVideo.innerHTML = `
                        <iframe width="100%" height="200" src="${currentRecipe.video}" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    `;
                modalVideo.style.display = 'block';
            }, 50);
        } else {
            modalVideo.style.display = 'none';
        }
    }
}

// Start
init();

// Load theme preference
loadTheme();

// ===== GLOBAL SEARCH FUNCTIONALITY =====
const globalSearchInput = document.getElementById('globalSearch');
if (globalSearchInput) {
    globalSearchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.trim().toLowerCase();

        if (searchTerm.length === 0) {
            // Clear search results
            return;
        }

        if (searchTerm.length < 2) {
            // Wait for at least 2 characters
            return;
        }

        // Search in recipes
        const results = recipes.filter(recipe => {
            // Search in name
            const nameMatch = recipe.name.toLowerCase().includes(searchTerm);

            // Search in ingredients
            const ingredientsMatch = recipe.ingredients.some(ing =>
                ing.toLowerCase().includes(searchTerm)
            );

            // Search in type
            let typeText = 'طبخ';
            if (recipe.type === 'dessert') typeText = 'حلى';
            else if (recipe.type === 'drink') typeText = 'مشروب';
            else if (recipe.type === 'pastry') typeText = 'معجنات';
            else if (recipe.type === 'salad') typeText = 'سلطة';
            else if (recipe.type === 'sauce') typeText = 'صوص';
            else if (recipe.type === 'fast') typeText = 'وجبة سريعة';

            const typeMatch = typeText.includes(searchTerm);

            return nameMatch || ingredientsMatch || typeMatch;
        });

        // Display results
        displaySearchResults(results, searchTerm);
    });

    // Clear on escape
    globalSearchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            this.value = '';
            this.blur();
        }
    });
}

function displaySearchResults(results, searchTerm) {
    // Hide home elements
    heroSection.classList.add('hidden');
    typeSelector.classList.add('hidden');
    ingredientsSection.classList.add('hidden');
    actionArea.classList.add('hidden');

    // Show results
    resultsContainer.innerHTML = '';
    const sectionHeader = resultsSection.querySelector('h3');
    if (sectionHeader) sectionHeader.textContent = `نتائج البحث عن "${searchTerm}"`;
    if (closeResults) closeResults.style.display = 'inline-block';

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 4em; margin-bottom: 20px;">🔍</div>
                <h3 style="color: var(--text-muted); margin-bottom: 10px;">لا توجد نتائج</h3>
                <p style="color: var(--text-muted);">جرب كلمة بحث أخرى</p>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = `
            <div style="margin-bottom: 20px; text-align: center;">
                <p style="color: var(--text-muted);">وجدنا ${results.length} وصفة</p>
            </div>
            <div class="cards-container" id="search-results-grid"></div>
        `;

        const grid = document.getElementById('search-results-grid');
        results.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            let icon = '🥘';
            if (recipe.type === 'dessert') icon = '🍰';
            else if (recipe.type === 'drink') icon = '🥤';
            else if (recipe.type === 'pastry') icon = '🥐';
            else if (recipe.type === 'salad') icon = '🥗';
            else if (recipe.type === 'sauce') icon = '🥣';
            else if (recipe.type === 'fast') icon = '⚡';

            card.innerHTML = `
                <div class="recipe-icon">${icon}</div>
                <div class="recipe-info">
                    <h4>${recipe.name}</h4>
                    <div class="nutrition-info">
                        <span class="badge-nutrition cal">🔥 ${recipe.calories} سعرة</span>
                        <span class="badge-nutrition prot">💪 ${recipe.protein}</span>
                    </div>
                    <button class="view-btn">عرض الوصفة</button>
                </div>
            `;

            card.querySelector('.view-btn').addEventListener('click', () => openRecipe(recipe));
            grid.appendChild(card);
        });
    }

    resultsSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== EXPORT & SHARE FUNCTIONALITY =====
window.exportRecipeImage = async function (btnElement) {
    if (!currentRecipe) return;

    const btn = btnElement || event.target.closest('button');
    const originalBtnText = btn ? btn.innerText : '💾 تحميل الوصفة';

    const updateStatus = (text) => {
        if (btn) btn.innerHTML = `⏳ ${text}`;
    };

    try {
        updateStatus('جاري إنشاء التصميم...');

        // Create custom export container
        const exportContainer = document.createElement('div');
        exportContainer.id = 'export-container';
        exportContainer.style.cssText = `
            position: fixed;
            top: -9999px;
            left: -9999px;
            width: 450px;
            background: #0f172a;
            color: white;
            font-family: 'Almarai', sans-serif;
            padding: 25px;
            border-radius: 25px;
            border: 2px solid #fbbf24;
            direction: rtl;
        `;

        // Get type info
        let typeEmoji = '🍳';
        let typeText = 'طبخ';
        if (currentRecipe.type === 'dessert') { typeEmoji = '🍰'; typeText = 'حلى'; }
        else if (currentRecipe.type === 'drink') { typeEmoji = '🥤'; typeText = 'مشروب'; }
        else if (currentRecipe.type === 'pastry') { typeEmoji = '🥐'; typeText = 'معجنات'; }
        else if (currentRecipe.type === 'salad') { typeEmoji = '🥗'; typeText = 'سلطة'; }
        else if (currentRecipe.type === 'sauce') { typeEmoji = '🥣'; typeText = 'صوص'; }
        else if (currentRecipe.type === 'fast') { typeEmoji = '⚡'; typeText = 'وجبة سريعة'; }

        // Extract cooking details from steps
        const allText = currentRecipe.steps.join(' ');

        // Extract time on fire
        let cookingTime = '30 دقيقة';
        const timeMatch = allText.match(/(\d+)\s*(دقيقة|دقائق|ساعة|ساعات)/);
        if (timeMatch) cookingTime = timeMatch[0];

        // Extract temperature
        let temperature = '180°C';
        const tempMatch = allText.match(/(\d+)\s*(درجة|°)/);
        if (tempMatch) temperature = tempMatch[1] + '°C';

        // Check if steps mention oven
        const hasOven = allText.includes('فرن') || allText.includes('الفرن');
        const hasStove = allText.includes('نار') || allText.includes('القدر') || allText.includes('المقلاة');

        // Build simple ingredients list
        const ingredientsList = (currentRecipe.quantities || currentRecipe.ingredients).map(ing => {
            return `<div style="padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">• ${ing}</div>`;
        }).join('');

        // Build simple steps list
        const stepsList = currentRecipe.steps.map((step, i) => {
            return `<div style="padding: 8px 0; display: flex; gap: 10px;">
                <span style="color: #fbbf24; font-weight: bold;">${i + 1}.</span>
                <span>${step}</span>
            </div>`;
        }).join('');

        // SVG Snowflake Logo
        const snowflakeSVG = `<svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="url(#grad1)" stroke="#fbbf24" stroke-width="3"/>
            <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M78 22 L22 78" stroke="white" stroke-width="4" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="8" fill="white"/>
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6"/>
                    <stop offset="100%" style="stop-color:#1e40af"/>
                </linearGradient>
            </defs>
        </svg>`;

        // Get ingredients with auto-added salt if missing
        let ingredientList = currentRecipe.quantities || currentRecipe.ingredients;
        const ingredientsText = ingredientList.join(' ');

        // Determine appropriate salt amount based on recipe size
        const getSaltAmount = () => {
            if (ingredientsText.includes('دجاجة كاملة') || ingredientsText.includes('كيلو') || ingredientsText.includes('3 كوب') || currentRecipe.name.includes('مندي') || currentRecipe.name.includes('كبسة') || currentRecipe.name.includes('برياني')) {
                return '1 ملعقة كبيرة ملح (حسب الذوق)';
            }
            if (ingredientsText.includes('نصف دجاجة') || ingredientsText.includes('500 جرام') || ingredientsText.includes('1 كوب أرز')) {
                return '1 ملعقة صغيرة ملح (حسب الذوق)';
            }
            return '1/2 ملعقة صغيرة ملح (حسب الذوق)';
        };

        // Check if salt with measurement exists
        const hasSaltWithMeasurement = ingredientList.some(ing =>
            (ing.includes('ملح') && (ing.includes('ملعقة') || ing.includes('رشة') || ing.includes('1/') || ing.includes('نصف')))
        );

        // Add default salt if not specified
        if (!hasSaltWithMeasurement) {
            const hasSaltGeneric = ingredientList.some(ing => ing.includes('ملح'));
            if (hasSaltGeneric) {
                // Replace generic salt with specific measurement
                ingredientList = ingredientList.map(ing => {
                    if (ing === 'ملح' || ing === 'ملح للتذوق') {
                        return getSaltAmount();
                    }
                    return ing;
                });
            } else if (currentRecipe.type !== 'dessert' && currentRecipe.type !== 'drink') {
                // Add salt for savory dishes that don't mention it
                ingredientList = [...ingredientList, getSaltAmount()];
            }
        }

        // Highlight salt and spices in ingredients
        const highlightIngredient = (ing) => {
            if (ing.includes('ملح') || ing.includes('بهارات') || ing.includes('فلفل') || ing.includes('كركم') || ing.includes('كمون')) {
                return `<tr style="background: rgba(251,191,36,0.1);"><td style="padding: 6px; color: #fbbf24;">🧂</td><td style="padding: 6px;">${ing}</td></tr>`;
            }
            return `<tr><td style="padding: 6px; color: #64748b;">▪</td><td style="padding: 6px;">${ing}</td></tr>`;
        };

        exportContainer.innerHTML = `
            <!-- Header like website -->
            <div style="background: #0f172a; margin: -20px -20px 15px -20px; padding: 15px 20px; border-bottom: 3px solid #fbbf24;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5em;">❄️</span>
                    <span style="color: #fbbf24; font-weight: bold; font-size: 1.3em;">ثلاجتك</span>
                </div>
            </div>

            <!-- Recipe Name Card -->
            <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #0f172a; padding: 12px 15px; border-radius: 10px; margin-bottom: 12px; text-align: center;">
                <div style="font-size: 1.2em; font-weight: bold;">${currentRecipe.name}</div>
            </div>

            <!-- Stats Grid -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px;">
                <div style="background: #1e293b; padding: 8px; border-radius: 8px; text-align: center; border: 1px solid #334155;">
                    <div style="font-size: 1.2em;">🔥</div>
                    <div style="font-size: 0.75em; color: #94a3b8;">سعرات</div>
                    <div style="font-weight: bold; color: #fbbf24;">${currentRecipe.calories}</div>
                </div>
                <div style="background: #1e293b; padding: 8px; border-radius: 8px; text-align: center; border: 1px solid #334155;">
                    <div style="font-size: 1.2em;">💪</div>
                    <div style="font-size: 0.75em; color: #94a3b8;">بروتين</div>
                    <div style="font-weight: bold; color: #22c55e;">${currentRecipe.protein}</div>
                </div>
                <div style="background: #1e293b; padding: 8px; border-radius: 8px; text-align: center; border: 1px solid #334155;">
                    <div style="font-size: 1.2em;">⏱</div>
                    <div style="font-size: 0.75em; color: #94a3b8;">المدة</div>
                    <div style="font-weight: bold; color: #60a5fa;">${cookingTime}</div>
                </div>
            </div>

            <!-- Ingredients Table -->
            <div style="margin-bottom: 12px;">
                <div style="color: #fbbf24; font-weight: bold; font-size: 0.9em; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                    <span style="background: #fbbf24; color: #0f172a; padding: 2px 6px; border-radius: 4px; font-size: 0.8em;">📋</span>
                    المكونات والمقادير
                </div>
                <table style="width: 100%; font-size: 0.8em; border-collapse: collapse; background: #1e293b; border-radius: 8px; overflow: hidden;">
                    ${ingredientList.map(ing => highlightIngredient(ing)).join('')}
                </table>
            </div>

            <!-- Steps List -->
            <div style="margin-bottom: 12px;">
                <div style="color: #fbbf24; font-weight: bold; font-size: 0.9em; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                    <span style="background: #fbbf24; color: #0f172a; padding: 2px 6px; border-radius: 4px; font-size: 0.8em;">👨‍🍳</span>
                    طريقة التحضير
                </div>
                <div style="background: #1e293b; border-radius: 8px; padding: 10px; font-size: 0.8em; line-height: 1.7;">
                    ${currentRecipe.steps.map((step, i) => `<div style="padding: 5px 0; border-bottom: 1px solid #334155;"><span style="display: inline-block; background: #fbbf24; color: #0f172a; width: 20px; height: 20px; border-radius: 50%; text-align: center; line-height: 20px; font-size: 0.75em; font-weight: bold; margin-left: 8px;">${i + 1}</span>${step}</div>`).join('')}
                </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; font-size: 0.7em; color: #64748b; padding-top: 8px; border-top: 1px dashed #334155;">
                تم الإنشاء بواسطة <span style="color: #fbbf24;">ثلاجتك</span> 🌟
            </div>
        `;

        document.body.appendChild(exportContainer);

        updateStatus('جاري التقاط الصورة...');

        const exportingRecipeId = currentRecipe.id;

        const canvas = await html2canvas(exportContainer, {
            backgroundColor: '#0f172a',
            scale: 2,
            useCORS: true,
            logging: false
        });

        document.body.removeChild(exportContainer);

        if (!currentRecipe || currentRecipe.id !== exportingRecipeId) {
            console.log('Export cancelled: User changed recipe');
            return;
        }

        updateStatus('تحضير الملف...');

        const imageData = canvas.toDataURL("image/png", 1.0);

        updateStatus('جاري التحميل...');

        const link = document.createElement('a');
        link.href = imageData;
        let cleanName = currentRecipe.name.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_');
        if (!cleanName || cleanName.trim().length === 0) cleanName = `Recipe_${currentRecipe.id}`;
        link.download = `Thallaja_${cleanName}.png`;

        document.body.appendChild(link);
        try {
            link.click();
        } catch (e) { console.warn('Auto-download failed', e); }
        document.body.removeChild(link);

        updateStatus('✅ تم التحميل');
        setTimeout(() => {
            if (btn) btn.innerText = originalBtnText;
        }, 2000);

    } catch (err) {
        console.error('Export failed:', err);
        alert(`عذراً، حدث خطأ: ${err.message || err}`);
        if (btn) btn.innerText = '❌ فشل التحميل';
        setTimeout(() => {
            if (btn) btn.innerText = originalBtnText;
        }, 3000);
    }
};

window.shareRecipe = async function () {
    if (!currentRecipe) return;

    const shareData = {
        title: `وصفة ${currentRecipe.name} من تطبيق ثلاجتك 🥘`,
        text: `جربت هالوصفة الرهيبة (${currentRecipe.name}) في تطبيق ثلاجتك! 
        
🔥 السعرات: ${currentRecipe.calories}
💪 البروتين: ${currentRecipe.protein}
        
حمل التطبيق وجربها الآن!`,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback for desktop/unsupported browsers
            navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}`);
            alert('تم نسخ تفاصيل الوصفة! يمكنك لصقها وإرسالها لأصدقائك 📋');
        }
    } catch (err) {
        console.error('Share failed:', err);
    }
};

// ==========================================
// === NEW FEATURES - Phase 1 ===
// ==========================================

// --- Recipe of the Day ---
function getRecipeOfTheDay() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % recipes.length;
    return recipes[index];
}

function initRecipeOfTheDay() {
    const recipe = getRecipeOfTheDay();
    const iconEl = document.getElementById('rotdIcon');
    const nameEl = document.getElementById('rotdName');
    const infoEl = document.getElementById('rotdInfo');

    if (!iconEl || !nameEl || !infoEl) return;

    let icon = '🍽️';
    if (recipe.type === 'dessert') icon = '🍰';
    else if (recipe.type === 'drink') icon = '🥤';
    else if (recipe.type === 'pastry') icon = '🥐';
    else if (recipe.type === 'sauce') icon = '🥣';

    iconEl.textContent = icon;
    nameEl.textContent = recipe.name;
    infoEl.textContent = `🔥 ${recipe.calories} سعرة | 💪 ${recipe.protein}`;
}

window.showRecipeOfTheDay = function () {
    const recipe = getRecipeOfTheDay();
    openRecipeModal(recipe);
};

// --- YouTube Search ---
window.searchYouTube = function () {
    if (!currentRecipe) return;
    const query = encodeURIComponent(`طريقة ${currentRecipe.name}`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
};

// --- WhatsApp Share ---
window.shareToWhatsApp = function () {
    if (!currentRecipe) return;
    const text = encodeURIComponent(
        `🍽️ وصفة ${currentRecipe.name}\n\n` +
        `🔥 السعرات: ${currentRecipe.calories}\n` +
        `💪 البروتين: ${currentRecipe.protein}\n\n` +
        `المكونات:\n${currentRecipe.ingredients.join('، ')}\n\n` +
        `جربها في تطبيق ثلاجتك! 📱`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
};

// --- Twitter Share ---
window.shareToTwitter = function () {
    if (!currentRecipe) return;
    const text = encodeURIComponent(
        `🍽️ جربت وصفة ${currentRecipe.name} من تطبيق ثلاجتك!\n` +
        `🔥 ${currentRecipe.calories} سعرة\n` +
        `#وصفات #طبخ #ثلاجتك`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
};

// --- Cooking Mode ---
let cookingModeActive = false;
let currentStepIndex = 0;
let cookingTimerSeconds = 0;
let cookingTimerInterval = null;

window.enterCookingMode = function () {
    if (!currentRecipe) return;

    cookingModeActive = true;
    currentStepIndex = 0;
    cookingTimerSeconds = 0;

    // Close the recipe modal
    const recipeModal = document.getElementById('recipeModal');
    if (recipeModal) {
        recipeModal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    const modal = document.createElement('div');
    modal.id = 'cooking-mode-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #1a1a2e;
        z-index: 3000; display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        padding: 30px; color: white; text-align: center;
        font-family: 'Almarai', sans-serif;
    `;

    modal.innerHTML = `
        <!-- Header with Timer -->
        <div style="position:absolute; top:20px; left:20px; right:20px; display:flex; justify-content:space-between; align-items:center;">
            <button onclick="exitCookingMode()" style="background:rgba(239,68,68,0.15); border:none; color:#ef4444; padding:10px 20px; border-radius:20px; cursor:pointer; font-weight:bold;">
                ✕ خروج
            </button>
            
            <!-- Timer Widget -->
            <div style="display:flex; align-items:center; gap:8px; background:rgba(251,191,36,0.15); padding:8px 15px; border-radius:20px;">
                <button onclick="adjustTimer(-60)" style="background:none; border:none; color:#fbbf24; font-size:1.2em; cursor:pointer; padding:5px;">−</button>
                <span id="cm-timer" style="color:#fbbf24; font-weight:bold; font-size:1.1em; min-width:50px;">00:00</span>
                <button onclick="adjustTimer(60)" style="background:none; border:none; color:#fbbf24; font-size:1.2em; cursor:pointer; padding:5px;">+</button>
                <div style="width:1px; height:20px; background:rgba(255,255,255,0.1); margin:0 5px;"></div>
                <button onclick="adjustTimer(600)" style="background:rgba(251,191,36,0.2); border:none; color:#fbbf24; font-size:0.8em; cursor:pointer; padding:4px 8px; border-radius:8px;">+10د</button>
                <button onclick="adjustTimer(1800)" style="background:rgba(251,191,36,0.2); border:none; color:#fbbf24; font-size:0.8em; cursor:pointer; padding:4px 8px; border-radius:8px;">+30د</button>
                <button onclick="toggleTimer()" id="cm-timer-btn" style="background:#fbbf24; border:none; color:#1a1a2e; padding:5px 12px; border-radius:15px; cursor:pointer; font-weight:bold; font-size:0.85em; margin-right:5px;">▶</button>
            </div>
        </div>
        
        <h2 style="color:#fbbf24; margin-bottom:10px; font-size:1.5em;">${currentRecipe.name}</h2>
        
        <div style="margin-bottom:25px; opacity:0.6;">
            الخطوة <span id="cm-step-num" style="color:#fbbf24; font-weight:bold;">1</span> / ${currentRecipe.steps.length}
        </div>
        
        <div id="cm-step-text" style="font-size:1.5em; line-height:1.9; max-width:700px; padding:20px; min-height:100px;">
            ${currentRecipe.steps[0]}
        </div>
        
        <div style="display:flex; gap:20px; margin-top:35px;">
            <button onclick="prevStep()" id="cm-prev" style="padding:16px 30px; border-radius:25px; border:2px solid #475569; background:transparent; color:#94a3b8; font-size:1.1em; cursor:pointer;">
                ◀ السابق
            </button>
            <button onclick="nextStep()" id="cm-next" style="padding:16px 40px; border-radius:25px; border:none; background:#fbbf24; color:#1a1a2e; font-size:1.1em; cursor:pointer; font-weight:bold;">
                التالي ▶
            </button>
        </div>
    `;

    document.body.appendChild(modal);
    updateCookingModeUI();
};

window.exitCookingMode = function () {
    cookingModeActive = false;
    const modal = document.getElementById('cooking-mode-modal');
    if (modal) modal.remove();
    if (window.timerInterval) clearInterval(window.timerInterval);
};

window.nextStep = function () {
    if (currentStepIndex < currentRecipe.steps.length - 1) {
        currentStepIndex++;
        updateCookingModeUI();
    }
};

window.prevStep = function () {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        updateCookingModeUI();
    }
};

function updateCookingModeUI() {
    const stepText = document.getElementById('cm-step-text');
    const stepNum = document.getElementById('cm-step-num');
    const prevBtn = document.getElementById('cm-prev');
    const nextBtn = document.getElementById('cm-next');
    const progress = document.getElementById('cm-progress');

    if (stepText) stepText.textContent = currentRecipe.steps[currentStepIndex];
    if (stepNum) stepNum.textContent = currentStepIndex + 1;
    if (prevBtn) prevBtn.style.opacity = currentStepIndex === 0 ? '0.3' : '1';
    if (nextBtn) {
        if (currentStepIndex === currentRecipe.steps.length - 1) {
            nextBtn.textContent = '✅ خلصت!';
            nextBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else {
            nextBtn.textContent = 'التالي ▶';
            nextBtn.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
        }
    }
    // Update progress bar
    if (progress) {
        const progressPercent = ((currentStepIndex + 1) / currentRecipe.steps.length) * 100;
        progress.style.width = progressPercent + '%';
    }
}

// --- Cooking Timer Functions ---
window.adjustTimer = function (seconds) {
    cookingTimerSeconds = Math.max(0, cookingTimerSeconds + seconds);
    updateTimerDisplay();
};

window.toggleTimer = function () {
    const btn = document.getElementById('cm-timer-btn');

    if (cookingTimerInterval) {
        // Pause
        clearInterval(cookingTimerInterval);
        cookingTimerInterval = null;
        if (btn) btn.textContent = '▶';
    } else {
        // Start
        if (cookingTimerSeconds <= 0) cookingTimerSeconds = 60; // Default 1 min if 0

        cookingTimerInterval = setInterval(() => {
            if (cookingTimerSeconds <= 0) {
                clearInterval(cookingTimerInterval);
                cookingTimerInterval = null;
                const timerEl = document.getElementById('cm-timer');
                if (timerEl) timerEl.textContent = '⏰';
                if (btn) btn.textContent = '▶';
                if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
                return;
            }
            cookingTimerSeconds--;
            updateTimerDisplay();
        }, 1000);

        if (btn) btn.textContent = '⏸';
    }
};

function updateTimerDisplay() {
    const mins = Math.floor(cookingTimerSeconds / 60);
    const secs = cookingTimerSeconds % 60;
    const timerEl = document.getElementById('cm-timer');
    if (timerEl) {
        timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

// --- Share Recipe as PDF ---
window.shareRecipeAsPDF = async function () {
    if (!currentRecipe) return;

    const btn = document.querySelector('[onclick="shareRecipeAsPDF()"]');
    if (btn) btn.textContent = '⏳ جاري...';

    try {
        await exportRecipeImage(btn);
    } catch (e) {
        console.error(e);
        if (btn) btn.textContent = '📤 مشاركة';
    }
};

// --- Initialize on page load ---
document.addEventListener('DOMContentLoaded', () => {
    // No recipe of the day initialization needed
});

// --- Enhanced Shopping List with Selection & Prices ---
// --- PRICE DATABASE (Realistic Market Prices in SAR) ---
const PRICE_DB = {
    // Proteins
    'دجاج': { unit: 'دجاجة كاملة (1000جم)', price: 19.5, keywords: ['دجاج', 'دجاجة'] },
    'صدور دجاج': { unit: 'طبق 450جم', price: 22, keywords: ['صدور', 'فليه'] },
    'لحم': { unit: 'كيلو نعيمي', price: 65, keywords: ['لحم', 'خروف', 'غنم'] },
    'لحم مفروم': { unit: 'طبق 400جم', price: 18, keywords: ['مفروم'] },
    'سمك': { unit: 'كيلو فيليه', price: 35, keywords: ['سمك', 'فيليه'] },
    'تونا': { unit: 'علبة 185جم', price: 6.5, keywords: ['تونا', 'تونة'] },
    'بيض': { unit: 'طبق 30 بيضة', price: 21, keywords: ['بيض'] },

    // Dairy
    'حليب': { unit: 'جالون 2 لتر', price: 12, keywords: ['حليب'] },
    'زبدة': { unit: 'قالب 100جم', price: 5.5, keywords: ['زبدة'] },
    'جبن': { unit: 'علبة 500جم', price: 15, keywords: ['جبن', 'جبنة'] },
    'قشطة': { unit: 'علبة معدنية', price: 4, keywords: ['قشطة'] },
    'كريمة': { unit: 'علبة 500مل', price: 16, keywords: ['كريمة'] },
    'زبادي': { unit: 'علبة 170جم', price: 2, keywords: ['زبادي', 'روب'] },

    // Grains & Baking
    'أرز': { unit: 'كيس 5 كيلو', price: 38, keywords: ['أرز', 'رز', 'بشاور', 'مصري'] },
    'مكرونة': { unit: 'كيس 500جم', price: 5, keywords: ['مكرونة', 'سباجيتي', 'باستا'] },
    'دقيق': { unit: 'كيس 1 كيلو', price: 4.5, keywords: ['دقيق', 'طحين'] },
    'سكر': { unit: 'كيس 2 كيلو', price: 11, keywords: ['سكر'] },
    'ملح': { unit: 'علبة 700جم', price: 3.5, keywords: ['ملح'] },
    'خميرة': { unit: 'علبة 100جم', price: 6, keywords: ['خميرة'] },
    'بيكنج بودر': { unit: 'علبة 100جم', price: 5, keywords: ['بيكنج'] },
    'نشا': { unit: 'علبة 100جم', price: 4, keywords: ['نشا'] },

    // Oils & Sauces
    'زيت': { unit: 'زجاجة 1.5 لتر', price: 17, keywords: ['زيت'] },
    'زيت زيتون': { unit: 'زجاجة 250مل', price: 22, keywords: ['زيت زيتون'] },
    'صلصة طماطم': { unit: 'عبوة 8 علب', price: 10, keywords: ['صلصة', 'معجون طماطم'] },
    'طحينة': { unit: 'علبة 250جم', price: 14, keywords: ['طحينة'] },
    'مايونيز': { unit: 'علبة 300مل', price: 11, keywords: ['مايونيز'] },
    'كاتشب': { unit: 'علبة ضاغطة', price: 9, keywords: ['كاتشب'] },
    'عسل': { unit: 'برطمان 500جم', price: 45, keywords: ['عسل'] },

    // Vegetables & Fruits
    'طماطم': { unit: '1 كيلو', price: 6, keywords: ['طماطم'] },
    'بصل': { unit: 'كيس 2 كيلو', price: 8, keywords: ['بصل'] },
    'بطاطس': { unit: 'كيس 3 كيلو', price: 12, keywords: ['بطاطس'] },
    'ثوم': { unit: 'كيس شبك', price: 5, keywords: ['ثوم'] },
    'ليمون': { unit: '1 كيلو', price: 8, keywords: ['ليمون'] },
    'خيار': { unit: '1 كيلو', price: 7, keywords: ['خيار'] },
    'جزر': { unit: '1 كيلو', price: 6, keywords: ['جزر'] },
    'فلفل بارد': { unit: '1 كيلو', price: 9, keywords: ['فلفل رومي', 'فلفل بارد'] },
    'خس': { unit: 'حبة', price: 5, keywords: ['خس'] },
    'بقدونس': { unit: 'ربطة', price: 1.5, keywords: ['بقدونس', 'كزبرة', 'شبت', 'نعناع'] },

    // Spices
    'بهارات': { unit: 'علبة بهارات مشكلة', price: 15, keywords: ['بهارات', 'مشكلة'] },
    'فلفل أسود': { unit: 'علبة مطحون', price: 12, keywords: ['فلفل أسود'] },
    'كمون': { unit: 'علبة', price: 10, keywords: ['كمون'] },
    'هيل': { unit: 'علبة صغيرة', price: 25, keywords: ['هيل'] },
    'قرفة': { unit: 'علبة عيدان', price: 12, keywords: ['قرفة', 'دارسين'] },
    'كركم': { unit: 'علبة', price: 10, keywords: ['كركم'] },
};

function estimatePrice(ingredientLine) {
    const text = ingredientLine.toLowerCase();

    // Default fallback
    let match = { name: ingredientLine, unit: 'عبوة توفير', price: 15, isEstimate: true };

    // Find best match in DB
    for (const [key, data] of Object.entries(PRICE_DB)) {
        if (data.keywords.some(k => text.includes(k))) {
            return {
                name: key,
                unit: data.unit,
                price: data.price,
                original: ingredientLine,
                isEstimate: false
            };
        }
    }

    return match;
}

// --- Enhanced Shopping List with Selection & Prices ---
window.addToShoppingList = function (input) {
    let ingredients = [];

    // Handle input: allow recipe object or ingredients array/set
    if (input && input.ingredients) {
        // It's a recipe object
        ingredients = input.quantities && input.quantities.length > 0
            ? input.quantities // Use quantities if available (e.g. "2 cups rice")
            : input.ingredients;
    } else if (Array.isArray(input)) {
        ingredients = input;
    } else if (input instanceof Set) {
        ingredients = Array.from(input);
    }

    if (!ingredients || ingredients.length === 0) return;

    // Create Modal for Selection
    const modal = document.createElement('div');
    modal.id = 'shopping-selection-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: transparent; z-index: 4000;
        display: flex; align-items: center; justify-content: center;
    `;

    // Process ingredients against price DB
    let processedItems = ingredients.map(ing => estimatePrice(ing));

    // Create HTML
    let itemsHtml = '';
    let totalEst = 0;

    processedItems.forEach((item, i) => {
        totalEst += item.price;
        const color = item.isEstimate ? '#94a3b8' : '#d97706';
        const displayUnit = item.isEstimate ? 'سعر تقديري' : item.unit;

        itemsHtml += `
            <div style="background:rgba(255,255,255,0.05); padding:12px; border-radius:12px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; border:1px solid rgba(255,255,255,0.1);">
                <label style="display:flex; align-items:center; gap:12px; cursor:pointer; flex:1; max-width:65%;">
                    <input type="checkbox" value="${item.original || item.name}" data-price="${item.price}" checked 
                        onchange="updateShoppingTotal()" 
                        style="width:20px; height:20px; accent-color:#10b981; cursor:pointer; flex-shrink:0;">
                    <div style="display:flex; flex-direction:column;">
                        <span style="font-size:1em; color:#f1f5f9; font-weight:bold;">${item.name}</span>
                        <span style="font-size:0.8em; color:#94a3b8;">${item.original || ''}</span>
                    </div>
                </label>
                <div style="text-align:left; min-width:100px;">
                    <span style="display:block; font-weight:bold; color:${item.isEstimate ? '#94a3b8' : '#fbbf24'}; font-size:1.1em;">${item.price} ﷼</span>
                    <span style="font-size:0.75em; color:#64748b;">${displayUnit}</span>
                </div>
            </div>
        `;
    });

    modal.innerHTML = `
        <div style="background:rgba(15, 23, 42, 0.85); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); width:90%; max-width:500px; max-height:85vh; border-radius:25px; display:flex; flex-direction:column; overflow:hidden; animation:slideInUp 0.3s; border:1px solid rgba(255,255,255,0.15); box-shadow:0 25px 50px rgba(0,0,0,0.3);">
            <div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h3 style="margin:0; color:#fbbf24;">🛒 قائمة التسوق</h3>
                    <p style="margin:5px 0 0 0; font-size:0.85em; color:#94a3b8;">الأسعار تقريبية حسب متوسط السوق</p>
                </div>
                <button onclick="document.getElementById('shopping-selection-modal').remove()" style="background:rgba(255,255,255,0.1); border:none; font-size:1.5em; cursor:pointer; color:#94a3b8; width:40px; height:40px; border-radius:50%;">&times;</button>
            </div>
            
            <div style="padding:20px; overflow-y:auto; flex:1;">
                ${itemsHtml}
            </div>
            
            <div style="padding:20px; border-top:1px solid rgba(255,255,255,0.1);">
                <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-weight:bold; font-size:1.1em;">
                    <span style="color:#f1f5f9;">المجموع التقريبي:</span>
                    <span id="shopping-total" style="color:#10b981;">${totalEst} ﷼</span>
                </div>
                <button onclick="confirmAddToShoppingList()" style="width:100%; padding:15px; background:linear-gradient(135deg, #10b981 0%, #059669 100%); color:white; border:none; border-radius:15px; font-size:1.1em; font-weight:bold; cursor:pointer; box-shadow:0 4px 12px rgba(16, 185, 129, 0.3);">
                    ✅ أضف للمشتريات
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add Helper Functions globally
    window.updateShoppingTotal = function () {
        let total = 0;
        const checkboxes = modal.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(cb => {
            total += parseFloat(cb.dataset.price);
        });
        document.getElementById('shopping-total').textContent = `${total} ﷼`;
    };

    window.confirmAddToShoppingList = function () {
        const checkboxes = modal.querySelectorAll('input[type="checkbox"]:checked');
        const selectedIngs = Array.from(checkboxes).map(cb => {
            return {
                name: cb.value,
                price: parseFloat(cb.dataset.price),
                recipe: currentRecipe ? currentRecipe.name : 'يدوي'
            };
        });

        let existingList = JSON.parse(localStorage.getItem('thallaja_shopping_list') || '[]');
        let addedCount = 0;

        selectedIngs.forEach(newGlobalItem => {
            // Check if exact item from same recipe exists
            const exists = existingList.some(ex => ex.name === newGlobalItem.name && ex.recipe === newGlobalItem.recipe);
            if (!exists) {
                existingList.push(newGlobalItem);
                addedCount++;
            }
        });

        localStorage.setItem('thallaja_shopping_list', JSON.stringify(existingList));
        document.getElementById('shopping-selection-modal').remove();

        // Optional: Trigger quick animation or feedback
        alert(addedCount > 0 ? `✅ تمت إضافة ${addedCount} مكونات للقائمة!` : '⚠️ المكونات موجودة مسبقاً في القائمة.');
    };
};


// --- Shopping List Viewer ---

// --- Shopping List Viewer (GROUPED BY RECIPE) ---
window.viewShoppingList = function () {
    const savedRaw = JSON.parse(localStorage.getItem('thallaja_shopping_list') || '[]');

    // Normalize and Group
    const grouped = {};
    let totalEst = 0;

    savedRaw.forEach((item, index) => {
        // Handle legacy string items
        const name = typeof item === 'string' ? item : item.name;
        const price = typeof item === 'string' ? 0 : (item.price || 0);
        const recipe = (typeof item === 'string' || !item.recipe) ? 'إضافات يدوية' : item.recipe;

        if (!grouped[recipe]) grouped[recipe] = [];
        grouped[recipe].push({
            originalIndex: index,
            name,
            price
        });

        totalEst += price;
    });

    // Create Modal
    const modal = document.createElement('div');
    modal.id = 'shopping-list-display-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); z-index: 5000;
        display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(5px);
    `;

    // Build List Content
    let listContent = '';
    const recipeNames = Object.keys(grouped);

    if (recipeNames.length === 0) {
        listContent = `<div style="text-align:center; padding:50px; color:#94a3b8;">
            <div style="font-size:3em; margin-bottom:10px;">📝</div>
            <p style="color:#64748b;">سلتك فارغة حالياً</p>
        </div>`;
    } else {
        recipeNames.forEach(recipeName => {
            const items = grouped[recipeName];

            // Recipe Header
            listContent += `
                <div style="margin-bottom:20px; animation:fadeIn 0.3s;">
                    <div style="background:rgba(251,191,36,0.15); padding:10px 15px; border-right:4px solid #fbbf24; border-radius:4px 0 0 4px; margin-bottom:10px; text-align:right;">
                        <h4 style="margin:0; color:#fbbf24; font-size:1.1em; font-weight:bold;">${recipeName}</h4>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:8px;">
            `;

            // Items
            items.forEach(item => {
                listContent += `
                    <div style="background:rgba(255,255,255,0.05); padding:12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; border:1px solid rgba(255,255,255,0.1);">
                        
                        <!-- Left Side: Price & Delete -->
                        <div style="display:flex; align-items:center; gap:12px;">
                            <button onclick="removeFromShoppingList('${item.originalIndex}')" style="background:rgba(239,68,68,0.2); color:#ef4444; border:none; width:32px; height:32px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:1.1em; transition:all 0.2s;">
                                <span style="font-weight:bold;">×</span> 
                            </button>
                            ${item.price > 0 ? `<span style="color:#fbbf24; font-weight:bold; font-size:0.95em; dir:ltr;">${item.price} ريال</span>` : ''}
                        </div>

                        <!-- Right Side: Checkbox & Name -->
                        <div style="display:flex; align-items:center; gap:12px; flex:1; justify-content:flex-end;">
                            <span style="color:#f1f5f9; font-size:1em; text-align:right;">${item.name}</span>
                            <input type="checkbox" checked style="width:20px; height:20px; accent-color:#fbbf24; cursor:pointer; border-radius:4px;">
                        </div>

                    </div>
                `;
            });

            listContent += `</div></div>`;
        });
    }

    modal.innerHTML = `
        <div style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%); width:95%; max-width:480px; max-height:90vh; border-radius:30px; display:flex; flex-direction:column; overflow:hidden; animation:slideInUp 0.3s; font-family: 'Almarai', sans-serif; box-shadow:0 20px 50px rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.1);">
            
            <!-- Header -->
            <div style="padding:20px; background:rgba(0,0,0,0.2); border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;">
                <button onclick="document.getElementById('shopping-list-display-modal').remove()" style="background:rgba(255,255,255,0.1); border:none; width:40px; height:40px; border-radius:50%; font-size:1.2em; cursor:pointer; color:#94a3b8; display:flex; align-items:center; justify-content:center;">&times;</button>
                <h3 style="margin:0; color:#fbbf24; font-size:1.3em;">🛒 مشترياتي</h3>
                <div style="width:40px;"></div> <!-- Spacer -->
            </div>
            
            <!-- List Body -->
            <div style="padding:20px; overflow-y:auto; flex:1;" id="shopping-list-container">
                ${listContent}
            </div>
            
            <!-- Footer -->
            <div style="padding:25px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.1);">
                <div style="display:flex; justify-content:space-between; margin-bottom:20px; align-items:center;">
                    <span style="color:#10b981; font-weight:bold; font-size:1.4em; dir:ltr;">${totalEst} ريال</span>
                    <span style="color:#f1f5f9; font-weight:bold; font-size:1.1em;">الإجمالي التقديري:</span>
                </div>
                <button onclick="clearShoppingList()" style="width:100%; padding:15px; background:linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color:white; border:none; border-radius:15px; font-size:1.1em; font-weight:bold; cursor:pointer; box-shadow:0 4px 15px rgba(239, 68, 68, 0.3);">
                    🗑️ مسح الكل
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    window.removeFromShoppingList = function (index) {
        savedRaw.splice(index, 1);
        localStorage.setItem('thallaja_shopping_list', JSON.stringify(savedRaw));
        document.getElementById('shopping-list-display-modal').remove();
        viewShoppingList();
    };

    window.clearShoppingList = function () {
        if (confirm('هل أنت متأكد من مسح كل القائمة؟')) {
            localStorage.removeItem('thallaja_shopping_list');
            document.getElementById('shopping-list-display-modal').remove();
            viewShoppingList();
        }
    };
};
