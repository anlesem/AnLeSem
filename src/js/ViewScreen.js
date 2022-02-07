// Модуль отслеживает и производит преобразования отображения сайта в зависимости от параметров экрана и типа устройств ввода

export default class ViewScreen {
	constructor(data, animation) {
		this.data = data;
		this.animation = animation;

		// Для установки задержки до появления кнопки "Перейти на лёгкую версию" при старте
		this.timerIdLight = null;

		// Хранит используемое устройство ввода для появления "Закрыть"
		this.mouse = null;

	}

	//! ------------------------------------------------- Загрузка
	// onload Стартовая функция. Задача - правильно распределить поведение в зависимости от условий.
	// this.data.preloader - Перехват управления анимацией (заставкой) при загрузке из CSS в JS, 
	// 	чтобы остановить её исчезновение по умолчанию через 3 сек в случае лёгкой версии
	// this.data.toLight - Отслеживание нажатия на кнопку "Перейти на лёгкую версию". При событии:
	//		this.userToLight - изменение Флага для блокировки полной версии;
	//		this.data.preloader - отключение анимации (заставки);
	// 	this.data.warning - изменение предупредительной надписи в лёгкой версии на случай неподходящего 
	//			разрешения экрана (по умолчанию предупреждение указывает на отсутствие JS)
	// this.setButtonToLight - Установка задержки до появления кнопки "Перейти на лёгкую версию" 
	//		при старте, чтобы надпись не мелькала при нормальной загрузке
	//		(delay) - задержка, устанавливается при вызове (onload)
	// this.fullScreenMedia - Определение параметров экрана для установки первоначальных параметров отображения
	onload(delay) {
		this.data.preloader.style.animation = "";

		this.data.toLight.addEventListener('click', () => {
			this.data.settings.userToLight = true;
			this.data.preloader.style.display = 'none';
			this.data.warning.innerHTML = "Имеет смысл перегрузить страницу, когда скорость интернет-соединения станет выше.";
		});

		this.setButtonToLight(delay);

		this.fullScreenMedia();
		this.slimScreenMedia();
		this.offScreenMedia();
	}

	// Задержка до появления кнопки "Перейти на лёгкую версию" при старте
	// - Задание именованного таймера для возможности его отключения
	// - Отображение кнопки "Перейти на лёгкую версию"
	setButtonToLight(delay) {
		this.timerIdLight = setTimeout(() => {
			this.data.toLight.style.display = 'block';
		}, delay);
	}

	// По окончании загрузки страницы активация полной версии сайта, при:
	// 	- отсутствии нажатия на кнопку "Перейти на лёгкую версию";
	//		- разрешении экрана больше, чем (offScreen)
	// - Отключение кнопки "Перейти на лёгкую версию"
	// - Удаление таймера кнопки "Перейти на лёгкую версию" при старте по факту загрузки страницы
	// - Активация полной версии сайта
	// - Изменение предупредительной надписи в лёгкой версии на случай неподходящего разрешения экрана
	//		(по умолчанию предупреждение указывает на отсутствие JS)
	// - Отслеживание Устройства ввода
	fullVersionOn() {
		if (!this.data.settings.userToLight) {
			this.data.toLight.style.display = 'none';
			clearTimeout(this.timerIdLight);
			if (!this.data.offScreen) {
				this.showFullContent();
			}
			this.data.warning.innerHTML = "Расширение экрана не позволяет корректно отобразить всё оформление страницы.";
			this.typeOfPointer();
			setTimeout(() => {
				this.animation.removePreloader();
			}, 1000);

			return true;
		}
		return false;
	}

	// Отображение полноценного контента
	showFullContent() {
		document.querySelectorAll('.light').forEach((element) => {
			element.classList.remove('light');
		});
	}

	//! ------------------------------------------------- Определение размеров экрана
	// Медиа запросы:
	// - полноэкранный режим
	// - узкий экран
	// - экран только для лёгкой версии
	fullScreenMedia() {
		if ((window.innerWidth < this.data.settings.pcWidth && window.innerWidth / window.innerHeight > this.data.settings.proportion) ||
			window.innerHeight < this.data.settings.breakHeight || window.innerWidth < this.data.settings.laptopWidth) this.data.fullScreen = true;
		else this.data.fullScreen = false;
	}
	slimScreenMedia() {
		if ((window.innerHeight < 475 && window.innerWidth / window.innerHeight < this.data.settings.proportion) ||
			window.innerHeight < this.data.settings.slimScreenTag || window.innerWidth < this.data.settings.slimScreenTag) this.data.slimScreen = true;
		else this.data.slimScreen = false;
	}
	offScreenMedia() {
		if ((window.innerHeight < 375 && window.innerWidth / window.innerHeight < this.data.settings.proportion) ||
			window.innerHeight < this.data.settings.offWidth || window.innerWidth < this.data.settings.offWidth) this.data.offScreen = true;
		else this.data.offScreen = false;
	}

	//! ------------------------------------------------- Изменение размеров экрана
	//	...Media() - Переопределение медиа запросов
	// |offScreen - Перезагрузка страницы в лёгкую версию при переходе в сверх узкий режим
	// 				и отображение контента при переходе к нормальной ширине экрана
	// |data.contentBlockActive - в случае открытого блока с контентом
	//		|fullScreen - гашение или отображение бирок в зависимости от режима открытого блока (полноэкранный)
	//						- перезапуск анимации для проверки правильных пропорций бирок
	//	closeButton() - Переключение отображения кнопок "Закрыть" и "Закрыть всё"
	resizeScreen() {
		this.fullScreenMedia();
		this.slimScreenMedia();
		this.offScreenMedia();

		if (this.data.offScreen) location.reload();
		else this.showFullContent();

		if (this.data.contentBlockActive) {
			if (this.data.fullScreen) this.hideTags();
			else this.showTags();
		} else {
			this.animation.removeAnimation();
			this.animation.setAnimation();
		}

		this.closeButton(this.mouse);
	}

	//! ------------------------------------------------- Устройства ввода
	typeOfPointer() {
		// Отслеживание. Тип устройства ввода
		// Отслеживание. Тип устройства ввода. Касание / нажатие (преимущественно для touch)
		document.addEventListener('pointerdown', (event) => {
			switch (event.pointerType) {
				case 'mouse':
					this.mouse = true;
					this.closeButton(this.mouse);
					break;
				case 'pen':
					this.mouse = false;
					this.closeButton(this.mouse);
					break;
				case 'touch':
					this.mouse = false;
					this.closeButton(this.mouse);
					break;
				default:
			}
		}, false);

		// Отслеживание. Тип устройства ввода. Движение (преимущественно для mouse)
		document.addEventListener('pointermove', (event) => {
			switch (event.pointerType) {
				case 'mouse':
					this.mouse = true;
					this.closeButton(this.mouse);
					break;
				case 'pen':
					this.mouse = false;
					this.closeButton(this.mouse);
					break;
				case 'touch':
					this.mouse = false;
					this.closeButton(this.mouse);
					break;
				default:
			}
		}, false);
	}

	closeButton(mouse) {
		if (!mouse && this.data.fullScreen) {						// Для мышки и полноэкранного режима
			this.data.cls.style.visibility = 'hidden';
			this.data.clsAll.style.visibility = 'visible';
		} else {														// Для больших экранов при любом устройстве ввода
			this.data.cls.style.visibility = 'visible';
			this.data.clsAll.style.visibility = 'hidden';
		}
	}

	//! ------------------------------------------------- Бирки
	// Гашение бирок при открытом блоке с контентом
	hideTags() {
		this.data.contentBlocks.forEach(element => {
			element.tag.style.opacity = '0.2';
			element.tag.querySelector('span').style.display = 'none';
		});
	}

	// Нормальное бирок
	showTags() {
		this.data.contentBlocks.forEach(element => {
			element.tag.style.opacity = '';
			element.tag.querySelector('span').style.display = 'block';
		});
	}
}