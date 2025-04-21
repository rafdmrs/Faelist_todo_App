import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    CheckCircle2, 
    Clock, 
    AlertTriangle, 
    ArrowUp, 
    ArrowDown,
    Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatsCard({ stats }) {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        // Trigger animation after component mounts
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);
    
    const cards = [
        {
            title: "Total Tasks",
            value: stats.total,
            icon: Activity,
            color: "bg-gradient-to-br from-indigo-500 to-purple-600",
            textColor: "text-white",
            change: stats.totalChange,
            changeText: `${stats.totalChange >= 0 ? '+' : ''}${stats.totalChange}% from last week`
        },
        {
            title: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            color: "bg-gradient-to-br from-emerald-500 to-teal-600",
            textColor: "text-white",
            change: stats.completedChange,
            changeText: `${stats.completedChange >= 0 ? '+' : ''}${stats.completedChange}% from last week`
        },
        {
            title: "In Progress",
            value: stats.active,
            icon: Clock,
            color: "bg-gradient-to-br from-blue-500 to-cyan-600",
            textColor: "text-white",
            change: stats.activeChange,
            changeText: `${stats.activeChange >= 0 ? '+' : ''}${stats.activeChange}% from last week`
        },
        {
            title: "High Priority",
            value: stats.highPriority,
            icon: AlertTriangle,
            color: "bg-gradient-to-br from-rose-500 to-red-600",
            textColor: "text-white",
            change: stats.highPriorityChange,
            changeText: `${stats.highPriorityChange >= 0 ? '+' : ''}${stats.highPriorityChange}% from last week`
        }
    ];
    
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence>
                {isVisible && cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.5, 
                            delay: index * 0.1,
                            ease: [0.4, 0, 0.2, 1]
                        }}
                        whileHover={{ 
                            scale: 1.03,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                        }}
                        className={cn(
                            "relative overflow-hidden rounded-xl p-6 shadow-md",
                            card.color
                        )}
                    >
                        {/* Decorative elements */}
                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
                        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10 blur-xl" />
                        
                        <div className="relative flex justify-between">
                            <div>
                                <p className={cn("text-sm font-medium opacity-80", card.textColor)}>
                                    {card.title}
                                </p>
                                <div className="mt-4 flex items-baseline">
                                    <h3 className={cn("text-3xl font-bold tracking-tight", card.textColor)}>
                                        {card.value}
                                    </h3>
                                    <motion.div 
                                        className="ml-2"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                                    >
                                        {card.change > 0 ? (
                                            <div className="flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                                <ArrowUp className="mr-1 h-3 w-3" />
                                                {card.change}%
                                            </div>
                                        ) : card.change < 0 ? (
                                            <div className="flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                                                <ArrowDown className="mr-1 h-3 w-3" />
                                                {Math.abs(card.change)}%
                                            </div>
                                        ) : (
                                            <div className="flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                                                0%
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                                <p className={cn("mt-1 text-xs opacity-70", card.textColor)}>
                                    {card.changeText}
                                </p>
                            </div>
                            
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                                <card.icon className={cn("h-6 w-6", card.textColor)} />
                            </div>
                        </div>
                        
                        {/* Animated progress bar */}
                        <motion.div 
                            className="absolute bottom-0 left-0 h-1 bg-white/30"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, card.value / (stats.total || 1) * 100)}%` }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 0.8, ease: "easeOut" }}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}