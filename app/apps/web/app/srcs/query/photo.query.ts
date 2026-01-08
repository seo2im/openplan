import { FRESH_WINDOW } from '../constant/time';
import { fetchPhoto } from '../service/photo.service.fetch';

export const photoQuery = (id: number) => ({
  queryKey: ['photos', id],
  queryFn: async () => fetchPhoto(id),
  staleTime: FRESH_WINDOW,
});
