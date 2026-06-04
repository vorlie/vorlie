import { useState, useEffect } from "react";
import SEO from "../components/SEO";

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
    null,
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
            : null,
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
            new Date(Number(userData.verifiedAt) * 1000).toLocaleString(),
          );
        }
      }
    }
  }, []);

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 text-m3-on-surface">
      <SEO
        title="Account Verification"
        description="Verify your account status by logging in with Discord."
        url="https://vorlie.pl/verify"
      />
      <div className="max-w-md w-full rounded-none bg-m3-surface-container p-8 sm:p-10 shadow-sm border border-m3-outline/10 text-center flex flex-col items-center">
        <h1 className="text-3xl font-black mb-10 text-m3-primary tracking-tight">
          Account Verification
        </h1>

        {verificationStatus ? (
          <div className="w-full flex flex-col items-center">
            <div
              className={`relative rounded-[32px] p-1.5 transition-all duration-500 border-2 ${user?.verified ? "border-m3-primary/50" : "border-m3-outline/20"} mb-6 shadow-inner`}
            >
              <div className="relative rounded-[24px] overflow-hidden w-28 h-28 shadow-lg">
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
            </div>

            <div className="bg-m3-surface-variant/20 rounded-none p-6 w-full mb-8 border border-m3-outline/5">
              <p className="text-lg font-bold text-m3-on-surface mb-2">
                {user?.username}
              </p>
              <p className="text-xs font-black uppercase tracking-widest text-m3-primary opacity-70 mb-4">
                ID: {user?.userId}
              </p>

              {verifiedDate && (
                <div className="pt-4 border-t border-m3-outline/10">
                  <p className="text-xs font-black uppercase tracking-widest text-m3-on-surface-variant opacity-50 mb-1">
                    Verified on
                  </p>
                  <p className="text-sm font-bold opacity-80">{verifiedDate}</p>
                </div>
              )}
            </div>

            <div className="bg-m3-primary/10 text-m3-primary px-6 py-4 rounded-full border border-m3-primary/20 w-full animate-in zoom-in-95 duration-500">
              <p className="text-xl font-black tracking-tight">
                {verificationStatus}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6">
            <div className="p-6 bg-m3-surface-variant/20 rounded-none border border-m3-outline/5 leading-relaxed">
              <p className="text-lg text-m3-on-surface-variant font-medium">
                Please authenticate using Discord to link and verify your
                account status.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="https://vorlie.pl/?link=miko_support"
                className="w-full bg-m3-surface text-m3-primary font-black py-4 px-6 rounded-none border-2 border-m3-primary/20 hover:bg-m3-primary/10 transition-all flex items-center justify-center gap-2 group"
              >
                Join Discord Server
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>

              <a
                href="https://api.vorlie.pl/v1/login"
                className="w-full bg-m3-primary text-m3-on-primary font-black py-4 px-6 rounded-none shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-lg"
              >
                Login with Discord
              </a>
            </div>

            <p className="text-xs font-bold text-m3-on-surface-variant opacity-40 uppercase tracking-widest mt-4">
              Required for server access
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verify;
