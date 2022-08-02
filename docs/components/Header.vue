<template>
  <header>
    <div class="title">
      <img src="https://user-images.githubusercontent.com/49429291/182005504-0567f54a-80e3-4a31-ba5b-740db91b5190.png" alt="">
      <h3>@takumaru/vue-swipe-modal</h3>
    </div>
    <hr>
  </header>
</template>

<style scoped lang="scss">
header {
  display: grid;
  justify-content: space-between;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;

  position: relative;
  height: 64px;

  .title {
    display: grid;
    justify-content: start;
    align-items: center;
    grid-template-columns: auto auto;

    height: 100%;
  }

  img {
    height: 56px;
  }

  hr {
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0px;

    margin: 0px;
    border: none;
    background-color: #CBCAC7;
  }
}

</style>