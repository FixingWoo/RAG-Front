import { create } from 'zustand';

const intialState = {
  result: '',
  question: '',
  chats: [],
};

interface IChat {
  type: 'AI' | 'User';
  status?: 'Pending' | 'Process' | 'Done' | 'Fail' | 'Cancel';
  text: string;
}

interface IChatStore {
  question: string;
  chats: IChat[];

  setChats: (chat: IChat) => void;
  setQuestion: (question: string) => void;
  updateChats: (chunk: string) => void;
  clearChats: () => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  ...intialState,

  setQuestion: (question: string) => {
    set({ question });
  },
  setChats: (chat: IChat) => {
    const currentChats = get().chats;
    set({ chats: [...currentChats, chat] });
  },
  updateChats: (chunk: string) => {
    set((state) => {
      if (state.chats.length === 0) return state;

      const updatedChats = [...state.chats];
      const lastChat = updatedChats[updatedChats.length - 1];

      if (lastChat.type === 'AI') {
        lastChat.text += chunk;
      }

      return { chats: updatedChats };
    });
  },
  clearChats: () => {
    set({ chats: [] });
  },
}));
