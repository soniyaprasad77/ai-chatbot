"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdminPanel from "./AdminPanel";
import HistoryTab from "./HistoryTab";
import { AppDispatch } from "@/store/store";
import { saveResponse } from "@/store/chatSlice";
import ReactMarkdown from "react-markdown";
export default function ChatbotInterface() {
  const [questions, setQuestions] = useState<string>("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/chat/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions }),

      });
      const data = await response.text();
      console.log(data);
      if (!data) {
        console.log("Data is empty");
      }
      if (response.ok) {
        setResult(data);
      } else {
        setError("An error occurred during the request");
      }
    } catch (err) {
      setError("An error occurred during the request");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResponse = async () => {
    if (result) {
      try {
        const response = await fetch("/api/chat/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: questions, answer: result }),
        });

        if (response.ok) {
          dispatch(saveResponse(result));
        } else {
          setError("An error occurred while saving the response");
        }
      } catch (err) {
        setError("An error occurred while saving the response");
      }
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <Tabs defaultValue='chat' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='chat'>Chat</TabsTrigger>
          <TabsTrigger value='admin'>Admin</TabsTrigger>
          <TabsTrigger value='history'>History</TabsTrigger>
        </TabsList>
        <TabsContent value='chat'>
          <Card>
            <CardContent className='p-6'>
              <form onSubmit={handleSubmit} className='flex space-x-2'>
                <Input
                  type='text'
                  value={questions}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuestions(e.target.value)
                  }
                  placeholder='Ask a question...'
                  className='flex-1'
                />
                <Button type='submit' disabled={loading}>
                  {loading ? "Sending..." : "Send"}
                </Button>
              </form>
              {result && (
                <ScrollArea className='h-[400px] mt-4'>
                  <div className='space-y-4'>
                    <div>
                      <h3 className='font-semibold'>Result</h3>
                      <ReactMarkdown>{result}</ReactMarkdown>
                    </div>
                    {result.error && (
                      <div className='text-red-500'>
                        <h3 className='font-semibold'>Error</h3>
                        <p>{result.error}</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}
              {result && (
                <Button onClick={handleSaveResponse} className='mt-4'>
                  Save Response
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='admin'>
          <AdminPanel />
        </TabsContent>
        <TabsContent value='history'>
          <HistoryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
