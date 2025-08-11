import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function SupportInfo() {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract the tab from the url
    const tab = location.pathname.split('/').pop();
    const validTabs = ['privacy', 'terms', 'faq', 'about', 'contact'];
    const activeTab = validTabs.includes(tab) ? tab : 'faq';

    const tabButtonClass = (tabName) =>
        `flex items-center flex-shrink-0 px-3 sm:px-4 md:px-5 py-2 border-b-4 text-sm sm:text-base md:text-lg font-medium rounded-t-lg transition-colors duration-300 ease-in-out
    ${activeTab === tabName
            ? 'border-violet-300 text-neutral-300'
            : 'text-gray-400 hover:text-gray-200 border-b-2 border-neutral-800 hover:cursor-pointer'
        }`;

    return (
        <div className='bg-black min-h-screen flex justify-start items-center flex-col font-sans'>
            <Navbar />
            <div className='flex justify-start items-start w-full max-w-5xl px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 flex-col'>
                <p className='text-2xl sm:text-4xl md:text-5xl text-white font-outfit font-bold text-left'>Support & Info</p>
                <div className='w-full max-w-4xl mt-6 sm:mt-8 md:mt-10 flex flex-col items-center mb-16 sm:mb-24'>
                    {/* Tab Navigation */}
                    <div className="flex w-full justify-start -mx-2 sm:-mx-4 space-x-2 overflow-x-auto overflow-y-hidden flex-nowrap rounded-t-lg shadow-lg px-2 sm:px-4">
                        <button className={tabButtonClass('privacy')} onClick={() => navigate('/SupportInfo/privacy')}>
                            Privacy Policy
                        </button>
                        <button className={tabButtonClass('terms')} onClick={() => navigate('/SupportInfo/terms')}>
                            Terms of Service
                        </button>
                        <button className={tabButtonClass('faq')} onClick={() => navigate('/SupportInfo/faq')}>
                            Help / FAQ
                        </button>
                        <button className={tabButtonClass('about')} onClick={() => navigate('/SupportInfo/about')}>
                            About
                        </button>
                        <button className={tabButtonClass('contact')} onClick={() => navigate('/SupportInfo/contact')}>
                            Contact
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="w-full px-1 sm:px-0">
                        <Routes>
                            <Route index element={<Navigate to="privacy" replace />} />
                            <Route path="privacy" element={(
                                <div className="pt-6 sm:pt-8 md:pt-12 rounded-b-lg shadow-lg text-gray-200">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Privacy Policy</h2>
                                    <p className="mb-4 leading-relaxed text-sm sm:text-base">
                                        Your privacy is important to us. This policy outlines the types of information we collect,
                                        how we use it, and how we protect it.
                                    </p>
                                    <h3 className="text-lg sm:text-xl font-semibold text-[#BFECFF] mb-2">1. Information We Collect</h3>
                                    <ul className="list-disc list-inside mb-4 text-sm sm:text-base">
                                        <li>Username, email address, and encrypted password handled by Firebase Authentication</li>
                                        <li>Profile photo, stored via a CDN</li>
                                        <li>Language learning progress across chapters and levels</li>
                                        <li>User activity logs like login/logout, page visits, level start/completion</li>
                                        <li>Account creation and profile update timestamps</li>
                                        <li>User role like admin or standard user</li>
                                    </ul>
                                    <h3 className="text-lg sm:text-xl font-semibold text-[#BFECFF] mb-2">2. How We Use This Information</h3>
                                    <p className="mb-4 leading-relaxed text-sm sm:text-base">
                                        This data is used solely to enhance your learning experience on the platform, track your progress,
                                        display your profile on the leaderboard, and improve the app through usage analysis. No personally
                                        identifiable information is shared with third parties.
                                    </p>
                                    <h3 className="text-lg sm:text-xl font-semibold text-[#BFECFF] mb-2">3. Data Storage</h3>
                                    <p className="mb-4 leading-relaxed text-sm sm:text-base">
                                        Authentication is managed by Firebase. All other user data and activity logs are securely stored
                                        in a MongoDB database. Your passwords are encrypted and are not visible to us at any point.
                                    </p>
                                    <h3 className="text-lg sm:text-xl font-semibold text-[#BFECFF] mb-2">4. Communication</h3>
                                    <p className="mb-4 leading-relaxed text-sm sm:text-base">
                                        The platform only sends password reset emails through Firebase. No promotional or newsletter emails
                                        are sent currently.<br />
                                        We are committed to safeguarding your privacy. For questions regarding data privacy, feel free to
                                        contact us via email.
                                    </p>
                                </div>
                            )} />
                            <Route path="terms" element={(
                                <div className="pt-6 sm:pt-8 md:pt-12 rounded-b-lg shadow-lg text-gray-200">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Terms of Service</h2>
                                    <p className="mb-4 leading-relaxed text-sm sm:text-base">
                                        By using this platform, you agree to the following terms and conditions:
                                    </p>
                                    <ul className="list-disc list-inside mb-4 text-sm sm:text-base">
                                        <li>The platform is completely free to use and is open to users of all ages, including minors.</li>
                                        <li>You may not attempt to redistribute or replicate the learning content provided.</li>
                                        <li>Users cannot upload their own content but can interact with chapters, update profiles, and view leaderboards.</li>
                                        <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                                        <li>The platform may experience temporary downtime due to its backend being hosted on free-tier services.</li>
                                    </ul>
                                    <p className="leading-relaxed text-sm sm:text-base">
                                        Account deletion is not currently available but may be introduced in the future. Continued use of the service
                                        constitutes agreement to these terms.
                                    </p>
                                </div>
                            )} />
                            <Route path="faq" element={(
                                <section className="text-white pt-6 sm:pt-8 md:pt-12">
                                    <div className="container flex flex-col justify-start items-start px-1 sm:px-0 text-sm sm:text-base">
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Frequently Asked Questions</h2>
                                        <div className="join join-vertical bg-neutral-950 max-w-3xl rounded-t-md">
                                            <div className="collapse collapse-arrow join-item border-neutral-800 border rounded-t-md">
                                                <input type="radio" name="my-accordion-4" defaultChecked />
                                                <div className="collapse-title font-semibold text-sm sm:text-base">I can't sign up or log in — what should I do?</div>
                                                <div className="collapse-content text-sm sm:text-base">Please wait a few seconds and try again. The platform's backend is hosted on a free service that may take
                                                    time to restart after inactivity.</div>
                                            </div>
                                            <div className="collapse collapse-arrow join-item border-neutral-800 border">
                                                <input type="radio" name="my-accordion-4" />
                                                <div className="collapse-title font-semibold text-sm sm:text-base">Why does the site sometimes show a 404 error?</div>
                                                <div className="collapse-content text-sm sm:text-base">This may occur due to limitations of the hosting service. We recommend navigating using in-app links
                                                    instead of refreshing the page.</div>
                                            </div>
                                            <div className="collapse collapse-arrow join-item border-neutral-800 border">
                                                <input type="radio" name="my-accordion-4" />
                                                <div className="collapse-title font-semibold text-sm sm:text-base">Can I use this platform on my phone?</div>
                                                <div className="collapse-content text-sm sm:text-base">Currently, the platform is best used on desktop browsers. A responsive mobile version is planned for the future.</div>
                                            </div>
                                            <div className="collapse collapse-arrow join-item border-neutral-800 border">
                                                <input type="radio" name="my-accordion-4" />
                                                <div className="collapse-title font-semibold text-sm sm:text-base">Can I log in on multiple devices?</div>
                                                <div className="collapse-content text-sm sm:text-base">Yes, your progress is saved and synced, so you can log in from different devices using the same account.</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )} />
                            <Route path="about" element={(
                                <div className="pt-6 sm:pt-8 md:pt-12 rounded-b-lg shadow-lg text-gray-200">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">About</h2>
                                    <p className="mb-4 leading-relaxed text-sm sm:text-base">
                                        I built this platform during my final year at NIIT University, where I'm pursuing a B.Tech in
                                        Computer Science Engineering with a specialization in Cybersecurity.
                                    </p>
                                    <p className="mb-4 leading-relaxed text-sm sm:text-base">
                                        It started as a personal summer project combining my interests in coding, UI/UX, and the Japanese language.
                                        My goal was to create something fun, engaging, and modern — a refreshing change from traditional
                                        textbook-style learning — to help beginners prepare for the JLPT N5/N4 exams.
                                    </p>
                                    <p className="leading-relaxed text-sm sm:text-base">
                                        The platform focuses on fast recognition and recall of Japanese scripts, and at the same time,
                                        it's helping me grow as a full-stack MERN developer and understand website architecture better.
                                    </p>
                                </div>
                            )} />
                            <Route path="contact" element={(
                                <div className="pt-6 sm:pt-8 md:pt-12 rounded-b-lg shadow-lg text-gray-200">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Contact</h2>
                                    <p className="mb-4 leading-relaxed text-sm sm:text-base">
                                        Have questions, feedback, or issues? Feel free to reach out via email. <br />
                                        We'll do our best to respond as soon as possible.
                                    </p>
                                    <ul className="list-none space-y-2 text-gray-300 mb-6 text-sm sm:text-base">
                                        <li>Email: <a href="mailto:kanishak.sharma22@st.niituniversity.in" className="text-[#BFECFF] hover:underline font-medium">kanishak.sharma22@st.niituniversity.in</a></li>
                                    </ul>
                                    <a href="https://mail.google.com/mail/u/0/?fs=1&to=kanishak.sharma22@st.niituniversity.in&su&body&tf=cm">
                                        <button type="button" className="w-full sm:w-auto px-8 py-3 font-bold rounded dark:bg-neutral-100 text-black hover:bg-neutral-300 hover:cursor-pointer">
                                            Send an Email
                                        </button>
                                    </a>
                                </div>
                            )} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div >
    );
}
