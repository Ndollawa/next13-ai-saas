import { redirect } from "next/navigation";
// import { auth, redirectToSignIn } from "@clerk/nextjs";
import useAuth from '@/hooks/useAuth';

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

import { CompanionForm } from "./components/companion-form";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
};

const CompanionIdPage = async ({
  params
}: CompanionIdPageProps) => {
  // const { userId } = auth();
  const { id: userId } = useAuth();

  if (!userId) {
    return redirect('/login');
  }

  const validSubscription = await checkSubscription();

  if (!validSubscription) {
    return redirect("/");
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    }
  });

  const categories = await prismadb.category.findMany();

  return ( 
    <CompanionForm initialData={companion} categories={categories} />
  );
}
 
export default CompanionIdPage;
