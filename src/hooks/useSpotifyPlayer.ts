"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface SpotifyPlayer {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addListener: (event: string, callback: (data: any) => void) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeListener: (event: string, callback?: (data: any) => void) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCurrentState: () => Promise<any>;
  setName: (name: string) => Promise<void>;
  getVolume: () => Promise<number>;
  setVolume: (volume: number) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  togglePlay: () => Promise<void>;
  seek: (position_ms: number) => Promise<void>;
  previousTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
}

interface WindowWithSpotify extends Window {
  Spotify?: {
    Player: new (options: {
      name: string;
      getOAuthToken: (cb: (token: string) => void) => void;
      volume: number;
    }) => SpotifyPlayer;
  };
  onSpotifyWebPlaybackSDKReady?: () => void;
}

declare let window: WindowWithSpotify;

export const useSpotifyPlayer = () => {
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isActive, setIsActive] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<SpotifyPlayer | null>(null);
  const positionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getAccessToken = useCallback(async (): Promise<string> => {
    const response = await fetch("/api/spotify");
    const data = await response.json();
    // We need to add an endpoint to get just the access token
    return data.access_token || "";
  }, []);

  useEffect(() => {
    const script = document.getElementById("spotify-player-script");
    if (!script) {
      const newScript = document.createElement("script");
      newScript.id = "spotify-player-script";
      newScript.src = "https://sdk.scdn.co/spotify-player.js";
      newScript.async = true;
      document.body.appendChild(newScript);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (!window.Spotify) return;

      const spotifyPlayer = new window.Spotify.Player({
        name: "Shrid's Portfolio Player",
        getOAuthToken: async (cb) => {
          const token = await getAccessToken();
          cb(token);
        },
        volume: 0.5,
      });

      spotifyPlayer.addListener("ready", ({ device_id }: { device_id: string }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }: { device_id: string }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spotifyPlayer.addListener("player_state_changed", (state: any) => {
        if (!state) {
          setIsActive(false);
          return;
        }

        setCurrentTrack(state.track_window.current_track);
        setIsPaused(state.paused);
        setPosition(state.position);
        setDuration(state.duration);
        setIsActive(true);
        
        // Clear existing interval
        if (positionIntervalRef.current) {
          clearInterval(positionIntervalRef.current);
        }
        
        // Update position every 100ms when playing for smooth progress
        if (!state.paused) {
          let lastPosition = state.position;
          positionIntervalRef.current = setInterval(() => {
            lastPosition += 100;
            setPosition(lastPosition);
          }, 100);
        }
      });

      spotifyPlayer.addListener("initialization_error", ({ message }: { message: string }) => {
        console.error("Initialization Error:", message);
      });

      spotifyPlayer.addListener("authentication_error", ({ message }: { message: string }) => {
        console.error("Authentication Error:", message);
      });

      spotifyPlayer.addListener("account_error", ({ message }: { message: string }) => {
        console.error("Account Error:", message);
      });

      spotifyPlayer.addListener("playback_error", ({ message }: { message: string }) => {
        console.error("Playback Error:", message);
      });

      spotifyPlayer.connect();
      playerRef.current = spotifyPlayer;
      setPlayer(spotifyPlayer);
    };

    return () => {
      if (positionIntervalRef.current) {
        clearInterval(positionIntervalRef.current);
      }
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
    };
  }, [getAccessToken]);

  const togglePlay = useCallback(async () => {
    if (!player) return;
    await player.togglePlay();
  }, [player]);

  const play = useCallback(
    async (uri?: string) => {
      if (!deviceId) return;

      const token = await getAccessToken();
      
      // Build the request body
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requestBody: any = {};
      
      if (uri) {
        requestBody.uris = [uri];
      }
      // If no URI provided, Spotify will resume current context or queue

      const body = Object.keys(requestBody).length > 0 ? JSON.stringify(requestBody) : undefined;

      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      
      if (!response.ok) {
        const error = await response.text();
        console.error("Failed to play:", response.status, error);
        
        // If there's no active context (404), we need to provide a track
        if (response.status === 404 && !uri) {
          throw new Error("No active playback context. Need to provide a track URI.");
        }
      }
    },
    [deviceId, getAccessToken]
  );

  const pause = useCallback(async () => {
    if (!player) return;
    await player.pause();
  }, [player]);

  const resume = useCallback(async () => {
    if (!player) return;
    await player.resume();
  }, [player]);

  const seek = useCallback(
    async (position_ms: number) => {
      if (!player) return;
      await player.seek(position_ms);
    },
    [player]
  );

  return {
    player,
    deviceId,
    isPaused,
    isActive,
    currentTrack,
    position,
    duration,
    togglePlay,
    play,
    pause,
    resume,
    seek,
  };
};
