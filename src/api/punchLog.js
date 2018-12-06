import request from '@/utils/request'

export function addPunchLog(addon, clockin_time, line_id, opt_date, product_id, user_ids) {
  return request({
    url: '/punch_logs/batch',
    method: 'post',
    data: {
      addon,
      clockin_time,
      line_id,
      opt_date,
      product_id,
      user_ids
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function putPunchLog(id, addon, clockin_time, clockout_time, line_id, opt_date, product_id, user_ids) {
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
      user_ids
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
