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
        <span class="display-1 font-weight-bold"
          >Ubah Program ID : {{ $route.params.ProgramID }}</span
        >
      </v-col>
    </v-row>

    <v-form class="mt-5">
      <div class="mb-5 d-flex align-center flex-wrap">
        <v-img
          src="https://picsum.photos/200/300"
          max-height="250"
          max-width="250"
        ></v-img>

        <v-btn
          :class="`${$vuetify.breakpoint.xsOnly === true ? 'mt-5' : 'ml-3'}`"
          type="button"
          color="error"
          disabled
        >
          <v-icon class="mr-2">delete</v-icon>
          Hapus Gambar
        </v-btn>
      </div>
      <v-file-input
        accept="image/*"
        label="Upload Gambar"
        outlined
        prepend-icon=""
        prepend-inner-icon="add_a_photo"
        disabled
        clearable
      ></v-file-input>
      <v-text-field label="Nama Program" outlined></v-text-field>
      <v-textarea label="Deskripsi Singkat" outlined></v-textarea>
      <v-btn class="mt-5" type="submit" color="primary"> Simpan </v-btn>
      <v-divider class="mt-5" />
      <v-btn class="mt-5" type="button" color="primary"> Tatanan </v-btn>
      <v-btn class="mt-5" type="button" color="primary"> Kegiatan </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>
