import Link from "next/link";
import EventCard from "@/app/_components/EventCard";

export default async function NewsEventi() {

    let content;

    try {
        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/news',
            {next: {revalidate: 1000}}
        );
        content = await data.json();
        console.log(content)

    } catch(e) {
        console.log(e);
    }

    return(
        <>
            {/*Lista biglietti*/}
            <section className="w-[90%] mx-auto pt-8">
                <div className="mb-8">
                    <p className="text-sm mb-8 font-light">Home / {content.data.titolo}</p>
                    <h1 className="text-4xl mb-4 font-semibold">{content.data.titolo}</h1>
                    <p className="text-xl">{content.data.descrizione}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <EventCard card={true}/>
                    <EventCard card={true}/>
                    <EventCard card={true}/>
                    <EventCard card={true}/>
                </div>
            </section>

            {/*News*/}
            <section className="w-[90%] mx-auto pt-8">
                <h2 className="text-2xl font-semibold mt-4 mb-8">News</h2>

                <div className="mb-4 text-black w-full font-medium text-lg">
                    <Link href="/" className="w-auto block text-center prime-bg rounded-full px-4 py-2">Vai a tutte le news</Link>
                </div>
            </section>
        </>
    )
}