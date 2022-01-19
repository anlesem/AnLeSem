// Модуль данных
import Screen from './Screen.js';

// Модуль Активных элементов
import Elements from './Elements.js';

// Модуль Анимации
import Animation from './Animation.js';












//! ---------------------------------------------------------------- Создание объектов

const blocks = new Elements();

// Параметры скорости и задержки (intervals, delay)
const animation = new Animation(8, 8, blocks);

// Параметры (следует уточнять в _variable.scss)
// (pcWidth, laptopWidth, proportion, breakHeight, slimScreenTag, screenOff, ...)
const screen = new Screen(1310, 1024, 5 / 2, 640, 320, 200, blocks, animation);
















//! ---------------------------------------------------------------- Вызовы

// Включение полной версии как только, так сразу
screen.fullVersionOn();

window.onload = () => {
	screen.onload();
};

console.log(screen);
console.log(blocks);