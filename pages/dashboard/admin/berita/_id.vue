<template>
  <v-container fluid>
    <v-card elevation="3">
      <v-card-title>
        <v-btn color="primary" @click="$router.go(-1)" fab small>
          <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-breadcrumbs :items="breadCrumbs"></v-breadcrumbs>
      </v-card-title>

      <v-container>
        <v-form ref="news_form" @submit.prevent="editNews()" lazy-validation>
          <div class="d-flex align-center">
            <img
              v-if="news.file.preview != null"
              :src="news.file.preview"
              style="max-width: 200px; cursor: zoom-in"
              @click="showImg(0, news.file.preview)"
            />
            <img
              v-else
              :src="news.file.previewBefore"
              style="max-width: 200px; cursor: zoom-in"
              @click="showImg(0, news.file.previewBefore)"
            />
            <v-file-input
              label="Thumbnail Berita"
              v-model="news.file.value"
              :accept="news.file.accept"
              :rules="[validation.fileSize]"
              @change="previewImage()"
              show-size
            ></v-file-input>
          </div>

          <v-text-field
            label="Judul Berita"
            v-model="news.title"
            :rules="[validation.required, validation.maxTextDefault]"
          ></v-text-field>

          <ckeditor
            class="mb-4"
            v-model="news.editor.content"
            :config="news.editor.config"
          ></ckeditor>

          <div>
            <v-btn type="submit" color="primary" @click.prevent="editNews()"
              >Simpan</v-btn
            >
          </div>
        </v-form>
      </v-container>
    </v-card>

    <v-card class="mt-5">
      <v-card-title> Komentar </v-card-title>
    </v-card>

    <v-card class="mt-5">
      <v-card-title> Komentar </v-card-title>

      <v-container>
        <v-form ref="comment_form" lazy-validation>
          <v-text-field
            v-model="commentBox.value"
            label="Masukkan Komentar"
            outlined
            append-outer-icon="send"
            @keyup.enter="submitComment()"
            @click:append-outer="submitComment()"
            clearable
            @click:clear="clearComment()"
            :rules="[validation.required]"
          />
        </v-form>
      </v-container>

      <v-container>
        <v-data-iterator
          :items="newsCommentData.data"
          :items-per-page.sync="limit"
          :page.sync="page"
          :server-items-length="newsCommentData.total"
          @update:items-per-page="$fetch()"
          @update:page="$fetch()"
          no-data-text="Data Kosong"
          no-results-text="Data Tidak Ditemukan"
        >
          <template v-slot:default="props">
            <div
              style="background-color: rgb(200, 200, 200); border-radius: 12pt"
            >
              <v-row
                v-for="(item, index) in props.items"
                :key="index"
                class="pa-3"
                no-gutters
              >
                <v-col
                  v-if="userLoggedIn.id != item.user_id"
                  cols="12"
                  sm="12"
                  md="6"
                  lg="6"
                >
                  <v-card
                    color="white"
                    style="
                      height: auto;
                      white-space: normal;
                      border-radius: 10px;
                      color: white;
                    "
                    class="pa-4 mb-3 flex-column"
                  >
                    <v-container fluid class="pa-0">
                      <div>
                        <span class="subtitle-2">{{ item.User.fullname }}</span>
                        |
                        {{ item.updated_at }}
                      </div>
                      <v-card-text class="pa-0">
                        {{ item.comment }}
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-icon color="red">delete_forever</v-icon>
                      </v-card-actions>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col v-else cols="12" offset-md="6" sm="12" md="6" lg="6">
                  <v-card
                    color="primary"
                    style="
                      height: auto;
                      white-space: normal;
                      border-radius: 10px;
                      color: white;
                    "
                    class="pa-4 mb-3 text--white"
                  >
                    <v-container fluid class="pa-0">
                      <div>
                        <span class="subtitle-2">{{ item.User.fullname }}</span>
                        |
                        {{ item.updated_at }}
                      </div>
                      <v-card-text class="pa-0">
                        {{ item.comment }}
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-icon
                          class="mx-4"
                          color="orange"
                          @click="getComment(item.id)"
                          >edit</v-icon
                        >
                        <v-icon color="red" @click="destroyComment(item.id)"
                          >delete_forever</v-icon
                        >
                      </v-card-actions>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>

    <vue-easy-lightbox
      :visible="lightBox.visible"
      :imgs="lightBox.img"
      :index="lightBox.index"
      @hide="handleHideImg()"
      :moveDisabled="true"
    ></vue-easy-lightbox>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  layout: 'dashboard',
  head() {
    return {
      title: this.titlePage,
    }
  },
  data() {
    return {
      titlePage: 'Ubah Berita',
      breadCrumbs: [
        {
          text: 'Daftar Berita',
          disabled: false,
          href: '/dashboard/admin/berita',
        },
        {
          text: '',
          disabled: false,
          href: '',
        },
      ],
      news: {
        title: '',
        editor: {
          content: '',
          config: {
            toolbarGroups: [
              { name: 'document', groups: ['mode', 'document', 'doctools'] },
              { name: 'clipboard', groups: ['clipboard', 'undo'] },
              {
                name: 'editing',
                groups: ['find', 'selection', 'spellchecker', 'editing'],
              },
              { name: 'forms', groups: ['forms'] },
              { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
              { name: 'links', groups: ['links'] },
              { name: 'insert', groups: ['insert'] },
              '/',
              {
                name: 'paragraph',
                groups: [
                  'list',
                  'indent',
                  'blocks',
                  'align',
                  'bidi',
                  'paragraph',
                ],
              },
              { name: 'styles', groups: ['styles'] },
              { name: 'colors', groups: ['colors'] },
              { name: 'tools', groups: ['tools'] },
              { name: 'others', groups: ['others'] },
              { name: 'about', groups: ['about'] },
            ],
            removeButtons:
              'Templates,Save,Source,NewPage,Preview,Print,ImageButton,HiddenField,Button,Select,Form,Checkbox,Radio,TextField,Textarea,Image,Flash,Iframe,About,ShowBlocks',
          },
        },
        file: {
          value: null,
          preview: null,
          previewBefore:
            'https://via.placeholder.com/1366x768?text=Unggah+Gambar',
          accept: 'image/png, image/jpeg, image/jpg',
        },
      },
      commentBox: {
        id: null,
        value: '',
      },
      lightBox: {
        index: 0,
        img: '',
        visible: false,
      },
      validation: {
        requiredFile: (v) => {
          if (!v) {
            return 'File harus diunggah'
          }

          return true
        },
        fileSize: (v) => {
          if (v) {
            if (v.size > 1048576) {
              return 'Maksimal ukuran file 1 MB'
            }
          }

          return true
        },
        required: (v) => {
          if (!v) {
            return 'Harus diisi'
          }

          return true
        },
        maxTextDefault: (v) => {
          if (v) {
            if (v.length > 254) {
              return 'Maksimal 254 karakter'
            }
          }

          return true
        },
      },
    }
  },
  computed: {
    newsId: {
      get() {
        return this.$store.state.admin.newsComment.pagination.news_id
      },
      set(newValue) {
        this.$store.commit(
          'admin/newsComment/exportPaginationEventId',
          newValue
        )
      },
    },
    page: {
      get() {
        return this.$store.state.admin.newsComment.pagination.page
      },
      set(newValue) {
        this.$store.commit('admin/newsComment/exportPaginationPage', newValue)
      },
    },
    limit: {
      get() {
        return this.$store.state.admin.newsComment.pagination.limit
      },
      set(newValue) {
        this.$store.commit('admin/newsComment/exportPaginationLimit', newValue)
      },
    },
    order: {
      get() {
        return this.$store.state.admin.newsComment.pagination.order
      },
      set(newValue) {
        this.$store.commit('admin/newsComment/exportPaginationOrder', newValue)
      },
    },
    newsCommentData() {
      return this.$store.state.admin.newsComment.pagination.data
    },
    userLoggedIn() {
      return this.$auth.user
    },
  },
  methods: {
    serverBaseUrl() {
      return process.env.serverBaseUrl
    },
    previewImage() {
      if (this.news.file.value != null) {
        this.news.file.preview = URL.createObjectURL(this.news.file.value)
      } else {
        this.news.file.preview = null
      }
    },
    showImg(index = Number, img = String) {
      this.lightBox.index = index
      this.lightBox.img = img
      this.lightBox.visible = true
    },
    handleHideImg() {
      this.lightBox.visible = false
    },
    async editNews() {
      const validate = this.$refs.news_form.validate()

      console.log(validate)

      if (validate) {
        const payload = {
          id: this.$route.params.id,
          title: this.news.title,
          content: this.news.editor.content,
        }

        if (this.news.file.value) {
          payload.image = this.news.file.value
        }

        const response = await this.$store.dispatch('admin/news/edit', payload)

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Berita berhasil diubah',
            })

            this.$fetch()
            break

          default:
            Swal.fire({
              icon: 'error',
              titleText: response.data.message,
            })
            break
        }
      }
    },
    async submitComment() {
      let validate = this.$refs.comment_form.validate()

      console.log(validate)

      let id = this.commentBox.id
      let value = this.commentBox.value

      if (id == null && value != '') {
        const payload = {
          news_id: this.$route.params.id,
          comment: value,
        }

        const response = await this.$store.dispatch(
          'admin/newsComment/create',
          payload
        )

        console.log(response)

        switch (response.status) {
          case 200:
            this.$fetch()
            break

          default:
            Swal.fire({
              icon: 'error',
              titleText: response.data.message,
            })
            break
        }
      }

      if (id != null && value != '') {
        const payload = {
          id: id,
          news_id: this.$route.params.id,
          comment: value,
        }

        const response = await this.$store.dispatch(
          'admin/newsComment/edit',
          payload
        )

        console.log(response)

        switch (response.status) {
          case 200:
            this.$fetch()
            break

          default:
            Swal.fire({
              icon: 'error',
              titleText: response.data.message,
            })
            break
        }
      }
    },
    async getComment(id) {
      const response = await this.$store.dispatch('admin/newsComment/get', id)

      switch (response.status) {
        case 200:
          let data = response.data
          this.commentBox.id = data.id
          this.commentBox.value = data.comment
          break

        default:
          Swal.fire({
            icon: 'error',
            titleText: response.data.message,
          })
          break
      }
    },
    clearComment() {
      this.commentBox.id = null
      this.commentBox.value = ''
      this.$refs.comment_form.resetValidation()
    },
    async destroyComment(id) {
      const notif = await Swal.fire({
        icon: 'question',
        titleText: 'Apakah anda yakin ?',
        confirmButtonText: 'Hapus!',
        confirmButtonColor: 'success',
        showCancelButton: true,
        cancelButtonText: 'Batal',
      })

      if (notif.isConfirmed) {
        const response = await this.$store.dispatch(
          'admin/newsComment/destroy',
          id
        )

        console.log(response)

        switch (response.status) {
          case 200:
            this.$fetch()

            Swal.fire({
              icon: 'success',
              titleText: 'Komentar berhasil dihapus',
            })
            break

          default:
            Swal.fire({
              icon: 'error',
              titleText: response.data.message,
            })
            break
        }
      }
    },
  },
  async fetch() {
    const responseGetNews = await this.$store.dispatch(
      'admin/news/get',
      this.$route.params.id
    )

    switch (responseGetNews.status) {
      case 200:
        let data = responseGetNews.data
        this.news.file.previewBefore = this.serverBaseUrl() + data.image_url
        this.news.title = data.title
        this.news.editor.content = data.content

        this.breadCrumbs[1].text = data.title

        this.$refs.news_form.resetValidation()
        break

      default:
        this.$nuxt.error({
          statusCode: 500,
          message: responseGetNews.data.message,
        })
        break
    }

    await this.$store.dispatch('admin/newsComment/pagination', {
      news_id: this.$route.params.id,
      page: this.page,
      limit: this.limit,
      order: this.order,
      search: this.search,
    })
  },
}
</script>
