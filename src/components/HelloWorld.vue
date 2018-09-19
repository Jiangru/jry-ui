<template lang="pug">
  .hello
    | 111
    .item-wrap
      yi-card(title="你好蒋如意" dis-hover)
        div 智道金服蒋如意
</template>

<script>
import yiCard from '@/components/card'
export default {
  name: 'HelloWorld',
  components: {
    yiCard
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
