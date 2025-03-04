import { axiosClient } from '@/utils/axios-client';
import { useChatStore } from '@/stores';

export const chat = async (question: string) => {
  const setChats = useChatStore.getState().setChats;
  const updateChats = useChatStore.getState().updateChats;

  // ✅ STEP1. API 호출
  const response = await axiosClient.post(
    `/v1/chat`,
    { question },
    {
      responseType: 'stream',
      adapter: 'fetch',
      headers: {
        Accept: 'text/event-stream',
      },
    }
  );

  // ✅ STEP2. 답변 Append
  setChats({ type: 'AI', status: 'Pending', text: '' });

  // ✅ STEP3. Stream 파싱
  const reader = response.data.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const row = JSON.parse(chunk);

    // ✅ STEP4. 답변 내용 Append
    updateChats(row['answer']);
  }
};
