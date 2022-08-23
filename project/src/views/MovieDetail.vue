<template>
    <div class="container p-5" id="refreshing">
        <div id="movie-detail">
            <div id="detail-header" class="row justify-content-center">
                <div class="movie__title text-start"><!-- 영화 제목 --></div>
            </div>

            <div id="detail-main" class="row row-cols-2 justify-content-center">
                <div class="movie__poster col">
                    <img :src="movie_info.movie_poster" alt="poster">
                </div>

                <div class="movie__info col">
                    <ul>
                        <li><strong>개요</strong> : {{ movie_info.movie_genre }} <span>|</span> {{ movie_info.country }} <span>|</span> {{ movie_info.runing_time+"분"}} </li>
                        <li><strong>개봉</strong> :  {{ movie_info.open_date }} </li>
                        <li><strong>등급</strong> :  {{ movie_info.view_level }} </li>
                        <li><strong>감독</strong> :  {{ movie_info.director }} </li>
                        <li><strong>배우</strong> :  {{ movie_info.actor }} </li>
                    </ul>
                    <!-- 평점, 추천 -->
                    <div class="movie__recom row">
                        <div class="movie__score col-5"><i class="fa-solid fa-star fs-2 me-3"></i><span class="fs-2">{{movie_recommend.avgScore}}</span> </div>
                        <div class="recom_good col" @click="changeRecommend"><i class="fa-solid fa-thumbs-up fs-2 me-3"></i> <span class="fs-2">{{ movie_recommend.recommend }}</span> </div>
                    </div>
                </div>

                <div class="movie__intro my-5 col-12">
                    <h4 class="fc-oran text-start">줄거리</h4>
                    <div class="movie__intro__ctnt">
                        <!-- 영화 줄거리 -->
                    </div>
                </div>
            </div>
            
            <!-- 영화 상영 스케줄 -->
            <div id="movie__time"  class= "my-5 col-12">
                <h4 class="fc-oran text-start">영화 상영시간</h4>
                <div class=" text-start text-secondary mb-2" >관람을 원하는 날짜를 선택하여 검색해보세요.</div>
                <div class="day__selecte text-start">
                    <input type="date" id="select-day" v-model="selectedDate">
                    <button class="dateBtn ms-3" @click="getDate"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>

                <div class="movie__timeList row justify-content-md-center">
                    <ul class="theater__List">
                        <li  v-for="schedule in theater_list" :key="schedule.idx">
                            {{ schedule.gname }} <!-- 극장명 -->
                            <div class="theater__timeList">
                                <ul v-for="theater in schedule.theaterScheduleList" :key="theater.idx">
                                    <li class="d-inline-block" v-for="time in theater.timetableList" :key="time.idx">
                                        <button class="ticketBtn btn">
                                            <a :href="time.ticketPcUrl" class="ticketUrl" target="_blank" >
                                                <div class="movie__runningTime">{{ time.rtime }} ~ {{ time.endTime }}</div> <!-- 상영시간 -->
                                                <div class="movie__detailTheater">{{ time.tname }}</div> <!-- 상영관 -->
                                            </a>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul> 
                </div>
            </div>

        </div>
        <!-- 영화 감상평 -->
        <div id="movie-review">
            <h4 class="fc-oran">당신의 감상을 들려주세요.</h4>
            <div class="star-rating space-x-4 mx-auto my-3">
                <input type="radio" id="5-stars" value="5" v-model="review.movie_score"/>
                <label for="5-stars" class="star pr-4">★</label>
                <input type="radio" id="4-stars" value="4" v-model="review.movie_score"/>
                <label for="4-stars" class="star">★</label>
                <input type="radio" id="3-stars" value="3" v-model="review.movie_score"/>
                <label for="3-stars" class="star">★</label>
                <input type="radio" id="2-stars" value="2" v-model="review.movie_score"/>
                <label for="2-stars" class="star">★</label>
                <input type="radio" id="1-star" value="1" v-model="review.movie_score"/>
                <label for="1-star" class="star">★</label>
            </div> 

            <div class="review__form row justify-content-center">
                <div class="review__input col-10">
                    <textarea class="review__txt" @keyup="revLimit" placeholder="감상평을 남겨주세요. 영화와 상관없는 내용은 관리자에 의해 제재를 받을 수 있습니다." v-model="review.ctnt"></textarea>
                    <div class="review__limit">({{ limit }} / 100)</div>
                </div>
                <button class="review__btn ms-2 col-2" @click="insertReview">등록</button>
            </div>
            
            <div class="review__box">
                <ul class="review__list" >
                    <li class="review__comment" v-for="review in rev_list" :key="review.i_review">
                        <span class="writer__score" v-for="star in review.movie_score" :key="star">★</span> <span>{{ review.movie_score }} </span>
                        <div class="review__cnt">{{ review.ctnt }}</div>

                        <div class="writer__info">
                            <span class="writer">{{ review.nickname }}</span>
                            <span class="writer__cre">{{ review.created_at }}</span>
                            <div class="showMoreCmt" style="cousor:pointer;" @click="showCmt(review.i_review)" :v-bind="review.i_review">댓글
                                <div class="reCmt d-none">
                                    
                                    <div class="cmtLi" v-for="item in cmtList" :key="item">
                                        <span class="cmWriter">{{item.nickname}}</span>
                                        <span class="cmReview__cnt">{{item.comment_cnt}}</span> 
                                        <span class="cmWriter__cre">{{item.create_at}}</span>
                                    </div>
                                    
                                    <input type="text" class="cmtFiled" v-model="rcmt" @keyup.enter="insCmt(review.i_review)">
                                    <button class="addCmt" @click="insCmt(review.i_review)">등록</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="review__more">
                    <button class="more__btn mt-3" @click="more">
                        <span> 더 보기 <i class="fa-solid fa-angle-down"></i></span>
                    </button>
                </div>
            </div> 
            
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            movie_code: this.$route.params.movie_code,
            movie_info: [], // 영화정보
            movie_recommend: {},
            todayDate: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString(), // 현재 날짜
            selectedDate: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0, 10), //검색할 날짜
            theater_list: [], //상영 극장 정보
            limit: 0,
            rev_list: [],
            more_rev: 5,
            review: {
                ctnt: '',
                nickname: localStorage.getItem('WSnickname'),
                iuser: localStorage.getItem('iuser'),
                movie_code: this.$route.params.movie_code,
                movie_score: '' 
            },
            rootCode: localStorage.getItem('rootCode'),
            subCode: localStorage.getItem('subCode'),
            myAddr: localStorage.getItem('my_addr'),
            cmtList: [],
            rcmt: ''
        }
    },
   
    created() {
        this.getMovieInfo(); // 영화 상세 정보
        this.getDate(); // 상영시간
        this.getReview(); // 리뷰 리스트
        this.movieRecommend();
    },

    methods: {
      
        async getMovieInfo() { // 영화 상세 정보
            this.movie_info = await this.$get(`/detail/movieInfo/${this.movie_code}`, {});
            const movie_nm = this.movie_info.movie_nm;
            const summary = this.movie_info.movie_summary.split('\\');
            summary.forEach(e => {
                const movie__intro__ctnt = document.querySelector('.movie__intro__ctnt')
                const div = document.createElement('div');
                movie__intro__ctnt.append(div);
                div.append(e);
            });
            this.movieTitle(movie_nm);
        },

        movieTitle(nm) { // 영화 제목
            const movieTitleBox = document.querySelector('.movie__title');
            const movie__mainTitle = document.createElement('h1');
            const movie__serveTitle = document.createElement('span');
            movie__mainTitle.style.cssText = 
            "color: #F9F871; display: inline-block; font-family: 'Do Hyeon', sans-serif; font-size: 3.5rem;";
            movie__serveTitle.style.cssText = 
            "color: #F9F871; display: inline-block; font-family: 'Do Hyeon', sans-serif; margin-left:10px; font-size: 1.8rem;";

            if(nm.indexOf(':') !== -1) {
                const movieTitle = nm.split(':');
                movie__mainTitle.append(movieTitle[0]);
                movie__serveTitle.append(":" + movieTitle[1]);
                movieTitleBox.append(movie__mainTitle, movie__serveTitle);
            } else {
                movie__mainTitle.append(nm);
                movieTitleBox.append(movie__mainTitle);
            }
        },

        async movieRecommend() {
            const param = {
                'movie_code' : this.movie_code,
                'iuser' : this.review.iuser
            };
           const result = await this.$get('/detail/movieScoreAndRecommend', param);
           const avg = result[0].avgScore
           result[0].avgScore = Math.round(avg*10)/10;
           
           this.movie_recommend = result[0];
           if(this.movie_recommend['meRecommend']) {
                const recom_good = document.querySelector('.recom_good > i');
                recom_good.classList.add('recommend');
           }
           console.log(this.movie_recommend);
        },

        async getDate() { // 상영시간
            const param = {};
            param['code'] = this.movie_code;
            param['date'] = this.selectedDate;
            if(this.rootCode == null) {
                param['my_addr'] = this.myAddr;
            } else {
                param['rootCode'] = this.rootCode;
                param['subCode'] = this.subCode;
            }
            const nowDay = this.todayDate.substring(0, 10);
            const nowTime = this.todayDate.substring(11,16);

            const list = await this.$get('/movie/movieTime', param); // 상영 극장 정보
            console.log(list);
             for(let a=0; a<list.length; a++) {
                 this.theater_list[a] = list[a]; // 극장이름
                 let sche_list = list[a].theaterScheduleList;
                 for(let b=0; b<sche_list.length; b++) {
                    let time_list = sche_list[b].timetableList;
                     for(let c=0; c<time_list.length; c++) {
                        if(time_list[c].rdate == nowDay && time_list[c].rtime < nowTime) {
                           sche_list[b].timetableList.splice(c, 1); // 지난 상영시간 삭제
                           c--;
                         } 
                           
                     }
                    
                 }          
            }
        },

        async insertReview() { // 리뷰 작성
            if(this.review.ctnt === '' ) {
                Swal.fire({
                    icon: 'warning',
                    title: '입력된 내용이 없습니다.'
                });
            } else if(this.review.movie_score ==='') {
                Swal.fire({
                    icon: 'warning',
                    title: '별점을 입력해 주세요.'
                });
            } else {
                const result = await this.$post('/detail/insertReview', this.review);
                    const t_arr = this.todayDate.substring(0,19).split('T');
                    const created_at = t_arr[0]+' '+t_arr[1];
                    if(result) {
                        const item = {
                        'i_review' : result.result,
                        'iuser' : parseInt(this.review.iuser),
                        'movie_code' : this.review.movie_code,
                        'ctnt' : this.review.ctnt,
                        'movie_score' : parseInt(this.review.movie_score),
                        'nickname' : this.review.nickname,
                        'created_at' : created_at
                    };
                    this.rev_list.unshift(item);
                    }
                this.review.ctnt ='';
                this.review.movie_score=''; 
                Swal.fire({
                    icon: 'success',
                    title: '댓글 등록이 완료되었습니다.'
                });
            }
          
        },

        async getReview() { // 리뷰 리스트
            const list = await this.$get(`/detail/reviewList/${this.movie_code}/${this.more_rev}`, []);
            if(list){
                this.rev_list = list;
            }
        },

        more() { // 리뷰 더보기
            this.more_rev += 5;
            this.getReview();
        },

        revLimit() { // 리뷰 글 수 제한
            const review_txt = document.querySelector('.review__txt');
            this.limit = review_txt.value.length;
            if(this.limit > 100) {
                review_txt.value = review_txt.value.substring(0, 100);
            }
        },

        //추천과 비추천
        async changeRecommend() {
            const recom_good = document.querySelector('.recom_good > i');
            const recom_goodSpan = document.querySelector('.recom_good > span');
            if(this.movie_recommend['meRecommend']) {
                const result = await this.$delete(`detail/changeRecommend/${this.movie_code}/${this.review.iuser}`);
                recom_good.classList.remove('recommend');
                this.movie_recommend['meRecommend'] = 0;
                this.movie_recommend['recommend'] -= 1;
                recom_goodSpan.innerHTML = this.movie_recommend['recommend'];
            } else {
                const result = await this.$post(`detail/changeRecommend/${this.movie_code}/${this.review.iuser}`);
                console.log(result);
                recom_good.classList.add('recommend');
                this.movie_recommend['meRecommend'] = 1;
                this.movie_recommend['recommend'] += 1;
                recom_goodSpan.innerHTML = this.movie_recommend['recommend'];
            }
        },

         //대댓글 열기
        showCmt(reNum){
            const showMoreCmt = document.querySelectorAll('.showMoreCmt');
            const reCmt = document.querySelectorAll('.reCmt');
            this.getCmt(reNum);
            for(let i=0; i<reCmt.length; i++) {
                showMoreCmt[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    reCmt[i].classList.toggle('d-none');
                })
                // this.parentNode.classList.add('d-none');
            }
        },
        //대댓글 불러오기
        async getCmt(reNum){
            this.cmtList = '';
            this.cmtList = await this.$get(`/detail/reviewListCmt/${reNum}`, []);
            console.log(this.cmtList);
            const reCmt = document.querySelectorAll('.reCmt');
        },
        async insCmt(reCmt){
            await this.$post(`/detail/insCmt/${reCmt}/${this.rcmt}/${this.review.iuser}`, {});
            this.rcmt = '';
        }

    },
}

</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');
    * { color:var(--white); }
    img { display: inline-block; width:100%; height:auto; border-radius: 15px;}
    li { list-style: none;}
    a { text-decoration: none;}

    .fc-yell { color: var(--subFont--color); }
    .fc-oran { color: var(--font--color); }

    .container { background: var(--bg--black); border-radius: 10px;}
    #refreshing { animation: refreshing 3s;}
        @keyframes refreshing  {
	        0% {
		    opacity: 0;
	        }
            100% {
                opacity: 1;
            
            }
    }

    /* ----- 영화 정보 ----- */
    .movie__poster { width: 340px;}

    .movie__info li { font-size:1.2rem; text-align: left; padding:10px 5px; }
    .movie__info li span {color:gray;}
    .movie__title { font-size:2.5rem;}

    /* 영화 줄거리  */
    .movie__intro__ctnt { border-top:1px solid var(--font--color); padding: 15px 10px; line-height: 2rem;}
    .movie__intro__ctnt video { width:80%; height:auto;}

    /* ----- 상영날짜 ----- */
    #select-day { background-color: #32485388; padding: 5px; border: none; border-radius: 5px;}
    .dateBtn {background-color: transparent; border:none;}
    .movie__timeList { margin-top: 20px; height: auto; overflow:hidden;}
    .theater__List li { margin:10px 0; text-align: left;}
    .theater__timeList {background-color: #32485388; border-radius: 5px;}
    .theater__title { margin-bottom: 7px; font-weight: 700;}
    .theater__List .ticketBtn { border:1px solid #72727288; margin: 5px 8px}
    .movie__detailTheater { color:#adadad;}
    .ticketBtn:hover {background-color:var(--font--color);}
    .ticketBtn:hover div { color:var(--white);}

   

    /* ----- 별점 ----- */
    .star-rating {
    display: flex;
    flex-direction: row-reverse;
    font-size: 3rem;
    line-height: 3.25rem;
    justify-content: space-around;
    padding: 0 0.2em;
    text-align: center;
    width: 5em;
    }
    
    .star-rating input { display: none; }
    
    .star-rating label {
    -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1px;
    cursor: pointer;
    }
    
    .star-rating :checked ~ label { -webkit-text-fill-color: var(--subFont2--color); }
    
    .star-rating label:hover,
    .star-rating label:hover ~ label { -webkit-text-fill-color: var(--subFont2--color); }

    /* ----- 리뷰 ----- */
    #movie-review .review__input { position: relative; height:90px; }
    #movie-review .review__input .review__txt {
        padding: 15px;
        border:none;
        resize: none;
        width:100%;
        height:100%;
        box-sizing: border-box;
        border: 1px solid var(--font--color); border-radius: 10px;
        background: transparent;
    }
    #movie-review .review__input .review__limit {
        position: absolute;
        bottom: 12px;
        right: 20px;
        color: var(--font--color);
        letter-spacing: -0.09px;
    }
    #movie-review .review__form .review__btn {
        background-color: var(--font--color);
        border: none;
        border-radius: 10px;
        width: 95px; height:90px;
        padding: 5px 20px;
    }

    .review__box .more__btn { border:none; background: transparent;}

    /* ----- 리뷰 리스트 ----- */
    .review__comment { border-bottom:1px solid #535e6488; margin:10px auto; padding:15px; width:90%; overflow: hidden; text-align: left; }
    .writer__score { display: inline-block; color:var(--subFont--color);}
    .writer__info .writer__cre { font-size:0.8rem; color:gray;  }
    .writer__info .writer { color: var(--font--color); font-family: 'round'; margin-right:10px; }

    /* ----- 대댓글 리스트 ----- */
    .cmReview__cnt { margin:10px auto; padding:15px; width:90%; overflow: hidden; text-align: left; font-size:0.8em; }
    .cmWriter__cre { font-size:0.6rem; color:gray;  }
    .cmWriter { color: var(--font--color); font-family: 'round'; margin-right:10px; font-size: 0.9em;}

    /* 추천 스타일 */
    .recommend {
        color: var(--font--color);
        /* 젤리 애니메이션 */
        -webkit-animation: jello-vertical 0.9s both;
	    animation: jello-vertical 0.9s both;
    }
    .jello-horizontal {
        -webkit-animation: jello-horizontal 0.9s both;
                animation: jello-horizontal 0.9s both;

    }

.d-none{
    display: none;
}

.cmtFiled{
    width: 300px;
    background-color: black;
}

.addCmt{
    background-color: darkorange;
    border-radius: 5px;
    font-size: 0.9em;
}

.cmtLi{
    padding: 5px;
}
</style>