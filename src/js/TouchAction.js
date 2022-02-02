export default class TouchAction {
	constructor(contentBlocks, action) {

		// ссылки
		this.contentBlocks = contentBlocks;
		this.action = action;

		// Параметры движения
		this.initialPoint = null;				// начало движения
		this.finalPoint = null;					// конец движения
		this.scrollPoint = null;				// движение

	}

	//!---------------------------------------------- Отслеживание
	startListened() {
		document.addEventListener('touchstart', (event) => this.start(event));
		document.addEventListener('touchmove', (event) => this.move(event), { passive: false });
		document.addEventListener('touchend', (event) => this.end(event));
	}

	start(event) {
		this.examinationLogo(event);

		// initialPoint = event.changedTouches[0];
		// scrollPoint = event.changedTouches[0].screenY;
	}

	move(event) {
		event.preventDefault();

		// if (event.defaultPrevented && blockActive) {
		// 	if (scrollPoint > event.changedTouches[0].screenY) {
		// 		info_up.scrollTop += 5;
		// 	} else info_up.scrollTop -= 5;
		// 	scrollPoint = event.changedTouches[0].screenY;
		// }
	}

	end(event) {

		// 	finalPoint = event.changedTouches[0];
		// 	var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
		// 	var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
		// 	if (xAbs > 30 || yAbs > 30) {														// Диапазон смещения. Данный весьма мал, но сбоев не обнаружено
		// 		if (xAbs > yAbs) {
		// 			if (finalPoint.pageX < initialPoint.pageX) {
		// 				if (blockActive && fullScreen) slide('next');					// в полноэкранном режиме переключение между input.checked/label
		// 				else if (!blockActive) addHoverFirst('.right'); 				// Движение влево только в неактивном состоянии 
		// 			}
		// 			else if (blockActive && fullScreen) slide('prev');					// в полноэкранном режиме переключение между input.checked/label
		// 			else if (!blockActive) addHoverFirst('.left');						// Движение вправо только в неактивном состоянии 
		// 		}
		// 		else if (!blockActive) {														// Только в неактивном состоянии 
		// 			if (finalPoint.pageY < initialPoint.pageY) {
		// 				addHoverFirst('.down'); 												// Движение вверх 
		// 			}
		// 			else {
		// 				addHoverFirst('.up'); 													// Движение вниз 
		// 			}
		// 		}
		// 	}
	}

	examinationLogo(event) {
		let logoOpen = false;
		event.path.forEach(element => {
			if (element.classList) {
				if (element.classList.contains('logo')) logoOpen = true;
			}
		});
		if (!logoOpen) {
			this.action.removeHoverLogo();
		}
	}
}