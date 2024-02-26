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
          <v-toolbar-title>
            {{ $t('common.games') }}
          </v-toolbar-title>

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
              :to="`/`+$i18n.locale+`/games/create`"
            >
              {{ $t('common.create') }}
            </v-btn>
          </div>
        </v-toolbar>
      </template>

      <template v-slot:header.text="{ header }">
        {{ $t('common.game') }}
      </template>

      <template v-slot:header.result="{ header }">
        {{ $tc('common.win', 1) }}
      </template>

      <template v-slot:header.date="{ header }">
        {{ $t('common.date') }}
      </template>

      <template v-slot:header.time="{ header }">
        {{ $t('common.time') }}
      </template>

      <template v-slot:header.table="{ header }">
        {{ $t('common.table') }}
      </template>

      <template v-slot:header.judge="{ header }">
        {{ $t('common.judge') }}
      </template>

      <template v-slot:[`item.text`]="{ item }">
        <v-list-item-content>
          <v-list-item-title><nuxt-link :to="`/games/${item.value}`">{{ item.text }}</nuxt-link></v-list-item-title>
          <v-list-item-subtitle>{{ $t('common.club') }}: {{ item.club }}</v-list-item-subtitle>
        </v-list-item-content>
      </template>

      <template v-slot:[`item.judge`]="{ item }">
        <nuxt-link :to="`/players/${item.judgeid}`">{{ item.judge }}</nuxt-link>
      </template>



      <template v-slot:[`item.result`]="{ item }">

        <div v-if="item.result=='Мирные'" >
          <v-chip
            label
            :color="getColor(item.result)"
            dark
          >
            {{ $tc('common.civilian', 1) }}
          </v-chip>
        </div>
        <div v-else-if="item.result=='Мафия'" >
          <v-chip
            label
            :color="getColor(item.result)"
            dark
          >
            {{ $t('common.mafia') }}
          </v-chip>
        </div>
        <div v-else>
          <v-chip
            label
            :color="getColor(item.result)"
            dark
          >
            {{ $t('common.fouls') }}
          </v-chip>
        </div>


      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    // Получаем список игр из API.
    const { data } = await $axios.get(`/api/games/all`);
    return { games: data };
  },
  data() {
    return {
      headers: [
        {
          text: 'Игра',
          align: 'start',
          sortable: false,
          value: 'text',
        },
        {
          text: 'Победа',
          align: 'center',
          value: 'result'
        },
        {
          text: 'Дата',
          align: 'center',
          value: 'date',
        },
        {
          text: 'Время',
          align: 'center',
          value: 'time'
        },{
          text: 'Стол',
          align: 'center',
          value: 'table'
        },
        {
          text: 'Судья',
          align: 'start',
          sortable: false,
          value: 'judge',
        },

      ],
      formData: {}
    }
  },

  computed: { 
    headers(){
      return {
        headers: [
          {
            text: 'Игра',
            align: 'start',
            sortable: false,
            value: 'text',
          },
          {
            text: 'Победа',
            align: 'center',
            value: 'result'
          },
          {
            text: 'Дата',
            align: 'center',
            value: 'date',
          },
          {
            text: 'Время',
            align: 'center',
            value: 'time'
          },{
            text: 'Стол',
            align: 'center',
            value: 'table'
          },
          {
            text: 'Судья',
            align: 'start',
            sortable: false,
            value: 'judge',
          },

        ]
      }
    }

  },

  methods: {
      getColor (label) {
        if (label == 'Мирные') return '#ff0f0f'
        else if (label == 'Мафия') return '#000'
        else return '#ccc'
      },
    },
  head() {
    let title = "Список игр";
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
