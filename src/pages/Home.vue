<template>
    <div class="page_home">
        <div class="carousel_box">
            <n-carousel 
                effect="card"
                prev-slide-style="transform: translateX(-150%) translateZ(-200px);"
                next-slide-style="transform: translateX(50%) translateZ(-200px);" 
                style="height: 400px;" 
                :show-dots="true"
                show-arrow
            >
                <n-carousel-item :style="{ width: '60%' }">
                    <img class="carousel-img"
                        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">
                </n-carousel-item>
                <n-carousel-item :style="{ width: '60%' }">
                    <img class="carousel-img"
                        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg">
                </n-carousel-item>
                <n-carousel-item :style="{ width: '60%' }">
                    <img class="carousel-img"
                        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg">
                </n-carousel-item>
                <n-carousel-item :style="{ width: '60%' }">
                    <img class="carousel-img"
                        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg">
                </n-carousel-item>
            </n-carousel>
        </div>
    </div>
</template>
<script setup lang='ts'>

</script>
<style lang='scss' scoped>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>