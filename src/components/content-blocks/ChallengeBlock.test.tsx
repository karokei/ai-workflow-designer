// src/components/content-blocks/ChallengeBlock.test.tsx
// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { ChallengeBlock } from './ChallengeBlock';
import type { ChallengeBlock as ChallengeBlockType } from '@/types/curriculum';
import type { ChallengeResult } from '@/types/progress';

describe('ChallengeBlock Component', () => {
  const mockBlock: ChallengeBlockType = {
    type: 'challenge',
    id: 'c1-3-7',
    title: 'Thiết kế System Prompt Trợ lý Chốt đơn JSON',
    question: 'Hãy thiết kế một **System Prompt** cho chatbot AI.',
    language: 'prompt',
    initialCode: 'Vai trò: Bạn là trợ lý chốt đơn...',
    expectedKeywords: ['JSON', 'cấu trúc'],
    referenceAnswer: 'Vai trò: Trợ lý chốt đơn. Định dạng: JSON cấu trúc.'
  };

  const savedResult: ChallengeResult = {
    codeAnswer: 'Vai trò: Trợ lý chốt đơn JSON cấu trúc.',
    score: 100,
    feedback: '### 🤖 Phản hồi từ AI Judge\nXuất sắc!',
    status: 'pass',
    gradedAt: new Date().toISOString()
  };

  const onSaveResultMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    onSaveResultMock.mockReset();
    // Mock window alert/confirm
    vi.stubGlobal('confirm', vi.fn(() => true));
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('renders correctly with title, language label, and initial code', () => {
    render(
      <ChallengeBlock
        block={mockBlock}
        savedResult={undefined}
        onSaveResult={onSaveResultMock}
      />
    );

    expect(screen.getByText('Thách thức thực chiến: Thiết kế System Prompt Trợ lý Chốt đơn JSON')).toBeTruthy();
    expect(screen.getByText('System Prompt Template')).toBeTruthy();
    expect(screen.getByPlaceholderText('Hãy soạn thảo System Prompt của bạn tại đây...')).toBeTruthy();
    expect(screen.getByDisplayValue('Vai trò: Bạn là trợ lý chốt đơn...')).toBeTruthy();
  });

  it('renders saved result if provided', () => {
    render(
      <ChallengeBlock
        block={mockBlock}
        savedResult={savedResult}
        onSaveResult={onSaveResultMock}
      />
    );

    // It should render the saved code answer instead of initial code
    expect(screen.getByDisplayValue('Vai trò: Trợ lý chốt đơn JSON cấu trúc.')).toBeTruthy();
    
    // Shows score gauge
    expect(screen.getByText('100%')).toBeTruthy();
    expect(screen.getByText('ĐẠT')).toBeTruthy();
    expect(screen.getByText(/Xuất sắc!/)).toBeTruthy();
  });

  it('handles reset confirmation and code reverting', () => {
    const confirmSpy = vi.fn(() => true);
    vi.stubGlobal('confirm', confirmSpy);

    render(
      <ChallengeBlock
        block={mockBlock}
        savedResult={savedResult}
        onSaveResult={onSaveResultMock}
      />
    );

    const resetButton = screen.getByText('RESET');
    fireEvent.click(resetButton);

    expect(confirmSpy).toHaveBeenCalledWith('Bạn có chắc chắn muốn đặt lại mã nguồn về trạng thái ban đầu?');
    // Code should revert to initialCode
    expect(screen.getByDisplayValue('Vai trò: Bạn là trợ lý chốt đơn...')).toBeTruthy();
  });

  it('validates empty inputs before grading', () => {
    const alertSpy = vi.fn();
    vi.stubGlobal('alert', alertSpy);

    render(
      <ChallengeBlock
        block={mockBlock}
        savedResult={undefined}
        onSaveResult={onSaveResultMock}
      />
    );

    // Empty the textarea
    const textarea = screen.getByPlaceholderText('Hãy soạn thảo System Prompt của bạn tại đây...');
    fireEvent.change(textarea, { target: { value: '   ' } });

    const submitBtn = screen.getByText('Chạy thử & Chấm điểm');
    fireEvent.click(submitBtn);

    expect(alertSpy).toHaveBeenCalledWith('Vui lòng nhập lời giải trước khi gửi chấm điểm!');
    expect(onSaveResultMock).not.toHaveBeenCalled();
  });

  it('simulates grading successfully and calls onSaveResult after timer', async () => {
    render(
      <ChallengeBlock
        block={mockBlock}
        savedResult={undefined}
        onSaveResult={onSaveResultMock}
      />
    );

    // Change textarea value to include all expected keywords for a 100% pass score
    const textarea = screen.getByPlaceholderText('Hãy soạn thảo System Prompt của bạn tại đây...');
    fireEvent.change(textarea, { target: { value: 'Tôi muốn xuất kết quả dạng JSON có cấu trúc' } });

    const submitBtn = screen.getByText('Chạy thử & Chấm điểm');
    fireEvent.click(submitBtn);

    // Verify loader indicator is shown
    expect(screen.getByText('AI đang chấm bài...')).toBeTruthy();
    expect(screen.getByText('AI Agent is Auditing your work...')).toBeTruthy();

    // Fast-forward 1.5 seconds simulation time
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(onSaveResultMock).toHaveBeenCalledTimes(1);
    const passedArg = onSaveResultMock.mock.calls[0][0] as ChallengeResult;
    expect(passedArg.score).toBe(100);
    expect(passedArg.status).toBe('pass');
    expect(passedArg.codeAnswer).toBe('Tôi muốn xuất kết quả dạng JSON có cấu trúc');
    expect(passedArg.feedback).toContain('JSON');
  });

  it('grades partially and returns correct status for fewer keywords', async () => {
    render(
      <ChallengeBlock
        block={mockBlock}
        savedResult={undefined}
        onSaveResult={onSaveResultMock}
      />
    );

    // Change value to include only 1 out of 2 keywords: 'JSON'
    const textarea = screen.getByPlaceholderText('Hãy soạn thảo System Prompt của bạn tại đây...');
    fireEvent.change(textarea, { target: { value: 'Chỉ chứa JSON' } });

    const submitBtn = screen.getByText('Chạy thử & Chấm điểm');
    fireEvent.click(submitBtn);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(onSaveResultMock).toHaveBeenCalledTimes(1);
    const passedArg = onSaveResultMock.mock.calls[0][0] as ChallengeResult;
    // 1 keyword out of 2 = 50%
    expect(passedArg.score).toBe(50);
    expect(passedArg.status).toBe('fail'); // Fail because < 80
  });

  it('can toggle the reference solution drawer when answer is saved', () => {
    render(
      <ChallengeBlock
        block={mockBlock}
        savedResult={savedResult}
        onSaveResult={onSaveResultMock}
      />
    );

    // Reference button should be visible since savedResult exists
    const refBtn = screen.getByText('Xem đáp án mẫu');
    expect(refBtn).toBeTruthy();

    // Click to show reference
    fireEvent.click(refBtn);
    expect(screen.getByText('💡 Lời giải tham khảo chuyên gia:')).toBeTruthy();
    expect(screen.getByText('Vai trò: Trợ lý chốt đơn. Định dạng: JSON cấu trúc.')).toBeTruthy();

    // Click to hide reference
    fireEvent.click(screen.getByText('Ẩn đáp án'));
    expect(screen.queryByText('💡 Lời giải tham khảo chuyên gia:')).toBeNull();
  });
});
