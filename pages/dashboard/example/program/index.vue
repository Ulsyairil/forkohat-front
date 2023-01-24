<template>
  <v-container>
    <h1>Program</h1>

    <v-row>
      <v-col cols="12" sm="12" md="3" lg="3" xl="3">
        <v-select
          prepend-inner-icon="sort"
          label="Sortir"
          clearable
          outlined
          hide-details="true"
        ></v-select>
      </v-col>
      <v-col
        class=""
        cols="12"
        sm="12"
        md="2"
        lg="2"
        xl="2"
        align-self="center"
      >
        <v-btn color="primary" to="/dashboard/program/tambah">
          <v-icon>add</v-icon>
          Tambah
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="6" lg="4" xl="4">
        <v-card>
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-3" size="125" tile>
              <v-img src="https://picsum.photos/200/300"></v-img>
            </v-avatar>

            <div>
              <v-card-title
                v-text="`Ad laborum commodo et eu esse dolore esse ea`"
              >
              </v-card-title>
            </div>
          </div>

          <v-card-subtitle
            class="card-content-scroll"
            v-text="
              `Adipisicing non pariatur consectetur aliqua excepteur minim ea. Cillum sint culpa ea sint ut officia. Occaecat ex eiusmod nostrud exercitation enim enim officia ut laboris. Ea consectetur eu aute cupidatat. Proident id occaecat ipsum nostrud id officia anim. Cillum occaecat cillum ad consequat irure non enim tempor ullamco id nulla est.`
            "
          ></v-card-subtitle>

          <v-card-actions>
            <v-btn color="primary" text to="/dashboard/program/1/tatanan"
              >Tatanan</v-btn
            >
            <v-btn color="warning" text to="/dashboard/program/1">
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
