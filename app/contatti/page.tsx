import {unstable_rethrow} from "next/navigation";

export default async function Contatti() {

    let content, contentContacts;

    try {

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/museums',
            {next: {revalidate: 1000}}
        );
        content = await data.json();

        const dataContacts = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/contatti',
            {next: {revalidate: 1000}}
        );
        contentContacts = await dataContacts.json();


    } catch(e) {
        unstable_rethrow(e);
        console.log(e)
    }

    return(
        <section className="w-[90%] mx-auto pt-8">
            <div className="mb-8">
                <p className="text-sm mb-8 font-light">Home / Contatti</p>
                <h1 className="text-4xl mb-4 font-semibold">Contatti</h1>
            </div>

            <div className="flex flex-col gap-4">
                {content.data &&
                    content.data.map(el => {
                        return (
                            <div key={el.documentId}>
                                <h2 className="text-2xl font-semibold">{el.titolo}</h2>
                                <p className="mb-4">{el.indirizzo}</p>

                                <h3 className="font-medium mt-2 mb-1">Biglietteria:</h3>
                                <ul>
                                    <li>{el.biglietteria_telefono}</li>
                                    <li className="break-all">{el.biglietteria_email}</li>
                                </ul>

                                <h3 className="font-medium mt-2 mb-1">Prenotazione gruppi:</h3>
                                <p>{el.gruppi_email}</p>

                                <h3 className="font-medium mt-2 mb-1">Conservatore:</h3>
                                <p className="pb-8">{el.conservatore_nome} {el.conservatore_telefono} – {el.conservatore_email}</p>
                            </div>
                        )
                    })}


                <div>
                    <h2 className="text-2xl font-semibold">Uffici del Sistema Museale</h2>
                    <p className="mb-4">{contentContacts.data.indirizzo}</p>

                    <h3 className="font-medium mt-2 mb-1">Uffici:</h3>
                    <ul>
                        <li>{contentContacts.data.uffici_telefono}</li>
                        <li className="break-all">{contentContacts.data.uffici_email}</li>
                    </ul>
                    <h3 className="font-medium mt-2 mb-1">Uffici sezione didattica:</h3>
                    <ul>
                        <li>{contentContacts.data.didattica_telefono}</li>
                        <li className="break-all">{contentContacts.data.didattica_email}</li>
                    </ul>
                    <h3 className="font-medium mt-2 mb-1">Registrar:</h3>
                    <ul>
                        <li>{contentContacts.data.registrar_telefono}</li>
                        <li className="break-all">{contentContacts.data.registrar_email}</li>
                    </ul>
                    <h3 className="font-medium mt-2 mb-1">Richiesta immagini e consultazione archivi:</h3>
                    <ul>
                        <li>{contentContacts.data.archivio_telefono}</li>
                        <li className="break-all">{contentContacts.data.archivio_email}</li>
                    </ul>
                    <h3 className="font-medium mt-2 mb-1">Segreteria del Sistema Museale:</h3>
                    <ul>
                        <li>{contentContacts.data.segreteria_telefono}</li>
                        <li className="break-all">{contentContacts.data.segreteria_email}</li>
                    </ul>
                    <h3 className="font-medium mt-2 mb-1">Comunicazione:</h3>
                    <ul>
                        <li>{contentContacts.data.comunicazione_telefono}</li>
                        <li className="break-all">{contentContacts.data.comunicazione_email}</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}