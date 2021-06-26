// показ при наведении для мышки
function addHover(block) {
	if (!offScreen.matches) {
		document.querySelector(block).classList.add('hover');
		document.querySelector('.close').classList.add('hover');
		blockActiveSet(block);
		logoRemoveAnimation();
		tagRemoveAnimation();
		hiddenTitleTag();
	}
}

// показ при наведении для касаний
function addHoverReset(block) {
	removeAll();
	addHover(block);
}

// Флаг Активного блока
function blockActiveSet(block) {
	blockActive = block;
};

// Закрытие всего открытого
function removeAll() {
	showTitleTag();
	document.querySelector('.close').classList.remove('hover');
	document.querySelector('.up').classList.remove('hover');
	document.querySelector('.down').classList.remove('hover');
	document.querySelector('.left').classList.remove('hover');
	document.querySelector('.right').classList.remove('hover');
	blockActive = false;
	if (logoActive) logoRemoveAnimation();
	else logoSetAnimation();
	tagSetAnimation();
}

// Управление анимацией
function allSetAnimation() {
	console.log('Запуск анимации');
	document.querySelector('.info').style.animation = "info-opacity infinite 8s linear";
	document.querySelector('.info__up').style.animation = "info-text infinite 72s linear";
	logoSetAnimation();
	tagSetAnimation();
}

function allRemoveAnimation() {
	document.querySelector('.info').style.animation = "unset";
	document.querySelector('.info__up').style.animation = "unset";
	logoRemoveAnimation();
	tagRemoveAnimation();
}

function logoSetAnimation() {
	document.querySelector('.logo').style.animation = "circle infinite 8s 4s linear";
}

function logoRemoveAnimation() {
	document.querySelector('.logo').style.animation = "unset";
}

function tagSetAnimation() {
	tagRemoveAnimation();
	if (slimScreen.matches) {
		document.querySelector('.up-tag').style.animation = 'rhythm-tag-vert-slim infinite 8s 8s linear';
		document.querySelector('.down-tag').style.animation = 'rhythm-tag-vert-slim infinite 8s 8s linear';
		document.querySelector('.left-tag').style.animation = 'rhythm-tag-horz-slim infinite 8s 8s linear';
		document.querySelector('.right-tag').style.animation = 'rhythm-tag-horz-slim infinite 8s 8s linear';
	} else {
		document.querySelector('.left-tag').style.animation = 'rhythm-tag-horz infinite 8s 8s linear';
		document.querySelector('.right-tag').style.animation = 'rhythm-tag-horz infinite 8s 8s linear';
		document.querySelector('.up-tag').style.animation = 'rhythm-tag-vert infinite 8s 8s linear';
		document.querySelector('.down-tag').style.animation = 'rhythm-tag-vert infinite 8s 8s linear';
	}
}

function tagRemoveAnimation() {
	document.querySelector('.left-tag').style.animation = 'unset';
	document.querySelector('.right-tag').style.animation = 'unset';
	document.querySelector('.up-tag').style.animation = 'unset';
	document.querySelector('.down-tag').style.animation = 'unset';
}

// скрытие/показ наименований всех бирок в полноэкранном режиме 
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

function scrollUp() {
	info_up.scrollTop = 0;
	down_rgu.scrollTop = 0;
	down_gb.scrollTop = 0;
}

// Движения
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
				else if (!blockActive) addHover('.right'); 				//Движение влево
			}
			else if (blockActive && fullScreen.matches) slide('prev');
			else if (!blockActive) addHover('.left');						//Движение вправо
		}
		else if (!blockActive) {
			if (finalPoint.pageY < initialPoint.pageY) {
				addHover('.down'); 								//Движение вверх
			}
			else {
				addHover('.up'); 									//Движение вниз
			}
		}
	}
}

// Переключение содержимого в полноэкранном режиме
function slide(n) {
	for (let i = 0; i < radioList.length; i++) {
		if (radioList[i][0] == blockActive) {
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

// Отключение наведения мышью
function turnOffMouse() {
	document.querySelector('.up').classList.remove('up-hover');
	document.querySelector('.down').classList.remove('down-hover');
	document.querySelector('.left').classList.remove('left-hover');
	document.querySelector('.right').classList.remove('right-hover');
}

// Включение наведения мышью
function turnOnMouse() {
	document.querySelector('.up').classList.add('up-hover');
	document.querySelector('.down').classList.add('down-hover');
	document.querySelector('.left').classList.add('left-hover');
	document.querySelector('.right').classList.add('right-hover');
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

var logoActive = false;
var blockActive = false;

var initialPoint;	// начало движения
var finalPoint;	// конец движения
var initialPoint2;	// начало движения
var finalPoint2;	// конец движения

// Медиа запросы  (следует уточнять в _mixin.scss)
const fullScreen = window.matchMedia('(max-width:  ' + pc_width + 'px) and (min-aspect-ratio: ' + proportion + '), (max-height: ' + break_height + 'px), (max-width:  ' + laptop_width + 'px)');
const slimScreen = window.matchMedia('(max-width: ' + slim_screen_tag + 'px), (max-height:  ' + slim_screen_tag + 'px), (max-height: 475px) and (max-aspect-ratio: ' + proportion + ')');
const offScreen = window.matchMedia('(max-width: ' + screen_off + 'px), (max-height:  ' + screen_off + 'px), (max-height: 350px) and (max-aspect-ratio: ' + proportion + ')');

// Активные компоненты
let header = document.getElementById('header');
let logo = document.getElementById('logo');

let footer = document.getElementById('footer');
let cls = document.getElementById('close');

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

// Поведение
info_up.addEventListener('mouseover', () => addHover('.up'));
info_down.addEventListener('mouseover', () => addHover('.down'));
info_left.addEventListener('mouseover', () => addHover('.left'));
info_right.addEventListener('mouseover', () => addHover('.right'));

info_up.addEventListener('mouseout', removeAll);
info_down.addEventListener('mouseout', removeAll);
info_left.addEventListener('mouseout', removeAll);
info_right.addEventListener('mouseout', removeAll);

box_up.addEventListener('mouseover', () => addHover('.up'));
box_down.addEventListener('mouseover', () => addHover('.down'));
box_left.addEventListener('mouseover', () => addHover('.left'));
box_right.addEventListener('mouseover', () => addHover('.right'));

box_up.addEventListener('mouseout', removeAll);
box_down.addEventListener('mouseout', removeAll);
box_left.addEventListener('mouseout', removeAll);
box_right.addEventListener('mouseout', removeAll);

up.addEventListener('touchstart', () => addHoverReset('.up'));
down.addEventListener('touchstart', () => addHoverReset('.down'));
left.addEventListener('touchstart', () => addHoverReset('.left'));
right.addEventListener('touchstart', () => addHoverReset('.right'));

tag_up.addEventListener('touchstart', () => addHoverReset('.up'));
tag_down.addEventListener('touchstart', () => addHoverReset('.down'));
tag_left.addEventListener('touchstart', () => addHoverReset('.left'));
tag_right.addEventListener('touchstart', () => addHoverReset('.right'));

// Возвращение наверх текстового наполнения
radio_up1.addEventListener('click', scrollUp);
radio_up2.addEventListener('click', scrollUp);
radio_up3.addEventListener('click', scrollUp);
radio_down1.addEventListener('click', scrollUp);
radio_down2.addEventListener('click', scrollUp);
down_rgu.addEventListener('click', scrollUp);
down_gb.addEventListener('click', scrollUp);

// Закрытие в полноэкранном режиме
cls.addEventListener('click', removeAll);
header.addEventListener('click', removeAll);
header.addEventListener('mouseover', removeAll);
footer.addEventListener('click', removeAll);
footer.addEventListener('mouseover', removeAll);

// Управление анимацией
switch (document.readyState) {
	case "loading":
	  // Страница все ещё загружается
		console.log('загружается');
		allRemoveAnimation();
	case "interactive":
	  // Страница уже загружена. Теперь мы можем получить доступ к DOM объектам.
	  console.log('почти');
		allRemoveAnimation();
	case "complete":
		// Страница загружена вместе с дополнительными ресурсами.
		console.log('готово');
		setTimeout(allSetAnimation, 3000);
 }

logo.addEventListener('mouseover', function () {
	logoActive = true;
});
logo.addEventListener('mouseout', function () {
	logoActive = false;
	logoSetAnimation();
});

// Отслеживание движения
document.addEventListener('touchstart', start, false);
document.addEventListener('touchend', end, false);

// Отслеживаем корректное переключение бирок при изменении размеров экрана
window.addEventListener('resize', function () {
	if (offScreen.matches && blockActive != false) location.reload();
	if (fullScreen.matches && blockActive != false) {
		hiddenTitleTag();
	} else if (blockActive != false) {
		showTitleTag();
		document.querySelector(blockActive + ' .tag').classList.add('hover');
		document.querySelector(blockActive + ' .title-tag').classList.add('hover');
	}
});

// Отслеживание типа устройства ввода
// Определение "касания" (нажатие) преимущественно для touch
document.addEventListener('pointerdown', function(event) {
	switch (event.pointerType) {
	  case 'mouse':
		turnOnMouse();
		 break;
	  case 'pen':
		console.log('pen');
		 break;
	  case 'touch':
		turnOffMouse();
		 break;
	  default:
		 console.log(`pointerType ${event.pointerType} is not supported`);
	}
 }, false);

 // Определение "движения" (нажатие) преимущественно для mouse
document.addEventListener('pointermove', function(event) {
	switch (event.pointerType) {
	  case 'mouse':
		turnOnMouse();
		 break;
	  case 'pen':
		console.log('pen');
		 break;
	  case 'touch':
		turnOffMouse();
		 break;
	  default:
		 console.log(`pointerType ${event.pointerType} is not supported`);
	}
 }, false);







