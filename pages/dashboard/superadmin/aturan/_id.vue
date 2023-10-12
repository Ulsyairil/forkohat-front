<template>
  <v-container fluid>
    <v-card elevation="3">
      <v-card-title>
        <v-btn type="button" color="primary" fab small @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <span class="ml-3">Ubah Aturan</span>

        <v-icon class="ml-3" @click="$fetch()">refresh</v-icon>
      </v-card-title>

      <v-container fluid>
        <v-form ref="rule_form" lazy-validation>
          <v-text-field
            v-model="rule.name"
            label="Judul Aturan"
            :rules="[validation.required, validation.maxText]"
          ></v-text-field>

          <v-radio-group
            label="Izin : "
            v-model="rule.selected"
            row
            :rules="[validation.required]"
          >
            <v-radio
              label="Superadmin"
              value="superadmin"
              @click="updateRadio()"
            ></v-radio>
            <v-radio
              label="Admin"
              value="admin"
              @click="updateRadio()"
            ></v-radio>
            <v-radio
              label="Member/Anggota"
              value="member"
              @click="updateRadio()"
            ></v-radio>
            <v-radio
              label="Tamu"
              value="guest"
              @click="updateRadio()"
            ></v-radio>
          </v-radio-group>
        </v-form>

        <div v-if="rule.member">
          <v-divider />

          <v-dialog v-model="permission.addDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                type="button"
                color="primary"
                class="my-3 ml-3"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>add</v-icon>
                Tambah
              </v-btn>
            </template>

            <v-card rounded>
              <v-card-title>Tambah Izin Anggota</v-card-title>
              <v-container>
                <v-form ref="add_form" lazy-validation>
                  <v-select
                    label="Pilih Program Yang Diizinkan"
                    :rules="[validation.required]"
                    v-model="permission.add.program"
                    :items="programData"
                    item-text="title"
                    item-value="id"
                    clearable
                    @change="updateAddProgram()"
                    return-object
                  ></v-select>
                  <v-select
                    label="Pilih Tatanan Yang Diizinkan"
                    :rules="[validation.required]"
                    v-model="permission.add.arrangement.value"
                    :disabled="permission.add.arrangement.disabled"
                    :items="arrangementData"
                    item-text="title"
                    item-value="id"
                    clearable
                    return-object
                  ></v-select>
                </v-form>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="permission.addDialog = false"
                >
                  Tutup
                </v-btn>
                <v-btn color="primary" text @click="addPermission()">
                  Simpan
                </v-btn>
                <v-btn color="primary" text @click="addPermissionAndClose()">
                  Simpan & Tutup
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Program</th>
                  <th class="text-left">Tatanan</th>
                  <th class="text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in permission.items" :key="index">
                  <td>{{ item.Program.title }}</td>
                  <td>{{ item.Arrangement.title }}</td>
                  <td>
                    <v-icon small class="mr-2" @click="editButton(item, index)">
                      mdi-pencil
                    </v-icon>

                    <v-icon
                      v-if="item.id"
                      small
                      @click="destroyPermission(item) && $fetch()"
                    >
                      mdi-delete
                    </v-icon>

                    <v-icon v-else small @click="deleteItemPermission(index)">
                      mdi-delete
                    </v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-dialog
            v-model="permission.editDialog"
            persistent
            max-width="600px"
          >
            <v-card rounded>
              <v-card-title>Ubah Izin Anggota</v-card-title>
              <v-container>
                <v-form ref="edit_form" lazy-validation>
                  <v-select
                    label="Pilih Program Yang Diizinkan"
                    :rules="[validation.required]"
                    v-model="permission.edit.program"
                    :items="programData"
                    item-text="title"
                    item-value="id"
                    clearable
                    @change="updateAddProgram()"
                    return-object
                  ></v-select>
                  <v-select
                    label="Pilih Tatanan Yang Diizinkan"
                    :rules="[validation.required]"
                    v-model="permission.edit.arrangement.value"
                    :disabled="permission.edit.arrangement.disabled"
                    :items="arrangementData"
                    item-text="title"
                    item-value="id"
                    clearable
                    return-object
                  ></v-select>
                </v-form>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="permission.editDialog = false"
                >
                  Tutup
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="editPermission(permission.edit.index)"
                >
                  Simpan
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="editPermissionAndClose(permission.edit.index)"
                >
                  Simpan & Tutup
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <span>
          <i>Catatan : Ketika melakukan ubah data disimpan terlebih dahulu</i>
        </span>

        <div class="mt-3">
          <v-btn type="button" color="primary" @click="$router.go(-1)">
            Kembali
          </v-btn>
          <v-btn type="button" color="primary" @click="saveAllForm">
            Simpan
          </v-btn>
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
      title: 'Tambah Aturan',
    }
  },
  data() {
    return {
      rule: {
        name: '',
        selected: '',
        superadmin: false,
        admin: false,
        member: false,
        guest: false,
      },
      permission: {
        addDialog: false,
        editDialog: false,
        add: {
          program: '',
          arrangement: {
            value: '',
            disabled: true,
          },
        },
        edit: {
          id: null,
          index: null,
          program: '',
          arrangement: {
            value: '',
            disabled: true,
          },
        },
        items: [],
      },
      validation: {
        required: (v) => !!v || 'Harus Diisi',
        maxUpload: (v) =>
          !v || v.size < 5242880 || 'Ukuran File Gambar Harus Kurang Dari 5MB',
        maxText: (v) => !v || v.length <= 254 || 'Maksimal 254 Karakter',
      },
    }
  },
  computed: {
    programData() {
      return this.$store.state.superadmin.program.all
    },
    arrangementData() {
      return this.$store.state.superadmin.arrangement.all
    },
  },
  methods: {
    updateRadio() {
      switch (this.rule.selected) {
        case 'superadmin':
          this.rule.superadmin = true
          this.rule.admin = false
          this.rule.member = false
          this.rule.guest = false
          break

        case 'admin':
          this.rule.superadmin = false
          this.rule.admin = true
          this.rule.member = false
          this.rule.guest = false
          break

        case 'member':
          this.rule.superadmin = false
          this.rule.admin = false
          this.rule.member = true
          this.rule.guest = false
          break

        case 'guest':
          this.rule.superadmin = false
          this.rule.admin = false
          this.rule.member = false
          this.rule.guest = true
          break
      }
    },
    callProgramApi() {
      return this.$store.dispatch('superadmin/program/all')
    },
    callArrangementApi(value) {
      return this.$store.dispatch('superadmin/arrangement/all', value)
    },
    updateAddProgram() {
      if (this.permission.add.program) {
        this.permission.add.arrangement.disabled = false
        this.callArrangementApi(this.permission.add.program.id)
      } else {
        this.permission.add.arrangement.disabled = true
        this.permission.add.arrangement.value = ''
      }
    },
    addPermission() {
      const validate = this.$refs.add_form.validate()

      if (validate) {
        this.permission.items.push({
          id: null,
          Program: this.permission.add.program,
          Arrangement: this.permission.add.arrangement.value,
        })
      }
    },
    addPermissionAndClose() {
      this.addPermission()
      this.permission.addDialog = false
    },
    deleteItemPermission(index) {
      this.permission.items.splice(index, 1)
    },
    editButton(item, index) {
      this.permission.editDialog = true
      item.id != null
        ? (this.permission.edit.id = item.id)
        : (this.permission.edit.id = null)
      this.permission.edit.program = item.Program
      this.callArrangementApi(item.Program.id)
      this.permission.edit.arrangement.disabled = false
      this.permission.edit.arrangement.value = item.Arrangement
      this.permission.edit.index = index
    },
    updateEditProgram() {
      if (this.permission.edit.program) {
        this.permission.edit.arrangement.disabled = false
        this.callArrangementApi(this.permission.edit.program.id)
      } else {
        this.permission.edit.arrangement.disabled = true
        this.permission.edit.arrangement.value = ''
      }
    },
    editPermission(index) {
      let data = {
        Program: this.permission.edit.program,
        Arrangement: this.permission.edit.arrangement.value,
      }

      if (this.permission.edit.id != null) {
        data['id'] = this.permission.edit.id
        this.permission.items.splice(index, 1)
        this.permission.items.push(data)
      } else {
        this.permission.items.push(data)
        this.permission.items.splice(index, 1)
      }
    },
    editPermissionAndClose(index) {
      this.editPermission(index)

      this.permission.editDialog = false
    },
    async destroyPermission(item) {
      const notif = await Swal.fire({
        icon: 'warning',
        titleText: 'Apakah Anda Yakin?',
        confirmButtonText: 'Hapus',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        allowOutsideClick: false,
      })

      if (notif.isConfirmed) {
        this.$store.dispatch('superadmin/permission/destroy', item.id)
        setTimeout(() => {
          this.$fetch()
        }, 500)
      }
    },
    async saveAllForm() {
      let validate = this.$refs.rule_form.validate()

      if (this.rule.member) {
        if (this.permission.items.length == 0) {
          return Swal.fire({
            icon: 'info',
            titleText: 'Izin Anggota Harus Diisi',
            confirmButtonText: 'Kembali',
          })
        }
      }

      if (validate) {
        const ruleResponse = await this.$store.dispatch(
          'superadmin/rule/edit',
          {
            id: this.$route.params.id,
            rule: this.rule.name,
            is_superadmin: this.rule.superadmin,
            is_admin: this.rule.admin,
            is_member: this.rule.member,
            is_guest: this.rule.guest,
          }
        )

        switch (ruleResponse.status) {
          case 200:
            this.permission.items.forEach(async (value) => {
              if (value.id != null) {
                const response = await this.$store.dispatch(
                  'superadmin/permission/edit',
                  {
                    id: value.id,
                    rule_id: this.$route.params.id,
                    program_id: value.Program.id,
                    arrangement_id: value.Arrangement.id,
                  }
                )

                switch (response.status) {
                  case 400:
                    return Swal.fire({
                      icon: 'error',
                      titleText: response.data.message,
                      confirmButtonText: 'Kembali',
                    })
                }
              } else {
                const response = await this.$store.dispatch(
                  'superadmin/permission/create',
                  {
                    rule_id: this.$route.params.id,
                    program_id: value.Program.id,
                    arrangement_id: value.Arrangement.id,
                  }
                )

                switch (response.status) {
                  case 400:
                    return Swal.fire({
                      icon: 'error',
                      titleText: response.data.message,
                      confirmButtonText: 'Kembali',
                    })
                }
              }
            })
            break

          default:
            Swal.fire({
              icon: 'error',
              titleText: ruleResponse.data,
              confirmButtonText: 'Kembali',
            })
            break
        }

        Swal.fire({
          icon: 'success',
          titleText: 'Data Berhasil Disimpan',
          confirmButtonText: 'Kembali',
        })
      }

      setTimeout(() => {
        this.$fetch()
      }, 1000)
    },
  },
  async fetch() {
    const response = await this.$store.dispatch(
      'superadmin/rule/get',
      this.$route.params.id
    )

    switch (response.status) {
      case 200:
        this.rule.name = response.data.name
        this.rule.superadmin = response.data.is_superadmin
        this.rule.admin = response.data.is_admin
        this.rule.member = response.data.is_member
        this.rule.guest = response.data.is_guest

        if (response.data.is_superadmin) {
          this.rule.selected = 'superadmin'
        } else if (response.data.is_admin) {
          this.rule.selected = 'admin'
        } else if (response.data.is_member) {
          this.rule.selected = 'member'
        } else if (response.data.is_guest) {
          this.rule.selected = 'guest'
        }

        this.updateRadio()

        this.permission.items = response.data.Permission

        break

      case 404:
        this.$nuxt.error({
          statusCode: 404,
          message: 'Halaman Tidak Ditemukan',
        })
        break

      default:
        break
    }
  },
  mounted() {
    this.callProgramApi()
    this.$fetch()
  },
}
</script>
