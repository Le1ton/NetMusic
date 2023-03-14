<template>
    <div class="searchTop">
        <div class="searchTop-Nav">
            <div class="left" @click="$router.back()">
                <i class="iconfont icon-zuojiantou"></i>
            </div>

            <div class="right">
                <input type="text" v-model="searchKeyword" :placeholder="placeholder" @keydown.enter="saveKeyword">
            </div>
        </div>

        <div class="history" v-show="searchSongs.length == 0">
            <div class="historyLeft">
                历史
            </div>
            <div class="historyRight">
                <div @click="historySearch(item)" class="keywordItem" v-for="(item, i) in keywordList" :key="i">{{ item }}
                </div>
            </div>
        </div>

        <div class="searchSongs" v-show="searchSongs.length !== 0">
            <div class="searchSongs-top">
                <div class="play">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                    <div class="text">
                        <div class="title">播放全部</div>
                        &nbsp;
                        <div class="num">(共{{ searchSongs.length }}首)</div>
                    </div>
                </div>

            </div>

            <div class="list">
                <div class="playitem" v-for="(item, i) in searchSongs" :key="i">
                    <div class="left">
                        <div class="index">{{ i + 1 }}</div>
                        <div class="content">
                            <div class="title">{{ item.name }}</div>
                            <div class="author">
                                <span class="arname">{{ item.artists[0].name }}</span>
                                -
                                <span>{{ item.album.name }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="right">
                        <i class="iconfont icon-bofang1" @click="setPlay(item, i)"></i>
                        <i class="iconfont icon-gengduo-shuxiang"></i>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import { searchMusic } from '@/api/index.js'

export default {
    data: function () {
        return {
            placeholder: '陈奕迅',
            keywordList: [],
            searchKeyword: '',
            searchSongs: [],
        }
    },
    beforeMount() {
        console.log(123);
        this.keywordList = localStorage.keywordList ? JSON.parse(localStorage.keywordList) : []
    },
    methods: {
        saveKeyword: async function () {
            this.keywordList.push(this.searchKeyword)
            // 去重
            this.keywordList = Array.from(new Set(this.keywordList))
            // 限制历史记录最多为10个
            if (this.keywordList.length > 10) {
                this.keywordList = this.keywordList.slice(this.keywordList.length - 10, this.keywordList.length)
            }
            localStorage.keywordList = JSON.stringify(this.keywordList)
            let result = await searchMusic(this.searchKeyword)
            this.searchSongs = result.data.result.songs
            console.log(this.searchSongs);
        },
        historySearch(keyword) {
            this.searchKeyword = keyword
            this.saveKeyword()
        },
        setPlay(item, i) {
            item.al = item.album;
            item.al.picUrl = item.album.artist.img1v1Url
            console.log(item)
            this.$store.commit('pushPlaylist',item)
            this.$store.commit('setPlayIndex',this.$store.state.playlist.length-1)

        }
    },
}

</script>

<style lang="less" scoped>
.searchTop {
    width: 7.5rem;
    height: calc(100vh - 1.2rem);
    padding: 0 0.4rem;

    .searchTop-Nav {
        display: flex;
        width: 100%;
        height: 1.2rem;
        padding: 0 0.4rem;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;

        .left {

            .iconfont {
                font-size: 0.5rem;
            }

        }

        .right {
            padding-left: 0.4rem;
            flex: 1;

            input {
                width: 100%;
                height: 0.5rem;
                border: none;
                outline: none;
                border-bottom: 1px solid #666;
            }


        }

    }

    .history {
        display: flex;
        margin-top: 1.2rem;

        .historyLeft {
            width: 1rem;
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 0.4rem;
            font-weight: 900;
        }

        .historyRight {
            color: #666;
            display: flex;
            flex-wrap: wrap;
            flex: 1;

            .keywordItem {
                background-color: #eee;
                height: 0.6rem;
                line-height: 0.6rem;
                padding: 0 0.2rem;
                border-radius: 0.3rem;
                font-size: 0.2rem;
                margin-right: 0.1rem;
                margin-bottom: 0.1rem;
            }
        }
    }

    .searchSongs {
        width: 7.5rem;
        background-color: #fff;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
        position: fixed;
        top: 1.2rem;
        bottom: 1.2rem;
        overflow: scroll;


        .searchSongs-top {
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

}
</style>