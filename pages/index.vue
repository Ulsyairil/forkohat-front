<template>
  <v-container fluid class="pa-0">
  <v-carousel height="600px">
    <v-carousel-item v-for="(item,i) in items" :key="i" :src="`${$axios.defaults.baseURL}/file/${item.image_mime}/${item.image_name}`" reverse-transition="fade-transition"
      transition="fade-transition">
    </v-carousel-item>
  </v-carousel>

    <v-row class="mb-10">
      <v-col cols="12" class="mb-5">
        <div class="text-center mt-10 mb-8">
          <h1>Berita</h1>
          <hr style="width:150px; height: 4px; margin: auto; border-radius: 7px 7px 7px 7px; background-color: teal; border: 1px solid teal;" class="mt-1 teal" />
        </div>
        <v-row class="mx-5">
          <v-col v-for="value in news.data" :key="value.title" cols="4">
            <v-card>
              <v-img
                :src="`${$axios.defaults.baseURL}/file/${value.image_mime}/${value.image_name}`"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="150px"
              >
              </v-img>

              <v-card-subtitle > {{ value.created_at }}</v-card-subtitle>

              <v-card-title> {{value.title}} </v-card-title>

              <v-card-subtitle class="text-justify"> {{ value.content.substring(0 , 250) + '...........' }}</v-card-subtitle>

              <v-card-actions>
                <v-btn text color="teal accent-4" @click="reveal = true" :to="`/news/${value.id}`">
                  Selengkapnya
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center mt-10 mb-5">
          <v-btn color="primary" elevation="6" large to="/news"
            >Lihat Berita Lainnya</v-btn
          >
        </div>
      </v-col>

      <v-col cols="12">
        <div class="text-center mt-10">
          <h1>Protokol Kesehatan</h1>
          <hr style="width:150px; height: 4px; margin: auto; border-radius: 7px 7px 7px 7px; background-color: teal; border: 1px solid teal;" class="mt-1 teal" />
        </div>

        <div class="d-flex flex-column justify-space-between align-center">
          <v-img
            contain
            max-height="550"
            max-width="550"
            src="https://drive.google.com/uc?export=view&id=18lHbLT6xuL0Vrz_nzF7oLVboYSbWTr-S">
          </v-img>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="text-center mt-10 mb-10">
          <h1>Partner</h1>
          <hr style="width:150px; height: 4px; margin: auto; border-radius: 7px 7px 7px 7px; background-color: teal; border: 1px solid teal;" class="mt-1 teal" />
        </div>

        <v-row class="mx-5">
          <v-col class="d-flex child-flex" cols="4">
            <v-img contain max-height="400" max-width="400"
              src="https://drive.google.com/uc?export=view&id=1eMsiSSidKcLo5eDLm0CGNuyP4nwGnH8U"></v-img>
          </v-col>
          <v-col class="d-flex child-flex" cols="4">
            <v-img contain max-height="400" max-width="400"
              src="https://drive.google.com/uc?export=view&id=1Y9ZspwPA6Y050VNjFRLZxC2LdVx8JJvi"></v-img>
          </v-col>
          <v-col class="d-flex child-flex" cols="4">
            <v-img contain max-height="400" max-width="400"
              src="https://drive.google.com/uc?export=view&id=1qRjp7ncXmglmeSyxzi-Szv5beUHTWjSF"></v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  layout: 'default',
  data: () => ({
    cards: [
      {
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        flex: 4,
      },
      {
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 4,
      },
      {
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 4,
      },
    ],
    items: [],
    news: [],
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
  }),
  fetch() {
    this.initCarousels;
    this.initNews;
  },
  computed: {
    async initCarousels() {
      const response = await this.$store.dispatch('publicMain/carousels')
      this.items = response.data
      console.log(response.data)
      console.log(this.items)
    },

    async initNews() {
      let payload = {
        page: 1,
        limit: 3,
        order: 'desc',
        trash: false
      }
      const response = await this.$store.dispatch('publicMain/news' , payload)
      this.news = response.data
      console.log(response.data)
      console.log(this.news)
    },


  },
}
</script>
