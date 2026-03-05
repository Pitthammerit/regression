#!/usr/bin/env node

/**
 * update-todo.js
 *
 * Automatic TODO.md synchronization after git push
 * - Parses commit messages to detect completed tasks
 * - Updates timestamp
 * - Commits changes if any
 *
 * Usage: node scripts/update-todo.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TODO_PATH = path.join(process.cwd(), 'TODO.md');

/**
 * Get recent commit messages (last 10 commits)
 */
function getRecentCommits() {
  try {
    const commits = execSync('git log -10 --pretty=%B', { encoding: 'utf-8' });
    return commits.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error getting commits:', error.message);
    return [];
  }
}

/**
 * Extract keywords from a task string
 */
function extractKeywords(text) {
  // Remove markdown, URLs, special chars
  const clean = text
    .replace(/[\*\[\]\(\)\{\}]/g, ' ')
    .replace(/https?:\/\/[^\s]+/g, '')
    .toLowerCase();

  // Extract meaningful words (min 3 chars)
  const words = clean.match(/\b[a-z]{3,}\b/gi) || [];
  return [...new Set(words)]; // unique
}

/**
 * Calculate similarity between two strings (0-1)
 */
function calculateSimilarity(str1, str2) {
  const keywords1 = extractKeywords(str1);
  const keywords2 = extractKeywords(str2);

  if (keywords1.length === 0 || keywords2.length === 0) return 0;

  const intersection = keywords1.filter(k => keywords2.includes(k));
  const union = [...new Set([...keywords1, ...keywords2])];

  return intersection.length / union.length;
}

/**
 * Check if a task might be completed based on commit message
 * More conservative: requires explicit completion words + keyword match
 */
function isTaskCompleted(taskText, commitMessages) {
  const taskKeywords = extractKeywords(taskText);
  const taskWords = taskText.toLowerCase().split(/\s+/);

  for (const commit of commitMessages) {
    const commitLower = commit.toLowerCase();
    const commitKeywords = extractKeywords(commit);

    // Check for explicit completion indicators
    const hasCompletionWord = /^(feat|fix|chore|perf|docs|style|refactor|test)|completed|fixed|implemented|added|removed|deleted|resolved|updated/i.test(commitLower);

    if (!hasCompletionWord) {
      continue;
    }

    // Calculate keyword overlap
    const overlap = taskKeywords.filter(k => commitKeywords.includes(k));

    // Also check for exact word matches (more precise)
    const wordMatches = taskWords.filter(w =>
      w.length > 4 && commitLower.includes(w)
    );

    // Require strong evidence: completion word + at least 3 keyword overlaps OR 2 exact word matches
    if (overlap.length >= 3 || wordMatches.length >= 2) {
      return true;
    }
  }

  return false;
}

/**
 * Update timestamp in TODO.md
 */
function updateTimestamp(content) {
  const now = new Date();
  const updated = now.toISOString().replace('T', ' ').substring(0, 16); // "2026-03-05 14:30"
  return content.replace(/Updated: \d{4}-\d{2}-\d{2}.*/, `Updated: ${updated}`);
}

/**
 * Mark tasks as completed based on commit messages
 */
function markCompletedTasks(content, commitMessages) {
  const lines = content.split('\n');
  const result = [];
  let anyCompleted = false;

  for (const line of lines) {
    let newLine = line;

    // Check for incomplete task
    const taskMatch = line.match(/^[\s]*-\s\[ \]\s+(.+)$/);
    if (taskMatch) {
      const taskText = taskMatch[1];

      if (isTaskCompleted(taskText, commitMessages)) {
        newLine = line.replace('- [ ]', '- [x]');
        anyCompleted = true;
        console.log(`✓ Completed: ${taskText.substring(0, 60)}...`);
      }
    }

    result.push(newLine);
  }

  return { content: result.join('\n'), anyCompleted };
}

/**
 * Main execution
 */
function main() {
  console.log('🔄 TODO.md Auto-Sync started...\n');

  // Read TODO.md
  if (!fs.existsSync(TODO_PATH)) {
    console.log('❌ TODO.md not found');
    process.exit(0);
  }

  let content = fs.readFileSync(TODO_PATH, 'utf-8');

  // Get recent commits
  const commits = getRecentCommits();
  console.log(`📜 Analyzing ${commits.length} recent commits...\n`);

  // Mark completed tasks
  const { content: updatedContent, anyCompleted } = markCompletedTasks(content, commits);

  // Update timestamp
  const finalContent = updateTimestamp(updatedContent);

  // Write back if changed
  if (finalContent !== content) {
    fs.writeFileSync(TODO_PATH, finalContent, 'utf-8');
    console.log('\n✅ TODO.md updated');
    process.exit(1); // Exit code 1 = changes made
  } else {
    console.log('ℹ️  No TODO.md changes needed');
    process.exit(0); // Exit code 0 = no changes
  }
}

main();
