<template>
  <div>
    <div class="container">
      <h3 class="mb-3">Daftar Rule</h3>
      <div>
        <b-button type="button" variant="primary" v-b-modal="'createModal'">
          <span>Buat Rule</span>
          <font-awesome-icon icon="arrow-right" />
        </b-button>
      </div>
      <div>
        <TablesRule />
      </div>

      <b-modal
        id="createModal"
        size="xl"
        title="Tambah Rule"
        hide-footer
        header-bg-variant="primary"
        header-text-variant="light"
        centered
        scrollable
      >
        <b-form-group label="Nama Rule" label-for="input-rule-name">
          <b-form-input
            ref="input_rule_name"
            v-model="rule.name"
            id="input-rule-name"
            type="text"
            placeholder="Masukkan Nama Rule"
            required
            data-pristine-required-message="Nama Rule harus diisi"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="success" @click.prevent="ruleSubmit()">
          <font-awesome-icon icon="save" />
        </b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      rule: {
        name: '',
      },
      baseurl: this.$config.baseurl,
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
    }
  },
  methods: {
    async ruleSubmit() {
      try {
        console.log('running....')
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/rule`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/rule`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let formData = new FormData()
        formData.append('rule', this.rule.name)

        const rule = await this.$axios.$post(url, formData, config)
        console.log(rule)

        setTimeout(() => {
          window.location.reload(true)
        }, 1000)

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
  },
}
</script>
