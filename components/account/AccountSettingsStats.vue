<template>
  <v-card
    flat
  >
    <v-card-text
      class="pa-3 mt-2"
    >
      <v-row
        class="d-flex py-6"
      >
        <v-col
          cols="12"
          md="9"
          class="d-flex"
        >
          <v-avatar
            rounded
            size="120"
            class="me-6"
          >
            <v-img :src="require('@/assets/images/avatars/3.png')"></v-img>
          </v-avatar>

          <div>
            <p>{{ $t('player.profile') }}:</p>
            <h1>{{player.user.nickname}}</h1>
            <div class="country">

            </div>

          </div>
        </v-col>

        <v-col
          cols="12"
          md="3"
        >


          <div
            class="btitle d-flex justify-space-between"
          >
            <div>
              <v-icon
                left
              >
                {{ 'mdi-chart-bar' }}
              </v-icon>

              <span class="content">{{ $t('player.general') }}</span>
            </div>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <div>{{ $t('player.played') }}:</div>
            <div class="strong">{{ player.stats.allgames }}</div>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <div>{{ $t('player.won') }}:</div>
            <div class="strong">{{ player.stats.wingames }}</div>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <div>{{ $t('player.winrate') }}:</div>
            <div class="strong">{{ ((player.stats.wingames/player.stats.allgames)*100).toFixed(2) }}%</div>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <div>{{ $t('player.awerage') }}:</div>
            <div class="strong">{{ (player.stats.alldop/player.stats.allgames).toFixed(2) }}</div>
          </div>

        </v-col>
      </v-row>

      <v-row
      >
        <v-col
          cols="12"
          md="3"
          class="civilian"
        >

          <div
            class="btitle d-flex justify-space-between"
          >
            <div>
              <v-icon
                left
                :color="'#fff'"
              >
                {{ 'mdi-thumb-up-outline' }}
              </v-icon>
              <span class="content">{{ $tc('common.civilian', 2) }}</span>
            </div>
            <span class="content">{{ ((player.stats.allcivilian/player.stats.allgames)*100).toFixed(2) }}% {{ $tc('player.cards', 3) }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.played') }}:</span>
            <span class="strong">{{ player.stats.allcivilian }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.won') }}:</span>
            <span class="strong">{{ player.stats.wincivilian }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.winrate') }}:</span>
            <span class="strong">{{ ((player.stats.wincivilian/player.stats.allcivilian)*100).toFixed(2) }}%</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.extra') }}:</span>
            <span class="strong">{{ player.stats.dopcivilian.toFixed(2) }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.average') }}:</span>
            <span class="strong">{{ (player.stats.dopcivilian/player.stats.allcivilian).toFixed(2) }}</span>
          </div>

        </v-col>

        <v-col
          cols="12"
          md="3"
          class="sheriff"
        >

          <div
            class="btitle d-flex justify-space-between"
          >
            <div>
              <v-icon
                left
                :color="'#fff'"
              >
                {{ 'mdi-police-badge-outline' }}
              </v-icon>
              <span class="content">{{ $t('common.sheriff') }}</span>
            </div>
            <span class="content">{{ ((player.stats.allsheriff/player.stats.allgames)*100).toFixed(2) }}% карт</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.played') }}:</span>
            <span class="strong">{{ player.stats.allsheriff }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.won') }}:</span>
            <span class="strong">{{ player.stats.winsheriff }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.winrate') }}:</span>
            <span class="strong">{{ ((player.stats.winsheriff/player.stats.allsheriff)*100).toFixed(2) }}%</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.extra') }}:</span>
            <span class="strong">{{ player.stats.dopsheriff.toFixed(2) }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.average') }}:</span>
            <span class="strong">{{ (player.stats.dopsheriff/player.stats.allsheriff).toFixed(2) }}</span>
          </div>

        </v-col>

        <v-col
          cols="12"
          md="3"
          class="mafia"
        >

          <div
            class="btitle d-flex justify-space-between"
          >
            <div>
              <v-icon
                left
                :color="'#fff'"
              >
                {{ 'mdi-thumb-down-outline' }}
              </v-icon>
              <span class="content">{{ $t('common.mafia') }}</span>
            </div>
            <span class="content">{{ ((player.stats.allmafia/player.stats.allgames)*100).toFixed(2) }}% карт</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.played') }}:</span>
            <span class="strong">{{ player.stats.allmafia }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.won') }}:</span>
            <span class="strong">{{ player.stats.winmafia }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.winrate') }}:</span>
            <span class="strong">{{ ((player.stats.winmafia/player.stats.allmafia)*100).toFixed(2) }}%</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.extra') }}:</span>
            <span class="strong">{{ player.stats.dopmafia.toFixed(2) }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.average') }}:</span>
            <span class="strong">{{ (player.stats.dopmafia/player.stats.allmafia).toFixed(2) }}</span>
          </div>

        </v-col>

        <v-col
          cols="12"
          md="3"
          class="don"
        >
          <div
            class="btitle d-flex justify-space-between"
          >
            <div>
              <v-icon
                left
                :color="'#fff'"
              >
                {{ 'mdi-redhat' }}
              </v-icon>
              <span class="content">{{ $t('common.don') }}</span>
            </div>
            <span class="content">{{ ((player.stats.alldon/player.stats.allgames)*100).toFixed(2) }}% карт</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.played') }}:</span>
            <span class="strong">{{ player.stats.alldon }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.won') }}:</span>
            <span class="strong">{{ player.stats.windon }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.winrate') }}:</span>
            <span class="strong">{{ ((player.stats.windon/player.stats.alldon)*100).toFixed(2) }}%</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.extra') }}:</span>
            <span class="strong">{{ player.stats.dopdon.toFixed(2) }}</span>
          </div>

          <div
            class="d-flex justify-space-between"
          >
            <span>{{ $t('player.average') }}:</span>
            <span class="strong">{{ (player.stats.dopdon/player.stats.alldon).toFixed(2) }}</span>
          </div>

        </v-col>
      </v-row>
    </v-card-text>

    <v-row>
        <v-col>
          <v-data-table
            :mobile-breakpoint="0"
            :headers="headers"
            :items="player.games"
            disable-filtering
            disable-sort
            class="testrating"
          >
            <template
              v-slot:top
            >
              <v-toolbar
                flat
                :color="'#ff0f0f'"
                class="toolbar"
              >
                <v-toolbar-title>{{ $t('player.history') }}</v-toolbar-title>

              </v-toolbar>
            </template>

            <template v-slot:header.gameid="{ header }">
              {{ $t('player.id') }}
            </template>

            <template v-slot:header.day="{ header }">
              {{ $t('common.date') }}
            </template>

            <template v-slot:header.time="{ header }">
              {{ $t('common.time') }}
            </template>

            <template v-slot:header.label="{ header }">
              {{ $t('common.type') }}
            </template>

            <template v-slot:header.result="{ header }">
              {{ $t('common.result') }}
            </template>

            <template v-slot:header.role="{ header }">
              {{ $t('common.role') }}
            </template>

            <template v-slot:header.slot="{ header }">
              {{ $t('common.slot') }}
            </template>

            <template v-slot:header.extra="{ header }">
              {{ $t('common.extra') }}
            </template>

            <template v-slot:[`item.gameid`]="{ item }">
                <nuxt-link :to="`/games/${item.gameid}`">{{ item.gameid }}</nuxt-link>
            </template>

            <template v-slot:[`item.label`]="{ item }">

              <div
                v-if="item.label == 'Рейтинговая'"
              >
                {{ $t('common.grating') }}
              </div>

              <div
                v-else-if="item.label == 'Обычная'"
              >
                {{ $t('common.gbasic') }}
              </div>

              <div
                v-else-if="item.label == 'Турнирная'"
              >
                {{ $t('common.gtournament') }}
              </div>

              <div
                v-else-if="item.label == 'Тренинговая'"
              >
                {{ $t('common.gtraining') }}
              </div>

              <div
                v-else-if="item.label == 'Тестовая'"
              >
                {{ $t('common.gtest') }}
              </div>

            </template>

            <template v-slot:[`item.role`]="{ item }">
              <div
                v-if="item.role == 'Мирный'"
              >
                <v-chip
                  label
                  :color="getColor(item.role)"
                  dark
                >
                  <v-icon left>
                    {{ getIcon(item.role) }}
                  </v-icon>
                  {{ $t('common.civ') }}
                </v-chip>
              </div>

              <div
                v-else-if="item.role == 'Мафия'"
              >
                <v-chip
                  label
                  :color="getColor(item.role)"
                  dark
                >
                  <v-icon left>
                    {{ getIcon(item.role) }}
                  </v-icon>
                  {{ $t('common.mafia') }}
                </v-chip>
              </div>

              <div
                v-else-if="item.role == 'Шериф'"
              >
                <v-chip
                  label
                  :color="getColor(item.role)"
                  dark
                >
                  <v-icon left>
                    {{ getIcon(item.role) }}
                  </v-icon>
                  {{ $t('common.sheriff') }}
                </v-chip>
              </div>

              <div
                v-else-if="item.role == 'Дон'"
              >
                <v-chip
                  label
                  :color="getColor(item.role)"
                  dark
                >
                  <v-icon left>
                    {{ getIcon(item.role) }}
                  </v-icon>
                  {{ $t('common.don') }}
                </v-chip>
              </div>

            </template>

            <template v-slot:[`item.result`]="{ item }">
              <span
                v-if="item.result === 1"
                class="win"
              >
                {{ $tc('common.win', 1) }}
              </span>
              <span
                v-else
                class="lose"
              >
                {{ $t('common.lose') }}
              </span>

            </template>

            <template v-slot:[`item.extra`]="{ item }">

              <v-chip
                v-if="item.extra != 0"
                label
                :color="getColor(item.role)"
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
        </v-col>
      </v-row>
      <div
      v-if="$auth.user && $auth.user.roles === 'ADMIN'"
    >
      <p></p>
      <pre>{{player}}</pre>
    </div>
  </v-card>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  components: {
    CountryFlag
  },

  props: {
    player: {
      type: Object,
      default: () => ({})
    },
    action: {
      type: String
    }
  },

  data() {
    return {
      headers: [
        {
          text: 'ID игры',
          align: 'start',
          sortable: false,
          value: 'gameid'
        },
        {
          text: 'Дата',
          align: 'center',
          sortable: false,
          value: 'day'
        },
        {
          text: 'Время',
          align: 'center',
          sortable: false,
          value: 'time'
        },
        {
          text: 'Тип игры',
          align: 'center',
          value: 'label'
        },
        {
          text: 'Результат',
          align: 'center',
          value: 'result'
        },
        {
          text: 'Роль',
          align: 'center',
          value: 'role'
        },
        {
          text: 'Слот',
          align: 'center',
          value: 'slot'
        },
        {
          text: 'Доп',
          align: 'center',
          value: 'extra'
        }
      ],
    }
  },

  methods: {
    getResult (result) {
      if (result === 1) {
        return 'Победа'
      }else{
        return 'Поражение'
      }
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
}
</script>

<style scoped>

.v-toolbar__title {
  color: #fff;
  font-weight: 300;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}

.btitle {
  padding-bottom: 10px;
}

.win {
  color: #00aa00;
  font-weight: 600;
}

.lose {
  color: #ff0f0f;
  font-weight: 600;
}

.civilian {
  background: #ff0f0f;
  color: #fff;
}

.sheriff {
  background: #dd0d0d;
  color: #fff;
}

.mafia {
  background: #111;
  color: #fff;
}

.don {
  background: #000;
  color: #fff;
}

.content {
  text-transform: uppercase;
  font-weight: 600;
  border-bottom: 1px solid;
}

.strong {
  font-weight: 900;
}

.club {
  line-height: 40px;
}

.country {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.country span {
  padding: 0px 10px;
}

pre {
  background-color: darkslategray;
  color: white;
  padding: 1em;
}
</style>
