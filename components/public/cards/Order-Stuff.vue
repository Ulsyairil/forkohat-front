<template>
  <div class="mb-5 mt-4">
    <b-button type="button" variant="primary" @click="redirectBack()">
      <font-awesome-icon icon="arrow-left" />
      <span>Kembali</span>
    </b-button>
    <div class="text-center">
      <h2>Isi Tatanan</h2>
      <hr style="height: 5px; width: 100px" class="bg-azure" />
    </div>

    <div v-if="order_stuff.data.length > 0">
      <b-card-group deck class="mt-5">
        <b-card
          class="shadow-sm"
          v-for="(value, index) in order_stuff.data"
          :key="index"
        >
          <span class="small" style="color: #e71e1e">
            {{ value.created_at }}
          </span>
          <b-card-title class="text-center mt-3" style="color: #0140b5">
            {{ value.name }}
          </b-card-title>
          <b-card-text>
            {{ value.description.substring(0, 200) + '.....' }}
          </b-card-text>

          <template #footer>
            <a
              class="btn btn-primary _df_button btn-block"
              :source="domain + value.orderStuffFiles[0].url"
            >
              <i class="fas fa-atlas mr-1"></i> Baca
            </a>
          </template>
        </b-card>
      </b-card-group>

      <b-pagination-nav
        class="mt-5"
        :link-gen="linkGen"
        :number-of-pages="order_stuff.pages"
        align="center"
        use-router
        pills
      ></b-pagination-nav>
    </div>

    <div v-if="order_stuff.data.length == 0">
      <h4>Data tidak ditemukan</h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseurl: this.$config.baseurl,
      domain: this.$config.domain,
      order_stuff: {
        total: 0,
        perPage: 0,
        page: 1,
        lastPage: 1,
        data: [],
      },
    }
  },
  async fetch() {
    try {
      let url
      url = `${this.baseurl}/order/stuff`

      let payload = {
        order_id: this.$route.params.id,
        page: this.currentPage(),
        limit: '10',
        search: '',
      }

      console.log(payload)

      const res = await this.$axios.$post(url, payload)
      console.log(res)

      this.order_stuff.pages = res.lastPage
      this.order_stuff.total = res.total
      this.order_stuff.data = res.data
      console.log(this.order_stuff)
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
  methods: {
    redirectBack() {
      this.$router.back()
    },
    currentPage() {
      if (this.$route.query.page == undefined) {
        return 1
      } else {
        return this.$route.query.page
      }
    },
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
