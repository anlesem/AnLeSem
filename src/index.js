// Пользовательские настройки)
import { settings } from './js/setting';

// Модуль основных Блоков с контентом. Определение. Отслеживание. Поведение
import Data from './js/Data';

// Модуль управления. Поведение
import Action from './js/Action';

// Модуль управления жестами
import TouchAction from './js/TouchAction';

// Модуль Анимации
import Animation from './js/Animation';

// Модуль отображения страницы, отслеживания её изменений и устройств
import ViewScreen from './js/ViewScreen';

//! ---------------------------------------------------------------- Создание объектов
const data = new Data(settings);
const animation = new Animation(data);
const viewScreen = new ViewScreen(data, animation);
const action = new Action(data, animation, viewScreen);
const touchAction = new TouchAction(data, action);

//! ---------------------------------------------------------------- Вызов
// viewScreen.onload - Пока грузится страница определяются стартовые параметры отображения.
// 	Главное на этапе загрузки определить: пользователь ждёт или переходит на лёгкую версию
// 	В случае перехода необходимо заблокировать активацию полноценной работы сайта (userToLight: true)
// 	Параметр (delay) - задержка отображения кнопки перехода на лёгкую версию (значение в ms)
viewScreen.onload(2000);

//! ---------------------------------------------------------------- Отслеживание
// Отслеживание окончания загрузки страницы
// 	readyFullVersion:
//			- в случае, если пользователь дождался загрузки, не нажав на кнопку Лёгкой версии
// 		(userToLight: false), происходит активация полноценной работы сайта и readyFullVersion принимает true
// 		- в случае, если пользователь нажал на кнопку Лёгкой версии (userToLight: true), происходит блокировка
// 		активации полной версии и readyFullVersion принимает false, дабы не активировать прослушивание событий.
// 	viewScreen.fullVersionOn - включение полной версии сайта.
//		action.startListened - активация прослушивания событий
//		viewScreen.resizeScreen() - Отслеживание изменения параметров экрана
window.onload = () => {
	let readyFullVersion = viewScreen.fullVersionOn();
	if (readyFullVersion) {
		action.startListened();
		touchAction.startListened();
		window.addEventListener('resize', () => viewScreen.resizeScreen());
	}
};

