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
        <span class="display-1 font-weight-bold">Ubah Gambar Galeri</span>
      </v-col>
    </v-row>

    <v-img
      class="white--text align-end pa-3 mb-5 mt-5"
      max-height="300px"
      src="https://random.imagecdn.app/600/200"
    >
      <v-btn class="white--text" color="orange lighten-1">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn class="white--text" color="red lighten-1">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-img>

    <v-form>
      <v-text-field label="Judul Gambar" outlined></v-text-field>
      <v-select label="Tampilkan" outlined></v-select>
      <v-btn class="mt-5" type="submit" color="primary"> Simpan </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>
