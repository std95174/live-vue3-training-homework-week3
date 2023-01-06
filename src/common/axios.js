import axios from "axios";

export const instance = axios.create({
    baseURL: "https://vue3-course-api.hexschool.io/v2",
})
