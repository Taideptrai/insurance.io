<script>
import Vue from 'vue'

export default {
  name: 'HtmlFragment',
  functional: true,
  props: {
    html: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  render(h, { props }) {
    const component = new Vue({
      beforeCreate() {
        this.$createElement = h
      },
      ...Vue.compile(`<div>${props.html}</div>`)
    }).$mount()

    const {
      _vnode: { children: nodes = [] }
    } = component

    return nodes || []
  }
}
</script>
