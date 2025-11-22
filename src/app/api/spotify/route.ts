import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=5`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token!,
    }),
  });

  return response.json();
};

export async function GET() {
  if (!client_id || !client_secret || !refresh_token) {
    return NextResponse.json(
      { error: "Missing Spotify environment variables" },
      { status: 500 }
    );
  }

  try {
    const tokenResponse = await getAccessToken();
    
    if (tokenResponse.error || !tokenResponse.access_token) {
      console.error("Spotify Token Error:", tokenResponse);
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 401 }
      );
    }

    const { access_token } = tokenResponse;

    // Fetch Now Playing
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    let nowPlaying = null;

    if (nowPlayingRes.status === 204 || nowPlayingRes.status > 400) {
      // Nothing playing
    } else {
      const song = await nowPlayingRes.json();
      // console.log("Spotify Song Data:", JSON.stringify(song.item, null, 2)); // Debugging
      if (song.item) {
        nowPlaying = {
          isPlaying: song.is_playing,
          title: song.item.name,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
          album: song.item.album.name,
          cover: song.item.album.images[0].url,
          link: song.item.external_urls.spotify,
          uri: song.item.uri,
          duration: song.item.duration_ms / 1000, // seconds
          progress: song.progress_ms / 1000, // seconds
        };
        console.log(`Song: ${nowPlaying.title}, URI: ${nowPlaying.uri}`);
      }
    }

    // Fetch Recently Played
    const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    let recentlyPlayed = [];
    if (recentlyPlayedRes.ok) {
      const recentlyPlayedData = await recentlyPlayedRes.json();
      if (recentlyPlayedData.items) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recentlyPlayed = recentlyPlayedData.items.map((item: any) => ({
          title: item.track.name,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          artist: item.track.artists.map((_artist: any) => _artist.name).join(", "),
          cover: item.track.album.images[0].url,
          link: item.track.external_urls.spotify,
          uri: item.track.uri, // Include URI for playback
        }));
      }
    } else {
      console.error("Spotify Recently Played Error:", await recentlyPlayedRes.text());
    }

    return NextResponse.json({
      nowPlaying,
      recentlyPlayed,
      access_token, // Include token for Web Playback SDK
    });
  } catch (error) {
    console.error("Spotify API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch music data" },
      { status: 500 }
    );
  }
}
