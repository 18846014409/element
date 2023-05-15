import http from "@/utils/request"


// 获取学员列表

/**
 * 
 * @param {Object} params 一个请求列表参数对象 page count class这三个属性 
 * @returns 
 */

export const getStuListApi = (params) => http.get('/students/getstulist', {
    params
})


//增加学员信息

export const addStuApi = data => http.post('/students/addstu', data)


//删除学员信息

export const delStuApi = sId => http.get('/students/delstu?sId=' + sId)


//修改学员信息

export const editStuApi = data => http.post('/students/updatestu', data)


//搜索学员

export const searchStuApi = params => http.get('/students/searchstu', {
    params
})


//上传学员头像

// export const uploadStuAvatarApi = data => http.post('/students/uploadStuAvatar', data)