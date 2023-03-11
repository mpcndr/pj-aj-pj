import axios from "axios";
import fileDownload from "js-file-download";
//188.166.220.33:8000

async function query(urlComponent, inputQuery, token = "") {
  var urlapi = "http://188.166.220.33:8000/api";

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
      console.log(res);
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
  let result = await query(`/login`, req);

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


export async function registerAgencyUploadView(email, password, agencyname, usernameagency) {
  let response;
  let req = {
    email: email,
    password: password,
    agencyName:agencyname,
    userNameAgency:usernameagency,
    isAgency:true,

  };
  console.log("req registerAgency ", req);
  let result = await query(`/registerAgencyUploadView`, req);

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

export async function registerUserView(email, password, firstnameUserRequest,lastnameUserRequest,agencyNameRequest ) {
  let response;
  let req = {
    email: email,
    password: password,
    firstnameUserRequest: firstnameUserRequest,
    lastnameUserRequest: lastnameUserRequest,
    agencyNameRequest: agencyNameRequest,
    isAgency:false,

  };
  console.log("req registerUser ", req);
  let result = await query(`/registerUserView`, req);

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

export async function loginAgencyUploadView(email, password ) {
  let response;
  let req = {
    email: email,
    password: password,
  };
  console.log("req loginAgency ", req);
  let result = await query(`/loginUserView`, req);

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

export async function logoutView() {
  let response;
  let result = await query(`/logoutView`);

  if (result) {
    if (result.statusCode === 0) {
      response = {
        statusCode: true,
        data: {
          message: result.message,
        },
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

export async function uploadFileView(dataSetGroupId,fileName,provinceId,dataName,description, files ) {
  let response;
  let req = {
    dataSetGroupId: dataSetGroupId,
    fileName: fileName,
    provinceId: provinceId,
    dataName: dataName,
    description: description,
    files: files
  };
  console.log("req loginAgency ", req);
  let result = await query(`/uploadFileView`, req);

  if (result) {
    if (result.statusCode === 0) {
      response = {
        statusCode: result.statusCode,
        data: [],
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

export async function readFileView(fileName ) {
  let response;
  let req = {   
    fileName: fileName,
  };
  console.log("req readFile ", req);
  let result = await query(`/readFileView`, req);

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

export async function mapMetaDataView(mapFields ) {
  let response;
  let req = {   
    mapFields: mapFields,
  };
  console.log("req mapMetaData ", req);
  let result = await query(`/mapMetaData`, req);

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

export async function searchDataView(dataSetGroupId, keySearch, mataDataField ) {
  let response;
  let req = {   
    dataSetGroupId: dataSetGroupId,
    keySearch: keySearch,
    mataDataField:  mataDataField,
  };
  console.log("req searchData", req);
  let result = await query(`/searchDataView`, req);

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
  let result = await query(`/register`, req);

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
  let result = await query(`/loginAdmin`, req);

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
  let result = await query(`/datafrom`, req);

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

export async function serachAPI(keyword, meta, select) {
  console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
  let response = {};
  let req = {
    keyWord: keyword,
    metaDataGroup: meta,
    selectDataSetGroup: select,
  };
  console.log("req datafrom", req);
  let result = await query(`/searchFile`, req);
  console.log(result);

  if (result) {
    if (result.statusCode === 0) {
      response = {
        statusCode: result.statusCode,
        data: result.data,
      };
    } else {
      return false;
    }

    if (Object.keys(response).length === 0) return false;
    // if (!response.data && response.error) return response;
    console.log(response);
    return response;
  }
}

export async function uploadFile(files, dataMap, user) {
  const urlAPI = "http://146.190.81.72:8000/api/upload";

  let response = {};
  let req = {
    files: [],
    dataMapId: [],
    dataMapUser: [],
    descriptionDataMap: [],
    description: "",
    dataSetGroupId: 1,
    fileName: "",
    provinceId: "",
    dataName: "",
    userId: 0,
  };

  const headers = {
    // Authorization: `Bearer ${tokenLocal}`,
    "Content-Type": "multipart/form-data; boundary=something",
  };

  let result = axios
    .post(urlAPI, req, { headers: headers })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  if (result) {
    if (result.statusCode === 0) {
      response = {
        statusCode: result.statusCode,
        data: result.metaData,
      };
    } else {
      return false;
    }
  }
  if (Object.keys(response).length === 0) return false;
  // if (!response.data && response.error) return response;

  return response;
}

export async function getMetaDataView(userId) {
  console.log("getMetaDataView");
  let req = { userId: userId };
  let result = await query("/getMetaDataView", req);
  console.log(result);
  let response = {
    statusCode: false,
    data: {},
  };
  if (result.statusCode === 0) {
    response = {
      statusCode: true,
      province: result.metaData,
    };
    return response;
  } else {
    return response;
  }
}

export async function getFileNameByMetaDataIdView(netaData) {
  console.log("sdfsdfsdfsdfsdf");
  let req = { metaDataId: netaData };
  let result = await query("/getFileNameByMetaDataIdView", req);
  console.log(result);
  // let response = {
  //   statusCode: false,
  //   data: {},
  // };
  let response = {
    statusCode: false,
    data: {},
  };
  if (result.statusCode === 0) {
    response = {
      statusCode: true,
      data: result.data,
    };
    return response;
  } else {
    return response;
  }
}

export async function updataMetaDataView() {
  console.log("updataMetaDataView");
  let req = {
    dataSetGroupId: "04",
    fileName: "PM2.5",
    provinceId: "20",
    dataName: "ข้อมูลฝุ่นละอองขนาดเล็กPM2.5",
    description: "ค่าฝุ่นละอองPM2.5",
    userId: 1,
    metadataId: "31",
    dataMapId: [1],
    dataMapUser: ["ฝุ่นPM"],
    descriptionDataMap: ["ฝุ่นละออง"],
  };
  let result = await query("/updataMetaDataView", req);
  console.log(result);
  let response = {
    statusCode: false,
    data: {},
  };
  if (result.statusCode === 0) {
    response = {
      statusCode: true,
      data: result.files,
    };
    return response;
  } else {
    return response;
  }
}

export async function deleteFile(id, file) {
  console.log("deleteFile");
  let req = {
    id: id,
    file: file,
  };
  let result = await query("/deleteFile", req);
  console.log(result);
  let response = {
    statusCode: false,
    data: {},
  };
  if (result.statusCode === 0) {
    response = {
      statusCode: true,
      data: {},
    };
    return response;
  } else {
    return response;
  }
}

export async function downloadFile(filePath) {
  console.log("downloadFile");
  let req = {
    filePath: filePath,
  };
  let result = await query("/downloadFile", req);

  return result;
  // console.log(result);
  // let response = {
  //   statusCode: false,
  //   data: {},
  // };
  // if (result.status === 200) {
  //   response = {
  //     statusCode: true,
  //     data: {},
  //   };
  //   return response;
  // } else {
  //   return response;
  // }
}

export async function deleteMetaData(id) {
  console.log("deleteMetaData");
  let req = {
    metadataId: id,
  };
  let result = await query("/deleteMetaData", req);
  console.log(result);
  let response = {
    statusCode: false,
    data: {},
  };
  if (result.statusCode === 0) {
    response = {
      statusCode: true,
      data: {},
    };
    return response;
  } else {
    return response;
  }
}

export async function getDropdown() {
  let result = await axios.get("http://146.190.81.72:8000/api/dropdownlist");
  console.log(result.data);

  let response = {
    statusCode: false,
    province: [],
    dataSetGroup: [],
    metadataGroup: [],
  };

  if (result.data.statusCode === 0) {
    response.statusCode = true;
    response.province = result.data.province;
    response.dataSetGroup = result.data.dataSetGroup;
    response.metadataGroup = result.data.metadataGroup;
    return response;
  } else {
    return response;
  }
}
