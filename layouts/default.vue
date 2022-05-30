<template>
  <v-app :dark="setTheme">
    <v-navigation-drawer v-model="drawer" absolute temporary app>
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

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="changeDrawer" />

      <v-img :src="logo" max-width="50px"></v-img>

      <v-toolbar-title class="mx-3">
        <b> FORKOHAT BALIKPAPAN </b>
      </v-toolbar-title>

      <v-spacer />

      <v-btn class="mx-3" elevation="3" fab small @click.stop="changeTheme()">
        <v-icon v-if="darkMode == false"> dark_mode </v-icon>
        <v-icon v-else> brightness_5 </v-icon>
      </v-btn>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        transition="slide-y-transition"
        offset-y
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-3" elevation="3" small fab v-bind="attrs" v-on="on">
            <v-avatar size="40">
              <v-img
                src="https://ui-avatars.com/api/?name=John+Leider"
                alt="My Avatar"
              />
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://ui-avatars.com/api/?name=John+Leider"
                  alt="My Avatar"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>John Leider</v-list-item-title>
                <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item href="javascript:void(0)">
              <v-list-item-action>
                <v-icon color="primary"> account_circle </v-icon>
              </v-list-item-action>
              <v-list-item-title> Profile </v-list-item-title>
            </v-list-item>

            <v-list-item href="javascript:void(0)">
              <v-list-item-action>
                <v-icon color="error"> logout </v-icon>
              </v-list-item-action>
              <v-list-item-title> Sign Out </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <v-btn class="mx-3" elevation="3" fab small to="/login">
        <v-icon>login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-footer app>
      <span> FORKOHAT BALIKPAPAN &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import MainLogo from './../assets/media/logo/forkohat_logo.png'

export default {
  data() {
    return {
      title: 'FORKOHAT BALIKPAPAN',
      logo: MainLogo,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
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
        return this.$store.state.localStorage.defaultDrawer
      },
      set(newValue) {
        this.$store.dispatch('localStorage/changeDefaultDrawer', newValue)
      },
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
        ? this.$store.dispatch('localStorage/changeDefaultDrawer', false)
        : this.$store.dispatch('localStorage/changeDefaultDrawer', true)
    },
  },
}
</script>
