<template>
  <v-card
    max-width="1000"
    class="mx-auto"
  >

    <v-list
      flat
      subheader
      two-line
    >
      <v-subheader>Список игроков</v-subheader>
      <template v-for="(player, index) in players">
        <v-list-item
          :key="index"
        >
          <v-list-item-content>
            <v-list-item-title><nuxt-link :to="`/players/${player.value.id}`">{{ player.text }}</nuxt-link></v-list-item-title>
            <v-list-item-subtitle>{{ player.firstname }} {{ player.lastname }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>

</template>

<script>
export default {
  async asyncData({ $axios }) {
    // Получаем список динамических страниц сайта из API.
    const { data } = await $axios.get(`/api/players/list`);
    return { players: data.players };
  },

  head() {
    let title = "Список игроков";
    let description = "Динамический список игроков";

    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:description", property: "og:description", content: description },
      ],
    };
  },
};
</script>
