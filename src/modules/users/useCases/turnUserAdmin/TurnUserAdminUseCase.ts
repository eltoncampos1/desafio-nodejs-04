import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const userByID = this.usersRepository.findById(user_id);

    if (!userByID) {
      throw new Error("user not found");
    }

    const user = this.usersRepository.turnAdmin(userByID);

    return user;
  }
}

export { TurnUserAdminUseCase };
