<template>
  <v-col>
    <v-form
      v-model="formData"
    >
    <v-row
    >
      <v-expansion-panels
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h3>Информация об игре</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col
                  cols="6"
                >
                  <v-select
                    v-model="game.type"
                    outlined
                    :items="type"
                    label="Тип игры"
                  ></v-select>
                </v-col>

                <v-col
                  cols="6"
                >
                  <v-select
                    v-model="game.table"
                    outlined
                    :items="table"
                    label="№ стола"
                  ></v-select>
                </v-col>

                <v-col
                  cols="6"
                >
                  <v-autocomplete
                    v-model="game.judge"
                    outlined
                    :items="playersList.players"
                    :filter="customFilter"
                    label="Судья игры"
                    pt-0
                  ></v-autocomplete>
                </v-col>

              </v-row>

              <v-row>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="game.about"
                    outlined
                    rows="3"
                    label="Комментарий судьи"
                  ></v-textarea>
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="game.date"
                    outlined
                    label="Дата"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>

                <v-col>
                  <v-select
                    v-model="game.result"
                    :items="result"
                    label="Результат"
                    prepend-icon="mdi-check-bold"
                  ></v-select>
                </v-col>

              </v-row>

              <v-row
                v-if="this.action === 'create'"
              >
                <v-col>
                  <v-btn
                    @click="createGame"
                    color="primary"
                    class="me-3 mt-3"
                  >
                    Сохранить
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    outlined
                    class="mt-3"
                    color="primary"
                    type="reset"
                    @click="clearForm"
                  >
                    Очистить
                  </v-btn>
                </v-col>
              </v-row>
              <v-row
                v-if="this.action === 'update'"
              >
                <v-col>
                  <v-btn
                    @click="updateGame"
                    color="primary"
                    class="me-3 mt-3"
                  >
                    Обновить
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    @click="deleteGame"
                    color="primary"
                    outlined
                  >
                    Удалить
                  </v-btn>
                </v-col>
              </v-row>

            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h3>Тело запроса, JSON</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col>
                  <pre>{{game}}</pre>
                </v-col>
              </v-row>

            </v-expansion-panel-content>
          </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row
      cols="12"
    >
      <v-col
        cols="12"
        md="5"
      >
        <h3>Бланк игры</h3>
        <p></p>
        <v-row
          no-gutters
        >
          <v-col
            class="flex num"
          >
            <span>#</span>
          </v-col>

          <v-col
            cols="4"
            xs="4"
            class="player"
            no-gutters
          >
            <h5>Игрок</h5>
          </v-col>

          <v-col
            class="fouls"
            no-gutters
          >
            <h5>Фол</h5>
          </v-col>

          <v-col
            class="role"
            cols="2"
            no-gutters
          >
            <h5>Роль</h5>
          </v-col>

          <v-col
            class="fouls"
            no-gutters
          >
            <h5>Доп</h5>
          </v-col>

        </v-row>

        <v-row
          v-for="(player, index) in game.players"
          :key="index"
          class="d-flex flex-row mt-0"
          no-gutters
        >

          <v-col
            class="num flex"
            no-gutters

          >
            <span>{{index+1}}</span>
          </v-col>

          <v-col
            class="player"
            cols="4"
            xs="6"
          >
            <v-autocomplete
              v-model="player.nickname"
              :items="playersList.players"
              :filter="customFilter"
              hide-details
              outlined
            ></v-autocomplete>
          </v-col>

          <v-col
            class="fouls"
            cols="1"
            xs="2"
            no-gutters
          >
            <v-select
              v-model="player.fouls"
              :items="fouls"
              hide-details
              outlined
            ></v-select>
          </v-col>

          <v-col
            class="role"
            cols="2"
            xs="3"
            no-gutters
          >
            <v-select
              v-model="player.role"
              :items="roles"
              hide-details
              outlined
            ></v-select>
          </v-col>


          <v-col
            class="fouls"
            cols="1"
            xs="2"
            no-gutters
          >
            <v-select
              v-model="player.extra"
              :items="extrapoints"
              hide-details
              outlined
            ></v-select>


          </v-col>

        </v-row>

        <v-row>

          <v-col
          >
            <v-select
              v-model="game.result"
              :items="result"
              label="Результат"
              prepend-icon="mdi-check-bold"
            ></v-select>
          </v-col>
        </v-row>

      </v-col>

      <v-col
        cols="12"
        md="7"
      >
        <game-blank-votes :game="game" ></game-blank-votes>
      </v-col>


    </v-row>
    </v-form>
  </v-col>
</template>

<script>
import GameBlankVotes from '@/components/gameblank/GameBlankVotes.vue'
import blankData from '@/components/gameblank/blankdata'

export default {
  components: {
    GameBlankVotes
  },

  props: {
    gameblank: {
      type: Object,
      default: blankData.templateBlank
    },
    action: {
      type: String
    }
  },

  data() {
    return {
      game: {},
      gameblank: {},
      storeForm: {},
      playersList: {},

      type:blankData.type,
      roles:blankData.roles,
      fouls:blankData.fouls,
      point:blankData.point,
      table:blankData.table,
      result:blankData.result,
      extrapoints:blankData.extrapoints,

      tab:'',

      // tabs
      tabs:[
        { title: 'Бланк', icon: 'mdi-application-outline' },
        { title: 'Голос', icon: 'mdi-application-edit-outline' },
        { title: 'Инфо', icon: 'mdi-application-cog-outline' },
        { title: 'Тест', icon: 'mdi-application-parentheses-outline' },
        { title: 'Отладка', icon: 'mdi-application-array-outline' },
      ]
    }
  },

  created(){
    this.game = { ...this.gameblank}
  },

  mounted() {

    this.$axios
      .get(`/api/players/list`)
      .then(response => (this.playersList = response.data))
  },

  methods: {


    clearForm() {
      this.game = { ...this.gameblank}
    },

    customFilter (item, queryText, itemText) {
        const textOne = item.text.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1
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
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: err.response.data.message})
          console.log(err.response.data.message);
        });

    },

    deleteGame() {
      // При удалении страницы также используем текущий URL, а не изменяемый URL в форме.
      this.$axios
        .delete(`/api/games/${this.game._id}`)
        .then(() => {
          this.$router.push(`/games`);
        })
        .catch((err) => console.log(err.response.data.message));

    },

  },



};
</script>


<style scoped>

.v-item-group.v-bottom-navigation--horizontal .v-btn > .v-btn__content > .v-icon {
  margin: 0px;
}



.role, .player {
  min-width: 86px;
}

.fouls {
  min-width: 54px;
  max-width: 54px;
}

.num {
  max-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.num span {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info {
  background: #ff0f0f;
  color: #fff;
}

.v-text-field {
  padding: 0px;
  margin: 0px;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

pre {
  background-color: darkslategray;
  color: white;
  padding: 1em;
}

.tabitem {
  margin-bottom: 36px;
}

.votes {
  margin-bottom: 20px;
}

</style>
