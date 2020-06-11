import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';
import remark from 'remark';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html from 'remark-html';
import { Post } from '../entities/post.entity';

const postsDirectory = path.join(process.cwd(), 'posts');

interface FrontMatter {
  date: string;
  title: string;
}

export function getSortedPostsData(): Post[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult: GrayMatterFile<string> = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as FrontMatter),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(): {
  params: {
    id: string;
  };
}[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as FrontMatter),
  };
}
