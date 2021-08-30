import axios from 'axios'

export default function getItem(item: string): Promise<any> {
    return axios.get(`/back/${item}`)
}

export function postItem(item: string): Promise<any> {
    return axios.post(`/back/${item}`)
}