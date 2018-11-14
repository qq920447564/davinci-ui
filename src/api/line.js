import request from '@/utils/request'

export function getLines() {
  return request({
    url: '/lines',
    method: 'get'
  })
}

export function getLineTree() {
  return request({
    url: '/lines/tree',
    method: 'get'
  })
}
