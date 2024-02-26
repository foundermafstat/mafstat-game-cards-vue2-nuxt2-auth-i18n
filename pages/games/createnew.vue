<template>
  <v-card>
    <game-blank action="create"></game-blank>
  </v-card>

</template>

<script>
import GameBlank from '@/components/gameblank/GameBlankAlternative.vue'

export default {
  middleware: 'auth-admin',

  components: {
    GameBlank
  },

  data(){
    return {

    }
  },

  head() {
    let title = "Бланк игры";
    let description = "Бланк ";

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

<style scoped>

</style>
