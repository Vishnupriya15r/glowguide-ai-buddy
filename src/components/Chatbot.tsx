import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your GlowGuide assistant. I can help answer skincare questions, explain ingredients, or provide general guidance. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Mock API call - in real app this would POST to /api/chat
    setTimeout(() => {
      const responses = [
        "That's a great question! For gentle skincare, I'd recommend starting with a basic routine and patch testing any new products.",
        "For that concern, it's always best to consult with a dermatologist for personalized advice. I can help you find one nearby!",
        "Here's what the science says about that ingredient: it's generally well-tolerated but should be introduced gradually.",
        "Remember, skincare is very individual. What works for one person may not work for another. Always listen to your skin!",
        "That sounds like it might need professional attention. I'd recommend seeing a dermatologist, especially if the issue persists."
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-float z-50 transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100 hover:scale-110'
        }`}
        variant="hero"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Interface */}
      <div className={`fixed bottom-6 right-6 w-80 h-96 bg-card border border-border rounded-3xl shadow-float z-50 transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border rounded-t-3xl gradient-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-glow-pink/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">GlowGuide Assistant</h3>
              <p className="text-xs text-muted-foreground">சருமப் பராமரிப்பு உதவியாளர்</p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto max-h-64 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              {message.isBot && (
                <div className="w-8 h-8 bg-glow-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              
              <div className={`max-w-[70%] p-3 rounded-2xl ${
                message.isBot 
                  ? 'bg-glow-cream/50 text-foreground' 
                  : 'bg-primary text-primary-foreground'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>

              {!message.isBot && (
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-glow-pink/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-glow-cream/50 p-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border rounded-b-3xl">
          <div className="flex gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me about skincare..."
              className="flex-1 min-h-[40px] max-h-20 p-2 text-sm bg-background border border-input rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              variant="hero"
              size="sm"
              className="w-10 h-10 p-0 flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI assistant for educational purposes only • Always consult professionals
          </p>
        </div>
      </div>
    </>
  );
};