import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Agent Framework Integration', () => {
  it('should verify that all integration files exist', () => {
    const rootDir = path.resolve(__dirname, '../../');
    const agentDir = path.join(rootDir, '.agent');
    const memoryFile = path.join(agentDir, 'memory', 'learnings.json');
    const rulesFile = path.join(agentDir, 'rules', 'global_rules.md');
    const continuityFile = path.join(rootDir, 'CONTINUITY.md');
    const skillsDir = path.join(rootDir, 'skills');
    const claudeFile = path.join(rootDir, 'CLAUDE.md');
    const geminiFile = path.join(rootDir, 'GEMINI.md');

    expect(fs.existsSync(agentDir)).toBe(true);
    expect(fs.existsSync(memoryFile)).toBe(true);
    expect(fs.existsSync(rulesFile)).toBe(true);
    expect(fs.existsSync(continuityFile)).toBe(true);
    expect(fs.existsSync(skillsDir)).toBe(true);
    expect(fs.existsSync(claudeFile)).toBe(true);
    expect(fs.existsSync(geminiFile)).toBe(true);
  });
});
