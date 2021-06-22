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

// показ при наведении
function addHover(block) {
	if (!offScreen.matches) {
		document.querySelector(block).classList.add('hover');
		document.querySelector('.logo').style.animation = "unset";
		document.querySelector('.close').classList.add('hover');
		blockActiveSet(block);
		tagRemoveAnimation();
		hiddenTitleTag();
	}
}

// Закрытие всего открытого
function removeAll() {
	showTitleTag();
	document.querySelector('.close').classList.remove('hover');
	document.querySelector('.up').classList.remove('hover');
	document.querySelector('.down').classList.remove('hover');
	document.querySelector('.left').classList.remove('hover');
	document.querySelector('.right').classList.remove('hover');
	blockActive = false;
	if (logoActive) document.querySelector('.logo').style.animation = "unset";
	else logoSetAnimation();
	tagSetAnimation();
	// document.addEventListener('touchend', end);
}

function addHoverReset(block) {
	removeAll();
	turnOffMouse();
	addHover(block);
}

function blockActiveSet (block) {
	blockActive = block;
};

function logoSetAnimation() {
	document.querySelector('.logo').style.animation = "circle infinite 8s 4s linear";
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
	document.querySelector('.left-tag').style.animation = 'none';
	document.querySelector('.right-tag').style.animation = 'none';
	document.querySelector('.up-tag').style.animation = 'none';
	document.querySelector('.down-tag').style.animation = 'none';
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


//* ----------------------------------------------------------------

// параметры (следует уточнять в _variable.scss)
var pc_width = 1310;
var laptop_width = 1024;
// var tablet_width = 768;
// var mobile_width = 375;
var proportion = 5 / 2;
var break_height = 640;
var slim_screen_tag = 320;
var screen_off = 200;

var logoActive = false;
var blockActive = false;

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

let box_up = document.getElementById('up__box');
let box_down = document.getElementById('down__box');
let box_left = document.getElementById('left__box');
let box_right = document.getElementById('right__box');

let up = document.getElementById('up');
let down = document.getElementById('down');
let left = document.getElementById('left');
let right = document.getElementById('right');

let tag_up = document.getElementById('up-tag');
let tag_down = document.getElementById('down-tag');
let tag_left = document.getElementById('left-tag');
let tag_right = document.getElementById('right-tag');


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

// Закрытие в полноэкранном режиме
cls.addEventListener('click', removeAll);
header.addEventListener('click', removeAll);
header.addEventListener('mouseover', removeAll);
footer.addEventListener('click', removeAll);
footer.addEventListener('mouseover', removeAll);

// Управление анимацией
logo.addEventListener('mouseover', function () {
	logoActive = true;
});
logo.addEventListener('mouseout', function () {
	logoActive = false;
	logoSetAnimation();
});

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

// Определение типа устройства ввода
// Ловит "движение". Для улавливания "касания" лучше использовать pointerdown (нажатие)
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


// Движения
var initialPoint;
var finalPoint;

document.addEventListener('touchstart', function(event) {
	initialPoint = event.changedTouches[0];
}, false);

document.addEventListener('touchend', function(event) {
	if (blockActive == false) {
		finalPoint = event.changedTouches[0];
		var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
		var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
		if (xAbs > 30 || yAbs > 30) {
			if (xAbs > yAbs) {
				if (finalPoint.pageX < initialPoint.pageX) {
					addHover('.right'); 								//Движение влево
				}
				else {
					addHover('.left');								//Движение влево
				}
			}
			else {
				if (finalPoint.pageY < initialPoint.pageY) {
					addHover('.down'); 								//Движение вверх
				}
				else {
					addHover('.up'); 									//Движение вниз
				}
			}
		}
	}
}, false);




