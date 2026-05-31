// src/components/content-blocks/TableBlock.tsx
import type { TableBlock as TableBlockType } from '@/types/curriculum';

interface TableBlockProps {
  block: TableBlockType;
}

export function TableBlock({ block }: TableBlockProps) {
  return (
    <div className="my-5 border border-border rounded-xl overflow-hidden shadow-xs w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-bg-secondary border-b border-border text-[10px] font-bold text-text-primary uppercase tracking-wider">
              {block.headers.map((hdr, idx) => (
                <th key={idx} className="p-3 sm:p-4 font-semibold">
                  {hdr}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {block.rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-bg-secondary/30 even:bg-bg-secondary/10 transition-colors"
              >
                {row.map((col, colIdx) => (
                  <td key={colIdx} className="p-3 sm:p-4 text-text-secondary font-medium leading-relaxed">
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
