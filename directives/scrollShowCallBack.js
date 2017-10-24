let scrollCallback = function (callback) {
  let windowH = window.innerHeight
  let getDocumentHeight = function () {
    var body = document.body
    var html = document.documentElement
    return Math.max(
      body.offsetHeight,
      body.scrollHeight,
      html.clientHeight,
      html.offsetHeight,
      html.scrollHeight
    )
  }
  let scrollH = document.documentElement.scrollTop || document.body.scrollTop
  if (windowH + scrollH >= getDocumentHeight() - (this.holder || 20)) {
    callback()
  }
}

let callBackWarpped

export default {
  bind (el, binding, vnode) {
    let holder
    if (vnode.data && vnode.data.attrs && vnode.data.attrs['scroll-placeholder']) {
      holder = parseInt(vnode.data.attrs['scroll-placeholder'])
    } else {
      holder = 20
    }
    callBackWarpped = scrollCallback.bind({el, holder}, binding.value)
    window.addEventListener('scroll', callBackWarpped, false)
  },

  unbind: function () {
    window.removeEventListener('scroll', callBackWarpped, false)
  }
}
