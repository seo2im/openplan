import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PicsumData } from '../dto/dto.photo';

type PhotoState = {
  photo: PicsumData | undefined;
  setPhoto: (photo: PicsumData | undefined) => void;
  reset: () => void;
  callTime: number | undefined;
};
export const usePhotoStore = create(
  persist<PhotoState>(
    (set) => ({
      photo: undefined,
      callTime: undefined,
      setPhoto: (photo) => set({ photo, callTime: Date.now() }),
      reset: () => set({ photo: undefined, callTime: undefined }),
    }),
    {
      name: 'photo-storage',
    }
  )
);
