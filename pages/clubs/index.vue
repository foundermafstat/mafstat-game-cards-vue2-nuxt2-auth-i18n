<template>
  <v-card
    max-width="1200"
    class="mx-auto"
  >
    <v-data-table
      :mobile-breakpoint="0"
      :headers="headers"
      :items="games"
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
          <v-toolbar-title>{{ $t('common.clubs') }}</v-toolbar-title>

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
              :to="`/clubs/create`"
            >
            {{ $t('common.create') }}
            </v-btn>
          </div>
        </v-toolbar>
      </template>

      <template v-slot:header.name="{ header }">
        {{ $t('common.club') }}
      </template>

      <template v-slot:header.city="{ header }">
        {{ $t('common.city') }}
      </template>

      <template v-slot:[`item.name`]="{ item }">
        <nuxt-link :to="`/clubs/${item._id}`">{{ item.name }}</nuxt-link>
      </template>

      <template v-slot:[`item.city`]="{ item }">
        {{ item.city }}
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    // Получаем список игр из API.
    const { data } = await $axios.get(`/api/clubs`);
    return { games: data };
  },
  data() {
    return {
      headers: [
        {
          text: 'Клуб',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Город',
          align: 'start',
          value: 'city'
        },
      ],
      formData: {}
    };
  },
  methods: {
      getColor (label) {
        if (label == 'Мирные') return '#ff0f0f'
        else if (label == 'Мафия') return '#000'
        else return '#ccc'
      },
    },
  head() {
    let title = "Список клубов";
    let description = "Динамический список клубов";

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
