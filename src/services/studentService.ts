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
    const [rows] = await typeScriptDatabase.query<mysql.RowDataPacket[]>(
      "SELECT * FROM student WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error(`Student with ID ${id} not found`);
    }
    return rows[0];
  }

  async updateStudentById(id: number, student: any) {
    const { name, age, email, enrollment_date } = student;
    await typeScriptDatabase.query(
      "UPDATE student SET name = ?, age = ?, email = ?, enrollment_date = ? WHERE id = ?",
      [name, age, email, enrollment_date, id]
    );
    return { id, ...student };
  }

  async deleteStudentById(id: number) {
    await typeScriptDatabase.query("DELETE FROM student WHERE id = ?", [id]);
  }

}
