// Модуль отслеживает поведение пользователя на сайте в части управления контентом.

export default class Action {
	constructor(data, animation, viewScreen) {
		this.data = data;
		this.animation = animation;
		this.viewScreen = viewScreen;
	}

	//!---------------------------------------------- Отслеживание
	// Отслеживание поведения пользователя
	// 	data.logo - наведение на логотип
	// 	data.contentBlocks - нажатие на бирку
	// 	data.cls - нажатие на кнопку закрыть
	// 	data.footer - нажатие на кнопку закрыть (footer)
	// 	data.contentBlocks[0].radio - прокрутка наверх при переключении статей
	startListened() {
		this.data.logo.addEventListener('mouseover', () => this.openLogo());
		this.data.logo.addEventListener('mouseout', () => this.closeLogo());

		this.data.contentBlocks.forEach(element => {
			element.tag.addEventListener('click', (event) => this.openContentBlock(event));
		});

		this.data.cls.addEventListener('click', () => this.closeContentBlock());
		this.data.footer.addEventListener('click', () => this.closeContentBlock());

		this.data.contentBlocks[0].radio.forEach(element => {
			element.addEventListener('click', () => this.scrollUp());
		});
	}


	//!---------------------------------------------- Методы для логотипа
	// Открытие визитной карточки внутри логотипа. Есть дополнение для touch.
	//		|viewScreen.offScreen - блокировка наведения при совсем узких экранах
	//		document.querySelector - добавление класса hover
	//		animation.removeAnimation() - отключение анимации 	
	openLogo() {
		if (!this.data.offScreen) {
			this.data.logo.classList.add('hover');
			this.animation.removeAnimation();
		}
	}

	// Закрытие визитной карточки внутри логотипа.
	//		document.querySelector - удаление класса hover у открытого блока
	//		animation.setAnimation() - запуск анимации
	closeLogo() {
		this.data.logo.classList.remove('hover');
		this.animation.setAnimation();
	}

	//!---------------------------------------------- Методы для блоков
	// Активация отображения блока с контентом
	//		(event) - объект, на котором произошло Событие
	//		| data.contentBlockActive - закрытие открытого блока
	//		data.contentBlockActive - присвоение имени открываемого блока в зависимости 
	//			откуда пришло событие (нажатие или жест)
	//		document.querySelector - добавление класса hover открываемому блоку
	//		data.clsAll - отображение кнопки закрыть в footer
	//		animation.removeAnimation() - отключение анимации
	//		| viewScreen.fullScreen - в полноэкранном режиме гашение бирок
	openContentBlock(event, name) {
		if (this.data.contentBlockActive) this.closeContentBlock();

		if (event.currentTarget) this.data.contentBlockActive = event.currentTarget.dataset.name;
		else this.data.contentBlockActive = name;

		document.querySelector(`.${this.data.contentBlockActive}`).classList.add('hover');
		this.data.clsAll.classList.add('hover');
		this.animation.removeAnimation();

		if (this.data.fullScreen) {
			this.viewScreen.hideTags();
		}
	}

	// Закрытие блока с контентом
	//		| data.contentBlockActive - проверка открытого блока для предотвращения ошибки 
	//		document.querySelector - удаление класса hover у открытого блока
	//		data.clsAll - скрытие кнопки закрыть в footer
	//		animation.setAnimation() - запуск анимации
	//		| viewScreen.fullScreen - в полноэкранном режиме возврат бирок
	//		data.contentBlockActive - переключение флага в состояние доступности для открытия
	closeContentBlock() {
		if (this.data.contentBlockActive) {
			document.querySelector(`.${this.data.contentBlockActive}`).classList.remove('hover');
			this.data.clsAll.classList.remove('hover');
			this.animation.setAnimation();
		}

		if (this.data.fullScreen) {
			this.viewScreen.showTags();
		}

		this.data.contentBlockActive = false;
	}

	// Прокрутка наверх в верхнем блоке при переключении между вкладками
	scrollUp() {
		this.data.infoUp.scrollTop = 0;
	}
}