import axios from '../http';

const TYPE_LIST = '/types';

export function getAllTypes() {
  console.log('进入请求');
  return axios.get(TYPE_LIST).then((res) => res);
}
