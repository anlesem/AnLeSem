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
		// this.header = document.getElementById('header');
		this.logo = document.getElementById('logo');
		this.info = document.getElementById('info');				// Задействован при анимации
		this.footer = document.getElementById('footer');
		this.cls = document.getElementById('close');				// Кнопка Закрыть в открытом блоке
		this.clsAll = document.getElementById('close-all');	// Кнопка Закрыть в подвале

		//!------------------------------------------- Блоки
		// blocks - основной объект, содержащий в себе массив данных о задействованных элементах
		// elementsOfBlock - вызов метода для формирования blocks
		this.blocks = [{ name: 'up' }, { name: 'down' }, { name: 'left' }, { name: 'right' }]
		this.elementsOfBlock();
	}

	//!---------------------------------------------- Методы
	// Формирование объекта blocks по свойству name через добавление соответствующих элементов сайта
	//		element.tag - добавление бирок
	// 	element.tag.dataset.name - присвоение биркам идентификатора, чтобы их распознавать при Событии
	// 	element.radio - добавление переключателей Контента в Блоках
	//		elementsOfRadio - вызов метода для формирования списка доступных переключателей:
	//			(element.name) - имя блока;
	//			(element.radio) - соответствующий имени блока массив переключателей;
	elementsOfBlock() {
		this.blocks.forEach(element => {
			// element.main = document.getElementById(element.name);						// родительский блок section
			element.tag = document.getElementById(`${element.name}-tag`);			// бирки
			// element.wrap = document.getElementById(`${element.name}__wrap`);		// блок с переключателями и картинками
			// element.info = document.getElementById(`info__${element.name}`);		// блок с текстом info

			element.tag.dataset.name = element.name;

			element.radio = [];
			this.elementsOfRadio(element.name, element.radio);
		});
	}

	// Формирование списка переключателей внутри объекта blocks по свойству name
	//			(name) - имя блока;
	//			(radio) - соответствующий имени блока массив переключателей;
	// 	Цикл с максимально возможным количеством переключателей в блоке. Данный метод позволяет указывать
	//			большее количество итераций, т.к. используется фильтр отсутствующих переключателей.
	//		radio[i] - поиск переключателя по его id, состоящего из привязки к имени блока и порядкового номера ("left-1")
	//		radio.pop() - фильтр отсутствующих переключателей
	elementsOfRadio(name, radio) {
		for (let i = 0; i < 3; i++) {
			radio[i] = document.getElementById(`${name}-${i + 1}`);
			if (!isNaN(radio[i])) radio.pop();
		}
	}
}