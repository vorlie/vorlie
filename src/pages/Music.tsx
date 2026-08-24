import { useState } from "react";
//import { Link } from "react-router-dom";
import {
  Disc3,
  ExternalLink,
  Headphones,
  Music2,
  Play,
  RefreshCw,
  Radio,
  Trophy,
} from "lucide-react";

import { useLastFm, type LastFmPeriod } from "../hooks/useLastFm";

const periods: Array<{
  value: LastFmPeriod;
  label: string;
}> = [
  { value: "7day", label: "7 days" },
  { value: "1month", label: "1 month" },
  { value: "3month", label: "3 months" },
  { value: "6month", label: "6 months" },
  { value: "12month", label: "1 year" },
  { value: "overall", label: "All time" },
];

const formatNumber = (value: number) => value.toLocaleString();

export default function Music() {
  const [period, setPeriod] = useState<LastFmPeriod>("1month");

  const {
    nowPlaying,
    recentTracks,
    topArtists,
    topTracks,
    topAlbums,
    loading,
    error,
    refresh,
  } = useLastFm(period);

  return (
    <main className="page music-page">
      <header className="music-page__header">
        <div>
          <div className="page-header__eyebrow">Last.fm</div>

          <h1>Music</h1>

          <p>What I've been listening to lately.</p>
        </div>

        <a
          href="https://www.last.fm/user/vorlie"
          target="_blank"
          rel="noreferrer"
          className="music-page__lastfm-link"
        >
          <Headphones size={16} />
          Last.fm
          <ExternalLink size={14} />
        </a>
      </header>

      {error && (
        <div className="music-error">
          <span className="material-symbols-rounded">error</span>

          <span>{error}</span>

          <button type="button" onClick={() => void refresh()}>
            Try again
          </button>
        </div>
      )}

      <section className="music-now-playing">
        <div className="music-section__label">
          <Radio size={14} />
          Now playing
        </div>

        {nowPlaying ? (
          <a
            href={nowPlaying.url}
            target="_blank"
            rel="noreferrer"
            className="now-playing"
          >
            <div className="now-playing__art">
              {nowPlaying.image ? (
                <img src={nowPlaying.image} alt="" />
              ) : (
                <Music2 size={32} />
              )}
            </div>

            <div className="now-playing__info">
              <span className="now-playing__status">
                <span />
                Listening now
              </span>

              <h2>{nowPlaying.name}</h2>

              <p>{nowPlaying.artist}</p>

              {nowPlaying.album && <span>{nowPlaying.album}</span>}
            </div>

            <ExternalLink size={18} className="now-playing__external" />
          </a>
        ) : (
          <div className="now-playing now-playing--empty">
            <div className="now-playing__empty-icon">
              <Music2 size={28} />
            </div>

            <div>
              <h2>Nothing playing</h2>
              <p>I'm probably doing something else.</p>
            </div>
          </div>
        )}
      </section>

      <section className="music-section">
        <div className="music-section__header">
          <div>
            <div className="music-section__label">
              <Play size={14} />
              Recently played
            </div>

            <h2>Recent tracks</h2>
          </div>

          <button
            type="button"
            className="music-refresh"
            onClick={() => void refresh()}
            disabled={loading}
            title="Refresh"
          >
            <RefreshCw
              size={15}
              className={loading ? "music-refresh__spinning" : ""}
            />
          </button>
        </div>

        <div className="recent-tracks">
          {recentTracks.map((track, index) => (
            <a
              key={`${track.url}-${index}`}
              href={track.url}
              target="_blank"
              rel="noreferrer"
              className="recent-track"
            >
              <div className="recent-track__art">
                {track.image ? (
                  <img src={track.image} alt="" loading="lazy" />
                ) : (
                  <Music2 size={18} />
                )}
              </div>

              <div className="recent-track__info">
                <strong>{track.name}</strong>
                <span>{track.artist}</span>
              </div>

              {track.isPlaying && (
                <span className="recent-track__live">
                  <span />
                  LIVE
                </span>
              )}

              <ExternalLink size={14} className="recent-track__external" />
            </a>
          ))}
        </div>
      </section>

      <div className="music-period">
        <div>
          <div className="music-section__label">
            <Trophy size={14} />
            Listening history
          </div>

          <h2>My favorites</h2>
        </div>

        <div className="music-period__controls">
          {periods.map((item) => (
            <button
              key={item.value}
              type="button"
              className={
                period === item.value
                  ? "music-period__button music-period__button--active"
                  : "music-period__button"
              }
              onClick={() => setPeriod(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <section className="music-grid">
        <div className="music-card">
          <div className="music-card__header">
            <div>
              <span className="music-card__eyebrow">Artists</span>
              <h3>Top artists</h3>
            </div>

            <Music2 size={18} />
          </div>

          <div className="artist-list">
            {topArtists.map((artist, index) => (
              <a
                key={artist.url}
                href={artist.url}
                target="_blank"
                rel="noreferrer"
                className="artist-row"
              >
                <span className="artist-row__rank">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="artist-row__image">
                  {artist.image ? (
                    <img src={artist.image} alt="" loading="lazy" />
                  ) : (
                    artist.name.charAt(0)
                  )}
                </div>

                <div className="artist-row__info">
                  <strong>{artist.name}</strong>
                  <span>{formatNumber(artist.playcount)} plays</span>
                </div>

                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        </div>

        <div className="music-card">
          <div className="music-card__header">
            <div>
              <span className="music-card__eyebrow">Tracks</span>
              <h3>Top tracks</h3>
            </div>

            <Play size={18} />
          </div>

          <div className="ranked-list">
            {topTracks.map((track, index) => (
              <a
                key={track.url}
                href={track.url}
                target="_blank"
                rel="noreferrer"
                className="ranked-row"
              >
                <span className="ranked-row__rank">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="ranked-row__image">
                  {track.image ? (
                    <img src={track.image} alt="" loading="lazy" />
                  ) : (
                    <Music2 size={16} />
                  )}
                </div>

                <div className="ranked-row__info">
                  <strong>{track.name}</strong>
                  <span>{track.artist}</span>
                </div>

                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        </div>

        <div className="music-card music-card--wide">
          <div className="music-card__header">
            <div>
              <span className="music-card__eyebrow">Albums</span>
              <h3>Top albums</h3>
            </div>

            <Disc3 size={18} />
          </div>

          <div className="album-grid">
            {topAlbums.map((album) => (
              <a
                key={album.url}
                href={album.url}
                target="_blank"
                rel="noreferrer"
                className="album"
              >
                <div className="album__image">
                  {album.image ? (
                    <img src={album.image} alt="" loading="lazy" />
                  ) : (
                    <Disc3 size={24} />
                  )}
                </div>

                <strong>{album.name}</strong>
                <span>{album.artist}</span>
                <small>{formatNumber(album.playcount)} plays</small>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
