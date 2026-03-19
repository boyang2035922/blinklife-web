"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

/* ---------- reusable prose helpers ---------- */

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h3
      variants={fadeInUp}
      className="text-xl font-semibold text-white mt-12 mb-4"
    >
      {children}
    </motion.h3>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeInUp}
      className="text-gray-400 text-base leading-relaxed mb-4"
    >
      {children}
    </motion.p>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={fadeInUp}
      className="list-disc list-inside text-gray-400 text-base leading-relaxed mb-4 space-y-1 pl-2"
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </motion.ul>
  );
}

/* ---------- main section ---------- */

export function PrivacySection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-1 to-surface-0" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        className="relative max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Eyebrow */}
        <motion.div variants={fadeInUp} className="mb-6">
          <span className="text-brand-400 text-sm font-medium tracking-widest uppercase">
            Privacy Policy
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-8"
        >
          隐私政策
        </motion.h1>

        {/* Divider */}
        <motion.div
          variants={fadeInUp}
          className="w-12 h-px bg-white/10 mb-10"
        />

        {/* Meta */}
        <motion.p
          variants={fadeInUp}
          className="text-gray-600 text-sm mb-10"
        >
          更新日期：2026 年 3 月 10 日 &nbsp;|&nbsp; 生效日期：2026 年 3 月 10
          日
        </motion.p>

        {/* ---- Body ---- */}

        <Heading>一、引言</Heading>
        <Para>
          石家庄灵眸光年科技有限公司（以下简称"我们"）深知个人信息对您的重要性，我们将按照法律法规的规定，采取相应安全保护措施，尽力保护您的个人信息安全可控。本《隐私政策》适用于您通过
          BlinkLife
          移动应用程序（以下简称"本应用"）所访问的所有服务。请您在使用我们的服务前，仔细阅读并充分理解本政策全部内容。
        </Para>

        <Heading>二、我们收集的信息</Heading>
        <Para>
          为了向您提供服务，我们需要收集以下类型的信息。如果您不提供相关信息，可能无法享受我们提供的某些服务或功能。
        </Para>

        <motion.h4
          variants={fadeInUp}
          className="text-lg font-medium text-gray-200 mt-6 mb-3"
        >
          2.1 您主动提供的信息
        </motion.h4>
        <List
          items={[
            "反馈与沟通信息：您通过客服、邮件或其他渠道向我们提供的信息。",
          ]}
        />

        <motion.h4
          variants={fadeInUp}
          className="text-lg font-medium text-gray-200 mt-6 mb-3"
        >
          2.2 我们自动收集的信息
        </motion.h4>
        <List
          items={[
            "设备信息：设备型号、操作系统版本、唯一设备标识符、屏幕分辨率等。",
            "日志信息：应用使用记录、崩溃日志、访问时间和 IP 地址等。",
            "蓝牙设备信息：您连接的蓝牙外设（如智能指环、蓝牙按键等）的设备名称和标识符，用于建立和维持 BLE 连接。",
          ]}
        />

        <Heading>三、设备权限使用说明</Heading>
        <Para>
          为实现本应用的核心功能，我们需要申请以下设备权限。所有权限均在您首次使用相关功能时弹窗请求授权，您有权拒绝或随时在系统设置中关闭。
        </Para>

        {/* Permissions table */}
        <motion.div variants={fadeInUp} className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-gray-400 border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-left text-gray-300">
                <th className="py-3 pr-4 font-medium">权限</th>
                <th className="py-3 pr-4 font-medium">用途</th>
                <th className="py-3 font-medium">是否可关闭</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 pr-4 text-white/80">蓝牙 (BLE)</td>
                <td className="py-3 pr-4">
                  连接智能指环或蓝牙按键等外设，实现运动过程中的实时打点标记功能
                </td>
                <td className="py-3">是</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/80">相机</td>
                <td className="py-3 pr-4">
                  录制运动视频，是本应用的核心功能
                </td>
                <td className="py-3">是</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/80">麦克风</td>
                <td className="py-3 pr-4">
                  在视频录制时同步采集音频
                </td>
                <td className="py-3">是</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/80">相册/存储</td>
                <td className="py-3 pr-4">
                  读取已有视频进行编辑，以及保存剪辑后的视频到本地
                </td>
                <td className="py-3">是</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/80">网络访问</td>
                <td className="py-3 pr-4">
                  加载隐私政策和使用条款页面、应用更新检查
                </td>
                <td className="py-3">是</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <Heading>四、信息使用目的</Heading>
        <Para>我们收集的信息将用于以下目的：</Para>
        <List
          items={[
            "提供、维护和改进本应用的各项服务功能；",
            "建立蓝牙 BLE 连接，确保外设打点操作的精准同步；",
            "发送服务通知、安全提醒和系统消息；",
            "分析应用使用情况，改善用户体验；",
            "遵守适用的法律法规和监管要求。",
          ]}
        />

        <Heading>五、信息存储与安全</Heading>
        <Para>
          您的视频和打点数据存储在您的设备本地，我们不会将其上传至服务器。我们采用行业标准的安全技术和管理措施来保护您的信息。
        </Para>
        <Para>
          您可以随时通过应用内的删除功能清除数据，或通过卸载应用删除所有本地存储的数据。
        </Para>

        <Heading>六、信息共享与披露</Heading>
        <Para>
          我们不会将您的个人信息出售给任何第三方。仅在以下情况下，我们可能会共享您的信息：
        </Para>
        <List
          items={[
            "获得您的明确同意后；",
            "根据法律法规的规定、诉讼/仲裁需要，或行政、司法机关依法提出的要求；",
            "与关联公司共享，且受同等隐私保护标准约束；",
            "与授权合作伙伴共享：我们可能使用第三方 SDK（如统计分析、崩溃监控、推送服务等）来提供和优化服务，这些 SDK 可能会收集必要的设备和使用数据。我们会对合作方进行严格的安全评估。",
          ]}
        />

        <Heading>七、您的权利</Heading>
        <Para>
          根据中华人民共和国《个人信息保护法》及相关法律法规，您对您的个人信息享有以下权利：
        </Para>
        <List
          items={[
            "查看与访问：您可以在应用中查看您的录制记录和数据；",
            "更正与补充：当您发现个人信息有误时，您可以联系我们进行修改；",
            "删除数据：您可以在应用内删除录制记录和视频文件，或通过卸载应用删除所有本地数据；",
            "撤回同意：您可以随时在设备系统设置中关闭蓝牙、相机、麦克风和存储等权限授权；",
            "获取个人信息副本：您可以联系我们获取您的个人信息副本。",
          ]}
        />

        <Heading>八、未成年人保护</Heading>
        <Para>
          本应用主要面向成年用户。如果您是未满 14
          周岁的未成年人，请在您的监护人指导下阅读本政策，并在取得监护人同意后使用我们的服务。我们不会主动收集未成年人的个人信息。若我们发现在未经监护人同意的情况下收集了未成年人的个人信息，将尽快采取措施删除相关信息。
        </Para>

        <Heading>九、隐私政策更新</Heading>
        <Para>
          我们可能会不时更新本隐私政策。政策发生重大变更时，我们将通过应用内通知、弹窗提示或其他适当方式告知您。更新后的隐私政策将在本页面发布并标注更新日期。您在政策更新后继续使用本应用的服务，即表示您同意接受更新后的隐私政策。
        </Para>

        <Heading>十、联系我们</Heading>
        <Para>
          如果您对本隐私政策有任何疑问、意见或建议，或希望行使您的个人信息相关权利，请通过以下方式与我们联系：
        </Para>
        <motion.div
          variants={fadeInUp}
          className="bg-surface-2 rounded-xl p-6 mb-6 border border-white/5"
        >
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="text-white">石家庄灵眸光年科技有限公司</strong>
            <br />
            电子邮箱：
            <a
              href="mailto:hello@blink-life.com"
              className="text-brand-400 hover:underline"
            >
              hello@blink-life.com
            </a>
            <br />
            我们将在收到您的请求后 15 个工作日内予以回复。
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
