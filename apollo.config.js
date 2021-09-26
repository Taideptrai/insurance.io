import { API_HOST } from 'src/core/config'

module.exports = {
  client: {
    service: {
      name: 'io-insure',
      url: `https://${API_HOST}`
    },
    includes: ['src/**/*.vue', 'src/**/*.js']
  }
}
