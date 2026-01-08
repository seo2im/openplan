import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {PicsumData} from '../dto/dto.photo';

type PhotoState = {
  photo: PicsumData | null;
  loading: boolean;
  error: string | null;
  fetchPhoto: () => Promise<void>;
  setLoading: (loading: boolean) => void;
};
export const usePhotoStore = create(persist<PhotoState>((set) => ({
  photo: null,
  loading: false,
  error: null,
  fetchPhoto: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("https://picsum.photos/id/0/info");
      if (!response.ok) {
        throw new Error('Failed to fetch photo data');
      }
      const data: PicsumData = await response.json();
      set({ photo: data });
    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : String(error), loading: false });
    }
  },
  setLoading: (loading: boolean) => set({ loading }),
}), {
  name: 'photo-storage',
}));