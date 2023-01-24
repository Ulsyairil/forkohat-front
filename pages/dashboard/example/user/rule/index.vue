<template>
  <v-container>
    <h1>Rule</h1>

    <v-row>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <v-select
          prepend-inner-icon="sort"
          label="Sortir"
          clearable
          outlined
          hide-details="true"
          v-model="sort.selected"
          :items="sort.options"
          item-text="text"
          item-value="value"
        >
        </v-select>
      </v-col>
      <v-col
        class=""
        cols="12"
        sm="12"
        md="2"
        lg="2"
        xl="2"
        align-self="center"
      >
        <v-btn color="primary" to="/dashboard/user/rule/tambah">
          <v-icon>add</v-icon>
          &nbsp; Tambah
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :search="search"
      :headers="headers"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-5 my-2"
      @page-count="pageCount = $event"
    >
      <template v-slot:top>
        <div class="pt-2">
          <v-text-field
            v-model="search"
            label="Cari"
            class="mx-4"
          ></v-text-field>
        </div>
      </template>
      <template v-slot:[`item.is_superadmin`]="{ item }">
        <v-checkbox v-model="item.is_superadmin" readonly></v-checkbox>
      </template>
      <template v-slot:[`item.is_admin`]="{ item }">
        <v-checkbox v-model="item.is_admin" readonly></v-checkbox>
      </template>
      <template v-slot:[`item.is_member`]="{ item }">
        <v-checkbox v-model="item.is_member" readonly></v-checkbox>
      </template>
      <template v-slot:[`item.is_guest`]="{ item }">
        <v-checkbox v-model="item.is_guest" readonly></v-checkbox>
      </template>
      <template v-slot:[`item.actions`]="{}">
        <v-icon small class="mr-2"> mdi-pencil </v-icon>
        <v-icon small class="mr-2"> delete </v-icon>
      </template>
      <template v-slot:footer>
        <v-row class="mx-2 pt-2">
          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-text-field
              :value="itemsPerPage"
              label="Items per page"
              type="number"
              min="-1"
              max="15"
              @input="itemsPerPage = parseInt($event, 10)"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { faker } from '@faker-js/faker'

export default {
  layout: 'dashboard',
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: '',
      sort: {
        selected: 'desc',
        options: [
          {
            text: 'ASC',
            value: 'asc',
          },
          {
            text: 'DESC',
            value: 'desc',
          },
        ],
      },
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        {
          text: 'Nama Rule',
          value: 'name',
        },
        { text: 'Superadmin', value: 'is_superadmin' },
        { text: 'Admin', value: 'is_admin' },
        { text: 'Member', value: 'is_member' },
        { text: 'Guest', value: 'is_guest' },
        { text: 'Permission', value: 'permission_total' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [],
    }
  },
  fetch() {
    this.items.push({
      id: 1,
      name: 'Superadmin',
      is_superadmin: true,
      is_admin: false,
      is_member: false,
      is_guest: false,
      permission_total: faker.datatype.number(5),
    })

    this.items.push({
      id: 2,
      name: 'Admin',
      is_superadmin: false,
      is_admin: true,
      is_member: false,
      is_guest: false,
      permission_total: faker.datatype.number(5),
    })

    this.items.push({
      id: 3,
      name: 'Guest',
      is_superadmin: false,
      is_admin: false,
      is_member: false,
      is_guest: true,
      permission_total: 0,
    })

    for (let index = 3; index < 13; index++) {
      this.items.push({
        id: index + 1,
        name: faker.lorem.words(),
        is_superadmin: false,
        is_admin: false,
        is_member: true,
        is_guest: false,
        permission_total: faker.datatype.number(50),
      })
    }
  },
}
</script>
