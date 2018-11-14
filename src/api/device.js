import request from '@/utils/request'

export function getDevices() {
  return request({
    url: '/devices',
    method: 'get'
  })
}

export function getDevicePoint(id) {
  return request({
    url: '/devices/'+ id+'/data_points?with_latest_data=true',
    method: 'get'
  })
}

export function getDevice(id) {
  return request({
    url: '/devices/' + id,
    method: 'get'
  })
}

export function getProcesses() {
  return request({
    url: '/devices/processes',
    method: 'get'
  })
}
