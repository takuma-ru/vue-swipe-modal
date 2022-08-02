<template>
  <div id="app">
    <Header />
    <div class="contents">
      <Nav />
      <main>
        <ContentDoc class="main" />
      </main>
    </div>
  </div>
</template>

<style lang="scss">

.contents {
  display: grid;
  grid-template-columns: auto 1fr;

  position: relative;
  max-width: calc(100vw - (2 * 48px));
}

main {
  position: relative;
  max-width: calc(100% - 64px);
  margin: 32px 16px;
}
</style>