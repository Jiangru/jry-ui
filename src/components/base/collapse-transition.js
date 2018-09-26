import { addClass, removeClass } from '@/utils/assist'

const Transition = {
  beforeEnter (el) {
    console.log(el)
    addClass(el, 'collapse-transition')
  },
  enter (el, done) {

  },
  afterEnter (el) {
    removeClass(el, 'collapse-transition')
  },
  beforeLeave (el) {

  },
  leave (el) {

  },
  afterLeave (el) {

  }
}

export default {
  functional: true,
  render (h, ctx) {
    let data = {
      on: Transition
    }
    return h('transition', data, ctx.children)
  }
}
