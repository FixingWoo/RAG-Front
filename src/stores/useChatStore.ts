import { create } from 'zustand';

const intialState = {
  question: '',
  chats: [],
};

interface Chat {
  type: 'AI' | 'User';
  text: string;
}

interface IChatStore {
  question: string;
  chats: Chat[];

  setQuestion: (question: string) => void;
  setChats: (chat: Chat) => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  ...intialState,

  setQuestion: (question: string) => {
    set({ question });
  },
  setChats: (chat: Chat) => {
    console.log(chat);

    const currentChats = get().chats;
    set({ chats: [...currentChats, chat] });
  },
}));
