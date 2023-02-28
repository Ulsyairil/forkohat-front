<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Daftar Program</v-card-title>

      <v-container>
        <v-data-iterator
          :items="programData.data"
          :items-per-page.sync="limit"
          :page.sync="page"
          :server-items-length="programData.total"
          @update:items-per-page="fetchData"
          @update:page="fetchData"
          no-data-text="Data Kosong"
          no-results-text="Data Tidak Ditemukan"
          :footer-props="{ 'items-per-page-options': itemsPerPageArray }"
        >
          <template v-slot:header>
            <div class="d-flex flex-row mb-5">
              <v-btn
                type="button"
                class="mt-3 mr-4"
                color="primary"
                @click="$router.push('/dashboard/superadmin/program/add')"
              >
                <v-icon>add</v-icon>
                Buat
              </v-btn>
              <v-select
                label="Urutkan"
                :items="orderItems"
                v-model="order"
                @change="fetchData()"
                hide-details
                append-icon="sort"
              ></v-select>
            </div>
          </template>

          <template v-slot:default="props">
            <v-row align="stretch" class="mx-2 mt-3">
              <v-col
                v-for="(item, index) in props.items"
                :key="index"
                cols="12"
                sm="12"
                md="6"
                lg="6"
                xl="4"
                class="d-flex flex-column"
              >
                <v-card class="fill-height" elevation="5">
                  <v-img
                    :src="`${serverBaseUrl()}${item.image_url}`"
                    contain
                  ></v-img>

                  <v-card-title v-if="item.title != null">
                    {{ item.title }}
                  </v-card-title>

                  <v-card-title v-else> - </v-card-title>

                  <v-card-subtitle v-if="item.description != null" class="flex">
                    {{ item.description }}
                  </v-card-subtitle>

                  <v-card-subtitle class="flex" v-else> - </v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                      color="orange lighten-2"
                      :to="`/dashboard/superadmin/image/carousel/edit/${item.id}`"
                      text
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn color="red lighten-2" @click="destroy(item.id)" text>
                      <v-icon>delete_forever</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  layout: 'dashboard',
  head() {
    return {
      title: 'Daftar Program',
    }
  },
  data() {
    return {
      orderItems: [
        {
          text: 'DESC',
          value: 'desc',
        },
        {
          text: 'ASC',
          value: 'asc',
        },
      ],
      itemsPerPageArray: [10, 25, 50, 75, 100],
    }
  },
  computed: {
    page: {
      get() {
        return this.$store.state.superadmin.program.pagination.page
      },
      set(newValue) {
        this.$store.commit('superadmin/program/exportPaginationPage', newValue)
      },
    },
    limit: {
      get() {
        return this.$store.state.superadmin.program.pagination.limit
      },
      set(newValue) {
        this.$store.commit('superadmin/program/exportPaginationLimit', newValue)
      },
    },
    order: {
      get() {
        return this.$store.state.superadmin.program.pagination.order
      },
      set(newValue) {
        this.$store.commit('superadmin/program/exportPaginationOrder', newValue)
      },
    },
    programData() {
      return this.$store.state.superadmin.program.pagination.data
    },
  },
  methods: {
    serverBaseUrl() {
      return process.env.serverBaseUrl
    },
    fetchData() {
      this.$fetch()
    },
    async destroy(id) {
      const notif = await Swal.fire({
        icon: 'warning',
        titleText: 'Apakah anda yakin ?',
        confirmButtonText: 'Hapus!',
        confirmButtonColor: '#42a5f5',
        showCancelButton: true,
        cancelButtonText: 'Batal',
      })

      if (notif.isConfirmed) {
        const response = await this.$store.dispatch(
          'superadmin/program/destroy',
          id
        )

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Data berhasil dihapus',
              confirmButtonText: 'Kembali',
              confirmButtonColor: '#42a5f5',
            })
            break

          case 400 || 422:
            Swal.fire({
              icon: 'warning',
              titleText: response.data.message,
              confirmButtonText: 'Kembali',
              confirmButtonColor: '#42a5f5',
            })
            break

          default:
            Swal.fire({
              icon: 'error',
              titleText: response.data.message,
              confirmButtonText: 'Kembali',
              confirmButtonColor: '#42a5f5',
            })
            break
        }
      }

      this.$fetch()
    },
  },
  async fetch() {
    await this.$store.dispatch('superadmin/program/pagination', {
      page: this.page,
      limit: this.limit,
      order: this.order,
    })
  },
  mounted() {
    this.fetchData()
  },
}
</script>
