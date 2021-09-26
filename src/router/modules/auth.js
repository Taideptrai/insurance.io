export default {
  path: '/auth',
  component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth/Auth.vue'),
  children: [
    {
      path: '',
      name: 'auth',
      redirect: { name: 'auth.login' }
    },
    {
      path: 'login',
      name: 'auth.login',
      component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth/Login.vue')
    },
    {
      path: 'logout',
      name: 'auth.logout',
      component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth/Logout.vue')
    },
    {
      path: 'forgot-password',
      name: 'auth.forgot-password',
      component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth/ResetPassword/ForgotPassword.vue')
    },
    {
      path: 'sign-up',
      name: 'auth.signUp',
      component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth/SignUp/SignUp.vue')
    },
    {
      path: 'confirm-email',
      name: 'auth.confirmEmail',
      component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth/SignUp/ConfirmNewUser.vue')
    },
    {
      path: 'password-reset',
      name: 'auth.passwordReset',
      component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth/ResetPassword/CreateNewPass.vue')
    }
  ]
}
