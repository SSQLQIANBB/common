#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packagePath = path.join(__dirname, '..', 'package.json');

function updateVersion(type = 'patch') {
  try {
    // 读取package.json
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const currentVersion = packageJson.version;
    
    // 解析版本号
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    
    let newVersion;
    switch (type) {
      case 'major':
        newVersion = `${major + 1}.0.0`;
        break;
      case 'minor':
        newVersion = `${major}.${minor + 1}.0`;
        break;
      case 'patch':
      default:
        newVersion = `${major}.${minor}.${patch + 1}`;
        break;
    }
    
    // 更新版本号
    packageJson.version = newVersion;
    
    // 写回文件
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
    
    console.log(`✅ 版本已更新: ${currentVersion} → ${newVersion}`);
    return newVersion;
    
  } catch (error) {
    console.error('❌ 更新版本失败:', error.message);
    process.exit(1);
  }
}

// 获取命令行参数
const type = process.argv[2] || 'patch';

if (!['major', 'minor', 'patch'].includes(type)) {
  console.error('❌ 无效的版本类型，请使用: major, minor, 或 patch');
  process.exit(1);
}

updateVersion(type); 