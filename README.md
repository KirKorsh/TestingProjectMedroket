# Тестовое задание для MedRocket

Проект реализован на стеке:
- **Vue 2** с Composition API и TypeScript
- **Vuex** для управления состоянием
- **Vue Router** для маршрутизации
- **Axios** для HTTP-запросов
- **SCSS-модули** для изолированных стилей

## Установка зависимостей
npm install

## Запуск
npm run serve

## Структура проекта
```bash
src/
├── assets/            # Статические ресурсы
├── components/        # Глобальные компоненты
│   ├── ErrorState.vue # Компонент ошибки
│   ├── PhotoItem.vue  # Элемент фотографии
│   ├── PhotoModal.vue # Модальное окно фото
│   ├── PreloaderView.vue # Индикатор загрузки
│   └── TabButtons.vue # Переключатели вкладок
├── router/
│   └── index.js       # Конфигурация маршрутизации
├── services/
│   └── api.js         # API-сервис (Axios)
├── stores/
│   └── favorites.js   # Vuex-модуль избранного
├── views/             # Страницы приложения
│   ├── AlbumList.vue  # Список альбомов
│   ├── CatalogPage.vue # Главная страница
│   ├── FavoritesPage.vue # Страница избранного
│   ├── PhotoList.vue  # Список фотографий
│   └── UserList.vue   # Список пользователей
├── App.vue            # Корневой компонент
└── main.js            # Точка входа
