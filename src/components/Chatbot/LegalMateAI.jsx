import React, { useEffect, useRef, useState } from "react";
import addBtn from "../../assets/add-30.png";
import chatLogo from "../../assets/chatgpt.svg";
import msgIcon from "../../assets/message.svg";
import homeIcon from "../../assets/home.svg";
import savedIcon from "../../assets/bookmark.svg";
import userIcon from "../../assets/user-icon.png";
import chatIcon from "../../assets/chatgptLogo.svg";
import sendIcon from "../../assets/send.svg";
import { sendMesageAndGetResponse } from "../../utils/OpenAI";
import LoadingAnimation from "./LoadingAnimation";


function LegalMateAI() {
  const [input, setInput] = useState("");
  const [loading, setloading] = useState(false);
  const btnRef1= useRef(null)
  const btnRef2= useRef(null)
  const ref = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `You are a very kind assistant who love to code`,
    },
  ]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chats");
    
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const addResponse = async (sendArray) => {
    const response = await sendMesageAndGetResponse(sendArray);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: response,
      },
    ]);

    localStorage.setItem(
      "chats",
      JSON.stringify([
        ...sendArray,
        {
          role: "assistant",
          content: response,
        },
      ])
    );
  };

  const sendInput = async () => {
    try {
      const content = input;
      setloading(true);
      setInput("");
      const sendArray = [...messages, { role: "user", content: content }];
      setMessages(sendArray);

      try {
        await addResponse(sendArray);
      } catch (error) {
        console.log(console.error);
      }
    } catch (error) {
      setMessages([
        ...messages,
        {
          role: "assistant",
          content: "Some Error Occured",
        },
      ]);
      setloading(false);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  // Background color of whole page
  useEffect(() => {
    document.body.style.backgroundColor = "#e2e8f0";
  }, []);

  useEffect(() => {
    ref.current.scrollIntoView();
  }, [messages]);

  const handleEnter = async (e) => {
    if (e.key == "Enter") await sendInput(input);
  };

  const handleNewChat =  () => {
        localStorage.removeItem('chats')
        
        setMessages([
          {
            role: "system",
            content: `You are a very kind assistant`,
          },
        ]);
  };   


  return (
    <>
      <div className="App flex text-black ">
        <div className="sidebar flex flex-col w-1/3 bg-white  h-screen max-sm:hidden ">
          <div className="upperSide h-3/4 ">
            <div className="upperSideTop flex items-center justify-center mx-auto text-4xl font-semibold w-[90%] py-10">
              <img src={chatLogo} alt="" className="chatBotLogo w-[10%] mr-2" />
              <span className="">Haha : )</span>
            </div>

            <button
              className="midBtn flex justify-center items-center text-white  bg-slate-700  p-3 my-4 text-2xl rounded-md mx-auto "
              onClick={handleNewChat}
            >
              <img src={addBtn} alt="" className=" addBtn w-[13%] mr-2" />
              New Chat
            </button>
            
          </div>

        </div>



        <div className="main  w-3/4 max-sm:w-full   sm:w-full  min-h-80vh flex flex-col justify-between items-center">
          <div className="topHeading text-4xl max-sm:text-2xl font-semibold border-2 p-3 rounded-md border-black mt-10 max-sm:my-10">
            haha : )
          </div>

          <div className="chat w-[80%] max-sm:w-full px-4  overflow-y-scroll scroll-smooth  h-[70vh] ">
            {messages.map((message, i) => {
              return i==0 ? ( <div
                key={i}
                className={`chats user flex ${
                  loading ? "items-center" : "items-start"
                } my-3   p-4 w-full rounded-md" +  ${
                  message.role === "assistant" ? "bg-slate-700" : ""
                }`}
              >
                <img
                  src={ chatIcon}
                  alt=""
                  className="usertxt w-[5%] mr-4"
                />{" "}
                <p className=" text-justify mx-4 max-sm:text-left font-medium">
                Hello Baby ! Lets Talk something naughty
                </p>
              </div>) :( 
                <div
                  key={i}
                  className={`chats user flex ${
                    loading ? "items-center" : "items-start"
                  } my-3   p-4 w-full rounded-md" +  ${
                    message.role === "assistant" ? "bg-slate-500" : ""
                  }`}
                >
                  <img
                    src={message.role === "assistant" ? chatIcon : userIcon}
                    alt=""
                    className="usertxt w-[5%] mr-4"
                  />{" "}
                  <p className=" text-justify mx-4 max-sm:text-left font-medium">
                    {(message.role=="assistant" || "user") && message.content}
                  </p>
                </div>
              );
            })}

            <div className="msgEnd" ref={ref}></div>
          </div>
          <div className="chatFooter flex flex-col items-center  mx-36 w-[80%] rounded-md mb-4">
            <div className="input bg-gray-700 flex p-2 w-full justify-around rounded-md ">
              <input
                type="text"
                placeholder="send a message"
                value={input}
                className="p-3 outline-none text-gray-50 mr-2 bg-transparent w-[90%]"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                onKeyDown={handleEnter}
              />
              <button className="sendMessage">
                {loading ? (
                  <LoadingAnimation />
                ) : (
                  <img
                    src={sendIcon}
                    alt=""
                    className="sendImg "
                    onClick={sendInput}
                  />
                )}
              </button>
            </div>
            <p className="text-sm my-2">
              Made with Gulabi Dil by aialok : )
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LegalMateAI;
