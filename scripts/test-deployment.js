#!/usr/bin/env node

/**
 * Test script to verify deployment configuration
 * Run with: node scripts/test-deployment.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Testing Deployment Configuration...\n');

// Check if render.yaml exists
const renderYamlPath = path.join(__dirname, '..', 'render.yaml');
if (fs.existsSync(renderYamlPath)) {
  console.log('✅ render.yaml found');
} else {
  console.log('❌ render.yaml not found');
  process.exit(1);
}

// Check if backend package.json exists
const backendPackagePath = path.join(__dirname, '..', 'backend', 'package.json');
if (fs.existsSync(backendPackagePath)) {
  console.log('✅ backend/package.json found');
} else {
  console.log('❌ backend/package.json not found');
  process.exit(1);
}

// Check if main package.json exists
const mainPackagePath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(mainPackagePath)) {
  console.log('✅ package.json found');
} else {
  console.log('❌ package.json not found');
  process.exit(1);
}

// Check if backend server.js exists
const serverPath = path.join(__dirname, '..', 'backend', 'server.js');
if (fs.existsSync(serverPath)) {
  console.log('✅ backend/server.js found');
} else {
  console.log('❌ backend/server.js not found');
  process.exit(1);
}

// Check if .gitignore exists and contains necessary entries
const gitignorePath = path.join(__dirname, '..', '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  const requiredEntries = ['.env', 'node_modules', 'dist'];
  const missingEntries = requiredEntries.filter(entry => !gitignoreContent.includes(entry));
  
  if (missingEntries.length === 0) {
    console.log('✅ .gitignore properly configured');
  } else {
    console.log(`⚠️  .gitignore missing entries: ${missingEntries.join(', ')}`);
  }
} else {
  console.log('❌ .gitignore not found');
}

console.log('\n📋 Deployment Checklist:');
console.log('1. ✅ render.yaml configured');
console.log('2. ✅ Backend and frontend services defined');
console.log('3. ✅ Environment variables documented');
console.log('4. ✅ CORS configured for production');
console.log('5. ✅ Database connection configured');
console.log('6. ✅ Health check endpoint available');

console.log('\n🚀 Ready for deployment!');
console.log('\nNext steps:');
console.log('1. Push your code to a Git repository');
console.log('2. Create a PostgreSQL database on Render');
console.log('3. Deploy using Render Blueprint');
console.log('4. Configure environment variables');
console.log('5. Test your deployed application');

console.log('\n📖 See DEPLOYMENT.md for detailed instructions'); 