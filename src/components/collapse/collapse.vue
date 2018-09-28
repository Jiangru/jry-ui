<template lang="pug">
  div(:class="classes")
    slot
</template>
<script>
const prefixCls = 'yi-collapse'
export default {
  name: 'yiCollapse',
  data () {
    return {
      currentValue: this.value
    }
  },
  props: {
    simple: {
      type: Boolean,
      default: false
    },
    accordion: { // 手风琴，只能同时展开一个
      type: Boolean,
      default: false
    },
    value: [Array, String]
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-simple`]: this.simple
        }
      ]
    }
  },
  methods: {
    setActive () {
      let activeKey = this.getActive()

      this.$children.forEach((child, index) => {
        const name = child.name || child.index

        child.isActive = activeKey.indexOf(name) > -1
        child.index = index
      })
    },
    getActive () {
      let activeKey = this.currentValue || []
      const accordion = this.accordion

      if (!Array.isArray(activeKey)) {
        activeKey = [activeKey]
      }

      if (accordion && activeKey.length > 1) {
        activeKey = [activeKey[0]]
      }

      for (let i = 0; i < activeKey.length; i++) {
        activeKey[i] = activeKey[i].toString()
      }

      return activeKey
    },
    toggle (data) {
      let name = data.name.toString()
      let newActiveKey = []

      if (this.accordion) {
        if (!data.isActive) {
          newActiveKey.push(name)
        }
      } else {
        let activeKey = this.getActive()
        let nameIndex = activeKey.indexOf(name)

        if (nameIndex > -1) {
          activeKey.splice(nameIndex, 1)
        } else {
          activeKey.push(name)
        }

        newActiveKey = activeKey
      }

      this.currentValue = newActiveKey
      this.$emit('on-change', newActiveKey)
    }
  },
  mounted () {
    this.setActive()
  },
  watch: {
    value (val) {
      console.log(val)
      this.currentValue = val
    },
    currentValue () {
      this.setActive()
    }
  }
}
</script>
