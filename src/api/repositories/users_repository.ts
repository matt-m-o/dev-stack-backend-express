import { IRepository } from "../core/Repository";
import { User } from "../entities/user";

export interface UsersRepository extends IRepository <User> {
}