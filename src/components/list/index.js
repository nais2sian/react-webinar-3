import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ items, onAction, isInCart }) {
  return (
    <div className="list">
      {items.map(item => (
        <Item
          key={item.code}
          item={item}
          onAction={onAction}
          isInCart={isInCart}
        />
      ))}
    </div>
  );
}
// function List({ list, onAddItem }) {
//   return (
//     <div className="List">
//       {list.map(item => (
//         <Item key={item.code} item={item} onAdd={onAddItem} isInCart={false} />
//       ))}
//     </div>
//   );
// }

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onAddItem: PropTypes.func,
};

List.defaultProps = {
  onAdd: () => {},
};

export default React.memo(List);
