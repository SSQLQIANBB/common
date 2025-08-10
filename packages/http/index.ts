// import { VAxios } from './Axios';

// export { VAxios };
// export default VAxios;

import { Axios } from './Axios';
import { axiosTransform } from './axiosTransform';
import { ContentTypeEnum } from './types';

function createAxios() {
  return new Axios({
    // baseURL: '',
    timeout: 10 * 1000,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    // 数据处理方式
    transform: axiosTransform,
    requestOptions: {
      // 默认将prefix 添加到url
      joinPrefix: true,
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理
      isTransformResponse: true,
      // post请求的时候添加参数到url
      joinParamsToUrl: false,
      // 格式化提交参数时间
      formatDate: true,
      // 接口地址
      apiUrl: '',
      // 接口拼接地址
      urlPrefix: '',
      //  是否加入时间戳
      joinTime: true,
      // 忽略重复请求
      ignoreCancelToken: true,
      // 是否携带token
      withToken: true
    }
  });
}

export const http = createAxios();