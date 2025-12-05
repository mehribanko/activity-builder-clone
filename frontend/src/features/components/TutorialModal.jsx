import React, { useState } from 'react';
import { X } from 'lucide-react';
import { tutorialSteps} from "../../constants/constant.jsx";


export function TutorialModal({ isOpen, onClose }) {
    const [step, setStep] = useState(0);

    if (!isOpen) return null;

    const currentData = tutorialSteps[step];
    const isLastStep = step === tutorialSteps.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            onClose();
            setStep(0);
        } else {
            setStep(prev => prev + 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1a1f2e] border border-gray-700 rounded-xl w-[450px] shadow-2xl relative overflow-hidden">

                {/* Header */}
                <div className="p-6 pb-2 flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${currentData.color} flex items-center justify-center text-xl`}>
                            {currentData.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">{currentData.title}</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4 min-h-[100px] text-gray-300 text-sm leading-relaxed">
                    <div className="bg-[#151925] p-4 rounded-lg border border-gray-700">
                        {currentData.content}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-2 flex flex-col items-center gap-4">
                    {/* Dots */}
                    <div className="flex gap-2">
                        {tutorialSteps.map((_, idx) => (
                            <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === step ? 'w-8 bg-blue-500' : 'w-4 bg-gray-600'}`} />
                        ))}
                    </div>

                    <div className="flex gap-3 w-full justify-center mt-2">
                        {step > 0 && (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
                            >
                                Previous
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className="px-8 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20"
                        >
                            {isLastStep ? 'Got it!' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}