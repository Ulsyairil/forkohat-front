<template>
  <div>
    <b-button type="button" variant="primary" @click="$router.back()">
      <font-awesome-icon icon="arrow-left" />
      Kembali
    </b-button>

    <div class="mt-2">
      <h3>Galeri</h3>
      <hr class="border-dark" />
    </div>

    <div class="row pt-2">
      <div class="col-md-4">
        <b-form @submit.prevent="changePage()">
          <b-form-group>
            <b-input-group>
              <b-form-input
                placeholder="Cari"
                v-model="form.search"
              ></b-form-input>
              <b-input-group-append>
                <b-button type="submit" variant="primary">
                  <font-awesome-icon icon="search" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-form>
      </div>

      <div class="col-md-2">
        <b-form-select
          v-model="form.order.selected"
          :options="form.order.options"
          @change="changePage()"
        ></b-form-select>
      </div>

      <div class="col-md-3 mt-3 mt-md-0">
        <b-button
          type="button"
          variant="primary"
          @click="$router.push('/dashboard/gallery/create')"
        >
          Tambah Galeri
          <font-awesome-icon icon="arrow-right" />
        </b-button>
      </div>
    </div>

    <div class="mt-4" v-if="data.length > 0">
      <div class="row">
        <div class="col-md-4 mt-2" v-for="(value, index) in data" :key="index">
          <div class="card">
            <img
              class="card-img-top"
              :src="domain + value.url"
              alt="Card image cap"
            />
            <div class="card-body">
              <b-button
                type="button"
                variant="danger"
                class="trash"
                @click="deletePicture(value.id)"
              >
                <font-awesome-icon icon="trash" size="1x" />
              </b-button>
              <h5 class="card-title">
                {{ value.picture_name }}
              </h5>
              <p class="card-text">
                {{ value.picture_description }}
              </p>
              <p class="card-text">
                <small class="text-muted">
                  {{ value.created_at }}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4" v-if="data.length == 0">
      <h4>Data tidak ditemukan</h4>
    </div>

    <b-pagination-nav
      class="mt-4"
      :link-gen="linkGen"
      :number-of-pages="pagination.lastPage"
      v-model="pagination.currentPage"
      @input="changePage()"
      use-router
      pills
    ></b-pagination-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
      baseurl: this.$config.baseurl,
      domain: this.$config.domain,
      form: {
        search: '',
        order: {
          selected: 'desc',
          options: [
            { value: 'asc', text: 'ASC' },
            { value: 'desc', text: 'DESC' },
          ],
        },
      },
      data: [],
      pagination: {
        currentPage: 1,
        lastPage: 0,
        limit: 12,
      },
    }
  },
  async fetch() {
    try {
      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }

      this.pagination.currentPage = this.pageNow()

      let url
      if (this.auth.user.rule_id == 1) {
        url = `${this.baseurl}/superadmin/galleries`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl}/admin/galleries`
      }

      let payload = {
        page: this.pagination.currentPage,
        limit: this.pagination.limit,
        order: this.form.order.selected,
        search: this.form.search,
      }

      const res = await this.$axios.$post(url, payload, config)
      console.log(res)

      this.pagination.lastPage = res.lastPage
      this.data = res.data
    } catch (error) {
      console.log(error)
      return this.$notify({
        group: 'app',
        type: 'error',
        title: 'Kesalahan pada server',
        text: error,
      })
    }
  },
  methods: {
    async deletePicture(id) {
      try {
        $.LoadingOverlay('show')

        let payload = {
          gallery_id: id,
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
          data: payload,
        }

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/gallery`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/gallery`
        }

        const res = await this.$axios.$delete(url, config)
        console.log(res)

        this.$nuxt.refresh()
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil dihapus',
        })
      } catch (error) {
        $.LoadingOverlay('hide')
        console.log(error)
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    pageNow() {
      if (this.$route.query.page == undefined) {
        return 1
      } else {
        return this.$route.query.page
      }
    },
    changePage() {
      this.$nuxt.refresh()
    },
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  },
}
</script>
