const STATUS_LABELS = {
  available: 'Disponible',
  in_progress: 'En cours d’adoption',
  adopted: 'Adopté',
};
const STATUS_STYLES = {
  available: 'w-26 bg-green-100 text-green-900 border-green-200',
  in_progress: 'w-44 bg-amber-100 text-amber-800 border-amber-200',
  adopted: 'w-26 bg-blue-100 text-blue-800 border-blue-200',
};

export default function Status({ status }) {
  const displayStatus = STATUS_LABELS[status] || status;
  const statusClass = STATUS_STYLES[status];
  return (
    <p
      className={`text-center border rounded-(--radius-input) p-[1.6px] font-medium text-base ${statusClass}`}
    >
      {displayStatus}
    </p>
  );
}
