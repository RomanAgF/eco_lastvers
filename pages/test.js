import {DateTime, Interval} from "luxon";
import {useState} from "react"
import axios from "axios";

export default function Test() {
    const now = {
        timeNow: DateTime.now().toISO(),
        utcTime: DateTime.utc().toISO(),
        localTime: DateTime.local().toISO()
    }

    const plus30 = {
        timeNow: DateTime.now().plus({seconds: 30}).toISO(),
        utcTime: DateTime.utc().plus({seconds: 30}).toISO(),
        localTime: DateTime.local().plus({seconds: 30}).toISO()
    }

    const [fromBackend, setFromBackend] = useState({
        now: {timeNow: null, utcTime: null, localTime: null},
        plus30: {timeNow: null, utcTime: null, localTime: null}
    })

    function onClick() {
        axios.get('/api/test').then((res) => setFromBackend(res.data));
    }

    return <div className="p-3">
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            rel="stylesheet"
            crossOrigin="anonymous"
        />
        <h3>Local</h3>
        <table className="table table-striped">
            <thead className="table-dark">
            <tr>
                <th scope="col">Variable</th>
                <th scope="col">Value</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">timeNow</th>
                <td>{now.timeNow}</td>
            </tr>
            <tr>
                <th scope="row">utcTime</th>
                <td>{now.utcTime}</td>
            </tr>
            <tr>
                <th scope="row">localTime</th>
                <td>{now.localTime}</td>
            </tr>
            <tr>
                <th scope="row">timeNow+30</th>
                <td>{plus30.timeNow}</td>
            </tr>
            <tr>
                <th scope="row">utcTime+30</th>
                <td>{plus30.utcTime}</td>
            </tr>
            <tr>
                <th scope="row">localTime+30</th>
                <td>{plus30.localTime}</td>
            </tr>
            </tbody>
        </table>

        <h3>backend</h3>
        <table className="table table-striped">
            <thead className="table-dark">
            <tr>
                <th scope="col">Variable</th>
                <th scope="col">Value</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">timeNow</th>
                <td>{fromBackend.now.timeNow}</td>
            </tr>
            <tr>
                <th scope="row">utcTime</th>
                <td>{fromBackend.now.utcTime}</td>
            </tr>
            <tr>
                <th scope="row">localTime</th>
                <td>{fromBackend.now.localTime}</td>
            </tr>
            <tr>
                <th scope="row">timeNow+30</th>
                <td>{fromBackend.plus30.timeNow}</td>
            </tr>
            <tr>
                <th scope="row">utcTime+30</th>
                <td>{fromBackend.plus30.utcTime}</td>
            </tr>
            <tr>
                <th scope="row">localTime+30</th>
                <td>{fromBackend.plus30.localTime}</td>
            </tr>
            </tbody>
        </table>

        <h3>Difference</h3>
        <table className="table table-striped">
            <thead className="table-dark">
            <tr>
                <th scope="col">Variable</th>
                <th scope="col">Value</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">timeNow</th>
                <td>{Interval.fromDateTimes(
                    DateTime.fromISO(now.timeNow),
                    DateTime.fromISO(fromBackend.now.timeNow)
                ).length("seconds")}</td>
            </tr>
            <tr>
                <th scope="row">utcTime</th>
                <td>{Interval.fromDateTimes(
                    DateTime.fromISO(now.utcTime),
                    DateTime.fromISO(fromBackend.now.utcTime)
                ).length("seconds")}</td>
            </tr>
            <tr>
                <th scope="row">localTime</th>
                <td>{Interval.fromDateTimes(
                    DateTime.fromISO(now.localTime),
                    DateTime.fromISO(fromBackend.now.localTime)
                ).length("seconds")}</td>
            </tr>
            <tr>
                <th scope="row">timeNow+30</th>
                <td>{Interval.fromDateTimes(
                    DateTime.fromISO(now.timeNow),
                    DateTime.fromISO(fromBackend.plus30.timeNow)
                ).length("seconds")}</td>
            </tr>
            <tr>
                <th scope="row">utcTime+30</th>
                <td>{Interval.fromDateTimes(
                    DateTime.fromISO(now.utcTime),
                    DateTime.fromISO(fromBackend.plus30.utcTime)
                ).length("seconds")}</td>
            </tr>
            <tr>
                <th scope="row">localTime+30</th>
                <td>{Interval.fromDateTimes(
                    DateTime.fromISO(now.localTime),
                    DateTime.fromISO(fromBackend.plus30.localTime)
                ).length("seconds")}</td>
            </tr>
            </tbody>
        </table>
        <button onClick={onClick}>TEST</button>
    </div>
}