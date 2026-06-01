// src/services/ai.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  gradeChallengeOffline, 
  checkRateLimit, 
  getSessionCallCount, 
  getMaxCallsLimit 
} from './ai';
import type { ChallengeBlock } from '@/types/curriculum';

describe('AI Grading Service', () => {
  beforeEach(() => {
    // Clear sessionStorage mock
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  const mockBlock: ChallengeBlock = {
    id: 'test-webhook-prompt',
    type: 'challenge',
    title: 'Test Webhook Prompt constraints',
    question: 'Hãy thiết kế một system prompt ép JSON...',
    initialCode: 'Create a system prompt...',
    referenceAnswer: 'Role: AI System... Format output strictly in JSON...',
    expectedKeywords: ['JSON', 'Vai trò', 'Giới hạn'],
    language: 'prompt',
  };

  describe('checkRateLimit', () => {
    it('should allow calls under limit', () => {
      const limit = checkRateLimit();
      expect(limit.allowed).toBe(true);
      expect(limit.count).toBe(0);
      expect(limit.limit).toBe(10); // default
    });

    it('should reflect correct limit from env variables if mock is present', () => {
      expect(getMaxCallsLimit()).toBe(10);
    });

    it('should return session call count accurately', () => {
      expect(getSessionCallCount()).toBe(0);
      sessionStorage.setItem('aiwfd:ai-calls-count', '3');
      expect(getSessionCallCount()).toBe(3);
    });
  });

  describe('gradeChallengeOffline', () => {
    it('should grade 100% when all expected keywords are present', () => {
      const code = 'Thiết lập Vai trò: Trợ lý chuyên nghiệp. Giới hạn: Không được nói sảng. Đầu ra bắt buộc là JSON.';
      const result = gradeChallengeOffline(code, mockBlock);
      
      expect(result.score).toBe(100);
      expect(result.status).toBe('pass');
      expect(result.codeAnswer).toBe(code);
      expect(result.feedback).toContain('rất xuất sắc');
    });

    it('should grade partial scores when some keywords are missing', () => {
      const code = 'Thiết lập Vai trò: Trợ lý chuyên nghiệp.';
      const result = gradeChallengeOffline(code, mockBlock);
      
      expect(result.score).toBe(33); // 1 out of 3 keywords
      expect(result.status).toBe('fail');
      expect(result.feedback).toContain('Từ khóa bị thiếu');
    });

    it('should support JavaScript block evaluation correctly', () => {
      const jsBlock: ChallengeBlock = {
        id: 'test-js-node',
        type: 'challenge',
        title: 'JavaScript Code Node',
        question: 'Duyệt mảng và trả về json',
        initialCode: 'return []',
        referenceAnswer: 'return items.map(i => ({ json: i }))',
        expectedKeywords: ['json', 'map'],
        language: 'javascript',
      };

      const code = 'return items.map(item => ({ json: item }));';
      const result = gradeChallengeOffline(code, jsBlock);

      expect(result.score).toBe(100);
      expect(result.status).toBe('pass');
      expect(result.feedback).toContain('Mã nguồn JavaScript xử lý trong n8n Code Node');
    });
  });
});
