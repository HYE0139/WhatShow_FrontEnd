<template>
    <div class="container">
        <div class="banner__title d-flex flex-column align-items-center justify-content-center">
            <div class="welcome mb-5">
                <h1 class="mb-5">What movie are you going to show?</h1>
                <span><i class="fa-solid fa-quote-left"></i></span>
                <div class="describeMyself mb-5">
                    <ul class="descriptionList align-middle">
                        <li v-for="item in movieList" :key="item.idx" >{{ item.movie_nm }}</li>
                        <li>{{movieList[0].movie_nm}}</li>
                    </ul>
                </div>
                <span><i class="fa-solid fa-quote-right"></i></span>
                <span class="ms-3">보러 갈까?</span>
            </div>

            <div>
                <h5 class="mb-3">위치를 설정하여 가까운 영화관의 상영일정을 확인하세요.</h5>
                <button type="button" class="btn btn-outline-light" @click="clickLocation">위치 설정</button>
            </div>

            <div class="arrow-down d-flex justify-content-center mt-5">
                <a href="#about">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        movieList:Array
    },
    methods: {
        // header > 위치설정 클릭
        clickLocation() {
            const btn = document.querySelector('.locationModal');
            btn.click();
        }
    },
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
    
    .container { width:100%; height:100%;}
    .banner__title { height:100%;}

    .welcome h1 { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size:4rem;}
    .welcome span { display: inline-block; font-size:1.5rem; }

    /* 배너 영화 제목 애니메이션 */
    .describeMyself {
        margin: 14px 3px;
        display: inline-block;
        vertical-align: top;
        font-size: 1.5rem;
        height: 1.5em;
        font-weight: 600;
        overflow: hidden;
        color:white;
        z-index: 2;
    }

    @keyframes rolling {
        0% {
            margin-top: 0;
        }
        10% {
            margin-top: -1.5em;
        }
        20% {
            margin-top: -3em;
        }
        30%{
            margin-top: -4.5em;
        }
        40%{
            margin-top:-6em;
        }
        50%{
            margin-top:-7.5em;
        }
        60%{
            margin-top:-9em;
        }
        70%{
            margin-top:-10.5em;
        }
        80%{
            margin-top:-12em;
        }
        90%{
            margin-top:-13.5em;
        }
        100%{
            margin-top:-15em;
        }
    }

    .descriptionList {
        padding-left: 0;
        margin:0;
        animation-name: rolling;
        animation-duration: 20s;
        animation-iteration-count: infinite;
    }
    .descriptionList li {
        list-style: none;
        line-height: 1.5em;
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
    }

    /* 하단 화살표 */
    .arrow-down span{
        display: block;
        width: 1.5em;
        height: 1.5em;
        border-bottom: 1px solid #fff;
        border-right: 1px solid #fff;
        transform: rotate(45deg);
        margin: -10px;
        animation: animate-arrows 2s infinite;
    }
    @keyframes animate-arrows{
        0%{
            opacity: 0;
            transform: rotate(45deg) translate(-1.5em, -1.5em);
        }
        50%{
            opacity: 1;
        }
        100%{
            opacity: 0;
            transform: rotate(45deg) translate(1.5em, 1.5em);
        }
    }

    .arrow-down span:nth-child(1){
        animation-delay: -0.2s;
    }
    .arrow-down span:nth-child(2){
        animation-delay: -0.4s;
    }
    .arrow-down span:nth-child(3){
        animation-delay: -0.6s;
    }

    .welcome h1 {

        letter-spacing: 0;
        padding: .25em 0 .325em;
        display: block;
        margin: 0 auto;
        text-shadow: 0 0 80px rgba(255,255,255,.5);

        background: url(https://i.ibb.co/RDTnNrT/animated-text-fill.png) repeat-y;
        -webkit-background-clip: text;
        background-clip: text;

	    -webkit-text-fill-color: transparent;
	    -webkit-animation: aitf 80s linear infinite;
	    -webkit-transform: translate3d(0,0,0);
	    -webkit-backface-visibility: hidden;
    }

    @-webkit-keyframes aitf {
	    0% { background-position: 0% 50%; }
	    100% { background-position: 100% 50%; }
    }

</style>