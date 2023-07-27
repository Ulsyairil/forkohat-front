<template>
  <v-container>
    <h1>Berita</h1>

    <v-row>
      <v-col cols="12" sm="12" md="8" lg="8" xl="8">
        <v-text-field
          prepend-inner-icon="search"
          label="Cari"
          clearable
          outlined
          hide-details="true"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="2" lg="2" xl="2">
        <v-select
          prepend-inner-icon="delete"
          label="Sampah"
          clearable
          outlined
          hide-details="true"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="12" md="2" lg="2" xl="2">
        <v-select
          prepend-inner-icon="sort"
          label="Sortir"
          clearable
          outlined
          hide-details="true"
        ></v-select>
      </v-col>
      <v-col sm="12" md="12" lg="12" xl="12">
        <v-btn color="primary" to="/dashboard/berita/tambah">
          <v-icon>add</v-icon>
          Tambah
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12" md="4" lg="4" xl="4" v-for="index in 10" :key="index">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://random.imagecdn.app/600/200"
          >
          </v-img>

          <v-card-title>Est est est dolor ex sit.</v-card-title>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              :to="`/dashboard/berita/${index}`"
              text
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn color="red lighten-2" text>
              <v-icon>delete_forever</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center my-5">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      page: 1,
    }
  },
}
</script>
