import request from '@/utils/request'

// 查询用户所有可用设备列表
export function listEquipment(query) {
  return request({
    url: '/iot/home/equipmentList',
    method: 'get',
    params: query
  })
}

// 查询用户所有可用设备列表
export function listRoleEquipment(query) {
  return request({
    url: '/iot/home/listRoleEquipment',
    method: 'get',
    params: query
  })
}

// 添加设备到设备组
export function AddRoleEquipment(query) {
  return request({
    url: '/iot/home/AddRoleEquipment',
    method: 'get',
    params: query
  })
}

// 把设备移除设备组
export function RemoveRoleEquipment(query) {
  return request({
    url: '/iot/home/RemoveRoleEquipment',
    method: 'get',
    params: query
  })
}

// 添加设备
export function addEquipment(query) {
  return request({
    url: '/iot/home/addEquipment',
    method: 'get',
    params: query
  })
}

// 修改设备
export function modifyEquipment(query) {
  return request({
    url: '/iot/home/modifyEquipment',
    method: 'get',
    params: query
  })
}

// 删除设备
export function deleteEquipment(query) {
  return request({
    url: '/iot/home/deleteEquipment',
    method: 'get',
    params: query
  })
}

// 所有可用设备
export function listAllEquipment(query) {
  return request({
    url: '/iot/home/listAllEquipment',
    method: 'get',
    params: query
  })
}

// 所有可用设备不重复
export function listAllEquipmentNoRepeat(query) {
  return request({
    url: '/iot/home/listAllEquipmentNoRepeat',
    method: 'get',
    params: query
  })
}

// 设备状态
export function getEquipmentStatus(query) {
  return request({
    url: '/iot/home/getEquipmentStatus',
    method: 'get',
    params: query
  })
}




