# Cloudflare Pages 一键最稳发布

## 1) 准备项目

确保项目根目录包含以下文件：

- `Chat with 16 MBTI.html`
- `index.html`
- `functions/api/deepseek-chat.js`

前端已配置同域接口地址：`/api/deepseek-chat`。

## 2) 在 Cloudflare Pages 创建项目

1. 登录 Cloudflare Dashboard。
2. 进入 `Workers & Pages`。
3. 点击 `Create application` -> `Pages` -> `Upload assets`。
4. 直接上传当前项目根目录（整包上传，不要只传单个 html）。

## 3) 配置环境变量（必须）

1. 打开该 Pages 项目 -> `Settings` -> `Environment variables`。
2. 新增：
   - Key: `DEEPSEEK_API_KEY`
   - Value: 你的 DeepSeek Key（`sk-...`）
3. 保存后执行 `Retry deployment`（或重新部署）。

## 4) 验收

部署完成后验证：

1. 首页可打开：`https://<your-pages-domain>/`
2. API 路由存在：`https://<your-pages-domain>/api/deepseek-chat`
   - 浏览器直接 GET 通常返回 `405`，这是正常的（说明函数路由已生效）。
3. 页面里发消息可返回 AI 回复。

## 5) 自定义域名（推荐）

在 Pages 项目 `Custom domains` 里绑定你自己的域名，可提升稳定性与可控性。

## 6) 安全提醒

- 不要再把 `sk-...` 写到前端 HTML/JS。
- 如果密钥曾经泄露，请先在 DeepSeek 后台重置。
