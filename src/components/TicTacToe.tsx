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
  // console.log("[findBestBotMove] Input board:", JSON.stringify(squares));
  const emptyIndices = squares
    .map((sq, idx) => (sq === null ? idx : null))
    .filter((idx) => idx !== null) as number[];
  // console.log("[findBestBotMove] Empty indices:", emptyIndices);

  // 1. Check if Bot ('O') can win in the next move
  for (const i of emptyIndices) {
    const tempBoard = squares.slice();
    tempBoard[i] = "O";
    if (calculateWinner(tempBoard) === "O") {
      // console.log("[findBestBotMove] Found winning move for O:", i);
      return i; // Winning move
    }
  }

  // 2. Check if Player ('X') could win in the next move, and block them
  for (const i of emptyIndices) {
    const tempBoard = squares.slice();
    tempBoard[i] = "X";
    if (calculateWinner(tempBoard) === "X") {
      // console.log("[findBestBotMove] Found blocking move for X:", i);
      return i; // Blocking move
    }
  }

  // 3. Try to take the center square if available
  if (squares[4] === null) {
    // console.log("[findBestBotMove] Taking center:", 4);
    return 4;
  }

  // 4. Try to take the opposite corner from the player
  // If player took a corner, and the opposite is free, take it.
  const corners = [0, 2, 6, 8];
  const opposites: { [key: number]: number } = { 0: 8, 2: 6, 6: 2, 8: 0 };
  for (const corner of corners) {
    if (squares[corner] === "X" && squares[opposites[corner]] === null) {
      // console.log(`[findBestBotMove] Player has corner ${corner}, taking opposite ${opposites[corner]}`);
      return opposites[corner];
    }
  }

  // 5. Try to take *any* available corner (Prioritized over sides)
  const availableCorners = corners.filter((i) => squares[i] === null);
  if (availableCorners.length > 0) {
    // Pick a random available corner
    const move =
      availableCorners[Math.floor(Math.random() * availableCorners.length)];
    // console.log("[findBestBotMove] Taking random available corner:", move);
    return move;
  }

  // 6. Try to take a random available side (Last resort if no better move)
  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter((i) => squares[i] === null);
  if (availableSides.length > 0) {
    const move =
      availableSides[Math.floor(Math.random() * availableSides.length)];
    // console.log("[findBestBotMove] Taking random available side:", move);
    return move;
  }

  const fallbackMove = emptyIndices.length > 0 ? emptyIndices[0] : null;
  // console.log("[findBestBotMove] No strategic move found, using fallback:", fallbackMove);
  return fallbackMove;
}

// --- Main TicTacToe game component ---
const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(false);

  //console.log("--- Render ---", {xIsNext,isBotThinking,board: JSON.stringify(board),});

  const winnerInfo = calculateWinner(board);
  const gameOver = !!winnerInfo;

  // --- Player's Move Handler ---
  const handlePlayerClick = (i: number) => {
    //console.log(`[handlePlayerClick] Square ${i} clicked.`);
    const currentWinner = calculateWinner(board);
    const gameIsOver = !!currentWinner;
    if (board[i] || gameIsOver || !xIsNext || isBotThinking) {
      //console.log(`[handlePlayerClick] Ignoring click. Conditions: board[i]=${!!board[i]}, gameIsOver=${gameIsOver}, !xIsNext=${!xIsNext}, isBotThinking=${isBotThinking}`);
      return;
    }
    const nextBoard = board.slice();
    nextBoard[i] = "X";
    //console.log(`[handlePlayerClick] Setting board and xIsNext=false.`);
    setBoard(nextBoard);
    setXIsNext(false);
  };

  // --- Bot's Move Logic ---
  useEffect(() => {
    const currentWinner = calculateWinner(board);
    const boardIsFull = !board.includes(null);
    const gameIsOverNow = !!currentWinner || boardIsFull;

    // console.log(`[useEffect] Running. xIsNext=${xIsNext}, board changed.`);

    // --- Main condition to trigger bot ---
    if (!xIsNext && !gameIsOverNow) {
      // --- Check if bot is already thinking ---
      if (isBotThinking) {
        //console.log("[useEffect] Bot is already thinking, skipping new move trigger.");
        return;
      }
      // --- End check ---

      //console.log("[useEffect] Bot's turn detected. Setting isBotThinking=true.");
      setIsBotThinking(true);

      const bestMove = findBestBotMove(board);
      //console.log("[useEffect] findBestBotMove returned:", bestMove);

      const timer = setTimeout(() => {
        //console.log("[useEffect] setTimeout callback executing. bestMove:",bestMove);
        if (bestMove !== null && board[bestMove] === null) {
          const nextBoard = board.slice();
          nextBoard[bestMove] = "O";
          //console.log("[useEffect] setTimeout: Calling setBoard and setXIsNext(true).");
          setBoard(nextBoard);
          setXIsNext(true);
        } else {
          //console.warn("[useEffect] setTimeout: bestMove was null or square already taken! bestMove:",bestMove);
          setXIsNext(true);
        }
        console.log("[useEffect] setTimeout: Calling setIsBotThinking(false).");
        setIsBotThinking(false);
      }, 700);

      return () => {
        //console.log("[useEffect] Cleanup for this run: Clearing timeout ID",timer);
        clearTimeout(timer);
      };
    }
    else if (gameIsOverNow && isBotThinking) {
      //console.log("[useEffect] Game ended while bot thinking? Resetting isBotThinking.");
      setIsBotThinking(false);
    } else {
      // console.log(`[useEffect] Conditions not met for bot move. !xIsNext=${!xIsNext}, !gameIsOverNow=${!gameIsOverNow}, isBotThinking=${isBotThinking}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, xIsNext]);

  // --- Restart Game Handler ---
  const handleRestart = () => {
    //console.log("[handleRestart] Resetting game.");
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setIsBotThinking(false);
  };

  // --- Determine Status Message ---
  let status;
  if (winnerInfo && winnerInfo !== "Draw") {
    status = winnerInfo === "X" ? "You Won!" : "Bot Won!";
  } else if (winnerInfo === "Draw") {
    status = "It's a Draw!";
  } else {
    status = isBotThinking ? "Bot is thinking..." : "Your turn (X)";
  }

  // --- Render Component ---
  return (
    <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-lg shadow-lg">
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
            disabled={!!board[i] || gameOver || isBotThinking || !xIsNext}
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
