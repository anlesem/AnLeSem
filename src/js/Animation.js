export default class Animation {
  constructor(data) {
    this.data = data;

    // Для установки задержки до появления кнопки "Перейти на лёгкую версию" при старте
    this.timerIdSetAnimation = null;
  }

  //!---------------------------------------------- Методы
  // Отключение анимации (заставки) при загрузке страницы
  // 	data.preloader - отключение заставки
  // 	data.contentBlocks.forEach(element) - отображение бирок
  //		setTimeout() - отключение анимации отображения бирок, которая 
  //			иначе висит и блокирует изменения opacity
  //			- запуск всей анимации
  removePreloader() {
    this.data.preloader.style.animation = `preloader ${this.data.settings.speed}ms linear forwards`;

    this.data.contentBlocks.forEach(element => {
      element.main.style.animation = `load-tag ${this.data.settings.speed / 2}ms linear forwards`;
    });

    setTimeout(() => {
      this.removeAnimationTag();
      this.setAnimation();
    }, this.data.settings.speed)
  }

  // Включение всей анимации
  setAnimation() {
    if (!this.data.slimScreen && this.data.checkContentOff.checked) {
      this.data.logo.style.animation = `circle infinite ${this.data.settings.intervals}s ${this.data.settings.intervals / 2 + this.data.settings.delay}s linear`;

      this.data.contentBlocks.forEach(element => {
        element.main.style.animation = `rhythm-tag infinite ${this.data.settings.intervals}s ${this.data.settings.intervals + this.data.settings.delay}s linear`;
      });
    }
  }

  // Отключение всей анимации
  removeAnimation() {
    this.data.logo.style.animation = "";
    this.removeAnimationTag();
  }
  // Отключение анимации бирок
  removeAnimationTag() {
    this.data.contentBlocks.forEach(element => {
      element.main.style.animation = "";
    });
  }
}