import { unsavedDialog } from '@/core/helpers/dialog'

export default {
  data() {
    return {
      isModified: false
    }
  },
  beforeRouteLeave(to, __, next) {
    if (this.isModified && to.name !== 'auth.logout') {
      unsavedDialog(this)
        .then(status => {
          if (status === undefined) {
            status = false
          }
          next(status)
        })
        .catch(() => {
          next(false)
        })
    } else {
      next()
    }
  }
}
