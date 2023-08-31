import './App.css';
import {Typography} from "antd";
import { Routes, Route } from "react-router-dom"
import GameCatalog from "./components/GameCatalog";
import GamePage from "./components/GamePage";
import {ErrorBoundary} from "react-error-boundary";
import GeneralError from "./components/GeneralError";

function App() {
    return (
        <div className="App">
            <header className={"App-header"}>
                <Typography.Title>Free Games</Typography.Title>
            </header>
            <div className={"App-body"}>
                <ErrorBoundary fallback={<GeneralError/>}>
                    <Routes>
                        <Route element={<GameCatalog/>} path={""}></Route>
                        <Route path={"games"}>
                            <Route path={":gameId"} element={<GamePage/>}></Route>
                        </Route>
                    </Routes>
                </ErrorBoundary>
            </div>
        </div>
    );
}

export default App;
