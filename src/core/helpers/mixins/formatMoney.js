export default {
  filters: {
    currency(value) {
      const str = value.toString() || ''
      const numbers = str.split('.')
      let result = numbers[0].match(/\d{1,3}(?=(\d{3})*$)/g).join(',')
      if (numbers[1] && numbers[1].length > 0) {
        result += '.' + numbers[1]
      }
      return result
    }
  }
}
