<template>
  <v-container fluid class="pa-0">
    <v-img lazy-src="https://cdn.vuetifyjs.com/images/cards/cooking.png" max-height="500" max-width="2000"
      aspect-ratio="1" src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
    </v-img>

    <v-row class="mb-10 mx-10">
      <v-col>
        <h2 class="blue--text mt-10 mb-1">
          {{ news.title }}
        </h2>
        <h4 class="mb-10">{{ news.created_at }}</h4>

        <p align="justify" class="text-wrap">
          {{ news.content }}
        </p>

        <v-divider></v-divider>

        <v-card class="mt-5" max-width="700" elevation="0">
          <v-list-item three-line>
            <v-list-item-avatar size="90" color="grey">
              <v-img
                src="https://s3-alpha-sig.figma.com/img/a250/b257/e4f8c1748c7fd8377b47858cd87b307f?Expires=1670198400&Signature=HwIkYYSF~HBINGANPSdiTdXQCDKSTG2cn~~Hf8gIV3vBc08-l7id050DwDue3poN3UAwpHmlLJClrxYNbG9DDDllM1iGjuyorq1cc2uNhRvdCFyigSUGu~z5yWHSg6qUjwMqMYOikmIexpdXSG6x3Wid5BLzp09ItjtpHXSXHVZLRskxw~iqpsJZ8Kkg0sxZIA4Xd4cKSgnZBgaPEhXrNR9MwwUZHx63bbDRcwk5ZavXMIBikopnpnugPY09kp0rsVwkDs75PuakhjWdtzj79RIN5hfi2wwOLm4udUphl-mcyaFe1nKKt~iYsvwQvWp~QmUcUFTSUFX-cWUGxATE~g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="cyan--text font-weight-black">Penulis</v-list-item-subtitle>
              <v-list-item-subtitle class="blue--text font-weight-bold mt-1">{{ news.author.fullname }}</v-list-item-subtitle>
              <v-list-item-content class="font-weight-light text-justify">Nadia Sonya adalah lulusan Teknik Informatika
                dari Binus
                University yang saat ini menjadi salah satu Content Writer di
                Jakarta Smart City. Gemar mengamati isu transportasi, olahraga,
                teknologi dan sains, ia memulai karier Jurnalistik bersama media
                internasional Motorsport.com pada 2016-2019. Saat ini ia
                terfokus pada topik kesehatan, khususnya mengenai penanggulangan
                pandemi Covid-19 di wilayah DKI Jakarta.</v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      news: {
        title : '',
        content : '',
        created_at : '',
        author : {
          fullname : '',
        },
        files : {
        }
      },
    }
  },
  async fetch() {
    const newsId = this.$route.params.id

    if (newsId) {
      // Example API call using the newsId
      const responseGetNews = await this.$store.dispatch('news/get', newsId)

      if (responseGetNews.status === 200) {
        this.news.title = responseGetNews.data.title
        this.news.content = responseGetNews.data.content
        this.news.created_at = responseGetNews.data.created_at
        this.news.author.fullname = responseGetNews.data.Author.fullname
        console.log(this.news)

      } else {
        this.$nuxt.error({
          statusCode: 500,
          message: responseGetNews.data.message,
        })
      }
    } else {
      console.error("No ID found in route params")
    }
  },
}
</script>
