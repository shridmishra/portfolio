import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PAUSE_ENDPOINT = `https://api.spotify.com/v1/me/player/pause`;

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

export async function POST() {
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

    const pauseRes = await fetch(PAUSE_ENDPOINT, {
      method: "PUT",
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (pauseRes.status === 204) {
      return NextResponse.json({ success: true });
    } else {
      const error = await pauseRes.text();
      console.error("Spotify Pause Error:", error);
      return NextResponse.json(
        { error: "Failed to pause" },
        { status: pauseRes.status }
      );
    }
  } catch (error) {
    console.error("Spotify Pause API Error:", error);
    return NextResponse.json(
      { error: "Failed to control playback" },
      { status: 500 }
    );
  }
}
