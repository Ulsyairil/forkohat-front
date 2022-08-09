<template>
  <v-container>
    <h1>Pengguna</h1>

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
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <v-select
          prepend-inner-icon="sort"
          label="Sampah"
          clearable
          outlined
          hide-details="true"
          v-model="trash.selected"
          :items="trash.options"
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
        <v-btn color="primary" to="/dashboard/user/list/tambah">
          <v-icon>person_add</v-icon>
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
      <template v-slot:[`item.actions`]="{}">
        <v-icon small class="mr-2"> mdi-pencil </v-icon>
        <v-icon small class="mr-2" v-if="trash.selected == true">
          restore_from_trash
        </v-icon>
        <v-icon small class="mr-2" v-if="trash.selected == false">
          delete
        </v-icon>
        <v-icon small class="mr-2" v-if="trash.selected == true">
          delete_forever
        </v-icon>
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
      trash: {
        selected: false,
        options: [
          {
            text: 'Tampilkan',
            value: true,
          },
          {
            text: 'Sembunyikan',
            value: false,
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
          text: 'Nama Lengkap',
          value: 'fullname',
        },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [],
    }
  },
  fetch() {
    for (let index = 0; index < 50; index++) {
      let firstName = faker.name.firstName()
      let lastName = faker.name.lastName()

      this.items.push({
        id: index + 1,
        fullname: `${firstName} ${lastName}`,
        username: faker.internet.userName(firstName, lastName),
        email: faker.internet.email(firstName, lastName),
      })
    }
  },
}
</script>
