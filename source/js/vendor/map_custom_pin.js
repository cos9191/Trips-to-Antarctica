const mapPin = {
  name: "map_pin.svg",
  address: `img/svg/$mapPin.name`,
  size: {
    width: 18,
    height: 22,
  },
  position: {
    x: 59.9375165,
    y: 30.3226474,
  },
  zoom: 16,
}

const isMobile = {
  android() {
    return navigator.userAgent.match(/Android/i);
  },
  blackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any() {
    return (isMobile.android() || isMobile.blackBerry() || isMobile.iOS() || isMobile.opera() || isMobile.windows());
  },
};

const initMap = () => {
  let myMap = new ymaps.Map('map', {
      center: [mapPin.position.x, mapPin.position.y],
      zoom: mapPin.zoom,
    }, {
      searchControlProvider: 'yandex#search'
    }),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Собственный значок метки',
      balloonContent: 'г. Санкт Петербург, ул. Большая Конюшенная, 19/8\''
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/svg/map_pin.svg',
      // Размеры метки.
      iconImageSize: [mapPin.size.width, mapPin.size.height],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-mapPin.size.width/2, -mapPin.size.height]
    });
  myMap.geoObjects.add(myPlacemark);

  if (isMobile.any()) {
    myMap.behaviors.disable('drag');
  }
}
// ymaps.ready(function () {
//     let myMap = new ymaps.Map('map', {
//             center: [mapPin.position.x, mapPin.position.y],
//             zoom: mapPin.zoom,
//         }, {
//             searchControlProvider: 'yandex#search'
//         }),
//
//         myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
//             hintContent: 'Собственный значок метки',
//             balloonContent: 'г. Санкт Петербург, ул. Большая Конюшенная, 19/8\''
//         }, {
//             // Опции.
//             // Необходимо указать данный тип макета.
//             iconLayout: 'default#image',
//             // Своё изображение иконки метки.
//             iconImageHref: 'img/svg/map_pin.svg',
//             // Размеры метки.
//             iconImageSize: [mapPin.size.width, mapPin.size.height],
//             // Смещение левого верхнего угла иконки относительно
//             // её "ножки" (точки привязки).
//             iconImageOffset: [-mapPin.size.width/2, -mapPin.size.height]
//         });
//     myMap.geoObjects.add(myPlacemark);
//
//   if (isMobile.any()) {
//     myMap.behaviors.disable('drag');
//   }
// })

setTimeout(() => {
  const elem = document.createElement('script');
  elem.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=7c7d3ac5-a476-47ae-a0ab-fd6f1a9a9daa';
  elem.type = 'text/javascript';
  document.querySelector('body').appendChild(elem);
  elem.onload = () => ymaps.ready(initMap);
}, 1000)
