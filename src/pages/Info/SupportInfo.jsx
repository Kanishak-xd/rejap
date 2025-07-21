import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SupportInfo() {
    const [activeTab, setActiveTab] = useState('faq');

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            const validTabs = ['privacy', 'terms', 'faq', 'about', 'contact'];
            if (validTabs.includes(hash)) {
                setActiveTab(hash);
            }
        };
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const tabButtonClass = (tabName) =>
        `flex items-center flex-shrink-0 px-5 py-2 border-b-4 text-lg font-medium rounded-t-lg transition-colors duration-300 ease-in-out
    ${activeTab === tabName
            ? 'border-violet-300 text-neutral-300' // active tab style
            : 'text-gray-400 hover:text-gray-200 border-b-2 border-neutral-800 hover:cursor-pointer' // inactive tab style
        }`;

    // render based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'privacy':
                return (
                    <div className="pt-12 rounded-b-lg shadow-lg text-gray-200">
                        <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
                        <p className="mb-4 leading-relaxed">
                            Your privacy is important to us. This policy outlines the types of information we collect,
                            how we use it, and how we protect it.
                        </p>
                        <h3 className="text-xl font-semibold text-[#BFECFF] mb-2">1. Information We Collect</h3>
                        <ul className="list-disc list-inside mb-4">
                            <li>Username, email address, and encrypted password handled by Firebase Authentication</li>
                            <li>Profile photo, stored via a CDN</li>
                            <li>Language learning progress across chapters and levels</li>
                            <li>User activity logs like login/logout, page visits, level start/completion</li>
                            <li>Account creation and profile update timestamps</li>
                            <li>User role like admin or standard user</li>
                        </ul>
                        <h3 className="text-xl font-semibold text-[#BFECFF] mb-2">2. How We Use This Information</h3>
                        <p className="mb-4 leading-relaxed">
                            This data is used solely to enhance your learning experience on the platform, track your progress,
                            display your profile on the leaderboard, and improve the app through usage analysis. No personally
                            identifiable information is shared with third parties.
                        </p>
                        <h3 className="text-xl font-semibold text-[#BFECFF] mb-2">3. Data Storage</h3>
                        <p className="mb-4 leading-relaxed">
                            Authentication is managed by Firebase. All other user data and activity logs are securely stored
                            in a MongoDB database. Your passwords are encrypted and are not visible to us at any point.
                        </p>
                        <h3 className="text-xl font-semibold text-[#BFECFF] mb-2">4. Communication</h3>
                        <p className="mb-4 leading-relaxed">
                            The platform only sends password reset emails through Firebase. No promotional or newsletter emails
                            are sent currently.<br />
                            We are committed to safeguarding your privacy. For questions regarding data privacy, feel free to
                            contact us via email.
                        </p>
                    </div>
                );
            case 'terms':
                return (
                    <div className="pt-12 rounded-b-lg shadow-lg text-gray-200">
                        <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
                        <p className="mb-4 leading-relaxed">
                            By using this platform, you agree to the following terms and conditions:
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>The platform is completely free to use and is open to users of all ages, including minors.</li>
                            <li>You may not attempt to redistribute or replicate the learning content provided.</li>
                            <li>Users cannot upload their own content but can interact with chapters, update profiles, and view leaderboards.</li>
                            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                            <li>The platform may experience temporary downtime due to its backend being hosted on free-tier services.</li>
                        </ul>
                        <p className="leading-relaxed">
                            Account deletion is not currently available but may be introduced in the future. Continued use of the service
                            constitutes agreement to these terms.
                        </p>
                    </div>

                );
            case 'faq':
                return (
                    <section className="text-white mt-6">
                        <div className="container flex flex-col justify-start items-start py-8">
                            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                            <div className="join join-vertical bg-neutral-950 max-w-3xl rounded-t-md">
                                <div className="collapse collapse-arrow join-item border-neutral-800 border rounded-t-md">
                                    <input type="radio" name="my-accordion-4" defaultChecked />
                                    <div className="collapse-title font-semibold">I can't sign up or log in — what should I do?</div>
                                    <div className="collapse-content text-sm">Please wait a few seconds and try again. The platform's backend is hosted on a free service that may take
                                        time to restart after inactivity.</div>
                                </div>
                                <div className="collapse collapse-arrow join-item border-neutral-800 border">
                                    <input type="radio" name="my-accordion-4" />
                                    <div className="collapse-title font-semibold">Why does the site sometimes show a 404 error?</div>
                                    <div className="collapse-content text-sm">This may occur due to limitations of the hosting service. We recommend navigating using in-app links
                                        instead of refreshing the page.</div>
                                </div>
                                <div className="collapse collapse-arrow join-item border-neutral-800 border">
                                    <input type="radio" name="my-accordion-4" />
                                    <div className="collapse-title font-semibold">Can I use this platform on my phone?</div>
                                    <div className="collapse-content text-sm">Currently, the platform is best used on desktop browsers. A responsive mobile version is planned for the future.</div>
                                </div>
                                <div className="collapse collapse-arrow join-item border-neutral-800 border">
                                    <input type="radio" name="my-accordion-4" />
                                    <div className="collapse-title font-semibold">Can I log in on multiple devices?</div>
                                    <div className="collapse-content text-sm">Yes, your progress is saved and synced, so you can log in from different devices using the same account.</div>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            case 'about':
                return (
                    <div className="pt-12 rounded-b-lg shadow-lg text-gray-200">
                        <h2 className="text-3xl font-bold mb-6">About Us</h2>
                        <p className="mb-4 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque laudantium accusantium, illo aspernatur eligendi earum dicta molestias, optio ex repudiandae magni, nesciunt quam hic voluptates. Impedit illum ab officiis natus.
                        </p>
                        <p className="leading-relaxed">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa corporis praesentium commodi? A quasi fugiat laborum aliquid labore culpa quidem inventore modi officiis, cupiditate, nobis assumenda iusto eos sequi non.
                        </p>
                    </div>
                );
            case 'contact':
                return (
                    <div className="pt-12 rounded-b-lg shadow-lg text-gray-200">
                        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                        <p className="mb-4 leading-relaxed">
                            Have questions or need assistance? Feel free to reach out to our support team.
                            We are here to help you.
                        </p>
                        <ul className="list-none space-y-2 text-gray-300">
                            <li>Email: <a href="mailto:info@example.com" className="text-violet-300 hover:underline">info@example.com</a></li>
                            <li>Phone: <a href="tel:+1234567890" className="text-violet-300 hover:underline">+1 (234) 567-890</a></li>
                            <li>Address: 123 Street, 456 City, Country</li>
                        </ul>
                        <div className="mt-6">
                            <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
                                Send a Message
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='bg-black min-h-screen flex justify-center items-center flex-col font-sans'>
            <Navbar />
            <div className='flex justify-start items-start mt-30 w-222 min-h-screen flex-col'>
                <p className='text-5xl text-white font-outfit font-bold text-left'>Support & Info</p>
                <div className="w-full max-w-4xl mt-10 flex flex-col items-center mb-30">
                    {/* Tab Navigation */}
                    <div className="flex w-full justify-start -mx-4 space-x-2 overflow-x-auto overflow-y-hidden flex-nowrap rounded-t-lg shadow-lg">
                        <button className={tabButtonClass('privacy')} onClick={() => {
                            setActiveTab('privacy');
                            window.location.hash = 'privacy';
                        }} >
                            Privacy Policy
                        </button>
                        <button className={tabButtonClass('terms')} onClick={() => {
                            setActiveTab('terms');
                            window.location.hash = 'terms';
                        }} >
                            Terms of Service
                        </button>
                        <button className={tabButtonClass('faq')} onClick={() => {
                            setActiveTab('faq');
                            window.location.hash = 'faq';
                        }} >
                            Help / FAQ
                        </button>
                        <button className={tabButtonClass('about')} onClick={() => {
                            setActiveTab('about');
                            window.location.hash = 'about';
                        }} >
                            About
                        </button>
                        <button className={tabButtonClass('contact')} onClick={() => {
                            setActiveTab('contact');
                            window.location.hash = 'contact';
                        }} >
                            Contact
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="w-full">
                        {renderContent()}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}
