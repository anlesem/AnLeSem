export default class Action {
	constructor(contentBlocks, animation) {

		// ссылка на данные активных элементов сайта
		this.contentBlocks = contentBlocks;
		// ссылка на данные анимации
		this.animation = animation;

		// Параметр-флаг со значением name открытого Блока
		// Значение false говорит об отсутствии открытого Блока, что
		//		позволяет открыть Блок с контентом
		this.blockOpen = false;
	}

	//!---------------------------------------------- Методы
	// Отслеживание поведения пользователя
	// 	contentBlocks.blocks - нажатие на бирку
	// 	contentBlocks.cls - нажатие на кнопку закрыть
	// 	contentBlocks.footer - нажатие на кнопку закрыть (footer)
	startListened() {
		this.contentBlocks.blocks.forEach(element => {
			element.tag.addEventListener('click', (event) => this.addHover(event));
		});
		this.contentBlocks.cls.addEventListener('click', () => this.removeHover());
		this.contentBlocks.footer.addEventListener('click', () => this.removeHover());
	}

	// Активация отображения блока с контентом
	//		(event) - объект, на котором произошло Событие
	//		(!blockOpen) - блокировка открытия ещё одного блока
	//		blockOpen - присвоение имени открываемого блока
	//		document.querySelector - добавление класса hover открываемому блоку
	//		contentBlocks.clsAll - отображение кнопки закрыть в footer
	//		animation.removeAnimation() - отключение анимации
	addHover(event) {
		if (!this.blockOpen) {
			this.blockOpen = event.currentTarget.dataset.name;
			document.querySelector(`.${this.blockOpen}`).classList.add('hover');
			this.contentBlocks.clsAll.classList.add('hover');
			this.animation.removeAnimation();
		}
	}

	// Закрытие блока с контентом
	//		document.querySelector - удаление класса hover у открытого блока
	//		contentBlocks.clsAll - скрытие кнопки закрыть в footer
	//		animation.setAnimation() - запуск анимации
	//		blockOpen - переключение флага в состояние доступности для открытия
	removeHover() {
		document.querySelector(`.${this.blockOpen}`).classList.remove('hover');
		this.contentBlocks.clsAll.classList.remove('hover');
		this.animation.setAnimation();
		// showTitleTag();																	// Включение бирок
		this.blockOpen = false;
	}
}