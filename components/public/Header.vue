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
      <b-navbar-brand
        href="javascript:void(0)"
        class="ml-5"
        @click="$router.push('/')"
      >
        <b-img-lazy class="img-fluid" src="/logo.png" width="50"></b-img-lazy>
      </b-navbar-brand>

      <b-collapse is-nav>
        <ul class="navbar-nav nav-pills">
          <li
            :class="`nav-item dropdown ${this.homeDropdown}`"
            @mouseover="menuDropdown(true)"
            @mouseleave="menuDropdown(false)"
          >
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
            <div
              :class="`dropdown-menu ${this.homeDropdown}`"
              aria-labelledby="navbarDropdown"
            >
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
              class="nav-link text-primary"
              to="/programs"
              >Program</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link text-primary"
              to="/events"
              >Kegiatan</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link text-primary"
              to="/news"
              >Berita</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link text-primary"
              to="/faqs"
              >FAQ</nuxt-link
            >
          </li>
        </ul>
      </b-collapse>

      <b-nav class="ml-auto">
        <ul class="navbar-nav nav-pills">
          <li class="nav-item">
            <nuxt-link
              tag="a"
              active-class="active-link"
              class="nav-link text-primary"
              to="/login"
            >
              <font-awesome-icon icon="sign-in-alt" />
            </nuxt-link>
          </li>
        </ul>
        <!-- <toggle-button
          class="mt-3"
          :value="toggle_button"
          color="#007bff"
          :sync="true"
          @change="toggleBgMode()"
        /> -->
        <b-nav-toggle target="sidebar"></b-nav-toggle>
      </b-nav>
    </b-navbar>
  </header>
</template>

<style lang="scss">
.border-bottom {
  border-bottom: solid #007bff !important;
}

.navbar-toggler {
  border: none;
}

.nav-item {
  margin: 0 10px 0 10px;
}

.active-link {
  color: #007bff !important;
  font-weight: bold;
  background-color: transparent !important;
  border-radius: 0px !important;
  border-bottom: 3px solid #007bff;
}
</style>

<script>
import initials from 'initials'

export default {
  data() {
    return {
      homeDropdown: '',
      baseurl: this.$config.baseurl,
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
      toggle_button: null,
    }
  },
  mounted() {},
  methods: {
    menuDropdown(boolean) {
      if (boolean == true) {
        return (this.homeDropdown = 'show')
      } else {
        return (this.homeDropdown = '')
      }
    },
    activeLink() {
      switch (this.$route.fullPath) {
        case '/':
          return 'active-link'
          break

        case '/visi&misi':
          return 'active-link'
          break

        case '/struktur-organisasi':
          return 'active-link'
          break
      }
    },
    async logoutButton() {
      try {
        $.LoadingOverlay('show')
        let url = `${this.baseurl}/logout`
        let payload = {
          refresh_token: this.auth.token.refreshToken,
        }
        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }
        const res = await this.$axios.$post(url, payload, config)
        console.log(res)

        this.$auth.$storage.removeCookie('token')
        this.$auth.$storage.removeCookie('user')
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
      }
    },
    initialName() {
      return initials(this.auth.user.name)
    },
  },
}
</script>
