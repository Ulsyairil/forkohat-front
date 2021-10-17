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
export default {
  data() {
    const baseurl = this.$config.baseurl
    const auth = this.$auth.$storage.getCookie('token')
    const authUser = this.$auth.$storage.getCookie('user')
    let url

    if (authUser.rule_id == 1) {
      url = `${baseurl}/superadmin/orders?program_id=${this.$route.params.id}`
    } else if (authUser.rule_id == 2) {
      url = `${baseurl}/admin/orders?program_id=${this.$route.params.id}`
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
        'Program',
        {
          name: 'Aksi',
          sort: {
            enabled: false,
          },
          formatter: (cell, row) => {
            return this.$gridjs.h('i', {
              className:
                'fas fa-arrow-alt-circle-right fa-2x m-2 text-primary pointer_cursor',
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
        then: (data) => data.map((event) => [event.id, event.name]),
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
      this.$router.push(`/dashboard/event/program/order/${id}`)
    },
  },
  mounted() {
    console.log(this.$route.params.id)
  },
}
</script>
