
I'm just way too lazy.

This simple Node.js script automatically uploads (or updates) a `.txt` file to a GitHub repository using the GitHub REST API.  
It’s mainly for keeping a repo active, automating commits, or — well — farming stats.

##  How it works
- Reads a local text file (default: `j.txt`)
- Encodes it in Base64
- Uploads it to your GitHub repo (creates or updates)
- Runs automatically every few hours (default: 4 hours)

## How to use:
 - Clone/Download the repo
 - Install npm dependencies
 - Replace the github token in .env file
 - Run
