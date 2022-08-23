<template>
  <div>
    <mainHeader/>
    <div class="router">
      <!-- <router-link to="/">메인</router-link> | -->
      <!-- <router-link to="/detail">상세페이지</router-link> | -->
      <!-- <router-link to="/search">검색페이지</router-link> -->
      <router-view/>
    </div>
    <footer><mainFooter/></footer>
  </div>
</template>

<script>
import mainHeader from './components/mainHeader.vue'
import mainFooter from './components/mainFooter.vue'

export default {
  name: 'main',
  watch: {
      $route() {
          window.scrollTo(0, 0);
      },
  },
  components: {
    mainHeader,
    mainFooter
  }
}
</script>

<style>
:root {
  --font--color : #EA9A28;
  --subFont--color: #F9F871;
  --subFont2--color: gold;
  --white : #fff;
  --black :#000;
  --bg--main:#152A35;
  --bg--black:#00000088;
}
@-webkit-keyframes jello-vertical {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
            transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}
@keyframes jello-vertical {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  40% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  50% {
    -webkit-transform: scale3d(0.85, 1.15, 1);
            transform: scale3d(0.85, 1.15, 1);
  }
  65% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  75% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}


@font-face {
    font-family: 'round';
    src: url('../src/assets/font/Cafe24Ssurround.ttf') format('truetype');
}
@font-face {
    font-family: 'roundAir';
    src: url('../src/assets/font/Cafe24SsurroundAir.ttf') format('truetype');
}
  * {
    margin: 0;
    padding: 0;
    border-collapse: collapse;
    font-family: roundAir;
  }

  body {background: var(--bg--main);}

  .router {
    text-align: center;
    margin: 0 auto;
    overflow: hidden;
  }
</style>
