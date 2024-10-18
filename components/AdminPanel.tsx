"use client";

import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { RootState } from "@/store/store";

export default function AdminPanel() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  // const savedResponses = useSelector(
  //   (state: RootState) => state.chat.savedResponses
  // );


  useEffect(() => {
    // In a real application, you would fetch users from your database here
    // For this example, we'll use mock data
    const getData = async () => {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data.users);
    }
    getData();
  }, []);

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
                <li key={user.id} className='p-2 bg-secondary rounded-md'>
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
          <ScrollArea className='h-[200px]'>
            {/* <ul className='space-y-2'>
              {savedResponses.map((response, index) => (
                <li key={index} className='p-2 bg-secondary rounded-md'>
                  
                </li>
              ))}
            </ul> */}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
