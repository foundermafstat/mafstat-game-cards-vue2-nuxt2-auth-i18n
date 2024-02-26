<template>
  <div>
    <div v-if="authScreen == 'login'">
      <h1>{{ $t('login.login')}}</h1>


        <p>{{ $t('login.new_player')}} <a @click="changeScreen('register')">{{ $t('login.click_reg')}}</a></p>
        <UserAuthForm
          :submitForm="loginUser" />

    </div>
    <div v-else>
      <h1>{{ $t('login.register')}}</h1>

        <p>{{ $t('login.have_account')}} <a @click="changeScreen('login')">{{ $t('login.click_login')}}</a></p>
        <UserAuthForm
          :submitForm="registerUser"
          :hasName="true"
          :registrationCheckboxes="true" />

    </div>
  </div>
</template>

<script>
  import UserAuthForm from '@/components/auth/UserAuthForm.vue';


  export default {
    data(){
      let authScreen = this.$route.query.authScreen || this.startingScreen
      return {
        authScreen,
        loading: false
      }
    },
    components: {
      UserAuthForm,
    },
    methods: {
      async loginUser(loginInfo){
        this.loading = true

        await this.$auth.loginWith('local', {
          data: loginInfo
        })

          .then((response) => {

            this.$store.dispatch('snackbar/setSnackbar', {text: `Вы авторизовались в системе, ${response.data.message}`})

            this.postLoginAction()
          })

          .catch((err) => {

            this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: err.response.data.message})
          })

        this.loading = false
      },

      async registerUser(registrationInfo){
        this.loading = true

        await this.$axios

          .post(`api/auth/register`, registrationInfo)

          .then((response) => {

            this.$auth.loginWith('local', {
              data: registrationInfo
            })

            this.$store.dispatch('snackbar/setSnackbar', {text: `Игра: ${response.data.message} успешно обновлена`})

            this.postRegisterAction()
          })

          .catch((err) => {

            this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: err.response.data.message})
          })

        this.loading = false
      },

      changeScreen(newScreen){
        this.authScreen = newScreen

        this.$router.replace({
          query: {
            ...this.$route.query,
            authScreen: newScreen,
          }
        })
      }
    },
    props: {
      postRegisterAction: {
        type: Function,
        default: () => {}
      },
      postLoginAction: {
        type: Function,
        default: () => {}
      },
      startingScreen: {
        type: String,
        default: 'login'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
