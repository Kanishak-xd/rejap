import { useEffect, useRef, useState } from 'react';

export default function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    const fetchLogs = async (pageNum) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/api/logs?page=${pageNum}&limit=20`);
            const data = await res.json();

            if (data.length === 0) {
                setHasMore(false);
            } else {
                setLogs(prev => [...prev, ...data]);
            }
        } catch (err) {
            console.error("Failed to fetch logs:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLogs(page);
    }, [page]);

    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasMore, loading]);

    const formatTimestamp = (iso) => {
        return new Date(iso).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    return (
        <div className="bg-neutral-900 w-full rounded-lg max-w-8xl text-white shadow max-h-118 overflow-y-auto">
            {logs.map((log, idx) => (
                <p key={idx} className="mb-0.5 text-gray-300 bg-neutral-950 hover:bg-neutral-900 pt-2 pb-2 pl-5">
                    <span className="font-semibold text-white">
                        {log.username || 'Unknown User'}
                    </span>{" "}
                    {log.action}{" "}
                    <span className="text-gray-400">at {formatTimestamp(log.timestamp)}</span>
                </p>
            ))}

            {hasMore && (
                <div ref={observerRef} className="text-center text-gray-500 mt-4">
                    {loading ? 'Loading more logs...' : 'Scroll to load more'}
                </div>
            )}

            {!hasMore && (
                <div className="text-left text-gray-500 bg-neutral-950 pt-5 pb-3 pl-5">
                    No more logs
                </div>
            )}
        </div>
    );
}
