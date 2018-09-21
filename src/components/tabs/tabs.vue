<template lang="pug">
  div(:class="classes")
    div(:class="`${prefixCls}-bar`")
      div(:class="[prefixCls + '-nav-container']")
        div(ref="navWrap" :class="[prefixCls + '-nav-wrap', scrollable ? prefixCls + '-nav-scrollable' : '']")
          span(:class="[prefixCls + '-nav-prev', scrollable ? '' : prefixCls + '-nav-scroll-disabled']" @click="scrollPrev")
            i(class="fa fa-angle-left")
          span(:class="[prefixCls + '-nav-next', scrollable ? '' : prefixCls + '-nav-scroll-disabled']" @click="scrollNext")
            i(class="fa fa-angle-right")
          div(ref="navScroll" :class="[prefixCls + '-nav-scroll']")
            div(ref="nav" :class="[prefixCls + '-nav']" class="nav-text" :style="navStyle")
              div(:class="barClasses" :style="barStyle")
              div(:class="tabCls(item)" v-for="(item, index) in navList" @click="handleClick(index)")
                span {{item.label}}
    div(:class="contentClasses" :style="contentStyle")
      slot
</template>
<script>
import { oneOf } from '@/utils/assist'
const prefixCls = 'yi-tabs'
export default {
  name: 'Tabs',
  data () {
    return {
      prefixCls: prefixCls,
      barOffset: 0,
      barWidth: 0,
      activeKey: '',
      navList: [],
      navStyle: {
        transform: ''
      },
      scrollable: false
    }
  },
  props: {
    animated: {
      type: Boolean,
      default: true
    },
    type: {
      validator (value) {
        return oneOf(value, ['line', 'card'])
      },
      default: 'line'
    }
  },
  computed: {
    barClasses () {
      return [
        `${prefixCls}-ink-bar`,
        {
          [`${prefixCls}-ink-bar-animated`]: this.animated
        }
      ]
    },
    barStyle () {
      let style = {
        visibility: 'hidden',
        width: `${this.barWidth}px`
      }
      if (this.type === 'line') style.visibility = 'visible'
      if (this.animated) {
        style.transform = `translate3d(${this.barOffset}px, 0px, 0px)`
      } else {
        style.left = `${this.barOffset}px`
      }

      return style
    },
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-mini`]: this.size === 'small' && this.type === 'line',
          [`${prefixCls}-no-animation`]: !this.animated
        }
      ]
    },
    contentClasses () {
      return [
        `${prefixCls}-content`,
        {
          [`${prefixCls}-content-animated`]: this.animated
        }
      ]
    },
    contentStyle () {
      const x = this.getTabIndex(this.activeKey)
      const p = x === 0 ? '0%' : `-${x}00%`

      let style = {}
      if (x > -1) {
        style = {
          transform: `translateX(${p}) translateZ(0px)`
        }
      }
      return style
    }
  },
  methods: {
    getCurrentScrollOffset () {
      const { navStyle } = this
      return navStyle.transform
        ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1])
        : 0
    },
    getTabIndex (name) {
      return this.navList.findIndex(nav => nav.name === name)
    },
    getTabs () {
      return this.$children.filter(item => item.$options.name === 'TabPane')
    },
    handleClick (index) {
      this.activeKey = this.navList[index].name
    },
    scrollToActiveTab () {

    },
    scrollPrev () {
      const containerWidth = this.$refs.navScroll.offsetWidth
      const currentOffset = this.getCurrentScrollOffset()
      console.log(containerWidth, currentOffset)

      if (!currentOffset) return

      let newOffset = currentOffset > containerWidth
        ? currentOffset - containerWidth
        : 0
      this.setOffset(newOffset)
    },
    scrollNext () {
      // 整个标签数组的宽度
      const navWidth = this.$refs.nav.offsetWidth
      // 能够被看到的标签宽度
      const containerWidth = this.$refs.navScroll.offsetWidth
      // 当前位移的距离
      const currentOffset = this.getCurrentScrollOffset()
      console.log(navWidth, currentOffset, containerWidth)
      if (navWidth - currentOffset <= containerWidth) return

      let newOffset = navWidth - currentOffset > containerWidth * 2
        ? currentOffset + containerWidth
        : navWidth - containerWidth
      console.log(newOffset)
      this.setOffset(newOffset)
    },
    setOffset (value) {
      this.navStyle.transform = `translateX(-${value}px)`
    },
    tabCls (item) {
      return [
        `${prefixCls}-tab`,
        {
          [`${prefixCls}-tab-disabled`]: item.disabled,
          [`${prefixCls}-tab-active`]: item.name === this.activeKey,
          [`${prefixCls}-tab-focus`]: item.name === this.focusedKey
        }
      ]
    },
    updateBar () {
      this.$nextTick(() => {
        const index = this.getTabIndex(this.activeKey)
        const prevTabs = this.$refs.nav.querySelectorAll(`.${prefixCls}-tab`)
        const tab = prevTabs[index]
        this.barWidth = tab ? parseFloat(tab.offsetWidth) : 0

        if (index > 0) {
          let offset = 0
          const gutter = this.size === 'small' ? 0 : 16
          for (let i = 0; i < index; i++) {
            offset += parseFloat(prevTabs[i].offsetWidth) + gutter
          }

          this.barOffset = offset
        } else {
          this.barOffset = 0
        }

        this.updateNavScroll()
      })
    },
    updateNav () {
      const children = this.getTabs()
      this.navList = []
      children.forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.currentName || index
        })
        // 给第一个tab设置active
        if (!pane.currentName) this.activeKey = index
        if (index === 0) this.activeKey = pane.currentName || index
      })
      this.updateStatus()
      this.updateBar()
    },
    updateNavScroll () {
      const navWidth = this.$refs.nav.offsetWidth
      const containerWidth = this.$refs.navScroll.offsetWidth
      const currentOffset = this.getCurrentScrollOffset()
      if (containerWidth < navWidth) {
        this.scrollable = true
        if (navWidth - currentOffset < containerWidth) {
          this.setOffset(navWidth - containerWidth)
        }
      } else {
        this.scrollable = false
        if (currentOffset > 0) {
          this.setOffset(0)
        }
      }
    },
    updateStatus () {
      const tabs = this.getTabs()
      tabs.forEach((tab) => {
        // 控制内容的显示
        tab.show = (tab.currentName === this.activeKey) || this.animated
      })
    }
  },
  watch: {
    activeKey (val) {
      this.focusedKey = val
      this.updateStatus()
      this.updateBar()
      this.$nextTick(() => {
        this.scrollToActiveTab()
      })
    }
  },
  mounted () {
    let doc = this.$refs.navScroll
    console.log(doc.offsetWidth)
  }
}
</script>
