// Модуль основных Блоков с контентом. Определение. Отслеживание. Поведение
import ContentBlockS from './ContentBlockS.js';

// Модуль управления жестами
import TouchAction from './TouchAction.js';

// Модуль Анимации
import Animation from './Animation.js';

// Модуль отображения страницы, отслеживания её изменений и устройств
import ViewScreen from './ViewScreen.js';






//! ---------------------------------------------------------------- Установка параметров

const settings = {
	// Параметры для взаимодействия с экраном пользователя в соответствии с _variable.scss)
	pcWidth: 1310,					// breakpoint, когда контейнер занимает всю ширину экрана
	laptopWidth: 1024,			// breakpoint, когда открытый Блок занимает всё свободное пространство экрана
	proportion: 5 / 2,			// breakpoint, когда отображение контента перестраивается под горизонтальную ориентацию
	breakHeight: 640,				// breakpoint, когда
	slimScreenTag: 320,			// breakpoint, когда размер Бирок уменьшается, чтобы освободить пространство экрана
	slimScreenTag: 320,			// breakpoint, когда размер Бирок уменьшается, чтобы освободить пространство экрана
	screenOff: 200,				// breakpoint, когда полноценное отображение контента невозможно (лёгкая версия)

	// Параметры скорости и задержки анимации
	intervals: 8,					// скорость проигрывания основной анимации
	delay: 8							// задержка при старте проигрывания основной анимации
}





//! ---------------------------------------------------------------- Создание объектов

const contentBlockS = new ContentBlockS();
const touchAction = new TouchAction(contentBlockS);

// Параметры (intervals, delay, ...)
const animation = new Animation(settings, contentBlockS);

// Параметры (pcWidth, laptopWidth, proportion, breakHeight, slimScreenTag, screenOff, ...)
const viewScreen = new ViewScreen(settings, contentBlockS, animation);


//! ---------------------------------------------------------------- Вызовы

// Включение полной версии как только, так сразу
// Параметры (speed, delay): скорость переключения заставки и контента (значение в ms), 
// задержка отображения кнопки перехода на лёгкую версию (значение в ms)
viewScreen.fullVersionOn(500, 3000);

console.log(viewScreen);
console.log(contentBlockS);