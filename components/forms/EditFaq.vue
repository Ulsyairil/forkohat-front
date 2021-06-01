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
      <div class="form-group">
        <label for="input-deleted_at">Tanggal Dihapus</label>
        <b-form-datepicker
          id="input-deleted_at"
          v-model="faq.form.deleted_at"
          locale="id"
          placeholder="-"
          disabled
        ></b-form-datepicker>
      </div>
      <div class="mt-3" v-if="topic.current != null">
        <b-card no-body>
          <b-tabs pills card vertical>
            <b-tab :title="faq.form.name">
              <b-card-text>
                <div
                  class="accordion"
                  role="tablist"
                  v-for="(value, index) in topic.current"
                  :key="index"
                >
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        block
                        v-b-toggle="`current-accordion-${index}`"
                        variant="info"
                      >
                        {{ value.title }}
                      </b-button>
                    </b-card-header>
                    <b-collapse
                      :id="`current-accordion-${index}`"
                      :visible="index == 0 ? true : false"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>{{ value.description }}</b-card-text>
                        <div class="form-group">
                          <label for="input-deleted_at">Tanggal Dihapus</label>
                          <b-form-datepicker
                            id="input-deleted_at"
                            v-model="value.deleted_at"
                            locale="id"
                            placeholder="-"
                            disabled
                          ></b-form-datepicker>
                        </div>
                        <div>
                          <b-button
                            type="button"
                            variant="primary"
                            v-b-tooltip.hover
                            title="Ubah"
                            v-b-modal="`modal-${index}`"
                          >
                            <font-awesome-icon icon="edit" />
                          </b-button>

                          <b-button
                            type="button"
                            variant="warning"
                            v-b-tooltip.hover
                            title="Hapus"
                            v-if="value.deleted_at == null"
                            @click="topicDump(value.id)"
                          >
                            <font-awesome-icon icon="trash" />
                          </b-button>

                          <b-button
                            type="button"
                            variant="warning"
                            v-b-tooltip.hover
                            title="Pulihkan"
                            v-if="value.deleted_at != null"
                            @click="topicRestore(value.id)"
                          >
                            <font-awesome-icon icon="trash-restore" />
                          </b-button>

                          <b-button
                            type="button"
                            variant="danger"
                            v-b-tooltip.hover
                            title="Hapus Permanen"
                            @click="topicDelete(value.id)"
                          >
                            <font-awesome-icon icon="ban" />
                          </b-button>
                        </div>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                  <b-modal
                    :id="`modal-${index}`"
                    size="lg"
                    title="Ubah Topik FAQ"
                    hide-footer
                    header-bg-variant="primary"
                    header-text-variant="light"
                    centered
                  >
                    <input type="hidden" ref="input_id" v-model="value.id" />
                    <b-form-group label="Judul" label-for="input-title">
                      <b-form-input
                        ref="input_title"
                        v-model="value.title"
                        id="input-title"
                        type="text"
                        placeholder="Masukkan judul topic"
                        required
                        data-pristine-required-message="Judul topik FAQ harus diisi"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Deskripsi"
                      label-for="input-description"
                    >
                      <b-form-textarea
                        ref="input_description"
                        v-model="value.description"
                        id="input-description"
                        placeholder="Masukkan deskripsi topic"
                        rows="3"
                        max-rows="10"
                        required
                        data-pristine-required-message="Deskripsi topik FAQ harus diisi"
                      ></b-form-textarea>
                    </b-form-group>
                    <b-button
                      type="submit"
                      variant="success"
                      v-b-tooltip.hover
                      title="Simpan"
                      @click.prevent="topicSubmit()"
                    >
                      <font-awesome-icon icon="save" />
                    </b-button>
                  </b-modal>
                </div>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
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
    <b-button
      type="button"
      variant="warning"
      v-b-tooltip.hover
      title="Hapus"
      v-if="faq.form.deleted_at == null"
      @click="faqDump()"
    >
      <font-awesome-icon icon="trash" />
    </b-button>
    <b-button
      type="button"
      variant="warning"
      v-b-tooltip.hover
      title="Pulihkan"
      v-if="faq.form.deleted_at != null"
      @click="faqRestore()"
    >
      <font-awesome-icon icon="trash-restore" />
    </b-button>
    <b-button
      type="button"
      variant="danger"
      v-b-tooltip.hover
      title="Hapus Permanen"
      @click="faqDelete()"
    >
      <font-awesome-icon icon="ban" />
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
                          title="Hapus Permanen"
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
      baseurl: this.$config.baseurl,
      faq: {
        form: {
          name: '',
          deleted_at: '',
        },
      },
      topic: {
        title: '',
        description: '',
        current: null,
        form: [],
      },
    }
  },
  async fetch() {
    try {
      let url
      if (this.auth.user.rule_id == 1) {
        url = `${this.baseurl}/superadmin/faq?faq_id=${this.$route.params.id}`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl}/admin/faq?faq_id=${this.$route.params.id}`
      }

      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }

      const data = await this.$axios.$get(url, config)
      console.log(data)

      this.faq.form.name = data.name
      this.faq.form.deleted_at = data.deleted_at

      if (this.auth.user.rule_id == 1) {
        url = `${this.baseurl}/superadmin/faq/topics?faq_id=${this.$route.params.id}`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl}/admin/faq/topics?faq_id=${this.$route.params.id}`
      }

      const res = await this.$axios.$get(url, config)
      console.log(res)

      this.topic.current = res
    } catch (error) {
      console.log(error)
    }
  },
  mounted() {
    this.formValidation('faq-create-form')
  },
  methods: {
    async topicDelete(id) {
      try {
        $.LoadingOverlay('show')

        let payload = {
          id: id,
        }
        console.log(payload)

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/faq/topic`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/faq/topic`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
          data: payload,
        }

        const res = await this.$axios.$delete(url, config)
        console.log(res)

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil dihapus permanen',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Gagal dihapus permanen',
          text: error,
        })
      }
    },
    async topicRestore(id) {
      try {
        $.LoadingOverlay('show')

        let payload = {
          id: id,
        }
        console.log(payload)

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/faq/topic/restore`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/faq/topic/restore`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

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
          type: 'success',
          title: 'Gagal dipulihkan',
          text: error,
        })
      }
    },
    async topicDump(id) {
      try {
        $.LoadingOverlay('show')

        let payload = {
          id: id,
        }
        console.log(payload)

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/faq/topic/dump`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/faq/topic/dump`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

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
          type: 'success',
          title: 'Gagal dihapus',
          text: error,
        })
      }
    },
    async topicSubmit() {
      try {
        $.LoadingOverlay('show')

        let payload = {
          id: this.$refs.input_id[0].value,
          faq_id: this.$route.params.id,
          title: this.$refs.input_title[0].value,
          description: this.$refs.input_description[0].value,
        }
        console.log(payload)

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/faq/topic`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/faq/topic`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        const res = await this.$axios.$put(url, payload, config)
        console.log(res)

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil diubah',
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
    async faqDelete(id) {
      try {
        $.LoadingOverlay('show')

        let payload = {
          faq_id: this.$route.params.id,
        }
        console.log(payload)

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/faq`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/faq`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
          data: payload,
        }

        const res = await this.$axios.$delete(url, config)
        console.log(res)

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')

        this.$router.push('/dashboard/faq')

        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil dihapus permanen',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Gagal dihapus permanen',
          text: error,
        })
      }
    },
    async faqRestore() {
      try {
        $.LoadingOverlay('show')

        let payload = {
          faq_id: this.$route.params.id,
        }
        console.log(payload)

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/faq/restore`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/faq/restore`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

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
          type: 'success',
          title: 'Gagal dipulihkan',
          text: error,
        })
      }
    },
    async faqDump() {
      try {
        $.LoadingOverlay('show')

        let payload = {
          faq_id: this.$route.params.id,
        }
        console.log(payload)

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/faq/dump`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/faq/dump`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

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
          type: 'success',
          title: 'Gagal dihapus',
          text: error,
        })
      }
    },
    async formSubmit() {
      try {
        $.LoadingOverlay('show')
        let validate = this.formValidation('faq-create-form').validate()

        if (!validate) {
          return
        }

        let payload = {
          faq_id: this.$route.params.id,
          name: this.faq.form.name,
        }

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/faq`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/faq`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        const data = await this.$axios.$put(url, payload, config)
        console.log(data)

        this.topic.form.forEach(async (value) => {
          let url
          if (this.auth.user.rule_id == 1) {
            url = `${this.baseurl}/superadmin/faq/topic`
          } else if (this.auth.user.rule_id == 2) {
            url = `${this.baseurl}/admin/faq/topic`
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
        this.$nuxt.refresh()
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
