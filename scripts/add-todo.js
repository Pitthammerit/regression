#!/usr/bin/env node

/**
 * add-todo.js
 *
 * Add new tasks to TODO.md with duplicate detection
 * - Checks for similar existing tasks
 * - Prompts user for confirmation on conflicts
 * - Updates timestamp
 *
 * Usage: node scripts/add-todo.js "Task description" [priority]
 * Priority: high (default), medium, low
 */

const todoUtils = require('./todo-utils');

/**
 * Find all similar tasks in TODO.md
 */
function findSimilarTasks(newTask, content, threshold = 0.4) {
  const lines = content.split('\n');
  const similar = [];

  for (const line of lines) {
    const taskMatch = line.match(todoUtils.TASK_REGEX);
    if (taskMatch) {
      const status = taskMatch[1]; // ' ' or 'x'
      const taskText = taskMatch[2];
      const similarity = todoUtils.calculateSimilarity(newTask, taskText);

      if (similarity >= threshold) {
        similar.push({
          task: taskText,
          completed: status === 'x',
          similarity: similarity
        });
      }
    }
  }

  // Sort by similarity descending
  return similar.sort((a, b) => b.similarity - a.similarity);
}

/**
 * Find section insertion point by priority
 */
function findInsertionPoint(content, priority = 'high') {
  const lines = content.split('\n');
  const targetHeader = todoUtils.SECTION_HEADERS[priority] || todoUtils.SECTION_HEADERS.high;

  // Find the target section
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === targetHeader) {
      // Find first empty line after header or first task
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].trim() === '' || lines[j].match(/^\s*-\s\[/)) {
          return j;
        }
      }
      // Insert at end of section (before next ## header)
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].match(/^##\s/)) {
          return j;
        }
      }
      return lines.length;
    }
  }

  // Section not found, append to end
  return lines.length;
}

/**
 * Add task to content
 */
function addTask(content, task, priority = 'high') {
  const lines = content.split('\n');
  const insertIndex = findInsertionPoint(content, priority);

  const taskLine = `- [ ] ${task}`;

  // Insert at the right position
  lines.splice(insertIndex, 0, taskLine);

  return lines.join('\n');
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node scripts/add-todo.js "Task description" [priority]');
    console.log('Priority: high (default), medium, low');
    process.exit(1);
  }

  const newTask = args[0];
  const priority = args[1] || 'high';

  console.log(`\n📝 Adding new task: "${newTask}"`);
  console.log(`   Priority: ${priority}\n`);

  // Read TODO.md
  let content;
  try {
    content = todoUtils.readTodoFile();
  } catch (error) {
    console.log('❌ TODO.md not found');
    process.exit(1);
  }

  // Check for similar tasks
  const similar = findSimilarTasks(newTask, content);

  if (similar.length > 0) {
    console.log('⚠️  Similar tasks found:\n');
    similar.forEach((s, i) => {
      const status = s.completed ? '✅' : '⬜';
      console.log(`   ${i + 1}. [${status}] ${s.task}`);
      console.log(`      (similarity: ${(s.similarity * 100).toFixed(0)}%)`);
    });
    console.log('\nPlease choose:');
    console.log('  1 - Skip (existing task covers it)');
    console.log('  2 - Add anyway (new task)');
    console.log('  3 - Mark existing as completed and add new');
    console.log('\nFor now, script exits. Please edit TODO.md manually.\n');
    process.exit(1);
  }

  // No similar tasks, add the new one
  let updatedContent = addTask(content, newTask, priority);
  updatedContent = todoUtils.updateTimestamp(updatedContent);

  todoUtils.writeTodoFile(updatedContent);
  console.log('✅ Task added successfully!\n');
}

main();
