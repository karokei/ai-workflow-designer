// src/components/content-blocks/blocks.test.tsx
// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Imports of components
import { CalloutBlock } from './CalloutBlock';
import { ChecklistBlock } from './ChecklistBlock';
import { StepsBlock } from './StepsBlock';
import { TableBlock } from './TableBlock';
import { ListBlock } from './ListBlock';

describe('CalloutBlock Component', () => {
  it('should render the callout content and custom title', () => {
    const mockBlock = {
      type: 'callout' as const,
      variant: 'tip' as const,
      title: 'Mẹo n8n hữu ích',
      content: 'Hãy dùng code node để tối ưu tốc độ xử lý.',
    };

    render(<CalloutBlock block={mockBlock} />);

    expect(screen.getByText('Mẹo n8n hữu ích')).toBeTruthy();
    expect(screen.getByText('Hãy dùng code node để tối ưu tốc độ xử lý.')).toBeTruthy();
  });

  it('should fallback to default variant title when no custom title is provided', () => {
    const mockBlock = {
      type: 'callout' as const,
      variant: 'important' as const,
      content: 'API Key cần được che giấu kỹ.',
    };

    render(<CalloutBlock block={mockBlock} />);

    expect(screen.getByText('Quan trọng')).toBeTruthy();
    expect(screen.getByText('API Key cần được che giấu kỹ.')).toBeTruthy();
  });
});

describe('ChecklistBlock Component', () => {
  it('should render items list and respect checked states', () => {
    const mockBlock = {
      type: 'checklist' as const,
      title: 'Các bước hoàn thành',
      items: ['Tìm hiểu OpenAI API', 'Tạo tài khoản n8n', 'Kết nối webhook'],
    };

    const savedState = [true, false, false];
    const handleSelect = vi.fn();

    render(
      <ChecklistBlock
        block={mockBlock}
        savedChecklistState={savedState}
        onSelectChecklistItem={handleSelect}
      />
    );

    expect(screen.getByText('Các bước hoàn thành')).toBeTruthy();
    
    // Check that items are rendered
    const item1 = screen.getByText('Tìm hiểu OpenAI API');
    const item2 = screen.getByText('Tạo tài khoản n8n');
    expect(item1).toBeTruthy();
    expect(item2).toBeTruthy();

    // Trigger click on second item
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(handleSelect).toHaveBeenCalledWith(1);
  });
});

describe('StepsBlock Component', () => {
  it('should render the sequential steps timeline', () => {
    const mockBlock = {
      type: 'steps' as const,
      title: 'Hướng dẫn cài đặt',
      steps: [
        { number: 1, title: 'Bước 1', description: 'Cài đặt node.js' },
        { number: 2, title: 'Bước 2', description: 'Khởi chạy git init' }
      ]
    };

    render(<StepsBlock block={mockBlock} />);

    expect(screen.getByText('Hướng dẫn cài đặt')).toBeTruthy();
    expect(screen.getByText('Bước 1')).toBeTruthy();
    expect(screen.getByText('Cài đặt node.js')).toBeTruthy();
    expect(screen.getByText('Bước 2')).toBeTruthy();
  });
});

describe('TableBlock Component', () => {
  it('should render headers and matching rows of data', () => {
    const mockBlock = {
      type: 'table' as const,
      headers: ['Dịch vụ', 'Giá trị', 'Tốc độ'],
      rows: [
        ['Make.com', 'Trung bình', 'Nhanh'],
        ['n8n', 'Cao', 'Cực nhanh']
      ]
    };

    render(<TableBlock block={mockBlock} />);

    expect(screen.getByText('Dịch vụ')).toBeTruthy();
    expect(screen.getByText('Tốc độ')).toBeTruthy();
    expect(screen.getByText('Make.com')).toBeTruthy();
    expect(screen.getByText('n8n')).toBeTruthy();
    expect(screen.getByText('Cực nhanh')).toBeTruthy();
  });
});

describe('ListBlock Component', () => {
  it('should render bullets correctly', () => {
    const mockBlock = {
      type: 'bullets' as const,
      items: ['Ý tưởng A', 'Ý tưởng B']
    };

    render(<ListBlock block={mockBlock} />);

    expect(screen.getByText('Ý tưởng A')).toBeTruthy();
    expect(screen.getByText('Ý tưởng B')).toBeTruthy();
  });

  it('should render numbered items lists correctly', () => {
    const mockBlock = {
      type: 'numbered' as const,
      items: ['Bước đầu', 'Bước hai']
    };

    render(<ListBlock block={mockBlock} />);

    expect(screen.getByText('Bước đầu')).toBeTruthy();
    expect(screen.getByText('Bước hai')).toBeTruthy();
  });
});
