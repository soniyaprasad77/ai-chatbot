"use client";

import { useSelector } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { RootState } from "@/store/store";

export default function HistoryTab() {
  const savedResponses = useSelector(
    (state: RootState) => state.chat.savedResponses
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[400px]'>
          {savedResponses.map((response, index) => (
            <div key={index} className='mb-4 p-4 bg-secondary rounded-md'>
              {response.summary && (
                <div className='mb-2'>
                  <strong className='text-primary'>Summary:</strong>{" "}
                  {response.summary}
                </div>
              )}
              {response.result_text && (
                <div className='mb-2'>
                  <strong className='text-primary'>Result:</strong>{" "}
                  {response.result_text}
                </div>
              )}
              {response.result_table_path && (
                <div className='mb-2'>
                  <strong className='text-primary'>Table:</strong>
                  <img
                    src={response.result_table_path}
                    alt='Result Table'
                    className='mt-2 max-w-full h-auto'
                  />
                </div>
              )}
              {response.result_visualization_path && (
                <div className='mb-2'>
                  <strong className='text-primary'>Visualization:</strong>
                  <img
                    src={response.result_visualization_path}
                    alt='Result Visualization'
                    className='mt-2 max-w-full h-auto'
                  />
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
