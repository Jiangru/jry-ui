<template lang="pug">
  div(:class="classes" :style="styles")
    slot
</template>
<script>
import { oneOf, findComponentDownward, findBrothersComponents } from '@/utils/assist'
const prefixCls = 'yi-row'
export default {
  name: 'yiRow',
  props: {
    type: {
      validator (value) {
        return oneOf(value, ['flex'])
      }
    },
    align: {
      validator (value) {
        return oneOf(value, ['top', 'middle', 'bottom'])
      }
    },
    justify: {
      validator (value) {
        return oneOf(value, ['start', 'center', 'end', 'space-around', 'space-between'])
      }
    },
    gutter: {
      type: [Number, String],
      default: 0
    },
    className: String
  },
  computed: {
    classes () {
      return [
        {
          [`${prefixCls}`]: !this.type,
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-${this.type}-${this.align}`]: !!this.align,
          [`${prefixCls}-${this.type}-${this.justify}`]: !!this.justify,
          [`${this.className}`]: !!this.className
        }
      ]
    },
    styles () {
      let style = {}
      if (this.gutter !== 0) {
        style = {
          marginLeft: this.gutter / -2 + 'px',
          marginRight: this.gutter / -2 + 'px'
        }
      }
      return style
    }
  },
  methods: {
    updateGutter (val) {
      let Col = findComponentDownward(this, 'yiCol')
      let Cols = findBrothersComponents(Col, 'yiCol', false)
      if (Cols.length) {
        Cols.forEach((child) => {
          if (val !== 0) {
            child.gutter = val
          }
        })
      }
    }
  },
  watch: {
    gutter (val) {
      this.updateGutter(val)
    }
  }
}
</script>
