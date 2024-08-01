<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :elevation="appBarElevation" fixed app color="white">
      <!-- Show nav icon only on mobile layout -->
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click.stop="changeDrawer" />

      <!-- Show logo and title -->
      <v-img :src="logo" max-width="50px"></v-img>

      <!-- Conditionally render the toolbar title based on the layout -->
      <v-toolbar-title v-if="$vuetify.breakpoint.mdAndUp" class="mx-3">
        <b>FORKOHAT BALIKPAPAN</b>
      </v-toolbar-title>
      <v-spacer />

      <!-- Conditionally render buttons based on screen size -->
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn class="mx-2" to="/" text>Beranda</v-btn>
        <v-btn class="mx-2" to="/news" text>Berita</v-btn>
        <v-btn class="mx-2" to="/program" text>Program</v-btn>
        <v-btn class="mx-2" to="/FAQ" text>FAQ</v-btn>
        <v-btn class="mx-2" to="/kontak" text>Kontak</v-btn>
      </template>

      <!-- <v-btn class="mx-2" elevation="3" fab small @click.stop="changeTheme()">
        <v-icon v-if="darkMode == false">dark_mode</v-icon>
        <v-icon v-else>brightness_5</v-icon>
      </v-btn> -->

      <v-btn class="mx-2" elevation="3" fab small to="/login">
        <v-icon>login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-footer color="primary" dark class="mt-16">
      <v-row justify="center" class="my-4 text-center">
        <v-col cols="12">Lorem ipsum dolor sit amet consectetur
          adipisicing elit.</v-col>
        <v-col cols="12">
          <v-btn v-for="icon in footerIcons" :key="icon" text dark>
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" class="align-center">&copy; 2024 FORKOHAT Balikpapan</v-col>
      </v-row>
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
          title: 'FORKOHAT',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Berita',
          to: '/news',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Program',
          to: '/program',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'FAQ',
          to: '/faq',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Contact',
          to: '/contact',
        },
      ],
      appBarElevation: 1,
      menu: false,
      footerIcons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram',
        'mdi-youtube',
      ],
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
    handleScroll() {
      // Update elevation based on scroll position
      this.appBarElevation = window.scrollY > 10 ? 1 : 0; // Apply shadow when scrolled more than 10px
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>
