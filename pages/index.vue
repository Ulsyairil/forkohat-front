<template>
  <v-container fluid class="pa-0">
    <v-carousel height="600px">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="`${$axios.defaults.baseURL}/file/${item.image_mime}/${item.image_name}`"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
      </v-carousel-item>
    </v-carousel>

    <v-row class="mb-10">
      <v-col cols="12" class="mb-5">
        <div class="text-center mt-10 mb-8">
          <h1>Berita</h1>
          <hr
            style="
              width: 150px;
              height: 4px;
              margin: auto;
              border-radius: 7px 7px 7px 7px;
              background-color: teal;
              border: 1px solid teal;
            "
            class="mt-1 teal"
          />
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

              <v-card-subtitle> {{ value.created_at }}</v-card-subtitle>

              <v-card-title> {{ value.title }} </v-card-title>

              <v-card-subtitle class="text-justify">
                {{
                  value.content.substring(0, 250) + '...........'
                }}</v-card-subtitle
              >

              <v-card-actions>
                <v-btn
                  text
                  color="teal accent-4"
                  @click="reveal = true"
                  :to="`/news/${value.id}`"
                >
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
          <hr
            style="
              width: 150px;
              height: 4px;
              margin: auto;
              border-radius: 7px 7px 7px 7px;
              background-color: teal;
              border: 1px solid teal;
            "
            class="mt-1 teal"
          />
        </div>

        <div class="d-flex flex-column justify-space-between align-center">
          <v-img
            contain
            max-height="550"
            max-width="550"
            src="https://drive.google.com/uc?export=view&id=18lHbLT6xuL0Vrz_nzF7oLVboYSbWTr-S"
          >
          </v-img>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="text-center mt-10 mb-10">
          <h1>Frequently Asked Questions</h1>
          <hr
            style="
              width: 150px;
              height: 4px;
              margin: auto;
              border-radius: 7px 7px 7px 7px;
              background-color: teal;
              border: 1px solid teal;
            "
            class="mt-1 teal"
          />
        </div>

        <v-row class="mx-3">
          <v-col cols="4">
            <v-card class="mx-auto" max-width="500">
              <v-toolbar color="blue" dark>
                <v-toolbar-title>FAQ Topic</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-list two-line>
                <v-list-item-group
                  v-model="selected"
                  active-class="indigo--text"
                  mandatory
                >
                  <v-list-item v-for="(item, index) in faqs" :key="item.name">
                    <template v-slot:default="{ active }">
                      <v-list-item-content @click="changeFaqsTopic(index)">
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-icon v-if="!active" color="grey lighten-1">
                          mdi-plus-circle-outline
                        </v-icon>

                        <v-icon v-else color="indigo darken-3">
                          mdi-minus-circle-outline
                        </v-icon>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="8">
            <v-expansion-panels focusable>
              <v-expansion-panel v-for="(item, i) in faqsTopic" :key="i">
                <v-expansion-panel-header>{{
                  item.title
                }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ item.description }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <div class="text-center mt-10 mb-10">
          <h1>Kontak</h1>
          <hr
            style="
              width: 150px;
              height: 4px;
              margin: auto;
              border-radius: 7px 7px 7px 7px;
              background-color: teal;
              border: 1px solid teal;
            "
            class="mt-1 teal"
          />
        </div>



        <v-row class="mx-16">
          <v-col cols="8" class="align-stretch">
            <v-card class="text-center d-flex flex-column align-center justify-center" >
                <v-icon size="100" color="indigo" class="mt-3">mdi-compass-outline</v-icon>
                <v-card-title class="font-weight-bold">ALAMAT</v-card-title>
                <v-card-text class="text--primary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh porttitor bibendum fames Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh porttitor bibendum fames
                </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4" class="align-stretch">
          <v-card class="text-center d-flex flex-column align-center justify-center">
            <v-icon size="100" color="indigo" class="mt-3">mdi-phone-in-talk-outline</v-icon>

            <v-card-title class="font-weight-bold">TELEPON</v-card-title>
                <v-card-text class="text--primary">
                  <div>0842 2947 1928</div>
                
                  <div>0867 2845 2912</div>
                </v-card-text>
          </v-card>
          </v-col>
          <v-col cols="4" class="align-stretch">
            <v-card class="text-center d-flex flex-column align-center justify-center">
              <v-icon size="100" color="indigo" class="mt-3">mdi-email-outline</v-icon>
              
              <v-card-title class="font-weight-bold">EMAIL</v-card-title>
              <v-card-text class="text--primary">
                loremipsum@gmail.com
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="8" class="align-stretch">
            <v-card class="text-center d-flex flex-column align-center justify-center">
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

      <v-col cols="12">
        <div class="text-center mt-10 mb-10">
          <h1>Partner</h1>
          <hr
            style="
              width: 150px;
              height: 4px;
              margin: auto;
              border-radius: 7px 7px 7px 7px;
              background-color: teal;
              border: 1px solid teal;
            "
            class="mt-1 teal"
          />
        </div>

        <v-row class="mx-5">
          <v-col class="d-flex child-flex" cols="4">
            <v-img
              contain
              max-height="400"
              max-width="400"
              src="https://drive.google.com/uc?export=view&id=1eMsiSSidKcLo5eDLm0CGNuyP4nwGnH8U"
            ></v-img>
          </v-col>
          <v-col class="d-flex child-flex" cols="4">
            <v-img
              contain
              max-height="400"
              max-width="400"
              src="https://drive.google.com/uc?export=view&id=1Y9ZspwPA6Y050VNjFRLZxC2LdVx8JJvi"
            ></v-img>
          </v-col>
          <v-col class="d-flex child-flex" cols="4">
            <v-img
              contain
              max-height="400"
              max-width="400"
              src="https://drive.google.com/uc?export=view&id=1qRjp7ncXmglmeSyxzi-Szv5beUHTWjSF"
            ></v-img>
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
    selected: 0,
    faqs: [],
    faqsTopic: [],
    items: [],
    news: [],
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
  }),
  async fetch() {
    await this.initCarousels()
    await this.initNews()
    await this.initFaqs()
  },
  methods: {
    async initFaqs() {
      const response = await this.$store.dispatch('publicMain/faqs')
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

    async changeFaqsTopic(selected) {
      const response = await this.$store.dispatch('publicMain/faqs')
      this.faqsTopic = response.data[selected].FaqTopic
      console.log(this.faqsTopic.length)
    },
  },
}
</script>
