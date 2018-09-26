export default {
  render (h) {
    return h('h' + this.level, this.$slots.default)
  },
  props: {
    level: [Number, String]
  }
}
