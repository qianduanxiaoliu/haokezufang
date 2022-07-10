import request from '@/utils/request'

/**
 * 获取热门城市
 * @returns
 */
export const getHotList = () => {
  return request({
    url: '/area/hot'
  })
}

/**
 *获取城市列表数据源
 * @returns
 */
export const getCityList = () => {
  return request({
    url: '/area/city',
    params: {
      level: 1
    }
  })
}

/**
 *查询房源数据
 * @param {城市或地区的id} id
 * @returns
 */
export const getMapList = (id) => {
  return request({
    url: '/area/map',
    params: {
      id
    }
  })
}
