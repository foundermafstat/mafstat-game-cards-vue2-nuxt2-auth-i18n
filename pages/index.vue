<template>
  <v-card
    max-width="1000"
    class="mx-auto pa-4"
  >

    <h1>{{ $t('starter.title') }}</h1>
    <p></p>
    <p>{{ $t('starter.one') }}</p>
    <p>{{ $t('starter.two') }}</p>
    <p>{{ $t('starter.three') }}</p>
    <p>{{ $t('starter.four') }}</p>
    <p>{{ $t('starter.five') }}</p>
  </v-card> 
</template>

<script>

export default {
  nuxtI18n: false,

  data() {
    return {

    }
  },

  head() {
    // У всех страниц должны быть title и description.
    let title = "Статистика оффлайн игр в мафию";
    let description = "Описание контента главной страницы сайта";

    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:description", property: "og:description", content: description },
      ],
    };
  },

  methods: {
    switchLang: function(val) {
      this.$i18n.setLocale(val)
    },

  }
};
</script>
