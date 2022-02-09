// Модуль отслеживает поведение пользователя при управлении жестами.

export default class TouchAction {
	constructor(data, animation, action) {
		this.data = data;
		this.animation = animation;
		this.action = action;

		// Параметры движения
		this.initialPoint = null;				// начало движения
		this.finalPoint = null;					// конец движения

		// Блокировка действий браузера по умолчанию, кроме прокрутки.
		// scrollElements - массив объектов, имеющих прокрутку. Создаётся в момент 
		// 	касания (start), чтобы правильно определить область нажатия и
		//  	соответствующий ей элемент(ы).
		// scrollPoint - позиция блока для распознания наличия прокрутки у блока из scrollElements
		this.scrollElements = null;
		this.scrollPoint = null;
	}

	//!---------------------------------------------- Отслеживание
	startListened() {
		document.addEventListener('touchstart', (event) => this.start(event));
		document.addEventListener('touchmove', (event) => this.move(event), {
			passive: false,
			cancelable: true
		});
		document.addEventListener('touchend', (event) => this.end(event));
	}

	//!---------------------------------------------- Жесты (События)
	// Момент касания пальцем
	// 	this.examinationElement() - проверка при касании экрана на принадлежность логотипу или
	//									блоку, имеющему прокрутку
	//		initialPoint - стартовая позиция смещения пальца
	//		scrollPoint - создание массива позиций прокрутки и их обнуление 
	start(event) {
		this.examinationElement(event);
		this.initialPoint = event.changedTouches[0];
		this.scrollPoint = [];
	}

	// Удержание пальца
	// Необходимо заблокировать действия браузера по умолчанию, кроме прокрутки:
	//		isScroll - флаг наличия прокрутки 
	//		| scrollElements - проверка реальной прокрутки у элементов, где она предполагалась при касании
	//		| !isScroll - блокировка	действия браузера по умолчанию при отсутствии прокрутки				 
	//		| event.cancelable - проверка на возможность блокировать действие браузера (иначе в консоли предупреждения)				 
	move(event) {
		let isScroll = false;
		if (this.scrollElements.length > 0) {
			for (let i = 0; i < this.scrollElements.length; i++) {
				if (this.scrollPoint[i] !== this.scrollElements[i].scrollTop) isScroll = true;
				this.scrollPoint[i] = this.scrollElements[i].scrollTop;
			}
		}
		if (!isScroll && event.cancelable) {
			event.preventDefault();
		}
	}

	// Момент отпускания пальца
	// 	finalPoint - итоговая позиция смещения пальца
	// 	xAbs, yAbs - модуль расстояния смещения пальца. 
	//			| xAbs, yAbs > 30 - если расстояние смещения больше 30пс (данный работает без сбоев), то:
	//				| xAbs > yAbs - горизонтальное смещение
	//				| xAbs < yAbs - вертикальное смещение
	// 				slide() - в полноэкранном режиме переключение между input.checked/label
	end(event) {
		this.finalPoint = event.changedTouches[0];
		let xAbs = Math.abs(this.initialPoint.pageX - this.finalPoint.pageX);
		let yAbs = Math.abs(this.initialPoint.pageY - this.finalPoint.pageY);
		if (xAbs > 30 || yAbs > 30) {
			if (xAbs > yAbs) {
				if (this.finalPoint.pageX < this.initialPoint.pageX) {
					if (!this.data.checkContentOff.checked && this.data.fullScreen) this.slide('next');
					else if (this.data.checkContentOff.checked) this.openContentBlock('right'); 	// Движение влево 
				}
				else if (!this.data.checkContentOff.checked && this.data.fullScreen) this.slide('prev');
				else if (this.data.checkContentOff.checked) this.openContentBlock('left');		// Движение вправо
			}
			else if (this.data.checkContentOff.checked) {
				if (this.finalPoint.pageY < this.initialPoint.pageY) {
					this.openContentBlock('down'); 														// Движение вверх 
				}
				else {
					this.openContentBlock('up'); 															// Движение вниз 
				}
			}
		}
	}

	//!---------------------------------------------- Методы
	// Проверка при касании экрана на принадлежность логотипу или блоку, имеющему прокрутку.
	// 	(scrollElements) - массив элементов с наличием прокрутки на момент касания. Обнуление при каждом вызове метода
	// 	event.path - проверка проходит по массиву значений. Если хоть одно значение удовлетворяет условию, 
	// 					соответствующий флаг получает значение true
	//			element.scrollHeight - предположение на наличие прокрутки у блока, чтобы не блокировать напрасно 
	//									действие браузера по умолчанию (перезагрузка на движение вверх):
	//									- грубая проверка на разницу высот элемента и наличие overflow:hidden
	//									- уточнение уже потом при движении move()
	examinationElement(event) {
		this.scrollElements = [];

		event.path.forEach(element => {
			if (element.clientHeight < element.scrollHeight && !(element.style.overflow && element.style.overflow == 'hidden')) {
				this.scrollElements.push(element);
			}
		});
	}

	// Открытие блока жестом по направлению указателя бирки
	openContentBlock(name) {
		this.data.contentBlocks.find(item => item.name === name).check.checked = true;
		this.animation.removeAnimation();
	}

	// Открытие блоков с контентом или переключение содержимого в полноэкранном режиме
	//		data.contentBlocks - определение открытого в данный момент блока с контентом и его списка
	//									переключателей
	//		| radioList[i].checked - Определение актуальной позиции input.checked
	//			| 'next' - переключение на следующий и прокрутка, если актуальная позиция не последняя
	//			| else if - переключение на предыдущий и прокрутка, если актуальная позиция не первая
	//				scrollUp() - Прокрутка наверх в верхнем блоке при переключении между вкладками
	slide(n) {
		let radioList = [];

		this.data.contentBlocks.forEach((element) => {
			if (element.check.checked) radioList = element.radio;
		})

		for (let i = 0; i <= radioList.length; i++) {
			if (radioList[i].checked) {
				if (n == 'next') {
					if ((i + 1) == radioList.length) return;
					radioList[i + 1].checked = true;
					this.action.scrollUp();
					return;
				} else if (i == 0) return;
				radioList[i - 1].checked = true;
				this.action.scrollUp();
				return;
			}
		}
	}
}