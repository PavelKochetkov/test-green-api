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
      },
    },
    errors: {
      networkError: 'Ошибка сети. Пожалуйста, попробуйте позже.',
      unknownError: 'Произошла неизвестная ошибка. Пожалуйста, повторите запрос.',
      unauthorized: 'Проблема с авторизацией, проверьте корректность введённых данных.',
      unauthorizedInstance: 'Инстанс не авторизован в системе. Для авторизации инстанса перейдите в личный кабинет GREEN-API',
      instance: 'Инстанс находится в процессе запуска/перезапуска либо срок действия инстанса истёк. Перейдите в личный кабинет GREEN-API'
    }
  }
};