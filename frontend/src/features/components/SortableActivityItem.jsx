import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export function SortableActivityItem({ activity, index, isJustAdded, onEditActivity, onDeleteActivity }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: activity.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        position: 'relative',
    };

    const isRanked = index < 10;

    return (
        <div ref={setNodeRef}
             style={style}
             className={cn("group mb-3 relative",
                 isDragging && "opacity-50")}>


            <div className="absolute left-0 top-2 bottom-2 w-1 bg-green-500 rounded-r-full"></div>

            <div className="ml-3 bg-[#1e2433] border border-gray-700 rounded-xl p-4 flex gap-4 items-start group-hover:border-gray-500 transition-colors">

                {/* Drag*/}
                <div {...attributes} {...listeners} className="mt-2 text-gray-600 cursor-grab hover:text-gray-400">
                    <GripVertical size={20} />
                </div>

                <div className="mt-1">
                    {isRanked ? (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-900/50">
                            {index + 1}
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-bold text-sm">
                            —
                        </div>
                    )}
                </div>

                {/* Main */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-blue-400 font-bold text-lg truncate">{activity.name}</h4>
                            <p className="text-gray-400 text-sm">{activity.role}, {activity.category}</p>
                        </div>

                        {isJustAdded && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-900/40 border border-green-500/40 rounded text-green-400 text-xs font-medium">
                                <Sparkles size={12} />
                                Just Added!
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mt-3 p-3 bg-[#151925] rounded-lg border border-gray-800">
                        <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                            {activity.description}
                        </p>
                        <div className="text-right mt-1">
                   <span className="text-xs text-green-500 font-mono">
                     {(activity.description || activity.impact || "").length}/150
                   </span>
                     {activity.isLeadership && (
                       <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                            Leadership
                        </span>
                      )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 border-t border-gray-700/50 pt-3 mt-2">

                            {/* Tier */}
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Tier</p>
                                <p className="text-gray-300 font-medium text-sm">
                                    {activity.tier || '-'}
                                </p>
                            </div>

                            {/* Impact Score */}
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Impact Score</p>
                                <p className="text-gray-300 font-medium text-sm truncate" title={activity.impact}>
                                    {activity.impact || '-'}
                                </p>
                            </div>

                            {/* Hours/Week */}
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Hours/Week</p>
                                <p className="text-gray-300 font-medium text-sm">
                                    {activity.hoursPerWeek ? `${activity.hoursPerWeek} hrs` : '0 hrs'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-2 ml-4"
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => onEditActivity && onEditActivity(activity)}
                            className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Edit activity"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => onDeleteActivity && onDeleteActivity(activity.id)}
                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete activity"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}