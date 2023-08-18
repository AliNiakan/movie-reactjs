import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Message from "./Message";
import Response from "./Response";
import AuthContext from "../../context/AuthContext";
import ErrorPage from "../Error/ErrorPage";
import "./Inbox.css";
import config from "../../config.json";

const URL = config.api_url;

function Inbox() {
    const { authTokens } = useContext(AuthContext);

    const [messageList, setMessageList] = useState([]);
    const [responseList, setResponseList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [noDataAvailable, setNoDataAvailable] = useState(false);
    const [isError, setIsError] = useState(false); 

    useEffect(() => {
        async function fetchData() {
            try {
                const messageResponse = await fetch(`${URL}/user/recommend/get/all`, {
                    headers: {
                        "Authorization": `Bearer ${authTokens.access}`,
                    },
                });
                const messageData = await messageResponse.json();
                setMessageList(messageData.recommended_movies);

                const answerResponse = await fetch(`${URL}/user/recommend/get/answers/all`, {
                    headers: {
                        "Authorization": `Bearer ${authTokens.access}`,
                    },
                });
                const answerData = await answerResponse.json();
                setResponseList(answerData.answers);

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
                setIsError(true); 
            }
        }
        fetchData();
    }, [authTokens]);

    useEffect(() => {
        setNoDataAvailable(
            messageList.length === 0 && responseList.length === 0
        );
    }, [messageList, responseList]);

    return (
        <div className="inbox-container">
            <Navbar />

            {isLoading && !isError && <p>Loading...</p>}

            {!isLoading && !isError && messageList.length > 0 && messageList.map((message, index) => (
                <Message
                    key={message.id}
                    id={message.id}
                    movie={message.movie}
                    username={message.username}
                    onDelete={() => {
                        setMessageList(prevList => prevList.filter(item => item.id !== message.id));
                    }}
                />
            ))}

            {!isLoading && !isError && responseList.length > 0 && responseList.map((response, index) => (
                <Response
                    key={response.id}
                    id={response.id}
                    answer={response}
                    username={response.username}
                    onDelete={() => {
                        setResponseList(prevList => prevList.filter(item => item.id !== response.id));
                    }}
                />
            ))}

            {!isLoading && isError && <ErrorPage message="Error fetching data..." />}

            {noDataAvailable && !isLoading && !isError && <ErrorPage message="Your inbox is empty..." />}
        </div>
    );
}

export default Inbox;
