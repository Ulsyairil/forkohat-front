<template>
  <div class="mb-5 mt-4">
    <div v-if="faqs.data.length > 0">
      <div class="text-center">
        <h2>Frequently Asked Question</h2>
        <hr style="height: 5px; width: 100px" class="bg-azure" />

        <div class="hk-row mt-5">
          <div class="col-xl-5">
            <div class="card">
              <h6 class="card-header">Category</h6>
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item d-flex align-items-left"
                  v-for="(value, index) in faqs.data"
                  :key="index"
                  :class="{ 'active': activeIndex === index}"
                  @click="setActive(index)"
                >
                  <a data-toggle="tab" :href="'#tabItem' + value.id" :class="{ 'text-white': activeIndex === index}">
                    <font-awesome-icon icon="archway" class="mr-15" />
                    {{ value.name }}
                    <span class="badge badge-light badge-pill ml-15">06</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xl-7">
            <div class="tab-content">
              <div
                :class="{ 'active': activeIndex === index}"
                class="tab-pane"
                :id="'tabItem' + value.id"
                v-for="(value, index) in faqs.data"
                :key="index"
              >
                <div class="card card-lg">
                  <h3 class="card-header border-bottom-0">
                    {{ value.name }}
                  </h3>
                  <div
                    class="accordion accordion-type-2 accordion-flush"
                    :id="'accordion' + index"
                  >
                    <div
                      class="card"
                      v-for="(valueT, indexT) in value.faqTopics"
                      :key="indexT"
                    >
                      <div class="card-header d-flex justify-content-between">
                        <a
                        class="collapsed"
                          role="button"
                          data-toggle="collapse"
                          :href="'#collapse_' + valueT.id + 'i'"
                          aria-expanded="false"
                          >{{ valueT.title }}</a
                        >
                      </div>
                      <div
                        :id="'collapse_' + valueT.id + 'i'"
                        class="collapse"
                        :data-parent="'#accordion' + index"
                        role="tabpanel"
                      >
                        <div class="card-body text-left pa-15">
                          {{ valueT.description }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="faqs.data.length == 0">
      <h4>Data tidak ditemukan</h4>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background: #f5f5f6;
  margin-top: 20px;
}
/*Faq*/

.faq-search-wrap {
  padding: 50px 0 60px;
}

.faq-search-wrap .form-group .form-control,
.faq-search-wrap .form-group .dd-handle {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.faq-search-wrap .form-group .input-group-append {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  pointer-events: none;
}

.faq-search-wrap .form-group .input-group-append .input-group-text {
  background: transparent;
  border: none;
}

.faq-search-wrap
  .form-group
  .input-group-append
  .input-group-text
  .feather-icon
  > svg {
  height: 18px;
  width: 18px;
}
.bg-teal-light-3 {
  background-color: #7fcdc1 !important;
}

.hk-row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
}

@media (min-width: 576px) {
  .mt-sm-60 {
    margin-top: 60px !important;
  }
}
.mt-30 {
  margin-top: 30px !important;
}

.list-group-item.active {
  background-color: #00acf0;
  border-color: #00acf0;
}
.accordion .card .card-header.activestate {
  border-width: 1px;
}
.accordion .card .card-header {
  padding: 0;
  border-width: 0;
}
.card.card-lg .card-header,
.card.card-lg .card-footer {
  padding: 0.9rem 1.5rem;
}
.accordion > .card .card-header {
  margin-bottom: -1px;
}
.card .card-header {
  background: transparent;
  border: none;
}
.accordion.accordion-type-2 .card .card-header > a.collapsed {
  color: #324148;
}
.accordion .card:first-of-type .card-header:first-child > a {
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
}
.accordion.accordion-type-2 .card .card-header > a {
  background: transparent;
  color: #00acf0;
  padding-left: 50px;
}
.accordion .card .card-header > a.collapsed {
  color: #324148;
  background: transparent;
}
.accordion .card .card-header > a {
  background: #00acf0;
  color: #fff;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  display: block;
  width: 100%;
  text-align: left;
  position: relative;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
a {
  color: black;
  font-weight: 500;
  text-decoration: none;
  -webkit-transition: color 0.2s ease;
  -moz-transition: color 0.2s ease;
  transition: color 0.2s ease;
}

a:hover {
  text-decoration: none;
}

.badge.badge-pill {
  border-radius: 50px;
}
.badge.badge-light {
  background: #eaecec;
  color: #324148;
}
.badge {
  font-weight: 500;
  border-radius: 4px;
  padding: 5px 7px;
  font-size: 72%;
  letter-spacing: 0.3px;
  vertical-align: middle;
  display: inline-block;
  text-align: center;
  text-transform: capitalize;
}
.ml-15 {
  margin-left: 15px !important;
}

.accordion.accordion-type-2 .card .card-header > a.collapsed:after {
  content: '\f067';
}

.accordion.accordion-type-2 .card .card-header > a::after {
  display: inline-block;
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  content: '\f068';
  speak: none;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: auto;
  position: absolute;
  font-size: 21px;
  top: 15px;
  left: 20px;
}

.mr-15 {
  margin-right: 15px !important;
}
</style>

<script>
export default {
  data() {
    return {
      baseurl: this.$config.baseurl,
      domain: this.$config.domain,
      faqs: {
        data: [],
      },
      activeIndex: 0
    }
  },
  async fetch() {
    try {
      let url
      url = `${this.baseurl}/faq`

      const res = await this.$axios.$get(url)
      console.log(res)

      this.faqs.data = res
      console.log(this.faqs)
    } catch (error) {
      console.log(error)
      return this.$notify({
        group: 'app',
        type: 'error',
        title: 'Kesalahan pada server',
        text: error,
      })
    }
  },methods: {
  	setActive(index) { this.activeIndex = index }
  }
}
</script>
