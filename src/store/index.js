import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

/************** store modules ********************/
import wxShare from './modules/wxShare';

/********************* create *************************/
export default new Vuex.Store({
  modules:{
    wxShare
  }
})
