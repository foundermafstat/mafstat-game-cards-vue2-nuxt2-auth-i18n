<template>
  <v-card
    id="account-setting-card"
    max-width="1000"
    class="mx-auto"
  >
    <!-- tabs -->
    <v-tabs
      v-if="$auth.user && $auth.user.roles === 'ADMIN'"
      v-model="tab"
      show-arrows
      color="#ff0f0f"
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.icon"
      >
        <v-icon
          size="20"
          class="me-3"
        >
          {{ tab.icon }}
        </v-icon>

      </v-tab>
    </v-tabs>

    <div
      v-else
    >
      <account-settings-stats :player="player"></account-settings-stats>
    </div>

    <!-- tabs item -->
    <v-tabs-items
      v-if="$auth.user && $auth.user.roles === 'ADMIN'"
      v-model="tab"
    >

      <v-tab-item>
        <account-settings-stats :player="player"></account-settings-stats>
      </v-tab-item>

      <v-tab-item>
        <account-settings-account :player="player"></account-settings-account>
      </v-tab-item>

      <v-tab-item>
        <account-settings-info :player="player"></account-settings-info>
      </v-tab-item>

      <v-tab-item>
        <account-settings-security :player="player"></account-settings-security>
      </v-tab-item>

    </v-tabs-items>
  </v-card>
</template>

<script>

import AccountSettingsStats from '@/components/account/AccountSettingsStats.vue'
import AccountSettingsAccount from '@/components/account/AccountSettingsAccount.vue' //AccountSettingsAccount.vue
import AccountSettingsSecurity from '@/components/account/AccountSettingsSecurity.vue' //AccountSettingsSecurity.vue
import AccountSettingsInfo from '@/components/account/AccountSettingsInfo.vue' //AccountSettingsInfo.vue


export default {
  nuxtI18n: false,

  components: {
    AccountSettingsStats,
    AccountSettingsAccount,
    AccountSettingsSecurity,
    AccountSettingsInfo
  },

  // Получаем конкретную страницу с URL, который берётся из params.


  async asyncData({ $axios, params }) {
    console.log(params)
    const { data } = await $axios.get(`/api/players/profile/${params.id}`)
    return { player: data }
  },

  data() {
    return {
      player: {},
      profile: {},
      tab:'',

      // tabs
      tabs:[
        { icon: 'mdi-equalizer-outline' },

        { icon: 'mdi-account-outline' },
        { icon: 'mdi-cog-outline' },
        { icon: 'mdi-lock-open-outline' },
      ],

      // account settings data
      accountSettingData:{
        account: {
          avatarimg: '@/assets/images/avatars/1.png',
          username: 'johnDoe',
          name: 'john Doe',
          email: 'johnDoe@example.com',
          role: 'Admin',
          status: 'Active',
          company: 'Google.inc',
        },
        information: {
          bio: 'The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scaLabel 😀, and lightning 😍 fast search and discovery experiences.',
          birthday: 'February 22, 1995',
          phone: '954-006-0844',
          website: 'https://themeselection.com/',
          country: 'USA',
          languages: ['English', 'Spanish'],
          gender: 'male',
        },
        // При нажатии на кнопку "Редактировать" показывается форма. По-умолчанию её нет в DOM.
        // На этой странице форма подключена асинхронно, то есть её нет в чанке этой страницы.
        // Код асинхронных компонентов Nuxt при сборке вырезает в отдельные js и css файлы.
        showPageForm: false,
      }
    }
  },

  head() {
    return {
      // Title и Description конкретной страницы берутся из данных, которые приходят через asyncData.
      title: `Профиль игрока mafstat: ${this.player.user.nickname}`,
      meta: [
        { hid: "description", name: "description", content: this.player.id },
        { hid: "og:title", property: "og:title", content: this.player.id },
        { hid: "og:description", property: "og:description", content: this.player.id },
      ],
    };
  },
}

</script>

<style scoped>
.nuxt-link-active {
  color: #ff0f0f;
}
</style>
