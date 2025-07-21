import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="px-4 divide-y bg-black text-neutral-300 border-neutral-800 border-t-1 flex justify-center items-center w-full">
            <div className="container flex flex-col justify-between py-15 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-1/3">
                    <a rel="noopener noreferrer" href="/" className="flex justify-center space-x-3 lg:justify-start">
                        <span className="self-center text-3xl font-bold ">REJAP</span>
                    </a>
                    <div className="py-2 text-sm text-left text-neutral-400 w-35 cursor-default">Copyright © REJAP. All Rights Reserved.</div>
                </div>
                <div className="grid grid-cols-2 text-md gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-3">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase text-neutral-400">Learn Japanese</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link to="/" rel="noopener noreferrer" className="hover:text-white">Home Page</Link>
                            </li>
                            <li>
                                <Link to="/levels" rel="noopener noreferrer" className="hover:text-white">Chapter 1: Hiragana</Link>
                            </li>
                            <li>
                                <Link to="/levels" rel="noopener noreferrer" className="hover:text-white">Chapter 2: Katakana</Link>
                            </li>
                            <li>
                                <Link to="/levels#kanji" rel="noopener noreferrer" className="hover:text-white">Chapter 3: Kanji</Link>
                            </li>
                            <li>
                                <Link to="/levels#time" rel="noopener noreferrer" className="hover:text-white">Chapter 4: Time</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase text-neutral-400">Support & Info</h3>
                        <ul className="space-y-1">
                            <li>
                                <a href="/SupportInfo#privacy" rel="noopener noreferrer" className="hover:text-white">Privacy</a>
                            </li>
                            <li>
                                <a href="/SupportInfo#terms" rel="noopener noreferrer" className="hover:text-white">Terms of Service</a>
                            </li>
                            <li>
                                <a href="/SupportInfo#faq" rel="noopener noreferrer" className="hover:text-white">Help / FAQ</a>
                            </li>
                            <li>
                                <a href="/SupportInfo#about" rel="noopener noreferrer" className="hover:text-white">About</a>
                            </li>
                            <li>
                                <a href="/SupportInfo#contact" rel="noopener noreferrer" className="hover:text-white">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase text-neutral-400">Community & Progress</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link to="/profile" rel="noopener noreferrer" className="hover:text-white">Profile</Link>
                            </li>
                            <li>
                                <Link to="/rankings" rel="noopener noreferrer" className="hover:text-white">Leaderboard</Link>
                            </li>
                        </ul>
                        <div className="space-y-3">
                            <div className="uppercase text-neutral-400 pt-2">Social media</div>
                            <div className="flex justify-start space-x-3">
                                <a rel="noopener noreferrer" href="https://www.instagram.com/kanishak.xd/" title="Instagram" className="flex items-center p-1 pt-0 hover:scale-115">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 fill-current">
                                        <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
                                    </svg>
                                </a>
                                <a rel="noopener noreferrer" href="https://github.com/Kanishak-xd" title="Github" className="flex items-center p-1 pt-0 hover:scale-115">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                                <a rel="noopener noreferrer" href="https://www.linkedin.com/in/kanishak-sharma-526665310/" title="LinkedIn" className="flex items-center p-1 pt-0 hover:scale-115">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd" />
                                        <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                                    </svg>

                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
