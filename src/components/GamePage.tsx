import {Breadcrumb, Card, Carousel, Col, Image, Row, Space, Spin, Typography} from "antd";
import {Suspense, useEffect, useState} from "react";
import iGameExt from "../features/iGameExt";
import {Link, useParams} from "react-router-dom";

const {Meta} = Card;

const gameTemplate: iGameExt = {
    "id": 1,
    "title": "",
    "thumbnail": "",
    "status": "",
    "short_description": "",
    "description": "",
    "game_url": "",
    "genre": "",
    "platform": "",
    "publisher": "",
    "developer": " Ward",
    "release_date": "",
    "freetogame_profile_url": "",
    "minimum_system_requirements": {
        "os": "",
        "processor": "",
        "memory": "",
        "graphics": "",
        "storage": ""
    },
    "screenshots": [{
        "id": 1,
        "image": ""
    }]
}

function GamePage() {
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState(gameTemplate as iGameExt)

    let {gameId} = useParams();

    useEffect(() => {
        const url = "https://free-to-play-games-database.p.rapidapi.com/api/game?id=" + gameId;
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
                    setGame(res as iGameExt)
                    setLoading(false)
                    console.log(res)
                })
            }
        }).catch((e) => {
            console.log(e)
        });
    }, [loading, gameId]);

    return (
        <div style={{width: '100%'}}>
            <Suspense fallback={<Spin/>}>
                <Space direction="vertical" style={{width: '100%'}}>
                    <Breadcrumb items={[
                        {
                            title: <Link to="/">Game catalog</Link>,
                            key: 'home',
                        },
                        {
                            title: <Link to={"/games/" + game.id}>{game.title}</Link>,
                            key: 'game',
                        }
                    ]}/>
                    <Card>

                        <Space direction="vertical">
                            <Image src={game.thumbnail}></Image>
                            <Typography.Title>{game.title}</Typography.Title>
                            <Typography style={{textAlign: "left"}}>{game.description}</Typography>
                            <Card>
                                <Space direction="vertical">
                                    <Typography.Title>Screenshots</Typography.Title>
                                    {game.screenshots.map((screenshot) => (
                                        <Image src={screenshot.image} key={screenshot.id}
                                               style={{maxWidth: "300px"}}></Image>
                                    ))}
                                </Space>
                            </Card>
                            <Card>
                                <Space direction="vertical">
                                    <Typography.Title>System requirements</Typography.Title>
                                    <Typography
                                        style={{textAlign: "left"}}>{"OS: " + game.minimum_system_requirements.os}</Typography>
                                    <Typography
                                        style={{textAlign: "left"}}>{"Processor: " + game.minimum_system_requirements.processor}</Typography>
                                    <Typography
                                        style={{textAlign: "left"}}>{"System memory: " + game.minimum_system_requirements.memory}</Typography>
                                    <Typography
                                        style={{textAlign: "left"}}>{"Graphics: " + game.minimum_system_requirements.graphics}</Typography>
                                    <Typography
                                        style={{textAlign: "left"}}>{"Disk space: " + game.minimum_system_requirements.storage}</Typography>
                                </Space>
                            </Card>
                            <Card>
                                <Space direction="vertical">
                                    <Typography.Title>Additional information</Typography.Title>
                                    <Typography
                                        style={{textAlign: "left"}}>{"Publisher: " + game.publisher}</Typography>
                                    <Typography
                                        style={{textAlign: "left"}}>{"Developer: " + game.developer}</Typography>
                                    <Typography style={{textAlign: "left"}}>{"Genre: " + game.genre}</Typography>
                                    <Typography
                                        style={{textAlign: "left"}}>{"Release date: " + game.release_date.split('-')[2] + '.' + game.release_date.split('-')[1] + '.' + game.release_date.split('-')[0]}</Typography>
                                </Space>
                            </Card>
                        </Space>
                    </Card>
                </Space>
            </Suspense>
        </div>
        // </Space>
        // </Spin>
    )
}

export default GamePage