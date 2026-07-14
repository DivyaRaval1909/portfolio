import { useEffect, useState } from 'react';
import { Github, Code, Award } from 'lucide-react';

interface GithubStats {
    totalContributions: number;
}

interface LeetcodeStats {
    solvedProblem: number;
    contestRating: number;
    contestTopPercentage: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
}

interface CodeforcesStats {
    rating: number;
    maxRating: number;
    rank: string;
    solvedProblem: number;
}

export default function StatsDashboard() {
    const [github, setGithub] = useState<GithubStats | null>(null);
    const [leetcode, setLeetcode] = useState<LeetcodeStats | null>(null);
    const [codeforces, setCodeforces] = useState<CodeforcesStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAllStats() {
            try {
                // 1. Fetch GitHub stats
                const ghRes = await fetch('https://github-contributions-api.jogruber.de/v4/DivyaRaval1909');
                const ghData = await ghRes.json();
                let totalGh = 0;
                if (ghData.total) {
                    totalGh = Object.values(ghData.total).reduce((sum: number, val: any) => sum + val, 0);
                }

                // 2. Fetch LeetCode stats
                const lcSolvedRes = await fetch('https://alfa-leetcode-api.onrender.com/DivyaRaval/solved');
                const lcSolvedData = await lcSolvedRes.json();
                const lcContestRes = await fetch('https://alfa-leetcode-api.onrender.com/DivyaRaval/contest');
                const lcContestData = await lcContestRes.json();

                // 3. Fetch Codeforces stats
                const cfInfoRes = await fetch('https://codeforces.com/api/user.info?handles=divyaraval');
                const cfInfoData = await cfInfoRes.json();
                const cfSubRes = await fetch('https://codeforces.com/api/user.status?handle=divyaraval');
                const cfSubData = await cfSubRes.json();

                let cfSolvedCount = 0;
                if (cfSubData.status === 'OK') {
                    const uniqueSolved = new Set<string>();
                    cfSubData.result.forEach((sub: any) => {
                        if (sub.verdict === 'OK' && sub.problem) {
                            const problemKey = `${sub.problem.contestId}-${sub.problem.index}`;
                            uniqueSolved.add(problemKey);
                        }
                    });
                    cfSolvedCount = uniqueSolved.size;
                }

                let cfInfo = null;
                if (cfInfoData.status === 'OK' && cfInfoData.result && cfInfoData.result.length > 0) {
                    cfInfo = {
                        rating: cfInfoData.result[0].rating ?? 0,
                        maxRating: cfInfoData.result[0].maxRating ?? 0,
                        rank: cfInfoData.result[0].rank ?? 'unrated',
                        solvedProblem: cfSolvedCount
                    };
                }

                setGithub({ totalContributions: totalGh });
                setLeetcode({
                    solvedProblem: lcSolvedData.solvedProblem ?? 0,
                    contestRating: lcContestData.contestRating ?? 0,
                    contestTopPercentage: lcContestData.contestTopPercentage ?? 0,
                    easySolved: lcSolvedData.easySolved ?? 0,
                    mediumSolved: lcSolvedData.mediumSolved ?? 0,
                    hardSolved: lcSolvedData.hardSolved ?? 0
                });
                setCodeforces(cfInfo);
            } catch (err) {
                console.error('Failed to fetch developer statistics:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchAllStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <span className="mono text-xs text-text-faint animate-pulse">fetching developer profile stats...</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto text-left">
            {/* GitHub Stats Box */}
            <a
                href="https://github.com/DivyaRaval1909"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 border border-border-main rounded-3xl bg-bg-card ring-1 ring-accent/10 hover:bg-bg-card-hover hover:border-accent hover:ring-accent/20 transition-all duration-300 flex flex-col justify-between"
            >
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="mono text-xs text-text-faint">/// GitHub</span>
                        <Github className="w-5 h-5 text-text-faint group-hover:text-accent transition-colors" />
                    </div>
                    <p className="text-3xl font-bold text-text-card-title mb-2">
                        {github?.totalContributions?.toLocaleString() ?? '—'}
                    </p>
                    <p className="mono text-xs text-text-muted">Total Contributions</p>
                </div>
                <div className="mt-8 space-y-1.5 border-t border-border-inner pt-4">
                    <div className="flex justify-between mono text-[10px] text-text-muted">
                        <span>Profile:</span>
                        <span className="text-accent">github.com/DivyaRaval1909 ↗</span>
                    </div>
                </div>
            </a>

            {/* LeetCode Stats Box */}
            <a
                href="https://leetcode.com/DivyaRaval"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 border border-border-main rounded-3xl bg-bg-card ring-1 ring-accent/10 hover:bg-bg-card-hover hover:border-accent hover:ring-accent/20 transition-all duration-300 flex flex-col justify-between"
            >
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="mono text-xs text-text-faint">/// LeetCode</span>
                        <Code className="w-5 h-5 text-text-faint group-hover:text-accent transition-colors" />
                    </div>
                    <p className="text-3xl font-bold text-text-card-title mb-2">
                        {leetcode?.contestRating ? Math.round(leetcode.contestRating) : '—'}
                    </p>
                    <p className="mono text-xs text-text-muted mb-4">Contest Rating</p>

                    <div className="space-y-1.5 mt-2">
                        <div className="flex justify-between mono text-[10px] text-text-muted">
                            <span>Percentile:</span>
                            <span className="text-accent font-semibold">Top {leetcode?.contestTopPercentage ? `${leetcode.contestTopPercentage}%` : '—'}</span>
                        </div>
                        <div className="flex justify-between mono text-[10px] text-text-muted">
                            <span>Solved:</span>
                            <span className="text-text-base">{leetcode?.solvedProblem ? `${leetcode.solvedProblem} problems` : '—'}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t border-border-inner pt-4">
                    <p className="mono text-[10px] text-text-faint">Profile: leetcode.com/DivyaRaval ↗</p>
                </div>
            </a>

            {/* Codeforces Stats Box */}
            <a
                href="https://codeforces.com/profile/divyaraval"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 border border-border-main rounded-3xl bg-bg-card ring-1 ring-accent/10 hover:bg-bg-card-hover hover:border-accent hover:ring-accent/20 transition-all duration-300 flex flex-col justify-between"
            >
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="mono text-xs text-text-faint">/// Codeforces</span>
                        <Award className="w-5 h-5 text-text-faint group-hover:text-accent transition-colors" />
                    </div>
                    <p className="text-3xl font-bold text-text-card-title mb-2">
                        {codeforces?.rating ?? '—'}
                    </p>
                    <p className="mono text-xs text-text-muted mb-4">Contest Rating</p>
                    
                    <div className="space-y-1.5 mt-2">
                        <div className="flex justify-between mono text-[10px] text-text-muted">
                            <span>Rank:</span>
                            <span className="text-accent font-semibold capitalize">{codeforces?.rank ?? '—'}</span>
                        </div>
                        <div className="flex justify-between mono text-[10px] text-text-muted">
                            <span>Solved:</span>
                            <span className="text-text-base">{codeforces?.solvedProblem ? `${codeforces.solvedProblem} problems` : '—'}</span>
                        </div>
                        <div className="flex justify-between mono text-[10px] text-text-muted">
                            <span>Max Rating:</span>
                            <span className="text-text-faint">{codeforces?.maxRating ?? '—'}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t border-border-inner pt-4">
                    <p className="mono text-[10px] text-text-faint">Profile: codeforces.com/profile/divyaraval ↗</p>
                </div>
            </a>
        </div>
    );
}
