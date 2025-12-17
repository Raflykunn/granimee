import { AnimeDetail } from "@/components/animedetail"
import { List } from "@/components/animelist"

export default async function DetailPage({params}: Promise<{slug: string}> ) {
    const {slug} = await params

    return (
        <div className="relative flex flex-col gap-2 mb-6">
            <AnimeDetail slug={slug}/>
            <List apiUrl="/api/list/anime" header="Anime yang mirip dengan yang kamu tonton"/>
        </div>
    )
}
