// import { useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";

export const UserAvatar = async () => {
  // const { user } = useUser();
 const {id, email } = await useAuth()
  return (
    <Avatar className="h-8 w-8">
      {/* <AvatarImage src={user?.profileImageUrl} /> */}
      <AvatarFallback>
        {/* {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)} */}
      </AvatarFallback>
    </Avatar>
  );
};
