import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getPostBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface PostPageProps {
    params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            <Header />
            <article className="pt-32 pb-20 bg-[#1a1a1a] text-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Link
                        href="/journal"
                        className="inline-flex items-center text-accent mb-12 hover:translate-x-[-4px] transition-transform"
                    >
                        &larr; Back to Journal
                    </Link>

                    <header className="mb-12">
                        <div className="text-xs text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-4">
                            <span>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                            <span className="text-accent">{post.category || "Culinary"}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                            {post.title}
                        </h1>
                        <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden mb-12 border border-neutral-800">
                            <Image
                                src={post.image || "/images/placeholder-journal.jpg"}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </header>

                    <div
                        className="prose prose-invert prose-lg max-w-none prose-accent prose-headings:font-serif prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-20 pt-12 border-t border-neutral-800">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 px-8 bg-neutral-900/50 backdrop-blur-sm">
                            <div>
                                <h3 className="text-2xl font-serif mb-2">Want to experience this live?</h3>
                                <p className="text-gray-400">Book Chef Ruthe 4th for a private culinary experience.</p>
                            </div>
                            <Link
                                href="/#booking"
                                className="bg-accent text-white px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-accent/80 transition-colors"
                            >
                                Inquire Now
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
            <Footer />
        </main >
    );
}
