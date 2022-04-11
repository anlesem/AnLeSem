// Модуль отслеживает и производит преобразования отображения сайта в зависимости от параметров экрана и типа устройств ввода

export default class ViewScreen {
  constructor(data, animation) {
    this.data = data;
    this.animation = animation;

    // Для установки задержки до появления кнопки "Перейти на лёгкую версию" при старте
    this.timerIdLight = null;

    // Хранит используемое устройство ввода для появления "Закрыть"
    // true - используется мышь; false - касания
    this.mouse = null;

  }

  //! ------------------------------------------------- Загрузка
  // onload Стартовая функция. Задача - правильно распределить поведение в зависимости от условий.
  // this.data.preloader - Перехват управления анимацией (заставкой) при загрузке из CSS в JS, 
  // 	чтобы остановить её исчезновение по умолчанию через 3 сек в случае лёгкой версии
  // this.data.toLight - Отслеживание нажатия на кнопку "Перейти на лёгкую версию". При событии:
  //		this.userToLight - изменение Флага для блокировки полной версии;
  //		this.data.preloader - отключение анимации (заставки);
  // 	this.data.warning - изменение предупредительной надписи в лёгкой версии на случай неподходящего 
  //			разрешения экрана (по умолчанию предупреждение указывает на отсутствие JS)
  // this.setButtonToLight - Установка задержки до появления кнопки "Перейти на лёгкую версию" 
  //		при старте, чтобы надпись не мелькала при нормальной загрузке
  //		(delay) - задержка, устанавливается при вызове (onload)
  // this.fullScreenMedia - Определение параметров экрана для установки первоначальных параметров отображения
  onload(delay) {
    this.data.preloader.style.animation = "";

    //ToDo проверка браузера

    this.data.toLight.addEventListener('click', () => {
      this.data.settings.userToLight = true;
      this.data.preloader.style.display = 'none';
      this.data.warning.innerHTML = "Имеет смысл перегрузить страницу, когда скорость интернет-соединения станет выше.";
    });

    this.setButtonToLight(delay);

    this.fullScreenMedia();
    this.slimScreenMedia();
  }

  // Задержка до появления кнопки "Перейти на лёгкую версию" при старте
  // - Задание именованного таймера для возможности его отключения
  // - Отображение кнопки "Перейти на лёгкую версию"
  setButtonToLight(delay) {
    this.timerIdLight = setTimeout(() => {
      this.data.toLight.style.display = 'block';
    }, delay);
  }

  // По окончании загрузки страницы активация полной версии сайта, при:
  // 	- отсутствии нажатия на кнопку "Перейти на лёгкую версию";
  //		- разрешении экрана больше, чем (offScreen)
  // - Отключение кнопки "Перейти на лёгкую версию"
  // - Удаление таймера кнопки "Перейти на лёгкую версию" при старте по факту загрузки страницы
  // - Активация полной версии сайта
  // - Изменение предупредительной надписи в лёгкой версии на случай неподходящего разрешения экрана
  //		(по умолчанию предупреждение указывает на отсутствие JS)
  // - Отслеживание Устройства ввода
  fullVersionOn() {
    if (!this.data.settings.userToLight) {
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


  //! ------------------------------------------------- Определение размеров экрана
  // Медиа запросы:
  // - полноэкранный режим
  // - узкий экран
  // - экран только для лёгкой версии
  fullScreenMedia() {
    if ((window.innerWidth < this.data.settings.pcWidth && window.innerWidth / window.innerHeight > this.data.settings.proportion) ||
      window.innerHeight < this.data.settings.breakHeight || window.innerWidth < this.data.settings.laptopWidth) this.data.fullScreen = true;
    else this.data.fullScreen = false;
  }
  slimScreenMedia() {
    if (window.innerHeight < this.data.settings.slimWidth || window.innerWidth < this.data.settings.slimWidth) this.data.slimScreen = true;
    else this.data.slimScreen = false;
  }

  //! ------------------------------------------------- Изменение размеров экрана
  //	...Media() - Переопределение медиа запросов
  //	specialOfPointer() - Переключение отображения кнопок "Закрыть" и "Закрыть всё"
  // data.slimScreen - для узких экранов отключается вся анимация
  resizeScreen() {
    this.fullScreenMedia();
    this.slimScreenMedia();

    this.specialOfPointer(this.mouse);

    if (this.data.slimScreen) this.animation.removeAnimation();
  }

  //! ------------------------------------------------- Устройства ввода
  typeOfPointer() {
    // Отслеживание. Тип устройства ввода
    // Отслеживание. Тип устройства ввода. Касание / нажатие (преимущественно для touch)
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

    // Отслеживание. Тип устройства ввода. Движение (преимущественно для mouse)
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

  // Особенности для устройств ввода
  // 	data.fullScreen - в полноэкранном режиме для Touch кнопка "Закрыть" перемещается в подвал
  //		data.contacts - включение блокировки случайного нажатия в логотипе для Touch
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