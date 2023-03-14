<template>
    <div class="playlist">
        <div class="playlist-top">
            <div class="play">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <div class="text">
                    <div class="title">播放全部</div>
                    &nbsp;
                    <div class="num">(共{{ playlist.tracks.length }}首)</div>
                </div>
            </div>

            <div class="subscribed">
                + 收藏({{ changValue(playlist.subscribedCount) }})
            </div>

        </div>

        <div class="list">
            <div class="playitem" v-for="(item, i) in playlist.tracks" :key="i">
                <div class="left" @click="setPlayIndex(i)">
                    <div class="index">{{ i + 1 }}</div>
                    <div class="content">
                        <div class="title">{{ item.name }}</div>
                        <div class="author">
                            <!-- <span class="tag" v-for="(tag, index) in playlist.tags" :key="index">{{ tag }}</span> -->
                            <!-- <span class="arname" v-for="(arname, index) in item.ar[0].name" :key="index">{{ arname }}</span> -->
                            <span class="arname">{{ item.ar[0].name }}</span>
                            -
                            <span>{{ item.al.name }}</span>
                            <!-- &nbsp;-&nbsp;
                            <div class="album">{{ item.al.name }}</div> -->
                        </div>
                    </div>
                </div>

                <div class="right">
                    <i class="iconfont icon-bofang1"></i>
                    <i class="iconfont icon-gengduo-shuxiang"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    props: ['playlist'],
    methods: {
        changValue: function (num) {
            let res = 0
            if (num >= 100000000) {
                res = num / 100000000;
                res = res.toFixed(2) + "亿"
            } else if (num > 100000) {
                res = num / 10000;
                res = res.toFixed(2) + "万"
            } else {
                res = num
            }
            return res
        },
        ...mapMutations(['setPlayIndex'])
    },
}

</script>

<style lang="less">
.playlist {
    width: 7.5rem;
    padding: 0 0.1rem;
    background-color: #fff;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.3rem;


    .playlist-top {
        display: flex;
        justify-content: space-between;
        height: 0.8rem;
        align-items: center;
        margin-top: 0.3rem;

        .play {
            display: flex;
            align-items: center;

            .icon {
                width: 0.4rem;
                height: 0.4rem;
                margin-right: 0.16rem;
            }

            .title {
                font-size: 0.35rem;
                font-weight: 900;
            }

            .num {
                font-size: 0.1rem;
                color: #ccc;
            }

            .text {
                display: flex;
                align-items: center;
            }
        }

        .subscribed {
            // width: 2.2rem;
            padding: 0 0.1rem;
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 0.2rem;
            color: #f1f0f0;
            background-color: orangered;
            border-radius: 0.25rem;
            text-align: center;
            margin-right: 0.1rem;
        }
    }

    .list {
        .playitem {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1rem;
            padding-right: 0.1rem;

            .left {
                display: flex;
                align-items: center;
                color: #a09e9e;

                .index {
                    width: 0.4rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    text-align: center;
                    margin-right: 0.16rem;

                }

                .title {
                    width: 5rem;
                    font-size: 0.3rem;
                    font-weight: 999;
                    color: black;
                    margin-bottom: 0.05rem;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }

                // .content {
                //     margin-left: 0.4rem;
                // }


                .tag {
                    font-size: 0.2rem;
                    color: orangered;
                    border: 1px solid orange;
                    border-radius: 0.1rem;
                    color: #666;
                }

                .author {
                    width: 4rem;
                    color: #666;
                    font-size: 0.1rem;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }

            .right {
                .iconfont {
                    color: #a09e9e;
                    font-size: 0.4rem;
                    margin-left: 0.4rem;
                }
            }
        }


    }
}
</style>