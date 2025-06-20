declare namespace Users {
  type User = App.User & {
    updatedAt: string;
    blocked: boolean;
    confirmed: boolean;
    createdAt: string;
  };

  type Users = User[];
}
