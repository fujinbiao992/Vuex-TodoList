<template>
  <div id="app">
    <a-input placeholder="请输入任务"
             class="my_ipt"
             :value="inputValue"
             @change="inputValueChange" />
    <a-button type="primary"
              @click="addItemToList">添加事项</a-button>

    <a-list bordered
            :dataSource="infoList"
            class="dt_list">
      <a-list-item slot="renderItem"
                   slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done"
                    @change="(e)=>{cbStatusChange(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions"
           @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer"
           class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey=== 'all'?'primary':'default'"
                    @click="changeLiist('all')">全部</a-button>
          <a-button :type="viewKey==='undone'?'primary':'defalut'"
                    @click="changeLiist('undone')">未完成</a-button>
          <a-button :type="viewKey==='done'?'primary':'defalut'"
                    @click="changeLiist('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('getList', 3)
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  methods: {
    // 监听文本框的内容变化
    inputValueChange (e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    // 添加新的数据方法
    addItemToList () {
      // 判断不能为空
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框信息不能为空')
      }
      this.$store.commit('addItem')
    },
    // 删除一项数据
    removeItemById (id) {
      this.$store.commit('removeItem', id)

    },
    // 选中状态的修改方法
    cbStatusChange (e, id) {
      // 组装一个对象,存储选中状态的checked属性和id
      const param = {
        id: id,
        status: e.target.checked
      }
      // 触发一个mutations
      this.$store.commit('changeStatus', param)
    },
    // 清除已完成的数据项
    clean () {
      this.$store.commit('cleanDone')
    },
    // 切换按钮,实现按需显示数据
    changeLiist (key) {
      this.$store.commit('changeViewKey', key)

    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
