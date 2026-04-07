'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { foods } from '@/data/foods';
import { addFoodEntry, getDateStr } from '@/lib/storage';
import { FoodItem } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

interface ColorProfile {
  dominantColors: Array<{ r: number; g: number; b: number; pct: number }>;
}

function extractColors(canvas: HTMLCanvasElement): ColorProfile {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { dominantColors: [] };
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const buckets: Record<string, { r: number; g: number; b: number; count: number }> = {};
  for (let i = 0; i < data.length; i += 16) { // sample every 4th pixel
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    const key = `${r},${g},${b}`;
    if (!buckets[key]) buckets[key] = { r, g, b, count: 0 };
    buckets[key].count++;
  }
  const total = Object.values(buckets).reduce((s, b) => s + b.count, 0);
  const sorted = Object.values(buckets).sort((a, b) => b.count - a.count).slice(0, 5);
  return {
    dominantColors: sorted.map(b => ({ r: b.r, g: b.g, b: b.b, pct: Math.round((b.count / total) * 100) }))
  };
}

function suggestCategories(colors: ColorProfile): string[] {
  const categories: Record<string, number> = {};
  for (const c of colors.dominantColors) {
    const { r, g, b, pct } = c;
    if (g > r && g > b) { categories['vegetables'] = (categories['vegetables'] || 0) + pct; categories['fruits'] = (categories['fruits'] || 0) + pct * 0.5; }
    if (r > 150 && g < 100 && b < 100) { categories['fruits'] = (categories['fruits'] || 0) + pct; categories['protein'] = (categories['protein'] || 0) + pct * 0.3; }
    if (r > 150 && g > 100 && b < 80) { categories['grains'] = (categories['grains'] || 0) + pct; categories['fast-food'] = (categories['fast-food'] || 0) + pct * 0.5; }
    if (r > 120 && g > 80 && b > 60 && r > g) { categories['protein'] = (categories['protein'] || 0) + pct; categories['prepared'] = (categories['prepared'] || 0) + pct * 0.5; }
    if (r > 200 && g > 200 && b > 200) { categories['dairy'] = (categories['dairy'] || 0) + pct; categories['grains'] = (categories['grains'] || 0) + pct * 0.3; }
    if (r > 200 && g > 150 && b < 50) { categories['snacks'] = (categories['snacks'] || 0) + pct; categories['fast-food'] = (categories['fast-food'] || 0) + pct * 0.5; }
  }
  return Object.entries(categories).sort((a, b) => b[1] - a[1]).map(e => e[0]).slice(0, 3);
}

const categoryIcons: Record<string, string> = {
  fruits: '\uD83C\uDF4E', vegetables: '\uD83E\uDD66', grains: '\uD83C\uDF5E', protein: '\uD83C\uDF57',
  dairy: '\uD83E\uDD5B', beverages: '\u2615', snacks: '\uD83C\uDF6A', 'fast-food': '\uD83C\uDF54',
  condiments: '\uD83E\uDED9', prepared: '\uD83C\uDF72',
};

export default function PhotoAnalyzer() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [suggestedFoods, setSuggestedFoods] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servings, setServings] = useState(1);
  const [meal, setMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    return [...new Set(foods.map(f => f.category))];
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch {
      alert('Camera not available. Please use file upload instead.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  };

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    setCapturedImage(canvas.toDataURL('image/jpeg'));
    stopCamera();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d')?.drawImage(img, 0, 0);
        setCapturedImage(canvas.toDataURL('image/jpeg'));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const analyze = useCallback(() => {
    if (!canvasRef.current) return;
    setAnalyzing(true);
    setTimeout(() => {
      const colors = extractColors(canvasRef.current!);
      const cats = suggestCategories(colors);
      setSuggestedCategories(cats);
      if (cats.length > 0) {
        setSelectedCategory(cats[0]);
        setSuggestedFoods(foods.filter(f => f.category === cats[0]).slice(0, 8));
      }
      setAnalyzing(false);
    }, 800);
  }, []);

  const selectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setSuggestedFoods(foods.filter(f => f.category === cat).slice(0, 12));
    setSelectedFood(null);
  };

  const addToLog = () => {
    if (!selectedFood) return;
    addFoodEntry({
      id: uuidv4(),
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      meal,
      servings,
      calories: Math.round(selectedFood.calories * servings),
      protein: Math.round(selectedFood.protein * servings * 10) / 10,
      carbs: Math.round(selectedFood.carbs * servings * 10) / 10,
      fat: Math.round(selectedFood.fat * servings * 10) / 10,
      date: getDateStr(),
      timestamp: Date.now(),
    });
    router.push('/food-log');
  };

  const reset = () => {
    setCapturedImage(null);
    setSuggestedFoods([]);
    setSelectedFood(null);
    setSuggestedCategories([]);
    setSelectedCategory(null);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Photo Analyzer</h1>

      <canvas ref={canvasRef} className="hidden" />
      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />

      {!capturedImage ? (
        <div>
          {streaming ? (
            <div className="relative rounded-xl overflow-hidden mb-4">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-xl" />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                <button onClick={capture} className="bg-white text-black w-16 h-16 rounded-full border-4 border-[var(--primary)] hover:scale-105 transition" />
                <button onClick={stopCamera} className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-8 text-center">
                <p className="text-5xl mb-3">📷</p>
                <p className="text-lg font-semibold mb-1">Snap your food</p>
                <p className="text-sm text-[var(--muted)] mb-4">Take a photo or upload an image to identify food and estimate calories</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={startCamera} className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition">
                    Open Camera
                  </button>
                  <button onClick={() => fileInputRef.current?.click()} className="bg-[var(--border)] px-6 py-3 rounded-xl font-medium hover:opacity-80 transition">
                    Upload
                  </button>
                </div>
              </div>
              <video ref={videoRef} className="hidden" />
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Preview */}
          <div className="relative mb-4">
            <img src={capturedImage} alt="Captured food" className="w-full rounded-xl" />
            <button onClick={reset} className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">Retake</button>
          </div>

          {suggestedFoods.length === 0 && !analyzing && (
            <button onClick={analyze} className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold mb-4 hover:opacity-90 transition">
              Analyze Photo
            </button>
          )}

          {analyzing && (
            <div className="text-center py-6">
              <div className="animate-spin w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full mx-auto mb-2" />
              <p className="text-sm text-[var(--muted)]">Analyzing colors and patterns...</p>
            </div>
          )}

          {suggestedCategories.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Detected Categories</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {suggestedCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => selectCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm capitalize transition ${
                      selectedCategory === cat ? 'bg-[var(--primary)] text-white' : 'bg-[var(--border)]'
                    }`}
                  >{categoryIcons[cat] || ''} {cat}</button>
                ))}
              </div>
              <h3 className="text-sm font-semibold mb-2 text-[var(--muted)]">All Categories</h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.filter(c => !suggestedCategories.includes(c)).map(cat => (
                  <button
                    key={cat}
                    onClick={() => selectCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm capitalize transition ${
                      selectedCategory === cat ? 'bg-[var(--primary)] text-white' : 'bg-[var(--border)]'
                    }`}
                  >{categoryIcons[cat] || ''} {cat}</button>
                ))}
              </div>
            </div>
          )}

          {suggestedFoods.length > 0 && !selectedFood && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Select Your Food</h3>
              <div className="space-y-1">
                {suggestedFoods.map(food => (
                  <button
                    key={food.id}
                    onClick={() => setSelectedFood(food)}
                    className="w-full text-left p-3 bg-[var(--card)] rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition flex justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium">{food.name}</div>
                      <div className="text-xs text-[var(--muted)]">{food.servingSize}</div>
                    </div>
                    <div className="text-sm font-bold">{food.calories} kcal</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedFood && (
            <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
              <button onClick={() => setSelectedFood(null)} className="text-[var(--primary)] text-sm mb-3">&larr; Change food</button>
              <h3 className="font-bold text-lg">{selectedFood.name}</h3>
              <p className="text-sm text-[var(--muted)] mb-3">{selectedFood.servingSize}</p>

              <div className="grid grid-cols-4 gap-2 text-center mb-4">
                <div><div className="font-bold">{Math.round(selectedFood.calories * servings)}</div><div className="text-xs text-[var(--muted)]">kcal</div></div>
                <div><div className="font-bold text-blue-500">{(selectedFood.protein * servings).toFixed(1)}g</div><div className="text-xs text-[var(--muted)]">protein</div></div>
                <div><div className="font-bold text-amber-500">{(selectedFood.carbs * servings).toFixed(1)}g</div><div className="text-xs text-[var(--muted)]">carbs</div></div>
                <div><div className="font-bold text-red-500">{(selectedFood.fat * servings).toFixed(1)}g</div><div className="text-xs text-[var(--muted)]">fat</div></div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Servings</label>
                  <input type="number" value={servings} onChange={e => setServings(Math.max(0.25, parseFloat(e.target.value) || 0.25))}
                    className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--background)]" step="0.25" min="0.25" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Meal</label>
                  <select value={meal} onChange={e => setMeal(e.target.value as typeof meal)}
                    className="w-full p-2 rounded-lg border border-[var(--border)] bg-[var(--background)]">
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
              </div>

              <button onClick={addToLog} className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
                Add {Math.round(selectedFood.calories * servings)} kcal to Food Log
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
