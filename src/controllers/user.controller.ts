import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { responses } from "../constant";

export default class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async generateNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, year, division, position, planet } = req.body;

      if (!name || !year || !planet || !division) {
        return res.status(400).json({
          success: false,
          message: "Name, year, planet, and division required",
        });
      }

      if (planet === "Minilemon Technology" && !position) {
        return res.status(400).json({
          success: false,
          message: "Position are required",
        });
      }

      const result = await this.userService.generateNumber({
        name: req.body.name,
        year: req.body.year,
        planet: req.body.planet,
        division: req.body.division,
        position: req.body.position,
        generateNumber: req.body.generateNumber,
      });

      if (typeof result === "string") {
        return res.status(400).json({
          success: false,
          message: result,
        });
      }

      res.status(201).json({
        success: true,
        message: responses.successGenerate,
        data: result.toDTO(),
      });
    } catch (error) {
      next(error);
    }
  }
}
