<template>
  <div class="mb-5 mt-4">
    <div v-if="programs.data.length > 0">
      <div class="text-center">
        <h2>Program</h2>
        <hr style="height: 5px; width: 100px" class="bg-azure" />
      </div>
      <div class="mt-5">
        <div class="row">
          <div
            class="col-md-12"
            v-for="(value, index) in programs.data"
            :key="index"
          >
            <div v-if="index % 2 != 0">
              <b-card
                :title="value.name"
                :img-src="domain + value.programFiles[0].url"
                img-alt="Card image"
                img-height="320"
                img-width="300"
                img-left
                class="mb-5 mt-5"
              >
                <b-card-text>
                  Some quick example text to build on the card and make up the
                  bulk of the card's content.
                </b-card-text>
              </b-card>
            </div>

            <div v-if="index % 2 == 0">
              <b-card
                :title="value.name"
                :img-src="domain + value.programFiles[0].url"
                img-alt="Card image"
                img-height="320"
                img-width="300"
                img-right
              >
                <b-card-text>
                  Some quick example text to build on the card and make up the
                  bulk of the card's content.
                </b-card-text>
              </b-card>
            </div>
          </div>
        </div>

        <b-pagination-nav
          class="mt-4"
          :link-gen="linkGen"
          :number-of-pages="programs.pages"
          align="center"
          use-router
          pills
        ></b-pagination-nav>
      </div>
    </div>

    <div v-if="programs.data.length == 0">
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
      programs: {
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
      url = `${this.baseurl}/program`

      let payload = {
        page: this.currentPage(),
        limit: '10',
        search: '',
      }

      console.log(payload)

      const res = await this.$axios.$post(url, payload)
      console.log(res)

      this.programs.pages = res.lastPage
      this.programs.total = res.total
      this.programs.data = res.data
      console.log(this.programs)
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
