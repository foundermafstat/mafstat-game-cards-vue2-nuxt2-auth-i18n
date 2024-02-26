<template>
  <main>
    <v-card
      max-width="1200"
      class="mx-auto"
    >
      <v-row
        class=""
      >
        <v-col>
          <v-data-table
            :mobile-breakpoint="0"
            :headers="headers"
            :items="game.players"
            disable-filtering
            disable-pagination
            disable-sort
            hide-default-footer
            class="testrating"
            height="100%"
          >



            <template v-slot:header.nickname.name="{ header }">
              {{ $t('common.nickname') }}
            </template>

            <template v-slot:header.role.label="{ header }">
              {{ $t('common.role') }}
            </template>

            <template v-slot:header.point="{ header }">
              {{ $tc('common.win', 2) }}
            </template>

            <template v-slot:header.extra="{ header }">
              {{ $t('common.extra') }}
            </template>

            <template v-slot:header.fouls="{ header }">
              {{ $t('common.foul') }}
            </template>

            <template v-slot:[`item.nickname.name`]="{ item }">
              <v-chip
                  label
                  :color="getColor(item.role.label)"
                  dark
                >
                  <v-icon left>
                    {{ getIcon(item.role.label) }}
                  </v-icon>
                  {{ item.nickname.name }}
                </v-chip>
            </template>


            <template v-slot:[`item.role.label`]="{ item }">

              <div v-if="item.role.label=='Мирный'">
                <v-chip
                  label
                  :color="getColor(item.role.label)"
                  dark
                >
                  <v-icon left>
                    {{ getIcon(item.role.label) }}
                  </v-icon>
                  {{ $tc('common.civilian', 2) }}
                </v-chip>
              </div>
              <div v-else-if="item.role.label=='Мафия'">
                <v-chip
                  label
                  :color="getColor(item.role.label)"
                  dark
                >
                  <v-icon left>
                    {{ getIcon(item.role.label) }}
                  </v-icon>
                  {{ $t('common.mafia') }}
                </v-chip>
              </div>
              <div v-else-if="item.role.label=='Шериф'">
                <v-chip
                  label
                  :color="getColor(item.role.label)"
                  dark
                >
                  <v-icon left>
                    {{ getIcon(item.role.label) }}
                  </v-icon>
                  {{ $t('common.sheriff') }}
                </v-chip>
              </div>
              <div v-else-if="item.role.label=='Дон'">
                <v-chip
                  label
                  :color="getColor(item.role.label)"
                  dark
                >
                  <v-icon left>
                    {{ getIcon(item.role.label) }}
                  </v-icon>
                  {{ $t('common.don') }}
                </v-chip>
              </div>

            </template>


            <template v-slot:[`item.point`]="{ item }">

              <v-chip
                v-if="item.point === 1"
                label
                :color="getColor(item.role.label)"
                dark
              >
                {{ item.point }}
              </v-chip>
              <span
                v-else
              >
                {{ item.point }}
              </span>
            </template>

            <template v-slot:[`item.extra`]="{ item }">

              <v-chip
                v-if="item.extra != 0"
                label
                :color="getColor(item.role.label)"
                dark
              >
                {{ item.extra }}
              </v-chip>
              <span
                v-else
              >
                {{ item.extra }}
              </span>
            </template>

          </v-data-table>

          <div
          class="px-4"
          v-if="game.firstkill !== ''">
            <p>{{ $t('common.first_blood') }}: <strong>{{game.firstkill}}</strong>, {{ $t('common.best_move') }}: <strong>{{game.bestmove}}</strong></p>
          </div>
          <div
            class="px-4"
            v-if="game.hasOwnProperty('judge.name')"
          >
            <p>Судья игры:
            <v-chip
              label
              :color="'#ff0f0f'"
              dark
              :href="`/players/${game.judge.id}`"
            >
              <span class="v">{{ game.judge.name  }}</span>
            </v-chip>
            </p>
          </div>


        </v-col>
      </v-row>
      <div
      >

        <v-row
          class="px-4"
          v-if="$auth.user && $auth.user.roles == 'ADMIN'"
        >
          <GameBlankEdit v-if="showPageForm" :gameblank="game" action="update" />

        </v-row>

        <v-row
          class="pa-4"
          v-if="$auth.user && $auth.user.roles == 'ADMIN'"
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
          <v-col
            cols="12"
          >
            <p></p>
            <pre>{{game}}</pre>
          </v-col>

        </v-row>

      </div>

    </v-card>

  </main>
</template>

<script>
import GameBlankEdit from '@/components/gameblank/GameBlankAlternativeTwo.vue'

export default {
  nuxtI18n: false,

  components: {
    GameBlankEdit
  },

  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/api/games/${params.id}`)
    return { game:data }
  },

  data() {
    return {
      game: { url: "", h1: "", title: "", description: "", content: "" },
      page: { url: "", h1: "", title: "", description: "", content: "" },
      showPageForm: false,

      headers: [
        {
          text: '#',
          align: 'center',
          value: 'slot'
        },
        {
          text: 'Никнейм',
          align: 'start',
          value: 'nickname.name',
        },
        {
          text: 'Роль',
          align: 'start',
          value: 'role.label',
        },
        {
          text: 'Поб',
          align: 'center',
          value: 'point'
        },
        {
          text: 'Доп',
          align: 'center',
          value: 'extra'
        },
        {
          text: 'Фол',
          align: 'center',
          value: 'fouls'
        }
      ],
      game: {result:""},

    };
  },

  methods: {
    getJudgeName (name) {
      if (typeof name !== 'undefined') {
        return name
      } else return "Не указан"
    },
    getColorHeader (label) {
      if (label == 'Мирные') return '#ff0f0f'
      else if (label == 'Мафия') return '#000'
      else return '#ccc'
    },
    getColor (label) {
      if (label == 'Мирный') return '#ff0f0f'
      else if (label == 'Шериф') return '#dd0d0d'
      else if (label == 'Мафия') return '#111'
      else if (label == 'Дон') return '#000'
      else return ''
    },
    getIcon (label) {
      if (label == 'Мирный') return 'mdi-thumb-up-outline'
      else if (label == 'Шериф') return 'mdi-police-badge-outline'
      else if (label == 'Мафия') return 'mdi-thumb-down-outline'
      else if (label == 'Дон') return 'mdi-redhat'
      else return ''
    },
  },

  head() {
    return {
      // Title и Description конкретной страницы берутся из данных, которые приходят через asyncData.
      title: this.game.name,
      meta: [
        { hid: "description", name: "description", content: this.game._id },
        { hid: "og:title", property: "og:title", content: this.game.name },
        { hid: "og:description", property: "og:description", content: this.game._id },
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

.table {
  margin-bottom: 50px;
}

.screen {
  height: 100vh;
}

pre {
  background-color: darkslategray;
  color: white;
  padding: 1em;
}

</style>
