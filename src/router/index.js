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
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: { title: '首页', icon: 'dashboard' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/listBoard'),
      name: 'Dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/historicalLine',
    component: Layout,
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
    path: '/dataPage',
    component: Layout,
    hidden: true,
    meta: { title: '数据配置' },
    children: [{
      path: 'dataPage',
      component: () => import('@/views/equipMonitor/dataPage'),
      name: 'dataPage',
      meta: { title: ' 数据配置 ' }
    }]
  },
  {
    path: '/lookBoard',
    component: Layout,
    redirect: '/example',
    name: 'Example',
    alwaysShow: true,
    meta: { title: '实时看板', icon: 'example' },
    children: [
      {
        path: '/table',
        name: 'Table',
        component: () => import('@/views/dashboard/listBoard'),
        meta: { title: '产线列表看板', icon: 'yuan' }
      }
    ]
  },
  {
    path: '/equipEfficiency',
    component: Layout,
    redirect: '/equipEfficiency/OEE',
    alwaysShow: true,
    meta: { title: '综合报表', icon: 'equip' },
    children: [
      {
        path: '/OEE',
        name: 'OEE',
        component: () => import('@/views/equipEfficiency/OEE'),
        meta: { title: '产线OEE报表', icon: 'yuan' }
      },
      {
        path: '/Plan',
        name: 'Plan',
        component: () => import('@/views/equipEfficiency/Plan'),
        meta: { title: '计划达成报表', icon: 'yuan' }
      }
    ]
  },
  {
    path: '/equipMonitor',
    component: Layout,
    meta: {
      title: '设备监控',
      icon: 'nested'
    },
    children: [
      {
        path: 'equMonitor',
        component: () => import('@/views/equipMonitor/equMonitor'), // Parent router-view
        name: 'equMonitor',
        meta: { title: '设备在线监控', icon: 'yuan' }
      },
      {
        path: 'runNote',
        component: () => import('@/views/equipMonitor/runNote'), // Parent router-view
        name: 'runNote',
        meta: { title: '设备运行记录', icon: 'yuan' }
      },
      {
        path: 'outputNote',
        component: () => import('@/views/equipMonitor/outputNote'),
        name: 'outputNote',
        meta: { title: '设备产量记录', icon: 'yuan' }
      },
      {
        path: 'alarmNote',
        component: () => import('@/views/equipMonitor/alarmNote'), // Parent router-view
        name: 'alarmNote',
        meta: { title: '设备报警记录', icon: 'yuan' }
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    redirect: '/person/person',
    alwaysShow: true,
    meta: {
      title: '人员管理',
      icon: 'person',
      name: 'person'
    },
    children: [
      {
        path: 'person',
        name: 'person',
        component: () => import('@/views/person/person'),
        meta: { title: '上班时间填报', icon: 'yuan' }
      }
    ]
  },
  {
    path: '/makePlan',
    component: Layout,
    redirect: '/makePlan',
    alwaysShow: true,
    meta: { title: '生产计划', icon: 'plan' },
    children: [
      {
        path: 'makePlanPen',
        meta: { title: '生产计划填报', icon: 'yuan' },
        name: 'makePlanPen',
        component: () => import('@/views/makePlan/makePlanPen')
      }
    ]
  },
  {
    path: 'qualityManage',
    component: Layout,
    redirect: '/qualityManage/qualityPen',
    alwaysShow: true,
    meta: { title: '质量管理', icon: 'quality' },
    children: [
      {
        path: '/qualityPen',
        meta: { title: '质量问题填报', icon: 'yuan' },
        name: 'qualityPen',
        component: () => import('@/views/qualityManage/qualityPen')
      }
    ]
  },
  {
    path: '/systemManage',
    component: Layout,
    alwaysShow: true,
    meta: { title: '系统管理', icon: 'link' },
    children: [
      // {
      //   path: 'operationMonitor',
      //   component: () => import('@/views/equipMonitor/equipInfoManage'), // Parent router-view
      //   name: 'operationMonitor',
      //   meta: { title: '设备信息管理', icon: 'yuan' }
      // },
      // {
      //   path: '/dataDictionary',
      //   meta: { title: '数据字典', icon: 'yuan' },
      //   name: 'dataDictionary',
      //   component: () => import('@/views/systemManage/dataDictionary')
      // },
      {
        path: '/userManange',
        meta: { title: '用户管理', icon: 'yuan' },
        name: 'userManage',
        component: () => import('@/views/systemManage/userManage')
      }
      // {
      //   path: '/gatewayPage',
      //   meta: { title: '网关配置', icon: 'yuan' },
      //   name: 'gatewayPage',
      //   component: () => import('@/views/systemManage/gatewayPage')
      // },
      // {
      //   path: '/deployPage',
      //   meta: { title: '部署配置', icon: 'yuan' },
      //   name: 'deployPage',
      //   component: () => import('@/views/systemManage/deployPage')
      // }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
