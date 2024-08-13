import axios from 'axios'
import { BASE_URL } from './api-path'

function getTokenHeader() {
    return { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
}

async function handleRequest(method, path, body = null, useToken = true) {
    try {
        const response = await axios({
            method,
            url: `${BASE_URL}${path}`,
            data: body,
            ...(useToken ? getTokenHeader() : {})
        })
        return response
    } catch (err) {
        console.error('API Error:', err.response.data.message)
        throw err
    }
}

export async function sendGetRequest(path, useToken = true) {
    return await handleRequest('get', path, null, useToken)
}

export async function sendPostRequest(path, body, useToken = true) {
    return await handleRequest('post', path, body, useToken)
}

export async function sendPutRequest(path, body, useToken = true) {
    return await handleRequest('put', path, body, useToken)
}

export async function sendDeleteRequest(path, useToken = true) {
    return await handleRequest('delete', path, null, useToken)
}