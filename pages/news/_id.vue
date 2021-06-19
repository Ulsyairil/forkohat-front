<template>
  <b-container fluid class="ovhidden">
    <b-row class="justify-content-md-center">
      <b-col md="12" class="pl-0 pr-0">
        <b-img-lazy
          id="image-header"
          fluid
          :src="news.image.current_url"
          class="img-responsive"
          alt="Responsive image"
        ></b-img-lazy>
      </b-col>
      <b-col md="9" class="mt-5 mb-5">
        <h4 class="text-center mt-2 mb-4" style="color: #0140b5">
          {{ news.title }}
        </h4>

        <p class="text-justify mt-5 with-breaks">
          {{ news.content }}
        </p>
      </b-col>
      <b-col md="9" class="text-right">
        <span class="mdall" style="color: #0e49b5"
          >Bagikan Ke :
          <a href="https://twitter.com"><i class="fab fa-twitter-square ml-1"></i></a>
          <a href="https://facebook.com"><i class="fab fa-facebook-square ml-1"></i></a>
          <a href="https://instagram.com"><i class="fab fa-instagram ml-1"></i></a>
        </span>
        <hr />
      </b-col>
      <b-col md="9" class="mt-2">
        <b-card
          no-body
          class="overflow-hidden border-0 rounded-0 bg-transparent"
          border-variant="light"
        >
          <b-row no-gutters>
            <b-col md="1">
              <b-card-img
                src="/logo.png"
                alt="Image"
                fluid
                class="rounded-0 img-responsive"
              ></b-card-img>
            </b-col>
            <b-col md="11">
              <div class="card-body pt-0 author-mobile">
                <h4 class="card-title">{{ news.users.name }}</h4>
                <h6 class="card-subtitle text-muted mb-2">Penulis</h6>
                <p>
                  Nadia Sonya adalah lulusan Teknik Informatika dari Binus
                  University yang saat ini menjadi salah satu Content Writer di
                  Jakarta mdart City. Gemar mengamati isu transportasi,
                  olahraga, teknologi dan sains, ia memulai karier Jurnalistik
                  bersama media internasional Motorsport.com pada 2016-2019.
                  Saat ini ia terfokus pada topik kesehatan, khususnya mengenai
                  penanggulangan pandemi Covid-19 di wilayah DKI Jakarta.
                </p>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col md="9" class="mt-4">
        <h5 style="color: #0e49b5" class="mb-5">Artikel Terkait</h5>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss">
p.with-breaks {
  white-space: pre-wrap;
}

.ovhidden {
  overflow-x: hidden;
}

#image-header {
  max-width: 100%;
  width: 1600px;
  height: 600px;
}

@media only screen and (max-width: 600px) {
  #image-header {
    max-width: 100%;
    height: 350px;
  }

  .author-mobile {
    text-align: center;
    margin-top: 20px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      baseurl: this.$config.baseurl,
      domain: this.$config.domain,
      news: {
        id: '',
        author: '',
        title: '',
        content: '',
        created_at: '',
        users: {
          id: '',
          name: '',
        },
        image: {
          url: '/images/image_not_uploaded.gif',
          current_url: '',
          max: 5242880,
          type: ['image/jpg', 'image/jpeg', 'image/png'],
          value: null,
        },
        file: {
          max: 2097152,
          type: ['image/jpg', 'image/jpeg', 'image/png'],
          value: [],
          current_value: [],
        },
      },
    }
  },
  async fetch() {
    try {
      let url
      url = `${this.baseurl}/news?id=${this.$route.params.id}`

      const res = await this.$axios.$get(url)
      console.log(res)
      this.news.id = res.id
      this.news.author = res.author_id
      this.news.title = res.title
      this.news.content = res.content
      this.news.created_at = res.created_at
      this.news.users.id = res.users.id
      this.news.users.name = res.users.name
      this.news.file.current_value = null
      this.news.file.current_value = []

      res.newsFiles.forEach((value) => {
        if (value.type == 'banner') {
          this.news.image.current_url = `${this.domain}${value.url}`
        }

        if (value.type == 'files') {
          this.news.file.current_value.push(value)
        }
      })

      console.log(this.news)
    } catch (error) {
      console.log(error)
      return this.$notify({
        group: 'app',
        type: 'error',
        title: 'Kesalahan pada server',
        text: error,
      })
    }
  },
  methods: {},
}
</script>
