import axios from "axios";
import {getToken} from "./tokenStorage";

/*
BASE API
 */
const AUTH_TOKEN = 'Bearer '+getToken();

export const http = axios.create({
    // baseURL: 'http://api.les-gorgones.localhost/api',
    baseURL: 'https://0.0.0.0/api',
    timeout: 1000,
    headers: {
        'Authorization' : AUTH_TOKEN,
    }
});

/*
AUTH ROUTES
 */
export const login = (userEmail, userPassword) => {
    return http.post('/auth/login', {
        'email': userEmail,
        'password': userPassword,
    })
}

export const checkToken = () => {
    return http.get('auth/token')
}

export const logout = () => {
    return http.get('/auth/logout')
}

export const showAuthUser = () => {
     return http.get('/auth/profile')
}

export const listAuthUserDocuments = () => {
    return http.get('/auth/documents')
}

export const showAuthUserTattooist = () => {
    return http.get('/auth/tattooist')
}

/*
DOCUMENT ROUTES
 */
export const listDocuments = () => {
    return http.get('/documents')
}

export const showDocument = (documentId) => {
    return http.get(`/documents/${documentId}`)
}

export const createDocument = (document, documentCategoryId, documentUserId, documentTitle) => {
    return http.post('/documents', {
        'document': document,
        'document_category_id': documentCategoryId,
        'user_id': documentUserId,
        'title': documentTitle,
    }, {
        headers: {
            'Content-Type' : 'multipart/form-data',
        }
    })
}

export const updateDocument = (documentId, document, documentCategoryId, documentUserId, documentTitle) => {
    return http.post(`/documents/${documentId}`, {
        'document': document,
        'document_category_id': documentCategoryId,
        'user_id': documentUserId,
        'title': documentTitle,
    }, {
        headers: {
            'Content-Type' : 'multipart/form-data',
        }
    })
}

export const deleteDocument = (documentId) => {
    return http.delete(`/documents/${documentId}`)
}

/*
DOCUMENT CATEGORY ROUTES
 */
export const listDocumentCategories = () => {
    return http.get('/document-categories')
}

export const showDocumentCategory = (documentCategoryId) => {
    return http.get(`/document-categories/${documentCategoryId}`)
}

export const createDocumentCategory = (documentCategoryName, documentCategoryIsPrivate) => {
    return http.post('/document-categories', {
        'name': documentCategoryName,
        'is_private': documentCategoryIsPrivate,
    })
}

export const updateDocumentCategory = (documentCategoryId, documentCategoryName, documentCategoryIsPrivate) => {
    return http.put(`/document-categories/${documentCategoryId}`, {
        'name': documentCategoryName,
        'is_private': documentCategoryIsPrivate,
    })
}

export const deleteDocumentCategory = (documentCategoryId) => {
    return http.delete(`/document-categories/${documentCategoryId}`)
}

/*
PICTURE ROUTES
 */
export const listPictures = () => {
    return http.get('/pictures')
}

export const showPicture = (pictureId) => {
    return http.get(`/pictures/${pictureId}`)
}

export const createPicture = (picture, pictureTattooistId, pictureIsMain, pictureIsVisible) => {
    return http.post('/pictures', {
        'picture': picture,
        'tattooist_id': pictureTattooistId,
        'is_main': pictureIsMain,
        'is_visible': pictureIsVisible,
    }, {
        headers: {
            'Content-Type' : 'multipart/form-data',
        }
    })
}

export const updatePicture = (pictureId, picture, pictureIsMain, pictureIsVisible) => {
    return http.post(`/pictures/${pictureId}`, {
        'picture': picture,
        'is_main': pictureIsMain,
        'is_visible': pictureIsVisible,
    }, {
        headers: {
            'Content-Type' : 'multipart/form-data',
        }
    })
}

export const deletePicture = (pictureId) => {
    return http.delete(`/pictures/${pictureId}`)
}

/*
SOCIAL NETWORK ROUTES
 */
export const listSocialNetworks = () => {
    return http.get('/social-networks')
}

export const showSocialNetwork = (socialNetworkId) => {
    return http.get(`/social-networks/${socialNetworkId}`)
}

export const createSocialNetwork = (socialNetworkName) => {
    return http.post('/social-networks', {
        'name': socialNetworkName,
    })
}

export const updateSocialNetwork = (socialNetworkId, socialNetworkName) => {
    return http.put(`/social-networks/${socialNetworkId}`, {
        'name': socialNetworkName,
    })
}

export const deleteSocialNetwork = (socialNetworkId) => {
    return http.delete(`/social-networks/${socialNetworkId}`)
}

/*
TATTOOIST SOCIAL NETWORK ROUTES
 */
export const listTattooistsSocialNetworks = () => {
    return http.get('/social-networks-tattooists')
}

export const showTattooistSocialNetwork = (tattooistSocialNetworkId) => {
    return http.get(`/social-networks-tattooists/${tattooistSocialNetworkId}`)
}

export const createTattooistSocialNetwork = (tattooistId, socialNetworkId, tattooistSocialNetworkUrl) => {
    return http.post('/social-networks-tattooists', {
        'tattooist_id': tattooistId,
        'social_network_id': socialNetworkId,
        'url': tattooistSocialNetworkUrl,
    })
}

export const updateTattooistSocialNetwork = (tattooistSocialNetworkId, tattooistSocialNetworkUrl) => {
    return http.put(`/social-networks-tattooists/${tattooistSocialNetworkId}`, {
        'id': tattooistSocialNetworkId,
        'url': tattooistSocialNetworkUrl,
    })
}

export const deleteTattooistSocialNetwork = (tattooistSocialNetworkId) => {
    return http.delete(`/social-networks-tattooists/${tattooistSocialNetworkId}`)
}

/*
SUBSCRIBER ROUTES
 */
export const listSubscribers = () => {
    return http.get('/subscribers')
}

export const showSubscriber = (subscriberId) => {
    return http.get(`/subscribers/${subscriberId}`)
}

export const createSubscriber = (subscriberEmail) => {
    return http.post('/subscribers', {
        'email': subscriberEmail,
    })
}

export const updateSubscriber = (subscriberId, subscriberEmail) => {
    return http.put(`/subscribers/${subscriberId}`, {
        'email': subscriberEmail,
    })
}

export const deleteSubscriber = (subscriberId) => {
    return http.delete(`/subscribers/${subscriberId}`)
}

/*
TATTOOIST ROUTES
 */
export const listTattooists = () => {
    return http.get('/tattooists')
}

export const showTattooist = (tattooistId) => {
    return http.get(`/tattooists/${tattooistId}`)
}

export const createTattooist = (tattooistIsResident, tattooistIsActive, tattooistName, tattooistEmail, tattooistDescription) => {
    return http.post('/tattooists', {
        'is_resident': tattooistIsResident,
        'is_active': tattooistIsActive,
        'name': tattooistName,
        'email': tattooistEmail,
        'description': tattooistDescription,
    })
}

export const updateTattooist = (tattooistId, tattooistIsResident, tattooistIsActive, tattooistName, tattooistEmail, tattooistDescription) => {
    return http.put(`/tattooists/${tattooistId}`, {
        'is_resident': tattooistIsResident,
        'is_active': tattooistIsActive,
        'name': tattooistName,
        'email': tattooistEmail,
        'description': tattooistDescription,
    })
}

export const deleteTattooist = (tattooistId) => {
    return http.delete(`/tattooists/${tattooistId}`)
}

export const listTattooistPictures = (tattooistId, isMain) => {
    return http.get(`/tattooists/${tattooistId}/pictures/${isMain}`)
}

export const listTattooistSocialNetworks = (tattooistId) => {
    return http.get(`/tattooists/${tattooistId}/social-networks`)
}

export const listTattooistWorkplaces = (tattooistId) => {
    return http.get(`/tattooists/${tattooistId}/workplaces`)
}

/*
TATTOOIST WORKPLACE ROUTES
 */
export const listTattooistsWorkplaces = () => {
    return http.get('/tattooists-workplaces')
}

export const showTattooistWorkplace = (tattooistWorkplaceId) => {
    return http.get(`/tattooists-workplaces/${tattooistWorkplaceId}`)
}

export const createTattooistWorkplace = (tattooistWorkplaceWorkplaceId, tattooistWorkplaceTattooistId, tattooistWorkplaceStartDate, tattooistWorkplaceEndDate) => {
    return http.post('/tattooists-workplaces', {
        'workplace_id': tattooistWorkplaceWorkplaceId,
        'tattooist_id': tattooistWorkplaceTattooistId,
        'start_date': tattooistWorkplaceStartDate,
        'end_date': tattooistWorkplaceEndDate,
    })
}

export const updateTattooistWorkplace = (tattooistWorkplaceId, tattooistWorkplaceWorkplaceId, tattooistWorkplaceTattooistId, tattooistWorkplaceStartDate, tattooistWorkplaceEndDate) => {
    return http.put(`/tattooists-workplaces/${tattooistWorkplaceId}`, {
        'workplace_id': tattooistWorkplaceWorkplaceId,
        'tattooist_id': tattooistWorkplaceTattooistId,
        'start_date': tattooistWorkplaceStartDate,
        'end_date': tattooistWorkplaceEndDate,
    })
}

export const deleteTattooistWorkplace = (tattooistWorkplaceId) => {
    return http.delete(`/tattooists-workplaces/${tattooistWorkplaceId}`)
}

/*
USER ROUTES
 */
export const listUsers = () => {
    return http.get('/users')
}

export const showUser = (userId) => {
    return http.get(`/users/${userId}`)
}

export const createUser = (userTattooistId, userIsAdmin, userFirstName, userLastName, userEmail) => {
    return http.post('/users', {
        'tattooist_id': userTattooistId,
        'is_admin': userIsAdmin,
        'first_name': userFirstName,
        'last_name': userLastName,
        'email': userEmail,
        'password': 'P@ssword2022',
    })
}

export const updateUser = (userId, userTattooistId, userIsAdmin, userFirstName, userLastName, userEmail) => {
    return http.put(`/users/${userId}`, {
        'tattooist_id': userTattooistId,
        'is_admin': userIsAdmin,
        'first_name': userFirstName,
        'last_name': userLastName,
        'email': userEmail,
    })
}

export const deleteUser = (userId) => {
    return http.delete(`/users/${userId}`)
}

export const listUserDocuments = (userId) => {
    return http.get(`/tattooists/${userId}/documents`)
}

export const showUserTattooist = (userId) => {
    return http.get(`/tattooists/${userId}/tattooist`)
}

/*
WORKPLACE ROUTES
 */
export const listWorkplaces = () => {
    return http.get('/workplaces')
}

export const showWorkplace = (workplaceId) => {
    return http.get(`/workplaces/${workplaceId}`)
}

export const createWorkplace = (workplaceNumber, workplaceIsPmr) => {
    return http.post('/workplaces', {
        'number': workplaceNumber,
        'is_pmr': workplaceIsPmr,
    })
}

export const updateWorkplace = (workplaceId, workplaceNumber, workplaceIsPmr) => {
    return http.put(`/workplaces/${workplaceId}`, {
        'number': workplaceNumber,
        'is_pmr': workplaceIsPmr,
    })
}

export const deleteWorkplace = (workplaceId) => {
    return http.delete(`/workplaces/${workplaceId}`)
}