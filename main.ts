enum Role {
    student = "student",
    teacher = "teacher"
};

enum AcademicStatus {
    active = "active",
    academicLeave = "academic leave",
    graduated = "graduated",
    expelled = "expelled"
};
  
enum Discipline {
    computerScience = "Computer Science",
    mathematics = "Mathematics",
    physics = "Physics",
    biology = "Biology",
    chemistry = "Chemistry"
};

type ContactInfo = { email: string } & { phone: string };

type PersonInfo = {
    firstName: string;
    lastName: string;
    birthDay: Date;
    gender: 'male' | 'female' | 'other';
    email: string;
    phone: string;
};

type AcademicPerformance = {
    totalCredits: number;
    gpa: number;
};

type People = Person[];

type CourseCollection = Course[];

const defaultContact: ContactInfo = {
    email: "info@university.com",
    phone: "+380955555555",
};

class UniversityError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "UniversityError";
    }
};
  
class University {
    name: string;
    courses: CourseCollection = [];
    groups: Group[] = [];
    people: People = [];

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

    getAllPeopleByRole(role: Role.student | Role.teacher): People {
        switch (role) {
        case Role.student:
            return this.people.filter((person) => person.role === Role.student);
        case Role.teacher:
            return this.people.filter((person) => person.role === Role.teacher);
        default:
            return this.assertNeverRole(role);
        }
    }

    assertNeverRole(role: Role.student | Role.teacher): never {
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
      this.students.splice(this.getStudentIdByGroup(id), 1);
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

    getStudentIdByGroup(id: number): number {
        const index = this.students.findIndex((student) => student.id === id);

        if (!~index) {
            throw new UniversityError("Student not found in group");
        }

        return index;
    }

    getStudentById(id: number) : Student {
        return this.students[this.getStudentIdByGroup(id)];
    }
};
  
class Person {
    static nextId = 1;
  
    firstName: string;
    lastName: string;
    birthDay: Date;
    id: number;
    gender: string;
    contactInfo: ContactInfo;
    role: Role.student | Role.teacher;
  
    constructor(info: PersonInfo, role: Role.student | Role.teacher) {
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
    courses: CourseCollection = [];
  
    constructor(info: PersonInfo, specializations: string[] = []) {
      super(info, Role.teacher);
      this.specializations = specializations;
    }
  
    assignCourse(course: Course): void {
      this.courses.push(course);
    }
  
    removeCourse(courseName: typeof Course.name): void {
      this.courses = this.courses.filter((course) => course.name !== courseName);
    }
  
    getCourses(): CourseCollection {
      return [...this.courses];
    }
};
  
class Student extends Person {
    academicPerformance: AcademicPerformance = {
        totalCredits: 0,
        gpa: 0,
    };
    enrolledCourses: CourseCollection = [];
    status: string;
  
    constructor(info: PersonInfo) {
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

    getTotalCredits: typeof this.getAverageScore = () => this.academicPerformance.totalCredits;
  
    updateAcademicStatus(newStatus: AcademicStatus): void {
      this.status = newStatus;
    }
  
    getEnrolledCourses(): CourseCollection {
      return [...this.enrolledCourses];
    }
}
  