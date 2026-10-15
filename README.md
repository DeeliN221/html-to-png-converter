# HTML to PNG Converter

一个基于 Next.js 的现代化网站应用，用于将 HTML 文件转换为高质量的 PNG 图片。

## 功能特点

- 📁 支持 HTML 文件上传和拖拽
- 🖼️ 高质量 PNG 图片输出
- ⚙️ 可自定义输出尺寸和质量
- 🎨 现代化的用户界面
- 📱 响应式设计，支持移动端
- 🌙 支持暗色主题
- ⚡ 快速转换，实时预览

## 技术栈

- **Next.js 15** - React 框架，使用 App Router
- **TypeScript** - 类型安全
- **Tailwind CSS** - 现代化样式
- **Puppeteer** - HTML 到 PNG 转换引擎
- **Lucide React** - 图标库
- **Formidable** - 文件上传处理

## 开始使用

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 使用方法

1. 打开应用程序
2. 拖拽或点击上传 HTML 文件
3. 可选：调整输出设置（尺寸、质量）
4. 点击"转换为PNG"按钮
5. 预览和下载生成的 PNG 图片

## 支持的功能

- **文件上传**: 支持拖拽和点击上传 HTML 文件
- **自定义设置**: 
  - 输出宽度（100-4000px）
  - 输出高度（100-4000px）  
  - 图片质量（10-100%）
- **实时预览**: 转换完成后即时预览结果
- **快速下载**: 一键下载生成的 PNG 图片

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
