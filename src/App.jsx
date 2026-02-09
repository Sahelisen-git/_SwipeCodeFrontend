import { BrowserRouter,Routes,Route } from "react-router-dom"
import NavBar from "./Componenets/NavBar"
import Body from "./Componenets/Body"
import Login from "./Componenets/Login"
import Profile from "./Componenets/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Componenets/Feed"
import Connections from "./Componenets/Connections"
import Requests from "./Componenets/Requests"
import Signup from "./Componenets/Signup";
import LandingPage from "./Componenets/LandingPage";

function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
      {/* Landing page - First page users see */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Protected routes with Body layout */}
      <Route path="/" element={<Body />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/requests" element={<Requests />} />
      </Route>
    
    </Routes>
    
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
