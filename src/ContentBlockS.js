export default class ContentBlockS {
	constructor() {
		//!------------------------------------------- Сектор загрузки
		// Обёртка при загрузке, которая закрывает собой контент
		this.preloader = document.getElementById('preloader')

		// Надпись с предложением перейти на лёгкую версию при долгой загрузке
		this.toLight = document.getElementById('to-light');

		// Надпись с предупреждениями в случае лёгкой версии
		this.warning = document.getElementById('warning');

		//!------------------------------------------- Основные элементы
		this.header = document.getElementById('header');
		this.logo = document.getElementById('logo');
		this.info = document.getElementById('info');				// Задействован при анимации
		this.footer = document.getElementById('footer');
		this.cls = document.getElementById('close');				// Кнопка Закрыть в открытом блоке
		this.clsAll = document.getElementById('close-all');	// Кнопка Закрыть в подвале

		//!------------------------------------------- Блоки
		this.block = [{ name: 'up' }, { name: 'down' }, { name: 'left' }, { name: 'right' }]
		this.elementsOfBlock(this.block);
	}

	elementsOfBlock(name) {
		name.forEach(element => {
			// element.main = document.getElementById(element.name);						// родительский блок section
			element.tag = document.getElementById(`${element.name}-tag`);			// бирки
			element.wrap = document.getElementById(`${element.name}__wrap`);		// блок с переключателями и картинками
			element.info = document.getElementById(`info__${element.name}`);		// блок с текстом info

			element.tag.dataset.name = element.name;

			element.radio = [];
			this.elementsOfRadio(element.name, element.radio);
		});
	}

	elementsOfRadio(name, radio) {
		for (let i = 0; i < 3; i++) {
			radio[i] = document.getElementById(`${name}-${i + 1}`);
			if (!isNaN(radio[i])) radio.pop();
		}
	}
}