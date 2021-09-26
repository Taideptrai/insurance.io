import Home from '@/views/Home.vue'
import Invitation from '@/views/Invitation/Invitation.vue'
import { isPlainObject } from 'lodash'
import requireContext from 'require-context.macro'

const modules = requireContext('./modules/', false, /.+\.js$/i)

const routes = modules
  .keys()
  .map(k => modules(k)?.default)
  .filter(isPlainObject)

export default [
  {
    path: '/',
    name: 'home',
    meta: {
      requiresAuth: true
    },
    component: Home
  },

  {
    path: '/invitation',
    name: 'Invitation',
    meta: {
      requiresAuth: false
    },
    component: Invitation
  },
  ...routes
]
