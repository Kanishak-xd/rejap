'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';

export function WordsPullUp({
    text, className = '',
}) {
    const splittedText = text.split(' ');
    const pullupVariant = {
        initial: { y: 20, opacity: 0 },
        animate: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.05 }, }),
    };
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div className="flex justify-center flex-wrap">
            {splittedText.map((currentWord, i) => (
                <motion.div
                    key={`${currentWord}-${i}-${text}`} ref={ref} variants={pullupVariant} initial="initial" animate="animate"
                    custom={i} className={`
                        text-xl text-center sm:text-sm md:text-md xl:text-xl
                        font-semibold tracking-tighter pr-2 inline-block ${className}
                    `}
                >
                    {currentWord === '' ? <span>&nbsp;</span> : currentWord}
                </motion.div>
            ))}
        </div>
    );
}