<template>
  <v-card
    max-width="1000"
    class="mx-auto pa-4"
  >
    <h1>Создать клуб</h1>

    <CreateClub action="create" />
  </v-card>
</template>

<script>
import CreateClub from '@/components/CreateClub.vue'

export default {
  middleware: 'auth-admin',

  components: {
    CreateClub
  },

  head() {
    let title = "Создать клуб";
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
