

// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, Pause, Music, History, ExternalLink, Loader2, X } from "lucide-react";
// import { cn } from "@/src/lib/utils";
// import Image from "next/image";
// import Link from "next/link";
// import { FaSpotify } from "react-icons/fa";
// import { useSpotifyPlayer } from "@/src/hooks/useSpotifyPlayer";
// import { Skeleton } from "@/src/components/ui/skeleton";

// interface Track {
//   title: string;
//   artist: string;
//   cover: string;
//   link: string;
//   duration?: number;
//   progress?: number;
//   isPlaying?: boolean;
//   uri?: string;
// }

// export const Spotify = () => {
//   const [showHistory, setShowHistory] = useState(false);
//   const [nowPlaying, setNowPlaying] = useState<Track | null>(null);
//   const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
  
//   // Use the Spotify Web Playback SDK
//   const {
//     player,
//     deviceId,
//     isPaused: sdkIsPaused,
//     isActive: sdkIsActive,
//     currentTrack: sdkCurrentTrack,
//     position: sdkPosition,
//     duration: sdkDuration,
//     togglePlay: sdkTogglePlay,
//     play: sdkPlay,
//     seek,
//   } = useSpotifyPlayer();

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [shouldAutoTransfer, setShouldAutoTransfer] = useState(false);
//   const [isInitializing, setIsInitializing] = useState(true);
//   const [isSeeking, setIsSeeking] = useState(false);
//   const [lastSdkPosition, setLastSdkPosition] = useState(0);

//   // Sync with SDK player state
//   useEffect(() => {
//     if (sdkIsActive && sdkCurrentTrack) {
//       setNowPlaying({
//         title: sdkCurrentTrack.name,
//         artist: sdkCurrentTrack.artists.map((a: any) => a.name).join(", "),
//         cover: sdkCurrentTrack.album.images[0].url,
//         link: sdkCurrentTrack.external_urls?.spotify || `https://open.spotify.com/track/${sdkCurrentTrack.id}`,
//         duration: sdkDuration / 1000, // Convert to seconds
//         progress: sdkPosition / 1000,
//         isPlaying: !sdkIsPaused,
//         uri: sdkCurrentTrack.uri,
//       });
//       setIsPlaying(!sdkIsPaused);
//       // Only update progress from SDK if not seeking and position is valid
//       if (!isSeeking && sdkDuration > 0) {
//         setProgress((sdkPosition / sdkDuration) * 100);
//       }
//       setLastSdkPosition(sdkPosition);
//       setIsInitializing(false);
//     }
//   }, [sdkIsActive, sdkCurrentTrack, sdkIsPaused, sdkPosition, sdkDuration, isSeeking]);

//   // Auto-transfer playback to web player when device is ready
//   useEffect(() => {
//     const transferPlayback = async () => {
//       // Only auto-transfer if:
//       // 1. SDK device is ready (has deviceId)
//       // 2. SDK player is not active yet
//       // 3. We have a track to play
//       // 4. Auto-transfer flag is set
//       if (deviceId && !sdkIsActive && nowPlaying?.uri && shouldAutoTransfer) {
//         console.log("Auto-transferring playback to web player...");
//         try {
//           await sdkPlay(nowPlaying.uri);
//           setShouldAutoTransfer(false); // Reset flag after transfer
//         } catch (error) {
//           console.error("Failed to auto-transfer:", error);
//         }
//       }
//     };

//     transferPlayback();
//   }, [deviceId, sdkIsActive, nowPlaying?.uri, shouldAutoTransfer, sdkPlay]);

//   useEffect(() => {
//     const fetchMusic = async () => {
//       try {
//         const res = await fetch("/api/spotify");
//         if (!res.ok) throw new Error("Failed to fetch");
//         const data = await res.json();
        
//         if (data.nowPlaying) {
//           setNowPlaying(data.nowPlaying);
//           setIsPlaying(data.nowPlaying.isPlaying);
//           if (data.nowPlaying.duration && data.nowPlaying.progress && !sdkIsActive) {
//             setProgress((data.nowPlaying.progress / data.nowPlaying.duration) * 100);
//           }
//         }
        
//         if (data.recentlyPlayed) {
//           setRecentlyPlayed(data.recentlyPlayed);
//         }
        
//         // If SDK player is not active, fall back to API data
//         if (!sdkIsActive) {
//           if (data.nowPlaying) {
//             setNowPlaying(data.nowPlaying);
//             setIsPlaying(data.nowPlaying.isPlaying);
//             if (data.nowPlaying.duration && data.nowPlaying.progress) {
//               setProgress((data.nowPlaying.progress / data.nowPlaying.duration) * 100);
//             }
//           } else if (data.recentlyPlayed && data.recentlyPlayed.length > 0) {
//             // Fallback to showing the last played song as "paused" if nothing is playing
//             const lastPlayed = data.recentlyPlayed[0];
//             setNowPlaying({
//               ...lastPlayed,
//               isPlaying: false,
//               duration: 200, // Default duration since we might not get it from history
//               progress: 0
//             });
//           }
//         }

//       } catch (err) {
//         console.error(err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMusic();
//     // Poll every 30 seconds
//     const interval = setInterval(fetchMusic, 30000);
//     return () => clearInterval(interval);
//   }, [sdkIsActive]);

//   // Update progress when playing - only when SDK is NOT active
//   // When SDK is active, progress comes from SDK position updates
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     // Only use local interval when SDK is not active (fallback to API data)
//     if (isPlaying && nowPlaying?.duration && !sdkIsActive) {
//       interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 100) {
//             return 100;
//           }
//           // Increment based on 1 second interval relative to duration
//           const increment = (1 / nowPlaying.duration!) * 100;
//           return prev + increment;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isPlaying, nowPlaying, sdkIsActive]);

//   const handleSeek = async (seekProgress: number) => {
//     const duration = nowPlaying?.duration || 0;
//     const position_ms = (seekProgress / 100) * duration * 1000;
    
//     setIsSeeking(true);
//     setProgress(seekProgress);
    
//     if (seek && (sdkIsActive || deviceId)) {
//       try {
//         await seek(position_ms);
//       } catch (error) {
//         console.error("Seek error:", error);
//       }
//     }
    
//     // Reset seeking flag after a short delay to allow SDK to update
//     setTimeout(() => setIsSeeking(false), 500);
//   };

//   const togglePlay = async () => {
//     try {
//       // If SDK player is active, use it
//       if (sdkIsActive && player) {
//         await sdkTogglePlay();
//         return;
//       }
      
//       // If SDK device is ready but not active, transfer playback to browser
//       if (deviceId) {
//         // Get the current/last played track URI
//         let trackUri = nowPlaying?.uri;
        
//         // If no current track, try to get from recently played
//         if (!trackUri && recentlyPlayed.length > 0) {
//           // Fetch full track info for the most recent track
//           const recentTrackName = recentlyPlayed[0].title;
//           console.log("No current track, will play most recent:", recentTrackName);
          
//           // We need the URI, so let's try to get it from the API
//           const response = await fetch('/api/spotify');
//           const data = await response.json();
          
//           if (data.recentlyPlayed && data.recentlyPlayed[0]) {
//             // The API should include URIs in recently played
//             trackUri = data.recentlyPlayed[0].uri;
//           }
//         }
        
//         if (trackUri) {
//           // Transfer playback to web player with the track
//           await sdkPlay(trackUri);
//           setIsPlaying(true);
//           return;
//         } else {
//           // Last resort: set flag to auto-transfer when we get track info
//           setShouldAutoTransfer(true);
//           console.warn("No track URI available, waiting for track info...");
//         }
//       }

//       // If SDK is not ready yet, set flag for auto-transfer when it becomes ready
//       if (!deviceId && nowPlaying?.uri) {
//         setShouldAutoTransfer(true);
//       }
      
//       // Fallback to controlling external device
//       const action = isPlaying ? 'pause' : 'play';
//       const res = await fetch(`/api/spotify/${action}`, { method: 'POST' });
//       if (!res.ok) {
//         console.error('Failed to control playback');
//       }
//       // Optimistically update UI
//       setIsPlaying(!isPlaying);
//     } catch (error) {
//       console.error('Error controlling playback:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="w-full h-full bg-card rounded-xl p-5 space-y-4">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <Skeleton className="h-4 w-4 rounded" />
//             <Skeleton className="h-3 w-24" />
//           </div>
//           <Skeleton className="h-4 w-4 rounded" />
//         </div>
//         <div className="flex items-center gap-3">
//           <Skeleton className="h-14 w-14 rounded-md" />
//           <div className="flex-1 space-y-2">
//             <Skeleton className="h-4 w-3/4" />
//             <Skeleton className="h-3 w-1/2" />
//           </div>
//         </div>
//         <div className="space-y-2">
//           <Skeleton className="h-1 w-full rounded-full" />
//           <div className="flex justify-between">
//             <Skeleton className="h-3 w-12" />
//             <Skeleton className="h-3 w-12" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !nowPlaying) {
//     return (
//       <div className="w-full h-full bg-card rounded-xl p-5 flex flex-col items-center justify-center text-center gap-3">
//         <FaSpotify className="text-muted-foreground text-3xl" />
//         <p className="text-xs text-muted-foreground">Currently not playing</p>
//       </div>
//     );
//   }

//   const duration = nowPlaying.duration || 200;
//   const currentSeconds = (duration * progress) / 100;

//   return (
//     <div className="w-full h-full bg-card rounded-xl p-5 flex flex-col relative overflow-hidden group grayscale hover:grayscale-0 transition-all duration-300">
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
//               {showHistory ? "Recent" : isPlaying ? "Now Playing" : "Last Played"}
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
//           onClick={() => setShowHistory(!showHistory)}
//           className="text-muted-foreground hover:text-foreground transition-colors"
//           title={showHistory ? "Close" : "Toggle History"}
//         >
//           {showHistory ? <X size={16} /> : <History size={16} />}
//         </button>
//       </div>

//       <AnimatePresence mode="wait">
//         {!showHistory ? (
//           <motion.div 
//             key="player"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="flex flex-col gap-4 z-10 flex-1 min-h-0"
//           >
//             <div className="flex items-center gap-4">
//               {/* Cover Art with Pulse */}
//               <div className="relative flex-shrink-0">
//                 <div className={cn(
//                   "w-14 h-14 rounded-lg overflow-hidden relative z-10 shadow-lg",
//                   isPlaying && "ring-2 ring-green-500/50"
//                 )}>
//                   <Image 
//                     src={nowPlaying.cover} 
//                     alt={nowPlaying.title}
//                     width={56}
//                     height={56}
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
                
//                 {/* Pulse Animation */}
//                 {isPlaying && (
//                   <>
//                     <motion.div
//                       className="absolute inset-0 rounded-md bg-green-500/30 -z-10"
//                       animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                     />
//                     <motion.div
//                       className="absolute inset-0 rounded-md bg-green-500/20 -z-10"
//                       animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
//                       transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
//                     />
//                   </>
//                 )}
//               </div>

//               {/* Track Info */}
//               <div className="flex-1 min-w-0">
//                 <Link href={nowPlaying.link} target="_blank" className="block truncate text-sm font-medium hover:text-green-500 transition-colors">
//                   {nowPlaying.title}
//                 </Link>
//                 <p className="truncate text-xs text-muted-foreground">{nowPlaying.artist}</p>
//               </div>

//               {/* Play Button */}
//               <button 
//                 onClick={togglePlay}
//                 className="flex-shrink-0 w-9 h-9 rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 flex items-center justify-center transition-all hover:scale-105"
//               >
//                 {isPlaying ? <Pause size={16} className="text-green-500" /> : <Play size={16} className="text-green-500 ml-0.5" />}
//               </button>
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
//                   transition={{ ease: "linear", duration: isPlaying && !isSeeking ? 1 : 0.2 }}
//                 >
//                   {/* Draggable Circle Handle */}
//                   <div
//                     className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-green-500 rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity cursor-grab active:cursor-grabbing active:scale-110"
//                     draggable={false}
//                     onMouseDown={(e) => {
//                       e.preventDefault();
//                       setIsSeeking(true);
//                       const handleMouseMove = (moveEvent: MouseEvent) => {
//                         const rect = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
//                         if (rect) {
//                           const x = moveEvent.clientX - rect.left;
//                           const percentage = (x / rect.width) * 100;
//                           setProgress(Math.max(0, Math.min(100, percentage)));
//                         }
//                       };
//                       const handleMouseUp = async () => {
//                         document.removeEventListener('mousemove', handleMouseMove);
//                         document.removeEventListener('mouseup', handleMouseUp);
//                         await handleSeek(progress);
//                         setIsSeeking(false);
//                       };
//                       document.addEventListener('mousemove', handleMouseMove);
//                       document.addEventListener('mouseup', handleMouseUp);
//                     }}
//                   >
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
//                 <span>{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div 
//             key="history"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="flex flex-col z-10 flex-1 min-h-0 overflow-hidden"
//           >
//             <div className="flex flex-col gap-2.5 overflow-y-auto pr-2 -mr-2 custom-scrollbar">
//               {recentlyPlayed.slice(1, 3).map((track, idx) => (
//                 <div 
//                   key={idx} 
//                   onClick={async () => {
//                     if (deviceId && track.uri) {
//                       await sdkPlay(track.uri);
//                       setShowHistory(false);
//                     }
//                   }}
//                   className="flex items-center gap-3 group/item p-2 rounded-lg hover:bg-secondary/50 transition-all cursor-pointer"
//                 >
//                   <div className="w-10 h-10 rounded-md bg-secondary overflow-hidden flex-shrink-0 shadow-sm relative">
//                     <Image 
//                       src={track.cover} 
//                       alt={track.title}
//                       width={40}
//                       height={40}
//                       className="object-cover w-full h-full"
//                     />
//                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
//                       <Play size={16} className="text-white ml-0.5" />
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs font-medium truncate group-hover/item:text-green-500 transition-colors">{track.title}</p>
//                     <p className="text-[10px] text-muted-foreground truncate">{track.artist}</p>
//                   </div>
//                   <Link 
//                     href={track.link} 
//                     target="_blank" 
//                     onClick={(e) => e.stopPropagation()}
//                     className="p-1.5 hover:bg-secondary rounded-md transition-colors opacity-0 group-hover/item:opacity-100 flex-shrink-0"
//                     title="Open in Spotify"
//                   >
//                     <ExternalLink size={14} className="text-muted-foreground hover:text-foreground" />
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
