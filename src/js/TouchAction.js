// Модуль отслеживает поведение пользователя при управлении жестами.

export default class TouchAction {
	constructor(data, action) {
		this.data = data;
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

		this.data.logo.addEventListener('touchstart', () => this.openLogoTouch());
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
	//		|scrollElements - проверка реальной прокрутки у элементов, где она предполагалась при касании
	//		|!isScroll - блокировка	действия браузера по умолчанию при отсутствии прокрутки				 
	//		|event.cancelable - проверка на возможность блокировать действие браузера (иначе в консоли предупреждения)				 
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
	end(event) {
		this.finalPoint = event.changedTouches[0];
		let xAbs = Math.abs(this.initialPoint.pageX - this.finalPoint.pageX);
		let yAbs = Math.abs(this.initialPoint.pageY - this.finalPoint.pageY);
		if (xAbs > 30 || yAbs > 30) {														// Диапазон смещения. Данный весьма мал, но сбоев не обнаружено
			if (xAbs > yAbs) {
				if (this.finalPoint.pageX < this.initialPoint.pageX) {
					if (this.data.contentBlockActive && this.data.fullScreen) this.slide('next');					// в полноэкранном режиме переключение между input.checked/label
					else if (!this.data.contentBlockActive) this.action.openContentBlock('', 'right'); 				// Движение влево только в неактивном состоянии 
				}
				else if (this.data.contentBlockActive && this.data.fullScreen) this.slide('prev');					// в полноэкранном режиме переключение между input.checked/label
				else if (!this.data.contentBlockActive) this.action.openContentBlock('', 'left');						// Движение вправо только в неактивном состоянии 
			}
			else if (!this.data.contentBlockActive) {														// Только в неактивном состоянии 
				if (this.finalPoint.pageY < this.initialPoint.pageY) {
					this.action.openContentBlock('', 'down'); 												// Движение вверх 
				}
				else {
					this.action.openContentBlock('', 'up'); 													// Движение вниз 
				}
			}
		}
	}

	//!---------------------------------------------- Общие методы
	// Проверка при касании экрана на принадлежность логотипу или блоку, имеющему прокрутку.
	// 	(isLogo) - флаг нажатия на логотип. Обнуление при каждом вызове метода
	// 	(scrollElements) - массив элементов с наличием прокрутки на момент касания. Обнуление при каждом вызове метода
	// 	event.path - проверка проходит по массиву значений. Если хоть одно значение удовлетворяет условию, 
	// 					соответствующий флаг получает значение true
	//			element.classList - проверка для логотипа. Область, где произошло Событие Логотип?
	//									- да - никаких действий не требуется
	//									- нет - следует закрыть логотип (по аналогии с "mouseout") 
	//			element.scrollHeight - предположение на наличие прокрутки у блока, чтобы не блокировать напрасно 
	//									действие браузера по умолчанию (перезагрузка на движение вверх):
	//									- грубая проверка на разницу высот элемента и наличие overflow:hidden
	//									- уточнение уже потом при движении move()
	//		action.closeLogo() - закрытие логотипа
	examinationElement(event) {
		let isLogo = false;
		this.scrollElements = [];

		event.path.forEach(element => {
			if (element.classList && element.classList.contains('logo')) isLogo = true;

			if (element.clientHeight < element.scrollHeight && !(element.style.overflow && element.style.overflow == 'hidden')) {
				this.scrollElements.push(element);
			}
		});

		if (!isLogo) {
			this.action.closeLogo();
		}
	}

	// Открытие блоков с контентом или переключение содержимого в полноэкранном режиме
	// 	data.contentBlocks.find - Определение списка radio блока, в котором происходит событие
	slide(n) {
		let radioList = this.data.contentBlocks.find(item => item.name === this.data.contentBlockActive).radio;
		for (let i = 0; i <= radioList.length; i++) {
			if (radioList[i].checked) {							// Определение актуальной позиции input.checked 
				if (n == 'next') {										// Для следующего
					if ((i + 1) == radioList.length) return;	// Проверка последний ли?		
					else {
						radioList[i + 1].checked = true;			// Переключение позиции input.checked
						this.action.scrollUp();											// Прокрутка в верх (иначе позиция прокрутки останется на том же месте)
						return;												// Завершение именно функции, а не цикла
					}
				} else if (i == 0) return;						// Для предыдущего. Проверка первый ли?
				else {
					radioList[i - 1].checked = true;				// Переключение позиции input.checked
					this.action.scrollUp();												// Прокрутка в верх (иначе позиция прокрутки останется на том же месте)
					return;													// Завершение именно функции, а не цикла
				}
			}
		}
	}

	//!---------------------------------------------- Методы для логотипа
	// Открытие визитной карточки внутри логотипа в дополнение к наведению:
	// 	1. при открытии и отсутствии заглушки, создаётся заглушка, блокирующая случайное нажатие на ссылку
	//			внутри визитной карточки. Заглушка удаляется после задержки в 300ms
	//		2. собственно открытие визитной карточки
	openLogoTouch() {
		if (!this.data.logo.classList.contains('hover') && !document.querySelector('.logo-stop')) {
			this.data.logo.insertAdjacentHTML('afterbegin', '<div class="logo-stop"></div>');
			setTimeout(() => {
				document.querySelector('.logo-stop').remove();
			}, 300);
		}
		this.action.openLogo();
	}
}