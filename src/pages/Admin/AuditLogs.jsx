import { useEffect, useRef, useState } from 'react';

export default function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [fetchedPages, setFetchedPages] = useState(new Set());
    const observerRef = useRef(null);
    const logIds = useRef(new Set());

    const fetchLogs = async (pageNum) => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logs?page=${pageNum}&limit=20`);
            const data = await res.json();

            const newLogs = data.filter(log => !logIds.current.has(log._id));
            newLogs.forEach(log => logIds.current.add(log._id));

            if (newLogs.length === 0) {
                setHasMore(false);
            } else {
                setLogs(prev => [...prev, ...newLogs]);
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

        const ref = observerRef.current;
        if (ref) observer.observe(ref);

        return () => {
            if (ref) observer.unobserve(ref);
        };
    }, [hasMore, loading]);

    const formatTimestamp = (iso) => {
        return new Date(iso).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    return (
        <div className="bg-neutral-900 w-full rounded-lg max-w-8xl text-white shadow max-h-116 overflow-y-auto border-2 border-neutral-900">
            {logs.map((log, idx) => (
                <p key={idx} className="mb-0.5 text-gray-300 bg-neutral-950 hover:bg-neutral-900 pt-2 pb-2 pl-5">
                    <span className="font-semibold text-white">
                        {log.username || 'Unknown User'}
                    </span>{" "}
                    {log.action}{" "}
                    <span className="text-neutral-500">at {formatTimestamp(log.timestamp)}</span>
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
