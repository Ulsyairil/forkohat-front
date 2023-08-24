<style lang="scss">
._df_button {
  background: none;
  border: none;
}
</style>

<template>
  <v-container fluid>
    <v-card class="mt-5">
      <v-card-title>
        <v-btn color="primary" @click="$router.go(-1)" fab>
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-breadcrumbs
          v-if="$vuetify.breakpoint.mobile"
          class="pl-0"
          :items="breadCrumbs"
        ></v-breadcrumbs>
        <v-breadcrumbs v-else :items="breadCrumbs"></v-breadcrumbs>
      </v-card-title>

      <v-container>
        <v-data-iterator
          :items="items.data"
          :items-per-page.sync="limit"
          :page.sync="page"
          :server-items-length="items.total"
          @update:items-per-page="fetchData()"
          @update:page="fetchData()"
          no-data-text="Data Kosong"
          no-results-text="Data Tidak Ditemukan"
          :footer-props="{ 'items-per-page-options': itemsPerPageArray }"
        >
          <template v-slot:header>
            <div class="d-flex flex-row flex-wrap mb-3">
              <v-btn
                type="button"
                class="mt-3 mr-4"
                color="primary"
                :to="`/dashboard/superadmin/program/${$route.params.idProgram}/tatanan/${$route.params.idTatanan}/kegiatan/add`"
              >
                <v-icon>add</v-icon>
                Buat
              </v-btn>

              <v-select
                label="Urutkan"
                style="width: 100px"
                :items="orderItems"
                v-model="order"
                @change="fetchData()"
                hide-details
                append-icon="sort"
                class="mr-sm-3 mr-md-3"
              ></v-select>

              <v-select
                label="Sampah"
                hide-details
                append-icon="trash"
                class="mt-2 mt-sm-1 mr-md-3"
                :items="trashItems"
                v-model="trash"
                @change="fetchData()"
              ></v-select>

              <v-select
                label="Perlihatkan"
                class="mt-2 mt-sm-1 mr-md-3"
                hide-details
                append-icon="visibility"
                :items="showItems"
                v-model="showed"
                @change="fetchData()"
              ></v-select>

              <v-text-field
                append-icon="mdi-magnify"
                class="mt-2 mt-sm-1 mr-md-3"
                label="Cari"
                single-line
                hide-details
                clearable
                v-model="search"
                @input.prevent="fetchData()"
              ></v-text-field>
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
                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="12" md="4" lg="4">
                      <v-img
                        :src="`${serverBaseUrl() + item.image_url}`"
                        height="200"
                        @click="
                          showImg(index, `${serverBaseUrl() + item.image_url}`)
                        "
                        style="cursor: zoom-in"
                      ></v-img>
                    </v-col>
                    <v-col cols="12" sm="12" md="8" lg="8">
                      <v-card-title v-if="item.title != null">
                        {{ item.title }}
                      </v-card-title>

                      <div>
                        <v-btn
                          color="orange lighten-2"
                          small
                          text
                          :to="`/dashboard/superadmin/program/${$route.params.idProgram}/tatanan/${$route.params.idTatanan}/kegiatan/${item.id}`"
                        >
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn
                          v-if="item.deleted_at == null"
                          color="red lighten-2"
                          @click="dump(item.id)"
                          small
                          text
                        >
                          <v-icon>delete</v-icon>
                        </v-btn>
                        <v-btn
                          v-else
                          color="primary lighten-2"
                          @click="restore(item.id)"
                          small
                          text
                        >
                          <v-icon>restore_from_trash</v-icon>
                        </v-btn>
                        <v-btn
                          v-if="item.deleted_at != null"
                          color="red lighten-2"
                          @click="destroy(item.id)"
                          small
                          text
                        >
                          <v-icon>delete_forever</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>

        <vue-easy-lightbox
          :visible="lightBox.visible"
          :imgs="lightBox.img"
          :index="lightBox.index"
          @hide="handleHideImg()"
          :moveDisabled="true"
        ></vue-easy-lightbox>
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
      title: 'Daftar Kegiatan',
    }
  },
  data() {
    return {
      breadCrumbs: [
        {
          text: 'Nama Program',
          disabled: false,
          href: '',
        },
        {
          text: 'Nama Tatanan',
          disabled: false,
          href: '',
        },
        {
          text: 'Daftar Kegiatan',
          disabled: true,
          href: '',
        },
      ],
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
      trashItems: [
        {
          text: 'Tampilkan',
          value: true,
        },
        {
          text: 'Sembunyikan',
          value: false,
        },
      ],
      showItems: [
        {
          text: 'Publik',
          value: 'public',
        },
        {
          text: 'Anggota/Member',
          value: 'member',
        },
      ],
      lightBox: {
        img: '',
        visible: false,
        index: 0,
      },
      itemsPerPageArray: [10, 25, 50, 75, 100],
      addItemDialog: false,
      editItemDialog: false,
      pdfPreviewDialog: false,
      validation: {
        requiredFile: (v) => !!v || 'File harus diunggah',
        documentSize: (v) =>
          v != null
            ? v.size <= 5242880
              ? true
              : 'Maksimal ukuran file 5 MB'
            : true,
        required: (v) => !!v || 'Harus diisi',
        maxTextDefault: (v) => v.length <= 254 || 'Maksimal 254 karakter',
      },
    }
  },
  computed: {
    page: {
      get() {
        return this.$store.state.superadmin.event.pagination.page
      },
      set(newValue) {
        this.$store.commit('superadmin/event/exportPaginationPage', newValue)
      },
    },
    limit: {
      get() {
        return this.$store.state.superadmin.event.pagination.limit
      },
      set(newValue) {
        this.$store.commit('superadmin/event/exportPaginationLimit', newValue)
      },
    },
    order: {
      get() {
        return this.$store.state.superadmin.event.pagination.order
      },
      set(newValue) {
        this.$store.commit('superadmin/event/exportPaginationOrder', newValue)
      },
    },
    trash: {
      get() {
        return this.$store.state.superadmin.event.pagination.trash
      },
      set(newValue) {
        this.$store.commit('superadmin/event/exportPaginationTrash', newValue)
      },
    },
    showed: {
      get() {
        return this.$store.state.superadmin.event.pagination.showed
      },
      set(newValue) {
        this.$store.commit('superadmin/event/exportPaginationShowed', newValue)
      },
    },
    search: {
      get() {
        return this.$store.state.superadmin.event.pagination.search
      },
      set(newValue) {
        this.$store.commit('superadmin/event/exportPaginationSearch', newValue)
      },
    },
    items() {
      return this.$store.state.superadmin.event.pagination.data
    },
  },
  methods: {
    serverBaseUrl() {
      return process.env.serverBaseUrl
    },
    fetchData() {
      this.$fetch()
    },
    showImg(index, img) {
      this.lightBox.index = index
      this.lightBox.img = img
      this.lightBox.visible = true
    },
    handleHideImg() {
      this.lightBox.visible = false
    },
    async dump(id) {
      const response = await this.$store.dispatch('superadmin/event/delete', id)

      switch (response.status) {
        case 200:
          Swal.fire({
            icon: 'success',
            titleText: 'Data berhasil disembunyikan',
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

      this.$fetch()
    },
    async restore(id) {
      const response = await this.$store.dispatch(
        'superadmin/event/restore',
        id
      )

      switch (response.status) {
        case 200:
          Swal.fire({
            icon: 'success',
            titleText: 'Data berhasil dipulihkan',
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
          'superadmin/event/destroy',
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
    await this.$store.dispatch('superadmin/event/pagination', {
      arrangement_id: Number(this.$route.params.idTatanan),
      page: this.page,
      limit: this.limit,
      order: this.order,
      trash: this.trash,
      showed: this.showed,
      search: this.search,
    })

    const responseGetProgram = await this.$store.dispatch(
      'superadmin/program/get',
      this.$route.params.idProgram
    )

    if (responseGetProgram.status == 200) {
      let data = responseGetProgram.data
      this.breadCrumbs[0].text = data.title
      this.breadCrumbs[0].href = `/dashboard/superadmin/program/${data.id}`
    }

    const responseGetArrangement = await this.$store.dispatch(
      'superadmin/arrangement/get',
      this.$route.params.idTatanan
    )

    if (responseGetArrangement.status == 200) {
      let data = responseGetArrangement.data
      this.breadCrumbs[1].text = data.title
      this.breadCrumbs[1].href = `/dashboard/superadmin/program/${data.program_id}`
    }
  },
  mounted() {
    this.fetchData()
  },
}
</script>
