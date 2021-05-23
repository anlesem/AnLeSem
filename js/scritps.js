//* Наведение в ПК версии

let info_up = document.getElementById('info__up');
let info_down = document.getElementById('info__down');
let info_left = document.getElementById('info__left');
let info_right = document.getElementById('info__right');


info_up.onmouseenter = function () {
	document.querySelector('.up').classList.add('hover');
}
info_up.onmouseleave = function () {
	document.querySelector('.up').classList.remove('hover');
}

info_down.onmouseenter = function () {
	document.querySelector('.down').classList.add('hover');
}
info_down.onmouseleave = function () {
	document.querySelector('.down').classList.remove('hover');
}

info_left.onmouseenter = function () {
	document.querySelector('.left').classList.add('hover');
}
info_left.onmouseleave = function () {
	document.querySelector('.left').classList.remove('hover');
}

info_right.onmouseenter = function () {
	document.querySelector('.right').classList.add('hover');
}
info_right.onmouseleave = function () {
	document.querySelector('.right').classList.remove('hover');
 }



//* Закрываем открытое

let cls = document.getElementById('close');

cls.addEventListener('click', function () {
	document.querySelector('.up').classList.remove('hover');
	document.querySelector('.down').classList.remove('hover');
	document.querySelector('.left').classList.remove('hover');
	document.querySelector('.right').classList.remove('hover');
	cls.style.display = 'none'
});

function displayBlock() {
		cls.style.display = 'block';
}

let tag_up = document.getElementById('up-tag');
let tag_down = document.getElementById('down-tag');
let tag_left = document.getElementById('left-tag');
let tag_right = document.getElementById('right-tag');

tag_up.addEventListener('touchstart', displayBlock);
tag_down.addEventListener('touchstart', displayBlock);
tag_left.addEventListener('touchstart', displayBlock);
tag_right.addEventListener('touchstart', displayBlock);






