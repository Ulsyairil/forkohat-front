<template>
  <div class="container">
    <nav>
      <ul class="breadcrumb text-text-white-50">
        <li class="breadcrumb-item">
          <NuxtLink to="/dashboard">Beranda</NuxtLink>
        </li>
        <li class="breadcrumb-item active">
          <a href="javascript:void(0)">Peran</a>
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
      <h3 class="text-black-50">Peran</h3>
    </div>

    <hr class="divider" />

    <button type="button" class="btn btn-primary mb-3">Tambah Peran</button>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  head: {
    title: "Peran | Dasbor",
  },
};
</script>