"use client";

import { useAccount, useDisconnect, useBalance } from "wagmi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Copy, LogOut } from "lucide-react";
import { useState } from "react";

export function AuthContent() {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected) {
    return (
      <Card className="space-y-6 border-border/80 p-6">
        <div className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              请在顶部连接你的钱包以开始身份验证。
            </p>
          </div>
          <div className="flex justify-center">
            <div className="[&_button]:h-10 [&_button]:rounded-lg [&_button]:border-border/80 [&_button]:text-base [&_button]:shadow-sm">
              <ConnectButton />
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t border-border/80 pt-4">
          <h3 className="text-sm font-semibold">支持的功能</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              SIWE（Sign In With Ethereum）签名验证
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              NFT/SBT 持有验证
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              链上身份验证
            </li>
          </ul>
        </div>
      </Card>
    );
  }

  return (
    <Card className="space-y-6 border-border/80 p-6">
      {/* 地址信息卡片 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">已连接的钱包</h3>
          <Badge variant="outline" className="border-border/80">
            连接中
          </Badge>
        </div>

        <div className="space-y-3 rounded-lg bg-muted/30 p-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">
              钱包地址
            </p>
            <div className="flex items-center justify-between gap-2">
              <code className="flex-1 truncate rounded bg-background/50 px-3 py-2 font-mono text-sm">
                {address}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={() => address && copyToClipboard(address)}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">复制地址</span>
              </Button>
            </div>
          </div>

          {balance && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                余额
              </p>
              <p className="text-sm">
                {balance.formatted} {balance.symbol}
              </p>
            </div>
          )}

          {chainId && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                网络链ID
              </p>
              <p className="text-sm font-mono">{chainId}</p>
            </div>
          )}
        </div>
      </div>

      {/* 验证选项 */}
      <div className="space-y-3 border-t border-border/80 pt-4">
        <h3 className="text-sm font-semibold">验证选项</h3>
        <div className="grid gap-3">
          <button className="relative rounded-lg border border-border/80 p-3 text-left text-sm transition-colors hover:bg-muted/50 active:bg-muted/70">
            <p className="font-medium">SIWE 签名验证</p>
            <p className="text-xs text-muted-foreground">
              通过钱包签名验证你的身份
            </p>
          </button>

          <button className="relative rounded-lg border border-border/80 p-3 text-left text-sm transition-colors hover:bg-muted/50 active:bg-muted/70">
            <p className="font-medium">SBT 身份验证</p>
            <p className="text-xs text-muted-foreground">
              验证你持有的 Soulbound Token
            </p>
          </button>

          <button className="relative rounded-lg border border-border/80 p-3 text-left text-sm transition-colors hover:bg-muted/50 active:bg-muted/70">
            <p className="font-medium">链上声誉查询</p>
            <p className="text-xs text-muted-foreground">
              查看你在平台上的声誉评分
            </p>
          </button>
        </div>
      </div>

      {/* 断开连接 */}
      <div className="border-t border-border/80 pt-4">
        <Button
          variant="outline"
          className="w-full border-border/80 text-destructive hover:bg-destructive/5 hover:text-destructive"
          onClick={() => disconnect()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          断开钱包连接
        </Button>
      </div>

      {/* 提示信息 */}
      <div className="rounded-lg bg-accent/5 p-3 text-xs text-muted-foreground">
        <p>
          你的钱包地址和交易信息将用于身份验证。我们不会访问或转移你的资产。
        </p>
      </div>
    </Card>
  );
}
