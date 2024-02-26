<template>
  <v-app
    id="inspire"
  >

    <v-app-bar
      app
      dark
      fixed
      color="#ff0f0f"
    >
      <v-app-bar-nav-icon
        @click="drawer = true"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <nuxt-link :to="localePath({ name: 'index' })">
          <logo type="landscape" />
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <AppBarLangMenu />
      <ThemeSwitcher />
      <div v-if="$auth.loggedIn">
        <AppBarUserMenu />
      </div>
      <div v-else>
        <v-btn
          text
          href="/login"
        >
          {{ $t('login.sign_in')}}
        </v-btn>
      </div>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      color="#ff0f0f"
    >
      <TheMenu />
    </v-navigation-drawer>

    <v-main>
      <Nuxt />
    </v-main>

    <v-footer
      dark
    >

    </v-footer>

    <TheSnackbar />

  </v-app>
</template>

<script>
import Logo from '@/components/Logo'
import TheMenu from '@/layouts/components/TheMenu.vue'
import ThemeSwitcher from '@/layouts/components/ThemeSwitcher.vue'
import AppBarLangMenu from '@/layouts/components/AppBarLangMenu.vue'
import AppBarUserMenu from '@/layouts/components/AppBarUserMenu.vue'
import TheSnackbar from '@/components/TheSnackbar.vue'

export default {
  components: {
    Logo,
    TheMenu,
    ThemeSwitcher,
    AppBarLangMenu,
    AppBarUserMenu,
    TheSnackbar
  },

  loading: false,

  data: () => ({ drawer: null }),

  mounted: function() {
    // Preloader and Progress bar setup
    this.$nextTick(() => {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
        this.play = false
      }, 500)
      this.$nuxt.$loading.start()
    })
    const preloader = document.getElementById('preloader')
    if (preloader !== null || undefined) {
      preloader.remove()
    }
    // RTL initial
    const rtlURL = document.location.pathname.split('/')[1] === 'ar'
    this.$vuetify.rtl = rtlURL
  },

  head() {
    return {
      // Установка rel="canonical" на всех страницах шаблона.
      link: [{ rel: "canonical", href: `${process.env.baseUrl}${this.$route.path}` }],

      // Пример установки общих мета-тегов на страницах.
      meta: [{ hid: "og:url", property: "og:url", content: `${process.env.baseUrl}${this.$route.path}` }],
    };
  },
};
</script>

<style scoped>
#inspire {
  overflow: hidden;
}
</style>
