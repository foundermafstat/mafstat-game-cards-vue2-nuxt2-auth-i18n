<template>
  <span :class="type" class="logo">
    <img :src="logo" alt="Mafstat" />
    {{ type !== 'only' ? brand.starter.name : '' }}
  </span>
</template>

<style scoped>
@import './logo.css';
</style>

<script>
import logo from '@/static/images/mafstat-logo.svg'
import brand from '@/static/text/brand'

export default {
  data() {
    return {
      brand: brand,
      logo: logo
    }
  },
  props: {
    type: {
      type: String,
      default: 'only'
    }
  }
}
</script>
