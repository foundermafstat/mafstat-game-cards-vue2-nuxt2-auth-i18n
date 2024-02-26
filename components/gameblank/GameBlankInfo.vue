<template>
  <div>
    <p></p>
    <p></p>
    <v-row>
      <v-col cols="12">
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
  </div>
</template>

<script>
import blankData from '@/components/gameblank/blankdata'



export default {

  templateBlank: blankData.templateBlank,

  props: {
    formData: {
      type: Object,
      default: () => ({}) },
      action: { type: String }
  },

  data() {
    return {
      storeForm: {},

      result:blankData.result,
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


    createGame() {
      // Create new game
      this.$axios
        .post(`/api/games`, this.formData)
        .then(() => {
          // После успешного создания новой страницы происходит перенаправление на неё.
          this.$router.push(`/games`);
        })
        .catch((err) => {
          // Если страница не создана, то в консоль выводим ошибку из бэкенда.
          console.log(err.response.data.message);
        });

      this.formData = {...this.$options.templateBlank}
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
  }
}
</script>

<style scoped>

</style>
