export class BoltMenuItem {
  children?: BoltMenuItem[];
  icon: string;
  label: string;
  route: string;
  url: string;
  title?: string;
  disabled?: boolean;
  isOpen?: boolean;
  isSelected?: boolean;
  expandPriority?: boolean;
}
