<template>
  <v-card
    max-width="600"
    class="mx-auto pa-6"
  >
    <v-sheet v-if="$route.query.redirect" color="green lighten-3" class="text-center">
      Войдите или зарегистрируйтесь, чтобы получить доступ {{$route.query.redirect}}.
    </v-sheet>
    <UserAuthTogglableForm
      loginPhrase="Авторизация"
      registerPhrase="Регистрация"
      :postLoginAction="redirect"
      :postRegisterAction="redirect"
    />
  </v-card>
</template>

<script>
  import UserAuthTogglableForm from '@/components/auth/UserAuthTogglableForm'

  export default {
    components: {
      UserAuthTogglableForm
    },
    methods: {
      redirect(){
        const REDIRECT_URI = this.$route.query.redirect || '/'
        this.$router.push(REDIRECT_URI)
      }
    }
  }
</script>

<style scoped>

</style>
