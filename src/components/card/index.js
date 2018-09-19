import YiCard from './card.vue'

YiCard.install = (Vue) => {
  Vue.component(YiCard.name, YiCard)
}

export default YiCard
