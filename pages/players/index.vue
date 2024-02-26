<template>
  <v-card
    max-width="1200"
    class="mx-auto"
  >
    <v-data-table
      :mobile-breakpoint="0"
      :headers="headers"
      :items="itemsWithSno"
      :sort-by="['_doc.nickname']"
      :sort-desc="[false]"
      :items-per-page="-1"
      dense
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
            {{ $t('common.players') }}
          </v-toolbar-title>

          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

        </v-toolbar>
      </template>


      <template v-slot:header._doc.nickname="{ header }">
        {{ $t('common.nickname') }}
      </template>

      <template v-slot:header.mafstat="{ header }">
        {{ $t('player.mafstat_score') }}
      </template>

      <template v-slot:header.allwr="{ header }">
        {{ $t('player.gww') }}
      </template>

      <template v-slot:header.allmdop="{ header }">
        {{ $t('player.aas') }}
      </template>

      <template v-slot:header.wrcivilian="{ header }">
        {{ $t('player.gwwc') }}
      </template>

      <template v-slot:header.mdopcivilian="{ header }">
        {{ $t('player.aasc') }}
      </template>

      <template v-slot:header.wrsheriff="{ header }">
        {{ $t('player.gwws') }}
      </template>

      <template v-slot:header.mdopsheriff="{ header }">
        {{ $t('player.aass') }}
      </template>

      <template v-slot:header.wrmafia="{ header }">
        {{ $t('player.gwwm') }}
      </template>

      <template v-slot:header.mdopmafia="{ header }">
        {{ $t('player.aasm') }}
      </template>

      <template v-slot:header.wrdon="{ header }">
        {{ $t('player.gwwd') }}
      </template>

      <template v-slot:header.mdopdon="{ header }">
        {{ $t('player.aasd') }}
      </template>

      <template v-slot:header.allfouls="{ header }">
        {{ $t('common.fouls') }}
      </template>

      <template v-slot:[`item._doc.nickname`]="{ item }">
        <div>
          <span class="title"><nuxt-link :to="`/players/${item._doc._id}`">{{ item._doc.nickname }}</nuxt-link></span>
        </div>
      </template>

      <template v-slot:[`item.allwr`]="{ item }">
        <div>
          <div class="title">
            {{ item.allgames }}-{{ item.allpoints }}
          </div>
          <span class="hz">{{ item.allwr }}%</span>
        </div>
      </template>

      <template v-slot:[`item.mafstat`]="{ item }">
        <div>
            <span class="hz">{{ item.mafstat }}</span>
        </div>
      </template>

      <template v-slot:[`item.allextra`]="{ item }">
          {{ item.allextra }}
      </template>

      <template v-slot:[`item.wrcivilian`]="{ item }">
          <div>
            <div class="title">
              {{ item.allcivilian }}-{{ item.wincivilian }}
            </div>
            <span class="civilian">{{ item.wrcivilian }}%</span>
          </div>
      </template>

      <template v-slot:[`item.wrsheriff`]="{ item }">
          <div>
            <div class="title">
              {{ item.allsheriff }}-{{ item.winsheriff }}
            </div>
            <span class="sheriff">{{ item.wrsheriff }}%</span>
          </div>
      </template>

      <template v-slot:[`item.wrdon`]="{ item }">
          <div>
            <div class="title">
              {{ item.alldon }}-{{ item.windon }}
            </div>
            <span class="don">{{ item.wrdon }}%</span>
          </div>
      </template>

      <template v-slot:[`item.wrmafia`]="{ item }">
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

    </v-data-table>
  </v-card>
</template>

<script>

export default {

  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/api/players/all`)
    return { games:data }
  },

  data() {
    return {
      place: 1,
      headers: [
        {
          text: 'Nickname',
          align: 'start',
          value: '_doc.nickname',
          width: '105px'
        },

        {
          text: 'Mafstat очки',
          align: 'center',
          value: 'mafstat',
        },

        {
          text: 'Игр-Побед коэф',
          align: 'center',
          value: 'allwr',
          width: '105px'
        },

        {
          text: 'Ср доп',
          align: 'center',
          value: 'allmdop',
        },

        {
          text: 'И-П коэф мир',
          align: 'center',
          value: 'wrcivilian',
          width: '105px'
        },

        {
          text: 'Ср доп мир',
          align: 'center',
          value: 'mdopcivilian',
        },

        {
          text: 'И-П коэф шер',
          align: 'center',
          value: 'wrsheriff',
          width: '105px'
        },

        {
          text: 'Ср доп шер',
          align: 'center',
          value: 'mdopsheriff',
        },

        {
          text: 'И-П коэф маф',
          align: 'center',
          value: 'wrmafia',
          width: '105px'

        },

        {
          text: 'Ср доп маф',
          align: 'center',
          value: 'mdopmafia',
        },

        {
          text: 'И-П коэф дон',
          align: 'center',
          value: 'wrdon',
          width: '105px'
        },

        {
          text: 'Ср доп дон',
          align: 'center',
          value: 'mdopdon',
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
      title: "Игроки в классическую мафию системы Mafstat",
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

.v-toolbar__title {
  color: #fff;
  font-weight: 300;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}

.title {
  font-weight: 300;
  line-height: 18px;
  font-size: 14px !important;
}

.hz {
  background-color: #333;
  color: #fff;
  padding: 2px 4px;
  line-height: 24px;
  font-size: 12px !important;
}

.civilian {
  background-color: #ff0f0f;
  color: #fff;
  padding: 2px 4px;
  line-height: 24px;
  font-size: 12px !important;
}

.sheriff {
  background-color: #dd0d0d;
  color: #fff;
  padding: 2px 4px;
  line-height: 24px;
  font-size: 12px !important;
}

.don {
  background-color: #000;
  color: #fff;
  padding: 2px 4px;
  line-height: 24px;
  font-size: 12px !important;
}

.mafia {
  background-color: #111;
  color: #fff;
  padding: 2px 4px;
  line-height: 24px;
  font-size: 12px !important;
}



pre {
  background-color: darkslategray;
  color: white;
  padding: 1em;
}

</style>
