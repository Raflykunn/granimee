import { ProfileDetail } from "./profileDetail";
import { WatchHistory } from "./watchhistory";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  //   console.log(id);
  const {id} = await params

  return (
    <div className="flex mx-16 my-24 gap-12">
        <ProfileDetail id={id}/>
        <WatchHistory/>
    </div>
) 
}
