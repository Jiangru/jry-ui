export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/* istanbul ignore next */
export function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

// Find component downward
export function findComponentDownward (context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

// Find Brothers components
export function findBrothersComponents (context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })
  let index = res.findIndex(item => item._uid === context._uid)
  if (exceptMe) res.splice(index, 1)
  return res
}

// 添加样式
export function addClass (el, cls) {
  if (!el) return
  console.log(el.classList, el.className, cls)
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0; i < classes.length; i++) {
    const clsName = classes[i]
    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClass(clsName)) {
        curClass += ' ' + clsName
      }
    }
  }

  if (!el.classList) {
    el.className = curClass
  }
}

// 移除样式
export function removeClass (el, cls) {
  console.log(el, cls)
}
