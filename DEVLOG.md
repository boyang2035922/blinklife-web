# BlinkLife Web — 开发日志

> 记录从本地开发到线上部署的完整过程
> 域名：[blink-life.com](https://blink-life.com)
> 仓库：[github.com/boyang2035922/blinklife-web](https://github.com/boyang2035922/blinklife-web)

---

## 目录

1. [项目结构](#项目结构)
2. [页面开发记录](#页面开发记录)
3. [Git 提交记录](#git-提交记录)
4. [域名与部署](#域名与部署)
5. [自动部署配置](#自动部署配置)
6. [后续待办](#后续待办)

---

## 项目结构

```
blinklife-web/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 首页
│   │   ├── contact/
│   │   │   └── page.tsx          # 联系我们 / 关于灵眸页
│   │   ├── layout.tsx            # 全局布局 & SEO metadata
│   │   └── globals.css           # 全局样式 / 设计 token
│   ├── components/
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx   # 首屏 Hero 区
│   │   │   ├── HeroParticles.tsx # 粒子背景
│   │   │   └── LatencyCounter.tsx# BLE 延迟计数器（已从首页移除）
│   │   ├── sections/
│   │   │   ├── PainSolutionSection.tsx  # 痛点与解决方案
│   │   │   ├── FeatureTriptych.tsx      # 功能三联屏
│   │   │   ├── AboutSection.tsx         # 关于灵眸光年
│   │   │   └── CTASection.tsx           # 行动召唤 / 定价
│   │   ├── simulator/
│   │   │   └── DotSimulator.tsx  # 打点模拟器（已从首页移除）
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # 顶部导航
│   │   │   └── Footer.tsx        # 页脚（含合规信息）
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   └── SectionHeading.tsx
│   │   └── motion/
│   │       ├── FadeInView.tsx
│   │       └── StaggerGroup.tsx
│   └── lib/
│       ├── animations.ts         # Framer Motion 动画配置
│       └── store.ts              # Zustand 状态管理
├── public/
│   └── images/
│       └── logo.jpg
└── DEVLOG.md                     # 本文档
```

**技术栈：**

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS v4 |
| 动画 | Framer Motion |
| 状态 | Zustand |
| 部署 | Vercel |
| 域名 | Cloudflare DNS + blink-life.com |

---

## 页面开发记录

### 1. 移除打点模拟器页面

**问题：** 首页包含「交互体验·亲手感受毫秒级打点」区块（`DotSimulator`），决定移除。

**操作：** 从 `page.tsx` 中删除 `<DotSimulator />` 组件及其 import。

---

### 2. Hero 区重构（Apple 官网风格）

**问题：** 原 Hero 区层次混乱，品牌 chip 内塞了 slogan，`6ms` 数字字号过大且未居中。

**优化方向：** 参考 Apple 官网设计语言——品牌名克制、主标题极大极粗、副标题轻灰、层次分明。

**改动：**

- **主标题** 改为「记录生活中的 / 每个精彩瞬间」，使用 `clamp(3rem, 10vw, 7rem)` 流式字号，随视口自适应
- **副标题** 改为 `white/50 + font-light`，轻盈衬托主标题
- **移除** 品牌 chip（Logo + BlinkLife 徽章）
- **移除** `LatencyCounter`（`6ms BLE 端到端延迟` 组件）
- 容器从 `max-w-4xl` 扩大至 `max-w-5xl`，给大字留出舒展空间

**最终 Hero 结构：**
```
主标题（超大）
副标题（轻灰）
CTA 按钮组（App Store / Google Play）
滚动指示器
```

---

### 3. Navbar 导航更新

**改动：**
- 移除失效的「模拟器」入口
- 新增「联系我们」→ `/contact`

**当前导航链接：**

```ts
const navLinks = [
  { label: "功能",    href: "#features" },
  { label: "定价",    href: "#pricing"  },
  { label: "联系我们", href: "/contact" },
];
```

---

### 4. 关于灵眸 / 联系我们页（`/contact`）

**新建独立二级页面**，不在首页展示。

**内容：**
- Eyebrow 标签：`关于灵眸`
- Mission Statement：
  > 灵眸光年致力于通过 **AI 视觉技术**，重构人类捕捉与记录运动瞬间的方式。
- 三列信息网格：公司全称 / 成立年份 / 联系邮箱

**路由：** `src/app/contact/page.tsx`（含独立 SEO metadata）

---

### 5. Legal Footer（合规页脚）

**新增底部合规栏：**

```
© 2026 石家庄灵眸光年科技有限公司. All rights reserved.
冀ICP备XXXXXXXX号   ← 待备案通过后替换
```

> **ICP 备案说明：** 若服务器部署在中国大陆，需通过阿里云/腾讯云提交备案，约 15–20 个工作日审核。目前服务器在 Vercel（海外），暂无强制要求，但提前占位备用。

---

## Git 提交记录

| Commit | 说明 |
|--------|------|
| `eb115bb` | Initial commit from Create Next App |
| `c8951a2` | feat: 构建 BlinkLife 落地页并移除打点模拟器页面 |
| `508b71a` | refine: 重构 Hero 区 slogan 设计，对齐 Apple 官网风格 |
| `be26191` | feat: 新增「关于灵眸」页面与合规页脚 |

---

## 域名与部署

### 域名信息

| 项目 | 内容 |
|------|------|
| 域名 | `blink-life.com` |
| 注册商 | Cloudflare Registrar |
| DNS 服务商 | Cloudflare |

### DNS 配置（Cloudflare）

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | `@` | `76.76.21.21` | DNS only（灰色）|
| CNAME | `www` | `cname.vercel-dns.com` | DNS only（灰色）|

> ⚠️ Proxy 状态必须为**灰色云朵（DNS only）**，开启橙色代理会导致 Vercel 无法签发 HTTPS 证书。

### 线上地址验证

| 地址 | 状态 |
|------|------|
| `https://blink-life.com` | ✅ 200 OK |
| `https://www.blink-life.com` | ✅ 307 → 自动跳转主域名 |
| `https://blink-life.com/contact` | ✅ 200 OK |

### SSH 密钥配置

本机 SSH 公钥已添加至 GitHub（`~/.ssh/id_ed25519.pub`），用于 `git push` 免密认证。

---

## 自动部署配置

### 部署流程

```
git push → GitHub → Vercel 自动检测 → 构建 → 发布到 blink-life.com
```

### 配置步骤（已完成）

1. 安装 Vercel GitHub App：[github.com/apps/vercel](https://github.com/apps/vercel/installations/new)，授权 `blinklife-web` 仓库
2. 在 Vercel 项目 Settings → Git 中连接 `boyang2035922/blinklife-web`

### Vercel 项目信息

| 项目 | 内容 |
|------|------|
| 项目名 | `blinklife-web` |
| 生产域名 | `blink-life.com` |
| 备用域名 | `blinklife-web.vercel.app` |
| 框架 | Next.js（自动识别）|
| 构建命令 | `npm run build`（默认）|
| 部署区域 | Washington D.C. (iad1) |

---

## 后续待办

- [ ] 申请 ICP 备案，替换 Footer 中的 `冀ICP备XXXXXXXX号`
- [ ] 上线 App Store / Google Play 后补充真实下载链接
- [ ] 完善隐私政策、使用条款页面
- [ ] `hello@blinklife.ai` 邮箱开通与配置
- [ ] Pro 订阅功能上线后更新定价模块
- [ ] 考虑注册 `blinklife.ai` 域名

---

*文档生成于 2026-03-05*
