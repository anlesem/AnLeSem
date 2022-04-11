// Модуль отслеживает поведение пользователя при управлении жестами.

export default class TouchAction {
  constructor(data, animation, action) {
    this.data = data;
    this.animation = animation;
    this.action = action;

    // Параметры движения
    this.initialPoint = null;				// начало движения
    this.movePoint = null;			  	// момент движения
    this.finalPoint = null;					// конец движения
    this.hoverStop = false;					// блокировка повторного наведения

    // Блокировка действий браузера по умолчанию, кроме прокрутки.
    // scrollElements - массив объектов, имеющих прокрутку. Создаётся в момент 
    // 	касания (start), чтобы правильно определить область нажатия и
    //  	соответствующий ей элемент(ы).
    // scrollPoint - позиция блока для распознания наличия прокрутки у блока из scrollElements
    // scrollCheck - проверка, что касание распознано и прошло процедуру формирования scrollElements
    this.scrollElements = null;
    this.scrollPoint = null;
    this.scrollCheck = null;
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
  //		initialPoint - стартовая позиция смещения пальца
  //		scrollPoint - создание массива позиций прокрутки и их обнуление 
  // 	this.examinationElement() - проверка при касании экрана на принадлежность логотипу или
  //									блоку, имеющему прокрутку
  start(event) {
    this.initialPoint = event.changedTouches[0];
    this.scrollPoint = [];
    this.examinationElement(event);
  }

  // Удержание пальца
  // Необходимо заблокировать действия браузера по умолчанию, кроме прокрутки:
  //		examinationScroll() - проверка реальной прокрутки у элементов, где она предполагалась при касании
  //		| scrollCheck - проверка, что касание распознано и прошло процедуру формирования scrollElements
  //			stopDefault() - блокировка действия браузера по умолчанию
  // Имитация наведения при движении. Открытие происходит по факту отпускания пальца. 
  // При незначительном движении имитируется наведение:
  //    hoverResetContentBlock() - сброс "наведения" при изменении направления движения 
  //    hoverContentBlock() - добавление класса имитатора "наведения" 
  move(event) {
    if (this.scrollElements.length > 0) this.examinationScroll(event);
    else if (this.scrollCheck > 0) this.stopDefault(event);

    this.movePoint = event.changedTouches[0];
    let xAbs = Math.abs(this.initialPoint.pageX - this.movePoint.pageX);
    let yAbs = Math.abs(this.initialPoint.pageY - this.movePoint.pageY);
    if (xAbs > 10 || yAbs > 10 && this.data.checkContentOff.checked) {
      if (xAbs > yAbs) {
        if (this.movePoint.pageX < this.initialPoint.pageX) {
          this.hoverResetContentBlock();
          this.hoverContentBlock('right'); 	                          // Движение влево 
        }
        else {
          this.hoverResetContentBlock();
          this.hoverContentBlock('left');	                      	// Движение вправо
        }
      }
      else {
        if (this.movePoint.pageY < this.initialPoint.pageY) {
          this.hoverResetContentBlock();
          this.hoverContentBlock('down'); 														// Движение вверх 
        }
        else {
          this.hoverResetContentBlock();
          this.hoverContentBlock('up'); 															// Движение вниз 
        }
      }
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
    this.hoverResetContentBlock();

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

  //!---------------------------------------------- Методы для блокировки
  // Проверка при касании экрана на принадлежность логотипу или блоку, имеющему прокрутку.
  // 	scrollElements - массив элементов с наличием прокрутки на момент касания. Обнуление при каждом вызове метода
  //		scrollCheck - формирование проверки, что касание распознано
  // 	event.path - формирование scrollElements по массиву значений.
  //			element.scrollHeight - предположение на наличие прокрутки у блока, чтобы не блокировать напрасно 
  //									действие браузера по умолчанию (перезагрузка на движение вверх):
  //									- грубая проверка на разницу высот элемента и наличие overflow:hidden
  //									- уточнение уже потом при движении move() > examinationScroll()
  examinationElement(event) {
    this.scrollElements = [];
    this.scrollCheck = event.path.length;
    event.path.forEach(element => {
      if (element.clientHeight < element.scrollHeight && !(element.style.overflow && element.style.overflow == 'hidden')) {
        this.scrollElements.push(element);
      }
    });
  }

  // Уточнение наличия прокрутки у блока
  //		isScroll - флаг наличия прокрутки
  //		Цикл, только по завершении которого необходимо принять решение о блокировке 
  //			| !isScroll - блокировка	действия браузера по умолчанию при отсутствии прокрутки				 
  //			| event.cancelable - проверка на возможность блокировать действие браузера (иначе в консоли предупреждения)
  //				stopDefault() - блокировка действия браузера по умолчанию
  examinationScroll(event) {
    let isScroll = false;
    for (let i = 0; i < this.scrollElements.length; i++) {
      if (this.scrollPoint[i] !== this.scrollElements[i].scrollTop) isScroll = true;
      this.scrollPoint[i] = this.scrollElements[i].scrollTop;

      if ((i + 1) == this.scrollElements.length && !isScroll && event.cancelable) {
        this.stopDefault(event);
      }
    }
  }

  // Блокировка действия браузера по умолчанию
  stopDefault(event) {
    event.preventDefault();
  }

  //!---------------------------------------------- Методы для активации/переключения
  // Имитация наведения
  hoverContentBlock(name) {
    if (!this.hoverStop) {
      this.data.contentBlocks.find(item => item.name === name).tag.classList.add('hover-touch');
      this.animation.removeAnimation();
      this.hoverStop = true;
    }
  }

  // Сброс наведения
  hoverResetContentBlock() {
    if (this.hoverStop) {
      document.querySelector('.hover-touch').classList.remove('hover-touch');
      this.hoverStop = false;
    }
  }

  // Открытие блока жестом по направлению указателя бирки
  openContentBlock(name) {
    this.data.contentBlocks.find(item => item.name === name).check.checked = true;
    this.animation.removeAnimation();
  }

  // Открытие блоков с контентом или переключение содержимого в полноэкранном режиме
  //		data.elementOpen() - определение открытого в данный момент блока с контентом и его списка
  //									переключателей
  //		| radioList[i].checked - Определение актуальной позиции input.checked
  //			| 'next' - переключение на следующий и прокрутка, если актуальная позиция не последняя
  //			| else if - переключение на предыдущий и прокрутка, если актуальная позиция не первая
  //				scrollUp() - Прокрутка наверх в верхнем блоке при переключении между вкладками
  slide(n) {
    let radioList = this.data.elementOpen().radio;

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