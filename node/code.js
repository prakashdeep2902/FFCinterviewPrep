import os from "os";
import fs from "fs";

async function readFile() {
  const stream = fs.createReadStream(
    "C:/Users/Windows 10/Downloads/Sharma_Prakash_Resume_ATS_Updated.docx",
  );

  for await (const chunk of stream) {
    // console.log(chunk.toString());
  }
}

readFile();

import net from "net";

const server = net.createServer((socket) => {
  socket.write("Hello Client");
  socket.on("data", (data) => {
    console.log(data.toString());
  });
});
