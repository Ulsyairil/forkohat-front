<template>
  <div>
    <div class="mb-3 mt-3">
      <b-form @submit.prevent="searchForm()">
        <b-row>
          <b-col align-self="end">
            <b-form-group label="Cari">
              <b-input-group>
                <b-form-input
                  class="form-control"
                  placeholder="Cari..."
                  v-model="order_stuff.search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button type="submit" variant="primary">
                    <font-awesome-icon icon="search" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col align-self="end">
            <div class="form-group">
              <label for="input-showed">Ditunjukkan</label>
              <b-form-select
                id="input-showed"
                v-model="order_stuff.showed.selected"
                :options="order_stuff.showed.options"
                required
                data-pristine-required-message="Harus diisi"
                @change="searchForm()"
              ></b-form-select>
            </div>
          </b-col>
          <b-col align-self="end">
            <div class="form-group">
              <label for="input-trash">Sampah</label>
              <b-form-select
                id="input-trash"
                v-model="order_stuff.trash.selected"
                :options="order_stuff.trash.options"
                required
                data-pristine-required-message="Harus diisi"
                @change="searchForm()"
              ></b-form-select>
            </div>
          </b-col>
        </b-row>
      </b-form>

      <div v-if="order_stuff.data.length > 0">
        <div class="row align-self-stretch">
          <div
            class="col-md-4 mb-4 mb-md-0"
            v-for="(value, index) in order_stuff.data"
            :key="index"
          >
            <b-card no-body class="overflow-auto shadow h-100">
              <b-row no-gutters>
                <b-card-body :title="value.name" :sub-title="value.users.name">
                  <b-button
                    v-if="value.user_id === auth.user.id"
                    type="button"
                    variant="warning"
                    @click="redirectEditPage(value.id)"
                    class="m-0"
                    v-b-tooltip.hover
                    title="Ubah"
                  >
                    <font-awesome-icon icon="edit" />
                  </b-button>
                  <b-button
                    v-for="(valueFile, indexFile) in value.orderStuffFiles"
                    :key="indexFile"
                    class="_df_button"
                    variant="primary"
                    :source="domain + valueFile.url"
                    v-b-tooltip.hover
                    title="Lihat Berkas"
                  >
                    <font-awesome-icon icon="search-plus" />
                  </b-button>
                  <b-button
                    type="button"
                    variant="warning"
                    v-b-tooltip.hover
                    title="Hapus"
                    v-if="
                      value.deleted_at == null && value.user_id === auth.user.id
                    "
                    @click="dumpOrderStuff(value.id)"
                  >
                    <font-awesome-icon icon="trash" />
                  </b-button>
                  <b-button
                    type="button"
                    variant="warning"
                    v-b-tooltip.hover
                    title="Pulihkan"
                    v-if="
                      value.deleted_at != null && value.user_id === auth.user.id
                    "
                    @click="restoreOrderStuff(value.id)"
                  >
                    <font-awesome-icon icon="trash-restore" />
                  </b-button>

                  <b-button
                    type="button"
                    variant="danger"
                    v-b-tooltip.hover
                    title="Hapus Permanen"
                    v-if="value.user_id === auth.user.id"
                    @click="deleteOrderStuff(value.id)"
                  >
                    <font-awesome-icon icon="ban" />
                  </b-button>
                </b-card-body>
              </b-row>
            </b-card>
          </div>
        </div>

        <b-pagination-nav
          class="mt-4"
          :link-gen="linkGen"
          :number-of-pages="order_stuff.pages"
          v-model="order_stuff.currentPage"
          @input="changePage()"
          use-router
          pills
        ></b-pagination-nav>
      </div>

      <div v-if="order_stuff.data.length == 0">
        <h4>Data tidak ditemukan</h4>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card-img {
  width: 100%;
  height: 20vw;
  object-fit: cover;
}

@media (max-width: 767px) {
  .card-img {
    height: 50vw;
  }
}
</style>

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
      order_stuff: {
        pages: '',
        currentPage: 0,
        perPage: 10,
        total: 0,
        search: '',
        showed: {
          selected: 'private',
          options: [
            {
              value: 'private',
              text: 'Pribadi',
            },
            {
              value: 'member',
              text: 'Anggota',
            },
            {
              value: 'public',
              text: 'Umum',
            },
          ],
        },
        trash: {
          selected: 0,
          options: [
            {
              value: 0,
              text: 'Tidak',
            },
            {
              value: 1,
              text: 'Ya',
            },
          ],
        },
        data: [],
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

      this.order_stuff.currentPage = this.pageNow()

      let url
      url = `${this.baseurl}/employee/order/stuffs`

      let payload = {
        order_id: this.$route.params.id,
        page: this.order_stuff.currentPage,
        limit: this.order_stuff.perPage,
        search: this.order_stuff.search,
        showed: this.order_stuff.showed.selected,
        trash: this.order_stuff.trash.selected,
      }

      console.log(payload)

      const res = await this.$axios.$post(url, payload, config)
      console.log(res)

      this.order_stuff.pages = res.lastPage
      this.order_stuff.total = res.total
      this.order_stuff.data = res.data
      console.log(this.order_stuff)
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
    async searchForm() {
      this.$nuxt.refresh()
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
    redirectEditPage(id) {
      return this.$router.push(
        `/dashboard/order/list/edit/${id}?order_id=${this.$route.params.id}`
      )
    },
    async deleteOrderStuff(order_stuff_id) {
      try {
        let url
        $.LoadingOverlay('show')

        url = `${this.baseurl}/employee/order/stuff`

        let payload = {
          id: order_stuff_id,
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
          data: payload,
        }

        const data = await this.$axios.$delete(url, config)
        console.log(data)

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil dihapus permanen',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Gagal hapus permanen',
          text: error,
        })
      }
    },
    async restoreOrderStuff(order_stuff_id) {
      try {
        let url
        $.LoadingOverlay('show')

        url = `${this.baseurl}/employee/order/stuff/restore`

        let payload = {
          id: order_stuff_id,
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        const data = await this.$axios.$put(url, payload, config)
        console.log(data)

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil dipulihkan',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Gagal dipulihkan',
          text: error,
        })
      }
    },
    async dumpOrderStuff(order_stuff_id) {
      try {
        let url
        $.LoadingOverlay('show')

        url = `${this.baseurl}/employee/order/stuff/dump`

        let payload = {
          id: order_stuff_id,
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        const data = await this.$axios.$put(url, payload, config)
        console.log(data)

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil dihapus',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Gagal dihapus',
          text: error,
        })
      }
    },
  },
}
</script>
