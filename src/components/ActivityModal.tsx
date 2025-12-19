import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { getActivityById, getActivityDetails } from '@/data/activities';
import { Button } from '@/components/ui/button';

interface ActivityModalProps {
  activityId?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ activityId, open, onOpenChange }) => {
  if (!activityId) return null;

  const activity = getActivityById(activityId);
  const details = getActivityDetails(activityId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{activity?.title || 'Activity'}</DialogTitle>
          <DialogDescription>
            {activity?.location} • {activity?.duration} • ⭐ {activity?.rating}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {activity?.image && <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover rounded" />}
          <p className="text-sm text-muted-foreground">{details.description}</p>

          <div>
            <h4 className="font-semibold">What you'll do</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2">
              {details.whatYouDo.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
            <Button onClick={() => { window.location.href = `/activity/${activityId}`; }}>View full page</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityModal;
