import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import Image from "next/image";

export default async function JournalPage() {
    const posts = await getAllPosts();

    return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-32 pb-20 bg-[#1a1a1a] text-white">
                <div className="container mx-auto px-4">
                    <header className="mb-16 text-center">
                        <h1 className="text-4xl md:text-6xl font-serif mb-4">Chef’s Journal</h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Behind the scenes, recipes, and culinary insights from Chef Ruthe 4th.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article key={post.slug} className="bg-neutral-900 border border-neutral-800 overflow-hidden group hover:border-accent transition-colors duration-300">
                                <Link href={`/journal/${post.slug}`}>
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={post.image || "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1000&auto=format&fit=crop"}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-xs uppercase tracking-widest text-white border border-white/20">
                                            {post.category || "Culinary"}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="text-xs text-gray-500 mb-3 uppercase tracking-widest">
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </div>
                                        <h2 className="text-2xl font-serif mb-4 group-hover:text-accent transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-400 line-clamp-3 mb-6">
                                            {post.excerpt}
                                        </p>
                                        <span className="text-sm font-medium border-b border-accent pb-1">
                                            Read More &rarr;
                                        </span>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
