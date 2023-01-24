<template>
  <v-container>
    <v-row no-gutters align="center" justify="center" dense class="pt-5 pb-5">
      <v-col>
        <v-flex class="d-flex flex-column align-center justify-center">
          <v-card class="pt-5 pb-5" width="500px" elevation="6" shaped>
            <v-card-title>
              <v-btn
                type="button"
                elevation="0"
                color="white primary--text"
                @click="$router.push('/')"
              >
                <v-icon>arrow_back</v-icon>
                Kembali
              </v-btn>
            </v-card-title>

            <div class="text-center">
              <v-img class="mx-auto" :src="logo" max-width="100" />
              <h1>FORKOHAT BALIKPAPAN</h1>
            </div>

            <v-divider class="mx-5 my-3" />

            <v-card-title class="align-center justify-center">
              <h2>Masuk</h2>
            </v-card-title>

            <v-container style="max-width: 350px !important">
              <v-form ref="loginPage" @submit.prevent.stop="submitForm()">
                <v-text-field
                  v-model="$v.username.$model"
                  :error-messages="usernameErrors"
                  label="Username / Email"
                  outlined
                  clearable
                  required
                  @keydown="validateIsEmail($event.target.value)"
                ></v-text-field>

                <v-text-field
                  v-model="$v.password.$model"
                  :error-messages="passwordErrors"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  label="Kata Sandi"
                  counter
                  @click:append="showPassword = !showPassword"
                  outlined
                  clearable
                  required
                ></v-text-field>

                <client-only>
                  <captcha-code ref="code" :enableClick="true"></captcha-code>
                </client-only>

                <v-text-field
                  v-model="$v.captcha.$model"
                  :error-messages="captchaErrors"
                  type="text"
                  placeholder="Masukkan Captcha"
                  clearable
                  required
                ></v-text-field>

                <v-container class="pl-0 pr-0">
                  Lupa Kata Sandi ?
                  <a class="text-danger" href="javascript:void(0)"
                    >Klik Disini</a
                  >
                </v-container>

                <v-btn type="submit" elevation="2" color="primary">
                  Masuk
                </v-btn>

                <v-btn type="button" elevation="2" color="primary">
                  Registrasi
                </v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'
import Logo from '~/assets/media/logo/forkohat_logo.png'

export default {
  layout: 'error-template',
  mixins: [validationMixin],
  middleware: ['isAuthenticated'],
  data() {
    return {
      logo: Logo,
      selected: 'username',
      username: '',
      password: '',
      showPassword: false,
      captcha: '',
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(254),
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(254),
    },
    captcha: {
      required,
    },
  },
  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username / Email Harus Diisi')
      !this.$v.username.minLength && errors.push('Minimal 6 Karakter')
      !this.$v.username.maxLength && errors.push('Maksimal 254 Karakter')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Kata Sandi Harus Diisi')
      !this.$v.password.minLength && errors.push('Minimal 8 Karakter')
      !this.$v.password.maxLength && errors.push('Maksimal 254 Karakter')
      return errors
    },
    captchaErrors() {
      const errors = []
      if (!this.$v.captcha.$dirty) return errors
      !this.$v.password.required && errors.push('Captcha Harus Diisi')
    },
  },
  methods: {
    validateIsEmail(value) {
      var regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/

      regex.test(value) == true
        ? (this.selected = 'email')
        : (this.selected = 'username')

      console.log(this.selected)
    },
    async submitForm() {
      if (this.$refs.code.getCode() != this.captcha) {
        return Swal.fire({
          icon: 'error',
          confirmButtonColor: '#42a5f5',
          titleText: 'Captcha Salah',
        })
      }

      this.$v.$touch()

      let payload = {
        select: this.selected,
        username: '',
        email: '',
        password: this.password,
      }

      if (this.selected == 'email') {
        payload.username = ''
        payload.email = this.username
      } else {
        payload.username = this.username
        payload.email = ''
      }

      if (!this.$v.$invalid) {
        await this.$auth
          .loginWith('local', {
            data: payload,
          })
          .then((response) => {
            console.log(response)
            location.reload()
          })
          .catch((error) => {
            console.log(error.response)

            Swal.fire({
              icon: 'warning',
              confirmButtonColor: '#42a5f5',
              titleText: error.response.data.message,
            })
          })
      }
    },
  },
  mounted() {},
}
</script>
