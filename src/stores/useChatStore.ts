import { create } from 'zustand';

const intialState = {
  result: '',
  question: '',
  chats: [],
};

type Status = 'Pending' | 'Process' | 'Done' | 'Fail' | 'Cancel';

interface IChat {
  type: 'AI' | 'User';
  status?: Status;
  text: string;
}

interface IChatStore {
  question: string;
  chats: IChat[];

  getLastChat: () => IChat;

  setChats: (chat: IChat) => void;
  setQuestion: (question: string) => void;
  updateLastChats: (chunk: string, status: Status) => void;
  clearChats: () => void;
}

export const useChatStore = create<IChatStore>((set, get) => ({
  ...intialState,

  getLastChat: () => {
    const currentChats = get().chats;
    const lastChat = currentChats[currentChats.length - 1];

    return lastChat;
  },

  setQuestion: (question: string) => {
    set({ question });
  },
  setChats: (chat: IChat) => {
    const currentChats = get().chats;
    set({ chats: [...currentChats, chat] });
  },
  updateLastChats: (chunk: string, status: Status) => {
    set((state) => {
      if (state.chats.length === 0) return state;

      const updatedChats = [...state.chats];
      const lastChat = updatedChats[updatedChats.length - 1];

      if (lastChat.type === 'AI') {
        lastChat.text += chunk;
        lastChat.status = status;
      }

      return { chats: updatedChats };
    });
  },
  clearChats: () => {
    set({ chats: [] });
  },
}));
