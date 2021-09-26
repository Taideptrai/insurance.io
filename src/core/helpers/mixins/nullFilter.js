import { chain, isArray, isEmpty, isNaN, isNull, isPlainObject, isUndefined } from 'lodash'

function isValidData(item) {
  return !isNull(item) && !isUndefined(item) && !isNaN(item)
}

/**
 * Nested collection filter
 *
 * @param {object | array} item Collection to filter
 * @returns Filtered collection
 */
export default function nullFilter(item) {
  if (isPlainObject(item)) {
    return chain(item)
      .pickBy(v => !isUndefined(v) && !isNull(v))
      .keys()
      .reduce((obj, key) => {
        const data = nullFilter(item[key])
        if (data) return { ...obj, [key]: data }
        return obj
      }, {})
      .value()
  }

  if (isArray(item)) {
    const arr = item.filter(i => isValidData(i))?.map(i => nullFilter(i))
    return isEmpty(arr) ? undefined : arr
  }

  if (isValidData(item)) return item
  return undefined
}
