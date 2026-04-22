/** Tampilan nilai nutrisi: null → — */
export function dispNutrient(val, suffix = "") {
  if (val == null || val === "" || !Number.isFinite(Number(val))) return "—";
  const n = Number(val);
  const core =
    Math.abs(n - Math.round(n)) < 0.01 ? String(Math.round(n)) : String(Number(n.toFixed(2))).replace(/\.?0+$/, "");
  return suffix ? `${core}${suffix}` : core;
}

/** Baris ringkasan nutrisi untuk UI (label sesuai permintaan, Bahasa Indonesia). */
export function buildNutritionRows(d) {
  const e = d?.energyKkal ?? d?.totalCalories ?? d?.calories;
  return [
    { label: "Energi (Kkal)", text: e != null && Number.isFinite(Number(e)) ? `${Math.round(Number(e))}` : "—" },
    { label: "Protein (gram)", text: dispNutrient(d?.proteinG, " g") },
    { label: "Lemak (gram)", text: dispNutrient(d?.fatsG, " g") },
    { label: "Karbohidrat (gram)", text: dispNutrient(d?.carbsG, " g") },
    { label: "Serat (g)", text: dispNutrient(d?.fiberG, " g") },
    { label: "Air (mL)", text: dispNutrient(d?.waterMl, " mL") },
    { label: "VIT A (RE)", text: dispNutrient(d?.vitA_RE) },
    { label: "VIT D (mcg)", text: dispNutrient(d?.vitD_mcg) },
    { label: "VIT E (mg)", text: dispNutrient(d?.vitE_mg) },
    { label: "VIT K (mcg)", text: dispNutrient(d?.vitK_mcg) },
    { label: "VIT C (mg)", text: dispNutrient(d?.vitC_mg) },
  ];
}
