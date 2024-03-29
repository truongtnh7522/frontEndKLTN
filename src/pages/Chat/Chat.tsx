import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../../context/ChatContext";
import RightChat from "../../components/RightChat/RightChat";
import Logo from "../../assets/LogoLoad.png";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const currentUser = useSelector((state: RootState) => state.info.info);
  const navige = useNavigate();
  console.log(currentUser);
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<DocumentData | null>(null);
  const [err, setErr] = useState<boolean>(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("DisplayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(123);
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.data.firebaseData.uid > user.Uid
        ? currentUser.data.firebaseData.uid + user.Uid
        : user.Uid + currentUser.data.firebaseData.uid;
    console.log(combinedId, user.Uid);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        console.log(123);
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(
          doc(db, "userChats", currentUser.data.firebaseData.uid),
          {
            [combinedId + ".userInfo"]: {
              uid: user.Uid,
              displayName: user.DisplayName,
              photoURL: user.PhotoUrl,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }
        );
        console.log(
          currentUser.data.firebaseData.uid,
          "va",
          currentUser.data.firebaseData.displayName,
          "va",
          currentUser.data.firebaseData.photoUrl
        );
        await updateDoc(doc(db, "userChats", user.Uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.data.firebaseData.uid,
            displayName: currentUser.data.firebaseData.displayName,
            photoURL: currentUser.data.firebaseData.photoUrl,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log(456);
      }
    } catch (error) {
      console.log("Loi r");
    }

    setUser(null);
    setUsername("");
  };
  const [chats, setChats] = useState([]);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser.data.firebaseData.uid),
        (doc) => {
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };

    currentUser.data.firebaseData.uid && getChats();
  }, [currentUser.data.firebaseData.uid]);

  const handleSelect1 = (u: any) => {
    console.log(u);
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
      <div className="flex-1 flex flex-col">
        <div className="border-b-2 border-gray-800 p-2 flex flex-row z-20">
          <div className="bg-red-600 w-3 h-3 rounded-full mr-2"></div>
          <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2"></div>
          <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
        </div>
        <main className="flex-grow flex flex-row min-h-0">
          <section className="flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
            <div className="header p-4 flex flex-row justify-between items-center flex-none">
              <div
                className="w-16 h-16 relative flex flex-shrink-0 cursor-pointer"
                onClick={() => navige("/")}
              >
                <img
                  className="rounded-full w-[200%] h-full object-cover"
                  alt="ravisankarchinnam"
                  src={Logo}
                />
              </div>
              <p className="text-md font-bold hidden md:block group-hover:block">
                Messenger
              </p>
              <a
                href="#"
                className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2"
              >
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                  <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
                </svg>
              </a>
            </div>
            <div className="search-box p-4 flex-none">
              <div>
                <div className="relative">
                  <label>
                    <input
                      className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                      type="text"
                      value={username}
                      placeholder="Search Messenger"
                      onKeyDown={handleKey}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                      <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path
                          fill="#bbb"
                          d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="contacts p-2 flex-1 overflow-y-scroll">
              {err && <span>User not found!</span>}

              {user && (
                <div
                  className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative"
                  onClick={handleSelect}
                >
                  <div className="w-16 h-16 relative flex flex-shrink-0">
                    <img
                      className="shadow-md rounded-full w-full h-full object-cover"
                      src={user.PhotoUrl}
                      alt=""
                    />
                  </div>
                  <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                    <p>{user.DisplayName}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="min-w-0">
                        <p className="truncate">
                          Ok, see you at the subway in a bit.
                        </p>
                      </div>
                      <p className="ml-2 whitespace-no-wrap">Just now</p>
                    </div>
                  </div>
                </div>
              )}
              {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat: any) => {
                  if (
                    chat[1].userInfo &&
                    chat[1].userInfo.displayName &&
                    chat[1].userInfo.photoURL
                  ) {
                    return (
                      <div
                        className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative"
                        key={chat[0]}
                        onClick={() => handleSelect1(chat[1].userInfo)}
                      >
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                          <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src={chat[1].userInfo.photoURL}
                            alt=""
                          />
                        </div>
                        <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                          <p>{chat[1].userInfo.displayName}</p>
                          <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                              <p className="truncate">
                                {chat[1].lastMessage?.text}
                              </p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">Just now</p>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null; // or render a placeholder if necessary
                  }
                })}
            </div>
          </section>
          <RightChat />
        </main>
      </div>
    </div>
  );
};

export default Chat;
