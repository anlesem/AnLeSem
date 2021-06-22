
// показ и скрытие при наведении 
function addHover(block) {
	document.querySelector(block).classList.add('hover');
	document.querySelector('.close').classList.add('hover');
	document.querySelector('.logo').style.animation = "unset";
	blockActiveSet();
	tagRemoveAnimation();
	hiddenTitleTag();
}

// Закрытие всего открытого
function removeAll() {
	let elements = document.querySelectorAll('.title-tag');
	for (let elem of elements) { elem.classList.remove('hover'); }
	document.querySelector('.close').classList.remove('hover');
	document.querySelector('.up').classList.remove('hover');
	document.querySelector('.down').classList.remove('hover');
	document.querySelector('.left').classList.remove('hover');
	document.querySelector('.right').classList.remove('hover');
	blockActive = false;
	logoSetAnimation();
	tagSetAnimation();
}

function addHoverMobile(block) {
	removeAll();
	addHover(block);
}

function blockActiveSet () {
	blockActive = true;
};

function logoRemoveAnimation() {
	removeAll()
	if (logoActive) document.querySelector('.logo').style.animation = "unset";
}

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


// дополнение для мобильных устройств (скрытие/показ наименований бирок)
function hiddenTitleTag() {
	// значение ширины экрана
	let screenViewW = document.documentElement.scrollWidth;
	let screenViewH = document.documentElement.scrollHeight;

	if (((screenViewW < pc_width) && (screenViewW / screenViewH) > proportion) ||
		((screenViewW < pc_width) && (screenViewH < break_height)) ||
		(screenViewW < laptop_width)) {
		let elements = document.querySelectorAll('.title-tag');
		for (let elem of elements) { elem.classList.add('hover'); }
	}
}


//* ----------------------------------------------------------------

// параметры (следует уточнять в _variable.scss)
var pc_width = 1280;
var laptop_width = 1024;
// var tablet_width = 768;
// var mobile_width = 375;
var proportion = 5 / 2;
var break_height = 640;
var slim_screen_tag = 320;

var logoActive = false;
var blockActive = false;

const slimScreen = window.matchMedia('(max-height: ' + slim_screen_tag + 'px), (max-width:  ' + slim_screen_tag + 'px), (max-height: 475px) and (max-aspect-ratio: ' + proportion + '/1)');

slimScreen.addListener(tagSetAnimation);

// Наведение в ПК версии

let logo = document.getElementById('logo');
let info_up = document.getElementById('info__up');
let info_down = document.getElementById('info__down');
let info_left = document.getElementById('info__left');
let info_right = document.getElementById('info__right');

logo.addEventListener('mouseover', function () {
	logoActive = true;
});
logo.addEventListener('mouseout', function () {
	logoActive = false;
	logoSetAnimation();
} );

info_up.addEventListener('mouseover', () => addHover('.up'));
info_down.addEventListener('mouseover', () => addHover('.down'));
info_left.addEventListener('mouseover', () => addHover('.left'));
info_right.addEventListener('mouseover', () => addHover('.right'));

info_up.addEventListener('mouseout', removeAll);
info_down.addEventListener('mouseout', removeAll);
info_left.addEventListener('mouseout', removeAll);
info_right.addEventListener('mouseout', removeAll);


let box_up = document.getElementById('up__box');
let box_down = document.getElementById('down__box');
let box_left = document.getElementById('left__box');
let box_right = document.getElementById('right__box');

box_up.addEventListener('mouseover', () => addHover('.up'));
box_down.addEventListener('mouseover', () => addHover('.down'));
box_left.addEventListener('mouseover', () => addHover('.left'));
box_right.addEventListener('mouseover', () => addHover('.right'));

box_up.addEventListener('mouseout', removeAll);
box_down.addEventListener('mouseout', removeAll);
box_left.addEventListener('mouseout', removeAll);
box_right.addEventListener('mouseout', removeAll);


// Наведение в мобильной версии

let cls = document.getElementById('close');
let tag_up = document.getElementById('up-tag');
let tag_down = document.getElementById('down-tag');
let tag_left = document.getElementById('left-tag');
let tag_right = document.getElementById('right-tag');
let header = document.getElementById('header');
let footer = document.getElementById('footer');

tag_up.addEventListener('touchstart', () => addHoverMobile('.up'));
tag_down.addEventListener('touchstart', () => addHoverMobile('.down'));
tag_left.addEventListener('touchstart', () => addHoverMobile('.left'));
tag_right.addEventListener('touchstart', () => addHoverMobile('.right'));

// Блокировка случайного движения
tag_up.addEventListener('mouseover', blockActiveSet);
tag_down.addEventListener('mouseover', blockActiveSet);
tag_left.addEventListener('mouseover', blockActiveSet);
tag_right.addEventListener('mouseover', blockActiveSet);

// Закрытие в мобильной версии
cls.addEventListener('click', removeAll);
header.addEventListener('click', logoRemoveAnimation);
header.addEventListener('mouseover', logoRemoveAnimation);
footer.addEventListener('click', removeAll);
footer.addEventListener('mouseover', removeAll);





//* Движения

var initialPoint;
var finalPoint;

document.addEventListener('touchstart', function(event) {
	// event.preventDefault();
	// event.stopPropagation();
	initialPoint=event.changedTouches[0];
}, false);

document.addEventListener('touchend', function(event) {
	// event.preventDefault();
	// event.stopPropagation();
	finalPoint=event.changedTouches[0];
	var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
	var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
	if (!blockActive)  {
		if (xAbs > 20 || yAbs > 20) {
			// alert(document.querySelector('.hover'));
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






