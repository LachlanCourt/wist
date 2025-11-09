import { Route, Routes } from "react-router";
import { Home } from "./pages/GameInit/Home";
import { GameController } from "./pages/Game/GameController";

const App = () => {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/:gameId" index element={<GameController />} />
    </Routes>
  );
};

export default App;
