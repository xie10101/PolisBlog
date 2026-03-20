"use client"
import "@/app/reset.css"
import { MetaItem } from "@/app/types/meta"
import PostTips from "./PostTips";
type ArticleProp = {
        slug: string;
        meta: MetaItem | null;
        htmlContent: string | "";
    };

export  default function Article(prop:ArticleProp) {
     const { slug, meta, htmlContent } = prop;
    return (
        <article key={prop.slug} className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-baseline">
                <h1> {meta===null ? "无标题" : meta.title}</h1>
                <PostTips meta={meta} />
                <div dangerouslySetInnerHTML={{ __html:   prop.htmlContent }} />
            </div>
        </article>
    );
}
