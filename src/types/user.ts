export type UserDTO = {
    id: number;
    name: string;
    year: number;
    planet: string;
    division: string;
    position: string | null;
    generateNumber: string | null;
    createdAt: Date;
}

export type CreateUser = {
    name: string;
    year: number;
    planet: string;
    division: string;
    position: string | null;
    generateNumber: string | null;
}