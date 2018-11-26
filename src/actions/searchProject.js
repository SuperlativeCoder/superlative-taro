import {
  GET_SEARCH_PROJECTS,
} from '../constants/searchProject';
import env from '../env/index';
import { CALL_API } from '../constants/symbols';

export function searchProjects(data, success, error) {
  return {
    [CALL_API]: {
      url: `${env.FD_HOST_TEST}/api/zhuzher/projects/search?query=${data}`,
      type: GET_SEARCH_PROJECTS,
      success,
      error,
    },
  };
}
