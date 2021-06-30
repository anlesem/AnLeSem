function fullVersion() {
	if (!offScreen.matches) {
		let elemA = document.querySelectorAll('.light');
		let i = 0;
		for (let n of elemA) {
			i++;
			n.classList.add('normal');
			n.classList.remove('light');
			if (i == elemA.length) version = true;			
		}
	}
	let warning = document.getElementById('warning');
	warning.innerHTML = "Расширение экрана не позволяет корректно отобразить всё оформление страницы.";
}

// Флаг. Активный блок
function blockActiveSet(block) {
	blockActiveName = block;
	blockActive = true;
}

// Флаг. Блокирующий блок
function blockStopSet(block) {
	if (fullScreen.matches && block == '.left') blockStopName = '.right'; 
	else blockStopName = block;
}


// Поведение. Первоначальный показ при наведении
function addHoverFirst(block) {
	if (!offScreen.matches && !blockStop) {
		removeAll();
		addHover(block);
		blockStopSet(block);
	}
	else if (blockStopName != block) {
		removeAll();
		addHover(block);
		blockStopSet(block);
		blockStop = false;
	}
}

// Поведение. Показ при наведении на внутренние компоненты
function addHover(block) {
	document.querySelector(block).classList.add('hover');
	document.querySelector('.close-all').classList.add('hover');
	if (block != '.logo') {
		blockActiveSet(block);
		hiddenTitleTag();
	}
	removeAnimation();
}

// Поведение. Закрытие всего открытого
function removeAll(n) {
	showTitleTag();
	document.querySelector('.close-all').classList.remove('hover');
	document.querySelector('.up').classList.remove('hover');
	document.querySelector('.down').classList.remove('hover');
	document.querySelector('.left').classList.remove('hover');
	document.querySelector('.right').classList.remove('hover');
	document.querySelector('.logo').classList.remove('hover');
	logo.addEventListener('touchstart', startLogo, false);
	blockActive = false;
	if (n == 'full') blockStop = false;
	setAnimation();
	scrollReturn();
}

// Поведение. Кнопка закрыть 
function closeButton(n) {
	if (!n && fullScreen.matches) {
		cls.style.visibility = 'hidden';
		closeAll.style.visibility = 'visible';
	} else {
		cls.style.visibility = 'visible';
		closeAll.style.visibility = 'hidden';
	}
}

// Поведение. Только логотип - касание 
function startLogo(event) {
	event.preventDefault();
	addHover('.logo');
	logo.removeEventListener('touchstart', startLogo, false);
}

// Управление анимацией. 
function setAnimation() {
	let intervals = 8;
	let delay = 5;								
	let delayTags = delay + intervals;

	document.querySelector('.info').style.animation = 'info-opacity infinite ' + intervals + 's ' + delay + 's linear';
	document.querySelector('.info__up').style.animation = 'info-text infinite ' + intervals * 3 + 's ' + delay + 's linear';
	document.querySelector('.logo').style.animation = 'circle infinite ' + intervals + 's ' + delay + 4 + 's linear';
	if (slimScreen.matches) {
		tag = 'slim';
		document.querySelector('.up-tag').style.animation = 'rhythm-tag-vert-slim infinite ' + intervals + 's ' + delayTags + 's linear';
		document.querySelector('.down-tag').style.animation = 'rhythm-tag-vert-slim infinite ' + intervals + 's ' + delayTags + 's linear';
		document.querySelector('.left-tag').style.animation = 'rhythm-tag-horz-slim infinite ' + intervals + 's ' + delayTags + 's linear';
		document.querySelector('.right-tag').style.animation = 'rhythm-tag-horz-slim infinite ' + intervals + 's ' + delayTags + 's linear';
	} else {
		tag = 'normal';
		document.querySelector('.left-tag').style.animation = 'rhythm-tag-horz infinite ' + intervals + 's ' + delayTags + 's linear';
		document.querySelector('.right-tag').style.animation = 'rhythm-tag-horz infinite ' + intervals + 's ' + delayTags + 's linear';
		document.querySelector('.up-tag').style.animation = 'rhythm-tag-vert infinite ' + intervals + 's ' + delayTags + 's linear';
		document.querySelector('.down-tag').style.animation = 'rhythm-tag-vert infinite ' + intervals + 's ' + delayTags + 's linear';
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
	if (changeTag != tag) {
		removeAnimation();
		setTimeout(() => {
			if (!blockActive) setAnimation();
		}, 3000);
		changeTag = tag;
	} else setAnimation();
}

// Управление анимацией. Бирки. Скрытие/показ наименований в полноэкранном режиме 
function hiddenTitleTag() {
	if (fullScreen.matches) {
		let tag = document.querySelectorAll('.tag');
		let title = document.querySelectorAll('.title-tag');
		for (let elem of tag) { elem.classList.add('hover'); }
		for (let elem of title) { elem.classList.add('hover'); }
	} 
}

function showTitleTag() {
	let tag = document.querySelectorAll('.tag');
	let title = document.querySelectorAll('.title-tag');
	for (let elem of tag) { elem.classList.remove('hover'); }
	for (let elem of title) { elem.classList.remove('hover'); }
}

// Прокрутка. Восстановление верхнего положения
function scrollUp() {
	info_up.scrollTop = 0;
	down_rgu.scrollTop = 0;
	down_gb.scrollTop = 0;
}

function scrollRGU() {
	down_rgu.scrollTop = 0;
	down_rgu.removeEventListener('mouseover', scrollRGU);
	down_gb.addEventListener('mouseover', scrollGB);
}

function scrollGB() {
	down_gb.scrollTop = 0;
	down_gb.removeEventListener('mouseover', scrollGB);
	down_rgu.addEventListener('mouseover', scrollRGU);
}

function scrollReturn() {
	down_rgu.addEventListener('mouseover', scrollRGU);
	down_gb.addEventListener('mouseover', scrollGB);
}

// Отслеживание. Движения
function start(event) {
	initialPoint = event.changedTouches[0];
}

function end(event) {
	finalPoint = event.changedTouches[0];
	var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
	var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
	if (xAbs > 30 || yAbs > 30) {
		if (xAbs > yAbs) {
			if (finalPoint.pageX < initialPoint.pageX) {
				if (blockActive && fullScreen.matches) slide('next');	
				else if (!blockActive) addHoverFirst('.right'); 				//Движение влево
			}
			else if (blockActive && fullScreen.matches) slide('prev');
			else if (!blockActive) addHoverFirst('.left');						//Движение вправо
		}
		else if (!blockActive) {
			if (finalPoint.pageY < initialPoint.pageY) {
				addHoverFirst('.down'); 												//Движение вверх
			}
			else {
				addHoverFirst('.up'); 													//Движение вниз
			}
		}
	}
}

// Отслеживание. Движения. Переключение содержимого в полноэкранном режиме
function slide(n) {
	for (let i = 0; i < radioList.length; i++) {
		if (radioList[i][0] == blockActiveName) {
			for (let j = 1; j < radioList[i].length; j++) {
				if (radioList[i][j].checked) {						// Итог поиска актуальной позиции 
					if (n == 'next') {									
						if ((j + 1) == radioList[i].length) return;			
						else {
							radioList[i][j + 1].checked = true;
							scrollUp();
							return;
						}
					} else if ((j - 1) == 0) return;
						else {
						radioList[i][j - 1].checked = true;
						scrollUp();
						return;
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

var version = false; 		// Флаг загрузки полной версии сайта
var blockActive = false; 	// Флаг открыт ли какой-нибудь блок (обнуляется при RemoveAll)
var blockActiveName;			// Какой блок открыт для подключения info (и сразу обнуляется)
var blockStop = false;		// Флаг, блокирующий открытие блока
var blockStopName;			// Блокирует тот блок, который был открыт
var mouse;						// Хранит используемое устройство ввода
var tag;							// Флаг большие или маленькие бирки
var changeTag;					// Отслеживание момента изменения размера бирок для корректного Resize

var initialPoint;				// начало движения
var finalPoint;				// конец движения

// Медиа запросы  (следует уточнять в _mixin.scss)
const fullScreen = window.matchMedia('(max-width:  ' + pc_width + 'px) and (min-aspect-ratio: ' + proportion + '), (max-height: ' + break_height + 'px), (max-width:  ' + laptop_width + 'px)');
const slimScreen = window.matchMedia('(max-width: ' + slim_screen_tag + 'px), (max-height:  ' + slim_screen_tag + 'px), (max-height: 475px) and (max-aspect-ratio: ' + proportion + ')');
const offScreen = window.matchMedia('(max-width: ' + screen_off + 'px), (max-height:  ' + screen_off + 'px), (max-height: 350px) and (max-aspect-ratio: ' + proportion + ')');

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

let down_rgu = document.getElementById('rgu');
let down_gb = document.getElementById('gb');

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
logo.addEventListener('touchstart', startLogo, false);

closeAll.addEventListener('click', () => removeAll('full'));
footer.addEventListener('click', () => removeAll('full'));
footer.addEventListener('mouseover', () => removeAll('full'));

info.addEventListener('mouseenter', function () {
	if (blockActiveName) {
		addHover(blockActiveName);
		blockActiveName = false;
	}
});
info.addEventListener('mouseleave', removeAll);

// Поведение. Закрытие в полноэкранном режиме
cls.addEventListener('click', function() {
	removeAll();
	blockStop = true;
	setTimeout(() => {
		blockStop = false;
	}, 500);
});

// Прокрутка. Восстановление верхнего положения
radio_up1.addEventListener('click', scrollUp);
radio_up2.addEventListener('click', scrollUp);
radio_up3.addEventListener('click', scrollUp);
radio_down1.addEventListener('click', scrollUp);
radio_down2.addEventListener('click', scrollUp);

down_rgu.addEventListener('click', scrollUp);
down_rgu.addEventListener('mouseover', scrollRGU);
down_gb.addEventListener('click', scrollUp);
down_gb.addEventListener('mouseover', scrollGB);

// Включение полного функционала сайта
fullVersion();

// Отслеживание. Анимация
window.onload = function () {
	if (version) {
		setAnimation();
		changeTag = tag;
	}
};

// Отслеживание. Корректное переключение анимации бирок, кнопки закрыть и "screenOff" при изменении размеров экрана
window.addEventListener('resize', function () {
	if (offScreen.matches && version) location.reload();				
	else if (!version) fullVersion();
	if (fullScreen.matches && blockActive) {
		hiddenTitleTag();
	} else if (blockActive) {
		showTitleTag();
		document.querySelector(blockActiveName + ' .tag').classList.add('hover');
		document.querySelector(blockActiveName + ' .title-tag').classList.add('hover');
	}
	if (version && !blockActive) resetAnimation();
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
