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
//       <div className="w-full h-full bg-card rounded-xl p-5 flex items-center justify-center">
//         <FaSpotify className="text-green-500 animate-pulse" size={32} />
//       </div>
//     );
//   }

//   const currentTrack = tracks[currentTrackIndex];
//   const currentSeconds = position / 1000;
//   const totalSeconds = duration / 1000;

//   return (
//     <div className="w-full h-full bg-card rounded-xl p-5 flex flex-col relative overflow-hidden group md:grayscale md:hover:grayscale-0 transition-all duration-300">
//       {/* Background Gradient Effect */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-50 pointer-events-none" />

//       {/* Header */}
//       <div className="flex items-center justify-between z-10 mb-4">
//         <div className="flex items-center gap-2">
//           <FaSpotify size={16} className="text-green-500" />
//           <div className="flex items-center gap-1.5">
//             <span className={cn(
//               "text-xs font-medium tracking-wider uppercase",
//               isPlaying ? "text-green-500" : "text-muted-foreground"
//             )}>
//               {showPlaylist ? "Recent" : (deviceId ? (isPlaying ? "Now Playing" : "Ready") : "Connecting...")}
//             </span>
//             {isPlaying && (
//               <div className="flex items-center gap-[2px] h-3">
//                 {[0, 1, 2].map((i) => (
//                   <motion.div
//                     key={i}
//                     className="w-[2px] bg-green-500 rounded-full"
//                     animate={{
//                       height: ["40%", "100%", "60%", "80%", "40%"],
//                     }}
//                     transition={{
//                       duration: 1.2,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                       delay: i * 0.15,
//                     }}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         <button
//           onClick={() => setShowPlaylist(!showPlaylist)}
//           className="text-muted-foreground hover:text-foreground transition-colors"
//           title={showPlaylist ? "Close" : "Toggle Recent"}
//         >
//           {showPlaylist ? <X size={16} /> : <History size={16} />}
//         </button>
//       </div>

//       <AnimatePresence mode="wait">
//         {!showPlaylist ? (
//           <motion.div
//             key="player"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="flex flex-col gap-4 z-10 flex-1 min-h-0"
//           >
//             <div className="flex items-center gap-4">
//               {/* Album Art with Animation */}
//               <div className="relative flex-shrink-0">
//                 <div className={cn(
//                   "w-14 h-14 rounded-lg overflow-hidden relative z-10 shadow-lg",
//                   isPlaying && "ring-2 ring-green-500/50"
//                 )}>
//                   {currentTrack.image ? (
//                     <>
//                       <Image
//                         src={currentTrack.image}
//                         alt={currentTrack.name}
//                         width={56}
//                         height={56}
//                         className="object-cover w-full h-full"
//                       />
//                       {/* Loading spinner overlay */}
//                       {isLoadingTrack && (
//                         <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                           <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="w-full h-full bg-secondary flex items-center justify-center">
//                       <Music2 className="text-muted-foreground" size={24} />
//                     </div>
//                   )}
//                 </div>


//                 {/* Pulse Animation Removed */}

//               </div>

//               {/* Track Info */}
//               <div className="flex-1 min-w-0">
//                 <Link href={currentTrack.external_url} target="_blank" className="block truncate text-sm font-medium hover:text-green-500 transition-colors">
//                   {currentTrack.name}
//                 </Link>
//                 <p className="truncate text-xs text-muted-foreground">{currentTrack.artists}</p>
//               </div>

//               {/* Control Buttons */}
//               <div className="flex items-center gap-2 flex-shrink-0">
//                 <button
//                   onClick={handlePrevious}
//                   className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all hover:scale-105"
//                 >
//                   <SkipBack size={14} className="text-foreground" />
//                 </button>
//                 <button
//                   onClick={togglePlay}
//                   className="w-9 h-9 rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 flex items-center justify-center transition-all hover:scale-105"
//                 >
//                   {isPlaying ? <Pause size={16} className="text-green-500" /> : <Play size={16} className="text-green-500 ml-0.5" />}
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all hover:scale-105"
//                 >
//                   <SkipForward size={14} className="text-foreground" />
//                 </button>
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="space-y-2 mt-auto">
//               <div
//                 className="relative h-1 w-full bg-secondary rounded-full overflow-visible group/progress cursor-pointer"
//                 onClick={(e) => {
//                   const rect = e.currentTarget.getBoundingClientRect();
//                   const x = e.clientX - rect.left;
//                   const percentage = (x / rect.width) * 100;
//                   handleSeek(Math.max(0, Math.min(100, percentage)));
//                 }}
//               >
//                 <motion.div
//                   className="h-full bg-green-500 rounded-full relative"
//                   initial={{ width: `${progress}%` }}
//                   animate={{ width: `${progress}%` }}
//                   transition={{ ease: "linear", duration: isPlaying ? 1 : 0.2 }}
//                 >
//                   {/* Draggable Circle Handle */}
//                   <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-green-500 rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity">
//                     <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
//                   </div>
//                 </motion.div>
//               </div>
//               <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
//                 <span className={cn(
//                   "transition-colors",
//                   isPlaying && "text-green-500"
//                 )}>
//                   {Math.floor(currentSeconds / 60)}:{String(Math.floor(currentSeconds % 60)).padStart(2, '0')}
//                 </span>
//                 <span>{Math.floor(totalSeconds / 60)}:{String(Math.floor(totalSeconds % 60)).padStart(2, '0')}</span>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div
//             key="playlist"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="flex flex-col z-10 flex-1 min-h-0 overflow-hidden"
//           >
//             <div className="flex flex-col gap-2 overflow-y-auto pr-2 -mr-2 custom-scrollbar">
//               {tracks.slice(1, 3).map((track, idx) => (
//                 <div
//                   key={track.id}
//                   onClick={() => selectTrack(idx)}
//                   className={cn(
//                     "flex items-center gap-3 group/item p-2 rounded-lg hover:bg-secondary/50 transition-all cursor-pointer",
//                     currentTrackIndex === idx && "bg-secondary/50"
//                   )}
//                 >
//                   <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 shadow-sm relative">
//                     {track.image ? (
//                       <>
//                         <Image
//                           src={track.image}
//                           alt={track.name}
//                           width={40}
//                           height={40}
//                           className="object-cover w-full h-full"
//                         />
//                         {/* Loading spinner for playlist items */}
//                         {currentTrackIndex === idx && isLoadingTrack && (
//                           <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                             <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <div className="w-full h-full bg-secondary flex items-center justify-center">
//                         <Music2 size={16} className="text-muted-foreground" />
//                       </div>
//                     )}
//                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
//                       <Play size={16} className="text-white ml-0.5" />
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className={cn(
//                       "text-xs font-medium truncate group-hover/item:text-green-500 transition-colors",
//                       currentTrackIndex === idx && "text-green-500"
//                     )}>
//                       {track.name}
//                     </p>
//                     <p className="text-[10px] text-muted-foreground truncate">{track.artists}</p>
//                   </div>
//                   <Link
//                     href={track.external_url}
//                     target="_blank"
//                     onClick={(e) => e.stopPropagation()}
//                     className="p-1.5 hover:bg-secondary rounded-md transition-colors opacity-0 group-hover/item:opacity-100 flex-shrink-0"
//                     title="Open in Spotify"
//                   >
//                     <FaSpotify size={14} className="text-muted-foreground hover:text-green-500" />
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };


// export const spotifyCode = `"use client";

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
//       <div className="w-full h-full bg-card rounded-xl p-5 flex items-center justify-center">
//         <FaSpotify className="text-green-500 animate-pulse" size={32} />
//       </div>
//     );
//   }

//   const currentTrack = tracks[currentTrackIndex];
//   const currentSeconds = position / 1000;
//   const totalSeconds = duration / 1000;

//   return (
//     <div className="w-full h-full bg-card rounded-xl p-5 flex flex-col relative overflow-hidden group md:grayscale md:hover:grayscale-0 transition-all duration-300">
//       {/* Background Gradient Effect */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-50 pointer-events-none" />

//       {/* Header */}
//       <div className="flex items-center justify-between z-10 mb-4">
//         <div className="flex items-center gap-2">
//           <FaSpotify size={16} className="text-green-500" />
//           <div className="flex items-center gap-1.5">
//             <span className={cn(
//               "text-xs font-medium tracking-wider uppercase",
//               isPlaying ? "text-green-500" : "text-muted-foreground"
//             )}>
//               {showPlaylist ? "Recent" : (deviceId ? (isPlaying ? "Now Playing" : "Ready") : "Connecting...")}
//             </span>
//             {isPlaying && (
//               <div className="flex items-center gap-[2px] h-3">
//                 {[0, 1, 2].map((i) => (
//                   <motion.div
//                     key={i}
//                     className="w-[2px] bg-green-500 rounded-full"
//                     animate={{
//                       height: ["40%", "100%", "60%", "80%", "40%"],
//                     }}
//                     transition={{
//                       duration: 1.2,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                       delay: i * 0.15,
//                     }}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         <button
//           onClick={() => setShowPlaylist(!showPlaylist)}
//           className="text-muted-foreground hover:text-foreground transition-colors"
//           title={showPlaylist ? "Close" : "Toggle Recent"}
//         >
//           {showPlaylist ? <X size={16} /> : <History size={16} />}
//         </button>
//       </div>

//       <AnimatePresence mode="wait">
//         {!showPlaylist ? (
//           <motion.div
//             key="player"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="flex flex-col gap-4 z-10 flex-1 min-h-0"
//           >
//             <div className="flex items-center gap-4">
//               {/* Album Art with Animation */}
//               <div className="relative flex-shrink-0">
//                 <div className={cn(
//                   "w-14 h-14 rounded-lg overflow-hidden relative z-10 shadow-lg",
//                   isPlaying && "ring-2 ring-green-500/50"
//                 )}>
//                   {currentTrack.image ? (
//                     <>
//                       <Image
//                         src={currentTrack.image}
//                         alt={currentTrack.name}
//                         width={56}
//                         height={56}
//                         className="object-cover w-full h-full"
//                       />
//                       {/* Loading spinner overlay */}
//                       {isLoadingTrack && (
//                         <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                           <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="w-full h-full bg-secondary flex items-center justify-center">
//                       <Music2 className="text-muted-foreground" size={24} />
//                     </div>
//                   )}
//                 </div>


//                 {/* Pulse Animation Removed */}

//               </div>

//               {/* Track Info */}
//               <div className="flex-1 min-w-0">
//                 <Link href={currentTrack.external_url} target="_blank" className="block truncate text-sm font-medium hover:text-green-500 transition-colors">
//                   {currentTrack.name}
//                 </Link>
//                 <p className="truncate text-xs text-muted-foreground">{currentTrack.artists}</p>
//               </div>

//               {/* Control Buttons */}
//               <div className="flex items-center gap-2 flex-shrink-0">
//                 <button
//                   onClick={handlePrevious}
//                   className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all hover:scale-105"
//                 >
//                   <SkipBack size={14} className="text-foreground" />
//                 </button>
//                 <button
//                   onClick={togglePlay}
//                   className="w-9 h-9 rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 flex items-center justify-center transition-all hover:scale-105"
//                 >
//                   {isPlaying ? <Pause size={16} className="text-green-500" /> : <Play size={16} className="text-green-500 ml-0.5" />}
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all hover:scale-105"
//                 >
//                   <SkipForward size={14} className="text-foreground" />
//                 </button>
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="space-y-2 mt-auto">
//               <div
//                 className="relative h-1 w-full bg-secondary rounded-full overflow-visible group/progress cursor-pointer"
//                 onClick={(e) => {
//                   const rect = e.currentTarget.getBoundingClientRect();
//                   const x = e.clientX - rect.left;
//                   const percentage = (x / rect.width) * 100;
//                   handleSeek(Math.max(0, Math.min(100, percentage)));
//                 }}
//               >
//                 <motion.div
//                   className="h-full bg-green-500 rounded-full relative"
//                   initial={{ width: \`\${progress}%\` }}
//                   animate={{ width: \`\${progress}%\` }}
//                   transition={{ ease: "linear", duration: isPlaying ? 1 : 0.2 }}
//                 >
//                   {/* Draggable Circle Handle */}
//                   <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-green-500 rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity">
//                     <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
//                   </div>
//                 </motion.div>
//               </div>
//               <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
//                 <span className={cn(
//                   "transition-colors",
//                   isPlaying && "text-green-500"
//                 )}>
//                   {Math.floor(currentSeconds / 60)}:{String(Math.floor(currentSeconds % 60)).padStart(2, '0')}
//                 </span>
//                 <span>{Math.floor(totalSeconds / 60)}:{String(Math.floor(totalSeconds % 60)).padStart(2, '0')}</span>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div
//             key="playlist"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="flex flex-col z-10 flex-1 min-h-0 overflow-hidden"
//           >
//             <div className="flex flex-col gap-2 overflow-y-auto pr-2 -mr-2 custom-scrollbar">
//               {tracks.slice(1, 3).map((track, idx) => (
//                 <div
//                   key={track.id}
//                   onClick={() => selectTrack(idx)}
//                   className={cn(
//                     "flex items-center gap-3 group/item p-2 rounded-lg hover:bg-secondary/50 transition-all cursor-pointer",
//                     currentTrackIndex === idx && "bg-secondary/50"
//                   )}
//                 >
//                   <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 shadow-sm relative">
//                     {track.image ? (
//                       <>
//                         <Image
//                           src={track.image}
//                           alt={track.name}
//                           width={40}
//                           height={40}
//                           className="object-cover w-full h-full"
//                         />
//                         {/* Loading spinner for playlist items */}
//                         {currentTrackIndex === idx && isLoadingTrack && (
//                           <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                             <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <div className="w-full h-full bg-secondary flex items-center justify-center">
//                         <Music2 size={16} className="text-muted-foreground" />
//                       </div>
//                     )}
//                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
//                       <Play size={16} className="text-white ml-0.5" />
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className={cn(
//                       "text-xs font-medium truncate group-hover/item:text-green-500 transition-colors",
//                       currentTrackIndex === idx && "text-green-500"
//                     )}>
//                       {track.name}
//                     </p>
//                     <p className="text-[10px] text-muted-foreground truncate">{track.artists}</p>
//                   </div>
//                   <Link
//                     href={track.external_url}
//                     target="_blank"
//                     onClick={(e) => e.stopPropagation()}
//                     className="p-1.5 hover:bg-secondary rounded-md transition-colors opacity-0 group-hover/item:opacity-100 flex-shrink-0"
//                     title="Open in Spotify"
//                   >
//                     <FaSpotify size={14} className="text-muted-foreground hover:text-green-500" />
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };
// `;
