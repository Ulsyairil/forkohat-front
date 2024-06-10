<template>
  <v-container fluid>
    <v-card elevation="3">
      <v-card-title>
        <v-btn color="primary" @click="$router.go(-1)" fab small>
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
        <v-form ref="event_form" lazy-validation>
          <div class="d-flex align-center">
            <v-img
              v-if="event.image.url != null"
              :src="event.image.url"
              @click="showImg(0, event.image.url)"
              max-width="200"
              style="cursor: zoom-in"
            />
            <v-img
              v-else-if="event.image.preview != null"
              :src="event.image.preview"
              @click="showImg(0, event.image.preview)"
              max-width="200"
              style="cursor: zoom-in"
            />
            <v-img
              v-else
              :src="event.image.default"
              @click="showImg(0, event.image.default)"
              max-width="200"
              style="cursor: zoom-in"
            />
            <v-file-input
              label="Thumbnail Kegiatan *"
              v-model="event.image.value"
              :accept="event.image.accept"
              :rules="[validation.fileSize]"
              @change="previewEventImage()"
              show-size
            ></v-file-input>
          </div>
          <v-text-field
            label="Judul Kegiatan *"
            v-model="event.title"
            :rules="[validation.required, validation.maxTextDefault]"
          ></v-text-field>
          <v-textarea
            label="Deskripsi Kegiatan *"
            v-model="event.description"
            :rules="[validation.required]"
          ></v-textarea>

          <v-row align="center">
            <v-col cols="12" md="5" lg="5">
              <DashboardDateTimePicker
                label="Tanggal Pendaftaran Kegiatan"
                v-model="event.registrationDate"
                @clearClicked="registrationDateClear()"
              />
            </v-col>
            <v-col cols="12" md="1" lg="1">s/d</v-col>
            <v-col cols="12" md="5" lg="5">
              <DashboardDateTimePicker
                label="Tanggal Akhir Pendaftaran Kegiatan"
                v-model="event.endRegistrationDate"
                :min="event.registrationDate"
                :disabled="event.registrationDate == '' ? true : false"
                :rules="
                  event.registrationDate != '' ? [validation.required] : []
                "
              />
            </v-col>
          </v-row>

          <v-text-field
            label="URL Registrasi"
            v-model="event.registrationUrl"
            :rules="[validation.url]"
          ></v-text-field>

          <DashboardDateTimePicker
            label="Tanggal Kegiatan Berakhir"
            v-model="event.expiredDate"
          />

          <v-select
            label="Ditampilkan"
            :items="event.showed.items"
            v-model="event.showed.selected"
            :rules="[validation.required]"
            clearable
          ></v-select>
        </v-form>

        <v-btn class="primary" @click="submitData()"> Simpan </v-btn>
      </v-container>
    </v-card>

    <v-card class="mt-5">
      <v-card-title> Berkas (Opsional) </v-card-title>

      <v-container>
        <v-dialog v-model="eventFile.addForm.dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
              Tambah Berkas
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Tambah Berkas</span>
            </v-card-title>

            <v-container>
              <v-form
                ref="add_event_file_form"
                lazy-validation
                @submit.prevent="addEventFile(true)"
              >
                <v-file-input
                  label="Unggah Berkas"
                  v-model="eventFile.addForm.file.value"
                  :accept="eventFile.addForm.file.accept"
                  :rules="[validation.requiredFile, validation.fileSize]"
                  show-size
                ></v-file-input>
                <v-text-field
                  label="Nama Berkas"
                  v-model="eventFile.addForm.fileName"
                  :rules="[validation.required, validation.maxTextDefault]"
                ></v-text-field>
              </v-form>

              <div class="mt-2">
                <v-btn class="primary" @click="eventFile.addForm.dialog = false"
                  >Batal</v-btn
                >
                <v-btn class="success" @click="addEventFile(true)"
                  >Simpan</v-btn
                >
                <v-btn class="success" @click="addEventFile(false)"
                  >Simpan & Tambah Lagi</v-btn
                >
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </v-container>

      <v-container>
        <v-data-iterator
          :items="eventFileData.data"
          :items-per-page.sync="limit"
          :page.sync="page"
          :server-items-length="eventFileData.total"
          @update:items-per-page="$fetch()"
          @update:page="$fetch()"
          no-data-text="Data Kosong"
          no-results-text="Data Tidak Ditemukan"
        >
          <template v-slot:default="props">
            <div v-for="(item, index) in props.items" :key="index">
              <v-row align="center" justify="center" class="mb-0">
                <v-col cols="12" sm="12" md="2" lg="2" class="text-center">
                  <v-icon v-if="item.mime === 'pdf'" size="70px">
                    picture_as_pdf
                  </v-icon>
                  <v-icon
                    v-if="
                      [
                        'doc',
                        'docs',
                        'xls',
                        'xlsx',
                        'ppt',
                        'pptx',
                        'odt',
                        'ods',
                        'odp',
                      ].includes(item.mime)
                    "
                    size="70px"
                  >
                    description
                  </v-icon>
                  <v-icon
                    v-if="['jpg', 'jpeg', 'png'].includes(item.mime)"
                    size="70px"
                  >
                    image
                  </v-icon>
                </v-col>
                <v-col cols="12" sm="12" md="10" lg="10">
                  <v-card-title>
                    {{ item.title }}
                  </v-card-title>

                  <div>
                    <v-btn
                      v-if="['jpg', 'jpeg', 'png'].includes(item.mime)"
                      color="primary"
                      @click="showImg(0, `${serverBaseUrl()}/file/${item.mime}/${item.name}`)"
                      small
                      text
                    >
                      <v-icon>search</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="['pdf'].includes(item.mime)"
                      color="primary"
                      small
                      text
                      class="_df_custom"
                      :source="`${serverBaseUrl()}/file/${item.mime}/${item.name}`"
                    >
                      <v-icon>auto_stories</v-icon>
                    </v-btn>
                    <v-btn
                      color="orange lighten-2"
                      @click="getEventFile(item.id)"
                      small
                      text
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      color="red lighten-2"
                      @click="deleteEventFile(item.id)"
                      small
                      text
                    >
                      <v-icon>delete_forever</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </div>
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>

    <v-dialog v-model="eventFile.editForm.dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Ubah Berkas</span>
        </v-card-title>

        <v-container>
          <v-form
            ref="edit_event_file_form"
            @submit.prevent="editEventFile(eventFile.editForm.id)"
            lazy-validation
          >
            <v-file-input
              label="Unggah Berkas"
              v-model="eventFile.editForm.file.value"
              :accept="eventFile.editForm.file.accept"
              :rules="[validation.fileSize]"
              show-size
            ></v-file-input>
            <v-text-field
              label="Nama Berkas"
              v-model="eventFile.editForm.fileName"
              :rules="[validation.required, validation.maxTextDefault]"
            ></v-text-field>
          </v-form>

          <div class="mt-2">
            <v-btn class="primary" @click="eventFile.editForm.dialog = false"
              >Batal</v-btn
            >
            <v-btn class="success" @click="editEventFile(eventFile.editForm.id)"
              >Simpan</v-btn
            >
          </div>
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
      title: 'Tambah Kegiatan',
    }
  },
  data() {
    return {
      titlePage: null,
      breadCrumbs: [
        {
          text: '',
          disabled: false,
          href: '',
        },
        {
          text: '',
          disabled: false,
          href: '',
        },
        {
          text: 'Daftar Kegiatan',
          disabled: false,
          href: `/dashboard/admin/program/${this.$route.params.idProgram}/tatanan/${this.$route.params.idTatanan}/kegiatan`,
        },
        {
          text: 'Tambah Kegiatan',
          disabled: true,
          href: '',
        },
      ],
      event: {
        title: '',
        description: '',
        registrationDate: '',
        endRegistrationDate: '',
        registrationUrl: '',
        expiredDate: '',
        showed: {
          selected: '',
          items: [
            {
              text: 'Member/Anggota',
              value: 'member',
            },
            {
              text: 'Publik',
              value: 'public',
            },
          ],
        },
        image: {
          default: 'https://via.placeholder.com/1024?text=Unggah+Gambar',
          url: null,
          preview: null,
          value: null,
          accept: 'image/png, image/jpeg, image/jpg',
        },
      },
      eventFile: {
        data: [],
        addForm: {
          dialog: false,
          file: {
            value: null,
            accept:
              '.doc, .docs, .xls, .xlsx, .ppt, .pptx, .odt, .ods, .odp, ,.pdf, .jpg, .jpeg, .png',
          },
          fileName: '',
        },
        editForm: {
          dialog: false,
          id: null,
          file: {
            value: null,
            accept:
              '.doc, .docs, .xls, .xlsx, .ppt, .pptx, .odt, .ods, .odp, ,.pdf, .jpg, .jpeg, .png',
          },
          fileName: '',
        },
      },
      lightBox: {
        index: 0,
        img: '',
        visible: false,
      },
      validation: {
        requiredFile: (v) => {
          if (!v) {
            return 'File harus diunggah'
          }

          return true
        },
        fileSize: (v) => {
          if (v) {
            if (v.size > 5242880) {
              return 'Maksimal ukuran file 5 MB'
            }
          }

          return true
        },
        required: (v) => {
          if (!v) {
            return 'Harus diisi'
          }

          return true
        },
        maxTextDefault: (v) => {
          if (v) {
            if (v.length > 254) {
              return 'Maksimal 254 karakter'
            }
          }

          return true
        },
        url: (v) => {
          let regex =
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}/gm

          if (v) {
            if (!regex.test(v)) {
              return 'Format URL Salah'
            }
          }

          return true
        },
      },
    }
  },
  computed: {
    eventId: {
      get() {
        return this.$store.state.admin.eventFile.pagination.event_id
      },
      set(newValue) {
        this.$store.commit(
          'superadmin/eventFile/exportPaginationEventId',
          newValue
        )
      },
    },
    page: {
      get() {
        return this.$store.state.admin.eventFile.pagination.page
      },
      set(newValue) {
        this.$store.commit(
          'superadmin/eventFile/exportPaginationPage',
          newValue
        )
      },
    },
    limit: {
      get() {
        return this.$store.state.admin.eventFile.pagination.limit
      },
      set(newValue) {
        this.$store.commit(
          'superadmin/eventFile/exportPaginationLimit',
          newValue
        )
      },
    },
    order: {
      get() {
        return this.$store.state.admin.eventFile.pagination.order
      },
      set(newValue) {
        this.$store.commit(
          'superadmin/eventFile/exportPaginationOrder',
          newValue
        )
      },
    },
    eventFileData() {
      return this.$store.state.admin.eventFile.pagination.data
    },
  },
  methods: {
    registrationDateClear() {
      this.event.registrationDate = ''
      this.event.endRegistrationDate = ''
      console.log(this.event)
    },
    serverBaseUrl() {
      return process.env.serverBaseUrl
    },
    previewEventImage() {
      if (this.event.image.value != null) {
        this.event.image.url = URL.createObjectURL(this.event.image.value)
      } else {
        this.event.image.url = null
      }
    },
    previewEventFileImage(file) {
      let url = URL.createObjectURL(file)
      this.showImg(0, url)
    },
    convertEventFileToUrl(file) {
      let url = URL.createObjectURL(file)
      return url
    },
    showImg(index = Number, img = String) {
      this.lightBox.index = index
      this.lightBox.img = img
      this.lightBox.visible = true
    },
    handleHideImg() {
      this.lightBox.visible = false
    },
    getExtension(filename) {
      const re = /(?:\.([^.]+))?$/
      let ext = re.exec(filename)[1]
      return ext
    },
    async addEventFile(dialog) {
      const validate = this.$refs.add_event_file_form.validate()

      if (validate) {
        const payload = {
          event_id: this.$route.params.idEvent,
          title: this.eventFile.addForm.fileName,
          file: this.eventFile.addForm.file.value,
        }

        const response = await this.$store.dispatch(
          'superadmin/eventFile/create',
          payload
        )

        console.log(response)

        switch (response.status) {
          case 200:
            this.$fetch()
            Swal.fire({
              icon: 'success',
              titleText: 'Berkas berhasil disimpan',
            })
            break

          default:
            Swal.fire({
              icon: 'error',
              titleText: response.data.message,
            })
            break
        }
      }

      if (dialog) {
        this.eventFile.addForm.dialog = false
        this.$refs.add_event_file_form.reset()
      }
    },
    async getEventFile(id) {
      const response = await this.$store.dispatch(
        'superadmin/eventFile/get',
        id
      )

      switch (response.status) {
        case 200:
          let data = response.data
          this.eventFile.editForm.id = data.id
          this.eventFile.editForm.fileName = data.title
          this.eventFile.editForm.dialog = true
          break

        default:
          Swal.fire({
            icon: 'error',
            titleText: response.data.message,
          })
          break
      }
    },
    async editEventFile(id) {
      const validate = this.$refs.edit_event_file_form.validate()

      if (validate) {
        let payload = {
          id: id,
          event_id: this.$route.params.idEvent,
          title: this.eventFile.editForm.fileName,
        }

        if (this.eventFile.editForm.file.value) {
          payload.file = this.eventFile.editForm.file.value
        }

        const response = await this.$store.dispatch(
          'superadmin/eventFile/edit',
          payload
        )

        switch (response.status) {
          case 200:
            this.eventFile.editForm.dialog = false
            this.$fetch()
            Swal.fire({
              icon: 'success',
              titleText: 'Berkas berhasil diubah',
            })
            break

          default:
            Swal.fire({
              icon: 'error',
              titleText: response.data.message,
            })
            break
        }
      }
    },
    async deleteEventFile(id) {
      const notif = await Swal.fire({
        icon: 'question',
        titleText: 'Apakah anda yakin ?',
        confirmButtonText: 'Hapus!',
        confirmButtonColor: 'success',
        showCancelButton: true,
        cancelButtonText: 'Batal',
      })

      if (notif.isConfirmed) {
        const response = await this.$store.dispatch(
          'superadmin/eventFile/destroy',
          id
        )

        console.log(response)

        switch (response.status) {
          case 200:
            this.$fetch()

            Swal.fire({
              icon: 'success',
              titleText: 'Berkas berhasil dihapus',
            })
            break

          default:
            Swal.fire({
              icon: 'error',
              titleText: response.data.message,
            })
            break
        }
      }
    },
    async submitData() {
      const validate = this.$refs.event_form.validate()

      console.log(validate)

      if (validate) {
        this.submitEvent()
      }
    },
    async submitEvent() {
      const payload = {
        id: this.$route.params.idEvent,
        arrangement_id: this.$route.params.idTatanan,
        title: this.event.title,
        description: this.event.description,
        registration_date: this.event.registrationDate,
        end_registration_date: this.event.endRegistrationDate,
        registration_url: this.event.registrationUrl,
        expired_date: this.event.expiredDate,
        showed: this.event.showed.selected,
      }

      if (this.event.image.value) {
        payload.image = this.event.image.value
      }

      const response = await this.$store.dispatch(
        'superadmin/event/edit',
        payload
      )

      switch (response.status) {
        case 200:
          Swal.fire({
            icon: 'success',
            titleText: 'Kegiatan berhasil diubah',
          })
          break

        default:
          Swal.fire({
            icon: 'error',
            titleText: response.data.message,
          })
          break
      }
    },
  },
  async fetch() {
    const responseGetProgram = await this.$store.dispatch(
      'superadmin/program/get',
      this.$route.params.idProgram
    )

    if (responseGetProgram.status == 200) {
      let data = responseGetProgram.data
      this.breadCrumbs[0].text = data.title
      this.breadCrumbs[0].href = `/dashboard/admin/program/${data.id}`
    }

    const responseGetArrangement = await this.$store.dispatch(
      'superadmin/arrangement/get',
      this.$route.params.idTatanan
    )

    if (responseGetArrangement.status == 200) {
      let data = responseGetArrangement.data
      this.breadCrumbs[1].text = data.title
      this.breadCrumbs[1].href = `/dashboard/admin/program/${data.program_id}`
    }

    const responseGetEvent = await this.$store.dispatch(
      'superadmin/event/get',
      this.$route.params.idEvent
    )

    switch (responseGetEvent.status) {
      case 200:
        let data = responseGetEvent.data
        this.event.image.preview = this.serverBaseUrl() + "/file" + "/" + data.image_mime + "/" + data.image_name
        this.event.title = data.title
        this.event.description = data.description
        this.event.registrationUrl = data.registration_url
        this.event.expiredDate = data.expired_date
        this.event.showed.selected = data.showed

        if (data.registration_date != null) {
          this.event.registrationDate = data.registration_date
          this.event.endRegistrationDate = data.end_registration_date
        }

        this.$refs.event_form.resetValidation()
        break

      default:
        this.$nuxt.error({
          statusCode: 500,
          message: responseGetEvent.data.message,
        })
        break
    }

    await this.$store.dispatch('superadmin/eventFile/pagination', {
      event_id: Number(this.$route.params.idEvent),
      page: this.page,
      limit: this.limit,
      order: this.order,
    })
  },
}
</script>
