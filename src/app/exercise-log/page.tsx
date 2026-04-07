'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { exercises } from '@/data/exercises';
import { getExerciseLog, addExerciseEntry, removeExerciseEntry, getProfile, getDateStr } from '@/lib/storage';
import { ExerciseLogEntry, ExerciseType } from '@/lib/types';
import { calculateExerciseCalories } from '@/lib/calories';
import { v4 as uuidv4 } from 'uuid';

export default function ExerciseLog() {
  const [date, setDate] = useState(getDateStr());
  const [entries, setEntries] = useState<ExerciseLogEntry[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(null);
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState<'low' | 'moderate' | 'high'>('moderate');

  const loadEntries = useCallback(() => {
    setEntries(getExerciseLog(date));
  }, [date]);

  useEffect(() => { loadEntries(); }, [loadEntries]);

  const profile = getProfile();
  const weightKg = profile?.weight || 70;

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return exercises
      .filter(e => e.name.toLowerCase().includes(q) || e.category.toLowerCase().includes(q))
      .slice(0, 15);
  }, [searchQuery]);

  const categories = useMemo(() => {
    const cats = new Map<string, ExerciseType[]>();
    exercises.forEach(e => {
      const list = cats.get(e.category) || [];
      list.push(e);
      cats.set(e.category, list);
    });
    return cats;
  }, []);

  const intensityMultiplier = intensity === 'low' ? 0.8 : intensity === 'high' ? 1.2 : 1.0;

  const handleAdd = () => {
    if (!selectedExercise) return;
    const cals = Math.round(calculateExerciseCalories(selectedExercise.metValue * intensityMultiplier, weightKg, duration));
    const entry: ExerciseLogEntry = {
      id: uuidv4(),
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.name,
      duration,
      caloriesBurned: cals,
      intensity,
      date,
      timestamp: Date.now(),
    };
    addExerciseEntry(entry);
    setShowAddModal(false);
    setSelectedExercise(null);
    setSearchQuery('');
    setDuration(30);
    setIntensity('moderate');
    loadEntries();
  };

  const handleRemove = (id: string) => {
    removeExerciseEntry(id);
    loadEntries();
  };

  const changeDate = (offset: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + offset);
    setDate(getDateStr(d));
  };

  const totalBurned = entries.reduce((s, e) => s + e.caloriesBurned, 0);
  const totalMinutes = entries.reduce((s, e) => s + e.duration, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeDate(-1)} className="p-2 rounded-lg hover:bg-[var(--border)] text-xl">&larr;</button>
        <div className="text-center">
          <h1 className="text-xl font-bold">Exercise Log</h1>
          <p className="text-xs text-[var(--muted)]">{date === getDateStr() ? 'Today' : date}</p>
        </div>
        <button onClick={() => changeDate(1)} className="p-2 rounded-lg hover:bg-[var(--border)] text-xl">&rarr;</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[var(--info)] text-white rounded-xl p-3 text-center">
          <div className="text-2xl font-bold">{totalBurned}</div>
          <div className="text-xs">kcal burned</div>
        </div>
        <div className="bg-[var(--card)] rounded-xl p-3 text-center border border-[var(--border)]">
          <div className="text-2xl font-bold">{totalMinutes}</div>
          <div className="text-xs text-[var(--muted)]">minutes</div>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold mb-4 hover:opacity-90 transition"
      >
        + Add Exercise
      </button>

      {/* Entries */}
      {entries.length === 0 ? (
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 text-center">
          <p className="text-4xl mb-2">🏃</p>
          <p className="text-[var(--muted)]">No exercises logged yet today</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map(entry => (
            <div key={entry.id} className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-3 flex justify-between items-center">
              <div>
                <div className="font-medium text-sm">{entry.exerciseName}</div>
                <div className="text-xs text-[var(--muted)]">
                  {entry.duration} min &middot; {entry.intensity} intensity
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[var(--info)]">-{entry.caloriesBurned} kcal</span>
                <button onClick={() => handleRemove(entry.id)} className="text-[var(--danger)] hover:opacity-70">&times;</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Exercise Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowAddModal(false)}>
          <div className="bg-[var(--card)] rounded-t-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Exercise</h2>
              <button onClick={() => setShowAddModal(false)} className="text-2xl">&times;</button>
            </div>

            {!selectedExercise ? (
              <>
                <input
                  type="text"
                  placeholder="Search exercises..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] mb-3 text-sm"
                  autoFocus
                />
                {searchQuery ? (
                  <div className="space-y-1">
                    {searchResults.length === 0 && (
                      <p className="text-sm text-[var(--muted)] text-center py-4">No exercises found.</p>
                    )}
                    {searchResults.map(ex => (
                      <button
                        key={ex.id}
                        onClick={() => setSelectedExercise(ex)}
                        className="w-full text-left p-3 rounded-lg hover:bg-[var(--border)] transition flex justify-between"
                      >
                        <span className="text-sm">{ex.icon} {ex.name}</span>
                        <span className="text-xs text-[var(--muted)]">MET: {ex.metValue}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    {Array.from(categories.entries()).map(([cat, items]) => (
                      <div key={cat} className="mb-4">
                        <h3 className="text-sm font-semibold capitalize mb-2 text-[var(--muted)]">{cat}</h3>
                        <div className="space-y-1">
                          {items.slice(0, 5).map(ex => (
                            <button
                              key={ex.id}
                              onClick={() => setSelectedExercise(ex)}
                              className="w-full text-left p-2 rounded-lg hover:bg-[var(--border)] transition text-sm"
                            >
                              {ex.icon} {ex.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div>
                <button onClick={() => setSelectedExercise(null)} className="text-[var(--primary)] text-sm mb-3">&larr; Back</button>
                <div className="bg-[var(--background)] rounded-xl p-4 mb-4 text-center">
                  <p className="text-3xl mb-1">{selectedExercise.icon}</p>
                  <h3 className="font-bold text-lg">{selectedExercise.name}</h3>
                  <p className="text-sm text-[var(--muted)]">MET: {selectedExercise.metValue}</p>
                </div>

                <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={e => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] mb-4"
                  min="1"
                />

                <label className="block text-sm font-medium mb-2">Intensity</label>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {(['low', 'moderate', 'high'] as const).map(level => (
                    <button
                      key={level}
                      onClick={() => setIntensity(level)}
                      className={`py-2 rounded-lg text-sm font-medium capitalize transition ${
                        intensity === level
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--border)] hover:opacity-80'
                      }`}
                    >{level}</button>
                  ))}
                </div>

                <div className="bg-[var(--background)] rounded-xl p-3 mb-4 text-center">
                  <div className="text-2xl font-bold text-[var(--info)]">
                    {Math.round(calculateExerciseCalories(selectedExercise.metValue * intensityMultiplier, weightKg, duration))}
                  </div>
                  <div className="text-xs text-[var(--muted)]">estimated calories burned</div>
                </div>

                <button
                  onClick={handleAdd}
                  className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  Log Exercise
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
