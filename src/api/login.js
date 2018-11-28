import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      username,
      password
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}
