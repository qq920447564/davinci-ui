import request from '@/utils/request'

export function postProducts(line_id, opt_date, product_id, cnt, addon) {
  return request({
    url: '/poor_quality_logs',
    method: 'post',
    data: {
      line_id,
      opt_date,
      product_id,
      cnt,
      addon
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function putProducts(id, line_id, opt_date, product_id, cnt, addon) {
  return request({
    url: '/poor_quality_logs/' + id,
    method: 'put',
    data: {
      line_id,
      opt_date,
      product_id,
      cnt,
      addon
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}
