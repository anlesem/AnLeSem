export default class Animation {
  constructor(data) {
    this.data = data;
  }

  //!---------------------------------------------- Методы
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

  setAnimation() {
    if (!this.data.slimScreen && this.data.checkContentOff.checked) {
      console.log("ok");

      this.data.logo.style.animation = `circle infinite ${this.data.settings.intervals}s ${this.data.settings.intervals / 2 + this.data.settings.delay}s linear`;

      this.data.contentBlocks.forEach(element => {
        element.main.style.animation = `rhythm-tag infinite ${this.data.settings.intervals}s ${this.data.settings.intervals + this.data.settings.delay}s linear`;
      });
    }
  }

  removeAnimation() {
    console.log("stop");
    this.data.logo.style.animation = "";
    this.removeAnimationTag();
  }

  removeAnimationTag() {
    this.data.contentBlocks.forEach(element => {
      element.main.style.animation = "";
    });
  }
}