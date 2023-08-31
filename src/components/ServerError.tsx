import {Result} from "antd";

function ServerError() {
    return (<Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
    />)
}

export default ServerError