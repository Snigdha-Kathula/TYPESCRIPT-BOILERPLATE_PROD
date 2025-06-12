import config from "config";
import mysql from "mysql2/promise";

const typeScriptDatabase = mysql.createPool(config.get("db"));

export class StudentService {
  async createStudent(student: any) {
    const { name, age, email, enrollment_date } = student;
    const [result] = await typeScriptDatabase.query(
      "INSERT INTO student (name, age, email, enrollment_date) VALUES (?, ?, ?, ?)",
      [name, age, email, enrollment_date]
    );
    return { id: (result as any).insertId, ...student };
  }
  async getStudentById(id: number) {
    const [rows] = await typeScriptDatabase.query<mysql.RowDataPacket[]>("SELECT * FROM student WHERE id = ?", [id]);
    if (rows.length === 0) {
      throw new Error(`Student with ID ${id} not found`);
    }
    return rows[0];
  }
}
