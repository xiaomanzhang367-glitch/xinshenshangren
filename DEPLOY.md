# 部署须知

## 线上地址

🔗 **正式 URL**：https://xinshenshangren.onrender.com

📱 **二维码图片**：见 `海报素材/` 文件夹
- `二维码-黑白.png`（识别率最高，推荐黑白印刷海报用）
- `二维码-棕红主题.png`（配色和游戏 UI 一致，电子海报用更好看）

> 两张二维码扫到的都是同一个 URL，**永远不用换**。

---

## 改完代码怎么自动更新？

只需要 3 行命令：

```bash
git add -A
git commit -m "改了什么写一句"
git push
```

推送后 **Render 会自动检测到 git push，重新构建并部署**，大约 2~3 分钟。
扫码用户**刷新浏览器**就能看到最新版。

---

## 部署状态查询

- **Render 控制台**：https://dashboard.render.com/
- **GitHub 仓库**：https://github.com/xiaomanzhang367-glitch/xinshenshangren

在 Render 控制台点项目 → **Events** 标签可以看每次构建的实时日志。

---

## 重要：免费档"冷启动"问题

Render 免费档 **15 分钟没人访问会休眠**，下次访问首屏需要等 **20~30 秒**唤醒。

### 演示前必做：
1. 演示前 **10 分钟自己用手机扫一次**，唤醒服务
2. 唤醒后 15 分钟内访问都很快

### 保活方案（可选）：
注册 https://uptimerobot.com/ 免费账号，添加监控：
- URL: `https://xinshenshangren.onrender.com`
- Interval: 5 minutes

这样它会每 5 分钟自动请求一次，服务永不休眠。

---

## 紧急情况

### 部署失败了？
1. 看 Render → Events → Build logs，找红字
2. 多半是 `npm install` 错了，本地跑 `npm install && npm run build` 复现
3. 修好再 `git push`

### 想改 URL 名字？
Render 控制台 → 项目 → Settings → Name 改名，新 URL 是 `新名字.onrender.com`，**改名后老二维码失效**，需要重新生成。

### 想用自己买的域名？
Render 控制台 → 项目 → Settings → Custom Domains，按提示加 CNAME 记录。

---

## 项目结构速查

```
xinshenshangren/
├── src/              ← 游戏源码
├── public/           ← 静态资源（图片等放这里）
├── 海报素材/         ← 二维码图片
├── DEPLOY.md         ← 你正在看的文档
├── GAMEGUIDE.md      ← 游戏攻略
├── package.json
└── vite.config.js
```
