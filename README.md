# BackFonts

字体分包项目，将完整的字体文件按 Unicode 范围拆分为多个子集，以 woff2 格式输出，实现按需加载，减小页面首屏资源体积。

## 目录结构

```
ttf/                     → 原始字体文件（.ttf / .otf / .woff2）
fonts/
├── BackFonts.css        → 合并后的 CSS（包含所有字体的 @font-face）
├── ysbzt/               → 峄山碑篆体
│   └── *.woff2
└── ...                  → 更多字体
build.js                 → 自动化构建脚本
```

- 文件夹名称对应字体名称：`ysbzt` = 峄山碑篆体（拼音首字母缩写）
- 每个 `.woff2` 文件对应一个 Unicode 子集，由 [cn-font-split](https://www.npmjs.com/package/cn-font-split) 生成

## 构建脚本

将原始字体放入 `ttf/` 目录，运行脚本自动分包：

```bash
# 增量构建（只处理新增字体，已存在的跳过）
npm run build

# 全量重建（清空后重新处理所有字体）
npm run rebuild
```

## 使用方式

在 HTML 中引入 `BackFonts.css`，浏览器会根据 `unicode-range` 自动按需加载对应的字体子集：

```html
<link rel="stylesheet" href="https://cdn.jsdmirror.com/gh/pv4mz8pxb6-blip/BackFonts@v1.0.3/fonts/BackFonts.css">
```

引入后在 CSS 中直接使用字体：

```css
body {
  font-family: '峄山碑篆体', sans-serif;
}
```

## 版本

| 版本 | 说明 |
|------|------|
| v1.0.3 | 新增构建脚本，目录结构调整 |
| v1.0.2 | 新增 BackFonts.css，字体路径改为相对路径 |
| v1.0.1 | 54 个 woff2 字体子集文件 |
| v1.0.0 | 初始版本 |
