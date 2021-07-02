function fullVersion() {
	// Включение полноценной версии только в случае подходящего разрешения экрана
	if (!offScreen.matches) {
		let elemA = document.querySelectorAll('.light');
		let i = 0;
		for (let n of elemA) {
			i++;
			n.classList.add('normal');
			n.classList.remove('light');
			if (i == elemA.length) version = true;		// проверка, что все элементы обработаны	
		}
	}
	// Изменение предупредительной надписи в лёгкой версии
	let warning = document.getElementById('warning');
	warning.innerHTML = "Расширение экрана не позволяет корректно отобразить всё оформление страницы.";
}

// Флаг. Активный блок - задание актуальных параметров
function blockActiveSet(block) {
	blockActiveName = block;
	blockActive = true;
}

// Флаг. Блокирующий блок для корректного закрытия мышкой - задание актуальных параметров
function blockStopSet(block) {
	if (fullScreen.matches && block == '.left') blockStopName = '.right'; 	// Чтобы не открывался правый блок при закрытии левого из-за положения "Закрыть" над биркой
	else blockStopName = block;
}


// Поведение. Первоначальный показ при наведении
function addHoverFirst(block) {
	if (!offScreen.matches && !blockStop) {	// Блокировка наведения при лёгкой версии и при управлении мышью
		removeAll();
		addHover(block);
		blockStopSet(block);
	}
	else if (blockStopName != block) {			// Проверка соответствует ли открываемый блок закрытому накануне
		removeAll();
		addHover(block);
		blockStopSet(block);							// Установка нового значения блокирующего блока
		blockStop = false;							// Сброс блокировки до нажатия на кнопку "Закрыть"
	}
}

// Поведение. Показ при наведении на внутренние компоненты
function addHover(block) {
	document.querySelector(block).classList.add('hover');
	document.querySelector('.close-all').classList.add('hover');
	if (block != '.logo') {							// Исключение логотипа из общего стиля поведения
		blockActiveSet(block);						// Установка нового значения активного блока
		hiddenTitleTag();								// Скрытие бирок
	}
	removeAnimation();								// Отключение анимации
}

// Поведение. Закрытие всего открытого
function removeAll(n) {
	showTitleTag();																	// Включение бирок
	document.querySelector('.close-all').classList.remove('hover');
	document.querySelector('.up').classList.remove('hover');
	document.querySelector('.down').classList.remove('hover');
	document.querySelector('.left').classList.remove('hover');
	document.querySelector('.right').classList.remove('hover');
	document.querySelector('.logo').classList.remove('hover');
	logo.addEventListener('touchstart', startLogo, false);				// Восстановление "слушателя" после блокировки случайного нажатия на контактные данные
	blockActive = false;																// Сброс флага активного блока
	if (n == 'full') blockStop = false;											// Полный сброс при нажатии на footer или кнопку "Закрыть всё" (если есть такая возможность)
	setAnimation();																	// Включение анимации
}

// Поведение. Переключение отображения кнопок "Закрыть" и "Закрыть всё". Актуально при использовании мышки и на больших экранах
function closeButton(mouse) {
	if (!mouse && fullScreen.matches) {					// Для мышки и полноэкранного режима
		cls.style.visibility = 'hidden';
		closeAll.style.visibility = 'visible';
	} else {														// Для больших экранов при любом устройстве ввода
		cls.style.visibility = 'visible';
		closeAll.style.visibility = 'hidden';
	}
}

// Поведение. Только логотип - касание. Блокировка случайного нажатия на контактные данные
function startLogo(event) {
	event.preventDefault();															// Отключение действий браузера по умолчанию
	addHover('.logo');																// Дублирование эффекта наведения
	logo.removeEventListener('touchstart', startLogo, false);			// Удаление "слушателя" для восстановления действий браузера по умолчанию
}

// Управление анимацией. 
function setAnimation() {
	let intervals = 8;										// Период длительности анимации
	let delay = 5;												// Общая задержка при старте, чтобы не отвлекала и не мешала активному использованию						

	document.querySelector('.info').style.animation = 'info-opacity infinite ' + intervals + 's ' + delay + 's linear';
	document.querySelector('.info__up').style.animation = 'info-text infinite ' + intervals * 3 + 's ' + delay + 's linear';
	document.querySelector('.logo').style.animation = 'circle infinite ' + intervals + 's ' + (delay + intervals / 2) + 's linear';
	if (slimScreen.matches) {
		tag = 'slim';											// Переключение флага размера бирок
		document.querySelector('.up-tag').style.animation = 'rhythm-tag-vert-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		document.querySelector('.down-tag').style.animation = 'rhythm-tag-vert-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		document.querySelector('.left-tag').style.animation = 'rhythm-tag-horz-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		document.querySelector('.right-tag').style.animation = 'rhythm-tag-horz-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
	} else {
		tag = 'normal';										// Переключение флага размера бирок
		document.querySelector('.left-tag').style.animation = 'rhythm-tag-horz infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		document.querySelector('.right-tag').style.animation = 'rhythm-tag-horz infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		document.querySelector('.up-tag').style.animation = 'rhythm-tag-vert infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		document.querySelector('.down-tag').style.animation = 'rhythm-tag-vert infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
	}
}

function removeAnimation() {
	document.querySelector('.info').style.animation = "unset";
	document.querySelector('.info__up').style.animation = "unset";
	document.querySelector('.logo').style.animation = "unset";
	document.querySelector('.left-tag').style.animation = 'unset';
	document.querySelector('.right-tag').style.animation = 'unset';
	document.querySelector('.up-tag').style.animation = 'unset';
	document.querySelector('.down-tag').style.animation = 'unset';
}

function resetAnimation() {
	if (changeTag != tag) { 						// Проверка изменения размеров бирок при Resize
		removeAnimation();							// Перезапуск анимации
		setTimeout(() => {
			if (!blockActive) setAnimation();
		}, 3000);
		changeTag = tag;
	} else setAnimation();							// Продолжение анимации
}

// Бирки. Скрытие наименований и приглушение в полноэкранном режиме 
function hiddenTitleTag() {
	if (fullScreen.matches) {													// Проверка полноэкранного режима
		let tag = document.querySelectorAll('.tag');
		let title = document.querySelectorAll('.title-tag');
		for (let elem of tag) { elem.classList.add('hover'); }
		for (let elem of title) { elem.classList.add('hover'); }
	} 
}

// Бирки. Показ наименований и восстановление
function showTitleTag() {
	let tag = document.querySelectorAll('.tag');
	let title = document.querySelectorAll('.title-tag');
	for (let elem of tag) { elem.classList.remove('hover'); }
	for (let elem of title) { elem.classList.remove('hover'); }
}

// Прокрутка. Восстановление верхнего положения в верхнем блоке (исправление включения блоков (display none/block) при переключении между вкладками)
function scrollUp() {
	info_up.scrollTop = 0;
}

// Отслеживание. Движения
function start(event) {
	initialPoint = event.changedTouches[0];
}

function end(event) {
	finalPoint = event.changedTouches[0];
	var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
	var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
	if (xAbs > 30 || yAbs > 30) {														// Диапазон смещения. Данный весьма мал, но сбоев не обнаружено
		if (xAbs > yAbs) {
			if (finalPoint.pageX < initialPoint.pageX) {
				if (blockActive && fullScreen.matches) slide('next');			// в полноэкранном режиме переключение между input.checked/label
				else if (!blockActive) addHoverFirst('.right'); 				// Движение влево только в неактивном состоянии 
			}
			else if (blockActive && fullScreen.matches) slide('prev');		// в полноэкранном режиме переключение между input.checked/label
			else if (!blockActive) addHoverFirst('.left');						// Движение вправо только в неактивном состоянии 
		}
		else if (!blockActive) {														// Только в неактивном состоянии 
			if (finalPoint.pageY < initialPoint.pageY) {
				addHoverFirst('.down'); 												// Движение вверх 
			}
			else {
				addHoverFirst('.up'); 													// Движение вниз 
			}
		}
	}
}

// Отслеживание. Движения. Переключение содержимого в полноэкранном режиме
function slide(n) {
	for (let i = 0; i < radioList.length; i++) {					
		if (radioList[i][0] == blockActiveName) {						// Определение блока, в котором происходит событие
			for (let j = 1; j < radioList[i].length; j++) {
				if (radioList[i][j].checked) {							// Определение актуальной позиции input.checked 
					if (n == 'next') {										// Для следующего
						if ((j + 1) == radioList[i].length) return;	// Проверка последний ли?		
						else {
							radioList[i][j + 1].checked = true;			// Переключение позиции input.checked
							scrollUp();											// Прокрутка в верх (иначе позиция прокрутки останется на том же месте)
							return;												// Завершение именно функции, а не цикла
						}
					} else if ((j - 1) == 0) return;						// Для предыдущего. Проверка первый ли?
						else {
						radioList[i][j - 1].checked = true;				// Переключение позиции input.checked
						scrollUp();												// Прокрутка в верх (иначе позиция прокрутки останется на том же месте)
						return;													// Завершение именно функции, а не цикла
					}
				}
			}
		}
	}
}

//* ----------------------------------------------------------------

// параметры (следует уточнять в _variable.scss)
var pc_width = 1310;
var laptop_width = 1024;
// var tablet_width = 768;
// var mobile_width = 375;
var proportion = '5 / 2';
var break_height = 640;
var slim_screen_tag = 320;
var screen_off = 200;

var initialPoint;				// начало движения
var finalPoint;				// конец движения

// Переменные для хранения актуальных параметров и состояния
var version = false; 		// Флаг загрузки полной версии сайта
var blockActive = false; 	// Флаг открыт ли какой-нибудь блок. Обнуляется при RemoveAll.
var blockActiveName;			// Активный блок для подключения info для матрицы в slide и для анимации бирок при resize.  
									// В отличии от "blockActive" для избегания скачков при движениях обнуляется в info. 

// Отслеживание размера бирок, чтобы применять функцию только при изменениях в размере, а не каждый раз заново запускать анимацию при Resize
var tag;							// Флаг большие или маленькие бирки
var changeTag;					// Флаг для отслеживание момента изменения размера бирок внутри Resize. Первоначальное значение задаётся при загрузке страницы для соответствующего экрана 

// Переменные для корректного использования мышки и "Закрыть". Решение проблемы положения "Закрыть" над областью наведения.
var blockStop = false;		// Флаг, блокирующий открытие блока.
var blockStopName;			// Блокирует тот блок, который был открыт
var mouse;						// Хранит используемое устройство ввода для появления "Закрыть"

// Медиа запросы  (следует уточнять в _mixin.scss). Полный, узкий или совсем узкий экран.
const fullScreen = window.matchMedia('(max-width:  ' + pc_width + 'px) and (min-aspect-ratio: ' + proportion + '), (max-height: ' + break_height + 'px), (max-width:  ' + laptop_width + 'px)');
const slimScreen = window.matchMedia('(max-width: ' + slim_screen_tag + 'px), (max-height:  ' + slim_screen_tag + 'px), (max-height: 475px) and (max-aspect-ratio: ' + proportion + ')');
const offScreen = window.matchMedia('(max-width: ' + screen_off + 'px), (max-height:  ' + screen_off + 'px), (max-height: 375px) and (max-aspect-ratio: ' + proportion + ')');

// Активные компоненты
let header = document.getElementById('header');
let logo = document.getElementById('logo');

let footer = document.getElementById('footer');
let cls = document.getElementById('close');
let closeAll = document.getElementById('close-all');

let info = document.getElementById('info');
let info_up = document.getElementById('info__up');
let info_down = document.getElementById('info__down');
let info_left = document.getElementById('info__left');
let info_right = document.getElementById('info__right');

let up = document.getElementById('up');
let down = document.getElementById('down');
let left = document.getElementById('left');
let right = document.getElementById('right');

let tag_up = document.getElementById('up-tag');
let tag_down = document.getElementById('down-tag');
let tag_left = document.getElementById('left-tag');
let tag_right = document.getElementById('right-tag');

let box_up = document.getElementById('up__box');
let box_down = document.getElementById('down__box');
let box_left = document.getElementById('left__box');
let box_right = document.getElementById('right__box');

let radio_up1 = document.getElementById('up-1');
let radio_up2 = document.getElementById('up-2');
let radio_up3 = document.getElementById('up-3');
let radio_down1 = document.getElementById('down-1');
let radio_down2 = document.getElementById('down-2');
let radio_left1 = document.getElementById('left-1');
let radio_left2 = document.getElementById('left-2');
let radio_left3 = document.getElementById('left-3');
let radio_right1 = document.getElementById('right-1');
let radio_right2 = document.getElementById('right-2');
let radio_right3 = document.getElementById('right-3');

// Создание порядка следования переключения между input.checked/label в полноэкранном режиме при жестах влево/вправо   
var radioList = [
	['.up', radio_up1, radio_up2, radio_up3],
	['.right', radio_right1, radio_right2, radio_right3],
	['.down', radio_down1, radio_down2 ],
	['.left', radio_left1, radio_left2, radio_left3]
];

// Поведение.
up.addEventListener('mouseover', () => addHoverFirst('.up'));
down.addEventListener('mouseover', () => addHoverFirst('.down'));
left.addEventListener('mouseover', () => addHoverFirst('.left'));
right.addEventListener('mouseover', () => addHoverFirst('.right'));

box_up.addEventListener('mouseover', () => addHoverFirst('.up'));
box_down.addEventListener('mouseover', () => addHoverFirst('.down'));
box_left.addEventListener('mouseover', () => addHoverFirst('.left'));
box_right.addEventListener('mouseover', () => addHoverFirst('.right'));

box_up.addEventListener('mouseout', removeAll);
box_down.addEventListener('mouseout', removeAll);
box_left.addEventListener('mouseout', removeAll);
box_right.addEventListener('mouseout', removeAll);

tag_up.addEventListener('mouseover', () => addHoverFirst('.up'));
tag_down.addEventListener('mouseover', () => addHoverFirst('.down'));
tag_left.addEventListener('mouseover', () => addHoverFirst('.left'));
tag_right.addEventListener('mouseover', () => addHoverFirst('.right'));


logo.addEventListener('mouseover',() => addHoverFirst('.logo'));
logo.addEventListener('mouseout', removeAll);
logo.addEventListener('touchstart', startLogo, false); 							// Блокировка случайного нажатия на контактные данные

closeAll.addEventListener('click', () => removeAll('full'));
footer.addEventListener('click', () => removeAll('full'));
// Очищение при наведении удалено, чтобы не вводить пользователя в заблуждение

info.addEventListener('mouseenter', function () {
	if (blockActiveName) {				// Уход от багов мелькания при быстром перенаведении
		addHover(blockActiveName);		// Включение актуального блока
		blockActiveName = false;		// Уход от багов мелькания при быстром перенаведении
	}
});
info.addEventListener('mouseleave', removeAll);

// Поведение. Закрытие в полноэкранном режиме при управлении мышью и на больших экранах при любом устройстве ввода
cls.addEventListener('click', function() {
	removeAll();
	blockStop = true;				// Включение блокировки на открывание блоков из-за положения "Закрыть" над областью наведения
	setTimeout(() => {			// Отключение блокировки на открывание блоков из-за положения "Закрыть" над областью наведения
		blockStop = false;
	}, 500);
});

// Прокрутка. Восстановление верхнего положения
radio_up1.addEventListener('click', scrollUp);
radio_up2.addEventListener('click', scrollUp);
radio_up3.addEventListener('click', scrollUp);

// Включение полного функционала сайта
fullVersion();

// Отслеживание. Включение анимации при окончании загрузки страницы. 
window.onload = function () {
	if (version) {					// Проверка лёгкой или полной версии
		setAnimation();			// Включение анимации
		changeTag = tag; 			// Флаг для отслеживание момента изменения размера бирок внутри Resize.
	}
};

// Отслеживание. Корректное переключение анимации бирок, кнопки закрыть и "screenOff" при изменении размеров экрана
window.addEventListener('resize', function () {
	// Переключение между лёгкой и полной версией
	if (offScreen.matches && version) location.reload();		// Перезагрузка страницы в лёгкую версию при переходе в сверх узкий режим 		
	else if (!version) fullVersion();								// Переход в полную версию при переходе в сверх узкий режим
	// Переключение анимации и отображения бирок в полноэкранном режиме
	if (fullScreen.matches && blockActive) {						// Полноэкранный режим + наведение
		hiddenTitleTag();
	} else if (blockActive) {											// Обычный режим + наведение
		showTitleTag();
		document.querySelector(blockActiveName + ' .tag').classList.add('hover');
		document.querySelector(blockActiveName + ' .title-tag').classList.add('hover');
	}
	if (version && !blockActive) resetAnimation();				// Перезапуск анимации (дальнейшая проверка внутри)
	// Переключение отображения кнопок "Закрыть" и "Закрыть всё".
	closeButton(mouse);
});

// Отслеживание. Движения
document.addEventListener('touchstart', start, false);
document.addEventListener('touchend', end, false);

// Отслеживание. Тип устройства ввода
// Отслеживание. Тип устройства ввода. Касание / нажатие (преимущественно для touch)
document.addEventListener('pointerdown', function(event) {
	switch (event.pointerType) {
		case 'mouse':
			mouse = true;
		closeButton(mouse);
		 break;
		case 'pen':
			mouse = false;
			closeButton(mouse);
		 break;
	  case 'touch':
			mouse = false;
			closeButton(mouse);
		 break;
	  default:
	}
 }, false);

// Отслеживание. Тип устройства ввода. Движение (преимущественно для mouse)
document.addEventListener('pointermove', function (event) {
	switch (event.pointerType) {
		case 'mouse':
			mouse = true;
			closeButton(mouse);
			break;
		case 'pen':
			mouse = false;
			closeButton(mouse);
			break;
		case 'touch':
			mouse = false;
			closeButton(mouse);
			break;
		default:
	}
}, false);
