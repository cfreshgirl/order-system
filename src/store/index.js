import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //对应的用户id和商品信息
    orderInf: {"orderclass":"","oinf":[],"addinf":"","totalprice":"","chooseadd":0,"managerproinf":"","supermanageruserinf":""
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
