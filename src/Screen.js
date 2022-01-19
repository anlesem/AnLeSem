export default class Screen {
	constructor(pcWidth, laptopWidth, proportion, breakHeight, slimScreenTag, screenOff, blocks, animation) {
		this.pcWidth = pcWidth;
		this.laptopWidth = laptopWidth;
		this.proportion = proportion;
		this.breakHeight = breakHeight;
		this.slimScreenTag = slimScreenTag;
		this.screenOff = screenOff;

		this.blocks = blocks;
		this.animation = animation;

		this.loadComplete = false;
	}

	// Включение полной версии как только, так сразу
	fullVersionOn() {
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

		// Задержка до появления кнопки "Перейти на лёгкую версию" при старте в секундах
		this.setButtonToLight(3);
	}

	// Задержка до появления кнопки "Перейти на лёгкую версию" при старте в секундах
	setButtonToLight(timeOut) {
		let t = 0;
		let timerId = setInterval(() => {
			if (this.loadComplete) clearInterval(timerId);		// Удаление таймера по факту загрузки страницы
			t++;
			if (t == timeOut) this.blocks.toLight.style.display = 'block';
		}, 1000);
	}

	onload() {
		this.loadComplete = true;

		setTimeout(() => {
			this.animation.removePreloader(300);	// Отключение анимации (заставки) за (ms)
		}, 1000);
	}
}