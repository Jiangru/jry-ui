<template lang="pug">
  div(:class="classes")
    div(:class="headClasses" v-if="showHead")
      slot(name="title")
    div(:class="extraClasses" v-if="showExtra")
      slot(name="extra")
    div(:class="bodyClasses" :style="bodyStyles")
      slot
</template>
<script>
const prefixCls = 'yi-card'
const defaultPadding = 16
export default {
  name: 'Card',
  data () {
    return {
      showHead: true,
      showExtra: false
    }
  },
  props: {
    bordered: {
      type: Boolean,
      default: true
    },
    disHover: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    title: String,
    padding: {
      type: Number,
      default: defaultPadding
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-bordered`]: this.bordered && !this.shadow,
          [`${prefixCls}-dis-hover`]: this.disHover || this.shadow,
          [`${prefixCls}-shadow`]: this.shadow
        }
      ]
    },
    headClasses () {
      return `${prefixCls}-head`
    },
    extraClasses () {
      return `${prefixCls}-extra`
    },
    bodyClasses () {
      return `${prefixCls}-body`
    },
    bodyStyles () {
      if (this.padding !== defaultPadding) {
        return {
          padding: `${this.padding}px`
        }
      } else {
        return ''
      }
    }
  },
  mounted () {
    this.showHead = this.title || this.$slots.title !== undefined
    this.showExtra = this.$slots.extra !== undefined
  }
}
</script>
