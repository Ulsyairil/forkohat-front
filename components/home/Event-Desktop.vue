<template>
  <div class="d-none d-md-block">
    <div v-if="events.data.length > 0">
      <div class="row">
        <div
          class="col-md-12"
          v-for="(value, index) in events.data"
          :key="index"
        >
          <div v-if="index % 2 != 0">
            <div class="col-md-6 align-self-start mt-3">
              <div class="row align-items-center">
                <div class="col-md-4 text-right">
                  <font-awesome-icon
                    icon="calendar-alt"
                    style="font-size: 35px !important"
                  />
                </div>
                <div class="col-md-8">
                  <a @click="moreButton(value.id)" href="javascript:void(0)">
                    <h5 class="text-danger">{{ value.created_at }}</h5>
                    <p class="text-primary">{{ value.name }}</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div v-if="index % 2 == 0">
            <div class="col-md-6 offset-md-6 align-self-end mt-3">
              <div class="row align-items-center">
                <div class="col-md-8">
                  <a
                    @click="moreButton(value.id)"
                    href="javascript:void(0)"
                    class="text-right"
                  >
                    <h5 class="text-danger">{{ value.created_at }}</h5>
                    <p class="text-primary">{{ value.name }}</p>
                  </a>
                </div>
                <div class="col-md-4 text-left">
                  <font-awesome-icon
                    icon="calendar-alt"
                    style="font-size: 35px !important"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center m-5">
        <a href="/events" class="btn btn-primary btn-round btn-lg">
          Lihat Event Lainnya
        </a>
      </div>
    </div>

    <div v-if="events.data.length == 0">
      <div class="container">
        <h4>Event tidak ditemukan</h4>
      </div>
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
        page: 1,
        limit: '4',
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
    moreButton(id) {
      console.log(id)
      this.$router.push(`/events/${id}`)
    },
  },
}
</script>
