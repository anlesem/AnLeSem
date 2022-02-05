export default class Animation {
	constructor({ intervals, delay, speed }, dataElements) {

		// Данные из index.js/settings
		this.intervals = intervals;
		this.delay = delay;
		this.speed = speed;

		// ссылка на данные активных элементов сайта
		this.dataElements = dataElements;
	}

	//!---------------------------------------------- Методы
	// Отключение анимации (заставки) при загрузке страницы
	// 	dataElements.preloader - отключение заставки
	// 	dataElements.contentBlocks.forEach(element) - отображение бирок
	//		setTimeout() - отключение анимации отображения бирок, которая 
	//			иначе висит и блокирует изменения opacity
	//			- запуск всей анимации
	removePreloader() {
		this.dataElements.preloader.style.animation = `preloader ${this.speed}ms linear forwards`;

		this.dataElements.contentBlocks.forEach(element => {
			element.tag.style.animation = `load-tag-${element.name} ${this.speed}ms linear forwards`;
		});

		setTimeout(() => {
			this.removeAnimationTag();
			this.setAnimation();
		}, this.speed)
	}

	// Включение всей анимации
	setAnimation() {
		this.dataElements.info.style.animation = `info-opacity infinite ${this.intervals}s ${this.delay}s linear`;
		this.dataElements.infoUp.style.animation = `info-text infinite ${this.intervals * 3}s ${this.delay}s linear`;
		this.dataElements.logo.style.animation = `circle infinite ${this.intervals}s ${this.intervals / 2 + this.delay}s linear`;
		if (this.dataElements.slimScreen) {
			this.dataElements.contentBlocks[0].tag.style.animation = `rhythm-tag-vert-slim infinite ${this.intervals}s ${this.intervals + this.delay}s linear`;
			this.dataElements.contentBlocks[1].tag.style.animation = `rhythm-tag-vert-slim infinite ${this.intervals}s ${this.intervals + this.delay}s linear`;
			this.dataElements.contentBlocks[2].tag.style.animation = `rhythm-tag-horz-slim infinite ${this.intervals}s ${this.intervals + this.delay}s linear`;
			this.dataElements.contentBlocks[3].tag.style.animation = `rhythm-tag-horz-slim infinite ${this.intervals}s ${this.intervals + this.delay}s linear`;
		} else {
			this.dataElements.contentBlocks[0].tag.style.animation = `rhythm-tag-vert infinite ${this.intervals}s ${this.intervals + this.delay}s linear`;
			this.dataElements.contentBlocks[1].tag.style.animation = `rhythm-tag-vert infinite ${this.intervals}s ${this.intervals + this.delay}s linear`;
			this.dataElements.contentBlocks[2].tag.style.animation = `rhythm-tag-horz infinite ${this.intervals}s ${this.intervals + this.delay}s linear`;
			this.dataElements.contentBlocks[3].tag.style.animation = `rhythm-tag-horz infinite ${this.intervals}s ${this.intervals + this.delay}s linear`;
		}
	}

	// Отключение всей анимации
	removeAnimation() {
		this.dataElements.info.style.animation = "";
		this.dataElements.infoUp.style.animation = "";
		this.dataElements.logo.style.animation = "";
		this.removeAnimationTag();
	}

	// Отключение анимации бирок
	removeAnimationTag() {
		this.dataElements.contentBlocks.forEach(element => {
			element.tag.style.animation = "";
		});
	}
}