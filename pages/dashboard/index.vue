<template>
  <div>
    <div class="container">
      <h3>Dashboard</h3>
      <hr class="border-dark" />
      <div class="mt-2" v-if="auth.user.rule_id == 1 || auth.user.rule_id == 2">
        <b-button
          class="mr-2"
          type="button"
          variant="outline-secondary"
          @click="$router.push('/dashboard/gallery')"
        >
          <div class="mt-2">
            <font-awesome-icon icon="images" size="4x" />
          </div>
          <div class="mt-2 font-weight-bold">Galleri</div>
        </b-button>
        <b-button
          class="mr-2"
          type="button"
          variant="outline-secondary"
          @click="$router.push('/dashboard/carousel')"
        >
          <div class="mt-2">
            <font-awesome-icon icon="sliders-h" size="4x" />
          </div>
          <div class="mt-2 font-weight-bold">Carousel</div>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
    }
  },
}
</script>
