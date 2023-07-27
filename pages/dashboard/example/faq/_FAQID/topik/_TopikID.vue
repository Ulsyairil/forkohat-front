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
        <span class="display-1 font-weight-bold">Ubah Topik FAQ</span>
      </v-col>
    </v-row>

    <v-form class="mt-5">
      <v-text-field label="Judul Topik" outlined></v-text-field>
      <v-textarea label="Penjelasan Topik" outlined></v-textarea>
      <v-btn type="submit" color="primary"> Simpan </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>
