import { useState, useEffect } from "react";

interface User {
  userId: string;
  username: string;
  avatar: string;
  verifiedAt: string;
  verified: boolean;
}

function Verify() {
  const [user, setUser] = useState<User | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  );
  const [verifiedDate, setVerifiedDate] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<boolean>(false);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setVerificationStatus(parsedUser.verified ? "You are verified!" : null);
        setVerifiedDate(
          parsedUser.verifiedAt
            ? new Date(Number(parsedUser.verifiedAt) * 1000).toLocaleString()
            : null
        );
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const urlUserId = urlParams.get("id");
        const urlUsername = urlParams.get("username");
        const urlAvatar = urlParams.get("avatar");
        const urlVerifiedAt = urlParams.get("verified_at");
        const urlVerified = urlParams.get("verified");

        if (urlUserId && urlUsername && urlAvatar && urlVerifiedAt) {
          const userData: User = {
            userId: urlUserId,
            username: urlUsername,
            avatar: urlAvatar,
            verifiedAt: urlVerifiedAt,
            verified: urlVerified === "true",
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
          setVerificationStatus(userData.verified ? "You are verified!" : null);
          setVerifiedDate(
            new Date(Number(userData.verifiedAt) * 1000).toLocaleString()
          );
        }
      }
    }
  }, []);

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  return (
    <div className="mt-8 text-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full rounded-lg shadow-lg bg-gray-800/50 p-4">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">
          Verify Account
        </h1>
        {verificationStatus ? (
          <div className="text-center">
            <div className="relative rounded-full overflow-hidden w-24 h-24 mx-auto mb-4">
              {user?.userId && (
                <img
                  src={
                    !avatarError && user?.avatar
                      ? `https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}.png`
                      : `/images/0.png`
                  }
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                  onError={handleAvatarError}
                />
              )}
            </div>
            <p className="text-lg text-gray-300 mb-2">
              <strong>Username:</strong> {user?.username} (
              <span className="text-red-400">{user?.userId}</span>)
            </p>
            {verifiedDate && (
              <p className="text-sm text-gray-400 mb-4">
                <strong>Verified at:</strong> {verifiedDate}
              </p>
            )}
            <p className="text-xl font-semibold text-green-400">
              {verificationStatus}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-300 mb-4">
              Please log in to verify your account.
            </p>
            <p className="text-sm text-gray-400 mb-2">
              Make sure you join our Discord server before logging in:
            </p>
            <a
              href="https://vorlie.pl/?link=miko_support"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors mb-2"
            >
              Join Our Discord Server
            </a>{" "}
            <a
              href="https://api.vorlie.pl/v1/login"
              className="inline-block bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Login with Discord
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verify;
