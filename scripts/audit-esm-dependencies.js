#!/usr/bin/env node

/**
 * ESM Dependency Audit Script
 *
 * Checks all dependencies for ESM compatibility
 * Run: node scripts/audit-esm-dependencies.js
 */

const fs = require('fs');
const path = require('path');

const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
const PACKAGE_JSON = path.join(FRONTEND_DIR, 'package.json');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

function log(color, ...args) {
  console.log(color, ...args, colors.reset);
}

function readPackageJson() {
  try {
    const content = fs.readFileSync(PACKAGE_JSON, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    log(colors.red, '❌ Error reading package.json:', error.message);
    process.exit(1);
  }
}

function checkModuleType(packageJson) {
  log(colors.blue, '\n📦 Module Type Check:');
  log(colors.gray, '─'.repeat(50));

  if (packageJson.type === 'module') {
    log(colors.green, '✅ Package is ESM ("type": "module")');
  } else {
    log(colors.yellow, '⚠️  Package is CommonJS (no "type" field)');
    log(colors.gray, '   This means all .js files are treated as CommonJS');
  }
}

function analyzeDependencies(packageJson) {
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  log(colors.blue, '\n📋 Dependency Analysis:');
  log(colors.gray, '─'.repeat(50));

  const results = {
    esm: [],
    commonjs: [],
    unknown: [],
  };

  Object.entries(allDeps).forEach(([name, version]) => {
    // Check if package has ESM support
    const pkgPath = path.join(FRONTEND_DIR, 'node_modules', name, 'package.json');

    try {
      const pkgContent = fs.readFileSync(pkgPath, 'utf8');
      const pkgData = JSON.parse(pkgContent);

      // Check for ESM indicators
      const hasExports = pkgData.exports !== undefined;
      const hasModuleField = pkgData.module !== undefined;
      const typeModule = pkgData.type === 'module';

      if (hasExports || typeModule) {
        results.esm.push({ name, version, hasExports, typeModule });
        log(colors.green, `✅ ${name}@${version}`);
        log(colors.gray, `   exports: ${hasExports}, type: module: ${typeModule}`);
      } else if (hasModuleField) {
        results.esm.push({ name, version, hasModuleField });
        log(colors.green, `✅ ${name}@${version}`);
        log(colors.gray, `   module field: ${hasModuleField}`);
      } else {
        results.commonjs.push({ name, version });
        log(colors.yellow, `⚠️  ${name}@${version}`);
        log(colors.gray, '   CommonJS only (no ESM indicators)');
      }
    } catch (error) {
      results.unknown.push({ name, version, error: error.message });
      log(colors.red, `❌ ${name}@${version}`);
      log(colors.gray, `   Error: ${error.message}`);
    }
  });

  return results;
}

function checkRequireStatements() {
  log(colors.blue, '\n🔍 Require Statement Check:');
  log(colors.gray, '─'.repeat(50));

  const srcDir = path.join(FRONTEND_DIR, 'src');
  let requireCount = 0;
  let importCount = 0;
  let filesChecked = 0;

  function walkDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.match(/\.(js|jsx|ts|tsx)$/)) {
        filesChecked++;
        const content = fs.readFileSync(filePath, 'utf8');

        // Count require() statements
        const requires = content.match(/require\(/g) || [];
        requireCount += requires.length;

        // Count import statements
        const imports = content.match(/^import /gm) || [];
        importCount += imports.length;
      }
    });
  }

  try {
    walkDir(srcDir);

    log(colors.green, `✅ Files checked: ${filesChecked}`);
    log(colors.green, `✅ Import statements: ${importCount}`);
    if (requireCount > 0) {
      log(colors.yellow, `⚠️  Require statements: ${requireCount}`);
      log(colors.gray, '   These will need to be converted to ESM');
    } else {
      log(colors.green, `✅ Require statements: ${requireCount}`);
    }
  } catch (error) {
    log(colors.red, '❌ Error scanning source files:', error.message);
  }
}

function checkConfigFiles() {
  log(colors.blue, '\n⚙️  Config File Check:');
  log(colors.gray, '─'.repeat(50));

  const configFiles = [
    'tailwind.config.js',
    'vite.config.js',
    'postcss.config.js',
    'eslint.config.js',
  ];

  configFiles.forEach((file) => {
    const filePath = path.join(FRONTEND_DIR, file);

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const hasRequire = content.includes('require(');
      const hasModuleExports = content.includes('module.exports');
      const hasImport = content.includes('import ');
      const hasExport = content.includes('export ');

      if (hasRequire || hasModuleExports) {
        log(colors.yellow, `⚠️  ${file} (CommonJS)`);
        log(colors.gray, `   require: ${hasRequire}, module.exports: ${hasModuleExports}`);
      } else if (hasImport || hasExport) {
        log(colors.green, `✅ ${file} (ESM)`);
      } else {
        log(colors.gray, `○ ${file} (unclear)`);
      }
    } else {
      log(colors.gray, `○ ${file} (not found)`);
    }
  });
}

function generateReport(results) {
  log(colors.blue, '\n📊 Summary Report:');
  log(colors.gray, '─'.repeat(50));

  const total = results.esm.length + results.commonjs.length + results.unknown.length;

  log(colors.green, `✅ ESM Compatible: ${results.esm.length}/${total}`);
  log(colors.yellow, `⚠️  CommonJS Only: ${results.commonjs.length}/${total}`);
  log(colors.red, `❌ Unknown/Error: ${results.unknown.length}/${total}`);

  if (results.commonjs.length > 0) {
    log(colors.yellow, '\n⚠️  CommonJS Dependencies:');
    results.commonjs.forEach(({ name, version }) => {
      log(colors.gray, `   - ${name}@${version}`);
    });
    log(colors.yellow, '\n   These may need polyfills or replacements for ESM');
  }

  if (results.unknown.length > 0) {
    log(colors.red, '\n❌ Unknown Dependencies:');
    results.unknown.forEach(({ name, version, error }) => {
      log(colors.gray, `   - ${name}@${version}: ${error}`);
    });
  }
}

function main() {
  log(colors.blue, '🔍 ESM Dependency Audit');
  log(colors.gray, '─'.repeat(50));
  log(colors.gray, `Checking: ${FRONTEND_DIR}`);

  const packageJson = readPackageJson();

  checkModuleType(packageJson);
  const results = analyzeDependencies(packageJson);
  checkRequireStatements();
  checkConfigFiles();
  generateReport(results);

  log(colors.blue, '\n✅ Audit Complete');
  log(colors.gray, '─'.repeat(50));

  // Exit with warning if CommonJS deps found
  if (results.commonjs.length > 0) {
    process.exit(1);
  }
}

main();
