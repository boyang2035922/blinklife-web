# 从域名申请到部署上线 — 完整操作指南

> 以 BlinkLife（blink-life.com）为实际案例整理，适用于 Next.js 项目 + Vercel + Cloudflare 技术栈。

---

## 目录

1. [申请域名](#一申请域名)
2. [配置 SSH 密钥](#二配置-ssh-密钥)
3. [推送代码到 GitHub](#三推送代码到-github)
4. [部署到 Vercel](#四部署到-vercel)
5. [绑定自定义域名](#五绑定自定义域名)
6. [配置 DNS（Cloudflare）](#六配置-dns-cloudflare)
7. [连接 GitHub 自动部署](#七连接-github-自动部署)
8. [验证上线](#八验证上线)
9. [日常更新流程](#九日常更新流程)

---

## 一、申请域名

### 推荐注册商

| 注册商 | 优点 | 适合场景 |
|--------|------|----------|
| **Cloudflare Registrar** | 成本价续费、自带 CDN + DNS | 首选，长期持有最划算 |
| **Namecheap** | 界面友好、价格透明 | 海外用户 |
| **阿里云（万网）** | 中文支持、ICP 备案一站式 | 服务器在国内 |

### 操作步骤（以 Cloudflare 为例）

1. 注册 [Cloudflare](https://dash.cloudflare.com) 账号
2. 左侧菜单 → **Domain Registration → Register Domains**
3. 搜索目标域名（如 `blink-life.com`），加入购物车
4. 填写联系信息，完成支付（支持信用卡 / PayPal）

### 域名后缀建议

- `.com` — 通用首选，信任度最高
- `.ai` — 科技 / AI 产品调性强
- `.cn` — 国内用户，需配合 ICP 备案

### 国内访问说明

| 服务器位置 | 是否需要 ICP 备案 |
|-----------|----------------|
| 中国大陆 | ✅ 必须备案（约 15–20 个工作日）|
| 香港 / 海外（Vercel）| ❌ 无需备案，可直接访问 |

---

## 二、配置 SSH 密钥

SSH 密钥用于本地与 GitHub 之间的免密认证。

### 检查是否已有密钥

```bash
ls ~/.ssh/id_*.pub
```

若输出文件路径（如 `~/.ssh/id_ed25519.pub`），说明已有密钥，跳到下一步。

### 生成新密钥（如无）

```bash
ssh-keygen -t ed25519 -C "your@email.com"
# 一路回车即可
```

### 复制公钥到剪贴板

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

### 添加到 GitHub

1. 打开 [https://github.com/settings/ssh/new](https://github.com/settings/ssh/new)
2. **Title**：填写设备名称，如 `MacBook Pro`
3. **Key type**：保持默认 `Authentication Key`
4. **Key**：粘贴（⌘V）刚才复制的内容
5. 点击 **Add SSH key**

### 验证连接

```bash
ssh -T git@github.com
# 成功提示：Hi username! You've successfully authenticated...
```

---

## 三、推送代码到 GitHub

### 在 GitHub 创建仓库

1. 打开 [https://github.com/new](https://github.com/new)
2. 填写仓库名（如 `blinklife-web`）
3. **不要**勾选 Initialize README
4. 点击 **Create repository**

### 关联远程仓库并推送

```bash
git remote add origin git@github.com:你的用户名/blinklife-web.git
git push -u origin main
```

### 验证

浏览器打开 `https://github.com/你的用户名/blinklife-web`，确认代码已上传。

---

## 四、部署到 Vercel

### 安装 Vercel CLI

```bash
npm install -g vercel
```

### 登录 Vercel

```bash
vercel login
```

终端会输出一个链接，在浏览器中打开并授权即可。

### 执行部署

```bash
# 在项目根目录执行
vercel --yes
```

Vercel 会自动识别 Next.js 框架并完成构建，部署完成后输出：

```
Production: https://your-project.vercel.app
```

---

## 五、绑定自定义域名

### 通过 CLI 添加域名

```bash
vercel domains add blink-life.com
```

成功后会提示需要配置的 DNS 记录，记录下以下信息：

```
A    @    76.76.21.21
```

---

## 六、配置 DNS（Cloudflare）

1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com)
2. 选择你的域名 → 左侧 **DNS → Records**
3. 点击 **Add record**，添加以下两条记录：

| Type | Name | Content | Proxy status |
|------|------|---------|--------------|
| A | `@` | `76.76.21.21` | 🔘 DNS only（灰色）|
| CNAME | `www` | `cname.vercel-dns.com` | 🔘 DNS only（灰色）|

> ⚠️ **重要**：Proxy 状态必须选**灰色云朵（DNS only）**，不能开启橙色代理，否则 Vercel 无法自动签发 HTTPS 证书。

4. 点击 **Save** 保存

DNS 通常几分钟内生效。

---

## 七、连接 GitHub 自动部署

完成此步骤后，每次 `git push` 将自动触发 Vercel 重新部署。

### 第一步：安装 Vercel GitHub App

打开：[https://github.com/apps/vercel/installations/new](https://github.com/apps/vercel/installations/new)

- 选择你的 GitHub 账号
- Repository access 选 **Only select repositories**
- 勾选对应仓库（如 `blinklife-web`）
- 点击 **Install**

### 第二步：在 Vercel 中连接仓库

1. 打开 Vercel 项目 → **Settings → Git**
2. 点击 **Connect Git Repository**
3. 选择 **GitHub** → 找到对应仓库 → 点击 **Connect**

### 验证连接

```bash
vercel git connect
# 成功提示：your-repo is already connected to your project.
```

---

## 八、验证上线

### 检查 HTTP 状态

```bash
# 检查主域名
curl -sI https://blink-life.com | head -3

# 检查 www 跳转
curl -sI https://www.blink-life.com | head -3

# 检查子页面
curl -sI https://blink-life.com/contact | head -3
```

**预期结果：**

| 地址 | 状态 |
|------|------|
| `https://blink-life.com` | `HTTP/2 200` ✅ |
| `https://www.blink-life.com` | `HTTP/2 307` → 跳转主域名 ✅ |
| `https://blink-life.com/contact` | `HTTP/2 200` ✅ |

---

## 九、日常更新流程

部署完成后，后续所有更新只需三步：

```bash
# 1. 暂存改动
git add 文件名

# 2. 提交
git commit -m "描述本次改动"

# 3. 推送（自动触发 Vercel 部署）
git push
```

Vercel 检测到 push 后自动构建，约 **1 分钟**内线上生效。

---

*文档整理于 2026-03-05*
