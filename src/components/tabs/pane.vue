<template lang="pug">
  div(:class="prefixCls" v-show="show")
    slot
</template>
<script>
const prefixCls = 'yi-tabs-tabpane'
export default {
  name: 'TabPane',
  data () {
    return {
      prefixCls: prefixCls,
      show: true,
      currentName: this.name
    }
  },
  props: {
    label: {
      type: [String, Function],
      default: ''
    },
    name: String
  },
  computed: {

  },
  methods: {
    updateNav () {
      this.$parent.updateNav()
    }
  },
  watch: {
    name (val) {
      this.currentName = val
      this.updateNav()
    }
  },
  mounted () {
    this.updateNav()
  }
}
</script>
