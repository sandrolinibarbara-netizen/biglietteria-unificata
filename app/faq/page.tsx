import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {Plus} from "@/app/_components/_icons/Plus";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";
import Link from "next/link";
import {unstable_rethrow} from "next/navigation";
import Markdown from "react-markdown";

export default async function Faq(){

    let content;

    try {

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/faqs',
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
            {/*FAQs*/}
            <section className="w-[90%] mx-auto pt-8">
                <p className="text-sm mb-8 font-light">Home / FAQ</p>
                <h1 className="text-4xl mb-8 font-semibold">FAQ</h1>

                {content.data &&
                    content.data.map(el => {
                        return(
                            <Accordion key={el.documentId}>
                                <AccordionSummary expandIcon={<Plus/>}
                                                  aria-controls={`${el.documentId}-content`}
                                                  id={`${el.documentId}-header`}
                                                  sx={{
                                                      fontWeight: 500,
                                                      fontSize: "1.125rem",
                                                      gap: "32px",
                                                      padding: "0 24px",
                                                      '& .MuiAccordionSummary-content': {
                                                          margin: "16px 0"
                                                      }
                                                  }}
                                >
                                    {el.domanda}
                                </AccordionSummary>
                                <AccordionDetails id={`${el.documentId}-content`}>
                                    <div className="markdown whitespace-pre-line">
                                        <Markdown>
                                            {el.risposta}
                                        </Markdown>
                                    </div>
                                    <div className="w-full flex justify-end mt-8">
                                        <Link
                                            className="w-fit flex items-center gap-2 text-lg font-medium prime-bg rounded-full px-4 py-2"
                                            href={el.link}>
                                            Vai alla sezione
                                            <CircledArrow width={28} height={28}/>
                                        </Link>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </section>
            {/*Contact form*/}
            <section className="w-[90%] mx-auto pt-8">
                <h2 className="text-3xl font-semibold my-8">Hai bisogno di info specifiche? Scrivici!</h2>

                <form className="bg-white rounded-xl flex flex-col gap-4 p-4">
                    <label aria-label="Nome" className="text-sm" htmlFor="name">Nome
                        <input type="text" id="name" name="name" className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                    </label>
                    <label aria-label="Cognome" className="text-sm" htmlFor="lastname">Cognome
                        <input type="text" id="lastname" name="lastname" className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                    </label>
                    <label aria-label="Indirizzo email" className="text-sm" htmlFor="newsletter-email">Email
                        <input type="email" id="newsletter-email" name="newsletter-email" className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                    </label>
                    <label aria-label="Contenuto della richiesta" className="text-sm" htmlFor="message">Messaggio
                        <textarea id="message" name="message" className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
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