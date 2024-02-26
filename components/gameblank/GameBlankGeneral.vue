<template>
  <div>
    <h3>Бланк игры</h3>
    <p></p>

    <v-row
      v-for="(player, index) in formData.players"
      :key="index"
      class="d-flex flex-row mt-0"
      no-gutters
    >

      <v-avatar
        size="30"
        v-text="index+1"
      >
      </v-avatar>

      <v-col
        cols="2"
        xs="4"
      >
        <v-autocomplete
          v-model="player.nickname"
          :items="playersList"
          :filter="customFilter"
          label="Игрок"
          pt-0
        ></v-autocomplete>
      </v-col>

      <v-col
        class="px-2"
      >
        <v-select
          v-model="player.fouls"
          :items="fouls"
          label="Фолы"
        ></v-select>
      </v-col>

      <v-col

      >
        <v-select
          v-model="player.role"
          :items="roles"
          label="Роль"
        ></v-select>
      </v-col>

      <v-col

      >
        <v-select
          v-model="player.point"
          :items="point"
          label="Победа"
        ></v-select>
      </v-col>

      <v-col

      >
        <v-select
          v-model="player.extra"
          :items="extrapoints"
          label="Доп"
        ></v-select>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import blankData from '@/components/gameblank/blankdata'

export default {
  props: {
    formData: {
      type: Object,
      default: () => ({})
    },
    playersList: {
      type: Array
    }

  },

  data() {
    return {
      playersList: {},

      roles:blankData.roles,
      extrapoints:blankData.extrapoints,
      fouls:blankData.fouls,
      point:blankData.point,
    }
  },

  methods: {
    customFilter (item, queryText, itemText) {
        const textOne = item.text.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1
    },
  },

}
</script>

<style scoped>


.v-text-field {
  padding: 0px;
  margin: 0px;
}
</style>
