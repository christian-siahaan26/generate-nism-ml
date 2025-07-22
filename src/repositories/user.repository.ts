import { PrismaClient, Prisma } from "@prisma/client";
import { CreateUser } from "../types/user";
import UserModel from "../models/user.model";
import { getErrorMessage } from "../utils/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findLatestByPrefix(prefix: string) {
    return this.prisma.user.findFirst({
      where: {
        generateNumber: {
          startsWith: prefix,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async generateNumber(userData: CreateUser): Promise<UserModel | string> {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: userData.name,
          year: userData.year,
          planet: userData.planet,
          division: userData.division,
          position: userData?.position,
          generateNumber: userData.generateNumber,
          createdAt: new Date(),
        } as Prisma.UserCreateInput,
      });
      return UserModel.fromEntity(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Name already exist");
        }
      }
      return getErrorMessage(error);
    }
  }
}
