import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAY_ENDPOINT = `https://api.spotify.com/v1/me/player/play`;

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

export async function POST(request: Request) {
  if (!client_id || !client_secret || !refresh_token) {
    return NextResponse.json(
      { error: "Missing Spotify environment variables" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { device_id, uri, uris } = body;

    const tokenResponse = await getAccessToken();
    
    if (tokenResponse.error || !tokenResponse.access_token) {
      console.error("Spotify Token Error:", tokenResponse);
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 401 }
      );
    }

    const { access_token } = tokenResponse;

    // Build the play request body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const playBody: any = {};
    if (uris) {
      playBody.uris = uris;
    } else if (uri) {
      playBody.uris = [uri];
    }

    // Build the URL with optional device_id
    const url = device_id 
      ? `${PLAY_ENDPOINT}?device_id=${device_id}`
      : PLAY_ENDPOINT;

    const playRes = await fetch(url, {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playBody),
    });

    if (playRes.status === 204) {
      return NextResponse.json({ success: true });
    } else {
      const error = await playRes.text();
      console.error("Spotify Play Error:", error);
      return NextResponse.json(
        { error: "Failed to play" },
        { status: playRes.status }
      );
    }
  } catch (error) {
    console.error("Spotify Play API Error:", error);
    return NextResponse.json(
      { error: "Failed to control playback" },
      { status: 500 }
    );
  }
}
