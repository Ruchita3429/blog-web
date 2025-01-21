import Link from "next/link";

export default function Home() {
  return (
    <>
       <h1 className="text-center text-xl ">HOME</h1>
       <Link href="/signup">Signup for free</Link>
       </>
  );
}
