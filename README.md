### 1- 实现 value 绑定显示

- 1- 给 input 标签上,绑定 value 属性,然后通过映射的方式,创建一个事件,监听 input 属性的变化

- 2- 在 state 中定义的默认 value 值,需要通过触发 commit 用来更改 state 中值,所以在 mutations 中定义一个方法,并且通过 MapState 函数,映射为当前组件的计算属性

### 2- 实现新增功能

- 1- 首先绑定一个方法,进行非空校验,如果为空直接调用\$.message 方法,并且提示 waring 信息

- 2- 在 state 中定义一个空对象,然后在 push 到原来存放数据的 list 数组中,但是数据中包含的 ID 需要单独声明,然后在 mutations 的方法中执行自增操作

- 3- 在使用的组件中,methods 方法中,更改最新数据项,使用 this.\$store.commit('addItem')方法,实现新增
