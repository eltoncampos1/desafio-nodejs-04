/* eslint-disable no-param-reassign */
import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User {
    const userById = this.users.find((user) => user.id === id);

    if (!userById) {
      throw new Error("user not found");
    }

    return userById;
  }

  findByEmail(email: string): User {
    const userByEmail = this.users.find((user) => user.email === email);

    return userByEmail;
  }

  turnAdmin(receivedUser: User): User {
    const updateUser = {
      ...receivedUser,
      admin: true,
      updated_at: new Date(),
    };

    this.users = this.users.map((user) =>
      user.id === receivedUser.id ? updateUser : user
    );

    return updateUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
