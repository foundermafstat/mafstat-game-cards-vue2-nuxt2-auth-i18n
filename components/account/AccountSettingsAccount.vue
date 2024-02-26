<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-card-text class="d-flex">
      <v-avatar
        rounded
        size="120"
        class="me-6"
      >
        <v-img :src="require('@/assets/images/avatars/3.png')"></v-img>
      </v-avatar>

      <!-- upload photo -->
      <div>
        <h1>{{player.nickname}}</h1>
        <div class="club">
            <nuxt-link :to="`/players/${$auth.user.id}`">ШКОЛА МАФИИ</nuxt-link>
        </div>
        <div class="country">
          
        </div>



        <p class="text-sm mt-5">
          Формат JPG, GIF or PNG. Макс. 800кб
        </p>
      </div>
    </v-card-text>

    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>

          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="player.nickname"
              label="Username"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="player.firstname"
              label="Name"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="accountDataLocale.email"
              label="E-mail"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="accountDataLocale.role"
              dense
              label="Role"
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-model="accountDataLocale.status"
              dense
              outlined
              label="Status"
              :items="status"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="accountDataLocale.company"
              dense
              outlined
              label="Company"
            ></v-text-field>
          </v-col>

          <!-- alert -->
          <v-col cols="12">
            <v-alert
              color="warning"
              text
              class="mb-0"
            >
              <div class="d-flex align-start">
                <v-icon color="warning">

                </v-icon>

                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Ваша электронная почта не подтверждена. Пожалуйста, проверьте свой почтовый ящик.
                  </p>
                  <a
                    href="javascript:void(0)"
                    class="text-decoration-none warning--text"
                  >
                    <span class="text-sm">Повторить отправку проверочного письма</span>
                  </a>
                </div>
              </div>
            </v-alert>
          </v-col>

          <v-col cols="12">
            <v-btn
              class="me-3 mt-4"
              dark
              color="#ff0f0f"
            >
              Сохранить изменения
            </v-btn>
            <v-btn
              dark
              color="#ff0f0f"
              outlined
              class="mt-4"
              type="reset"
              @click.prevent="resetForm"
            >
              Отмена
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  components: {
    CountryFlag
  },

  props: {
    player: {
      type: Object,
      default: () => ({}) },
      action: { type: String }
  },

  data() {
    return {

      status:['Active', 'Inactive', 'Pending', 'Closed'],

      accountDataLocale:'',

      resetForm() {
        accountDataLocale.value
      },
    }
  }
}
</script>

<style scoped>

.club {
  line-height: 40px;
}

.country {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.country span {
  padding: 0px 10px;
}

</style>
