const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const GITHUB_TOKEN = process.env.TOKEN
const OWNER = "reallav0";
const REPO = "check";
const FILE_PATH = "./j.txt";
const FILE_NAME = "j.txt";
const BRANCH = "main";

async function uploadFile() {
  try {
    const content = fs.readFileSync(FILE_PATH, "utf8");
    const newContent = content + "N";
    fs.writeFileSync(FILE_PATH, newContent, "utf8");
    const encoded = Buffer.from(newContent).toString("base64");

    let sha;
    try {
      const res = await axios.get(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_NAME}`,
        {
          headers: { Authorization: `token ${GITHUB_TOKEN}` },
        }
      );
      sha = res.data.sha;
    } catch (err) {
      if (err.response && err.response.status !== 404) throw err;
    }

    const res = await axios.put(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_NAME}`,
      {
        message: "Upload text file via API",
        content: encoded,
        branch: BRANCH,
        sha: sha || undefined,
      },
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );

    console.log("File uploaded successfully!");
   
  } catch (error) {
    console.error("Upload failed:", error.response?.data || error.message);
  }
}
uploadFile()
setInterval(uploadFile, 1.44e7);
