<template>
  <div class="container">
    <nav>
      <ul class="breadcrumb text-text-white-50">
        <li class="breadcrumb-item">
          <NuxtLink to="/dashboard">Beranda</NuxtLink>
        </li>
        <li class="breadcrumb-item">
          <NuxtLink to="/dashboard/topik">Topik</NuxtLink>
        </li>
        <li class="breadcrumb-item active">
          <a href="javascript:void(0)">Pertanyaan</a>
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
      <h3 class="text-black-50">Pertanyaan</h3>
    </div>

    <hr class="divider" />

    <button
      type="button"
      class="btn btn-primary mb-3"
      data-toggle="modal"
      data-target="#add-faq-modal"
    >
      Tambah Pertanyaan
    </button>

    <div class="modal fade zoom" tabindex="-1" id="add-faq-modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <a href="#" class="close" data-dismiss="modal" aria-label="Close">
            <em class="icon ni ni-cross"></em>
          </a>
          <div class="modal-header">
            <h5 class="modal-title">Tambah Pertanyaan</h5>
          </div>
          <div class="modal-body">
            <form id="add-faq-form" @submit.prevent="submitAddTopicFaq()">
              <div class="form-group">
                <label for="question">Pertanyaan</label>
                <div class="form-form-control-wrap">
                  <input
                    class="form-control"
                    type="text"
                    maxlength="254"
                    id="question"
                    required
                    data-pristine-required-message="Pertanyaan Harus Diisi"
                    data-pristine-maxlength-message="Tidak Boleh Lebih Dari 254 Karakter"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="answer">Jawaban</label>
                <div class="form-form-control-wrap">
                  <textarea
                    class="form-control"
                    type="text"
                    id="answer"
                    required
                    data-pristine-required-message="Jawaban Harus Diisi"
                  ></textarea>
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
              <option value="10" selected>10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <div
        class="card card-bordered text-black-50 m-2"
        v-for="(value, index) in faqs"
        :key="index"
      >
        <div class="card-inner">
          <h5 class="card-title">
            {{ value.question }}
          </h5>
          <p class="card-text">
            {{ value.answer }}
          </p>
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
        </div>
      </div>
    </div>

    <div class="modal fade zoom" tabindex="-1" id="edit-faq-modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <a href="#" class="close" data-dismiss="modal" aria-label="Close">
            <em class="icon ni ni-cross"></em>
          </a>
          <div class="modal-header">
            <h5 class="modal-title">Ubah Pertanyaan</h5>
          </div>
          <div class="modal-body">
            <form id="edit-faq-form" @submit.prevent="editAddTopicFaq()">
              <input type="hidden" v-model="edit.id" />
              <div class="form-group">
                <label for="question">Pertanyaan</label>
                <div class="form-form-control-wrap">
                  <input
                    class="form-control"
                    type="text"
                    maxlength="254"
                    id="question"
                    required
                    data-pristine-required-message="Pertanyaan Harus Diisi"
                    data-pristine-maxlength-message="Tidak Boleh Lebih Dari 254 Karakter"
                    v-model="edit.question"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="answer">Jawaban</label>
                <div class="form-form-control-wrap">
                  <textarea
                    class="form-control"
                    type="text"
                    id="answer"
                    required
                    data-pristine-required-message="Jawaban Harus Diisi"
                    v-model="edit.answer"
                  ></textarea>
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
          <NuxtLink class="page-link disabled" to="/dashboard/faq">
            1
          </NuxtLink>
        </li>
        <li :class="`page-item ${activePage(2)}`">
          <NuxtLink class="page-link disabled" to="/dashboard/faq?page=2">
            2
          </NuxtLink>
        </li>
        <li :class="`page-item ${activePage(3)}`">
          <NuxtLink class="page-link disabled" to="/dashboard/faq?page=3">
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
    title: "Pertanyaan | Dasbor",
  },
  data() {
    return {
      faqs: [
        {
          question:
            "Excepteur velit ea sunt in pariatur est qui amet culpa cillum enim consectetur fugiat ex ?",
          answer:
            "Excepteur incididunt sint elit elit eiusmod. Sunt est exercitation dolor ea minim incididunt duis aliquip irure. Anim deserunt proident ex cillum adipisicing commodo enim adipisicing occaecat laborum sint irure. Aliquip nostrud ad est enim laborum occaecat ea sint enim ad. Aliquip nisi id aute eu culpa quis fugiat deserunt consectetur quis excepteur adipisicing ut culpa. Consectetur aliquip eiusmod do fugiat cupidatat ad minim ipsum.",
        },
        {
          question:
            "Dolor cillum mollit aliqua voluptate reprehenderit voluptate aliquip qui consequat ad mollit cupidatat enim tempor ?",
          answer:
            "Cillum magna aliquip amet aliqua labore. Velit enim eiusmod nulla aliqua. Irure eu nostrud laboris ut.",
        },
        {
          question:
            "Veniam excepteur aliqua mollit sit veniam elit ipsum culpa ullamco dolor in commodo ut ?",
          answer:
            "Et laborum magna duis deserunt enim nulla mollit anim. Occaecat voluptate nisi fugiat eu incididunt. Ad esse incididunt dolore laboris excepteur aute laborum non laborum. Anim et laboris id minim labore. Velit qui tempor incididunt ullamco cillum enim dolore ipsum fugiat laborum esse amet. Minim sit magna aute dolore adipisicing duis incididunt reprehenderit sunt non id voluptate sunt mollit.",
        },
      ],
      edit: {
        id: "",
        answer: "",
        question: "",
      },
    };
  },
  mounted() {
    Validation("add-faq-form");
    Validation("edit-faq-form");

    $("#add-faq-modal").on("hidden.bs.modal", function () {
      Validation("add-faq-form").reset();
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
      const validate = Validation("add-faq-form").validate();

      if (!validate) {
        return;
      }
    },
    showEditModal(id) {
      Validation("edit-faq-form").reset();
      this.edit.id = id;
      this.edit.question = this.faqs[id].question;
      this.edit.answer = this.faqs[id].answer;
      $("#edit-faq-modal").modal("show");
    },
    editAddTopicFaq() {
      const validate = Validation("edit-faq-form").validate();

      if (!validate) {
        return;
      }
    },
  },
};
</script>