# BackFonts

字体分包项目，将完整的字体文件按 Unicode 范围拆分为多个子集，以 woff2 格式输出，实现按需加载，减小页面首屏资源体积。

## 目录结构

```
ysbzt/
├── 00eeed094908e64186017717990a44bc.woff2
├── 08caf0773167ae075ea715d9efeabf4a.woff2
├── ...
└── ff9000be33e77c9cf4e1974840490264.woff2
```

- `ysbzt/`：字体分包输出目录，每个 `.woff2` 文件对应一个 Unicode 子集

## 使用方式

### 方式一：直接引用 fontface.css（推荐）

将 `fontface.css` 引入项目，字体文件使用相对路径 `./ysbzt/`，自动按需加载：

```html
<link rel="stylesheet" href="https://cdn.jsdmirror.com/gh/pv4mz8pxb6-blip/BackFonts@v1.0.2/fontface.css">
```

> 注意：`fontface.css` 和 `ysbzt/` 目录需在同一层级，或根据实际目录结构调整路径。

### 方式二：单独引用字体文件

```css
/* 官方源 */
https://cdn.jsdelivr.net/gh/pv4mz8pxb6-blip/BackFonts@v1.0.2/ysbzt/文件名.woff2

/* 国内镜像（推荐） */
https://cdn.jsdmirror.com/gh/pv4mz8pxb6-blip/BackFonts@v1.0.2/ysbzt/文件名.woff2
```

使用示例：

```css
@font-face {
  font-family: '峄山碑篆体';
  src: url('https://cdn.jsdmirror.com/gh/pv4mz8pxb6-blip/BackFonts@v1.0.2/ysbzt/00eeed094908e64186017717990a44bc.woff2') format('woff2');
  unicode-range: U+0,U+2032-2033,U+3003;
}
```

## 版本

| 版本 | 说明 |
|------|------|
| v1.0.2 | 新增 fontface.css，字体路径改为相对路径 |
| v1.0.1 | 54 个 woff2 字体子集文件 |
| v1.0.0 | 初始版本 |
