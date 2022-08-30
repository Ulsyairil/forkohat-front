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
      <div v-for="(item, i) in items" :key="i">
        <v-list-item
          v-if="!item.subLinks"
          :to="item.to"
          router
          :exact="item.exact"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-else
          no-action
          :key="item.title"
          :prepend-icon="item.icon"
          v-model="item.active"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="sublink in item.subLinks"
            :to="sublink.to"
            :key="sublink.title"
          >
            <v-list-item-icon>
              <v-icon>{{ sublink.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ sublink.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </div>
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
          exact: true,
        },
        {
          icon: 'photo_library',
          title: 'Galeri',
          to: '/dashboard/galeri',
          exact: false,
        },
        {
          icon: 'view_carousel',
          title: 'Carousel',
          to: '/dashboard/carousel',
          exact: false,
        },
        {
          icon: 'newspaper',
          title: 'Berita',
          to: '/dashboard/berita',
          exact: false,
        },
        {
          icon: 'location_city',
          title: 'Program',
          to: '/dashboard/program',
          exact: false,
        },
        {
          icon: 'contact_support',
          title: 'FAQ',
          to: '/dashboard/faq',
          exact: false,
        },
        {
          icon: 'group',
          title: 'Pengguna',
          active: false,
          subLinks: [
            {
              title: 'List Pengguna',
              to: '/dashboard/user/list',
              icon: 'person',
              exact: false,
            },
            {
              title: 'Rule',
              to: '/dashboard/user/rule',
              icon: 'rule',
              exact: false,
            },
          ],
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
