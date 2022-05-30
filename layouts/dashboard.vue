<template>
  <v-app :dark="setTheme">
    <DashboardDrawer />
    <DashboardAppBar />

    <v-main>
      <Nuxt />
    </v-main>

    <v-footer absolute inset app>
      <span>FORKOHAT BALIKPAPAN &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    darkMode() {
      return this.$store.state.localStorage.darkMode
    },
    setTheme() {
      return this.darkMode == true
        ? (this.$vuetify.theme.dark = true)
        : (this.$vuetify.theme.dark = false)
    },
  },
}
</script>
