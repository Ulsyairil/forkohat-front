<template>
  <b-container fluid class="ovhidden">
    <b-row class="justify-content-md-center">
      <b-col md="12" class="pl-0 pr-0">
        <b-img-lazy id="image-header"
          fluid
          :src="event.image.current_url"
          class="img-responsive"
          alt="Responsive image"
        ></b-img-lazy>
      </b-col>
      <b-col md="9" class="mt-5 mb-5">
        <h4 class="text-center mt-2 mb-4" style="color: #0140b5">
          {{ event.name }}
        </h4>

        <div class="text-justify mt-5 with-breaks" v-html="event.content"></div>
        <a href="javascript:void(0)" @click="$router.back()">
          <font-awesome-icon icon="arrow-left" />
          Kembali
        </a>
      </b-col>
      <b-col md="9" class="text-right">
        <span class="mdall" style="color: #0e49b5"
          >Bagikan Ke :
          <font-awesome-icon icon="ambulance" class="ml-1" /><font-awesome-icon
            icon="anchor"
            class="ml-1" />
          <font-awesome-icon icon="archway" class="ml-1"
        /></span>
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
                <h4 class="card-name">{{ event.users.name }}</h4>
                <h6 class="card-subname text-muted mb-2">Penulis</h6>
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
    </b-row>
  </b-container>
</template>

<style lang="scss">
p.with-breaks {
  white-space: pre-wrap;
  color: blue;
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
      event: {
        id: '',
        author: '',
        name: '',
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
      url = `${this.baseurl}/event?id=${this.$route.params.id}`

      const res = await this.$axios.$get(url)
      console.log(res)
      this.event.id = res.id
      this.event.author = res.author_id;
      this.event.name = res.name
      this.event.content = res.content
      this.event.created_at = res.created_at
      this.event.users.id = res.users.id
      this.event.users.name = res.users.name
      this.event.file.current_value = null
      this.event.file.current_value = []
      
      res.eventFiles.forEach((value) => {
        if (value.type == 'banner') {
          this.event.image.current_url = `${this.domain}${value.url}`
        }

        if (value.type == 'files') {
          this.event.file.current_value.push(value)
        }
      })


      console.log(this.event)
    } catch (error) {
      console.log(error)
      return this.$notify({
        group: 'app',
        type: 'error',
        name: 'Kesalahan pada server',
        text: error,
      })
    }
  },
  methods: {},
}
</script>