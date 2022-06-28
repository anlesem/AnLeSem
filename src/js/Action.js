// Модуль отслеживает поведение пользователя на сайте в части управления контентом.

export default class Action {
  constructor(data, animation, viewScreen) {
    this.data = data;
    this.animation = animation;
    this.viewScreen = viewScreen;
  }

  //!---------------------------------------------- Отслеживание
  startListened() {
    this.data.logo.addEventListener('mouseover', () => this.animation.removeAnimation());
    this.data.logo.addEventListener('mouseout', () => this.animation.setAnimation());

    this.data.contentBlocks.forEach(element => {
      element.tag.addEventListener('mouseover', () => this.animation.removeAnimation());
      element.tag.addEventListener('mouseout', () => this.animation.setAnimation());
    });

    document.querySelectorAll('input[name=content]').forEach((element) => {
      element.addEventListener('change', () => {
        if (this.data.checkContentOff.checked) this.animation.setAnimation();
        else this.animation.removeAnimation();
      })
    });

    this.data.contentBlocks[0].radio.forEach(element => {
      element.addEventListener('click', () => this.scrollUp());
    });
  }

  //!---------------------------------------------- Методы для блоков
  scrollUp() {
    this.data.infoUp.scrollTop = 0;
  }
}