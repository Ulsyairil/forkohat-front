<template>
  <b-container fluid class="p-0">
    <b-row>
      <b-col cols="12">
        <div class="owl-carousel owl-theme" id="home-carousel">
          <img src="https://placeimg.com/1600/500/any?1" />
          <img src="https://placeimg.com/1600/500/any?2" />
          <img src="https://placeimg.com/1600/500/any?3" />
          <img src="https://placeimg.com/1600/500/any?4" />
        </div>
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
          <a href="javascript:void(0)" class="btn btn-primary btn-round btn-lg">
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
          <b-img src="images/health_protocol_bg.png"></b-img>
        </div>
      </b-col>
      <b-col class="pt-5" cols="12">
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
  mounted() {
    this.initCarousel()
  },
  methods: {
    initCarousel() {
      $('.owl-carousel').owlCarousel({
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            nav: true,
          },
        },
      })
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
  },
}
</script>
