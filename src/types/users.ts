export type createUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
};

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  defaultAddressId: string;
  idDoc: string;
};

export type CredentialUser = {
  displayName: string | null;
  uid: string;
  email: string | null;
  photoURL: string | null;
};

export type UserAuth = {
  uid: string;
  email: string;
};
