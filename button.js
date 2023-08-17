const { Keyboard } = require('vk-io');

const startKeyBoard = Keyboard.keyboard ([
  [
    Keyboard.textButton({
      label: '📅Расписание',
      color: Keyboard.SECONDARY_COLOR
    }),
    Keyboard.textButton({
      label: '🚪Кабинет', 
      color: Keyboard.PRIMARY_COLOR
    }),
  ],
  [
    Keyboard.textButton({
      label: '🎓Преподователь',
      color: Keyboard.POSITIVE_COLOR
    }),
    Keyboard.textButton({
      label: '📜Справка',
      color: Keyboard.NEGATIVE_COLOR
    }),
  ],
  [
    Keyboard.textButton({
      label: 'Изменить свою группу',
      color: Keyboard.SECONDARY_COLOR 
    }),
  ]
])

  JSON.stringify({buttons:[[{action:{type:"text", label:"Когда был создан бот"}, color: "primary" }, {action:{type:"text", label:"Стоимость бота в месяц"}, color: "primary" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false})
  const backButton = Keyboard.keyboard ([[
    Keyboard.textButton({
        label: 'Назад',
        color: Keyboard.NEGATIVE_COLOR
    })
  ]])

const Reference = Keyboard.keyboard ([[
    Keyboard.textButton({
        label: 'Информация о боте',
        color: 'primary'
    }),
    ],
    [
        Keyboard.textButton({
            label: 'Назад',
            color: Keyboard.NEGATIVE_COLOR
        })
    ]
])
const priceBot = Keyboard.keyboard ([[
    Keyboard.textButton({
        label: 'Купить',
        color: Keyboard.SECONDARY_COLOR,
    }),
    ],
    [
        Keyboard.textButton({
            label: 'Назад',
            color: Keyboard.NEGATIVE_COLOR
        })
    ]
])

const changeGroup = Keyboard.keyboard ([[
  Keyboard.textButton({
      label: 'Купить',
      color: Keyboard.SECONDARY_COLOR,
  }),
  ],
  [
      Keyboard.textButton({
          label: 'Назад',
          color: Keyboard.NEGATIVE_COLOR
      })
  ]
])

const group = Keyboard.keyboard ([[
    Keyboard.textButton({
        label: 'Первая',
        color: 'primary',
    }),
    Keyboard.textButton({
        label: 'Вторая',
        color: Keyboard.PRIMARY_COLOR,
    }),
    ],
    [
        Keyboard.textButton({
            label: 'Назад',
            color: Keyboard.NEGATIVE_COLOR
        })
    ]
])

module.exports = {
    startKeyBoard,
    backButton,
    Reference,
    priceBot,
    group
}