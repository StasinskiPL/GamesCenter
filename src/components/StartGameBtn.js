import { useEffect } from "react";
import { useGamesContext } from "../context/GamesContextProvider";
import { useSocket } from "../context/SocketProvider";
import { useParams, useHistory } from "react-router-dom";

const StartGameBtn = () => {
  const {
    numbersOfPlayers,
    currentRoom,
    players,
    setPlayers,
    setPlayerTurn,
  } = useGamesContext();
  const { game } = useParams();
  const { socket } = useSocket();
  let history = useHistory();

  useEffect(() => {
    if (socket) {
      socket.on("gameStarted", ({ players }) => {
        setPlayers(players);
        setPlayerTurn(players[0]);
        history.push(`/${game}?room=${currentRoom}`);
      });
    }
    return () => {
      if (socket) {
        socket.removeListener("gameStarted");
      }
    };
  }, [socket, history, game, currentRoom, setPlayerTurn, setPlayers]);

  const startGameHandler = () => {
    if (numbersOfPlayers > 1 && currentRoom) {
      socket.emit("gameStarted", { room: currentRoom, players: players });
    }
  };

  const title =
    numbersOfPlayers < 2 ? "You need opponent to start a game" : null;

  return (
    <button
      title={title}
      onClick={startGameHandler}
      className={`lobby-btn ${numbersOfPlayers < 2 && "disable"} `}
    >
      {"Start Game ->"}
    </button>
  );
};

export default StartGameBtn;
