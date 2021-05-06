<template>
  <div class="app-root">
    <DashboardSidebar />
    <DashboardHeader />
    <main role="main" class="wrapper">
      <Nuxt />
    </main>
    <DashboardFooter />
  </div>
</template>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}

.dark-mode {
  background-color: #222;
  color: #fff;
}

.light-mode {
  background-color: #fff;
}

.app-root {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}

.wrapper {
  margin-top: 90px !important;
  position: relative;
}
</style>

<script>
export default {
  head() {
    return {
      bodyAttrs: {
        class: 'light-mode',
      },
    }
  },
}
</script>
