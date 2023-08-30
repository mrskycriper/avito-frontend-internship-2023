import React, {useEffect, useState} from 'react';
import './App.css';
import {Card, List, Typography} from "antd";
import Filter from "./components/Filter";

const {Meta} = Card;

interface IGame {
    "id": number,
    "title": string,
    "thumbnail": string,
    "short_description": string,
    "game_url": string,
    "genre": string,
    "platform": string,
    "publisher": string,
    "developer": string,
    "release_date": string,
    "freetogame_profile_url": string
}

function App() {
    const [loading, setLoading] = useState(true);
    const [gameList, setGameList] = useState([] as Array<IGame>)

    useEffect(() => {
        const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '37b5882183msh581b112b3f6e9d3p18dfc0jsn3b8cd7d38810',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        fetch(url, options).then((res) => {
            res.json().then((res) => {
                setGameList(res as Array<IGame>)
            })
        }).catch((e) => {
            console.log(e)
        });
        return () => {
            setLoading(false)
        };
    }, [loading]);

    return (
        <div className="App">
            <header className={"App-header"}>
                <Typography.Title>Free Games</Typography.Title>
            </header>
            <div className={"App-body"}>
                <Filter/>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        xl: 4,
                        xxl: 4
                    }}
                    pagination={{
                        position: "top",
                        align: "center",
                        style: {
                            marginTop: "0",
                            marginBottom: "24px"
                        }
                    }}
                    loading={loading}
                    dataSource={gameList}
                    style={{boxSizing: "border-box"}}
                    renderItem={(game) => (
                        <List.Item style={{boxSizing: "border-box"}}>
                            <Card loading={loading} cover={
                                <img
                                    alt={"Cover art for " + game.thumbnail}
                                    src={game.thumbnail}
                                />
                            } key={game.id}>
                                <Meta
                                    title={game.title}
                                    description={"Дата выхода: " + game.release_date.split('-')[2] + '.' + game.release_date.split('-')[1] + '.' + game.release_date.split('-')[0]}
                                    style={{textAlign: "left"}}
                                />
                                <Meta
                                    description={"Жанр: " + game.genre}
                                    style={{textAlign: "left"}}
                                />
                                <Meta
                                    description={"Издатель: " + game.publisher}
                                    style={{textAlign: "left"}}
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default App;
