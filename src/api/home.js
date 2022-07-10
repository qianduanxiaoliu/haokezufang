import request from '@/utils/request'
/**
 *获取轮播图
 * @returns
 */
export const getImage = () => {
  return request({
    url: '/home/swiper'
  })
}

/**
 *获取租房小组信息
 * @returns
 */
export const getGroups = () => {
  return request({
    url: '/home/groups/?area=AREA%7C88cff55c-aaa4-e2e0'
  })
}
