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
