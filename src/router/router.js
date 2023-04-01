import Login  from "../components/login";
import Signup from "../components/signup";
import ProtectedRoute from "../config/ProtectedRoute";
import { BrowserRouter, Route, Routes,} from "react-router-dom";
import SModal from "../components/SModal";
import MenuAppBar from "../dashboard/dashboard";
import Studentsdashboard from "../dashboard/Students";
import Institutedashboard from '../dashboard/Institute'
import Admindashboard from "../dashboard/Admin";
import Course from "../components/Course";
import QuizForm from "../components/QuizForm";
import QuizDetail from "../components/QuizDetail";
import CheckAdmin from "../dashboard/CheckAdmin";
import Quiz from "../components/Quiz";
import ShowRegistration from "../dashboard/showRegistration";

function AppRouter() {
  return (
    <>
    <BrowserRouter>
   <Routes>
   <Route path="/" element={<MenuAppBar/>}/>
   <Route path='/admin' element={<CheckAdmin />} />
   <Route path='/a1ae0493-7826-43b9-90ae-76750cb43f09' element={<CheckAdmin />} />

   <Route path="/Students" element={<ProtectedRoute Component={Studentsdashboard} />}/>
   <Route path='/showReg' element={<ShowRegistration />} />
   <Route path="/Institute" element={<ProtectedRoute Component={Institutedashboard} />}/>
   <Route path="/Admin" element={<ProtectedRoute Component={Admindashboard} />}/>
   <Route path='/course' element={<Course />} />
   <Route path='/quiz' element={<Quiz />} />
   <Route path='/quizform' element={<QuizForm />} />
   <Route path='/quizdetail' element={<QuizDetail />} />
   <Route path="login" element={<Login/>}/>
   <Route path="signup" element={<Signup/>}/>
   <Route path="SModal" element={<SModal/>}/>
    </Routes> 
    </BrowserRouter>
    </>
  );
}
export default AppRouter;
