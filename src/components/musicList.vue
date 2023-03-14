<template>
    <div class="musicList">
        <div class="musicList-top">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="mlist">

            <!-- Swiper -->
            <div class="swiper mySwiper" id="musicSwiper">
                <div class="swiper-wrapper">
                    <router-link :to="{path: '/listview', query:{id:item.id}}" class="swiper-slide" v-for="(item, i) in state.musicList" :key="i">
                        <img :src="item.picUrl" :alt="item.name">
                        <div class="name">{{ item.name }}</div>
                        <div class="count">
                            <i class="iconfont icon-24gl-play"></i>
                            &nbsp;
                            <span>{{ changValue(item.playCount) }}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import 'swiper/css/swiper.css'
import Swiper from 'swiper'
import { getMusicList } from "@/api/index"
import { reactive, onMounted, onUpdated } from "vue"
import { RouterLink } from 'vue-router'

// vue3
export default {
    setup() {
        let state = reactive({ musicList: [] });
        function changValue(num) {
            let res = 0;
            if (num >= 100000000) {
                res = num / 100000000;
                res = res.toFixed(2) + "亿";
            }
            else if (num > 10000) {
                res = num / 10000;
                res = parseInt(res) + "万";
            }
            return res;
        }
        onMounted(async () => {
            let res = await getMusicList();
            state.musicList = res.data.result;
            console.log(res);
        });
        onUpdated(() => {
            var swiper = new Swiper("#musicSwiper", {
                slidesPerView: 3.3,
                spaceBetween: 10,
                freeMode: true,
            });
        });
        return {
            state,
            changValue
        };
    },
    components: { RouterLink }
}

/* vue2
export default {
    data: function () {
        return {
            musicList: []
        }
    },
    methods: {
        changValue: function(num) {
            let res = 0
            if(num >= 100000000){
                res = num / 100000000;
                res = res.toFixed(2) + "亿"
            }else if(num > 10000) {
                res = num / 10000;
                res = parseInt(res) + "万"
            }
            return res
        }
    },
    mounted: async function () {
        let res = await getMusicList(10)
        console.log(res);
        this.musicList = res.data.result
    },
    updated: function () {
        var swiper = new Swiper("#musicSwiper", {
            slidesPerView: 3.3,
            spaceBetween: 10,
            freeMode: true,
        });
    },
    
}
*/

</script>

<style lang="less">
.musicList {
    width: 7.5rem;
    padding: 0.4rem 0.3rem;

    .musicList-top {
        display: flex;
        // 主轴两端分布
        justify-content: space-between;
        height: 1rem;
        align-items: center;


        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }

        .more {
            width: 1.2rem;
            height: 0.5rem;
            line-height: 0.5rem;
            font-weight: 400;
            border: 1px solid #ccc;
            border-radius: 0.2rem;
            font-size: 0.24rem;
            text-align: center;


        }
    }

    .mlist {

        .swiper {
            width: 100%;
            height: 3rem;
            overflow: hidden;

            .swiper-slide {
                display: flex;
                flex-direction: column;
                position: relative;

                img {
                    width: 100%;
                    border-radius: 0.1rem;
                }

                .name {
                    height: 0.6rem;
                    width: 100%;
                    font-size: 0.24rem;
                    // line-height: 0.4rem;
                    overflow: hidden;
                    text-overflow: ellipsis; //文本溢出显示省略号；
                    -webkit-line-clamp: 2; //限制在一个块元素显示的文本的行数
                    -webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式 ，配合-webkit-line-clamp属性使用
                    display: -webkit-box; //将对象作为弹性伸缩盒子模型显示，配合-webkit-line-clamp属性使用
                }

                .count {
                    position: absolute;
                    right: 0.1rem;
                    top: 0.1rem;
                    font-size: 0.2rem;
                    color: #e2e2e2;
                    display: flex;
                    align-items: center;

                    .iconfont {
                        font-size: 0.18rem;
                    }
                }
            }

        }


    }

}
</style>

