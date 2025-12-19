import React from 'react';
import { Button } from '@/components/ui/button';

const ChatWidget: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Array<{ id: number; text: string; from: 'me' | 'bot' }>>([
    { id: 1, text: 'Hi! Need help finding local food or activities?', from: 'bot' },
  ]);
  const [input, setInput] = React.useState('');

  const send = () => {
    if (!input.trim()) return;
    const id = Date.now();
    setMessages((m) => [...m, { id, text: input.trim(), from: 'me' }]);
    setInput('');
    // simple bot reply simulation
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, text: 'Thanks — I can help with recommendations. Try selecting a city or category.', from: 'bot' }]);
    }, 700);
  };

  return (
    <div>
      {/* Chat panel */}
      <div className={`fixed bottom-20 right-4 z-50 transition-all ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="w-80 bg-white border rounded-xl shadow-lg flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-emerald-600 text-white flex items-center justify-between">
            <div className="font-medium">BeLocal Chat</div>
            <button aria-label="Close chat" onClick={() => setOpen(false)} className="text-white opacity-90 hover:opacity-100">✕</button>
          </div>
          <div className="p-3 flex-1 h-48 overflow-auto bg-slate-50">
            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.from === 'me' ? 'bg-emerald-600 text-white' : 'bg-white border'} px-3 py-2 rounded-lg max-w-[80%] text-sm`}>{m.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input aria-label="Chat message" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} className="flex-1 rounded-md border px-3 py-2" placeholder="Ask about food or activities..." />
              <Button onClick={send} size="sm">Send</Button>
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
