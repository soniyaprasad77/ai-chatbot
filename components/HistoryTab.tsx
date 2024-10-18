"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function HistoryTab() {
  const [savedResponses, setSavedResponses] = useState<{ question: string; answer?: string }[]>([]);
  useEffect(() => {
    fetch("/api/history")
      .then((response) => response.json())
      .then((data) => {
        setSavedResponses(data);
      })
      .catch((error) => {
        console.error("Error fetching chat history:", error);
      });
  }, []);
  // const savedResponses = useSelector(
  //   (state: RootState) => state.chat.savedResponses
  // );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[400px]'>
          {savedResponses.map((response, index) => (
            <div key={index} className='mb-4 p-4 bg-secondary rounded-md'>
              <div className='mb-2'>
                <strong className='text-primary'>Question:</strong>{" "}
                <ReactMarkdown>{response.question}</ReactMarkdown>
              </div>

              {response.answer && (
                <div className='mb-2'>
                  <strong className='text-primary'>Answer:</strong>{" "}
                  <ReactMarkdown>{response.answer}</ReactMarkdown>
                </div>
              )}

            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
