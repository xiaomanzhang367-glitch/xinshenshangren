import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(fullPath) : [fullPath];
  }));
  return nested.flat();
};

const errors = [];
const sourceFiles = await collectFiles('src');
const sourceText = await Promise.all(sourceFiles.map(async (file) => ({
  file,
  text: await readFile(file, 'utf8')
})));

const forbiddenSource = [
  { pattern: /<input\b/i, message: '发现自由文本输入控件' },
  { pattern: /localStorage|sessionStorage/i, message: '发现浏览器持久化存储' },
  { pattern: /navigator\.share|html2canvas/i, message: '发现站外分享或海报导出依赖' },
  { pattern: /dangerouslySetInnerHTML/i, message: '发现不安全的 HTML 注入' }
];

for (const { file, text } of sourceText) {
  for (const { pattern, message } of forbiddenSource) {
    if (pattern.test(text)) errors.push(`${file}: ${message}`);
  }
}

const index = await readFile('dist/index.html', 'utf8');
if (/(?:src|href)=["']\/assets\//.test(index)) {
  errors.push('dist/index.html: 发现绝对 /assets 路径');
}
if (!/(?:src|href)=["']\.\/assets\//.test(index)) {
  errors.push('dist/index.html: 未发现相对 ./assets 资源路径');
}
if (/(?:src|href)=["']https?:\/\//i.test(index)) {
  errors.push('dist/index.html: 发现外部资源引用');
}

const distFiles = await collectFiles('dist');
const stats = await Promise.all(distFiles.map((file) => stat(file)));
const totalBytes = stats.reduce((sum, entry) => sum + entry.size, 0);
const maxBytes = 8 * 1024 * 1024;
if (totalBytes > maxBytes) {
  errors.push(`dist: 体积 ${totalBytes} bytes 超过 8 MiB 发布阈值`);
}

if (errors.length) {
  console.error('互动空间发布校验失败:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('互动空间发布校验通过');
console.log(`- 文件数: ${distFiles.length}`);
console.log(`- 体积: ${(totalBytes / 1024).toFixed(1)} KiB`);
console.log(`- 入口: ${relative(process.cwd(), 'dist/index.html')}`);
