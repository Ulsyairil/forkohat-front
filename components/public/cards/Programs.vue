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
              <!-- Desktop -->
              <div class="d-none d-md-block">
                <b-row class="mt-2 mb-2" no-gutters>
                  <b-col md="3" align-self="center" class="text-center">
                    <b-card-img
                      :src="domain + value.programFiles[0].url"
                      alt="Image"
                      class="p-2 rounded-0"
                      style="
                        max-height: 200px !important;
                        max-width: 180px !important;
                      "
                    ></b-card-img>
                  </b-col>
                  <b-col md="9">
                    <b-card-body :title="value.name">
                      <b-card-text>
                        {{ value.description }}
                      </b-card-text>
                      <b-button
                        type="button"
                        variant="primary"
                        @click="orderProgram(value.id)"
                      >
                        Lihat Tatanan
                        <font-awesome-icon icon="arrow-right" />
                      </b-button>
                    </b-card-body>
                  </b-col>
                </b-row>
              </div>

              <!-- Mobile -->
              <div class="d-md-none">
                <b-row class="mt-2 mb-2" no-gutters>
                  <b-col align-self="center">
                    <b-card-img
                      :src="domain + value.programFiles[0].url"
                      alt="Image"
                      class="p-2 rounded-0"
                      style="
                        max-height: 200px !important;
                        max-width: 180px !important;
                      "
                    ></b-card-img>
                  </b-col>
                  <b-col align-self="center">
                    <b-card-body :title="value.name">
                      <b-button
                        type="button"
                        variant="primary"
                        @click="orderProgram(value.id)"
                      >
                        Lihat Tatanan
                        <font-awesome-icon icon="arrow-right" />
                      </b-button>
                    </b-card-body>
                  </b-col>
                </b-row>
              </div>
            </div>

            <div v-if="index % 2 == 0">
              <!-- Desktop -->
              <div class="d-none d-md-block">
                <b-row class="mt-2 mb-2" no-gutters>
                  <b-col md="9">
                    <b-card-body :title="value.name">
                      <b-card-text>
                        {{ value.description }}
                      </b-card-text>
                      <b-button
                        type="button"
                        variant="primary"
                        @click="orderProgram(value.id)"
                      >
                        Lihat Tatanan
                        <font-awesome-icon icon="arrow-right" />
                      </b-button>
                    </b-card-body>
                  </b-col>
                  <b-col md="3" align-self="center" class="text-center">
                    <b-card-img
                      :src="domain + value.programFiles[0].url"
                      alt="Image"
                      class="p-2 rounded-0"
                      style="
                        max-height: 300px !important;
                        max-width: 200px !important;
                      "
                    ></b-card-img>
                  </b-col>
                </b-row>
              </div>

              <!-- Mobile -->
              <div class="d-md-none">
                <b-row
                  class="mt-2 mb-2"
                  no-gutters
                  @click="orderProgram(value.id)"
                >
                  <b-col align-self="center">
                    <b-card-img
                      :src="domain + value.programFiles[0].url"
                      alt="Image"
                      class="p-2 rounded-0"
                      style="
                        max-height: 200px !important;
                        max-width: 180px !important;
                      "
                    ></b-card-img>
                  </b-col>
                  <b-col align-self="center">
                    <b-card-body :title="value.name">
                      <b-button
                        type="button"
                        variant="primary"
                        @click="orderProgram(value.id)"
                      >
                        Lihat Tatanan
                        <font-awesome-icon icon="arrow-right" />
                      </b-button>
                    </b-card-body>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </div>
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
    orderProgram(id) {
      console.log(id)
      this.$router.push(`/orders/${id}`)
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
