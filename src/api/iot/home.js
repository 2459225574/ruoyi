import request from '@/utils/request'

// 查询用户所有可用设备列表
export function listEquipment(query) {
  return request({
    url: '/iot/home/equipmentList',
    method: 'get',
    params: query
  })
}

