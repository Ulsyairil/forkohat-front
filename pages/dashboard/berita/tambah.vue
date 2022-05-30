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
        <span class="display-1 font-weight-bold">Tambah Berita</span>
      </v-col>
    </v-row>

    <v-form class="mt-5">
      <v-file-input
        accept="image/*"
        label="Upload Gambar Berita"
        outlined
        prepend-icon=""
        prepend-inner-icon="add_a_photo"
        clearable
      ></v-file-input>
      <v-text-field label="Judul Berita" outlined></v-text-field>
      <client-only>
        <VueEditor :editor-toolbar="editor.customToolbar" />
      </client-only>
      <v-btn class="mt-5" type="submit" color="primary"> Simpan </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      editor: {
        customToolbar: [
          ['bold', 'italic', 'underline'],
          [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
          ],
          [
            'blockquote',
            { list: 'ordered' },
            { list: 'bullet' },
            { list: 'check' },
          ],
          [{ color: [] }, 'link', 'clean'],
        ],
      },
    }
  },
}
</script>
