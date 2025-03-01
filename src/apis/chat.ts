import { axiosClient } from '@/utils/axios-client';

export const test = async () => {
  const result = await axiosClient.get(`/`);

  console.log(result);
};
