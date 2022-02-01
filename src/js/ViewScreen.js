export default class ViewScreen {
	constructor({ pcWidth, laptopWidth, offWidth, proportion, breakHeight, slimScreenTag, userToLight }, blocks, animation) {
		this.pcWidth = pcWidth;
		this.laptopWidth = laptopWidth;
		this.offWidth = offWidth;
		this.proportion = proportion;
		this.breakHeight = breakHeight;
		this.slimScreenTag = slimScreenTag;

		this.userToLight = userToLight;

		this.blocks = blocks;
		this.animation = animation;

		// Для установки задержки до появления кнопки "Перейти на лёгкую версию" при старте
		this.timerId = null;

		// Медиа запросы  (следует уточнять в _mixin.scss). Полный, узкий или совсем узкий экран. (window.matchMedia не всегда работает)
		this.fullScreen = null;
		this.slimScreen = null;
		this.offScreen = null;

		// Хранит используемое устройство ввода для появления "Закрыть"
		this.mouse = null;

	}

	//! ------------------------------------------------- Загрузка
	// onload Стартовая функция. Задача - правильно распределить поведение в зависимости от условий.
	// this.blocks.preloader - Перехват управления анимацией (заставкой) при загрузке из CSS в JS, 
	// 	чтобы остановить её исчезновение по умолчанию через 3 сек в случае лёгкой версии
	// this.blocks.toLight - Отслеживание нажатия на кнопку "Перейти на лёгкую версию". При событии:
	//		this.userToLight - изменение Флага для блокировки полной версии;
	//		this.blocks.preloader - отключение анимации (заставки);
	// 	this.blocks.warning - изменение предупредительной надписи в лёгкой версии на случай неподходящего 
	//			разрешения экрана (по умолчанию предупреждение указывает на отсутствие JS)
	// this.setButtonToLight - Установка задержки до появления кнопки "Перейти на лёгкую версию" 
	//		при старте, чтобы надпись не мелькала при нормальной загрузке
	//		(delay) - задержка, устанавливается при вызове (onload)
	// this.fullScreenMedia - Определение параметров экрана для установки первоначальных параметров отображения
	onload(delay) {
		this.blocks.preloader.style.animation = "unset";

		this.blocks.toLight.addEventListener('click', () => {
			this.userToLight = true;
			this.blocks.preloader.style.display = 'none';
			this.blocks.warning.innerHTML = "Имеет смысл перегрузить страницу, когда скорость интернет-соединения станет выше.";
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
		this.timerId = setTimeout(() => {
			this.blocks.toLight.style.display = 'block';
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
		if (!this.userToLight) {

			this.blocks.toLight.style.display = 'none';
			clearTimeout(this.timerId);

			if (!this.offScreen) {
				document.querySelectorAll('.light').forEach((element) => {
					element.classList.remove('light');
				});
			}
			this.blocks.warning.innerHTML = "Расширение экрана не позволяет корректно отобразить всё оформление страницы.";
			this.typeOfPointer();
			setTimeout(() => {
				this.animation.removePreloader();
			}, 1000);

			return true;
		}
		return false;
	}

	//! ------------------------------------------------- Изменение размеров экрана
	// Медиа запросы:
	// - полноэкранный режим
	// - узкий экран
	// - экран только для лёгкой версии
	fullScreenMedia() {
		if ((window.innerWidth < this.pcWidth && window.innerWidth / window.innerHeight > this.proportion) ||
			window.innerHeight < this.breakHeight || window.innerWidth < this.laptopWidth) this.fullScreen = true;
		else this.fullScreen = false;
	}
	slimScreenMedia() {
		if ((window.innerHeight < 475 && window.innerWidth / window.innerHeight < this.proportion) ||
			window.innerHeight < this.slimScreenTag || window.innerWidth < this.slimScreenTag) this.slimScreen = true;
		else this.slimScreen = false;
	}
	offScreenMedia() {
		if ((window.innerHeight < 375 && window.innerWidth / window.innerHeight < this.proportion) ||
			window.innerHeight < this.offWidth || window.innerWidth < this.offWidth) this.offScreen = true;
		else this.offScreen = false;
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
		if (!mouse && this.fullScreen) {						// Для мышки и полноэкранного режима
			this.blocks.cls.style.visibility = 'hidden';
			this.blocks.clsAll.style.visibility = 'visible';
		} else {														// Для больших экранов при любом устройстве ввода
			this.blocks.cls.style.visibility = 'visible';
			this.blocks.clsAll.style.visibility = 'hidden';
		}
	}
}