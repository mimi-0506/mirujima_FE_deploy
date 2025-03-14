import { TodoType } from './todo.types';

export type cacheType<T> = {
  pageParams: number[];
  pages?: T[];
  todos?: TodoType[];
};
