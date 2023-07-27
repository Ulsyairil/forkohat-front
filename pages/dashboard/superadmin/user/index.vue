<template>
  <v-container fluid>
    <v-card elevation="3">
      <v-card-title>Daftar Pengguna</v-card-title>

      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="4" lg="4">
            <v-text-field
              append-icon="mdi-magnify"
              label="Cari"
              v-model="search"
              @input="fetchData()"
              single-line
              hide-details
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4">
            <v-select
              label="Urutkan"
              :items="orderItems"
              v-model="order"
              @input="fetchData()"
              hide-details
              append-icon="sort"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="4">
            <v-select
              label="Sampah"
              :items="trashItems"
              v-model="trash"
              @input="fetchData()"
              hide-details
              append-icon="delete"
            ></v-select>
          </v-col>
        </v-row>

        <v-btn
          type="button"
          class="mt-3"
          color="primary"
          @click="addDialog = true"
        >
          <v-icon>add</v-icon>
          Tambah
        </v-btn>

        <v-dialog v-model="addDialog" persistent max-width="1200px">
          <v-card>
            <v-card-title>Tambah Pengguna</v-card-title>

            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-form ref="add_form" lazy-validation>
                    <v-text-field
                      label="Nama Lengkap"
                      v-model="addForm.fullname"
                      :rules="[
                        addForm.validation.required,
                        addForm.validation.maxText,
                      ]"
                    ></v-text-field>
                    <v-text-field
                      label="Username"
                      v-model="addForm.username"
                      :rules="[
                        addForm.validation.maxText,
                        addForm.validation.noSpace,
                      ]"
                    ></v-text-field>
                    <v-text-field
                      label="E-mail"
                      v-model="addForm.email"
                      :rules="[
                        addForm.validation.email,
                        addForm.validation.maxText,
                      ]"
                    ></v-text-field>
                    <v-text-field
                      v-model="addForm.password.value"
                      :append-icon="
                        addForm.password.show ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="addForm.password.show ? 'text' : 'password'"
                      label="Kata Sandi"
                      counter
                      @click:append="
                        addForm.password.show = !addForm.password.show
                      "
                      :rules="[
                        addForm.validation.required,
                        addForm.validation.maxText,
                        addForm.validation.password,
                      ]"
                    ></v-text-field>
                    <v-text-field
                      v-model="addForm.confirmPassword.value"
                      :append-icon="
                        addForm.confirmPassword.show ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="addForm.confirmPassword.show ? 'text' : 'password'"
                      label="Konfirmasi Kata Sandi"
                      counter
                      @click:append="
                        addForm.confirmPassword.show =
                          !addForm.confirmPassword.show
                      "
                      :rules="[
                        addForm.validation.required,
                        addForm.validation.maxText,
                        addForm.validation.password,
                        addForm.validation.confirmPassword,
                      ]"
                    ></v-text-field>
                    <v-select
                      label="Pilih Aturan"
                      v-model="addForm.rule"
                      :items="rule"
                      item-text="name"
                      item-value="id"
                      @input="addFormRuleChanged"
                      clearable
                    ></v-select>
                  </v-form>
                </v-col>
                <v-col v-if="addForm.rule" cols="12" sm="12" md="6" lg="6">
                  <v-simple-table style="max-height: 400px; overflow-y: scroll">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">ID</th>
                          <th class="text-left">Program</th>
                          <th class="text-left">Tatanan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in permission" :key="index">
                          <td>{{ item.id }}</td>
                          <td>{{ item.Program.title }}</td>
                          <td>{{ item.Arrangement.title }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions>
              <v-btn
                color=""
                @click="addFormDialogClosed('add_form', true, true)"
              >
                Batal
              </v-btn>
              <v-btn color="primary" @click="addFormSubmit(true)">Simpan</v-btn>
              <v-btn color="primary" @click="addFormSubmit(false)"
                >Simpan & Tutup</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-data-table
          class="mt-5"
          :headers="headers"
          :items="data.data"
          :items-per-page.sync="limit"
          :page.sync="page"
          :search="search"
          :server-items-length="data.total"
          @update:items-per-page="fetchData"
          @update:page="fetchData"
          no-data-text="Data Kosong"
          no-results-text="Data Tidak Ditemukan"
          :footer-props="{ 'items-per-page-options': itemsPerPageArray }"
        >
          <template v-slot:[`item.Rule`]="{ item }">
            {{ item.Rule.name }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="mr-2" @click="getEditData(item.id)"> edit </v-icon>
            <v-icon
              v-if="item.deleted_at != null"
              class="mr-2"
              @click="restoreData(item.id)"
            >
              restore_from_trash
            </v-icon>
            <v-icon v-else class="mr-2" @click="deleteData(item.id)"
              >delete</v-icon
            >
            <v-icon @click="destroyData(item.id)"> delete_forever </v-icon>
          </template>
        </v-data-table>

        <v-dialog v-model="editDialog" persistent max-width="1200px">
          <v-card>
            <v-card-title>
              <v-btn
                color="primary"
                @click="
                  editFormDialogClosed(
                    'edit_form',
                    'edit_password_form',
                    true,
                    true
                  )
                "
              >
                <v-icon>arrow_back</v-icon>
                Kembali
              </v-btn>
              &nbsp; Ubah Pengguna
            </v-card-title>

            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-form ref="edit_form" lazy-validation>
                    <v-text-field
                      label="Nama Lengkap"
                      v-model="editForm.fullname"
                      :rules="[
                        editForm.validation.required,
                        editForm.validation.maxText,
                      ]"
                    ></v-text-field>
                    <v-text-field
                      label="Username"
                      v-model="editForm.username"
                      :rules="[
                        editForm.validation.maxText,
                        editForm.validation.noSpace,
                      ]"
                    ></v-text-field>
                    <v-text-field
                      label="E-mail"
                      v-model="editForm.email"
                      :rules="[
                        editForm.validation.email,
                        editForm.validation.maxText,
                      ]"
                    ></v-text-field>
                    <v-select
                      label="Pilih Aturan"
                      v-model="editForm.rule"
                      :items="rule"
                      item-text="name"
                      item-value="id"
                      @input="editFormRuleChanged"
                      clearable
                    ></v-select>
                  </v-form>

                  <v-card-actions>
                    <v-btn color="primary" @click="editFormSubmit(true)"
                      >Simpan</v-btn
                    >
                  </v-card-actions>

                  <v-divider />

                  <v-form ref="edit_password_form" lazy-validation>
                    <v-text-field
                      v-model="editForm.password.value"
                      :append-icon="
                        editForm.password.show ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="editForm.password.show ? 'text' : 'password'"
                      label="Kata Sandi"
                      counter
                      @click:append="
                        editForm.password.show = !editForm.password.show
                      "
                      :rules="[
                        editForm.validation.required,
                        editForm.validation.maxText,
                        editForm.validation.password,
                      ]"
                    ></v-text-field>
                    <v-text-field
                      v-model="editForm.confirmPassword.value"
                      :append-icon="
                        editForm.confirmPassword.show
                          ? 'mdi-eye'
                          : 'mdi-eye-off'
                      "
                      :type="
                        editForm.confirmPassword.show ? 'text' : 'password'
                      "
                      label="Konfirmasi Kata Sandi"
                      counter
                      @click:append="
                        editForm.confirmPassword.show =
                          !editForm.confirmPassword.show
                      "
                      :rules="[
                        editForm.validation.required,
                        editForm.validation.maxText,
                        editForm.validation.password,
                        editForm.validation.confirmPassword,
                      ]"
                    ></v-text-field>
                  </v-form>

                  <v-card-actions>
                    <v-btn color="primary" @click="editPasswordFormSubmit(true)"
                      >Simpan</v-btn
                    >
                  </v-card-actions>
                </v-col>
                <v-col v-if="editForm.rule" cols="12" sm="12" md="6" lg="6">
                  <v-simple-table style="max-height: 400px; overflow-y: scroll">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">ID</th>
                          <th class="text-left">Program</th>
                          <th class="text-left">Tatanan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in permission" :key="index">
                          <td>{{ item.id }}</td>
                          <td>{{ item.Program.title }}</td>
                          <td>{{ item.Arrangement.title }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import voca from 'voca'
import Swal from 'sweetalert2'

export default {
  layout: 'dashboard',
  head() {
    return {
      title: 'Daftar Pengguna',
    }
  },
  data() {
    return {
      addDialog: false,
      editDialog: false,
      addForm: {
        fullname: '',
        username: '',
        email: '',
        password: {
          value: '',
          show: false,
        },
        confirmPassword: {
          value: '',
          show: false,
        },
        rule: '',
        validation: {
          required: (v) => !!v || 'Harus diisi',
          maxText: (v) => (v >= 254 ? 'Maksimal harus 254 karakter' : true),
          email: (v) =>
            (v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) ||
            'E-mail harus valid',
          password: (v) =>
            (v &&
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/.test(
                v
              )) ||
            'Minimal harus 8 karakter dengan satu huruf kapital, karakter spesial, dan angka',
          confirmPassword: (v) =>
            v == this.addForm.password.value ||
            'Konfirmasi kata sandi tidak sama',
          noSpace: (v) => (v && /^\S*$/.test(v)) || 'Tidak boleh ada spasi',
        },
      },
      editForm: {
        id: '',
        fullname: '',
        username: '',
        email: '',
        password: {
          value: '',
          show: false,
        },
        confirmPassword: {
          value: '',
          show: false,
        },
        rule: '',
        validation: {
          required: (v) => !!v || 'Harus diisi',
          maxText: (v) => (v >= 254 ? 'Maksimal harus 254 karakter' : true),
          email: (v) =>
            (v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) ||
            'E-mail harus valid',
          password: (v) =>
            (v &&
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/.test(
                v
              )) ||
            'Minimal harus 8 karakter dengan satu huruf kapital, karakter spesial, dan angka',
          confirmPassword: (v) =>
            v == this.editForm.password.value ||
            'Konfirmasi kata sandi tidak sama',
          noSpace: (v) => (v && /^\S*$/.test(v)) || 'Tidak boleh ada spasi',
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
          text: 'Sembunyikan',
          value: true,
        },
        {
          text: 'Tampilkan',
          value: false,
        },
      ],
      itemsPerPageArray: [10, 25, 50, 75, 100],
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Nama Lengkap',
          sortable: false,
          value: 'fullname',
        },
        {
          text: 'Username',
          sortable: false,
          value: 'username',
        },
        {
          text: 'E-mail',
          sortable: false,
          value: 'email',
        },
        {
          text: 'Aturan',
          sortable: false,
          value: 'Rule',
        },
        {
          text: 'Aksi',
          sortable: false,
          value: 'actions',
        },
      ],
    }
  },
  computed: {
    page: {
      get() {
        return this.$store.state.superadmin.user.pagination.page
      },
      set(newValue) {
        this.$store.commit('superadmin/user/exportPaginationPage', newValue)
      },
    },
    limit: {
      get() {
        return this.$store.state.superadmin.user.pagination.limit
      },
      set(newValue) {
        this.$store.commit('superadmin/user/exportPaginationLimit', newValue)
      },
    },
    order: {
      get() {
        return this.$store.state.superadmin.user.pagination.order
      },
      set(newValue) {
        this.$store.commit('superadmin/user/exportPaginationOrder', newValue)
      },
    },
    trash: {
      get() {
        return this.$store.state.superadmin.user.pagination.trash
      },
      set(newValue) {
        this.$store.commit('superadmin/user/exportPaginationTrash', newValue)
      },
    },
    search: {
      get() {
        return this.$store.state.superadmin.user.pagination.search
      },
      set(newValue) {
        this.$store.commit('superadmin/user/exportPaginationSearch', newValue)
      },
    },
    data() {
      return this.$store.state.superadmin.user.pagination.data
    },
    rule() {
      return this.$store.state.superadmin.rule.all
    },
    permission() {
      return this.$store.state.superadmin.permission.all
    },
  },
  methods: {
    fetchData() {
      this.$fetch()
    },
    addFormRuleChanged(event) {
      if (event != null) {
        this.$store.dispatch('superadmin/permission/all', event)
      } else {
        this.$store.commit('superadmin/permission/exportAll', [])
      }
    },
    addFormDialogClosed(form, resetForm, resetValidation) {
      this.addDialog = false
      if (resetForm) {
        this.$refs[form].reset()
      }
      if (resetValidation) {
        this.$refs[form].resetValidation()
      }
      this.$store.commit('superadmin/permission/exportAll', [])
    },
    async addFormSubmit(closeDialog) {
      if (this.addForm.username == '' && this.addForm.email == '') {
        return await Swal.fire({
          icon: 'warning',
          titleText: 'Username atau E-mail harus diisi',
          confirmButtonText: 'Kembali',
          confirmButtonColor: '#42a5f5',
        })
      }

      const validate = this.$refs.add_form.validate()

      if (validate) {
        const payload = {
          rule_id: this.addForm.rule,
          fullname: voca.titleCase(this.addForm.fullname),
          username: this.addForm.username,
          email: this.addForm.email,
          password: this.addForm.confirmPassword.value,
        }
        const response = await this.$store.dispatch(
          'superadmin/user/create',
          payload
        )

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Data Berhasil Disimpan',
              confirmButtonText: 'Kembali',
              confirmButtonColor: '#42a5f5',
            })

            if (closeDialog) {
              this.addDialog = closeDialog
            }
            break

          case 400:
            Swal.fire({
              icon: 'warning',
              titleText: 'Username atau E-mail Sudah Terpakai',
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
      }
    },
    async getEditData(id) {
      const response = await this.$store.dispatch('superadmin/user/get', id)

      switch (response.status) {
        case 200:
          this.editForm.id = response.data.id
          this.editForm.fullname = response.data.fullname
          this.editForm.username = response.data.username
          this.editForm.email = response.data.email
          this.editForm.rule = response.data.rule_id
          this.editFormRuleChanged(response.data.rule_id)
          this.editDialog = true
          break

        default:
          Swal.fire({
            icon: 'error',
            titleText: 'Data Tidak Ditemukan',
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break
      }
    },
    editFormRuleChanged(event) {
      if (event != null) {
        this.$store.dispatch('superadmin/permission/all', event)
      } else {
        this.$store.commit('superadmin/permission/exportAll', [])
      }
    },
    editFormDialogClosed(form1, form2, resetForm, resetValidation) {
      this.editDialog = false
      if (resetForm) {
        this.$refs[form1].reset()
        this.$refs[form2].reset()
      }
      if (resetValidation) {
        this.$refs[form1].resetValidation()
        this.$refs[form2].resetValidation()
      }
      this.$store.commit('superadmin/permission/exportAll', [])
    },
    async editFormSubmit(closeDialog) {
      if (this.editForm.username == '' && this.editForm.email == '') {
        return await Swal.fire({
          icon: 'warning',
          titleText: 'Username atau E-mail harus diisi',
          confirmButtonText: 'Kembali',
          confirmButtonColor: '#42a5f5',
        })
      }

      const validate = this.$refs.edit_form.validate()

      if (validate) {
        const payload = {
          user_id: this.editForm.id,
          rule_id: this.editForm.rule,
          fullname: voca.titleCase(this.editForm.fullname),
          username: this.editForm.username,
          email: this.editForm.email,
        }
        const response = await this.$store.dispatch(
          'superadmin/user/edit',
          payload
        )

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Data Berhasil Diubah',
              confirmButtonText: 'Kembali',
              confirmButtonColor: '#42a5f5',
            })

            if (closeDialog) {
              this.editDialog = closeDialog
            }
            break

          case 400:
            Swal.fire({
              icon: 'warning',
              titleText: 'Username atau E-mail Sudah Terpakai',
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
      }
    },
    async editPasswordFormSubmit(closeDialog) {
      const validate = this.$refs.edit_password_form.validate()

      if (validate) {
        const payload = {
          user_id: this.editForm.id,
          password: this.editForm.password.value,
          confirm_password: this.editForm.confirmPassword.value,
        }
        const response = await this.$store.dispatch(
          'superadmin/user/editPassword',
          payload
        )

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Kata Sandi Berhasil Diubah',
              confirmButtonText: 'Kembali',
              confirmButtonColor: '#42a5f5',
            })

            if (closeDialog) {
              this.editDialog = closeDialog
            }
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
    async deleteData(id) {
      const response = await this.$store.dispatch('superadmin/user/delete', id)

      switch (response.status) {
        case 200:
          Swal.fire({
            icon: 'success',
            titleText: 'Data Berhasil Disembunyikan',
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
    async restoreData(id) {
      const response = await this.$store.dispatch('superadmin/user/restore', id)

      switch (response.status) {
        case 200:
          Swal.fire({
            icon: 'success',
            titleText: 'Data Berhasil Ditampilkan',
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
    async destroyData(id) {
      const notif = await Swal.fire({
        icon: 'warning',
        titleText: 'Apakah Anda Yakin ?',
        confirmButtonText: 'Hapus!',
        confirmButtonColor: '#42a5f5',
        showCancelButton: true,
        cancelButtonText: 'Batal',
      })

      if (notif.isConfirmed) {
        const response = await this.$store.dispatch(
          'superadmin/user/destroy',
          id
        )

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Data Berhasil Ditampilkan',
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
    const payload = {
      page: this.page,
      limit: this.limit,
      order: this.order,
      trash: this.trash,
      search: this.search,
    }

    this.$store.dispatch('superadmin/user/pagination', payload)
    this.$store.dispatch('superadmin/rule/all')
  },
  mounted() {
    this.fetchData()
  },
}
</script>
