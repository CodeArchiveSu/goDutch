export type currency = {
  code: string;
  name: string;
  symbol: string;
};

export type ListGroup = {
  groups: Group[];
};

export type Group = {
  _id: string;
  name: string;
  members: User[];
  createdAt: string;
  bills: billsinGroup[];
};

export type billsinGroup = {
  name: string;
  totalAmount: number;
  payer: string;
  bill: Bills[];
  user: User;
  _id: string;
};

export type Bills = {
  user: User;
  amount: number;
};

export type NotOkType = {
  error: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: profile;
  groups: string[];
};

export type profile = {
  public_id?: string;
  url: string;
};

export type loggedInUser = {
  message: string;
  token: string;
  user: User;
  groups: Group[];
};

export type UserProfile = {
  message: string;
  user: User;
};

export type newBill = {
  _id: string;
  name: string;
  payer: userInBill;
  group_id: string;
  bill: Bills[];
  totalAmount: number;
};

export type userInBill = {
  _id: string;
  avatar: profile;
  name: string;
  email: string;
  groups: string[];
};
