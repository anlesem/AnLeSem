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

//! ------------------------------------- Создание объектов
const data = new Data(settings);
const animation = new Animation(data);
const viewScreen = new ViewScreen(data, animation);
const action = new Action(data, animation, viewScreen);
const touchAction = new TouchAction(data, animation, action);

//! ------------------------------------- Вызов
// 	Параметр (delay) - задержка отображения кнопки перехода на лёгкую версию (значение в ms)
viewScreen.onload(2000);

//! ------------------------------------- Отслеживание окончания загрузки страницы
window.onload = () => {
  let readyFullVersion = viewScreen.fullVersionOn();
  if (readyFullVersion) {
    action.startListened();
    touchAction.startListened();
    window.addEventListener('resize', () => viewScreen.resizeScreen());
  }
};

