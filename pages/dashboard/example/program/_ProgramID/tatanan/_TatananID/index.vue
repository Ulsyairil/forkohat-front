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
          >Dokumen | Tatanan ID {{ $route.params.TatananID }}</span
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <v-text-field
          prepend-inner-icon="search"
          label="Cari"
          clearable
          outlined
          hide-details="true"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="2" lg="2" xl="2">
        <v-select
          prepend-inner-icon="sort"
          label="Sortir"
          clearable
          outlined
          hide-details="true"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <v-select
          label="Tampilkan"
          clearable
          outlined
          hide-details="true"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <v-select
          prepend-inner-icon="delete"
          label="Sampah"
          clearable
          outlined
          hide-details="true"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="12" md="2" lg="2" xl="2" align-self="center">
        <v-btn
          color="primary"
          :to="`/dashboard/program/${$route.params.ProgramID}/tatanan/${$route.params.TatananID}/tambah`"
        >
          <v-icon>add</v-icon>
          Tambah
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="6" lg="4" xl="4" class="d-flex flex-column">
        <v-card class="flex d-flex flex-column">
          <v-card-title
            v-text="`Ad laborum commodo et eu esse dolore esse ea`"
          ></v-card-title>

          <v-card-text
            class="card-content-scroll flex"
            v-text="
              `Eiusmod enim nulla pariatur non nostrud non culpa velit fugiat est dolor voluptate enim. Quis occaecat enim nisi qui et amet veniam laboris voluptate cillum. Culpa exercitation labore occaecat non ad ut aliquip aliqua anim. Occaecat et aliquip eu adipisicing consectetur veniam. Veniam nisi qui ut exercitation culpa id proident amet excepteur ipsum est pariatur adipisicing mollit. Esse eiusmod esse laborum anim qui officia.`
            "
          ></v-card-text>

          <v-card-actions>
            <v-btn color="primary" text>
              <v-icon>preview</v-icon>
            </v-btn>
            <v-btn
              color="warning"
              text
              :to="`/dashboard/program/${$route.params.ProgramID}/tatanan/${$route.params.TatananID}/1`"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn color="error" text>
              <v-icon>delete_forever</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="6" lg="4" xl="4" class="d-flex flex-column">
        <v-card class="flex d-flex flex-column">
          <v-card-title
            v-text="
              `Fugiat culpa ad laborum proident exercitation in tempor deserunt exercitation fugiat duis exercitation.`
            "
          ></v-card-title>

          <v-card-text
            class="card-content-scroll flex"
            v-text="
              `Adipisicing non pariatur consectetur aliqua excepteur minim ea. Cillum sint culpa ea sint ut officia. Occaecat ex eiusmod nostrud exercitation enim enim officia ut laboris. Ea consectetur eu aute cupidatat. Proident id occaecat ipsum nostrud id officia anim. Cillum occaecat cillum ad consequat irure non enim tempor ullamco id nulla est.`
            "
          ></v-card-text>

          <v-card-actions>
            <v-btn color="primary" text>
              <v-icon>preview</v-icon>
            </v-btn>
            <v-btn
              color="warning"
              text
              :to="`/dashboard/program/${$route.params.ProgramID}/tatanan/${$route.params.TatananID}/2`"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn color="error" text>
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

<style lang="scss" scoped>
.card-title-scroll {
  height: 125px;
  overflow: auto;
}

.card-content-scroll {
  height: 100px;
  overflow: auto;
}
</style>

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
