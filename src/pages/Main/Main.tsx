import { Button, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import Lawdialog from "../../components/Lawdialog";
import Petnotice from "../Petnotice";
import Search from "../Search";
import { useNavigate } from "react-router-dom";
import { ProfileAPI } from "../../api/auth";
import KakaoLogin from "../../components/KakaoLogin";
import { Cookies, useCookies } from "react-cookie";
import { getCookie } from "../../util/Cookie";
const { VITE_APP_KAKAO_KEY } = import.meta.env;

const Main = () => {
  const cookies = getCookie("access_token");
  const navigate = useNavigate();
  const LOGOUT_REDIRECT_URI = "http://localhost:5173";
  const kakaologout = `https://kauth.kakao.com/oauth/logout?client_id=${VITE_APP_KAKAO_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
  const [open, setOpen] = useState(true);
  const [, , removeCookie] = useCookies(["access_token"]);
  const handleClose = () => {
    setOpen(false);
  };
  const profileclick = () => {
    navigate("/profile");
  };
  const logout = () => {
    window.location.href = kakaologout;
    removeCookie("access_token", { path: "/" });
  };

  return (
    <>
      <Lawdialog open={open} onClose={handleClose} />
      <div className="h-full w-full flex flex-col">
        <div className="ml-10 mt-5">
          <div className="text-6xl font-bold">MJ PET</div>
          <div className="text-right pr-16 mb-4">
            {!cookies ? (
              <KakaoLogin />
            ) : (
              <Button onClick={logout}>로그아웃</Button>
            )}
          </div>
        </div>
        <div className="text-right pr-16">
          <Button variant="contained" size="medium" onClick={profileclick}>
            프로필
          </Button>
        </div>
        <div className="left-1/2 mt-10">
          <Search />
          <Petnotice />
        </div>
      </div>
    </>
  );
};
export default Main;
