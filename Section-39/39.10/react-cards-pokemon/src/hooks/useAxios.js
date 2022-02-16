import {useState} from 'react';
import uuid from "uuid";
import axios from "axios";

const useAxios = (url) => {
    const [dataArray, setDataArray] = useState([]);
    const addData = async (variableUrlParam) => {
        if (typeof variableUrlParam !== 'string') {
            variableUrlParam = ''
        }
        const response = await axios.get(`${url}/${variableUrlParam}`);
        setDataArray(data => [...data, { ...response.data, id: uuid() }]);
    };
    return [dataArray, addData]
}

export default useAxios;