<template>
  <v-app-bar clipped-left fixed app>
    <v-app-bar-nav-icon @click.stop="changeDrawer" />

    <v-btn
      icon
      @click.stop="changeMiniVariant"
      v-if="!$vuetify.breakpoint.mobile"
    >
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>

    <v-img :src="logo" max-width="50px"></v-img>

    <v-toolbar-title
      v-if="!$vuetify.breakpoint.smAndDown"
      v-text="title"
      class="mx-3"
    />

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
        <v-btn elevation="3" small fab v-bind="attrs" v-on="on">
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
  </v-app-bar>
</template>

<script>
import MainLogo from './../../assets/media/logo/forkohat_logo.png'

export default {
  data() {
    return {
      title: 'FORKOHAT BALIKPAPAN',
      logo: MainLogo,
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
