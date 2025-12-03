// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Pause, SkipForward, SkipBack, X, Music2, History } from "lucide-react";
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

// export const Spotify = () => {
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
//     const script = document.getElementById("spotify-player-script");
//     if (!script) {
//       const newScript = document.createElement("script");
//       newScript.id = "spotify-player-script";
//       newScript.src = "https://sdk.scdn.co/spotify-player.js";
//       newScript.async = true;
//       document.body.appendChild(newScript);
//     }

//     window.onSpotifyWebPlaybackSDKReady = () => {
//       if (!window.Spotify) return;

//       // const token = fetch("/api/spotify/token").then(res => res.json()).then(data => data.access_token);

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
//       <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900 rounded-xl p-5 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
//         <div className="w-8 h-8 rounded-full border-2 border-zinc-300 border-t-zinc-800 dark:border-zinc-700 dark:border-t-zinc-100 animate-spin" />
//       </div>
//     );
//   }

//   const currentTrack = tracks[currentTrackIndex];
//   const currentSeconds = position / 1000;
//   const totalSeconds = duration / 1000;

//   return (
//     <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4 flex flex-col relative overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-colors duration-300 group">
//       {/* Texture Overlay */}
//       <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

//       {/* Header / Status */}
//       <div className="flex justify-between items-center z-10 mb-2">
//         <div className="flex items-center gap-2">
//           <div className={cn("w-2 h-2 rounded-full transition-colors", isPlaying ? "bg-orange-500 animate-pulse" : "bg-zinc-300 dark:bg-zinc-700")} />
//           <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
//             {isPlaying ? "Spinning" : "Stopped"}
//           </span>
//         </div>
//         <FaSpotify className="text-zinc-400 dark:text-zinc-600" size={16} />
//       </div>

//       {/* Vinyl Record Area */}
//       <div className="relative flex-1 flex items-center justify-center min-h-0 py-2">
//         {/* Tone Arm */}
//         <motion.div
//           className="absolute top-0 right-2 w-1.5 h-24 bg-zinc-300 dark:bg-zinc-700 origin-top rounded-full z-20 shadow-sm"
//           animate={{ rotate: isPlaying ? 20 : 0 }}
//           transition={{ type: "spring", stiffness: 100, damping: 20 }}
//           style={{ transformOrigin: "top center" }}
//         >
//           <div className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-zinc-400 dark:bg-zinc-600 rounded-full" />
//           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-5 bg-zinc-400 dark:bg-zinc-600 rounded-sm" />
//         </motion.div>

//         {/* The Record */}
//         <motion.div
//           animate={{ rotate: isPlaying ? 360 : 0 }}
//           transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
//           className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-zinc-900 shadow-xl flex items-center justify-center border-[6px] border-zinc-800"
//         >
//           {/* Vinyl Grooves Texture */}
//           <div
//             className="absolute inset-0 rounded-full opacity-40"
//             style={{
//               background: 'repeating-radial-gradient(#333 0, #333 2px, #1a1a1a 3px, #1a1a1a 4px)'
//             }}
//           />

//           {/* Center Label */}
//           <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden relative z-10 border-4 border-orange-500/80 bg-orange-500">
//             {currentTrack?.image ? (
//               <Image src={currentTrack.image} alt="Album" fill className="object-cover opacity-90" />
//             ) : (
//               <div className="w-full h-full bg-zinc-800" />
//             )}
//           </div>
//         </motion.div>
//       </div>

//       {/* Track Info & Controls */}
//       <div className="flex flex-col gap-3 z-10 mt-auto">
//         <div className="text-center space-y-0.5">
//           <Link href={currentTrack.external_url} target="_blank" className="block truncate text-sm font-bold text-zinc-800 dark:text-zinc-100 hover:underline decoration-zinc-400">
//             {currentTrack.name}
//           </Link>
//           <p className="truncate text-xs text-zinc-500 dark:text-zinc-400 font-medium">{currentTrack.artists}</p>
//         </div>

//         {/* Progress Bar */}
//         <div
//           className="relative h-1 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden cursor-pointer group/progress"
//           onClick={(e) => {
//             const rect = e.currentTarget.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const percentage = (x / rect.width) * 100;
//             handleSeek(Math.max(0, Math.min(100, percentage)));
//           }}
//         >
//           <motion.div
//             className="h-full bg-orange-500 rounded-full"
//             initial={{ width: `${progress}%` }}
//             animate={{ width: `${progress}%` }}
//             transition={{ ease: "linear", duration: isPlaying ? 1 : 0.2 }}
//           />
//         </div>

//         {/* Controls */}
//         <div className="flex items-center justify-center gap-6">
//           <button onClick={handlePrevious} className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors">
//             <SkipBack size={20} fill="currentColor" className="opacity-50" />
//           </button>

//           <button
//             onClick={togglePlay}
//             className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
//           >
//             {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
//           </button>

//           <button onClick={handleNext} className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors">
//             <SkipForward size={20} fill="currentColor" className="opacity-50" />
//           </button>
//         </div>

//         <div className="flex justify-between items-center px-1">
//           <button
//             onClick={() => setShowPlaylist(!showPlaylist)}
//             className={cn("text-xs font-mono transition-colors", showPlaylist ? "text-orange-500" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300")}
//           >
//             {showPlaylist ? "HIDE LIST" : "VIEW LIST"}
//           </button>
//           <span className="text-[10px] font-mono text-zinc-400">
//             {Math.floor(currentSeconds / 60)}:{String(Math.floor(currentSeconds % 60)).padStart(2, '0')}
//           </span>
//         </div>
//       </div>

//       {/* Playlist Overlay */}
//       <AnimatePresence>
//         {showPlaylist && (
//           <motion.div
//             initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
//             animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
//             exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
//             className="absolute inset-0 bg-zinc-50/90 dark:bg-zinc-900/90 z-30 p-4 flex flex-col"
//           >
//             <div className="flex items-center justify-between mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
//               <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Collection</span>
//               <button
//                 onClick={() => setShowPlaylist(false)}
//                 className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
//               >
//                 <X size={16} />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto custom-scrollbar -mr-2 pr-2 space-y-1">
//               {tracks.map((track, idx) => (
//                 <div
//                   key={track.id}
//                   onClick={() => selectTrack(idx)}
//                   className={cn(
//                     "flex items-center gap-3 p-2 rounded-md transition-all cursor-pointer group",
//                     currentTrackIndex === idx
//                       ? "bg-orange-100 dark:bg-orange-900/20"
//                       : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
//                   )}
//                 >
//                   <div className={cn(
//                     "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-mono",
//                     currentTrackIndex === idx
//                       ? "bg-orange-500 text-white"
//                       : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
//                   )}>
//                     {currentTrackIndex === idx && isPlaying ? (
//                       <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
//                     ) : (
//                       idx + 1
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className={cn(
//                       "text-xs font-bold truncate transition-colors",
//                       currentTrackIndex === idx
//                         ? "text-orange-600 dark:text-orange-400"
//                         : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
//                     )}>
//                       {track.name}
//                     </p>
//                     <p className="text-[10px] text-zinc-500 truncate">{track.artists}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };
