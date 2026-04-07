'use client';

import { useState, useEffect } from 'react';
import { getProfile, saveProfile } from '@/lib/storage';
import { calculateBMI, getBMICategory, calculateTDEE } from '@/lib/calories';
import { UserProfile } from '@/lib/types';

const defaultProfile: UserProfile = {
  name: '',
  age: 25,
  gender: 'male',
  weight: 70,
  height: 170,
  activityLevel: 'moderate',
  calorieGoal: 2000,
  proteinGoal: 150,
  carbsGoal: 250,
  fatGoal: 65,
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = getProfile();
    if (stored) setProfile(stored);
  }, []);

  const bmi = calculateBMI(profile.weight, profile.height);
  const bmiCategory = getBMICategory(bmi);
  const tdee = calculateTDEE(profile);

  const update = (field: keyof UserProfile, value: string | number) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const autoCalculateGoals = () => {
    const cals = tdee; // maintain weight
    setProfile(prev => ({
      ...prev,
      calorieGoal: cals,
      proteinGoal: Math.round(prev.weight * 2), // 2g per kg
      carbsGoal: Math.round((cals * 0.45) / 4), // 45% from carbs
      fatGoal: Math.round((cals * 0.25) / 9), // 25% from fat
    }));
    setSaved(false);
  };

  const handleSave = () => {
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const bmiColor = bmi < 18.5 ? 'var(--info)' : bmi < 25 ? 'var(--primary)' : bmi < 30 ? 'var(--warning)' : 'var(--danger)';
  const bmiPct = Math.min(Math.max(((bmi - 10) / 35) * 100, 0), 100);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Profile & Goals</h1>

      {/* Personal Info */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 mb-4">
        <h2 className="font-semibold mb-3">Personal Info</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-[var(--muted)] mb-1">Name</label>
            <input type="text" value={profile.name} onChange={e => update('name', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)]" placeholder="Your name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[var(--muted)] mb-1">Age</label>
              <input type="number" value={profile.age} onChange={e => update('age', parseInt(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)]" />
            </div>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-1">Gender</label>
              <select value={profile.gender} onChange={e => update('gender', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[var(--muted)] mb-1">Weight (kg)</label>
              <input type="number" value={profile.weight} onChange={e => update('weight', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)]" step="0.1" />
            </div>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-1">Height (cm)</label>
              <input type="number" value={profile.height} onChange={e => update('height', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)]" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[var(--muted)] mb-1">Activity Level</label>
            <select value={profile.activityLevel} onChange={e => update('activityLevel', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)]">
              <option value="sedentary">Sedentary (office job, little exercise)</option>
              <option value="light">Light (1-3 days/week exercise)</option>
              <option value="moderate">Moderate (3-5 days/week exercise)</option>
              <option value="active">Active (6-7 days/week exercise)</option>
              <option value="very_active">Very Active (athlete, physical job)</option>
            </select>
          </div>
        </div>
      </div>

      {/* BMI */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 mb-4">
        <h2 className="font-semibold mb-3">BMI Calculator</h2>
        <div className="text-center mb-3">
          <div className="text-4xl font-bold" style={{ color: bmiColor }}>{bmi}</div>
          <div className="text-sm" style={{ color: bmiColor }}>{bmiCategory}</div>
        </div>
        <div className="relative h-3 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 mb-2">
          <div className="absolute w-4 h-4 bg-white border-2 rounded-full -top-0.5 shadow transition-all" style={{ borderColor: bmiColor, left: `${bmiPct}%` }} />
        </div>
        <div className="flex justify-between text-xs text-[var(--muted)]">
          <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
        </div>
        <div className="mt-3 text-sm text-center text-[var(--muted)]">
          TDEE: <span className="font-bold text-[var(--foreground)]">{tdee}</span> kcal/day
        </div>
      </div>

      {/* Goals */}
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Daily Goals</h2>
          <button onClick={autoCalculateGoals} className="text-xs text-[var(--primary)] font-medium hover:underline">Auto-calculate</button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-[var(--muted)] mb-1">Calorie Goal (kcal)</label>
            <input type="number" value={profile.calorieGoal} onChange={e => update('calorieGoal', parseInt(e.target.value) || 0)}
              className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)]" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-[var(--muted)] mb-1">Protein (g)</label>
              <input type="number" value={profile.proteinGoal} onChange={e => update('proteinGoal', parseInt(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)]" />
            </div>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-1">Carbs (g)</label>
              <input type="number" value={profile.carbsGoal} onChange={e => update('carbsGoal', parseInt(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)]" />
            </div>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-1">Fat (g)</label>
              <input type="number" value={profile.fatGoal} onChange={e => update('fatGoal', parseInt(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-[var(--muted)] text-center">
            <button onClick={() => {
              const cals = tdee - 500;
              update('calorieGoal', cals);
            }} className="bg-[var(--border)] rounded-lg p-2 hover:opacity-80">Lose 0.5kg/wk</button>
            <button onClick={() => update('calorieGoal', tdee)} className="bg-[var(--border)] rounded-lg p-2 hover:opacity-80">Maintain</button>
            <button onClick={() => {
              const cals = tdee + 300;
              update('calorieGoal', cals);
            }} className="bg-[var(--border)] rounded-lg p-2 hover:opacity-80">Gain muscle</button>
          </div>
        </div>
      </div>

      {/* Save */}
      <button onClick={handleSave}
        className={`w-full py-3 rounded-xl font-semibold transition ${saved ? 'bg-green-600' : 'bg-[var(--primary)]'} text-white hover:opacity-90`}>
        {saved ? 'Saved!' : 'Save Profile'}
      </button>

      {/* Data Management */}
      <div className="mt-6 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4">
        <h2 className="font-semibold mb-3">Data</h2>
        <div className="flex gap-3">
          <button onClick={() => {
            const data = {
              profile: localStorage.getItem('fitness_profile'),
              foodLog: localStorage.getItem('fitness_food_log'),
              exerciseLog: localStorage.getItem('fitness_exercise_log'),
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = `fittrack-export-${new Date().toISOString().split('T')[0]}.json`; a.click();
            URL.revokeObjectURL(url);
          }} className="flex-1 py-2 rounded-xl border border-[var(--border)] text-sm font-medium hover:bg-[var(--border)] transition">
            Export Data
          </button>
          <button onClick={() => {
            if (confirm('Delete all data? This cannot be undone.')) {
              localStorage.removeItem('fitness_food_log');
              localStorage.removeItem('fitness_exercise_log');
              localStorage.removeItem('fitness_profile');
              setProfile(defaultProfile);
            }
          }} className="flex-1 py-2 rounded-xl border border-[var(--danger)] text-[var(--danger)] text-sm font-medium hover:bg-red-50 transition">
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
