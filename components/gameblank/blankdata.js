export default {

  templateBlank: {
    bestmove: [],
    vote: [
      {
        result:[]
      }
    ],
    players: [
      {
        slot: 1,
        fouls: 0,
        point: 0,
        extra: 0
      },
      {
        slot: 2,
        fouls: 0,
        point: 0,
        extra: 0
      },
      {
        slot: 3,
        fouls: 0,
        point: 0,
        extra: 0
      },
      {
        slot: 4,
        fouls: 0,
        point: 0,
        extra: 0
      },
      {
        slot: 5,
        fouls: 0,
        point: 0,
        extra: 0
      },
      {
        slot: 6,
        fouls: 0,
        point: 0,
        extra: 0
      },
      {
        slot: 7,
        fouls: 0,
        point: 0,
        extra: 0
      },
      {
        slot: 8,
        fouls: 0,
        point: 0,
        extra: 0
      },
      {
        slot: 9,
        fouls: 0,
        point: 0,
        extra: 0
      },
      {
        slot: 10,
        fouls: 0,
        point: 0,
        extra: 0
      }
    ],
    date: ''
  },

  roles:[
    {
      text: ""
    },
    {
      text: "Мафия",
      value: {
        name: "mafia",
        label: "Мафия",
        civilian: 0,
        mafia: 1,
        sheriff: 0,
        don: 0
      }
    },
    {
      text: "Дон",
      value: {
        name: "don",
        label: "Дон",
        civilian: 0,
        mafia: 0,
        sheriff: 0,
        don: 1
      }
    },
    {
      text: "Шериф",
      value: {
        name: "sheriff",
        label: "Шериф",
        civilian: 0,
        mafia: 0,
        sheriff: 1,
        don: 0
      }
    },
  ],

  candidates: [
    1,2,3,4,5,6,7,8,9,10
  ],

  extrapoints: [
    0, 0.2, 0.25, 0.3, 0.4, 0.5, 0.1, -0.4, -0.5, 0.6, 0.7
  ],

  table: [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
  ],

  fouls: [
    0,1,2,3,4
  ],

  point: [
    0,1
  ],

  type: [
    {
      text: "Рейтинговая",
      value: {
        label: "Рейтинговая",
        game: "rating"
      }
    },
    {
      text: "Обычная",
      value: {
        label: "Обычная",
        game: "basic"
      }
    },
    {
      text: "Турнирная",
      value: {
        label: "Турнирная",
        game: "tournament"
      }
    },
    {
      text: "Тренинговая",
      value: {
        label: "Тренинговая",
        game: "training"
      }
    },
    {
      text: "Тестовая",
      value: {
        label: "Тестовая",
        game: "test"
      }
    }
  ],

  result: [
    {
      text: "Мирные",
      value: {
        label: "Мирные",
        civilian: 1,
        mafia: 0,
        deadheat: 0
      }
    },
    {
      text: "Мафия",
      value: {
        label: "Мафия",
        civilian: 0,
        mafia: 1,
        deadheat: 0
      }
    },
    {
      text: "Ничья",
      value: {
        label: "Ничья",
        civilian: 0,
        mafia: 0,
        deadheat: 1
      }
    },
  ]
}
