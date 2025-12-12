// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Pause, SkipForward, SkipBack, X, Music2, History, Check, Disc, Battery, Signal, Wifi } from "lucide-react";
// import { cn } from "@/src/lib/utils";
// import Link from "next/link";
// import { FaSpotify } from "react-icons/fa";
// import Image from "next/image";

// interface Track {
//   id: string;
//   name: string;
//   artists: string;
//   album: string;
//   duration_ms: number;
//   uri: string;
//   image: string;
//   external_url: string;
// }

// interface SpotifyPlayer {
//   connect: () => Promise<boolean>;
//   disconnect: () => void;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   addListener: (event: string, callback: (data: any) => void) => boolean;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   removeListener: (event: string, callback?: (data: any) => void) => void;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   getCurrentState: () => Promise<any>;
//   pause: () => Promise<void>;
//   resume: () => Promise<void>;
//   togglePlay: () => Promise<void>;
//   nextTrack: () => Promise<void>;
//   previousTrack: () => Promise<void>;
//   seek: (position_ms: number) => Promise<void>;
// }

// interface WindowWithSpotify extends Window {
//   Spotify?: {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     Player: new (options: any) => SpotifyPlayer;
//   };
//   onSpotifyWebPlaybackSDKReady?: () => void;
// }

// declare let window: WindowWithSpotify;

// export const Walkman = () => {
//   const [tracks, setTracks] = useState<Track[]>([]);
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [showPlaylist, setShowPlaylist] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
//   const [deviceId, setDeviceId] = useState<string | null>(null);
//   const [position, setPosition] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isLoadingTrack, setIsLoadingTrack] = useState(false);
//   const playerRef = useRef<SpotifyPlayer | null>(null);
//   const [currentTime, setCurrentTime] = useState("");

//   useEffect(() => {
//     setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//     const timer = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Fetch Desi Hip Hop songs from Spotify API
//   useEffect(() => {
//     const fetchArijitSongs = async () => {
//       try {
//         const response = await fetch('/api/spotify/search?q=latest&type=track&limit=10');
//         const data = await response.json();

//         if (data.tracks) {
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const formattedTracks: Track[] = data.tracks.map((track: any) => ({
//             id: track.id,
//             name: track.name,
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             artists: track.artists.map((a: any) => a.name).join(", "),
//             album: track.album.name,
//             duration_ms: track.duration_ms,
//             uri: track.uri,
//             image: track.album.images[0]?.url || "",
//             external_url: track.external_urls.spotify
//           }));
//           setTracks(formattedTracks);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching tracks:", error);
//         setLoading(false);
//       }
//     };

//     fetchArijitSongs();
//   }, []);

//   // Initialize Spotify Web Playback SDK
//   useEffect(() => {
//     const initializePlayer = () => {
//       if (!window.Spotify) return;

//       const spotifyPlayer = new window.Spotify.Player({
//         name: "Portfolio Spotify Player",
//         getOAuthToken: async (cb: (token: string) => void) => {
//           const response = await fetch("/api/spotify/token");
//           const data = await response.json();
//           cb(data.access_token);
//         },
//         volume: 0.5,
//       });

//       spotifyPlayer.addListener("ready", ({ device_id }: { device_id: string }) => {
//         console.log("Ready with Device ID", device_id);
//         setDeviceId(device_id);
//       });

//       spotifyPlayer.addListener("not_ready", ({ device_id }: { device_id: string }) => {
//         console.log("Device ID has gone offline", device_id);
//         setDeviceId(null);
//       });

//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       spotifyPlayer.addListener("player_state_changed", (state: any) => {
//         if (!state) {
//           setIsPlaying(false);
//           setIsLoadingTrack(false);
//           return;
//         }

//         setIsPlaying(!state.paused);
//         setPosition(state.position);
//         setDuration(state.duration);

//         // Clear loading state when track starts playing
//         if (!state.paused) {
//           setIsLoadingTrack(false);
//         }

//         if (state.duration > 0) {
//           setProgress((state.position / state.duration) * 100);
//         }
//       });

//       spotifyPlayer.connect();
//       setPlayer(spotifyPlayer);
//       playerRef.current = spotifyPlayer;
//     };

//     const script = document.getElementById("spotify-player-script");
//     if (!script) {
//       const newScript = document.createElement("script");
//       newScript.id = "spotify-player-script";
//       newScript.src = "https://sdk.scdn.co/spotify-player.js";
//       newScript.async = true;
//       document.body.appendChild(newScript);
//     }

//     if (window.Spotify) {
//       initializePlayer();
//     } else {
//       window.onSpotifyWebPlaybackSDKReady = initializePlayer;
//     }

//     return () => {
//       if (playerRef.current) {
//         playerRef.current.disconnect();
//       }
//     };
//   }, []);

//   // Update progress when playing
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isPlaying && duration > 0) {
//       interval = setInterval(() => {
//         setPosition((prev) => {
//           const newPos = prev + 1000;
//           if (newPos >= duration) {
//             handleNext();
//             return 0;
//           }
//           setProgress((newPos / duration) * 100);
//           return newPos;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isPlaying, duration]);

//   const playTrack = async (trackUri: string) => {
//     if (!deviceId) return;

//     setIsLoadingTrack(true);
//     try {
//       const response = await fetch("/api/spotify/play", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ device_id: deviceId, uris: [trackUri] })
//       });

//       if (response.ok) {
//         setIsPlaying(true);
//       } else {
//         setIsLoadingTrack(false);
//       }
//     } catch (error) {
//       console.error("Error playing track:", error);
//       setIsLoadingTrack(false);
//     }
//   };

//   const togglePlay = async () => {
//     if (!player) return;

//     if (isPlaying) {
//       await player.pause();
//     } else {
//       setIsLoadingTrack(true);
//       // If deviceId is available and we have tracks, always use playTrack for initial play
//       if (deviceId && tracks.length > 0) {
//         await playTrack(tracks[currentTrackIndex].uri);
//       } else if (!deviceId && tracks.length > 0) {
//         // Wait for device to be ready
//         console.log("Waiting for device to be ready...");
//         setIsLoadingTrack(false);
//       } else {
//         await player.resume();
//       }
//     }
//   };

//   const handleNext = async () => {
//     const nextIndex = (currentTrackIndex + 1) % tracks.length;
//     setCurrentTrackIndex(nextIndex);
//     setProgress(0);
//     setPosition(0);
//     setIsLoadingTrack(true);
//     if (tracks[nextIndex]) {
//       await playTrack(tracks[nextIndex].uri);
//     }
//   };

//   const handlePrevious = async () => {
//     const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
//     setCurrentTrackIndex(prevIndex);
//     setProgress(0);
//     setPosition(0);
//     setIsLoadingTrack(true);
//     if (tracks[prevIndex]) {
//       await playTrack(tracks[prevIndex].uri);
//     }
//   };

//   const handleSeek = async (seekProgress: number) => {
//     if (!player || !duration) return;
//     const position_ms = (seekProgress / 100) * duration;
//     await player.seek(position_ms);
//     setProgress(seekProgress);
//     setPosition(position_ms);
//   };

//   const selectTrack = async (index: number) => {
//     setCurrentTrackIndex(index);
//     setProgress(0);
//     setPosition(0);
//     setShowPlaylist(false);
//     setIsLoadingTrack(true);
//     await playTrack(tracks[index].uri);
//   };

//   if (loading || tracks.length === 0) {
//     return (
//       <div className="w-full h-full bg-[#3b82f6] rounded-xl p-5 flex items-center justify-center border border-blue-600">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
//           <p className="text-white/80 font-mono text-xs animate-pulse">LOADING SYSTEM...</p>
//         </div>
//       </div>
//     );
//   }

//   const currentTrack = tracks[currentTrackIndex];
//   const currentSeconds = position / 1000;
//   const totalSeconds = duration / 1000;

//   return (
//     <div className="w-full h-full flex items-center justify-center bg-transparent p-4 font-sans">
//       <div className="relative w-full max-w-[640px] aspect-[1.4/1] bg-[#3b82f6] rounded-[2.5rem] p-6 shadow-2xl flex gap-6 border-b-8 border-r-8 border-[#2563eb] transition-all duration-300">
//         {/* Top Buttons */}
//         <div className="absolute -top-1.5 left-16 flex gap-4 z-0">
//           <div className="w-10 h-3 bg-[#2563eb] rounded-t-md shadow-sm" />
//           <div className="w-10 h-3 bg-[#2563eb] rounded-t-md shadow-sm" />
//           <div className="w-10 h-3 bg-[#2563eb] rounded-t-md shadow-sm" />
//         </div>

//         {/* Screen */}
//         <div className="flex-1 bg-[#fdfbf7] rounded-2xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden relative z-10 border-4 border-black/5">
//           {/* Status Bar */}
//           <div className="h-8 flex justify-between items-center px-4 pt-2 text-[10px] font-bold text-zinc-400 font-mono">
//             <div className="flex items-center gap-1">
//               <div className="flex gap-0.5 items-end h-3">
//                 <div className="w-0.5 h-1 bg-zinc-400" />
//                 <div className="w-0.5 h-1.5 bg-zinc-400" />
//                 <div className="w-0.5 h-2 bg-zinc-400" />
//                 <div className="w-0.5 h-2.5 bg-zinc-400" />
//               </div>
//               <span>GPRS</span>
//             </div>
//             <span>{currentTime}</span>
//             <div className="flex items-center gap-1">
//               <span>{deviceId ? "READY" : "WAIT"}</span>
//               <div className="w-4 h-2 border border-zinc-400 rounded-sm p-0.5 flex">
//                 <div className="w-2/3 h-full bg-zinc-400" />
//               </div>
//             </div>
//           </div>

//           {/* Main Display */}
//           <div className="flex-1 p-5 flex flex-col relative">
//             <div className="flex gap-5 items-center flex-1">
//               {/* Album Art */}
//               <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-200 rounded-md shadow-md relative overflow-hidden flex-shrink-0 border border-zinc-900/10 group cursor-pointer" onClick={() => setShowPlaylist(true)}>
//                 {currentTrack?.image ? (
//                   <Image src={currentTrack.image} alt="Album" fill className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-zinc-100">
//                     <Disc className="text-zinc-300 animate-spin-slow" size={40} />
//                   </div>
//                 )}
//                 {/* Vinyl overlay effect */}
//                 <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
//               </div>

//               {/* Track Info */}
//               <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
//                 <Music2 size={24} className="text-zinc-800 mb-2 animate-bounce" />
//                 <h2 className="text-xl md:text-2xl font-black text-zinc-900 leading-none truncate font-sans tracking-tight">
//                   {currentTrack?.name || "No Track"}
//                 </h2>
//                 <p className="text-sm md:text-base font-bold text-zinc-600 truncate">
//                   {currentTrack?.artists || "Select a song"}
//                 </p>
//                 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
//                   {currentTrack?.album || "Unknown Album"}
//                 </p>
//               </div>
//             </div>

//             {/* Progress */}
//             <div className="mt-auto pt-4">
//               <div className="flex justify-between text-[10px] font-bold text-zinc-400 font-mono mb-1.5">
//                 <span>{Math.floor(currentSeconds / 60)}:{String(Math.floor(currentSeconds % 60)).padStart(2, '0')}</span>
//                 <span>{Math.floor(totalSeconds / 60)}:{String(Math.floor(totalSeconds % 60)).padStart(2, '0')}</span>
//               </div>
//               <div
//                 className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden cursor-pointer relative group"
//                 onClick={(e) => {
//                   const rect = e.currentTarget.getBoundingClientRect();
//                   const x = e.clientX - rect.left;
//                   const percentage = (x / rect.width) * 100;
//                   handleSeek(Math.max(0, Math.min(100, percentage)));
//                 }}
//               >
//                 <motion.div
//                   className="h-full bg-zinc-800 rounded-full"
//                   initial={{ width: 0 }}
//                   animate={{ width: `${progress}%` }}
//                   transition={{ ease: "linear", duration: 0.1 }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Playlist Overlay */}
//           <AnimatePresence>
//             {showPlaylist && (
//               <motion.div
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 exit={{ y: "100%" }}
//                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                 className="absolute inset-0 bg-[#fdfbf7] z-20 p-4 flex flex-col"
//               >
//                 <div className="flex items-center justify-between mb-4 border-b border-zinc-200 pb-2">
//                   <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Playlist</span>
//                   <button onClick={() => setShowPlaylist(false)}>
//                     <X size={16} className="text-zinc-400 hover:text-zinc-800" />
//                   </button>
//                 </div>
//                 <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
//                   {tracks.map((track, idx) => (
//                     <div
//                       key={track.id}
//                       onClick={() => selectTrack(idx)}
//                       className={cn(
//                         "flex items-center gap-3 p-2 rounded hover:bg-zinc-100 cursor-pointer group transition-colors",
//                         currentTrackIndex === idx && "bg-zinc-100"
//                       )}
//                     >
//                       <span className={cn("text-[10px] font-mono w-4", currentTrackIndex === idx ? "text-blue-500 font-bold" : "text-zinc-400")}>
//                         {String(idx + 1).padStart(2, '0')}
//                       </span>
//                       <div className="flex-1 min-w-0">
//                         <p className={cn("text-xs font-bold truncate", currentTrackIndex === idx ? "text-zinc-900" : "text-zinc-600 group-hover:text-zinc-900")}>
//                           {track.name}
//                         </p>
//                         <p className="text-[10px] text-zinc-400 truncate">{track.artists}</p>
//                       </div>
//                       {currentTrackIndex === idx && isPlaying && (
//                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Controls */}
//         <div className="w-20 flex flex-col items-center justify-center gap-6 py-2 z-10">
//           {/* Confirm / Next */}
//           <div className="flex flex-col items-center gap-1.5">
//             <button
//               onClick={handleNext}
//               className="w-14 h-14 rounded-full bg-[#2563eb] shadow-[0_4px_0_#1d4ed8,0_6px_10px_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center group relative overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
//               <Check size={28} strokeWidth={4} className="text-[#60a5fa] group-hover:text-white transition-colors drop-shadow-sm" />
//             </button>
//             <span className="text-[8px] font-black text-[#1e40af] tracking-widest opacity-80">CONFIRM</span>
//           </div>

//           {/* Joystick / Play/Pause */}
//           <div className="relative group">
//             <div className="w-16 h-16 rounded-full bg-[#1e40af] shadow-[inset_0_2px_5px_rgba(0,0,0,0.4),0_2px_10px_rgba(0,0,0,0.2)] flex items-center justify-center p-1">
//               <button
//                 onClick={togglePlay}
//                 className="w-full h-full rounded-full bg-[#3b82f6] shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all relative"
//               >
//                 <div className="w-8 h-8 rounded-full bg-[#2563eb] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />
//                 {/* Play/Pause Icon Overlay */}
//                 <div className="absolute inset-0 flex items-center justify-center text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
//                   {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Cancel / Prev */}
//           <div className="flex flex-col items-center gap-1.5">
//             <button
//               onClick={handlePrevious}
//               className="w-14 h-14 rounded-full bg-[#2563eb] shadow-[0_4px_0_#1d4ed8,0_6px_10px_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center group relative overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
//               <X size={28} strokeWidth={4} className="text-[#60a5fa] group-hover:text-white transition-colors drop-shadow-sm" />
//             </button>
//             <span className="text-[8px] font-black text-[#1e40af] tracking-widest opacity-80">CANCEL</span>
//           </div>
//         </div>

//         {/* Speaker Grille */}
//         <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-50">
//           {[...Array(12)].map((_, i) => (
//             <div key={i} className="w-1 h-1 rounded-full bg-[#1e3a8a]" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };


// export const walkmanCode = `"use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Pause, SkipForward, SkipBack, X, Music2, History, Check, Disc, Battery, Signal, Wifi } from "lucide-react";
// import { cn } from "@/src/lib/utils";
// import Link from "next/link";
// import { FaSpotify } from "react-icons/fa";
// import Image from "next/image";

// interface Track {
//   id: string;
//   name: string;
//   artists: string;
//   album: string;
//   duration_ms: number;
//   uri: string;
//   image: string;
//   external_url: string;
// }

// interface SpotifyPlayer {
//   connect: () => Promise<boolean>;
//   disconnect: () => void;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   addListener: (event: string, callback: (data: any) => void) => boolean;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   removeListener: (event: string, callback?: (data: any) => void) => void;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   getCurrentState: () => Promise<any>;
//   pause: () => Promise<void>;
//   resume: () => Promise<void>;
//   togglePlay: () => Promise<void>;
//   nextTrack: () => Promise<void>;
//   previousTrack: () => Promise<void>;
//   seek: (position_ms: number) => Promise<void>;
// }

// interface WindowWithSpotify extends Window {
//   Spotify?: {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     Player: new (options: any) => SpotifyPlayer;
//   };
//   onSpotifyWebPlaybackSDKReady?: () => void;
// }

// declare let window: WindowWithSpotify;

// export const Walkman = () => {
//   const [tracks, setTracks] = useState<Track[]>([]);
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [showPlaylist, setShowPlaylist] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
//   const [deviceId, setDeviceId] = useState<string | null>(null);
//   const [position, setPosition] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isLoadingTrack, setIsLoadingTrack] = useState(false);
//   const playerRef = useRef<SpotifyPlayer | null>(null);
//   const [currentTime, setCurrentTime] = useState("");

//   useEffect(() => {
//     setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//     const timer = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Fetch Desi Hip Hop songs from Spotify API
//   useEffect(() => {
//     const fetchArijitSongs = async () => {
//       try {
//         const response = await fetch('/api/spotify/search?q=latest&type=track&limit=10');
//         const data = await response.json();

//         if (data.tracks) {
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const formattedTracks: Track[] = data.tracks.map((track: any) => ({
//             id: track.id,
//             name: track.name,
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             artists: track.artists.map((a: any) => a.name).join(", "),
//             album: track.album.name,
//             duration_ms: track.duration_ms,
//             uri: track.uri,
//             image: track.album.images[0]?.url || "",
//             external_url: track.external_urls.spotify
//           }));
//           setTracks(formattedTracks);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching tracks:", error);
//         setLoading(false);
//       }
//     };

//     fetchArijitSongs();
//   }, []);

//   // Initialize Spotify Web Playback SDK
//   useEffect(() => {
//     const initializePlayer = () => {
//       if (!window.Spotify) return;

//       const spotifyPlayer = new window.Spotify.Player({
//         name: "Portfolio Spotify Player",
//         getOAuthToken: async (cb: (token: string) => void) => {
//           const response = await fetch("/api/spotify/token");
//           const data = await response.json();
//           cb(data.access_token);
//         },
//         volume: 0.5,
//       });

//       spotifyPlayer.addListener("ready", ({ device_id }: { device_id: string }) => {
//         console.log("Ready with Device ID", device_id);
//         setDeviceId(device_id);
//       });

//       spotifyPlayer.addListener("not_ready", ({ device_id }: { device_id: string }) => {
//         console.log("Device ID has gone offline", device_id);
//         setDeviceId(null);
//       });

//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       spotifyPlayer.addListener("player_state_changed", (state: any) => {
//         if (!state) {
//           setIsPlaying(false);
//           setIsLoadingTrack(false);
//           return;
//         }

//         setIsPlaying(!state.paused);
//         setPosition(state.position);
//         setDuration(state.duration);

//         // Clear loading state when track starts playing
//         if (!state.paused) {
//           setIsLoadingTrack(false);
//         }

//         if (state.duration > 0) {
//           setProgress((state.position / state.duration) * 100);
//         }
//       });

//       spotifyPlayer.connect();
//       setPlayer(spotifyPlayer);
//       playerRef.current = spotifyPlayer;
//     };

//     const script = document.getElementById("spotify-player-script");
//     if (!script) {
//       const newScript = document.createElement("script");
//       newScript.id = "spotify-player-script";
//       newScript.src = "https://sdk.scdn.co/spotify-player.js";
//       newScript.async = true;
//       document.body.appendChild(newScript);
//     }

//     if (window.Spotify) {
//       initializePlayer();
//     } else {
//       window.onSpotifyWebPlaybackSDKReady = initializePlayer;
//     }

//     return () => {
//       if (playerRef.current) {
//         playerRef.current.disconnect();
//       }
//     };
//   }, []);

//   // Update progress when playing
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isPlaying && duration > 0) {
//       interval = setInterval(() => {
//         setPosition((prev) => {
//           const newPos = prev + 1000;
//           if (newPos >= duration) {
//             handleNext();
//             return 0;
//           }
//           setProgress((newPos / duration) * 100);
//           return newPos;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isPlaying, duration]);

//   const playTrack = async (trackUri: string) => {
//     if (!deviceId) return;

//     setIsLoadingTrack(true);
//     try {
//       const response = await fetch("/api/spotify/play", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ device_id: deviceId, uris: [trackUri] })
//       });

//       if (response.ok) {
//         setIsPlaying(true);
//       } else {
//         setIsLoadingTrack(false);
//       }
//     } catch (error) {
//       console.error("Error playing track:", error);
//       setIsLoadingTrack(false);
//     }
//   };

//   const togglePlay = async () => {
//     if (!player) return;

//     if (isPlaying) {
//       await player.pause();
//     } else {
//       setIsLoadingTrack(true);
//       // If deviceId is available and we have tracks, always use playTrack for initial play
//       if (deviceId && tracks.length > 0) {
//         await playTrack(tracks[currentTrackIndex].uri);
//       } else if (!deviceId && tracks.length > 0) {
//         // Wait for device to be ready
//         console.log("Waiting for device to be ready...");
//         setIsLoadingTrack(false);
//       } else {
//         await player.resume();
//       }
//     }
//   };

//   const handleNext = async () => {
//     const nextIndex = (currentTrackIndex + 1) % tracks.length;
//     setCurrentTrackIndex(nextIndex);
//     setProgress(0);
//     setPosition(0);
//     setIsLoadingTrack(true);
//     if (tracks[nextIndex]) {
//       await playTrack(tracks[nextIndex].uri);
//     }
//   };

//   const handlePrevious = async () => {
//     const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
//     setCurrentTrackIndex(prevIndex);
//     setProgress(0);
//     setPosition(0);
//     setIsLoadingTrack(true);
//     if (tracks[prevIndex]) {
//       await playTrack(tracks[prevIndex].uri);
//     }
//   };

//   const handleSeek = async (seekProgress: number) => {
//     if (!player || !duration) return;
//     const position_ms = (seekProgress / 100) * duration;
//     await player.seek(position_ms);
//     setProgress(seekProgress);
//     setPosition(position_ms);
//   };

//   const selectTrack = async (index: number) => {
//     setCurrentTrackIndex(index);
//     setProgress(0);
//     setPosition(0);
//     setShowPlaylist(false);
//     setIsLoadingTrack(true);
//     await playTrack(tracks[index].uri);
//   };

//   if (loading || tracks.length === 0) {
//     return (
//       <div className="w-full h-full bg-[#3b82f6] rounded-xl p-5 flex items-center justify-center border border-blue-600">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
//           <p className="text-white/80 font-mono text-xs animate-pulse">LOADING SYSTEM...</p>
//         </div>
//       </div>
//     );
//   }

//   const currentTrack = tracks[currentTrackIndex];
//   const currentSeconds = position / 1000;
//   const totalSeconds = duration / 1000;

//   return (
//     <div className="w-full h-full flex items-center justify-center bg-transparent p-4 font-sans">
//       <div className="relative w-full max-w-[640px] aspect-[1.4/1] bg-[#3b82f6] rounded-[2.5rem] p-6 shadow-2xl flex gap-6 border-b-8 border-r-8 border-[#2563eb] transition-all duration-300">
//         {/* Top Buttons */}
//         <div className="absolute -top-1.5 left-16 flex gap-4 z-0">
//           <div className="w-10 h-3 bg-[#2563eb] rounded-t-md shadow-sm" />
//           <div className="w-10 h-3 bg-[#2563eb] rounded-t-md shadow-sm" />
//           <div className="w-10 h-3 bg-[#2563eb] rounded-t-md shadow-sm" />
//         </div>

//         {/* Screen */}
//         <div className="flex-1 bg-[#fdfbf7] rounded-2xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden relative z-10 border-4 border-black/5">
//           {/* Status Bar */}
//           <div className="h-8 flex justify-between items-center px-4 pt-2 text-[10px] font-bold text-zinc-400 font-mono">
//             <div className="flex items-center gap-1">
//               <div className="flex gap-0.5 items-end h-3">
//                 <div className="w-0.5 h-1 bg-zinc-400" />
//                 <div className="w-0.5 h-1.5 bg-zinc-400" />
//                 <div className="w-0.5 h-2 bg-zinc-400" />
//                 <div className="w-0.5 h-2.5 bg-zinc-400" />
//               </div>
//               <span>GPRS</span>
//             </div>
//             <span>{currentTime}</span>
//             <div className="flex items-center gap-1">
//               <span>{deviceId ? "READY" : "WAIT"}</span>
//               <div className="w-4 h-2 border border-zinc-400 rounded-sm p-0.5 flex">
//                 <div className="w-2/3 h-full bg-zinc-400" />
//               </div>
//             </div>
//           </div>

//           {/* Main Display */}
//           <div className="flex-1 p-5 flex flex-col relative">
//             <div className="flex gap-5 items-center flex-1">
//               {/* Album Art */}
//               <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-200 rounded-md shadow-md relative overflow-hidden flex-shrink-0 border border-zinc-900/10 group cursor-pointer" onClick={() => setShowPlaylist(true)}>
//                 {currentTrack?.image ? (
//                   <Image src={currentTrack.image} alt="Album" fill className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-zinc-100">
//                     <Disc className="text-zinc-300 animate-spin-slow" size={40} />
//                   </div>
//                 )}
//                 {/* Vinyl overlay effect */}
//                 <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
//               </div>

//               {/* Track Info */}
//               <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
//                 <Music2 size={24} className="text-zinc-800 mb-2 animate-bounce" />
//                 <h2 className="text-xl md:text-2xl font-black text-zinc-900 leading-none truncate font-sans tracking-tight">
//                   {currentTrack?.name || "No Track"}
//                 </h2>
//                 <p className="text-sm md:text-base font-bold text-zinc-600 truncate">
//                   {currentTrack?.artists || "Select a song"}
//                 </p>
//                 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
//                   {currentTrack?.album || "Unknown Album"}
//                 </p>
//               </div>
//             </div>

//             {/* Progress */}
//             <div className="mt-auto pt-4">
//               <div className="flex justify-between text-[10px] font-bold text-zinc-400 font-mono mb-1.5">
//                 <span>{Math.floor(currentSeconds / 60)}:{String(Math.floor(currentSeconds % 60)).padStart(2, '0')}</span>
//                 <span>{Math.floor(totalSeconds / 60)}:{String(Math.floor(totalSeconds % 60)).padStart(2, '0')}</span>
//               </div>
//               <div
//                 className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden cursor-pointer relative group"
//                 onClick={(e) => {
//                   const rect = e.currentTarget.getBoundingClientRect();
//                   const x = e.clientX - rect.left;
//                   const percentage = (x / rect.width) * 100;
//                   handleSeek(Math.max(0, Math.min(100, percentage)));
//                 }}
//               >
//                 <motion.div
//                   className="h-full bg-zinc-800 rounded-full"
//                   initial={{ width: 0 }}
//                   animate={{ width: \`\${progress}%\` }}
//                   transition={{ ease: "linear", duration: 0.1 }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Playlist Overlay */}
//           <AnimatePresence>
//             {showPlaylist && (
//               <motion.div
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 exit={{ y: "100%" }}
//                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                 className="absolute inset-0 bg-[#fdfbf7] z-20 p-4 flex flex-col"
//               >
//                 <div className="flex items-center justify-between mb-4 border-b border-zinc-200 pb-2">
//                   <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Playlist</span>
//                   <button onClick={() => setShowPlaylist(false)}>
//                     <X size={16} className="text-zinc-400 hover:text-zinc-800" />
//                   </button>
//                 </div>
//                 <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
//                   {tracks.map((track, idx) => (
//                     <div
//                       key={track.id}
//                       onClick={() => selectTrack(idx)}
//                       className={cn(
//                         "flex items-center gap-3 p-2 rounded hover:bg-zinc-100 cursor-pointer group transition-colors",
//                         currentTrackIndex === idx && "bg-zinc-100"
//                       )}
//                     >
//                       <span className={cn("text-[10px] font-mono w-4", currentTrackIndex === idx ? "text-blue-500 font-bold" : "text-zinc-400")}>
//                         {String(idx + 1).padStart(2, '0')}
//                       </span>
//                       <div className="flex-1 min-w-0">
//                         <p className={cn("text-xs font-bold truncate", currentTrackIndex === idx ? "text-zinc-900" : "text-zinc-600 group-hover:text-zinc-900")}>
//                           {track.name}
//                         </p>
//                         <p className="text-[10px] text-zinc-400 truncate">{track.artists}</p>
//                       </div>
//                       {currentTrackIndex === idx && isPlaying && (
//                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Controls */}
//         <div className="w-20 flex flex-col items-center justify-center gap-6 py-2 z-10">
//           {/* Confirm / Next */}
//           <div className="flex flex-col items-center gap-1.5">
//             <button
//               onClick={handleNext}
//               className="w-14 h-14 rounded-full bg-[#2563eb] shadow-[0_4px_0_#1d4ed8,0_6px_10px_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center group relative overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
//               <Check size={28} strokeWidth={4} className="text-[#60a5fa] group-hover:text-white transition-colors drop-shadow-sm" />
//             </button>
//             <span className="text-[8px] font-black text-[#1e40af] tracking-widest opacity-80">CONFIRM</span>
//           </div>

//           {/* Joystick / Play/Pause */}
//           <div className="relative group">
//             <div className="w-16 h-16 rounded-full bg-[#1e40af] shadow-[inset_0_2px_5px_rgba(0,0,0,0.4),0_2px_10px_rgba(0,0,0,0.2)] flex items-center justify-center p-1">
//               <button
//                 onClick={togglePlay}
//                 className="w-full h-full rounded-full bg-[#3b82f6] shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all relative"
//               >
//                 <div className="w-8 h-8 rounded-full bg-[#2563eb] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />
//                 {/* Play/Pause Icon Overlay */}
//                 <div className="absolute inset-0 flex items-center justify-center text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
//                   {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Cancel / Prev */}
//           <div className="flex flex-col items-center gap-1.5">
//             <button
//               onClick={handlePrevious}
//               className="w-14 h-14 rounded-full bg-[#2563eb] shadow-[0_4px_0_#1d4ed8,0_6px_10px_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center group relative overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
//               <X size={28} strokeWidth={4} className="text-[#60a5fa] group-hover:text-white transition-colors drop-shadow-sm" />
//             </button>
//             <span className="text-[8px] font-black text-[#1e40af] tracking-widest opacity-80">CANCEL</span>
//           </div>
//         </div>

//         {/* Speaker Grille */}
//         <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-50">
//           {[...Array(12)].map((_, i) => (
//             <div key={i} className="w-1 h-1 rounded-full bg-[#1e3a8a]" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// `;
