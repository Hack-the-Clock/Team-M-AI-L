'use client';

import { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Send, Sparkles, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Recommendation {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  logo?: string;
}

// Simple markdown renderer for chat messages
const renderMarkdown = (text: string) => {
  // Split by double newlines for paragraphs
  const paragraphs = text.split('\n\n');
  
  return paragraphs.map((para, pIdx) => {
    const trimmedPara = para.trim();
    if (!trimmedPara) return null;
    
    // Handle tables (lines with pipes)
    if (trimmedPara.includes('|') && trimmedPara.split('\n').filter(line => line.includes('|')).length > 1) {
      const lines = trimmedPara.split('\n').filter(line => line.trim());
      const rows = lines.filter(line => !line.match(/^\|[\s\-:|]+\|$/)); // Filter out separator lines
      
      if (rows.length > 0) {
        const headers = rows[0].split('|').map(h => h.trim()).filter(h => h);
        const dataRows = rows.slice(1).map(row => 
          row.split('|').map(cell => cell.trim()).filter(cell => cell)
        );
        
        return (
          <div key={pIdx} className="overflow-x-auto my-4 -mx-1">
            <table className="min-w-full border-collapse border border-border/50 rounded-lg overflow-hidden">
              <thead className="bg-muted/50">
                <tr>
                  {headers.map((header, hIdx) => (
                    <th key={hIdx} className="border-b border-border px-4 py-2.5 text-left font-semibold text-sm text-foreground">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-muted/30 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="border-b border-border/30 px-4 py-2.5 text-sm" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cell) }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }
    
    // Handle headers (### or ##)
    if (trimmedPara.startsWith('### ')) {
      return (
        <h3 key={pIdx} className="text-base font-bold mb-2 mt-4 text-foreground">
          {trimmedPara.replace('### ', '')}
        </h3>
      );
    }
    
    if (trimmedPara.startsWith('## ')) {
      return (
        <h2 key={pIdx} className="text-lg font-bold mb-2 mt-4 text-foreground">
          {trimmedPara.replace('## ', '')}
        </h2>
      );
    }
    
    // Handle bullet points (only if line starts with bullet)
    const lines = trimmedPara.split('\n').filter(line => line.trim());
    const isBulletList = lines.some(line => /^[•\-\*]\s+/.test(line.trim()));
    
    if (isBulletList) {
      return (
        <ul key={pIdx} className="space-y-2 my-3">
          {lines.map((item, iIdx) => {
            const trimmedItem = item.trim();
            if (/^[•\-\*]\s+/.test(trimmedItem)) {
              const cleanItem = trimmedItem.replace(/^[•\-\*]\s+/, '');
              return (
                <li key={iIdx} className="flex items-start gap-2.5">
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span className="flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleanItem) }} />
                </li>
              );
            } else if (trimmedItem && !trimmedItem.startsWith('Trending')) {
              // Non-bullet line continuation
              return (
                <li key={iIdx} className="ml-5 leading-relaxed">
                  <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmedItem) }} />
                </li>
              );
            }
            return null;
          })}
        </ul>
      );
    }
    
    // Handle special formatting for "Trending upward:" or "Trending downward:"
    if (trimmedPara.includes('Trending upward') || trimmedPara.includes('Trending downward')) {
      return (
        <p key={pIdx} className="my-2 italic text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmedPara) }} />
      );
    }
    
    // Handle "Takeaway:" sections
    if (trimmedPara.startsWith('Takeaway:')) {
      return (
        <div key={pIdx} className="my-3 p-3 bg-muted/30 rounded-lg border-l-4 border-primary">
          <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmedPara) }} />
        </div>
      );
    }
    
    // Regular paragraph
    return (
      <p key={pIdx} className="my-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmedPara) }} />
    );
  }).filter(Boolean);
};

// Format inline markdown (bold, italic, code)
const formatInlineMarkdown = (text: string) => {
  return text
    // Bold with **text** or __text__
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/__(.+?)__/g, '<strong class="font-bold">$1</strong>')
    // Italic with *text* or _text_
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    .replace(/_(.+?)_/g, '<em class="italic">$1</em>')
    // Inline code with `code`
    .replace(/`(.+?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    // Links (basic support)
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank">$1</a>');
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    const savedRecommendations = localStorage.getItem('chatRecommendations');
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    } else {
      // Set default welcome message if no history
      setMessages([
        {
          role: 'assistant',
          content: 'Hello! I\'m your AI investment advisor. Ask me about any sector, stock trends, or get personalized recommendations. Try questions like:\n\n• "What companies are leading in AI & Robotics?"\n• "Show me undervalued Fintech stocks"\n• "Which Green Energy stocks are trending?"'
        }
      ]);
    }

    if (savedRecommendations) {
      try {
        setRecommendations(JSON.parse(savedRecommendations));
      } catch (e) {
        console.error('Failed to load recommendations:', e);
      }
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Save recommendations to localStorage whenever they change
  useEffect(() => {
    if (recommendations.length > 0) {
      localStorage.setItem('chatRecommendations', JSON.stringify(recommendations));
    }
  }, [recommendations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const exampleQueries = [
    "What companies are leading in AI & Robotics?",
    "Show me undervalued Fintech stocks",
    "Which Green Energy stocks are trending?",
    "Compare top EV manufacturers"
  ];

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      
      if (data.recommendations && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please make sure Ollama is running with the gpt-oss:120b-cloud model.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (query: string) => {
    setInput(query);
  };

  const addToWatchlist = (stock: Recommendation) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    if (!watchlist.find((item: any) => item.symbol === stock.symbol)) {
      watchlist.push({
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        change: stock.change,
        changePercent: stock.changePercent,
        addedAt: new Date().toISOString()
      });
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      
      // Dispatch event to update watchlist counter
      window.dispatchEvent(new Event('watchlistUpdated'));
      
      alert(`${stock.symbol} added to watchlist!`);
    } else {
      alert(`${stock.symbol} is already in your watchlist`);
    }
  };

  const clearChat = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      localStorage.removeItem('chatHistory');
      localStorage.removeItem('chatRecommendations');
      setMessages([
        {
          role: 'assistant',
          content: 'Hello! I\'m your AI investment advisor. Ask me about any sector, stock trends, or get personalized recommendations. Try questions like:\n\n• "What companies are leading in AI & Robotics?"\n• "Show me undervalued Fintech stocks"\n• "Which Green Energy stocks are trending?"'
        }
      ]);
      setRecommendations([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Side - Chat Interface */}
        <div className="flex-1 flex flex-col border-r border-border">
          {/* Chat Header */}
          <div className="border-b border-border p-4 bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">AI Investment Advisor</h1>
                  <p className="text-sm text-muted-foreground">Powered by Ollama GPT-OSS</p>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
                title="Clear chat history"
              >
                Clear Chat
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-card border border-border text-foreground shadow-sm'
                  }`}
                >
                  {message.role === 'user' ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  ) : (
                      <div className="text-sm">
                      {renderMarkdown(message.content)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Example Queries */}
          {messages.length <= 1 && (
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {exampleQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(query)}
                    className="px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm text-foreground transition"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about stocks, sectors, or trends..."
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-white rounded-lg transition flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Recommendations Panel */}
        <div className="w-[400px] bg-card border-l border-border overflow-y-auto">
          <div className="p-4 border-b border-border sticky top-0 bg-card z-10">
            <h2 className="text-lg font-bold text-foreground">AI Recommendations</h2>
            <p className="text-sm text-muted-foreground">Based on your conversation</p>
          </div>

          {recommendations.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Start chatting to get personalized stock recommendations
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {recommendations.map((stock) => (
                <div
                  key={stock.symbol}
                  className="bg-background border border-border rounded-lg p-4 hover:border-primary/50 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {stock.logo ? (
                        <Image
                          src={stock.logo}
                          alt={stock.symbol}
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-primary font-bold text-sm">
                            {stock.symbol.slice(0, 2)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-foreground">{stock.symbol}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {stock.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        ${stock.price.toFixed(2)}
                      </p>
                      <div className={`flex items-center gap-1 text-sm ${
                        stock.change >= 0 ? 'text-positive' : 'text-negative'
                      }`}>
                        {stock.change >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>
                          {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => addToWatchlist(stock)}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Watchlist
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
