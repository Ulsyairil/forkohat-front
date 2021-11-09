<template>
  <b-sidebar
    id="sidebar"
    ref="sidebar"
    title="Menu"
    no-header-close
    :no-close-on-backdrop="header_close"
    :no-close-on-esc="header_close"
    bg-variant="light"
    text-variant="dark"
    no-close-on-route-change
    backdrop
  >
    <div class="px-3 py-2">
      <div>
        <ul class="nav nav-pills flex-column">
          <li class="nav-item dropdown">
            <a
              :class="`nav-link text-primary dropdown-toggle ${activeLink()}`"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-expanded="true"
            >
              Beranda
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <nuxt-link
                tag="a"
                active-class="active-link"
                class="dropdown-item text-primary"
                to="/"
                exact
                >Beranda</nuxt-link
              >
              <nuxt-link
                tag="a"
                active-class="active-link"
                class="dropdown-item text-primary"
                to="/visi&misi"
                exact
                >Visi & Misi</nuxt-link
              >
              <nuxt-link
                tag="a"
                active-class="active-link"
                class="dropdown-item text-primary"
                to="/struktur-organisasi"
                exact
                >Struktur Organisasi</nuxt-link
              >
            </div>
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/programs"
              >Program</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/tatanan"
              >Tatanan</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/events"
              >Kegiatan</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/news"
              >Berita</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/faqs"
              >FAQ</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
  </b-sidebar>
</template>

<style lang="scss">
.sidebar-fixed {
  position: fixed;
  max-height: 100vh;
}
</style>

<script>
export default {
  data() {
    return {
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
      header_close: true,
      visible: false,
    }
  },
  mounted() {
    this.checkWidth()
  },
  methods: {
    activeLink() {
      switch (this.$route.fullPath) {
        case '/':
          'active-link'
          break

        case '/visi&misi':
          'active-link'
          break

        case '/struktur-organisasi':
          'active-link'
          break
      }
    },
    checkWidth() {
      var width = window.innerWidth > 0 ? window.innerWidth : screen.width

      if (width < 991) {
        this.header_close = false
      }

      if (width > 991) {
        this.header_close = true
        if (this.$refs.sidebar.localShow != false) {
          this.$refs.sidebar.hide()
        }
      }
    },
  },
}
</script>
