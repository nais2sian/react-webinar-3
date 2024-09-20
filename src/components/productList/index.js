import React from 'react';
import List from '../list';

function ProductList({ list, onAction  }) {
  return (
    <div>
      <List items={list} onAction={onAction} isInCart={false} />
    </div>
  );
}

export default React.memo(ProductList);
