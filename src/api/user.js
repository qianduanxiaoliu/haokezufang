import request from '@/utils/request'

/**
 *用户登录
 * @param {*} param0
 * @returns
 */
export const ToLogin = ({ username, password }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: 'user'
  })
}

/**
 *查看一发布房源
 * @returns
 */
export const getMyHouse = () => {
  return request({
    url: '/user/houses'
  })
}
