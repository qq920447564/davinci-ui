import request from '@/utils/request'

export function getProducts() {
  return request({
    url: '/products',
    method: 'get'
  })
}

export function getProducts2(name, limit, offset) {
  return request({
    url: 'products/list',
    method: 'get',
    params: {
      name,
      limit,
      offset
    }
  })
}

export function postProduct(name, hidden, default_option) {
  return request({
    url: '/products',
    method: 'post',
    data: {
      name,
      hidden,
      default_option
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function putProduct(id, name, hidden, default_option) {
  return request({
    url: '/products/' + id,
    method: 'put',
    data: {
      name,
      hidden,
      default_option
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}
