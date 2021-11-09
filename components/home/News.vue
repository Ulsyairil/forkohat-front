<template>
  <div>
    <div v-if="news.data.length > 0">
      <b-row class="p-4">
        <b-col md="4" v-for="(value, index) in news.data" :key="index">
          <div class="card h-100 shadow mt-2">
            <img
              class="card-img-top img-responsive img-fluid"
              :src="domain + value.newsFiles[0].url"
              img-alt="events Banner"
              style="max-width: 100%; height: 230px"
            />
            <div class="card-body d-flex flex-column">
              <span class="small" style="color: #e71e1e">{{
                value.created_at
              }}</span>
              <h5
                class="card-title text-center mt-3 mb-4"
                style="color: #0140b5"
              >
                {{ value.title }}
              </h5>

              <div
                class="card-text small text-secondary d-none d-md-block"
                v-html="value.content.substring(0, 200) + '<p>. . . . . </p>'"
              ></div>

              <a class="btn btn-primary mt-auto" @click="moreButton(value.id)">
                Selengkapnya
              </a>
            </div>
          </div>
        </b-col>
      </b-row>
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
        page: 1,
        limit: '3',
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
    moreButton(id) {
      console.log(id)
      this.$router.push(`/news/${id}`)
    },
  },
}
</script>
