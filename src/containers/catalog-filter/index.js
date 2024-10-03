import React, { useCallback, useMemo, useEffect } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories || [],
  }));

  const { sort, query, category, categories } = select;

  useEffect(() => {
    if (!categories.length) {
      store.actions.catalog.loadCategories();
    }
  }, [store, categories.length]);

  const callbacks = {
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    onCategoryChange: useCallback(
      category => store.actions.catalog.setParams({ category, page: 1 }),
      [store],
    ),
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = useMemo(
    () => ({
      sort: [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      categories: [
        { value: 'all', title: 'Все' },
        ...(categories || []).map(cat => ({ value: cat.id, title: cat.title })),
      ],
    }),
    [categories],
  );

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={options.categories} value={category || 'all'} onChange={callbacks.onCategoryChange}/>
      <Select options={options.sort} value={sort} onChange={callbacks.onSort} />
      <Input value={query} onChange={callbacks.onSearch} placeholder={t('Поиск')} delay={1000} />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}
export default React.memo(CatalogFilter);
