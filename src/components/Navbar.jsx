export default function Navbar() {
    return (
        <nav className="bg-[#333] text-white font-outfit flex justify-between items-center px-10 py-4">
            <a href="/" className="text-inherit text-4xl font-semibold">REJAP</a>
            <ul className="text-xl font-semibold flex justify-between items-center gap-12">
                <li><a href="/chapters">CHAPTERS</a></li>
                <li><a href="/resources">RESOURCES</a></li>
                <li><a href="/log-in">SIGN IN</a></li>
            </ul>
        </nav>
    )
}
