#!/usr/bin/env node
/**
 * watch-todo.js
 *
 * Watcher Mode: TODO.md aktualisiert sich automatisch bei Datei-Änderungen
 * - Überwacht frontend/src/ und frontend/config/
 * - Runnt update-todo.js bei Änderungen
 * - Kann mit npm run todo:watch gestartet/gestoppt werden
 */

const chokidar = require('chokidar');
const { spawn } = require('child_process');
const path = require('path');

// Paths to watch
const WATCH_PATHS = [
  path.join(process.cwd(), 'frontend/src/**'),
  path.join(process.cwd(), 'frontend/config/**'),
  path.join(process.cwd(), 'CLAUDE.md'),
  path.join(process.cwd(), 'scripts/**')
];

// Debounce: Wait 500ms after last change before running update
let updateTimeout = null;
let isRunning = false;

console.log('👀 Watcher Mode gestartet...');
console.log('📁 Überwachte Pfade:');
WATCH_PATHS.forEach(p => console.log(`   - ${p}`));
console.log('⏹️  Stop mit Ctrl+C\n');

const runUpdate = () => {
  if (isRunning) {
    console.log('⏳ Update läuft bereits, skip...');
    return;
  }

  isRunning = true;
  console.log('\n🔄 Änderung erkannt, aktualisiere TODO.md...');

  const update = spawn('node', ['scripts/update-todo.js'], {
    stdio: 'inherit',
    shell: true
  });

  update.on('close', (code) => {
    isRunning = false;
    if (code === 0) {
      console.log('ℹ️  Keine Änderungen nötig\n');
    } else if (code === 1) {
      console.log('✅ TODO.md aktualisiert\n');
      // Optional: Git staging für User
      console.log('💡 Tipp: git add TODO.md um Änderungen zu committen\n');
    }
  });
};

// Watcher starten
const watcher = chokidar.watch(WATCH_PATHS, {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 200,
    pollInterval: 100
  }
});

watcher
  .on('add', () => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(runUpdate, 500);
  })
  .on('change', () => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(runUpdate, 500);
  })
  .on('error', error => console.error(`❌ Watcher error: ${error}`))
  .on('ready', () => console.log('✅ Watcher bereit\n'));

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  Watcher wird gestoppt...');
  watcher.close();
  process.exit(0);
});
