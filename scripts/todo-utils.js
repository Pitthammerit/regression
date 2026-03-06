const fs = require('fs');
const path = require('path');

// ============================================================================
// CONSTANTS
// ============================================================================

const TODO_PATH = path.join(process.cwd(), 'TODO.md');
const TASK_REGEX = /^[\s]*-\s\[([ x])\]\s+(.+)$/;
const SECTION_HEADERS = {
  high: '## 🔴 High Priority',
  medium: '## 🟡 Medium Priority',
  low: '## 🟢 Low Priority'
};

// ============================================================================
// FILE OPERATIONS (with atomic writes)
// ============================================================================

function readTodoFile() {
  if (!fs.existsSync(TODO_PATH)) {
    throw new Error('TODO.md not found');
  }
  return fs.readFileSync(TODO_PATH, 'utf-8');
}

function writeTodoFile(content) {
  // Atomic write pattern: temp file + mv
  const tmpPath = `${TODO_PATH}.tmp`;
  fs.writeFileSync(tmpPath, content, 'utf-8');
  fs.renameSync(tmpPath, TODO_PATH);
}

// ============================================================================
// TEXT PROCESSING
// ============================================================================

function extractKeywords(text) {
  const clean = text
    .replace(/[\*\[\]\(\)\{\}]/g, ' ')
    .replace(/https?:\/\/[^\s]+/g, '')
    .toLowerCase();
  const words = clean.match(/\b[a-z]{3,}\b/gi) || [];
  return [...new Set(words)];
}

function calculateSimilarity(str1, str2) {
  const keywords1 = extractKeywords(str1);
  const keywords2 = extractKeywords(str2);

  if (keywords1.length === 0 || keywords2.length === 0) return 0;

  const intersection = keywords1.filter(k => keywords2.includes(k));
  const union = [...new Set([...keywords1, ...keywords2])];

  return intersection.length / union.length;
}

function updateTimestamp(content) {
  const now = new Date();
  const updated = now.toISOString().replace('T', ' ').substring(0, 16);
  return content.replace(/Updated: \d{4}-\d{2}-\d{2}.*/, `Updated: ${updated}`);
}

// ============================================================================
// TASK PROCESSING
// ============================================================================

function parseTasks(content) {
  const lines = content.split('\n');
  const tasks = [];

  for (const line of lines) {
    const match = line.match(TASK_REGEX);
    if (match) {
      tasks.push({
        line,
        status: match[1], // ' ' or 'x'
        text: match[2]
      });
    }
  }

  return tasks;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

function handleError(error, message) {
  console.error(`❌ ${message}:`, error.message);
  process.exit(1);
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  // Constants
  TODO_PATH,
  TASK_REGEX,
  SECTION_HEADERS,

  // File operations
  readTodoFile,
  writeTodoFile,

  // Text processing
  extractKeywords,
  calculateSimilarity,
  updateTimestamp,

  // Task processing
  parseTasks,

  // Error handling
  handleError
};
