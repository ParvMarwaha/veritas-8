const fs = require('fs');

const content = fs.readFileSync('/Users/parv/.gemini/antigravity-ide/brain/fd3c6708-94d5-485b-b340-ec1d89ebc73c/.system_generated/steps/214/content.md', 'utf8');

// Simple regex to extract text content, very rudimentary but works for just getting the text
const text = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

fs.writeFileSync('/Users/parv/Desktop/AI experiments/veritas 8/hark_text.txt', text);
console.log("Done");
