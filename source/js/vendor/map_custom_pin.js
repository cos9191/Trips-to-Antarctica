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

ymaps.ready(function () {
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

    myMap.geoObjects
        .add(myPlacemark);
})
