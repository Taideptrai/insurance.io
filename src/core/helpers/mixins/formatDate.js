import moment from 'moment'

export default {
  filters: {
    formatDate(value, format = 'MM/DD/YYYY HH:mm:ss') {
      if (value) {
        return moment(value).format(format)
      }
      return value || ''
    }
  }
}
