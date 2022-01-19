export default class Animation {
	constructor(intervals, delay, blocks) {
		this.intervals = intervals;
		this.delay = delay;

		this.blocks = blocks;
	}

	// Отключение анимации (заставки) при загрузке страницы за (ms)
	removePreloader(speed) {

		// Отключение заставки
		this.blocks.preloader.style.animation = `preloader ${speed}ms linear forwards`;

		// Отображение бирок
		this.blocks.block.forEach(element => {
			element.tag.style.animation = `load-tag-${element.name} ${speed}ms linear forwards`;
		});
	}
}