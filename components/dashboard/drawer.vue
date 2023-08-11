<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :expand-on-hover="miniVariant"
    clipped
    fixed
    app
  >
    <div>
      <DashboardMenuSuperadmin v-if="userData().Rule.is_superadmin" />
      <DashboardMenuAdmin v-if="userData().Rule.is_admin" />
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    darkMode() {
      return this.$store.state.localStorage.darkMode
    },
    drawer: {
      get() {
        return this.$store.state.localStorage.dashboardDrawer
      },
      set(newValue) {
        this.$store.dispatch('localStorage/changeDashboardDrawer', newValue)
      },
    },
    miniVariant() {
      return this.$store.state.localStorage.miniVariant
    },
    setTheme() {
      return this.darkMode == true
        ? (this.$vuetify.theme.dark = true)
        : (this.$vuetify.theme.dark = false)
    },
  },
  methods: {
    changeTheme() {
      this.darkMode == true
        ? this.$store.dispatch('localStorage/changeDarkMode', false)
        : this.$store.dispatch('localStorage/changeDarkMode', true)
    },
    changeDrawer() {
      this.drawer == true
        ? this.$store.dispatch('localStorage/changeDashboardDrawer', false)
        : this.$store.dispatch('localStorage/changeDashboardDrawer', true)
    },
    changeMiniVariant() {
      this.miniVariant == true
        ? this.$store.dispatch('localStorage/changeMiniVariant', false)
        : this.$store.dispatch('localStorage/changeMiniVariant', true)
    },
    userData() {
      return this.$auth.user
    },
  },
  mounted() {
    // console.log(this.userData())
  },
}
</script>
