<template>
  <div class="auth-wrapper">
    <Nuxt />
    <DashboardFooter />
  </div>
</template>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}

.auth-wrapper {
  height: 100vh;
}
</style>

<script>
export default {
  mounted() {
    $.LoadingOverlaySetup({
      image: '',
      background: 'rgba(255, 255, 255, 0.8)',
      custom: `
        <div class="text-center">
            <div class="spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
      `,
    })

    /**
     * Usage : 
     * $("tag|tag-id|class").inputFilter(function(value) {
            return /^\d*$/.test(value);
        });
     */
    $.fn.inputFilter = function (inputFilter) {
      return this.on(
        'input keydown keyup mousedown mouseup select contextmenu drop',
        function () {
          if (inputFilter(this.value)) {
            this.oldValue = this.value
            this.oldSelectionStart = this.selectionStart
            this.oldSelectionEnd = this.selectionEnd
          } else if (this.hasOwnProperty('oldValue')) {
            this.value = this.oldValue
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd)
          } else {
            this.value = ''
          }
        }
      )
    }
  },
}
</script>
