export default {
  startLoading(state) {
    state.isLoading = true
  },
  stopLoading(state) {
    state.isLoading = false
  },
  setSidebarVisibility(state, visibility) {
    state.sidebarVisible = visibility
  },
  setUploadProgress(state, progress) {
    state.uploadProgress = progress
  },
  setTitle(stage, title) {
    stage.title = title || ''
  },
  setBackRouter(stage, router) {
    stage.backRouter = router || {}
  }
}
