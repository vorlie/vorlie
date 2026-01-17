import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../public/blog/posts');
const outputFile = path.join(__dirname, '../public/blog/posts.json');

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return null;
  
  const frontmatterText = match[1];
  const markdown = match[2];
  
  const frontmatter = {};
  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      value = value.replace(/^["']|["']$/g, '');
      
      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key.trim()] = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      } else {
        frontmatter[key.trim()] = value;
      }
    }
  });
  
  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = markdown.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return { frontmatter, readingTime };
}

function generatePostsJson() {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const content = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
    const parsed = parseFrontmatter(content);
    
    if (!parsed) {
      console.warn(`Failed to parse ${filename}`);
      return null;
    }
    
    return {
      slug,
      title: parsed.frontmatter.title || 'Untitled',
      date: parsed.frontmatter.date || new Date().toISOString(),
      tags: Array.isArray(parsed.frontmatter.tags) ? parsed.frontmatter.tags : [],
      excerpt: parsed.frontmatter.excerpt || '',
      readingTime: parsed.readingTime
    };
  }).filter(Boolean);
  
  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
  console.log(`✅ Generated posts.json with ${posts.length} posts`);
}

generatePostsJson();
