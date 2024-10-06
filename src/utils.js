/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCategories(categories) {
  const parentMap = new Map();
  categories.forEach(cat => {
    const parentId = cat.parent ? cat.parent._id : 'root';
    if (!parentMap.has(parentId)) {
      parentMap.set(parentId, []);
    }
    parentMap.get(parentId).push(cat);
  });

  const buildFormattedList = (parentId, level) => {
    const children = parentMap.get(parentId) || [];
    let result = [];
    children.forEach(child => {
      const prefix = Array(level).fill('- ').join('');
      result.push({
        id: child._id,
        title: `${prefix}${child.title}`,
      });
      result = result.concat(buildFormattedList(child._id, level + 1));
    });
    return result;
  };
  return buildFormattedList('root', 0);
}
