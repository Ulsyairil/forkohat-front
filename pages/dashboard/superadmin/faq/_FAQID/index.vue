<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="1" md="1" lg="1" xl="1">
        <v-btn
          class="align-self-center"
          color="primary"
          @click="$router.go(-1)"
          text
        >
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="11" md="11" lg="11" xl="11">
        <span class="display-1 font-weight-bold">Ubah FAQ</span>
      </v-col>
    </v-row>

    <v-form class="mt-5">
      <v-text-field label="FAQ" clearable outlined></v-text-field>
      <v-btn type="submit" color="primary">Simpan</v-btn>
    </v-form>

    <v-row class="mt-5">
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
        <v-btn
          color="primary"
          :to="`/dashboard/faq/${$route.params.edit}/topik/tambah`"
        >
          <v-icon>add</v-icon>
          Tambah Topik
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="12"
        xl="6"
        v-for="index in 10"
        :key="index"
      >
        <v-card elevation="3">
          <v-card-title v-text="`Excepteur elit qui ad voluptate`" />

          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he
            could deliver. You won't have time for sleeping, soldier, not with
            all the bed making you'll be doing. Then we'll go with that data
            file! Hey, you add a one and two zeros to that or we walk! You're
            going to do his laundry? I've got to find a way to escape.
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="orange lighten-1"
              :to="`/dashboard/faq/${$route.params.edit}/topik/${index}`"
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
