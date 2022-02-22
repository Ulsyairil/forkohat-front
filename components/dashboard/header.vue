<template>
  <div class="nk-header is-light" style="z-index: 1">
    <div class="container-fluid">
      <div class="nk-header-wrap">
        <div class="nk-menu-trigger mr-sm-2 d-lg-none">
          <a
            href="#"
            class="nk-nav-toggle nk-quick-nav-icon"
            data-target="headerNav"
            ><em class="icon ni ni-menu"></em
          ></a>
        </div>
        <div class="nk-header-brand">
          <NuxtLink to="/dashboard" class="logo-link">
            <img class="logo-light logo-img" src="/logo.png" alt="logo" />
            <img class="logo-dark logo-img" src="/logo.png" alt="logo" />
            <span class="text-black-50 font-weight-bold">
              FORKOHAT BALIKPAPAN
            </span>
          </NuxtLink>
        </div>
        <!-- .nk-header-brand -->
        <div class="nk-header-menu ml-auto" data-content="headerNav">
          <div class="nk-header-mobile">
            <div class="nk-header-brand">
              <NuxtLink to="/dashboard" class="logo-link">
                <img class="logo-light logo-img" src="/logo.png" alt="logo" />
                <img
                  class="logo-dark logo-img"
                  src="/logo.png"
                  alt="logo-dark"
                />
                <span class="text-black-50 font-weight-bold">
                  FORKOHAT BALIKPAPAN
                </span>
              </NuxtLink>
            </div>
            <div class="nk-menu-trigger mr-n2">
              <a
                href="#"
                class="nk-nav-toggle nk-quick-nav-icon"
                data-target="headerNav"
                ><em class="icon ni ni-arrow-left"></em
              ></a>
            </div>
          </div>
          <ul class="nk-menu nk-menu-main ui-s2">
            <!-- Menu Item -->
            <NuxtLink
              tag="li"
              to="/dashboard/program"
              class="nk-menu-item"
              active-class="active"
            >
              <a href="javascript:void(0)" class="nk-menu-link">
                <span class="nk-menu-text">Program</span>
              </a>
            </NuxtLink>

            <NuxtLink
              tag="li"
              to="/dashboard/berita"
              class="nk-menu-item"
              active-class="active"
            >
              <a href="javascript:void(0)" class="nk-menu-link">
                <span class="nk-menu-text">Berita</span>
              </a>
            </NuxtLink>

            <NuxtLink
              tag="li"
              class="nk-menu-item"
              active-class="active"
              to="/dashboard/topik"
            >
              <a href="javascript:void(0)" class="nk-menu-link">
                <span class="nk-menu-text">FAQ</span>
              </a>
            </NuxtLink>

            <NuxtLink
              tag="li"
              class="nk-menu-item"
              active-class="active"
              to="/dashboard/peran"
            >
              <a href="javascript:void(0)" class="nk-menu-link">
                <span class="nk-menu-text">Peran</span>
              </a>
            </NuxtLink>

            <li class="nk-menu-item has-sub">
              <a href="javascript:void(0)" class="nk-menu-link nk-menu-toggle">
                <span class="nk-menu-text">Organisasi</span>
              </a>
              <ul class="nk-menu-sub">
                <li class="nk-menu-item">
                  <a href="javascript:void(0)" class="nk-menu-link">
                    <span class="nk-menu-text">Struktur</span>
                  </a>
                </li>
                <li class="nk-menu-item">
                  <a href="javascript:void(0)" class="nk-menu-link">
                    <span class="nk-menu-text">Visi</span>
                  </a>
                </li>
                <li class="nk-menu-item">
                  <a href="javascript:void(0)" class="nk-menu-link">
                    <span class="nk-menu-text">Misi</span>
                  </a>
                </li>
              </ul>
            </li>

            <li class="nk-menu-item">
              <a
                href="javascript:void(0)"
                class="nk-menu-link"
                @click="livePreview()"
              >
                <span class="nk-menu-text">Preview</span>
              </a>
            </li>
            <!-- End Menu Item -->
          </ul>
        </div>

        <!-- Tools Menu -->
        <div class="nk-header-tools">
          <ul class="nk-quick-nav">
            <li class="dropdown user-dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <div class="user-toggle">
                  <div class="user-avatar sm">
                    <em class="icon ni ni-user-alt"></em>
                  </div>
                </div>
              </a>
              <div
                class="
                  dropdown-menu
                  dropdown-menu-md
                  dropdown-menu-right
                  dropdown-menu-s1
                  is-light
                "
              >
                <div
                  class="
                    dropdown-inner
                    user-card-wrap
                    bg-lighter
                    d-none d-md-block
                  "
                >
                  <div class="user-card">
                    <div class="user-avatar">U</div>
                    <div class="user-info">
                      <span class="lead-text">
                        Ulsyairil
                        <span class="badge badge-outline-primary mr-2 ml-2">
                          Administrator
                        </span>
                      </span>
                      <span class="sub-text">ulsyairil@outlook.co.id</span>
                    </div>
                  </div>
                </div>
                <div class="dropdown-inner">
                  <ul class="link-list">
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-toggle="modal"
                        data-target="#userPassModal"
                      >
                        <em class="icon ni ni-lock"></em>
                        <span>Ubah Profil</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="dropdown-inner">
                  <ul class="link-list">
                    <li>
                      <a
                        href="javascript:void(0)"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        <em class="icon ni ni-signout"></em>
                        <span>Keluar</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    activeLink(path) {
      if (this.$route.path === path) {
        return "active";
      }
    },
    livePreview() {
      window.open(this.$router.options.base, "_blank");
    },
  },
};
</script>