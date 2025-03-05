import { axiosClient } from '@/utils/axios-client';
import { useChatStore } from '@/stores';

export const chat = async (question: string) => {
  const setChats = useChatStore.getState().setChats;
  const updateLastChats = useChatStore.getState().updateLastChats;

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

  // ✅ STEP2. 초기 AI 메시지 추가
  setChats({ type: 'AI', status: 'Pending', text: '' });

  // ✅ STEP3. Stream 파싱
  const reader = response.data.getReader();
  const decoder = new TextDecoder();
  let streamBuffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      updateLastChats('', 'Done');
      break;
    }

    const chunk = decoder.decode(value, { stream: true });
    streamBuffer += chunk;

    let startIdx = 0;

    while (true) {
      const endIdx = streamBuffer.indexOf('}', startIdx);
      if (endIdx === -1) break;

      const jsonStr = streamBuffer.slice(startIdx, endIdx + 1);
      try {
        const row = JSON.parse(jsonStr);
        updateLastChats(row['answer'], 'Process');
      } catch (error) {
        console.error('JSON parsing error:', error);
      }

      startIdx = endIdx + 1;
    }

    streamBuffer = streamBuffer.slice(startIdx);
  }
};
