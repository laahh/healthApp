export default function QuantityControl({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center bg-surface-container-low rounded-full px-1 py-1">
      <button
        onClick={onDecrease}
        className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        type="button"
      >
        <span className="material-symbols-outlined text-lg">remove</span>
      </button>
      <span className="w-8 text-center font-headline font-bold text-sm">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        type="button"
      >
        <span className="material-symbols-outlined text-lg">add</span>
      </button>
    </div>
  );
}
