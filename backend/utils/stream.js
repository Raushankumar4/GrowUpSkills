import fs from 'fs';
import path from 'path';

export const streamVideo = (req, res) => {
  const filename = req.params.filename;
  const videoPath = path.join(path.resolve(), 'uploads', filename);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: "Video not found." });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    return res
      .status(416)
      .set("Accept-Ranges", "bytes")
      .json({ error: "Range header required for streaming." });
  }

  const CHUNK_SIZE = 10 ** 6; 
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);


  const videoStream = fs.createReadStream(videoPath, { start, end });

  videoStream.pipe(res);
};
