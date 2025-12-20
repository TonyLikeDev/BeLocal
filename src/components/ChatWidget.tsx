import React from 'react';
import { Button } from '@/components/ui/button';
import { getAIResponse } from '@/lib/aiChat';
import { Loader2 } from 'lucide-react';

const ChatWidget: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Array<{ id: number; text: string; from: 'me' | 'bot' }>>([
    { id: 1, text: 'Hi! Need help finding local food or activities?', from: 'bot' },
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change or loading state changes
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Scroll to bottom when chat opens
  React.useEffect(() => {
    if (open && messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [open]);

  const send = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    const id = Date.now();
    setMessages((m) => [...m, { id, text: userMessage, from: 'me' }]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for AI context
      const conversationHistory = messages
        .filter((m) => m.from !== 'me' || m.text !== 'Hi! Need help finding local food or activities?')
        .map((m) => ({
          role: (m.from === 'me' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.text,
        }));

      // Get AI response
      const botResponse = await getAIResponse(userMessage, conversationHistory);
      setMessages((m) => [...m, { id: Date.now() + 1, text: botResponse, from: 'bot' }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          text: 'Sorry, I encountered an error. Please try again!',
          from: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Chat panel (fixed landscape rectangle 320x640) */}
      <div className={`fixed bottom-6 right-20 z-50`}>
        <div style={{ width: 420, height: 500 }} className={`bg-white border rounded-xl shadow-lg flex flex-col overflow-hidden ${open ? '' : 'hidden'}`}>
          <div className="px-4 py-3 bg-emerald-600 text-white flex items-center justify-between">
            <div className="font-medium">BeLocal Chat</div>
            <button aria-label="Close chat" onClick={() => setOpen(false)} className="text-white opacity-90 hover:opacity-100">✕</button>
          </div>
          <div ref={scrollContainerRef} className="p-3 flex-1 overflow-auto bg-slate-50">
            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.from === 'me' ? 'bg-emerald-600 text-white' : 'bg-white border'} px-3 py-2 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap`}>{m.text}</div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                    <span className="text-muted-foreground">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input
                aria-label="Chat message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && send()}
                disabled={isLoading}
                className="flex-1 rounded-md border px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Ask about food or activities..."
              />
              <Button onClick={send} size="sm" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating circle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button aria-label="Open chat" onClick={() => setOpen((v) => !v)} className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center">
          💬
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
