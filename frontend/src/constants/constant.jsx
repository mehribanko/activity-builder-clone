import React from "react";

export const CATEGORIES = [
    "Academic",
    "Art",
    "Athletics/Sports",
    "Career Oriented",
    "Community Service (Volunteer)",
    "Computer Science/Programming",
    "Cultural",
    "Dance",
    "Debate/Speech",
    "Environmental",
    "Family Responsibilities",
    "Foreign Exchange",
    "Foreign Language Honor Society",
    "Journalism/Publication",
    "Junior R.O.T.C.",
    "LGBT",
    "Music: Instrumental",
    "Music: Vocal",
    "Other Club/Activity",
    "Religious",
    "Research",
    "Robotics",
    "Science/Math",
    "Student Govt./Politics",
    "Theater/Drama",
    "Work (Paid)"
];

export const steps = [
    { id: "2-1", label: "Activity Title", description: "Choose activity title" },
    { id: "2-2", label: "Activity Type", description: "Choose activity type" },
    { id: "2-3", label: "Tier Level", description: "Describe tier level" },
    { id: "2-4", label: "Main Tasks / Responsibility", description: "What were your main tasks or responsibilities?" },
    { id: "2-5", label: "Impact & Results", description: "Describe impact & your leadership role" },
];


export const step3 = { id: "3-1", label: "Review & Reorder", description: "Review and reorder activities" };


export const stepConfig = {
    "2-1": {
        title: "Activity Title",
        subtitle: "What is the name of your activity?",
        tip: 'Use the official name of the activity. If it\'s a common activity, be specific about your school or organization (e.g., "Jefferson High School Debate Team" rather than just "Debate Team").',
        placeholder: "e.g., National Honor Society, Varsity Soccer, Student Council",
    },
    "2-2": {
        title: "Activity Type",
        subtitle: "Choose activity type",
        tip: "Select the category that best describes your activity. This helps colleges understand the breadth of your involvement.",
    },
    "2-3": {
        title: "Level/Tier",
        subtitle: "When/where did you participate in it?",
        placeholder: "Local, public, national etc.",
        tip: "Be specific about your level. If you held multiple positions over time, list your highest or most recent position. Leadership roles stand out, but meaningful participation is also valuable."
    },
    "2-4": {
        title: "Main Tasks / Responsibility",
        subtitle: "Describe the main tasks you did in this activity.",
        tip: "Focus on action verbs and specific tasks. Don't just say what the organization does - explain what YOU did. Include numbers, outcomes, and concrete examples. ",
        placeholder: "Describe your role, achievements, and impact...",
    },
    "2-5": {
        title: "Impact & Results",
        subtitle: "Describe the impact and your leadership role",
        tip: "Quantify your impact whenever possible. Show scale of your impact! Numbers make your achievements more concrete and impressive. Think about: How many people did you help? How much money was raised? What improved? Was it school-wide, community-wide, or state-wide? ",
    },
    "3-1": {
        title: "Review & Reorder",
        subtitle: "Review your activities and reorder by importance",
        tip: "Order your activities by significance. The most impactful activities should be at the top.",
    },
};


export const TIERS = [
    { value: "School", score: 1 },
    { value: "Regional", score: 2 },
    { value: "State", score: 3 },
    { value: "National", score: 4 },
    { value: "International", score: 5 },
];


export const tutorialSteps = [
    {
        title: "Activity Ranking",
        icon: "↕️",
        color: "bg-blue-600",
        content: "Welcome! In this step, you'll rank your activities by dragging and dropping them in order of importance."
    },
    {
        title: "Understanding Rankings",
        icon: "📊",
        color: "bg-indigo-600",
        content: (
            <span>
        The Common App allows up to 10 activities. Activities ranked <span className="text-blue-400 font-bold">1-10</span> (shown in blue numbers) will be used in your profile analysis. Activities beyond rank 10 are shown with gray dashes (—) and won't be included.
      </span>
        )
    },
    {
        title: "Editing Your Activities",
        icon: "📝",
        color: "bg-blue-600",
        content: (
            <span>
        Important: To edit or delete activities, click the <span className="inline-block px-2 py-0.5 rounded border border-blue-500 text-blue-400 text-xs">Edit Raw Input</span> button. This will navigate you to step 1-3 where you can make changes.
      </span>
        )
    },
    {
        title: "Ready to Complete",
        icon: "✅",
        color: "bg-green-600",
        content: "Once you're satisfied with your activity rankings, click 'Complete & Review' to proceed. You can also use 'Build More Activities' to create additional activities."
    }
];
