import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [

  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: '首页' },
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页' }
    }]
  },{
    path: '/historicalLine',
    component: Layout,
    name: 'historicalLine',
    hidden: true,
    meta: { title: '历史曲线' },
    children: [{
      path: 'historicalLine',
      component: () => import('@/views/equipMonitor/historicalLine'),
      name: 'historicalLine',
      meta: { title: ' 历史曲线 ' }
    }]
  },

  {
    path: '/lookBoard',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '实时看板', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/dashboard/listBoard'),
        meta: { title: '产线列表看板', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {title: '产线实景看板', icon: 'tree'}
      }
    ]
  },
  {
    path: 'equipEfficiency',
    component: Layout,
    alwaysShow: true,
    meta: { title: '综合报表', icon: 'equip' },
    children: [
      {
        path: '',
        meta: { title: '设备状态报表', icon: 'equip' }
      },
      {
        path: '',
        meta: { title: '产线OEE报表', icon: 'link' }
      }
    ]
  },
  {
    path: '/equipMonitor',
    component: Layout,
    redirect: '/equipMonitor/operationmonitor',
    name: 'operationmonitor',
    meta: {
      title: '设备监控',
      icon: 'nested'
    },
    children: [
      {
        path: 'operationMonitor',
        component: () => import('@/views/equipMonitor/operationMonitor'), // Parent router-view
        name: 'operationMonitor',
        meta: { title: '设备运行监控',icon:'runMonitor' }
      },
      {
        path: 'runNote',
        component: () => import('@/views/equipMonitor/runNote'), // Parent router-view
        name: 'runNote',
        meta: { title: '设备运行记录',icon:'runNote' }
      },
      {
        path: 'outputNote',
        component: () => import('@/views/equipMonitor/outputNote'),
        name:'outputNote',
        meta: { title: '设备产量记录',icon:'chan' }
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    redirect: '/person/person',
    name: 'person',
    alwaysShow: true,
    meta: {
      title: '人员管理',
      icon: 'person',
      name:'person'
    },
    children: [
      {
        path: 'person',
        name: 'person',
        component: () => import('@/views/person/person'),
        meta: { title: '上班时间填报',icon:'time' }
      }
    ]
  },

  {
    path: '/makePlan',
    component: Layout,
    redirect: '/makePlan/makePlanPen',
    name:'makePlan',
    meta: { title: '生产计划', icon: 'plan' },
    children: [
      {
        path: 'makePlanPen',
        meta: { title: '生产计划填报', icon: 'pen' },
        name:'makePlanPen',
        component: () => import('@/views/makePlan/makePlanPen'),
      },
      {
        path: '',
        meta: { title: '计划达成报表', icon: 'get' },
        name:'planList',
        component: () => import('@/views/makePlan/planList' ),
      }
    ]
  },
  {
    path: 'qualityManage',
    component: Layout,
    redirect: '/qualityManage/qualityPen',
    alwaysShow: true,
    name:'qualityManage',
    meta: { title: '质量管理', icon: 'quality' },
    children: [
      {
        path: '/qualityPen',
        meta: { title: '质量问题填报', icon: 'link' },
        name:'qualityPen',
        component:() =>import('@/views/qualityManage/qualityPen')
      }
    ]
  },
  {
    path: 'systemManage',
    component: Layout,
    alwaysShow: true,
    meta: { title: '系统管理', icon: 'link' },
    children: [
      {
        path: '',
        meta: { title: '数据字典', icon: 'link' }
      },
      {
        path: '',
        meta: { title: '用户管理', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
