<template>
  <footer class="footer text-white">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <span class="font-footer"
            >&copy; {{ year }} FORKOHAT BALIKPAPAN
          </span>
        </div>

        <div class="col-6 text-right">
          <a href="javascript:void(0)">
            <font-awesome-icon
              class="text-white mr-1 ml-1"
              :icon="['fab', 'facebook']"
              size="lg"
            />
          </a>
          <a href="javascript:void(0)">
            <font-awesome-icon
              class="text-white mr-1 ml-1"
              :icon="['fab', 'instagram']"
              size="lg"
            />
          </a>
          <a href="javascript:void(0)">
            <font-awesome-icon
              class="text-white mr-1 ml-1"
              :icon="['fab', 'twitter']"
              size="lg"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #007bff;
}

.font-footer {
  font-weight: bold;
  font-size: 12pt;
}

@media only screen and (max-width: 425px) {
  .font-footer {
    font-weight: bold;
    font-size: 11px;
  }
}

@media only screen and (max-width: 375px) {
  .font-footer {
    font-weight: bold;
    font-size: 10px;
  }
}
</style>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      year: '',
    }
  },
  mounted() {
    this.getYear
  },
  computed: {
    getYear() {
      return (this.year = moment().year())
    },
  },
}
</script>
