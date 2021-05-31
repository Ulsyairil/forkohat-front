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
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/dashboard"
              exact
              >Beranda</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/dashboard/event"
              >Event</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/dashboard/news"
              >Berita</nuxt-link
            >
          </li>
          <li
            class="nav-item"
            v-if="auth.user.rule_id == 1 || auth.user.rule_id == 2"
          >
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/dashboard/faq"
              >FAQ</nuxt-link
            >
          </li>
          <li
            class="nav-item"
            v-if="auth.user.rule_id == 1 || auth.user.rule_id == 2"
          >
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/dashboard/program"
              >Program</nuxt-link
            >
          </li>
          <li class="nav-item" v-if="auth.user.rule_id > 2">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/dashboard/order"
              >Tatanan</nuxt-link
            >
          </li>
          <li
            class="nav-item"
            v-if="auth.user.rule_id == 1 || auth.user.rule_id == 2"
          >
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link"
              to="/dashboard/user"
              >Pengguna</nuxt-link
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
      baseurl: {
        dev: this.$config.baseurl.dev,
        prod: this.$config.baseurl.prod,
      },
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
