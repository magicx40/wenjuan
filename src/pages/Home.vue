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
                    <my-slide ref="slideRef" :slides-per-view="4" @update:currentIndex="updateSlideCurrentIndex" :loop="true">
                        <div class="slide_item" v-for="item in moviesList" :key="item.id">
                            <img :src="item.url" />
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
                <n-carousel 
                    class="carousel_card"
                    ref="moviesRef"
                    effect="card"
                    prev-slide-style="transform: translateX(-150%) translateZ(-200px);"
                    next-slide-style="transform: translateX(50%) translateZ(-200px);" 
                    style="height: 400px;" 
                    show-arrow
                    :touchable="false"
                    :on-update:currentIndex="updateMovieCurrentIndex"
                >
                    <n-carousel-item :style="{ width: '60%' }" v-for="item in moviesList" :key="item.id">
                        <img class="carousel-img" :src="item.url">
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
import { ref, defineComponent, nextTick } from 'vue'
import type { NCarousel } from 'naive-ui'
import { ArrowBack, ArrowForward } from '@vicons/ionicons5'
import MySlide from '@/components/mySlide.vue'

export default defineComponent({
    components: { ArrowBack, ArrowForward},
    setup() {
        const moviesRef = ref<typeof NCarousel | null>(null)
        const slideRef = ref<typeof MySlide | null>(null)
        const moviesList = ref([
            {
                id: 0,
                url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg'
            },
            {
                id: 1,
                url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg'
            },
            {
                id: 2,
                url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg'
            },
            {
                id: 3,
                url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
            },
            {
                id: 4,
                url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F55402f62682e3.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670765335&t=4a83b158c55f932276f8b7e7c4bbe502'
            },
            {
                id: 5,
                url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F121420113514%2F201214113514-6-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670765438&t=3e6c29aecd4f5afb05a8d1461681a426'
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
            }
        }

        const slideNext = () => {
            if (slideRef.value) {
                slideRef.value.next();
            }
        }

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
            })
        }
        return {
            moviesRef,
            slideRef,
            moviesList,
            moviePrev,
            movieNext,
            slidePrev,
            slideNext,
            updateSlideCurrentIndex,
            updateMovieCurrentIndex
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