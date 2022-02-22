<template>
  <div class="nk-block nk-block-middle nk-auth-body wide-xs">
    <div class="brand-logo pb-4 text-center">
      <div class="row">
        <div class="col-md-4 text-md-right text-sm-center">
          <a
            href="javascript:void(0)"
            class="logo-link"
            @click="this.$route.push('/')"
          >
            <img
              class="logo-light logo-img logo-img-lg"
              src="/logo.png"
              alt="logo"
              style="max-height: 80px"
            />
            <img
              class="logo-dark logo-img logo-img-lg"
              src="/logo.png"
              alt="logo-dark"
              style="max-height: 80px"
            />
          </a>
        </div>
        <div
          class="
            col-md-8
            text-md-left text-sm-center
            align-self-md-center
            mt-2 mt-md-0
          "
        >
          <span class="text-black-50 font-weight-bold h4">
            FORKOHAT BALIKPAPAN
          </span>
        </div>
      </div>
    </div>
    <div class="card card-bordered">
      <div class="card-inner card-inner-lg">
        <div class="nk-block-head">
          <div class="nk-block-head-content">
            <h4 class="nk-block-title">Masuk</h4>
            <!-- <div class="nk-block-des">
              <p>Access the CryptoLite panel using your email and passcode.</p>
            </div> -->
          </div>
        </div>
        <form id="signin-form">
          <div class="form-group">
            <div class="form-label-group">
              <label class="form-label" for="credential">
                Email atau Username
              </label>
            </div>
            <div class="form-control-wrap">
              <input
                type="text"
                class="form-control form-control-lg"
                id="credential"
                placeholder="Masukkan email atau username anda"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="form-label-group">
              <label class="form-label" for="password">Kata Sandi</label>
              <a class="link link-primary link-sm" href="javascript:vodi(0)">
                Lupa Kata Sandi ?
              </a>
            </div>
            <div class="form-control-wrap">
              <a
                href="javascript:void(0)"
                class="form-icon form-icon-right lg"
                @click="displayPassword()"
              >
                <em :class="form.password.icon"></em>
              </a>
              <input
                :type="form.password.type"
                class="form-control form-control-lg"
                id="password"
                placeholder="Masukkan kata sandi anda"
              />
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-lg btn-primary btn-block">Masuk</button>
          </div>
        </form>
        <div class="form-note-s2 text-center pt-4">
          Ingin Melihat Lebih Banyak ?
          <NuxtLink to="/register">Buat Akun Sebagai Tamu</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Validation from '../helpers/form-validation'

export default {
  layout: 'auth',
  head: {
    title: 'Masuk | Forkohat Balikpapan',
  },
  data() {
    return {
      form: {
        credential: '',
        password: {
          value: '',
          type: 'password',
          show: false,
          icon: 'passcode-icon icon-hide icon ni ni-eye-off',
        },
      },
    }
  },
  mounted() {
    Validation('signin-form')
    this.displayPassword()
  },
  methods: {
    displayPassword() {
      if (this.form.password.show == false) {
        this.form.password.type = 'text'
        this.form.password.show = true
        this.form.password.icon = 'icon-show icon ni ni-eye'
      } else {
        this.form.password.type = 'password'
        this.form.password.show = false
        this.form.password.icon = 'icon-hide icon ni ni-eye-off'
      }
    },
  },
}
</script>