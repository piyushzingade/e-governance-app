import "next-auth";

declare module "next-auth" {
  // Extending Session and JWT as you did before
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

  // Extend the User type with the missing fields
  interface User {
    id: string;
    email: string | null;
    username: string | null;
    role: string;
  }

  // Optionally extend AdapterUser, if you're using a custom adapter
  interface AdapterUser {
    id: string;
    email: string | null;
    username: string | null;
    role: string;
  }
}
