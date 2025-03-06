import { axiosClient } from '@/utils/axios-client';
import { useChatStore, useAbortControllerStore } from '@/stores';

export const chat = async (question: string) => {
  const setChats = useChatStore.getState().setChats;
  const updateLastChats = useChatStore.getState().updateLastChats;
  const setController = useAbortControllerStore.getState().setController;

  const controller = new AbortController();
  setController(controller);

  try {
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
        signal: controller.signal,
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
  } catch (e: unknown) {
    // ✅ STEP4. 예외 처리

    if (e instanceof DOMException && e.name === 'AbortError') {
      // AbortError인 경우
      updateLastChats('작업이 중단 되었습니다.', 'Pause');
    } else if (e instanceof Error) {
      // 일반적인 Error 객체인 경우
      updateLastChats(e.message, 'Error');
    } else {
      // 예상치 못한 오류인 경우
      updateLastChats('An unknown error occurred', 'Error');
    }
  }
};
