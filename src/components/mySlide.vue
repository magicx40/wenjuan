<template>
    <div class="my-slide_wrap">
        <div ref="slidesRef" class="my-slides" role="slideList">
            <slot>
            </slot>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, nextTick, defineComponent, watch, onMounted, onUnmounted } from 'vue'

const slideProps = {
    slidesPerView: {
        type: Number,
        default: 1
    },
    loop: {
        type: Boolean,
        default: false
    },
    currentIndex: {
        type: Number,
        default: 0
    }
}

export default defineComponent({
    name: 'mySlide',
    props: slideProps,
    emits: ['update:currentIndex'],
    setup(props, { emit }) {
        const slidesRef = ref<HTMLElement | null>(null);

        const activeSlideIndex = ref(props.currentIndex);
        const slideItemWidth = ref(0);
        const totalItemsRef = ref(0);
        const slidesDomWidth = ref(0);

        const to = (toSlideItemIndex: number, enableTransition = true) => {
            console.log(activeSlideIndex.value);
            activeSlideIndex.value = toSlideItemIndex;
            updateSlideItems(enableTransition);
        }
        const next = () => {
            activeSlideIndex.value++;
            if (!props.loop && activeSlideIndex.value > totalItemsRef.value - 1) {
                activeSlideIndex.value = totalItemsRef.value - 1;
                return;
            }
            if (props.loop && activeSlideIndex.value > totalItemsRef.value - 1) {
                activeSlideIndex.value = 0;
            }
            updateSlideItems();
        }
        const prev = () => {
            activeSlideIndex.value--;
            if (!props.loop && activeSlideIndex.value < 0) {
                activeSlideIndex.value = 0;
                return;
            }
            if (props.loop && activeSlideIndex.value < 0) {
                activeSlideIndex.value = totalItemsRef.value - 1;
            }
            updateSlideItems();
        }

        const updateCurrentIndex = (currentIndex: number) => {
            emit('update:currentIndex', currentIndex);
        };

        const updateSlideItems = (enableTransition = true) => {
            nextTick(() => {
                if (!slidesRef || !slidesRef.value) return;
                let offsetX = 0;
                if (totalItemsRef.value - activeSlideIndex.value < props.slidesPerView) {
                    offsetX = (props.slidesPerView - (totalItemsRef.value - activeSlideIndex.value)) * slideItemWidth.value;
                };
                let translate = - activeSlideIndex.value * slideItemWidth.value + offsetX;
                slidesRef.value.style = `transition-duration: ${enableTransition ? '300ms' : '0ms'}; transform: translateX(${translate}px);`
            });
        }

        const handleResize = () => {
            nextTick(() => {
                if (!slidesRef || !slidesRef.value) return;
                if (slidesRef.value.clientWidth != slideItemWidth.value) {
                    init();
                }
            });
        }

        onMounted(() => {
            window.addEventListener('resize', handleResize, false);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize, false);
        });

        const init = () => {
            nextTick(() => {
                if (slidesRef.value) {
                    console.dir(slidesRef.value)
                    slidesDomWidth.value = slidesRef.value.clientWidth;
                    slideItemWidth.value = slidesDomWidth.value / (props.slidesPerView);
                    let slidesItemList = slidesRef.value.children;
                    totalItemsRef.value = slidesItemList.length;
                    for (let i = 0; i < slidesItemList.length; i++) {
                        let slideItem = slidesItemList[i];
                        if (!slideItem.classList.contains('slide_item')) {
                            slideItem.classList.add('slide_item');
                        }
                        if (i === activeSlideIndex.value && !slideItem.classList.contains('slide_item--active')) {
                            slideItem.classList.add('slide_item--active');
                        }
                        slideItem.style = `width:${slideItemWidth.value}px;`;
                    }
                }
            });
        }

        const getCurrentActiveIndex = () => {
            return activeSlideIndex.value;
        }

        const updateActiveSlideItemStyle = () => {
            nextTick(() => {
                if (!slidesRef || !slidesRef.value) return;
                let slidesItemList = slidesRef.value.children;
                for (let i = 0; i < slidesItemList.length; i++) {
                    let slideItem = slidesItemList[i];
                    if (i === activeSlideIndex.value && !slideItem.classList.contains('slide_item--active')) {
                        slideItem.classList.add('slide_item--active');
                    } else if (i !== activeSlideIndex.value && slideItem.classList.contains('slide_item--active')) {
                        slideItem.classList.remove('slide_item--active');
                    }
                }
            });
        };

        watch(() => props.slidesPerView, (newProp) => {
            init();
        }, { immediate: true });

        watch(() => props.currentIndex, (newProp) => {
            to(props.currentIndex,false);
        }, { immediate: true });

        watch(activeSlideIndex, (newValue) => {
            updateActiveSlideItemStyle();
            updateCurrentIndex(newValue);
        });

        return {
            slidesRef,
            activeSlideIndex,
            to,
            next,
            prev,
            getCurrentActiveIndex,
        }
    }
});




</script>
<style lang="scss">
.my-slide_wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .my-slides {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;

        .slide_item {
            flex-shrink: 0;
            position: relative;
            width: 100%;
            height: 100%;
            outline: none;
            overflow: hidden;
            opacity: 0.3;

            img {
                width: 100%;
                height: 100%;
            }

            &.slide_item--active {
                opacity: 1;
            }
        }
    }
}
</style>