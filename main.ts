// Roles: student, teacher
// Disciplines: Computer Science, Mathematics, Physics, Biology, Chemistry
// Academic status: active, academic leave, graduated, expelledç

enum Role {
    student = "student",
    teacher = "teacher"
}

enum AcademicStatus {
    active = "active",
    academicLeave = "academic leave",
    graduated = "graduated",
    expelled = "expelled"
}
  
enum Discipline {
    computerScience = "Computer Science",
    mathematics = "Mathematics",
    physics = "Physics",
    biology = "Biology",
    chemistry = "Chemistry"
}

type AcademicPerformance = {
    totalCredits: number;
    gpa: number;
};

class UniversityError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "UniversityError";
    }
};
  
class University {
    name: string;
    courses: Course[] = [];
    groups: Group[] = [];
    people: Person[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addCourse(course: Course): void {
        this.courses.push(course);
    }

    addGroup(group: Group): void {
        this.groups.push(group);
    }

    addPerson(person: Person): void {
        this.people.push(person);
    }

    findGroupByCourse(course: Course): Group | undefined {
        return this.groups.find((group) => group.course === course);
    }

    getAllPeopleByRole(role: string): Person[] {
        switch (role) {
        case Role.student:
            return this.people.filter((person) => person.role === "student");
        case Role.teacher:
            return this.people.filter((person) => person.role === "teacher");
        default:
            return this.assertNeverRole(role);
        }
    }

    assertNeverRole(role: string): never {
        throw new Error(`Unhandled role: ${role}`);
    }
};
  
class Course {
    name: string;
    credits: number;
    discipline: string;
  
    constructor(name: string, discipline: string, credits: number) {
      this.name = name;
      this.credits = credits;
      this.discipline = discipline;
    }
};
  
class Group {
    name: string;
    course: Course;
    teacher: Teacher;
    students: Student[] = [];
  
    constructor(name: string, course: Course, teacher: Teacher) {
      this.name = name;
      this.course = course;
      this.teacher = teacher;
    }
  
    addStudent(student: Student): void {
      if (this.students.includes(student)) {
        throw new UniversityError("Student is already in the group");
      }
  
      this.students.push(student);
    }
  
    removeStudentById(id: number): void {
      const index = this.students.findIndex((student) => student.id === id);
  
      if (!~index) {
        throw new UniversityError("Student not found in group");
      }
  
      this.students.splice(index, 1);
    }
  
    getAverageGroupScore(): number {
      if (this.students.length) {
        return 0;
      }
  
      const totalScore = this.students.reduce(
        (sum, student) => sum + student.getAverageScore(),
        0
      );
  
      return totalScore / this.students.length;
    }
  
    getStudents(): Student[] {
      return [...this.students];
    }
};
  
class Person {
    static nextId = 1;
  
    firstName: string;
    lastName: string;
    birthDay: Date;
    id: number;
    gender: string;
    contactInfo: { email: string, phone: string };
    role: string;
  
    constructor(info: { firstName: string; lastName: string; birthDay: Date; gender: string; email: string; phone: string }, role: string) {
      const { firstName, lastName, birthDay, gender, email, phone } = info;
  
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthDay = birthDay;
      this.id = Person.nextId++;
      this.gender = gender;
      this.contactInfo = { email, phone };
      this.role = role;
    }
  
    get fullName(): string {
      return `${this.lastName} ${this.firstName}`;
    }
  
    get age(): number {
      const today = new Date();
      let age = today.getFullYear() - this.birthDay.getFullYear();
      const monthDiff = today.getMonth() - this.birthDay.getMonth();
  
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < this.birthDay.getDate())
      ) {
        age--;
      }
  
      return age;
    }
};
  
class Teacher extends Person {
    specializations: string[] = [];
    courses: Course[] = [];
  
    constructor(info: { firstName: string; lastName: string; birthDay: Date; gender: string; email: string; phone: string }, specializations: string[] = []) {
      super(info, Role.teacher);
      this.specializations = specializations;
    }
  
    assignCourse(course): void {
      this.courses.push(course);
    }
  
    removeCourse(courseName): void {
      this.courses = this.courses.filter((course) => course.name !== courseName);
    }
  
    getCourses(): Course[] {
      return [...this.courses];
    }
};
  
class Student extends Person {
    academicPerformance: AcademicPerformance = {
        totalCredits: 0,
        gpa: 0,
    };
    enrolledCourses: Course[] = [];
    status: string;
  
    constructor(info: { firstName: string; lastName: string; birthDay: Date; gender: string; email: string; phone: string }) {
      super(info, Role.student);
      this.status = AcademicStatus.active;
    }
  
    enrollCourse(course: Course): void {
      if (this.status !== AcademicStatus.active) {
        throw new UniversityError(
          "Cannot enroll: Student is not in active status"
        );
      }
  
      this.enrolledCourses.push(course);
      this.academicPerformance.totalCredits += course.credits;
    }
  
    getAverageScore(): number {
      return this.academicPerformance.gpa;
    }
  
    updateAcademicStatus(newStatus): void {
      this.status = newStatus;
    }
  
    getEnrolledCourses(): Course[] {
      return [...this.enrolledCourses];
    }
}
  