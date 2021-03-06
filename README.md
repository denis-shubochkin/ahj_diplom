https://denis-shubochkin.github.io/ahj_diplom/

[![Build status](https://ci.appveyor.com/api/projects/status/2vn1um9vt7h6d4qq?svg=true)](https://ci.appveyor.com/project/denis-shubochkin/ahj-diplom)

# Бот органайзер

![](./src/pic/readme/1.jpg)
***
## Обязательные функции:

- Сохранение в истории ссылок и текстовых сообщений

![](./src/pic/readme/textAndLinks.jpg)

- Ссылки должны быть кликабельны и отображаться как ссылки

![](./src/pic/readme/textAndLinks.jpg)

- Сохранение в истории изображений, видео и аудио - через Drag & Drop и через иконку загрузки 

Для того чтобы приложить медиа файл (изображение,аудио,видео), необходимо нажать на кнопку скрепки внизу формы органайзера

![](./src/pic/readme/att1.jpg)

Выберите один или несколько файлов на компьютере и нажмите Открыть

![](./src/pic/readme/att2.jpg)

Выбранные файлы отобразятся в ленте

![](./src/pic/readme/att3.jpg)

Аналогично можно загружать аудио и видео

![](./src/pic/readme/att4.jpg)

Также медиа-файлы можно перетащить в окно органайзера, в таком случае они появятся в ленте

- Скачивание файлов 

Скачать аудио:

![](./src/pic/readme/att5.jpg)

![](./src/pic/readme/att6.jpg)

Скачать видео:

![](./src/pic/readme/att7.jpg)

![](./src/pic/readme/att8.jpg)

Скачать картинку:

При наведении на изображение появляется кнопка, при клике на которую изображение скачивается.

![](./src/pic/readme/att9.jpg)

- Ленивая подгрузка

При открытии страницы органайзера,а также если количество изображений в ленте больше 10, появляется кнопка "Еще 10", при нажатии на которую подгрузятся следующие 10 изображений истории

![](./src/pic/readme/more.jpg)

***
## Дополнительные функции:

- Отправка геолокации

Если в бразуере разрешена отправка геолокации, то в сообщениях при отправке будут переданы коородинаты
Если запрещена - будет написано "Местополжение неизвестно"

![](./src/pic/readme/coords.jpg)

- Воспроизведение видео/аудио

![](./src/pic/readme/audio.jpg)

![](./src/pic/readme/video.jpg)

- Установка напоминаний

Чтобы задать напоминание, необходимо отправить органайзеру команду вида
@schedule: 16:02 03.12.2020 "Текст напоминания"

Если напоминание успешно создано, он уведомит вас ответным сообщением

![](./src/pic/readme/notif1.jpg)

Если формат задания напоминания не совсем корректный, он ответит как нужно создавать напоминания

![](./src/pic/readme/notif3.jpg)

В назначенное время напоминание будет отображено пользователю в браузере как уведомление

![](./src/pic/readme/notif2.jpg)

Если уведомления отключены в браузере, то он предложит их активировать.
Если органайзер отключен в момент отправки напоминания, то пользователь получит его, когда подключится.

- Отправка команд боту

Бот может информировать вас о погоде, пробках, курсе валют, ценах на нефть и новым случаям заражения в вашем городе.
Используются следующие команды:

@weather - узнать прогноз погоды

![](./src/pic/readme/weather.jpg)

@petrol - узнать о ценах на нефть

![](./src/pic/readme/petrol.jpg)

@currency - узнать курсы доллара и евро

![](./src/pic/readme/currency.jpg)

@traffic - узнать о пробках

![](./src/pic/readme/traffic.jpg)

@corona - узнать о случаях заражения вирусом

![](./src/pic/readme/corona.jpg)

- Поддержка смайликов (emoji)

Рядом со строкой ввода текста сообщения доступна кнопка вызова панели смайликов.
Кликните на любой смайлик чтобы добавить его к тексту сообщения

![](./src/pic/readme/emoji.jpg)
