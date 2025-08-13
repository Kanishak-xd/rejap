import Strip from './Strip.jsx'
import Hero from './Hero.jsx'
import Scripts from './Scripts.jsx'
import Chapters from './Chapters.jsx'
import ScriptsMobile from './ScriptsMobile.jsx'

export default function Home() {
    return (
        <>
            <Strip />
            <Hero />
            <div className="block xl:hidden">
                <ScriptsMobile />
            </div>
            <div className="hidden xl:block">
                <Scripts />
            </div>
            <Chapters />
        </>
    )
}