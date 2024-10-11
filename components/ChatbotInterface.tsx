"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import AdminPanel from "./AdminPanel";
import HistoryTab from "./HistoryTab";

import { AppDispatch } from "@/store/store";
import { saveResponse } from "@/store/chatSlice";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

interface ChatResponse {
  summary?: string;
  result_text?: string;
  result_table_path?: string;
  result_visualization_path?: string;
  error?: string;
}

export default function ChatbotInterface() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const response = result.response;
      const text = response.text();

      // Parse the response text as JSON
      const parsedResponse = JSON.parse(text);
      setResponse(parsedResponse);
    } catch (error) {
      console.error("Error:", error);
      setResponse({
        error: "An error occurred while processing your request.",
      });
    }
    setLoading(false);
  };

  const handleSaveResponse = () => {
    if (response) {
      dispatch(saveResponse(response));
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
                  value={input}
                  onChange={(e: any) => setInput(e.target.value)}
                  placeholder='Ask a question...'
                  className='flex-1'
                />
                <Button type='submit' disabled={loading}>
                  {loading ? "Sending..." : "Send"}
                </Button>
              </form>
              {response && (
                <ScrollArea className='h-[400px] mt-4'>
                  <div className='space-y-4'>
                    {response.summary && (
                      <div>
                        <h3 className='font-semibold'>Summary</h3>
                        <p>{response.summary}</p>
                      </div>
                    )}
                    {response.result_text && (
                      <div>
                        <h3 className='font-semibold'>Result</h3>
                        <p>{response.result_text}</p>
                      </div>
                    )}
                    {response.result_table_path && (
                      <div>
                        <h3 className='font-semibold'>Table</h3>
                        <img
                          src={response.result_table_path}
                          alt='Result Table'
                          className='mt-2'
                        />
                      </div>
                    )}
                    {response.result_visualization_path && (
                      <div>
                        <h3 className='font-semibold'>Visualization</h3>
                        <img
                          src={response.result_visualization_path}
                          alt='Result Visualization'
                          className='mt-2'
                        />
                      </div>
                    )}
                    {response.error && (
                      <div className='text-red-500'>
                        <h3 className='font-semibold'>Error</h3>
                        <p>{response.error}</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}
              {response && (
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
