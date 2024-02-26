<template>
  <v-fade-transition mode="out-in">
    <v-icon
      :key="$vuetify.theme.dark"
      @click="toggle_dark_mode"
    >
      {{ $vuetify.theme.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
    </v-icon>
  </v-fade-transition>
</template>

<script>

export default {

  data() {
    return {

    }
  },

  methods: {
    toggle_dark_mode: function() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark

        localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString())
    }
  },

  mounted() {
    const theme = localStorage.getItem("dark_theme")

    if (theme) {
        if (theme === "true") {
            this.$vuetify.theme.dark = true
        } else {
            this.$vuetify.theme.dark = false
        }
    } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        this.$vuetify.theme.dark = true

        localStorage.setItem(
            "dark_theme",
            this.$vuetify.theme.dark.toString()
        )
    }
}

}
</script>

<style>
</style>
