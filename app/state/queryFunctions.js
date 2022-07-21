import http from '../service/http';
import { APIS } from '../utils/constants';

const { TASKS, LOGIN } = APIS;

export const getTasks = () => {
  const url = `${TASKS}`;

  return http.get(url);
};

export const deleteTask = (payload) =>
  http.delete(TASKS, { data: { id: payload } });

export const createTask = (payload) => http.post(`${TASKS}/create`, payload);

export const login = (payload) => http.post(LOGIN, payload);
