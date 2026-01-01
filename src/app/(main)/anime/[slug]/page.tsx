import { AnimeDetail } from "@/components/animedetail";
import { RelatedList } from "@/components/animelist";

export default async function DetailPage({
  params,
}: Promise<{ slug: string }>) {
  const { slug } = await params;

  return (
    <div className="relative flex flex-col gap-2 mb-6">
      <AnimeDetail slug={slug} />
      <RelatedList
        slug={slug}
        header="Anime yang mirip dengan yang kamu tonton"
      />
    </div>
  );
}
