import Image from "next/image";
import {Museum} from "@/app/_components/_icons/Museum";
import Link from "next/link";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";

export default function EventCard({card} : {card?: undefined|boolean}) {
    return(
        <>
            <div className="flex flex-col gap-4 bg-white rounded-xl text-black p-4">
                <Image
                    className="w-full h-[200px] object-cover rounded-xl"
                    src="/placeholders/evento.jpg" alt="Interno" width={300} height={200}/>
                <div className="flex flex-col gap-2 pl-1">
                    <h4 className="text-xl font-medium">Nome evento</h4>
                    <div className="flex gap-2 items-center">
                        <Museum width={24} height={24}/> <p>Dove</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-xl font-medium">Gratuito</p>
                        <Link
                            className="flex items-center gap-2 text-lg font-medium prime-bg rounded-full px-4 py-2"
                            href='/'>
                            Prenota
                            <CircledArrow width={28} height={28}/>
                        </Link>
                    </div>
                </div>
            </div>
            {!card &&
                <div className="text-black w-full font-medium text-sm pt-4">
                    <Link href="/news-eventi" className="w-auto block text-center prime-bg rounded-full px-4 py-2">Vedi tutti gli
                        eventi</Link>
                </div>
            }
        </>
    )
}