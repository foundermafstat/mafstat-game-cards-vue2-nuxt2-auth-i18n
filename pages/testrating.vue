<template>
  <div>
    <v-data-table
      :mobile-breakpoint="0"
      :headers="headers"
      :items="itemsWithSno"
      :sort-by="['result', 'windon', 'winsheriff']"
      :sort-desc="[true, true, true]"
      :items-per-page="-1"
      dense
      hide-default-footer
      class="testrating"
    >
      <template
        v-slot:[`item.sno`]="{ item }"
      >
        {{ item.sno }}
      </template>

      <template v-slot:[`item._id`]="{ item }">
        <div>
          <span class="title">{{ item._id }}</span>
        </div>
      </template>

      <template v-slot:[`item.allgames`]="{ item }">
        <div>
          <div class="title">
            {{ item.allgames }}-{{ item.allpoints }}
          </div>
          <span class="hz">{{(( item.allpoints/item.allgames)*100).toFixed(2)  }}%</span>
        </div>

      </template>

      <template v-slot:[`item.allcivilian`]="{ item }">
          <div>
            <div class="title">
              {{ item.allcivilian }}-{{ item.wincivilian }}
            </div>
            <span class="civilian">{{ item.wrcivilian }}%</span>
          </div>
      </template>

      <template v-slot:[`item.allsheriff`]="{ item }">
          <div>
            <div class="title">
              {{ item.allsheriff }}-{{ item.winsheriff }}
            </div>
            <span class="sheriff">{{ item.wrsheriff }}%</span>
          </div>
      </template>

      <template v-slot:[`item.alldon`]="{ item }">
          <div>
            <div class="title">
              {{ item.alldon }}-{{ item.windon }}
            </div>
            <span class="don">{{ item.wrdon }}%</span>
          </div>
      </template>

      <template v-slot:[`item.allmafia`]="{ item }">
          <div>
            <div class="title">
              {{ item.allmafia }}-{{ item.winmafia }}
            </div>
            <span class="mafia">{{ item.wrmafia }}%</span>
          </div>
      </template>

      <template v-slot:[`item.index`]="{ item }">
        {{ item + 1 }}
      </template>

      <template v-slot:[`item.allextra`]="{ item }">
            {{ item.allextra }}
        </template>
        <template v-slot:[`item.dopmafia`]="{ item }">
            {{ item.dopmafia }}
        </template>
        <template v-slot:[`item.dopdon`]="{ item }">
            {{ item.dopdon }}
        </template>
        <template v-slot:[`item.dopcivilian`]="{ item }">
            {{ item.dopcivilian }}
        </template>
        <template v-slot:[`item.dopsheriff`]="{ item }">
            {{ item.dopsheriff }}
        </template>

        <template v-slot:[`item.result`]="{ item }">
          <div>
              <span class="hz">{{ item.result }}</span>
          </div>
        </template>
    </v-data-table>
  </div>
</template>

<script>

export default {

  middleware: 'auth-admin',

  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/api/ratings/test`)
    return { games:data }
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
          value: 'result',
        },

        {
          text: 'Доп',
          align: 'center',
          value: 'allextra',
        },
        {
          text: 'Игр-побед коэф мирный',
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
          text: 'Игр-побед коэф шериф',
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
          value: 'allfouls',
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

.title {
  color: #fff;
  font-weight: 300;
  font-size: 14px;
}

.hz {
  background-color: #333;
  color: #fff;
  padding: 5px;
}

.civilian {
  background-color: #ff0f0f;
  color: #fff;
  padding: 5px;
}

.sheriff {
  background-color: #dd0d0d;
  color: #fff;
  padding: 5px;
}

.don {
  background-color: #000;
  color: #fff;
  padding: 5px;
}

.mafia {
  background-color: #111;
  color: #fff;
  padding: 5px;
}



pre {
  background-color: darkslategray;
  color: white;
  padding: 1em;
}

</style>
