<template>
  <v-container fluid>
    <v-card elevation="3" class="mb-4">
      <v-card-title>Aturan</v-card-title>

      <v-container>
        <v-row class="mb-2">
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              @input="updateSearch"
              @click:clear="clearSearch"
              single-line
              hide-details
              clearable
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6">
            <v-select
              :value="payload.order"
              :items="order.items"
              @input="updateOrder"
              hide-details
            ></v-select>
          </v-col>
        </v-row>

        <v-btn type="button" color="primary" to="/dashboard/admin/aturan/add">
          <v-icon>add</v-icon>
          Tambah
        </v-btn>
      </v-container>
    </v-card>

    <v-card elevation="3" class="mt-3">
      <v-data-table
        :headers="headers"
        :items="ruleData.data"
        :options.sync="options"
        :server-items-length="ruleData.total"
        :loading="loading"
        :footer-props="{
          'items-per-page-options': [5, 10, 25, 50, 75, 100],
        }"
        :items-per-page="payload.limit"
        @update:page="updatePage"
        @update:items-per-page="updateItemPerPage"
        class="elevation-1"
      >
        <template v-slot:[`item.is_superadmin`]="{ item }">
          <div>
            <v-icon v-if="item.is_superadmin == 1">check_box</v-icon>
            <v-icon v-else>check_box_outline_blank</v-icon>
          </div>
        </template>

        <template v-slot:[`item.is_admin`]="{ item }">
          <div>
            <v-icon v-if="item.is_admin == 1">check_box</v-icon>
            <v-icon v-else>check_box_outline_blank</v-icon>
          </div>
        </template>

        <template v-slot:[`item.is_member`]="{ item }">
          <div>
            <v-icon v-if="item.is_member == 1">check_box</v-icon>
            <v-icon v-else>check_box_outline_blank</v-icon>
          </div>
        </template>

        <template v-slot:[`item.is_guest`]="{ item }">
          <div>
            <v-icon v-if="item.is_guest == 1">check_box</v-icon>
            <v-icon v-else>check_box_outline_blank</v-icon>
          </div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            class="mr-2"
            @click="$router.push(`/dashboard/admin/aturan/${item.id}`)"
          >
            edit
          </v-icon>
          <v-icon @click="destroyRule(item)"> delete_forever </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  layout: 'dashboard',
  head() {
    return {
      title: 'Aturan',
    }
  },
  data() {
    return {
      loading: true,
      search: '',
      order: {
        items: [
          {
            text: 'DESC',
            value: 'desc',
          },
          {
            text: 'ASC',
            value: 'asc',
          },
        ],
      },
      options: {},
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Name',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Superadmin',
          sortable: false,
          value: 'is_superadmin',
        },
        {
          text: 'Admin',
          sortable: false,
          value: 'is_admin',
        },
        {
          text: 'Anggota',
          sortable: false,
          value: 'is_member',
        },
        {
          text: 'Tamu',
          sortable: false,
          value: 'is_guest',
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
    payload() {
      return this.$store.state.admin.rule.pagination
    },
    ruleData() {
      return this.$store.state.admin.rule.pagination.data
    },
  },
  methods: {
    updatePage(event) {
      this.$store.commit('superadmin/rule/exportPaginationPage', event)
      this.$fetch()
    },
    updateItemPerPage(event) {
      this.$store.commit('superadmin/rule/exportPaginationLimit', event)
      this.$fetch()
    },
    updateSearch(event) {
      this.$store.commit('superadmin/rule/exportPaginationSearch', event)

      setTimeout(() => {
        this.$fetch()
      }, 500)
    },
    clearSearch() {
      this.$store.commit('superadmin/rule/exportPaginationSearch', '')
      this.search = ''
      this.$fetch()
    },
    updateOrder(event) {
      console.log(event)
      this.$store.commit('superadmin/rule/exportPaginationOrder', event)
      this.$fetch()
    },
    async destroyRule(item) {
      const notif = await Swal.fire({
        icon: 'warning',
        titleText: 'Apakah anda yakin',
        confirmButtonText: 'Hapus!',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        allowOutsideClick: false,
      })

      if (notif.isConfirmed) {
        this.$store.dispatch('superadmin/rule/destroy', item.id)
      }

      await this.$fetch()
    },
  },
  async fetch() {
    const payload = {
      page: this.payload.page,
      limit: this.payload.limit,
      order: this.payload.order,
      search: this.payload.search,
    }
    const response = await this.$store.dispatch(
      'superadmin/rule/pagination',
      payload
    )
    console.log(response)
    switch (response.status) {
      case 200:
        this.loading = false
        break

      default:
        break
    }
  },
  mounted() {
    if (this.payload.search) {
      this.search = this.payload.search
    }

    this.$fetch()
  },
}
</script>
