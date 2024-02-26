<template>
  <v-menu
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    content-class="user-lang-menu-content"
  >
    <template v-slot:activator="{ on, attrs }">
      
      <v-btn
        text
        v-bind="attrs"
        v-on="on"
      >
        {{$i18n.locale}}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="locale in $i18n.locales"
        :key="locale.code"
        class="lang-list"
        @click="switchLang(locale.code)"
      >
        <v-list-item-avatar class="flag">
          <i :class="locale.code" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="lang-opt">
            {{ $t('common.'+locale.code) }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon
            v-if="locale.code === $i18n.locale"
            color="primary"
          >
            mdi-check
          </v-icon>
        </v-list-item-action>
      </v-list-item>

    </v-list>
  </v-menu>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    methods: {
      switchLang: function(val) {
        this.$i18n.setLocale(val)
      },
    }
  }
</script>

<style scoped>
  .user {
    max-width: 180px;
    overflow: hidden;
  }
</style>
