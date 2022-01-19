export default class View {
	constructor({ pcWidth, laptopWidth, proportion, breakHeight, slimScreenTag, screenOff }, blocks, animation) {
		this.pcWidth = pcWidth;
		this.laptopWidth = laptopWidth;
		this.proportion = proportion;
		this.breakHeight = breakHeight;
		this.slimScreenTag = slimScreenTag;
		this.screenOff = screenOff;

		this.blocks = blocks;
		this.animation = animation;

		// Для установки задержки до появления кнопки "Перейти на лёгкую версию" при старте
		this.timerId = null;

		// Флаг перехода на лёгкую версию, чтобы она не сбрасывалась при resize
		//? может проверить через класс одного из элементов
		this.versionLightFlag = false;
	}

	//! ------------------------------------------------- Загрузка
	// Включение полной версии как только, так сразу
	fullVersionOn(speed, delay) {
		// Задержка до появления кнопки "Перейти на лёгкую версию" при старте в секундах
		this.setButtonToLight(delay);

		// Включение полноценной версии только в случае подходящего разрешения экрана
		if (!this.offScreen) {

			// Перехват управления анимацией (заставкой) при загрузке из CSS в JS
			this.blocks.preloader.style.animation = "unset";

			document.querySelectorAll('.light').forEach((element) => {
				element.classList.add('normal');
				element.classList.remove('light');
			});
		}
		// Изменение предупредительной надписи в лёгкой версии
		this.blocks.warning.innerHTML = "Расширение экрана не позволяет корректно отобразить всё оформление страницы.";

		// Отслеживание окончания загрузки страницы
		window.onload = () => {
			this.onload(speed);
		};
	}

	// Задержка до появления кнопки "Перейти на лёгкую версию" при старте
	setButtonToLight(delay) {
		this.timerId = setTimeout(() => {
			this.blocks.toLight.style.display = 'block';
		}, delay);
	}

	// Отслеживание окончания загрузки страницы
	onload(speed) {

		// Удаление таймера кнопки "Перейти на лёгкую версию" при старте по факту загрузки страницы
		clearTimeout(this.timerId);

		setTimeout(() => {
			this.animation.removePreloader(speed);	// Отключение анимации (заставки) за (ms)
		}, 1000);
	}

	//! ------------------------------------------------- Изменение размеров экрана
}