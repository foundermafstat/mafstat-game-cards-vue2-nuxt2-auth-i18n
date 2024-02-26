<template>
  <div>
    <h3>Лучший ход</h3>
    <v-row
      class="d-flex flex-row mt-0"
    >
      <v-col>
        <v-select
          v-model="game.bestmove"
          :items="candidates"
          multiple
          return-object
        ></v-select>
      </v-col>
      <v-col>
        <v-text-field
          v-model="game.firstkill"
          hide-details
          outlined
          type="number"
        />
      </v-col>
    </v-row>

    <h3>Голосование</h3>
    <div
      v-for="(votes, index) in game.vote"
      :key="index"
      class="votes"
    >
      <v-row
        class="d-flex flex-row mt-0"
        no-gutters
      >
        <span>Кандидаты</span>
      </v-row>

      <v-row
        class="d-flex flex-row mt-0"
        no-gutters
      >
        <v-col

        >
          <v-text-field
            v-model="votes.c1"
            hide-details
            outlined
            type="number"
          />
        </v-col>
        <v-col

        >
          <v-text-field
            v-model="votes.c2"
            hide-details
            outlined
            type="number"
          />
        </v-col>
        <v-col

        >
          <v-text-field
            v-model="votes.c3"
            hide-details
            outlined
            type="number"
          />
        </v-col>
        <v-col

        >
          <v-text-field
            v-model="votes.c4"
            hide-details
            outlined
            type="number"
          />
        </v-col>
        <v-col

        >
          <v-text-field
            v-model="votes.c5"
            hide-details
            outlined
            type="number"
          />
        </v-col>
        <v-col

        >
          <v-text-field
            v-model="votes.c6"
            hide-details
            outlined
            type="number"
          />
        </v-col>
        <v-col

        >
          <v-text-field
            v-model="votes.c7"
            hide-details
            outlined
            type="number"
          />
        </v-col>
        <v-col

        >
          <v-text-field
            v-model="votes.c8"
            hide-details
            outlined
            type="number"
          />
        </v-col>
        <v-col

        >
          <v-text-field
            v-model="votes.c9"
            hide-details
            outlined
            type="number"
          />
        </v-col>
        <v-col

        >
          <v-text-field
            v-model="votes.c10"
            hide-details
            outlined
            type="number"
          />
        </v-col>


      </v-row>

      <v-row
        class="d-flex flex-row mt-0"
        no-gutters
      >
        <span>Голоса</span>
      </v-row>

      <v-row
        class="d-flex flex-row mt-0"
        no-gutters
      >
        <v-col>
          <v-text-field
            v-model="votes.v1"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.v2"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.v3"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.v4"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.v5"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.v6"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.v7"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.v8"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.v9"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.v10"
            hide-details
            outlined
            type="number"
          />
        </v-col>

      </v-row>

      <v-row
        class="d-flex flex-row mt-0"
        no-gutters
      >
        <span>Повторно</span>
      </v-row>

      <v-row
        class="d-flex flex-row mt-0"
        no-gutters
      >
        <v-col>
          <v-text-field
            v-model="votes.rv1"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rv2"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rv3"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rv4"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rv5"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rv6"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rv7"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rv8"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rv9"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rv10"
            hide-details
            outlined
            type="number"
          />
        </v-col>

      </v-row>

      <v-row
        class="d-flex flex-row mt-0"
        no-gutters
      >
        <v-col>
          <v-text-field
            v-model="votes.rrv1"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rrv2"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rrv3"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rrv4"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rrv5"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rrv6"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rrv7"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rrv8"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rrv9"
            hide-details
            outlined
            type="number"
          />
        </v-col>

        <v-col>
          <v-text-field
            v-model="votes.rrv10"
            hide-details
            outlined
            type="number"
          />
        </v-col>

      </v-row>

      <v-row
        class="d-flex flex-row mt-0"
        no-gutters
      >
        <v-col>
          <v-btn
            @click="addRow"
            color="primary"
          >
            +
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <p
            class="result"
          >Результат:</p>
        </v-col>

        <v-col>
          <v-select
            v-model="votes.result"
            :items="candidates"
            multiple
            return-object
          ></v-select>
        </v-col>

      </v-row>


    </div>
  </div>
</template>

<script>
import blankData from '@/components/gameblank/blankdata'

export default {
  props: {
    game: {
      type: Object,
      default: () => ({}) },
    action: { type: String }
  },

  data() {
    return {
      candidates:blankData.candidates,
    }
  },

  methods: {
    addRow() {
			this.game.vote.push({result:[]})
		},
  }

}
</script>

<style scoped>
.result {
  line-height: 58px;
  margin: 0;
  padding: 0;
}
</style>
