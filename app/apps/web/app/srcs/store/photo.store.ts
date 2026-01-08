import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PicsumData } from '../dto/dto.photo';

type PhotoState = {
  photo: PicsumData | undefined;
  setPhoto: (photo: PicsumData | undefined) => void;
  reset: () => void;
};
export const usePhotoStore = create(
  persist<PhotoState>(
    (set) => ({
      photo: undefined,
      setPhoto: (photo) => set({ photo }),
      reset: () => set({ photo: undefined }),
    }),
    {
      name: 'photo-storage',
    }
  )
);
