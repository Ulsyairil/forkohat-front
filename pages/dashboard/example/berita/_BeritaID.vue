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
        <span class="display-1 font-weight-bold">Ubah Berita</span>
      </v-col>
    </v-row>

    <v-img
      class="white--text align-end pa-3 mb-5"
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
      <v-text-field label="Judul Berita" outlined></v-text-field>
      <client-only>
        <VueEditor :editor-toolbar="editor.customToolbar" />
      </client-only>
      <v-btn class="mt-5" type="submit" color="primary"> Simpan </v-btn>
    </v-form>

    <v-divider class="mt-5 mb-4" />

    <span class="display-1 font-weight-bold">Komentar Berita</span>

    <v-card
      class="mt-5 overflow-auto"
      elevation="5"
      rounded="3"
      color="light-blue accent-3"
      max-height="560px"
    >
      <v-row class="ml-3 mr-3 pt-5 pb-5">
        <v-col sm="12" md="6" lg="6" xl="6">
          <v-card color="white">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-avatar class="ml-5 mt-7" size="70">
                <v-img
                  src="https://ui-avatars.com/api/?name=Sarah+Ammison"
                ></v-img>
              </v-avatar>

              <div>
                <v-card-subtitle>
                  Dolor mollit non dolor cillum esse sunt laborum consectetur
                  incididunt velit enim sit enim laborum. Eiusmod cupidatat
                  consequat ut eiusmod id consequat. Qui veniam sit sit mollit
                  amet adipisicing esse id tempor aliquip officia cillum. Ea
                  ullamco aute laborum velit ullamco in tempor.
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="red lighten-1" text>
                    <v-icon>delete_forever</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col
          sm="12"
          md="6"
          lg="6"
          xl="6"
          offset-md="6"
          offset-lg="6"
          offset-xl="6"
        >
          <v-card color="white">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-subtitle>
                  Tempor occaecat in sunt consequat nisi velit magna
                  reprehenderit veniam cupidatat nulla tempor excepteur magna.
                  Duis consequat officia anim mollit ad amet nisi eu aliquip
                  laborum enim. Aliqua ex est cillum ipsum irure irure duis
                  irure ipsum tempor.
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="orange lighten-1" text>
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn color="red lighten-1" text>
                    <v-icon>delete_forever</v-icon>
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="mr-5 mt-7" size="70">
                <v-img
                  src="https://ui-avatars.com/api/?name=John+Leider"
                ></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-card-actions class="pb-0">
        <v-text-field
          type="text"
          color="black"
          prepend-inner-icon="comment"
          label="Balas Komentar"
          append-icon="send"
          clearable
          filled
          background-color="white"
        ></v-text-field>
      </v-card-actions>
    </v-card>
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
