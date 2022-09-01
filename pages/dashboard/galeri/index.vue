<template>
  <v-container>
    <h1>Galeri</h1>

    <v-row>
      <v-col cols="12" sm="12" md="9" lg="9" xl="9">
        <v-text-field
          prepend-inner-icon="search"
          label="Cari"
          clearable
          outlined
          hide-details=""
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <v-select
          prepend-inner-icon="sort"
          label="Sortir"
          clearable
          outlined
          hide-details=""
        ></v-select>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
        <v-btn color="primary" to="/dashboard/galeri/tambah">
          <v-icon>add</v-icon>
          Tambah
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="index in 10" :key="index" sm="12" md="4" lg="4" xl="4">
        <v-card class="mx-auto" max-width="344">
          <v-img
            src="https://random.imagecdn.app/600/200"
            height="200px"
          ></v-img>

          <v-card-title>
            Aliqua ullamco ut consequat nostrud aliquip.
          </v-card-title>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              :to="`/dashboard/galeri/${index}`"
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
  fetch() {
    this.init;
  },
  computed: {
    async init() {
      let payload = {
        page: 1,
        limit: 9,
        order: 'desc',
        showed: 'public',
      }

      const response = await this.$store.dispatch('gallery/list', payload)

      console.log('asdhasdhjaskhdjk')
    },
  },
}
</script>