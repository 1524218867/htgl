// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: localStorage.getItem('username') || '' // 默认值或从 localStorage 恢复
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
            localStorage.setItem('username', username); // 同时存储到 localStorage
        }
    },
    actions: {

    },
    getters: {

    },
});
// 状态（state）：用于存储应用的状态，如侧边栏是否折叠。
// 变更（mutations）：同步地修改状态，通常是由组件触发。
// 操作（actions）：可以进行异步操作并触发变更。
// 获取器（getters）：从状态中派生出计算值，类似于计算属性。