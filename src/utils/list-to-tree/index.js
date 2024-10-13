/**
 * Преобразование списка в иерархию с учётом типов родителей, сортировкой
 * @param {Array} list
 * @param {Object} [options]
 * @param {String} [options.key='_id']
 * @param {String} [options.typeKey='_type']
 * @param {Array} [options.rootTypes=['article']]
 * @param {String} [options.childrenKey='replies']
 * @param {String} [options.sortKey='dateCreate']
 * @returns {Array}
 */
export default function listToTree(list, options = {}) {
  const {
    key = '_id',
    typeKey = '_type',
    rootTypes = ['article'],
    childrenKey = 'replies',
    sortKey = 'dateCreate',
  } = options;

  if (!Array.isArray(list)) {
    console.error('Expected an array, got:', list);
    return [];
  }
  const sortedList = [...list].sort((a, b) => new Date(a[sortKey]) - new Date(b[sortKey]));
  const map = {};
  const roots = [];
  sortedList.forEach(item => {
    map[item[key]] = { ...item, [childrenKey]: [] };
  });
  sortedList.forEach(item => {
    const parent = item.parent;
    if (parent && parent[typeKey] && !rootTypes.includes(parent[typeKey])) {
      const parentId = parent[key];
      if (map[parentId]) {
        map[parentId][childrenKey].push(map[item[key]]);
      } else {
        roots.push(map[item[key]]);
      }
    } else {
      roots.push(map[item[key]]);
    }
  });
  const sortChildren = node => {
    if (node[childrenKey] && node[childrenKey].length > 0) {
      node[childrenKey].sort((a, b) => new Date(a[sortKey]) - new Date(b[sortKey]));
      node[childrenKey].forEach(child => sortChildren(child));
    }
  };

  roots.forEach(root => sortChildren(root));

  return roots;
}
