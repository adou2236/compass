import {getAllVideos} from '../../api/apis/videosApi';

//视频查询方法，包括条件筛选排序分页等
/**
 * type:种类
 * sort:排序方式
 * order:升序1或降序-1
 * details:模糊查询
 * pages:页码,
 * @param _id
 */
export function getVideosWithCondition({
  type,
  sort,
  order = 1,
  details,
  pages = 1,
  pageNumber = 10,
}) {
  const params = {
    type: type,
    sort: sort,
    order: order,
    details: details,
    pages: pages,
    pageNumber: pageNumber,
  };
  return getAllVideos(params);
}

export function formateDate(date) {
  return date.split('T')[0];
}
