import React from 'react';

// Playful School and child themed SVG icons
const Star = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const Triangle = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

const Circle = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const Square = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);

export default function AnimatedBackground() {
  const shapes = [Star, Triangle, Circle, Square];
  const colors = ['text-yellow-300', 'text-pink-400', 'text-cyan-400', 'text-emerald-400', 'text-orange-400'];

  // Generate random floating items
  const floatingItems = Array.from({ length: 30 }).map((_, i) => {
    const ShapeComponent = shapes[i % shapes.length];
    const colorClass = colors[i % colors.length];
    return {
      id: i,
      Component: ShapeComponent,
      color: colorClass,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 15 + 15}s`, // Between 15s and 30s
      animationDelay: `-${Math.random() * 30}s`, // Staggered start times
      size: `${Math.random() * 2 + 1.2}rem`, // 1.2rem to 3.2rem size
      rotation: Math.random() * 360,
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-900">
      {/* Cheerful dynamic gradient blobs */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[45rem] h-[45rem] rounded-full bg-blue-600 opacity-25 mix-blend-screen filter blur-[100px] animate-[blob_9s_infinite_ease-in-out]"
      ></div>
      <div 
        className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-pink-500 opacity-20 mix-blend-screen filter blur-[100px] animate-[blob_11s_infinite_ease-in-out]" 
        style={{ animationDelay: '2s' }}
      ></div>
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[40rem] h-[40rem] rounded-full bg-yellow-400 opacity-15 mix-blend-screen filter blur-[120px] animate-[blob_10s_infinite_ease-in-out]" 
        style={{ animationDelay: '4s' }}
      ></div>
      <div 
        className="absolute bottom-[20%] right-[30%] w-[25rem] h-[25rem] rounded-full bg-emerald-500 opacity-15 mix-blend-screen filter blur-[90px] animate-[blob_8s_infinite_ease-in-out]" 
        style={{ animationDelay: '6s' }}
      ></div>

      {/* Notebook paper dots - relatable to school/learning */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] bg-[length:32px_32px]"></div>
      
      {/* Floating playful shapes (stars, circles, squares, triangles) */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingItems.map((p) => (
          <div
            key={p.id}
            className={`absolute ${p.color} animate-[floatUp_infinite_linear]`}
            style={{
              left: p.left,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
            }}
          >
            <p.Component 
              className="drop-shadow-lg opacity-40 transition-transform duration-300" 
              style={{ 
                width: p.size, 
                height: p.size,
                transform: `rotate(${p.rotation}deg)` 
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
