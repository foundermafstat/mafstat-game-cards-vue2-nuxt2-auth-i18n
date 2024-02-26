<template>
  <v-container fluid>
    <v-form
      v-model="formData"
    >
        <v-row
          v-for="(player, index) in game.players"
          :key="index"
          class="d-flex flex-row mt-0"
          no-gutters
        >

          <v-avatar
            size="30"
            v-text="index+1"
          >
          </v-avatar>

          <v-col
            cols="3"
            xs="5"
          >
            <v-autocomplete
              v-model="player.nickname"
              :items="playersList"
              :filter="customFilter"
              label="Выберите ник"
              pt-0
            ></v-autocomplete>
          </v-col>

          <v-col
            class="px-2"
          >
            <v-select
              v-model="player.fouls"
              :items="fouls"
              label="Фолы"
            ></v-select>
          </v-col>
          <v-col

          >
            <v-select
              v-model="player.role"
              :items="roles"
              label="Роль"
            ></v-select>
          </v-col>
          <v-col

          >
            <v-select
              v-model="player.point"
              :items="point"
              label="Победа"
            ></v-select>
          </v-col>
          <v-col

          >
            <v-select
              v-model="player.extra"
              :items="extrapoints"
              label="Доп"
            ></v-select>
          </v-col>

        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="game.date"
              label="Дата"
              prepend-icon="mdi-calendar"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col

          >
            <v-select
              v-model="game.result"
              :items="result"
              label="Результат"
            ></v-select>
          </v-col>
        </v-row>
        <v-row
          v-if="this.action === 'create'"
        >
          <v-col>
            <v-btn
              @click="createGame"
              dark
              color="#ff0f0f"
            >
              Сохранить
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          v-if="this.action === 'update'"
        >
          <v-col>
            <v-btn
              @click="updateGame"
              dark
              color="#ff0f0f"
            >
              Обновить
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          v-if="this.action === 'update'"
        >
          <v-col>
            <v-btn
              @click="deleteGame"
              dark
              color="#ff0f0f"
            >
              Удалить
            </v-btn>
          </v-col>
        </v-row>
    </v-form>
    <p></p>
    <pre>{{ game }}</pre>
    <pre>{{ playersList }}</pre>
  </v-container>
</template>

<script>

export default {
  // Это переиспользуемый компонент с формой для создания/редактирования/удаления страницы.
  // В зависимости от поступаемых пропсов меняется отображение кнопок.
  // Если компонент используется для редактирования текущей страницы, то в него передаются её данные.
  props: { game: { type: Object, default: () => ({}) }, action: { type: String } },

  // Нам потребуется текущий URL страницы, которые не будет связан с input формы.
  data() {
    return {
      id: "",
      addfoul:0,
      formData: {
        players: [{
            slot: 1,
            fouls: 0,
            point: 0,
            extra: 0,
            role: {
              name: "civilian",
              label: "Мирный",
              civilian: 1,
              mafia: 0,
              sheriff: 0,
              don: 0
            }
          },{
            slot: 2,
            fouls: 0,
            point: 0,
            extra: 0,
            role: {
              name: "civilian",
              label: "Мирный",
              civilian: 1,
              mafia: 0,
              sheriff: 0,
              don: 0
            }
          },{
            slot: 3,
            fouls: 0,
            point: 0,
            extra: 0,
            role: {
              name: "civilian",
              label: "Мирный",
              civilian: 1,
              mafia: 0,
              sheriff: 0,
              don: 0
            }
          },{
            slot: 4,
            fouls: 0,
            point: 0,
            extra: 0,
            role: {
              name: "civilian",
              label: "Мирный",
              civilian: 1,
              mafia: 0,
              sheriff: 0,
              don: 0
            }
          },{
            slot: 5,
            fouls: 0,
            point: 0,
            extra: 0,
            role: {
              name: "civilian",
              label: "Мирный",
              civilian: 1,
              mafia: 0,
              sheriff: 0,
              don: 0
            }
          },{
            slot: 6,
            fouls: 0,
            point: 0,
            extra: 0,
            role: {
              name: "civilian",
              label: "Мирный",
              civilian: 1,
              mafia: 0,
              sheriff: 0,
              don: 0
            }
          },{
            slot: 7,
            fouls: 0,
            point: 0,
            extra: 0,
            role: {
              name: "civilian",
              label: "Мирный",
              civilian: 1,
              mafia: 0,
              sheriff: 0,
              don: 0
            }
          },{
            slot: 8,
            fouls: 0,
            point: 0,
            extra: 0,
            role: {
              name: "civilian",
              label: "Мирный",
              civilian: 1,
              mafia: 0,
              sheriff: 0,
              don: 0
            }
          },{
            slot: 9,
            fouls: 0,
            point: 0,
            extra: 0,
            role: {
              name: "civilian",
              label: "Мирный",
              civilian: 1,
              mafia: 0,
              sheriff: 0,
              don: 0
            }
          },{
            slot: 10,
            fouls: 0,
            point: 0,
            extra: 0,
            role: {
              name: "civilian",
              label: "Мирный",
              civilian: 1,
              mafia: 0,
              sheriff: 0,
              don: 0
            }
          }
        ],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      },
      playersList: {},
      roles: [
        {
          text: "Мирный",
          value: {
            name: "civilian",
            label: "Мирный",
            civilian: 1,
            mafia: 0,
            sheriff: 0,
            don: 0
          }
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
        }
      ],
      extrapoints: [
        0, 0.5, 0.4, 0.3, 0.25, 0.2, 0.1, -0.4, -0.5, 0.6, 0.7
      ],
      fouls: [
        0,1,2,3,4
      ],
      point: [
        0,1
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
  },
  methods: {
    handleInput(val){
      console.log(val)
    },
    customFilter (item, queryText, itemText) {
        const textOne = item.text.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1
    },
    increment() {
      this.player.fouls++;
    },
    createGame() {
      // Create new game
      this.$axios
        .post(`/api/games`, this.game)
        .then(() => {
          // После успешного создания новой страницы происходит перенаправление на неё.
          this.$router.push(`/games`);
        })
        .catch((err) => {
          // Если страница не создана, то в консоль выводим ошибку из бэкенда.
          console.log(err.response.data.message);
        });
    },
    updateGame() {
      // При обновлении текущей страницы нужен исходный URL для запроса в API.
      this.$axios
        .put(`/api/games`, this.game)
        .then(() => {
          // После обновления контента происходит перенаправление на страницу со списком страниц.
          this.$router.push(`/games`);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    deleteGame() {
      // При удалении страницы также используем текущий URL, а не изменяемый URL в форме.
      this.$axios
        .delete(`/api/games/${this.id}`)
        .then(() => {
          this.$router.push(`/games`);
        })
        .catch((err) => console.log(err.response.data.message));
    },
  },
  mounted() {

    this.$axios
      .get(`/api/players/list`)
      .then(response => (this.playersList = response.data))

    // Сохраняем текущий URL на стадии mount компонента.
    this.id = this.game._id;
  },
};
</script>


<style scoped>
.v-text-field {
  padding: 0;
  margin: 0;
}

.width {
  max-width: 60%;
}

.info {
  display: flex;
  flex-direction: row;
}

.formulate-input{
  display: block;
}

pre {
  background-color: darkslategray;
  color: white;
  padding: 1em;
}


</style>
