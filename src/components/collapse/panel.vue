<template lang="pug">
  div(:class="classes")
    div(:class="headClasses" @click="toggle")
      i(class="fa fa-angle-right" v-if="!hideArrow")
      slot
    collapse-transition
      div(:class="contentClasses" v-show="isActive")
        div(:class="boxClasses")
          slot(name="content")
</template>
<script>
import collapseTransition from '@/components/base/collapse-transition'
import Emitter from '@/mixins/emitter'
const prefixCls = 'yi-collapse'
export default {
  name: 'yiPanel',
  mixins: [ Emitter ],
  components: {
    collapseTransition
  },
  data () {
    return {
      index: 0,
      isActive: false
    }
  },
  props: {
    name: {
      type: String
    },
    hideArrow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.isActive
        }
      ]
    },
    headClasses () {
      return `${prefixCls}-header`
    },
    contentClasses () {
      return `${prefixCls}-content`
    },
    boxClasses () {
      return `${prefixCls}-content-box`
    }
  },
  methods: {
    toggle () {
      this.dispatch('yiCollapse', 'demoDispatch', 'dispatch666')
      this.$parent.toggle({
        name: this.name || this.index,
        isActive: this.isActive
      })
    }
  }
}
</script>
