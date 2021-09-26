import { isArray, isPlainObject, map, orderBy } from 'lodash'

/**
 * @param {array | object} coll Collection to sort
 * @param {object} options Sorting options
 * @param {string} options.key Sorting key, default is `order`
 * @param {('asc' | 'desc')} options.type Sorting type, default is `asc`
 * @returns Sorted collection
 */
export default function nestedSort(coll, options = { key: 'order', type: 'asc' }) {
  if (isArray(coll))
    return orderBy(
      map(coll, elm => nestedSort(elm)),
      options.key,
      options.type
    )

  if (isPlainObject(coll))
    return Object.keys(coll).reduce((obj, i) => {
      return { ...obj, [i]: nestedSort(coll[i]) }
    }, {})

  return coll
}
