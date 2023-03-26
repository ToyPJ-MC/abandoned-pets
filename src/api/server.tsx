import React from "react";
import axios, { AxiosError } from "axios";
import { AxiosResponse } from "axios";
import { API_URL } from "../constants/Constants";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { userDataState } from "../states/atom";
import { getCookie } from "../util/Cookie";

const gunurl = "/gungu/find";
const centerurl = "/center/find";
const maxurl = "/pets/page/all";
const sizeurl = "/pets/count/all";

const headerConfig = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
const handleError = (error: any) => {
  if (error.response) {
    error.response.data;
  } else if (error.request) {
    error.request;
  } else {
    error.message;
  }
};

const getgunAPI = async (si_name: string, setGun: SetterOrUpdater<any>) => {
  await axios
    .post(API_URL + gunurl, null, {
      params: { name: si_name },
      headers: headerConfig,
    })
    .then((response) => {
      setGun(response.data);
    })
    .catch((error) => {
      handleError(error);
    });
};
const getCenterAPI = async (
  si_name: string,
  gungu_name: string,
  setCenter: SetterOrUpdater<any>
) => {
  await axios
    .post(API_URL + centerurl, null, {
      params: { si_name: si_name, gungu_name: gungu_name },
      headers: headerConfig,
    })
    .then((response) => {
      setCenter(response.data);
    })
    .catch((error) => {
      handleError(error);
    });
};
const getIndexAPI = async (
  kind_name: string,
  setIndex: SetterOrUpdater<any>
) => {
  await axios
    .post(API_URL + `/kind/find/kindcode=${kind_name}`, null, {
      params: { kind_code: kind_name },
      headers: headerConfig,
    })
    .then((response) => {
      setIndex(response.data);
    })
    .catch((error) => {
      handleError(error);
    });
};
const findAPI = async (
  si_code: string,
  gungu_code: string,
  center: string,
  kind_code: string,
  kind: string,
  neuter: string,
  setPetindex: SetterOrUpdater<any>,
  member_id: string,
  setError: SetterOrUpdater<any>
) => {
  const cookies = getCookie("member_id");
  const member = cookies;
  await axios
    .get(API_URL + `pets/select/memberid=${member_id}/kindcode=${kind_code}`, {
      params: {
        member_id: member,
        kind_cd: kind,
        care_nm: center,
        org_nm: si_code + " " + gungu_code,
        neuter_yn: neuter,
        kind_code: kind_code,
      },
      headers: headerConfig,
    })
    .then((response) => {
      setError("");
      setPetindex(response.data);
    })
    .catch((error) => {
      const err = error as AxiosError;
      if (err.response) {
        console.log(err.response.data);
        setError(err.response.data);
      }
    });
};
const allAPI = async (
  page: number,
  size: number,
  setAllData: SetterOrUpdater<any>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await axios
    .get(API_URL + `pets/page=${page}/size=${size}`, {
      params: {
        page,
        size,
      },
      headers: headerConfig,
    })
    .then(async (response: AxiosResponse) => {
      //console.log(response.data);
      setAllData(response.data);
      setLoading && setLoading(false);
    })
    .catch((error) => {
      handleError(error);
    });
};
const MaxpageAPI = async (setMaxpage: SetterOrUpdater<any>) => {
  await axios
    .get(API_URL + maxurl, {
      params: {},
      headers: headerConfig,
    })
    .then(async (response) => {
      //console.log(response.data);
      setMaxpage(response.data);
    });
};
const SearchAPI = async (setSearchpage: SetterOrUpdater<any>) => {
  const cookies = getCookie("member_id");
  const member = cookies.toString();
  await axios
    .get(API_URL + `/member/searchlist/memberid=${member}`, {
      params: { member_id: member },
      headers: headerConfig,
    })
    .then(async (response) => {
      setSearchpage(response.data);
    });
};
const TotalAPI = async (setTotal: SetterOrUpdater<any>) => {
  await axios
    .get(API_URL + sizeurl, {
      params: {},
      headers: headerConfig,
    })
    .then(async (response) => {
      setTotal(response.data);
    });
};
const likeAPI = async (noticeNo: string) => {
  const cookies = getCookie("member_id");
  const member = cookies.toString();
  await axios
    .post(API_URL + `/member/like/memberid=${member}`, null, {
      params: { member_id: member, noticeNo: noticeNo },
      headers: headerConfig,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      handleError(error);
    });
};
const likelistAPI = async (setLike: SetterOrUpdater<any>) => {
  const cookies = getCookie("member_id");
  const member = cookies.toString();
  await axios
    .get(API_URL + `/member/like/list/memberid=${member}`, {
      params: { member_id: member },
      headers: headerConfig,
    })
    .then((response) => {
      setLike(response.data);
    })
    .catch((error) => {
      handleError(error);
    });
};
export {
  getgunAPI,
  getCenterAPI,
  getIndexAPI,
  findAPI,
  allAPI,
  MaxpageAPI,
  SearchAPI,
  TotalAPI,
  likeAPI,
  likelistAPI,
};
