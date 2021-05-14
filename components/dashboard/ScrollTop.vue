<template>
  <a
    href="javascript:void(0)"
    id="btn-scroll-top"
    @click.prevent="topFunction()"
    class="text-primary"
  >
    <font-awesome-icon icon="chevron-circle-up" size="4x" class="bg-white" />
  </a>
</template>

<style lang="scss">
#btn-scroll-top {
  display: none; /* Hidden by default */
  position: fixed; /* Fixed/sticky position */
  bottom: 70px; /* Place the button at the bottom of the page */
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
      const btn = document.getElementById('btn-scroll-top')
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
