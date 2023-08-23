import { Request } from "express"

export interface GetUserReq extends Request {
  user: string // or any other type
}