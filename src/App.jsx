import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import AdminRegisterPage from "./pages/admin/AdminRegisterPage";
import ChooseUser from "./pages/ChooseUser";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AddStudent from "./pages/admin/studentRelated/AddStudent";
import SeeComplains from "./pages/admin/studentRelated/SeeComplains";
import ShowStudents from "./pages/admin/studentRelated/ShowStudents";
import StudentAttendance from "./pages/admin/studentRelated/StudentAttendance";
import StudentExamMarks from "./pages/admin/studentRelated/StudentExamMarks";
import ViewStudent from "./pages/admin/studentRelated/ViewStudent";
import AddNotice from "./pages/admin/noticeRelated/AddNotice";
import ShowNotices from "./pages/admin/noticeRelated/ShowNotices";
import ShowSubjects from "./pages/admin/subjectRelated/ShowSubjects";
import SubjectForm from "./pages/admin/subjectRelated/SubjectForm";
import ViewSubject from "./pages/admin/subjectRelated/ViewSubject";
import AddTeacher from "./pages/admin/teacherRelated/AddTeacher";
import ChooseClass from "./pages/admin/teacherRelated/ChooseClass";
import ChooseSubject from "./pages/admin/teacherRelated/ChooseSubject";
import ShowTeachers from "./pages/admin/teacherRelated/ShowTeachers";
import TeacherDetails from "./pages/admin/teacherRelated/TeacherDetails";
import AddClass from "./pages/admin/classRelated/AddClass";
import ClassDetails from "./pages/admin/classRelated/ClassDetails";
import ShowClasses from "./pages/admin/classRelated/ShowClasses";
import Logout from "./pages/Logout";
import TeacherHomePage from "./pages/teacher/TeacherHomePage";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherComplain from "./pages/teacher/TeacherComplain";
import TeacherClassDetails from "./pages/teacher/TeacherClassDetails";
import TeacherViewStudent from "./pages/teacher/TeacherViewStudent";
import StudentHomePage from "./pages/student/StudentHomePage";
import StudentProfile from "./pages/student/StudentProfile";
import StudentSubjects from "./pages/student/StudentSubjects";
import ViewStdAttendance from "./pages/student/ViewStdAttendance";
import StudentComplain from "./pages/student/StudentComplain";
import Dashboard from "./pages/Dashboard/Dashbard";
import TimeTable from "./pages/admin/timeTable/TimeTable";
import Exams from "./pages/admin/exams/Exams";
import Result from "./pages/admin/result/Result";
import Fees from "./pages/admin/fees/Fees";
import Library from "./pages/admin/library/Library";
import Transport from "./pages/admin/transport/Transport";
import Reports from "./pages/admin/reports/Reports";
import Setting from "./pages/admin/setting/Setting";
import StudentTimetable from "./pages/student/timetable/StudentTimetable";
import Assignments from "./pages/student/assignments/Assignments";
import StudentExams from "./pages/student/exams/Exams";
import StudentResult from "./pages/student/result/StudentResult";
import StudentFees from "./pages/student/fees/StudentFees";
import StudentLibrary from "./pages/student/library/Library";
import TeacherTimeTable from "./pages/teacher/timeTable/TeacherTimeTable";
import Attendence from "./pages/teacher/attendence/Attendence";
import TeacherAssignments from "./pages/teacher/assignments/TeacherAssignments";
import TeacherGrads from "./pages/teacher/grades/TeacherGrads";
import TeacherExam from "./pages/teacher/exam/TeacherExam";

const App = () => {
  const { currentRole } = useSelector((state) => state.user);

  return (
    <Router>
      {currentRole === null && (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route
            path="/chooseasguest"
            element={<ChooseUser visitor="guest" />}
          />
          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />
          <Route path="/Adminregister" element={<AdminRegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      {currentRole === "Admin" && (
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<AdminHomePage />} />
            <Route path="/Admin/dashboard" element={<AdminHomePage />} />
            <Route path="/Admin/profile" element={<AdminProfile />} />
            <Route path="/Admin/complains" element={<SeeComplains />} />
            {/* Notices */}
            <Route path="/Admin/addnotice" element={<AddNotice />} />
            <Route path="/Admin/notices" element={<ShowNotices />} />
            {/* Subjects */}
            <Route path="/Admin/subjects" element={<ShowSubjects />} />
            <Route
              path="/Admin/subjects/subject/:classID/:subjectID"
              element={<ViewSubject />}
            />
            <Route
              path="/Admin/subjects/chooseclass"
              element={<ChooseClass situation="Subject" />}
            />
            <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
            <Route
              path="/Admin/class/subject/:classID/:subjectID"
              element={<ViewSubject />}
            />
            <Route
              path="/Admin/subject/student/attendance/:studentID/:subjectID"
              element={<StudentAttendance situation="Subject" />}
            />
            <Route
              path="/Admin/subject/student/marks/:studentID/:subjectID"
              element={<StudentExamMarks situation="Subject" />}
            />
            {/* Classes */}
            <Route path="/Admin/addclass" element={<AddClass />} />
            <Route path="/Admin/classes" element={<ShowClasses />} />
            <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
            <Route
              path="/Admin/class/addstudents/:id"
              element={<AddStudent situation="Class" />}
            />
            {/* Students */}
            <Route
              path="/Admin/addstudents"
              element={<AddStudent situation="Student" />}
            />
            <Route path="/Admin/students" element={<ShowStudents />} />
            <Route
              path="/Admin/students/student/:id"
              element={<ViewStudent />}
            />
            <Route
              path="/Admin/students/student/attendance/:id"
              element={<StudentAttendance situation="Student" />}
            />
            <Route
              path="/Admin/students/student/marks/:id"
              element={<StudentExamMarks situation="Student" />}
            />
            {/* Teachers */}
            <Route path="/Admin/teachers" element={<ShowTeachers />} />
            <Route
              path="/Admin/teachers/teacher/:id"
              element={<TeacherDetails />}
            />
            <Route
              path="/Admin/teachers/chooseclass"
              element={<ChooseClass situation="Teacher" />}
            />
            <Route
              path="/Admin/teachers/choosesubject/:id"
              element={<ChooseSubject situation="Norm" />}
            />
            <Route
              path="/Admin/teachers/choosesubject/:classID/:teacherID"
              element={<ChooseSubject situation="Teacher" />}
            />
            <Route
              path="/Admin/teachers/addteacher/:id"
              element={<AddTeacher />}
            />

            {/* TimeTable */}
            <Route path="/Admin/timetable" element={<TimeTable />} />

            {/* Exams */}
            <Route path="/Admin/exams" element={<Exams />} />
            {/* Results */}
            <Route path="/Admin/results" element={<Result />} />
            {/* Fees */}
            <Route path="/Admin/fees" element={<Fees />} />
            {/* Library */}
            <Route path="/Admin/library" element={<Library />} />
            {/* Transport */}
            <Route path="/Admin/transport" element={<Transport />} />
            {/* Reports */}
            <Route path="/Admin/reports" element={<Reports />} />
            {/* Setting */}
            <Route path="/Admin/settings" element={<Setting />} />

            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}

      {currentRole === "Student" && (
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<StudentHomePage />} />
            <Route path="/Student/dashboard" element={<StudentHomePage />} />
            <Route path="/Student/profile" element={<StudentProfile />} />
            <Route path="/Student/subjects" element={<StudentSubjects />} />
            <Route path="/Student/attendance" element={<ViewStdAttendance />} />
            <Route path="/Student/complain" element={<StudentComplain />} />
            <Route path="/Student/timetable" element={<StudentTimetable />} />
            <Route path="/Student/assignments" element={<Assignments />} />
            <Route path="/Student/exams" element={<StudentExams />} />
            <Route path="/Student/results" element={<StudentResult />} />
            <Route path="/Student/fees" element={<StudentFees />} />
            <Route path="/Student/library" element={<StudentLibrary />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}

      {currentRole === "Teacher" && (
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<TeacherHomePage />} />
            <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
            <Route path="/Teacher/profile" element={<TeacherProfile />} />
            <Route path="/Teacher/complain" element={<TeacherComplain />} />
            <Route path="/Teacher/class" element={<TeacherClassDetails />} />
            <Route path="/Teacher/timetable" element={<TeacherTimeTable />} />
            <Route path="/Teacher/attendance" element={<Attendence />} />
            <Route path="/Teacher/assignments" element={<TeacherAssignments />} />
            <Route path="/Teacher/grades" element={<TeacherGrads />} />
            <Route path="/Teacher/exams" element={<TeacherExam />} />
            <Route
              path="/Teacher/class/student/:id"
              element={<TeacherViewStudent />}
            />
            <Route
              path="/Teacher/class/student/attendance/:studentID/:subjectID"
              element={<StudentAttendance situation="Subject" />}
            />
            <Route
              path="/Teacher/class/student/marks/:studentID/:subjectID"
              element={<StudentExamMarks situation="Subject" />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </Router>
  );
};

export default App;
