import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      username: string | null;
      role: string;
    };
  }

  interface JWT {
    id: string;
    email: string | null;
    username: string | null;
    role: string;
  }


  interface User {
    id: string;
    email: string | null;
    username: string | null;
    role: string;
  }


  interface AdapterUser {
    id: string;
    email: string | null;
    username: string | null;
    role: string;
  }
}
