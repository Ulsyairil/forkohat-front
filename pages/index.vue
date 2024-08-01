<template>
  <v-container fluid class="pa-0">
    <v-carousel height="600px">
      <v-carousel-item v-for="(item, i) in items" :key="i"
        :src="`${$axios.defaults.baseURL}/file/${item.image_mime}/${item.image_name}`"
        reverse-transition="fade-transition" transition="fade-transition">
      </v-carousel-item>
    </v-carousel>

    <v-row class="mb-10 mx-0">
      <v-col cols="12" class="mb-5">
        <div class="text-center mt-10 mb-8">
          <h1>Berita</h1>
          <hr style="
              width: 150px;
              height: 4px;
              margin: auto;
              border-radius: 7px;
              background-color: teal;
              border: 1px solid teal;
            " class="mt-1 teal" />
        </div>

        <v-row class="mx-10">
          <v-col v-for="value in news.data" :key="value.title" cols="12" sm="12" md="4" lg="4" class="mt-5">
            <v-card>
              <v-img :src="`${$axios.defaults.baseURL}/file/${value.image_mime}/${value.image_name}`"
                class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="150px">
              </v-img>

              <v-card-subtitle> {{ value.created_at }}</v-card-subtitle>

              <v-card-title> {{ value.title }} </v-card-title>

              <v-card-subtitle class="text-justify">
                {{
                  value.content.substring(0, 150) + '...........'
                }}</v-card-subtitle>

              <v-card-actions>
                <v-btn text color="teal accent-4" @click="reveal = true" :to="`/news/${value.id}`">
                  Selengkapnya
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center mt-10 mb-5">
          <v-btn color="primary" elevation="6" large to="/news">Lihat Berita Lainnya</v-btn>
        </div>
      </v-col>

      <v-col cols="12" class="mb-5">
        <div class="text-center mt-10 mb-8">
          <h1>Program</h1>
          <hr style="
              width: 150px;
              height: 4px;
              margin: auto;
              border-radius: 7px;
              background-color: teal;
              border: 1px solid teal;
            " class="mt-1 teal" />
        </div>

        <template>
          <v-row>
            <v-col cols="4">
              <v-card class="my-card">
                <v-card-title>Card Title</v-card-title>
                <v-card-subtitle>Card Subtitle</v-card-subtitle>
                <v-card-text>
                  Card content here...
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="my-card">
                <v-card-title>Card Title</v-card-title>
                <v-card-subtitle>Card Subtitle</v-card-subtitle>
                <v-card-text>
                  Card content here...
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="my-card">
                <v-card-title>Card Title</v-card-title>
                <v-card-subtitle>Card Subtitle</v-card-subtitle>
                <v-card-text>
                  Card content here...
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <div class="text-center mt-10 mb-5">
          <v-btn color="primary" elevation="6" large to="/news">Lihat Berita Lainnya</v-btn>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="text-center mt-10">
          <h1>Protokol Kesehatan</h1>
          <hr style="
              width: 150px;
              height: 4px;
              margin: auto;
              border-radius: 7px;
              background-color: teal;
              border: 1px solid teal;
            " class="mt-1 teal" />
        </div>

        <div class="d-flex flex-column justify-space-between align-center">
          <v-img contain max-height="550" max-width="100%" :src="protokolKesehatan"></v-img>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="text-center mt-10 mb-10">
          <h1>Frequently Asked Questions</h1>
          <hr style="
              width: 150px;
              height: 4px;
              margin: auto;
              border-radius: 7px;
              background-color: teal;
              border: 1px solid teal;
            " class="mt-1 teal" />
        </div>

        <v-row class="mx-10">
          <v-col cols="12">
            <v-card class="mx-auto" max-width="100%">
              <v-toolbar color="blue" dark>
                <v-toolbar-title>FAQ Topic</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <template>
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        What is Vuetify?
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Vuetify is a Vue UI Library with beautifully handcrafted Material Components.
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        What is Vuetify?
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Vuetify is a Vue UI Library with beautifully handcrafted Material Components.
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        What is Vuetify?
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Vuetify is a Vue UI Library with beautifully handcrafted Material Components.
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        What is Vuetify?
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Vuetify is a Vue UI Library with beautifully handcrafted Material Components.
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <div class="text-center mt-10 mb-10">
          <h1>Kontak</h1>
          <hr style="
              width: 150px;
              height: 4px;
              margin: auto;
              border-radius: 7px;
              background-color: teal;
              border: 1px solid teal;
            " class="mt-1 teal" />
        </div>

        <v-row class="mx-10">
          <v-col cols="12" md="8" class="align-stretch">
            <v-card class="text-center d-flex flex-column align-center justify-center" style="height: 100%;">
              <v-icon size="100" color="indigo" class="mt-3">mdi-compass-outline</v-icon>
              <v-card-title class="font-weight-bold">ALAMAT</v-card-title>
              <v-card-text class="text--primary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh porttitor bibendum fames Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Nibh porttitor bibendum fames
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" class="align-stretch">
            <v-card class="text-center d-flex flex-column align-center justify-center" style="height: 100%;">
              <v-icon size="100" color="indigo" class="mt-3">mdi-phone-in-talk-outline</v-icon>
              <v-card-title class="font-weight-bold">TELEPON</v-card-title>
              <v-card-text class="text--primary">
                <div>0842 2947 1928</div>
                <div>0867 2845 2912</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" class="align-stretch">
            <v-card class="text-center d-flex flex-column align-center justify-center" style="height: 100%;">
              <v-icon size="100" color="indigo" class="mt-3">mdi-email-outline</v-icon>
              <v-card-title class="font-weight-bold">EMAIL</v-card-title>
              <v-card-text class="text--primary">
                loremipsum@gmail.com
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="8" class="align-stretch">
            <v-card class="text-center d-flex flex-column align-center justify-center" style="height: 100%;">
              <v-icon size="100" color="indigo" class="mt-3">mdi-cellphone</v-icon>
              <v-card-title class="font-weight-bold">SOCIAL MEDIA</v-card-title>
              <v-card-text class="text--primary">
                <div class="mb-1"><v-icon color="blue">mdi-twitter</v-icon> @lorenipsum</div>
                <div class="mb-1"><v-icon color="blue">mdi-instagram</v-icon> @lorenipsum</div>
                <div class="mb-1"><v-icon color="blue">mdi-facebook</v-icon> @lorenipsum</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class=" mb-16">
        <div class="text-center">
          <h1>Partner</h1>
          <hr style="
              width: 150px;
              height: 4px;
              margin: auto;
              border-radius: 7px;
              background-color: teal;
              border: 1px solid teal;
            " class="mt-1 teal" />
        </div>

        <template>
          <v-row class="mx-4 mt-16 mobile-margin">
            <v-col class="d-flex justify-center align-center" cols="12" sm="12" md="4" lg="4">
              <v-img contain max-height="170" max-width="100%" :src="partner.balikpapan"></v-img>
            </v-col>
            <v-col class="d-flex justify-center align-center" cols="12" sm="12" md="4" lg="4">
              <v-img contain max-height="170" max-width="100%" :src="partner.kemenkes"></v-img>
            </v-col>
            <v-col class="d-flex justify-center align-center" cols="12" sm="12" md="4" lg="4">
              <v-img contain max-height="170" max-width="100%" :src="partner.swastisaba"></v-img>
            </v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import ProtokolKesehatanLogo from '../assets/media/logo/health_protocol_bg.png'
import BalikpapanLogo from '../assets/media/logo/balikpapan_logo.png'
import KemenkesLogo from '../assets/media/logo/kemenkes_logo.png'
import SwastibasaLogo from '../assets/media/logo/swastisaba_logo.png'

export default {
  layout: 'default',
  data: () => ({
    selected: 0,
    faqs: [],
    faqsTopic: [],
    items: [],
    news: [],
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
    protokolKesehatan: ProtokolKesehatanLogo,
    partner: {
      balikpapan: BalikpapanLogo,
      kemenkes: KemenkesLogo,
      swastisaba: SwastibasaLogo,
    }
  }),
  async fetch() {
    await this.initCarousels()
    await this.initNews()
    await this.initFaqs()
  },
  methods: {
    async initFaqs() {
      const response = await this.$store.dispatch('publicMain/faqs')
      console.log(response.data)
      this.faqs = response.data
      this.faqsTopic = response.data[this.selected].FaqTopic
      console.log('hehehhee')
    },

    async initCarousels() {
      const response = await this.$store.dispatch('publicMain/carousels')
      this.items = response.data
      console.log(response.data)
    },

    async initNews() {
      let payload = {
        page: 1,
        limit: 3,
        order: 'desc',
        trash: false,
      }
      const response = await this.$store.dispatch('publicMain/news', payload)
      this.news = response.data
      console.log(response.data)
      console.log(this.news)
    },
  },
}
</script>

<style>
@media (max-width: 600px) {
  .mobile-margin>.v-col {
    margin-bottom: 2000px;
    /* Adjust as needed */
  }

  .mobile-margin>.v-col:last-child {
    margin-bottom: 0;
    /* Remove margin from the last column */
  }
}


.my-card {
  position: relative;
  overflow: hidden;
}

.my-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/media/misc/card-program.png');
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  /* Adjust the opacity as needed */
}
</style>
