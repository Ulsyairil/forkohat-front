<template>
  <v-container>
    <h1>FAQ</h1>

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
        <v-btn color="primary" to="/dashboard/faq/tambah">
          <v-icon>add</v-icon>
          Tambah
        </v-btn>
      </v-col>
    </v-row>

    <v-row align="stretch">
      <v-col
        cols="12"
        sm="4"
        md="4"
        lg="4"
        xl="4"
        v-for="index in 12"
        :key="index"
      >
        <v-card elevation="3">
          <v-card-title
            v-text="
              `Ad adipisicing dolor sit est non minim proident esse non adipisicing.`
            "
          />

          <v-card-actions>
            <v-btn
              color="orange lighten-1"
              :to="`/dashboard/faq/${index}`"
              text
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn color="red lighten-1" text>
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
