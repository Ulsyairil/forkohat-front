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
      <b-list-group>
        <b-list-group-item
          v-for="(value, index) in orders.data"
          :key="index"
          href="#"
          class="flex-column align-items-start"
          @click="openOrders(value.id)"
          v-b-modal.modal-1
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ value.name }}</h5>
            <small class="text-muted">{{ value.created_at }}</small>
          </div>

          <p class="mb-1">
            {{ value.description }}
          </p>
        </b-list-group-item>
      </b-list-group>
    </b-col>

    <b-col class="mt-5" v-if="orders.data.length == 0">
      <h4>Data tidak ditemukan</h4>
    </b-col>

    <b-modal id="modal-1" title="View Orders" hide-footer>
      <div class="d-block text-center"><div
        class="_df_thumb "
        :source="domain + urlOrders"
        thumb="/images/order_thumb.png"
        thumbtype="div"
        data-title="images"
        slug=""
        _slug=""
        wpoptions="true"
        df-parsed="true"
      >
        <div
          class="_df_book-cover"
          style="
            background-image: url('/images/order_thumb.png');
          "
        >
          <span class="_df_book-title">Preview</span>
        </div>
      </div></div>
      
    </b-modal>
  </div>
</template>

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
        program_id: this.$route.params.id,
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
      let url = `${this.baseurl}/order/stuff?id=${id}`

      const res = await this.$axios.$get(url)
      this.order_file.form.current_value = res.orderStuffFiles[0]
      this.urlOrders = this.order_file.form.current_value.url
      console.log(this.order_file)
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
