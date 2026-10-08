# Test Green API

Веб-клиент мессенджера **Telegram**, работающий через сервис **[Green API](https://green-api.com)**. Приложение позволяет авторизоваться по данным инстанса Green API, создавать чаты по номеру телефона, отправлять и получать текстовые сообщения в реальном времени.

**[Демо](https://test-green-api-psi.vercel.app/)**

## Возможности

- 🔐 **Авторизация** - вход по `idInstance` и `apiTokenInstance`, проверка состояния инстанса (`getAccountSettings`), сохранение сессии в `localStorage`
- 💬 **Создание чата** - добавление чата по номеру телефона с проверкой существования аккаунта в Telegram (`checkAccount`)
- 📤 **Отправка сообщений** - отправка текстовых сообщений через метод `sendMessage`
- 📥 **Приём сообщений** - получение входящих сообщений методом long polling (`receiveNotification`) с последующим удалением обработанных уведомлений (`deleteNotification`)
- 🗂️ **История чатов и сообщений** - список чатов, переключение активного чата, отображение входящих/исходящих сообщений
- 🛡️ **Защищённые маршруты** - страница чата доступна только авторизованным пользователям
- 🌐 **Локализация** - интерфейс на русском языке (i18next)
- 🎨 **Адаптивный интерфейс** - стилизация на Tailwind CSS

## Технологический стек

| Технология | Назначение |
|---|---|
| React 19 | UI-библиотека |
| TypeScript | Типизация |
| Vite | Сборщик и dev-сервер |
| Tailwind CSS 4 | Стилизация |
| Zustand | Управление состоянием + персистентность в `localStorage` |
| React Router | Маршрутизация |
| React Hook Form + Zod | Формы и валидация |
| i18next / react-i18next | Интернационализация |
| Axios | HTTP-клиент |
| Green API | Внешний API для работы с Telegram |

## Требования

- Node.js 20+ и npm
- Зарегистрированный аккаунт в [Green API](https://green-api.com) с созданным **Telegram-инстансом**

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки (браузер откроется автоматически)
npm run dev

# Сборка production-версии
npm run build

# Локальный предпросмотр собранной версии
npm run preview

# Проверка кода линтером (ESLint)
npm run lint
```

После запуска откройте приложение в браузере (по умолчанию Vite стартует на `http://localhost:5173`).

## Как использовать

1. Зарегистрируйтесь в [личном кабинете Green API](https://console.green-api.com) и создайте инстанс типа **Telegram**.
2. Привяжите к инстансу Telegram-аккаунт (авторизация по QR-коду через официальное приложение).
3. Из настроек инстанса возьмите **`idInstance`** и **`apiTokenInstance`**.
4. Откройте приложение и введите эти данные на странице входа. После успешной проверки инстанса вы попадёте в чат.
5. Введите номер телефона собеседника в формате международного номера (например, `79991234567`), чтобы создать новый чат.
6. Отправляйте сообщения, входящие сообщения подтягиваются автоматически через long polling.

> ⚠️ Учётные данные не передаются на сторонние серверы: все запросы идут напрямую в Green API, а сессия (токены, список чатов, история сообщений) хранится локально в `localStorage` браузера.

## Структура проекта

```
├── index.html                  # HTML-шаблон
├── vite.config.ts              # Конфигурация Vite (React Compiler, Tailwind)
├── tsconfig.json               # Конфигурация TypeScript
├── eslint.config.js            # Конфигурация ESLint
└── src/
    ├── main.tsx                # Точка входа
    ├── init.tsx                # Инициализация i18next и рендер приложения
    ├── App.tsx                 # Корневой компонент, маршрутизация
    ├── index.css               # Глобальные стили (Tailwind)
    ├── api/                    # Слой работы с Green API
    │   ├── apiClient.ts        # Axios-клиент (baseURL)
    │   ├── auth.ts             # getAccountSettings - проверка аккаунта
    │   ├── check-account.ts    # checkAccount - проверка номера телефона
    │   ├── sendMessage.ts      # sendMessage - отправка сообщения
    │   ├── notification.ts     # receiveNotification - получение уведомлений
    │   └── delete-notification.ts  # deleteNotification - удаление уведомления
    ├── components/             # Компоненты UI
    │   ├── Logo.tsx
    │   ├── PrivateRoute.tsx    # Защита маршрута от неавторизованных
    │   ├── chat/               # Компоненты чата (Sidebar, ChatWindow и др.)
    │   └── forms/              # Формы (LoginForm, CreateChatForm, SendMessageForm)
    ├── locales/                # Ресурсы i18n (русский язык)
    ├── page/                   # Страницы (Login, Chat, NotFoundPage)
    ├── store/                  # Zustand-сторы
    │   ├── authStore.ts        # Авторизация, учётная запись, сессия
    │   ├── chatStore.ts        # Чаты, сообщения, long polling уведомлений
    │   └── notificationPolling.ts # long polling уведомлений
    └── utils/
        └── routes.ts           # Константы маршрутов
```

## Конфигурация Green API

Базовый URL Green API задан в [`src/api/apiClient.ts`](src/api/apiClient.ts):

```ts
export const apiClient = axios.create({
  baseURL: 'https://4100.api.green-api.com',
  headers: { 'Content-Type': 'application/json' },
});
```

При необходимости (например, для другого региона или собственного прокси) замените значение `baseURL`.

## Используемые методы Green API

| Метод | Назначение |
|---|---|
| `GET /waInstance{id}/getAccountSettings/{token}` | Проверка статуса инстанса при входе |
| `POST /waInstance{id}/checkAccount/{token}` | Проверка существования номера в Telegram |
| `POST /waInstance{id}/sendMessage/{token}` | Отправка текстового сообщения |
| `GET /waInstance{id}/receiveNotification/{token}` | Получение входящего уведомления (long polling) |
| `DELETE /waInstance{id}/deleteNotification/{token}/{receiptId}` | Подтверждение обработки уведомления |

Подробнее: [документация Green API](https://green-api.com/docs/api/).

## Роутинг

| Путь | Страница | Доступ |
|---|---|---|
| `/login` | Вход в систему | Всегда |
| `/` | Чат | Только для авторизованных (`PrivateRoute`) |
| `*` | Страница 404 | Всегда |
