import React, { useEffect } from "react";
import { useGamesContext } from "../context/GamesContextProvider";
import { useSocket } from "../context/SocketProvider";
import useUserId from "../hooks/useUserId";

const CurrentPlayer = ({ children }) => {
  const userId = useUserId();
  const { setPlayerTurn, playerTurn, players } = useGamesContext();
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("changeTurn", ({ player }) => {
        setPlayerTurn(player);
      });
    }
  }, [socket, userId, setPlayerTurn]);

  let turn = null;
  if (players !== []) {
    turn = (
      <h1>
        Turn:
        <span className="currentPlayer-nick"> {playerTurn.nick}</span>
        {playerTurn.id === userId ? (
          <span className="currentPlayer-your">(You)</span>
        ) : null}
      </h1>
    );
  }

  return (
    <div className="currentPlayer">
      {turn}
      <span>{children}</span>
    </div>
  );
};

export default CurrentPlayer;
