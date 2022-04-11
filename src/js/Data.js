// Модуль содержит базу данных используемых элементов на сайте, которую формирует по 
// фактическому представлению в DOM

export default class Data {
  constructor(settings) {
    this.settings = settings;

    //!------------------------------------------- Сектор загрузки
    // Обёртка при загрузке, которая закрывает собой контент
    this.preloader = document.getElementById('preloader')

    // Надпись с предложением перейти на лёгкую версию при долгой загрузке
    this.toLight = document.getElementById('to-light');

    // Надпись с предупреждениями в случае лёгкой версии
    this.warning = document.getElementById('warning');

    //!------------------------------------------- Основные элементы
    // this.header = document.getElementById('header');
    this.checkVersion = document.getElementById('version');
    this.checkContentOff = document.getElementById('content-off');
    this.pointerMouse = document.getElementById('pointer-mouse');
    this.logo = document.getElementById('logo');
    this.contacts = document.getElementById('contacts');
    this.cls = document.querySelector('.close');				// Кнопка Закрыть в открытом блоке
    this.clsAll = document.querySelector('.close-all');	// Кнопка Закрыть в подвале
    this.infoUp = document.querySelector('.info__up');		// для прокрутки наверх при переключении

    //!------------------------------------------- Блоки с контентом
    // contentBlocks - основной объект, содержащий в себе массив данных о задействованных элементах
    // setContentBlocks - вызов метода для формирования contentBlocks
    this.contentBlocks = [{ name: 'up' }, { name: 'down' }, { name: 'left' }, { name: 'right' }]
    this.setContentBlocks();

    //!------------------------------------------- Параметры отображения
    // Медиа запросы  (следует уточнять в _mixin.scss). Полный, узкий или совсем узкий экран. (window.matchMedia не всегда работает)
    this.fullScreen = null;
    this.slimScreen = null;
  }

  //!---------------------------------------------- Методы
  // Формирование объекта contentBlocks по свойству name через добавление соответствующих элементов сайта
  //		element.tag - добавление бирок
  // 	element.tag.dataset.name - присвоение биркам идентификатора, чтобы их распознавать при Событии
  // 	element.radio - добавление переключателей Контента в Блоках
  //		elementsOfRadio - вызов метода для формирования списка доступных переключателей:
  //			(element.name) - имя блока;
  //			(element.radio) - соответствующий имени блока массив переключателей;
  setContentBlocks() {
    this.contentBlocks.forEach(element => {
      element.main = document.querySelector(`.${element.name}`);	        // основной блок с содержимым
      element.check = document.getElementById(`content-${element.name}`);	// бирки input
      element.tag = document.querySelector(`.${element.name}-tag`);			  // бирки label
      element.radio = [];
      this.setRadio(element.name, element.radio);
    });
  }

  // Формирование списка переключателей внутри объекта contentBlocks по свойству name
  //			(name) - имя блока;
  //			(radio) - соответствующий имени блока массив переключателей;
  // 	Цикл с максимально возможным количеством переключателей в блоке. Данный метод позволяет указывать
  //			большее количество итераций, т.к. используется фильтр отсутствующих переключателей.
  //		radio[i] - поиск переключателя по его id, состоящего из привязки к имени блока и порядкового номера ("left-1")
  //		radio.pop() - фильтр отсутствующих переключателей
  setRadio(name, radio) {
    for (let i = 0; i < 3; i++) {
      radio[i] = document.getElementById(`${name}-${i + 1}`);
      if (!isNaN(radio[i])) radio.pop();
    }
  }

  // Возвращает объект с данными открытого блока с контентом для быстрого 
  // доступа к данным и удобства использования использования
  elementOpen() {
    let elementOpen = {};
    this.contentBlocks.forEach((element) => {
      if (element.check.checked) elementOpen = element;
    })

    return elementOpen;
  }
}