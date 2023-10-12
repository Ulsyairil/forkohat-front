<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-btn color="primary" @click="$router.go(-1)" fab>
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <h2 class="ml-3">Daftar Galeri</h2>
      </v-card-title>

      <v-container>
        <v-data-iterator
          :items="galleryData.data"
          :items-per-page.sync="limit"
          :page.sync="page"
          :server-items-length="galleryData.total"
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
                @click="addGalleryDialog = true"
              >
                <v-icon>add</v-icon>
                Buat
              </v-btn>
              <v-select
                label="Tampil"
                :items="showedItems"
                v-model="showed"
                @change="fetchData()"
                hide-details
                append-icon="group_2"
                class="mr-2"
              ></v-select>
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
                    v-if="item.image_url"
                    :src="`${serverBaseUrl()}${item.image_url}`"
                    class="v-image v-responsive"
                    @click="showImg(0, `${serverBaseUrl()}${item.image_url}`)"
                  />

                  <div style="position: absolute; top: 0" class="mt-3 ml-3">
                    <v-chip color="white" label>
                      {{ item.title }}
                    </v-chip>
                  </div>

                  <v-card-actions style="position: absolute; bottom: 0">
                    <v-btn
                      color="orange lighten-2"
                      @click="openeditGalleryDialog(index)"
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
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>

    <v-dialog v-model="addGalleryDialog" max-width="700px" persistent>
      <v-card>
        <v-card-title>Tambah Galeri</v-card-title>
        <v-container>
          <v-form ref="gallery_form" lazy-validation>
            <div class="d-flex align-center">
              <img
                v-if="gallery_form.url != null"
                :src="gallery_form.url"
                style="max-width: 200px"
                @click="showImg(0, gallery_form.url)"
              />
              <img
                v-else
                src="https://via.placeholder.com/1366x768?text=Unggah+Gambar"
                style="max-width: 200px"
              />
              <v-file-input
                label="Thumbnail Galeri"
                v-model="gallery_form.file"
                accept="image/png, image/jpeg, image/jpg"
                :rules="[validation.requiredFile, validation.imageSize]"
                @change="previewGalleryImage"
                show-size
              ></v-file-input>
            </div>
            <v-text-field
              label="Judul Gambar"
              v-model="gallery_form.title"
              :rules="[validation.required, validation.maxTextDefault]"
            ></v-text-field>
            <v-select
              label="Tampilkan"
              v-model="gallery_form.showed.selected"
              :items="gallery_form.showed.items"
              :rules="[validation.required]"
            ></v-select>

            <v-btn type="submit" color="primary" @click.prevent="addGallery()"
              >Simpan</v-btn
            >
            <v-btn type="button" @click="closeGalleryDialog()">Kembali</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editGalleryDialog" max-width="700px" persistent>
      <v-card>
        <v-card-title>Ubah Galeri</v-card-title>
        <v-container>
          <v-form ref="gallery_form" lazy-validation>
            <div class="d-flex align-center">
              <img
                v-if="gallery_form.url != null"
                :src="gallery_form.url"
                style="max-width: 200px"
                @click="showImg(0, gallery_form.url)"
              />
              <img
                v-else
                src="https://via.placeholder.com/1366x768?text=Unggah+Gambar"
                style="max-width: 200px"
              />
              <v-file-input
                label="Thumbnail Galeri"
                v-model="gallery_form.file"
                accept="image/png, image/jpeg, image/jpg"
                :rules="[validation.imageSize]"
                @change="previewGalleryImage"
                show-size
              ></v-file-input>
            </div>
            <v-text-field
              label="Judul Gambar"
              v-model="gallery_form.title"
              :rules="[validation.required, validation.maxTextDefault]"
            ></v-text-field>
            <v-select
              label="Tampilkan"
              v-model="gallery_form.showed.selected"
              :items="gallery_form.showed.items"
              :rules="[validation.required]"
            ></v-select>

            <v-btn type="submit" color="primary" @click.prevent="editGallery()"
              >Simpan</v-btn
            >
            <v-btn type="button" @click="closeGalleryDialog()">Kembali</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <vue-easy-lightbox
      :visible="lightBox.visible"
      :imgs="lightBox.img"
      :index="lightBox.index"
      @hide="handleHideImg()"
      :moveDisabled="true"
    ></vue-easy-lightbox>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  layout: 'dashboard',
  head() {
    return {
      title: this.titlePage,
    }
  },
  data() {
    return {
      titlePage: 'Daftar Galeri',
      gallery_form: {
        id: null,
        title: '',
        file: null,
        url: null,
        showed: {
          selected: '',
          items: [
            {
              text: 'Publik',
              value: 'public',
            },
            {
              text: 'Member/Anggota',
              value: 'member',
            },
            {
              text: 'Privat',
              value: 'private',
            },
          ],
        },
      },
      showedItems: [
        {
          text: 'Publik',
          value: 'public',
        },
        {
          text: 'Member/Anggota',
          value: 'member',
        },
        {
          text: 'Privat',
          value: 'private',
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
      itemsPerPageArray: [10, 25, 50, 75, 100],
      addGalleryDialog: false,
      editGalleryDialog: false,
      lightBox: {
        index: 0,
        img: '',
        visible: false,
      },
      validation: {
        requiredFile: (v) => !!v || 'Gambar harus diunggah',
        imageSize: (v) => {
          if (v) {
            if (v.size > 5242880) {
              return 'Maksimal ukuran file 5 MB'
            }
          }

          return true
        },
        required: (v) => !!v || 'Harus diisi',
        maxTextDefault: (v) => v.length <= 254 || 'Maksimal 254 karakter',
      },
    }
  },
  computed: {
    page: {
      get() {
        return this.$store.state.admin.gallery.pagination.page
      },
      set(newValue) {
        this.$store.commit('superadmin/gallery/exportPaginationPage', newValue)
      },
    },
    limit: {
      get() {
        return this.$store.state.admin.gallery.pagination.limit
      },
      set(newValue) {
        this.$store.commit('superadmin/gallery/exportPaginationLimit', newValue)
      },
    },
    order: {
      get() {
        return this.$store.state.admin.gallery.pagination.order
      },
      set(newValue) {
        this.$store.commit('superadmin/gallery/exportPaginationOrder', newValue)
      },
    },
    showed: {
      get() {
        return this.$store.state.admin.gallery.pagination.showed
      },
      set(newValue) {
        this.$store.commit(
          'superadmin/gallery/exportPaginationShowed',
          newValue
        )
      },
    },
    galleryData() {
      return this.$store.state.admin.gallery.pagination.data
    },
  },
  methods: {
    serverBaseUrl() {
      return process.env.serverBaseUrl
    },
    fetchData() {
      this.$fetch()
    },
    previewGalleryImage() {
      if (this.gallery_form.file != null) {
        this.gallery_form.url = URL.createObjectURL(this.gallery_form.file)
      } else {
        this.gallery_form.url = null
      }
    },
    showImg(index = Number, img = String) {
      this.lightBox.index = index
      this.lightBox.img = img
      this.lightBox.visible = true
    },
    handleHideImg() {
      this.lightBox.visible = false
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
          'superadmin/gallery/destroy',
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
    closeGalleryDialog() {
      this.addGalleryDialog = false
      this.editGalleryDialog = false
      this.gallery_form.id = null
      this.gallery_form.title = ''
      this.gallery_form.file = null
      this.gallery_form.url = null
      this.gallery_form.showed.selected = ''
    },
    async addGallery() {
      const validate = this.$refs.gallery_form.validate()

      if (validate) {
        const response = await this.$store.dispatch(
          'superadmin/gallery/create',
          {
            title: this.gallery_form.title,
            image: this.gallery_form.file,
            showed: this.gallery_form.showed.selected,
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
    async openeditGalleryDialog(index) {
      console.log(this.galleryData.data[index])
      let data = this.galleryData.data[index]

      this.gallery_form.id = data.id
      this.gallery_form.title = data.title
      this.gallery_form.showed.selected = data.showed
      this.gallery_form.url = this.serverBaseUrl() + data.image_url

      this.editGalleryDialog = true
    },
    async editGallery() {
      const validate = this.$refs.gallery_form.validate()

      if (validate) {
        const response = await this.$store.dispatch('superadmin/gallery/edit', {
          id: this.gallery_form.id,
          title: this.gallery_form.title,
          image: this.gallery_form.file,
          showed: this.gallery_form.showed.selected,
        })

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
    await this.$store.dispatch('superadmin/gallery/pagination', {
      page: this.page,
      limit: this.limit,
      order: this.order,
      showed: this.showed,
    })
  },
  mounted() {
    this.fetchData()
  },
}
</script>
