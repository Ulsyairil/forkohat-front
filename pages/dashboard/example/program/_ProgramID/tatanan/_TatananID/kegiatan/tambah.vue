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
          >Tambah Kegiatan | Tatanan ID {{ $route.params.TatananID }}</span
        >
      </v-col>
    </v-row>

    <v-form class="mt-5">
      <div class="d-flex flex-row align-end justify-center flex-wrap mb-5">
        <v-img
          src="https://via.placeholder.com/600x400.png?text=Unggah+Gambar"
          max-width="300"
        />
        <div
          :class="`d-flex flex flex-column flex-wrap ${
            $vuetify.breakpoint.xsOnly == true ? 'mt-5' : ''
          }`"
        >
          <v-file-input
            class="mx-3"
            accept="image/*"
            label="Unggah Gambar Kegiatan"
            prepend-icon=""
            prepend-inner-icon="add_a_photo"
            outlined
            clearable
          ></v-file-input>
        </div>
      </div>
      <v-text-field label="Judul Kegiatan" outlined></v-text-field>
      <v-textarea label="Deskripsi Singkat" outlined></v-textarea>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Tanggal Registrasi"
            prepend-inner-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Batal </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Tanggal Akhir Registrasi"
            prepend-inner-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
            disabled
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Batal </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <v-text-field
        label="Link Registrasi (URL)"
        prepend-inner-icon="link"
        outlined
        disabled
      ></v-text-field>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Tanggal Kegiatan Berakhir"
            prepend-inner-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
            disabled
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Batal </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <v-select
        prepend-inner-icon="visibility"
        label="Tampilkan"
        outlined
      ></v-select>
      <v-file-input
        label="Unggah Berkas (Optional)"
        prepend-icon=""
        prepend-inner-icon="upload_file"
        disabled
        multiple
        outlined
      ></v-file-input>

      <v-btn type="submit" color="primary">
        <v-icon>save</v-icon>
        Simpan
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      date: '',
      modal: false,
    }
  },
}
</script>
