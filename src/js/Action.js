export default class Action {
	constructor(contentBlocks, animation, viewScreen) {

		// ссылка на данные активных элементов сайта
		this.contentBlocks = contentBlocks;
		// ссылка на данные анимации
		this.animation = animation;
		// ссылка на данные экрана
		this.viewScreen = viewScreen;

		// Параметр-флаг со значением name открытого Блока
		// Значение false говорит об отсутствии открытого Блока, что
		//		позволяет открыть Блок с контентом
		this.blockOpen = false;

		// Для установки задержки до появления кнопки "Перейти на лёгкую версию" при старте
		this.timerLogoId = null;
	}

	//!---------------------------------------------- Отслеживание
	// Отслеживание поведения пользователя
	// 	contentBlocks.blocks - нажатие на бирку
	// 	contentBlocks.cls - нажатие на кнопку закрыть
	// 	contentBlocks.footer - нажатие на кнопку закрыть (footer)
	startListened() {
		this.contentBlocks.logo.addEventListener('touchstart', () => this.addHoverLogoTouch());
		this.contentBlocks.logo.addEventListener('mouseover', () => this.addHoverLogo());
		this.contentBlocks.logo.addEventListener('mouseout', () => this.removeHoverLogo());

		this.contentBlocks.blocks.forEach(element => {
			element.tag.addEventListener('click', (event) => this.addHoverBlock(event));
		});
		this.contentBlocks.cls.addEventListener('click', () => this.removeHoverBlock());
		this.contentBlocks.footer.addEventListener('click', () => this.removeHoverBlock());
	}


	//!---------------------------------------------- Методы для логотипа
	addHoverLogoTouch() {

		if (!this.contentBlocks.logo.classList.contains('hover') && !document.querySelector('.logo-stop')) {
			this.contentBlocks.logo.insertAdjacentHTML('afterbegin', '<div class="logo-stop"></div>');
			setTimeout(() => {
				document.querySelector('.logo-stop').remove();
			}, 300);
		}
		this.addHoverLogo();
	}

	addHoverLogo() {
		if (!this.viewScreen.offScreen) {
			this.contentBlocks.logo.classList.add('hover');
			this.animation.removeAnimation();
		}
	}

	removeHoverLogo() {
		this.contentBlocks.logo.classList.remove('hover');
		this.animation.setAnimation();
	}

	//!---------------------------------------------- Методы для блоков
	// Активация отображения блока с контентом
	//		(event) - объект, на котором произошло Событие
	//		| blockOpen - закрытие открытого блока
	//		blockOpen - присвоение имени открываемого блока
	//		document.querySelector - добавление класса hover открываемому блоку
	//		contentBlocks.clsAll - отображение кнопки закрыть в footer
	//		animation.removeAnimation() - отключение анимации
	//		| viewScreen.fullScreen - в полноэкранном режиме гашение бирок
	addHoverBlock(event) {
		if (this.blockOpen) this.removeHoverBlock();

		this.blockOpen = event.currentTarget.dataset.name;
		document.querySelector(`.${this.blockOpen}`).classList.add('hover');
		this.contentBlocks.clsAll.classList.add('hover');
		this.animation.removeAnimation();

		if (this.viewScreen.fullScreen) {
			this.contentBlocks.blocks.forEach(element => {
				element.tag.style.opacity = '0.3';
				element.tag.querySelector('span').style.display = 'none';
			});
		}
	}

	// Закрытие блока с контентом
	//		| blockOpen - проверка открытого блока для предотвращения ошибки 
	//		document.querySelector - удаление класса hover у открытого блока
	//		contentBlocks.clsAll - скрытие кнопки закрыть в footer
	//		animation.setAnimation() - запуск анимации
	//		| viewScreen.fullScreen - в полноэкранном режиме возврат бирок
	//		blockOpen - переключение флага в состояние доступности для открытия
	removeHoverBlock() {
		if (this.blockOpen) {
			document.querySelector(`.${this.blockOpen}`).classList.remove('hover');
			this.contentBlocks.clsAll.classList.remove('hover');
			this.animation.setAnimation();
		}

		if (this.viewScreen.fullScreen) {
			this.contentBlocks.blocks.forEach(element => {
				element.tag.style.opacity = '';
				element.tag.querySelector('span').style.display = 'block';
			});
		}

		this.blockOpen = false;
	}
}