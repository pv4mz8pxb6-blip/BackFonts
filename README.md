# BackFonts

字体分包项目，将完整的字体文件按 Unicode 范围拆分为多个子集，以 woff2 格式输出，实现按需加载，减小页面首屏资源体积。

## 目录结构

```
fonts/
├── BackFonts.css        → 合并后的 CSS
├── ysbzt/               → 峄山碑篆体
│   └── *.woff2
└── ...
```

- 文件夹名称对应字体名称（拼音首字母缩写）
- 每个 `.woff2` 文件对应一个 Unicode 子集，由 [cn-font-split](https://www.npmjs.com/package/cn-font-split) 生成

## 使用方式

在 HTML 中引入 `BackFonts.css`，浏览器会根据 `unicode-range` 自动按需加载对应的字体子集：

```html
<link rel="stylesheet" href="https://cdn.jsdmirror.com/gh/pv4mz8pxb6-blip/BackFonts@v1.0.4/fonts/BackFonts.css">
```

引入后在 CSS 中直接使用字体：

```css
/* 峄山碑篆体 */
font-family: '峄山碑篆体', sans-serif;

```

## 版本

| 版本 | 说明 |
|------|------|
| v1.0.4 | 新增构建脚本，目录结构调整 |
| v1.0.3 | 重命名为 BackFonts.css |
| v1.0.2 | 字体路径改为相对路径 |
| v1.0.1 | 54 个 woff2 字体子集文件 |
| v1.0.0 | 初始版本 |
