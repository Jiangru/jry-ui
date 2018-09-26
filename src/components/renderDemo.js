export default {
  functional: true,
  render (h, ctx) {
    // console.log(this.$slots) // 返回由VNode组成数组
    // console.log(ctx)
    // var header = this.$slots.header
    // var body = this.$slots.body
    return h('div', ctx.children)
  },
  data () {
    return {
      show: true
    }
  },
  props: {
    headShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick () {
      console.log('renderdemo')
    }
  }
}
