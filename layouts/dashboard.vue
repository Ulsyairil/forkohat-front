<template>
  <!-- app-root -->
  <div class="nk-app-root">
    <div class="nk-wrap">
      <!-- main header -->
      <Dashboard-Header />
      <!-- end main header -->

      <!-- content -->
      <div class="nk-content">
        <div class="container-fluid">
          <div class="nk-content-inner">
            <div class="nk-content-body">
              <Nuxt />
              <Dashboard-Modal-Userpassmodal />
              <Dashboard-Modal-Logout />
            </div>
          </div>
        </div>
      </div>
      <!-- end content -->

      <!-- footer -->
      <Dashboard-Footer />
      <!-- end footer -->
    </div>
  </div>
  <!-- end app-root -->
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'nk-body bg-lighter',
    },
  },
  mounted() {
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