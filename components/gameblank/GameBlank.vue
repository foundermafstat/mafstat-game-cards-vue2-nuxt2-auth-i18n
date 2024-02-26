<template>
  <v-container fluid>


  <v-form
    v-model="game"
  >
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <h3>Бланк игры</h3>
        <p></p>

        <v-row
          v-for="(player, index) in formData.players"
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
            cols="2"
            xs="4"
          >
            <v-autocomplete
              v-model="player.nickname"
              :items="playersList.players"
              :filter="customFilter"
              label="Игрок"
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
      </v-tab-item>

      <v-tab-item
        class="tabitem"
      >
        <game-blank-votes :formData="formData" ></game-blank-votes>
      </v-tab-item>

      <v-tab-item>
        <h3>Информация об игре</h3>
        <p></p>
        <v-row>
          <v-col
            cols="6"
          >
            <v-select
              v-model="formData.type"
              :items="type"
              label="Тип игры"
            ></v-select>
          </v-col>

          <v-col
            cols="6"
          >
            <v-select
              v-model="formData.table"
              :items="table"
              label="№ стола"
            ></v-select>
          </v-col>

          <v-col
            cols="6"
          >
            <v-autocomplete
              v-model="formData.judge"
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
              v-model="formData.about"
              outlined
              rows="3"
              label="Комментарий судьи"
            ></v-textarea>
          </v-col>

          <v-col>
            <v-text-field
              v-model="formData.date"
              label="Дата"
              prepend-icon="mdi-calendar"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-select
              v-model="formData.result"
              :items="result"
              label="Результат"
              prepend-icon="mdi-check-bold"
            ></v-select>
          </v-col>

        </v-row>

        <v-row>
          <v-col>

            <v-btn
              @click="createGame"
              color="primary"
              class="me-3 mt-3"
            >
              Сохранить
            </v-btn>

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
      </v-tab-item>

      <v-tab-item>
        <p></p>
        <p></p>
        <p>еще че нить</p>
      </v-tab-item>

      <v-tab-item>
        <pre>{{ formData }}</pre>
        <pre>{{ playersList }}</pre>
      </v-tab-item>
    </v-tabs-items>
  </v-form>

    <v-bottom-navigation
      v-model="tab"
      shift
      fixed
      horizontal
    >
      <v-btn
        v-for="tab in tabs"
        :key="tab.icon"
        class="box"
      >
        <span>{{ tab.title }}</span>

        <v-icon>{{ tab.icon }}</v-icon>
      </v-btn>

    </v-bottom-navigation>

  </v-container>
</template>

<script>
import GameBlankVotes from '@/components/gameblank/GameBlankVotes.vue'
import blankData from '@/components/gameblank/blankdata'

export default {
  components: {
    GameBlankVotes
  },

  props: {
    game: {
      type: Object,
      default: () => ({})
    },
    action: {
      type: String
    }
  },

  templateBlank: blankData.templateBlank,

  data() {
    return {
      formData: {},
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

  watch: {
    formData:{
      handler(){
        this.updateStorage()
      },
      deep: true
    }
  },

  created(){
    const storeForm = this.getStorage()
    this.formData = {...this.$options.templateBlank, ...storeForm}
  },

  methods: {
    clearForm() {
      this.formData = {...this.$options.templateBlank}
    },

    customFilter (item, queryText, itemText) {
        const textOne = item.text.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1
    },


    createGame() {
      // Create new game
      this.$axios
        .post(`/api/games`, this.formData)
        .then(() => {
          // После успешного создания новой страницы происходит перенаправление на неё.
          this.$router.push(`/games`)
          // Очищение бланка
          this.formData = {...this.$options.templateBlank}
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

      localStorage.formData.clear()
    },

    getStorage(){
      if(process.client) {
        return JSON.parse(localStorage.getItem('formData'))
      }
    },

    setStorage(val){
      if(process.client) {
        localStorage.setItem('formData', JSON.stringify(val))
      }
    },

    updateStorage(){
      let storeForm = this.getStorage()

      storeForm = JSON.parse(JSON.stringify(this.formData))
      this.setStorage(storeForm)
    }
  },

  mounted() {

    this.$axios
      .get(`/api/players/list`)
      .then(response => (this.playersList = response.data))

  },

};
</script>


<style scoped>
.v-item-group.v-bottom-navigation--horizontal .v-btn > .v-btn__content > .v-icon {
  margin: 0px;
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
