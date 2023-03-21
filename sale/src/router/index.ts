import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const title = import.meta.env.VITE_APP_TITLE
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component:() => import('@/views/account/login.vue')
    },
    {
      redirect: '/login',
      path: '/'
    }
  ]
})
router.beforeEach(async (to) => {
  NProgress.start()
  let toTitle:unknown = to.meta.title
  document.title = `${toTitle} - ${title}`
})
router.afterEach(() => {
  NProgress.done()
})

router.onError(error => {
  NProgress.done();
});

export default router
