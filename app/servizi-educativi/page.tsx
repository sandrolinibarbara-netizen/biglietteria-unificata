import Image from "next/image";
import data from '@/utils/musei.json'
import TicketCard from "@/app/_components/TicketCard";
import Link from "next/link";
import {unstable_rethrow} from "next/navigation";

export default async function ServiziEducativi() {

    let content;

    try {

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/servizi-educativi',
            {next: {revalidate: 1000}}
        );
        content = await data.json();
        console.log(content)

    } catch(e) {
        unstable_rethrow(e);
        console.log(e)
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
                    <TicketCard el={{
                        titolo: "",
                        nome: "Ticket gruppi " + data[0].nome,
                        descrizione: "Prenota l'accesso per il tuo gruppo.",
                        infoPrezzo: "",
                        prezzo: new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR"
                        }).format(data[0].biglietti[0].prezzo),
                        pic: "0-groups"
                    }}/>

                    <TicketCard el={{
                        titolo: "",
                        nome: "Ticket gruppi " + data[1].nome,
                        descrizione: "Prenota l'accesso per il tuo gruppo.",
                        infoPrezzo: "",
                        prezzo: new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR"
                        }).format(data[1].biglietti[0].prezzo),
                        pic: "1-groups"
                    }}/>

                    <TicketCard el={{
                        titolo: "",
                        nome: "Ticket gruppi " + data[2].nome,
                        descrizione: "Prenota l'accesso per il tuo gruppo.",
                        infoPrezzo: "",
                        prezzo: new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR"
                        }).format(data[2].biglietti[0].prezzo),
                        pic: "2-groups"
                    }}/>

                    <TicketCard el={{
                        titolo: "",
                        nome: "Ticket gruppi " + data[3].nome,
                        descrizione: "Prenota l'accesso per il tuo gruppo.",
                        infoPrezzo: "",
                        prezzo: new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR"
                        }).format(data[3].biglietti[0].prezzo),
                        pic: "3-groups"
                    }}/>


                </div>
            </section>

            {/*Gruppi scolastici*/}
            <section className="w-[90%] mx-auto pt-8">
                <h2 className="text-2xl font-semibold mt-4 mb-8">Proposte educative</h2>

                <div className="flex flex-col gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                    <Image
                        className="w-full h-[200px] object-cover rounded-xl"
                        src="/placeholders/proposte.jpg" alt="Gruppi turistici" width={300} height={200}/>
                    <div>
                        <p>Le nostre proposte educative permettono di arricchire la tua visita.
                            Scopri i nostri percorsi laboratoristi rivolte a scuole, giovani e adulti.
                        </p>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Diritto di prenotazione</h3>
                        <p>
                            L'ingresso per gli studenti è gratuito, si applica la tariffa di 2€ a persona come diritto
                            di prenotazione.
                        </p>
                    </div>
                    <div className="mb-4 text-black w-full font-medium text-lg">
                        <Link href="/" className="w-auto block text-center prime-bg rounded-full px-4 py-2">Vai al
                            sito</Link>
                    </div>
                </div>
            </section>
        </>
    )
}