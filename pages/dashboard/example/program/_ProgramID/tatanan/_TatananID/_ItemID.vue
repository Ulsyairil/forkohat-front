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
          >Ubah Dokumen ID {{ $route.params.ItemID }} | Tatanan ID
          {{ $route.params.TatananID }}</span
        >
      </v-col>
    </v-row>

    <v-form class="mt-5">
      <v-text-field label="Judul Dokumen" outlined></v-text-field>
      <v-textarea label="Deskripsi Singkat" outlined></v-textarea>
      <v-file-input
        accept="application/pdf"
        label="Unggah Berkas"
        prepend-icon=""
        prepend-inner-icon="picture_as_pdf"
        outlined
        clearable
      ></v-file-input>
      <v-select label="Tampilkan" outlined></v-select>
      <v-btn type="submit" color="primary">
        <v-icon>save</v-icon>
        Simpan
      </v-btn>
      <v-btn type="button" color="primary">
        <v-icon>preview</v-icon>
        Lihat
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>
