<template>
    <div class="listViewTop">
        <img class="bg" :src="playlist.coverImgUrl" alt="">
        <div class="listViewTop-Nav">
            <div class="left" @click="$router.back()">
                <i class="iconfont icon-zuojiantou"></i>
            </div>

            <div class="title">
                歌单
                <i class="iconfont icon-shangbiao"></i>
            </div>

            <div class="right">
                <i class="iconfont icon-sousuoxiao search"></i>
                <i class="iconfont icon-gengduo more"></i>
            </div>
        </div>

        <div class="content">
            <div class="cover">
                <img class="cover-img" :src="playlist.coverImgUrl" alt="">
                <div class="count">
                    <i class="iconfont icon-24gl-play"></i>
                    &nbsp;
                    <span>{{ changValue(playlist.playCount) }}</span>
                </div>
            </div>
            <div class="details">
                <h3>{{ playlist.name }}</h3>
                <div class="user">
                    <!-- 有这个属性才显示   -->
                    <!-- <img v-if="!!playlist.creator" :src="playlist.creator.avatarUrl" class="user-img">
                    <span v-if="!!playlist.creator">{{ playlist.creator.nickname }}</span> -->
                    <img :src="playlist.creator.avatarUrl" class="user-img">
                    <span>{{ playlist.creator.nickname }} ></span>
                </div>
                <div class="description">
                    {{ playlist.description }}
                </div>
            </div>
        </div>
           
        <div class="operation">
            <div class="review op">
                <i class="iconfont icon-liuyan"></i>
                <span>{{ playlist.commentCount }} </span>
            </div>
            <div class="link op">
                <i class="iconfont icon-fenxiangxiao"></i>
                <span>{{ playlist.shareCount }} </span>
            </div>
            <div class="download op">
                <i class="iconfont icon-24px"></i>
                <span>下载</span>
            </div>
            <div class="multiple op">
                <i class="iconfont icon-duoxuananniu"></i>
                <span>多选</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['playlist'],
    mounted() {
        // console.log(this.props);
    },
    methods: {
        changValue: function (num) {
            let res = 0
            if (num >= 100000000) {
                res = num / 100000000;
                res = res.toFixed(2) + "亿"
            } else if (num > 10000) {
                res = num / 10000;
                res = parseInt(res) + "万"
            }
            return res
        }
    },
}

</script>

<style lang="less" scoped>
.listViewTop {
    width: 7.5rem;
    padding: 0.2rem 0.4rem 0;
    // height: 6rem;
    overflow: hidden;
    color: #fff;


    .bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 7.5rem;
        height: auto;
        z-index: -1;
        filter: blur(50px);
    }

    .listViewTop-Nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.2rem;
        font-size: 0.4rem;

        .title {
            margin-left: 1rem;
            position: relative;

            .iconfont {
                font-size: 0.1rem;
                position: absolute;
                right: -0.26rem;
                top: 0;
            }
        }

        .search {
            margin-right: 0.6rem;
        }

        .left,
        .right {
            display: flex;

            .iconfont {
                width: 0.4rem;
                height: 0.4rem;
                font-size: 0.4rem;
            }
        }
    }

    .content {
        display: flex;
        justify-content: space-between;
        padding: 0.6rem 0;

        .cover {
            position: relative;
            width: 2.5rem;
            height: 2.5rem;

            .cover-img {
                // position: absolute;
                width: 100%;
                border-radius: 0.1rem;
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

        .details {
            width: 4rem;

            h3 {
                color: #fff
            }

            .user {
                display: flex;
                align-items: center;
                margin: 0.2rem 0;

                .user-img {
                    width: 0.5rem;
                    height: 0.5rem;
                    border-radius: 0.25rem;
                    margin-right: 0.14rem;
                }

                span {
                    color: #ccc;
                    font-size: 0.26rem;
                }
            }

            .description {
                font-size: 0.24rem;
                color: #e4dddd;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                display: -webkit-box;
            }

        }
    }

    .operation {
        display: flex;
        justify-content: space-around;

        .op {
            display: flex;
            flex-direction: column;
            align-items: center;

            .iconfont {
                width: 0.8rem;
                height: 0.5rem;
                font-size: 0.4rem;
                color: #d8d8d8;
                text-align: center;
            }

            span {
                font-size: 0.2rem;
                color: #ccc;
            }
        }
    }


}
</style>