import request from '@/utils/request'

export function addPunchLog(addon, clockin_time, line_id, opt_date, product_id, user_id) {
  return request({
    url: '/punch_logs',
    method: 'post',
    data: {
      addon,
      clockin_time,
      line_id,
      opt_date,
      product_id,
      user_id
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function putPunchLog(id, addon, clockin_time, clockout_time, line_id, opt_date, product_id, user_id) {
  return request({
    url: '/punch_logs/' + id,
    method: 'put',
    data: {
      addon,
      clockin_time,
      clockout_time,
      line_id,
      opt_date,
      product_id,
      user_id
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}


export function getPunchLog(id) {
  return request({
    url: '/punch_logs/' + id,
    method: 'get'
  })
}
