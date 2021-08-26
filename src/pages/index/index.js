import './index.scss'
import { createApp, nextTick, reactive } from '@/libs/petite-vue.js'

// 自定义组件
function WButton(props) {
  // clsssName
  console.log(props)
  return {
    $template: '#w-button',
    ...props,
  }
}
// 全局状态管理
const store = reactive({
  text: '',
})
createApp({
  // 注册组件
  store,
  count: 0,
  num: '',
  // text:store.text,
  handleIncrementCount() {
    this.count = this.count + this.num
  },
  handleDecrementCount() {
    this.count = this.count - this.num
  },
}).mount('#count-example')

// 注册组件
createApp({
  WButton,
}).mount('#component-example')
// 生命周期
createApp({
  flag: false,
  handleSwitchLifeCycle() {
    this.flag = !this.flag
  },
  handleMount() {
    alert('组件被渲染了')
  },
  handleUnmount() {
    alert('组件被销毁了')
  },
}).mount('#lifecycle-example')


const vFocus = (ctx) => {
  console.log(ctx)
  ctx.el.focus()
}

createApp({
  store,
})
  .directive('focus', vFocus)
  .mount('#global-state-example')
