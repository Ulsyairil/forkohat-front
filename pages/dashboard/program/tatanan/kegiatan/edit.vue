<template>
  <div class="container">
    <nav>
      <ul class="breadcrumb text-text-white-50">
        <li class="breadcrumb-item">
          <NuxtLink to="/dashboard">Beranda</NuxtLink>
        </li>
        <li class="breadcrumb-item">
          <NuxtLink to="/dashboard/program">Program</NuxtLink>
        </li>
        <li class="breadcrumb-item">
          <NuxtLink
            :to="`/dashboard/program/tatanan?program_id=${this.$route.query.program_id}`"
          >
            Tatanan
          </NuxtLink>
        </li>
        <li class="breadcrumb-item">
          <NuxtLink
            :to="`/dashboard/program/tatanan/kegiatan?program_id=${this.$route.query.program_id}&tatanan_id=${this.$route.query.tatanan_id}`"
          >
            Kegiatan
          </NuxtLink>
        </li>
        <li class="breadcrumb-item active">
          <a href="javascript:void(0)">Ubah</a>
        </li>
      </ul>
    </nav>

    <div class="mt-2 d-flex">
      <a
        href="javascript:void(0)"
        class="align-self-center mr-2"
        @click="previousPage()"
      >
        <em class="icon ni ni-chevron-left-circle" style="font-size: 30px"></em>
      </a>
      <h3 class="text-black-50">Ubah Kegiatan</h3>
    </div>

    <hr class="divider" />

    <img
      src="https://via.placeholder.com/150"
      alt="current-event-picture"
      class="rounded mb-2 zoom"
      style="height: auto; max-width: 300px !important"
    />

    <form id="add-event-form" @submit.prevent="submitForm()">
      <div class="form-group">
        <label class="form-label" for="title">
          Nama Kegiatan
          <span class="text-danger">*</span>
        </label>
        <div class="form-control-wrap">
          <input
            type="text"
            class="form-control"
            id="title"
            maxlength="254"
            required
            data-pristine-required-message="Nama Kegiatan Harus Diisi"
            data-pristine-maxlength-message="Tidak Boleh Lebih Dari 254 Karakter"
            v-model="form.title"
          />
        </div>
      </div>

      <div class="mb-2">
        <label class="form-label">
          Deskripsi Kegiatan
          <span class="text-danger">*</span>
        </label>
        <div id="description-editor" class="bg-white"></div>
      </div>

      <div class="form-group">
        <label class="form-label">Tanggal Registrasi</label>
        <div class="form-control-wrap">
          <div class="input-daterange date-picker-range input-group">
            <input
              type="text"
              class="form-control bg-white"
              id="registration_date"
              v-model="form.registration_date"
              readonly
            />
            <div class="input-group-addon">Sampai</div>
            <input
              type="text"
              class="form-control bg-white"
              id="end_registration_date"
              v-model="form.end_registration_date"
              readonly
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="url-registration">
          URL Registrasi
        </label>
        <div class="form-control-wrap">
          <input
            type="url"
            class="form-control"
            id="url-registration"
            v-model="form.url_registration"
          />
        </div>
      </div>

      <img
        :src="form.previewImage"
        alt="arrangement-picture"
        class="rounded zoom"
        style="height: auto; max-width: 300px !important"
      />

      <button type="button" class="btn btn-primary ml-4" @click="deleteImage()">
        Hapus Gambar
      </button>

      <div class="form-group mt-3">
        <label class="form-label" for="upload-image">
          Unggah Gambar Kegiatan
          <span class="text-danger">*</span>
        </label>
        <div class="form-control-wrap">
          <div class="custom-file" style="z-index: 0">
            <input
              type="file"
              class="custom-file-input"
              id="upload-image"
              accept="image/png, image/jpeg"
              @change="uploadImage($event)"
              required
              data-pristine-required-message="Gambar Harus Diunggah"
            />
            <label class="custom-file-label" for="upload-image">
              Unggah Gambar
            </label>
          </div>
        </div>
        <div class="text-danger help-text">{{ form.imageError }}</div>
      </div>

      <div class="form-group">
        <label class="form-label" for="showed">
          Ditunjukkan
          <span class="text-danger">*</span>
        </label>
        <select class="form-control" id="showed" v-model="form.showed.selected">
          <option
            v-for="(option, index) in form.showed.options"
            :key="index"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">
          Kegiatan Berakhir
          <span class="text-danger">*</span>
        </label>
        <div class="form-control-wrap">
          <input
            type="text"
            class="form-control date-picker bg-white"
            data-date-format="yyyy/mm/dd"
            id="end_date"
            required
            data-pristine-required-message="Kegiatan Berakhir Harus Diisi"
            readonly
            v-model="form.end_date"
          />
        </div>
        <div class="form-note">Format Tanggal <code>yyyy/mm/dd"</code></div>
      </div>

      <button type="submit" class="btn btn-primary">Simpan</button>
      <NuxtLink
        class="btn btn-primary"
        :to="`/dashboard/program/tatanan/kegiatan/berkas?program_id=${$route.query.program_id}&tatanan_id=${$route.query.tatanan_id}&kegiatan_id=${$route.query.id}`"
      >
        Berkas / Gambar
      </NuxtLink>
    </form>

    <hr class="divider" />

    <div class="card card-bordered">
      <div class="card-header border-bottom">Komentar</div>
      <div class="card-inner">
        <div class="row g-0">
          <div class="col-md-12">
            <div class="d-inline-flex">
              <div class="chat-avatar align-self-center">
                <div class="user-avatar sm bg-purple">
                  <span>IH</span>
                </div>
              </div>
              <div class="chat-msg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellendus eligendi voluptatem repudiandae nisi pariatur,
                veritatis id omnis voluptates dignissimos ipsam maxime quibusdam
                odio ad vero esse quo nobis possimus reiciendis?
                <ul class="chat-meta">
                  <li>Iliash Hossain</li>
                  <li>29 Apr, 2020 4:28 PM</li>
                  <li>
                    <a href="javascript:void(0)">
                      <em class="icon ni ni-reply"></em>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <em class="icon ni ni-trash"></em>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="d-inline-flex">
              <div class="user-avatar sm bg-purple align-self-center">
                <span>Y</span>
              </div>
              <div class="chat-msg">
                Aliquip et do cillum excepteur sit deserunt irure aute Lorem
                Lorem adipisicing voluptate.
                <ul class="chat-meta">
                  <li>You</li>
                  <li>29 Apr, 2020 7:28 PM</li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      @click="openEditCommentModal()"
                    >
                      <em class="icon ni ni-edit"></em>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <em class="icon ni ni-trash"></em>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr class="divider" />

        <div class="nk-reply-form">
          <div class="nk-reply-form-header">
            <ul class="nav nav-tabs-s2 nav-tabs nav-tabs-sm">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#reply-form">
                  Balas
                </a>
              </li>
            </ul>
          </div>
          <div class="tab-content">
            <div class="tab-pane active" id="reply-form">
              <div class="nk-reply-form-editor">
                <div class="nk-reply-form-field">
                  <textarea
                    class="form-control form-control-simple no-resize"
                    placeholder="Kirim pesan balas"
                  ></textarea>
                </div>
                <div class="nk-reply-form-tools">
                  <ul class="nk-reply-form-actions g-1">
                    <li class="mr-2">
                      <button class="btn btn-primary" type="submit">
                        Reply
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Content Code -->
        <div class="modal fade" tabindex="-1" id="edit-comment-modal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <a href="#" class="close" data-dismiss="modal" aria-label="Close">
                <em class="icon ni ni-cross"></em>
              </a>
              <div class="modal-header">
                <h5 class="modal-title">Ubah Komentar</h5>
              </div>
              <div class="modal-body">
                <form id="edit-comment-form">
                  <div class="form-group">
                    <label class="form-label" for="comment">Pesan</label>
                    <div class="form-control-wrap">
                      <textarea class="form-control" id="comment"></textarea>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary">Ubah</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Validation from '../../../../../helpers/form-validation'
let quill = null

export default {
  layout: 'dashboard',
  head: {
    title: 'Ubah Kegiatan | Dasbor',
  },
  data() {
    return {
      form: {
        title: '',
        registration_date: '',
        end_registration_date: '',
        url_registration: '',
        image: null,
        previewImage: 'https://via.placeholder.com/150',
        showed: {
          selected: 'public',
          options: [
            {
              value: 'public',
              text: 'Publik',
            },
            {
              value: 'member',
              text: 'Member',
            },
          ],
        },
        end_date: '',
      },
    }
  },
  mounted() {
    //   Validating Form
    Validation('add-event-form')

    // Init Image
    $('#registration_date').datepicker({
      clearBtn: true,
    })
    $('#end_registration_date').datepicker({
      clearBtn: true,
    })
    $('#end_date').datepicker({
      clearBtn: true,
    })

    // Init quill editor
    quill = new Quill('#description-editor', {
      theme: 'snow',
    })
  },
  methods: {
    previousPage() {
      this.$router.go(-1)
    },
    deleteImage() {
      this.form.imageError = ''
      this.form.image = null
      this.form.previewImage = 'https://via.placeholder.com/150'
    },
    uploadImage(event) {
      const file = event.target.files[0]
      if (file != undefined) {
        if (file.type != 'image/png' && file.type != 'image/jpeg') {
          this.deleteImage()
          return (this.form.imageError = 'Tipe Gambar Harus PNG, atau JPG')
        }

        if (file.size > 2097152) {
          this.deleteImage()
          return (this.form.imageError = 'Gambar Tidak Boleh Lebih Dari 2 MB')
        }

        this.form.imageError = ''
        this.form.image = file
        this.form.previewImage = URL.createObjectURL(file)
      }

      if (file === undefined) {
        this.deleteImage()
      }
    },
    async submitForm() {
      const validate = Validation('add-event-form').validate()

      console.log(quill.getContents())

      if (!validate) {
        return
      }
    },
    async openEditCommentModal() {
      $('#edit-comment-modal').modal('show')
    },
  },
}
</script>