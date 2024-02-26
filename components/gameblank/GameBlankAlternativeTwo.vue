<template>
  <v-col>
    <v-form
      v-model="formData"
    >
      <v-row
      >
        <v-expansion-panels
            focusable
            flat
          >
            <v-expansion-panel

            >
              <v-expansion-panel-header
                color="primary"
                class="panel-header"
              >
                <h3>Информация об игре</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row
                  class="pt-4"
                >
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="game.type"
                      outlined
                      :items="type"
                      label="Тип игры"
                    ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="game.table"
                      outlined
                      :items="table"
                      label="№ стола"
                    ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-autocomplete
                      v-model="game.judge"
                      outlined
                      :items="playersList.players"
                      :filter="customFilter"
                      label="Судья игры"
                    >
                      <template v-slot:item="data">
                        <v-list-item-content>
                          <v-list-item-title v-html="data.item.text"></v-list-item-title>
                          <v-list-item-subtitle v-html="data.item.club.name"></v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </v-autocomplete>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-autocomplete
                      v-model="game.club"
                      outlined
                      :items="clubsList.clubs"
                      :filter="customFilter"
                      label="Клуб игры"
                    >
                      <template v-slot:item="data">
                        <v-list-item-content>
                          <v-list-item-title v-html="data.item.text"></v-list-item-title>
                          <v-list-item-subtitle v-html="data.item.value.city"></v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </v-autocomplete>
                  </v-col>

                  

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="game.date"
                      outlined
                      label="Дата"
                    ></v-text-field>
                  </v-col>

                </v-row>

                <v-row>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-textarea
                      v-model="game.about"
                      outlined
                      rows="3"
                      label="Комментарий судьи"
                    ></v-textarea>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="game.result"
                      outlined
                      :items="result"
                      label="Результат"
                    ></v-select>
                  </v-col>

                </v-row>

                <v-row
                  v-if="this.action === 'create'"
                  class="pb-4"
                >
                  <v-col>

                    <v-btn
                      @click="createGame"
                      color="primary"
                      class="mr-4"
                    >
                      Сохранить
                    </v-btn>

                    <v-btn
                      outlined
                      class="mr-4"
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
                  class="pb-4"
                >
                  <v-col>

                    <v-btn
                      @click="updateGame"
                      color="primary"
                      class="mr-4"
                    >
                      Обновить
                    </v-btn>

                    <v-btn
                      @click="deleteGame"
                      color="primary"
                      outlined
                      class="mr-4"
                    >
                      Удалить
                    </v-btn>

                  </v-col>
                </v-row>

              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel

            >
              <v-expansion-panel-header
                color="primary"
                class="panel-header"
              >
                <h3>JSON игры, отладка</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>Бланк Игры:</p>
                <pre>{{game}}</pre>

                <p>Игроки:</p>
                <pre>{{playersList}}</pre>
              </v-expansion-panel-content>
            </v-expansion-panel>

        </v-expansion-panels>

      </v-row>

      <v-row

      >
        <v-col
          cols="12"
          md="6"
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
            >
              <v-autocomplete
                v-model="player.nickname"
                :items="playersList.players"
                :filter="customFilter"
                class="noticon"
                hide-details
                outlined
              >
                <template v-slot:item="data">
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.text"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.club.name"></v-list-item-subtitle>
                    </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>

            <v-col
              class="fouls"
              no-gutters
            >
              <v-select
                v-model="player.fouls"
                :items="fouls"
                class="noticon"
                hide-details
                outlined
              ></v-select>
            </v-col>

            <v-col
              class="role"
              no-gutters
            >
              <v-select
                v-model="player.role"
                :items="roles"
                class="noticon"
                hide-details
                outlined
              ></v-select>
            </v-col>


            <v-col
              class="fouls"
              no-gutters
            >
              <v-select
                v-model="player.extra"
                :items="extrapoints"
                class="noticon"
                hide-details
                outlined
              ></v-select>


            </v-col>

          </v-row>

          <v-row

          >
            <v-col
            >
              <v-select
                v-model="game.result"
                :items="result"
                label="Результат игры"
                prepend-icon="mdi-check-bold"
              ></v-select>
            </v-col>
          </v-row>

        </v-col>

        <v-col
          cols="12"
          md="6"
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
    authUser: {
      type: Object
    },
    gameblank: {
      type: Object
    },
    action: {
      type: String
    }
  },

  data() {
    return {
      game: {},
      authUser: {},
      formData: {},
      gameblank: {},
      storeForm: {},
      playersList: {},
      clubsList: {},

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

  watch: {
    game:{
      handler(){
        this.updateStorage()
      },
      deep: true
    }
  },

  created(){

    if(this.gameblank) {
      this.game = this.gameblank

    }else{
      const storeForm = this.getStorage()

      if(storeForm){
        this.game = storeForm
      }else{
        this.game = blankData.templateBlank
        this.game.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString()
      }
    }
  },

  mounted() {
    this.$axios
      .get(`/api/players/list`)
      .then(response => (this.playersList = response.data))

    this.$axios
      .get(`/api/clubs/list`)
      .then(response => (this.clubsList = response.data))
  },

  methods: {

    //localStorage

    getStorage(){
      if(process.client) {
        return JSON.parse(localStorage.getItem('game'))
      }
    },

    setStorage(val){
      if(process.client) {
        localStorage.setItem('game', JSON.stringify(val))
      }
    },

    updateStorage(){
      let storeForm = this.getStorage()

      storeForm = JSON.parse(JSON.stringify(this.game))

      this.setStorage(storeForm)
    },

    deleteStorage(){
      if(process.client) {
        localStorage.removeItem('game')
      }
    },

    //

    clearForm() {
      this.game = blankData.templateBlank
      this.game.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString()

      this.deleteStorage()
    },

    customFilter (item, queryText, itemText) {
        const textOne = item.text.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1
    },

    //CRUD game

    createGame() {

      this.$axios

        .post(`/api/games`, this.game)

        .then((response) => {

          this.$store.dispatch('snackbar/setSnackbar', {text: `Игра: ${response.data.message} успешно сохранена`})

          this.game = blankData.templateBlank

          this.deleteStorage()

          this.$router.push(`/games`)

        })
        .catch((err) => {

          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: err.response.data.message})

          console.log(err.response.data.message)
        })
    },

    updateGame() {

      this.$axios

        .put(`/api/games`, this.game)

        .then((response) => {

          this.$store.dispatch('snackbar/setSnackbar', {text: `Игра: ${response.data.message} успешно обновлена`})

          this.deleteStorage()

          this.$router.push(`/games`)
        })

        .catch((err) => {

          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: err.response.data.message})

          console.log(err.response.data.message)
        })

    },

    deleteGame() {

      this.$axios

        .delete(`/api/games/${this.game._id}`)

        .then((response) => {

          this.$store.dispatch('snackbar/setSnackbar', {text: `Игра: ${response.data.message} удалена`})

          this.deleteStorage()

          this.$router.push(`/games`)
        })
        .catch((err) => {

          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: err.response.data.message})

          console.log(err.response.data.message)
        })

    },

  },



};
</script>


<style scoped>

.panel-header {
  color: #fff;
}

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
