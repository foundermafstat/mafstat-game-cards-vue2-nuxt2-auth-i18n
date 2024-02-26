<template>
  <v-row>
    <v-col>
      <v-data-table
        :mobile-breakpoint="0"
        :headers="headers"
        :items="itemsWithSno"
        :sort-by="['total', 'windon', 'winsheriff']"
        :sort-desc="[true, true, true]"
        :items-per-page="-1"
        dense
        height="100%"
        hide-default-footer
        class="testrating"
      >
        <template v-slot:[`item._id`]="{ item }">
          <div class="nickname">
            <span>{{ item._id }}</span>
          </div>
        </template>

        <template v-slot:[`item.allgames`]="{ item }">
          <div class="nickname">
            <div>
              {{ item.allgames }}-{{ item.totalpoints }}
            </div>
            <span>{{(( item.totalpoints/item.allgames)*100).toFixed(2)}}%</span>
          </div>

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

          <template v-slot:[`item.total`]="{ item }">
            <div
                class="nickname"
              >
                <span>{{ ((item.totalpoints*(item.totalpoints/item.allgames))+item.totalextra).toFixed(2) }}</span>
            </div>
          </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>

export default {
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/api/ratings/test`)
    return { games:data }
  },

  computed: {
    itemsWithSno() {
        return this.games.map((g, index) => ({ ...g, sno: index + 1 }))
    }
  },

  data() {
    return {
      place: 1,
      headers: [
        {
          text: '#',
          align: 'center',
          sortable: false,
          value: 'sno'
        },
        {
          text: 'Никнейм',
          align: 'start',
          sortable: false,
          value: '_id',
          width: '105px'
        },
        {
          text: 'Игр-побед коэф',
          align: 'center',
          sortable: false,
          value: 'allgames',
          width: '105px'
        },

        {
          text: 'Итого',
          align: 'center',
          value: 'total',
        },

        {
          text: 'Доп',
          align: 'center',
          value: 'totalextra',
        },
        {
          text: 'Игр-побед мирный',
          align: 'center',
          sortable: false,
          value: 'allcivilian',
          width: '105px'
        },
        {
          text: 'Доп мирный',
          align: 'center',
          value: 'dopcivilian',
        },
        {
          text: 'Игр-побед шериф',
          align: 'center',
          sortable: false,
          value: 'allsheriff',
          width: '105px'
        },
        {
          text: 'Доп шериф',
          align: 'center',
          value: 'dopsheriff',
        },
        {
          text: 'Игр-побед мафия',
          align: 'center',
          sortable: false,
          value: 'allmafia',
          class: 'allmafia',
          width: '105px'

        },
        {
          text: 'Доп мафия',
          align: 'center',
          value: 'dopmafia',
        },
        {
          text: 'Игр-побед дон',
          align: 'center',
          sortable: false,
          value: 'alldon',
          width: '105px'
        },
        {
          text: 'Доп дон',
          align: 'center',
          value: 'dopdon',
        },

        {
          text: 'Фол',
          align: 'center',
          value: 'totalfouls',
        },

      ],


      // При нажатии на кнопку "Редактировать" показывается форма. По-умолчанию её нет в DOM.
      // На этой странице форма подключена асинхронно, то есть её нет в чанке этой страницы.
      // Код асинхронных компонентов Nuxt при сборке вырезает в отдельные js и css файлы.
      showPageForm: false,


    }
  },
  methods: {
    addPlace() {
      this.place += 1
    }
  },

  computed: {
    itemsWithSno() {
        return this.games.map((g, index) => ({ ...g, sno: index + 1 }))
    }
  },

  head() {
    return {
      // Title и Description конкретной страницы берутся из данных, которые приходят через asyncData.
      title: "Рейтинг",
      meta: [
        { name:"viewport", content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"},
        { hid: "description", name: "description", content: "Рейтинг" },
        { hid: "og:title", property: "og:title", content: "Рейтинг" },
        { hid: "og:description", property: "og:description", content: "Рейтинг" },
      ],
    };
  },

  mounted() {
    // Сохраняем текущий URL на стадии mount компонента.
    //this.id = this.game._id;
  },
};
</script>


<style scoped>

</style>
