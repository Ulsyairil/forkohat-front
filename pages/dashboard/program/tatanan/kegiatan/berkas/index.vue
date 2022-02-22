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
          <a href="javascript:void(0)">Berkas</a>
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
      <h3 class="text-black-50">Berkas</h3>
    </div>

    <hr class="divider" />

    <NuxtLink
      :to="`/dashboard/program/tatanan/kegiatan/berkas/add?program_id=${this.$route.query.program_id}&tatanan_id=${this.$route.query.tatanan_id}&kegiatan_id=${this.$route.query.kegiatan_id}`"
      class="btn btn-primary mb-3"
    >
      Tambah Berkas
    </NuxtLink>

    <div class="row">
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
    </div>

    <div class="row mt-2">
      <div class="col-md-4 d-flex" v-for="(value, index) in files" :key="index">
        <div class="card card-bordered text-black-50 m-2 flex-fill">
          <div class="position-absolute container-fluid p-0 text-right">
            <button type="button" class="btn btn-sm btn-danger">
              <em class="icon ni ni-cross"></em>
            </button>
          </div>
          <div class="card-inner">
            <div class="row">
              <div class="col text-center">
                <img
                  :src="value.image"
                  class="img-fluid zoom"
                  style="height: auto; max-width: 100px"
                />
              </div>
              <div class="col">
                <span class="text-black-50" style="font-size: 12px">{{
                  value.title
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav class="mt-3">
      <ul class="pagination justify-content-center">
        <li :class="`page-item ${activePage(1)}`" style="z-index: 0">
          <NuxtLink
            class="page-link disabled"
            :to="`?id=${this.$route.query.id}`"
          >
            1
          </NuxtLink>
        </li>
        <li :class="`page-item ${activePage(2)}`" style="z-index: 0">
          <NuxtLink
            class="page-link disabled"
            :to="`?id=${this.$route.query.id}&page=2`"
          >
            2
          </NuxtLink>
        </li>
        <li :class="`page-item ${activePage(3)}`" style="z-index: 0">
          <NuxtLink
            class="page-link disabled"
            :to="`?id=${this.$route.query.id}&page=3`"
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
      files: [
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