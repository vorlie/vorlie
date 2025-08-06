// src/components/TicTacToe.tsx
import React, { useState, useEffect } from "react";

// --- Helper function to calculate the winner or detect a draw ---
function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (!squares.includes(null)) {
    return "Draw";
  }
  return null;
}

// --- Reusable Square component ---
interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  disabled: boolean;
}
const Square: React.FC<SquareProps> = ({ value, onSquareClick, disabled }) => {
  const textClass =
    value === "X" ? "text-red-400" : value === "O" ? "text-blue-400" : "";
  return (
    <button
      type="button"
      className={`w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 border border-gray-600/50 rounded m-1 flex items-center justify-center leading-none text-3xl sm:text-4xl font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:bg-gray-600 transition-colors duration-150 ${textClass}`}
      onClick={onSquareClick}
      disabled={disabled}
      aria-label={`Square ${value ? `contains ${value}` : "empty"}`}
    >
      {" "}
      {value}{" "}
    </button>
  );
};

// --- Function for Bot's Logic ---
function findBestBotMove(squares: (string | null)[]): number | null {
  const emptyIndices = squares
    .map((sq, idx) => (sq === null ? idx : null))
    .filter((idx) => idx !== null) as number[];

  const mistakeChance = 0.05; // 5% chance to make a mistake
  if (Math.random() < mistakeChance && emptyIndices.length > 0) {
    // Pick a random move (mistake)
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  // 1. Check if Bot ('O') can win in the next move
  for (const i of emptyIndices) {
    const tempBoard = squares.slice();
    tempBoard[i] = "O";
    if (calculateWinner(tempBoard) === "O") {
      return i; // Winning move
    }
  }

  // 2. Check if Player ('X') could win in the next move, and block them
  for (const i of emptyIndices) {
    const tempBoard = squares.slice();
    tempBoard[i] = "X";
    if (calculateWinner(tempBoard) === "X") {
      return i; // Blocking move
    }
  }

  // 3. Try to take the center square if available
  if (squares[4] === null) {
    return 4;
  }

  // 4. If user has both opposite corners, take a side to avoid trap
  const oppositeCorners = [
    [0, 8],
    [2, 6],
  ];
  for (const [a, b] of oppositeCorners) {
    if (squares[a] === "X" && squares[b] === "X") {
      const sides = [1, 3, 5, 7];
      const availableSides = sides.filter((i) => squares[i] === null);
      if (availableSides.length > 0) {
        return availableSides[
          Math.floor(Math.random() * availableSides.length)
        ];
      }
    }
  }

  // 5. Try to take the opposite corner from the player
  const corners = [0, 2, 6, 8];
  const opposites: { [key: number]: number } = { 0: 8, 2: 6, 6: 2, 8: 0 };
  for (const corner of corners) {
    if (squares[corner] === "X" && squares[opposites[corner]] === null) {
      return opposites[corner];
    }
  }

  // 6. Try to take any available corner
  const availableCorners = corners.filter((i) => squares[i] === null);
  if (availableCorners.length > 0) {
    const move =
      availableCorners[Math.floor(Math.random() * availableCorners.length)];
    return move;
  }

  // 7. Try to take a random available side
  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter((i) => squares[i] === null);
  if (availableSides.length > 0) {
    const move =
      availableSides[Math.floor(Math.random() * availableSides.length)];
    return move;
  }

  const fallbackMove = emptyIndices.length > 0 ? emptyIndices[0] : null;
  return fallbackMove;
}

// --- Main TicTacToe game component ---
const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(false);
  const [mode, setMode] = useState<"bot" | "local">("bot");

  const winnerInfo = calculateWinner(board);
  const gameOver = !!winnerInfo;

  // Debug: Log board, xIsNext, isBotThinking, mode, winnerInfo
  // console.log("[DEBUG] Render:", { board, xIsNext, isBotThinking, mode, winnerInfo });

  // --- Player's Move Handler ---
  const handlePlayerClick = (i: number) => {
    const currentWinner = calculateWinner(board);
    const gameIsOver = !!currentWinner;
    // console.log("[DEBUG] handlePlayerClick", { i, board, currentWinner, gameIsOver, mode, xIsNext, isBotThinking });
    if (board[i] || gameIsOver) {
      // console.log("[DEBUG] Click ignored: Square filled or game over");
      return;
    }
    if (mode === "bot") {
      if (!xIsNext || isBotThinking) {
        // console.log("[DEBUG] Click ignored: Not player's turn or bot is thinking");
        return;
      }
      const nextBoard = board.slice();
      nextBoard[i] = "X";
      setBoard(nextBoard);
      setXIsNext(false);
      // console.log("[DEBUG] Player (X) moved", { nextBoard });
    } else {
      // local mode: alternate X and O
      const nextBoard = board.slice();
      nextBoard[i] = xIsNext ? "X" : "O";
      setBoard(nextBoard);
      setXIsNext(!xIsNext);
      // console.log("[DEBUG] Local move", { nextBoard, nextPlayer: !xIsNext ? "X" : "O" });
    }
  };

  // --- Bot's Move Logic ---
  useEffect(() => {
    // console.log("[DEBUG] useEffect triggered", { mode, board, xIsNext, isBotThinking });
    if (mode !== "bot") return;
    const currentWinner = calculateWinner(board);
    const boardIsFull = !board.includes(null);
    const gameIsOverNow = !!currentWinner || boardIsFull;
    // console.log("[DEBUG] Bot effect state", { currentWinner, boardIsFull, gameIsOverNow, isBotThinking, xIsNext });

    // Always reset bot thinking if the game is over
    if (gameIsOverNow) {
      if (isBotThinking) {
        // console.log("[DEBUG] Game over, resetting isBotThinking");
        setIsBotThinking(false);
      }
      return;
    }

    // Only let the bot move if it's the bot's turn and the game is not over
    if (!xIsNext) {
      if (isBotThinking) {
        // console.log("[DEBUG] Bot is already thinking, skipping");
        return;
      }
      setIsBotThinking(true);
      // console.log("[DEBUG] Bot is thinking...");

      const bestMove = findBestBotMove(board);
      // console.log("[DEBUG] Bot bestMove", { bestMove });

      const timer = setTimeout(() => {
        if (bestMove !== null && board[bestMove] === null) {
          const nextBoard = board.slice();
          nextBoard[bestMove] = "O";
          setBoard(nextBoard);
          setXIsNext(true);
          // console.log("[DEBUG] Bot (O) moved", { nextBoard });
        } else {
          setXIsNext(true);
          // console.log("[DEBUG] Bot turn skipped or invalid move");
        }
        setIsBotThinking(false);
        // console.log("[DEBUG] Bot finished thinking");
      }, 700);

      return () => {
        clearTimeout(timer);
        // console.log("[DEBUG] Bot move timer cleared");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, xIsNext, mode]);

  // --- Restart Game Handler ---
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setIsBotThinking(false);
  };

  // --- Determine Status Message ---
  let status;
  if (winnerInfo && winnerInfo !== "Draw") {
    if (mode === "bot") {
      status = winnerInfo === "X" ? "You Won!" : "Bot Won!";
    } else {
      status = winnerInfo === "X" ? "X Won!" : "O Won!";
    }
  } else if (winnerInfo === "Draw") {
    status = "It's a Draw!";
  } else if (mode === "bot") {
    status = isBotThinking ? "Bot is thinking..." : "Your turn (X)";
  } else {
    status = xIsNext ? "X's turn" : "O's turn";
  }

  // --- Render Component ---
  return (
    <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-lg shadow-lg">
      {/* Mode Switch */}
      <div className="mb-4">
        <button
          className={`mr-2 px-3 py-1 rounded ${
            mode === "bot"
              ? "bg-blue-400 text-white"
              : "bg-gray-600 text-gray-200"
          }`}
          onClick={() => {
            setMode("bot");
            handleRestart();
          }}
          disabled={mode === "bot"}
        >
          User vs Bot
        </button>
        <button
          className={`px-3 py-1 rounded ${
            mode === "local"
              ? "bg-red-400 text-white"
              : "bg-gray-600 text-gray-200"
          }`}
          onClick={() => {
            setMode("local");
            handleRestart();
          }}
          disabled={mode === "local"}
        >
          User vs User (Local)
        </button>
      </div>
      {/* Status Display */}
      <div
        className={`text-xl font-semibold mb-4 h-7 ${
          winnerInfo && winnerInfo === "X"
            ? "text-green-400"
            : winnerInfo && winnerInfo === "O"
            ? "text-red-400"
            : winnerInfo === "Draw"
            ? "text-yellow-400"
            : isBotThinking
            ? "text-gray-400 animate-pulse"
            : "text-gray-100"
        }`}
      >
        {status}
      </div>
      {/* Game Board */}
      <div className="grid grid-cols-3">
        {board.map((_, i) => (
          <Square
            key={i}
            value={board[i]}
            onSquareClick={() => handlePlayerClick(i)}
            disabled={
              !!board[i] ||
              gameOver ||
              (mode === "bot" && (isBotThinking || !xIsNext))
            }
          />
        ))}
      </div>
      {/* Restart Button */}
      {gameOver && (
        <button
          type="button"
          onClick={handleRestart}
          className="mt-4 px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500"
        >
          {" "}
          Play Again?{" "}
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
