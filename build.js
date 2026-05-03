import { fontSplit } from 'cn-font-split';
import { pinyin } from 'pinyin-pro';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = __dirname;
const TTF_DIR = path.join(ROOT, 'ttf');
const FONTS_DIR = path.join(ROOT, 'fonts');
const CSS_FILE = path.join(FONTS_DIR, 'BackFonts.css');

const FONT_EXTENSIONS = ['.ttf', '.otf', '.woff2'];

function isCleanMode() {
  return process.argv.includes('--clean');
}

function toDirName(fontName) {
  const py = pinyin(fontName, { pattern: 'first', toneType: 'none' });
  return py.replace(/\s+/g, '').toLowerCase();
}

function getFontFiles() {
  if (!fs.existsSync(TTF_DIR)) {
    console.log('ttf/ 目录不存在，已自动创建');
    fs.mkdirSync(TTF_DIR, { recursive: true });
    return [];
  }
  return fs.readdirSync(TTF_DIR)
    .filter(f => FONT_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .map(f => ({
      filePath: path.join(TTF_DIR, f),
      fontName: path.basename(f, path.extname(f)),
    }));
}

function cleanAll() {
  console.log('清空 fonts/ 和 BackFonts.css ...');
  if (fs.existsSync(FONTS_DIR)) {
    fs.rmSync(FONTS_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(FONTS_DIR, { recursive: true });
  fs.writeFileSync(CSS_FILE, '', 'utf-8');
  console.log('清空完成\n');
}

async function processFont(fontInfo) {
  const { filePath, fontName } = fontInfo;
  const dirName = toDirName(fontName);
  const outDir = path.join(FONTS_DIR, dirName);

  if (fs.existsSync(outDir) && fs.readdirSync(outDir).length > 0) {
    console.log(`跳过: ${fontName} → fonts/${dirName}/ (已存在)`);
    return { fontName, dirName, status: 'skipped' };
  }

  console.log(`处理: ${fontName} → fonts/${dirName}/`);
  fs.mkdirSync(outDir, { recursive: true });

  await fontSplit({
    input: filePath,
    outDir: outDir,
  });

  // 读取生成的 fontface.css 并追加到 fonts/BackFonts.css
  // CSS 在 fonts/ 下，与字体目录同级，路径为 ./dirName/xxx.woff2
  const generatedCss = path.join(outDir, 'fontface.css');
  if (fs.existsSync(generatedCss)) {
    let cssContent = fs.readFileSync(generatedCss, 'utf-8');
    // 替换 url 路径: ./xxx.woff2 → ./dirName/xxx.woff2
    cssContent = cssContent.replace(/url\("\.\//g, `url("./${dirName}/`);
    fs.appendFileSync(CSS_FILE, cssContent + '\n', 'utf-8');
    fs.unlinkSync(generatedCss);
  }

  // 删除 cn-font-split 生成的多余文件
  const extraFiles = ['index.html', 'report.json'];
  for (const f of extraFiles) {
    const fp = path.join(outDir, f);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  }

  console.log(`完成: ${fontName} → fonts/${dirName}/`);
  return { fontName, dirName, status: 'added' };
}

async function main() {
  const clean = isCleanMode();
  console.log(`模式: ${clean ? '全量重建 (--clean)' : '增量构建'}\n`);

  if (clean) {
    cleanAll();
  }

  // 确保目录和文件存在
  fs.mkdirSync(FONTS_DIR, { recursive: true });
  if (!fs.existsSync(CSS_FILE)) {
    fs.writeFileSync(CSS_FILE, '', 'utf-8');
  }

  const fonts = getFontFiles();
  if (fonts.length === 0) {
    console.log('ttf/ 目录下没有字体文件');
    return;
  }

  console.log(`发现 ${fonts.length} 个字体文件\n`);

  const results = [];
  for (const font of fonts) {
    const result = await processFont(font);
    results.push(result);
  }

  // 输出汇总
  const added = results.filter(r => r.status === 'added');
  const skipped = results.filter(r => r.status === 'skipped');
  console.log('\n--- 处理结果 ---');
  if (added.length) console.log(`新增: ${added.map(r => `${r.fontName} → fonts/${r.dirName}/`).join(', ')}`);
  if (skipped.length) console.log(`跳过: ${skipped.map(r => `${r.fontName} → fonts/${r.dirName}/`).join(', ')}`);
  console.log(`总计: ${results.length} 个字体, 新增 ${added.length}, 跳过 ${skipped.length}`);
}

main().catch(err => {
  console.error('构建失败:', err);
  process.exit(1);
});
