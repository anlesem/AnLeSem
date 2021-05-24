
// показ и скрытие при наведении 
function addHover(block) {
	removeAll();
	viewClose();
	mobile('add');
	document.querySelector(block).classList.add('hover');
}

function removeHover(block) {
	document.querySelector(block).classList.remove('hover');
}


// Настройка отображения кнопки закрыть для мобильных устройств 
function viewClose() {
	cls.style.fill = '#aaa';
	cls.style.opacity = '1';
}

// Закрытие всего открытого

function removeAll() {
	mobile('remove');
	document.querySelector('.up').classList.remove('hover');
	document.querySelector('.down').classList.remove('hover');
	document.querySelector('.left').classList.remove('hover');
	document.querySelector('.right').classList.remove('hover');
	cls.style.fill = 'rgba(0, 0, 0, .7)'
	cls.style.opacity = '0.5'
}

// дополнение для мобильных устройств (скрытие/показ наименований бирок)
function mobile (type) {
	if (screenView < 768) {
		let elements = document.querySelectorAll('.title-tag');
		for (let elem of elements) {
			// alert(elem.innerHTML);
			if (type == 'add')
				elem.classList.add('hover');
			else elem.classList.remove('hover');
		 } 
	}
}


//* ----------------------------------------------------------------
// значение ширины экрана
var screenView = document.documentElement.scrollWidth;

// Наведение в ПК версии

let info_up = document.getElementById('info__up');
let info_down = document.getElementById('info__down');
let info_left = document.getElementById('info__left');
let info_right = document.getElementById('info__right');

info_up.addEventListener('mouseover', () => addHover('.up'));
info_down.addEventListener('mouseover', () => addHover('.down'));
info_left.addEventListener('mouseover', () => addHover('.left'));
info_right.addEventListener('mouseover', () => addHover('.right'));

info_up.addEventListener('mouseout', () => removeHover('.up'));
info_down.addEventListener('mouseout', () => removeHover('.down'));
info_left.addEventListener('mouseout', () => removeHover('.left'));
info_right.addEventListener('mouseout', () => removeHover('.right'));



// Наведение в мобильной версии

let cls = document.getElementById('close');
let tag_up = document.getElementById('up-tag');
let tag_down = document.getElementById('down-tag');
let tag_left = document.getElementById('left-tag');
let tag_right = document.getElementById('right-tag');
let header = document.getElementById('header');

tag_up.addEventListener('touchstart', () => addHover('.up'));
tag_down.addEventListener('touchstart', () => addHover('.down'));
tag_left.addEventListener('touchstart', () => addHover('.left'));
tag_right.addEventListener('touchstart', () => addHover('.right'));


// Закрытие в мобильной версии

cls.addEventListener('click', removeAll);
header.addEventListener('click', removeAll);








