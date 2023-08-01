<template>
  <v-container fluid>
    <v-card elevation="3">
      <v-card-title>
        <v-btn type="button" color="primary" fab small @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <span class="ml-3">Tambah Aturan</span>
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
                  <td>{{ item.program.title }}</td>
                  <td>{{ item.arrangement.title }}</td>
                  <td>
                    <v-icon small class="mr-2" @click="editButton(item, index)">
                      mdi-pencil
                    </v-icon>

                    <v-icon small @click="deleteItemPermission(index)">
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
          program: this.permission.add.program,
          arrangement: this.permission.add.arrangement.value,
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
      this.permission.edit.index = index
      this.permission.edit.program = item.program
      this.callArrangementApi(item.program.id)
      this.permission.edit.arrangement.disabled = false
      this.permission.edit.arrangement.value = item.arrangement
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
      this.permission.items.push({
        program: this.permission.edit.program,
        arrangement: this.permission.edit.arrangement.value,
      })
      this.permission.items.splice(index, 1)
    },
    editPermissionAndClose(index) {
      this.editPermission(index)
      this.permission.editDialog = false
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
          'superadmin/rule/create',
          {
            rule: this.rule.name,
            is_superadmin: this.rule.superadmin,
            is_admin: this.rule.admin,
            is_member: this.rule.member,
            is_guest: this.rule.guest,
          }
        )

        switch (ruleResponse.status) {
          case 200:
            this.permission.items.forEach((value) => {
              this.$store.dispatch('superadmin/permission/create', {
                rule_id: ruleResponse.data.id,
                program_id: value.program.id,
                arrangement_id: value.arrangement.id,
              })
            })

            Swal.fire({
              icon: 'success',
              titleText: 'Berhasil Disimpan',
              confirmButtonText: 'Kembali',
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
      }
    },
  },
  mounted() {
    this.callProgramApi()
  },
}
</script>
