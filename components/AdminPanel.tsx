"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
export default function AdminPanel() {
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userHistory, setUserHistory] = useState<{ question: string; answer: string; _id: string }[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data.users);
    }
    getData();

  }, []);

  const handleUserSelect = async (userId: string) => {
    setSelectedUser(userId);
    const response = await fetch(`/api/admin/users/history/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setUserHistory(data.chats);
    // console.log(await response.json());
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-[200px]'>
            <ul className='space-y-2'>
              {users.map((user) => (
                <li
                  onClick={() => handleUserSelect(user._id)}
                  key={user._id} className='p-2 bg-secondary rounded-md'>
                  {user.name}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Saved Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-[400px]'>
            <ul className='space-y-2'>
              {selectedUser && userHistory.map((response) => (
                <li key={response._id} className='p-2 bg-secondary rounded-md'>
                  {response.question}
                  <ReactMarkdown>{response.answer}</ReactMarkdown>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
