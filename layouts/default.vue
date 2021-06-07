<template>
  <div class="app-root">
    <PublicSidebar />
    <PublicHeader />
    <main role="main">
      <notifications group="app" style="margin-top: 90px" />
      <Nuxt />
    </main>
    <!-- <PublicFooter /> -->
    <PublicScrollTop />
  </div>
</template>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}

.bg-azure {
  border-top: 3px solid blue;
}
</style>
