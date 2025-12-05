import React, { useState } from "react";
import { Sidebar } from "../components/SideBar.jsx";
import { StepContent } from "./StepContent.jsx";
import {calculateDetailedImpactScore} from "../hooks/ActivityFunc.jsx";

const initialFormData = {
    name: "",
    category: "",
    role: "",
    tier: "",
    description: "",
    impact: "",
    hoursPerWeek: 0,
    isLeadership: false,
};




export function ActivityBuilder() {
    const [currentStep, setCurrentStep] = useState("2-1");
    const [completedSteps, setCompletedSteps] = useState([]);
    const [reachedSteps, setReachedSteps] = useState(["2-1"]);
    const [activities, setActivities] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [editingId, setEditingId] = useState(null);


    const handleNavigate = (stepId) => {
        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps((prev) => [...prev, currentStep]);
        }
        if (!reachedSteps.includes(stepId)) {
            setReachedSteps((prev) => [...prev, stepId]);
        }
        setCurrentStep(stepId);
    };


    const handleSaveActivity = () => {
        if (formData.name) {
            const impactDetails = calculateDetailedImpactScore(
                formData.tier,
                formData.isLeadership,
                formData.hoursPerWeek
            );

            const calculatedImpactString = `${impactDetails.label} (${impactDetails.score})`;
            const activityToSave = {
                ...formData,
                impact: calculatedImpactString,
                impactScore: impactDetails.score,
                category: formData.category || "General",
                tier: formData.tier || "N/A",
            };

            if (editingId) {
                setActivities((prev) => prev.map((activity) =>
                    activity.id === editingId
                        ? { ...activityToSave, id: editingId }
                        : activity
                ));
                setEditingId(null);
            } else {
                setActivities((prev) => [...prev, {
                    ...activityToSave,
                    id: Date.now().toString()
                }]);
            }

            setFormData(initialFormData);
            handleNavigate("3-1");
        }
    };

    const handleDeleteActivity = (id) => {
        setActivities((prev) => prev.filter((a) => a.id !== id));
        if (id === editingId) {
            setEditingId(null);
            setFormData({
                name: "",
                category: "",
                role: "",
                tier: "",
                description: "",
                impact: "",
                hoursPerWeek: 0,
                isLeadership: false,
            });
        }
    };

    const handleEditActivity = (activity) => {
        setFormData({
            name: activity.name,
            category: activity.category,
            role: activity.role || "",
            tier: activity.tier || "",
            description: activity.description || "",
            impact: activity.impact || "",
            hoursPerWeek: activity.hoursPerWeek || 0,
            isLeadership: activity.isLeadership || false,
        });

        setEditingId(activity.id);

        setCurrentStep("2-1");

        setReachedSteps((prev) => {
            const steps = ["2-1", "2-2", "2-3", "2-4", "2-5", "3-1"];
            const uniqueSteps = new Set([...prev, ...steps]);
            return Array.from(uniqueSteps);
        });
    };

    return (
        <div className="flex min-h-screen bg-[#0f1219]">

            <Sidebar
                currentStep={currentStep}
                onStepChange={setCurrentStep}
                completedSteps={completedSteps}
                reachedSteps={reachedSteps}
                formData={formData}
            />

            {/* Main */}
            <StepContent
                currentStep={currentStep}
                setActivities={setActivities}
                activities={activities}
                formData={formData}
                setFormData={setFormData}
                onNavigate={handleNavigate}
                onSaveActivity={handleSaveActivity}
                onDeleteActivity={handleDeleteActivity}
                onEditActivity={handleEditActivity}
            />
        </div>
    );
}

export default ActivityBuilder;