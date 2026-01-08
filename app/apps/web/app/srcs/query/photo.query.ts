import { fetchPhoto } from '../service/photo.service.fetch';

export const photoQuery = (id: number) => ({
  queryKey: ['photos', id],
  queryFn: async () => fetchPhoto(id),
  stableTime: 1000 * 60 * 5,
});
