<template>
  <div>
    <b-form id="login-with-email-form" @submit.prevent="formSubmit()" disabled>
      <b-form-group label="Email :" label-for="input-email">
        <b-form-input
          id="input-email"
          type="email"
          placeholder="Masukkan email anda"
          v-model="email"
          autocomplete="username"
          required
          data-pristine-required-message="Email harus diisi"
          data-pristine-email-message="Email tidak valid"
        ></b-form-input>
      </b-form-group>
      <div class="form-group">
        <label for="input-password">Password</label>
        <b-input-group class="mb-2">
          <b-form-input
            id="input-password"
            :type="password.type"
            v-model="password.value"
            placeholder="Masukkan kata sandi anda"
            autocomplete="current-password"
            required
            data-pristine-required-message="Kata sandi harus diisi"
          ></b-form-input>
          <b-input-group-append is-text>
            <a href="javascript:void(0)" @click="passwordSwitch()">
              <font-awesome-icon :icon="password.icon" />
            </a>
          </b-input-group-append>
        </b-input-group>
      </div>
      <b-button type="submit" variant="primary">Masuk</b-button>
      <b-button type="button" variant="primary" @click="redirectBack()"
        >Kembali</b-button
      >
    </b-form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      baseurl: this.$config.baseurl,
      select: 'email',
      email: '',
      password: {
        type: 'password',
        icon: 'eye-slash',
        value: '',
      },
    }
  },
  async mounted() {
    try {
      await this.$recaptcha.init()
      this.formValidation('login-with-email-form')
    } catch (e) {
      console.error(e)
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy()
  },
  methods: {
    async formSubmit() {
      try {
        let validate = this.formValidation('login-with-email-form').validate()

        if (!validate) {
          return
        }

        const token = await this.$recaptcha.execute('login')
        console.log('ReCaptcha token:', token)

        let payload = {
          select: this.select,
          email: this.email,
          password: this.password.value,
        }

        $.LoadingOverlay('show')

        let url = `${this.baseurl}/login`
        let res = await this.$axios.$post(url, payload)

        this.$auth.$storage.setCookie('token', res.token, true)
        this.$auth.$storage.setCookie('user', res.data, true)

        this.$router.push('/dashboard')
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')

        if (error === 'Failed to execute') {
          return Swal.fire({
            title: 'Peringatan!',
            text: 'Captcha harus dicentang',
            icon: 'warning',
            confirmButtonText: 'Kembali',
          })
        }

        if (error.response != undefined) {
          if (error.response.data.message == 'email not exists') {
            return Swal.fire({
              title: 'Peringatan!',
              text: 'Email belum terdaftar',
              icon: 'warning',
              confirmButtonText: 'Kembali',
            })
          }

          if (error.response.data.message == 'wrong password') {
            return Swal.fire({
              title: 'Peringatan!',
              text: 'Kata sandi salah',
              icon: 'warning',
              confirmButtonText: 'Kembali',
            })
          }
        }
      }
    },
    passwordSwitch() {
      if (this.password.type == 'password') {
        this.password.type = 'text'
        this.password.icon = 'eye'
      } else {
        this.password.type = 'password'
        this.password.icon = 'eye-slash'
      }
    },
    formValidation(form_id) {
      var form = document.getElementById(form_id)
      var config = {
        classTo: 'form-group',
        errorClass: 'text-danger',
        successClass: 'text-success',
        errorTextParent: 'form-group',
        errorTextTag: 'div',
        errorTextClass: 'help-text',
      }
      var pristine = new Pristine(form, config)
      return pristine
    },
    redirectBack() {
      this.$router.back()
    },
  },
}
</script>
