export function decodeId(id = '') {
  return atob(id).split(':')[1]
}
