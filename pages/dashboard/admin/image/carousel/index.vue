<template>
  <v-container>
    <v-data-iterator
      :items="data.data"
      :items-per-page.sync="limit"
      :page.sync="page"
      :search="search"
      :server-items-length="data.total"
      @update:items-per-page="fetchData"
      @update:page="fetchData"
      no-data-text="Data Kosong"
      no-results-text="Data Tidak Ditemukan"
      :footer-props="{ 'items-per-page-options': itemsPerPageArray }"
    >
      <template v-slot:header>
        <v-card elevation="5">
          <v-card-title>Carousel</v-card-title>
          <v-row class="mx-2 my-1">
            <v-col cols="12" sm="12" md="9" lg="9" xl="9">
              <v-text-field
                v-model="search"
                prepend-inner-icon="search"
                label="Cari"
                clearable
                outlined
                hide-details
                @keyup.enter="fetchData"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3" lg="3" xl="3">
              <v-select
                v-model="order"
                prepend-inner-icon="sort"
                label="Sortir"
                outlined
                hide-details
                :items="sort"
                @change="fetchData"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
              <v-btn color="primary" to="/dashboard/admin/image/carousel/add">
                <v-icon>add</v-icon>
                Tambah
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template v-slot:default="props">
        <v-row class="mx-2 mt-3">
          <v-col
            v-for="(item, index) in props.items"
            :key="index"
            cols="12"
            sm="12"
            md="4"
            lg="4"
            xl="4"
            class="d-flex flex-column"
          >
            <v-card class="flex d-flex flex-column" elevation="5">
              <v-img
                :src="`${serverBaseUrl()}/file/${item.image_mime}/${item.image_name}`"
                max-height="200"
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
                <v-chip v-if="item.showed" color="success"> Tampil </v-chip>

                <v-chip v-else color="error"> Tidak Tampil </v-chip>

                <div class="v-btn--absolute v-btn--right">
                  <v-btn
                    color="orange lighten-2"
                    :to="`/dashboard/admin/image/carousel/edit/${item.id}`"
                    text
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn color="red lighten-2" @click="destroy(item.id)" text>
                    <v-icon>delete_forever</v-icon>
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  layout: 'dashboard',
  middleware: ['admi'],
  title: 'Carousel',
  data() {
    return {
      itemsPerPageArray: [10, 25, 50, 75, 100],
      filter: {},
      sort: [
        {
          text: 'DESC',
          value: 'desc',
        },
        {
          text: 'ASC',
          value: 'asc',
        },
      ],
    }
  },
  computed: {
    page: {
      get() {
        return this.$store.state.admin.carousel.pagination.page
      },
      set(newValue) {
        this.$store.commit('superadmin/carousel/exportPaginationPage', newValue)
      },
    },
    limit: {
      get() {
        return this.$store.state.admin.carousel.pagination.limit
      },
      set(newValue) {
        this.$store.commit(
          'superadmin/carousel/exportPaginationLimit',
          newValue
        )
      },
    },
    order: {
      get() {
        return this.$store.state.admin.carousel.pagination.order
      },
      set(newValue) {
        this.$store.commit(
          'superadmin/carousel/exportPaginationOrder',
          newValue
        )
      },
    },
    search: {
      get() {
        return this.$store.state.admin.carousel.pagination.search
      },
      set(newValue) {
        this.$store.commit(
          'superadmin/carousel/exportPaginationSearch',
          newValue
        )
      },
    },
    data() {
      return this.$store.state.admin.carousel.pagination.data
    },
  },
  methods: {
    serverBaseUrl() {
      return process.env.serverBaseUrl
    },
    fetchData() {
      this.$fetch()
    },
    async destroy(value) {
      const notif = await Swal.fire({
        icon: 'question',
        titleText: 'Apakah Anda Yakin ?',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        cancelButtonColor: 'primary',
        confirmButtonText: 'Hapus',
        confirmButtonColor: 'red',
      })

      if (notif.isConfirmed) {
        const response = await this.$store.dispatch(
          'superadmin/carousel/destroy',
          value
        )

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Data Berhasil Dihapus',
              confirmButtonText: 'Tutup',
              confirmButtonColor: 'red',
            })

            this.$fetch()
            break

          default:
            Swal.fire({
              icon: 'error',
              title: 'Kesalahan Pada Server',
              titleText: response.data.message,
              confirmButtonText: 'Tutup',
              confirmButtonColor: 'red',
            })
            break
        }
      }
    },
  },
  async fetch() {
    await this.$store.dispatch('superadmin/carousel/pagination', {
      page: this.page,
      limit: this.limit,
      order: this.order,
      search: this.search,
    })
  },
  mounted() {
    this.fetchData()
  },
}
</script>
