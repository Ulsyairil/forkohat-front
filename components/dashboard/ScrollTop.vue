<template>
  <b-button
    type="button"
    variant="primary"
    id="btn-scroll-top-dashboard"
    @click.prevent="topFunction()"
    pill
  >
    <font-awesome-icon class="mt-1 mb-1" icon="arrow-up" size="3x" />
  </b-button>
</template>

<style lang="scss">
#btn-scroll-top-dashboard {
  display: none; /* Hidden by default */
  position: fixed; /* Fixed/sticky position */
  bottom: 25px; /* Place the button at the bottom of the page */
  right: 30px; /* Place the button 30px from the right */
  z-index: 99; /* Make sure it does not overlap */
  cursor: pointer; /* Add a mouse pointer on hover */
  animation: fadeIn 0.5s;
}
</style>

<script>
export default {
  mounted() {
    window.onscroll = () => {
      this.scrollFunction()
    }
  },
  methods: {
    scrollFunction() {
      const btn = document.getElementById('btn-scroll-top-dashboard')
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        btn.style.display = 'block'
      } else {
        btn.style.display = 'none'
      }
    },
    topFunction() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
  },
}
</script>
