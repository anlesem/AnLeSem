// Модуль содержит базу данных используемых элементов на сайте, которую формирует по 
// фактическому представлению в DOM

export default class Data {
  constructor(settings) {
    this.settings = settings;

    //!------------------------------------------- Сектор загрузки
    this.light = false;
    this.preloader = document.getElementById('preloader')
    this.toLight = document.getElementById('to-light');
    this.warning = document.getElementById('warning');

    //!------------------------------------------- Глобальные переключатели
    this.checkVersion = document.getElementById('version');
    this.checkContentOff = document.getElementById('content-off');
    this.pointerMouse = document.getElementById('pointer-mouse');

    //!------------------------------------------- Параметры отображения
    // Медиа запросы  (следует уточнять в _mixin.scss). Полный или узкий экран.
    this.fullScreen = null;
    this.slimScreen = null;

    //!------------------------------------------- Основные элементы
    this.logo = document.getElementById('logo');
    this.contacts = document.getElementById('contacts');
    this.cls = document.querySelector('.close');				  // Кнопка Закрыть в открытом блоке
    this.clsAll = document.querySelector('.close-all');	  // Кнопка Закрыть в подвале
    this.infoUp = document.querySelector('.info__up');

    this.contentBlocks = [{ name: 'up' }, { name: 'down' }, { name: 'left' }, { name: 'right' }]
    this.setContentBlocks();
  }

  //!---------------------------------------------- Методы
  setContentBlocks() {
    this.contentBlocks.forEach(element => {
      element.main = document.querySelector(`.${element.name}`);
      element.check = document.getElementById(`content-${element.name}`);
      element.tag = document.querySelector(`.${element.name}-tag`);
      element.radio = [];
      this.setRadio(element.name, element.radio);
    });
  }

  setRadio(name, radio) {
    for (let i = 0; i < 3; i++) {
      radio[i] = document.getElementById(`${name}-${i + 1}`);
      if (!isNaN(radio[i])) radio.pop();          // фильтр отсутствующих переключателей
    }
  }

  elementOpen() {
    let elementOpen = {};
    this.contentBlocks.forEach((element) => {
      if (element.check.checked) elementOpen = element;
    })

    return elementOpen;
  }
}