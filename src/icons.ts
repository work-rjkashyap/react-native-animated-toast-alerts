import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  LucideIcon
} from 'lucide-react-native';
import { ToastType } from './types';

export const TOAST_ICONS: Record<Exclude<ToastType, 'custom'>, LucideIcon> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info
};
