import MainContainer from "@/app/(main)/containers/MainContainer";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  let { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", user.id)
    .single();

  const birthYear = profile?.birth_year;

  return (
    <>
      {birthYear && user.id && (
        <MainContainer birthYear={birthYear} userId={user.id} />
      )}
    </>
  );
}
