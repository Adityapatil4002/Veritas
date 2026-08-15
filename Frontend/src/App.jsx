import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";

function App() {
  return (
    <InterviewProvider>
      <RouterProvider router={router} />
    </InterviewProvider>
  );
}

export default App;
