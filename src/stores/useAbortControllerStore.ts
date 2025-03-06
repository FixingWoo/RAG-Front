import { create } from 'zustand';

interface IStore {
  controller: AbortController | null;
  setController: (controller: AbortController) => void;
  abortRequest: () => void;
}

export const useAbortControllerStore = create<IStore>((set, get) => ({
  controller: null,
  setController(controller: AbortController) {
    set({ controller });
  },
  abortRequest: () => {
    const controller = get().controller;

    if (controller) {
      controller.abort();
    }
  },
}));
