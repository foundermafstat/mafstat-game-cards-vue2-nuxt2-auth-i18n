<template>
  <v-card
    max-width="1000"
    class="mx-auto pa-4"
  >
    <h1>Создать рейтинг</h1>

    <CreateRating action="create" />
  </v-card>
</template>

<script>
import CreateRating from '@/components/CreateRating.vue'

export default {
  nuxtI18n: false,

  middleware: 'auth-admin',

  components: {
    CreateRating
  },

  head() {
    let title = "Создать рейтинг";
    let description = "Создать динамическую страницу = запись в базе";

    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:description", property: "og:description", content: description },

        // Указываем роботам поисковых систем, что текущую страницу не нужно индексировать.
        { name: "robots", content: "noindex, nofollow" },
      ],
    };
  },
};
</script>
