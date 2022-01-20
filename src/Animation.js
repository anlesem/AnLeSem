export default class Animation {
	constructor({ intervals, delay }, blocks) {
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

	// Отключение всей анимации
	removeAnimation() {
		console.log('enter removeAnimation()');

		// info.style.animation = "unset";
		// info_up.style.animation = "unset";
		// logo.style.animation = "unset";
		// leftTag.style.animation = 'unset';
		// rightTag.style.animation = 'unset';
		// upTag.style.animation = 'unset';
		// downTag.style.animation = 'unset';
	}

	// Отключение всей анимации
	setAnimation() {
		console.log('enter setAnimation()');
		// if (version) {
		// 	let intervals = 8;										// Период длительности анимации
		// 	let delay = 8;												// Общая задержка при старте, чтобы не отвлекала и не мешала активному использованию						

		// 	info.style.animation = 'info-opacity infinite ' + intervals + 's ' + delay + 's linear';
		// 	info_up.style.animation = 'info-text infinite ' + intervals * 3 + 's ' + delay + 's linear';
		// 	logo.style.animation = 'circle infinite ' + intervals + 's ' + (delay + intervals / 2) + 's linear';
		// 	if (slimScreen) {
		// 		tag = 'slim';											// Переключение флага размера бирок
		// 		upTag.style.animation = 'rhythm-tag-vert-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		// 		downTag.style.animation = 'rhythm-tag-vert-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		// 		leftTag.style.animation = 'rhythm-tag-horz-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		// 		rightTag.style.animation = 'rhythm-tag-horz-slim infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		// 	} else {
		// 		tag = 'normal';										// Переключение флага размера бирок
		// 		leftTag.style.animation = 'rhythm-tag-horz infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		// 		rightTag.style.animation = 'rhythm-tag-horz infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		// 		upTag.style.animation = 'rhythm-tag-vert infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		// 		downTag.style.animation = 'rhythm-tag-vert infinite ' + intervals + 's ' + (delay + intervals) + 's linear';
		// 	}
		// }
	}
}