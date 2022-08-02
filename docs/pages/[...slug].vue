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
  grid-template-columns: 256px calc(100% - 256px);

  position: relative;
  margin: 0px 10vmin;
}

main {
  position: relative;
  max-width: 100%;
  margin: 32px 16px;
}
</style>