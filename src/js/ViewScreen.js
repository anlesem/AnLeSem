// Модуль отслеживает и производит преобразования отображения сайта в зависимости от параметров экрана и типа устройств ввода

export default class ViewScreen {
  constructor(data, animation) {
    this.data = data;
    this.animation = animation;

    this.timerIdLight = null;
    this.mouse = null;
  }

  //! ------------------------------------------------- Загрузка
  // (delay) - задержка появления кнопки "Перейти на лёгкую версию"
  onload(delay) {
    this.data.toLight.addEventListener('click', () => {
      this.data.light = true;
      this.data.preloader.style.display = 'none';
      this.data.warning.innerHTML = 'Имеет смысл перегрузить страницу, когда скорость интернет-соединения станет выше.';
    });

    this.setButtonToLight(delay);

    //ToDo проверка браузера - checkBrowser this.data.light = true;

    this.fullScreenMedia();
    this.slimScreenMedia();

    if (this.data.slimScreen) this.data.warning.innerHTML = 'Параметры экрана не позволяют полностью отобразить содержимое.';
    else this.data.warning.innerHTML = '';
  }

  fullVersionOn() {
    if (!this.data.light) {
      this.data.toLight.style.display = 'none';
      clearTimeout(this.timerIdLight);

      this.data.checkVersion.checked = false;
      this.data.checkVersion.disabled = true;
      document.querySelectorAll(".warning").forEach((elem) => {
        elem.style.display = 'none';
      })

      this.typeOfPointer();

      setTimeout(() => {
        this.animation.removePreloader();
      }, 1000);

      return true;
    }
    return false;
  }

  resizeScreen() {
    this.fullScreenMedia();
    this.slimScreenMedia();

    this.specialOfPointer(this.mouse);

    if (this.data.slimScreen) {
      this.data.checkContentOff.checked = true;
      this.animation.removeAnimation();
    }
  }

  //! ------------------------------------------------- Дополнительные методы
  // (delay) - задержка появления кнопки "Перейти на лёгкую версию"
  setButtonToLight(delay) {
    this.timerIdLight = setTimeout(() => {
      this.data.toLight.style.display = 'block';
    }, delay);
  }

  checkBrowser() { }


  //! ------------------------------------------------- Определение размеров экрана
  fullScreenMedia() {
    if ((window.innerWidth < this.data.settings.pcWidth && window.innerWidth / window.innerHeight > this.data.settings.proportion) ||
      window.innerHeight < this.data.settings.breakHeight || window.innerWidth < this.data.settings.laptopWidth) this.data.fullScreen = true;
    else this.data.fullScreen = false;
  }
  slimScreenMedia() {
    if (window.innerHeight < this.data.settings.slimWidth || window.innerWidth < this.data.settings.slimWidth) this.data.slimScreen = true;
    else this.data.slimScreen = false;
  }

  //! ------------------------------------------------- Устройства ввода
  typeOfPointer() {
    document.addEventListener('pointerdown', (event) => {
      switch (event.pointerType) {
        case 'mouse':
          this.mouse = true;
          this.specialOfPointer(this.mouse);
          break;
        case 'pen':
          this.mouse = false;
          this.specialOfPointer(this.mouse);
          break;
        case 'touch':
          this.mouse = false;
          this.specialOfPointer(this.mouse);
          break;
        default:
      }
    }, false);

    document.addEventListener('pointermove', (event) => {
      switch (event.pointerType) {
        case 'mouse':
          this.mouse = true;
          this.specialOfPointer(this.mouse);
          break;
        case 'pen':
          this.mouse = false;
          this.specialOfPointer(this.mouse);
          break;
        case 'touch':
          this.mouse = false;
          this.specialOfPointer(this.mouse);
          break;
        default:
      }
    }, false);
  }

  specialOfPointer(mouse) {
    if (!mouse && this.data.fullScreen) {
      this.data.cls.style.visibility = 'hidden';
      this.data.clsAll.style.visibility = 'visible';
    } else {
      this.data.cls.style.visibility = 'visible';
      this.data.clsAll.style.visibility = 'hidden';
    }

    if (mouse) {
      this.data.contacts.checked = true;
      this.data.contacts.disabled = true;
      this.data.pointerMouse.checked = true;
    } else {
      this.data.contacts.checked = false;
      this.data.contacts.disabled = false;
      this.data.pointerMouse.checked = false;
    }
  }
}