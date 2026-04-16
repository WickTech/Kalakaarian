import { Check, Circle, Video, CreditCard, Users } from 'lucide-react';

interface WorkflowStage {
  key: string;
  label: string;
  completed: boolean;
  completedAt?: Date;
}

interface WorkflowTimelineProps {
  stages: WorkflowStage[];
  onStageClick?: (stage: string) => void;
}

const stageIcons = {
  selected: Users,
  shooting: Video,
  uploaded: Video,
  payment: CreditCard,
};

export function WorkflowTimeline({ stages, onStageClick }: WorkflowTimelineProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {stages.map((stage, index) => {
        const Icon = stageIcons[stage.key as keyof typeof stageIcons] || Circle;
        const isLast = index === stages.length - 1;
        const isCompleted = stage.completed;
        const isClickable = onStageClick && !isCompleted;

        return (
          <div key={stage.key} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <button
                onClick={() => isClickable && onStageClick(stage.key)}
                disabled={!isClickable}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isClickable
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 cursor-pointer'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </button>
              <span className={`text-xs mt-2 font-medium text-center ${
                isCompleted ? 'text-green-600' : 'text-gray-500'
              }`}>
                {stage.label}
              </span>
              {stage.completedAt && (
                <span className="text-[10px] text-gray-400">
                  {new Date(stage.completedAt).toLocaleDateString()}
                </span>
              )}
            </div>
            {!isLast && (
              <div className={`flex-1 h-1 mx-2 rounded ${
                stages[index + 1]?.completed || isCompleted
                  ? 'bg-green-500'
                  : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}