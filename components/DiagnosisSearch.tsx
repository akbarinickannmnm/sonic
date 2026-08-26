type DiagnosisOption = {
  id: string;
  name: string;
  synonyms: string[];
};

type Props = {
  disease: string;
  setDisease: (value: string) => void;
  disabled: boolean;
  suggestions: DiagnosisOption[];
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
};

export default function DiagnosisSearch({
  disease,
  setDisease,
  disabled,
  suggestions,
  showSuggestions,
  setShowSuggestions,
}: Props) {
  return (
    <div className="relative w-full">
      <input
        disabled={disabled}
        type="text"
        placeholder="Search Disease Library..."
        value={disease}
        onFocus={() => setShowSuggestions(true)}
        onChange={(event) => {
          setDisease(event.target.value);
          setShowSuggestions(true);
        }}
        className="w-full rounded-xl border border-slate-300 p-4 text-left outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg">
          {suggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setDisease(item.id);
                setShowSuggestions(false);
              }}
              className="block w-full px-4 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
