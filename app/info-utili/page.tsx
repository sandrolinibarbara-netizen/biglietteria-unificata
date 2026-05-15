import Image from "next/image";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {Plus} from "@/app/_components/_icons/Plus";
import Link from "next/link";
import {unstable_rethrow} from "next/navigation";
import Markdown from "react-markdown";

export default async function InfoUtili() {

    let content;

    try {

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/museums' +
            '?populate=*'
            ,
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
            <section className="w-[90%] mx-auto pt-8">
                <p className="text-sm mb-8 font-light">Home / Info utili</p>
                <h1 className="text-4xl mb-8 font-semibold">Info utili</h1>
            </section>

            {content.data &&
                content.data.map(el => {
                    return (
                        <section className="w-full" key={el.documentId}>
                            <Image
                                className="w-full h-[200px] object-cover"
                                src={process.env.NEXT_PUBLIC_BASE_URL + el.immagine.url} alt="interno museo" width={300} height={200}/>
                            <div className="w-[90%] mx-auto pt-8">
                                <h2 className="text-2xl mb-4 font-semibold">{el.titolo}</h2>

                                    {el.intero === 0 && el.ridotto === 0
                                        ? <p>Ingresso gratuito</p>
                                        : <ul>
                                            <li>Intero {
                                                new Intl.NumberFormat("de-DE", {
                                                    style: "currency",
                                                    currency: "EUR"
                                                }).format(el.intero)
                                            }</li>
                                            <li>Ridotto {
                                                new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: "EUR"
                                            }).format(el.ridotto)
                                            }</li></ul>
                                }

                                    {el.note && <p className="text-sm mt-2">{el.note}</p>}

                                <h3 className="text-xl mt-4 mb-2 font-semibold">Contatti</h3>
                                <p>{el.titolo}<br/>{el.indirizzo}</p>
                                <h4 className="font-medium mt-2 mb-1">Biglietteria:</h4>
                                <ul>
                                    <li>{el.biglietteria_telefono}</li>
                                    <li className="break-all">{el.biglietteria_email}</li>
                                </ul>

                                <h4 className="font-medium mt-2 mb-1">Prenotazione gruppi:</h4>
                                <p>{el.gruppi_email}</p>

                                <h4 className="font-medium mt-2 mb-1">Conservatore:</h4>
                                <p className="border-b pb-8">{el.conservatore_nome} {el.conservatore_telefono} –
                                    {el.conservatore_email}</p>

                                <Accordion sx={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                }}>
                                    <AccordionSummary expandIcon={<Plus width={24} height={24}/>}
                                                      aria-controls="panel1-content"
                                                      id="panel1-header"
                                                      sx={{
                                                          fontWeight: 500,
                                                          fontSize: "1.25rem",
                                                          gap: "32px",
                                                          padding: "0 24px",
                                                          '& .MuiAccordionSummary-content': {
                                                              margin: "16px 0"
                                                          }
                                                      }}
                                    >
                                        Orari
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="markdown">
                                            <Markdown>
                                                {el.orari}
                                            </Markdown>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>

                                <div className="w-full h-[1px] bg-black"></div>

                                <Accordion sx={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                }}>
                                    <AccordionSummary expandIcon={<Plus width={24} height={24}/>}
                                                      aria-controls="panel1-content"
                                                      id="panel1-header"
                                                      sx={{
                                                          fontWeight: 500,
                                                          fontSize: "1.25rem",
                                                          gap: "32px",
                                                          padding: "0 24px",
                                                          '& .MuiAccordionSummary-content': {
                                                              margin: "16px 0"
                                                          }
                                                      }}
                                    >
                                        Accessibilità
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="markdown">
                                            <Markdown>
                                                {el.accessibilita}
                                            </Markdown>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>

                                <div className="w-full h-[1px] bg-black"></div>

                                {el.riduzioni &&
                                    <>
                                    <Accordion sx={{
                                        backgroundColor: "transparent",
                                        boxShadow: "none",
                                    }}>
                                        <AccordionSummary expandIcon={<Plus width={24} height={24}/>}
                                                          aria-controls="panel1-content"
                                                          id="panel1-header"
                                                          sx={{
                                                              fontWeight: 500,
                                                              fontSize: "1.25rem",
                                                              gap: "32px",
                                                              padding: "0 24px",
                                                              '& .MuiAccordionSummary-content': {
                                                                  margin: "16px 0"
                                                              }
                                                          }}
                                        >
                                            <p className="flex flex-col gap-1">
                                                Riduzioni<br/>
                                                <span
                                                    className="block text-sm font-regular">(con esibizione di documentazione idonea)</span>
                                            </p>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="markdown">
                                                <Markdown>
                                                    {el.riduzioni}
                                                </Markdown>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                    <div className="w-full h-[1px] bg-black"></div>
                                    </>
                                }


                                {el.gratuita &&
                                    <>
                                        <Accordion sx={{
                                            backgroundColor: "transparent",
                                            boxShadow: "none",
                                        }}>
                                            <AccordionSummary expandIcon={<Plus width={24} height={24}/>}
                                                              aria-controls="panel1-content"
                                                              id="panel1-header"
                                                              sx={{
                                                                  fontWeight: 500,
                                                                  fontSize: "1.25rem",
                                                                  gap: "32px",
                                                                  padding: "0 24px",
                                                                  '& .MuiAccordionSummary-content': {
                                                                      margin: "16px 0"
                                                                  }
                                                              }}
                                            >
                                                <p className="flex flex-col gap-1">
                                                    Gratuità<br/>
                                                    <span
                                                        className="block text-sm font-regular">(con esibizione di documentazione idonea)</span>
                                                </p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="markdown">
                                                    <Markdown>
                                                        {el.gratuita}
                                                    </Markdown>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <div className="w-full h-[1px] bg-black"></div>
                                    </>
                                }


                                <div className="my-8 text-black w-full font-medium text-lg">
                                    <Link href="/" className="w-auto block text-center prime-bg rounded-full px-4 py-2">Acquista
                                        il
                                        biglietto</Link>
                                </div>
                            </div>
                        </section>
                    )
                })
            }

            {/*Contact form*/}
            <section className="w-[90%] mx-auto pt-8">
                <h2 className="text-3xl font-semibold mb-8">Hai bisogno di info specifiche? Scrivici!</h2>

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
                        <button type="submit" className="w-full text-center prime-bg rounded-full px-4 py-2">Invia
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}