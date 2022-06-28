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
  start(event) {
    this.initialPoint = event.changedTouches[0];
    this.scrollPoint = [];
    this.examinationElement(event);
  }

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
          this.hoverContentBlock('left');	                           	// Движение вправо
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

  end(event) {
    this.hoverResetContentBlock();

    this.finalPoint = event.changedTouches[0];
    let xAbs = Math.abs(this.initialPoint.pageX - this.finalPoint.pageX);
    let yAbs = Math.abs(this.initialPoint.pageY - this.finalPoint.pageY);
    if (xAbs > 30 || yAbs > 30) {
      if (xAbs > yAbs) {
        if (this.finalPoint.pageX < this.initialPoint.pageX) {
          if (!this.data.checkContentOff.checked && this.data.fullScreen) this.slide(true);
          else if (this.data.checkContentOff.checked) this.openContentBlock('right'); 	// Движение влево 
        }
        else if (!this.data.checkContentOff.checked && this.data.fullScreen) this.slide(false);
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

  stopDefault(event) {
    event.preventDefault();
  }

  //!---------------------------------------------- Методы для активации/переключения
  hoverContentBlock(name) {
    if (!this.hoverStop) {
      this.data.contentBlocks.find(item => item.name === name).tag.classList.add('hover-touch');
      this.animation.removeAnimation();
      this.hoverStop = true;
    }
  }

  // В качестве параметра full принимает true - полный сброс / false - частичный
  hoverResetContentBlock() {
    if (this.hoverStop) {
      document.querySelector('.hover-touch').classList.remove('hover-touch');
      this.animation.setAnimation();
      this.hoverStop = false;
    }
  }

  openContentBlock(name) {
    this.data.contentBlocks.find(item => item.name === name).check.checked = true;
    this.animation.removeAnimation();
  }

  // В качестве параметра next принимает true - следующий / false - предыдущий
  slide(next) {
    let radioList = this.data.elementOpen().radio;

    for (let i = 0; i <= radioList.length; i++) {
      if (radioList[i].checked) {
        if (next) {
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