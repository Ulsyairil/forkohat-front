<template>
  <v-container fluid>
    <v-card>
      <v-card-title> Struktur Organisasi </v-card-title>

      <v-container>
        <DashboardRenderOrgChart v-if="chartData" :data="chartData" />
        <div v-else>Data Kosong</div>
      </v-container>
    </v-card>

    <v-card class="mt-5" elevation="3">
      <v-container>
        <div class="d-flex flex-row flex-wrap mb-3">
          <v-btn
            type="button"
            class="mt-3 mr-3"
            color="primary"
            @click="addForm.dialog = true"
          >
            <v-icon>add</v-icon>
            Tambah
          </v-btn>
          <v-select
            label="Urutkan"
            class="mr-sm-3 mr-md-3"
            style="width: 100px"
            :items="table.orderItems"
            v-model="order"
            @input="$fetch()"
            hide-details
            append-icon="sort"
          ></v-select>
          <v-text-field
            append-icon="mdi-magnify"
            label="Cari"
            class="mt-sm-1 mt-md-1"
            v-model="search"
            @input="$fetch()"
            single-line
            hide-details
            clearable
          ></v-text-field>
        </div>

        <v-data-table
          class="mt-5"
          :headers="table.headers"
          :items="tableData.data"
          :items-per-page.sync="limit"
          :page.sync="page"
          :search="search"
          :server-items-length="tableData.total"
          @update:items-per-page="$fetch()"
          @update:page="$fetch()"
          no-data-text="Data Kosong"
          no-results-text="Data Tidak Ditemukan"
          :footer-props="{
            'items-per-page-options': table.itemsPerPageArray,
            'items-per-page-text': 'Baris per halaman',
          }"
          mobile-breakpoint="0"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <v-icon class="mr-2" @click="openEditDialog(item.id)">
                edit
              </v-icon>
              <v-icon @click="destroy(item.id)"> delete_forever </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-container>
    </v-card>

    <div>
      <v-dialog v-model="addForm.dialog" max-width="1000px" persistent>
        <v-card>
          <v-card-title>Tambah Chart</v-card-title>
          <v-container>
            <v-form
              ref="add_chart_form"
              @submit.prevent="storeChart(false)"
              lazy-validation
            >
              <v-autocomplete
                v-model="addForm.userId.select"
                :loading="addForm.userId.loading"
                :items="userData"
                :search-input.sync="addForm.userId.search"
                cache-items
                hide-no-data
                label="User ID"
                item-value="id"
                clearable
              >
                <template v-slot:selection="data">
                  <v-avatar left>
                    <img :src="`${serverBaseUrl()}/file/${data.item.image_mime}/${data.item.image_name}`" />
                  </v-avatar>
                  {{ data.item.fullname }}
                </template>
                <template v-slot:item="data">
                  <v-list-item-avatar>
                    <img :src="`${serverBaseUrl()}/file/${data.item.image_mime}/${data.item.image_name}`" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.fullname"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.Rule.name"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-autocomplete>

              <v-autocomplete
                v-model="addForm.parentId.select"
                :loading="addForm.parentId.loading"
                :items="chartData"
                :search-input.sync="addForm.parentId.search"
                cache-items
                hide-no-data
                label="Parent ID"
                item-value="id"
              >
                <template v-slot:selection="data">
                  <v-avatar left>
                    <img
                      :src="`${serverBaseUrl()}/file/${data.item.User.image_mime}/${data.item.User.image_name}`"
                    />
                  </v-avatar>
                  {{ data.item.User.fullname }}
                </template>
                <template v-slot:item="data">
                  <v-list-item-avatar>
                    <img
                      :src="`${serverBaseUrl()}/file/${data.item.User.image_mime}/${data.item.User.image_name}`"
                    />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.User.fullname"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.positionName"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-autocomplete>

              <v-text-field
                label="Area"
                v-model="addForm.area"
                :rules="[validation.maxTextDefault]"
              ></v-text-field>

              <v-text-field
                label="Kantor"
                v-model="addForm.office"
                :rules="[validation.maxTextDefault]"
              ></v-text-field>

              <v-text-field
                label="Jabatan"
                v-model="addForm.positionName"
                :rules="[validation.required, validation.maxTextDefault]"
              ></v-text-field>

              <div>
                <v-btn
                  type="submit"
                  color="primary"
                  @click.prevent="storeChart(false)"
                  >Simpan</v-btn
                >
                <v-btn
                  type="submit"
                  color="primary"
                  @click.prevent="storeChart(true)"
                  >Simpan & Tambah Lagi</v-btn
                >
                <v-btn type="button" @click="closeAddDialog()">Kembali</v-btn>
              </div>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editForm.dialog" max-width="1000px" persistent>
        <v-card>
          <v-card-title>Ubah Chart</v-card-title>
          <v-container>
            <v-form
              ref="edit_chart_form"
              @submit.prevent="updateChart()"
              lazy-validation
            >
              <v-autocomplete
                v-model="editForm.userId.select"
                :loading="editForm.userId.loading"
                :items="userData"
                :search-input.sync="editForm.userId.search"
                cache-items
                hide-no-data
                label="User ID"
                item-value="id"
              >
                <template v-slot:selection="data">
                  <v-avatar left>
                    <img :src="`${serverBaseUrl()}/file/${data.item.image_mime}/${data.item.image_name}`" />
                  </v-avatar>
                  {{ data.item.fullname }}
                </template>
                <template v-slot:item="data">
                  <v-list-item-avatar>
                    <img :src="`${serverBaseUrl()}/file/${data.item.image_mime}/${data.item.image_name}`" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.fullname"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.Rule.name"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-autocomplete>

              <v-autocomplete
                v-model="editForm.parentId.select"
                :loading="editForm.parentId.loading"
                :items="chartData"
                :search-input.sync="editForm.parentId.search"
                cache-items
                hide-no-data
                label="Parent ID"
                item-value="id"
              >
                <template v-slot:selection="data">
                  <v-avatar left>
                    <img
                      :src="`${serverBaseUrl()}/file/${data.item.User.image_mime}/${data.item.User.image_name}`"
                    />
                  </v-avatar>
                  {{ data.item.User.fullname }}
                </template>
                <template v-slot:item="data">
                  <v-list-item-avatar>
                    <img
                      :src="`${serverBaseUrl()}/file/${data.item.User.image_mime}/${data.item.User.image_name}`"
                    />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.User.fullname"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.positionName"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-autocomplete>

              <v-text-field
                label="Area"
                v-model="editForm.area"
                :rules="[validation.maxTextDefault]"
              ></v-text-field>

              <v-text-field
                label="Kantor"
                v-model="editForm.office"
                :rules="[validation.maxTextDefault]"
              ></v-text-field>

              <v-text-field
                label="Jabatan"
                v-model="editForm.positionName"
                :rules="[validation.required, validation.maxTextDefault]"
              ></v-text-field>

              <div>
                <v-btn
                  type="submit"
                  color="primary"
                  @click.prevent="updateChart()"
                  >Simpan</v-btn
                >
                <v-btn type="button" @click.prevent="closeEditDialog()"
                  >Kembali</v-btn
                >
              </div>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
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
      title: 'Struktur Organisasi',
    }
  },
  data() {
    return {
      orgChartData: null,
      table: {
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          {
            text: 'USER ID',
            sortable: false,
            value: 'userId',
          },
          {
            text: 'PARENT ID',
            sortable: false,
            value: 'parentId',
          },
          {
            text: 'Nama Lengkap',
            sortable: false,
            value: 'User.fullname',
            width: '200px',
          },
          {
            text: 'Area',
            sortable: false,
            value: 'area',
          },
          {
            text: 'Kantor',
            sortable: false,
            value: 'office',
            width: '200px',
          },
          {
            text: 'Jabatan',
            sortable: false,
            value: 'positionName',
            width: '200px',
          },
          {
            text: 'Aksi',
            sortable: false,
            value: 'actions',
            width: '100px',
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
      },
      lightBox: {
        img: '',
        visible: false,
        index: 0,
      },
      addForm: {
        dialog: false,
        userId: {
          select: null,
          loading: false,
          search: null,
        },
        parentId: {
          select: null,
          loading: false,
          search: null,
        },
        area: '',
        office: '',
        positionName: '',
      },
      editForm: {
        dialog: false,
        id: null,
        userId: {
          select: null,
          loading: false,
          search: null,
        },
        parentId: {
          select: null,
          loading: false,
          search: null,
        },
        area: '',
        office: '',
        positionName: '',
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
        maxTextDefault: (v) => {
          if (v) {
            v.length <= 254 || 'Maksimal 254 karakter'
          }

          return true
        },
      },
    }
  },
  computed: {
    chartData() {
      return this.$store.state.superadmin.org.data
    },
    page: {
      get() {
        return this.$store.state.superadmin.org.pagination.page
      },
      set(newValue) {
        this.$store.commit('superadmin/org/exportPaginationPage', newValue)
      },
    },
    limit: {
      get() {
        return this.$store.state.superadmin.org.pagination.limit
      },
      set(newValue) {
        this.$store.commit('superadmin/org/exportPaginationLimit', newValue)
      },
    },
    order: {
      get() {
        return this.$store.state.superadmin.org.pagination.order
      },
      set(newValue) {
        this.$store.commit('superadmin/org/exportPaginationOrder', newValue)
      },
    },
    search: {
      get() {
        return this.$store.state.superadmin.org.pagination.search
      },
      set(newValue) {
        this.$store.commit('superadmin/org/exportPaginationSearch', newValue)
      },
    },
    tableData() {
      return this.$store.state.superadmin.org.pagination.data
    },
    userData() {
      return this.$store.state.superadmin.user.all
    },
  },
  methods: {
    serverBaseUrl() {
      return process.env.serverBaseUrl
    },
    showImg(index, img) {
      this.lightBox.index = index
      this.lightBox.img = img
      this.lightBox.visible = true
    },
    handleHideImg() {
      this.lightBox.visible = false
    },
    closeAddDialog() {
      this.addForm.dialog = false
      this.addForm.userId.select = null
      this.addForm.parentId.select = null
      this.addForm.area = ''
      this.addForm.office = ''
      this.addForm.positionName = ''
      this.$refs.add_chart_form.resetValidation()
    },
    closeEditDialog() {
      this.editForm.dialog = false
      this.editForm.userId.select = null
      this.editForm.parentId.select = null
      this.editForm.area = ''
      this.editForm.office = ''
      this.editForm.positionName = ''
      this.$refs.edit_chart_form.resetValidation()
    },
    async storeChart(more = Boolean) {
      const validate = this.$refs.add_chart_form.validate()

      console.log(validate)

      if (!validate) {
        return
      }

      let payload = {
        user_id: this.addForm.userId.select,
        parent_id: this.addForm.parentId.select,
        area: this.addForm.area,
        office: this.addForm.office,
        position_name: this.addForm.positionName,
      }

      const response = await this.$store.dispatch(
        'superadmin/org/create',
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

      this.$fetch()

      if (more) {
        this.addForm.userId.select = null
        this.addForm.parentId.select = null
        this.addForm.area = null
        this.addForm.office = null
        this.addForm.positionName = null
        this.$refs.add_chart_form.resetValidation()
      } else {
        this.closeAddDialog()
      }
    },
    async openEditDialog(id) {
      const response = await this.$store.dispatch('superadmin/org/get', id)

      switch (response.status) {
        case 200:
          let data = response.data
          this.editForm.id = data.id
          this.editForm.userId.select = data.userId
          this.editForm.parentId.select = data.parentId
          this.editForm.area = data.area
          this.editForm.office = data.office
          this.editForm.positionName = data.positionName
          this.editForm.dialog = true
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
    },
    async updateChart() {
      const validate = this.$refs.edit_chart_form.validate()

      console.log(validate)

      if (!validate) {
        return
      }

      let payload = {
        id: this.editForm.id,
        user_id: this.editForm.userId.select,
        parent_id: this.editForm.parentId.select,
        area: this.editForm.area,
        office: this.editForm.office,
        position_name: this.editForm.positionName,
      }

      const response = await this.$store.dispatch(
        'superadmin/org/edit',
        payload
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
      this.closeEditDialog()
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
          'superadmin/org/destroy',
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
  },
  async fetch() {
    this.$d3
      .json(`${this.serverBaseUrl()}/superadmin/orgs`, {
        headers: { Authorization: this.$auth.strategy.token.get() },
      })
      .then((d) => {
        console.log(d)
        this.orgChartData = d
      })
      .catch(function (error) {
        console.log(error)
      })

    await this.$store.dispatch('superadmin/org/pagination', {
      page: this.page,
      limit: this.limit,
      order: this.order,
      search: this.search,
    })

    await this.$store.dispatch('superadmin/org/all')

    await this.$store.dispatch('superadmin/user/all')
  },
  mounted() {
    this.$fetch()
  },
}
</script>
