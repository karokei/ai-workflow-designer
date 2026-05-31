// src/utils/curriculum-lazy.test.ts
import { describe, it, expect } from 'vitest';
import { CURRICULUM } from '@/data/curriculum';

describe('Curriculum Metadata Structure', () => {
  it('should verify CURRICULUM outline contains all 7 phases', () => {
    expect(CURRICULUM.length).toBe(7);
    
    // Verify that every lesson content array in the static CURRICULUM is empty (lightweight metadata)
    CURRICULUM.forEach((phase) => {
      expect(phase.id).toBeTypeOf('number');
      expect(phase.title).toBeTypeOf('string');
      
      phase.modules.forEach((module) => {
        module.lessons.forEach((lesson) => {
          expect(lesson.id).toBeTypeOf('string');
          expect(lesson.title).toBeTypeOf('string');
          // Expect static metadata lessons to have empty content to keep the bundle small
          expect(lesson.content).toEqual([]);
        });
      });
    });
  });
});

describe('Dynamic Lazy-Loaded Phases Integrity', () => {
  const phaseIds = [0, 1, 2, 3, 4, 5, 6];

  phaseIds.forEach((id) => {
    it(`should successfully dynamically import phase-${id} with complete detailed contents`, async () => {
      // Dynamic import of the phase file
      const phaseModule = await import(`../data/phases/phase-${id}`);
      const phaseData = phaseModule[`phase${id}`];

      expect(phaseData).toBeDefined();
      expect(phaseData.id).toBe(id);
      expect(phaseData.title).toBeTypeOf('string');
      expect(phaseData.modules.length).toBeGreaterThan(0);

      // Verify that at least one lesson has detailed populated content blocks
      let hasDetailedContent = false;
      phaseData.modules.forEach((mod: any) => {
        mod.lessons.forEach((les: any) => {
          if (les.content && les.content.length > 0) {
            hasDetailedContent = true;
          }
        });
      });

      expect(hasDetailedContent).toBe(true);
    });
  });
});
