import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 存放所有的数据列表
    list: [],
    // 文本框的默认显示数据
    inputValue: 'aaa',
    // 默认ID
    itemId: 5,
    // 切换按钮的状态
    viewKey: 'all'
  },
  mutations: {
    // 初始化数据的方法
    initList (state, list) {
      state.list = list
    },
    // 为input中的Value重新赋值
    setInputValue (state, val) {
      state.inputValue = val
    },
    // 添加一条数据的方法
    addItem (state) {
      // 组装一个对象,然后Push到state的Item中
      const objItem = {
        id: state.itemId,
        info: state.inputValue.trim(),
        done: false
      }
      // 把新组装的对象,push到保存数据的数组中
      state.list.push(objItem)
      // id是随着添加条数,进行自增
      state.itemId++
      // 添加完毕后,清空value
      state.inputValue = ""
    },
    // 删除一条数据的方法
    removeItem (state, id) {
      // 根据id进行查找对应的索引
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 根据选中,更改状态显示
    changeStatus (state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    // 清除已完成的数据项
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改视图的关键字
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    // 发送请求数据的方法
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 统计未完成的数据项
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    // 按需切换需要展示的数据源
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  }
})
