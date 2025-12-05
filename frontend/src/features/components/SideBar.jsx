import React from "react";
import { cn } from "../../lib/utils.js";
import {steps, step3} from "../../constants/constant.jsx";

export function Sidebar({ currentStep, onStepChange, completedSteps = [], reachedSteps = [], formData = {} }) {


    const getStepDescription = (stepId) => {
        switch (stepId) {
            case "2-1":
                return formData.name ? formData.name : "Choose activity title";
            case "2-2":
                return formData.category ? formData.category : "Choose activity type";
            case "2-3":
                return formData.role ? formData.role : "Describe tier level";
            case "2-4":
                return formData.description ? formData.description.substring(0, 40) + (formData.description.length > 40 ? "..." : "") : "What were your main tasks or responsibilities?";
            case "2-5":
                if (formData.hoursPerWeek > 0 || formData.isLeadership) {
                    let parts = [];
                    if (formData.hoursPerWeek > 0) parts.push(`${formData.hoursPerWeek} hrs/week`);
                    if (formData.isLeadership) parts.push("Leadership");
                    return parts.join(" · ");
                }
                return "Describe impact & results";
            default:
                return "";
        }
    };

    return (
        <aside className="w-72 min-h-screen bg-[#1a1f2e] border-r border-gray-700 flex flex-col">
            <div className="p-4 pt-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-400 text-sm">Step 2</span>
                </div>
                <h2 className="text-white font-semibold text-lg">Build Manually</h2>
                <p className="text-gray-500 text-sm">Build one-by-one.</p>
            </div>

            {/* Steps */}
            <nav className="flex-1 px-4 pb-4">
                <div className="space-y-1">
                    {steps.map((step) => {
                        const isActive = currentStep === step.id;
                        const isCompleted = completedSteps.includes(step.id);
                        const isReached = reachedSteps.includes(step.id);
                        const isDisabled = !isReached && !isActive;

                        return (
                            <button
                                key={step.id}
                                onClick={() => !isDisabled && onStepChange(step.id)}
                                disabled={isDisabled}
                                className={cn(
                                    "w-full text-left p-3 rounded-lg transition-all",
                                    isDisabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-gray-800/50 cursor-pointer",
                                    isActive && "bg-blue-900/30 border border-blue-500/30"
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1.5">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            isActive ? "bg-yellow-400" : isCompleted ? "bg-green-500" : "bg-gray-600"
                                        )}></div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 text-xs">{step.id}</span>
                                            {isActive && <span className="text-yellow-400">★</span>}
                                        </div>
                                        <p className={cn(
                                            "font-medium text-sm",
                                            isActive ? "text-blue-400" : "text-gray-300"
                                        )}>
                                            {step.label}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-0.5 truncate">
                                            {getStepDescription(step.id)}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Step 3*/}
                <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                        <span className="text-gray-500 text-sm">Step 3</span>
                    </div>

                    {(() => {
                        const isStep3Reached = reachedSteps.includes(step3.id);
                        const isStep3Disabled = !isStep3Reached && currentStep !== step3.id;

                        return (
                            <button
                                onClick={() => !isStep3Disabled && onStepChange(step3.id)}
                                disabled={isStep3Disabled}
                                className={cn(
                                    "w-full text-left p-3 rounded-lg transition-all",
                                    isStep3Disabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-gray-800/50 cursor-pointer",
                                    currentStep === step3.id && "bg-blue-900/30 border border-blue-500/30"
                                )}
                            >
                                <p className={cn(
                                    "font-medium text-sm",
                                    currentStep === step3.id ? "text-blue-400" : "text-gray-300"
                                )}>
                                    {step3.label}
                                </p>
                                <p className="text-gray-500 text-xs mt-0.5">
                                    {step3.description}
                                </p>
                            </button>
                        );
                    })()}
                </div>
            </nav>
        </aside>
    );
}

export { steps };