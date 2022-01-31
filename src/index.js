// Модуль основных Блоков с контентом. Определение. Отслеживание. Поведение
import ContentBlockS from './js/ContentBlockS.js';

// Модуль управления. Поведение
import Action from './js/Action.js';

// Модуль управления жестами
import TouchAction from './js/TouchAction.js';

// Модуль Анимации
import Animation from './js/Animation.js';

// Модуль отображения страницы, отслеживания её изменений и устройств
import ViewScreen from './js/ViewScreen.js';

//! ---------------------------------------------------------------- Установка параметров
const settings = {
	// Параметры для взаимодействия с экраном пользователя в соответствии с _variable.scss)
	pcWidth: 1310,					// breakpoint, когда контейнер занимает всю ширину экрана
	laptopWidth: 1024,			// breakpoint, когда открытый Блок занимает всё свободное пространство экрана
	offWidth: 200,					// breakpoint, когда полноценное отображение контента невозможно (лёгкая версия)
	proportion: 5 / 2,			// breakpoint, когда отображение контента перестраивается под горизонтальную ориентацию
	breakHeight: 640,				// breakpoint, когда
	slimScreenTag: 320,			// breakpoint, когда размер Бирок уменьшается, чтобы освободить пространство экрана

	// Параметры скорости и задержки анимации
	intervals: 8,					// скорость проигрывания основной анимации
	delay: 8,						// задержка при старте проигрывания основной анимации

	userToLight: false			// Флаг переключения на лёгкую версию сайта
}

//! ---------------------------------------------------------------- Создание объектов
const contentBlockS = new ContentBlockS();

// Параметры (intervals, delay, ...)
const animation = new Animation(settings, contentBlockS);

// Параметры (pcWidth, laptopWidth, offWidth , proportion, breakHeight, slimScreenTag, userToLight, ...)
const viewScreen = new ViewScreen(settings, contentBlockS, animation);

const action = new Action(contentBlockS, animation);
const touchAction = new TouchAction(contentBlockS);


//! ---------------------------------------------------------------- Вызовы
// (viewScreen.onload) - Пока грузится страница определяются стартовые параметры отображения.
// 	Главное на этапе загрузки определить: пользователь ждёт или переходит на лёгкую версию
// 	В случае перехода необходимо заблокировать активацию полноценной работы сайта (userToLight: true)
// 	Параметр (delay) - задержка отображения кнопки перехода на лёгкую версию (значение в ms)
viewScreen.onload(2000);

// (window.onload) - Отслеживание окончания загрузки страницы
// (readyFullVersion): 
//		- в случае, если пользователь дождался загрузки, не нажав на кнопку Лёгкой версии
// 	(userToLight: false), происходит активация полноценной работы сайта и readyFullVersion принимает true
// 	- в случае, если пользователь нажал на кнопку Лёгкой версии (userToLight: true), происходит блокировка 
// 	активации полной версии и readyFullVersion принимает false, дабы не активировать прослушивание событий.
// (viewScreen.fullVersionOn) - включение полной версии сайта. 
//		Параметр (speed) - скорость анимации появления бирок (значение в ms)
// (action.startListened) - активация прослушивания событий
window.onload = () => {
	let readyFullVersion = viewScreen.fullVersionOn(500);
	if (readyFullVersion) action.startListened();
};



// console.log(viewScreen);
// console.log(contentBlockS);