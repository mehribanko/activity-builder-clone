import {stepConfig, TIERS} from "../../constants/constant.jsx";


export function calculateDetailedImpactScore(tier, isLeadership, hoursPerWeek) {
    const tierData = TIERS.find(t => t.value === tier);
    const tierScore = tierData ? tierData.score : 0;
    const leadershipBonus = isLeadership ? 2 : 0;
    const hoursBonus = hoursPerWeek > 10 ? 1 : 0;
    const score = tierScore + leadershipBonus + hoursBonus;

    let label;
    if (score <= 2) label = "Low Impact";
    else if (score <= 4) label = "Medium Impact";
    else if (score <= 6) label = "High Impact";
    else label = "Exceptional";

    return { score, label };
}

export function calculateImpactScore(tier, isLeadership, hoursPerWeek) {
    const tierData = TIERS.find(t => t.value === tier);
    const tierScore = tierData ? tierData.score : 0;
    const leadershipBonus = isLeadership ? 2 : 0;
    const hoursBonus = hoursPerWeek > 10 ? 1 : 0;
    return tierScore + leadershipBonus + hoursBonus;
}

export function getImpactLevel(score) {
    if (score <= 2) return { label: "Low Impact", color: "text-gray-400", bg: "bg-gray-500/20", border: "border-gray-500/30" };
    if (score <= 4) return { label: "Medium Impact", color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30" };
    if (score <= 6) return { label: "High Impact", color: "text-green-400", bg: "bg-green-500/20", border: "border-green-500/30" };
    return { label: "Exceptional", color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30" };
}