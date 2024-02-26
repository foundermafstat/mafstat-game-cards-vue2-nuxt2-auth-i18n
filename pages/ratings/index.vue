<template>
  <v-card
    max-width="1200"
    class="mx-auto"
  >
    <v-data-table
      :mobile-breakpoint="0"
      :headers="headers"
      :items="ratings"
      :items-per-page="-1"
      disable-filtering
      disable-pagination
      disable-sort
      hide-default-footer
      class="testrating"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="#ff0f0f"
          class="toolbar"
        >
          <v-toolbar-title>{{ $t('common.ratings') }}</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <div
            v-if="$auth.user && $auth.user.roles === 'ADMIN'"
          >
            <v-btn
              color="#ff0f0f"
              dark
              class="mb-2"
              :to="`/ratings/create`"
            >
              {{ $t('common.create') }}
            </v-btn>
          </div>

        </v-toolbar>
      </template>

      <template v-slot:header.text="{ header }">
        {{ $t('common.rating') }}
      </template>

      <template v-slot:header.games="{ header }">
        {{ $t('common.games') }}
      </template>

      <template v-slot:header.fulldate="{ header }">
        {{ $t('common.date') }}
      </template>

      <template v-slot:[`item.text`]="{ item }">
        <nuxt-link :to="`/ratings/${item.value}`">{{ item.text }}</nuxt-link>
      </template>
    </v-data-table>
    <div
      v-if="$auth.user && $auth.user.roles === 'ADMIN'"
    >
      <p></p>
      <pre>{{ratings}}</pre>
    </div>

  </v-card>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    // Получаем список игр из API.
    const { data } = await $axios.get(`/api/ratings/list`);
    return { ratings: data };
  },
  data() {
    return {
      headers: [
        {
          text: 'Рейтинг',
          align: 'start',
          sortable: false,
          value: 'text',
        },
        {
          text: 'Игр',
          align: 'center',
          value: 'games'
        },
        {
          text: 'Дата',
          align: 'center',
          value: 'fulldate'
        },
      ],
      formData: {}
    };
  },
  methods: {

    },
  head() {
    let title = "Список рейтингов";
    let description = "Динамический список игр";

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

<style scoped>
.v-toolbar__title {
  color: #fff;
  font-weight: 300;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}

pre {
  background-color: darkslategray;
  color: white;
  padding: 1em;
}

</style>
