import { type User as PrismaUser } from "@prisma/client";

class UserModel {
  private id: number;
  private name: string;
  private year: number;
  private planet: string;
  private division: string;
  private position: string | null;
  private generateNumber: string | null;

  constructor(
    id: number,
    name: string,
    year: number,
    planet: string,
    division: string,
    position: string | null,
    generateNumber: string | null
  ) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.planet = planet;
    this.division = division;
    this.position = position;
    this.generateNumber = generateNumber;
  }

  static fromEntity(prismaUser: PrismaUser) {
    return new UserModel(
      prismaUser.id,
      prismaUser.name,
      prismaUser.year,
      prismaUser.planet,
      prismaUser.division,
      prismaUser.position,
      prismaUser.generateNumber
    );
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      year: this.year,
      planet: this.planet,
      division: this.division,
      position: this.position,
      generateNumber: this.generateNumber,
    };
  }
}

export default UserModel;
