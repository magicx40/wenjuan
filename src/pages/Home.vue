<template>
    <div class="page_home">
        <div class="carousel_box">
            <div class="carousel_humbnails_container">
                <div class="video_info">
                    <span>{{ moviesList.length }}</span>
                    <span>视频数量</span>
                </div>
                <div class="video_list_wrap">
                    <button type="button" class="custom-arrow--left" @click="slidePrev">
                        <n-icon>
                            <ArrowBack />
                        </n-icon>
                    </button>
                    <my-slide ref="slideRef" :slides-per-view="4" @update:currentIndex="updateSlideCurrentIndex"
                        :loop="true">
                        <div class="slide_item" v-for="item in moviesList" :key="item.id" @click="slideItemClick(item)">
                            <!-- <img :src="item.url" /> -->
                            <video :ref="(el) => setSourceRefs(el, item)"
                                style="width: 100%;height: 100%;background: #000;" mediatype="video"
                                @play="playVideo(item)">
                                <source :src="item.url" />
                            </video>
                        </div>
                    </my-slide>
                    <button type="button" class="custom-arrow--right" @click="slideNext">
                        <n-icon>
                            <ArrowForward />
                        </n-icon>
                    </button>
                </div>
            </div>
            <div class="carousel_movies_container">
                <button type="button" class="arrow--left" @click="moviePrev">
                    <n-icon>
                        <ArrowBack />
                    </n-icon>
                </button>
                <n-carousel class="carousel_card" ref="moviesRef" effect="card"
                    prev-slide-style="transform: translateX(-150%) translateZ(-200px);"
                    next-slide-style="transform: translateX(50%) translateZ(-200px);" style="height: 400px;" show-arrow
                    :touchable="false" :on-update:currentIndex="updateMovieCurrentIndex">
                    <n-carousel-item :style="{ width: '60%' }" v-for="item in moviesList" :key="item.id" @click="movieItemClick(item)">
                        <!-- <img class="carousel-img" :src="item.url"> -->
                        <video style="width: 100%;height: 100%;background: #000;" mediatype="video"
                            :ref="(el) => setMovieRefs(el, item)">
                            <source :src="item.url" />
                        </video>
                    </n-carousel-item>
                </n-carousel>
                <button type="button" class="arrow--right" @click="movieNext">
                    <n-icon>
                        <ArrowForward />
                    </n-icon>
                </button>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { ref, defineComponent, nextTick, onMounted } from 'vue'
import type { NCarousel } from 'naive-ui'
import { ArrowBack, ArrowForward } from '@vicons/ionicons5'
import MySlide from '@/components/mySlide.vue'

export default defineComponent({
    components: { ArrowBack, ArrowForward },
    setup() {
        const moviesRef = ref<typeof NCarousel | null>(null)
        const slideRef = ref<typeof MySlide | null>(null)
        const moviesList = ref([
            {
                id: 0,
                // url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg'
                url: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4',
                sourceRef: null,
                movieRef: null,
            },
            {
                id: 1,
                // url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg'
                url: 'https://www.w3schools.com/html/movie.mp4',
                sourceRef: null,
                movieRef: null,
            },
            {
                id: 2,
                // url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
                url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                sourceRef: null,
                movieRef: null,
            },
            {
                id: 3,
                // url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
                url: 'https://www.w3schools.com/html/movie.mp4',
                sourceRef: null,
                movieRef: null,
            },
            {
                id: 4,
                // url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F55402f62682e3.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670765335&t=4a83b158c55f932276f8b7e7c4bbe502'
                url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
                sourceRef: null,
                movieRef: null,
            },
            {
                id: 5,
                // url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F121420113514%2F201214113514-6-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670765438&t=3e6c29aecd4f5afb05a8d1461681a426'
                url: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
                sourceRef: null,
                movieRef: null,
            }
        ]);

        const moviePrev = () => {
            if (moviesRef.value) {
                moviesRef.value!.prev();
            }
        }

        const movieNext = () => {
            if (moviesRef.value) {
                moviesRef.value!.next();
            }
        }

        const slidePrev = () => {
            if (slideRef.value) {
                slideRef.value.prev();
                console.log('currentIndex:', slideRef.value.getCurrentActiveIndex());
                play(slideRef.value.getCurrentActiveIndex());
            }
        }

        const slideNext = () => {
            if (slideRef.value) {
                slideRef.value.next();
                console.log('currentIndex:', slideRef.value.getCurrentActiveIndex());
                play(slideRef.value.getCurrentActiveIndex());
            }
        }

        // 视频播放函数
        const play = (videoId: number) => {
            if (moviesList.value) {
                moviesList.value.forEach(item => {
                    if (item.id === videoId) {
                        playVideo(item);
                    }
                })
            }
        }

        const slideItemClick = (videoInfo: Record<string,any>) => {
            if (slideRef.value) {
                slideRef.value.to(videoInfo.id);
                if (!videoInfo.sourceRef.controls) {
                    play(videoInfo.id);
                }
            }
        }

        const movieItemClick = (videoInfo: Record<string,any>) => {
            if (moviesRef.value) {
                if (!videoInfo.movieRef.controls) {
                    play(videoInfo.id);
                }
            }
        }

        const setSourceRefs = (el: HTMLElement | null, item: Record<string, any>) => {
            item.sourceRef = el;
        }
        const setMovieRefs = (el: HTMLElement | null, item: Record<string, any>) => {
            item.movieRef = el;
        }

        const playVideo = (videoInfo: Record<string, any>) => {
            console.log(videoInfo);
            if (videoInfo.movieRef && !videoInfo.movieRef.playing) {
                videoInfo.movieRef.controls = true;
                videoInfo.movieRef.play();
            }
            if (videoInfo.sourceRef && !videoInfo.sourceRef.playing) {
                videoInfo.sourceRef.controls = true;
                videoInfo.sourceRef.play();
            }
            if (moviesList.value) {
                moviesList.value.forEach(item => {
                    if (item.id !== videoInfo.id) {
                        if (item.movieRef) {
                            item.movieRef.controls = false;
                            item.movieRef?.pause();
                        }
                        if (item.sourceRef) {
                            item.sourceRef.controls = false;
                            item.sourceRef?.pause();
                        }
                    }
                });
            }
        };

        /**
         * 同步MovieRef
         * @param currentIndex 
         */
        const updateSlideCurrentIndex = (currentIndex: number) => {
            nextTick(() => {
                if (!moviesRef || !moviesRef.value) return;
                moviesRef.value?.to(currentIndex);
            })
        }
        /**
         * 同步SlideRef
         * @param currentIndex 
         */
        const updateMovieCurrentIndex = (currentIndex: number) => {
            nextTick(() => {
                if (!slideRef || !slideRef.value) return;
                slideRef.value?.to(currentIndex);
                play(currentIndex);
            })
        }

        onMounted(() => {
            nextTick(() => {
                console.log(moviesList.value);
            })
        })
        return {
            moviesRef,
            slideRef,
            moviesList,
            moviePrev,
            movieNext,
            slidePrev,
            slideNext,
            updateSlideCurrentIndex,
            updateMovieCurrentIndex,
            setSourceRefs,
            setMovieRefs,
            playVideo,
            slideItemClick,
            movieItemClick
        }
    }
});


</script>
<style lang='scss' scoped>
.carousel-img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.carousel_box {
    .carousel_humbnails_container {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .video_info {
            display: flex;
            flex-direction: column;
        }

        .video_list_wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            overflow: hidden;

            .my-slide_wrap {
                .my-slides {
                    .slide_item {
                        height: 200px;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }

    }

    .carousel_movies_container {
        position: relative;

        button {
            position: absolute;
            top: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            color: #fff;
            background-color: rgb(97, 74, 74);
            border-width: 0;
            border-radius: 8px;
            transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateY(-50%);
            cursor: pointer;
            z-index: 1;

            &.arrow--left {
                left: 25px;
            }

            &.arrow--right {
                right: 25px;
            }
        }

        button:hover {
            background-color: rgba(97, 74, 74, 0.9);
        }

    }

}
</style>