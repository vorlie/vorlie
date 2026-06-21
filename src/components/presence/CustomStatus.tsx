import MarqueeText from "../MarqueeText";
import { Activity } from "../../types/lanyard";

declare global {
  interface Window {
    twemoji: {
      parse: (input: string) => string;
    };
  }
}

interface CustomStatusProps {
  customStatus: Activity;
}

function CustomStatus({ customStatus }: CustomStatusProps) {
  if (!customStatus.state) return null;

  return (
    <MarqueeText
      className="max-w-[8rem] font-bold"
      title={customStatus.state}
    >
      {customStatus.emoji?.id ? (
        <img
          src={`https://cdn.discordapp.com/emojis/${
            customStatus.emoji.id
          }.webp?size=32&animated=${
            customStatus.emoji.animated ? "true" : "false"
          }`}
          alt={customStatus.emoji.name}
          className="inline h-4 align-text-bottom mr-1"
          title={customStatus.emoji.name}
        />
      ) : customStatus.emoji?.name ? (
        <span
          className="mr-1 inline-block align-text-bottom"
          ref={(el) => {
            if (el && window.twemoji) {
              el.innerHTML = window.twemoji.parse(
                customStatus.emoji?.name ?? "",
              );
            }
          }}
        ></span>
      ) : null}
      {customStatus.state}
    </MarqueeText>
  );
}

export default CustomStatus;
