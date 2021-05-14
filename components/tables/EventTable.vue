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
  ></grid>
</template>

<style lang="scss">
.pointer_cursor {
  cursor: pointer;
}
</style>

<script>
export default {
  data() {
    const baseurl_prod = this.$config.baseurl.prod
    const baseurl_dev = this.$config.baseurl.dev
    const auth = this.$auth.$storage.getCookie('token')

    return {
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
      baseurl: {
        dev: this.$config.baseurl.dev,
        prod: this.$config.baseurl.prod,
      },
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
        'Dibuat',
        'Diperbarui',
        'Dihapus',
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
        url: `${baseurl_dev}/superadmin/events`,
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
