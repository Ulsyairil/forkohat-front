<template>
  <div class="mb-5 mt-4">
    <b-button type="button" variant="primary" @click="redirectBack()">
      <font-awesome-icon icon="arrow-left" />
      <span>Kembali</span>
    </b-button>
    <div class="text-center">
      <h2>Tatanan</h2>
      <hr style="height: 5px; width: 100px" class="bg-azure" />
    </div>

    <b-col class="mt-5" v-if="orders.data.length > 0">
      <div class="row">
        <div
          class="col-md-6 mt-4"
          v-for="(value, index) in orders.data"
          :key="index"
          @click="openOrders(value.id)"
        >
          <div
            class="row no-gutters h-100 orders mb-2 border"
            style="cursor: pointer"
          >
            <div class="col-md-3">
              <img
                fluid=""
                :src="`images/tatanan-${index+1}.png`"
                alt="Image"
                class="rounded-0 img-responsive card-img m-2 p-3"
              />
            </div>
            <div class="col-md-9 mt-3">
              <div class="card-body pt-0 author-mobile">
                <h4 class="card-name">{{ value.name }}</h4>
                <p>
                  {{ value.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-col>

    <b-col class="mt-5" v-if="orders.data.length == 0">
      <h4>Data tidak ditemukan</h4>
    </b-col>
  </div>
</template>

<style lang="scss">
.orders {
  transition: 0.4s;
}

.orders:hover {
  background-color: #ededed;
}
</style>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      baseurl: this.$config.baseurl,
      domain: this.$config.domain,
      urlOrders: null,
      orders: {
        program_id: '',
        pages: '',
        perPage: 10,
        total: '',
        data: [],
      },
      order_file: {
        form: {
          page: 1,
          file: {
            type: ['application/pdf'],
            value: null,
          },
          current_value: [],
        },
      },
    }
  },
  async fetch() {
    try {
      let url
      url = `${this.baseurl}/order`

      let payload = {
        program_id: '7',
        page: this.currentPage(),
        limit: '10',
        search: '',
      }

      console.log(payload)

      const res = await this.$axios.$post(url, payload)
      console.log(res)

      this.orders.pages = res.lastPage
      this.orders.total = res.total
      this.orders.data = res.data
      console.log(this.orders)
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
    async openOrders(id) {
      this.$router.push(`/orders/stuff/${id}`)
    },
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
  },
}
</script>
