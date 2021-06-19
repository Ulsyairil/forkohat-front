<template>
  <b-container fluid class="p-0">
    <b-row>
      <b-col cols="12">
        <b-carousel
          id="carousel-fade"
          style="text-shadow: 0px 0px 2px #000"
          fade
          indicators
          img-width="1024"
          img-height="480"
        >
          <b-carousel-slide>
            <template #img>
              <img
                class="d-block img-fluid w-100"
                width="1024"
                height="480"
                src="https://picsum.photos/1024/480/?image=55"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template #img>
              <img
                class="d-block img-fluid w-100"
                width="1024"
                height="480"
                src="https://picsum.photos/1024/480/?image=55"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template #img>
              <img
                class="d-block img-fluid w-100"
                width="1024"
                height="480"
                src="https://picsum.photos/1024/480/?image=55"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>
        </b-carousel>
      </b-col>
      <b-col class="pt-5" cols="12" style="background-image: url(bg/news.png)">
        <div class="mb-5 text-center">
          <h2>Berita</h2>
          <hr style="height: 5px; width: 100px" class="bg-azure" />
        </div>
        <div class="pt-2 pl-3">
          <HomeNews />
        </div>
        <div class="text-center m-5">
          <a href="/news" class="btn btn-primary btn-round btn-lg">
            Lihat Berita Lainnya
          </a>
        </div>
      </b-col>
      <b-col class="pt-5" cols="12">
        <div class="mb-5 text-center">
          <h2>Protokol Kesehatan</h2>
          <hr style="height: 5px; width: 100px" class="bg-azure" />
        </div>
        <div
          class="text-center"
          style="margin-top: -125px; margin-bottom: -50px"
        >
          <b-img class="mt-4 mb-4" src="images/health_protocol_bg.png" fluid></b-img>
        </div>
      </b-col>
      <b-col cols="12">
        <div class="mb-5 text-center">
          <h2>Event</h2>
          <hr style="height: 5px; width: 100px" class="bg-azure" />
        </div>
        <HomeEvent-Desktop />
        <HomeEvent-Mobile />
      </b-col>
      <b-col class="pt-5" cols="12">
        <div class="mb-5 text-center">
          <h2>Kontak</h2>
          <hr style="height: 5px; width: 100px" class="bg-azure" />
        </div>
        <div class="pt-5">
          <HomeContact />
        </div>
      </b-col>
      <b-col class="pt-5" cols="12">
        <div class="mb-5 text-center">
          <h2>Partner</h2>
          <hr style="height: 5px; width: 100px" class="bg-azure" />
        </div>
        <div class="pt-5 pb-5">
          <div class="row text-center align-items-center">
            <div class="col-4">
              <img class="img-fluid" src="/images/balikpapan_logo.png" alt="" />
            </div>
            <div class="col-4">
              <img class="img-fluid" src="/images/kemenkes_logo.png" alt="" />
            </div>
            <div class="col-4">
              <img class="img-fluid" src="/images/swastisaba_logo.png" alt="" />
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss">
#carousel-fade {
  height: 100% !important;
  max-height: 600px;
  overflow: hidden;
}

.p-0 {
  overflow: hidden !important;
}

.bg-news {
  background-image: url('/bg/news.jpg');
}

@media only screen and (max-width: 600px) {
  carousel-item img {
    height: 100vh !important;
  }
}
</style>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
  },
}
</script>
