import { db, auth } from './firebase';


class UserService {
    static add = async (email, password) => {
        let res = await auth.createUserWithEmailAndPassword(email, password)
        return res
    }
}

class ClassService {
    
    static getAll = async () => {
        return db.ref().child('classes').get()
    }

    static add = async (data, callback) => {
        var newKey = await db.ref().child('classes').push().key;
        var updates = {}
        updates[`/classes/${newKey}`  ] = data;
        return db.ref().update(updates, callback)
    }

    static del = async (id, callback) => {
        return db.ref(`/classes/${id}`).remove(callback)
    }
}


class StudentService {
    static getAll = async () => {
        return db.ref().child('students').get()
    }

    static add = async (id, data, callback) => {
        var updates = {}
        updates[`/students/${id}`] = data;
        updates[`/classes/${data.class}/${id}`] = true 
        return db.ref().update(updates, callback)
    }

    static del = async (id, callback) => {
        return db.ref(`/students/${id}`).remove(callback)
    }

    static getEnrolCourse = async (id) => {
        return db.ref().child('/students').child(id).child('course_enrolment').get()
    }

    static addEnrolCourse = async (id, courseId, data, callback) => {
        var updates = {}
        updates[`/students/${id}/course_enrolment/${courseId}`] = data;
        return db.ref().update(updates, callback)
    }
}

class TeacherService {
    static getAll = async () => {
        return db.ref().child('teachers').get()
    }

    static add = async (id, data, callback) => {
        var updates = {}
        updates[`/teachers/${id}`] = data;
        return db.ref().update(updates, callback)
    }

    static del = async (id, callback) => {
        return db.ref(`/teachers/${id}`).remove(callback)
    }
}

class CourseService {

    static getAll = async () => {
        return db.ref().child('courses').get();
    }

    static getById = async (id) => {
        return db.ref().child('courses').child(id).get();
    }

    static add = async (data, callback) => {
        var newKey = await db.ref().child('courses').push().key;
        var updates = {}
        updates[`/courses/${newKey}`] = data;
        // updates[`/classes/${data.class}/${newKey}`] = true 
        return db.ref().update(updates, callback)
    }

    static del = async (id, callback) => {
        return db.ref(`/courses/${id}`).remove(callback)
    }

    static addStudent = async (id, studentId, data, callback) => {
        var updates = {}
        updates[`/courses/${id}/student_enrolment/${studentId}`] = data;
        return db.ref().update(updates, callback)
    }

    static getEnroledStudents = async (id) => {
        return db.ref().child('courses').child(id).child('student_enrolment').get();
    }
}

export {
    UserService,
    ClassService,
    StudentService,
    CourseService,
    TeacherService
}