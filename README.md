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

## CDN 引用

通过 jsDelivr 加速引用字体文件：

```css
/* 官方源 */
https://cdn.jsdelivr.net/gh/pv4mz8pxb6-blip/BackFonts@v1.0.1/ysbzt/文件名.woff2

/* 国内镜像（推荐） */
https://cdn.jsdmirror.com/gh/pv4mz8pxb6-blip/BackFonts@v1.0.1/ysbzt/文件名.woff2
```

使用示例：

```css
@font-face {
  font-family: 'MyFont';
  src: url('https://cdn.jsdmirror.com/gh/pv4mz8pxb6-blip/BackFonts@v1.0.1/ysbzt/00eeed094908e64186017717990a44bc.woff2') format('woff2');
  unicode-range: U+XXXX-XXXX;
}
```

## 版本

| 版本 | 说明 |
|------|------|
| v1.0.1 | 当前版本，54 个 woff2 字体子集文件 |
| v1.0.0 | 初始版本 |
