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
        return db.ref().child('students').child(id).child('course_enrolment').get()
    }

    static addEnrolCourse = async (id, courseId, data, callback) => {
        var updates = {}
        updates[`/students/${id}/course_enrolment/${courseId}`] = data;
        return db.ref().update(updates, callback)
    }
    
    static removeEnrolCourse = async (id, courseID, callback) => {
        return db.ref(`/students/${id}/course_enrolment/${courseID}`).remove(callback)
    }

    static updateCourseScore = async (id, courseId, data, callback) => {
        return db.ref(`/students/${id}/course_enrolment/${courseId}/score`).set(data, callback)
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

    static getEnrolCourse = async (id) => {
        return db.ref().child('teachers').child(id).child('course_enrolment').get()
    }

    static addEnrolCourse = async (id, courseId, data, callback) => {
        var updates = {}
        updates[`/teachers/${id}/course_enrolment/${courseId}`] = data;
        return db.ref().update(updates, callback)
    }    

    static removeEnrolCourse = async (id, courseID, callback) => {
        return db.ref(`/teachers/${id}/course_enrolment/${courseID}`).remove(callback)
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

    static removeStudent = async (id, studentId, callback) => {
        return db.ref(`/courses/${id}/student_enrolment/${studentId}`).remove(callback)
    }

    static getEnroledStudents = async (id) => {
        return db.ref().child('courses').child(id).child('student_enrolment').get();
    }

    static addLecturer = async (id, teacherId, data, callback) => {
        var updates = {}
        updates[`/courses/${id}/lecturers/${teacherId}`] = data;
        return db.ref().update(updates, callback)
    }

    static removeLecturer = async (id, teacherId, callback) => {
        return db.ref(`/courses/${id}/lecturers/${teacherId}`).remove(callback)
    }


    static getReference = async (id, data, callback) => {
        return 
    }

    static addReference = async (id, data, callback) => {
        var newKey = await db.ref(`/courses/${id}/references`).push().key;
        var updates = {};
        updates[`/courses/${id}/references/${newKey}`] = data
        return db.ref().update(updates, callback)
    }

    static updateReference = async (id, referenceId, data, callback) => {
        await db.ref(`/courses/${id}/references/${referenceId}`).update(data, callback)
    }

    static removeReference = async (id, referenceId, callback) => {
       return await db.ref(`/courses/${id}/references/${referenceId}`).remove(callback)
    }

    static updateStudentScore = async (id, studentId, data, callback) => {
        await db.ref(`/courses/${id}/student_enrolment/${studentId}/score`).set(data, callback)
    }
}

export {
    UserService,
    ClassService,
    StudentService,
    CourseService,
    TeacherService
}