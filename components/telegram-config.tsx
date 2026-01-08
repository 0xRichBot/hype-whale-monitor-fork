"use client";

import { useState, useEffect } from "react";
import { Send, Settings, Info, Check, Copy, ExternalLink, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function TelegramConfig() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("tg_bot_token");
    const savedChatId = localStorage.getItem("tg_chat_id");
    if (savedToken) setToken(savedToken);
    if (savedChatId) setChatId(savedChatId);
  }, []);

  const saveConfig = () => {
    localStorage.setItem("tg_bot_token", token);
    localStorage.setItem("tg_chat_id", chatId);
    toast.success("Telegram configuration saved");
    setIsOpen(false);
    // Reload to propagate changes or use a context/event emitter
    window.dispatchEvent(new Event("tg-config-updated"));
  };

  const testConnection = async () => {
    if (!token || !chatId) {
      toast.error("Please provide both token and chat ID");
      return;
    }

    setTestLoading(true);
    try {
      const msg = "🔔 HYPE Monitor: Test connection successful!";
      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.ok) {
        toast.success("Test message sent!");
      } else {
        throw new Error(data.description || "Failed to send message");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Test failed");
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-primary/20 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Telegram Bot</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Send className="w-5 h-5" />
            </div>
            <DialogTitle className="text-xl">Telegram Bot Alert</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              Bot Token
              <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-0.5">
                @BotFather <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <Input
              type="password"
              placeholder="123456:ABC-DEF1234ghIkl-zyx57..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="bg-muted/30 border-border/50 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              Chat ID
              <a href="https://t.me/userinfobot" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-0.5">
                @userinfobot <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <Input
              placeholder="e.g. 123456789"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              className="bg-muted/30 border-border/50 focus:ring-primary/20"
            />
          </div>

          <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary/80 flex items-center gap-1.5">
              <Info className="w-3 h-3" /> Setup Instructions
            </h3>
            <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal ml-4">
              <li>Create a bot with <b>@BotFather</b> and copy the token.</li>
              <li>Find your Chat ID via <b>@userinfobot</b> or similar.</li>
              <li>Paste them here and click <b>Test</b> to verify.</li>
              <li>Save the config to start receiving alerts.</li>
            </ol>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={testConnection}
              disabled={testLoading}
              className="flex-1 gap-2"
            >
              {testLoading ? (
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              ) : (
                <Settings className="w-4 h-4" />
              )}
              Test
            </Button>
            <Button onClick={saveConfig} className="flex-1 gap-2">
              <Check className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
