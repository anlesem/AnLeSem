//* Логика Лёгкой версии
// 1. подключение JS. Если успех, меняется содержимое warning
// 2. Размер экрана.  

//* Логика анимации загрузки
// 1. подключение JS. Если успех, отключается анимация появления загрузки для управления в JS
// 2. отслеживание загрузки страницы:
//		а. через 3 секунды предоставляется возможность перейти на лёгкую версию
//		б. при успешной загрузке отключается блок preloader с задержкой 2 секунды, чтобы не было эффекта дозагрузки фонового изображения
//		в. включение анимации с такой же задержкой

function fullVersion() {
	// Включение полноценной версии только в случае подходящего разрешения экрана
	if (!offScreen.matches) {
		preloader.style.animation = "unset"; // Отключение анимации загрузки для управления в JS
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
	warning.innerHTML = "Расширение экрана не позволяет корректно отобразить всё оформление страницы.";
}

function removePreloader() {
	preloader.style.animation = "preloader 1s linear forwards";	// Отключение заставки
	upTag.style.animation = "load-tag-up 1s linear forwards";	// Отображение бирок
	downTag.style.animation = "load-tag-down 1s linear forwards";	
	rightTag.style.animation = "load-tag-right 1s linear forwards";	
	leftTag.style.animation = "load-tag-left 1s linear forwards";
}

function lightVersion() {
	let elemA = document.querySelectorAll('.normal');
	let i = 0;
	for (let n of elemA) {
		i++;
		n.classList.add('light');
		n.classList.remove('normal');
		if (i == elemA.length) {
			preloader.style.display = 'none';	// Отключение заставки
			version = false;
			removeAnimation();
		}
	}
	warning.innerHTML = "Имеет смысл перегрузить страницу, когда скорость интернет-соединения станет выше.";
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
	if (version) {
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
}

// Поведение. Показ при наведении на внутренние компоненты
function addHover(block) {
	document.querySelector(block).classList.add('hover');
	closeAll.classList.add('hover');
	if (block != '.logo') {							// Исключение логотипа из общего стиля поведения
		blockActiveSet(block);						// Установка нового значения активного блока
		hiddenTitleTag();								// Скрытие бирок
	}
	removeAnimation();								// Отключение анимации
}

// Поведение. Закрытие всего открытого
function removeAll(n) {
	showTitleTag();																	// Включение бирок
	closeAll.classList.remove('hover');
	up.classList.remove('hover');
	down.classList.remove('hover');
	left.classList.remove('hover');
	right.classList.remove('hover');
	logo.classList.remove('hover');
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
	if (version) addHover('.logo');												// Дублирование эффекта наведения
	logo.removeEventListener('touchstart', startLogo, false);			// Удаление "слушателя" для восстановления действий браузера по умолчанию
}

// Управление анимацией. 
function setAnimation() {
	if (version) {
		let intervals = 8;										// Период длительности анимации
		let delay = 5;												// Общая задержка при старте, чтобы не отвлекала и не мешала активному использованию						

		info.style.animation = 'info-opacity infinite ' + intervals + 's ' + delay + 's linear';
		info_up.style.animation = 'info-text infinite ' + intervals * 3 + 's ' + delay + 's linear';
		logo.style.animation = 'circle infinite ' + intervals + 's ' + (delay + intervals / 2) + 's linear';
		if (slimScreen.matches) {
			tag = 'slim';											// Переключение флага размера бирок
			upTag.style.animation = 'rhythm-tag-vert-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
			downTag.style.animation = 'rhythm-tag-vert-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
			leftTag.style.animation = 'rhythm-tag-horz-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
			rightTag.style.animation = 'rhythm-tag-horz-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		} else {
			tag = 'normal';										// Переключение флага размера бирок
			leftTag.style.animation = 'rhythm-tag-horz infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
			rightTag.style.animation = 'rhythm-tag-horz infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
			upTag.style.animation = 'rhythm-tag-vert infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
			downTag.style.animation = 'rhythm-tag-vert infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		}
	}
}

function removeAnimation() {
	info.style.animation = "unset";
	info_up.style.animation = "unset";
	logo.style.animation = "unset";
	leftTag.style.animation = 'unset';
	rightTag.style.animation = 'unset';
	upTag.style.animation = 'unset';
	downTag.style.animation = 'unset';
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

// Отслеживание. Изменение размеров экрана
function changeScreen() {
	console.log(version);
	// Переключение между лёгкой и полной версией
	if (offScreen.matches && version) location.reload();		// Перезагрузка страницы в лёгкую версию при переходе в сверх узкий режим 		
	else if (!version) {													// Переход в полную версию при переходе в сверх узкий режим
		fullVersion();
		removePreloader();
	}
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
var pcWidth = 1310;
var laptopWidth = 1024;
// var tablet_width = 768;
// var mobile_width = 375;
var proportion = '5 / 2';
var breakHeight = 640;
var slimScreenTag = 320;
var screenOff = 200;

var initialPoint;				// начало движения
var finalPoint;				// конец движения

// Переменные для хранения актуальных параметров и состояния
var version = false; 		// Флаг загрузки полной версии сайта
var loadComplete = false; 	// Флаг загрузки страницы для проверки отображения кнопки перехода на лёгкую версию 

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
var rotateScreen = false;	// Флаг поворота экрана, чтобы дважды не вызывать одну и ту же функцию

// Медиа запросы  (следует уточнять в _mixin.scss). Полный, узкий или совсем узкий экран.
const fullScreen = window.matchMedia('(max-width:  ' + pcWidth + 'px) and (min-aspect-ratio: ' + proportion + '), (max-height: ' + breakHeight + 'px), (max-width:  ' + laptopWidth + 'px)');
const slimScreen = window.matchMedia('(max-width: ' + slimScreenTag + 'px), (max-height:  ' + slimScreenTag + 'px), (max-height: 475px) and (max-aspect-ratio: ' + proportion + ')');
const offScreen = window.matchMedia('(max-width: ' + screenOff + 'px), (max-height:  ' + screenOff + 'px), (max-height: 375px) and (max-aspect-ratio: ' + proportion + ')');

// Активные компоненты
let header = document.getElementById('header');
let logo = document.getElementById('logo');
let footer = document.getElementById('footer');
let cls = document.getElementById('close');
let closeAll = document.getElementById('close-all');

let preloader = document.getElementById('preloader');
let toLight = document.getElementById('to-light');
let warning = document.getElementById('warning');

let info = document.getElementById('info');
let info_up = document.getElementById('info__up');
let info_down = document.getElementById('info__down');
let info_left = document.getElementById('info__left');
let info_right = document.getElementById('info__right');

let up = document.getElementById('up');
let down = document.getElementById('down');
let left = document.getElementById('left');
let right = document.getElementById('right');

let upTag = document.getElementById('up-tag');
let downTag = document.getElementById('down-tag');
let leftTag = document.getElementById('left-tag');
let rightTag = document.getElementById('right-tag');

let upWrap = document.getElementById('up__wrap');
let downWrap = document.getElementById('down__wrap');
let leftWrap = document.getElementById('left__wrap');
let rightWrap = document.getElementById('right__wrap');

let radioUp1 = document.getElementById('up-1');
let radioUp2 = document.getElementById('up-2');
let radioUp3 = document.getElementById('up-3');
let radioDown1 = document.getElementById('down-1');
let radioDown2 = document.getElementById('down-2');
let radioLeft1 = document.getElementById('left-1');
let radioLeft2 = document.getElementById('left-2');
let radioLeft3 = document.getElementById('left-3');
let radioRight1 = document.getElementById('right-1');
let radioRight2 = document.getElementById('right-2');
let radioRight3 = document.getElementById('right-3');

// Создание порядка следования переключения между input.checked/label в полноэкранном режиме при жестах влево/вправо   
var radioList = [
	['.up', radioUp1, radioUp2, radioUp3],
	['.right', radioRight1, radioRight2, radioRight3],
	['.down', radioDown1, radioDown2 ],
	['.left', radioLeft1, radioLeft2, radioLeft3]
];

// Поведение.
up.addEventListener('mouseover', () => addHoverFirst('.up'));
down.addEventListener('mouseover', () => addHoverFirst('.down'));
left.addEventListener('mouseover', () => addHoverFirst('.left'));
right.addEventListener('mouseover', () => addHoverFirst('.right'));

upWrap.addEventListener('mouseover', () => addHoverFirst('.up'));
downWrap.addEventListener('mouseover', () => addHoverFirst('.down'));
leftWrap.addEventListener('mouseover', () => addHoverFirst('.left'));
rightWrap.addEventListener('mouseover', () => addHoverFirst('.right'));

upWrap.addEventListener('mouseout', removeAll);
downWrap.addEventListener('mouseout', removeAll);
leftWrap.addEventListener('mouseout', removeAll);
rightWrap.addEventListener('mouseout', removeAll);

upTag.addEventListener('mouseover', () => addHoverFirst('.up'));
downTag.addEventListener('mouseover', () => addHoverFirst('.down'));
leftTag.addEventListener('mouseover', () => addHoverFirst('.left'));
rightTag.addEventListener('mouseover', () => addHoverFirst('.right'));


logo.addEventListener('mouseover',() => addHoverFirst('.logo'));
logo.addEventListener('mouseout', removeAll);
logo.addEventListener('touchstart', startLogo, false); 			// Блокировка случайного нажатия на контактные данные

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
radioUp1.addEventListener('click', scrollUp);
radioUp2.addEventListener('click', scrollUp);
radioUp3.addEventListener('click', scrollUp);

// Переключение в лёгкую версию при долгой загрузке страницы
toLight.addEventListener('click', lightVersion);

//* Загрузка
// Запуск таймера от начала загрузки страницы
var t = 0;
let timerId = setInterval(() => {
	if (loadComplete) clearInterval(timerId);		// Удаление таймера по факту загрузки страницы
	t++;
	if (t == 3) toLight.style.display = 'block';
}, 1000);

// Включение полной версии как только, так сразу
fullVersion();

//* Отслеживание
// Отслеживание. Окончание загрузки страницы. 
window.onload = function () {
	loadComplete = true;
	setTimeout(() => {
		removePreloader();
		setTimeout(() => {
			if (version && !blockActive) {	// Проверка лёгкой или полной версии и активного из-за смещения во времени
				resetAnimation();
				changeTag = tag; 					// Флаг для отслеживание момента изменения размера бирок внутри Resize.
			}	
		}, 1000);
	}, 1000);
};

// Отслеживание. Корректное переключение анимации бирок, кнопки закрыть и "screenOff" при изменении размеров экрана
// window.addEventListener("orientationchange", changeScreen);	// Поворот экрана
// window.addEventListener('resize', changeScreen);				// Изменение размеров экрана
window.onorientationchange = opppa;

function opppa() {
	alert('Hi Iphone... opppa');
	changeScreen();
}

window.addEventListener('orientationchange', function () {
	alert('Hi Iphone... orientation');
	changeScreen();
}, false);
window.addEventListener('resize', function () {
	alert('Hi Iphone... resize');
	changeScreen();
}, false);				


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
