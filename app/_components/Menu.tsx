'use client'
import Image from "next/image";
import {Cart} from "@/app/_components/_icons/Cart";
import {Hamburger} from "@/app/_components/_icons/Hamburger";
import Link from "next/link";
import {Close} from "@/app/_components/_icons/Close";
import {useState} from "react";

export default function Menu() {

    const [showMenu, setShowMenu] = useState<string>('initial');
    const [showMuseumsMenu, setShowMuseumsMenu] = useState<string>('close');
    const [showVisitMenu, setShowVisitMenu] = useState<string>('close');

    function toggleMenu(action:'open'|'close') {
        if(action === 'open' && (showMenu === 'close' || showMenu === 'initial')) {
            setShowMenu('open');
        } else if(action === 'close' && showMenu === 'open') {
            setShowMenu('close');
            setShowMuseumsMenu('close');
            setShowVisitMenu('close');
        }
    }

    function toggleMuseumsMenu() {
        if(showMuseumsMenu === 'close') {
            setShowMuseumsMenu('open');
        } else {
            setShowMuseumsMenu('close');
        }
    }

    function toggleVisitMenu() {
        if(showVisitMenu === 'close') {
            setShowVisitMenu('open');
        } else {
            setShowVisitMenu('close');
        }
    }

    return (
        <>
            <header className="bg-black flex justify-between items-center w-full px-4 py-4">
                <Link href="/">
                <Image src='/icons/logo.png'
                       alt="museo civici cremona logo" width={48} height={48}
                       className="w-12"

                />
                </Link>
                <div className="flex gap-4">
                    <div className="rounded-full p-3 bg-white text-black w-fit">
                        <Cart width="2em" height="2em"/>
                    </div>
                    <div className="rounded-full p-3 bg-white text-black w-fit">
                        <Hamburger width="2em" height="2em" onClick={() => toggleMenu('open')}/>
                    </div>
                </div>
            </header>

            <div
                className={`overlay ${showMenu === 'open' ? 'visible' : ''}`}>
            </div>

            <div
                className={`${showMenu === 'open' ? 'appear' : showMenu === 'close' ? 'disappear' : 'w-0'} max-w-full h-screen fixed bg-white z-200 right-0 top-0`}>
                <div className="w-full px-8 pb-2 md:pb-8 pt-4 flex items-center justify-between">
                    <Image
                        src='/icons/logo_black.png'
                        alt="visit-cremona-logo"
                        width={500}
                        height={500}
                        className="h-12 w-auto"
                    />
                    <Close className="w-4 h-4 cursor-pointer" onClick={() => toggleMenu('close')}/>
                </div>

                <nav
                    className="mt-4 w-[90%] mx-auto text-black pt-3 overflow-y-auto h-[calc(100vh-96px)]">
                    <ul className="pl-2">
                        <li className="w-full flex flex-col">
                            <button type="button" onClick={toggleMuseumsMenu}
                                    className="border-b border-black/50 cursor-pointer pr-4 py-3 flex justify-between items-center">
                                <span className="text-2xl font-semibold">Musei</span>
                                <span
                                    className={`${showMuseumsMenu === 'open' ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul className={`${showMuseumsMenu === 'open' ? 'max-h-[1000px]' : 'max-h-0'} pl-4 transition-all duration-500 overflow-hidden`}>
                                <li className="py-3">
                                    <Link
                                        href="/museo-civico-ala-ponzone"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo Civico "Ala Ponzone"
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/museo-archeologico-san-lorenzo"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo Archeologico "San Lorenzo"
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/museo-di-storia-naturale"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo di Storia Naturale
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/museo-della-civilta-contadina"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo della civiltà contadina "Il Cambonino Vecchio"
                                    </Link>
                                </li>
                            </ul>
                        </li>


                        <li className="w-full flex flex-col">
                            <button type="button" onClick={toggleVisitMenu}
                                    className="border-b border-black/50 cursor-pointer pr-4 py-3 flex justify-between items-center">
                                <span className="text-2xl font-semibold">Visita</span>
                                <span
                                    className={`${showVisitMenu === 'open' ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul className={`${showVisitMenu === 'open' ? 'max-h-[1000px]' : 'max-h-0'} pl-4 transition-all duration-500 overflow-hidden`}>
                                <li className="py-3">
                                    <Link
                                        href="/info-gruppi"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Info gruppi
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/servizi-educativi"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Servizi educativi
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/info-utili"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Info utili
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/faq"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="py-3 text-2xl font-semibold border-b border-black/50 cursor-pointer">
                            <Link
                                href="/news-eventi"
                                onNavigate={() => toggleMenu('close')}
                            >
                                News ed eventi
                            </Link>
                        </li>

                        <li className="py-3 text-2xl font-semibold border-b border-black/50 cursor-pointer">
                            <a
                                aria-label="Vai alla pagina dedicata all'elenco delle misure adottate per rendere i musei accessibili"
                                href="https://musei.comune.cremona.it/it/accessibilita/percorsi-per-disabili-motori"
                                target="_blank" rel="noopener noreferrer"
                            >
                                Accessibilità
                            </a>
                        </li>

                        <li className="py-3 text-2xl font-semibold border-b border-black/50 cursor-pointer">
                            <Link
                                href="/contatti"
                                onNavigate={() => toggleMenu('close')}
                            >
                                Contatti
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </>
    )
}