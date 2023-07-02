<template>
  <v-container fluid>
    <v-card elevation="3">
      <v-card-title>
        <v-btn color="primary" @click="$router.go(-1)" fab small>
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-breadcrumbs :items="breadCrumbs"></v-breadcrumbs>
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
              :rules="[validation.requiredFile, validation.fileSize]"
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
          <v-dialog
            ref="registration_dialog"
            v-model="event.registrationDate.dialog"
            :return-value.sync="event.registrationDate.value"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Tanggal Pendaftaran Kegiatan"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                clearable
                @click:clear="clearRegistrationValue()"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="event.registrationDate.value"
              scrollable
              range
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="event.registrationDate.dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  $refs.registration_dialog.save(event.registrationDate.value)
                "
              >
                Terapkan
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-text-field
            label="URL Registrasi"
            v-model="event.registrationUrl"
            :rules="[validation.url]"
          ></v-text-field>
          <v-dialog
            ref="expired_dialog"
            v-model="event.expiredDate.dialog"
            :return-value.sync="event.expiredDate.value"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="event.expiredDate.value"
                label="Tanggal Kegiatan Berakhir"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                clearable
                :rules="[validation.required]"
              ></v-text-field>
            </template>
            <v-date-picker v-model="event.expiredDate.value" scrollable>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="event.expiredDate.dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.expired_dialog.save(event.expiredDate.value)"
              >
                Terapkan
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-select
            label="Ditampilkan"
            :items="event.showed.items"
            v-model="event.showed.selected"
            :rules="[validation.required]"
            clearable
          ></v-select>
        </v-form>
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
        <div v-if="eventFile.data.length == 0">Berkas Belum Diunggah</div>

        <div v-for="(item, index) in eventFile.data" :key="index">
          <v-row align="center" justify="center" class="mb-0">
            <v-col cols="12" sm="12" md="2" lg="2" class="text-center">
              <v-icon v-if="getExtension(item.file.name) === 'pdf'" size="70px">
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
                  ].includes(getExtension(item.file.name))
                "
                size="70px"
              >
                description
              </v-icon>
              <v-icon
                v-if="
                  ['jpg', 'jpeg', 'png'].includes(getExtension(item.file.name))
                "
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
                  v-if="
                    ['jpg', 'jpeg', 'png'].includes(
                      getExtension(item.file.name)
                    )
                  "
                  color="primary"
                  small
                  text
                  @click="previewEventFileImage(item.file)"
                >
                  <v-icon>search</v-icon>
                </v-btn>
                <v-btn
                  v-if="['pdf'].includes(getExtension(item.file.name))"
                  color="primary"
                  small
                  text
                  class="_df_custom"
                  :source="item.url"
                >
                  <v-icon>auto_stories</v-icon>
                </v-btn>
                <v-btn
                  color="orange lighten-2"
                  small
                  text
                  @click="getEventFile(index)"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn
                  color="red lighten-2"
                  small
                  text
                  @click="deleteEventFile(index)"
                >
                  <v-icon>delete_forever</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
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
            @submit.prevent="editEventFile(eventFile.editForm.index)"
            lazy-validation
          >
            <v-file-input
              label="Unggah Berkas"
              v-model="eventFile.editForm.file.value"
              :accept="eventFile.editForm.file.accept"
              :rules="[validation.requiredFile, validation.fileSize]"
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
            <v-btn
              class="success"
              @click="editEventFile(eventFile.editForm.index)"
              >Simpan</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>

    <div class="mt-3">
      <v-btn class="primary" @click="submitData()"> Simpan </v-btn>
    </div>

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
          href: `/dashboard/superadmin/program/${this.$route.params.idProgram}/tatanan/${this.$route.params.idTatanan}/kegiatan`,
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
        registrationDate: {
          value: [],
          dialog: false,
        },
        registrationUrl: '',
        expiredDate: {
          value: '',
          dialog: false,
        },
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
          index: null,
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
        requiredFile: (v) => !!v || 'File harus diunggah',
        fileSize: (v) => {
          return v
            ? v.size <= 5242880
              ? true
              : 'Maksimal ukuran file 5 MB'
            : true
        },
        required: (v) => !!v || 'Harus diisi',
        maxTextDefault: (v) => {
          return v ? (v.length <= 254 ? true : 'Maksimal 254 karakter') : true
        },
        url: (v) => {
          let regex =
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}/gm
          return v ? (regex.test(v) ? true : 'Format URL Salah') : true
        },
      },
    }
  },
  computed: {
    dateRangeText() {
      return this.event.registrationDate.value.join(' - ')
    },
  },
  methods: {
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
    clearRegistrationValue() {
      this.event.registrationDate.value = []
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
    addEventFile(close) {
      const validate = this.$refs.add_event_file_form.validate()

      if (validate) {
        const url = this.convertEventFileToUrl(
          this.eventFile.addForm.file.value
        )
        const payload = {
          title: this.eventFile.addForm.fileName,
          file: this.eventFile.addForm.file.value,
          url: url,
        }

        this.eventFile.data.push(payload)
      }

      if (close) {
        this.eventFile.addForm.dialog = false
        this.$refs.add_event_file_form.reset()
      }
    },
    getEventFile(index) {
      let data = this.eventFile.data[index]
      this.eventFile.editForm.fileName = data.title
      this.eventFile.editForm.file.value = data.file
      this.eventFile.editForm.index = index
      this.eventFile.editForm.dialog = true
    },
    editEventFile(index) {
      const validate = this.$refs.edit_event_file_form.validate()

      if (validate) {
        const url = this.convertEventFileToUrl(
          this.eventFile.editForm.file.value
        )
        const payload = {
          title: this.eventFile.editForm.fileName,
          file: this.eventFile.editForm.file.value,
          url: url,
        }

        this.eventFile.data[index] = payload
        this.eventFile.editForm.dialog = false
      }
    },
    deleteEventFile(value) {
      this.eventFile.data.splice(this.eventFile.data.indexOf(value), 1)
    },
    async submitData() {
      this.submitEvent()

      const validate = this.$refs.event_form.validate()

      if (validate) {
        let checkFile
        if (this.eventFile.data.length == 0) {
          checkFile = await Swal.fire({
            icon: 'question',
            titleText:
              'Berkas kegiatan belum diunggah. Apakah anda yakin ingin menyimpan data ?',
          })

          if (checkFile.isConfirmed()) {
            this.submitEvent()
          } else {
            return
          }
        } else {
          this.submitEvent()
        }
      }
    },
    async submitEvent() {
      let registrationDate = ''
      let endRegistrationDate = ''
      if (this.event.registrationDate.value.length != 0) {
        registrationDate = this.event.registrationDate.value[0]
        endRegistrationDate = this.event.registrationDate.value[1]
      }

      const payload = {
        arrangement_id: this.$route.params.idTatanan,
        title: this.event.title,
        description: this.event.description,
        registration_date: registrationDate,
        end_registration_date: endRegistrationDate,
        registration_url: this.event.registrationUrl,
        expired_date: this.event.expiredDate.value,
        showed: this.event.showed.selected,
        image: this.event.image.value,
      }

      const response = await this.$store.dispatch(
        'superadmin/event/create',
        payload
      )

      switch (response.status) {
        case 200:
          if (this.eventFile.data.length != 0) {
            let success = 0
            let error = 0
            let warning = 0
            let message = ''
            this.eventFile.data.forEach(async (item, index) => {
              let payload = {
                event_id: response.data.id,
                title: item.title,
                file: item.file,
              }

              const response2 = await this.$store.dispatch(
                'superadmin/eventFile/create',
                payload
              )

              switch (response2.status) {
                case 200:
                  success += 1
                  break

                case 400 || 401 || 403 || 404 || 422:
                  warning += 1
                  message = response2.data.message
                  break

                default:
                  error += 1
                  message = response2.data.message
                  break
              }

              if (index == this.eventFile.data.length - 1) {
                if (success > 0) {
                  return await Swal.fire({
                    icon: 'success',
                    titleText: 'Kegiatan Berhasil Disimpan',
                  })
                }

                if (error > 0) {
                  return await Swal.fire({
                    icon: 'error',
                    titleText: message,
                  })
                }

                if (warning > 0) {
                  return await Swal.fire({
                    icon: 'warning',
                    titleText: message,
                  })
                }
              }
            })
          }
          break

        default:
          await Swal.fire({
            icon: 'warning',
            titleText: message,
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
}
</script>
