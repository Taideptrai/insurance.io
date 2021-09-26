export default {
  path: '/project',
  component: () => import('@/views/Project/Base.vue'),
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: '',
      name: 'project.base',
      redirect: { name: 'home' }
    },
    {
      path: 'create',
      name: 'project.create',
      component: () => import('@/views/Project/Create.vue')
    },
    {
      path: ':id/setup',
      name: 'project.setup',
      component: () => import('@/views/Project/Setup.vue')
    },
    {
      path: ':id',
      name: 'project.detail',
      component: () => import('@/views/Project/ProjectDetail.vue')
    },
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
}
