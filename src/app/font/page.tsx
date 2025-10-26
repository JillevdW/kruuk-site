"use client"

import { useState, useEffect, useRef } from 'react';
import { exportToGif } from '@/lib/gif_export';
import "./font.css"


const FONTS = [
    'HandwritingSix',
    'HandwritingFive',
    'HandwritingOne',
    'HandwritingThree',
    'HandwritingTwo',
    'HandwritingFour',
];

export default function Home() {
    const [text, setText] = useState('The Kruuk ♥ ♪ ♫');
    const [speed, setSpeed] = useState(0.2);
    const [fontSize, setFontSize] = useState(80);
    const [textColor, setTextColor] = useState('#FFFFFF');
    const [currentFontIndex, setCurrentFontIndex] = useState(0);
    const [isExporting, setIsExporting] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFontIndex((prev) => (prev + 1) % FONTS.length);
        }, Math.max(0.1, speed) * 1000);

        return () => clearInterval(interval);
    }, [speed]);

    const handleExport = async () => {
        if (!text.trim()) return;

        setIsExporting(true);
        try {
            await exportToGif(text, FONTS, Math.max(0.1, speed), fontSize, textColor);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export GIF. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-4xl space-y-8">
                <div className="space-y-6 bg-slate-200 bg-opacity-20 p-8 rounded-xl">
                    <div className="space-y-2">
                        <label htmlFor="text-input" className="text-sm font-medium text-foreground">
                            Your Text
                        </label>
                        <textarea
                            id="text-input"
                            data-testid="input-text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter your text to animate..."
                            className="w-full min-h-16 px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none text-black"
                        />
                    </div>

                    <div
                        className="bg-card border border-card-border rounded-lg p-8 pt-0 md:p-0 md:p-12 min-h-64 flex items-center justify-center"
                        style={{ boxShadow: 'var(--shadow-xl)' }}
                    >
                        {text.trim() ? (
                            <div
                                data-testid="text-preview"
                                className="font-bold text-center break-words overflow-clip max-w-full transition-all duration-300 text-nowrap"
                                style={{
                                    fontFamily: FONTS[currentFontIndex],
                                    color: textColor,
                                    fontSize: `${fontSize}px`
                                }}
                            >
                                {text}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center">Your animated text will appear here</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="speed-slider" className="text-sm font-medium text-foreground">
                                    Animation Speed
                                </label>
                                <span className="text-sm text-muted-foreground" data-testid="text-speed">
                                    {Math.max(0.1, speed).toFixed(1)}s
                                </span>
                            </div>
                            <input
                                id="speed-slider"
                                data-testid="input-speed"
                                type="range"
                                min="0.1"
                                max="2"
                                step="0.1"
                                value={speed}
                                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Fast (0.1s)</span>
                                <span>Slow (2.0s)</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="fontsize-slider" className="text-sm font-medium text-foreground">
                                    Font Size
                                </label>
                                <span className="text-sm text-muted-foreground" data-testid="text-fontsize">
                                    {fontSize}px
                                </span>
                            </div>
                            <input
                                id="fontsize-slider"
                                data-testid="input-fontsize"
                                type="range"
                                min="24"
                                max="300"
                                step="4"
                                value={fontSize}
                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Small (24px)</span>
                                <span>Large (300px)</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="color-picker" className="text-sm font-medium text-foreground">
                            Text Color
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                id="color-picker"
                                data-testid="input-color"
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="h-10 w-20 rounded-lg cursor-pointer border border-input bg-background"
                            />
                            <input
                                type="text"
                                data-testid="input-color-text"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                placeholder="#000000"
                                className="flex-1 h-10 px-4 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground font-mono"
                            />
                        </div>
                    </div>

                    <button
                        data-testid="button-export"
                        onClick={handleExport}
                        disabled={!text.trim() || isExporting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity border border-primary-border"
                        style={{ minHeight: '2.5rem' }}
                    >
                        {isExporting ? (
                            <>
                                <div className="grid place-items-center overflow-x-scroll rounded-lg lg:overflow-visible">
                                    <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24">
                                        <path
                                            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                            stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                                        </path>
                                    </svg>
                                </div>
                                <span>Generating GIF...</span>
                            </>
                        ) : (
                            <>
                                <span>Export as GIF</span>
                            </>
                        )}
                    </button>
                </div>

                <canvas ref={canvasRef} id="canvas" className="" />
            </div>
        </div>
    );
}