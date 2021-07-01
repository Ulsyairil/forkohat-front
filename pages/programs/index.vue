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

        <div v-if="slideData.length > 0">
          <carousel
            :perPageCustom="[
              [400, 1],
              [768, 2],
              [1024, 3],
            ]"
          >
            <slide v-for="(value, index) in slideData" :key="index">
              <div class="text-center">
                <b-img-lazy
                  class="p-2 gallery_image"
                  fluid
                  :src="domain + value.url"
                />
              </div>
            </slide>
          </carousel>
        </div>

        <div v-if="slideData.length == 0">
          <carousel>
            <slide>
              <b-img-lazy
                class="p-2"
                fluid
                src="https://place-hold.it/1024x500?text=Data Tidak Ditemukan&fontsize=23"
              />
            </slide>
          </carousel>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss">
@media only screen and (min-width: 748px) {
  .gallery_image {
    max-width: 300 !important;
    max-height: 200px !important;
  }
}
</style>

<script>
export default {
  data() {
    return {
      baseurl: this.$config.baseurl,
      domain: this.$config.domain,
      slideData: [],
    }
  },
  async fetch() {
    try {
      const url = `${this.baseurl}/galleries`

      const res = await this.$axios.$get(url)
      console.log(res)

      this.slideData = res
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
}
</script>
