<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-btn color="primary" @click="$router.go(-1)" fab>
          <v-icon>arrow_back</v-icon>
        </v-btn>
        &nbsp; Daftar Tatanan
      </v-card-title>

      <v-container>
        <v-data-iterator
          :items="arrangementData.data"
          :items-per-page.sync="limit"
          :page.sync="page"
          :server-items-length="arrangementData.total"
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
                @click="addArrangementDialog = true"
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
                <v-row>
                  <v-col cols="12" sm="12" md="4" lg="4">
                    <img
                      :src="`${serverBaseUrl()}${item.image_url}`"
                      class="v-image v-responsive"
                      data-zoomable
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="8" lg="8">
                    <v-card class="fill-height" elevation="5">
                      <v-card-title v-if="item.title != null">
                        {{ item.title }}
                      </v-card-title>

                      <v-card-title v-else> - </v-card-title>

                      <v-card-subtitle
                        v-if="item.description != null"
                        class="flex mb-8"
                      >
                        {{ item.description }}
                      </v-card-subtitle>

                      <v-card-actions style="position: absolute; bottom: 0">
                        <v-btn
                          color="primary lighten-2"
                          :to="`${item.id}`"
                          small
                          text
                        >
                          Kegiatan
                        </v-btn>
                        <v-btn
                          color="primary lighten-2"
                          :to="`/dashboard/superadmin/program/tatanan/isi/${item.id}`"
                          small
                          text
                        >
                          Isi Tatanan
                        </v-btn>
                        <v-btn
                          color="orange lighten-2"
                          @click="openEditArrangementDialog(item.id)"
                          small
                          text
                        >
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn
                          color="red lighten-2"
                          @click="destroy(item.id)"
                          small
                          text
                        >
                          <v-icon>delete_forever</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>

    <v-dialog v-model="addArrangementDialog" max-width="700px" persistent>
      <v-card>
        <v-card-title>Tambah Tatanan</v-card-title>
        <v-container>
          <v-form ref="arrangement_form" lazy-validation>
            <div class="d-flex align-center">
              <img
                v-if="arrangement_form.url != null"
                :src="arrangement_form.url"
                style="max-width: 200px"
              />
              <img
                v-else
                src="https://via.placeholder.com/1366x768?text=Unggah+Gambar"
                style="max-width: 200px"
              />
              <v-file-input
                label="Thumbnail Tatanan"
                v-model="arrangement_form.file"
                accept="image/png, image/jpeg, image/jpg"
                :rules="[validation.requiredFile, validation.imageSize]"
                @change="previewArrangementImage"
                show-size
              ></v-file-input>
            </div>
            <v-text-field
              label="Nama Tatanan"
              v-model="arrangement_form.title"
              :rules="[validation.required, validation.maxTextDefault]"
            ></v-text-field>
            <v-textarea
              label="Deskripsi Singkat Tatanan"
              v-model="arrangement_form.description"
            ></v-textarea>

            <v-btn
              type="submit"
              color="primary"
              @click.prevent="addArrangement()"
              >Simpan</v-btn
            >
            <v-btn type="button" @click="closeArrangementDialog()"
              >Kembali</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editArrangementDialog" max-width="700px" persistent>
      <v-card>
        <v-card-title>Ubah Tatanan</v-card-title>
        <v-container>
          <v-form ref="arrangement_form" lazy-validation>
            <div class="d-flex align-center">
              <img
                v-if="arrangement_form.url != null"
                :src="arrangement_form.url"
                style="max-width: 200px"
              />
              <img
                v-else
                src="https://via.placeholder.com/1366x768?text=Unggah+Gambar"
                style="max-width: 200px"
              />
              <v-file-input
                label="Thumbnail Tatanan"
                v-model="arrangement_form.file"
                accept="image/png, image/jpeg, image/jpg"
                :rules="[validation.imageSize]"
                @change="previewArrangementImage"
                show-size
              ></v-file-input>
            </div>
            <v-text-field
              label="Nama Tatanan"
              v-model="arrangement_form.title"
              :rules="[validation.required, validation.maxTextDefault]"
            ></v-text-field>
            <v-textarea
              label="Deskripsi Singkat Tatanan"
              v-model="arrangement_form.description"
            ></v-textarea>

            <v-btn
              type="submit"
              color="primary"
              @click.prevent="editArrangement()"
              >Simpan</v-btn
            >
            <v-btn type="button" @click="closeArrangementDialog()"
              >Kembali</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import mediumZoom from 'medium-zoom'

export default {
  layout: 'dashboard',
  head() {
    return {
      title: 'Daftar Tatanan - <Nama Program>',
    }
  },
  data() {
    return {
      arrangement_form: {
        id: null,
        title: '',
        description: '',
        file: null,
        url: null,
      },
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
      addArrangementDialog: false,
      editArrangementDialog: false,
      validation: {
        requiredFile: (v) => !!v || 'File harus diunggah',
        imageSize: (v) =>
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
        return this.$store.state.superadmin.arrangement.pagination.page
      },
      set(newValue) {
        this.$store.commit(
          'superadmin/arrangement/exportPaginationPage',
          newValue
        )
      },
    },
    limit: {
      get() {
        return this.$store.state.superadmin.arrangement.pagination.limit
      },
      set(newValue) {
        this.$store.commit(
          'superadmin/arrangement/exportPaginationLimit',
          newValue
        )
      },
    },
    order: {
      get() {
        return this.$store.state.superadmin.arrangement.pagination.order
      },
      set(newValue) {
        this.$store.commit(
          'superadmin/arrangement/exportPaginationOrder',
          newValue
        )
      },
    },
    arrangementData() {
      return this.$store.state.superadmin.arrangement.pagination.data
    },
  },
  methods: {
    serverBaseUrl() {
      return process.env.serverBaseUrl
    },
    fetchData() {
      this.$fetch()
    },
    previewArrangementImage() {
      if (this.arrangement_form.file != null) {
        this.arrangement_form.url = URL.createObjectURL(
          this.arrangement_form.file
        )
      } else {
        this.arrangement_form.url = null
      }
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
          'superadmin/arrangement/destroy',
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
    closeArrangementDialog() {
      this.addArrangementDialog = false
      this.editArrangementDialog = false
      this.arrangement_form.id = null
      this.arrangement_form.title = ''
      this.arrangement_form.description = ''
      this.arrangement_form.file = null
      this.arrangement_form.url = null
    },
    async addArrangement() {
      const validate = this.$refs.arrangement_form.validate()

      if (validate) {
        const response = await this.$store.dispatch(
          'superadmin/arrangement/create',
          {
            program_id: this.$route.params.id,
            title: this.arrangement_form.title,
            description: this.arrangement_form.description,
            image: this.arrangement_form.file,
          }
        )

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Data berhasil disimpan',
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

          case 500:
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
    async openEditArrangementDialog(id) {
      const response = await this.$store.dispatch(
        'superadmin/arrangement/get',
        id
      )

      switch (response.status) {
        case 200:
          this.arrangement_form.id = response.data.id
          this.arrangement_form.title = response.data.title
          this.arrangement_form.description = response.data.description
          this.arrangement_form.url = `${this.serverBaseUrl()}${
            response.data.image_url
          }`
          this.editArrangementDialog = true
          break

        case 400 || 422:
          Swal.fire({
            icon: 'warning',
            titleText: response.data.message,
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break

        case 500:
          Swal.fire({
            icon: 'error',
            titleText: response.data.message,
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break
      }
    },
    async editArrangement() {
      const validate = this.$refs.arrangement_form.validate()

      if (validate) {
        const response = await this.$store.dispatch(
          'superadmin/arrangement/edit',
          {
            id: this.arrangement_form.id,
            program_id: this.$route.params.id,
            title: this.arrangement_form.title,
            description: this.arrangement_form.description,
            image: this.arrangement_form.file,
          }
        )

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Data berhasil diubah',
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

          case 500:
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
    await this.$store.dispatch('superadmin/arrangement/pagination', {
      program_id: 1,
      page: this.page,
      limit: this.limit,
      order: this.order,
    })

    mediumZoom('[data-zoomable]')
  },
  mounted() {
    this.fetchData()
  },
}
</script>
