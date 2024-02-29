import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  register: 'auth/register',
  login: 'auth/login',

  listMeetup: 'meetup/user/list',
  listMeetupByCategories: 'meetup/category/user/list',
  listCategory: 'category/admin/list',
  
  createMeetup: 'meetup/user/create',
  detailMeetup: 'meetup/user/detail',
  memberMeetup: 'attend/meetup',
  addAttend: 'attend/user',
  deleteAttend: 'attend/delete/user',
  listCommentMeetup: 'comment/meetup/list',
  commentMeetupLoadMore: 'comment/meetup/loadmore',
  addComment: 'comment/user',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');
export const register = (data) => {
  return callAPI(urls.register, 'POST', {}, {}, data);
};
export const login = (data) => {
  return callAPI(urls.login, 'POST', {}, {}, data);
};

export const newMeetup = (data) =>
  callAPI(urls.createMeetup, 'POST', { 'Content-Type': 'multipart/form-data; charset=UTF-8' }, {}, data);
export const listMeetup = () => callAPI(`${urls.listMeetup}`, 'GET');
export const listMeetupbyCategory = (category) => callAPI(`${urls.listMeetupByCategories}`, 'GET' ,{}, {category});
export const detailMeetup = (id) => callAPI(`${urls.detailMeetup}/${id}`, 'GET');
export const memberMeetup = (id) => callAPI(`${urls.memberMeetup}/${id}`, 'GET');
export const addAttend = (id) => {
  return callAPI(`${urls.addAttend}/${id}`, 'POST');
};
export const deleteAttend = (id) => {
  return callAPI(`${urls.deleteAttend}/${id}`, 'DELETE');
};
export const memberComment = (id, page) => callAPI(`${urls.commentMeetupLoadMore}/${id}`, 'GET', {}, { page });
export const addComment = (id, data) => {
  return callAPI(`${urls.addComment}/${id}`, 'POST', {}, {}, data);
};

export const listCategory = () => callAPI(`${urls.listCategory}`, 'GET');