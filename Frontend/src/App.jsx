import Navbar from "./components/Navbar";
import Hero from "./pages/hero";

function App(){
  return(
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <Hero />
    </div>
  )
}

export default App;
