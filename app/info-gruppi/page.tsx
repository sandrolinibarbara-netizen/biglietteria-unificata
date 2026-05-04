import Image from "next/image";
import data from '@/utils/musei.json'
import TicketCard from "@/app/_components/TicketCard";
import Link from "next/link";

export default async function InfoGruppi() {

    let content;

    try {
        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/info-gruppi'+
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
                src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine.url}
                alt="Cremona vista dall'alto" width={500} height={500}
                className="w-full"
            />
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
                <h2 className="text-2xl font-semibold mt-4 mb-8">Gruppi scolastici</h2>

                <div className="flex flex-col gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                    <h3 className="text-2xl font-semibold mt-4 prime-text">Servizi educativi</h3>
                    <Image
                        className="w-full h-[200px] object-cover rounded-xl"
                        src="/placeholders/servizi-educativi.jpg" alt="Gruppi turistici" width={300} height={200}/>

                    <p className="text-xl">Clicca qui se vuoi prenotare l'accesso ai musei con il tuo gruppo scolastico.</p>
                    <div className="mb-4 text-black w-full font-medium text-lg">
                        <Link href="/" className="w-auto block text-center prime-bg rounded-full px-4 py-2">Scopri di
                            piu</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-8 p-4 mt-4 w-full text-white rounded-xl gradient">
                    <h3 className="text-2xl font-semibold mt-2 prime-text">Proposte educative</h3>
                    <p>Dalle scuole dell'infanzia, fino agli adulti lavoriamo per aprire le porte dei musei e
                        renderli accessibili al più ampio numero possibile di persone.
                    </p>
                    <div className="mb-4 text-black w-full text-end font-medium text-lg">
                        <Link href="/" className="w-fit prime-bg rounded-full px-4 py-2">Scopri di piu</Link>
                    </div>
                </div>
            </section>
        </>
    )
}