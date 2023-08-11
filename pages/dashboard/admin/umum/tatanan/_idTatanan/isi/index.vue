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

        <v-breadcrumbs :items="breadCrumbs"></v-breadcrumbs>
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
            <div class="mb-5">
              <div class="d-flex flex-row flex-wrap mb-3">
                <v-btn
                  type="button"
                  class="mt-3 mr-4"
                  color="primary"
                  @click="addItemDialog = true"
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
                  class="mr-4"
                ></v-select>
                <v-select
                  label="Sampah"
                  hide-details
                  append-icon="trash"
                  class="mr-4"
                  :items="trashItems"
                  v-model="trash"
                  @change="fetchData()"
                ></v-select>
                <v-select
                  label="Perlihatkan"
                  hide-details
                  append-icon="visibility"
                  :items="showItems"
                  v-model="showed"
                  @change="fetchData()"
                ></v-select>
              </div>
              <v-text-field
                append-icon="mdi-magnify"
                label="Cari"
                single-line
                hide-details
                clearable
                v-model="search"
                @input="fetchData()"
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
                      color="lighten-2"
                      small
                      text
                      class="_df_button"
                      :source="`${serverBaseUrl()}${item.file_url}`"
                    >
                      <v-icon>auto_stories</v-icon>
                    </v-btn>
                    <v-btn
                      color="orange lighten-2"
                      @click="openEditItemDialog(item.id)"
                      small
                      text
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
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>

    <v-dialog v-model="addItemDialog" max-width="700px" persistent>
      <v-card>
        <v-card-title>Tambah Dokumen</v-card-title>
        <v-container>
          <v-form ref="item_form" lazy-validation>
            <div class="d-flex align-center">
              <v-file-input
                label="Dokumen"
                v-model="item_form.file"
                accept="application/pdf"
                :rules="[validation.requiredFile, validation.documentSize]"
                @change="previewPDF()"
                show-size
              ></v-file-input>
              <v-btn
                color="lighten-2"
                small
                text
                class="_df_button"
                :source="item_form.url"
              >
                <v-icon>auto_stories</v-icon>
              </v-btn>
            </div>
            <v-text-field
              label="Nama Tatanan"
              v-model="item_form.title"
              :rules="[validation.required, validation.maxTextDefault]"
            ></v-text-field>
            <v-textarea
              label="Deskripsi Singkat Tatanan"
              v-model="item_form.description"
            ></v-textarea>
            <v-select
              label="Perlihatkan"
              v-model="item_form.showed.selected"
              :items="item_form.showed.items"
              :rules="[validation.required]"
            ></v-select>

            <v-btn type="submit" color="primary" @click.prevent="addForm()"
              >Simpan</v-btn
            >
            <v-btn type="button" @click="closeArrangementDialog()"
              >Kembali</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editItemDialog" max-width="700px" persistent>
      <v-card>
        <v-card-title>Ubah Dokumen</v-card-title>
        <v-container>
          <v-form ref="item_form" lazy-validation>
            <div class="d-flex align-center">
              <v-file-input
                label="Thumbnail Tatanan"
                v-model="item_form.file"
                accept="application/pdf"
                :rules="[validation.documentSize]"
                @change="previewPDF()"
                @click:clear="resetPDF()"
                show-size
              ></v-file-input>
              <v-btn
                color="lighten-2"
                small
                text
                class="_df_button"
                :source="item_form.url"
              >
                <v-icon>auto_stories</v-icon>
              </v-btn>
            </div>
            <v-text-field
              label="Nama Tatanan"
              v-model="item_form.title"
              :rules="[validation.required, validation.maxTextDefault]"
            ></v-text-field>
            <v-textarea
              label="Deskripsi Singkat Tatanan"
              v-model="item_form.description"
            ></v-textarea>
            <v-select
              label="Perlihatkan"
              v-model="item_form.showed.selected"
              :items="item_form.showed.items"
              :rules="[validation.required]"
            ></v-select>

            <div>
              <i
                >Catatan: Tidak perlu unggah dokumen lagi apabila tidak ingin
                diganti</i
              >
            </div>

            <v-btn type="submit" color="primary" @click.prevent="editForm()"
              >Simpan</v-btn
            >
            <v-btn type="button" @click="closeArrangementDialog()"
              >Kembali</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="pdfPreviewDialog" persistent>
      <div id="flipbookContainer"></div>
    </v-dialog>
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
      titlePage: 'Daftar Isi Tatanan',
      breadCrumbs: [
        {
          text: '',
          disabled: false,
          href: '',
        },
        {
          text: 'Daftar Isi Tatanan',
          disabled: true,
          href: '',
        },
      ],
      item_form: {
        id: null,
        title: '',
        description: '',
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
              text: 'Pribadi/Privat',
              value: 'private',
            },
          ],
        },
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
        {
          text: 'Pribadi',
          value: 'private',
        },
      ],
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
        return this.$store.state.admin.arrangementItem.pagination.page
      },
      set(newValue) {
        this.$store.commit(
          'admin/arrangementItem/exportPaginationPage',
          newValue
        )
      },
    },
    limit: {
      get() {
        return this.$store.state.admin.arrangementItem.pagination.limit
      },
      set(newValue) {
        this.$store.commit(
          'admin/arrangementItem/exportPaginationLimit',
          newValue
        )
      },
    },
    order: {
      get() {
        return this.$store.state.admin.arrangementItem.pagination.order
      },
      set(newValue) {
        this.$store.commit(
          'admin/arrangementItem/exportPaginationOrder',
          newValue
        )
      },
    },
    trash: {
      get() {
        return this.$store.state.admin.arrangementItem.pagination.trash
      },
      set(newValue) {
        this.$store.commit(
          'admin/arrangementItem/exportPaginationTrash',
          newValue
        )
      },
    },
    showed: {
      get() {
        return this.$store.state.admin.arrangementItem.pagination.showed
      },
      set(newValue) {
        this.$store.commit(
          'admin/arrangementItem/exportPaginationShowed',
          newValue
        )
      },
    },
    search: {
      get() {
        return this.$store.state.admin.arrangementItem.pagination.search
      },
      set(newValue) {
        this.$store.commit(
          'admin/arrangementItem/exportPaginationSearch',
          newValue
        )
      },
    },
    items() {
      return this.$store.state.admin.arrangementItem.pagination.data
    },
  },
  methods: {
    serverBaseUrl() {
      return process.env.serverBaseUrl
    },
    fetchData() {
      this.$fetch()
    },
    previewPDF() {
      if (this.item_form.file != null) {
        this.item_form.url = URL.createObjectURL(this.item_form.file)
      } else {
        this.item_form.url = null
      }
    },
    async resetPDF() {
      const response = await this.$store.dispatch(
        'admin/arrangementItem/get',
        this.item_form.id
      )

      switch (response.status) {
        case 200:
          this.item_form.title = response.data.title
          this.item_form.description = response.data.description
          this.item_form.url = `${this.serverBaseUrl()}${
            response.data.file_url
          }`
          this.item_form.showed.selected = response.data.showed
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
    async dump(id) {
      const response = await this.$store.dispatch(
        'admin/arrangementItem/delete',
        id
      )

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
        'admin/arrangementItem/restore',
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
          'admin/arrangementItem/destroy',
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
      this.addItemDialog = false
      this.editItemDialog = false
      this.item_form.id = null
      this.item_form.title = ''
      this.item_form.description = ''
      this.item_form.file = null
      this.item_form.url = null
    },
    async addForm() {
      const validate = this.$refs.item_form.validate()

      if (validate) {
        const response = await this.$store.dispatch(
          'admin/arrangementItem/create',
          {
            arrangement_id: this.$route.params.idTatanan,
            title: this.item_form.title,
            description: this.item_form.description,
            file: this.item_form.file,
            showed: this.item_form.showed.selected,
          }
        )

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Data berhasil simpan',
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
    async openEditItemDialog(id) {
      const response = await this.$store.dispatch(
        'admin/arrangementItem/get',
        id
      )

      switch (response.status) {
        case 200:
          this.item_form.id = response.data.id
          this.item_form.title = response.data.title
          this.item_form.description = response.data.description
          this.item_form.url = `${this.serverBaseUrl()}${
            response.data.file_url
          }`
          this.item_form.showed.selected = response.data.showed
          this.editItemDialog = true
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
    async editForm() {
      const validate = this.$refs.item_form.validate()

      if (validate) {
        const response = await this.$store.dispatch(
          'admin/arrangementItem/edit',
          {
            id: this.item_form.id,
            arrangement_id: this.$route.params.idTatanan,
            title: this.item_form.title,
            description: this.item_form.description,
            file: this.item_form.file,
            showed: this.item_form.showed.selected,
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
    await this.$store.dispatch('admin/arrangementItem/pagination', {
      arrangement_id: this.$route.params.idTatanan,
      page: this.page,
      limit: this.limit,
      order: this.order,
      trash: this.trash,
      showed: this.showed,
      search: this.search,
    })

    const responseArrangement = await this.$store.dispatch(
      'admin/arrangement/get',
      this.$route.params.idTatanan
    )

    console.log(responseArrangement)

    switch (responseArrangement.status) {
      case 200:
        let data = responseArrangement.data

        this.breadCrumbs[0].disabled = true
        this.breadCrumbs[0].text = data.title
        break

      case 404:
        this.$nuxt.error({ statusCode: 404 })
        break

      default:
        this.$nuxt.error({ statusCode: response.status })
        break
    }
  },
  mounted() {
    this.fetchData()
  },
}
</script>
