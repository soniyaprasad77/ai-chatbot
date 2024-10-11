import ChatbotInterface from "@/components/ChatbotInterface";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-background text-foreground'>
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8'>
        <div className='container flex h-14 items-center'>
          <div className='mr-4 hidden md:flex'>
            <a className='mr-6 flex items-center space-x-2' href='/'>
              <span className='hidden font-bold sm:inline-block'>
                AI Chatbot
              </span>
            </a>
          </div>
          <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className='flex-1'>
        <ChatbotInterface />
      </main>
    </div>
  );
}
