"use client"

import { redirect } from "next/navigation";
// import { auth, redirectToSignIn } from "@clerk/nextjs";
import useAuth from '@/hooks/useAuth'
import prismadb from "@/lib/prismadb";

import { ChatClient } from "./components/client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  }
}

const ChatIdPage = async ({
  params
}: ChatIdPageProps) => {
  // const { userId } = auth();
  const { id: userId } = useAuth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc"
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        }
      }
    }
  });


  if (!companion) {
    return redirect("/");
  }

  return (
    <ChatClient companion={companion} />
  );
}
 
export default ChatIdPage;
