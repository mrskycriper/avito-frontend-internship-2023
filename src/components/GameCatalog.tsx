import Filter from "./Filter";
import {Card, List, Space, Spin} from "antd";
import React, {Suspense, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import iGame from "../features/iGame";
import filterStateToUrl from "../features/filterStateToUrl";
import iFilterState from "../features/iFilterState";
import {useNavigate} from "react-router-dom";
import ServerError from "./ServerError";
import {ErrorBoundary} from "react-error-boundary";

const {Meta} = Card;

function GameCatalog() {
    const filter = useSelector((state: RootState) => state.url.value)
    const [loading, setLoading] = useState(true);
    const [gameList, setGameList] = useState([] as Array<iGame>)

    const navigate = useNavigate();

    useEffect(() => {
        const url = filterStateToUrl(filter as iFilterState);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '37b5882183msh581b112b3f6e9d3p18dfc0jsn3b8cd7d38810',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        fetch(url, options).then((res) => {
            if (res.status === 200) {
                res.json().then((res) => {
                    setGameList(res as Array<iGame>)
                    setLoading(false)
                })
            } else {

            }
        }).catch((e) => {
            console.log(e)
        });
    }, [loading, filter]);

    return (
        <ErrorBoundary fallback={<ServerError/>}>
            <Space direction={"vertical"} size={"large"}>
                <Filter/>
                <Suspense fallback={<Spin/>}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            xl: 3,
                            xxl: 3
                        }}
                        pagination={{
                            position: "bottom",
                            align: "center",
                        }}
                        loading={loading}
                        dataSource={gameList}
                        renderItem={(game) => (
                            <List.Item onClick={() => navigate("/games/" + game.id.toString())}>
                                <Card hoverable loading={loading} cover={
                                    <img
                                        alt={"Cover art for " + game.title}
                                        src={game.thumbnail}
                                    />
                                } key={game.id}>
                                    <Meta
                                        title={game.title}
                                        description={"Release date: " + game.release_date.split('-')[2] + '.' + game.release_date.split('-')[1] + '.' + game.release_date.split('-')[0]}
                                        style={{textAlign: "left"}}
                                    />
                                    <Meta
                                        description={"Genre: " + game.genre}
                                        style={{textAlign: "left"}}
                                    />
                                    <Meta
                                        description={"Publisher: " + game.publisher}
                                        style={{textAlign: "left"}}
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Suspense>
            </Space>
        </ErrorBoundary>

    )
}

export default GameCatalog