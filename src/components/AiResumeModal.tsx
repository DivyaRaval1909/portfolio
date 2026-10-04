import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { GEMINI_SYSTEM_INSTRUCTION, getLocalFallbackResponse } from '../data/resumeKnowledge';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  '⚡ What are Divya\'s top technical skills?',
  '🤖 Tell me about HackForge-AI',
  '🚆 How does RailYatra prevent double booking?',
  '💼 Tell me about Divya\'s internship at Marga Technologies',
  '🎓 What is Divya\'s educational background?',
  '📬 How can I contact Divya?'
];

interface AiResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiResumeModal({ isOpen, onClose }: AiResumeModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "👋 Hi! I'm **Puppet**, Divya's AI resume assistant.\n\nAsk me anything about Divya's **projects**, **technical skills**, **work experience at Marga Technologies**, **academics**, or **contact info**!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'assistant',
        text: "Terminal reset. 🧹 What would you like to know about Divya?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const callGeminiApi = async (userPrompt: string, history: Message[]) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

    if (!apiKey) {
      // Offline / fallback knowledge base
      return getLocalFallbackResponse(userPrompt);
    }

    try {
      const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (history.length > 1) {
        const recentHistory = history.slice(-6);
        recentHistory.forEach((m) => {
          formattedContents.push({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          });
        });
      }
      formattedContents.push({
        role: 'user',
        parts: [{ text: userPrompt }]
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }]
            },
            contents: formattedContents,
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 1000
            }
          })
        }
      );

      if (!response.ok) {
        return getLocalFallbackResponse(userPrompt);
      }

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        getLocalFallbackResponse(userPrompt)
      );
    } catch {
      return getLocalFallbackResponse(userPrompt);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const replyText = await callGeminiApi(query, messages);
      const botMsg: Message = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: getLocalFallbackResponse(query),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format basic markdown (bold, bullets, links, code)
  const formatMarkdown = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Header 3 ###
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-text-base font-semibold text-sm mt-3 mb-1 text-accent flex items-center gap-1.5">
            {line.replace('### ', '')}
          </h4>
        );
      }
      // Header 2 ##
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-text-base font-bold text-base mt-3 mb-1.5 text-accent">
            {line.replace('## ', '')}
          </h3>
        );
      }
      // Bullet list item
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemContent = line.trim().substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm text-text-muted my-1 leading-relaxed">
            {parseInlineStyles(itemContent)}
          </li>
        );
      }
      // Numbered list item
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <li key={idx} className="ml-4 list-decimal text-xs sm:text-sm text-text-muted my-1 leading-relaxed">
            {parseInlineStyles(line.trim().replace(/^\d+\.\s/, ''))}
          </li>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="text-xs sm:text-sm text-text-muted leading-relaxed my-1">
          {parseInlineStyles(line)}
        </p>
      );
    });
  };

  // Helper to parse `code`, **bold**, *italic*, [links](url)
  const parseInlineStyles = (text: string) => {
    const parts = [];
    const regex = /(`[^`]+`|\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\))/g;
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        parts.push(text.substring(lastIdx, match.index));
      }
      const fullMatch = match[0];

      if (fullMatch.startsWith('`') && fullMatch.endsWith('`')) {
        parts.push(
          <code key={match.index} className="mono bg-bg-base/80 text-accent border border-border-inner px-1 py-0.5 rounded text-[11px] font-semibold">
            {fullMatch.slice(1, -1)}
          </code>
        );
      } else if (fullMatch.startsWith('**') && fullMatch.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="font-semibold text-text-base">
            {fullMatch.slice(2, -2)}
          </strong>
        );
      } else if (fullMatch.startsWith('*') && fullMatch.endsWith('*')) {
        parts.push(
          <em key={match.index} className="italic text-text-light">
            {fullMatch.slice(1, -1)}
          </em>
        );
      } else if (match[4] && match[5]) {
        parts.push(
          <a
            key={match.index}
            href={match[5]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:opacity-80 inline-flex items-center gap-0.5 font-medium"
          >
            {match[4]}
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        );
      }
      lastIdx = regex.lastIndex;
    }

    if (lastIdx < text.length) {
      parts.push(text.substring(lastIdx));
    }

    return parts;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
          />

          {/* Chat Window Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[460px] md:w-[480px] h-[90vh] sm:h-[600px] max-h-[85vh] bg-bg-card border border-border-main sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden font-mono"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-main bg-bg-base/60 backdrop-blur-md shrink-0">
              {/* Left: Terminal Dots & Title */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1.5 pl-1.5">
                  <Bot className="w-4 h-4 text-accent" />
                  <span className="mono text-xs text-text-base font-semibold tracking-tight">
                    puppet@divya-ai
                  </span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClearHistory}
                  title="Clear conversation"
                  aria-label="Clear chat history"
                  className="p-1.5 text-text-faint hover:text-accent rounded-lg hover:bg-bg-card-hover transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-1.5 text-text-faint hover:text-text-base rounded-lg hover:bg-bg-card-hover transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 select-text">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-7 h-7 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 text-accent mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`group relative max-w-[85%] rounded-2xl p-3.5 ${
                    msg.sender === 'user'
                      ? 'bg-accent text-bg-base font-sans font-medium'
                      : 'bg-bg-base/70 border border-border-inner text-text-base'
                  }`}>
                    {msg.sender === 'assistant' ? (
                      <div>
                        {formatMarkdown(msg.text)}
                        {/* Copy button & Timestamp */}
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-border-inner/40 text-[10px] mono text-text-faint">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="text-text-faint hover:text-accent p-1 transition-colors opacity-0 group-hover:opacity-100"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-xl bg-border-inner flex items-center justify-center shrink-0 text-text-light mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5 items-center text-text-faint mono text-xs pl-2"
                >
                  <div className="w-7 h-7 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 text-accent">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Puppet is thinking</span>
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 border-t border-border-inner/50 bg-bg-base/30 overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="mono text-[11px] text-text-faint hover:text-accent border border-border-inner hover:border-accent bg-bg-card px-2.5 py-1 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 active:scale-95 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-border-main bg-bg-base/60 backdrop-blur-md flex items-center gap-2 shrink-0"
            >
              <div className="flex-1 relative flex items-center">
                <span className="absolute left-3 text-accent mono text-sm select-none font-bold">
                  ❯
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Divya's resume..."
                  disabled={isLoading}
                  className="w-full bg-bg-card border border-border-inner focus:border-accent rounded-xl pl-8 pr-3 py-2.5 text-xs sm:text-sm text-text-base placeholder:text-text-faint focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="p-2.5 rounded-xl bg-accent text-bg-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all shadow-md shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
