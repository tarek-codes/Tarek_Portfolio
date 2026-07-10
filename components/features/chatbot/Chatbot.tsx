"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import CodeBlock from "@/components/features/chatbot/CodeBlock";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCopy } from "@/lib/i18n/translations";

const readLanguage = (className?: string) => {
  const match = /language-([a-z0-9-]+)/i.exec(className ?? "");
  return match?.[1];
};

const getTextFromNode = (value: ReactNode): string => {
  return Children.toArray(value)
    .map((node) => {
      if (typeof node === "string") {
        return node;
      }

      if (typeof node === "number") {
        return String(node);
      }

      return "";
    })
    .join("");
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const { locale } = useLanguage();
  const copy = getCopy(locale);

  const ease = [0.22, 1, 0.36, 1] as const;
  const springTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 22,
  };

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming";

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage({ text: input }, { body: { locale } });
      setInput("");
    }
  };

  return (
    <>
      {/* Floating Button — clears mobile bottom nav */}
      <motion.div
        className="fixed bottom-24 right-4 z-40 lg:bottom-7 lg:right-6"
        initial={
          reducedMotion ? { opacity: 0 } : { scale: 0.88, opacity: 0, y: 10 }
        }
        animate={
          reducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }
        }
        transition={
          reducedMotion
            ? { duration: 0.2, ease }
            : { ...springTransition, delay: 0.9 }
        }
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={() => setIsOpen(true)}
              className="group relative rounded-full border border-ctp-surface0/60 bg-ctp-base/60 p-3 text-ctp-maroon shadow-lg shadow-ctp-crust/25 backdrop-blur-xl transition-colors hover:border-ctp-surface1 hover:bg-ctp-base/75"
              exit={{ scale: 0, opacity: 0 }}
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.05 }}
              whileTap={reducedMotion ? { scale: 1 } : { scale: 0.94 }}
              transition={springTransition}
              aria-label={copy.chatbot.open}
            >
              <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-ctp-red rounded-full" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-ctp-crust/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed bottom-24 right-4 z-50 w-[90vw] max-w-md lg:bottom-7 lg:right-6"
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95, y: 18 }
              }
              animate={
                reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
              }
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.97, y: 14 }
              }
              transition={{ duration: 0.28, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-112 max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-ctp-surface0/60 bg-ctp-base/80 shadow-2xl shadow-ctp-crust/35 backdrop-blur-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-3.5 border-b border-ctp-surface0/60">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-ctp-maroon/10 rounded-lg">
                      <Bot className="w-4 h-4 text-ctp-maroon" />
                    </div>
                    <div>
                      <h3 className="text-sm font-display font-semibold text-ctp-text">
                        {copy.chatbot.title}
                      </h3>
                      <p className="text-[11px] text-ctp-overlay0">
                        {copy.chatbot.subtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-ctp-surface0/60 rounded-lg transition-colors"
                    aria-label={copy.chatbot.close}
                  >
                    <X className="w-4 h-4 text-ctp-overlay0" />
                  </button>
                </div>

                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-3 space-y-3"
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {messages.length === 0 && (
                    <div className="text-center mt-10">
                      <Bot className="w-10 h-10 mx-auto mb-2 text-ctp-maroon/60" />
                      <p className="text-sm text-ctp-text font-medium mb-1">
                        {copy.chatbot.introTitle}
                      </p>
                      <p className="text-xs text-ctp-overlay0 max-w-xs mx-auto">
                        {copy.chatbot.introSubtitle}
                      </p>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="shrink-0 w-6 h-6 bg-ctp-maroon/10 rounded-full flex items-center justify-center mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-ctp-maroon" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                          message.role === "user"
                            ? "bg-ctp-maroon text-ctp-crust rounded-br-sm"
                            : "bg-ctp-surface0/50 text-ctp-text rounded-bl-sm"
                        }`}
                      >
                        {message.parts.map((part, index) => {
                          if (part.type === "text") {
                            return (
                              <div
                                key={index}
                                className="space-y-1.5 wrap-break-word [&_a]:text-ctp-red [&_a]:underline-offset-2 hover:[&_a]:underline [&_li]:ml-4 [&_li]:list-disc [&_ol]:ml-4 [&_ol]:list-decimal"
                              >
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    pre({ children }) {
                                      return <>{children}</>;
                                    },
                                    code({ className, children }) {
                                      const codeText = getTextFromNode(
                                        children,
                                      ).replace(/\n$/, "");
                                      const language = readLanguage(className);
                                      const isBlock =
                                        Boolean(language) ||
                                        codeText.includes("\n");

                                      if (isBlock) {
                                        return (
                                          <CodeBlock
                                            code={codeText}
                                            language={language}
                                          />
                                        );
                                      }

                                      return (
                                        <code className="rounded bg-ctp-crust/40 px-1 py-0.5 font-mono text-xs text-ctp-text">
                                          {children}
                                        </code>
                                      );
                                    },
                                  }}
                                >
                                  {part.text}
                                </ReactMarkdown>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                      {message.role === "user" && (
                        <div className="shrink-0 w-6 h-6 bg-ctp-surface0/50 rounded-full flex items-center justify-center mt-0.5">
                          <User className="w-3.5 h-3.5 text-ctp-text" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2">
                      <div className="shrink-0 w-6 h-6 bg-ctp-maroon/10 rounded-full flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-ctp-maroon" />
                      </div>
                      <div className="bg-ctp-surface0/50 px-3 py-2 rounded-xl rounded-bl-sm flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 bg-ctp-maroon rounded-full"
                            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form
                  onSubmit={handleFormSubmit}
                  className="p-3 border-t border-ctp-surface0/60"
                >
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={copy.chatbot.placeholder}
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 bg-ctp-surface0/30 border border-ctp-surface0/60 rounded-lg text-ctp-text placeholder-ctp-overlay0 focus:outline-none focus:ring-2 focus:ring-ctp-maroon/50 focus:border-ctp-maroon transition-all text-sm disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input?.trim()}
                      className="shrink-0 p-2 bg-ctp-maroon hover:bg-ctp-pink text-ctp-crust rounded-lg transition-colors disabled:opacity-50"
                      aria-label={copy.chatbot.sendMessageAria}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
