<template>
    <div class="playMusic">
        <div class="bg" :style="{ backgroundImage: `url(${playDetails.al.picUrl})` }"></div>
        <div class="playTop">
            <div class="back" @click="$emit('back')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
            </div>
            <div class="center">
                <div class="title">
                    <marquee behavior="scroll" direction="left">{{ playDetails.name }}</marquee>
                </div>
                <div class="author"></div>
            </div>
            <div class="share">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiangxiao"></use>
                </svg>
            </div>
        </div>
        <div class="playContent" v-show="!isLyric">
            <div class="needle" :class="{ active: !paused }">
                <img src="../assets/img/needle-ab.png" alt="">
            </div>
            <div class="disc">
                <img src="../assets/img/disc-ip6.png" alt="">
                <img class="cover" :src="playDetails.al.picUrl" alt="">
            </div>
        </div>

        <div class="playLyric" v-show="isLyric" ref="playLyric">
            <p :class="{active:(currentTime*1000>=item.pre && currentTime*1000<item.time)}" v-for="(item, i) in $store.getters.lyricList" :key="i">{{ item.lyric }}</p>
        </div>

        <div class="progress"></div>
        <div class="playFooter">
            <i class="iconfont icon-xunhuan"></i>
            <i class="iconfont icon-shangyishoushangyige" @click="goPlay(-1)"></i>
            <i v-if="paused" class="iconfont play icon-24gl-play" @click="play"></i>
            <i v-else class="iconfont play icon-24gl-pauseCircle" @click="play"></i>
            <i class="iconfont icon-xiayigexiayishou" @click="goPlay(1)"></i>
            <i class="iconfont icon-liebiaoxingshi"></i>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: ['playDetails', 'paused', 'play'],
    data: function () {
        return {
            isLyric: true,
        }
    },
    computed: {
        ...mapState(['lyric', 'currentTime', 'playlist', 'playCurrentIndex']),
        
    },
    watch: {
        currentTime: function(newValue) {
            console.log(newValue);
            console.log([this.$refs.playLyric]);
            let p = document.querySelector('p.active')
            console.log(p.offsetTop);

            if(p && p.offsetTop > 150) {
                console.log(11111);
                this.$refs.playLyric.scrollTop = p.offsetTop
                console.log([p]);

            }
        }
    },
    methods: {
        goPlay(num) {
            console.log(num);
            console.log(this.playlist);
            console.log(this.playCurrentIndex);
            let index = this.playCurrentIndex + num
            if (index < 0) {
                index = this.playlist.length - 1
            } else if (index > this.playlist.length) {
                index = 0
            }
            this.$store.commit('setPlayIndex', index)
        }
    }
}

</script>

<style lang="less">
.playMusic {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;


    .bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-size: auto 100%;
        background-position: center;
        filter: blur(60px);
    }

    .playTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 7.5rem;
        height: 1.2rem;
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        padding: 0 0.4rem;

        .icon {
            fill: #fff;
            width: 0.5rem;
            height: 0.5rem;
        }

        marquee {
            width: 5rem;
            flex: 1;
        }
    }

    .playContent {
        position: absolute;
        width: 7.5rem;
        height: 7.5rem;
        left: 0;
        top: 1.5rem;

        .needle {
            width: 2rem;
            height: auto;
            position: absolute;
            left: 50%;
            z-index: 9;
            transform-origin: 0 0;
            transform: rotate(-10deg);
            transition: all 1s;

            img {
                width: 100%;
            }
        }

        .needle.active {
            transform: rotate(8deg);

        }

        .disc {
            width: 5.5rem;
            height: auto;
            position: absolute;
            left: 50%;
            margin-left: -(5.5rem/2);
            top: 2.2rem;

            img {
                width: 100%;
            }

            .cover {
                position: absolute;
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 1.75rem;
                left: 50%;
                margin-left: -1.7rem;
                top: 1rem;
            }

        }
    }

    .playLyric {
        position: absolute;
        width: 7.5rem;
        height: 8rem;
        left: 0;
        top: calc(50% - 4rem);
        overflow: scroll;
        text-align: center;
        color: #fff;
        padding: 0.2rem 1rem;

        .active {
            color: red;
        }

    }

    .playFooter {
        width: 7.5rem;
        height: 1.5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;

        .iconfont {
            color: #fff;
            font-size: 0.5rem;

        }

        .play {
            font-size: 0.8rem;
        }
    }
}
</style>