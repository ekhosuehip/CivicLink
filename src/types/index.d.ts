// src/types/express/index.d.ts

import { DecodedUser } from "../../interfaces/User";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}

export {}; 
