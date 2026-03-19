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

export function TermsSection() {
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
            Terms of Service
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-8"
        >
          使用条款
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

        <Heading>一、协议总则</Heading>
        <Para>
          欢迎使用 BlinkLife！本《使用条款》（以下简称"本协议"）是您与石家庄灵眸光年科技有限公司（以下简称"我们"）之间就使用
          BlinkLife
          移动应用程序及相关服务（以下简称"本服务"）所订立的协议。请您在使用本服务前仔细阅读并充分理解本协议的全部内容。一旦您下载、安装或以其他方式使用本服务，即表示您已阅读、理解并同意接受本协议的约束。
        </Para>
        <Para>
          如果您不同意本协议的任何条款，请勿使用本服务。本协议适用于中华人民共和国法律。
        </Para>

        <Heading>二、使用须知</Heading>
        <Para>
          本应用无需注册账号即可使用。您的所有数据（包括视频、打点记录等）存储在您的设备本地，我们不会收集或上传您的个人数据。
        </Para>
        <List
          items={[
            "您可以直接下载安装并使用本应用的全部功能，无需提供手机号、邮箱等个人信息；",
            "您的视频和打点数据仅保存在本地设备中，卸载应用将清除所有数据；",
            "如需了解我们如何保护您的隐私，请参阅《隐私政策》。",
          ]}
        />

        <Heading>三、服务内容</Heading>
        <Para>BlinkLife 为您提供以下主要服务功能：</Para>
        <List
          items={[
            "运动视频录制：通过手机摄像头录制运动过程中的视频。",
            "蓝牙打点：通过连接蓝牙低功耗（BLE）外设（如智能指环、蓝牙按键等），在运动过程中实时标记高光时刻。",
            "智能剪辑：基于打点时间戳，自动截取视频片段并生成精彩集锦。",
            "视频编辑：提供基础的视频裁剪、片段管理和分享功能。",
            "外部视频打点剪辑：导入已有视频文件进行打点剪辑。",
          ]}
        />
        <Para>
          我们保留随时修改、暂停或终止部分或全部服务的权利，并将在合理时间内通知您。
        </Para>

        <Heading>四、用户行为规范</Heading>
        <Para>在使用本服务时，您承诺遵守以下行为规范：</Para>
        <List
          items={[
            "遵守中华人民共和国相关法律法规及本协议的规定；",
            "不得利用本服务制作、上传、传播任何违法违规、侵权、淫秽、暴力或其他不良信息；",
            "不得利用本服务侵犯他人的合法权益，包括但不限于隐私权、肖像权和知识产权；",
            "不得对本服务进行反向工程、反编译或反汇编；",
            "不得利用技术手段干扰本服务的正常运行，或未经授权访问我们的系统或数据；",
            "不得利用本服务从事任何可能损害我们或第三方利益的行为。",
          ]}
        />
        <Para>
          如果我们发现您违反上述行为规范，我们有权采取警告、限制功能等措施，并保留追究法律责任的权利。
        </Para>

        <Heading>五、知识产权</Heading>
        <List
          items={[
            "本应用的软件、界面设计、图标、文字、图片和其他内容的知识产权归我们所有，受中华人民共和国法律和国际知识产权条约保护。",
            "您使用本服务创作的视频内容的知识产权归您所有。",
            "未经我们书面许可，您不得复制、修改、分发或以其他方式使用本应用的任何内容或商标。",
          ]}
        />

        <Heading>六、免责条款</Heading>
        <List
          items={[
            "本服务按「现状」提供。我们不保证服务不会中断或完全没有错误，但会尽合理努力确保服务的稳定性和可用性。",
            "因不可抗力（包括但不限于自然灾害、政府行为、网络故障等）导致服务中断或数据丢失的，我们不承担责任。",
            "蓝牙连接的稳定性受到外部环境（如信号干扰、设备兼容性等）影响，我们不对蓝牙连接问题导致的打点缺失或延迟承担担保责任。",
            "您通过本服务录制的视频内容应遵守相关法律法规，因视频内容引发的法律责任由您自行承担。",
            "您使用第三方蓝牙外设与本应用配合使用时，因第三方设备质量问题导致的损失，由第三方设备提供商负责。",
          ]}
        />

        <Heading>七、服务变更与终止</Heading>
        <List
          items={[
            "我们有权根据业务发展需要，对本服务进行更新、升级或功能调整，并将以合理方式通知您。",
            "您可以随时停止使用本服务并卸载应用。",
            "如果您严重违反本协议的规定，我们有权立即终止向您提供服务，且无需事先通知。",
            "服务终止后，我们不再承担向您继续提供服务的义务，但法律法规另有规定的除外。",
          ]}
        />

        <Heading>八、隐私保护</Heading>
        <Para>
          我们重视您的隐私保护。关于个人信息的收集、使用和保护，请参阅我们的
          <a
            href="/privacy"
            className="text-brand-400 hover:underline mx-1"
          >
            《隐私政策》
          </a>
          。《隐私政策》是本协议不可分割的组成部分。
        </Para>

        <Heading>九、争议解决</Heading>
        <Para>
          本协议的签订、履行和解释均适用中华人民共和国法律（不包括冲突法规则）。因本协议引起的或与本协议有关的任何争议，双方应首先通过友好协商解决。协商不成的，任何一方均有权将争议提交至石家庄灵眸光年科技有限公司所在地有管辖权的人民法院诉讼解决。
        </Para>

        <Heading>十、其他</Heading>
        <List
          items={[
            "本协议的任何条款被认定为无效或不可执行的，不影响其余条款的效力。",
            "我们未行使或延迟行使本协议项下的任何权利，不构成对该权利的放弃。",
            "我们保留在法律允许的范围内修改本协议的权利。修改后的协议将在本页面发布并标注更新日期。您继续使用本服务即表示接受修改后的协议。",
          ]}
        />

        <Heading>十一、联系我们</Heading>
        <Para>
          如果您对本使用条款有任何疑问或建议，请通过以下方式与我们联系：
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
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
