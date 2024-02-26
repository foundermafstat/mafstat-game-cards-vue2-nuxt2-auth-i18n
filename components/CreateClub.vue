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
            v-model="club.name"
            label="Название клуба"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="club.city"
            label="Город"
          ></v-text-field>
        </v-col>
      </v-row>

        <v-row
          v-if="this.action === 'create'"
        >
          <v-col>
            <v-btn
              @click="createClub"
              dark
              color="#ff0f0f"
              class="px-2"
            >
              Создать клуб
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="this.action === 'update'"
        >
          <v-col>
            <v-btn
              @click="updateClub"
              dark
              color="#ff0f0f"
              class="px-2"
            >
              Обновить клуб
            </v-btn>
            <v-btn
              @click="deleteClub"
              dark
              color="#ff0f0f"
              class="px-2"
            >
              Удалить клуб
            </v-btn>
          </v-col>
        </v-row>
    </v-form>
    <p></p>
    <pre>{{club}}</pre>
  </v-container>
</template>

<script>

const clubobj = {
  name: "",
  city: "",
  date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
}

export default {

  props: {
    club: {
      type: Object,
      default: () => (clubobj)
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
    createClub() {

      this.$axios
        .post(`/api/clubs`, this.club)

        .then((response) => {
          this.$store.dispatch('snackbar/setSnackbar', {text: `Рейтинг: ${response.data.message} создан`})

          this.$router.push(`/clubs`)
        })

        .catch((err) => {

          console.log(err.response.data)
        });
    },

    updateClub() {
      this.$axios
        .put(`/api/clubs`, this.rating)

        .then((response) => {
          this.$store.dispatch('snackbar/setSnackbar', {text: `Рейтинг: ${response.data.message} успешно обновлен`})

          this.$router.push(`/clubs`)
        })

        .catch((err) => {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: err.response.data.message})

          console.log(err.response.data.message)
        })
    },

    deleteClub() {

      console.log(this.clubs._id)

      this.$axios
        .delete(`/api/clubs/${this.rating._id}`)

        .then((response) => {
          this.$store.dispatch('snackbar/setSnackbar', {text: response.data.message})

          this.$router.push(`/clubs`)
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
