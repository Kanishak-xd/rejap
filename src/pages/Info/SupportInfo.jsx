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
            : 'text-gray-400 hover:text-gray-200 border-b-2 border-gray-600 hover:cursor-pointer' // inactive tab style
        }`;

    // render based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'privacy':
                return (
                    <div className="pt-12 rounded-b-lg shadow-lg text-gray-200">
                        <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
                        <p className="mb-4 leading-relaxed">
                            Your privacy is important to us. This policy explains how we collect, use,
                            and protect your personal information. We are committed to ensuring the
                            security and confidentiality of your data. We do not share your personal
                            information with third parties without your explicit consent.
                        </p>
                        <p className="leading-relaxed">
                            For more details, please refer to our full privacy document linked in the footer.
                            We regularly review our privacy practices to ensure compliance with the latest
                            data protection regulations.
                        </p>
                    </div>
                );
            case 'terms':
                return (
                    <div className="pt-12 rounded-b-lg shadow-lg text-gray-200">
                        <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
                        <p className="mb-4 leading-relaxed">
                            These terms govern your use of our services. By accessing or using our platform,
                            you agree to be bound by these terms. This includes guidelines on acceptable use,
                            intellectual property rights, and disclaimers.
                        </p>
                        <p className="leading-relaxed">
                            Please read them carefully. We reserve the right to update or modify these terms
                            at any time without prior notice. Continued use of the service after such changes
                            constitutes your acceptance of the new terms.
                        </p>
                    </div>
                );
            case 'faq':
                return (
                    <div className="pt-12 rounded-b-lg shadow-lg text-gray-200">
                        <h2 className="text-3xl font-bold mb-6">Help / FAQ</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-violet-300">Q: How do I reset my password?</h3>
                                <p className="leading-relaxed">
                                    A: You can reset your password by visiting the login page and clicking on the
                                    "Forgot Password" link. Follow the instructions sent to your registered email address.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-violet-300">Q: How can I contact support?</h3>
                                <p className="leading-relaxed">
                                    A: You can reach our support team via the 'Contact' tab, or by emailing us at
                                    support@example.com. Our team is available 24/7.
                                </p>
                            </div>
                        </div>
                    </div>
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
                            Privacy
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
