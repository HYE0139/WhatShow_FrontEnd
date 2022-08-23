<template>
  <header class="position-relative">
    <!-- 헤더 왼쪽(모달) -->
    <div class="header__left position-absolute" style="top:10px; left:10%;">
      <!-- 현재 위치 -->
      <div>
        <div v-b-modal.modal-regin class="locationModal d-none">현재 위치</div>

        <b-modal id="modal-regin" centered ref="modal-regin" size="lg" title="위치 설정" header-bg-variant="dark" header-text-variant="light" body-bg-variant="dark" body-text-variant="light" hide-footer style="text-align: center; background-color: rgba(0, 0, 0, 0.5);">
          <p class="my-5 fs-5">위치<span class="text-warning"> 설정 방법</span>을 선택해주세요.</p>
          <div class="locaBtn">
            <button @click="getLocation" class="btn">현재 위치로 설정</button>
            <button v-b-modal.modal-regin2 class="btn">수동 위치로 설정</button>
          </div>
        </b-modal>

        <b-modal id="modal-regin2" centered ref="modal-regin2" size="lg" title="수동 설정" 
        header-bg-variant="dark" header-text-variant="light" body-bg-variant="dark" body-text-variant="light" style="text-align: center; background-color: rgba(0, 0, 0, 0.5);" hide-footer>
          <div class="mt-5 fs-5">수동으로 위치 설정</div>
          <div class="my-3">
            <select @change="changeOption1" v-model="optionList1" class="fs-5 mx-2">
                <option value="" selected>시/도</option>
                <option v-for="item in option1" :key="item.root_code" :value="item.root_code">
                  {{ item.region_nm }}
                </option>
            </select>
  
            <select v-model="optionList2" v-if="optionList1 !== ''" class="fs-5 mx-2">
              <option value="0" selected>군/구</option>
              <option v-for="item in option2" :key="item.sub_code" :value="item.sub_code">
                {{ item.sub_nm }}

              </option>
            </select>
          </div>
          <div class="locaBtn2">
            <button class="btn" @click="ok()">설정</button>
            <button class="btn" @click="close()">취소</button> 
          </div>
        </b-modal>
      </div>

      <!-- 마이페이지 -->
      <div>
        <div v-b-modal.modal-mypage>마이페이지</div>
        <b-modal id="modal-mypage" centered title="마이페이지" header-bg-variant="dark" header-text-variant="light" body-bg-variant="dark" body-text-variant="light" footer-bg-variant="secondary" style="background-color: rgba(0, 0, 0, 0.5);" hide-footer>
          <div>
            <div class="mypage__user mb-3">
              <label for="input-file">
                  <img v-if="!this.userImg == ''" :src="`/static/img/${this.WSuuid}/${this.userImg}`" class="user_img" require>
                  <img v-if="this.userImg == ''" :src="`/static/img/profile/avatar.svg`" class="user_img">
              </label>
              <input id="input-file" type="file" @change="uploadImages($event.target.files)" accept="image/*" style="display: none"/>
              <div class="mt-3 mb-3">
                <label for="input-nickname" style="font-size:20px; color:#F9F871;" class="fw-bold">닉네임</label>
                <button @click="change_nick" class="btn-mod">변경</button>
                <b-form-input id="input-nickname" class="nickname__input mb-5 fw-bold text-white" v-model="WSnickname" @keyup.enter="change_nick"></b-form-input>
                <label for="input-favtag" style="font-size:20px; color:#F9F871;" class="fw-bold">관심 태그</label>
                <br>
                <div class="d-inline" v-for="(item, idx) in userFav" :key="idx" :item="item" @click="delFav(idx)"><span class="favtag">#{{item}}</span></div>
                <b-form-input id="input-nickname" v-model="fav" class="favtag__input text-white" @keyup.enter="inputFav" placeholder="관심태그를 등록해주세요."/>
              </div>
            </div>
              
              <span style="font-size: 20px; color:#F9F871;" class="fw-bold">내가 쓴 댓글</span>
              <div class="userCtnt">
                <div v-for="(item, idx) in userCtnt" :key="idx" :item="item" >{{item}}</div>
              </div>
          </div>
        </b-modal>
      </div>
    </div>

    <!-- 헤더 중앙(로고) -->
    <div class="header__logo position-absolute start-50" style="top:10px; transform: translateX(-50%)">
      <a href="/"><img src="../assets/img/logo.png"></a>
    </div>

    <!-- 헤더 오른쪽(검색) -->
    <div class="header__right d-inline-block position-absolute" style="top:10px; right:25px;">
      <div class="header__search">
        <!-- 상세검색 -->

        <div class="search__input" method="post">
          <div v-b-modal.modal-search class="search__bottom d-inline-block me-3" @click="getSelectTag">상세검색</div>

          <input id="header__search" class="me-2 w-100" v-model="keyword" placeholder="제목, 장르, 배우 등으로 검색해보세요." @input="submitAutoComplete" type="text" style="margin-bottom : 15px;" @keyup.enter="searchPage(keyword)"/>
          <div class="autocomplete p-ab disabled text-start">
            <div @click="searchPage(res)" style="cursor: pointer" v-for="(res, i) in filternm" :key="i" class="filternm" >{{ res }}</div>
          </div>
          <div class="search__button d-inline-block" @click="searchPage(keyword)"><i class="fa-solid fa-play px-2 button" style="color:#fff; background-color: #F29B21;"></i></div>
        </div>
      
        <b-modal id="modal-search" centered title="상세검색" header-bg-variant="dark" header-text-variant="light" body-bg-variant="dark" body-text-variant="light" style="background-color: rgba(0, 0, 0, 0.5);" hide-footer>
          <b-form-input id="modal__search" type="text" v-model="keyword" placeholder="검색키워드를 입력하세요." v-on:keyup.enter="searchPage(keyword)"/>
          <div class="search__seltag mt-3 fw-bold" style="font-size:20px; color:#F9F871;">장르 검색</div>
          <div class="container2 mt-3">
            <div class="row">
              <div>
                <label v-for="item in gsTag" :key="item" class="col-3">
                  <input type="checkbox" v-model="keytag" :value="item" name="genre"> {{ item }}
                </label>
              </div>
            </div>
          </div>
          <div class="search__recommend mb-3 mt-3  fw-bold" style="font-size:20px; color:#F9F871;">추천 검색어</div>
          
          <div class="row">
            <div v-for="(key, idx) in recommendKeyword" :key=idx class="col-3 recommendKeyword" @click="searchKeyword(key)">{{ key }}</div>
          </div>

          <button class="search__btn col-12 mt-3" type="submit" @click="searchPage(keyword), searchPageTag(keytag)">검색하기</button>
        </b-modal>
      </div>
    </div>

  </header>
</template>

<script>

  export default {
    name: 'mainHeader',
    el: '#modal-search',
    data() {
      return {
        option1: [],
        option2: [],
        optionList1: '',
        optionList2: 0,
        userFav:[],
        fav:'',
        WSuuid:localStorage.getItem('WSuuid'),
        WSnickname:localStorage.getItem('WSnickname'),
        userLocation: '',
        gsTag: [],
        userImg: '',
        movienm: [],
        keyword: [],
        filternm: '',
        userCtnt: [],
        keytag: [],
        recommendKeyword: [],
        seluid:{}
      }
    },
    mounted(){
      this.selFav();
      this.getMoive();
    },
    created() {
      this.getOptionList1();
      this.getKeyword();
      this.create_uid();
    },


  methods: {
    changeOption1() {
      this.optionList2 = 0;
      this.option2 = [];
      this.getOptionList2(this.optionList1);
    },
    async getOptionList1() {
      this.option1 = await this.$get(`/location/optionList1`, {})
    },
    async getOptionList2(optionList1) {
      this.option2 = await this.$get(`/location/optionList2/${optionList1}`, {})
    },

    //추천검색어 부분
    async getKeyword() {
      this.recommendKeyword = await this.$get('movie/selTopSearch', {});
    },

   

    //유저 메소드 시작//
    //로컬 스토로지에 유저 생성
    create_uid() {
      if (!localStorage.getItem('WSuuid')) {
        
        localStorage.setItem('WSuuid', Math.floor(Math.random() * 1000));
        localStorage.setItem('WSnickname', 'user' + Math.floor(Math.random() * 1000));
      }
      this.ins_uid();

    },

    //유저 uuid, nick DB 저장
    async ins_uid() {
      const param = {
        'uuid':this.WSuuid,
        'nickname':this.WSnickname
      };
      
      const senduid = await this.$post(`/user/signup`, param);
      
      if (senduid) {
        this.sel_uid();
      } else {
        console.error('error');
      }
    },

    // 유저 정보 불러옴 불러옴
    async sel_uid() {
      this.seluid = await this.$get(`/user/sel_user/${this.WSuuid}/${this.WSnickname}`, {});
      // console.log(this.seluid);
      if(this.seluid[0].ctnt !== null){
        this.seluid.forEach(item =>{
        this.userCtnt.push(`[${item.movie_nm}] ${item.ctnt}` );
      })}

      
      this.userImg = this.seluid[0].user_img;
      // console.log('seluid' + this.seluid[0].user_img);
      // console.log(this.userImg);
      let iuser = this.seluid[0].iuser;
      localStorage.setItem('iuser',iuser);
    },

    //닉네임 변경
    async change_nick() {
      this.WSnickname = this.WSnickname;
      let chNick = await this.$post(`/user/upd_nick/${this.WSnickname}/${this.WSuuid}`, {});
      localStorage.setItem('WSnickname', this.WSnickname);
    },

    //유저 favtag DB불러옴
    async selFav() {
      let selfav = await this.$get(`/user/sel_fav/${this.WSuuid}`, {});
      const selFavVal = Object.values(selfav.result);
      const selFavValstr = selFavVal[0];
      const selFavValSpStr = selFavValstr.split(',');
      // console.log(selFavValSpStr);
      selFavValSpStr.forEach(item => {
        this.userFav.push(item);
      })

    },
    //유저 favtag 태그 추가
    async inputFav() {
      //console.log(this.fav);
      let inputfav = this.userFav.push(this.fav);
      await this.$post(`/user/ins_fav/${this.WSuuid}/${this.userFav}`, {});
      this.fav = '';
    },

    //유저 favtag 삭제
    async delFav(key) {
      this.userFav.forEach((item, idx) => {
        if (idx === key) {
          this.userFav.splice(idx, 1);
        }
      })
      await this.$post(`/user/ins_fav/${this.WSuuid}/${this.userFav}`, {});
    },

    //유저 프로필 이미지 추가
    async uploadImages(files) {
      const imgChang = document.querySelector('.user_img');
      // console.log(files);
      const image = await this.$base64(files[0]);
      // console.log(image);
      const formData = { image };
      const result = await this.$post(`/user/upd_img/${this.WSuuid}`, formData);
      // console.log('/' + result['result']);
      imgChang['src'] = '/' + result['result'];
    },

    //검색 자동완성
    async getMoive(){
      const movieList = await this.$get('/movie/get_movie', {});
      movieList.forEach(item => {
      // console.log(item.movie_nm);
        this.movienm.push(item.movie_nm);
      })
      // console.log(this.movienm);
    },
    submitAutoComplete() {
      const autocomplete = document.querySelector(".autocomplete");
      if (!this.keyword == '') {
      autocomplete.classList.remove("disabled");
      this.filternm = this.movienm.filter((item) => {
          return item.match(new RegExp(this.keyword, "i"));
        });
      } else {
        autocomplete.classList.add("disabled");
      }
      // console.log(this.filternm);
    },


    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Geolocation is not supported by this browser.'
        });
      }
      window.location.reload();
    },

    showPosition(pos) {
      let lat = pos.coords.latitude;
      let lng = pos.coords.longitude;
      //console.log(lat);
      //console.log(lng);
      this.getAddr(lat, lng);
    },
    getAddr(lat, lng) {
      let geocoder = new kakao.maps.services.Geocoder();
      let coord = new kakao.maps.LatLng(lat, lng);
      //console.log(coord);
      let callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          let detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
          detailAddr += result[0].address.address_name;
          localStorage.removeItem('rootCode');
          localStorage.removeItem('subCode');
          localStorage.setItem('my_addr', detailAddr);
        }
      }
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

      const close = document.querySelector('div.modal-header.bg-secondary.text-light > button')
      close.click();
    },
    async ok() {
      const close = document.querySelector('#modal-regin2 button');
      localStorage.removeItem('my_addr');
      localStorage.setItem('rootCode', this.optionList1);
      localStorage.setItem('subCode', this.optionList2);
      close.click();

      await this.$post(`/user/ins_rootcode/${this.WSuuid}/${this.optionList1}`, {});
      window.location.reload();

    },

    close() {
      const close = document.querySelector('#modal-regin2 button');
      close.click();
    },

    // 검색페이지 이동
    async searchPage(keyword) {
      const autocomplete = document.querySelector(".autocomplete");
      autocomplete.classList.add("disabled");
      const close = document.querySelector('#modal-search button');
      this.keyword = keyword;
      // const str = this.keyword.splice(',');
      // console.log(str);

      console.log(`send key:${keyword}`);
      if (keyword !== '') {
        this.$router.push({
          name: 'search',
          params : {
            keyword: this.keyword
          }
        })
        this.keyword = '';
        close.click();
      } else {
        Swal.fire({
          icon: "warning",
          title: "검색어를 입력해주세요!"
        });
      }
    },

    // 태그로 검색페이지 이동
    async searchPageTag(keyTag) {
      const autocomplete = document.querySelector(".autocomplete");
      autocomplete.classList.add("disabled");
      const close = document.querySelector('#modal-search button');
      this.keyTag = keyTag;
      console.log(`keyTag:${this.keyTag}`);

      if (keyTag !== '') {
        this.$router.push({
          name: 'search',
          params: {
            keyTag: this.keyTag
          }
        })
        this.keyTag = '';
        close.click();
      }
    },

    // 상세검색-장르 체크박스
    async getSelectTag() {
      this.gsTag = await this.$get(`/movie/getTag/`, {});
      // console.log(this.gsTag);
    },

    //추천 검색어 이동
    searchKeyword(keyword) {
      this.$router.push({
        name: 'search',
        params: {
          keyword: keyword
        }
      })
      const close = document.querySelector('#modal-search button');
      close.click();
    }
  }
}

</script>

<style scoped>
  header {
    height: 90px;
    background-color: #000;
    color: var(--white);
    padding: 15px 10px 0 10px;
  }
  .header__left {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
  }
  .header__left div, .search__bottom, .header__search input[type=submit]{
    cursor: pointer;
  }
  .header__logo {
    text-align: center;
  }
  .header__logo a img {
    width: 4rem;
  }
  .header__search {
    margin-top: 15px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    
  }
   .header__search .search__input {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
  }
  .search__button { text-align: right;}
  .header__search .search__button i {
    font-size: 20px;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  /* 위치지정_수동 */
  .form-select select { margin: 0 20px; width: 100px; height: 30px;
    text-align: center; font-size: 1rem; color: var(--black);
  }
  #modal-regin2 select option { color: var(--black); }

  .locaBtn button, .locaBtn2 button {width:50%; border:none; color:#fff;}
  

  /* 마이페이지 css */

  .mypage__user {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .btn-mod {
    background-color: transparent;
    border: none;
    float: right;
    margin-top:5px;
    color:rgb(64, 64, 64);
    font-size:0.8rem;
  }
  .btn-mod:hover { color:#fff;}
  .nickname__input, .favtag__input, #modal__search { background-color: transparent; border:none; border-bottom: 1px solid #F9F871; border-radius: 0px;}
  .nickname__input::placeholder  {color:#fff;}
  .favtag__input::placeholder,  #modal__search::placeholder,  #header__search::placeholder {color: #e4e9f0; }
  .userCtnt { background-color: #5e6770; border-radius: 5px; padding:10px;}

  /* 검색 css */
  .fa-play {
    box-shadow: 0 5px #f27019;
  }
  .button:hover {background-color: #3e8e41}

  .button:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #f27019;
    transform: translateY(4px);
  }

  .search__input > #header__search {
    height: 30px;
    background: var(--bg--black);
    color: var(--white);
    border: none;
    font-size: 0.8rem;
    padding-left: 5px;
    width: 80%;
    border-bottom: 1px solid #f27019;
  }

  .search__btn {
    background-color: var(--font--color);
    border: none;
    border-radius: 10px;
    padding: 5px;
    color: var(--white);
    box-shadow: 0 5px #f27019;
  }
  .search__btn:active {
    box-shadow: 0 5px #f27019;
    transform: translateY(4px);
  }

  .favtag{
    display: inline-block;
    background-color: var(--font--color);
    border-radius: 5px;
    margin: 2px;
    padding: 0 2px;
  }
  .d-inline{
    display: inline-block;
    cursor: pointer;
  }
  .user-info{
    text-align: center;
  }

  .user_img{
    width: 90%;
    height: 100%;
    border-radius: 20%;
    padding-top: 10px;
    object-fit: cover;
  }

  .p-ab{
    position: absolute;
    z-index: 20;
    background: var(--bg--black);
    border-radius: 10px;
    padding: 10px;
    top: 60px;
  }

  .disabled{
    display: none;
  }

  .filternm:hover{
    color: var(--font--color);
  }

  .recommendKeyword {
    cursor: pointer;
  }
</style>

