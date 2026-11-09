import { useState, useEffect, useRef } from 'react';

const Header = () => {
    const weatherEmojis = ['☁️', '⛅', '🌤️', '🌥️', '🌧️', '⛈️', '🌩️'];
    const [emojiIndex, setEmojiIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setEmojiIndex((prev) => (prev + 1) % weatherEmojis.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((error) => {
                        console.log("تم حظر التشغيل التلقائي بواسطة المتصفح، بانتظار تفاعل المستخدم.", error);
                        setIsPlaying(false);
                    });
            }
        }
    }, []);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <audio 
                ref={audioRef} 
                src="https://actions.google.com/sounds/v1/weather/thunderstorm.ogg" 
                loop 
            />

            <header className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-400/30 via-blue-500/20 to-indigo-500/30 backdrop-blur-md border border-white/20 shadow-sm animate-gradient">
                <div className="flex items-center gap-3">
                    <div className="text-2xl sm:text-3xl bg-white/30 dark:bg-zinc-400/40 backdrop-blur shadow-sm rounded-xl p-2.5 flex items-center justify-center shrink-0 w-12 h-12">
                        <span className="transition-opacity duration-300 ease-in-out">
                            {weatherEmojis[emojiIndex]}
                        </span>
                    </div>
                    <div>
                        <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight">
                            Weather App Dashboard
                        </h1>
                        <h3 className="text-xs sm:text-sm text-gray-600 font-medium">
                            Real-time Weather updates every 15 seconds
                        </h3>
                    </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <button 
                        onClick={toggleAudio}
                        className="flex items-center justify-center bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm hover:bg-white/80 transition-colors rounded-full p-2 border border-gray-200 shadow-sm text-sm"
                        title={isPlaying ? 'Pause Rain Sound' : 'Play Rain Sound'}
                    >
                        {isPlaying ? '🔊' : '🔇'}
                    </button>

                    <div className="flex items-center gap-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full px-3 py-1 border border-red-200 shadow-sm text-xs sm:text-sm font-semibold text-red-600">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Live
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;