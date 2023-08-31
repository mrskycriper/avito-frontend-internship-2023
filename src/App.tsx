import './App.css';
import {Typography} from "antd";
import { Routes, Route } from "react-router-dom"
import GameCatalog from "./components/GameCatalog";
import GamePage from "./components/GamePage";

function App() {
    return (
        <div className="App">
            <header className={"App-header"}>
                <Typography.Title>Free Games</Typography.Title>
            </header>
            <div className={"App-body"}>
                <Routes>
                    <Route element={<GameCatalog/>} path={""}></Route>
                    <Route path={"games"}>
                        <Route path={":gameId"} element={<GamePage/>}></Route>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
