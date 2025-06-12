class Student{
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public getName(): string {
        return this.name;
    }
    public getAge(): number {
        return this.age;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public setAge(age: number): void {
        if (age < 0) {
            throw new Error("Age cannot be negative");
        }
        this.age = age;
    }
}


const student = new Student("John Doe", 20);