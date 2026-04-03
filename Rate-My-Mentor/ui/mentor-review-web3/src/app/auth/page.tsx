import type { Metadata } from "next";
import { AuthContent } from "./_components/AuthContent";

export const metadata: Metadata = {
  title: "登录",
};

export default function AuthPage() {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">身份验证</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        连接你的钱包以验证身份。支持 SIWE、OAuth 或 SBT 校验。
      </p>
      <div className="mt-8">
        <AuthContent />
      </div>
    </div>
  );
}
