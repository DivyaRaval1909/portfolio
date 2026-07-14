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
    const [ghLoading, setGhLoading] = useState(true);
    const [lcLoading, setLcLoading] = useState(true);
    const [cfLoading, setCfLoading] = useState(true);

    useEffect(() => {
        // GitHub
        fetch('https://github-contributions-api.jogruber.de/v4/DivyaRaval1909')
            .then(res => {
                if (!res.ok) throw new Error('GitHub status not OK');
                return res.json();
            })
            .then(data => {
                let totalGh = 0;
                if (data && data.total) {
                    totalGh = Object.values(data.total).reduce((sum: number, val: any) => sum + val, 0);
                }
                setGithub({ totalContributions: totalGh });
            })
            .catch(err => console.error('GitHub stats error:', err))
            .finally(() => setGhLoading(false));

        // LeetCode
        Promise.all([
            fetch('https://leetcode-api-pied.vercel.app/user/DivyaRaval').then(res => {
                if (!res.ok) throw new Error('LeetCode user status not OK');
                return res.json();
            }),
            fetch('https://leetcode-api-pied.vercel.app/user/DivyaRaval/contests').then(res => {
                if (!res.ok) throw new Error('LeetCode contest status not OK');
                return res.json();
            })
        ])
            .then(([userData, contestData]) => {
                const acSub = userData.submitStats?.acSubmissionNum || [];
                const solvedAll = acSub.find((x: any) => x.difficulty === 'All')?.count ?? 0;
                const solvedEasy = acSub.find((x: any) => x.difficulty === 'Easy')?.count ?? 0;
                const solvedMedium = acSub.find((x: any) => x.difficulty === 'Medium')?.count ?? 0;
                const solvedHard = acSub.find((x: any) => x.difficulty === 'Hard')?.count ?? 0;

                setLeetcode({
                    solvedProblem: solvedAll,
                    contestRating: contestData.userContestRanking?.rating ?? 0,
                    contestTopPercentage: contestData.userContestRanking?.topPercentage ?? 0,
                    easySolved: solvedEasy,
                    mediumSolved: solvedMedium,
                    hardSolved: solvedHard
                });
            })
            .catch(err => console.error('LeetCode stats error:', err))
            .finally(() => setLcLoading(false));

        // Codeforces
        Promise.all([
            fetch('https://codeforces.com/api/user.info?handles=divyaraval').then(res => {
                if (!res.ok) throw new Error('Codeforces info status not OK');
                return res.json();
            }),
            fetch('https://codeforces.com/api/user.status?handle=divyaraval').then(res => {
                if (!res.ok) throw new Error('Codeforces submissions status not OK');
                return res.json();
            })
        ])
            .then(([infoData, subData]) => {
                let cfSolvedCount = 0;
                if (subData.status === 'OK') {
                    const uniqueSolved = new Set<string>();
                    subData.result.forEach((sub: any) => {
                        if (sub.verdict === 'OK' && sub.problem) {
                            const problemKey = `${sub.problem.contestId}-${sub.problem.index}`;
                            uniqueSolved.add(problemKey);
                        }
                    });
                    cfSolvedCount = uniqueSolved.size;
                }

                if (infoData.status === 'OK' && infoData.result && infoData.result.length > 0) {
                    setCodeforces({
                        rating: infoData.result[0].rating ?? 0,
                        maxRating: infoData.result[0].maxRating ?? 0,
                        rank: infoData.result[0].rank ?? 'unrated',
                        solvedProblem: cfSolvedCount
                    });
                }
            })
            .catch(err => console.error('Codeforces stats error:', err))
            .finally(() => setCfLoading(false));
    }, []);

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
                        {ghLoading ? (
                            <span className="text-sm font-normal text-text-faint animate-pulse">loading...</span>
                        ) : (
                            github?.totalContributions?.toLocaleString() ?? '—'
                        )}
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
                        {lcLoading ? (
                            <span className="text-sm font-normal text-text-faint animate-pulse">loading...</span>
                        ) : (
                            leetcode?.contestRating ? Math.round(leetcode.contestRating) : '—'
                        )}
                    </p>
                    <p className="mono text-xs text-text-muted mb-4">Contest Rating</p>

                    <div className="space-y-1.5 mt-2">
                        <div className="flex justify-between mono text-[10px] text-text-muted">
                            <span>Percentile:</span>
                            <span className="text-accent font-semibold">
                                {lcLoading ? (
                                    <span className="text-[10px] font-normal text-text-faint animate-pulse">loading...</span>
                                ) : (
                                    leetcode?.contestTopPercentage ? `Top ${leetcode.contestTopPercentage}%` : '—'
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between mono text-[10px] text-text-muted">
                            <span>Solved:</span>
                            <span className="text-text-base">
                                {lcLoading ? (
                                    <span className="text-[10px] font-normal text-text-faint animate-pulse">loading...</span>
                                ) : (
                                    leetcode?.solvedProblem ? `${leetcode.solvedProblem} problems` : '—'
                                )}
                            </span>
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
                        {cfLoading ? (
                            <span className="text-sm font-normal text-text-faint animate-pulse">loading...</span>
                        ) : (
                            codeforces?.rating ?? '—'
                        )}
                    </p>
                    <p className="mono text-xs text-text-muted mb-4">Contest Rating</p>
                    
                    <div className="space-y-1.5 mt-2">
                        <div className="flex justify-between mono text-[10px] text-text-muted">
                            <span>Rank:</span>
                            <span className="text-accent font-semibold capitalize">
                                {cfLoading ? (
                                    <span className="text-[10px] font-normal text-text-faint animate-pulse">loading...</span>
                                ) : (
                                    codeforces?.rank ?? '—'
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between mono text-[10px] text-text-muted">
                            <span>Solved:</span>
                            <span className="text-text-base">
                                {cfLoading ? (
                                    <span className="text-[10px] font-normal text-text-faint animate-pulse">loading...</span>
                                ) : (
                                    codeforces?.solvedProblem ? `${codeforces.solvedProblem} problems` : '—'
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between mono text-[10px] text-text-muted">
                            <span>Max Rating:</span>
                            <span className="text-text-faint">
                                {cfLoading ? (
                                    <span className="text-[10px] font-normal text-text-faint animate-pulse">loading...</span>
                                ) : (
                                    codeforces?.maxRating ?? '—'
                                )}
                            </span>
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
