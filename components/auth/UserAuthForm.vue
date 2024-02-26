<template>
  <v-form v-model="valid">
    <v-text-field 
      v-model="userInfo.nickname"
      :label="$t('login.enter_nick')"
      color="success"
      :rules="[required('name')]"
      v-if="hasName" 
    />

    <v-autocomplete
      v-model="userInfo.club"
      :label="$t('login.enter_club')"
      :items="clubsList.clubs"
      :filter="customFilter"
      hide-details
      v-if="hasName" 
    >
      <template v-slot:item="data">
        <v-list-item-content>
          <v-list-item-title v-html="data.item.text"></v-list-item-title>
          <v-list-item-subtitle v-html="data.item.value.city"></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>

    <v-text-field 
      v-model="userInfo.email"
      :label="$t('login.email')"
      color="success"
      :rules="[required('email'), emailFormat()]"
    />

    <UserAuthPassword v-model="userInfo.password"
                      :label="$t('login.password')" />

    <UserAuthPassword v-model="userInfo.repassword"
                      :label="$t('login.repassword')"
                      v-if="hasName" />

    <div v-if="registrationCheckboxes">
      <!-- v-model connects it with the userInfo hash, value makes the :rules work -->
      <div class="form-control-label">
        <v-checkbox v-model="userInfo.agreeToTerms"
          value="userInfo.agreeToTerms"
          :label="$t('login.terms')"
          class="mr-0 agree"
          color="success"
          :rules="[required('agreeToTerms', $t('login.agree_terms'))]"
        />
        <span class="agreespan">
          <a href="#" class="link">
            {{ $t('login.terms_link') }}
          </a>
        </span>
      </div>
      
      

      <v-checkbox v-model="userInfo.email_daily"
                  color="success"
                  :label="$t('login.updates')" />
    </div>


    <div v-if="hasName" >
      <v-btn
        @click="submitForm(userInfo)"
        :disabled="!valid"
        dark
        color="success"
      >
        {{ $t('login.register')}}
      </v-btn>
    </div>
    <div v-else>
      <v-btn
        @click="submitForm(userInfo)"
        :disabled="!valid"
        dark
        color="success"
      >
        {{ $t('login.login')}}
      </v-btn>
    </div>

  </v-form>
</template>

<script>
  import validations from "@/utils/validations";
  import UserAuthPassword from '@/components/auth/UserAuthPassword.vue';

  export default {
    data() {
      return {
        clubsList: {},
        valid: false,
        userInfo: {
          nickname: '',
          club: '',
          email: '',
          password: '',
          repassword: '',
          agreeToTerms: false,
          email_daily: true
        },
        ...validations
      }
    },

    mounted() {
      this.$axios
        .get(`/api/clubs/list`)
        .then(response => (this.clubsList = response.data))
    },

    methods: {
      customFilter (item, queryText, itemText) {
        const textOne = item.text.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1
      },
    },

    components: {
      UserAuthPassword
    },

    props: {
      submitForm: {
        type: Function,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
      hasName: Boolean,
      registrationCheckboxes: Boolean
    }
  }
</script>

<style lang="scss" scoped>

.form-control-label {
  display: flex;
  align-items: center;
}

.agree {
  display: flex;
}

.agreespan {
  display: flex;
  margin-left: 10px;
}



</style>
