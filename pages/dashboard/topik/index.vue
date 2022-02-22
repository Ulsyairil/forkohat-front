<template>
  <div class="container">
    <nav>
      <ul class="breadcrumb text-text-white-50">
        <li class="breadcrumb-item">
          <NuxtLink to="/dashboard">Beranda</NuxtLink>
        </li>
        <li class="breadcrumb-item active">
          <a href="javascript:void(0)">Topik</a>
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
      <h3 class="text-black-50">Topik Pertanyaan</h3>
    </div>

    <hr class="divider" />

    <button
      type="button"
      class="btn btn-primary mb-3"
      data-toggle="modal"
      data-target="#add-topic-faq-modal"
    >
      Tambah Topik Pertanyaan
    </button>

    <div class="modal fade zoom" tabindex="-1" id="add-topic-faq-modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <a href="#" class="close" data-dismiss="modal" aria-label="Close">
            <em class="icon ni ni-cross"></em>
          </a>
          <div class="modal-header">
            <h5 class="modal-title">Tambah Topik Pertanyaan</h5>
          </div>
          <div class="modal-body">
            <form id="add-topic-faq-form" @submit.prevent="submitAddTopicFaq()">
              <div class="form-group">
                <label for="topic-name">Topik Pertanyaan</label>
                <div class="form-form-control-wrap">
                  <input
                    class="form-control"
                    type="text"
                    maxlength="254"
                    required
                    data-pristine-required-message="Topik Pertanyaan Harus Diisi"
                    data-pristine-maxlength-message="Tidak Boleh Lebih Dari 254 Karakter"
                  />
                </div>
              </div>

              <button type="submit" class="btn btn-primary">Simpan</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
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
      <div class="col-md-3 mt-2 mt-md-0">
        <div class="form-group">
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
      <div class="col-md-2 mt-2 mt-md-0">
        <div class="form-group">
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

    <div class="mt-2">
      <div class="row">
        <div
          class="col-md-4 d-flex"
          v-for="(value, index) in faqs"
          :key="index"
        >
          <div class="card card-bordered text-black-50 m-2 flex-fill">
            <div class="card-inner text-center">
              <h5 class="card-title">
                {{ value.title }}
              </h5>
              <div>
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click="showEditModal(index)"
                >
                  <em class="icon ni ni-edit"></em>
                </button>
                <button type="button" class="btn btn-sm btn-danger">
                  <em class="icon ni ni-cross-round"></em>
                </button>
              </div>

              <div class="mt-2">
                <NuxtLink
                  class="btn btn-sm btn-primary"
                  :to="`/dashboard/topik/list?id=${index + 1}`"
                >
                  Pertanyaan
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade zoom" tabindex="-1" id="edit-topic-faq-modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <a href="#" class="close" data-dismiss="modal" aria-label="Close">
            <em class="icon ni ni-cross"></em>
          </a>
          <div class="modal-header">
            <h5 class="modal-title">Ubah Topik Pertanyaan</h5>
          </div>
          <div class="modal-body">
            <form id="edit-topic-faq-form" @submit.prevent="editAddTopicFaq()">
              <input type="hidden" v-model="edit.id" />
              <div class="form-group">
                <label for="topic-name">Topik Pertanyaan</label>
                <div class="form-form-control-wrap">
                  <input
                    class="form-control"
                    type="text"
                    maxlength="254"
                    required
                    data-pristine-required-message="Topik Pertanyaan Harus Diisi"
                    data-pristine-maxlength-message="Tidak Boleh Lebih Dari 254 Karakter"
                    v-model="edit.title"
                  />
                </div>
              </div>

              <button type="submit" class="btn btn-primary">Simpan</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <nav class="mt-3">
      <ul class="pagination justify-content-center">
        <li :class="`page-item ${activePage(1)}`">
          <NuxtLink class="page-link disabled" to="/dashboard/topik">
            1
          </NuxtLink>
        </li>
        <li :class="`page-item ${activePage(2)}`">
          <NuxtLink class="page-link disabled" to="/dashboard/topik?page=2">
            2
          </NuxtLink>
        </li>
        <li :class="`page-item ${activePage(3)}`">
          <NuxtLink class="page-link disabled" to="/dashboard/topik?page=3">
            3
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Validation from "../../../helpers/form-validation";

export default {
  layout: "dashboard",
  head: {
    title: "Topik Pertanyaan | Dasbor",
  },
  data() {
    return {
      faqs: [
        {
          title:
            "Fugiat nulla amet eu nostrud cupidatat amet occaecat nulla deserunt deserunt.",
        },
        {
          title: "In do id nulla ullamco cillum aliquip sint.",
        },
        {
          title: "Nostrud id dolor velit id cupidatat nulla et cupidatat.",
        },
        {
          title: "Consequat exercitation ea reprehenderit Lorem.",
        },
        {
          title:
            "Cillum aliquip irure dolor reprehenderit ea ea qui aute officia aliqua duis.",
        },
        {
          title:
            "Nulla laboris exercitation voluptate voluptate laborum velit adipisicing non culpa.",
        },
      ],
      edit: {
        id: "",
        title: "",
      },
    };
  },
  mounted() {
    Validation("add-topic-faq-form");
    Validation("edit-topic-faq-form");

    $("#add-topic-faq-modal").on("hidden.bs.modal", function () {
      Validation("add-topic-faq-form").reset();
    });
  },
  methods: {
    activePage(page) {
      if (this.$route.query.page === String(page)) {
        return "active";
      }

      if (this.$route.query.page === undefined && page === 1) {
        return "active";
      }
    },
    previousPage() {
      this.$router.go(-1);
    },
    submitAddTopicFaq() {
      const validate = Validation("add-topic-faq-form").validate();

      if (!validate) {
        return;
      }
    },
    showEditModal(id) {
      Validation("edit-topic-faq-form").reset();
      this.edit.id = id;
      this.edit.title = this.faqs[id].title;
      $("#edit-topic-faq-modal").modal("show");
    },
    editAddTopicFaq() {
      const validate = Validation("edit-topic-faq-form").validate();

      if (!validate) {
        return;
      }
    },
  },
};
</script>