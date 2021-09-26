export function unsavedDialog(vue) {
  return vue.$dialog.info({
    title: 'Do you really want to leave?',
    text: 'You have unsaved changes?',
    persistent: true,
    actions: {
      true: {
        text: 'Leave',
        color: 'darkgrey-1'
      },
      false: {
        text: 'Stay',
        color: 'accent',
        flat: false,
        class: 'pl-8 pr-8'
      }
    }
  })
}
