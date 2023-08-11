import api from '../https'


// 创建模型
export const createAgentApi = (body) => api.post('/agent/create', body)

// 获取模型信息
export const getAgentApi = (body) => api.post('/agent/get', body)

// 获取模型列表
export const getAgentListApi = (body) => api.post('/agent/list', body)

// 删除模型
export const deleteAgentApi = (body) => api.post('/agent/delete', body)

// 上传模型头像
// export const avatarUploadApi = (body, header) => api.post('/avatar/upload', body, header)
export const avatarUploadApi = (body, header) => api.post('/avatar/2upload', body, header)


// 创建或者重置消息
export const createSessionApi = (body) => api.post('/session/create', body)

// 回溯消息
export const withdrawMsgApi = (body) => api.post('/message/withdraw', body)

// 回复消息
export const generateMsgApi = (body) => api.post('/message/generate', body)
