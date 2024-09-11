import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { counter: 0, code: 1, title: 'Название элемента', selected: false },
    { counter: 0, code: 2, title: 'Некий объект', selected: false },
    { counter: 0, code: 3, title: 'Заголовок', selected: false },
    { counter: 0, code: 4, title: 'Очень длинное название элемента из семи слов', selected: false },
    { counter: 0, code: 5, title: 'Запись', selected: false },
    { counter: 0, code: 6, title: 'Шестая запись', selected: false },
    { counter: 0, code: 7, title: 'Седьмая запись', selected: false },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
