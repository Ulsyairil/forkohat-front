<template>
  <div>
    <grid
      :cols="columns"
      :language="language"
      :auto-width="autoWidth"
      :search="search"
      :pagination="pagination"
      :theme="theme"
      :server="server"
      :sort="sort"
      :fixed-header="true"
    ></grid>

    <b-modal
      id="editModal"
      size="xl"
      title="Edit Rule"
      hide-footer
      header-bg-variant="primary"
      header-text-variant="light"
      centered
      scrollable
    >
      <input type="hidden" ref="input_rule_id" v-model="editRule.id" />
      <b-form-group label="Nama Rule" label-for="input-rule-name">
        <b-form-input
          ref="input_rule_name"
          v-model="editRule.name"
          id="input-rule-name"
          type="text"
          placeholder="Masukkan Nama Rule"
          required
          data-pristine-required-message="Nama Rule harus diisi"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success" @click.prevent="editSubmit()">
        <font-awesome-icon icon="save" />
      </b-button>
      <b-button
        type="button"
        variant="warning"
        v-b-tooltip.hover
        title="Hapus"
        v-if="editRule.deleted_at == null"
        @click="userDump()"
      >
        <font-awesome-icon icon="trash" />
      </b-button>
      <b-button
        type="button"
        variant="primary"
        v-b-tooltip.hover
        title="Pulihkan"
        v-if="editRule.deleted_at != null"
        @click="userRestore()"
      >
        <font-awesome-icon icon="trash-restore" />
      </b-button>
    </b-modal>
  </div>
</template>

<style lang="scss">
.pointer_cursor {
  cursor: pointer;
}

table {
  width: 100% !important;
}

table {
  .gridjs-th-content {
    word-break: normal !important;
  }
}
</style>

<script>
import moment from 'moment'
export default {
  data() {
    const baseurl = this.$config.baseurl
    const auth = this.$auth.$storage.getCookie('token')
    const authUser = this.$auth.$storage.getCookie('user')
    let url

    if (authUser.rule_id == 1) {
      url = `${baseurl}/superadmin/rules`
    } else if (authUser.rule_id == 2) {
      url = `${baseurl}/admin/rules`
    }

    return {
      editRule: {
        id: '',
        name: '',
        deleted_at: null,
      },
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
      baseurl: this.$config.baseurl,
      autoWidth: true,
      search: true,
      sort: {
        enabled: true,
      },
      pagination: {
        enabled: true,
        limit: 10,
        summary: false,
      },
      theme: 'mermaid',
      columns: [
        'ID',
        'Rule',
        {
          name: 'Dibuat',
          formatter: (cell, row) => {
            return moment(cell).locale('id').format('llll')
          },
        },
        {
          name: 'Diperbarui',
          formatter: (cell, row) => {
            return moment(cell).locale('id').format('llll')
          },
        },
        {
          name: 'Dihapus',
          formatter: (cell, row) => {
            if (cell == null) {
              return '-'
            }

            if (cell != null) {
              return moment(cell).locale('id').format('llll')
            }
          },
        },
        ,
        {
          name: 'Ubah',
          formatter: (cell, row) => {
            return this.$gridjs.h('i', {
              className: 'fas fa-edit m-2 text-warning pointer_cursor',
              onClick: () =>
                this.editButton(row.cells[0].data, row.cells[1].data , row.cells[4].data),
            })
          },
        },
      ],
      server: {
        url: url,
        method: 'POST',
        headers: {
          Authorization: `${auth.type} ${auth.token}`,
        },
        then: (data) =>
          data.map((user) => [
            user.id,
            user.rule,
            user.created_at,
            user.updated_at,
            user.deleted_at,
          ]),
        handle: (res) => {
          if (res.status === 404) return { data: [] }
          if (res.ok) return res.json()

          throw Error('Terjadi masalah pada server!')
        },
      },
      language: {
        search: {
          placeholder: 'Cari',
        },
        sort: {
          sortAsc: 'Urutkan kolom menaik',
          sortDesc: 'Urutkan kolom menurun',
        },
        pagination: {
          previous: 'Sebelumnya',
          next: 'Selanjutnya',
          navigate: (page, pages) => `Halaman ${page} Dari ${pages}`,
          page: (page) => `Halaman ${page}`,
          showing: 'Menampilkan',
          of: 'dari',
          to: 'Ke',
          results: 'Hasil',
        },
        loading: 'Memuat',
        noRecordsFound: 'Tidak ditemukan catatan yang cocok',
        error: 'Terjadi kesalahan saat mengambil data',
      },
    }
  },
  methods: {
    editButton(id, name , deleted_at) {
      this.$bvModal.show('editModal')
      this.editRule.id = id
      this.editRule.name = name
      this.editRule.deleted_at = deleted_at
    },
    async editSubmit() {
      try {
        console.log('running....')
        $.LoadingOverlay('show')

        let urlEdit
        if (this.auth.user.rule_id == 1) {
          urlEdit = `${this.baseurl}/superadmin/rule`
        } else if (this.auth.user.rule_id == 2) {
          urlEdit = `${this.baseurl}/admin/rule`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let formData = new FormData()
        formData.append('rule_id', this.editRule.id)
        formData.append('rule', this.editRule.name)

        const rule = await this.$axios.$put(urlEdit, formData, config)
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
        async userRestore() {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/rule/restore`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/rule/restore`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          rule_id: this.editRule.id,
        }
        console.log(payload)

        const res = await this.$axios.$put(url, payload, config)
        console.log(res)

        setTimeout(() => {
          window.location.reload(true)
        }, 1000)


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
          url = `${this.baseurl}/superadmin/rule/dump`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/rule/dump`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          rule_id: this.editRule.id,
        }
        console.log(payload)

        const res = await this.$axios.$put(url, payload, config)
        console.log(res)

        setTimeout(() => {
          window.location.reload(true)
        }, 1000)


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
  },
  mounted() {
    console.log(this.$auth.$storage.getCookie('user'))
  },
}
</script>
