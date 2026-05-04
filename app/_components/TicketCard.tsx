import Image from "next/image";
import Link from "next/link";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";

export default function TicketCard({el}: {el:any}) {
    return (
            <div className="w-full text-white rounded-xl gradient">
                <div className="p-4 mt-2">
                    <h3 className="text-2xl font-semibold prime-text">{el.titolo}</h3>

                    <div className="flex flex-col gap-4 bg-white rounded-xl text-black p-4 my-4">
                        <Image
                            className="w-full h-[200px] object-cover rounded-xl"
                            src={`/placeholders/${el.pic}.jpg`} alt="Interno di un museo" width={300} height={200}/>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xl font-medium">{el.nome}</h4>
                            <p>{el.descrizione}</p>
                            <div className="flex items-center justify-between mt-4">
                                {el.infoPrezzo !== ""
                                    ? <p className="text-sm">{el.infoPrezzo}<br/><span
                                        className="text-xl font-medium">{el.prezzo}</span></p>
                                    : <p className="text-xl font-medium">{el.prezzo}</p>
                                }
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
    )
}