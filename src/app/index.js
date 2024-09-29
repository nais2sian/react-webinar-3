import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import ProductDetails from './product-details';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </Router>
  );
}

export default App;
