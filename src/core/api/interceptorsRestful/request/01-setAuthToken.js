import store from '@/store'

export default [
  async config => {
    const token = (await store.getters['auth/accessTokenRestful']) || ''

    config.headers.Authorization = (token && `Bearer ${token}`) || ''

    return config
  }
]
