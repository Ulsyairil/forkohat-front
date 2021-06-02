<template>
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
      url = `${baseurl}/superadmin/events`
    } else if (authUser.rule_id == 2) {
      url = `${baseurl}/admin/events`
    } else {
      url = `${baseurl}/employee/events`
    }

    console.log(`rule_id = ${authUser.rule_id}`)
    console.log(`url = ${url}`)

    return {
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
        'Event',
        'Penulis',
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
              onClick: () => this.editButton(row.cells[0].data),
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
          data.map((event) => [
            event.id,
            event.name,
            event.users.name,
            event.created_at,
            event.updated_at,
            event.deleted_at,
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
    editButton(id) {
      console.log(id)
      this.$router.push(`/dashboard/event/edit/${id}`)
    },
  },
  mounted() {
    console.log(this.$auth.$storage.getCookie('user'))
  },
}
</script>
