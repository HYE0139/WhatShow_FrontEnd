<template>
  <main>
    <div class="loading" v-if="this.showLoading === true"><img src="../assets/img/loading2.gif"></div>
    <div class="main__area">
      <MainBanner :movieList="movieList"></MainBanner>
    </div>
    <div class="slide__box p-5">
      <h1 id="about" class="m-3">Boxoffice Movie</h1>
      <span>영화 이미지를 선택하면 상영 일정을 확인할 수 있습니다. </span>
      <div class="slide__list m-5">
        <MovieItem v-for="(item, idx) in movieList" :key="idx" :item="item"></MovieItem>
      </div>
      <div class="buttons">
        <div class="slide__prev" @click="moveLeft"><i class="fa-solid fa-angle-left"></i></div>
        <div class="slide__next" @click="moveRight"><i class="fa-solid fa-angle-right"></i></div>
      </div>
      <div class="paginations">
        <span class="dot" v-for="idx in movieList.length" :key="idx" @click="currentSlide(idx-1)"></span>     
      </div>
    </div> 
  </main>
</template>

<script>
import MovieItem from '../components/mainMovieItem.vue';
import MainBanner from '../components/mainBanner.vue';


export default {
  name: 'main',
  el: '#example',
  data() {
    return {
      showLoading: true,
      movieList: [],
      itemIdx: 0,
      slides: 10
    }
  },
  methods:{
    async getMovieList() {
      this.movieList = await this.$get('/movie/main', {});
      this.showLoading = false;
      const dots = document.querySelectorAll('.dot');
      dots[0].className += " active";
    },
    moveRight() {
      if(this.itemIdx >= this.movieList.length-1) {
        this.itemIdx = 0;
      } else {
        this.itemIdx++;
      }
      const slideList = document.querySelector('.slide__list');
      slideList.style.transform = `translate(-${this.itemIdx * 100}%)`;
      this.currentSlide(this.itemIdx);
    },
    moveLeft() {
      if(this.itemIdx <= 0) {
        this.itemIdx = this.movieList.length-1;
      } else {
        this.itemIdx--;
      }
      const slideList = document.querySelector('.slide__list');
      slideList.style.transform = `translate(-${this.itemIdx * 100}%)`;
      this.currentSlide(this.itemIdx);
    },
    currentSlide(idx) {
      const slideList = document.querySelector('.slide__list');
      const dots = document.querySelectorAll('.dot');
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slideList.style.transform = `translate(-${idx * 100}%)`;
      this.itemIdx = idx;
      dots[idx].className += " active";
    }, 

  },
  created() {
    this.getMovieList();
  },
  components: {
    MovieItem,
    MainBanner,
  }
}

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
  main {
    color: var(--white);
  }

  .main__area {
        background-image: url('../../public/theater3.jpg');
        height: 100vh;
        background-size: cover;
        background-attachment: fixed;
  }
  
  .slide__box {position: relative;}
  .slide__box h1 { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; color: var(--subFont--color); margin-top:50px;}

  .slide__list {
      display: flex;
      transform: translate(0, 0);
      transition: 0.5s;
  }

  .slide__item {
    flex: 0 0 100%;
  }

  .buttons {
    cursor: pointer;
    font-size: 2rem;
  }

  .slide__prev {
    position: absolute;
    left: 5%;
    top: 50%;
  }

  .slide__next {
    position: absolute;
    right: 5%;
    top: 50%;
  }
  .paginations {
    text-align: center;
  }
  .dot {
  cursor: pointer;
  height: 10px;
  width: 10px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: var(--font--color);
}
</style>