import request from '@/utils/request'

/**
 *根据条件查询房屋
 * @returns
 */
export const getHouses = (params) => {
  return request({
    url: '/houses',
    params
  })
}

/**
 *获取房屋查询条件
 * @param {*} id 当前城市的value
 * @returns
 */
export const getCondiTion = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}

/**
 *根据条件查询房屋
 * @param {*} params
 * @returns
 */
export const getHouse = (params) => {
  return request({
    url: '/houses',
    params
  })
}

/**
 * 获取房屋具体信息
 * @param {房屋的id} id
 * @returns
 */
export const getHouseMessage = (id) => {
  return request({
    url: `/houses/${id}`
  })
}

/**
 *获取发布房屋所需要的条件
 * @returns
 */
export const getHouseParams = () => {
  return request({
    url: 'houses/params'
  })
}
/**
 *小区关键词查询
 * @param {*} params
 * @returns
 */
export const getCommunity = (params) => {
  return request({
    url: '/area/community',
    params
  })
}

/**
 *图片
 * @param {*} data
 * @returns
 */
export const getImages = (data) => {
  return request({
    method: 'POST',
    url: '/houses/image',
    data
  })
}

/**
 *发布房源
 * @param {} data
 * @returns
 */
export const issueHouse = (data) => {
  return request({
    method: 'POST',
    url: '/user/houses',
    data
  })
}
