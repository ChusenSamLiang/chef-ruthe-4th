import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/journal');

export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    image?: string;
    category?: string;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        content: contentHtml,
        ...(data as { title: string; date: string; excerpt: string; image?: string; category?: string }),
    };
}

export async function getAllPosts(): Promise<Post[]> {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = await Promise.all(
        fileNames
            .filter((fileName) => fileName.endsWith('.md'))
            .map(async (fileName) => {
                const slug = fileName.replace(/\.md$/, '');
                return await getPostBySlug(slug);
            })
    );

    return (allPostsData.filter(Boolean) as Post[]).sort((a, b) => (a.date < b.date ? 1 : -1));
}
