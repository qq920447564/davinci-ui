import request from '@/utils/request'

export function postPlans(line_id, plan_date, mobile, plan_time_id, product_id, cnt, addon, plan_user_id) {
  return request({
    url: '/plans',
    method: 'post',
    data: {
      line_id,
      plan_date,
      mobile,
      plan_time_id,
      product_id,
      cnt,
      addon,
      plan_user_id
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function putPlans(id, line_id, plan_date, plan_time_id, product_id, cnt, addon, plan_user_id) {
  return request({
    url: '/plans/' + id,
    method: 'put',
    data: {
      line_id,
      plan_date,
      plan_time_id,
      product_id,
      cnt,
      addon,
      plan_user_id
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}
