<template>
  <pre>{{profile}}</pre>
</template>

<script>
export default {

  async asyncData({ $axios, params }) {
    console.log(params)
    const { data } = await $axios.get(`/api/players/profile/${params.id}`)
    return { profile: data }
  },

  data() {
    return {

    }
  }
}
</script>
