interface BaseUser {
  name?: string | undefined;
  email?: string | undefined;
}

interface User extends Partial<BaseUser> {
  id?: string;
  image?: string | null;
}

export interface UserProps extends Partial<User> {
  phone?: string | undefined;
  address?: string | undefined;
  city?: string | undefined;
  postal_code?: string | undefined;
  phone_number?: string | undefined;
  province?: string | undefined;
}
