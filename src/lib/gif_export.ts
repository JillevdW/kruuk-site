import GIF from 'gif.js';

export async function exportToGif(
    text: string,
    fonts: string[],
    intervalSeconds: number,
    fontSize: number = 120,
    textColor: string
): Promise<void> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    const padding = 40;

    ctx.font = `bold ${fontSize}px ${fonts[0]}`;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize * 1.2;

    canvas.width = Math.ceil(textWidth + padding * 2);
    canvas.height = Math.ceil(textHeight + padding * 2);
    const gif = new GIF({
        workers: 2,
        quality: 10,
        width: canvas.width,
        height: canvas.height,
        debug: true,
        transparent: '0x000000',
        workerScript: '/workers/gif.worker.js'
    });

    const delay = Math.max(100, Math.round(intervalSeconds * 1000));

    for (const font of fonts) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px ${font}`;
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        gif.addFrame(ctx, { copy: true, delay });
    }

    return new Promise((resolve, reject) => {
        gif.on('finished', (blob: Blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'font-animation.gif';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            resolve();
        });

        // gif.on('error', (error: Error) => {
        //   reject(error);
        // });
        gif.render();
    });
}
