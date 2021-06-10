<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5 shadow-lg">
            <div class="card-body">
              <div class="text-center">
                <b-link href="/" class="text-decoration-none">
                  <img
                    class="img-fluid"
                    src="/logo.png"
                    alt="logo"
                    width="70"
                  />
                  <span class="text-primary">
                    <small class="font-weight-bold">FORKOHAT BALIKPAPAN</small>
                  </span>
                </b-link>
              </div>
              <h5 class="card-title text-center">Masuk</h5>
              <b-tabs content-class="mt-3" align="center">
                <b-tab title="Email" active>
                  <FormsLoginWithEmail />
                </b-tab>
                <b-tab title="NIP">
                  <FormsLoginWithNip />
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}
</style>

<script>
export default {
  layout: 'auth',
}
</script>
