
// показ и скрытие при наведении 
function addHover(block) {
	document.querySelector(block).classList.add('hover');
	cls.style.fill = '#aaa';
	cls.style.opacity = '1';
	forMobile('оff');
}

// Закрытие всего открытого
function removeAll() {
	forMobile();
	cls.style.fill = 'rgba(0, 0, 0, .7)'
	cls.style.opacity = '0.5'
	document.querySelector('.up').classList.remove('hover');
	document.querySelector('.down').classList.remove('hover');
	document.querySelector('.left').classList.remove('hover');
	document.querySelector('.right').classList.remove('hover');
}


// дополнение для мобильных устройств (скрытие/показ наименований бирок)
function forMobile(condition) {
	// значение ширины экрана
	let screenView = document.documentElement.scrollWidth;

	if (screenView < 768) {
		let elements = document.querySelectorAll('.title-tag');
		for (let elem of elements) {
			// alert(elem.innerHTML);
			if (condition == 'оff')
				elem.classList.add('hover');
			else elem.classList.remove('hover');
		 } 
	}
}


//* ----------------------------------------------------------------

// Наведение в ПК версии

let info_up = document.getElementById('info__up');
let info_down = document.getElementById('info__down');
let info_left = document.getElementById('info__left');
let info_right = document.getElementById('info__right');

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

tag_up.addEventListener('touchstart', () => addHover('.up'));
tag_down.addEventListener('touchstart', () => addHover('.down'));
tag_left.addEventListener('touchstart', () => addHover('.left'));
tag_right.addEventListener('touchstart', () => addHover('.right'));

// Закрытие в мобильной версии

cls.addEventListener('click', removeAll);
header.addEventListener('click', removeAll);
header.addEventListener('mouseover', removeAll);
footer.addEventListener('click', removeAll);
footer.addEventListener('mouseover', removeAll);








