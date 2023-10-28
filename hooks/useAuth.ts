import { Hanko } from '@teamhanko/hanko-elements';

type userProps = {
    id: string;
    email: string;  
}
const useAuth = async ():Promise<Partial<userProps> => {
    const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;
    const hanko = new Hanko(hankoApi);
    const user : Partial<userProps> = await hanko.user.getCurrent();
  return user
}

export default useAuth
