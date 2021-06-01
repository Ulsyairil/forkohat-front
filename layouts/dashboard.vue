<template>
  <div class="app-root">
    <DashboardSidebar />
    <DashboardHeader />
    <main role="main" class="wrapper">
      <notifications group="app" style="margin-top: 90px" />
      <Nuxt />
    </main>
    <DashboardFooter />
    <DashboardScrollTop />
  </div>
</template>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

.dark-mode {
  background-color: #222;
  color: #fff;
}

.light-mode {
  background-color: #fff;
}

.app-root {
  /* Margin bottom by footer height */
  margin-bottom: 70px;
}

.wrapper {
  margin-top: 90px !important;
  position: relative;
}
</style>

<script>
export default {
  middleware: ['CheckIfAuthenticated'],
  head() {
    return {
      bodyAttrs: {
        class: 'light-mode',
      },
    }
  },
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

    $.LoadingOverlay('hide')

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
