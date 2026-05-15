import Image from "next/image";
import data from '@/utils/musei.json'
import TicketCard from "@/app/_components/TicketCard";
import getLowerPrice from "@/helpers/price/getLowerPrice";
import Link from "next/link";
import TwoPartsDescription from "@/app/_components/TwoPartsDescription";
import EventCard from "@/app/_components/EventCard";

export default async function MuseoCivico() {
    let content;

    try {
        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/museums/r1zzi0yzdpufn49yxpg9yjt2'+
            '?populate[0]=immagine',
            {next: {revalidate: 1000}}
        );
        content = await data.json();
        console.log(content)

    } catch(e) {
        console.log(e);
    }

    return(
        <>
            <Image
                // src='/placeholders/0-hero.jpg'
                src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine.url}
                alt="Cremona vista dall'alto" width={500} height={500}
                className="w-full"
            />
            {/*Lista biglietti*/}
            <section className="w-[90%] mx-auto pt-8">
                <div className="mb-8">
                    <p className="text-sm mb-8 font-light">Home / {content.data.titolo}</p>
                    <h1 className="text-4xl mb-4 font-semibold">{content.data.titolo}</h1>
                    <h2 className="text-2xl font-medium mb-2">{content.data.sottotitolo}</h2>
                    <TwoPartsDescription
                        partOne={content.data.descrizione_1}
                        partTwo={content.data.descrizione_2}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <TicketCard el={{
                        titolo: "Ticket",
                        nome: "Ticket " + data[0].nome,
                        descrizione: data[0].descrizione,
                        infoPrezzo: "A partire da:",
                        prezzo: getLowerPrice(data[0].biglietti),
                        pic: "0-ticket",
                        slug: content.data.slug,
                        immagine: content.data.immagine_biglietti_standard
                    }}/>

                    <TicketCard el={{
                        titolo: "Esperienze",
                        nome: "Un'opera al giorno",
                        descrizione: "Un calendario di incontri con focus su opere selezionate, spiegate da chi le conosce al meglio.",
                        infoPrezzo: "A partire da:",
                        prezzo: new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR"
                        }).format(5),
                        pic: "evento",
                        slug: content.data.slug,
                        immagine: content.data.immagine_biglietti_esperienze
                    }}/>

                    <TicketCard el={{
                        titolo: "Ticket Cumulativo",
                        nome: "Ticket Cumulativo: Museo “Ala Ponzone”, Museo “San Lorenzo”, Museo di Storia Naturale, Museo Il “Cambonino Vecchio”",
                        descrizione: "",
                        infoPrezzo: "",
                        prezzo: new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR"
                        }).format(12),
                        pic: "cumulativo",
                        slug: content.data.slug,
                        immagine: content.data.immagine_biglietti_standard
                    }}/>

                    <TicketCard el={{
                        titolo: "Gruppi",
                        nome: "Museo Civico “Ala Ponzone” per gruppi",
                        descrizione: "Prenota l'accesso per il tuo gruppo. Scopri i ticket ridotti per i gruppi di più di 15 persone.",
                        infoPrezzo: "",
                        prezzo: new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR"
                        }).format(8),
                        pic: "0-groups",
                        slug: content.data.slug,
                        immagine: content.data.immagine_biglietti_gruppi
                    }}/>

                    <TicketCard el={{
                        titolo: "Servizi educativi",
                        nome: "Museo Civico \"Ala Ponzone\" | Ingresso gruppi scolastici",
                        descrizione: "Prenota l'ingresso per il tuo gruppo scolastico.",
                        infoPrezzo: "",
                        prezzo: "Gratuito",
                        pic: "servizi-educativi",
                        slug: content.data.slug,
                        immagine: content.data.immagine_biglietti_scuole
                    }}/>

                </div>
            </section>

            {/*Proposte educative*/}
            <section className="w-[90%] mx-auto pt-8">
                <div className="flex flex-col gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                    <h3 className="text-2xl font-semibold mt-2 prime-text">Proposte educative</h3>
                    <p>Dalle scuole dell'infanzia, fino agli adulti lavoriamo per aprire le porte dei musei e renderli accessibili al più ampio numero possibile di persone.</p>
                    <div className="mb-4 text-black w-full text-end font-medium text-lg">
                        <a aria-label="Vai alla pagina dedicata alle nostre proposte educative"
                           target="_blank" rel="noopener noreferrer"
                           href="https://musei.comune.cremona.it/it/servizi-educativi/informazioni-didattica"
                           className="w-fit prime-bg rounded-full px-4 py-2">Scopri di più</a>
                    </div>
                </div>
            </section>

            {/*Eventi*/}
            <section className="w-[90%] mx-auto pt-8">
                <h2 className="text-2xl font-semibold mt-4 mb-8">Eventi</h2>
                <EventCard/>
            </section>
        </>
    )
}