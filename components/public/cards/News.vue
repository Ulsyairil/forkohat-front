<template>
  <div class="mb-5 mt-4">
    <div class="text-center">
      <h2>Berita</h2>
      <hr style="height: 5px; width: 100px" class="bg-azure" />
    </div>
    <div class="mb-3 mt-5">
      <b-form @submit.prevent="searchForm()">
        <b-form-group>
          <b-input-group>
            <b-form-input
              style="max-width: 300px"
              placeholder="Cari..."
              v-model="news.search"
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

    <div v-if="news.data.length > 0">
      <div class="row">
        <div
          class="col-md-4 mb-4 mb-md-0"
          v-for="(value, index) in news.data"
          :key="index"
        >
          <div class="card shadow-sm" style="width: 20rem">
            <img
              class="card-img-top img-responsive img-fluid"
              :src="domain + value.newsFiles[0].url"
              img-alt="events Banner"
              style="max-width: 100%; height: 200px;"
            />
            <div class="card-body">
              <span class="small" style="color: #E71E1E;">{{ value.created_at }}</span>
              <h5 class="card-title text-center mt-3 mb-4" style="color: #0140B5">{{ value.title }}</h5>
              <p class="card-text small text-secondary">
                {{ value.content.substring(0, 200) + '.....' }}
              </p>
              <a class="btn btn-primary" @click="moreButton(value.id)"> Selengkapnya </a>
            </div>
          </div>
        </div>
      </div>

      <b-pagination-nav
        class="mt-4"
        :link-gen="linkGen"
        :number-of-pages="news.pages"
        align="center"
        use-router
        pills
      ></b-pagination-nav>
    </div>

    <div v-if="news.data.length == 0">
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
      news: {
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
      url = `${this.baseurl}/news`

      let payload = {
        order_id: this.$route.params.id,
        page: this.currentPage(),
        limit: '10',
        search: '',
      }

      console.log(payload)

      const res = await this.$axios.$post(url, payload)
      console.log(res)

      this.news.pages = res.lastPage
      this.news.total = res.total
      this.news.data = res.data
      console.log(this.news)
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
        url = `${this.baseurl}/news`

        let payload = {
          order_id: this.$route.params.id,
          page: this.currentPage(),
          limit: '10',
          search: this.news.search,
        }

        console.log(payload)

        const res = await this.$axios.$post(url, payload)
        console.log(res)

        this.news.pages = res.lastPage
        this.news.total = res.total
        this.news.data = res.data
        console.log(this.news)
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
    moreButton(id) {
      console.log(id)
      this.$router.push(`/news/${id}`)
    },
  },
}
</script>