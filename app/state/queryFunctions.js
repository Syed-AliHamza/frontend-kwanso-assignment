import http from '../service/http';
import { APIS } from '../utils/constants';

const { TASKS } = APIS;

export const getTasks = () => {
  const url = `${TASKS}`;

  return http.get(url);
};

export const deleteTask = (payload) =>
  http.delete(TASKS, { data: { id: payload } });
