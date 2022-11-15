const axios = require("axios");

async function query(urlComponent, inputQuery, token = "") {
  var urlapi = "http://143.198.198.44:8000";

  // var tokenLocal = token
  // if (token === '' || (LocalStorage.getItem('token') === '' || LocalStorage.getItem('token') === null)) {
  //   tokenLocal = ''
  // } else if (token === 'login') {
  //   tokenLocal = ''
  // } else {
  //   tokenLocal = JSON.parse(LocalStorage.getItem('token'))
  // }

  const headers = {
    // Authorization: `Bearer ${tokenLocal}`,
    "Content-Type": "application/json",
  };
  console.log("query [urlapi]: ", urlapi + urlComponent);
  console.log("query [headers]: ", headers);
  console.log("query [inputQuery]: ", inputQuery);

  let result = await axios
    .post(urlapi + urlComponent, inputQuery, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return result;
}

export async function login(email, password) {
  let response;
  let req = {
    email: email,
    password: password,
  };
  console.log("req login ", req);
  let result = await query(`/api/login`, req);

  if (result) {
    if (result.statusCode === 0) {
      response = {
        statusCode: result.statusCode,
        data: result.data,
      };
    } else {
      response = {
        statusCode: result.statusCode,
        error: result.errorMsg,
      };
    }
  } else {
    return false;
  }

  if (Object.keys(response).length === 0) return false;
  if (!response.data && response.error) return response;

  console.log("===> ", response);

  return response;
}

export async function registerAPI(
  firstname,
  lastname,
  agency,
  email,
  password
) {
  let response;
  let req = {
    firstname: firstname,
    lastname: lastname,
    agency: agency,
    email: email,
    password: password,
  };
  console.log("req register ", req);
  let result = await query(`/api/register`, req);

  if (result) {
    // if (result.statusCode === 0) {
    response = {
      statusCode: 0,
      data: result.data,
    };
    // } else {
    // response = {
    //   statusCode: result.statusCode,
    //   error: result.errorMsg,
    // };
    // }
  } else {
    return false;
  }

  if (Object.keys(response).length === 0) return false;
  // if (!response.data && response.error) return response;

  return response;
}

export async function loginAdmin(email, password) {
  let response;
  let req = {
    email: email,
    password: password,
  };
  console.log("req loginAdmin ", req);
  let result = await query(`/api/loginAdmin`, req);

  if (result) {
    if (result.statusCode === 0) {
      response = {
        statusCode: result.statusCode,
        data: result.data,
      };
    } else {
      response = {
        statusCode: result.statusCode,
        error: result.errorMsg,
      };
    }
  } else {
    return false;
  }

  if (Object.keys(response).length === 0) return false;
  if (!response.data && response.error) return response;

  return response;
}

export async function datafromAPI(
  agencyname,
  filename,
  dataname,
  province,
  description,
  datagroup,
  Metadata
) {
  let response;
  let req = {
    agencyname: agencyname,
    filename: filename,
    dataname: dataname,
    province: province,
    description: description,
    datagroup: datagroup,
    Metadata: Metadata,
  };
  console.log("req datafrom", req);
  let result = await query(`/api/datafrom`, req);

  if (result) {
    // if (result.statusCode === 0) {
    response = {
      statusCode: 0,
      data: result.data,
    };
  } else {
    return false;
  }

  if (Object.keys(response).length === 0) return false;
  // if (!response.data && response.error) return response;

  return response;
}

export async function datafrom1API() {
  let response;
  // let req = {
  //   agencyname: agencyname,
  //   filename: filename,
  //   dataname: dataname,
  //   province: province,
  //   description: description,
  //   datagroup: datagroup,
  //   Metadata: Metadata,
  // };
  // console.log("req datafrom", req);
  // let result = await query(`/api/datafrom`, req);
  let result = {
    province: [
      {
        id: 1,
        code: "10",
        name_th: "กรุงเทพมหานคร",
        name_en: "Bangkok",
        geography_id: 2,
      },
    ],
  };

  if (result) {
    // if (result.statusCode === 0) {
    response = {
      statusCode: 0,
      data: result,
    };
  } else {
    return false;
  }

  if (Object.keys(response).length === 0) return false;
  // if (!response.data && response.error) return response;

  return response;
}
export async function serachAPI(key, group) {
  let response;
  let req = {
    keyWord: key,
    selectDataSetGroup: group,
  };
  console.log("req datafrom", req);
  let result = await query(`/api/searchFile`, req);

  if (result) {
    if (result.statusCode === 0) {
      response = {
        statusCode: result.statusCode,
        data: result.metaData,
        dataSetCount: result.dataSetCount
      };
    } else {
      return false;
    }

    if (Object.keys(response).length === 0) return false;
    // if (!response.data && response.error) return response;

    return response;
  }
}
