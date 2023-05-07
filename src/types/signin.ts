type reqBodyTypes = {
  email: string;
  password: string;
};

type jwtPayload = {
  id: string;
  email: string;
  time: number;
};

export type { reqBodyTypes, jwtPayload };
