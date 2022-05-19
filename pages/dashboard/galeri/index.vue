<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="8" lg="8" xl="8">
        <v-text-field
          prepend-inner-icon="search"
          label="Cari"
          clearable
          outlined
        ></v-text-field>
      </v-col>
      <v-col sm="12" md="4" lg="4" xl="4">
        <v-select
          prepend-inner-icon="sort"
          label="Sortir"
          clearable
          outlined
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="index in 10" :key="index" sm="12" md="4" lg="4" xl="4">
        <v-card class="mx-auto" max-width="344">
          <v-img :src="image" height="200px"></v-img>

          <v-card-title>
            Aliqua ullamco ut consequat nostrud aliquip.
          </v-card-title>

          <v-card-subtitle>
            Incididunt velit minim culpa exercitation consequat aliqua non
            adipisicing.
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text>
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn color="red lighten-2" text>
              <v-icon>delete_forever</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? 'mdi-chevron-up' : 'mdi-chevron-down'
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                Ad laborum adipisicing officia irure sunt ex irure proident in
                consequat commodo id. Incididunt magna elit magna dolore commodo
                esse deserunt cillum id cupidatat. Id irure laboris amet dolore
                elit non ipsum irure consequat in irure. Minim eu laborum mollit
                excepteur sit eu irure aute consectetur. Labore cillum officia
                fugiat tempor quis in eu anim culpa elit qui eu. Culpa quis
                aliquip consequat enim. Ea commodo eu sint deserunt sunt nulla
                cillum eu culpa irure aute ea dolore.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center my-5">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      show: false,
      image: 'https://random.imagecdn.app/600/200',
      page: 1,
    }
  },
}
</script>
