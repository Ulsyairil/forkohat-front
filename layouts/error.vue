<template>
  <div>
    <h1 v-if="error['statusCode'] === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <v-btn @click.prevent="returnBack()">Kembali</v-btn>
    <v-btn @click.prevent="refreshApp()">Refresh</v-btn>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'error-template',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  methods: {
    returnBack() {
      this.$router.go(-1)
    },
    refreshApp() {
      location.reload()
    },
  },
}
</script>
