import React from "react";
import { cn } from "../../lib/utils.js";
import {CATEGORIES, stepConfig, TIERS} from "../../constants/constant.jsx";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Info, PlusCircle, CheckCircle } from 'lucide-react';

import { SortableActivityItem } from '../components/SortableActivityItem.jsx';
import {TutorialModal} from "../components/TutorialModal.jsx";
import {saveActivitiesToBackend} from "../services/api.js";
import {calculateImpactScore, getImpactLevel} from "../hooks/ActivityFunc.jsx";


export function StepContent({
                                currentStep,
                                activities,
                                formData,
                                setFormData,
                                onNavigate,
                                onSaveActivity,
                                setActivities,
                                onDeleteActivity,
                                onEditActivity,
                            }) {

    const config = stepConfig[currentStep] || stepConfig["2-1"];
    const displayCount = activities.length + (formData.name.trim().length > 0 ? 1 : 0);
    const [isTutorialOpen, setIsTutorialOpen] = React.useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = activities.findIndex((item) => item.id === active.id);
            const newIndex = activities.findIndex((item) => item.id === over.id);
            setActivities(arrayMove(activities, oldIndex, newIndex));
        }
    };

    const impactScore = calculateImpactScore(formData.tier, formData.isLeadership, formData.hoursPerWeek);
    const impactLevel = getImpactLevel(impactScore);


    const renderStepInput = () => {
        switch (currentStep) {
            case "2-1":
                return (
                    <div>
                        <input
                            type="text"
                            placeholder={config.placeholder}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            maxLength={50}
                            className="w-full px-4 py-3 bg-[#1e2433] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                );

            case "2-2":
                return (
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-300">
                            Select the category that best describes your activity
                        </label>

                        <div className="relative">
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className={cn(
                                    "w-full appearance-none px-4 py-3 bg-[#1e2433] border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer",
                                    formData.category
                                        ? "border-gray-600"
                                        : "border-gray-600 text-gray-400"
                                )}
                            >
                                <option value="" disabled>Choose an activity type</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat} className="bg-[#1e2433] text-white">
                                        {cat}
                                    </option>
                                ))}
                            </select>

                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                );

            case "2-3":
                return (
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-300">
                            Select the level at which you participated
                        </label>
                        {TIERS.map((tier) => (
                            <button
                                key={tier.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, tier: tier.value })}
                                className={cn(
                                    "w-full px-4 py-3 rounded-lg border text-left transition-all flex items-center justify-between",
                                    formData.tier === tier.value
                                        ? "bg-blue-600 border-blue-500 text-white"
                                        : "bg-[#1e2433] border-gray-600 text-gray-300 hover:border-gray-500"
                                )}
                            >
                                <span className="font-medium">{tier.value}</span>
                                <span className={cn(
                                    "text-sm px-2 py-0.5 rounded",
                                    formData.tier === tier.value ? "bg-blue-500/30" : "bg-gray-700"
                                )}>
                  +{tier.score} {tier.score === 1 ? "point" : "points"}
                </span>
                            </button>
                        ))}
                    </div>
                );

            case "2-4":
                const minLength = 150;
                const currentLength = formData.description?.length || 0;
                const isLengthValid = currentLength >= minLength;

                return (
                    <div>
                        <textarea
                            placeholder={config.placeholder}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={8}
                            className={cn(
                                "w-full px-4 py-3 bg-[#1e2433] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 resize-y min-h-[150px] transition-all",
                                isLengthValid
                                    ? "border-red-500/50 focus:ring-green-500/50 focus:border-green-500"
                                    : "border-gray-600 focus:ring-blue-500 focus:border-transparent"
                            )}
                        />
                        <div className={cn(
                            "text-right text-xs mt-2",
                            formData.description.length > 130 ? "text-red-400" : "text-gray-500"
                        )}>
                            {formData.description.length}/150
                        </div>
                    </div>
                );


            case "2-5":
                return (
                    <div className="space-y-6">
                        <div className={cn(
                            "flex items-center justify-between p-4 rounded-lg border",
                            impactLevel.bg,
                            impactLevel.border
                        )}>
                            <div className="flex items-center gap-2">
                                <svg className={cn("w-5 h-5", impactLevel.color)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-gray-300 font-medium">Impact Score</span>
                            </div>
                            <span className={cn("font-bold text-lg", impactLevel.color)}>
                {impactLevel.label} ({impactScore})
              </span>
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Hours per Week
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    min={0}
                                    max={40}
                                    value={formData.hoursPerWeek}
                                    onChange={(e) => {
                                        const value = Math.min(40, Math.max(0, parseInt(e.target.value) || 0));
                                        setFormData({ ...formData, hoursPerWeek: value });
                                    }}
                                    className="w-24 px-4 py-3 bg-[#1e2433] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-gray-400 text-sm">
                  {formData.hoursPerWeek > 10 ? (
                      <span className="text-green-400">+1 bonus point for &gt;10 hrs/week</span>
                  ) : (
                      "(0-40 hours, +1 point if >10)"
                  )}
                </span>
                            </div>
                            {(formData.hoursPerWeek < 0 || formData.hoursPerWeek > 40) && (
                                <span className="text-xs text-red-400 mt-1 block">
                  Hours must be between 0 and 40
                </span>
                            )}
                        </div>

                        <div
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-lg border transition-colors cursor-pointer",
                                formData.isLeadership
                                    ? "bg-indigo-900/20 border-indigo-500/50"
                                    : "bg-[#1e2433] border-gray-600 hover:border-gray-500"
                            )}
                            onClick={() => setFormData({ ...formData, isLeadership: !formData.isLeadership })}
                        >
                            <div className={cn(
                                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                                formData.isLeadership
                                    ? "bg-blue-600 border-blue-600"
                                    : "border-gray-500"
                            )}>
                                {formData.isLeadership && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 font-medium">Leadership Position</p>
                                <p className="text-gray-500 text-sm">Check if you held a leadership role (+2 bonus points)</p>
                            </div>
                            {formData.isLeadership && (
                                <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-full font-medium">
                  +2 pts
                </span>
                            )}
                        </div>
                    </div>
                );


            case "3-1":
                return (
                    <div className="space-y-6">
                        <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />

                        <div className="flex justify-between items-center px-1">
                            <h3 className="text-white font-semibold">Activities Summary</h3>
                            <button onClick={() => setIsTutorialOpen(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 text-xs text-gray-300 border border-gray-700">
                                <Info size={14} /> Show Tutorial
                            </button>
                        </div>

                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={activities.map(a => a.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-2">
                                    {activities.length === 0 ? (
                                        <div className="text-center py-10 text-gray-500 bg-[#1e2433] rounded-xl border border-gray-700 border-dashed">
                                            No activities found.
                                        </div>
                                    ) : (
                                        activities.map((activity, index) => (
                                            <SortableActivityItem
                                                key={activity.id}
                                                activity={activity}
                                                index={index}
                                                isJustAdded={index === activities.length - 1}
                                                onEditActivity={onEditActivity}
                                                onDeleteActivity={onDeleteActivity}
                                            />
                                        ))
                                    )}
                                </div>
                            </SortableContext>
                        </DndContext>


                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                            <button onClick={() => onNavigate("2-1")} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium">
                                <PlusCircle size={18} /> Build More Activities
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                <CheckCircle size={18} /> Complete & Review
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };


    const isStepComplete = () => {
        switch (currentStep) {
            case "2-1": return formData.name.trim().length > 0;
            case "2-2": return formData.category !== "";
            case "2-3": return formData.tier !== "";
            case "2-4": return formData.description.trim().length > 0 && formData.description.length <= 150;
            case "2-5": return formData.hoursPerWeek >= 0 && formData.hoursPerWeek <= 40;
            case "3-1": return true;
            default: return false;
        }
    };

    const isFormValid = () => {
        return (
            formData.name.trim().length > 0 &&
            formData.category !== "" &&
            formData.tier !== "" &&
            formData.description.trim().length > 0 &&
            formData.description.length <= 150 &&
            formData.hoursPerWeek >= 0 &&
            formData.hoursPerWeek <= 40
        );
    };

    const handleBack = () => {
        const steps = ["2-1", "2-2", "2-3", "2-4", "2-5", "3-1"];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            onNavigate(steps[currentIndex - 1]);
        }
    };


    const handleContinue = async () => {
        const steps = ["2-1", "2-2", "2-3", "2-4", "2-5", "3-1"];
        const currentIndex = steps.indexOf(currentStep);

        if (currentStep === "2-5") {
            onSaveActivity();
        } else if (currentStep === "3-1") {
            await saveActivitiesToBackend(activities);
        } else if (currentIndex < steps.length - 1) {
            onNavigate(steps[currentIndex + 1]);

        }
    };

    return (
        <div className="flex-1 bg-[#0f1219] min-h-screen overflow-auto">
            <div className="max-w-3xl mx-auto p-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        Step {currentStep} Activity Builder
                    </h1>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-sm mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {displayCount} Activities Created
                    </div>

                    <p className="text-gray-400">Complete each step to build a compelling activity description</p>

                    {/* Progress */}
                    <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${(["2-1", "2-2", "2-3", "2-4", "2-5", "3-1"].indexOf(currentStep) + 1) / 6 * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Main Step*/}
                <div className="bg-[#1a1f2e] rounded-xl border border-gray-700 p-6">

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">{config.title}</h2>
                            <p className="text-gray-400 text-sm">{config.subtitle}</p>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="mb-6">
                        {renderStepInput()}
                    </div>

                    {/* Tip */}
                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <span className="text-yellow-400 text-lg">💡</span>
                            <div>
                                <p className="text-yellow-400 font-medium text-sm">Tip:</p>
                                <p className="text-yellow-200/70 text-sm">{config.tip}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back/ Continue buttons */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === "2-1"}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-lg transition-colors",
                            currentStep === "2-1"
                                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                : "bg-gray-800 hover:bg-gray-700 text-white"
                        )}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    {currentStep === "3-1" ? (
                        <button
                            onClick={handleContinue}
                            disabled={activities.length === 0}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-lg transition-colors",
                                activities.length > 0
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                            )}
                        >
                            Save Activity
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={handleContinue}
                            disabled={!isStepComplete()}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-lg transition-colors",
                                isStepComplete()
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                            )}
                        >
                            Continue
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}