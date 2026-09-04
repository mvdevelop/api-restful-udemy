import { Request, Response } from 'express';

class HomeController {
  index(_req: Request, res: Response): void {
    res.json('Index');
  }
}

export default new HomeController();