<template>
  <v-card>
    <v-card-title class="align-start">
      <span class="font-weight-semibold">Statistics Card</span>
      <v-spacer></v-spacer>
      <v-btn
        icon
        small
        class="me-n3 mt-n2"
      >
        <v-icon>
          {{ 'mdi-dots-vertical' }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle class="mb-8 mt-n5">
      <span class="font-weight-semibold text--primary me-1">Total 48.5% Growth</span>
      <span>😎 this month</span>
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col
          v-for="data in statisticsData"
          :key="data.title"
          cols="6"
          md="3"
          class="d-flex align-center"
        >
          <v-avatar
            size="44"
            :color="resolveStatisticsIconVariation (data.title).color"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
            >
              {{ resolveStatisticsIconVariation (data.title).icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ data.title }}
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ data.total }}
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  data() {
    return {
      statisticsData:[
        {
          title: 'Sales',
          total: '245k',
        },
        {
          title: 'Customers',
          total: '12.5k',
        },
        {
          title: 'Product',
          total: '1.54k',
        },
        {
          title: 'Revenue',
          total: '$88k',
        },
      ]
    }
  },

  methods:{
    resolveStatisticsIconVariation(data) {
      if (data === 'Sales') return { icon: 'mdi-trending-up', color: 'primary' }
      if (data === 'Customers') return { icon: 'mdi-account-outline', color: 'success' }
      if (data === 'Product') return { icon: 'mdi-label-outline', color: 'warning' }
      if (data === 'Revenue') return { icon: 'mdi-currency-usd', color: 'info' }

      return { icon: 'mdi-account-outline', color: 'success' }
    }
  }
}
</script>
