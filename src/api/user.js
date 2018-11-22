import request from '@/utils/request'

export function getUsers(mobile, realname, username, limit, offset) {
  return request({
    url: '/users',
    method: 'get',
    params: {
      mobile,
      realname,
      username,
      limit,
      offset
    }
  })
}

export function postUser(email, employee_id, mobile, password, realname, username, role_id, status) {
  return request({
    url: '/users',
    method: 'post',
    data: {
      email,
      employee_id,
      mobile,
      password,
      realname,
      username,
      role_id,
      status
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function putUser(id, email, employee_id, mobile, realname, username, role_id, status) {
  return request({
    url: '/users/' + id,
    method: 'put',
    data: {
      email,
      employee_id,
      mobile,
      realname,
      username,
      role_id,
      status
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function putPassword(id, password) {
  return request({
    url: '/users/' + id + '/password',
    method: 'put',
    data: {
      password
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}
