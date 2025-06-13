import { Request, Response } from "express";
import { StudentService } from "services/studentService";


const service = new StudentService();

export class StudentController {

  async createStudent(req: Request, res: Response) {
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

  async updateStudentById(req: Request, res: Response) {
    const student = await service.updateStudentById(Number(req.params.id), req.body);
    res.json(student);
  }

  async deleteStudentById(req: Request, res: Response) {
    await service.deleteStudentById(Number(req.params.id));
    res.status(200).json({message: "Deleted successfully"});
  }
}

// params, query params, body