<template>
  <v-container
    fluid
  >
    <v-form
      v-model="formData"
    >
      <v-row>
        <v-col>
          <v-text-field
            v-model="rating.name"
            label="Название рейтинга"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            v-model="rating.games"
            :items="gamesList"
            :menu-props="{ maxHeight: '400' }"
            label="Игры"
            multiple
            chips
            hint="Выберите необходимые игры для рейтинга"
            persistent-hint
          >

            <template #selection="{ item }">
              <v-chip color="primary">
                {{ item.text }}
              </v-chip>
            </template>
            <template v-slot:item="{ active, item, attrs, on }">
              <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
                <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-html="item.text"></v-list-item-title>
                  <v-list-item-subtitle>{{ $t('common.club') }}: {{ item.club }}, {{ $t('common.judge') }}: {{ item.judge }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>

          </v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col
        >
          <v-select
            v-model="rating.type"
            :items="ratingTypes"
            filled
            label="Тип рейтинга"
          >

          </v-select>
        </v-col>
      </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="rating.date"
              label="Дата"
              prepend-icon="mdi-calendar"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row
          v-if="this.action === 'create'"
        >
          <v-col>
            <v-btn
              @click="createRating"
              dark
              color="#ff0f0f"
              class="px-2"
            >
              Создать рейтинг
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="this.action === 'update'"
        >
          <v-col>
            <v-btn
              @click="updateRating"
              dark
              color="#ff0f0f"
              class="px-2"
            >
              Обновить рейтинг
            </v-btn>
            <v-btn
              @click="deleteRating"
              dark
              color="#ff0f0f"
              class="px-2"
            >
              Удалить рейтинг
            </v-btn>
          </v-col>
        </v-row>
    </v-form>
    <p></p>
    <pre>{{rating}}</pre>
  </v-container>
</template>

<script>

const ratingobj = {
  name: "",
  date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
}

export default {

  props: {
    rating: {
      type: Object,
      default: () => (ratingobj)
    },
    action: {
      type: String }
  },

  data() {
    return {
      gamesList: {},
      ratingTypes: [
        {
          text: "Рейтинг за игровой вечер",
          value: "default"
        },
        {
          text: "Рейтинг за месяц",
          value: "time"
        }
      ],

    }
  },

  methods: {
    createRating() {

      this.$axios
        .post(`/api/ratings`, this.rating)

        .then((response) => {
          this.$store.dispatch('snackbar/setSnackbar', {text: `Рейтинг: ${response.data.message} создан`})

          this.$router.push(`/ratings`)
        })

        .catch((err) => {

          console.log(err.response.data)
        });
    },

    updateRating() {
      this.$axios
        .put(`/api/ratings`, this.rating)

        .then((response) => {
          this.$store.dispatch('snackbar/setSnackbar', {text: `Рейтинг: ${response.data.message} успешно обновлен`})

          this.$router.push(`/ratings`)
        })

        .catch((err) => {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: err.response.data.message})

          console.log(err.response.data.message)
        })
    },

    deleteRating() {

      console.log(this.rating._id)

      this.$axios
        .delete(`/api/ratings/${this.rating._id}`)

        .then((response) => {
          this.$store.dispatch('snackbar/setSnackbar', {text: response.data.message})

          this.$router.push(`/ratings`)
        })

        .catch((err) => console.log(err.response.data.message));
    },
  },

  mounted() {

    this.$axios
      .get(`/api/games/all`)
      .then(response => (this.gamesList = response.data))

  },
}
</script>


<style scoped>

pre {
  background-color: darkslategray;
  color: white;
  padding: 1em;
}

</style>
