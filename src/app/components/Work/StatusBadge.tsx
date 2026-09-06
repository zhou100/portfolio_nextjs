import { STATUS_LABEL, type WorkStatus } from '@/lib/work';

export default function StatusBadge({
  status,
  onDark = false,
}: {
  status: WorkStatus;
  onDark?: boolean;
}) {
  return (
    <span className={`status status--${status}${onDark ? ' status--on-dark' : ''}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}
