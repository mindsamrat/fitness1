'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { foods, searchFoodAPI } from '@/data/foods';
import { getFoodLog, addFoodEntry, removeFoodEntry, getDateStr } from '@/lib/storage';
import { FoodLogEntry, FoodItem } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snack';

const mealLabels: Record<Meal, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

const mealIcons: Record<Meal, string> = {
  breakfast: '\u2600\uFE0F',
  lunch: '\uD83C\uDF1E',
  dinner: '\uD83C\uDF19',
  snack: '\uD83C\uDF6A',
};

export default function FoodLog() {
  const [date, setDate] = useState(getDateStr());
  const [entries, setEntries] = useState<FoodLogEntry[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal>('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servings, setServings] = useState(1);

  const loadEntries = useCallback(() => {
    setEntries(getFoodLog(date));
  }, [date]);

  useEffect(() => { loadEntries(); }, [loadEntries]);

  const [apiResults, setApiResults] = useState<FoodItem[]>([]);
  const [searching, setSearching] = useState(false);

  const localResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return foods
      .filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
      .slice(0, 15);
  }, [searchQuery]);

  const searchResults = localResults.length > 0 ? localResults : apiResults;

  useEffect(() => {
    if (localResults.length > 0 || !searchQuery.trim()) { setApiResults([]); return; }
    const timeout = setTimeout(async () => {
      setSearching(true);
      const results = await searchFoodAPI(searchQuery);
      setApiResults(results);
      setSearching(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery, localResults.length]);

  const handleAdd = () => {
    if (!selectedFood) return;
    const entry: FoodLogEntry = {
      id: uuidv4(),
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      meal: selectedMeal,
      servings,
      calories: Math.round(selectedFood.calories * servings),
      protein: Math.round(selectedFood.protein * servings * 10) / 10,
      carbs: Math.round(selectedFood.carbs * servings * 10) / 10,
      fat: Math.round(selectedFood.fat * servings * 10) / 10,
      date,
      timestamp: Date.now(),
    };
    addFoodEntry(entry);
    setShowAddModal(false);
    setSelectedFood(null);
    setSearchQuery('');
    setServings(1);
    loadEntries();
  };

  const handleRemove = (id: string) => {
    removeFoodEntry(id);
    loadEntries();
  };

  const changeDate = (offset: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + offset);
    setDate(getDateStr(d));
  };

  const mealEntries = (meal: Meal) => entries.filter(e => e.meal === meal);
  const mealCalories = (meal: Meal) => mealEntries(meal).reduce((s, e) => s + e.calories, 0);
  const totalCalories = entries.reduce((s, e) => s + e.calories, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeDate(-1)} className="p-2 rounded-lg hover:bg-[var(--border)] text-xl">&larr;</button>
        <div className="text-center">
          <h1 className="text-xl font-bold">Food Log</h1>
          <p className="text-xs text-[var(--muted)]">{date === getDateStr() ? 'Today' : date}</p>
        </div>
        <button onClick={() => changeDate(1)} className="p-2 rounded-lg hover:bg-[var(--border)] text-xl">&rarr;</button>
      </div>

      {/* Total */}
      <div className="bg-[var(--primary)] text-white rounded-xl p-3 mb-4 text-center">
        <span className="text-2xl font-bold">{totalCalories}</span> <span className="text-sm">kcal total</span>
      </div>

      {/* Meal Sections */}
      {(['breakfast', 'lunch', 'dinner', 'snack'] as Meal[]).map(meal => (
        <div key={meal} className="bg-[var(--card)] rounded-xl border border-[var(--border)] mb-3 overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b border-[var(--border)]">
            <div className="font-semibold">{mealIcons[meal]} {mealLabels[meal]}</div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--muted)]">{mealCalories(meal)} kcal</span>
              <button
                onClick={() => { setSelectedMeal(meal); setShowAddModal(true); }}
                className="bg-[var(--primary)] text-white w-7 h-7 rounded-full text-lg flex items-center justify-center hover:opacity-80"
              >+</button>
            </div>
          </div>
          {mealEntries(meal).length === 0 ? (
            <div className="p-3 text-sm text-[var(--muted)] text-center">No entries yet</div>
          ) : (
            mealEntries(meal).map(entry => (
              <div key={entry.id} className="flex justify-between items-center p-3 border-b border-[var(--border)] last:border-0">
                <div>
                  <div className="text-sm font-medium">{entry.foodName}</div>
                  <div className="text-xs text-[var(--muted)]">
                    {entry.servings}x &middot; P:{entry.protein}g C:{entry.carbs}g F:{entry.fat}g
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{entry.calories}</span>
                  <button onClick={() => handleRemove(entry.id)} className="text-[var(--danger)] text-xs hover:opacity-70">&times;</button>
                </div>
              </div>
            ))
          )}
        </div>
      ))}

      <Link href="/photo-analyzer" className="block mt-4 bg-[var(--card)] rounded-xl border border-[var(--border)] p-3 text-center text-sm hover:bg-[var(--border)] transition">
        📷 Snap a photo to auto-detect food
      </Link>

      {/* Add Food Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowAddModal(false)}>
          <div className="bg-[var(--card)] rounded-t-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add to {mealLabels[selectedMeal]}</h2>
              <button onClick={() => setShowAddModal(false)} className="text-2xl">&times;</button>
            </div>

            {!selectedFood ? (
              <>
                <input
                  type="text"
                  placeholder="Search foods (e.g., chicken, rice, apple)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] mb-3 text-sm"
                  autoFocus
                />
                {searchQuery && searchResults.length === 0 && (
                  <p className="text-sm text-[var(--muted)] text-center py-4">
                    {searching ? 'Searching online...' : 'No foods found. Try a different search term.'}
                  </p>
                )}
                <div className="space-y-1">
                  {searchResults.map(food => (
                    <button
                      key={food.id}
                      onClick={() => setSelectedFood(food)}
                      className="w-full text-left p-3 rounded-lg hover:bg-[var(--border)] transition flex justify-between items-center"
                    >
                      <div>
                        <div className="text-sm font-medium">{food.name}</div>
                        <div className="text-xs text-[var(--muted)]">{food.servingSize} &middot; {food.category}</div>
                      </div>
                      <div className="text-sm font-semibold">{food.calories} kcal</div>
                    </button>
                  ))}
                </div>
                {!searchQuery && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2 text-[var(--muted)]">Popular Foods</h3>
                    <div className="space-y-1">
                      {foods.slice(0, 10).map(food => (
                        <button
                          key={food.id}
                          onClick={() => setSelectedFood(food)}
                          className="w-full text-left p-3 rounded-lg hover:bg-[var(--border)] transition flex justify-between items-center"
                        >
                          <div>
                            <div className="text-sm font-medium">{food.name}</div>
                            <div className="text-xs text-[var(--muted)]">{food.servingSize}</div>
                          </div>
                          <div className="text-sm font-semibold">{food.calories} kcal</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div>
                <button onClick={() => setSelectedFood(null)} className="text-[var(--primary)] text-sm mb-3">&larr; Back to search</button>
                <div className="bg-[var(--background)] rounded-xl p-4 mb-4">
                  <h3 className="font-bold text-lg">{selectedFood.name}</h3>
                  <p className="text-sm text-[var(--muted)]">{selectedFood.servingSize} ({selectedFood.servingGrams}g)</p>
                  <div className="grid grid-cols-4 gap-2 mt-3 text-center">
                    <div>
                      <div className="text-lg font-bold">{Math.round(selectedFood.calories * servings)}</div>
                      <div className="text-xs text-[var(--muted)]">kcal</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-500">{(selectedFood.protein * servings).toFixed(1)}</div>
                      <div className="text-xs text-[var(--muted)]">Protein</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-amber-500">{(selectedFood.carbs * servings).toFixed(1)}</div>
                      <div className="text-xs text-[var(--muted)]">Carbs</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-red-500">{(selectedFood.fat * servings).toFixed(1)}</div>
                      <div className="text-xs text-[var(--muted)]">Fat</div>
                    </div>
                  </div>
                </div>

                <label className="block text-sm font-medium mb-2">Servings</label>
                <div className="flex items-center gap-3 mb-4">
                  <button onClick={() => setServings(Math.max(0.25, servings - 0.25))} className="w-10 h-10 rounded-full bg-[var(--border)] text-lg font-bold">-</button>
                  <input
                    type="number"
                    value={servings}
                    onChange={e => setServings(Math.max(0.25, parseFloat(e.target.value) || 0.25))}
                    className="w-20 text-center p-2 rounded-lg border border-[var(--border)] bg-[var(--background)]"
                    step="0.25"
                    min="0.25"
                  />
                  <button onClick={() => setServings(servings + 0.25)} className="w-10 h-10 rounded-full bg-[var(--border)] text-lg font-bold">+</button>
                </div>

                <button
                  onClick={handleAdd}
                  className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  Add {Math.round(selectedFood.calories * servings)} kcal to {mealLabels[selectedMeal]}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
