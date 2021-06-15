<template>
  <div class="mb-5 mt-4">
    <div class="text-center">
      <h2>Event</h2>
      <hr style="height: 5px; width: 100px" class="bg-azure" />
    </div>
    <div class="mb-3 mt-5">
      <b-form @submit.prevent="searchForm()">
        <b-form-group>
          <b-input-group>
            <b-form-input
              style="max-width: 300px"
              placeholder="Cari..."
              v-model="events.search"
            ></b-form-input>
            <b-input-group-append>
              <b-button type="submit" variant="primary">
                <font-awesome-icon icon="search" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-form>
    </div>

    <div v-if="events.data.length > 0">
      <div class="row">
        <div
          class="col-md-4 mb-4 mb-md-0"
          v-for="(value, index) in events.data"
          :key="index"
        >
          <b-card
            :title="value.name"
            :img-src="domain + value.eventFiles[0].url"
            img-alt="events Banner"
            style="max-width: 20rem"
            class="mb-2"
            img-top
          >
            <b-button href="#" variant="primary"> Lihat Event </b-button>
          </b-card>
        </div>
      </div>

      <b-pagination-nav
        class="mt-4"
        :link-gen="linkGen"
        :number-of-pages="events.pages"
        align="center"
        use-router
        pills
      ></b-pagination-nav>
    </div>

    <div v-if="events.data.length == 0">
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
      events: {
        search: '',
        pages: '',
        perPage: 10,
        total: '',
        data: [],
      },
    }
  },
  async fetch() {
    try {
      let url
      url = `${this.baseurl}/event`

      let payload = {
        order_id: this.$route.params.id,
        page: this.currentPage(),
        limit: '10',
        search: '',
      }

      console.log(payload)

      const res = await this.$axios.$post(url, payload)
      console.log(res)

      this.events.pages = res.lastPage
      this.events.total = res.total
      this.events.data = res.data
      console.log(this.events)
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
    async searchForm() {
      try {
        let url
        url = `${this.baseurl}/event`

        let payload = {
          order_id: this.$route.params.id,
          page: this.currentPage(),
          limit: '10',
          search: this.events.search,
        }

        console.log(payload)

        const res = await this.$axios.$post(url, payload)
        console.log(res)

        this.events.pages = res.lastPage
        this.events.total = res.total
        this.events.data = res.data
        console.log(this.events)
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