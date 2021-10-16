<template>
  <div>
    <b-form id="user-create-form">
      <div class="row">
        <div class="col-md-4">
          <img
            class="img-fluid mb-2 program-image"
            :src="user.form.image.current_url"
            data-action="zoom"
          />
        </div>
        <div class="col-md-8"></div>
      </div>

      <b-form-group label="Nama Pengguna" label-for="input-user-name">
        <b-form-input
          v-model="user.form.name"
          id="input-user-name"
          type="text"
          placeholder="Masukkan nama pengguna"
          required
          data-pristine-required-message="Nama pengguna harus diisi"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <div>
      <b-button
        type="submit"
        variant="success"
        v-b-tooltip.hover
        title="Simpan"
        @click.prevent="formSubmit()"
      >
        <font-awesome-icon icon="save" />
      </b-button>
    </div>
  </div>
</template>

<style lang="scss">
.user-image {
  max-width: 300px;
  max-height: 200px;
}
</style>

<script>
import Swal from 'sweetalert2'
import randomstring from 'randomstring'

export default {
  data() {
    return {
      selectedRule: null,
      selectedGender: null,
      selectedDistrict: null,
      selectedSubDistrict: null,
      optionsRule: [
        { value: 'null', text: 'Pilih Rule Pengguna...', disabled: true },
      ],
      optionsGender: [
        { value: 'null', text: 'Pilih Jenis Kelamin...', disabled: true },
        { value: 'male', text: 'Laki-Laki' },
        { value: 'female', text: 'Perempuan' },
        { value: 'secret', text: 'Lainnya' },
      ],
      optionsDistrict: [
        { value: 'null', text: 'Pilih Kota...', disabled: true },
      ],
      optionsSubDistrict: [
        { value: 'null', text: 'Pilih Kecamatan...', disabled: true },
      ],
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
      baseurl: this.$config.baseurl,
      user: {
        form: {
          name: '',
          email: '',
          nip: '',
          password: '',
          job: '',
          bio: '',
          image: {
            current_url: '',
            url: 'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70',
            max: 5242880,
            type: ['image/jpg', 'image/jpeg', 'image/png'],
            value: null,
          },
        },
      },
      program: {
        name: '',
        description: '',
      },
    }
  },
  async fetch() {
    try {
      let url
      if (this.auth.user.rule_id == 1) {
        url = `${this.baseurl}/superadmin/user?id=2`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl}/admin/user?id=2`
      }

      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }

      const userData = await this.$axios.$get(url, config)
      console.log(this.$route.params)
      console.log(userData)

      this.user.form.name = userData.name
      userData.userFiles.forEach((value) => {
        this.user.form.image.current_url = this.domain + value.url
      })
    } catch (error) {
      console.log(error)
      return this.$notify({
        group: 'app',
        type: 'error',
        title: 'Kesalahan pada server',
        text: error,
      })
    }
  },
  mounted() {},
  methods: {
    generatePassword() {
      let generatePassword = randomstring.generate()
      this.user.form.password = generatePassword
    },
  },
}
</script>
