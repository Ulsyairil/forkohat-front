<template>
  <div>
    <b-form id="faq-create-form">
      <b-form-group label="FAQ" label-for="input-name">
        <b-form-input
          v-model="faq.form.name"
          id="input-name"
          type="text"
          placeholder="Masukkan FAQ"
          required
          data-pristine-required-message="FAQ harus diisi"
        ></b-form-input>
      </b-form-group>
    </b-form>

    <hr class="border-dark" />

    <b-form id="faq-topic-create-form">
      <h3>Topik FAQ</h3>
      <b-form-group label="Judul" label-for="input-title">
        <b-form-input
          v-model="topic.title"
          id="input-title"
          type="text"
          placeholder="Masukkan judul topic"
          required
          data-pristine-required-message="Judul topik FAQ harus diisi"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Deskripsi" label-for="input-description">
        <b-form-textarea
          v-model="topic.description"
          id="input-description"
          placeholder="Masukkan deskripsi topic"
          rows="3"
          max-rows="10"
          required
          data-pristine-required-message="Deskripsi topik FAQ harus diisi"
        ></b-form-textarea>
      </b-form-group>
    </b-form>

    <b-button
      type="button"
      variant="primary"
      v-b-tooltip.hover
      title="Tambah Topik Pertanyaan"
      @click="addTopic()"
    >
      <font-awesome-icon icon="plus-square" />
    </b-button>
    <b-button
      type="submit"
      variant="success"
      @click.prevent="formSubmit()"
      v-b-tooltip.hover
      title="Simpan"
    >
      <font-awesome-icon icon="save" />
    </b-button>

    <div class="mt-3" v-if="topic.form.length != 0">
      <div>
        <h4>Pratinjau</h4>
      </div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab :title="faq.form.name">
            <b-card-text>
              <div
                class="accordion"
                role="tablist"
                v-for="(value, index) in topic.form"
                :key="index"
              >
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button
                      block
                      v-b-toggle="`accordion-${index}`"
                      variant="info"
                    >
                      {{ value.title }}
                    </b-button>
                  </b-card-header>
                  <b-collapse
                    :id="`accordion-${index}`"
                    :visible="index == 0 ? true : false"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-card-text>{{ value.description }}</b-card-text>
                      <div>
                        <b-button
                          class="mt-2"
                          type="button"
                          variant="danger"
                          v-b-tooltip.hover
                          title="Hapus"
                          @click="removeTopic(index)"
                        >
                          <font-awesome-icon icon="trash" />
                        </b-button>
                      </div>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
      baseurl: {
        dev: this.$config.baseurl.dev,
        prod: this.$config.baseurl.prod,
      },
      faq: {
        form: {
          name: '',
        },
      },
      topic: {
        title: '',
        description: '',
        form: [],
      },
    }
  },
  mounted() {
    this.formValidation('faq-create-form')
  },
  methods: {
    async formSubmit() {
      try {
        $.LoadingOverlay('show')
        let validate = this.formValidation('faq-create-form').validate()

        if (!validate) {
          return
        }

        if (this.topic.form.length == 0) {
          return Swal.fire({
            icon: 'warning',
            title: 'Topik FAQ harus diisi',
          })
        }

        let payload = {
          name: this.faq.form.name,
        }

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/faq`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/faq`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        const data = await this.$axios.$post(url, payload, config)
        console.log(data)

        this.topic.form.forEach(async (value) => {
          let url
          if (this.auth.user.rule_id == 1) {
            url = `${this.baseurl.dev}/superadmin/faq/topic`
          } else if (this.auth.user.rule_id == 2) {
            url = `${this.baseurl.dev}/admin/faq/topic`
          }

          let payload = {
            faq_id: data.id,
            title: value.title,
            description: value.description,
          }

          const res = await this.$axios.$post(url, payload, config)
          console.log(res)
        })

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
    addTopic() {
      let validate = this.formValidation('faq-topic-create-form').validate()

      if (!validate) {
        return
      }

      let payload = {
        title: this.topic.title,
        description: this.topic.description,
      }
      console.log(payload)

      this.topic.form.push(payload)
      console.log(this.topic.form)
    },
    removeTopic(id) {
      this.topic.form.splice(id, 1)
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
