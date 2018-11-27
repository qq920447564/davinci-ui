import request from '@/utils/request'

export function getDevices() {
  return request({
    url: '/devices',
    method: 'get'
  })
}

export function getDevicesValue() {
  return request({
    url: '/devices?with_data_point=true',
    method: 'get'
  })
}

export function getDeviceStatus(lineId, deviceNo, status, beginDate, endDate, abnormal, limit, offset) {
  return request({
    url: '/devices/status_stat',
    method: 'get',
    params: {
      lineId,
      deviceNo,
      status,
      beginDate,
      endDate,
      abnormal,
      limit,
      offset
    }
  })
}

export function getDeviceOutPut(lineId, deviceNo, beginDate, endDate, limit, offset) {
  return request({
    url: '/devices/output_stat',
    method: 'get',
    params: {
      lineId,
      deviceNo,
      beginDate,
      endDate,
      limit,
      offset
    }
  })
}

export function getDeviceAlarm(lineId, deviceNo, beginDate, endDate, cleared, limit, offset) {
  return request({
    url: '/devices/alarm_stat',
    method: 'get',
    params: {
      lineId,
      deviceNo,
      beginDate,
      endDate,
      cleared,
      limit,
      offset
    }
  })
}

export function getDevicePoint(id) {
  return request({
    url: '/devices/' + id + '/data_points?with_latest_data=true',
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

export function addonPut(id,addon,) {
  return request({
    url: '/devices/status_stat/' + id+'/addon?addon='+addon,
    method: 'put',
    data: {
      addon,
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}
