import UserRepository from "../repositories/user.repository";
import UserModel from "../models/user.model";
import { CreateUser } from "../types/user";

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async generateNumber(userData: CreateUser): Promise<UserModel | string> {
    let { planet, year } = userData;
    
    if (planet === "Minilemon Studio") {
      planet = "01";
    } else if (planet === "Minilemon Agency") {
      planet = "02";
    } else if (planet === "Minilemon Technology") {
      planet = "03";
    } else {
      return "Invalid planet name";
    }

    const prefix = String(year) + planet;

    const lastUser = await this.userRepository.findLatestByPrefix(prefix);

    let nextSequence = 1;
    if (lastUser && lastUser.generateNumber) {
      const lastSequence = parseInt(lastUser.generateNumber.slice(-4));
      nextSequence = lastSequence + 1;
    }

    const formattedSequence = String(nextSequence).padStart(4, "0");

    const generateNumber = prefix + formattedSequence;

    const result = await this.userRepository.generateNumber({
      ...userData,
      planet,
      generateNumber,
    });

    if (typeof result === "string") {
      return result;
    }

    return result;
  }
}
