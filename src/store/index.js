import { createStore } from 'vuex'
import api from '@/api/index.js'

export default createStore({
  state: {
    playlist: [{
      name: "落下(いっぱつにゅうこんver.)",
      id: '484249940',
      al: {
        name: "cry",
        picUrl: "http://p4.music.126.net/DEkk-OIlzDVxsoo1tW-Dug==/19035844811868074.jpg"
      }
    }],
    playCurrentIndex: 0,
    lyric: '',
    currentTime: 0,
    intervalId: 0,
    user: {
      isLogin: false,
      userName: "未登录",
      
    }
  },
  getters: {
    lyricList: function (state) {
      // 设定数组来拆分歌词
      let arr = state.lyric.split(/\n/igs).map((item, i, arr) => {
        let min = parseInt(item.slice(1, 3));
        let sec = parseInt(item.slice(4, 6));
        let mill = item[9]=== ']' ? parseInt(item.slice(7, 9)) : parseInt(item.slice(7, 10))
        let lrc = item[9]=== ']' ? item.slice(10, item.length) : item.slice(11, item.length)

        return {
          min, sec, mill,
          lyric: lrc,
          content: item,
          time: mill + sec * 1000 + min * 60 * 1000
        }
      })

      arr.forEach((item, i) => {
        if (i == 0) {
          item.pre == 0;
        } else {
          item.pre = arr[i - 1].time
        }

      })
      return arr
    }
  },
  mutations: {
    setPlaylist: function (state, value) {
      state.playlist = value
    },
    pushPlaylist:function(state,value){
      state.playlist.push(value)
    },
    setPlayIndex(state, value) {
      state.playCurrentIndex = value
    },
    setLyric(state, value) {
      state.lyric = value
    },
    setCurrentTime(state, value) {
      state.currentTime = value
    },
    setUser(state) {
      state.user.isLogin = true;
    }
  },
  actions: {
    async reqLyric(content, payload) {
      // console.log(payload);
      let result = await api.getLyric(payload.id)
      content.commit('setLyric', result.data.lrc.lyric)
      // console.log(result.data.lrc.lyric);
    },
    async phoLogin(content, payload) {
      // console.log(payload);  
      let result = await api.phoneLogin(payload.phone, payload.password)
      if(result.data.code == 404) {
        // content.state.user.isLogin = true;
        // content.commit('setUser',state.user.isLogin)
        content.commit('setUser')
      }
      console.log(result);
      return result
    }

  },
  modules: {
  }
})
