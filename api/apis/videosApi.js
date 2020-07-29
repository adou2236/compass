import axios from '../http';

const TYPE_LIST = '/types';
const ALL_VIDEOS = '/videos';

//请求所有类型
export function getAllTypes() {
  return axios.get(TYPE_LIST).then((res) => res);
}
//请求该类型下的所有资源
export function getAllVideos(param) {
  return axios.get(ALL_VIDEOS, {params: param}).then((res) => res);
}
