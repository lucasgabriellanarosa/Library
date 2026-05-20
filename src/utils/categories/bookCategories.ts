export const VALID_CATEGORIES = new Set([
    "Fantasy", "Fiction", "Adventure", "Magic", "Juvenile fiction",
    "History", "Romance", "Science fiction", "Mystery", "Religion",
    "Drama", "Horror", "Classic", "Thriller"
]);

export const CATEGORY_STYLES: Record<string, string> = {
    "Fantasy": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Fiction": "bg-blue-100 text-blue-700 border-blue-200",
    "Adventure": "bg-amber-100 text-amber-700 border-amber-200",
    "Magic": "bg-purple-100 text-purple-700 border-purple-200",
    "Juvenile fiction": "bg-cyan-100 text-cyan-700 border-cyan-200",
    "History": "bg-stone-100 text-stone-700 border-stone-200",
    "Romance": "bg-rose-100 text-rose-700 border-rose-200",
    "Science fiction": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "Mystery": "bg-slate-100 text-slate-700 border-slate-200",
    "Religion": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Drama": "bg-red-100 text-red-700 border-red-200",
    "Horror": "bg-zinc-800 text-zinc-100 border-zinc-900",
    "Classic": "bg-teal-100 text-teal-700 border-teal-200",
    "Thriller": "bg-orange-100 text-orange-700 border-orange-200",
};

export const processCategories = (subjects: string[]) => {
    if (!subjects) return [];

    return subjects
        .filter(s => VALID_CATEGORIES.has(s))
        .slice(0, 5);
};
