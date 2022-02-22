<template>
  <!-- app-root -->
  <div class="nk-app-root">
    <div class="nk-main">
      <div class="nk-wrap nk-wrap-nosidebar">
        <!-- content -->
        <div class="nk-content">
          <Nuxt />

          <!-- footer -->
          <Auth-Footer />
          <!-- end footer -->
        </div>
        <!-- end content -->
      </div>
    </div>
  </div>
  <!-- end app-root -->
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'nk-body bg-white npc-general pg-auth',
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