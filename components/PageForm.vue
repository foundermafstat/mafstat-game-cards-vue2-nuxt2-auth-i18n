<template>
  <v-col
    class="pa-4"
  >

    <p><v-spacer></v-spacer></p>

    <v-form
      v-model="formData"
    >
      <v-text-field
        v-model="player.nickname"
        label="Никнейм игрока"
      ></v-text-field>

      <v-text-field
        v-model="player.firstname"
        label="Имя игрока"
      ></v-text-field>

      <v-text-field
        v-model="player.lastname"
        label="Фамилия игрока"
      ></v-text-field>

      <v-radio-group
        v-model="player.sex"
        row
        label="Пол игрока"
      >
        <v-radio
          label="Мужской"
          value="male"
        ></v-radio>
        <v-radio
          label="Женский"
          value="female"
        ></v-radio>
      </v-radio-group>
      <v-row
        justify="space-around"
        align="center"
      >
        <v-date-picker
          v-model="player.birthday"
          flat
        ></v-date-picker>
      </v-row>

      <v-row
        v-if="this.action === 'create'"
      >
        <v-col>
          <v-btn
            @click="createPlayer"
            color="primary"
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
            @click="updatePlayer"
            color="primary"
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
            @click="deletePlayer"
            color="primary"
          >
            Удалить
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <p></p>
    <pre>{{ player }}</pre>
    <p></p>
  </v-col>
</template>


<script>
export default {
  // Это переиспользуемый компонент с формой для создания/редактирования/удаления страницы.
  // В зависимости от поступаемых пропсов меняется отображение кнопок.
  // Если компонент используется для редактирования текущей страницы, то в него передаются её данные.
  props: { player: { type: Object, default: () => ({}) }, action: { type: String } },

  // Нам потребуется текущий URL страницы, которые не будет связан с input формы.
  data() {
    return {
      id: "",
      player: {},
    };
  },
  methods: {
    createPlayer() {
      // Создаём новую страницу.
      this.$axios
        .post(`/api/players`, this.player)
        .then(() => {
          // После успешного создания новой страницы происходит перенаправление на неё.
          this.$router.push(`/players`);
        })
        .catch((err) => {
          // Если страница не создана, то в консоль выводим ошибку из бэкенда.
          console.log(err.response.data.message);
        });
    },
    updatePlayer() {
      // При обновлении текущей страницы нужен исходный URL для запроса в API.
      this.$axios
        .put(`/api/players`, this.player)
        .then(() => {
          // После обновления контента происходит перенаправление на страницу со списком страниц.
          this.$router.push(`/players`);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    deletePlayer() {
      // При удалении страницы также используем текущий URL, а не изменяемый URL в форме.
      this.$axios
        .delete(`/api/players/${this.id}`)
        .then(() => {
          this.$router.push(`/players`);
        })
        .catch((err) => console.log(err.response.data.message));
    },
  },
  mounted() {
    // Сохраняем текущий URL на стадии mount компонента.
    this.id = this.player._id;
  },
};
</script>


<style scoped>
.form-wrapper {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: 0.5em;
  box-sizing: border-box;
}
@media (min-width: 650px) {
  .attendee {
    display: flex;
  }
}

@media (min-width: 720px) {
  .attendee {
    display: block;
  }
}

@media (min-width: 850px) {
  .attendee {
    display: flex;
  }
  .attendee .formulate-input {
    margin-right: 1.5em;
  }
}
.attendee .formulate-input {
  margin-right: 2em;
  margin-bottom: 0;
}

strong {
  display: block;
  margin: 1em 0;
}

strong.price {
  margin-top: 1.25em;
  margin-bottom: 0;
  height: 2.5em;
  display: inline-flex;
  align-items: center;
}

code {
  margin-top: 2em;
}

pre {
  background-color: darkslategray;
  color: white;
  padding: 1em;
}
</style>
