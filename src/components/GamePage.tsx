import {Breadcrumb, Card, Carousel, Col, Image, Row, Space, Spin, Typography} from "antd";
import {useEffect, useState} from "react";
import iGameExt from "../features/iGameExt";
import {Link, useParams} from "react-router-dom";

function GamePage() {
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState({} as iGameExt)

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
            res.json().then((res) => {
                setGame(res as iGameExt)
            })
        }).catch((e) => {
            console.log(e)
        });
        return () => {
            setLoading(false)
        };
    }, [loading, gameId]);

    return (
        <div style={{width: '100%'}}>
            <Spin spinning={loading}>
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
                            <Row>
                                <Col md={4}>
                                    <Image src={game.thumbnail}></Image>
                                </Col>
                                <Col md={8}>
                                    <Typography.Title>{game.title}</Typography.Title>
                                    <Typography>{game.description}</Typography>
                                </Col>

                            </Row>
                            <Carousel autoplay>
                                {game.screenshots.map((screenshot) => (
                                    <Image src={screenshot.image}></Image>
                                ))}
                            </Carousel>
                            <Card>
                                <Space direction="vertical">
                                    <Typography.Title>System requirements</Typography.Title>
                                    <Typography>{"OS: " + game.minimum_system_requirements.os}</Typography>
                                    <Typography>{"Processor: " + game.minimum_system_requirements.processor}</Typography>
                                    <Typography>{"System memory: " + game.minimum_system_requirements.memory}</Typography>
                                    <Typography>{"Graphics: " + game.minimum_system_requirements.graphics}</Typography>
                                    <Typography>{"Disk space: " + game.minimum_system_requirements.storage}</Typography>
                                </Space>
                            </Card>
                            <Card>
                                <Space direction="vertical">
                                    <Typography.Title>Additional information</Typography.Title>
                                    <Typography>{"Publisher: " + game.publisher}</Typography>
                                    <Typography>{"Developer: " + game.developer}</Typography>
                                    <Typography>{"Genre: " + game.genre}</Typography>
                                    <Typography>{"Release date: " + game.release_date.split('-')[2] + '.' + game.release_date.split('-')[1] + '.' + game.release_date.split('-')[0]}</Typography>
                                </Space>
                            </Card>
                        </Space>
                    </Card>
                </Space>
            </Spin>
        </div>
        // </Space>
        // </Spin>
    )
}

export default GamePage