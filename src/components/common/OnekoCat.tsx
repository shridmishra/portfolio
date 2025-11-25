'use client'

import { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpriteSet {
  [key: string]: [number, number][];
}

interface Heart {
  id: number;
  x: number;
  y: number;
  size: 'small' | 'large';
}

const SPRITE_SETS: SpriteSet = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

const NEKO_SPEED = 10;

export default function OnekoCat() {
  const nekoRef = useRef<HTMLDivElement>(null);
  const [nekoPos, setNekoPos] = useState<Position>({ x: 32, y: 32 });
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  const [frameCount, setFrameCount] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [idleAnimation, setIdleAnimation] = useState<string | null>(null);
  const [idleAnimationFrame, setIdleAnimationFrame] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const lastFrameTimestamp = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const setSprite = (name: string, frame: number) => {
    if (!nekoRef.current) return;
    const sprite = SPRITE_SETS[name][frame % SPRITE_SETS[name].length];
    nekoRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  };

  const resetIdleAnimation = () => {
    setIdleAnimation(null);
    setIdleAnimationFrame(0);
  };

  const handleIdle = () => {
    setIdleTime(prev => prev + 1);

    if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && !idleAnimation) {
      const availableIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPos.x < 32) availableIdleAnimations.push("scratchWallW");
      if (nekoPos.y < 32) availableIdleAnimations.push("scratchWallN");
      if (nekoPos.x > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
      if (nekoPos.y > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");

      setIdleAnimation(availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)]);
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) resetIdleAnimation();
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) resetIdleAnimation();
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    setIdleAnimationFrame(prev => prev + 1);
  };

  const handleFrame = () => {
    if (!nekoRef.current) return;

    setFrameCount(prev => prev + 1);
    const diffX = nekoPos.x - mousePos.x;
    const diffY = nekoPos.y - mousePos.y;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < NEKO_SPEED || distance < 48) {
      handleIdle();
      return;
    }

    setIdleAnimation(null);
    setIdleAnimationFrame(0);

    if (idleTime > 1) {
      setSprite("alert", 0);
      setIdleTime(prev => Math.max(prev - 1, 0));
      return;
    }

    let direction = "";
    direction += diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    const newX = nekoPos.x - (diffX / distance) * NEKO_SPEED;
    const newY = nekoPos.y - (diffY / distance) * NEKO_SPEED;

    setNekoPos({
      x: Math.min(Math.max(16, newX), window.innerWidth - 16),
      y: Math.min(Math.max(16, newY), window.innerHeight - 16)
    });
  };

  const handleNekoClick = () => {
    const timestamp = Date.now();
    const largeHeart: Heart = {
      id: timestamp,
      x: nekoPos.x - 10,
      y: nekoPos.y - 30,
      size: 'large'
    };
    const smallHeart: Heart = {
      id: timestamp + 1,
      x: nekoPos.x + 15,
      y: nekoPos.y - 45,
      size: 'small'
    };

    setHearts(prev => [...prev, largeHeart, smallHeart]);

    // Play meow sound
    const audio = new Audio('/meow.wav');
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Audio play failed:", e));

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== timestamp && h.id !== timestamp + 1));
    }, 1000);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    const animate = (timestamp: number) => {
      if (!lastFrameTimestamp.current) {
        lastFrameTimestamp.current = timestamp;
      }

      if (timestamp - lastFrameTimestamp.current > 100) {
        lastFrameTimestamp.current = timestamp;
        handleFrame();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion preference
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReducedMotion) {
      document.addEventListener('mousemove', handleMouseMove);
      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nekoPos, mousePos, frameCount, idleTime, idleAnimation, idleAnimationFrame]);

  return (
    <>
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart-animation"
          style={{
            position: 'fixed',
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            pointerEvents: 'none',
            zIndex: 2147483646,
            transform: 'translate(-50%, -50%)',
            width: heart.size === 'large' ? '24px' : '12px',
            height: heart.size === 'large' ? '24px' : '12px',
          }}
        >
          <div
            className="w-full h-full bg-pink-200/80 backdrop-blur-md shadow-lg"
            style={{
              maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }}
          />
        </div>
      ))}
      <div
        ref={nekoRef}
        onClick={handleNekoClick}
        aria-hidden="true"
        style={{
          width: '32px',
          height: '32px',
          position: 'fixed',
          pointerEvents: 'auto',
          imageRendering: 'pixelated',
          left: `${nekoPos.x - 16}px`,
          top: `${nekoPos.y - 16}px`,
          zIndex: 2147483647,
          backgroundImage: 'url(/oneko.gif)',
          cursor: 'pointer',
          filter: 'contrast(0.7) brightness(1) sepia(1) hue-rotate(290deg) saturate(3)',
        }}
      />
    </>
  );
}