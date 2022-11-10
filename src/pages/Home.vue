<template>
    <div class="page_home">
        <div class="carousel_box">
            <div class="carousel_humbnails_container">
                <div class="movie_info">
                    <span>{{moviesList.length}}</span>
                    <span>视频数量</span>
                </div>
                <div>

                </div>
            </div>
            <n-carousel class="carousel_card" effect="card"
                prev-slide-style="transform: translateX(-150%) translateZ(-200px);"
                next-slide-style="transform: translateX(50%) translateZ(-200px);" style="height: 400px;"
                show-arrow :touchable="false">
                <n-carousel-item :style="{ width: '60%' }" v-for="item in moviesList" :key="item.id">
                    <img class="carousel-img" :src="item.url">
                </n-carousel-item>
                <template #arrow="{ prev, next }">
                    <div class="custom-arrow">
                        <button type="button" class="custom-arrow--left" @click="prev">
                            <n-icon>
                                <ArrowBack />
                            </n-icon>
                        </button>
                        <button type="button" class="custom-arrow--right" @click="next">
                            <n-icon>
                                <ArrowForward />
                            </n-icon>
                        </button>
                    </div>
                </template>
            </n-carousel>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { ArrowBack, ArrowForward } from '@vicons/ionicons5'

const props = defineProps({
    height: {
        type: Number,
        default: 400
    }
})
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
    }
])
</script>
<style lang='scss' scoped>
.carousel-img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.carousel_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .carousel_humbnails_container {
        .movie_info {
            display: flex;
            flex-direction: column;
        }
    }
    .carousel_card {
        position: relative;
        .custom-arrow {
            display: flex;
            width: 100%;
            justify-content: space-between;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            padding: 0 12px;
            box-sizing: border-box;
            z-index: 0;

            button {
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
                cursor: pointer;
            }

            button:hover {
                background-color: rgba(97, 74, 74, 0.9);
            }

            button:active {
                transform: scale(0.95);
                transform-origin: center;
            }
        }
    }
}
</style>