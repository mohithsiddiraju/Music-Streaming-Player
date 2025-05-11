const handleTimeUpdate = () => {
  setCurrentTime(audioRef.current.currentTime);
};
import React, { useState, useEffect, useRef } from 'react';
import { Search, Home, Library, Heart, Plus, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Compass, Clock } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const featuredImages = [
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
  "https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1511376777868-611b54f68947"
];

const trendingTracks = [
  {
    title: "Track One",
    artist: "Artist A",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
  },
  {
    title: "Track Two",
    artist: "Artist B",
    image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae"
  },
  {
    title: "Track Three",
    artist: "Artist C",
    image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357"
  },
  {
    title: "Track Four",
    artist: "Artist D",
    image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae"
  },
  {
    title: "Track Five",
    artist: "Artist E",
    image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357"
  },
  {
    title: "Track Six",
    artist: "Artist F",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
  }
];

const TuneUpLayout = () => {
const [isSidebarOpen, setSidebarOpen] = useState(true);
const [isPlaying, setIsPlaying] = useState(false);
const sidebarRef = useRef(null);
const mouseTimeoutRef = useRef(null);
const lastMouseXRef = useRef(0);

// Audio player state
const audioRef = useRef(null);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const [volume, setVolume] = useState(0.5);
const [isMuted, setIsMuted] = useState(false);

// Format time in MM:SS
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const handleLoadedMetadata = () => {
  setDuration(audioRef.current.duration);
};

const handleSeek = (e) => {
  const newTime = e.target.value;
  audioRef.current.currentTime = newTime;
  setCurrentTime(newTime);
};

const handleVolumeChange = (e) => {
  const newVolume = parseFloat(e.target.value);
  setVolume(newVolume);
  audioRef.current.volume = newVolume;
  if (newVolume > 0) setIsMuted(false);
};

const toggleMute = () => {
  if (isMuted) {
    audioRef.current.volume = volume;
  } else {
    audioRef.current.volume = 0;
  }
  setIsMuted(!isMuted);
};

const togglePlayPause = () => {
  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }
  setIsPlaying(!isPlaying);
};

useEffect(() => {
  const handleMouseMove = (e) => {
    const currentX = e.clientX;
    const movingTowards = currentX < lastMouseXRef.current;
    lastMouseXRef.current = currentX;

    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }

    if (currentX <= 100 || (movingTowards && currentX <= 150)) {
      setSidebarOpen(true);
      return;
    }

    if (currentX > 288) {
      mouseTimeoutRef.current = setTimeout(() => {
        setSidebarOpen(false);
      }, 200);
    }
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current);
    }
  };
}, []);

return (
  <Router>
  <div className="h-screen bg-black text-white flex overflow-hidden font-sans">
    {/* Hidden audio element */}
    <audio
      ref={audioRef}
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={() => setIsPlaying(false)}
      controls={false}
    />

    {/* Sidebar */}
    <div 
      ref={sidebarRef}
      className={`bg-black border-r border-white/10 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col ${
        isSidebarOpen ? 'w-72' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-center border-b border-white/10">
        <div className={`${!isSidebarOpen ? 'hidden' : ''}`}>
          <div className={`tuneup-logo ${!isSidebarOpen ? 'collapsed' : ''}`}>
            <div className="pixel t1"></div>
            <div className="pixel t2"></div>
            <div className="pixel u1"></div>
            <div className="pixel u2"></div>
            <div className="pixel u3"></div>
            <div className="pixel n1"></div>
            <div className="pixel n2"></div>
            <div className="pixel n3"></div>
            <div className="pixel e1"></div>
            <div className="pixel e2"></div>
            <div className="pixel e3"></div>
            <div className="pixel e4"></div>
            <div className="pixel u4"></div>
            <div className="pixel u5"></div>
            <div className="pixel u6"></div>
            <div className="pixel p1"></div>
            <div className="pixel p2"></div>
            <div className="pixel p3"></div>
            <div className="pixel p4"></div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-4 py-8 space-y-2 opacity-100 transition-opacity duration-500">
        <NavItem icon={<Home size={22} />} label="Home" isCollapsed={!isSidebarOpen} isActive={true} />
        <NavItem icon={<Compass size={22} />} label="Discover" isCollapsed={!isSidebarOpen} />
        <NavItem icon={<Clock size={22} />} label="Recent" isCollapsed={!isSidebarOpen} />
        <NavItem icon={<Heart size={22} />} label="Favorites" isCollapsed={!isSidebarOpen} />
      </nav>

      {/* Library Section */}
      <div className={`mt-4 px-4 transition-opacity duration-500 ${!isSidebarOpen ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-sm uppercase tracking-wider text-white/40">Library</span>
          <Plus size={18} className="text-white/40 hover:text-white cursor-pointer" />
        </div>
        {['Daily Mix', 'Top Hits', 'Chill Vibes', 'Rock Classics'].map((playlist) => (
          <div
            key={playlist}
            className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer group transition-all duration-300"
          >
            <div className="w-10 h-10 bg-white/10 rounded-lg group-hover:bg-white/15 transition-colors duration-300" />
            <div>
              <p className="text-sm font-medium">{playlist}</p>
              <p className="text-xs text-white/40">14 tracks</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col bg-gradient-to-b from-neutral-900 to-black">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between bg-black/30 backdrop-blur-xl sticky top-0 z-10">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <div className="w-1/3 flex justify-end gap-2">
              <Link to="/signup">
                <button className="px-5 py-1.5 text-sm border border-white/10 rounded-full hover:bg-white/10">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="px-5 py-1.5 text-sm bg-white text-black rounded-full hover:bg-white/90">Log In</button>
              </Link>
            </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
        {/* Featured Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured</h2>
          <div className="grid grid-cols-3 gap-6">
  {featuredImages.map((img, index) => (
    <div
      key={index}
      className="group relative aspect-[16/9] bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          className="p-4 bg-white rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          onClick={togglePlayPause}
        >
          <Play size={24} className="text-black" fill="black" />
        </button>
      </div>
    </div>
  ))}
</div>

        </section>

        {/* Trending Now */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
          <div className="grid grid-cols-6 gap-5">
  {trendingTracks.map((track, i) => (
    <div key={i} className="group cursor-pointer">
      <div
        className="aspect-square bg-white/5 rounded-xl mb-3 group-hover:bg-white/10 transition-colors"
        style={{
          backgroundImage: `url(${track.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <h3 className="font-medium text-sm truncate">{track.title}</h3>
      <p className="text-xs text-white/40 truncate">{track.artist}</p>
    </div>
  ))}
</div>

        </section>
      </main>

      {/* Player */}
      <div className="h-24 border-t border-white/10 bg-black/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
          {/* Track Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/10 rounded-lg" />
            <div>
              <h4 className="font-medium">Demo Track</h4>
              <p className="text-sm text-white/40">SoundHelix</p>
            </div>
            <Heart size={20} className="text-white/40 hover:text-white cursor-pointer" />
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-6">
              <SkipBack size={22} className="text-white/60 hover:text-white cursor-pointer" />
              <button
                onClick={togglePlayPause}
                className="p-3 bg-white rounded-full hover:bg-white/90 transition-colors"
              >
                {isPlaying ? 
                  <Pause size={22} className="text-black" /> : 
                  <Play size={22} className="text-black" fill="black" />
                }
              </button>
              <SkipForward size={22} className="text-white/60 hover:text-white cursor-pointer" />
            </div>
            <div className="flex items-center space-x-2 w-96">
              <span className="text-xs text-white/40">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
              />
              <span className="text-xs text-white/40">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center space-x-3">
            <button onClick={toggleMute} className="hover:text-white">
              {isMuted ? <VolumeX size={20} className="text-white/40" /> : <Volume2 size={20} className="text-white/40" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-white/10 rounded-full overflow-hidden appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  </Router>
);
};

const NavItem = ({ icon, label, isCollapsed, isActive }) => (
<button 
  className={`flex items-center space-x-4 w-full p-3 rounded-lg transition-all duration-300
    ${isActive 
      ? 'bg-white/10 text-white' 
      : 'text-white/60 hover:text-white hover:bg-white/5'}`}
>
  {icon}
  {!isCollapsed && <span className="font-medium">{label}</span>}
</button>

);

export default TuneUpLayout;