import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import BodyRightChat from "./BodyRightChat";
import FooterRightChat from "./FooterRightChat";
import { useRecoilValue } from "recoil";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";
import { tokenState } from "../../recoil/initState";
const RightChat = () => {
  const { data } = useContext(ChatContext);
  console.log(data);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [name2, setName2] = useState("");
  const [username2, setUserName2] = useState("");
  console.log(data);
  const token = useRecoilValue(tokenState);
  function updateUserName(displayName: string) {
    if (displayName) {
      return displayName.slice(0, 5);
    }
    return ""; // hoặc giá trị mặc định khác tùy thuộc vào trường hợp của bạn
  }
  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);
      try {
        const fullName = data.user?.displayName;
        const responseInfo = await api.get(
          "https://www.socialnetwork.somee.com/api/infor/searchuser",
          {
            params: { fullname: fullName },
          }
        );
        console.log(responseInfo.data.data?.[0].userId);
        setName(responseInfo.data.data?.[0]?.userId.slice(0, 10));
        setUserName(responseInfo.data.data?.[0]?.fullName);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    const fetchData1 = async () => {
      setAuthToken(token);
      // setUserName(data.user.displayName);
      // setName(updateUserName(data.user.uid));
      try {
        const responseInfo = await api.get(
          "https://www.socialnetwork.somee.com/api/infor/myinfor"
        );
        setName2(responseInfo.data.data.userId.slice(0, 10));
        setUserName2(responseInfo.data.data.fullName);
        console.log(name2);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };

    const initChat = async () => {
      await fetchData();
      await fetchData1();
      await init();
    };

    initChat();
  }, []);
  useEffect(() => {
    if (name && name2) {
      init();
    }
  }, [name, name2]);
  ///

  // const [calleeId, setCalleeId] = useState(name);
  const zeroCloudInstance = useRef<ZegoUIKitPrebuilt | null>(null);
  async function init() {
    const userId = username2 + "_" + name2;
    const userName = username2;

    const appID = 2006450489; // fill your appID here
    const serverSecret = "86689832e7ca0c38051798682eac4a50"; // fill your serverSecret here
    console.log(appID, serverSecret, userId, userName);
    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      "cong",
      userId,
      userName
    );

    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
    console.log(KitToken);
    // add plugin
    if (zeroCloudInstance.current) {
      zeroCloudInstance.current.addPlugins({ ZIM });
    } else {
      console.error("zeroCloudInstance.current is null or undefined");
    }
  }

  const handleSend = (callType: any) => {
    const callee = username + "_" + name;
    const usercallee = username;
    console.log(callee, name2);
    if (!callee) {
      alert("userID cannot be empty!!");
      return;
    }
    console.log(callee, usercallee);
    // send call invitation
    if (zeroCloudInstance.current) {
      console.log(zeroCloudInstance.current, callType);
      zeroCloudInstance.current
        .sendCallInvitation({
          callees: [{ userID: callee, userName: usercallee }],
          callType: callType,
          timeout: 60,
        })
        .then((res) => {
          console.log(callee, usercallee);
          console.warn(res);
          if (res.errorInvitees.length) {
            alert("The user dose not exist or is offline.");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Handle the case when zeroCloudInstance.current is null
      console.error("zeroCloudInstance.current is null");
    }
  };
  return (
    <section className="flex flex-col flex-auto border-l border-gray-800">
      <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
        <div className="flex">
          <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
            <img
              className="shadow-md rounded-full w-full h-full object-cover"
              src={data.user?.photoURL}
              alt=""
            />
          </div>
          <div className="text-sm">
            <p className="font-bold">{data.user?.displayName}</p>
            <p>Active 1h ago</p>
          </div>
        </div>

        <div className="flex">
          <div className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2">
            <svg
              viewBox="0 0 20 20"
              className="w-full h-full fill-current text-blue-500"
            >
              <path d="M11.1735916,16.8264084 C7.57463481,15.3079672 4.69203285,12.4253652 3.17359164,8.82640836 L5.29408795,6.70591205 C5.68612671,6.31387329 6,5.55641359 6,5.00922203 L6,0.990777969 C6,0.45097518 5.55237094,3.33066907e-16 5.00019251,3.33066907e-16 L1.65110039,3.33066907e-16 L1.00214643,8.96910337e-16 C0.448676237,1.13735153e-15 -1.05725384e-09,0.445916468 -7.33736e-10,1.00108627 C-7.33736e-10,1.00108627 -3.44283713e-14,1.97634814 -3.44283713e-14,3 C-3.44283713e-14,12.3888407 7.61115925,20 17,20 C18.0236519,20 18.9989137,20 18.9989137,20 C19.5517984,20 20,19.5565264 20,18.9978536 L20,18.3488996 L20,14.9998075 C20,14.4476291 19.5490248,14 19.009222,14 L14.990778,14 C14.4435864,14 13.6861267,14.3138733 13.2940879,14.7059121 L11.1735916,16.8264084 Z" />
            </svg>
          </div>
          <div
            onClick={() => {
              handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
            }}
            className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 ml-4"
          >
            <svg
              viewBox="0 0 20 20"
              className="w-full h-full fill-current text-blue-500"
            >
              <path d="M0,3.99406028 C0,2.8927712 0.894513756,2 1.99406028,2 L14.0059397,2 C15.1072288,2 16,2.89451376 16,3.99406028 L16,16.0059397 C16,17.1072288 15.1054862,18 14.0059397,18 L1.99406028,18 C0.892771196,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M8,14 C10.209139,14 12,12.209139 12,10 C12,7.790861 10.209139,6 8,6 C5.790861,6 4,7.790861 4,10 C4,12.209139 5.790861,14 8,14 Z M8,12 C9.1045695,12 10,11.1045695 10,10 C10,8.8954305 9.1045695,8 8,8 C6.8954305,8 6,8.8954305 6,10 C6,11.1045695 6.8954305,12 8,12 Z M16,7 L20,3 L20,17 L16,13 L16,7 Z" />
            </svg>
          </div>
          <div className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 ml-4">
            <svg
              viewBox="0 0 20 20"
              className="w-full h-full fill-current text-blue-500"
            >
              <path d="M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z" />
            </svg>
          </div>
        </div>
      </div>
      <BodyRightChat />
      <FooterRightChat />
    </section>
  );
};

export default RightChat;
