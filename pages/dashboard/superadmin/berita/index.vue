<template>
  <v-container fluid>
    <v-data-iterator
      :items="items.data"
      :items-per-page.sync="limit"
      :page.sync="page"
      :server-items-length="items.total"
      @update:items-per-page="fetchData()"
      @update:page="fetchData()"
      no-data-text="Data Kosong"
      no-results-text="Data Tidak Ditemukan"
      :footer-props="{
        'items-per-page-options': itemsPerPageArray,
        'items-per-page-text': 'Baris per halaman',
      }"
    >
      <template v-slot:header>
        <v-card>
          <v-card-title> Berita </v-card-title>

          <v-container>
            <div class="d-flex flex-row flex-wrap mb-3">
              <v-btn
                type="button"
                class="mt-3 mr-2"
                color="primary"
                @click="addNewsDialog = true"
              >
                <v-icon>add</v-icon>
                Tambah
              </v-btn>
              <v-select
                label="Urutkan"
                class="mr-sm-3 mr-md-3"
                style="width: 100px"
                :items="orderItems"
                v-model="order"
                @change="fetchData()"
                hide-details
                append-icon="sort"
              ></v-select>
              <v-select
                label="Sampah"
                class="mt-2 mt-sm-1 mt-md-1 mr-md-3"
                hide-details
                append-icon="trash"
                :items="trashItems"
                v-model="trash"
                @change="fetchData()"
              ></v-select>
              <v-text-field
                class="mt-2 mt-sm-1 mt-md-1"
                append-icon="mdi-magnify"
                label="Cari"
                single-line
                hide-details
                clearable
                v-model="search"
                @input="fetchData()"
              ></v-text-field>
            </div>
          </v-container>
        </v-card>
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
                    :src="`${serverBaseUrl()}/file/${item.image_mime}/${item.image_name}`"
                    height="200"
                    @click="
                      showImg(index, `${serverBaseUrl()}/file/${item.image_mime}/${item.image_name}`)
                    "
                    style="cursor: zoom-in"
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="12" md="8" lg="8">
                  <v-card-title v-if="item.title != null">
                    {{ item.title }}
                  </v-card-title>

                  <v-card-text>
                    <div>{{ item.Author.fullname }}</div>
                    <div>{{ item.created_at }}</div>
                  </v-card-text>

                  <div>
                    <v-btn
                      color="orange lighten-2"
                      small
                      text
                      :to="`/dashboard/superadmin/berita/${item.id}`"
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

    <v-dialog v-model="addNewsDialog" max-width="1000px" persistent>
      <v-card>
        <v-card-title>Tambah Berita</v-card-title>
        <v-container>
          <v-form
            ref="news_form"
            @submit.prevent="addNews(false)"
            lazy-validation
          >
            <div class="d-flex align-center">
              <img
                v-if="newsForm.file.preview != null"
                :src="newsForm.file.preview"
                style="max-width: 200px; cursor: zoom-in"
                @click="showImg(0, newsForm.file.preview)"
              />
              <img
                v-else
                :src="newsForm.file.previewBefore"
                style="max-width: 200px"
              />
              <v-file-input
                label="Thumbnail Berita"
                v-model="newsForm.file.value"
                :accept="newsForm.file.accept"
                :rules="[validation.requiredFile, validation.fileSize]"
                @change="previewImage()"
                show-size
              ></v-file-input>
            </div>

            <v-text-field
              label="Judul Berita"
              v-model="newsForm.title"
              :rules="[validation.required, validation.maxTextDefault]"
            ></v-text-field>

            <ckeditor
              class="mb-4"
              v-model="newsForm.editor.content"
              :config="newsForm.editor.config"
            ></ckeditor>

            <div>
              <v-btn
                type="submit"
                color="primary"
                @click.prevent="addNews(false)"
                >Simpan</v-btn
              >
              <v-btn
                type="submit"
                color="primary"
                @click.prevent="addNews(true)"
                >Simpan & Tambah Lagi</v-btn
              >
              <v-btn type="button" @click="closeDialog()">Kembali</v-btn>
            </div>
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
      title: 'Daftar Kegiatan',
    }
  },
  data() {
    return {
      breadCrumbs: [
        {
          text: 'Daftar Berita',
          disabled: false,
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
      lightBox: {
        img: '',
        visible: false,
        index: 0,
      },
      itemsPerPageArray: [10, 25, 50, 75, 100],
      addNewsDialog: false,
      newsForm: {
        title: '',
        editor: {
          content: '',
          config: {
            toolbarGroups: [
              { name: 'document', groups: ['mode', 'document', 'doctools'] },
              { name: 'clipboard', groups: ['clipboard', 'undo'] },
              {
                name: 'editing',
                groups: ['find', 'selection', 'spellchecker', 'editing'],
              },
              { name: 'forms', groups: ['forms'] },
              { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
              { name: 'links', groups: ['links'] },
              { name: 'insert', groups: ['insert'] },
              '/',
              {
                name: 'paragraph',
                groups: [
                  'list',
                  'indent',
                  'blocks',
                  'align',
                  'bidi',
                  'paragraph',
                ],
              },
              { name: 'styles', groups: ['styles'] },
              { name: 'colors', groups: ['colors'] },
              { name: 'tools', groups: ['tools'] },
              { name: 'others', groups: ['others'] },
              { name: 'about', groups: ['about'] },
            ],
            removeButtons:
              'Templates,Save,Source,NewPage,Preview,Print,ImageButton,HiddenField,Button,Select,Form,Checkbox,Radio,TextField,Textarea,Image,Flash,Iframe,About,ShowBlocks',
          },
        },
        file: {
          value: null,
          preview: null,
          previewBefore:
            'https://via.placeholder.com/1366x768?text=Unggah+Gambar',
          accept: 'image/png, image/jpeg, image/jpg',
        },
      },
      validation: {
        requiredFile: (v) => !!v || 'File harus diunggah',
        fileSize: (v) => {
          if (v) {
            if (v.size > 1048576) {
              return 'Maksimal ukuran file 1 MB'
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
        return this.$store.state.superadmin.news.pagination.page
      },
      set(newValue) {
        this.$store.commit('superadmin/news/exportPaginationPage', newValue)
      },
    },
    limit: {
      get() {
        return this.$store.state.superadmin.news.pagination.limit
      },
      set(newValue) {
        this.$store.commit('superadmin/news/exportPaginationLimit', newValue)
      },
    },
    order: {
      get() {
        return this.$store.state.superadmin.news.pagination.order
      },
      set(newValue) {
        this.$store.commit('superadmin/news/exportPaginationOrder', newValue)
      },
    },
    trash: {
      get() {
        return this.$store.state.superadmin.news.pagination.trash
      },
      set(newValue) {
        this.$store.commit('superadmin/news/exportPaginationTrash', newValue)
      },
    },
    search: {
      get() {
        return this.$store.state.superadmin.news.pagination.search
      },
      set(newValue) {
        this.$store.commit('superadmin/news/exportPaginationSearch', newValue)
      },
    },
    items() {
      return this.$store.state.superadmin.news.pagination.data
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
    previewImage() {
      if (this.newsForm.file.value != null) {
        this.newsForm.file.preview = URL.createObjectURL(
          this.newsForm.file.value
        )
      } else {
        this.newsForm.file.preview = null
      }
    },
    closeDialog() {
      this.addNewsDialog = false
      this.newsForm.title = ''
      this.newsForm.editor.content = ''
      this.newsForm.file.value = null
      this.newsForm.file.preview = null
      this.$refs.news_form.resetValidation()
    },
    async addNews(more) {
      const validate = this.$refs.news_form.validate()

      console.log(validate)

      if (!validate) {
        return
      }

      if (!this.newsForm.editor.content) {
        return Swal.fire({
          icon: 'warning',
          titleText: 'Tajuk berita kosong',
          confirmButtonText: 'Kembali',
          confirmButtonColor: '#42a5f5',
        })
      }

      let payload = {
        title: this.newsForm.title,
        content: this.newsForm.editor.content,
        image: this.newsForm.file.value,
      }

      const response = await this.$store.dispatch(
        'superadmin/news/create',
        payload
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

        default:
          Swal.fire({
            icon: 'error',
            titleText: response.data.message,
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break
      }

      this.fetchData()

      if (more) {
        this.newsForm.title = ''
        this.newsForm.editor.content = ''
        this.newsForm.file = null
        this.newsForm.url = null
      } else {
        this.closeDialog()
      }
    },
    async dump(id) {
      const response = await this.$store.dispatch('superadmin/news/delete', id)

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

      this.fetchData()
    },
    async restore(id) {
      const response = await this.$store.dispatch('superadmin/news/restore', id)

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

      this.fetchData()
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
          'superadmin/news/destroy',
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

      this.fetchData()
    },
  },
  async fetch() {
    await this.$store.dispatch('superadmin/news/pagination', {
      page: this.page,
      limit: this.limit,
      order: this.order,
      trash: this.trash,
      search: this.search,
    })
  },
  mounted() {
    this.fetchData()
  },
}
</script>
