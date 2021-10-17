<template>
  <div>
    <b-form id="user-edit-form">
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

      <b-form-group label="Email Pengguna" label-for="input-user-email">
        <b-form-input
          v-model="user.form.email"
          id="input-user-email"
          type="text"
          placeholder="Masukkan email pengguna"
          required
          data-pristine-required-message="Email pengguna harus diisi"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="NIP Pengguna" label-for="input-user-nip">
        <b-form-input
          v-model="user.form.nip"
          id="input-user-nip"
          type="text"
          placeholder="Masukkan NIP Pengguna (optional)"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password Pengguna" label-for="input-user-password">
        <b-input-group>
          <b-form-input
            v-model="user.form.password"
            id="input-user-password"
            type="text"
            placeholder="Masukkan Password Pengguna"
            required
            data-pristine-required-message="password pengguna harus diisi"
          ></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group label="Pekerjaan Pengguna" label-for="input-user-job">
        <b-form-input
          v-model="user.form.job"
          id="input-user-job"
          type="text"
          placeholder="Masukkan Pekerjaan Pengguna"
          required
          data-pristine-required-message="Pekerjaan pengguna harus diisi"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Kota Pengguna" label-for="input-user-district">
        <b-form-select
          v-model="selectedDistrict"
          id="input-user-district"
          :options="optionsDistrict"
          @change="changeSubDistrict(selectedDistrict)"
        >
        </b-form-select>
      </b-form-group>

      <b-form-group
        label="Kecamatan Pengguna"
        label-for="input-user-sub-district"
      >
        <b-form-select
          v-model="selectedSubDistrict"
          id="input-user-sub-district"
          :options="optionsSubDistrict"
          required
        >
        </b-form-select>
      </b-form-group>

      <b-form-group
        label="Jenis Kelamin Pengguna"
        label-for="input-user-gender"
      >
        <b-form-select
          v-model="selectedGender"
          id="input-user-gender"
          :options="optionsGender"
          required
        >
        </b-form-select>
      </b-form-group>

      <b-form-group label="Biodata Pengguna" label-for="input-user-biodata">
        <b-form-textarea
          v-model="user.form.bio"
          id="input-user-bio"
          placeholder="Masukkan biodata pengguna"
          rows="3"
          max-rows="10"
          required
        ></b-form-textarea>
      </b-form-group>

      <div class="form-group">
        <label for="input-image">Unggah Gambar Pengguna</label>
        <br />
        <picture>
          <img
            class="img-fluid mb-2 user-image"
            :src="user.form.image.url"
            data-action="zoom"
          />
        </picture>
        <b-form-file
          id="input-image"
          ref="image"
          v-model="user.form.image.value"
          placeholder="Pilih gambar atau letakkan di sini"
          drop-placeholder="Letakkan file di sini"
          accept=".jpg, .jpeg, .png"
          browse-text="Telusuri"
          @input="handleImageBeforeUpload()"
          no-traverse
        ></b-form-file>
      </div>
    </b-form>

    <hr class="border-dark" />

    <h3>Pilih Rule Pengguna</h3>
    <b-form id="rule-edit-form">
      <b-form-group label="Rule Pengguna" label-for="input-rule">
        <b-form-select
          v-model="selectedRule"
          id="input-rule"
          :options="optionsRule"
          @change="changeRule(selectedRule)"
          required
        >
        </b-form-select>
      </b-form-group>
    </b-form>

    <div v-if="program.description != '' && program.name != ''">
      <div class="mt-5">Nama Program : {{ program.name }}</div>

      <b-form-group
        label="Deskripsi Program"
        label-for="input-program-description"
        class="mt-2"
      >
        <b-form-textarea
          v-model="program.description"
          id="input-program-description"
          rows="3"
          max-rows="10"
          readonly
        ></b-form-textarea>
      </b-form-group>
    </div>

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
      <b-button
        type="button"
        variant="warning"
        v-b-tooltip.hover
        title="Hapus"
        v-if="user.form.deleted_at == null"
        @click="userDump()"
      >
        <font-awesome-icon icon="trash" />
      </b-button>
      <b-button
        type="button"
        variant="primary"
        v-b-tooltip.hover
        title="Pulihkan"
        v-if="user.form.deleted_at != null"
        @click="userRestore()"
      >
        <font-awesome-icon icon="trash-restore" />
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
      domain: this.$config.domain,
      user: {
        form: {
          name: '',
          email: '',
          nip: '',
          password: '',
          gender: '',
          job: '',
          bio: '',
          image: {
            current_url: '',
            url: 'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70',
            max: 5242880,
            type: ['image/jpg', 'image/jpeg', 'image/png'],
            value: null,
          },
          deleted_at: null,
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
        url = `${this.baseurl}/superadmin/user?id=${this.$route.params.id}`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl}/admin/user?id=${this.$route.params.id}`
      }

      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }

      const userData = await this.$axios.$get(url, config)
      console.log(this.$route.params)
      console.log(userData)
      this.selectedGender = userData.gender
      this.user.form.name = userData.name
      this.user.form.email = userData.email
      this.user.form.nip = userData.nip
      this.user.form.password = userData.password
      this.user.form.job = userData.job
      this.user.form.gender = userData.gender
      this.user.form.bio = userData.bio
      this.user.form.deleted_at = userData.deleted_at
      userData.userFiles.forEach((value) => {
        console.log(value.url)
        this.user.form.image.url = this.domain + value.url
        this.user.form.image.current_url = this.domain + value.url
      })

      let urlDistrict = `${this.baseurl}/district?city_id=6471`

      const indonesianArea = await this.$axios.$get(urlDistrict, config)
      const resultArray = indonesianArea.map((elm) => ({
        value: elm.id,
        text: elm.nama,
      }))
      this.optionsDistrict.push(...resultArray)
      this.selectedDistrict = userData.district

      let urlSubDistrict = `${this.baseurl}/sub-district?district_id=${parseInt(
        userData.district
      )}`

      const subDistrict = await this.$axios.$get(urlSubDistrict, config)
      const sbArrray = subDistrict.map((elm) => ({
        value: elm.id,
        text: elm.nama,
      }))
      this.optionsSubDistrict.push(...sbArrray)
      this.selectedSubDistrict = userData.sub_district

      let urlRule
      if (this.auth.user.rule_id == 1) {
        urlRule = `${this.baseurl}/superadmin/rules`
      } else if (this.auth.user.rule_id == 2) {
        urlRule = `${this.baseurl}/admin/rules`
      }

      const setRule = await this.$axios.$post(urlRule, {}, config)
      console.log(setRule)
      const ruleArray = setRule.map((elm) => ({
        value: elm.id,
        text: elm.rule,
      }))
      this.optionsRule.push(...ruleArray)
      this.selectedRule = userData.rule_id
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
  mounted() {
    this.formValidation('user-edit-form');
    this.formValidation('rule-edit-form');
  },
  methods: {
    generatePassword() {
      let generatePassword = randomstring.generate()
      this.user.form.password = generatePassword
    },
    async changeSubDistrict(district) {
      let url = `${this.baseurl}/sub-district?district_id=${parseInt(district)}`

      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }
      const subDistrict = await this.$axios.$get(url, config)
      const sbArrray = subDistrict.map((elm) => ({
        value: elm.id,
        text: elm.nama,
      }))

      this.selectedSubDistrict = null
      ;(this.optionsSubDistrict = [
        { value: 'null', text: 'Pilih Kecamatan...', disabled: true },
      ]),
        this.optionsSubDistrict.push(...sbArrray)

      console.log(this.optionsSubDistrict)
    },
    async changeRule(setRule) {
      let urlRule
      if (this.auth.user.rule_id == 1) {
        urlRule = `${this.baseurl}/superadmin/rule/program?rule_id=${parseInt(
          setRule
        )}`
      } else if (this.auth.user.rule_id == 2) {
        urlRule = `${this.baseurl}/admin/rule/program?rule_id=${parseInt(
          setRule
        )}`
      }

      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }

      const rule = await this.$axios.$get(urlRule, config)

      this.user.name = ''
      this.user.description = ''

      if (rule.length != 0) {
        this.user.name = rule[0].users.name;
        this.user.description = rule[0].users.description;
      }
    },
    async formSubmit() {
      try {
        $.LoadingOverlay('show')
        let validate = this.formValidation('user-edit-form').validate()

        if (!validate) {
          return
        }

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/user`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/user`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let formData = new FormData()
        formData.append('id', this.$route.params.id)
        formData.append('rule_id', parseInt(this.selectedRule))
        formData.append('name', this.user.form.name)
        formData.append('email', this.user.form.email)
        formData.append('password', this.user.form.password)
        formData.append('job', this.user.form.job)
        formData.append('district', this.selectedDistrict)
        formData.append('sub_district', this.selectedSubDistrict)
        formData.append('gender', this.selectedGender)
        if (this.user.form.nip != null) {
          formData.append('nip', this.user.form.nip)
        }
        if (this.user.form.bio != null) {
          formData.append('bio', this.user.form.bio)
        }
        if (this.user.form.image.value != null) {
          formData.append('image', this.user.form.image.value)
        }

        const user = await this.$axios.$put(url, formData, config)
        console.log(user)

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil disimpan',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    async userRestore() {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/user/restore`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/user/restore`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          id: this.$route.params.id,
        }
        console.log(payload)

        const res = await this.$axios.$put(url, payload, config)
        console.log(res)

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil dipulihkan',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    async userDump() {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/user/dump`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/user/dump`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          id: this.$route.params.id,
        }
        console.log(payload)

        const res = await this.$axios.$put(url, payload, config)
        console.log(res)

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil dihapus',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    handleImageBeforeUpload() {
      console.log(this.user.form.image.value)

      this.user.form.image.url =
        'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
      if (this.user.form.image.value != null) {
        this.user.form.image.url = URL.createObjectURL(
          this.user.form.image.value
        )

        if (this.user.form.image.value.size >= this.user.form.image.max) {
          this.$refs.image.reset()
          this.user.form.image.url =
            'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Gambar tidak boleh melebihi dari 5 MB',
          })
        }

        if (
          !this.user.form.image.type.includes(this.user.form.image.value.type)
        ) {
          this.$refs.image.reset()
          this.user.form.image.url =
            'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Gambar yang diupload harus jpeg, jpg, dan png',
          })
        }
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
  },
}
</script>
