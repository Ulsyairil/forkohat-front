<template>
  <v-container fluid>
    <v-card elevation="3">
      <v-card-title>
        <v-btn color="primary" @click="$router.go(-1)" fab small>
          <v-icon>arrow_back</v-icon>
        </v-btn>
        &nbsp; Tambah Program
      </v-card-title>

      <v-container>
        <v-form ref="program_form" lazy-validation>
          <div class="d-flex align-center">
            <v-img
              v-if="program.url != null"
              :src="program.url"
              max-width="200"
            />
            <v-img
              v-else
              src="https://via.placeholder.com/150?text=Unggah+Gambar"
              max-width="200"
            />
            <v-file-input
              label="Thumbnail Program"
              v-model="program.file"
              accept="image/png, image/jpeg, image/jpg"
              :rules="[validation.requiredFile, validation.imageSize]"
              @change="previewProgramImage"
              show-size
            ></v-file-input>
          </div>
          <v-text-field
            label="Nama Program"
            v-model="program.title"
            :rules="[validation.required, validation.maxTextDefault]"
          ></v-text-field>
          <v-textarea
            label="Deskripsi Singkat Program"
            v-model="program.description"
          ></v-textarea>
        </v-form>
      </v-container>
    </v-card>

    <v-card class="mt-5" elevation="3">
      <v-container>
        <v-card-title> Tatanan </v-card-title>

        <v-btn color="primary" @click="addDialog = true">
          <v-icon>add_circle</v-icon> &nbsp; Tatanan Baru
        </v-btn>

        <v-dialog v-model="addDialog" max-width="800">
          <v-card>
            <v-card-title>Tambah Tatanan</v-card-title>
            <v-container>
              <v-form ref="add_form" lazy-validation>
                <div class="d-flex align-center">
                  <v-img
                    v-if="arrangement.addForm.url != null"
                    :src="arrangement.addForm.url"
                    max-width="200"
                  />
                  <v-img
                    v-else
                    src="https://via.placeholder.com/150?text=Unggah+Gambar"
                    max-width="200"
                  />
                  <v-file-input
                    label="Thumbnail Tatanan"
                    v-model="arrangement.addForm.file"
                    accept="image/png, image/jpeg, image/jpg"
                    :rules="[validation.requiredFile, validation.imageSize]"
                    @change="previewAddArrangementImage"
                    show-size
                  ></v-file-input>
                </div>
                <v-text-field
                  label="Nama Tatanan"
                  v-model="arrangement.addForm.name"
                  :rules="[validation.required, validation.maxTextDefault]"
                ></v-text-field>
                <v-textarea
                  label="Deskripsi Singkat Tatanan"
                  v-model="arrangement.addForm.desc"
                ></v-textarea>
                <div>
                  <v-btn color="primary" @click="addDialogClosed()">
                    Kembali
                  </v-btn>
                  <v-btn color="primary" @click="addArrangement()"
                    >Simpan</v-btn
                  >
                </div>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>

        <v-data-table
          :headers="arrangement.headers"
          :items="items"
          :items-per-page="-1"
          class="elevation-3 mt-5"
        >
          <template v-slot:[`item.title`]="{ item }">
            <div class="d-flex align-center">
              <v-img
                :src="previewImageTable(item.image)"
                class="mx-3 my-3"
                max-width="150"
              ></v-img>
              <span class="justify-center">{{ item.title }}</span>
            </div>
          </template>

          <template v-slot:[`item.description`]="{ item }">
            <div style="width: 500px">
              {{ item.description }}
            </div>
          </template>

          <template v-slot:[`item.actions`]="{ item, index }">
            <v-icon class="mr-2" @click="editButtonArrangement(item, index)">
              edit
            </v-icon>
            <v-icon @click="deleteArrangement(index)"> delete_forever </v-icon>
          </template>
        </v-data-table>

        <v-dialog v-model="editDialog" max-width="800">
          <v-card>
            <v-card-title>Ubah Tatanan</v-card-title>
            <v-container>
              <v-form ref="edit_form" lazy-validation>
                <div class="d-flex align-center">
                  <v-img
                    v-if="arrangement.editForm.url != null"
                    :src="arrangement.editForm.url"
                    max-width="200"
                  />
                  <v-img
                    v-else
                    src="https://via.placeholder.com/150?text=Unggah+Gambar"
                    max-width="200"
                  />
                  <v-file-input
                    label="File input"
                    v-model="arrangement.editForm.file"
                    :rules="[validation.requiredFile, validation.imageSize]"
                    @change="previewEditArrangementImage"
                    show-size
                  ></v-file-input>
                </div>
                <v-text-field
                  label="Nama Tatanan"
                  v-model="arrangement.editForm.name"
                  :rules="[validation.required, validation.maxTextDefault]"
                ></v-text-field>
                <v-textarea
                  label="Deskripsi Singkat Tatanan"
                  v-model="arrangement.editForm.desc"
                ></v-textarea>
                <div>
                  <v-btn color="primary" @click="editDialogClosed()">
                    Batal
                  </v-btn>
                  <v-btn color="primary" @click="editArrangement()"
                    >Simpan</v-btn
                  >
                </div>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>

        <div class="mt-5">
          <v-btn color="primary" @click="formSubmit()"> Simpan </v-btn>
        </div>
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
      title: 'Tambah Program & Tatanan',
    }
  },
  data() {
    return {
      addDialog: false,
      editDialog: false,
      program: {
        title: '',
        description: '',
        file: null,
        url: null,
      },
      arrangement: {
        headers: [
          {
            text: 'Nama Program',
            align: 'start',
            sortable: false,
            value: 'title',
          },
          {
            text: 'Deskripsi Singkat',
            sortable: false,
            value: 'description',
          },
          {
            text: 'Aksi',
            sortable: false,
            value: 'actions',
          },
        ],
        items: [],
        addForm: {
          file: null,
          url: null,
          name: '',
          desc: '',
        },
        editForm: {
          index: null,
          file: null,
          url: null,
          name: '',
          desc: '',
        },
      },
      validation: {
        requiredFile: (v) => !!v || 'File harus diunggah',
        imageSize: (v) =>
          (v && v.size <= 5242880) || 'Maksimal ukuran file 5 MB',
        required: (v) => !!v || 'Harus diisi',
        maxTextDefault: (v) =>
          (v && v.length <= 254) || 'Maksimal 254 karakter',
      },
    }
  },
  computed: {
    items() {
      return this.arrangement.items
    },
  },
  methods: {
    previewImageTable(file) {
      let url = URL.createObjectURL(file)
      return url
    },
    previewProgramImage() {
      if (this.program.file != null) {
        this.program.url = URL.createObjectURL(this.program.file)
      } else {
        this.program.url = null
      }
    },
    previewAddArrangementImage() {
      if (this.arrangement.addForm.file != null) {
        this.arrangement.addForm.url = URL.createObjectURL(
          this.arrangement.addForm.file
        )
      } else {
        this.arrangement.addForm.url = null
      }
    },
    previewEditArrangementImage() {
      if (this.arrangement.editForm.file != null) {
        this.arrangement.editForm.url = URL.createObjectURL(
          this.arrangement.editForm.file
        )
      } else {
        this.arrangement.editForm.url = null
      }
    },
    addArrangement() {
      const validate = this.$refs.add_form.validate()

      if (validate) {
        this.arrangement.items.push({
          title: this.arrangement.addForm.name,
          description: this.arrangement.addForm.desc,
          image: this.arrangement.addForm.file,
        })
      }
    },
    editButtonArrangement(item, index) {
      this.arrangement.editForm.index = index
      this.arrangement.editForm.file = item.image
      if (item.image != null) {
        this.arrangement.editForm.url = URL.createObjectURL(item.image)
      }
      this.arrangement.editForm.name = item.title
      this.arrangement.editForm.desc = item.description
      this.editDialog = true
    },
    editArrangement() {
      const validate = this.$refs.edit_form.validate()

      if (validate) {
        this.arrangement.items.splice(this.arrangement.editForm.index, 1, {
          title: this.arrangement.editForm.name,
          description: this.arrangement.editForm.desc,
          image: this.arrangement.editForm.file,
        })
      }
    },
    deleteArrangement(index) {
      this.arrangement.items.splice(index, 1)
    },
    editDialogClosed() {
      this.arrangement.editForm.index = null
      this.arrangement.editForm.file = null
      this.arrangement.editForm.url = null
      this.arrangement.editForm.name = ''
      this.arrangement.editForm.desc = ''
      this.editDialog = false
    },
    addDialogClosed() {
      this.arrangement.addForm.file = null
      this.arrangement.addForm.url = null
      this.arrangement.addForm.name = ''
      this.arrangement.addForm.desc = ''
      this.addDialog = false
    },
    async formSubmit() {
      if (this.arrangement.items.length == 0) {
        return Swal.fire({
          icon: 'warning',
          titleText: 'Tatanan harus diisi terlebih dahulu',
          confirmButtonText: 'Oke',
          confirmButtonColor: '#42a5f5',
        })
      }

      const validate = this.$refs.program_form.validate()

      if (validate) {
        const response = await this.$store.dispatch('admin/program/create', {
          title: this.program.title,
          description: this.program.description,
          image: this.program.file,
        })

        switch (response.status) {
          case 200:
            let finalStatus, finalResponse

            this.arrangement.items.forEach((value) => {
              const arrangementResponse = this.$store.dispatch(
                'admin/arrangement/create',
                {
                  program_id: response.data.id,
                  title: value.title,
                  description: value.description,
                  image: value.image,
                }
              )

              switch (arrangementResponse.status) {
                case 200:
                  finalStatus = 200
                  break

                case 400:
                  finalStatus = 400
                  finalResponse = arrangementResponse.data.message
                  break

                case 422:
                  finalStatus = 422
                  finalResponse = arrangementResponse.data.message
                  break

                case 500:
                  finalStatus = 500
                  finalResponse = arrangementResponse.data.message
                  break
              }
            })

            Swal.fire({
              icon: 'success',
              titleText: 'Data berhasil disimpan',
              confirmButtonText: 'Kembali',
              confirmButtonColor: '#42a5f5',
              timer: 2000,
            })
            break

          case 400:
            Swal.fire({
              icon: 'warning',
              titleText: response.data.message,
              confirmButtonText: 'Kembali',
              confirmButtonColor: '#42a5f5',
            })
            break

          case 422:
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
    },
  },
}
</script>
