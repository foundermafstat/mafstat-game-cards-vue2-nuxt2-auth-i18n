<template>
  <v-card
  >
    <v-row>
      <v-col>
        <v-data-table
          :mobile-breakpoint="0"
          flat
          :headers="headersSelected"
          :items="itemsWithSno"
          :sort-by="['total', 'windon', 'winsheriff', 'allgames', '_id']"
          :sort-desc="[true, true, true, false, false]"
          :items-per-page="-1"
          disable-filtering
          disable-pagination
          hide-default-footer
          class="testrating"
        >

          <template
            v-slot:top
          >
            <v-toolbar
              flat
              color="#ff0f0f"
              class="toolbar"
            >
              <v-toolbar-title>{{rating.name}}</v-toolbar-title>

            </v-toolbar>
          </template>

          <template v-slot:header._id="{ header }">
            {{ $t('common.nickname') }}
          </template>

          <template v-slot:header.allgames="{ header }">
            {{ $t('player.gwa') }}
          </template>

          <template v-slot:header.totalextra="{ header }">
            {{ $t('player.extra') }}
          </template>

          <template v-slot:header.total="{ header }">
            {{ $t('player.total') }}
          </template>

          <template v-slot:header.allcivilian="{ header }">
            {{ $t('player.gwc') }}
          </template>

          <template v-slot:header.dopcivilian="{ header }">
            {{ $t('player.ec') }}
          </template>

          <template v-slot:header.allsheriff="{ header }">
            {{ $t('player.gws') }}
          </template>

          <template v-slot:header.dopsheriff="{ header }">
            {{ $t('player.es') }}
          </template>

          <template v-slot:header.allmafia="{ header }">
            {{ $t('player.gwm') }}
          </template>

          <template v-slot:header.dopmafia="{ header }">
            {{ $t('player.em') }}
          </template>

          <template v-slot:header.alldon="{ header }">
            {{ $t('player.gwd') }}
          </template>

          <template v-slot:header.dopdon="{ header }">
            {{ $t('player.ed') }}
          </template>

          <template v-slot:header.totalfouls="{ header }">
            {{ $t('common.fouls') }}
          </template>

          <template v-slot:[`item._id`]="{ item }">
            <div class="nickname">
              <span>{{ item._id }}</span>
            </div>
          </template>

          <template v-slot:[`item.totalextra`]="{ item }">
              {{ item.totalextra.toFixed(2) }}
          </template>
          <template v-slot:[`item.dopmafia`]="{ item }">
              {{ item.dopmafia.toFixed(2) }}
          </template>
          <template v-slot:[`item.dopdon`]="{ item }">
              {{ item.dopdon.toFixed(2) }}
          </template>
          <template v-slot:[`item.dopcivilian`]="{ item }">
              {{ item.dopcivilian.toFixed(2) }}
          </template>
          <template v-slot:[`item.dopsheriff`]="{ item }">
              {{ item.dopsheriff.toFixed(2) }}
          </template>

          <template v-slot:[`item.allgames`]="{ item }">
              {{ item.allgames }}-{{ item.totalpoints }}
          </template>
          <template v-slot:[`item.allcivilian`]="{ item }">
              {{ item.allcivilian }}-{{ item.wincivilian }}
          </template>
          <template v-slot:[`item.alldon`]="{ item }">
              {{ item.alldon }}-{{ item.windon }}
          </template>
          <template v-slot:[`item.allmafia`]="{ item }">
              {{ item.allmafia }}-{{ item.winmafia }}
          </template>
          <template v-slot:[`item.allsheriff`]="{ item }">
              {{ item.allsheriff }}-{{ item.winsheriff }}
          </template>

          <template v-slot:[`item.index`]="{ item }">
            {{ item + 1 }}
          </template>

          <template v-slot:[`item.total`]="{ item }">
            <div
                class="nickname total"
              >
                <span>{{item.total.toFixed(2)}}</span>
            </div>
          </template>

        </v-data-table>
      </v-col>
    </v-row>

    <v-row
      class="pa-4"
    >
      <v-col>
        <h3>{{ $t('player.rg') }}</h3>
        <v-list
          dense
          class="list"
        >
          <v-list-item-group
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in rating.games"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title><nuxt-link :to="`/games/${item}`">{{ item }}</nuxt-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

    </v-row>

    <v-row
      class="px-4"
      v-if="$auth.user && $auth.user.roles === 'ADMIN'"
    >
      <CreateRating v-if="showPageForm" :rating="rating" action="update" />

    </v-row>

    <v-row
      class="pa-4"
      v-if="$auth.user && $auth.user.roles === 'ADMIN'"
    >
      <v-col
        cols="12"
      >
        <v-btn
          block
          dark
          color="#ff0f0f"
          @click="showPageForm = true"
        >
          Редактировать
        </v-btn>
      </v-col>

    </v-row>

  </v-card>
</template>

<script>
import CreateRating from '@/components/CreateRating.vue'

export default {
  components: {
    CreateRating
  },

  async asyncData({ $axios, params }) {
    console.log(params)
    const { data } = await $axios.get(`/api/ratings/${params.id}`);
    return { rating: data };
  },

  data() {
    return {
      showPageForm: false,

      headers: [
        {
          text: '#',
          align: 'center',
          sortable: false,
          value: 'sno',
        },
        {
          text: 'Никнейм',
          align: 'start',
          sortable: false,
          value: '_id',
        },
        {
          text: 'Игр-побед всего',
          align: 'center',
          sortable: false,
          value: 'allgames'
        },
        {
          text: 'Доп',
          align: 'center',
          value: 'totalextra'
        },
        {
          text: 'Итог',
          align: 'center',
          value: 'total',
          class: 'allwin'
        },

        {
          text: 'Игр-побед мирный',
          align: 'center',
          sortable: false,
          value: 'allcivilian'
        },
        {
          text: 'Доп мирный',
          align: 'center',
          value: 'dopcivilian'
        },

        {
          text: 'Игр-побед шериф',
          align: 'center',
          sortable: false,
          value: 'allsheriff'
        },
        {
          text: 'Доп шериф',
          align: 'center',
          value: 'dopsheriff'
        },

        {
          text: 'Игр-побед мафия',
          align: 'center',
          sortable: false,
          value: 'allmafia',
          class: 'allmafia'
        },
        {
          text: 'Доп мафия',
          align: 'center',
          value: 'dopmafia',
        },
        {
          text: 'Игр-/побед дон',
          align: 'center',
          sortable: false,
          value: 'alldon'
        },
        {
          text: 'Доп дон',
          align: 'center',
          value: 'dopdon'
        },

        {
          text: 'Фол',
          align: 'center',
          value: 'totalfouls'
        },
      ],
      headersSelected: [],
    };
  },

  computed: {
    itemsWithSno() {
        return this.rating.rating.map((g, index) => ({ ...g, sno: index + 1 }))
    }
  },

  methods: {

    populateHeaders(){
      let headers = JSON.parse(localStorage.getItem('headers'))
      if(!headers){
        this.headersSelected = this.headers
      }else{
        this.headersSelected = headers
      }
    },

    save(){
      if(process.client) {
        localStorage.setItem('headers', JSON.stringify(this.headersSelected))
      }
    }
  },

  mounted(){
    this.populateHeaders()
  },

  head() {
    return {
      // Title и Description конкретной страницы берутся из данных, которые приходят через asyncData.
      title: this.rating.name,
      meta: [
        { hid: "description", name: "description", content: this.rating.name },
        { hid: "og:title", property: "og:title", content: this.rating.name },
        { hid: "og:description", property: "og:description", content: this.rating.name },
      ],
    }
  },

}
</script>

<style scoped>

.v-toolbar__title {
  color: #fff;
  font-weight: 300;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}

.title {
  color: white;
  font-weight: 100;
  text-transform: uppercase;
  font-size: 2em;
}

.list a {
  color: #ff4545;
}

.nickname span {
  background-color: #ff0f0f;
  color: #fff;
  font-weight: 400;
  padding: 5px;
}

hr {
  background: rgb(37, 37, 37);
}

pre {
  background-color: darkslategray;
  color: white;
  padding: 1em;
}

</style>
