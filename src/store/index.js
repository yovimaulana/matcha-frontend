import {
  createStore
} from 'vuex'

import auth from './auth' 

const mainstyle = {
  namespaced: true,
  state() {
    return {
      myBgColorData: 'mylightbgcolor',
      myCardBgColorData: 'mylightcardcolor',
      myTextColorData: 'mylighttext-color'
    }
  },
  getters: {
    myBgColorData(state) {
      return state.myBgColorData
    },
    myCardBgColorData(state) {
      return state.myCardBgColorData
    },
    myTextColorData(state) {
      return state.myTextColorData
    }
  },
  mutations: {
    SET_TO_DARK(state, event) {
      state.myBgColorData = event
      state.myCardBgColorData = 'mydarkcardcolor'
      state.myTextColorData = 'mydarktext-color'
    },
    SET_TO_LIGHT(state, event) {
      state.myBgColorData = event
      state.myCardBgColorData = 'mylightcardcolor'
      state.myTextColorData = 'mylighttext-color'
    }
  },
  actions: {
    setTheme({
      commit
    }, event) {
      if (event == 'mylightbgcolor') {
        commit('SET_TO_LIGHT', event)
      } else {
        commit('SET_TO_DARK', event)
      }
    }
  }
}

const compareTable = {
  namespaced: true,
  state() {
    return {
      myData: [{}],
      mySelectedData: []
    }
  },
  getters: {
    myData(state) {
      return state.myData
    },
    mySelectedData(state) {
      return state.mySelectedData
    }
  },
  mutations: {
    SET_DATA(state, event) {
      state.myData = event
    },
    SET_SELECTED_DATA(state, event) {
      state.mySelectedData = event
    }
  },
  actions: {
    setData({
      commit
    }, event) {
      commit('SET_DATA', event)
    },
    setSelectedData({
      commit
    }, event) {
      commit('SET_SELECTED_DATA', event)
    }
  }
}

export default createStore({
  namespaced: true,
  state() {
    return {
      count: 0,

    }
  },
  modules: {
    mainstyle: mainstyle,
    compareTable: compareTable,
    auth: auth
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})