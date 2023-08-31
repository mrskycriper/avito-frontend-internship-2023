import {Result} from "antd";

function GeneralError() {
    return (<Result
        status="warning"
        title="Error"
        subTitle="Sorry, something went wrong."
    />)
}

export default GeneralError