export default class Animation {
	constructor({ intervals, delay, speed }, contentBlocks) {

		// Данные из index.js/settings
		this.intervals = intervals;
		this.delay = delay;
		this.speed = speed;

		// ссылка на данные активных элементов сайта
		this.contentBlocks = contentBlocks;
	}

	//!---------------------------------------------- Методы
	// Отключение анимации (заставки) при загрузке страницы
	// 	contentBlocks.preloader - отключение заставки
	// 	contentBlocks.blocks.forEach(element) - отображение бирок
	removePreloader() {
		this.contentBlocks.preloader.style.animation = `preloader ${this.speed}ms linear forwards`;

		this.contentBlocks.blocks.forEach(element => {
			element.tag.style.animation = `load-tag-${element.name} ${this.speed}ms linear forwards`;
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