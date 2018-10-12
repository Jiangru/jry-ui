export default {
  methods: {
    dispatch (componentName, eventName, params) {
      console.log(componentName, eventName, params)
      let parent = this.$parent || this.$root
      console.log(parent)
      let name = parent.$options.name
      console.log(name)

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }

      // parent.$emit(eventName, params) // 不行
      // parent[eventName](params) // 可行
      // parent[eventName].call(this, params) // 可行
      parent.$emit.apply(parent, [eventName].concat(params))
    }
  }
}
