import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car as CarIcon,
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  TrendingUp,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  FolderKanban,
} from 'lucide-react';
import { supabase, type Car, type Category, type CarInput, type CategoryInput } from '@/supabaseClient';
import { useTheme } from '@/ThemeContext';

type Tab = 'cars' | 'categories';

export default function Admin() {
  const { currentTheme } = useTheme();
  const [tab, setTab] = useState<Tab>('cars');
  const [cars, setCars] = useState<Car[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCarForm, setShowCarForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [carsRes, catRes] = await Promise.all([
        supabase.from('cars').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('display_order', { ascending: true }),
      ]);
      if (carsRes.error) throw carsRes.error;
      if (catRes.error) throw catRes.error;
      setCars(carsRes.data || []);
      setCategories(catRes.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaveCar = async (data: CarInput, id?: string) => {
    try {
      if (id) {
        const { error } = await supabase.from('cars').update(data).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('cars').insert(data);
        if (error) throw error;
      }
      setShowCarForm(false);
      setEditingCar(null);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save car');
    }
  };

  const handleDeleteCar = async (id: string) => {
    if (!confirm('Delete this car? This cannot be undone.')) return;
    try {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete car');
    }
  };

  const handleSaveCategory = async (data: CategoryInput, id?: string) => {
    try {
      if (id) {
        const { error } = await supabase.from('categories').update(data).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('categories').insert(data);
        if (error) throw error;
      }
      setShowCategoryForm(false);
      setEditingCategory(null);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save category');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Delete this category? Cars in this category will be unassigned.')) return;
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
    }
  };

  const filteredCars = cars.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg text-text pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="p-2 glass rounded-lg text-textSecondary hover:text-text transition-colors"
              aria-label="Back to site"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-text">
              Admin Dashboard
            </h1>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('cars')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              tab === 'cars'
                ? 'bg-accent text-white'
                : 'glass text-textSecondary hover:text-text'
            }`}
          >
            <CarIcon className="w-4 h-4" />
            Cars ({cars.length})
          </button>
          <button
            onClick={() => setTab('categories')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              tab === 'categories'
                ? 'bg-accent text-white'
                : 'glass text-textSecondary hover:text-text'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            Categories ({categories.length})
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tab === 'cars' ? (
          <>
            {/* Cars toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 flex items-center gap-2 glass rounded-xl px-4">
                <Search className="w-4 h-4 text-textSecondary" />
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-text placeholder:text-textSecondary outline-none py-3 text-sm"
                />
              </div>
              <button
                onClick={() => {
                  setEditingCar(null);
                  setShowCarForm(true);
                }}
                className="flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accentHover text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Car
              </button>
            </div>

            {/* Cars grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCars.map((car) => (
                <div key={car.id} className="glass rounded-2xl overflow-hidden group">
                  <div className="relative h-40 overflow-hidden">
                    {car.image_url ? (
                      <img
                        src={car.image_url}
                        alt={car.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-card">
                        <ImageIcon className="w-8 h-8 text-textSecondary" />
                      </div>
                    )}
                    {car.is_trending && (
                      <span className="absolute top-2 left-2 glass-strong rounded-full px-2.5 py-1 flex items-center gap-1 text-xs font-semibold text-accent">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-text mb-1">{car.name}</h3>
                    <p className="text-accent font-semibold text-sm mb-2">{car.price}</p>
                    <div className="flex items-center gap-3 text-xs text-textSecondary mb-3">
                      <span>{car.fuel_type}</span>
                      <span>·</span>
                      <span>{car.transmission}</span>
                      <span>·</span>
                      <span>{car.match_score}% match</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingCar(car);
                          setShowCarForm(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 glass rounded-lg text-textSecondary hover:text-text text-xs font-medium transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredCars.length === 0 && (
                <div className="col-span-full text-center py-12 text-textSecondary">
                  No cars found. Click "Add Car" to create one.
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Categories toolbar */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setShowCategoryForm(true);
                }}
                className="flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accentHover text-white font-semibold rounded-xl transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
            </div>

            {/* Categories grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="glass rounded-2xl overflow-hidden group">
                  <div className="relative h-36 overflow-hidden">
                    {cat.image_url ? (
                      <img
                        src={cat.image_url}
                        alt={cat.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-card">
                        <ImageIcon className="w-8 h-8 text-textSecondary" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 glass-strong rounded-full px-2.5 py-1 text-xs font-semibold text-text">
                      {cat.vehicle_count} cars
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-text mb-1">{cat.name}</h3>
                    <p className="text-xs text-textSecondary mb-3">{cat.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingCategory(cat);
                          setShowCategoryForm(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 glass rounded-lg text-textSecondary hover:text-text text-xs font-medium transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Car form modal */}
      <AnimatePresence>
        {showCarForm && (
          <CarForm
            car={editingCar}
            categories={categories}
            onSave={handleSaveCar}
            onClose={() => {
              setShowCarForm(false);
              setEditingCar(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Category form modal */}
      <AnimatePresence>
        {showCategoryForm && (
          <CategoryForm
            category={editingCategory}
            onSave={handleSaveCategory}
            onClose={() => {
              setShowCategoryForm(false);
              setEditingCategory(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CarForm({
  car,
  categories,
  onSave,
  onClose,
}: {
  car: Car | null;
  categories: Category[];
  onSave: (data: CarInput, id?: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(car?.name || '');
  const [price, setPrice] = useState(car?.price || '');
  const [fuelType, setFuelType] = useState(car?.fuel_type || '');
  const [transmission, setTransmission] = useState(car?.transmission || '');
  const [matchScore, setMatchScore] = useState(car?.match_score?.toString() || '90');
  const [imageUrl, setImageUrl] = useState(car?.image_url || '');
  const [categoryId, setCategoryId] = useState(car?.category_id || '');
  const [isTrending, setIsTrending] = useState(car?.is_trending || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      {
        name,
        price,
        fuel_type: fuelType,
        transmission,
        match_score: parseInt(matchScore) || 0,
        image_url: imageUrl,
        category_id: categoryId || null,
        is_trending: isTrending,
      },
      car?.id
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-strong rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-heading font-bold text-lg text-text">
            {car ? 'Edit Car' : 'Add New Car'}
          </h2>
          <button onClick={onClose} className="p-1.5 text-textSecondary hover:text-text transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <Field label="Car Name" required>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Tesla Model 3"
              className="form-input"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price" required>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="e.g. Rs 82.0 Lakh"
                className="form-input"
              />
            </Field>
            <Field label="Match Score (0-100)">
              <input
                type="number"
                min="0"
                max="100"
                value={matchScore}
                onChange={(e) => setMatchScore(e.target.value)}
                className="form-input"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Fuel Type" required>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                required
                className="form-input"
              >
                <option value="">Select...</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </Field>
            <Field label="Transmission" required>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                required
                className="form-input"
              >
                <option value="">Select...</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="CVT">CVT</option>
              </select>
            </Field>
          </div>

          <Field label="Image URL">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.pexels.com/..."
              className="form-input"
            />
            {imageUrl && (
              <div className="mt-2 rounded-lg overflow-hidden h-32">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </Field>

          <Field label="Category">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="form-input"
            >
              <option value="">None</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isTrending}
              onChange={(e) => setIsTrending(e.target.checked)}
              className="w-4 h-4 rounded accent-accent"
            />
            <span className="text-sm text-text">Show in Trending carousel</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 glass rounded-xl text-textSecondary hover:text-text font-medium text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accentHover text-white font-semibold rounded-xl transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              {car ? 'Save Changes' : 'Add Car'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function CategoryForm({
  category,
  onSave,
  onClose,
}: {
  category: Category | null;
  onSave: (data: CategoryInput, id?: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(category?.name || '');
  const [description, setDescription] = useState(category?.description || '');
  const [imageUrl, setImageUrl] = useState(category?.image_url || '');
  const [vehicleCount, setVehicleCount] = useState(category?.vehicle_count?.toString() || '0');
  const [displayOrder, setDisplayOrder] = useState(category?.display_order?.toString() || '0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      {
        name,
        description,
        image_url: imageUrl,
        vehicle_count: parseInt(vehicleCount) || 0,
        display_order: parseInt(displayOrder) || 0,
      },
      category?.id
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-strong rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-heading font-bold text-lg text-text">
            {category ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button onClick={onClose} className="p-1.5 text-textSecondary hover:text-text transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <Field label="Category Name" required>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Hatchback"
              className="form-input"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
              rows={2}
              className="form-input resize-none"
            />
          </Field>

          <Field label="Image URL">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.pexels.com/..."
              className="form-input"
            />
            {imageUrl && (
              <div className="mt-2 rounded-lg overflow-hidden h-32">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Vehicle Count">
              <input
                type="number"
                min="0"
                value={vehicleCount}
                onChange={(e) => setVehicleCount(e.target.value)}
                className="form-input"
              />
            </Field>
            <Field label="Display Order">
              <input
                type="number"
                min="0"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                className="form-input"
              />
            </Field>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 glass rounded-xl text-textSecondary hover:text-text font-medium text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accentHover text-white font-semibold rounded-xl transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              {category ? 'Save Changes' : 'Add Category'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-textSecondary mb-1.5">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}
