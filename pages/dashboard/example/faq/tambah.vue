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
        <span class="display-1 font-weight-bold">Tambah FAQ</span>
      </v-col>
    </v-row>

    <v-form class="mt-5">
      <v-text-field label="Judul FAQ" outlined></v-text-field>
      <v-btn color="primary" type="submit"> Simpan </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>
