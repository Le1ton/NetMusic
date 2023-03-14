<template>
  <div id="swipercom">
    <div class="swiper" id="swiperIndex">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, i) in imgs" :key="i"><img :src="item.pic" alt=""></div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import Swiper from 'swiper'
import { getBanner } from "@/api/index"

export default {
  data: function () {
    return {
      imgs: []
      // imgs: [
      //   { pic: require('../assets/img/swiper1.jpg') },
      //   { pic: require('../assets/img/swiper2.jpg') },
      //   { pic: require('../assets/img/swiper3.jpg') },
      //   { pic: require('../assets/img/swiper4.jpg') },
      //   { pic: require('../assets/img/swiper5.jpg') },
      // {pic: require('../assets/img/swiper5.jpg')},
      // {pic: require('../assets/img/swiper5.jpg')},
      // {pic: require('../assets/img/swiper5.jpg')},
      // ]
    }
  },
  async mounted() {
    let res = await getBanner(1)
    this.imgs = res.data.banners

  },
  updated: function () {
    var mySwiper = new Swiper('#swiperIndex', {
      effect: 'fade',
      loop: true, // 循环模式选项
      // 轮播图居中
      centeredSlides: true,
      autoplay: {
        disableOnInteraction: false, // 鼠标滑动后继续自动播放
        delay: 4000, //4秒切换一次
      },
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
}

</script>

<style lang="less">
#swipercom {
  width: 7.5rem;

  #swiperIndex.swiper {
    width: 7.1rem;
    height: 3rem;
    overflow: hidden;
    margin: 0.2rem auto 0;
    position: relative;


    .swiper-slide img {
      width: 100%;
      border-radius: 0.1rem;
    }

    .swiper-pagination {
      position: absolute;
      bottom: 0.26rem;
    }

    .swiper-pagination-bullet-active {
      background-color: rgb(241, 43, 43);
    }
  }
}
</style>

