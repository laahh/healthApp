import QuantityControl from "./QuantityControl";

export default function CartItemCard({ item, onIncrease, onDecrease }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 flex gap-4 transition-all hover:bg-white shadow-[0_4px_12px_rgba(23,29,25,0.02)]">
      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
        <img className="w-full h-full object-cover" alt={item.title} src={item.image} />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <h3 className="font-headline font-bold text-on-surface text-base">{item.title}</h3>
          <p className="font-body text-on-surface-variant text-xs">{item.subtitle}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-headline font-extrabold text-primary text-lg">
            ${item.price.toFixed(2)}
          </span>
          <QuantityControl
            quantity={item.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>
      </div>
    </div>
  );
}
