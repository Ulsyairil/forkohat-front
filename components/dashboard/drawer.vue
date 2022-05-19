<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :expand-on-hover="miniVariant"
    clipped
    fixed
    app
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vuetify.js',
      items: [
        {
          icon: 'home',
          title: 'Beranda',
          to: '/dashboard',
        },
        {
          icon: 'photo_library',
          title: 'Galeri',
          to: '/dashboard/galeri',
        },
        {
          icon: 'newspaper',
          title: 'Berita',
          to: '/dashboard/berita',
        },
        {
          icon: 'location_city',
          title: 'Program',
          to: '/dashboard/program',
        },
        {
          icon: 'contact_support',
          title: 'FAQ',
          to: '/dashboard/faq',
        },
      ],
      menu: false,
    }
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
  },
}
</script>
