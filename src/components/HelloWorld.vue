<template lang="pug">
  .hello
    | 111
    i(class="fa fa-chrome")
    .item-wrap
      yi-card(v-if="showCard" :padding="20" icon="fa fa-chrome")
        p(slot="title")
          i(class="fa fa-chrome")
          i(class="fa fa-bath")
          span 你好蒋如意
        div(slot='extra' @click="closeCard") 酷！
        div 智道金服蒋如意
    .item-wrap
      yi-tabs(value="name1" :animated="false")
        yi-pane(label="标签一" name="name1") 标签一的内容
        yi-pane(label="标签二" name="name2") 标签二的内容
        yi-pane(label="标签三" name="name3") 标签三的内容
        yi-pane(label="标签四" name="name4") 标签四的内容
        yi-pane(label="标签五" name="name5") 标签五的内容
        yi-pane(label="标签六" name="name6") 标签六的内容
        yi-pane(label="标签七" name="name7") 标签七的内容
        yi-pane(label="标签八" name="name8") 标签八的内容
        yi-pane(label="标签九" name="name9") 标签九的内容
        yi-pane(label="标签十" name="name10") 标签十的内容
    // yi-row(:gutter="10" type="flex" align="top" justify="center")
    yi-row(:gutter="10")
      yi-col(span="12") col-span-12
      yi-col(span="12") col-span-12
</template>

<script>
import yiCard from '@/components/card'
import yiTabs from '@/components/tabs'
import yiRow from '@/components/row'
import yiCol from '@/components/col'
export default {
  name: 'HelloWorld',
  components: {
    yiCard,
    yiTabs,
    yiPane: yiTabs.YiPane,
    yiRow,
    yiCol
  },
  data () {
    return {
      showCard: true,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    closeCard () {
      this.showCard = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
