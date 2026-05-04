import Image from "next/image";
import {unstable_rethrow} from "next/navigation";
import Link from "next/link";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";
import EventCard from "@/app/_components/EventCard";
import {getExperiences} from "@/app/lib/domnia-experiences";
export default async function Home() {

    let museums, content;

    try {

        museums = await getExperiences('/');
        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/homepage'+
            '?populate[0]=immagine',
            {next: {revalidate: 1000}}
        );
        content = await data.json();
        console.log(content)

    } catch(e) {
        unstable_rethrow(e);
        console.log(e)
    }

    function getAddress(string:string) {
        const arr = string.split(', ');
        return arr[1] + ', ' + arr[2];
    }

  return (
    <>
      <Image
          src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine.url}
          alt="Cremona vista dall'alto" width={500} height={500}
          className="w-full"
      />
        {/*Lista musei*/}
        <section className="w-[90%] mx-auto pt-8">
            <div className="mb-8">
            <h1 className="text-4xl mb-4 font-semibold">{content.data.titolo}</h1>
            <p className="text-xl">{content.data.descrizione}</p>
            </div>

            <div className="flex flex-col gap-4">
            { museums &&
                museums.map((el, i) => {
                    return(
                        <div className="w-full text-white rounded-xl gradient"
                            key={el.title}>
                            <div className="w-full h-[200px]">
                                <Image
                                    className="w-full h-full object-cover rounded-t-xl"
                                    src={`/placeholders/${i}-hero.jpg`} alt={`Interno del ${el.title}`} width={300} height={200}/>
                            </div>
                            <div className="p-4 mt-2">
                                <h3 className="text-2xl font-medium">{el.title}</h3>
                                <p className="text-sm">{getAddress(el.locations[0].label)}</p>

                                <div className="flex flex-col gap-4 bg-white rounded-xl text-black p-4 mt-8 mb-4">
                                    <Image
                                        className="w-full h-[200px] object-cover rounded-xl"
                                        src={`/placeholders/${i}-ticket.jpg`} alt={`Interno del ${el.title}`} width={300} height={200}/>
                                    <div className="flex flex-col gap-2">
                                        <h4 className="text-xl font-medium">Ticket {el.title}</h4>
                                        <p className="line-clamp-6">{JSON.parse(museums[0].description)[0].children[0].text}</p>
                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-sm">A partire da: <br/><span className="text-xl font-medium">{el.cheapest}</span></p>
                                            <a target="_blank" className="flex items-center gap-2 text-lg font-medium prime-bg rounded-full px-4 py-2" href={`https://multishop-cremona.collaudo.domniapass.com/it/products/${el.slug}`}>
                                                Prenota
                                                <CircledArrow width={28} height={28}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full text-end font-medium prime-text underline text-xl px-4 pb-8">
                                <Link href={`/${el.slug}`}>Scopri le altre esperienze</Link>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>

        {/*Biglietto cumulativo*/}
        <section className="w-[90%] mx-auto pt-8">
            <div className="w-full text-white rounded-xl gradient">
                <div className="p-4 mt-2">
                    <h3 className="text-2xl font-semibold prime-text mt-4">Ticket Cumulativo</h3>
                    <p className="text-xl text-medium mt-2">Scoprire un museo è bello, ma visitarne più di uno è meglio. Il ticket cumulativo ti consente l'accesso a tutti i Musei del Polo Civico con tariffa agevolata.</p>

                    <div className="flex flex-col gap-4 bg-white rounded-xl text-black p-4 mt-8 mb-4">
                        <Image
                            className="w-full h-[200px] object-cover rounded-xl"
                            src="/placeholders/cumulativo.jpg" alt="Interno di un museo" width={300} height={200}/>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xl font-medium">Ticket Cumulativo: Museo “Ala Ponzone”, Museo “San Lorenzo”, Museo di Storia Naturale, Museo Il “Cambonino Vecchio”</h4>
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-sm">A partire da: <br/><span
                                    className="text-xl font-medium">12euro</span></p>
                                <Link
                                    className="flex items-center gap-2 text-lg font-medium prime-bg rounded-full px-4 py-2"
                                    href='/'>
                                    Prenota
                                    <CircledArrow width={28} height={28}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*Search bar*/}
        <section className="w-[90%] mx-auto pt-8">
                <div className="flex flex-col gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                    <h3 className="text-2xl font-semibold mt-2">Cerchi qualcosa di specifico?</h3>
                    <input type="text" className="text-black rounded-full bg-white h-[48px] p-2"/>
                    <div className="mb-4 text-black w-full text-end font-medium text-lg">
                        <Link href="/" className="w-fit prime-bg rounded-full px-4 py-2">Cerca</Link>
                    </div>
                </div>
        </section>

        {/*Biglietto gruppi*/}
        <section className="w-[90%] mx-auto pt-8">
            <div className="flex flex-col gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                <h3 className="text-2xl font-semibold mt-4 prime-text">Ticket per Gruppi</h3>
                <Image
                    className="w-full h-[200px] object-cover rounded-xl"
                    src="/placeholders/gruppi.jpg" alt="Gruppi turistici" width={300} height={200}/>

                <p className="text-xl">Prenota l'accesso per il tuo gruppo.
                    Scopri i ticket ridotti per i gruppi di più di 15 persone.</p>
                <div className="mb-4 text-black w-full font-medium text-lg">
                    <Link href="/" className="w-auto block text-center prime-bg rounded-full px-4 py-2">Scopri di piu</Link>
                </div>
            </div>
        </section>

        {/*Servizi educativi*/}
        <section className="w-[90%] mx-auto pt-8">
            <div className="flex flex-col gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                <h3 className="text-2xl font-semibold mt-4 prime-text">Servizi educativi</h3>
                <Image
                    className="w-full h-[200px] object-cover rounded-xl"
                    src="/placeholders/servizi-educativi.jpg" alt="Gruppi turistici" width={300} height={200}/>

                <p className="text-xl">Clicca qui se vuoi prenotare l'accesso ai musei con il tuo gruppo scolastico.</p>
                <div className="mb-4 text-black w-full font-medium text-lg">
                    <Link href="/" className="w-auto block text-center prime-bg rounded-full px-4 py-2">Scopri di piu</Link>
                </div>
            </div>
        </section>

        {/*Eventi*/}
        <section className="w-[90%] mx-auto pt-8">
            <h2 className="text-3xl font-semibold my-8">Eventi</h2>
            <EventCard/>
        </section>

        {/*News*/}
        <section className="w-[90%] mx-auto pt-8">
            <h2 className="text-3xl font-semibold my-8">News</h2>

            <Image
                className="w-full h-[300px] object-cover rounded-4xl p-4"
                src="/placeholders/news.jpg" alt="Interno" width={300} height={200}/>

            <div className="text-black w-full font-medium text-sm pt-4">
                <Link href="/" className="w-auto block text-center prime-bg rounded-full px-4 py-2">Vedi tutte le
                    news</Link>
            </div>
        </section>

        {/*Musei Italiani*/}
        <section className="w-[90%] mx-auto pt-8">
            <div className="flex flex-col gap-8 p-4 mt-2 w-full rounded-xl gradient">
                <h3 className="text-2xl font-semibold mt-2 prime-text">Musei Italiani</h3>
                <div className="mb-4 text-black w-full text-end font-medium text-sm">
                    <Link href="/" className="w-fit prime-bg rounded-full px-4 py-2">Vai al sito</Link>
                </div>
            </div>
        </section>

        {/*Contact form*/}
        <section className="w-[90%] mx-auto pt-8">
            <h2 className="text-3xl font-semibold my-8">Scrivici una mail</h2>

            <form className="bg-white rounded-xl flex flex-col gap-4 p-4">
                <label className="text-sm">Nome
                    <input type="text" className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                </label>
                <label className="text-sm">Cognome
                    <input type="text" className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                </label>
                <label className="text-sm">Email
                    <input type="email" className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                </label>
                <label className="text-sm">Messaggio
                    <textarea className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                </label>
                <div className="text-black w-full font-medium text-sm">
                    <button type="submit" className="w-full text-center prime-bg rounded-full px-4 py-2">Invia</button>
                </div>
            </form>
        </section>

    </>
  );
}
