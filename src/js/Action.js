// Модуль отслеживает поведение пользователя на сайте в части управления контентом.

export default class Action {
	constructor(dataElements, animation, viewScreen) {

		// ссылка на данные активных элементов сайта
		this.dataElements = dataElements;
		// ссылка на данные анимации
		this.animation = animation;
		// ссылка на данные экрана
		this.viewScreen = viewScreen;
	}

	//!---------------------------------------------- Отслеживание
	// Отслеживание поведения пользователя
	// 	dataElements.logo - наведение на логотип
	// 	dataElements.contentBlocks - нажатие на бирку
	// 	dataElements.cls - нажатие на кнопку закрыть
	// 	dataElements.footer - нажатие на кнопку закрыть (footer)
	startListened() {
		this.dataElements.logo.addEventListener('mouseover', () => this.openLogo());
		this.dataElements.logo.addEventListener('mouseout', () => this.closeLogo());

		this.dataElements.contentBlocks.forEach(element => {
			element.tag.addEventListener('click', (event) => this.openContentBlock(event));
		});
		this.dataElements.cls.addEventListener('click', () => this.closeContentBlock());
		this.dataElements.footer.addEventListener('click', () => this.closeContentBlock());
	}


	//!---------------------------------------------- Методы для логотипа
	// Открытие визитной карточки внутри логотипа. Есть дополнение для touch.
	//		|viewScreen.offScreen - блокировка наведения при совсем узких экранах
	//		document.querySelector - добавление класса hover
	//		animation.removeAnimation() - отключение анимации 	
	openLogo() {
		if (!this.viewScreen.offScreen) {
			this.dataElements.logo.classList.add('hover');
			this.animation.removeAnimation();
		}
	}

	// Закрытие визитной карточки внутри логотипа.
	//		document.querySelector - удаление класса hover у открытого блока
	//		animation.setAnimation() - запуск анимации
	closeLogo() {
		this.dataElements.logo.classList.remove('hover');
		this.animation.setAnimation();
	}

	//!---------------------------------------------- Методы для блоков
	// Активация отображения блока с контентом
	//		(event) - объект, на котором произошло Событие
	//		| dataElements.contentBlockActive - закрытие открытого блока
	//		dataElements.contentBlockActive - присвоение имени открываемого блока
	//		document.querySelector - добавление класса hover открываемому блоку
	//		dataElements.clsAll - отображение кнопки закрыть в footer
	//		animation.removeAnimation() - отключение анимации
	//		| viewScreen.fullScreen - в полноэкранном режиме гашение бирок
	openContentBlock(event) {
		if (this.dataElements.contentBlockActive) this.closeContentBlock();

		this.dataElements.contentBlockActive = event.currentTarget.dataset.name;
		document.querySelector(`.${this.dataElements.contentBlockActive}`).classList.add('hover');
		this.dataElements.clsAll.classList.add('hover');
		this.animation.removeAnimation();

		if (this.viewScreen.fullScreen) {
			this.viewScreen.hideTags();
		}
	}

	// Закрытие блока с контентом
	//		| dataElements.contentBlockActive - проверка открытого блока для предотвращения ошибки 
	//		document.querySelector - удаление класса hover у открытого блока
	//		dataElements.clsAll - скрытие кнопки закрыть в footer
	//		animation.setAnimation() - запуск анимации
	//		| viewScreen.fullScreen - в полноэкранном режиме возврат бирок
	//		dataElements.contentBlockActive - переключение флага в состояние доступности для открытия
	closeContentBlock() {
		if (this.dataElements.contentBlockActive) {
			document.querySelector(`.${this.dataElements.contentBlockActive}`).classList.remove('hover');
			this.dataElements.clsAll.classList.remove('hover');
			this.animation.setAnimation();
		}

		if (this.viewScreen.fullScreen) {
			this.viewScreen.showTags();
		}

		this.dataElements.contentBlockActive = false;
	}
}