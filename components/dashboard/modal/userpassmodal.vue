<template>
  <!-- Modal For Change Username & Password -->
  <div class="modal fade" tabindex="-1" id="userPassModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <a href="#" class="close" data-dismiss="modal" aria-label="Close">
          <em class="icon ni ni-cross"></em>
        </a>
        <div class="modal-header">
          <h5 class="modal-title">Ubah Profil</h5>
        </div>
        <div class="modal-body">
          <form class="form-validate">
            <div class="form-group">
              <label class="form-label" for="fullname">Username</label>
              <div class="form-control-wrap">
                <input
                  type="text"
                  class="form-control"
                  id="fullname"
                  name="Username"
                />
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Ubah</button>
          </form>

          <hr class="divider" />

          <form class="form-validate">
            <div class="form-group">
              <label class="form-label" for="current_password">
                Kata Sandi Sekarang
              </label>
              <div class="form-control-wrap">
                <input
                  type="password"
                  class="form-control"
                  id="current_password"
                  name="Username"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="new_password">
                Kata Sandi Baru
              </label>
              <div class="form-control-wrap">
                <input
                  type="password"
                  class="form-control"
                  id="new_password"
                  name="Username"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="confirmation_new_password">
                Ketik Ulang Kata Sandi Baru
              </label>
              <div class="form-control-wrap">
                <input
                  type="password"
                  class="form-control"
                  id="confirmation_new_password"
                  name="Username"
                />
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Ubah</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal For Change Username & Password -->
</template>