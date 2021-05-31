<template>
  <div>
    <div class="mb-3 mt-3">
      <b-form @submit.prevent="searchForm()">
        <b-form-group>
          <b-input-group>
            <b-form-input
              style="max-width: 300px"
              placeholder="Cari..."
              v-model="order_stuff.search"
            ></b-form-input>
            <b-input-group-append>
              <b-button type="submit" variant="primary">
                <font-awesome-icon icon="search" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-form>

      <div v-if="order_stuff.data.length > 0">
        <div class="row">
          <div
            class="col-md-4 mb-4 mb-md-0"
            v-for="(value, index) in order_stuff.data"
            :key="index"
          >
            <b-card
              no-body
              class="overflow-auto shadow"
              style="max-height: 200px"
            >
              <b-row no-gutters>
                <b-col md="6" class="position-sticky">
                  <b-card-img
                    :src="domain.dev + value.orderStuffFiles[0].url"
                    alt="Image"
                    class="card-img rounded-0"
                  ></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body>
                    <b-card-title>
                      {{ value.name }}
                    </b-card-title>
                    <div class="mt-3">
                      <a
                        href="javascript:void(0)"
                        class="text-warning"
                        @click="redirectEditPage(value.id)"
                      >
                        <font-awesome-icon icon="edit" />
                      </a>
                    </div>
                  </b-card-body>
                </b-col>
                <b-card-body>
                  <b-card-text>
                    {{ value.description }}
                  </b-card-text>
                </b-card-body>
              </b-row>
            </b-card>
          </div>
        </div>

        <b-pagination-nav
          class="mt-4"
          :link-gen="linkGen"
          :number-of-pages="order_stuff.pages"
          use-router
          pills
        ></b-pagination-nav>
      </div>

      <div v-if="order_stuff.data.length == 0">
        <h4>Data tidak ditemukan</h4>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card-img {
  width: 100%;
  height: 20vw;
  object-fit: cover;
}

@media (max-width: 767px) {
  .card-img {
    height: 50vw;
  }
}
</style>

<script>
export default {
  data() {
    return {
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
      baseurl: {
        dev: this.$config.baseurl.dev,
        prod: this.$config.baseurl.prod,
      },
      domain: {
        dev: this.$config.domain.dev,
        prod: this.$config.domain.prod,
      },
      order_stuff: {
        pages: '',
        perPage: 10,
        total: '',
        data: [],
        search: '',
      },
    }
  },
  async fetch() {
    try {
      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }

      let url
      url = `${this.baseurl.dev}/employee/order/stuffs`

      let payload = {
        order_id: this.$route.params.id,
        page: this.currentPage(),
        limit: '10',
        search: '',
      }

      console.log(payload)

      const res = await this.$axios.$post(url, payload, config)
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
    async searchForm() {
      try {
        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let url
        url = `${this.baseurl.dev}/employee/order/stuffs`

        let payload = {
          order_id: this.$route.params.id,
          page: this.currentPage(),
          limit: '10',
          search: this.order_stuff.search,
        }

        console.log(payload)

        const res = await this.$axios.$post(url, payload, config)
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
    redirectEditPage(id) {
      return this.$router.push(
        `/dashboard/order/list/edit/${id}?order_id=${this.$route.params.id}`
      )
    },
  },
}
</script>
