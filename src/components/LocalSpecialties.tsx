import React from 'react';
import { locations, specialtiesByLocation } from '@/data/specialties';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  selectedCity?: string; // normalized city value like 'Da Nang'
};

const LocalSpecialties: React.FC<Props> = ({ selectedCity }) => {
  // Use the global city selector passed as `selectedCity` (no local filters here)
  // normalize strings by removing diacritics for comparison
    const normalize = (s = '') => (s || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/Đ/g, 'D')
      .replace(/đ/g, 'd')
      .trim()
      .toLowerCase();

  const target = selectedCity || locations[0];
    const displayKey = Object.keys(specialtiesByLocation).find((k) => normalize(k) === normalize(target)) || Object.keys(specialtiesByLocation)[0];

  // specialties list for display (no local search)
  const specialties = specialtiesByLocation[displayKey] || [];
  const foodList = specialties.slice(0, 4);
  const otherList = specialties.slice(4, 12);

  return (
    <section className="px-4 py-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Food & Specialties</h3>

      <div className="mb-3 text-sm text-muted-foreground">City: {displayKey}</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-sm mb-2">Food</h4>
          <div className="space-y-2">
            {foodList.map((s) => (
              <Card key={s.id} className="overflow-hidden">
                <CardContent className="p-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-xs font-medium">{s.title.slice(0,2)}</div>
                    <div>
                      <div className="font-medium text-sm">{s.title}</div>
                      <div className="text-xs text-muted-foreground">{s.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {foodList.length === 0 && <div className="text-sm text-muted-foreground">No food items found for this city.</div>}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Specialties</h4>
          <div className="space-y-2">
            {otherList.map((s) => (
              <Card key={s.id} className="overflow-hidden">
                <CardContent className="p-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-xs font-medium">{s.title.slice(0,2)}</div>
                    <div>
                      <div className="font-medium text-sm">{s.title}</div>
                      <div className="text-xs text-muted-foreground">{s.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {otherList.length === 0 && <div className="text-sm text-muted-foreground">No additional specialties for this city.</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalSpecialties;
