"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Icons } from "@/src/components/ui/icons";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/src/components/ui/tooltip";

const COLOR_PALETTE_SHOWCASE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Color Palette Showcase</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap" rel="stylesheet">
    <style>
        /* Light mode (default) */
        :root {
            --bg-primary: transparent;
            --bg-secondary: #f5f5f5;
            --text-primary: #1a1a1a;
            --text-secondary: #666666;
            --border-color: #e0e0e0;
            --accent-color: #3b82f6;
        }

        /* Dark mode via data-theme attribute */
        :root[data-theme="dark"],
        html[data-theme="dark"] {
            --bg-primary: transparent;
            --bg-secondary: #1a1a1a;
            --text-primary: #f5f5f5;
            --text-secondary: #a0a0a0;
            --border-color: #333333;
            --accent-color: #60a5fa;
        }

        /* Fallback: Dark mode via system preference */
        @media (prefers-color-scheme: dark) {
            :root:not([data-theme="light"]) {
                --bg-primary: transparent;
                --bg-secondary: #1a1a1a;
                --text-primary: #f5f5f5;
                --text-secondary: #a0a0a0;
                --border-color: #333333;
                --accent-color: #60a5fa;
            }
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        body {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-family: 'Inter', sans-serif;
            background: transparent;
            color: var(--text-primary);
            transition: background-color 0.3s, color 0.3s;
            cursor: grab;
            user-select: none;
            -webkit-user-select: none;
        }

        body.is-dragging {
            cursor: grabbing !important;
        }

        .card-container {
            position: relative;
            width: 0px;
            height: 300px;
            perspective: 1000px;
            perspective-origin: 50% -229%;
            cursor: pointer;
            padding-bottom: 100px;
        }

        .card {
            --card-rgb: 255, 255, 255;
            height: 300px;
            width: 300px;
            border-radius: 20px;
            overflow: hidden;

            /* Vivid glass: keep the true color while still feeling frosted/glassy */
            background:
                radial-gradient(140% 120% at 15% 10%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%),
                linear-gradient(
                    180deg,
                    rgba(var(--card-rgb), 0.98),
                    rgba(var(--card-rgb), 0.88)
                );
            backdrop-filter: blur(18px) saturate(200%);
            -webkit-backdrop-filter: blur(18px) saturate(200%);
            border: 1px solid rgba(255, 255, 255, 0.28);
            box-shadow:
                0 18px 48px rgba(0, 0, 0, 0.55),
                inset 0 1px 0 rgba(255, 255, 255, 0.35);

            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-end;
            padding: 25px;
            position: relative;
            isolation: isolate;
        }

        .card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
                120deg,
                rgba(255,255,255,0.55),
                rgba(255,255,255,0.10) 45%,
                rgba(255,255,255,0.32)
            );
            opacity: 0.6;
            mix-blend-mode: soft-light;
            pointer-events: none;
        }

        .card::after {
            content: '';
            position: absolute;
            inset: 0;
            background:
                radial-gradient(90% 70% at 80% 0%, rgba(255,255,255,0.38), rgba(255,255,255,0) 60%),
                radial-gradient(110% 90% at 90% 12%, rgba(0,0,0,0.26), rgba(0,0,0,0) 55%);
            opacity: 0.9;
            pointer-events: none;
        }

        .color-name {
            color: #fff;
            font-size: 18px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            z-index: 1;
            margin-bottom: 8px;
            text-align: right;
            text-shadow: 0 1px 14px rgba(0,0,0,0.6);
        }

        .color-hex {
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            position: relative;
            z-index: 1;
            letter-spacing: 0.5px;
            text-align: right;
            text-shadow: 0 1px 14px rgba(0,0,0,0.6);
        }

        .container {
            display: flex;
            gap: 30px;
            transform-origin: left center;
            will-change: transform;
        }
    </style>
</head> 
<body>
    <div class="container"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script>
        const container = document.querySelector('.container');
        const cards = [];
        const colorPalette = [
            // ===== RED SHADES =====
            { hex: '#880808', name: 'Blood Red' },
            { hex: '#DC143C', name: 'Crimson Red' },
            { hex: '#8B0000', name: 'Dark Red' },
            { hex: '#800020', name: 'Burgundy' },
            { hex: '#FF2400', name: 'Scarlet' },
            { hex: '#CC0000', name: 'Fire Engine Red' },
            { hex: '#E0115F', name: 'Ruby Red' },
            { hex: '#800000', name: 'Maroon' },
            { hex: '#AA4A44', name: 'Brick Red' },
            { hex: '#FF6347', name: 'Tomato Red' },
            { hex: '#FF3131', name: 'Neon Red' },
            { hex: '#D2042D', name: 'Cherry Red' },
            { hex: '#722F37', name: 'Wine Red' },
            { hex: '#ED2939', name: 'Imperial Red' },
            { hex: '#FF4040', name: 'Coral Red' },

            // ===== ORANGE SHADES =====
            { hex: '#FF7F00', name: 'Orange' },
            { hex: '#FFA500', name: 'Pure Orange' },
            { hex: '#FF8C00', name: 'Dark Orange' },
            { hex: '#FF4500', name: 'Orange Red' },
            { hex: '#FFB347', name: 'Pastel Orange' },
            { hex: '#FF5E0E', name: 'Vivid Orange' },
            { hex: '#E25822', name: 'Flame Orange' },
            { hex: '#FF9F00', name: 'Amber Orange' },
            { hex: '#D2691E', name: 'Chocolate Orange' },
            { hex: '#F28500', name: 'Tangerine' },

            // ===== GREEN SHADES =====
            { hex: '#00FF00', name: 'Lime Green' },
            { hex: '#32CD32', name: 'Leaf Green' },
            { hex: '#228B22', name: 'Forest Green' },
            { hex: '#006400', name: 'Dark Green' },
            { hex: '#2E8B57', name: 'Sea Green' },
            { hex: '#66CDAA', name: 'Medium Aquamarine' },
            { hex: '#7FFF00', name: 'Chartreuse' },
            { hex: '#00FA9A', name: 'Medium Spring Green' },
            { hex: '#00FF7F', name: 'Spring Green' },
            { hex: '#98FB98', name: 'Pale Green' },

            // ===== BLUE SHADES =====
            { hex: '#0000FF', name: 'Blue' },
            { hex: '#0000CD', name: 'Medium Blue' },
            { hex: '#4169E1', name: 'Royal Blue' },
            { hex: '#1E90FF', name: 'Dodger Blue' },
            { hex: '#4682B4', name: 'Steel Blue' },
            { hex: '#5F9EA0', name: 'Cadet Blue' },
            { hex: '#00BFFF', name: 'Deep Sky Blue' },
            { hex: '#87CEEB', name: 'Sky Blue' },
            { hex: '#6495ED', name: 'Cornflower Blue' },
            { hex: '#7DF9FF', name: 'Electric Blue' },
            { hex: '#191970', name: 'Midnight Blue' },
            { hex: '#003366', name: 'Dark Navy' },

            // ===== PURPLE / VIOLET SHADES =====
            { hex: '#800080', name: 'Purple' },
            { hex: '#8A2BE2', name: 'Blue Violet' },
            { hex: '#9370DB', name: 'Medium Purple' },
            { hex: '#DA70D6', name: 'Orchid' },
            { hex: '#BA55D3', name: 'Medium Orchid' },
            { hex: '#9400D3', name: 'Dark Violet' },
            { hex: '#9932CC', name: 'Dark Orchid' },
            { hex: '#D8BFD8', name: 'Thistle' },
            { hex: '#E6E6FA', name: 'Lavender' },
            { hex: '#4B0082', name: 'Indigo' },

            // ===== PINK SHADES =====
            { hex: '#FFC0CB', name: 'Pink' },
            { hex: '#FF69B4', name: 'Hot Pink' },
            { hex: '#FF1493', name: 'Deep Pink' },
            { hex: '#DB7093', name: 'Pale Violet Red' },
            { hex: '#FFB6C1', name: 'Light Pink' },
            { hex: '#C71585', name: 'Medium Violet Red' },
            { hex: '#F08080', name: 'Light Coral' },
            { hex: '#E75480', name: 'Dark Pink' },
            { hex: '#FF007F', name: 'Bright Pink' },
            { hex: '#FC0FC0', name: 'Neon Pink' },

            // ===== BROWN SHADES =====
            { hex: '#A52A2A', name: 'Brown' },
            { hex: '#8B4513', name: 'Saddle Brown' },
            { hex: '#D2691E', name: 'Chocolate' },
            { hex: '#CD853F', name: 'Peru' },
            { hex: '#F4A460', name: 'Sandy Brown' },
            { hex: '#DEB887', name: 'Burly Wood' },
            { hex: '#C19A6B', name: 'Camel' },
            { hex: '#704214', name: 'Sepia' },
            { hex: '#8B0000', name: 'Rust Brown' },
            { hex: '#FFE4C4', name: 'Bisque' },

            // ===== GREY / BLACK / WHITE =====
            { hex: '#000000', name: 'Black' },
            { hex: '#1C1C1C', name: 'Very Dark Grey' },
            { hex: '#2F4F4F', name: 'Dark Slate Grey' },
            { hex: '#696969', name: 'Dim Grey' },
            { hex: '#808080', name: 'Grey' },
            { hex: '#A9A9A9', name: 'Dark Grey' },
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#D3D3D3', name: 'Light Grey' },
            { hex: '#F5F5F5', name: 'White Smoke' },
            { hex: '#FFFFFF', name: 'White' },
        ];
 
         const cardCount = colorPalette.length;

         let currentScale = 1.0;
         let currentPanX = 20;
         let currentPanY = 0;
         let isDragging = false;
         let startX = 0;
         let startPanX = currentPanX;

         const getTransform = (index, yOffset = 0) => {
          return "rotateY(25deg) translateY(" + (index * 10 + yOffset) + "px) translateZ(" + (index * 0.5) + "px) skewY(-1deg)";
         };

         const animateCards = (index, yOffset, ease="power2.out") =>{
            const positions = [index - 1, index, index + 1];
            positions.forEach((pos,i)=>{
                if(cards[pos]){
                     gsap.to(cards[pos],{
                        duration:0.3,
                        ease:ease,
                        transform: getTransform(pos,yOffset[i])
                     });
                }
            });
         };

         function clampPan() {
            const minPanX = Math.min(-100, window.innerWidth - ((cardCount * 30 + 360) * currentScale) - 80);
            const maxPanX = 80;
            if (currentPanX < minPanX) currentPanX = minPanX;
            if (currentPanX > maxPanX) currentPanX = maxPanX;
         }

         function updateContainerTransform() {
            container.style.transform = "translate3d(" + currentPanX + "px, " + currentPanY + "px, 0) scale(" + currentScale + ")";
         }

         for(let i = 0; i < cardCount; i++){
            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';

            const card = document.createElement('div');
            card.className = 'card';
            card.style.transform = getTransform(i);
            const r = parseInt(colorPalette[i].hex.slice(1,3), 16);
            const g = parseInt(colorPalette[i].hex.slice(3,5), 16);
            const b = parseInt(colorPalette[i].hex.slice(5,7), 16);
            card.style.setProperty('--card-rgb', r + ', ' + g + ', ' + b);

            const colorName = document.createElement('div');
            colorName.className = 'color-name'; 
            colorName.textContent = colorPalette[i].hex.toUpperCase();

            const colorHex = document.createElement('div');
            colorHex.className = 'color-hex';
            colorHex.textContent = colorPalette[i].name;

            card.appendChild(colorName);
            card.appendChild(colorHex);
            cardContainer.appendChild(card);
            container.appendChild(cardContainer);
            cards.push(card);

            cardContainer.addEventListener('mouseenter',()=> {
                if (!isDragging) animateCards(i,[-80,-150,-80]);
            });
            cardContainer.addEventListener('mouseleave',()=> {
                animateCards(i,[0,0,0],"back.out(1.5)");
            });
         }

         // Panning via wheel / trackpad swipe or pinch-to-zoom
         window.addEventListener('wheel', (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const factor = e.deltaY < 0 ? 1.05 : 0.95;
                const nextScale = Math.max(0.35, Math.min(1.25, currentScale * factor));
                currentScale = Math.round(nextScale * 100) / 100;
                clampPan();
                updateContainerTransform();
                try {
                    window.parent.postMessage({ type: 'SCALE_CHANGED', scale: currentScale }, '*');
                } catch(err) {}
                return;
            }

            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            currentPanX -= delta * 0.9;
            clampPan();
            updateContainerTransform();
         }, { passive: false });

         // Pointer dragging to pan
         window.addEventListener('pointerdown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startPanX = currentPanX;
            document.body.classList.add('is-dragging');
         });

         window.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const deltaX = (e.clientX - startX);
            currentPanX = startPanX + deltaX;
            clampPan();
            updateContainerTransform();
         });

         const stopDrag = () => {
            if (isDragging) {
                isDragging = false;
                document.body.classList.remove('is-dragging');
            }
         };
         window.addEventListener('pointerup', stopDrag);
         window.addEventListener('pointercancel', stopDrag);
         window.addEventListener('resize', () => {
            clampPan();
            updateContainerTransform();
         });

         // Communication with parent React component
         window.addEventListener('message', (event) => {
            if (!event.data) return;
            if (event.data.type === 'SET_SCALE') {
                const targetScale = event.data.scale;
                gsap.to({ s: currentScale }, {
                    s: targetScale,
                    duration: 0.35,
                    ease: 'power2.out',
                    onUpdate: function() {
                        currentScale = this.targets()[0].s;
                        clampPan();
                        updateContainerTransform();
                    }
                });
            }
         });

         clampPan();
         updateContainerTransform();

         try {
            window.parent.postMessage({ type: 'READY' }, '*');
         } catch(err) {}
    </script>
</body>
</html>
`;

interface ColorPalettePreviewProps {
  isFullscreen?: boolean;
  isSidebarOpen?: boolean;
  scale?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onScaleChange?: (scale: number) => void;
}

export function ColorPalettePreview({
  isFullscreen = false,
  isSidebarOpen = true,
  scale: externalScale,
  onScaleChange,
}: ColorPalettePreviewProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [scale, setScale] = React.useState(externalScale ?? 1.0);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const DEFAULT_SCALE = 1.0;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const sendScaleToIframe = React.useCallback((newScale: number) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "SET_SCALE", scale: newScale },
        "*"
      );
    }
  }, []);

  // Sync incoming external scale (from action island) → iframe
  React.useEffect(() => {
    if (externalScale !== undefined && Math.abs(externalScale - scale) > 0.001) {
      setScale(externalScale);
      sendScaleToIframe(externalScale);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalScale]);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "READY") {
        sendScaleToIframe(scale);
      } else if (event.data?.type === "SCALE_CHANGED" && typeof event.data.scale === "number") {
        setScale(event.data.scale);
        onScaleChange?.(event.data.scale);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [scale, sendScaleToIframe, onScaleChange]);

  const htmlCode = React.useMemo(() => {
    const isDark = resolvedTheme === "dark";
    const themeScript = `
      <script>
        (function() {
          const isDark = ${isDark};
          document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
          document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
        })();
      </script>
    `;

    return COLOR_PALETTE_SHOWCASE_HTML.replace("<head>", "<head>" + themeScript);
  }, [resolvedTheme]);

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full relative flex items-center justify-center select-none">
      <iframe
        ref={iframeRef}
        key={resolvedTheme}
        srcDoc={htmlCode}
        title="Color Palette Showcase"
        className="w-full h-full border-0 bg-transparent block rounded-[32px] md:rounded-[36px]"
        sandbox="allow-scripts allow-same-origin"
        style={{ colorScheme: resolvedTheme === "dark" ? "dark" : "light" }}
        onLoad={() => sendScaleToIframe(scale)}
      />
    </div>
  );
}
