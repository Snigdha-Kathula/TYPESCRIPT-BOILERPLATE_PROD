import { Request, Response } from "express";
import { StudentService } from "services/studentService";


const service = new StudentService();

export class StudentController {
  async create(req: Request, res: Response) {
    const student = await service.createStudent(req.body);
    res.status(201).json(student);
  }
  async getStudentByID(req: Request, res: Response) {
    try {
      const student = await service.getStudentById(Number(req.params.id));
      res.status(200).json(student);
    } catch (error: any) { 
      throw new Error(`Error fetching student: ${error.message}`);
    }
  }
}

// params, query params, body