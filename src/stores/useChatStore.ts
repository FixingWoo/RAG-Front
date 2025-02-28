import { create } from 'zustand';

const intialState = {
  question: '',
};

interface IChatStore {
  question: string;

  setQuestion: (question: string) => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  ...intialState,

  setQuestion: (question: string) => {
    set({ question });
  },
}));
