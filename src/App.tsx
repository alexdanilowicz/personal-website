import React, { useEffect, useState } from "react";
const useTypewriter = (text: string, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typing);
      }
    }, speed);
    return () => clearInterval(typing);
  }, [text, speed]);
  return {
    displayedText,
    isTypingComplete
  };
};
export function App() {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const {
    displayedText
  } = useTypewriter('Welcome to Alexander\'s Terminal.\nType "help" for available commands.\n\nThis website was built with www.magicpatterns.com');
  const handleCommand = (command: string) => {
    setCommandHistory(prev => [...prev, `> ${command}`]);
    switch (command.toLowerCase()) {
      case "help":
        setCommandHistory(prev => [...prev, "Available commands:", "  about     - Learn about Alexander", "  work      - View work experience", "  contact   - Get contact information", "  clear     - Clear terminal", "  help      - Show available commands"]);
        break;
      case "about":
        setCommandHistory(prev => [...prev, "Alexander Danilowicz", "Co-founder of Magic Patterns"]);
        break;
      case "work":
        setCommandHistory(prev => [...prev, "Work Experience:", "• Magic Patterns, Co-founder", "• Canopy, Software Engineer", "• Liveramp, Software Engineer"]);
        break;
      case "contact":
        setCommandHistory(prev => [...prev, "Contact Information:", "Email: [email protected]", "Twitter: @alexdanilo99", "GitHub: https://github.com/alexdanilowicz", "LinkedIn: https://www.linkedin.com/in/alexanderdanilowicz/"]);
        break;
      case "clear":
        setCommandHistory([]);
        break;
      default:
        setCommandHistory(prev => [...prev, `Command not found: ${command}. Type 'help' for available commands.`]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleCommand(inputValue.trim());
      setInputValue("");
    }
  };
  return <main className="w-full min-h-screen bg-black p-4 font-mono text-green-500">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 whitespace-pre-line">
          {displayedText}
          <span className="animate-pulse">▊</span>
        </div>
        <div className="space-y-2">
          {commandHistory.map((line, i) => <div key={i} className="whitespace-pre-wrap">
              {line}
            </div>)}
        </div>
        <form onSubmit={handleSubmit} className="mt-4 flex items-center">
          <span className="mr-2">{">"}</span>
          <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-green-500" autoFocus />
        </form>
      </div>
    </main>;
}