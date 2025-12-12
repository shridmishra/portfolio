import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "latest songs";
  const maxResults = parseInt(searchParams.get("limit") || "10");

  if (!process.env.YOUTUBE_API_KEY) {
    return NextResponse.json(
      { error: "YouTube API key not configured" },
      { status: 500 }
    );
  }

  try {
    // Search for videos
    const searchResponse = await youtube.search.list({
      part: ["snippet"],
      q: query,
      type: ["video"],
      videoCategoryId: "10", // Music category
      maxResults,
      order: "relevance",
    });

    if (!searchResponse.data.items) {
      return NextResponse.json({ tracks: [] });
    }

    // Get video details including duration
    const videoIds = searchResponse.data.items
      .map((item) => item.id?.videoId)
      .filter(Boolean) as string[];

    const videoResponse = await youtube.videos.list({
      part: ["contentDetails", "snippet"],
      id: videoIds,
    });

    const tracks = videoResponse.data.items?.map((video) => {
      // Parse ISO 8601 duration (e.g., "PT4M13S" -> milliseconds)
      const duration = video.contentDetails?.duration || "PT0S";
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      const hours = parseInt(match?.[1] || "0");
      const minutes = parseInt(match?.[2] || "0");
      const seconds = parseInt(match?.[3] || "0");
      const duration_ms = (hours * 3600 + minutes * 60 + seconds) * 1000;

      return {
        id: video.id,
        name: video.snippet?.title || "",
        artists: video.snippet?.channelTitle || "",
        album: "YouTube",
        duration_ms,
        uri: `youtube:video:${video.id}`,
        videoId: video.id,
        image:
          video.snippet?.thumbnails?.medium?.url ||
          video.snippet?.thumbnails?.default?.url ||
          "",
        external_url: `https://www.youtube.com/watch?v=${video.id}`,
      };
    }) || [];

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return NextResponse.json(
      { error: "Failed to search YouTube" },
      { status: 500 }
    );
  }
}
