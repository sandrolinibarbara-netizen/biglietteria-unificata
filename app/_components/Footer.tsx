import Link from "next/link";
import Image from "next/image";
export default function Footer() {
    return(
        <>
            {/*Newsletter form*/}
            <section className="w-full mt-8 prime-bg">
                    <div className="w-[90%] mx-auto">
                        <h2 className="text-3xl font-semibold pt-8 mb-2">Iscriviti alla nostra newsletter</h2>

                        <form className="flex flex-col gap-4 p-4">
                            <label className="text-sm">
                                <input type="email" className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                            </label>
                            <fieldset>
                                <label className="text-sm flex gap-2 items-start">
                                    <input type="checkbox" className="mt-[3px]"/>
                                    Si, acconsento a ricevere la newsletter periodica via email
                                </label>
                                <label className="text-sm flex gap-2 items-start mt-2">
                                    <input type="checkbox" className="mt-[3px]"/>
                                    Autorizzo l'invio di materiale marketing promozionale e offerte speciali tramite email
                                </label>
                            </fieldset>
                            <div className="text-white w-full font-medium text-sm pb-6">
                                <button type="submit" className="w-full text-center seco-bg rounded-full px-4 py-2">Invia
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            <footer className="seco-bg text-white p-8 flex flex-col gap-8">
                <div>
                    <ul>
                        <li>Privacy Policy</li>
                        <li>Accessibilita</li>
                        <li>Condizioni di vendita</li>
                    </ul>
                </div>

                <div>
                    <h4 className="prime-text font-semibold">Contatti</h4>
                    <ul>
                        <li>Uffici: 0372 407269</li>
                        <li>museo.alaponzone@cremona.comune.it</li>
                    </ul>
                </div>

                <div>
                    <h4 className="prime-text font-semibold">Link utili</h4>
                    <ul>
                        <li>Art Bonus</li>
                        <li className="flex gap-2">
                            <Link href="/" className="w-6">
                                <Image src="/icons/hugeicons_facebook-02.webp" alt="facebook logo" width={48} height={48}/>
                            </Link>
                            <Link href="/" className="w-6">
                                <Image src="/icons/logo-instagram.webp" alt="instagram logo" width={48} height={48}/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    )
}