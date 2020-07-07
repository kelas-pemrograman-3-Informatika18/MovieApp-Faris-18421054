
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      adminAuth: true
    },
    children: [
      { path: '', name: 'dashboardAdmin', component: () => import('pages/admin/Index.vue') },
      { path: 'inputbarang', name: 'inputbarang', component: () => import('pages/admin/inputbarang.vue') },
      { path: 'datauser', name: 'datauser', component: () => import('pages/admin/datauser.vue') },
      { path: 'datadvd', name: 'datadvd', component: () => import('pages/admin/datadvd.vue') },
      { path: 'editdvd/:id', name: 'editdvd', component: () => import('pages/admin/formedit.vue') }
    ]
  },
  {
    path: '/user',
    meta: {
      userAuth: true
    },
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', name: 'homeuser', component: () => import('pages/user/index.vue') },
      { path: 'myorder', name: 'myorder', component: () => import('pages/user/myorder.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/login',
    name: 'loginpage',
    component: () => import('pages/guest/login.vue')
  },
  {
    path: '/register',
    name: 'registerpage',
    component: () => import('pages/guest/register.vue')
  }
]

export default routes
