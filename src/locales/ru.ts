export default {
  translation: {
    loginPage: {
      telegram: 'Telegram',
      greenAPI: 'GREEN-API',
      separator: 'x',
    },
    chatPage: {
      sidebarHeader: {
        logout: 'Выйти',
      },
      chatHeader: {
        icon: '@',
        back: 'Назад к чатам',
      },
      chatListItem: {
        avatar: {
          defAvatar: 'default_avatar',
        },
      }
    },
    notFoundPage: {
      title: 'Страница не найдена',
      description: 'Кажется, такой страницы не существует. Возможно, ссылка устарела или адрес введён с ошибкой.',
      button: 'На главную',
      error: '404',
    },
    validation: {
      errors: {
        idInstanceRequired: 'ID инстанса не может быть пустым',
        apiTokenInstanceRequired: 'API токен инстанса не может быть пустым',
      },
    },
    forms: {
      createChatForm: {
        input: {
          phoneNumber: 'Номер: 79001234567',
        },
        button: {
          createChat: 'Создать чат',
          icon: '+',
        },
        error: {
          message: 'Пользователь не зарегистрирован в Telegram',
        },
      },
      loginForm: {
        button: {
          enter: 'Войти',
          checking: 'Проверка...'
        },
        idInstance: 'Ваш ID инстанса',
        apiTokenInstance: 'Ваш API токен инстанса',
      },
      sendMessageForm: {
        input: {
          enterMessage: 'Введите сообщение...',
        },
        button: {
          send: 'Отправить',
        },
        error: {
          message: 'Пользователь не зарегестрирован в Telegram',
        },
      },
    },
  }
};