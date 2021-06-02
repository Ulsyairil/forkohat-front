<template>
  <div>
    <b-form id="user-create-form">
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
          type="email"
          placeholder="Masukkan alamat email"
          required
          data-pristine-required-message="email pengguna harus diisi"
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
        <b-input-group-append>
          <b-button @click="generatePassword()" variant="primary">Generate</b-button>
        </b-input-group-append>
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
          required
          data-pristine-required-message="Gambar user harus diunggah"
        ></b-form-file>
      </div>
    </b-form>

    <hr class="border-dark" />

    <h3>Buat Rule Pengguna</h3>
    <b-form id="rule-create-form">
      <b-form-group label="Rule Pengguna" label-for="input-rule">
        <b-form-input
          v-model="rule.form.text"
          id="input-rule"
          type="text"
          placeholder="Masukkan Rule"
          required
          data-pristine-required-message="Nama tatanan harus diisi"
        ></b-form-input>
      </b-form-group>
    </b-form>

    <div>
      <b-button
        type="button"
        variant="primary"
        v-b-tooltip.hover
        title="Tambah Topik Pertanyaan"
        @click="addRule()"
      >
        <font-awesome-icon icon="plus-square" />
      </b-button>
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

    <div class="table-responsive mt-3" v-if="rule.value.length != 0">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Rule</th>
            <th scope="col" class="text-center">Hapus</th>
          </tr>
        </thead>
        <tbody v-for="(value, index) in rule.value" :key="index">
          <tr>
            <td>{{ value.rule }}</td>
            <td class="text-center">
              <b-button
                type="button"
                variant="danger"
                @click="deleteOrder(index)"
              >
                <font-awesome-icon icon="trash" />
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
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

export default {
  data() {
    return {
      selectedGender: null,
      selectedDistrict: null,
      selectedSubDistrict: null,
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
      baseurl: {
        dev: this.$config.baseurl.dev,
        prod: this.$config.baseurl.prod,
      },
      user: {
        form: {
          name: '',
          email: '',
          nip: '',
          password: '',
          job: '',
          bio: '',
          image: {
            url:
              'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70',
            max: 5242880,
            type: ['image/jpg', 'image/jpeg', 'image/png'],
            value: null,
          },
        },
      },
      rule: {
        form: {
          text: '',
        },
        value: [],
      },
    }
  },
  mounted() {
    this.getDistrict()
    //this.getRule();
    this.formValidation('user-create-form')
    this.formValidation('rule-create-form')
  },
  methods: {
    generatePassword() {
      let generatePassword = Randomstring.generate();
      this.user.form.password = generatePassword
    },
    async formSubmit() {
      try {
        $.LoadingOverlay('show')

        if (this.rule.value.length == 0) {
          $.LoadingOverlay('hide')

          return Swal.fire({
            icon: 'warning',
            title: 'Rule harus dibuat',
          })
        }

        let validate = this.formValidation('user-create-form').validate()

        if (!validate) {
          return
        }

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/user`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/user`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          rule: this.rule.form.text,
        }

        let urlRule
        if (this.auth.user.rule_id == 1) {
          urlRule = `${this.baseurl.dev}/superadmin/rule`
        } else if (this.auth.user.rule_id == 2) {
          urlRule = `${this.baseurl.dev}/admin/rule`
        }

        const rule = await this.$axios.$post(urlRule, payload, config)

        const formData = new FormData()
        formData.append('rule_id', rule.id)
        formData.append('name', this.user.form.name)
        formData.append('email', this.user.form.email)
        formData.append('nip', this.user.form.nip)
        formData.append('password', this.user.form.password)
        formData.append('job', this.user.form.job)
        formData.append('district', this.selectedDistrict)
        formData.append('sub_district', this.selectedSubDistrict)
        formData.append('gender', this.selectedGender)
        formData.append('bio', this.user.form.bio)
        formData.append('image', this.user.form.image.value)

        const user = await this.$axios.$post(url, formData, config)
        console.log(user)

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
          title: 'Gagal disimpan',
          text: error,
        })
      }
    },
    async getDistrict() {
      let url = `${this.baseurl.dev}/district?city_id=6471`

      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }
      const indonesianArea = await this.$axios.$get(url, config)
      const resultArray = indonesianArea.map((elm) => ({
        value: elm.id,
        text: elm.nama,
      }))
      this.optionsDistrict.push(...resultArray)
    },
    async changeSubDistrict(district) {
      let url = `${this.baseurl.dev}/sub-district?district_id=${parseInt(
        district
      )}`

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
    addRule() {
      if (this.rule.value.length != 0) {
        $.LoadingOverlay('hide')

        return Swal.fire({
          icon: 'warning',
          title: 'Rule sudah dibuat',
        })
      }

      let validate = this.formValidation('rule-create-form').validate()

      if (!validate) {
        return
      }

      let payload = {
        rule: this.rule.form.text,
      }

      this.rule.value.push(payload)

      console.log(this.rule.value)
    },
    // deleteOrder(index) {
    //   this.order.value.splice(index, 1)
    // },
    formValidation(form_id) {
      $.LoadingOverlay('hide')
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
  },
}
</script>
