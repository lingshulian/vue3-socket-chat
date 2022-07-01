import NProgress from 'nprogress'
import { useMainStore } from "@/store/main"
import { ElMessage } from 'element-plus'

export default function routerGuard(router: any) {
  router.beforeEach((to: any, from, next) => {
    const store = useMainStore()
    NProgress.start()
    if(to.name !== 'Login'){
      if(store.token && !store.userInfo){
        store.getUserInfo().then(()=>{
          next()
        }).catch(()=>{
          ElMessage.error('获取用户信息失败')
          store.logout()
          next({ name: '/Login' })
        })
      }else if(store.token && store.userInfo){
        next({name: 'Chat'})
      }else
        next({name: 'Login'})
    }else
      next()
  })
  
  // 路由加载后
  router.afterEach((to, from) => {
    NProgress.done()
  })
}