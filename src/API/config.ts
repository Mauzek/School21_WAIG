// export const BASE_API = "http://localhost:8080";

// export const endpoints = {
//   //Auth/Registraion Endpoints
//   registration: `${BASE_API}/auth/register`, // post
//   /* registration (Body)
//     { 
//         "userName": "john_doe",
//         "firstName": "John",
//         "lastName": "Doe",
//         "password": "securePassword123",
//         "email": "elenabozko1210@gmail.com",
//         "gender": "Male",
//         "tgName": "john_doe_tg",
//         "birthDay": "1990-01-15"
//     }  
//   */
//   auth: `${BASE_API}/auth/sign-in`, // post (Body) {"username":"john_doe","password":"securePassword123"}
//   refreshToken: `${BASE_API}/auth/refresh`, //post
//   getUser: `${BASE_API}/api/user/`, //post //http://localhost:8080/api/user/{login}

//   //Admin Endpoints
//   adminGetAllUsers: `${BASE_API}/admin/users`, //get
//   adminGetAllGroups: `${BASE_API}/admin/groups`, //get
//   adminGetAllInterests: `${BASE_API}/admin/Interest`, //get
//   adminAddInterest: `${BASE_API}/admin/interest?`, // post http://localhost:8080/admin/interest?name={interestName}&color={interestColor}
//   deleteInterestByName: `${BASE_API}/admin/interest/delete?`, //delete http://localhost:8080/admin/interest/delete?interestName={interestName}
//   deleteGroupById: `${BASE_API}/admin/group/`, //delete http://localhost:8080/admin/group/{id}
//   deleteUserByLogin: `${BASE_API}/admin/user/delete?`, //delete http://localhost:8080/admin/user/delete?login={userLogin}

//   //Group EndPoints
//   createGroup: `${BASE_API}/groups/{userLogin}/create`, //http://localhost:8080/groups/{userLogin}/create
//   /* createGroup (Body)
//     {
//         "chars": "WWs",
//         "name" : "Daday",
//         "color": "000",
//         "description": "WinWin"
//     }
//   */
//   addInterestToGroup:  `${BASE_API}/groups/{groupId}/interests`, //post //http://localhost:8080/groups/{groupId}/interests
//   fetchGroupByPrefixName:  `${BASE_API}/groups/search_name`, //get //http://localhost:8080/groups/search_name  ?value={groupChars} - необязательный 
//   fetchGroupsByInterest:   `${BASE_API}/groups/search_interest`, //get //http://localhost:8080/groups/search_interest
//   deleteOwnerGroupById: `${BASE_API}/groups/`, //delete http://localhost:8080/groups/{groupID} Вроде удаляются только если токен хедера соответсвтует токену создателя группы
// };

export const BASE_API = "http://localhost:8080";

export const endpoints = {
  //Auth/Registraion Endpoints
  registration: `${BASE_API}/auth/register`, // post
  /* registration (Body)
    { 
        "userName": "john_doe",
        "firstName": "John",
        "lastName": "Doe",
        "password": "securePassword123",
        "email": "elenabozko1210@gmail.com",
        "gender": "Male",
        "tgName": "john_doe_tg",
        "birthDay": "1990-01-15"
    }  
  */
  auth: `${BASE_API}/auth/sing-in`, // post (Body) {"username":"john_doe","password":"securePassword123"}
  refreshToken: `${BASE_API}/auth/refresh`, //post
  getUser: (userLogin: string) => `${BASE_API}/api/user/${userLogin}`, //get //http://localhost:8080/api/user/{login}

  //Admin Endpoints
  adminGetAllUsers: `${BASE_API}/admin/users`, //get
  adminGetAllGroups: `${BASE_API}/admin/groups`, //get
  adminGetAllInterests: `${BASE_API}/admin/Interest`, //get
  adminAddInterest: (interestName:string, interestColor:string) => `${BASE_API}/admin/interest?name=${interestName}&color=${interestColor}`, // post http://localhost:8080/admin/interest?name={interestName}&color={interestColor}
  deleteInterestByName: (interestName: string) => `${BASE_API}/admin/interest/delete?interestName=${interestName}`, //delete http://localhost:8080/admin/interest/delete?interestName={interestName}
  deleteGroupById: (groupId: string) => `${BASE_API}/admin/group/${groupId}`, //delete http://localhost:8080/admin/group/{id}
  deleteUserByLogin: (userLogin: string) => `${BASE_API}/admin/user/delete?login=${userLogin}`, //delete http://localhost:8080/admin/user/delete?login={userLogin}

  //Group Endpoints
  createGroup: (userLogin: string) => `${BASE_API}/groups/${userLogin}/create`, //post //http://localhost:8080/groups/{userLogin}/create
  /* createGroup (Body)
    {
        "chars": "WWs",
        "name" : "Daday",
        "color": "000",
        "description": "WinWin"
    }
  */
  addInterestToGroup: (groupId: string) => `${BASE_API}/groups/${groupId}/interests`, //post //http://localhost:8080/groups/{groupId}/interests
  fetchGroupByPrefixName:  `${BASE_API}/groups/search_name`, //get //http://localhost:8080/groups/search_name  ?value={groupChars} - необязательный 
  fetchGroupsByInterest:   `${BASE_API}/groups/search_interest`, //get //http://localhost:8080/groups/search_interest
  deleteOwnerGroupById: (groupId: string) => `${BASE_API}/groups/${groupId}`, //delete http://localhost:8080/groups/{groupID} Вроде удаляются только если токен хедера соответсвтует токену создателя группы

  //User Endpoints
  getUserCreatedGroups: (userLogin: string) => `${BASE_API}/api/user/${userLogin}/groups/created`, //get
  uploadProfileImage: (userLogin: string)=> `${BASE_API}/api/user/${userLogin}/profile-image`, //post
  deleteUserInterests: (userLogin:string) => `${BASE_API}/api/user/${userLogin}/interests`, //delete
  getUserInterests: (userLogin:string) => `${BASE_API}/api/user/${userLogin}/interests`, //get
  addUserInterest: (userlogin: string) =>  `${BASE_API}/api/user/${userlogin}/interests`,  //post
  updateSecurityInfo: (userLogin: string) =>  `${BASE_API}/api/user/${userLogin}/security`, //patch
  fetchUserByInterests: `${BASE_API}/api/user/search_interest`, //post (get) {body}
  fetchUserByFullname: (firstName:string, lastName:string, patronymic:string) => `${BASE_API}/api/user/search_name?firstName=${firstName}&lastName=${lastName}&patronymic=${patronymic}`, //get 
  fetchUserByUsername: `${BASE_API}/api/user/search_username`, //post (get) {body}
  deleteOwnerUserByLogin: (userLogin:string) => `${BASE_API}/api/user/${userLogin}`, //delete 
  getUserByLogin: (userLogin:string) => `${BASE_API}/api/user/${userLogin}`, //get
  getUserGroup: (userLogin:string) => `${BASE_API}/api/user/${userLogin}/groups`, //get
  updateUser: (userLogin:string) => `${BASE_API}/api/user/${userLogin}/update`, //patch  
};