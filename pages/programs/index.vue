<template>
  <b-container>
    <b-row class="mt-5">
      <b-col cols="12" class="mt-5">
        <Public-Cards-Programs />
      </b-col>

      <b-col cols="12">
        <div class="text-center mt-5 mb-4">
          <h2>Media</h2>
          <hr style="height: 5px; width: 100px" class="bg-azure" />
        </div>

        <div class="owl-carousel owl-theme">
          <img src="https://placeimg.com/1600/800/any?1" />
          <img src="https://placeimg.com/1600/800/any?2" />
          <img src="https://placeimg.com/1600/800/any?3" />
          <img src="https://placeimg.com/1600/800/any?4" />
          <img src="https://placeimg.com/1600/800/any?5" />
          <img src="https://placeimg.com/1600/800/any?6" />
          <img src="https://placeimg.com/1600/800/any?7" />
          <img src="https://placeimg.com/1600/800/any?8" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

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
        margin: 10,
        responsive: {
          0: {
            items: 1,
            nav: true,
          },
          600: {
            items: 3,
            nav: false,
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