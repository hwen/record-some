import { get, post } from './http';

export const sleepDetail = id => {
  const url = `/getSleep?id=${id}`;
  return get(url);
};

export const updateSleep = sleep => {
  const url = '/updateSleep';
  return post(url, sleep);
};

export const addSleep = sleep => {
  const url = '/addSleep';
  return post(url, sleep);
};

export const listSleep = () => {
  const url = '/listSleep';
  return get(url);
};
