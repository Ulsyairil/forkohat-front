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
        <li class="breadcrumb-item active">
          <a href="javascript:void(0)">Kegiatan</a>
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
      <h3 class="text-black-50">Kegiatan</h3>
    </div>

    <hr class="divider" />

    <NuxtLink
      :to="`/dashboard/program/tatanan/kegiatan/add?program_id=${this.$route.query.program_id}&tatanan_id=${this.$route.query.tatanan_id}`"
      class="btn btn-primary mb-3"
    >
      Tambah Kegiatan
    </NuxtLink>

    <div class="row">
      <div class="col-md-3">
        <div class="form-group m-2">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <em class="icon ni ni-account-setting"></em>
              </span>
            </div>
            <select class="form-control">
              <option value="public" selected>Publik</option>
              <option value="member">Member</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group m-2">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <em class="icon ni ni-sort-v"></em>
              </span>
            </div>
            <select class="form-control">
              <option value="desc" selected>Terbaru</option>
              <option value="asc">Terlama</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group m-2">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <em class="icon ni ni-view-grid"></em>
              </span>
            </div>
            <select class="form-control">
              <option value="9" selected>9</option>
              <option value="27">27</option>
              <option value="45">45</option>
              <option value="90">90</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group m-2">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <em class="icon ni ni-trash"></em>
              </span>
            </div>
            <select class="form-control">
              <option value="false" selected>Tidak</option>
              <option value="true">Ya</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="form-group m-2">
          <div class="form-control-wrap">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <em class="icon ni ni-search"></em>
                </span>
              </div>
              <input type="text" class="form-control" placeholder="Cari" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <div
        class="col-md-4 d-flex"
        v-for="(value, index) in arrangements"
        :key="index"
      >
        <div class="card card-bordered text-black-50 m-2 flex-fill">
          <div class="text-center mt-4">
            <img
              :src="value.image"
              class="card-img-top"
              style="height: auto; max-width: 200px"
            />
          </div>
          <div class="card-inner text-center">
            <h5 class="card-title">{{ value.title }}</h5>
            <div>
              <NuxtLink
                class="btn btn-sm btn-primary"
                :to="`/dashboard/program/tatanan/kegiatan/edit?id=${
                  index + 1
                }&program_id=${$route.query.program_id}&tatanan_id=${
                  $route.query.tatanan_id
                }`"
              >
                <em class="icon ni ni-edit"></em>
              </NuxtLink>
              <button type="button" class="btn btn-sm btn-warning">
                <em class="icon ni ni-trash"></em>
              </button>
              <button type="button" class="btn btn-sm btn-danger">
                <em class="icon ni ni-cross-round"></em>
              </button>

              <div class="mt-2">
                <NuxtLink
                  class="btn btn-sm btn-primary"
                  :to="`/dashboard/program/tatanan/kegiatan/berkas?program_id=${
                    $route.query.program_id
                  }&tatanan_id=${$route.query.tatanan_id}&kegiatan_id=${
                    index + 1
                  }`"
                >
                  Berkas / Gambar
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav class="mt-3">
      <ul class="pagination justify-content-center">
        <li :class="`page-item ${activePage(1)}`">
          <NuxtLink
            class="page-link disabled"
            :to="`?program_id=${this.$route.query.program_id}&tatanan_id=${this.$route.query.tatanan_id}`"
          >
            1
          </NuxtLink>
        </li>
        <li :class="`page-item ${activePage(2)}`">
          <NuxtLink
            class="page-link disabled"
            :to="`?program_id=${this.$route.query.program_id}&tatanan_id=${this.$route.query.tatanan_id}&page=2`"
          >
            2
          </NuxtLink>
        </li>
        <li :class="`page-item ${activePage(3)}`">
          <NuxtLink
            class="page-link disabled"
            :to="`?program_id=${this.$route.query.program_id}&tatanan_id=${this.$route.query.tatanan_id}&page=3`"
          >
            3
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  head: {
    title: 'Kegiatan | Dasbor',
  },
  data() {
    return {
      arrangements: [
        {
          title: 'Minim culpa labore aliquip velit non elit fugiat magna.',
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Minim culpa labore aliquip velit non elit fugiat magna.',
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Minim culpa labore aliquip velit non elit fugiat magna.',
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Minim culpa labore aliquip velit non elit fugiat magna.',
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Minim culpa labore aliquip velit non elit fugiat magna.',
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Minim culpa labore aliquip velit non elit fugiat magna.',
          image: 'https://via.placeholder.com/150',
        },
      ],
    }
  },
  mounted() {},
  methods: {
    activePage(page) {
      if (this.$route.query.page === String(page)) {
        return 'active'
      }

      if (this.$route.query.page === undefined && page === 1) {
        return 'active'
      }
    },
    previousPage() {
      this.$router.go(-1)
    },
  },
}
</script>