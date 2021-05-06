<template>
  <header>
    <b-navbar
      id="navbar"
      toggleable="lg"
      type="light"
      variant="light"
      fixed="top"
      class="border-bottom"
    >
      <b-navbar-brand href="#" class="ml-5">
        <b-img-lazy class="img-fluid" src="/logo.png" width="50"></b-img-lazy>
      </b-navbar-brand>

      <b-collapse is-nav>
        <ul class="navbar-nav nav-pills">
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active active-link"
              class="nav-link text-primary"
              to="/dashboard"
              exact
              >Beranda</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active active-link"
              class="nav-link text-primary"
              to="/event"
              exact
              >Event</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active active-link"
              class="nav-link text-primary"
              to="/news"
              exact
              >News</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active active-link"
              class="nav-link text-primary"
              to="/faq"
              exact
              >FAQ</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active active-link"
              class="nav-link text-primary"
              to="/program"
              exact
              >Program</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active active-link"
              class="nav-link text-primary"
              to="/user"
              exact
              >Pengguna</nuxt-link
            >
          </li>
        </ul>
      </b-collapse>

      <b-nav class="ml-auto">
        <toggle-button
          class="mt-3"
          :value="toggle_button"
          color="#007bff"
          :sync="true"
          @change="toggleBgMode()"
        />
        <b-nav-item-dropdown right>
          <template #button-content>
            <b-avatar variant="primary" text="BV" size="2.5rem"></b-avatar>
          </template>
          <b-dropdown-item href="#">Profil</b-dropdown-item>
          <b-dropdown-item href="#">Keluar</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-toggle target="sidebar"></b-nav-toggle>
      </b-nav>
    </b-navbar>
  </header>
</template>

<style lang="scss">
.navbar-toggler {
  border: none;
}

.nav-item {
  margin: 0 10px 0 10px;
}

.active-link {
  color: #fff !important;
}
</style>

<script>
export default {
  data() {
    return {
      toggle_button: null,
    }
  },
  mounted() {
    let theme = this.$auth.$storage.getLocalStorage('theme')
    let body = document.querySelector('body')
    let sidebar = document.getElementById('sidebar')
    let footer = document.querySelector('footer')

    if (theme === null) {
      this.$auth.$storage.setLocalStorage('theme', 'light')
    }

    if (theme === 'light') {
      body.className = 'light-mode'
      navbar.classList.replace('navbar-dark', 'navbar-light')
      navbar.classList.replace('bg-dark', 'bg-light')
      sidebar.classList.replace('bg-dark', 'bg-light')
      sidebar.classList.replace('text-light', 'text-dark')
      footer.classList.replace('bg-dark', 'bg-light')
      this.toggle_button = false
    }

    if (theme === 'dark') {
      body.className = 'dark-mode'
      navbar.classList.replace('navbar-light', 'navbar-dark')
      navbar.classList.replace('bg-light', 'bg-dark')
      sidebar.classList.replace('bg-light', 'bg-dark')
      sidebar.classList.replace('text-dark', 'text-light')
      footer.classList.replace('text-dark', 'text-light')
      this.toggle_button = true
    }
  },
  methods: {
    toggleBgMode() {
      let body = document.querySelector('body')
      let sidebar = document.getElementById('sidebar')
      let navbar = document.getElementById('navbar')
      let footer = document.querySelector('footer')

      if (body.className == 'light-mode') {
        body.className = 'dark-mode'
        navbar.classList.replace('navbar-light', 'navbar-dark')
        navbar.classList.replace('bg-light', 'bg-dark')
        sidebar.classList.replace('bg-light', 'bg-dark')
        sidebar.classList.replace('text-dark', 'text-light')
        footer.classList.replace('bg-light', 'bg-dark')
        this.toggle_button = true
        this.$auth.$storage.setLocalStorage('theme', 'dark')
      } else {
        body.className = 'light-mode'
        navbar.classList.replace('navbar-dark', 'navbar-light')
        navbar.classList.replace('bg-dark', 'bg-light')
        sidebar.classList.replace('bg-dark', 'bg-light')
        sidebar.classList.replace('text-light', 'text-dark')
        footer.classList.replace('bg-dark', 'bg-light')

        this.toggle_button = false
        this.$auth.$storage.setLocalStorage('theme', 'light')
      }
    },
  },
}
</script>
